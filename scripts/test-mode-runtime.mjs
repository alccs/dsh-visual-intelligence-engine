import {VERSION} from './version-info.mjs';
/** Actual Cordis, Commands, SessionProjection and Tools with an in-memory Session log adapter. */
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import assert from 'node:assert/strict';import {createRequire,registerHooks} from 'node:module';import {pathToFileURL} from 'node:url';import {reactiveWave} from './reactive-examples.mjs';import {flowDocument} from './flow-examples.mjs';
const root=path.resolve(import.meta.dirname,'..'),runtime=createRequire(path.resolve(process.env.VIE_DSH_RUNTIME??path.join(root,'.validation/runtime'),'package.json'));
const home=path.join(root,'.validation/mode-home-'+process.pid);fs.mkdirSync(home,{recursive:true});process.env.DSH_HOME=home;
const hook=registerHooks({resolve(s,c,next){if(['@deepseek-ai/dsh-tools','zod'].includes(s))return {url:pathToFileURL(runtime.resolve(s)).href,shortCircuit:true};return next(s,c);}});
const load=s=>import(pathToFileURL(runtime.resolve(s)).href),{Context,Service}=await load('@deepseek-ai/cordis'),{scopeTarget}=await load('@deepseek-ai/dsh-scope');
const installed=process.argv.includes('--installed'),moduleRoot=installed?path.join(root,JSON.parse(fs.readFileSync(path.join(root,'docs/validation/dsh-cli.json'),'utf8')).temporaryHome,'profiles/web/node_modules/dsh-visual-interactive-engine'):path.join(root,'package');
if(installed)for(const name of ['index','client'])assert.ok(fs.readFileSync(path.join(moduleRoot,'lib',name+'.js')).equals(fs.readFileSync(path.join(root,'package/lib',name+'.js'))),'installed '+name+' differs from build');
const plugin=await import(pathToFileURL(path.join(moduleRoot,'lib/index.js')).href),ctx=new Context(),checks=[],pass=name=>{checks.push({name,passed:true});console.log('PASS '+name);};
for(const s of ['@deepseek-ai/dsh-system-prompt','@deepseek-ai/dsh-tools','@deepseek-ai/dsh-commands','@deepseek-ai/dsh-session-projection'])await ctx.plugin((await load(s)).default);
let fiber=ctx.plugin(plugin);await fiber.await();await new Promise(setImmediate);const signal=new AbortController().signal;
function session(id){const events=[];return {id,header:{id},seq:0,inheritedEventCount:0,snapshotEvents:(start=0,end=events.length)=>events.slice(start,end),eventAt:seq=>events[seq],append(type,data){const event={type,data,seq:this.seq++,time:Date.now()};events.push(event);ctx.emit('session/event',this,event);return event;}};}
const one={id:'mode-one',session:session('one')},two={id:'mode-two',session:session('two')};
const assemble=agent=>ctx.systemPrompt.assemble({agent,scope:agent,signal});
const command=(agent,text)=>ctx.commands.execute(agent,'/'+text,[],signal);
const view=agent=>ctx.sessionProjections.snapshot(agent.session).values['dsh-vie:mode'];
async function checkOperationRouting(){
 const names=['pwsh','plugin_manager','list_bundles'];let executed=0;
 const dispose=names.map(name=>ctx.tools.register({...plugin.createExplainImplementation(),name,description:'Inert maintenance routing regression stub',execute:async()=>{executed++;return {note:'maintenance stub executed',meta:{}};}}));
 try{
  const artifact=path.join(root,("dist/dsh-visual-interactive-engine-"+VERSION+".tgz"));
  for(const mode of ['auto','on','study','off']){
   const agent={id:'ops-'+mode,session:session('ops-'+mode)},carrier=scopeTarget(agent,agent);await command(agent,'vie '+mode);
   let turn=0;
   for(const text of ['安装','@'+artifact+' 安装','把「'+artifact+'」安装到 desktop profile','运行 npm test，然后用图解释失败原因','读取 data.csv，用图展示变化','安装这个插件，然后用图解释原理']){
    ctx.emit(carrier,'agent/inbox/claimed',{agent,turn:++turn,message:{source:{kind:'user'},content:[{type:'text',text}]}});
    const prompt=await assemble(agent);assert.ok(!prompt.sections.some(section=>section.name==='dsh-vie:fast-turn'),mode+': '+text);
    for(const name of names){assert.ok(prompt.tools.some(tool=>tool.name===name),mode+': '+name);assert.notEqual((await ctx.tools.execute({agent,signal,callId:'ops-'+mode+'-'+turn+'-'+name,name,arguments:{}})).isError,true);}
   }
  }
  assert.equal(executed,72);
  const agent={id:'ops-teaching',session:session('ops-teaching')},carrier=scopeTarget(agent,agent);await command(agent,'vie study');ctx.emit(carrier,'agent/inbox/claimed',{agent,turn:1,message:{source:{kind:'user'},content:[{type:'text',text:'讲解插件安装流程'}]}});
  assert.ok(!(await assemble(agent)).tools.some(tool=>tool.name==='pwsh'));const denied=await ctx.tools.execute({agent,signal,callId:'ops-teaching-denied',name:'pwsh',arguments:{}});assert.match(JSON.stringify(denied),/VIE_FAST_PATH/);assert.equal(executed,72);
  pass('installation and mixed operation requests retain tools in every actual chat mode; pure teaching stays visual');
 }finally{dispose.forEach(stop=>stop());}
}
async function checkClientModes(){
 // Use the real bundled client and Cordis dependency access checks. Only the
 // slot surface and RPC transport are adapters; commands and projections use
 // the actual Host above. A plain flip() mock cannot catch a missing inject.
 const clientCtx=new Context(),calls=[],clientOne={id:'client-one',session:session('client-one')},clientTwo={id:'client-two',session:session('client-two')};
 class TestSlots extends Service{
  constructor(context){super(context,'slots');this.rows=[];}
  inject(name,callback){return this.ctx.effect(callback,'test slot '+name);}
  register(options,component){const row={...options,component};return this.ctx.effect(()=>{this.rows.push(row);return ()=>{this.rows.splice(this.rows.indexOf(row),1);};},'test slot registration');}
  entries(name){return this.rows.filter(row=>row.name===name);}
 }
 let client,override;
 const localRequire=createRequire(path.join(root,'package.json'));
 vm.runInNewContext(fs.readFileSync(path.join(moduleRoot,'lib/client.js'),'utf8'),{TextEncoder,console,window:{__ModuleLoader__:{load:({factory})=>{client=factory(localRequire);}}}},{filename:'vie-client.js'});
 await clientCtx.plugin(TestSlots);
 clientCtx.provide('uiConversation',{events:{register:()=>()=>{}}});
 clientCtx.provide('sessions',{});
 const commands={execute:async(sessionId,line,args)=>{calls.push({sessionId,line,args});if(override)return override;const agent=[clientOne,clientTwo].find(agent=>agent.session.id===sessionId);assert.ok(agent,'unknown test session');return {ok:true,value:await ctx.commands.execute(agent,line,args,signal)};}};
 const slots=clientCtx.get('slots'),entries=()=>slots.entries('conversation.input.activity'),settle=async()=>{await new Promise(setImmediate);await new Promise(setImmediate);};
 // Providers must be sibling fibers. A root-provided service is inherited
 // without an inject declaration and would hide the production failure.
 const provide=async(name,value)=>{const provider=clientCtx.plugin({name:'test-'+name,apply:scope=>{scope.provide(name,value);}});await provider.await();return ()=>provider.dispose();};
 const clientFiber=clientCtx.plugin(client);await clientFiber.await();await settle();
 try{
  assert.equal(entries().length,0);assert.ok(slots.entries('tool.call.toolview').length>0);pass('real client keeps graphics available while remote commands are unavailable');
  const commandSlots=slots.entries('conversation.chat.commandview');assert.equal(commandSlots.length,1);assert.equal(commandSlots[0].key,'vie');assert.equal(typeof commandSlots[0].component,'function');pass('real client registers one VIE-only command specialization without remote commands');
  let removeRemote=await provide('remote',{commands}),removeCommands=await provide('remote.commands',commands);await settle();
  assert.equal(entries().length,1);const binding=entries()[0].inject(clientOne.session.id);
  await binding.flip('study');assert.equal(view(clientOne).mode,'study');assert.equal(view(clientTwo).mode,'auto');assert.ok((await assemble(clientOne)).sections.some(section=>section.text.includes('学习模式')));assert.equal(calls.at(-1).sessionId,clientOne.session.id);assert.equal(calls.at(-1).line,'/vie study');assert.equal(calls.at(-1).args.length,0);pass('real client Cordis binding executes study through the Host and updates only its chat');
  for(const mode of ['off','on','auto','study']){await binding.flip(mode);assert.equal(view(clientOne).mode,mode);}await entries()[0].inject(clientTwo.session.id).flip('on');assert.equal(view(clientTwo).mode,'on');assert.equal(view(clientOne).mode,'study');pass('all four menu modes route to the selected session and real projection');
  for(const [response,message]of [[{ok:false,error:{message:'connection unavailable'}},/connection unavailable/],[{ok:true,value:undefined},/未注册/],[{ok:true,value:{result:{kind:'error',text:'mode rejected'}}},/mode rejected/]]){override=response;await assert.rejects(binding.flip('off'),message);assert.equal(view(clientOne).mode,'study');}override=undefined;pass('client reports remote and command failures without changing the saved mode');
  await removeRemote();await settle();assert.equal(entries().length,0);assert.ok(slots.entries('tool.call.toolview').length>0);pass('parent remote loss removes only the mode control');
  removeRemote=await provide('remote',{commands});await settle();assert.equal(entries().length,1);await entries()[0].inject(clientOne.session.id).flip('study');
  await removeCommands();await settle();assert.equal(entries().length,0);removeCommands=await provide('remote.commands',commands);await settle();assert.equal(entries().length,1);await entries()[0].inject(clientOne.session.id).flip('auto');await entries()[0].inject(clientTwo.session.id).flip('auto');pass('remote command reconnection remounts one working control and preserves session routing');
  await clientFiber.dispose();await settle();assert.equal(entries().length,0);assert.equal(slots.entries('tool.call.toolview').length,0);assert.equal(slots.entries('conversation.chat.commandview').length,0);pass('real client disposal removes its mode, graphic and command slots');
 }finally{await clientFiber.dispose();await clientCtx.fiber.dispose();}
}
try{
 assert.ok((await assemble(one)).tools.some(t=>t.name==='vie_explain'));assert.equal(view(one).mode,'auto');pass('default auto mode is available through actual Host projection');
 await checkClientModes();
 await command(one,'vie study');assert.equal(view(one).mode,'study');assert.equal(view(two).mode,'auto');assert.ok((await assemble(one)).sections.some(s=>s.text.includes('学习模式')));pass('study command persists per chat and injects learning guidance');
 const flowProps=result=>result.meta.source.trim().split('\n').map(JSON.parse).find(e=>e.type==='Flow').props;
 for(const [agent,presentation] of [[one,'guided'],[two,'overview']]){const r=await ctx.tools.execute({agent,signal,callId:'flow-'+presentation,name:'vie_explain',arguments:{document:flowDocument()}});assert.equal(r.meta?.valid,true,JSON.stringify(r));assert.equal(flowProps(r).presentation,presentation);}
 const explicit=await ctx.tools.execute({agent:one,signal,callId:'flow-explicit',name:'vie_explain',arguments:{document:flowDocument('overview')}});assert.equal(flowProps(explicit).presentation,'overview');pass('study freezes guided Flow and auto freezes overview; explicit figure choice wins');
 const off=await command(one,'vie off');assert.equal(off.result.kind,'success');assert.equal(view(one).mode,'off');assert.equal(view(one).pending,false);pass('real command lifecycle updates the composer projection');
 let a=await assemble(one);assert.ok(!a.tools.some(t=>t.name.startsWith('vie_')));assert.ok(!a.sections.some(s=>s.name.startsWith('dsh-vie:')&&s.text));pass('off hides all VIE tool schemas and prompt instructions');
 const denied=await ctx.tools.execute({agent:one,signal,callId:'disabled',name:'vie_explain',arguments:{document:reactiveWave}});assert.match(JSON.stringify(denied),/VIE_FAST_PATH/);pass('off denies a direct unadvertised tool execution');
 assert.ok((await assemble(two)).tools.some(t=>t.name==='vie_explain'));assert.equal(view(two).mode,'auto');pass('session preference does not disable another chat');
 const raw=JSON.parse(fs.readFileSync(path.join(home,'dsh-vie-mode.json'),'utf8'));assert.equal(raw.sessions.one,'off');pass('session choice is written to the isolated preference file');
 await fiber.dispose();fiber=ctx.plugin(plugin);await fiber.await();await new Promise(setImmediate);assert.equal(view(one).mode,'off');assert.ok(!(await assemble(one)).tools.some(t=>t.name==='vie_explain'));pass('plugin restart restores the saved preference');
 await command(one,'vie on');assert.equal(view(one).mode,'on');const carrier=scopeTarget(one,one);ctx.emit(carrier,'agent/inbox/claimed',{agent:one,turn:1,message:{source:{kind:'user'},content:[{type:'text',text:'一个新概念'}]}});a=await assemble(one);assert.ok(a.sections.some(s=>s.name==='dsh-vie:fast-turn'));pass('on mode accepts an ambiguous topic without a subject catalog');
 const result=await ctx.tools.execute({agent:one,signal,callId:'reactive-native',name:'vie_explain',arguments:{document:reactiveWave}});assert.equal(result.meta?.valid,true,JSON.stringify(result));assert.match(result.meta.source,/state.derive/);assert.match(result.meta.source,/SegmentedControl/);pass('native derive/layout and controls pass real Harness tool schema');
 one.session.append('user/message',{source:{kind:'user'},content:[{type:'text',text:'画一张受力图'}]});assert.match(view(one).status,/准备/);
 one.session.append('turn/end',{turn:1,reason:{kind:'aborted',reason:{kind:'hook',reason:'VIE_REQUEST_TIMEOUT: test'}}});assert.match(view(one).status,/超时/);pass('real Host projection displays preparation and hook-timeout feedback');
 one.session.append('user/message',{source:{kind:'user'},content:[{type:'text',text:'解释受力图'}]});
 one.session.append('tool/result',{turn:2,step:1,message:{source:{callId:'stored-graphic'}},meta:{kind:'vie',valid:true,anchorCallId:'stored-graphic'}});
 one.session.append('turn/end',{turn:2,reason:{kind:'max-tokens'}});
 await fiber.dispose();fiber=ctx.plugin(plugin);await fiber.await();await new Promise(setImmediate);
 const resumed=await ctx.tools.execute({agent:one,signal,callId:'repair-after-restart',name:'vie_explain',arguments:{visualId:result.meta.visualId,baseRevision:result.meta.revision,changes:[{index:0,block:reactiveWave.blocks[0]}]}});assert.equal(resumed.meta?.valid,true,JSON.stringify(resumed));assert.equal(resumed.meta.revision,result.meta.revision+1);assert.equal(resumed.meta.anchorCallId,'reactive-native');pass('real disk baseline resumes local repair after plugin restart');
 const fresh={id:'reopened-agent',session:one.session},freshCarrier=scopeTarget(fresh,fresh);ctx.emit(freshCarrier,'agent/inbox/claimed',{agent:fresh,turn:3,message:{source:{kind:'user'},content:[{type:'text',text:'继续'}]}});const resumedPrompt=await assemble(fresh);assert.match(resumedPrompt.sections.find(s=>s.name==='dsh-vie:fast-turn').text,/续写/);const resumedConfig=await ctx.waterfall(freshCarrier,'agent/request',{agent:fresh,turn:3,step:1,signal},async()=>({provider:'deepseek-account',model:'test',maxTokens:128000,reasoningEffort:'max'}));assert.equal(resumedConfig.maxTokens,128000);assert.equal(resumedConfig.reasoningEffort,'max');pass('real Host restart recovers truncated scope from public session events without lowering output');
 await checkOperationRouting();
 await command(two,'vie global off');const three={id:'third',session:session('three')};assert.ok(!(await assemble(three)).tools.some(t=>t.name==='vie_explain'));assert.equal(view(one).mode,'on');pass('global default applies to unconfigured chats and preserves explicit chat choices');
 const invalid=await command(two,'vie arbitrary');assert.equal(invalid.result.kind,'error');assert.equal(view(two).mode,'off');pass('invalid mode command cannot change the saved choice');
 await fiber.dispose();assert.equal(ctx.commands.view(one).get('vie'),undefined);assert.equal(view(one),undefined);pass('plugin disposal removes commands, projections and hooks');
 fs.writeFileSync(path.join(root,'docs/validation/mode-runtime.json'),JSON.stringify({version:VERSION,runtime:'Cordis4 / DSH0.2.1-rc.2',installedArtifact:installed,clientBinding:'actual client apply and Cordis with sibling remote providers; slot surface and in-process transport adapters',sessionAdapter:'in-memory log; real Commands and SessionProjection services',isolatedHome:true,checks:checks.length,results:checks,externalModelRequests:0},null,2));
}finally{await fiber.dispose();await ctx.fiber.dispose();hook.deregister();}
