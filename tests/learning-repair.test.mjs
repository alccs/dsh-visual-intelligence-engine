import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const h=vm.createContext({TextEncoder,console,VIEJavaScriptParser:vm.Script,defineTool:x=>x});
vm.runInContext(fs.readFileSync(new URL('../package/lib/index.js',import.meta.url),'utf8').replace(/^import[^\n]+\n/gm,'').replace(/^export\s+/gm,'')+';this.review={tool:createExplainImplementation(),workflow:createVisualWorkflow,units:documentVisualUnits};',h);
const local=value=>{h.input=JSON.stringify(value);return vm.runInContext('JSON.parse(input)',h);};
const execute=(agent,args,callId)=>h.review.tool.execute(local(args),{agent,callId});
const stages=count=>Array.from({length:count},(_,i)=>({label:String(i+1),html:'<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4"/></svg>'}));
const user={source:{kind:'user'},content:[{type:'text',text:'分阶段解释一个过程'}]};
const prompt=()=>({tools:[{name:'vie_explain'},{name:'vie_auto'}],sections:[]});

test('learning aliases keep one canonical repair block after blank or missing stage HTML',async()=>{
 for(const invalid of ['',undefined]){
  const agent={},draft={type:'learning',title:'Two stages',blocks:stages(2)};draft.blocks[1].html=invalid;
  const inputBefore=JSON.stringify(draft),failure=await execute(agent,{document:draft},'original');
  assert.equal(failure.meta.valid,false);assert.equal(failure.meta.errorCode,'VIE_LEARNING_INVALID');
  assert.equal(failure.meta.errorPath,'blocks[0]');assert.equal(failure.meta.visualUnits,1);
  assert.match(failure.meta.repairHint,/Replace only.*blocks\[0\]/);
  const fixed=await execute(agent,{visualId:failure.meta.visualId,baseRevision:failure.meta.revision,changes:[{index:0,block:{type:'learning',title:draft.title,stages:stages(2)}}]},'repair');
  assert.equal(fixed.meta.valid,true,fixed.note);assert.equal(fixed.meta.visualUnits,1);
  assert.equal(fixed.meta.revision,2);assert.equal(fixed.meta.anchorCallId,'original');
  assert.equal(fixed.meta.source.trim().split('\n').map(JSON.parse).filter(e=>e.type==='GenerativeFigure').length,1);
  assert.equal(JSON.stringify(draft),inputBefore);
 }
});

test('a failed four-stage alias can be repaired at a one-graphic budget',async()=>{
 const agent={},workflow=h.review.workflow({fastMaxVisuals:1}),draft={type:'learning',title:'Four stages',blocks:stages(4)};
 draft.blocks[3].html='';workflow.claim({agent,turn:1,message:user});workflow.assembly(prompt(),{agent});
 const initial={agent,name:'vie_explain',callId:'draft',arguments:local({document:draft})};
 assert.equal(workflow.reserve(initial),true);const failure=await execute(agent,initial.arguments,initial.callId);workflow.result(initial,failure);
 assert.equal(failure.meta.valid,false);assert.equal(failure.meta.visualUnits,1);
 const repair={agent,name:'vie_explain',callId:'repair',arguments:{visualId:failure.meta.visualId,baseRevision:1,changes:[{index:0,block:{type:'learning',stages:stages(4)}}]}};
 assert.equal(workflow.reserve(repair),true);
 const fixed=await execute(agent,repair.arguments,repair.callId);workflow.result(repair,fixed);
 assert.equal(fixed.meta.valid,true,fixed.note);assert.equal(workflow.state(agent).visuals.size,1);
 assert.equal(workflow.state(agent).failures,1);assert.equal(workflow.assembly(prompt(),{agent}).tools.length,0);
});

test('stage-count validation retains a canonical block that can be shortened atomically',async()=>{
 const agent={},failure=await execute(agent,{document:{type:'learning',blocks:stages(9)}},'oversized');
 assert.equal(failure.meta.valid,false);assert.equal(failure.meta.visualUnits,1);assert.equal(failure.meta.errorPath,'blocks[0]');
 const fixed=await execute(agent,{visualId:failure.meta.visualId,baseRevision:1,changes:[{index:0,block:{type:'learning',stages:stages(8)}}]},'shortened');
 assert.equal(fixed.meta.valid,true,fixed.note);assert.equal(fixed.meta.visualUnits,1);
});

test('typed learning documents retain their real block cost rather than one cost per root alias',()=>{
 const agent={},workflow=h.review.workflow({fastMaxVisuals:1});workflow.claim({agent,turn:1,message:user});
 const document={type:'learning',blocks:[{type:'learning',stages:stages(1)},{type:'learning',stages:stages(1)}]};
 assert.equal(h.review.units(document),2);
 assert.equal(workflow.reserve({agent,name:'vie_explain',callId:'two',arguments:{document}}),false);
});

test('mixed root aliases request a complete document instead of an impossible block patch',async()=>{
 const failure=await execute({},{document:{type:'learning',blocks:[{type:'learning',stages:stages(1)},stages(1)[0]]}},'mixed');
 assert.equal(failure.meta.valid,false);assert.equal(failure.meta.errorPath,'$');
 assert.match(failure.meta.repairHint,/complete.*document/i);
 assert.doesNotMatch(failure.note,/只替换出错块/);
});

test('unsupported root types are rejected consistently on the legacy JSON path',async()=>{
 const failure=await execute({},{spec:JSON.stringify({type:'not-learning',blocks:[{type:'figure',html:'<svg/>'}]})},'unsupported');
 assert.equal(failure.meta.valid,false);assert.equal(failure.meta.errorCode,'VIE_INVALID_DOCUMENT');
});

test('restored legacy alias baselines normalize before applying canonical block indices',async()=>{
 h.savedJSON=JSON.stringify({type:'learning',title:'Recovered',blocks:[stages(1)[0],{label:'2',html:''}]});
 vm.runInContext('this.oldDraft=JSON.parse(savedJSON);VIE_BASELINE_STORAGE={load:()=>[["legacy",{document:oldDraft,revision:1,display:{},anchorCallId:"original"}]],save:()=>{}};this.recovered=createDocumentExecutor();',h);
 try{
  const repaired=await h.recovered(local({visualId:'legacy',baseRevision:1,changes:[{index:0,block:{type:'learning',stages:stages(2)}}]}),{agent:{session:{id:'recover-alias'}},callId:'repair'});
  assert.equal(repaired.meta.valid,true,repaired.note);assert.equal(repaired.meta.revision,2);assert.equal(repaired.meta.anchorCallId,'original');assert.equal(repaired.meta.visualUnits,1);
  assert.equal(h.oldDraft.blocks.length,2);assert.equal(h.oldDraft.blocks[1].html,'');
 }finally{vm.runInContext('VIE_BASELINE_STORAGE=null',h);}
});

test('Host and Client use identical learning alias normalization and required-field validation',()=>{
 const client=vm.createContext({TextEncoder,console,window:{__ModuleLoader__:{load:({factory})=>factory(()=>({}))}}});
 vm.runInContext(fs.readFileSync(new URL('../package/lib/client.js',import.meta.url),'utf8').replace('exports.name=name;','globalThis.learningReview={documentSceneSource,validateDocumentSpec};exports.name=name;'),client);
 const invoke=(context,expression,document)=>{context.documentJSON=JSON.stringify(document);return vm.runInContext(expression+'(JSON.parse(documentJSON))',context);};
 for(const count of [1,4,8]){
  const document={type:'learning',title:'Stages',blocks:stages(count)};
  assert.equal(invoke(h,'documentSceneSource',document),invoke(client,'learningReview.documentSceneSource',document));
 }
 for(const stage of [{label:'Missing'},{html:''}])for(const [context,expression]of [[h,'validateDocumentSpec'],[client,'learningReview.validateDocumentSpec']])assert.throws(()=>invoke(context,expression,{type:'learning',blocks:[stages(1)[0],stage]}),/stages\[1\]\.html/);
});
