/** Request-local fast path for self-contained visual explanations, not a topic catalog. */
const VIE_WORKFLOW_STATS=new WeakMap();
const VIE_READ_TOOLS=new Set(['read','read_image','glob','grep','web_fetch','fetch_url','mcp__web__fetch']);
const VIE_FAST_TOOLS=new Set(['vie_explain','vie_auto']);
const VIE_SEARCH_TOOLS=new Set(['web_search','web_fetch','search_web','fetch_url','mcp__web__search','mcp__web__fetch']);
const VIE_CONTINUE_RE=/^(?:继续(?:生成|完成|讲解|解释|绘制|画图)?|接着(?:讲|画)?|continue|go on)[。.!！]?$/i;
/** Bounded streaming recognizer. Never execute model-written protocol text. */
function createVIETextGuard(onIssue=()=>{}){
  const open=/<[｜|]{2}(?:DSML|DSEL)[｜|]{2}\s*calls\s*>/i,close=/<\/[｜|]{2}(?:DSML|DSEL)[｜|]{2}\s*calls\s*>/i;
  let pending='',hidden=false;
  return {push(text,final=false){pending+=text;let out='';
    while(pending){const match=(hidden?close:open).exec(pending);
      if(match){if(!hidden){out+=pending.slice(0,match.index)+'（图形调用格式异常，已拦截源码显示。）';onIssue();}pending=pending.slice(match.index+match[0].length);hidden=!hidden;continue;}
      if(final){if(!hidden)out+=pending;pending='';break;}
      // Hold only a possible delimiter suffix; normal prose streams immediately.
      const at=pending.lastIndexOf('<'),keep=at>=0&&pending.length-at<80?at:pending.length;
      if(!hidden)out+=pending.slice(0,keep);pending=pending.slice(keep);break;
    }return out;}};
}
/** Inspect bounded, public session events only when recovering a truncated turn. */
function visualContinuationHistory(agent,allowShortTopic=false){
  const session=agent?.session;if(typeof session?.eventAt!=='function'||!Number.isSafeInteger(session.seq))return null;
  let truncated=false,timedOut=false,closed=false;const visuals=new Set();
  try{for(let n=session.seq-1;n>=Math.max(0,session.seq-400);n--){const event=session.eventAt(n);if(!event||typeof event.then==='function')return null;const d=event.data??{};
    if(!closed){if(event.type!=='turn/end')continue;closed=true;truncated=d.reason?.kind==='max-tokens';timedOut=d.reason?.kind==='aborted'&&d.reason.reason?.kind==='hook'&&/^VIE_REQUEST_TIMEOUT:/.test(d.reason.reason.reason??'');if(!truncated&&!timedOut)return null;}
    if(event.type==='tool/result'&&d.meta?.kind==='vie'&&d.meta.valid===true)visuals.add(String(d.meta.anchorCallId??d.meta.visualId??d.message?.source?.callId??event.seq));
    if(event.type==='user/message'&&(d.message??d).source?.kind==='user'){const message=d.message??d;const raw=(message.content??[]).filter(b=>b.type==='text').map(b=>b.text??'').join(' ').trim();if(VIE_CONTINUE_RE.test(raw))continue;let intent=visualIntent(message);if(allowShortTopic&&intent.reason==='ambiguous'&&raw&&raw.length<=3000)intent={active:true,reason:'mode-on'};return intent.active?{...intent,truncated,timedOut,visuals,rendered:visuals.size>0,failures:0,searches:0,searchUnavailable:new Set()}:null;}
  }}catch{}return null;
}
function visualIntent(message){
  if(message?.source?.kind!=='user')return {active:false,reason:'non-user'};
  const attachment=(message.content??[]).some(b=>b.type!=='text');
  const raw=(message.content??[]).filter(b=>b.type==='text').map(b=>b.text??'').join('\n').trim();
  if(!raw||raw.length>3000)return {active:false,reason:'ambiguous'};
  if((/(?:最终显示|最终渲染|已完成|打开思考|渲染)/.test(raw)&&/(?:问题|异常|错误|丢失|去掉|删|连在一起|堆|折叠|排查|修复)/.test(raw))||(/(?:图文|正文|文字)/.test(raw)&&/(?:丢失|去掉|删除|连在一起|堆叠|被折叠)/.test(raw)))return {active:false,reason:'development-or-source'};
  if(/只(?:要|用|需)?(?:纯)?文字|纯文字|不要(?:任何)?(?:图|画图|可视化)|不(?:用|使用)VIE|text[ -]only|no visual/i.test(raw))return {active:false,reason:'text-only'};
  const text=raw.replace(/(?:不需要|不用|不要|无需|无须|别)(?:再|先|额外)?(?:读取|搜索|生成|编写|创建|启动|运行|做|进行)?(?:插件源码|源码|安装包|截图|文件|脚本|测试|调试|浏览器|命令)[^，。;；\n]*/g,'');
  const readSources=attachment||/(?:[a-z]:[\\/]|https?:\/\/|\.(?:pdf|docx?|xlsx?|csv|json|html?|py|js|ts)\b|附件|这张图|此图|这份|上传|资料|@\S+)/i.test(text);
  if(/(?:修复|修改|优化|开发|调试|安装|卸载|部署|打包|排查|诊断|执行|运行)(?:.{0,16})(?:插件|源码|仓库|项目|程序|脚本|代码|命令|文件|问题|组件|VIE)|(?:源码|仓库|代码库|这段代码|这个项目).{0,12}(?:修改|修复|开发|调试)|精确仿真|有限元|真实接触线|\b(?:debug|implement|repository)\b/i.test(text))return {active:false,reason:'development-or-source'};
  if(!/解释|讲解|讲讲|介绍|说明|原理|区别|差异|比较|对比|是什么|怎么工作|如何|怎样|为什么|可视化|示意图|图文|演示|画出|绘制|画一|画个|画图|受力图|流程图|\bdraw\b|\bdiagram\b|explain|describe|compare|visuali[sz]e|illustrat|what is|how (?:does|do)|why (?:does|do)/i.test(text))return {active:false,reason:readSources?'source-task':'ambiguous'};
  return {active:true,readSources,reason:'explanation',keepEffort:/深度思考|完整推导|仔细推导|高推理|high reasoning|think hard/i.test(text)};
}
function visualWorkflowOptions(input={}){
  if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid VIE configuration');
  for(const k of Object.keys(input))if(!['visualMode','fastWorkflow','fastEffort','fastMaxTokens','fastMaxRequests','fastBudgetMs','fastMaxVisuals','fastMaxRepairs','fastMaxSearches','fastProseTokens','fastRequestMs'].includes(k))throw Error('Unknown VIE configuration: '+k);
  const o={visualMode:'auto',fastWorkflow:true,fastEffort:'inherit',fastMaxTokens:0,fastMaxRequests:8,fastBudgetMs:60000,fastMaxVisuals:3,fastMaxRepairs:2,fastMaxSearches:2,fastProseTokens:0,fastRequestMs:0,...input};
  if(!['auto','on','study','off'].includes(o.visualMode))throw Error('Invalid visualMode');
  if(typeof o.fastWorkflow!=='boolean'||!['low','inherit'].includes(o.fastEffort))throw Error('Invalid VIE workflow mode');
  if(o.fastMaxTokens!==0&&(!Number.isSafeInteger(o.fastMaxTokens)||o.fastMaxTokens<2048||o.fastMaxTokens>32768))throw Error('Invalid VIE workflow bound: fastMaxTokens');
  if(o.fastProseTokens!==0&&(!Number.isSafeInteger(o.fastProseTokens)||o.fastProseTokens<2048||o.fastProseTokens>32768))throw Error('Invalid VIE workflow bound: fastProseTokens');
  for(const [key,min,max]of [['fastMaxRequests',2,12],['fastBudgetMs',10000,300000],['fastMaxVisuals',1,4],['fastMaxRepairs',1,4],['fastMaxSearches',0,4]])if(!Number.isSafeInteger(o[key])||o[key]<min||o[key]>max)throw Error('Invalid VIE workflow bound: '+key);
  if(o.fastRequestMs!==0&&(!Number.isSafeInteger(o.fastRequestMs)||o.fastRequestMs<10000||o.fastRequestMs>300000))throw Error('Invalid VIE workflow bound: fastRequestMs');
  return o;
}
function createVisualWorkflow(input={},clock=()=>Date.now(),modeFor=()=>input.visualMode??'auto'){
  const options=visualWorkflowOptions(input),states=new WeakMap(),sessions=new WeakMap(),overrides=new WeakMap(),routes=new Map();
  function claim({agent,message,turn}){
    if(!agent||message?.source?.kind!=='user')return;
    const raw=(message.content??[]).filter(b=>b.type==='text').map(b=>b.text??'').join(' ').trim(),previous=states.get(agent);
    if(previous?.timer&&typeof clearTimeout==='function')clearTimeout(previous.timer);
    const continuation=(message.content??[]).every(b=>b.type==='text')&&VIE_CONTINUE_RE.test(raw);
    const resume=continuation?(previous?.active&&(!previous.rendered||previous.truncated)?previous:!previous?visualContinuationHistory(agent,['on','study'].includes(modeFor(agent))):null):null;
    const continuing=!!resume;
    let intent=continuing?{active:true,reason:'continuation',keepEffort:resume.keepEffort,readSources:resume.readSources}:continuation?{active:false,reason:'continuation-without-pending'}:visualIntent(message);
    if(modeFor(agent)==='off')intent={active:false,reason:'mode-off'};
    else if(['on','study'].includes(modeFor(agent))&&intent.reason==='ambiguous'&&raw&&raw.length<=3000)intent={active:true,reason:'mode-on'};
    // A new, explicit user instruction always re-elects this scope; runtime contexts never do.
    const value={...intent,study:modeFor(agent)==='study',active:options.fastWorkflow&&intent.active,turn,started:clock(),searches:resume?.searches??0,requests:0,steps:new Set(),pending:new Map(),rendered:resume?.rendered??false,visuals:new Set(resume?.visuals??[]),failures:resume?.failures??0,allowProtocolText:/DSML|DSEL|工具调用协议|调用格式示例/i.test(raw),fresh:true,resumeAfterTruncation:!!resume?.truncated,resumeAfterTimeout:!!resume?.timedOut,truncated:false,searchUnavailable:new Set(resume?.searchUnavailable??[])};
    states.set(agent,value);if(agent.session&&typeof agent.session==='object')sessions.set(agent.session,value);
  }
  function state(agent){return agent&&states.get(agent);}
  function repairLimit(s){return options.fastMaxRepairs+(s.visuals.size===0?1:0);}
  function closing(s){return s.visuals.size>=options.fastMaxVisuals||s.failures>=repairLimit(s)||s.requests>=options.fastMaxRequests-1;}
  function visualWeight(args){try{const d=args?.document??(args?.spec?JSON.parse(args.spec):null);if(!d||d.controls?.length)return 1;return Math.max(1,(d.blocks??[]).filter(b=>['figure','learning','graphic','chart','visual','experiment'].includes(b.type)||b.kind).length);}catch{return 1;}}
  function allowed(agent,name,args){
    if(modeFor(agent)==='off')return !/^vie_/.test(name);
    const s=state(agent);if(!s?.active)return true;if(s.closingAtAssembly||s.requests>options.fastMaxRequests)return false;
    if(VIE_FAST_TOOLS.has(name))return s.visuals.size+[...s.pending.values()].reduce((a,b)=>a+b,0)+visualWeight(args)<=options.fastMaxVisuals&&s.failures<repairLimit(s);
    if(s.failures>=options.fastMaxRepairs)return false;
    if(s.readSources&&VIE_READ_TOOLS.has(name))return s.visuals.size===0&&s.searches<options.fastMaxSearches;
    if(VIE_SEARCH_TOOLS.has(name))return s.visuals.size===0&&s.searches<options.fastMaxSearches&&clock()-s.started<options.fastBudgetMs&&!s.searchUnavailable.has(name);
    return name==='skill'&&(args===undefined||args?.name==='dsh-vie');
  }
  function guidanceBase(agent){
    const s=state(agent);if(!s?.active)return '';
    if(s.resumeAfterTimeout)return '上一轮被VIE显式超时配置中止。恢复原问题，保留已有图和正文，不重新规划整堂课或重新检索；尚无主图时先交付最小可用图及对应解释，优先type:"learning"数据入口。已有图可继续解释，不重复生成。不声称上一轮已经出图。';
    if(s.resumeAfterTruncation)return '上一轮因输出token上限截断。接着续写未完成的内容，保留已有图形及其原调用锚点，不重画已完成图、不重新检索。仅在剩余图形/修复预算允许且确需补完原任务时调用VIE；完整解释继续使用Harness正文。续写继承Harness的输出和推理设置，不重复套用VIE额度。';
    if(closing(s))return '本轮可视化工具尝试已结束。禁止在正文模拟工具调用、输出DSML/DSEL标签、图形JSON或HTML/SVG源码。由Harness原生正文正常讲解；按问题需要决定篇幅，不限两句话。若主图未成功，如实说明，不声称已显示。';
    if(!s.visuals.size&&s.failures>=options.fastMaxRepairs)return '尚无成功主图，保留最后一次参数纠错机会。只使用vie_explain或vie_auto修正工具反馈中的具体字段，优先简单通用图，不重新检索、不编写外部脚本，不在正文输出伪调用。若仍失败，正常正文结束并如实说明。';
    if(s.visuals.size)return '当前图形已提交视图。先在Harness原生正文讲解这张图；原问题还需另一概念图时，直接调用vie_explain，再写对应正文，形成图→文→图→文。补图和局部修复不要求more:true；无需额外图时正常结束，不凑调用次数。不要把完整解释写进VIE、不重复造图、不再检索。修图可用visualId/baseRevision/changes；visualId不是图片URL。正文不限两句话。';
    const lookup=clock()-s.started>=options.fastBudgetMs||s.searchUnavailable.size?'额外检索已停止或不可用；仍可调用VIE完成主图或修复参数。未核实的品牌/机型细节说明范围，不编造来源。':'';
    return (s.readSources?'先用必要读取工具核对用户资料，然后直接出图，不进入终端开发。':'')+'可视化讲解：先用一句话说明正在画什么；下一步直接用vie_explain生成第一张图，恰好匹配的实验可用vie_auto。每张图后用Harness正文解释图中关键关系，不能仅过渡一句便出下一图。优先原生graphic/chart/Flow，减少手写SVG。变化过程明确分开前→后，箭头连接对应对象，不能将前后工件重叠或画成断裂材料。窄屏用CSS重排或分步查看，标注不低于11px。说明材料、工况与适用范围，不把热锻等同所有锻造；数值注明来源，示意值不能充当工艺限值。每次只画当前段落的一个核心概念，先图→Harness原生正文解释→下一张图→对应正文；通常1张，复杂主题按需2–3张。不要把多个章节画成同一张SVG里的编号小面板、拼贴海报或缩小的多图总览；必须同时比较或共享交互的视图才可并列。补图不要求more，首图成功后仍可继续。VIE只放图、交互、图例与必要短标注，完整解释/公式/列表/表格写Harness正文。任意主题优先用graphic{kind:bars|donut|vectors,title,items}、chart或visual；特殊效果用隔离figure，不限模板。不要读取源码/安装包、写外部脚本或截图开发；visualId仅用于局部修复，不是图片URL。'+lookup;

  }
  function guidance(agent){const s=state(agent);return (s?.active&&s.study?VIE_STUDY_POLICY+'\n':'')+guidanceBase(agent);}
  function assembly(value,{agent}={}){
    if(modeFor(agent)==='off')return {...value,tools:value.tools.filter(t=>!/^vie_/.test(t.name)),sections:value.sections.filter(s=>!s.name?.startsWith('dsh-vie:'))};
    const s=state(agent);if(!s?.active)return value;
    // Missing capability on initial assembly means another scope disabled VIE.
    // A later empty tool set can also be our own closing assembly.
    if(!value.tools.some(t=>VIE_FAST_TOOLS.has(t.name))&&!s.closingAtAssembly){s.active=false;return value;}
    s.closingAtAssembly=closing(s);
    return {...value,tools:s.closingAtAssembly?[]:value.tools.filter(t=>allowed(agent,t.name)),sections:[...value.sections,{name:'dsh-vie:fast-turn',text:guidance(agent),interpolate:false}]};
  }
  function restore(agent,config){
    const saved=overrides.get(agent);if(!saved)return config;
    const out={...config};
    for(const [key,v]of Object.entries(saved.patch))if(out[key]===v){if(Object.hasOwn(saved.original,key))out[key]=saved.original[key];else delete out[key];}
    overrides.delete(agent);return out;
  }
  function request({agent,turn,step},config){
    const s=state(agent);if(!s?.active||s.turn!==turn)return restore(agent,config);
    // Restore only this instance's own override, preserving independent user edits.
    config=restore(agent,config);s.fresh=false;
    if(agent.session?.id){routes.delete(agent.session.id);routes.set(agent.session.id,{agent,s});while(routes.size>64)routes.delete(routes.keys().next().value);}
    const final=closing(s);
    if(!s.steps.has(step)){s.steps.add(step);s.requests++;}
    const record=(out,cap=0)=>{s.requestLimits={provider:out.provider,model:out.model,inheritedMaxTokens:config.maxTokens??null,configuredVIECap:cap,effectiveMaxTokens:out.maxTokens??null,outputLimitSource:out.maxTokens!==config.maxTokens?'vie-explicit':'harness',reasoningEffort:out.reasoningEffort??null,reasoningSource:out.reasoningEffort!==config.reasoningEffort?'vie-explicit':'harness'};VIE_WORKFLOW_STATS.set(agent,{requests:s.requests,...s.requestLimits});return out;};
    if(s.keepEffort||s.resumeAfterTruncation)return record(config);
    let saved=overrides.get(agent);if(!saved){saved={original:{},patch:{}};for(const k of ['maxTokens','reasoningEffort'])if(Object.hasOwn(config,k))saved.original[k]=config[k];overrides.set(agent,saved);}
    // Respect independently changed settings instead of restoring over a new user choice.
    for(const [k,v]of Object.entries(saved.patch))if(config[k]!==v){if(Object.hasOwn(config,k))saved.original[k]=config[k];else delete saved.original[k];}
    const out={...config};
    const cap=s.visuals.size||final?options.fastProseTokens:options.fastMaxTokens;
    if(cap>0){out.maxTokens=Math.min(Number.isSafeInteger(config.maxTokens)?config.maxTokens:cap,cap);saved.patch.maxTokens=out.maxTokens;}
    if(options.fastEffort==='low'&&!s.keepEffort&&['deepseek-account','deepseek-official'].includes(config.provider)&&(!config.reasoningEffort||['high','max'].includes(config.reasoningEffort))){out.reasoningEffort='low';saved.patch.reasoningEffort='low';}
    return record(out,cap);
  }
  function reserve(exec){const s=state(exec.agent);if(!allowed(exec.agent,exec.name,exec.arguments))return false;if(s?.active&&VIE_FAST_TOOLS.has(exec.name))s.pending.set(exec.callId,visualWeight(exec.arguments));return true;}
  function release(exec){state(exec.agent)?.pending.delete(exec.callId);}
  function result(exec,value){
    release(exec);
    const s=state(exec.agent);if(!s?.active)return;
    if(VIE_SEARCH_TOOLS.has(exec.name)||VIE_READ_TOOLS.has(exec.name))s.searches++;
    s.lastTool=exec.name;
    if(VIE_FAST_TOOLS.has(exec.name)){if(value.isError!==true&&value.meta?.kind==='vie'&&value.meta.valid===true){const id=value.meta.anchorCallId??value.meta.visualId??exec.callId??s.visuals.size;for(let i=0;i<visualWeight(exec.arguments);i++)s.visuals.add(i?String(id)+':'+i:id);s.rendered=value.meta.more!==true;if(s.firstGraphicMs===undefined)s.firstGraphicMs=clock()-s.started;}else s.failures++;}
    if(VIE_SEARCH_TOOLS.has(exec.name)&&value.isError===true){const reason=JSON.stringify(value.error??value.content??value.message??'').slice(0,5000);if(/API.?key|credential|ACCOUNT_QUOTA|quota|balance|unauthori[sz]ed|authentication|凭据|密钥|额度/i.test(reason))s.searchUnavailable.add(exec.name);}
    VIE_WORKFLOW_STATS.set(exec.agent,{requests:s.requests,searches:s.searches,repairs:s.failures,visuals:s.visuals.size,firstTextMs:s.firstTextMs,firstGraphicMs:s.firstGraphicMs,elapsedMs:clock()-s.started,...s.requestLimits,truncated:!!s.truncated});
  }

  function observe(session,event){const s=sessions.get(session);if(s&&event.type==='turn/end'&&event.data?.turn===s.turn)s.truncated=event.data.reason?.kind==='max-tokens';}
  async function* stream(call,next){
    const route=routes.get(call.sessionId),agent=route?.agent,s=route?.s;
    if(call.purpose||s?.allowProtocolText||!s?.active||states.get(agent)!==s||modeFor(agent)==='off'){yield* next();return;}
    const guards=new Map();let malformed=false,realCall=false;
    const guard=index=>{if(!guards.has(index))guards.set(index,createVIETextGuard(()=>{malformed=true;s.formatIssues=(s.formatIssues??0)+1;}));return guards.get(index);};
    for await(const chunk of next()){
      if(chunk.type==='tool-call-delta'||chunk.type==='block-end'&&chunk.block?.type==='tool-call')realCall=true;
      if(chunk.type==='text-delta'){const text=guard(chunk.index).push(chunk.text);if(text)yield {...chunk,text};continue;}
      if(chunk.type==='block-end'&&chunk.block?.type==='text'){
        const text=guards.get(chunk.index)?.push('',true);if(text)yield {type:'text-delta',index:chunk.index,text};
        // block-end is authoritative: sanitize independently to prevent raw source restoration.
        const clean=createVIETextGuard(()=>{if(!malformed){malformed=true;s.formatIssues=(s.formatIssues??0)+1;}});yield {...chunk,block:{...chunk.block,text:clean.push(chunk.block.text,true)}};guards.delete(chunk.index);continue;
      }
      if(chunk.type==='finish'){
        for(const [index,g]of guards){const text=g.push('',true);if(text)yield {type:'text-delta',index,text};}guards.clear();
        if(malformed&&!realCall&&!call.signal?.aborted&&chunk.reason?.kind!=='max-tokens'&&chunk.reason?.kind!=='error'&&chunk.reason?.kind!=='aborted'&&!s.formatFeedback&&typeof agent.inject==='function'){
          s.formatFeedback=1;agent.inject({id:'vie-format-'+s.turn,role:'user',source:{kind:'vie-format-check'},content:[{type:'text',text:'VIE_FORMAT_INVALID：上一条响应把工具调用写成了DSML/DSEL正文，已拦截；没有执行该调用。不要复述源码或伪造调用标签。'+(closing(s)?'工具预算已结束，请直接用正常正文完成解释。':'如仍需这张图，使用本次真实提供的vie_explain工具提交document对象；保留已完成的图和解释。只纠正本次格式，不重新检索。')}]});
        }
      }
      yield chunk;
    }
  }
  return {options,claim,state,allowed,guidance,assembly,request,result,observe,stream,reserve,release};
}
function installVisualWorkflow(ctx,options,mode={get:()=>options.visualMode??'auto'}){
  if(typeof ctx.on!=='function'||!ctx.systemPrompt)return;
  const workflow=createVisualWorkflow(options,()=>Date.now(),agent=>mode.get(agent));
  const timers=new Set();
  const finish=s=>{if(!s)return;if(s.timer){clearTimeout(s.timer);timers.delete(s.timer);s.timer=null;}s.removeAbort?.();s.removeAbort=null;};
  ctx.effect?.(()=>()=>{for(const timer of timers)clearTimeout(timer);timers.clear();});
  ctx.systemPrompt.section({name:'dsh-vie:entry',order:2950,interpolate:false,text:context=>mode.get(context?.agent)==='off'?'':VIE_POLICY+(mode.get(context?.agent)==='study'?VIE_STUDY_POLICY:'')+' 用户要求纯文字或开发/调试时遵循该请求。'});
  ctx.on('agent/inbox/claimed',payload=>{if(payload.message?.source?.kind==='user')finish(workflow.state(payload.agent));workflow.claim(payload);});
  ctx.on('session/event',(session,event)=>workflow.observe(session,event));
  ctx.on('llm/stream',(call,next)=>workflow.stream(call,next));
  ctx.on('system-prompt/assemble',async(value,context,next)=>workflow.assembly(await next(),context));
  ctx.on('agent/request',async(payload,next)=>{
    const config=workflow.request(payload,await next()),s=workflow.state(payload.agent);
    finish(s);if(s)s.requestStarted=Date.now();
    if(workflow.options.fastRequestMs>0&&s?.active&&!s.keepEffort&&!s.resumeAfterTruncation&&!s.resumeAfterTimeout&&!s.visuals.size&&typeof payload.agent?.cancel==='function'){
      s.timer=setTimeout(()=>{finish(s);if(workflow.state(payload.agent)!==s||mode.get(payload.agent)==='off')return;s.timedOut=true;payload.agent.cancel({kind:'hook',reason:'VIE_REQUEST_TIMEOUT: 可视化请求超过 '+workflow.options.fastRequestMs+'ms，已按显式超时配置停止；发送继续可恢复，fastRequestMs:0可关闭此限制。'},{keepInbox:true});},workflow.options.fastRequestMs);s.timer.unref?.();timers.add(s.timer);
      const abort=()=>finish(s);payload.signal?.addEventListener('abort',abort,{once:true});s.removeAbort=()=>payload.signal?.removeEventListener('abort',abort);
    }
    return config;
  });
  ctx.on('agent/assistant-stream',({agent,frame})=>{
    const s=workflow.state(agent);if(!s?.active)return;
    if(frame.type==='chunk'&&frame.chunk?.type==='text-delta'&&s.firstTextMs===undefined)s.firstTextMs=Date.now()-s.started;
    if(frame.type==='chunk'&&frame.chunk?.type==='finish'){s.finishReason=frame.chunk.reason?.kind;if(s.finishReason==='max-tokens')s.truncated=true;}
    if(frame.type==='end'){finish(s);VIE_WORKFLOW_STATS.set(agent,{requests:s.requests,searches:s.searches,repairs:s.failures,visuals:s.visuals.size,firstTextMs:s.firstTextMs,firstGraphicMs:s.firstGraphicMs,lastRequestMs:Date.now()-(s.requestStarted??s.started),timedOut:!!s.timedOut,formatIssues:s.formatIssues??0,formatFeedback:s.formatFeedback??0,...s.requestLimits,finishReason:s.finishReason,truncated:!!s.truncated});}
  });
  ctx.on('agent/status',({agent,status})=>{if(status?.kind==='idle')finish(workflow.state(agent));});
  ctx.on('tools/pre-execute',async(exec,next)=>{if(workflow.reserve(exec)){try{const decision=await next();if(decision?.kind==='deny')workflow.release(exec);return decision;}catch(error){workflow.release(exec);throw error;}}return {kind:'deny',reason:'VIE_FAST_PATH: 普通知识讲解请直接使用vie_explain或vie_auto；不进入文件/终端/截图调试。主图已生成时请在Harness正文正常讲解。'};});
  ctx.on('tools/result',(exec,result)=>{workflow.result(exec,result);});
}
