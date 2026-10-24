/** Replay through actual Harness Conversation/Chat assembly and grouping source. */
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import assert from 'node:assert/strict';
import {createRequire,registerHooks} from 'node:module';import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'..'),vendor=path.resolve(process.env.VIE_DSH_SOURCE??path.join(root,'tests/host-source'));
const runtime=createRequire(path.resolve(process.env.VIE_DSH_RUNTIME??path.join(root,'.validation/runtime'),'package.json'));
const storeRuntime=createRequire(path.join(process.env.VIE_ASSEMBLY_RUNTIME??process.env.VIE_DSH_RUNTIME??path.join(root,'.validation/runtime'),'package.json'));
const hook=registerHooks({resolve(s,c,next){
  // This import contains types only; Node transform-types retains its empty side-effect import.
  if(s==='@deepseek-ai/dsh-api-session-controller/client')return {url:'data:text/javascript,export {}',shortCircuit:true};
  if(s==='@deepseek-ai/dsh-client-store')return {url:pathToFileURL(storeRuntime.resolve(s)).href,shortCircuit:true};
  if(s.startsWith('@deepseek-ai/'))return {url:pathToFileURL(runtime.resolve(s)).href,shortCircuit:true};
  return next(s,c);
}});
const load=p=>import(pathToFileURL(path.join(vendor,'packages/client',p)).href);
const {ConversationNodeAssembler}=await load('ui-conversation/src/client/conversation/assembler.ts');
const {chatViewDefinition}=await load('ui-chat/src/client/conversation-nodes/chat-snapshot-builder.ts');
const {processGroupDefinition}=await load('ui-chat/src/client/conversation-nodes/process-groups.ts');
const {assistantDefinition}=await load('ui-chat/src/client/conversation-nodes/assistant.ts');
const {toolDefinition}=await load('ui-chat/src/client/conversation-nodes/tool.ts');
const {turnProcessDefinition}=await load('ui-chat/src/client/conversation-nodes/turn-process.ts');
const {messageDefinition}=await load('ui-chat/src/client/conversation-nodes/message.ts');
const c={TextEncoder,console};c.window={__ModuleLoader__:{load:({factory})=>factory(()=>({}))}};
vm.runInNewContext(fs.readFileSync(path.join(root,'package/lib/client.js'),'utf8').replace('exports.name=name;','globalThis.probe={createVIETurnDefinition,createVIEProseDefinition,createVIEAnswerDefinition,flow:typeof createVIEFlowDefinition===\'function\'?createVIEFlowDefinition:null};exports.name=name;'),c);
const events=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/placement-history.json'),'utf8'));
const definitions=[assistantDefinition,toolDefinition,turnProcessDefinition,messageDefinition,c.probe.createVIEAnswerDefinition(),...(c.probe.flow?[c.probe.flow()]:[])];
function engine(){return new ConversationNodeAssembler({entries:()=>definitions,fallbackEntry:()=>undefined},{entries:()=>[chatViewDefinition]},{entries:()=>[processGroupDefinition],forTarget:()=>processGroupDefinition});}
const checks=[];
function inspect(assembly,name){
 const snapshot=assembly.get('chat'),nodes=snapshot.order.map(k=>snapshot.nodes.get(k)),answer=nodes.find(n=>n.kind==='vie-answer'),prose=nodes.find(n=>n.kind==='assistant-step'&&n.data.blocks.some(b=>b.kind==='text'));
 assert.ok(answer,name+': missing answer');assert.ok(prose,name+': missing prose');assert.ok(answer.anchorSeq<prose.anchorSeq,name+': wrong order');assert.equal(answer.groupTree,'turn');
 const groups=assembly.grouped('chat');assert.ok(groups.entries.some(e=>e.kind==='node'&&e.key===answer.key),name+': folded into process');
 assert.equal(nodes.filter(n=>n.kind==='vie-answer').length,1);checks.push({name,passed:true});
 return {order:nodes.map(n=>({kind:n.kind,anchor:n.anchorSeq})),groupEntries:groups.entries.map(e=>({kind:e.kind,key:e.key})),answer:JSON.parse(JSON.stringify(answer.data))};
}
const a=engine();a.activateTarget('chat');for(const event of events){a.append({event});a.flush();}const live=inspect(a,'original reported history replays before native prose, outside process group');
const b=engine();b.activateTarget('chat');b.replaceWindow(events.map(event=>({event})),false);b.flush();inspect(b,'cold full history produces the same placement');
const partial=engine();partial.activateTarget('chat');partial.replaceWindow(events.filter(e=>e.seq>=28).map(event=>({event})),true);partial.flush();inspect(partial,'history window starting at result needs no tool-call cache');
partial.prepend(events.filter(e=>e.seq<28).map(event=>({event})),false);partial.flush();inspect(partial,'prepending earlier history preserves a single visible surface');
// Minimal version of the beam explanation: native prose between independent VIE calls.
const scene=events.find(e=>e.type==='tool/result'&&e.data.meta?.source).data.meta.source;
const e=(type,seq,step,data={})=>({type,seq,time:seq,data:{turn:2,step,...data}});
const call=(id,seq,step)=>e('tool/call',seq,step,{callId:id,name:'vie_explain',arguments:'{}'});
const result=(id,seq,step,extra={})=>e('tool/result',seq,step,{message:{source:{kind:'tool',callId:id},content:[{type:'text',text:'Figure ready'}]},meta:{kind:'vie',presentationVersion:3,placement:'flow',valid:true,source:scene,anchorCallId:id,...extra}});
const prose=(text,seq,step)=>({...e('assistant/message',seq,step,{message:{role:'assistant',id:'prose-'+seq,content:[{type:'text',text}]}}),surfaceOp:'append'});
const flowEvents=[e('turn/start',40,1),e('step/start',41,1),call('beam-main',42,1),result('beam-main',43,1),e('step/end',44,1),e('step/start',45,2),prose('第一段解释：荷载与弯矩。',46,2),call('beam-shear',47,2),result('beam-shear',48,2),e('step/end',49,2),e('step/start',50,3),prose('第二段解释：剪力与弯矩斜率。',51,3),e('step/end',52,3),e('turn/end',53,3)];
function inspectFlow(assembly,name){
 const snapshot=assembly.get('chat'),nodes=snapshot.order.map(k=>snapshot.nodes.get(k)),reading=nodes.filter(n=>n.visibility!=='hidden'&&(n.kind==='vie-flow-answer'||n.kind==='vie-answer'||n.kind==='assistant-step'&&n.data.blocks.some(b=>b.kind==='text')));
 assert.deepEqual(reading.map(n=>n.kind.startsWith('vie-')?'figure':'prose'),['figure','prose','figure','prose'],name+': graphics must interleave with native Harness prose');
 for(const node of reading.filter(n=>n.kind.startsWith('vie-')))assert.ok(assembly.grouped('chat').entries.some(entry=>entry.kind==='node'&&entry.key===node.key),name+': folded graphic');
 const roots=assembly.grouped('chat').entries.filter(entry=>entry.kind==='node'&&reading.some(node=>node.key===entry.key));assert.deepEqual(roots.map(entry=>reading.find(node=>node.key===entry.key).kind.startsWith('vie-')?'figure':'prose'),['figure','prose','figure','prose'],name+': native prose must also stay outside process folding');
 checks.push({name,passed:true});return reading;
}
const flow=engine();flow.activateTarget('chat');for(const event of flowEvents){flow.append({event});flow.flush();}const beforeRepair=inspectFlow(flow,'live calls keep figure/prose/figure/prose order');
const cold=engine();cold.activateTarget('chat');cold.replaceWindow(flowEvents.map(event=>({event})),false);cold.flush();inspectFlow(cold,'cold history preserves interleaved reading order');
const paged=engine();paged.activateTarget('chat');paged.replaceWindow(flowEvents.filter(e=>e.seq>=43).map(event=>({event})),true);paged.flush();inspectFlow(paged,'result-only history window interleaves without call cache');
paged.prepend(flowEvents.filter(e=>e.seq<43).map(event=>({event})),false);paged.flush();inspectFlow(paged,'prepending flow history does not duplicate graphics');
flow.append({event:result('repair-main',54,4,{anchorCallId:'beam-main',revision:2,visualId:'beam-stable'})});flow.flush();const repaired=inspectFlow(flow,'repair updates its original graphic without moving or duplicating it');assert.equal(repaired[0].anchorSeq,beforeRepair[0].anchorSeq);
const mixedEvents=flowEvents.map(event=>event.seq!==46?event:{...event,data:{...event.data,message:{...event.data.message,content:[...event.data.message.content,{type:'tool-call',id:'beam-shear',name:'vie_explain',arguments:'{}'}]}}});
const mixed=engine();mixed.activateTarget('chat');mixed.replaceWindow(mixedEvents.map(event=>({event})),false);mixed.flush();inspectFlow(mixed,'settled message containing prose and next call keeps prose before that graphic');
const interrupted=engine();interrupted.activateTarget('chat');for(const event of [e('turn/start',60,1),e('step/start',61,1),e('tool/call',62,1,{callId:'stopped',name:'vie_render',arguments:JSON.stringify({source:scene})}),e('turn/end',63,1)]){interrupted.append({event});interrupted.flush();}const stopped=[...interrupted.get('chat').nodes.values()].find(n=>n.kind==='vie-flow-answer'&&n.visibility==='visible');assert.equal(stopped.data.items[0].pending,false);assert.equal(stopped.data.items[0].interrupted,true);checks.push({name:'turn interruption settles a live per-call preview through real location updates',passed:true});
const chapters=engine();chapters.activateTarget('chat');const chapterEvents=[e('turn/start',70,1),e('step/start',71,1)];
for(let i=0;i<3;i++){const seq=72+i*10,step=i+1,id='i2c-'+i;if(i){chapterEvents.push(e('step/start',seq-1,step),{...prose('原生正文：上一张图的解释。',seq,step),data:{turn:2,step,message:{role:'assistant',id:'i2c-prose-'+i,content:[{type:'text',text:'原生正文：上一张图的解释。'},{type:'tool-call',id,name:'vie_explain',arguments:'{}'}]}}});}chapterEvents.push(call(id,seq+1,step),result(id,seq+2,step,{more:false}),e('step/end',seq+3,step));}
chapterEvents.push(e('step/start',103,4),prose('原生正文：最后一张时序图的解释。',104,4),e('step/end',105,4),e('turn/end',106,4));
for(const event of chapterEvents){chapters.append({event});chapters.flush();}
function inspectChapters(assembly,name){const snapshot=assembly.get('chat'),roots=assembly.grouped('chat').entries.filter(entry=>entry.kind==='node').map(entry=>snapshot.nodes.get(entry.key)).filter(node=>node.visibility!=='hidden'&&(node.kind==='vie-flow-answer'||node.kind==='assistant-step'&&node.data.blocks.some(b=>b.kind==='text')));assert.deepEqual(roots.map(n=>n.kind==='vie-flow-answer'?'figure':'prose'),['figure','prose','figure','prose','figure','prose']);checks.push({name,passed:true});}
inspectChapters(chapters,'three concepts without more interleave with native prose in actual Harness grouping');const coldChapters=engine();coldChapters.activateTarget('chat');coldChapters.replaceWindow(chapterEvents.map(event=>({event})),false);coldChapters.flush();inspectChapters(coldChapters,'cold history preserves all three concept/explanation pairs');
// Final visibility uses the actual ChatNodeSeat predicate, not grouped roots alone.
definitions.push(c.probe.createVIETurnDefinition(),c.probe.createVIEProseDefinition());
const seatSource=fs.readFileSync(path.join(root,'tests/host-source/packages/client/ui-chat/src/client/chat/ChatNodeSeat.tsx'),'utf8');
const seatExpression=seatSource.split('const processMember = ')[1].split('const processAnswer = ')[0].trim();
const processMember=new Function('routedNode','processSpec','processWindowReady','liveProcess','groupPart','isAtOrOutside','return ('+seatExpression+')');
const outside=(n)=>['turn','input','exchange'].includes(n.groupTree);
const real=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/contact-emf-flow.json'),'utf8'));
function checkCompleted(a,label){
 const snap=a.get('chat'),nodes=snap.order.map(k=>snap.nodes.get(k)),control=nodes.find(n=>n.kind==='turn-process'),spec=control.data;
 const visible=nodes.filter(n=>n.visibility==='visible'&&!processMember(n,spec,true,false,undefined,outside));
 const figures=visible.filter(n=>n.kind==='vie-flow-answer');assert.equal(figures.length,3,label);
 const text=visible.filter(n=>n.kind==='assistant-step');assert.equal(text.length,4,label);
 assert.ok(text.slice(0,3).every(n=>n.key.includes('vie-flow-prose')&&n.groupTree==='turn'),JSON.stringify(text.map(n=>({key:n.key,groupTree:n.groupTree}))));
 assert.ok(text.every(n=>n.data.blocks.every(b=>b.kind==='text')));
 assert.deepEqual(visible.filter(n=>figures.includes(n)||text.includes(n)).map(n=>n.kind==='vie-flow-answer'?'figure':'prose'),['prose','figure','prose','figure','prose','figure','prose']);
 for(const n of text)assert.equal(visible.filter(v=>v.kind==='assistant-step'&&v.data.blocks.map(b=>b.text).join('')===n.data.blocks.map(b=>b.text).join('')).length,1);
 checks.push({name:label,passed:true});
}
const finalLive=engine();finalLive.activateTarget('chat');for(const event of real){finalLive.append({event});finalLive.flush();}checkCompleted(finalLive,'real contact EMF final collapsed view retains each prose segment exactly once');
const finalCold=engine();finalCold.activateTarget('chat');finalCold.replaceWindow(real.map(event=>({event})),false);finalCold.flush();checkCompleted(finalCold,'cold history final collapsed view uses native Markdown prose in original order');
const finalPage=engine();finalPage.activateTarget('chat');finalPage.replaceWindow(real.filter(e=>e.seq>=50).map(event=>({event})),true);finalPage.flush();finalPage.prepend(real.filter(e=>e.seq<50).map(event=>({event})),false);finalPage.flush();checkCompleted(finalPage,'prepending real contact EMF history does not duplicate final prose');
hook.deregister();
fs.writeFileSync(path.join(root,'docs/validation/chat-assembly.json'),JSON.stringify({version:'0.29.2',engine:'real Harness source ConversationNodeAssembler + ChatSnapshotBuilder + ProcessState',source:vendor,checks:checks.length,results:checks,layout:live,externalModelRequests:0,fullGUI:false},null,2));
console.log(checks.map(c=>'PASS '+c.name).join('\n'));
