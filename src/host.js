/* VIE v0.29.0 — DSH Host entry. */
import { defineTool } from '@deepseek-ai/dsh-tools';
import { Script as VIEJavaScriptParser } from 'node:vm';
const VIE_SKILL_CONTENT=/* @asset assets/visual-lab-skill.md */ "";
const VIE_COMPONENT_REFERENCE=/* @asset assets/components-reference.md */ "";
/* @include shared/catalog.js */
/* @include shared/experiments.js */
/* @include shared/chart.js */
/* @include shared/chart-sampling.js */
/* @include shared/graphics.js */
/* @include shared/document.js */
/* @include shared/protocol.js */
/* @include shared/quality.js */
/* @include workflow.js */
/* @include mode.js */
/* @include document-tool.js */
/** A valid protocol and a useful teaching visual are separate claims. */
function defineVisualTool(definition){
  return defineTool({...definition,execute:async(...args)=>{
    const value=await definition.execute(...args);
    if(value.meta?.kind==='vie'){
      const exec=args[1];
      if(value.meta.presentationVersion===undefined)try{value.meta={...appearance(args[0]),...value.meta};}catch{}
      if(exec?.callId&&!value.meta.anchorCallId)value.meta.anchorCallId=String(exec.callId);
      value.meta.quality=value.meta.valid?analyzeSceneQuality(value.meta.source):{status:'rejected',checks:['schema'],issues:[{code:'SCENE_REJECTED',message:value.meta.error??value.meta.errors?.[0]??'场景无效'}]};
      if(value.meta.quality.status==='review')value.note+='；范围提示：'+value.meta.quality.issues.map(x=>x.message).join(' ');
    }
    return value;
  }});
}
/** Host plugin: DSH canonical tool-output projections; declarative content only. */
export const name='dsh-Visual-Interactive-Engine';
export const inject=['tools'];
export const OUTPUT_SCHEMA={type:'object',additionalProperties:false,properties:{note:{type:'string',required:true},meta:{type:'json',required:true}}};
/** Default flow is a separate chronological Chat node outside the folded work-process.
 * 'process' is explicitly opt-in and may be folded by DSH; it is NOT native paragraph inline. */
export const PRESENTATION_PARAMETERS={
  placement:{type:'string',enum:['flow','start','tail','process'],description:'Default flow follows each call; start groups before prose; tail/process opt-in.'},
  more:{type:'boolean',description:'Legacy optional continuation hint; later graphics/repairs remain available within the request budget.'},
  caption:{type:'string',description:'Optional short factual takeaway/figure caption (max 140 characters). Do not duplicate the entire explanation.'}
};
function appearance(args){
  if(args?.placement!==undefined&&!['flow','start','tail','process'].includes(args.placement))throw Error('Invalid placement');
  if(args?.more!==undefined&&typeof args.more!=='boolean')throw Error('Invalid more');
  if(args?.caption!==undefined&&(typeof args.caption!=='string'||args.caption.length>140))throw Error('Invalid caption');
  return {presentationVersion:3,placement:args?.placement??'flow',more:args?.more===true,...(args?.caption?.trim()?{caption:args.caption.trim()}:{})};
}

export const PARAMETERS={
  title:{type:'string',description:'A short Chinese title for the interactive explanation.'},
  source:{type:'string',description:'Complete VIE v1 JSONL event stream, one compact JSON object per line. Start with surface.begin, then node.put, state.init/state.derive, finish with surface.end. Put source early in the arguments so the UI can preview as it streams.'},
  ...PRESENTATION_PARAMETERS
};
export function createVIEImplementation(){
  return defineVisualTool({
    name:'vie_render',
    description:'Advanced VIE JSONL stream. Prefer vie_explain. Emit surface.begin, node.put/state.*, surface.end; source streams incrementally. Generated scripts belong only in isolated GenerativeFigure nodes. Max80 nodes/256KB. Default flow follows each call, separated by native prose. Load dsh-vie skill for the advanced protocol.',
    parameters:PARAMETERS,
    output:{
      schema:OUTPUT_SCHEMA,
      render:(_args,value)=>[{type:'text',text:value.note}],
      presentationMeta:(_args,value)=>value.meta
    },
    isConcurrencySafe:()=>true,
    execute: async args=>{
      const title=typeof args.title==='string'?args.title.slice(0,120):'交互可视化';
      let display;try{display=appearance(args);}catch(e){return {note:'VIE 展示参数无效：'+e.message,meta:{kind:'vie',source:'',title,valid:false,error:String(e.message)}};}
      if(typeof args.source!=='string'||new TextEncoder().encode(args.source).length>LIMITS.bytes){return {note:'VIE rejected oversized/invalid source',meta:{kind:'vie',source:'',title,valid:false,errors:['Invalid/oversized source']}};}
      const stream=new VIEStream();stream.push(args.source);stream.finish();
      const snap=stream.snapshot();
      const valid=snap.complete&&snap.tree.length>0&&snap.errors.length===0;
      return {note:valid?`已创建交互界面：${title}`:`VIE 校验未通过：${snap.errors.slice(0,3).join('; ')||'没有有效组件'}`,meta:{kind:'vie',title,source:valid?args.source:'',valid,errors:snap.errors.slice(0,12),...display}};
    },
    presentCall:()=>({card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 交互界面',kind:'other'}),
    presentResult:(_args,result)=>result.isError?undefined:{card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 可交互',kind:'other'}
  });
}
/** Lightweight path: the model spends its tokens on explaining the subject,
 * and chooses a prebuilt interactive experiment with a handful of parameters. */
export function createQuickImplementation(){
 return defineVisualTool({
  name:'vie_quick',
  description:'Optional fast prebuilt experiment. Choose preset and essential inputs; runtime handles UI and calculations. Presets: bitwise,timer,ohm,fraction,probability,vector,motion,quadratic,data,can. Other subjects use vie_explain. Data must be user supplied or labeled as example. Default flow follows the call position.',
  parameters:{
    preset:{type:'string',enum:['motion','quadratic','data','can','bitwise','timer','ohm','fraction','probability','vector'],description:'Required. Which validated teaching experiment to show.'},
    speed:{type:'number',description:'Optional initial m/s for motion (0..40).'},
    time:{type:'number',description:'Optional initial seconds (0..10).'},
    a:{type:'number',description:'Optional quadratic coefficient (-3..3, step 0.1).'},
    dataset:{type:'string',description:'Only for data: optional JSON string {labels:[...],values:[...],unit:,title:}. Provide this ONLY for real data supplied by the user. Otherwise clearly label the demonstration dataset. Max 1200 characters.'},
    clockMHz:{type:'number',description:'CAN peripheral APB1 clock in MHz, default 36.'},
    prescaler:{type:'number',description:'CAN BRP, integer, default 4.'},
    bs1:{type:'number',description:'Scheme A BS1 time quanta, default 14.'},
    bs2:{type:'number',description:'Scheme A BS2 time quanta, default 3.'},
    compareBs1:{type:'number',description:'Scheme B BS1 time quanta, default 15.'},
    compareBs2:{type:'number',description:'Scheme B BS2 time quanta, default 2.'},
    sjw:{type:'number',description:'CAN SJW time quanta, default 1.'},
    ...PRESENTATION_PARAMETERS
  },
  output:{schema:OUTPUT_SCHEMA,render:(_args,value)=>[{type:'text',text:value.note}],presentationMeta:(_args,value)=>value.meta},
  isConcurrencySafe:()=>true,
  execute:async args=>{
    try{
      const display=appearance(args);
      const preset=args.preset;
      if(!Object.hasOwn(PRESET_CATALOG,preset))throw Error('Unknown preset');
      const parameters={};
      for(const name of PRESET_CATALOG[preset].parameters){
        if(args[name]!==undefined)parameters[name]=args[name];
      }
      if(preset==='data' && args.dataset!==undefined){if(typeof args.dataset!=='string'||args.dataset.length>1200)throw Error('Invalid dataset');Object.assign(parameters,JSON.parse(args.dataset));}
      const source=makePresetSource(preset,parameters);
      return {note:`已呈现交互实验：${PRESET_CATALOG[preset].label}`,meta:{kind:'vie',mode:'preset',preset,title:PRESET_CATALOG[preset].label,source,valid:true,...display}};
    }catch(e){return {note:`快速实验参数不合法：${e.message}`,meta:{kind:'vie',valid:false,source:'',error:String(e.message)}};}
  },
  presentCall:()=>({card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 即时实验',kind:'other'}),
  presentResult:(_args,result)=>result.isError?undefined:{card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 交互实验',kind:'other'}
 });
}
/** Flexible path for common subjects: structured facts instead of SVG coordinates. */
export function createComposeImplementation(){
 return defineVisualTool({
  name:'vie_compose',
  description:VIE_VISUAL_POLICY+' Compatibility tool for Flow/RelationGraph/Timeline/Diagram/Animation. spec is JSON. Prefer automatic Flow/Timeline layouts; use vie_explain figure for arbitrary geometry. Diagram supports numeric {$bind:"/path",scale?,offset?}. Animation supports rotate/translate, at most 3 motions per shape and integer cycles -20..20 except 0. Not a physical solver. Max spec64KB.',
  parameters:{state:{type:'string',description:'Optional JSON object of declared numeric state paths, e.g. {"/x":100}; max 4096 bytes.'},derive:{type:'string',description:'Optional JSON object mapping state paths to safe numeric expressions; max 4096 bytes.'},kind:{type:'string',enum:['Flow','RelationGraph','Timeline','Diagram','Animation'],description:'Semantic visual form.'},spec:{type:'string',description:'Compact JSON object for the selected kind, containing facts and labels; never JavaScript, CSS, HTML or arbitrary SVG.'},...PRESENTATION_PARAMETERS},
  output:{schema:OUTPUT_SCHEMA,render:(_args,value)=>[{type:'text',text:value.note}],presentationMeta:(_args,value)=>value.meta},
  isConcurrencySafe:()=>true,
  execute:async args=>{
    try{
      const display=appearance(args);
      if(!VISUAL_KINDS.includes(args.kind)||typeof args.spec!=='string'||new TextEncoder().encode(args.spec).length>65536)throw Error('Invalid visual arguments');
      const parsed=JSON.parse(args.spec);
      for(const key of ['state','derive'])if(args[key]!==undefined&&(typeof args[key]!=='string'||new TextEncoder().encode(args[key]).length>4096))throw Error('Invalid '+key+' argument');
      const source=visualSceneSource(args.kind,parsed,{state:args.state===undefined?{}:JSON.parse(args.state),derive:args.derive===undefined?{}:JSON.parse(args.derive)});
      const stream=new VIEStream();stream.push(source);stream.finish();
      const snap=stream.snapshot();if(!snap.complete||snap.errors.length)throw Error(snap.errors[0]||'Invalid visual scene');
      return {note:`已创建${args.kind}交互图：${parsed.title??'通用示意'}`,meta:{kind:'vie',mode:'compose',title:parsed.title??'通用示意',source,valid:true,...display}};
    }catch(e){return {note:`通用可视化参数无效：${e.message}`,meta:{kind:'vie',valid:false,source:'',error:String(e.message)}};}
  },
  presentCall:()=>({card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 通用可视化',kind:'other'}),
  presentResult:(_args,result)=>result.isError?undefined:{card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 图文解释',kind:'other'}
 });
}
export function createStoryImplementation(){
 return defineVisualTool({
  name:'vie_story',
  description:VIE_VISUAL_POLICY+' Compatibility tool for 1–4 ordered visual panels: spec JSON {title,panels:[{kind,spec,caption?}]}. Keep captions short; opening/takeaway paragraphs remain accepted for historical compatibility. Use vie_explain for new documents and put explanations in Harness prose.',
  parameters:{spec:{type:'string',description:'Serialized JSON story with 1–4 panels, each validated by the generic visual catalog. Short visual captions only; explanations go in Harness prose. Maximum 192KB UTF-8 bytes.'},...PRESENTATION_PARAMETERS},
  output:{schema:OUTPUT_SCHEMA,render:(_a,v)=>[{type:'text',text:v.note}],presentationMeta:(_a,v)=>v.meta},
  isConcurrencySafe:()=>true,
  execute:async args=>{try{
    const display=appearance(args);
    if(typeof args.spec!=='string'||new TextEncoder().encode(args.spec).length>196608)throw Error('Invalid story input');
    const spec=JSON.parse(args.spec),source=storySceneSource(spec);
    const stream=new VIEStream();stream.push(source);stream.finish();const snap=stream.snapshot();if(!snap.complete||snap.errors.length)throw Error(snap.errors.join('; ')||'Invalid story');
    return {note:`已生成图文解释：${spec.title??'交互讲解'}`,meta:{kind:'vie',mode:'story',title:spec.title??'交互讲解',source,valid:true,...display}};
  }catch(e){return {note:`组合图文参数无效：${e.message}`,meta:{kind:'vie',valid:false,source:'',error:String(e.message)}};}
  },presentCall:()=>({card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 图文联动',kind:'other'}),presentResult:(_a,r)=>r.isError?undefined:{card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 图文讲解',kind:'other'}
 });
}
/** Unified single-call routing: a strong match chooses a validated template.
 * Unknown/ambiguous topics fail closed with ranked hints; no fabricated diagram.
 * Explicit templateId is a model choice, still fully schema-validated.
 */
export function createAutoImplementation(){
 return defineVisualTool({
  name:'vie_auto',
  description:'Optional shortcut: lab.planetary/gears/geartrain/worm/wave/process/vector. Other topics use vie_explain. worm: starts integer1..4, wheelTeeth integer20..80; geartrain: teeth array2..6, each18..80, inputSpeed -4..4. No preliminary skill load or UI code needed. Explain in Harness prose.',
  parameters:{
    query:{type:'string',description:'User subject, max500 characters.'},
    templateId:{type:'string',enum:TEMPLATE_IDS,description:'Optional explicit shortcut ID.'},
    parameters:{type:'string',description:'Optional experiment parameters as JSON string, max2000 bytes; no fabricated measurements.'},
    spec:{type:'string',description:'Legacy visual/story JSON string, max192KB.'},
    ...PRESENTATION_PARAMETERS
  },
  output:{schema:OUTPUT_SCHEMA,render:(_a,v)=>[{type:'text',text:v.note}],presentationMeta:(_a,v)=>v.meta},
  isConcurrencySafe:()=>true,
  execute:async args=>{try{
    const display=appearance(args);
    if(typeof args.query!=='string'||!args.query.trim()||args.query.length>500)throw Error('Query must contain 1–500 characters');
    const routing=routeTemplate(args.query);
    if(routing.reason==='user requested no visual')throw Error('User requested text only');
    const id=args.templateId|| (routing.status==='matched'?routing.id:null);
    if(!id)throw Error('No shortcut matched. This topic is still supported: use vie_explain for graphics and explain in Harness prose. Candidate shortcuts: '+routing.candidates.map(c=>c.id).join(', '));
    if(args.parameters!==undefined&&(typeof args.parameters!=='string'||new TextEncoder().encode(args.parameters).length>2000))throw Error('Invalid parameters size');
    if(args.spec!==undefined&&(typeof args.spec!=='string'||new TextEncoder().encode(args.spec).length>196608))throw Error('Invalid spec size');
    const params=args.parameters===undefined?{}:JSON.parse(args.parameters);
    const spec=args.spec===undefined?undefined:JSON.parse(args.spec);
    const scene=buildTemplateScene({templateId:id,parameters:params,spec});
    const p=new VIEStream();p.push(scene.source);p.finish();const snap=p.snapshot();
    if(!snap.complete||snap.errors.length)throw Error(snap.errors[0]||'Invalid scene');
    return {note:'已呈现交互解释：'+scene.title,meta:{kind:'vie',mode:'auto',title:scene.title,templateId:id,route:routing.status==='matched'&&id===routing.id?routing.confidence:'explicit',source:scene.source,valid:true,...display}};
  }catch(e){return {note:'VIE 自动路由失败：'+e.message,meta:{kind:'vie',mode:'auto',source:'',valid:false,error:String(e.message)}};}
  },
  presentCall:()=>({card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 智能匹配',kind:'other'}),
  presentResult:(_a,r)=>r.isError?undefined:{card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 图文解释',kind:'other'}
 });
}
export function apply(ctx,options={}){
  const workflowOptions=visualWorkflowOptions(options);
  ctx.tools.register(createExplainImplementation());
  ctx.tools.register(createQuickImplementation());ctx.tools.register(createVIEImplementation());
  ctx.tools.register(createComposeImplementation());ctx.tools.register(createStoryImplementation());ctx.tools.register(createAutoImplementation());
  const finish=mode=>{
  ctx.inject?.(['systemPrompt'],services=>installVisualWorkflow(services,workflowOptions,mode));
  ctx.inject?.(['skills'],services=>{
    services.skills.register({name:'dsh-vie',description:'Optional detailed reference for VIE visual explanations. Direct vie_explain/vie_auto calls need no preliminary skill load. Any subject; templates optional.',source:'bundled',content:VIE_SKILL_CONTENT+'\n\n'+VIE_COMPONENT_REFERENCE});
  });
  };
  if(typeof ctx.on==='function')return installVIESessionMode(ctx,workflowOptions.visualMode).then(finish);
  finish(createVIEMode(workflowOptions.visualMode));
}

/** Primary route: compose explanation and generated interactions for any topic. */
export function createExplainImplementation(){
  return defineVisualTool({
    name:'vie_explain',
    description:VIE_VISUAL_POLICY+' Native document {title,controls?,derive?,layout?:stack|grid,blocks:[...]}. Blocks: graphic {kind:bars|donut|vectors,title,items:[{label,value}] OR vectors [{label,x,y}],unit?}; chart {title,x:{min,max,label?},y:{min,max,label?},series:[{label,expr OR points:[[x,y],...],keyPoints?:[x],breaks?:[x]}],controls?,bindings?,regions?:[{label,points}],note?}; visual {kind:Flow|RelationGraph|Timeline|Diagram|Animation,spec}; figure {title,html,css?,js?,state?,height?,bindings?} for SVG/Canvas/WebGL. Flow spec {title,nodes:[{id,label,detail?}],edges:[{from,to,label?}]}. Self loops express feedback cycles; use node.detail for descriptions. caption belongs at tool level (document.caption accepted as alias). Controls [{key,label,min,max,value,step?,kind?:slider|number|select|toggle,options?:[{label,value}]}]; numeric toggle 0/1. derive:{s:"A*sin(w*t)"}; unique keys. Chart/figure bindings map local keys to control/derive keys; Diagram coordinates use {$bind:"/derived/s",scale?,offset?}. Figures have no network/libraries; use VIE.state,setState,theme,visible,reducedMotion,reportError and vie:statechange events. Complete blocks preview early. Repair only changed blocks with visualId/baseRevision/changes. Max12 blocks/4 figures, figure60KB. Detailed optional reference: dsh-vie skill. Scientific accuracy requires checking data and calculations.',
    parameters:{document:{type:'object',description:'Preferred native object. Only graphics and necessary short labels; full explanation belongs in Harness prose.',additionalProperties:false,properties:DOCUMENT_PROPERTIES},spec:{type:'string',description:'Legacy JSON string alternative to document; avoid double escaping.'},visualId:{type:'string',description:'Returned baseline ID for changes.'},baseRevision:{type:'integer',description:'Exact baseline revision for changes.'},changes:{type:'array',description:'Atomic block replacements [{index,block}], existing zero-based indices.',items:{type:'object',additionalProperties:false,properties:{index:{type:'integer',required:true},block:{type:'json',required:true}}}},...PRESENTATION_PARAMETERS},
    output:{schema:OUTPUT_SCHEMA,render:(_a,v)=>[{type:'text',text:v.note}],presentationMeta:(_a,v)=>v.meta},
    isConcurrencySafe:()=>true,
    execute:createDocumentExecutor(),
    presentCall:()=>({card:'generic',title:'VIE · 生成主图',kind:'other'}),
    presentResult:(_a,r)=>r.isError?undefined:{card:'generic',title:'VIE · 交互主图',kind:'other'}
  });
}
