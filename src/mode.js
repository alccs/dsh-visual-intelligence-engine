/** Session preferences are independent of subjects and never change model settings. */
const VIE_MODES=['auto','on','study','off'];
const VIE_NAMES=new Set(['vie_explain','vie_auto','vie_render','vie_compose','vie_story','vie_quick']);
function createVIEMode(defaultMode='auto',snapshot={},persist=()=>{}){
  if(!VIE_MODES.includes(defaultMode))throw Error('Invalid visualMode');
  if(!snapshot||typeof snapshot!=='object'||Array.isArray(snapshot))snapshot={};
  let global=VIE_MODES.includes(snapshot.global)?snapshot.global:defaultMode;
  const sessions=new Map(Object.entries(snapshot.sessions??{}).filter(([id,value])=>id.length<=200&&VIE_MODES.includes(value)).slice(-256));
  return {
    get:agent=>sessions.get(typeof agent==='string'?agent:agent?.session?.id)??global,
    snapshot:()=>({global,sessions:Object.fromEntries(sessions)}),
    set(mode,sessionId){if(!VIE_MODES.includes(mode))throw Error('Use auto, on, study or off');const before=new Map(sessions),prior=global;try{if(sessionId){sessions.delete(sessionId);sessions.set(sessionId,mode);while(sessions.size>256)sessions.delete(sessions.keys().next().value);}else global=mode;persist({global,sessions:Object.fromEntries(sessions)});}catch(error){global=prior;sessions.clear();for(const [id,value]of before)sessions.set(id,value);throw error;}}
  };
}
async function installVIESessionMode(ctx,defaultMode='auto'){
  // Lightweight stubs and old hosts keep the configured mode without filesystem access.
  if(typeof ctx.on!=='function')return createVIEMode(defaultMode);
  const [fs,path,os,crypto]=await Promise.all([import('node:fs'),import('node:path'),import('node:os'),import('node:crypto')]);
  const file=path.join(process.env.DSH_HOME??path.join(os.homedir(),'.dsh'),'dsh-vie-mode.json');let snapshot={};
  try{snapshot=JSON.parse(fs.readFileSync(file,'utf8'));}catch(error){if(error.code!=='ENOENT')ctx.logger?.warn('VIE mode preferences could not be read; using configured default');}
  const baseDir=path.join(path.dirname(file),'vie-baselines-v1'),baselineFile=id=>path.join(baseDir,crypto.createHash('sha256').update(String(id)).digest('hex')+'.json');
  VIE_BASELINE_STORAGE={load(id){const p=baselineFile(id);if(!fs.existsSync(p)||fs.statSync(p).size>1100000)return [];const data=JSON.parse(fs.readFileSync(p,'utf8'));return data.v===1&&Array.isArray(data.entries)?data.entries.slice(-4):[];},save(id,entries){fs.mkdirSync(baseDir,{recursive:true});const target=baselineFile(id),tmp=target+'.'+process.pid+'.tmp';fs.writeFileSync(tmp,JSON.stringify({v:1,entries:entries.slice(-4)}));fs.renameSync(tmp,target);const files=fs.readdirSync(baseDir).filter(n=>/^[a-f0-9]{64}\.json$/.test(n)).map(n=>({path:path.join(baseDir,n),time:fs.statSync(path.join(baseDir,n)).mtimeMs})).sort((a,b)=>b.time-a.time);for(const f of files.slice(64))fs.unlinkSync(f.path);}};
  const mode=createVIEMode(defaultMode,snapshot,value=>{const temporary=file+'.'+process.pid+'.tmp';fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(temporary,JSON.stringify(value)+'\n');fs.renameSync(temporary,file);});
  ctx.inject?.(['commands'],scope=>scope.commands.register({definitionId:'dsh-vie:mode',name:'vie',description:'VIE auto/on/study/off for this chat; global auto/on/study/off sets the default for other chats',input:{hint:'[auto|on|study|off|global auto|global on|global study|global off]'},handler:({agent,rawInput})=>{
    const words=rawInput.trim().split(/\s+/),isGlobal=words[0]==='global',value=isGlobal?words[1]:words[0],sessionId=isGlobal?undefined:agent?.session?.id;
    if(rawInput.trim()==='status')return {kind:'success',text:JSON.stringify(VIE_WORKFLOW_STATS.get(agent)??{status:'No visual request measured in this process'})};
    if(!rawInput.trim())return {kind:'success',text:'VIE: '+mode.get(agent)};
    if(!VIE_MODES.includes(value)||words.length>(isGlobal?2:1)||!isGlobal&&!sessionId)return {kind:'error',text:'Usage: /vie [auto|on|study|off|global auto|global on|global study|global off]'};
    try{mode.set(value,sessionId);return {kind:'success',text:'VIE '+(isGlobal?'默认模式':'本聊天')+'：'+value};}catch(error){return {kind:'error',text:'VIE preference could not be saved: '+error.message};}
  }}));
  // Optional projection only; a missing composer surface does not silently turn an explicit off into on.
  try{
    const {z}=await import('zod');
    ctx.inject?.(['sessionProjections','commands'],scope=>scope.sessionProjections.register({key:'dsh-vie:mode',stateVersion:2,stateSchema:z.object({sessionId:z.string(),pending:z.boolean(),status:z.string()}),init:header=>({sessionId:header.id,pending:false,status:''}),apply:(state,event)=>{
    if(event.type==='user/message'&&visualIntent(event.data?.message??event.data).active&&mode.get(state.sessionId)!=='off')return {...state,status:'正在准备主图…'};
    if(event.type==='tool/call'&&VIE_NAMES.has(event.data?.name))return {...state,status:'正在绘制…'};
    if(event.type==='tool/result'&&event.data?.meta?.kind==='vie')return {...state,status:event.data.meta.valid?'主图已生成':'图形参数需要修复'};
    if(event.type==='turn/end')return {...state,status:event.data?.reason?.reason?.kind==='hook'&&event.data.reason.reason.reason?.includes('VIE_REQUEST_TIMEOUT')?'出图请求超时，已停止；可降低推理档位重试。':''};
    return event.data?.name==='vie'&&event.type==='command/run'?{...state,pending:true}:event.type==='command/done'?{...state,pending:false}:state;
  },wire:{viewSchema:z.object({mode:z.enum(VIE_MODES),pending:z.boolean(),status:z.string()}),view:state=>({mode:mode.get(state.sessionId),pending:state.pending,status:state.status??''})}}));
  }catch(error){ctx.logger?.warn('VIE composer mode indicator unavailable; /vie command and configured mode remain active: '+error.message);}
  return mode;
}
