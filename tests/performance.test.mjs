import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const h=vm.createContext({Date,Set,WeakMap});vm.runInContext(fs.readFileSync(new URL('../src/workflow.js',import.meta.url),'utf8')+';this.create=createVIEPerformanceTrace;',h);
test('public deltas measure time and UTF-8 bytes without retaining generated or reasoning text',()=>{
 let now=100;const trace=h.create(100,()=>now);trace.startRequest();now=120;trace.chunk({type:'reasoning-delta',text:'PRIVATE_THOUGHT'});now=150;trace.chunk({type:'tool-call-delta',id:'figure',name:'vie_explain',argumentsDelta:'图'});now=180;trace.chunk({type:'tool-call-delta',id:'figure',argumentsDelta:'{}'});trace.chunk({type:'usage',usage:{inputTokens:40,outputTokens:12}});trace.chunk({type:'usage',usage:{inputTokens:40,outputTokens:12}});now=200;trace.end();const result=trace.snapshot();assert.equal(result.visualArgumentBytes,5);assert.equal(result.firstVisualArgumentMs,50);assert.equal(result.requestToFirstTokenMs,20);assert.equal(result.requestWallMs,100);assert.equal(result.inputTokens,40);assert.equal(result.outputTokens,12);assert.ok(!JSON.stringify(trace).includes('PRIVATE_THOUGHT'));assert.ok(!JSON.stringify(result).includes('PRIVATE_THOUGHT'));
});
test('missing request usage stays unknown instead of silently undercounting',()=>{
 let now=0;const trace=h.create(0,()=>now);trace.startRequest();trace.chunk({type:'usage',usage:{inputTokens:10,outputTokens:5}});trace.end();now=20;trace.startRequest();trace.end();const result=trace.snapshot();assert.equal(result.usageComplete,false);assert.equal(result.inputTokens,null);assert.equal(result.outputTokens,null);assert.equal(result.observedInputTokens,10);
});
test('tool wall time and actual repair calls stay separate from model request duration',()=>{
 let now=0;const trace=h.create(0,()=>now),exec={name:'vie_explain',callId:'one',arguments:{changes:[{}]}};trace.toolStart(exec);trace.toolStart(exec);now=30;trace.toolEnd(exec,{meta:{hostMs:7}});trace.toolEnd(exec,{meta:{hostMs:7}});const result=trace.snapshot();assert.equal(result.repairCalls,1);assert.equal(result.toolRoundTripMs,30);assert.equal(result.hostToolMs,7);assert.equal(result.requestWallMs,0);
});
test('the installed lifecycle hook actually observes public usage and argument frames',async()=>{
 const context=vm.createContext({Date,Set,WeakMap,VIE_ENTRY_POLICY:'entry',VIE_STUDY_POLICY:'study',VIE_POLICY:'policy'});vm.runInContext(fs.readFileSync(new URL('../src/workflow.js',import.meta.url),'utf8')+';this.install=installVisualWorkflow;this.stats=VIE_WORKFLOW_STATS;',context);
 const hooks=new Map(),ctx={on:(name,handler)=>hooks.set(name,handler),systemPrompt:{section(){}},effect(){}},agent={session:{id:'trace'}};
 context.install(ctx,{});hooks.get('agent/inbox/claimed')({agent,turn:1,message:{source:{kind:'user'},content:[{type:'text',text:'运行 npm test，然后用图解释失败原因'}]}});
 await hooks.get('agent/request')({agent,turn:1,step:1},async()=>({model:'fixture'}));
 const observe=chunk=>hooks.get('agent/assistant-stream')({agent,frame:{type:'chunk',chunk}});observe({type:'tool-call-delta',id:'figure',name:'vie_explain',argumentsDelta:'图'});observe({type:'usage',usage:{inputTokens:100,outputTokens:20}});hooks.get('agent/assistant-stream')({agent,frame:{type:'end'}});
 assert.equal(context.stats.get(agent).visualArgumentBytes,3);assert.equal(context.stats.get(agent).inputTokens,100);assert.equal(context.stats.get(agent).outputTokens,20);
});
