import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const h=vm.createContext({Date,Map,Set,JSON,Math,setTimeout,clearTimeout});vm.runInContext(['src/shared/identity.js','src/shared/diagnostics.js','src/render-feedback.js'].map(p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8')).join('\n')+';this.api={createRenderFeedbackRegistry,vieSourceIdentity,cleanFigureWarnings,figureWarningIdentity}',h);
const agent={session:{id:'runtime-test'}},source=JSON.stringify({op:'node.put',type:'GenerativeFigure',id:'block1'})+'\n',key=h.api.vieSourceIdentity(source);
const expect=(r,revision=1,s=source)=>{r.claim(agent,7);r.expect({agent,callId:'call'},{meta:{valid:true,visualId:'v1',revision,source:s}});};
test('runtime reports are scoped by session, source revision and node',()=>{const r=h.api.createRenderFeedbackRegistry();expect(r);assert.equal(r.receive({session:{id:'other'}},{sourceKey:key,nodeId:'block1',status:'error',error:'bad'}),false);assert.equal(r.receive(agent,{sourceKey:key,nodeId:'other',status:'ready'}),false);assert.equal(r.receive(agent,{sourceKey:key,nodeId:'block1',status:'error',error:'bad'}),true);assert.equal(r.take(agent,7)[0].freshFailure,true);assert.equal(r.take(agent,7)[0].freshFailure,false);expect(r,2,source+' ');assert.equal(r.receive(agent,{sourceKey:key,nodeId:'block1',status:'ready'}),false);r.dispose();});
test('only a new revision can clear a reported error',()=>{const r=h.api.createRenderFeedbackRegistry();expect(r);r.receive(agent,{sourceKey:key,nodeId:'block1',status:'error',error:'bad'});assert.equal(r.receive(agent,{sourceKey:key,nodeId:'block1',status:'ready'}),false);assert.equal(r.take(agent,7)[0].status,'error');});
test('client acknowledgement wakes prompt assembly without waiting for another model call',async()=>{const r=h.api.createRenderFeedbackRegistry();r.enable(true);expect(r);const pending=r.wait(agent,7);r.receive(agent,{sourceKey:key,nodeId:'block1',status:'ready'});await pending;assert.equal(r.take(agent,7)[0].status,'ready');r.dispose();});
test('missing client has a bounded wait and no transport adds no delay',async()=>{const r=h.api.createRenderFeedbackRegistry();expect(r);let start=Date.now();await r.wait(agent,7);assert.ok(Date.now()-start<100);r.enable(true);start=Date.now();await r.wait(agent,7);assert.ok(Date.now()-start>=250&&Date.now()-start<600);r.dispose();});

test('preview and ready carry separate mount timings and host-observed timestamps',async()=>{
 let now=1000;const r=h.api.createRenderFeedbackRegistry(()=>now),reports=[];const stop=r.onReport((_agent,event)=>reports.push(event));expect(r);r.enable(true);now=1100;
 assert.equal(r.receive(agent,{sourceKey:key,nodeId:'block1',status:'preview',metrics:{previewMs:25,readyMs:null}}),true);assert.equal(r.take(agent,7)[0].status,'preview');
 let finished=false;const pending=r.wait(agent,7).then(()=>{finished=true;});await Promise.resolve();assert.equal(finished,false);
 now=1250;assert.equal(r.receive(agent,{sourceKey:key,nodeId:'block1',status:'ready',metrics:{previewMs:25,readyMs:175}}),true);await pending;
 assert.equal(reports[0].observedMs,100);assert.equal(reports[1].observedMs,250);assert.equal(reports[1].metrics.readyMs,175);assert.equal(r.receive(agent,{sourceKey:key,nodeId:'block1',status:'preview'}),false);
 stop();r.dispose();
});

test('invalid runtime timings never contaminate measurements',()=>{
 const r=h.api.createRenderFeedbackRegistry();expect(r);
 for(const metrics of [{readyMs:-1},{previewMs:Infinity},[],null,{readyMs:3600001}])assert.equal(r.receive(agent,{sourceKey:key,nodeId:'block1',status:'ready',metrics}),false);
 assert.equal(r.take(agent,7)[0].status,'submitted');r.dispose();
});

test('native diagrams use the same scoped acknowledgement channel',()=>{
 const r=h.api.createRenderFeedbackRegistry(),source=JSON.stringify({op:'node.put',type:'Chart',id:'native'});r.claim(agent,1);r.expect({agent,turn:1,callId:'native'},{meta:{valid:true,source}});
 assert.equal(r.receive(agent,{sourceKey:h.api.vieSourceIdentity(source),nodeId:'native',status:'ready'}),true);assert.equal(r.take(agent,1)[0].status,'ready');r.dispose();
});

test('waiting and error never carry successful mount timings or downgrade ready',()=>{const r=h.api.createRenderFeedbackRegistry();expect(r);r.receive(agent,{sourceKey:key,nodeId:'block1',status:'waiting',metrics:{readyMs:1,visibleMs:2}});let row=r.take(agent,7)[0];assert.equal(row.status,'waiting');assert.deepEqual(Object.keys(row.reports[0].metrics),[]);r.receive(agent,{sourceKey:key,nodeId:'block1',status:'ready',metrics:{readyMs:50}});assert.equal(r.receive(agent,{sourceKey:key,nodeId:'block1',status:'waiting'}),false);r.receive(agent,{sourceKey:key,nodeId:'block1',status:'error',error:'Failed',metrics:{readyMs:50}});row=r.take(agent,7)[0];assert.equal(row.status,'error');assert.deepEqual(Object.keys(row.reports[0].metrics),[]);r.dispose();});
test('bounded object diagnostics survive current-source feedback and omit arbitrary payloads',()=>{const r=h.api.createRenderFeedbackRegistry();expect(r);const warnings=Array.from({length:20},(_,i)=>({code:'TEXT_CLIPPED',message:'Target exceeds viewport',target:{id:'label-'+i,kind:'text',text:'Label',bounds:{x:-20,y:5,width:100,height:18}},viewport:{width:300,height:150},source:'PRIVATE_CODE'}));assert.equal(r.receive(agent,{sourceKey:key,nodeId:'block1',status:'ready',warnings}),true);const clean=r.take(agent,7)[0].reports[0].warnings;assert.ok(clean.length>0&&clean.length<=4);assert.equal(clean[0].target.bounds.x,-20);assert.equal(clean[0].coordinateSpace,'viewport-px');assert.ok(Buffer.byteLength(JSON.stringify(clean))<=2600);assert.ok(!JSON.stringify(clean).includes('PRIVATE_CODE'));expect(r,2,source+' ');assert.equal(r.take(agent,7)[0].reports.length,0);assert.equal(r.receive(agent,{sourceKey:key,nodeId:'block1',status:'ready',warnings}),false);r.dispose();});
