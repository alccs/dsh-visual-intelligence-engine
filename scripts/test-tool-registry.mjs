/** Exercise the current Harness turn loop and its real tool registry with a local model fixture. */
import assert from 'node:assert/strict';
import {mkdtempSync} from 'node:fs';
import {createRequire,registerHooks} from 'node:module';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const root=path.resolve(import.meta.dirname,'..');
const runtime=path.resolve(process.env.VIE_DSH_RUNTIME??path.join(root,'.validation/runtime-0.2.2-rc.1'));
const requireRuntime=createRequire(path.join(runtime,'package.json'));
const load=name=>import(pathToFileURL(requireRuntime.resolve('@deepseek-ai/'+name)));
const hook=registerHooks({resolve(name,context,next){
  if(['@deepseek-ai/dsh-tools','zod'].includes(name))return {
    url:pathToFileURL(requireRuntime.resolve(name)).href,shortCircuit:true
  };
  return next(name,context);
}});
const {Context}=await load('cordis');
const {default:LlmRuntime,LlmAdapter,createUserMessage}=await load('dsh-llm');
const {default:SessionStore,SessionId}=await load('dsh-session');
const pluginPath=process.env.VIE_PLUGIN_ENTRY??path.join(root,'package/lib/index.js');
const VIE=await import(pathToFileURL(pluginPath));
process.env.DSH_HOME=mkdtempSync(path.join(root,'.validation/registry-home-'));
const requests=[];
const responses=[];
const visualArguments=JSON.stringify({query:'解释蜗杆传动原理',templateId:'lab.worm'});

class FixtureAdapter extends LlmAdapter {
  async resolveModel(provider,id){return {provider,id,name:id,defaultMaxTokens:2048};}
  async *stream(request){
    requests.push(request);
    const response=responses.shift();
    assert.ok(response,'unexpected model request');
    if(response==='visual'){
      const block={type:'tool-call',id:'worm-'+requests.length,name:'vie_auto',arguments:visualArguments};
      yield {type:'block-start',index:0,blockType:'tool-call'};
      yield {type:'tool-call-delta',index:0,id:block.id,name:block.name,argumentsDelta:visualArguments};
      yield {type:'block-end',index:0,block};
      yield {type:'finish',reason:{kind:'tool-calls'}};
    }else{
      yield {type:'block-start',index:0,blockType:'text'};
      yield {type:'text-delta',index:0,text:'Local fixture response.'};
      yield {type:'block-end',index:0,block:{type:'text',text:'Local fixture response.'}};
      yield {type:'finish',reason:{kind:'stop'}};
    }
  }
}

async function verify({bridge=false,preview=true,mode='auto'}={}){
  const ctx=new Context();
  try{
    await ctx.plugin(LlmRuntime);
    await ctx.plugin(SessionStore);
    for(const name of ['session-projection','system-prompt','tools']){
      await ctx.plugin((await load('dsh-'+name)).default);
    }
    await ctx.plugin(await load('dsh-tool-executor-native'));
    await ctx.plugin((await load('dsh-agent')).default);
    await ctx.plugin((await load('dsh-agent-loop')).default,{agents:[]});
    if(bridge)ctx.provide('dshGo',{panel(){}});
    ctx.tools.register({
      name:'pwsh',description:'Inert fixture tool',
      parameters:{type:'object',properties:{}},
      output:{schema:{type:'string'},render:(_args,value)=>[{type:'text',text:value}]},
      execute:async()=> 'fixture'
    });
    const fiber=ctx.plugin(VIE,{visualMode:mode,...(preview?{}:{mobileImagePreviews:false}),fastMaxRequests:2});
    await fiber.await();
    await new Promise(setImmediate);
    ctx.llm.registerAdapter(['fixture'],new FixtureAdapter());
    const agent=await ctx.agentLoop.create(SessionId('fixture'),{provider:'fixture',model:'fixture'});

    async function turn(text,...script){
      const first=requests.length;
      responses.push(...script);
      agent.followup(createUserMessage({source:{kind:'user'},content:[{type:'text',text}]}));
      await agent.whenIdle();
      const events=agent.session.snapshotEvents();
      const end=events.findLast(event=>event.type==='turn/end');
      assert.equal(end?.data.reason.kind,'completed',JSON.stringify(end?.data.reason));
      assert.equal(responses.length,0);
      return {sent:requests.slice(first),events};
    }
    const toolNames=request=>(request.tools??[]).map(tool=>tool.name);
    const ordinary=await turn('帮我查看运行日志','text');
    assert.ok(toolNames(ordinary.sent[0]).includes('pwsh'));
    assert.equal(toolNames(ordinary.sent[0]).includes('vie_auto'),mode!=='off');
    if(mode==='off'){
      await turn('解释蜗杆传动原理','text');
      return;
    }
    const visual=await turn('解释蜗杆传动原理','visual','text');
    assert.ok(toolNames(visual.sent[0]).includes('vie_auto'));
    assert.ok(!toolNames(visual.sent[0]).includes('pwsh'));
    assert.deepEqual(toolNames(visual.sent[1]),[]);
    const meta=visual.events.findLast(event=>event.type==='tool/result')?.data.meta;
    assert.equal(meta?.valid,true);
    assert.ok(meta.source.includes('surface.end'));
    assert.equal(meta.nativePreviewStatus,bridge&&preview?'image-provided':undefined);
    assert.ok(!visual.sent.some(request=>JSON.stringify(request).includes('此主机支持dsh-go原生图片')));
    const resumed=await turn('帮我查看运行日志','text');
    assert.ok(toolNames(resumed.sent[0]).includes('pwsh'));
    const restoreVIE=agent.ctx.tools.restrict({deny:['vie_explain','vie_auto']});
    try{
      const unavailable=await turn('解释蜗杆传动原理','text');
      assert.ok(toolNames(unavailable.sent[0]).includes('pwsh'));
      assert.ok(!toolNames(unavailable.sent[0]).includes('vie_auto'));
    }finally{
      restoreVIE();
    }
  }finally{
    await ctx.fiber.dispose();
  }
}

try{
  for(const options of [{},{bridge:true},{bridge:true,preview:false},{mode:'off'}]){
    await verify(options);
    console.log('PASS Harness 0.2.2-rc.1 real turns '+JSON.stringify(options));
  }
}finally{
  hook.deregister();
}
