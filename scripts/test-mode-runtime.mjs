/** Actual Cordis, Commands, SessionProjection and Tools with an in-memory Session log adapter. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {createRequire,registerHooks} from 'node:module';import {pathToFileURL} from 'node:url';import {reactiveWave} from './reactive-examples.mjs';
const root=path.resolve(import.meta.dirname,'..'),runtime=createRequire(path.resolve(process.env.VIE_DSH_RUNTIME??path.join(root,'.validation/runtime'),'package.json'));
const home=path.join(root,'.validation/mode-home-'+process.pid);fs.mkdirSync(home,{recursive:true});process.env.DSH_HOME=home;
const hook=registerHooks({resolve(s,c,next){if(['@deepseek-ai/dsh-tools','zod'].includes(s))return {url:pathToFileURL(runtime.resolve(s)).href,shortCircuit:true};return next(s,c);}});
const load=s=>import(pathToFileURL(runtime.resolve(s)).href),{Context}=await load('@deepseek-ai/cordis'),{scopeTarget}=await load('@deepseek-ai/dsh-scope');
const plugin=await import(pathToFileURL(path.join(root,'package/lib/index.js')).href),ctx=new Context(),checks=[],pass=name=>{checks.push({name,passed:true});console.log('PASS '+name);};
for(const s of ['@deepseek-ai/dsh-system-prompt','@deepseek-ai/dsh-tools','@deepseek-ai/dsh-commands','@deepseek-ai/dsh-session-projection'])await ctx.plugin((await load(s)).default);
let fiber=ctx.plugin(plugin);await fiber.await();await new Promise(setImmediate);const signal=new AbortController().signal;
function session(id){const events=[];return {id,header:{id},seq:0,inheritedEventCount:0,snapshotEvents:(start=0,end=events.length)=>events.slice(start,end),eventAt:seq=>events[seq],append(type,data){const event={type,data,seq:this.seq++,time:Date.now()};events.push(event);ctx.emit('session/event',this,event);return event;}};}
const one={id:'mode-one',session:session('one')},two={id:'mode-two',session:session('two')};
const assemble=agent=>ctx.systemPrompt.assemble({agent,scope:agent,signal});
const command=(agent,text)=>ctx.commands.execute(agent,'/'+text,[],signal);
const view=agent=>ctx.sessionProjections.snapshot(agent.session).values['dsh-vie:mode'];
try{
 assert.ok((await assemble(one)).tools.some(t=>t.name==='vie_explain'));assert.equal(view(one).mode,'auto');pass('default auto mode is available through actual Host projection');
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
 const fresh={id:'reopened-agent',session:one.session},freshCarrier=scopeTarget(fresh,fresh);ctx.emit(freshCarrier,'agent/inbox/claimed',{agent:fresh,turn:3,message:{source:{kind:'user'},content:[{type:'text',text:'继续'}]}});const resumedPrompt=await assemble(fresh);assert.match(resumedPrompt.sections.at(-1).text,/续写/);const resumedConfig=await ctx.waterfall(freshCarrier,'agent/request',{agent:fresh,turn:3,step:1,signal},async()=>({provider:'deepseek-account',model:'test',maxTokens:128000,reasoningEffort:'max'}));assert.equal(resumedConfig.maxTokens,128000);assert.equal(resumedConfig.reasoningEffort,'max');pass('real Host restart recovers truncated scope from public session events without lowering output');
 await command(two,'vie global off');const three={id:'third',session:session('three')};assert.ok(!(await assemble(three)).tools.some(t=>t.name==='vie_explain'));assert.equal(view(one).mode,'on');pass('global default applies to unconfigured chats and preserves explicit chat choices');
 const invalid=await command(two,'vie arbitrary');assert.equal(invalid.result.kind,'error');assert.equal(view(two).mode,'off');pass('invalid mode command cannot change the saved choice');
 await fiber.dispose();assert.equal(ctx.commands.view(one).get('vie'),undefined);assert.equal(view(one),undefined);pass('plugin disposal removes commands, projections and hooks');
 fs.writeFileSync(path.join(root,'docs/validation/mode-runtime.json'),JSON.stringify({version:'0.28.0',runtime:'Cordis4 / DSH0.2.1-rc.2',sessionAdapter:'in-memory log; real Commands and SessionProjection services',isolatedHome:true,checks:checks.length,results:checks,externalModelRequests:0},null,2));
}finally{await fiber.dispose();await ctx.fiber.dispose();hook.deregister();}
