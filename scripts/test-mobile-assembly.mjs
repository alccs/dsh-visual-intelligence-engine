/** Replay gallery through the real Harness target assembler, including cold history. */
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import assert from 'node:assert/strict';import {createRequire,registerHooks} from 'node:module';import {pathToFileURL} from 'node:url';import {sdkExamples} from './sdk-examples.mjs';
const root=path.resolve(import.meta.dirname,'..'),vendor=path.resolve(process.env.VIE_DSH_SOURCE??path.join(root,'tests/host-source')),runtime=createRequire(path.resolve(process.env.VIE_DSH_RUNTIME??path.join(root,'.validation/runtime'),'package.json'));
const hook=registerHooks({resolve(s,c,next){if(s==='@deepseek-ai/dsh-api-session-controller/client')return {url:'data:text/javascript,export {}',shortCircuit:true};if(s.startsWith('@deepseek-ai/'))return {url:pathToFileURL(runtime.resolve(s)).href,shortCircuit:true};return next(s,c);}});
try{
 const {ConversationNodeAssembler}=await import(pathToFileURL(path.join(vendor,'packages/client/ui-conversation/src/client/conversation/assembler.ts')).href);
 const context={TextEncoder,console};context.window={__ModuleLoader__:{load:({factory})=>factory(()=>({}))}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'package/lib/client.js'),'utf8').replace('exports.name=name;','globalThis.api={createVIEGalleryDefinition,createVIEGalleryViewDefinition,documentSceneSource};exports.name=name;'),context);
 const {api}=context,source=doc=>{context.doc=JSON.stringify(doc);return vm.runInNewContext('api.documentSceneSource(JSON.parse(doc))',context);},a=source(sdkExamples.managed),b=source(sdkExamples.parameters);
 const engine=()=>{const e=new ConversationNodeAssembler({entries:()=>[api.createVIEGalleryDefinition()],fallbackEntry:()=>undefined},{entries:()=>[api.createVIEGalleryViewDefinition()]},{entries:()=>[],forTarget:()=>undefined});e.activateTarget('vie-gallery');return e;};
 const event=(seq,meta)=>({seq,time:seq,type:'tool/result',data:{turn:1,step:seq,message:{source:{kind:'tool',callId:'call-'+seq}},meta:{kind:'vie',valid:true,revision:1,...meta}}});
 const events=[event(1,{visualId:'a',source:a}),event(2,{visualId:'b',source:b}),event(3,{visualId:'a',source:b,revision:2}),event(4,{visualId:'a',source:a,revision:1}),event(5,{visualId:'a',valid:false,revision:3})];
 const check=e=>{const items=e.get('vie-gallery');assert.equal(items.length,2);assert.deepEqual(Array.from(items,i=>i.id),['a','b']);assert.equal(items[0].source,b);assert.match(items[0].error,/保留原图/);assert.equal(items[0].revision,2);};
 const live=engine();for(const event of events){live.append({event});live.flush();}check(live);
 const cold=engine();cold.replaceWindow(events.map(event=>({event})),false);cold.flush();check(cold);
 const second=engine();assert.equal(second.get('vie-gallery').length,0);
 fs.writeFileSync(path.join(root,'docs/validation/mobile-assembly.json'),JSON.stringify({passed:true,liveReplay:true,coldReplay:true,staleRevisionIgnored:true,failedRevisionPreserved:true,sessionIsolated:true,realHarnessAssembler:true},null,2));console.log('PASS actual Harness gallery target: live and cold history, revision replacement, stale replies and session isolation');
}finally{hook.deregister();}
