/** Full-host test seam: execute the installed Harness registry, never a permissive replacement. */
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..'),runtime=path.resolve(process.env.VIE_DSH_RUNTIME??path.join(root,'.validation/runtime'));
const context={module:{exports:{}},exports:{}};context.exports=context.module.exports;
vm.runInNewContext(fs.readFileSync(path.join(root,'src/vendor/acorn.js'),'utf8'),context);const acorn=context.module.exports;
function walk(node,visit){if(!node||typeof node!=='object')return;if(node.type)visit(node);for(const value of Object.values(node))if(Array.isArray(value)){for(const child of value)if(child?.type)walk(child,visit);}else if(value?.type)walk(value,visit);}
let cachedCore,voiceCall;
export function createHarnessSlotCore(){
 if(!cachedCore){
  const assets=path.join(runtime,'node_modules/@deepseek-ai/dsh-web-frontend/dist/assets'),file=fs.readdirSync(assets).filter(n=>/^index-.*\.js$/.test(n)).find(n=>fs.readFileSync(path.join(assets,n),'utf8').includes('already has a registration'));
  if(!file)throw Error('Installed Harness SlotCore could not be located');
  const source=fs.readFileSync(path.join(assets,file),'utf8'),at=source.indexOf('already has a registration'),globals={queueMicrotask};let registry;
  walk(acorn.parse(source,{ecmaVersion:'latest',sourceType:'module'}),node=>{
   if(['ClassExpression','ClassDeclaration'].includes(node.type)&&node.start<=at&&node.end>=at&&(!registry||node.end-node.start<registry.end-registry.start))registry=node;
   // Preserve immutable empty-array dependencies without depending on minified names.
   const init=node.init;if(node.type==='VariableDeclarator'&&node.id.type==='Identifier'&&init?.type==='CallExpression'&&init.callee.type==='MemberExpression'&&init.callee.object.name==='Object'&&init.callee.property.name==='freeze'&&init.arguments.length===1&&init.arguments[0].type==='ArrayExpression'&&!init.arguments[0].elements.length)globals[node.id.name]=Object.freeze([]);
  });
  if(!registry)throw Error('Installed Harness SlotCore class could not be isolated');
  cachedCore=vm.runInNewContext('('+source.slice(registry.start,registry.end)+')',globals);
 }
 const core=new cachedCore();core.registerFactory({name:'vie-host-test-composer',scope:'session',children:{
  'conversation.input.activity':{kind:'single',scope:'session'},'conversation.input.left':{kind:'list',scope:'session'},'conversation.input.right':{kind:'list',scope:'session'},
  'conversation.chat.commandview':{kind:'keyed',scope:'session'},'conversation.chat.node':{kind:'keyed',scope:'session'},'tool.call.toolview':{kind:'keyed',scope:'session'},'conversation.chat.turnTail':{kind:'list',scope:'session'}
 }},()=>null);return core;
}
export function registerBuiltinVoiceControl(ctx){
 if(!voiceCall){const source=fs.readFileSync(path.join(runtime,'node_modules/@deepseek-ai/dsh-experimental-client-ui-voice-input/lib/client.js'),'utf8');walk(acorn.parse(source,{ecmaVersion:'latest',sourceType:'script'}),node=>{if(node.type==='CallExpression'&&node.callee.type==='MemberExpression'&&node.callee.property.name==='register'&&node.arguments[0]?.type==='ObjectExpression'&&node.arguments[0].properties.some(p=>(p.key?.name??p.key?.value)==='name'&&p.value.value==='conversation.input.activity'))voiceCall=source.slice(node.start,node.end);});if(!voiceCall)throw Error('Installed voice registration could not be located');}
 // Only registration is exercised: no microphone, model or audio RPC is started.
 return vm.runInNewContext(voiceCall,{ctx,NS:'voice-input-test',actions:{},VoiceInput(){}});
}
