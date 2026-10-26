import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const h=vm.createContext({TextEncoder,console,VIEJavaScriptParser:vm.Script,defineTool:x=>x});vm.runInContext(fs.readFileSync(new URL('../package/lib/index.js',import.meta.url),'utf8').replace(/^import[^\n]+\n/gm,'').replace(/^export\s+/gm,'')+';this.tool=createExplainImplementation();',h);
const run=async args=>{h.args=JSON.stringify(args);return h.tool.execute(vm.runInContext('JSON.parse(args)',h),{agent:{}});};
test('syntax failure reports stable code, exact field and bounded patch instruction',async()=>{const r=await run({document:{blocks:[{type:'figure',html:'<svg/>',js:'const = ;'}]}});assert.equal(r.meta.valid,false);assert.equal(r.meta.errorCode,'VIE_SCRIPT_SYNTAX');assert.equal(r.meta.errorPath,'blocks[0].js');assert.match(r.meta.repairHint,/Replace only/);assert.ok(r.meta.visualId);});
test('missing repair baseline asks for a full document instead of another patch',async()=>{const r=await run({visualId:'absent',baseRevision:1,changes:[{index:0,block:{type:'graphic',kind:'bars',items:[{label:'A',value:1}]}}]});assert.equal(r.meta.errorCode,'VIE_BASE_MISSING');assert.equal(r.meta.errorPath,'$');assert.match(r.meta.repairHint,/complete document/);});
test('malformed JSON has no false successful source or stale block path',async()=>{const r=await run({spec:'{"blocks":['});assert.equal(r.meta.errorCode,'VIE_JSON_SYNTAX');assert.equal(r.meta.source,'');assert.equal(r.meta.errorPath,'$');assert.match(r.meta.repairHint,/native document/);});
test('stale repair returns the actual latest revision without changing its baseline',async()=>{const agent={},execute=async args=>{h.args=JSON.stringify(args);return h.tool.execute(vm.runInContext('JSON.parse(args)',h),{agent});};const block={type:'graphic',kind:'bars',items:[{label:'A',value:1}]},base=await execute({document:{blocks:[block]}});const next=await execute({visualId:base.meta.visualId,baseRevision:1,changes:[{index:0,block}]});assert.equal(next.meta.revision,2);const stale=await execute({visualId:base.meta.visualId,baseRevision:1,changes:[{index:0,block}]});assert.equal(stale.meta.errorCode,'VIE_STALE_REVISION');assert.equal(stale.meta.revision,2);assert.equal(stale.meta.visualId,base.meta.visualId);});
test('literal SDK mistakes are rejected by the actual tool before submission',async()=>{const r=await run({document:{blocks:[{type:'figure',html:'<div id="p"></div>',js:'const g=VIE.svg({root:"#p"});g.rect({x:10,y:10,width:150,height:40,width:1.2});'}]}});assert.equal(r.meta.valid,false);assert.equal(r.meta.errorCode,'VIE_SDK_DUPLICATE_FIELD');assert.equal(r.meta.errorPath,'blocks[0].js');assert.equal(r.meta.source,'');assert.match(r.meta.error,/strokeWidth/);assert.ok(r.meta.visualId);});
test('SVG aliases and a short figure are accepted without claiming browser success',async()=>{const r=await run({document:{blocks:[{type:'figure',height:150,html:'<div id="p"></div>',js:'const g=VIE.svg({root:"#p",width:320,height:160});g.label({x:80,y:35,text:"A",size:14,color:"#2563eb"});g.circle({cx:80,cy:80,r:15,stroke:"#2563eb",fill:"#dbeafe"});'}]}});assert.equal(r.meta.valid,true);assert.equal(r.meta.renderStatus,'submitted');assert.equal(r.meta.validationScope,'schema-and-script');assert.equal(r.meta.visualUnits,1);const node=r.meta.source.split('\n').map(s=>{try{return JSON.parse(s);}catch{return {};}}).find(n=>n.op==='node.put'&&n.type==='GenerativeFigure');assert.equal(node.props.height,160);});
test('provable missing coordinates are caught even when label text is dynamic',async()=>{const r=await run({document:{blocks:[{type:'figure',html:'<div id="p"></div>',js:'const g=VIE.svg({root:"#p"});const text=String(Date.now());g.label({text});'}]}});assert.equal(r.meta.valid,false);assert.equal(r.meta.errorCode,'VIE_SDK_ARGUMENT');assert.equal(r.meta.errorPath,'blocks[0].js');assert.match(r.meta.error,/coordinate/);});
test('document-level learning shorthand is normalized before validation',async()=>{
 const r=await run({document:{type:'learning',title:'冷却阶段',blocks:[
  {label:'前',title:'全液相',caption:'均匀液体',html:'<svg viewBox="0 0 100 50"><circle cx="50" cy="25" r="10"/></svg>'},
  {label:'后',html:'<svg viewBox="0 0 100 50"><rect x="30" y="15" width="40" height="20"/></svg>'}
 ]}});
 assert.equal(r.meta.valid,true,r.note);
 assert.match(r.meta.source,/mountLearning/);
 assert.match(r.meta.source,/冷却阶段/);
});
test('ambiguous document-level learning shorthand returns an actionable error',async()=>{
 const r=await run({document:{type:'learning',title:'错误阶段',blocks:[{label:'前'}]}});
 assert.equal(r.meta.valid,false);
 assert.equal(r.meta.errorCode,'VIE_LEARNING_INVALID');
 assert.match(r.note,/未提交.*并非浏览器渲染失败/);
 assert.match(r.meta.repairHint,/type belongs on the learning block/);
});
