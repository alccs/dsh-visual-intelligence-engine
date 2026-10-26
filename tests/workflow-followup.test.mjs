import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const h=vm.createContext({Date,Set,WeakMap});vm.runInContext(fs.readFileSync(new URL('../src/workflow.js',import.meta.url),'utf8')+';this.api={visualIntent,createVisualWorkflow,visualContinuationHistory};',h);
const user=text=>({source:{kind:'user'},content:[{type:'text',text}]}),tools=['vie_explain','vie_auto','pwsh','write','edit','skill'].map(name=>({name}));

test('submission cannot masquerade as a visible or interactive graphic',()=>{
 let now=1000;const agent={},w=h.api.createVisualWorkflow({},()=>now);w.claim({agent,turn:1,message:user('解释一个概念')});now=1060;
 w.result({agent,name:'vie_explain',arguments:{},callId:'first'},{meta:{kind:'vie',valid:true,visualId:'v',visualUnits:1}});
 assert.equal(w.state(agent).firstSubmittedMs,60);assert.equal(w.state(agent).firstVisibleMs,undefined);assert.equal(w.state(agent).firstReadyMs,undefined);
 w.renderReport(agent,{turn:1,status:'preview',observedMs:100,metrics:{visibleMs:40}});assert.equal(w.state(agent).firstVisibleMs,100);assert.equal(w.state(agent).firstReadyMs,undefined);
 w.renderReport(agent,{turn:1,status:'ready',observedMs:180});assert.equal(w.state(agent).firstReadyMs,180);
 w.renderReport(agent,{turn:0,status:'ready',observedMs:1});assert.equal(w.state(agent).firstReadyMs,180);
});

test('a new request cannot retain the previous turn visible-time alias',()=>{
 const agent={},w=h.api.createVisualWorkflow();w.claim({agent,turn:1,message:user('解释一个概念')});w.renderReport(agent,{turn:1,status:'ready',observedMs:150,metrics:{visibleMs:50}});
 w.claim({agent,turn:2,message:user('解释另一个概念')});w.request({agent,turn:2,step:1},{});const stats=vm.runInContext('VIE_WORKFLOW_STATS',h).get(agent);assert.equal(stats.firstGraphicMs,undefined);assert.equal(stats.firstVisibleMs,undefined);
});
test('3D and interaction followups keep illustration budgets without a subject list',()=>{
 for(const text of ['使用3d动画','改成3D动画','换成三维','加个滑块','改成可交互','rotate it in 3D','animate it']){const agent={},w=h.api.createVisualWorkflow();w.claim({agent,turn:1,message:user('解释一个知识概念')});w.claim({agent,turn:2,message:user(text)});assert.equal(w.state(agent).active,true,text);assert.equal(w.allowed(agent,'pwsh'),false,text);assert.equal(w.allowed(agent,'skill',{name:'mech-sim'}),false,text);assert.ok(w.assembly({tools,sections:[]},{agent}).tools.some(t=>t.name==='vie_explain'));}
});
test('explicit development and text-only instructions continue to leave illustration scope',()=>{
 for(const text of ['开发一个3D网页项目','使用React开发三维应用','修复动画脚本','只用文字解释3D','不使用VIE，编写HTML文件']){const agent={},w=h.api.createVisualWorkflow();w.claim({agent,turn:1,message:user('解释一个概念')});w.claim({agent,turn:2,message:user(text)});assert.equal(w.state(agent).active,false,text);}
});
test('a pending 3D illustration survives continue but does not regain an unlimited budget',()=>{
 const agent={},w=h.api.createVisualWorkflow();w.claim({agent,turn:1,message:user('使用3d动画')});w.claim({agent,turn:2,message:user('继续')});assert.equal(w.state(agent).active,true);assert.equal(w.allowed(agent,'pwsh'),false);for(let step=1;step<=8;step++){w.assembly({tools,sections:[]},{agent});w.request({agent,turn:2,step},{maxTokens:128000,reasoningEffort:'high'});}assert.equal(w.assembly({tools,sections:[]},{agent}).tools.length,0);assert.equal(w.request({agent,turn:2,step:9},{maxTokens:128000,reasoningEffort:'high'}).maxTokens,128000);
});
test('reopened cancelled illustration can recover through a long public history',()=>{
 const events=Array.from({length:1250},(_,seq)=>({type:'step/start',seq,data:{turn:3,step:seq}}));events[32]={type:'user/message',seq:32,data:user('使用3d动画')};events[95]={type:'user/message',seq:95,data:user('继续')};events[1248]={type:'turn/end',seq:1248,data:{reason:{kind:'aborted',reason:{kind:'user'}}}};const agent={session:{seq:1250,eventAt:i=>events[i]}},w=h.api.createVisualWorkflow();w.claim({agent,turn:4,message:user('继续')});assert.equal(w.state(agent).active,true);assert.equal(w.allowed(agent,'pwsh'),false);
});


test('runtime repair at the visual cap is serial and consumes the failure budget',()=>{const agent={},w=h.api.createVisualWorkflow({fastMaxVisuals:1});w.claim({agent,turn:1,message:user('解释一个概念')});w.result({agent,name:'vie_explain',arguments:{},callId:'first'},{meta:{kind:'vie',valid:true,visualId:'v',visualUnits:1,anchorCallId:'first'}});w.state(agent).runtimeErrors=[{visualId:'v'}];w.assembly({tools,sections:[]},{agent});const patch={visualId:'v',baseRevision:1,changes:[{index:0,block:{}}]},a={agent,name:'vie_explain',callId:'a',arguments:patch},b={...a,callId:'b'};assert.equal(w.reserve(a),true);assert.equal(w.reserve(b),false);w.release(a);assert.equal(w.reserve(b),true);w.result(b,{meta:{valid:false,error:'bad'}});assert.equal(w.state(agent).failures,1);assert.equal(w.allowed(agent,'vie_explain',patch),true);});
test('a repaired multi-figure draft keeps its full visual cost',()=>{const agent={},w=h.api.createVisualWorkflow();w.claim({agent,turn:1,message:user('解释一个概念')});w.result({agent,name:'vie_explain',arguments:{},callId:'first'},{meta:{kind:'vie',valid:true,visualId:'first',visualUnits:1,anchorCallId:'first'}});w.result({agent,name:'vie_explain',arguments:{},callId:'draft'},{meta:{kind:'vie',valid:false,visualId:'draft',visualUnits:2}});const args={visualId:'draft',changes:[{index:1,block:{}}]};assert.equal(w.allowed(agent,'vie_explain',args),true);w.result({agent,name:'vie_explain',arguments:args,callId:'repair'},{meta:{kind:'vie',valid:true,visualId:'draft',visualUnits:2,anchorCallId:'draft'}});assert.equal(w.state(agent).visuals.size,3);assert.equal(w.assembly({tools,sections:[]},{agent}).tools.length,0);});
