/* VIE v0.28.0 — DSH browser entry. Generated includes are resolved by build.mjs. */
window.__ModuleLoader__.load({id:'dsh-visual-interactive-engine',factory:(require)=>{
 const module={exports:{}};const exports=module.exports;
 const VIE_CSS=/* @style styles/base.css,styles/experiments.css,styles/system.css */ "";
/* @include shared/catalog.js */
/* @include shared/experiments.js */
/* @include shared/chart.js */
/* @include shared/chart-sampling.js */
/* @include shared/graphics.js */
/* @include shared/document.js */
/* @include shared/protocol.js */
/* @include shared/preview.js */
/* @include view/generated.js */
/* @include view/checkpoints.js */
/* @include view/chart.js */
/* @include view/mode.js */
const {makeVisualMarkup}=(()=>{
/** Reusable declarative visual renderer. The same pure function powers React and
 * the no-dependency playground. All strings are escaped; input is revalidated.
 */
const esc=x=>String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const palette={primary:'var(--vie-primary,#4d82d6)',secondary:'var(--vie-secondary,#149f91)',accent:'var(--vie-accent,#d58b16)',muted:'var(--vie-muted,#8291a2)',warning:'var(--vie-warning,#cf6854)'};
const fillPalette=Object.fromEntries(Object.entries(palette).map(([key,color])=>[key,'color-mix(in srgb,'+color+' 12%,var(--vie-bg,#fff))']));
const color=k=>palette[k]??palette.primary;
const bg=k=>fillPalette[k]??fillPalette.primary;
const roleTone={input:'primary',output:'secondary',fixed:'warning',important:'accent',step:'primary',default:'muted',neutral:'muted'};
const svgOpen=(w,h,title)=>`<svg class="vie-visual-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}" preserveAspectRatio="xMidYMid meet"><defs><marker id="vie-arrow-head" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L7 3.5L0 7Z" fill="#8e9cac"/></marker></defs>`;
const text=(x,y,label,extra='')=>`<text x="${x}" y="${y}" ${extra}>${esc(label)}</text>`;
/* @include view/flow.js */
function graphSVG(spec,selected,compact=false){
  const W=compact?320:680,H=compact?310:340,cx=W/2,cy=compact?148:162;
  const loc=new Map();const count=spec.nodes.length;
  spec.nodes.forEach((n,i)=>{
    if(spec.layout==='grid'){
      const columns=compact?2:Math.ceil(Math.sqrt(count));
      const rows=Math.ceil(count/columns);
      const gapX=(W-(compact?110:170))/Math.max(1,columns-1),gapY=(H-92)/Math.max(1,rows-1);
      loc.set(n.id,{x:columns===1?cx:(compact?55:85)+(i%columns)*gapX,y:rows===1?cy:46+Math.floor(i/columns)*gapY});
    }else{
      const a=(2*Math.PI*i/count)-Math.PI/2;
      loc.set(n.id,{x:cx+Math.cos(a)*(compact?108:236),y:cy+Math.sin(a)*(compact?92:103)});
    }
  });
  const edgeHTML=spec.edges.map(e=>{
    const a=loc.get(e.from),b=loc.get(e.to);
    if(e.from===e.to){const direction=a.x>W/2?-1:1,x=a.x+direction*(compact?45:57),reach=direction*(compact?46:70),label=e.label?wrappedText(x+reach*.6,a.y,e.label,compact?48:90,10,2,'fill="var(--vie-muted)"'):'';return `<path data-vie-self-loop="true" d="M${x} ${a.y-12}C${x+reach} ${a.y-52} ${x+reach} ${a.y+52} ${x} ${a.y+12}" fill="none" stroke="#9faebb" stroke-width="1.6" ${e.kind==='line'?'':'marker-end="url(#vie-arrow-head)"'}><title>${esc(e.label??'')}</title></path>${label}`;}
    const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1;
    const sx=a.x+dx/d*(compact?29:37),sy=a.y+dy/d*(compact?25:29),ex=b.x-dx/d*(compact?30:40),ey=b.y-dy/d*(compact?25:32);
    const mx=(sx+ex)/2,my=(sy+ey)/2;
    return `<line x1="${sx.toFixed(2)}" y1="${sy.toFixed(2)}" x2="${ex.toFixed(2)}" y2="${ey.toFixed(2)}" stroke="#9faebb" stroke-width="1.6" ${e.kind==='line'?'':'marker-end="url(#vie-arrow-head)"'}/>${e.label&&!compact?`<rect x="${(mx-42).toFixed(2)}" y="${(my-12).toFixed(2)}" width="84" height="20" rx="9" fill="#fff" fill-opacity=".95"/>${text(mx.toFixed(2),(my+2).toFixed(2),e.label,'font-size="10" text-anchor="middle" fill="#647587"')}`:''}`;
  }).join('');
  const vertices=spec.nodes.map(n=>{
    const p=loc.get(n.id),tone=roleTone[n.role]||'primary',active=selected===n.id;
    return `<g data-vie-item="${esc(n.id)}" tabindex="0" role="button" aria-label="${esc(n.label)}" class="vie-svg-item${active?' is-active':''}" style="cursor:pointer"><rect x="${(p.x-(compact?45:57)).toFixed(2)}" y="${(p.y-(compact?23:27)).toFixed(2)}" width="${compact?90:114}" height="${compact?46:54}" rx="13" fill="${bg(tone)}" stroke="${active?color(tone):'#cedae4'}" stroke-width="${active?2.6:1.2}"/>${wrappedText(p.x,p.y+4,n.label,compact?90:114,compact?11:12,3,'font-weight="600" fill="#34485d"')}</g>`;
  }).join('');
  return svgOpen(W,H,spec.title).replace('class="vie-visual-svg"',`class="vie-visual-svg ${compact?'vie-visual-mobile-svg':'vie-visual-desktop-svg'}"`)+edgeHTML+vertices+'</svg>';
}
function shapeSVG(s,selected,index){
  const c=color(s.tone),fill=s.fill===false?'none':bg(s.tone),sw=s.strokeWidth??1.8;
  let inner='';
  const base=`stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
  if(s.k==='circle')inner=`<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" fill="${fill}" ${base}/>`;
  else if(s.k==='ellipse')inner=`<ellipse cx="${s.cx}" cy="${s.cy}" rx="${s.rx}" ry="${s.ry}" fill="${fill}" ${base}/>`;
  else if(s.k==='rect')inner=`<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="${s.rx??6}" ry="${s.ry??s.rx??6}" fill="${fill}" ${base}/>`;
  else if(s.k==='line'||s.k==='arrow')inner=`<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" ${base} ${s.k==='arrow'?'marker-end="url(#vie-arrow-head)"':''}/>`;
  else if(s.k==='polyline')inner=`<polyline points="${s.points.map(p=>p.join(',')).join(' ')}" fill="none" ${base}/>`;
  else if(s.k==='path')inner=`<path d="${esc(s.d)}" fill="${s.fill?fill:'none'}" ${base}/>`;
  else inner=text(s.x,s.y,s.t,`fill="${c}" font-size="15" font-weight="560" text-anchor="${s.anchor??'start'}"`);
  const label=s.label||s.t;
  return s.id?label?`<g data-vie-item="${esc(s.id)}" data-vie-shape="${esc(s.id)}" tabindex="0" role="button" aria-label="${esc(label)}" class="vie-svg-item${selected===s.id?' is-active':''}">${inner}</g>`:`<g data-vie-shape="${esc(s.id)}">${inner}</g>`:inner;
}
function diagramSVG(spec,selected){
  return svgOpen(spec.width,spec.height,spec.title)+spec.shapes.map((s,i)=>shapeSVG(s,selected,i)).join('')+'</svg>';
}
/** Numeric state bindings resolve to bounded finite SVG coordinates only. */
function resolveVisual(input,kind,values){
  const resolved=validateVisualSpec(kind,input);
  const limited=[];
  const read=coordinate=>{
    if(!coordinate||typeof coordinate!=='object'||!Object.hasOwn(coordinate,'$bind'))return coordinate;
    const n=values[coordinate.$bind];
    if(typeof n!=='number'||!Number.isFinite(n)){limited.push(coordinate.$bind);return 0;}
    const result=n*(coordinate.scale??1)+(coordinate.offset??0);
    if(!Number.isFinite(result))throw Error('Diagram binding is not finite: '+coordinate.$bind);
    if(Math.abs(result)>1200)limited.push(coordinate.$bind);
    return Math.max(-1200,Math.min(1200,result));
  };
  const live=value=>typeof value==='string'?interpolateText(value,values):value;
  return {...resolved,get _limited(){return limited;},title:live(resolved.title),subtitle:live(resolved.subtitle),
    ...(resolved.nodes?{nodes:resolved.nodes.map(item=>({...item,label:live(item.label),detail:live(item.detail)}))}:{}),
    ...(resolved.items?{items:resolved.items.map(item=>({...item,label:live(item.label),detail:live(item.detail),at:live(item.at)}))}:{}),
    ...(resolved.edges?{edges:resolved.edges.map(item=>({...item,label:live(item.label)}))}:{}),
    ...(resolved.shapes?{shapes:resolved.shapes.map(shape=>Object.fromEntries(Object.entries(shape).map(([key,value])=>{
      const v=key==='t'?live(value):read(value);
      // Signed numeric bindings can temporarily cross zero. Clamp the shape,
      // but expose the fact that clipping occurred in the figure's note.
      if(['w','h','r','rx','ry'].includes(key)&&typeof v==='number'){
        const cap=shape.k==='rect'&&['rx','ry'].includes(key)?200:1200;
        if(v<0||v>cap)limited.push(key);
        return [key,Math.max(0,Math.min(cap,v))];
      }
      return [key,v];
    })))}:{})
  };
}
/** Returns trusted HTML only after strict validation. User labels are XML-escaped. */
function makeVisualMarkup(kind,input,selected='',values={}){
  const s=resolveVisual(input,kind,values);
  const selectedId=kind==='Timeline'?s.items.find(i=>i.id===selected)?.id:(kind==='Diagram'||kind==='Animation')?s.shapes.find(i=>i.id===selected)?.id:s.nodes.find(i=>i.id===selected)?.id;
  const chosen=selectedId||'';
  let visual='';
  if(kind==='Flow')visual=flowSVG(s,chosen)+flowSVG(s,chosen,true);
  if(kind==='RelationGraph')visual=graphSVG(s,chosen)+graphSVG(s,chosen,true);
  if(kind==='Diagram'||kind==='Animation')visual=diagramSVG(s,chosen);
  if(kind==='Timeline')visual=`<div class="vie-timeline-list" role="list">${s.items.map((v,i)=>`<button type="button" role="listitem" class="vie-timeline-item${chosen===v.id?' is-active':''}" data-vie-item="${esc(v.id)}"><span class="vie-timeline-step">${i+1}</span><span class="vie-timeline-when">${esc(v.at)}</span><strong>${esc(v.label)}</strong></button>`).join('')}</div>`;
  const all=kind==='Timeline'?s.items:(kind==='Diagram'||kind==='Animation')?s.shapes.filter(i=>i.id&&(i.label||i.t)).map(i=>({id:i.id,label:i.label||i.t,detail:i.detail})):s.nodes;
  const found=all.find(n=>n.id===selectedId);
  const info=found?`<div class="vie-visual-selected" role="status"><strong>${esc(found.label)}</strong><span>${esc(found.detail??'已选中')}</span></div>`:`<div class="vie-visual-hint">${s.representation==='pitch-circles'?'分度圆示意 · 不表示真实齿形或接触校核':kind==='Animation'?'运动示意 · 按声明的几何变换播放':kind==='Diagram'?'示意图 · 数据依据与适用范围见图注':kind==='Timeline'?'点击事件查看详细信息':'点击图中的节点查看说明'}</div>`;
  const accuracy=s.accuracy&&s.accuracy!=='schematic'?`<span class="vie-visual-accuracy">${s.accuracy==='validated'?'输入标注 · 待独立校核':'输入标注 · 计算结果'}</span>`:'';
  const zoomTools=(kind==='Diagram'||kind==='Animation')?'<div class="vie-visual-zoom" role="group" aria-label="图形缩放"><button type="button" data-vie-zoom="out" aria-label="缩小图形">−</button><button type="button" data-vie-zoom="in" aria-label="放大图形">＋</button><button type="button" data-vie-zoom="fit">适合宽度</button><output data-vie-zoom-value aria-label="相对适合宽度的缩放">100%</output></div>':'';
  return `<section class="vie-visual-panel" data-vie-visual="${kind}"><div class="vie-visual-heading"><strong>${esc(s.title)}</strong>${accuracy}</div>${s.subtitle?`<p class="vie-visual-subtitle">${esc(s.subtitle)}</p>`:''}${zoomTools}<div class="vie-visual-content">${visual}</div>${kind==='Animation'?'<div class="vie-animation-controls"><button type="button" data-vie-play aria-label="暂停或播放动画">暂停</button><input type="range" min="0" max="1000" step="1" value="0" aria-label="动画时间进度" data-vie-scrub /><span data-vie-time>0%</span><button type="button" data-vie-restart>重播</button></div>':''}${s._limited?.length?`<p class="vie-visual-warning" role="status">部分动态坐标暂不可用或超出范围，已使用占位／截断值；该形状仅供示意。</p>`:''}${info}${(kind==='Diagram'||kind==='Animation')&&all.length?`<div class="vie-visual-legend">${all.map(n=>`<button type="button" data-vie-item="${esc(n.id)}" class="${chosen===n.id?'is-active':''}">${esc(n.label)}</button>`).join('')}</div>`:''}${kind==='Flow'||kind==='RelationGraph'?`<div class="vie-visual-mobile-list">${s.nodes.map(n=>`<button type="button" data-vie-item="${esc(n.id)}" class="${chosen===n.id?'is-active':''}">${esc(n.label)}</button>`).join('')}</div>`:''}</section>`;
}

return {makeVisualMarkup};
})();
let svgScopeSequence=0;
function scopeSvgMarkup(markup,prefix){
  let index=0;
  return markup.replace(/<svg\b[\s\S]*?<\/svg>/g,svg=>{
    const ids=new Map();for(const match of svg.matchAll(/\sid="([\w-]+)"/g))ids.set(match[1],prefix+'-'+index+'-'+match[1]);index++;
    for(const [old,id]of ids)svg=svg.replaceAll('id="'+old+'"','id="'+id+'"').replaceAll('url(#'+old+')','url(#'+id+')');return svg;
  });
}
/** VIE SceneStore: external, observable source of truth.
 * No React or DSH dependency. All scene revisions are atomic; rejected updates
 * never mutate the published parser. Model-originated source is never executed.
 */
const own=(object,key)=>Object.hasOwn(object,key);
const plain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
const SIZE_LIMIT=LIMITS.bytes;
const MAX_PATCH_CHANGES=24;
const MAX_CHECKPOINT_BYTES=2*SIZE_LIMIT+65536;
const getId=source=>{const first=source.trimStart().split('\n',1)[0];try{const obj=JSON.parse(first);return obj.op==='surface.begin'&&typeof obj.id==='string'?obj.id:null;}catch{return null;}};
const parse=source=>{const p=new VIEStream();p.push(source);return p;};
const finalized=source=>{const p=parse(source);p.finish();return p;};
const copyValue=value=>JSON.parse(JSON.stringify(value));

class SceneStore {
  constructor(source=''){
    this.source='';this.parser=new VIEStream();this.version=0;
    this.revision=0;this.listeners=new Set();this.lastError=null;this.localState=Object.create(null);this.figureErrors=Object.create(null);
    if(source)this.updateSource(source);
  }
  subscribe(listener){if(typeof listener!=='function')throw Error('Listener required');this.listeners.add(listener);return ()=>this.listeners.delete(listener);}
  getVersion(){return this.version;}
  snapshot(){return {...this.parser.snapshot(),revision:this.revision,storeError:this.lastError};}
  context(){const summary=this.parser.interactionContext(),experiments={},figures={};for(const node of this.parser.scene.nodes.values()){if(node.type==='InteractiveScene')experiments[node.id]=experimentContext(node.props,this.localState[node.id]);if(node.type==='Chart')figures[node.id]={title:node.props.title,state:this.local(node.id)??validateChartState(node.props)};if(node.type==='GenerativeFigure')figures[node.id]={title:node.props.title,state:this.local(node.id)??node.props.state};}return {...summary,revision:this.revision,interactiveState:copyValue(this.localState),experiments,figures,figureErrors:{...this.figureErrors}};}
  setFigureError(nodeId,message){if(this.figureErrors[nodeId]===(message||undefined))return;if(message)this.figureErrors[nodeId]=String(message).slice(0,1200);else delete this.figureErrors[nodeId];this.emit();}
  emit(){this.version++;for(const cb of this.listeners)cb();}
  modifiedValues(){const result=Object.create(null);for(const path of this.parser.modified){if(own(this.parser.scene.state,path))result[path]=this.parser.scene.state[path];}return result;}
  reconcileLocal(parser){
    const next=Object.create(null);
    for(const [id,value] of Object.entries(this.localState)){
      const node=parser.scene.nodes.get(id),previous=this.parser.scene.nodes.get(id);
      if(!node||node.type!==previous?.type)continue;
      try{if(node.type==='GenerativeFigure'&&JSON.stringify(previous.props)!==JSON.stringify(node.props))continue;next[id]=node.type==='GenerativeFigure'?validateFigureState(value):node.type==='Chart'?validateChartState(node.props,value):node.type==='InteractiveScene'?validateExperimentSnapshot(node.props,value):copyValue(value);}catch{/* A replacement definition can invalidate old interactive inputs. */}
    }
    return next;
  }
  /** Streaming chunks should be passed as the accumulated source string.
   * A preview->final replacement preserves validated user input only if its
   * scene identity is the same. Otherwise previous state is discarded.
   */
  updateSource(source){
    if(typeof source!=='string'||new TextEncoder().encode(source).length>SIZE_LIMIT)throw Error('Scene source too large');
    if(source===this.source)return false;
    // True append-only flow: parse *only* the newly arrived bytes, retaining
    // committed controls and user edits. The React adapter invokes this in an
    // effect, never during render. Full replacement is transactional below.
    if(this.source && source.startsWith(this.source) && !this.parser.finished){
      this.parser.push(source.slice(this.source.length));
      this.localState=this.reconcileLocal(this.parser);
      this.source=source;this.revision++;this.emit();return true;
    }
    const sameScene=this.parser.scene.id!==null&&getId(source)===this.parser.scene.id;
    const priorValues=sameScene?this.modifiedValues():{};
    const parser=parse(source);
    for(const [path,value] of Object.entries(priorValues)){
      if(own(parser.scene.state,path))try{parser.set(path,value);}catch{/* updated constraints win */}
    }
    this.localState=sameScene?this.reconcileLocal(parser):Object.create(null);
    this.figureErrors=Object.fromEntries(Object.entries(this.figureErrors).filter(([id])=>sameScene&&parser.scene.nodes.get(id)?.type==='GenerativeFigure'));this.source=source;this.parser=parser;this.lastError=null;this.revision++;this.emit();return true;
  }
  local(nodeId){const node=this.parser.scene.nodes.get(nodeId),computed=this.parser.snapshot().values;if(node?.type==='GenerativeFigure'&&node.props.bindings)return validateFigureState({...node.props.state,...(this.localState[nodeId]??{}),...Object.fromEntries(Object.entries(node.props.bindings).map(([key,path])=>[key,Number.isFinite(computed[path])?computed[path]:null]))});if(node?.type==='Chart'&&(node.props.controls.some(c=>c.bind)||(node.props.inputs??[]).length))return validateChartState(node.props,{...(this.localState[nodeId]??{}),...Object.fromEntries([...node.props.controls.filter(c=>c.bind),...(node.props.inputs??[])].map(c=>[c.key,Object.hasOwn(computed,c.bind)?computed[c.bind]:NaN]))});return own(this.localState,nodeId)?copyValue(this.localState[nodeId]):null;}
  setLocal(nodeId,value){
    const node=this.parser.scene.nodes.get(nodeId);
    if(!node||!['CanTimingLab','InteractiveLab','InteractiveScene','GenerativeFigure','Chart'].includes(node.type))throw Error('Unknown interactive node');
    if(node.type==='Chart'){const clean=validateChartState(node.props,value);for(const c of node.props.controls.filter(c=>c.bind)){for(const other of this.parser.scene.nodes.values())if(other.type==='Chart')for(const peer of other.props.controls.filter(x=>x.bind===c.bind))if(clean[c.key]<peer.min||clean[c.key]>peer.max)throw Error('Shared chart parameter out of range');}const sharedChanged=node.props.controls.some(c=>c.bind&&this.parser.scene.state[c.bind]!==clean[c.key]);for(const c of node.props.controls.filter(c=>c.bind))this.parser.set(c.bind,clean[c.key]);if(!sharedChanged&&JSON.stringify(this.localState[nodeId])===JSON.stringify(clean))return;this.localState[nodeId]=copyValue(clean);this.revision++;this.emit();return;}
    if(node.type==='GenerativeFigure'){const clean=validateFigureState(value);const writes=[];for(const [key,path]of Object.entries(node.props.bindings??{})){if(!path.startsWith('/shared/')||!Object.hasOwn(clean,key)||Object.is(clean[key],this.parser.scene.state[path]))continue;const constraint=sliderConstraints(this.parser.scene.nodes).get(path);if(!constraint)throw Error('Missing bound figure control');assertSliderValue(constraint,clean[key],'Figure shared parameter');writes.push([path,clean[key]]);}for(const [path,v]of writes)this.parser.set(path,v);if(!writes.length&&JSON.stringify(this.localState[nodeId])===JSON.stringify(clean))return;this.localState[nodeId]=copyValue(clean);this.revision++;this.emit();return;}
    if(node.type==='InteractiveScene'){const clean=validateExperimentSnapshot(node.props,value);if(JSON.stringify(this.localState[nodeId])===JSON.stringify(clean))return;this.localState[nodeId]=copyValue(clean);this.revision++;this.emit();return;}
    if(!plain(value)||JSON.stringify(value).length>2048)throw Error('Invalid interactive state');
    // Restrict persisted local state to small JSON primitives and lists.
    for(const [key,item] of Object.entries(value)){
      if(!/^[A-Za-z][\w-]{0,40}$/.test(key)||!(typeof item==='boolean'||
         typeof item==='string'&&item.length<80||typeof item==='number'&&Number.isFinite(item)||
         Array.isArray(item)&&item.length<=12&&item.every(v=>typeof v==='number'&&Number.isFinite(v))||
         plain(item)&&Object.keys(item).length<=12&&Object.values(item).every(v=>typeof v==='number'&&Number.isFinite(v))))throw Error('Unsupported interactive state value');
    }
    if(JSON.stringify(this.localState[nodeId])===JSON.stringify(value))return;
    this.localState[nodeId]=copyValue(value);this.revision++;this.emit();
  }
  set(path,value){
    // Repeating a value is not an interaction change. Avoid invalidating
    // every subscribed React component or recomputing dependent visuals.
    if(own(this.parser.scene.state,path)&&Object.is(this.parser.scene.state[path],value))return false;
    this.parser.set(path,value);this.revision++;this.lastError=null;this.emit();return true;
  }
  reset(path){
    // A reset still clears modified status; a no-op only when both value
    // and modification tracking already equal the default.
    if(own(this.parser.defaults,path)&&Object.is(this.parser.scene.state[path],this.parser.defaults[path])&&!this.parser.modified.has(path))return false;
    this.parser.reset(path);this.revision++;this.lastError=null;this.emit();return true;
  }
  /** Patches require a completed, validated baseline and exact revision.
   * Allowed changes: state.set, node.put, node.remove. No arbitrary path mutation.
   * The implementation replays all events and validates before publishing.
   */
  patch(request){
    if(!plain(request))throw Error('Invalid scene patch');
    if(request.sceneId!==this.parser.scene.id)throw Error('Scene ID mismatch');
    if(!Number.isSafeInteger(request.baseRevision)||request.baseRevision!==this.revision)throw Error('Stale scene revision');
    if(!Array.isArray(request.changes)||request.changes.length<1||request.changes.length>MAX_PATCH_CHANGES)throw Error('Invalid patch change count');
    const baseline=finalized(this.source);
    if(!baseline.snapshot().complete)throw Error('Cannot patch incomplete scene');
    const events=this.source.trim().split('\n').map(line=>JSON.parse(line));
    if(events.at(-1)?.op!=='surface.end')throw Error('Invalid surface ending');
    const newEvents=[];
    const writes=[];
    for(const change of request.changes){
      if(!plain(change))throw Error('Invalid patch operation');
      if(change.op==='state.set'){
        if(typeof change.path!=='string'||!own(baseline.scene.state,change.path))throw Error('Patch target state missing');
        writes.push([change.path,change.value]);
      }else if(change.op==='node.put'){
        if(!plain(change.node)||change.node.op!=='node.put')throw Error('Invalid node patch');
        newEvents.push({...copyValue(change.node),v:1});
      }else if(change.op==='node.remove'){
        if(typeof change.id!=='string'||!baseline.scene.nodes.has(change.id))throw Error('Node does not exist');
        newEvents.push({v:1,op:'node.remove',id:change.id});
      }else throw Error('Disallowed patch operation');
    }
    const end=events.pop();
    const nextSource=[...events,...newEvents,end].map(e=>JSON.stringify(e)+'\n').join('');
    if(new TextEncoder().encode(nextSource).length>SIZE_LIMIT)throw Error('Patch exceeds source limit');
    const next=finalized(nextSource);
    let result=next.snapshot();if(!result.complete)throw Error('Invalid scene patch: '+result.errors.join('; '));
    for(const [path,value] of Object.entries(this.modifiedValues())){
      if(own(next.scene.state,path))try{next.set(path,value);}catch{/* cannot keep invalid previous value */}
    }
    for(const [path,value] of writes)next.set(path,value);
    result=next.snapshot();if(!result.complete||result.errors.length)throw Error('Invalid scene patch state');
    for(const id of Object.keys(this.localState))if(!next.scene.nodes.has(id))delete this.localState[id];
    this.parser=next;this.source=nextSource;this.revision++;this.lastError=null;this.emit();
    return this.snapshot();
  }
  /** Checkpoints are explicit opt-in exports. They can be stored in a DSH
   * Session resource by a future verified Host adapter; no hidden localStorage.
   */
  checkpoint(){
    if(!this.parser.snapshot().complete)throw Error('Cannot checkpoint incomplete scene');
    return {format:'vie-checkpoint',v:1,sceneId:this.parser.scene.id,
      revision:this.revision,source:this.source,userValues:{...this.modifiedValues()},interactiveState:copyValue(this.localState)};
  }
  restore(checkpoint){
    if(!plain(checkpoint)||checkpoint.format!=='vie-checkpoint'||checkpoint.v!==1||
       typeof checkpoint.source!=='string'||!plain(checkpoint.userValues)||
       new TextEncoder().encode(JSON.stringify(checkpoint)).length>MAX_CHECKPOINT_BYTES)throw Error('Invalid checkpoint');
    const parser=finalized(checkpoint.source);
    if(!parser.snapshot().complete||parser.scene.id!==checkpoint.sceneId)throw Error('Checkpoint scene mismatch');
    if(Object.keys(checkpoint.userValues).length>64)throw Error('Checkpoint state limit exceeded');
    for(const [path,value] of Object.entries(checkpoint.userValues))parser.set(path,value);
    if(!Number.isSafeInteger(checkpoint.revision)||checkpoint.revision<0)throw Error('Invalid checkpoint revision');
    if(checkpoint.interactiveState!==undefined&&!plain(checkpoint.interactiveState))throw Error('Invalid interactive checkpoint');
    const labStates=Object.create(null);
    for(const [id,value] of Object.entries(checkpoint.interactiveState??{})){
      const node=parser.scene.nodes.get(id);
      if(!node||!['CanTimingLab','InteractiveLab','InteractiveScene','GenerativeFigure','Chart'].includes(node.type))throw Error('Unknown interactive node');
      if(node.type==='Chart'){labStates[id]=validateChartState(node.props,value);continue;}
      if(node.type==='GenerativeFigure'){labStates[id]=validateFigureState(value);continue;}
      if(node.type==='InteractiveScene'){labStates[id]=validateExperimentSnapshot(node.props,value);continue;}
      if(!plain(value)||JSON.stringify(value).length>2048)throw Error('Invalid interactive state');
      for(const [key,item] of Object.entries(value)){
        if(!/^[A-Za-z][\w-]{0,40}$/.test(key)||!(typeof item==='boolean'||
           typeof item==='string'&&item.length<80||typeof item==='number'&&Number.isFinite(item)||
           Array.isArray(item)&&item.length<=12&&item.every(v=>typeof v==='number'&&Number.isFinite(v))||
           plain(item)&&Object.keys(item).length<=12&&Object.values(item).every(v=>typeof v==='number'&&Number.isFinite(v))))throw Error('Unsupported interactive state value');
      }
      labStates[id]=copyValue(value);
    }
    // Atomic commit. The previous scene stays intact on any failed restore.
    this.parser=parser;this.source=checkpoint.source;this.revision=checkpoint.revision;
    this.lastError=null;this.figureErrors=Object.create(null);this.localState=labStates;this.emit();return this.snapshot();
  }
}

/**
 * Turn-scoped VIE projection from durable DSH tool/result events.
 * This is deliberately independent of React, localStorage and the DOM.
 * Each visible item contains its complete source, so tail-first history can
 * recover even when tool/call or turn/start lies on an older unloaded page.
 */
/* @include view/answer.js */
/* @include view/flow-answer.js */
const VIE_TURN_KIND = 'vie-turn-surfaces';
const VIE_MAX_TURN_SCENES = 4;
const isVIETurnRecord = v => v !== null && typeof v === 'object' && !Array.isArray(v);

function toVIEResult(event) {
  if (!event || event.type !== 'tool/result') return null;
  const data = event.data;
  const meta = data?.meta;
  if (effectiveVIEPlacement(meta) !== 'tail') return null; // Opt-in: preserve tool-call position, subject to DSH folding.
  const source = meta?.source;
  const callId = data?.message?.source?.callId;
  if (!isVIETurnRecord(meta) || meta.kind !== 'vie' || meta.valid !== true ||
      typeof source !== 'string' || !source || new TextEncoder().encode(source).length > LIMITS.bytes ||
      typeof callId !== 'string' || !callId || data.message?.isError === true ||
      !Number.isSafeInteger(data.turn) || data.turn < 0) return null;
  return {callId, source, title: typeof meta.title === 'string' ? meta.title.slice(0,120) : '交互实验', caption: typeof meta.caption==='string' ? meta.caption.slice(0,140) : '', seq: event.seq};
}

function createVIETurnDefinition() {
  const project = event => toVIEResult(event);
  const flow = event => event.type==='tool/result'&&event.data?.meta?.kind==='vie'&&event.data.meta.valid===true&&event.data.message?.isError!==true&&effectiveVIEPlacement(event.data.meta)==='flow'&&!!event.data.meta.source;
  const merge = (items, item) => {
    const next = items.filter(v => v.callId !== item.callId);
    next.push(item);
    return next.slice(-VIE_MAX_TURN_SCENES);
  };
  return {
    kind: VIE_TURN_KIND,
    match(event) {
      if (event?.type === 'turn/start' && Number.isSafeInteger(event.data?.turn))
        return {id: String(event.data.turn), role: 'start'};
      // Use start instead of update so a tail-first history page has a
      // checkpoint even without the earlier turn/start event.
      if (project(event)||flow(event)) return {id:String(event.data.turn), role:'start'};
      return null;
    },
    start(_context, match) {
      const event = match.event;
      const item = project(event);
      return {turn: event.data.turn, items: item ? [item] : [],flow:flow(event)};
    },
    update(context, match) {
      const item = project(match.event);
      if (!item) return flow(match.event)?{...context.state,flow:true}:context.state;
      return {...context.state, items:merge(context.state.items, item)};
    },
    publication: () => 'immediate',
    buildLocationData(context, scope) {
      const state = context.state;
      if (scope !== 'turn' || !state || (!state.items.length&&!state.flow)) return null;
      // The key MUST equal the Definition kind or DSH rejects the projection.
      return {kind:'turn', turn:state.turn, key:VIE_TURN_KIND, value:{items:state.items,flow:state.flow===true}};
    }
  };
}

/** The chain selection must be pure and must not claim a non-VIE turn. */
function selectVIETurnTail(owner) {
  const data = owner?.turn?.data;
  const value = typeof data?.get === 'function' ? data.get(VIE_TURN_KIND) : null;
  return Array.isArray(value?.items) && value.items.length > 0 ? value : null;
}

/** An in-memory bridge between the streaming tool card and final turn tail.
 * Durable scene definitions come from the DSH session tool/result event,
 * not from this cache. Interactive parameter edits survive a view handoff,
 * but without an approved DSH write API they do NOT survive a page reload.
 */
function createVIEBridge(SceneStore, capacity=96) {
  const stores=new Map(), shown=new Set(), watchers=new Set(),persistence=new Map();
  let storage;try{storage=window.localStorage;}catch{}
  const checkpoints=createCheckpointRepository(storage);
  if(typeof window.addEventListener==='function')window.addEventListener('pagehide',()=>{for(const item of persistence.values())item.flush();});
  const sceneKey = (sessionId,callId) => JSON.stringify([String(sessionId??''),String(callId??'')]);
  const notify = () => {for(const callback of watchers)callback();};
  return {
    sceneKey,
    getStore(key,source='') {
      if(stores.has(key)) {
        const existing=stores.get(key);
        stores.delete(key);stores.set(key,existing);
        return existing;
      }
      const store=new SceneStore(source);
      const saved=checkpoints.load(key,source);if(saved)try{store.restore(saved);}catch{checkpoints.clear(key);}
      let timer;const persist=()=>{try{checkpoints.save(key,store.checkpoint());}catch{}};
      const unsubscribe=store.subscribe(()=>{clearTimeout(timer);timer=setTimeout(persist,250);});
      persistence.set(key,{flush:persist,dispose(){clearTimeout(timer);persist();unsubscribe();}});
      stores.set(key,store);
      // The held instance remains owned by its mounted views even if evicted.
      while(stores.size>capacity){const oldest=stores.keys().next().value;persistence.get(oldest)?.dispose();persistence.delete(oldest);stores.delete(oldest);}
      return store;
    },
    show(key) {
      if(shown.has(key))return;
      shown.add(key);notify();
    },
    hide(key) {
      if(!shown.delete(key))return;
      notify();
    },
    isShown(key){return shown.has(key);},
    subscribe(cb){watchers.add(cb);return()=>watchers.delete(cb);},
    stats(){return {cached:stores.size,visible:shown.size};},
  };
}

/** Incremental decoder for tool arguments emitted as a cumulative JSON string.
 * It reads each appended character once and decodes selected top-level JSON
 * string properties without executing model-provided code. Works on incomplete
 * JSON and arbitrary stream boundaries, including within escapes / Unicode.
 * All output is untrusted and must still pass VIE's regular validators.
 */
class IncrementalToolArguments {
  constructor({fields=['source','preset'],maxRaw=1048576,maxValue=262144}={}){
    this.fields=new Set(fields);
    this.maxRaw=maxRaw;
    this.maxValue=maxValue;
    this.reset();
  }
  reset(){
    this.raw='';this.scannedChars=0;this.depth=0;this.inString=false;
    this.mode='start';this.stringRole=null;this.key='';this.currentField=null;
    this.escaped=false;this.unicode='';this.pending='';
    this.values=Object.create(null);this.complete=false;this.invalid=false;this.objectField=null;this.objectStart=0;
  }
  update(raw){
    if(typeof raw!=='string')return this.values;
    if(raw.length>this.maxRaw){this.invalid=true;return this.values;}
    if(!raw.startsWith(this.raw))this.reset();
    const chunk=raw.slice(this.raw.length);
    this.raw=raw;
    if(this.invalid)return this.values;
    for(let i=0;i<chunk.length;i++){
      const c=chunk[i];this.scannedChars++;
      if(this.inString){
        if(this.unicode!==''){
          if(!/^[0-9a-fA-F]$/.test(c)){this.invalid=true;break;}
          this.unicode+=c;
          if(this.unicode.length===5){this.capture(String.fromCharCode(parseInt(this.unicode.slice(1),16)));this.unicode='';}
        }else if(this.escaped){
          this.escaped=false;
          const escaped={n:'\n',t:'\t',r:'\r',b:'\b',f:'\f','"':'"','\\':'\\','/':'/'};
          if(c==='u')this.unicode='u';
          else if(Object.hasOwn(escaped,c))this.capture(escaped[c]);
          else {this.invalid=true;break;}
        }else if(c==='\\')this.escaped=true;
        else if(c==='"'){
          this.flush();this.inString=false;
          if(this.depth===1&&this.stringRole==='key')this.mode='colon';
          else if(this.depth===1&&this.stringRole==='value')this.mode='comma';
          this.stringRole=null;this.currentField=null;
        }else this.capture(c);
        continue;
      }
      if(c==='"'){
        this.inString=true;this.escaped=false;this.unicode='';
        this.stringRole=this.depth===1&&this.mode==='key'?'key':this.depth===1&&this.mode==='value'?'value':'ignore';
        this.currentField=this.stringRole==='value'&&this.fields.has(this.key)?this.key:null;
        if(this.stringRole==='key')this.key='';
        continue;
      }
      if(c==='{'||c==='['){if(this.depth===1&&this.mode==='value'&&this.fields.has(this.key)){this.objectField=this.key;this.objectStart=this.scannedChars-1;}this.depth++;if(this.depth===1)this.mode='key';continue;}
      if(c==='}'||c===']'){
        this.depth--;
        if(this.depth<0){this.invalid=true;break;}
        if(this.depth===0){this.complete=true;this.mode='done';}
        else if(this.depth===1&&this.mode==='value'){if(this.objectField){this.values[this.objectField]=raw.slice(this.objectStart,this.scannedChars);this.objectField=null;}this.mode='comma';}
        continue;
      }
      if(this.depth!==1)continue;
      if(c===':'&&this.mode==='colon'){this.mode='value';continue;}
      if(c===','&&this.mode==='comma'){this.mode='key';this.key='';continue;}
      // Numeric/boolean/null values are not captured, but must allow a following comma.
      if(this.mode==='value'&&!/\s/.test(c))this.mode='comma';
    }
    this.flush();
    if(this.objectField)this.values[this.objectField]=raw.slice(this.objectStart);
    return this.values;
  }
  capture(char){
    if(this.stringRole==='key'){if(this.key.length<128)this.key+=char;return;}
    if(this.currentField){
      if((this.values[this.currentField]?.length??0)+this.pending.length+char.length>this.maxValue){this.invalid=true;return;}
      this.pending+=char;
    }
  }
  flush(){
    if(this.currentField&&this.pending){this.values[this.currentField]=(this.values[this.currentField]??'')+this.pending;this.pending='';}
  }
  /** Only parses fully closed, valid argument objects; never evaluates code. */
  completedObject(){
    if(!this.complete||this.invalid||this.inString||this.depth!==0)return null;
    try{
      const parsed=JSON.parse(this.raw);
      if(!parsed||Array.isArray(parsed)||typeof parsed!=='object')return null;
      return parsed;
    }catch{return null;}
  }
}


/* @include view/experiments.js */
const HTML=`
<section class="vie-canlab" aria-label="CAN 位时序交互实验">
  <header class="vie-can-head">
    <h3>CAN 位时序</h3>
    <button type="button" class="vie-pill vie-can-reset" data-action="reset" aria-label="重置实验"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M3 11a9 9 0 1 1 2.7 6.5M3 5v6h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>重置</button>
  </header>
  <div class="vie-can-tabs" role="group" aria-label="切换方案">
    <button type="button" class="vie-can-tab" data-scheme="A" aria-pressed="true">方案 A · 14 + 3</button>
    <button type="button" class="vie-can-tab" data-scheme="B" aria-pressed="false">方案 B · 15 + 2</button>
  </div>
  <div class="vie-can-segments" aria-label="当前位时序参数">
    <div><span>SYNC</span><strong>1 TQ</strong></div>
    <div><span>BS1</span><strong data-value="bs1">14 TQ</strong></div>
    <div><span>BS2</span><strong data-value="bs2">3 TQ</strong></div>
  </div>
  <div class="vie-can-timeline">
    <div class="vie-can-track" role="img" aria-label="SYNC、BS1、BS2 比特时序示意">
      <div class="vie-can-seg sync">S</div><div class="vie-can-seg before">BS1</div><div class="vie-can-seg after">BS2</div>
    </div>
    <div class="vie-can-sp-indicator" aria-hidden="true">↑</div>
    <div class="vie-can-grab" role="slider" tabindex="0" aria-label="拖动采样点，调整 BS1 和 BS2 的分配" aria-valuemin="20" aria-valuemax="95" aria-valuenow="83.33" aria-valuetext="83.33%" title="拖动改变采样点；左右方向键微调"></div>
    <div class="vie-can-axis"><span>0%</span><strong data-value="sp">采样点 83.33%</strong><span>100%</span></div>
  </div>
  <div class="vie-can-metrics">
    <div><span>CAN 波特率</span><strong data-value="bitrate">500 kbps</strong></div>
    <div><span>采样点</span><strong data-value="sample">83.33%</strong></div>
  </div>
  <p class="vie-can-guidance" data-value="guidance" aria-live="polite">总 TQ 相同，位速率相同；调整 BS1/BS2 会改变采样点。</p>
  <p class="vie-can-message" data-value="message" aria-live="polite"></p>
  <div class="vie-can-footer">
    <details class="vie-can-more"><summary><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M4 7h16M4 17h16M9 4v6M16 14v6" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/></svg> 调节参数 <span aria-hidden="true">⌄</span></summary>
      <div class="vie-can-extra-body">
  <div class="vie-can-inputs" aria-label="调整时间段">
    <label><span>BS1 <b data-readout="bs1">14 TQ</b></span><input type="range" data-input="bs1" aria-label="BS1 时间长度" min="1" max="16" step="1"/></label>
    <label><span>BS2 <b data-readout="bs2">3 TQ</b></span><input type="range" data-input="bs2" aria-label="BS2 时间长度" min="1" max="8" step="1"/></label>
  </div>

        <label class="vie-can-lock"><input type="checkbox" data-input="lock" checked/> 固定当前总 TQ（波特率保持不变）</label>
        <div class="vie-can-advanced">
          <label>CAN 时钟 / MHz<input type="number" data-input="clockMHz" aria-label="CAN 外设时钟 MHz" min="1" max="100" step="1" inputmode="numeric"/></label>
          <label>BRP<input type="number" data-input="prescaler" aria-label="BRP 预分频" min="1" max="1024" step="1" inputmode="numeric"/></label>
          <label>SJW / TQ<input type="number" data-input="sjw" aria-label="SJW TQ" min="1" max="4" step="1" inputmode="numeric"/></label>
        </div>
        <div class="vie-can-presets"><span>快捷示例</span><button type="button" class="vie-pill" data-bitrate="500000">500k</button><button type="button" class="vie-pill" data-bitrate="250000">250k</button><button type="button" class="vie-pill" data-bitrate="1000000">1M</button></div>
        <div class="vie-can-extra-values">位时间 <strong data-value="time">2.00 µs</strong><span data-value="tq">18 TQ · 每 TQ 111.11 ns</span></div>
        <div class="vie-can-compare"><strong>方案比较</strong><div class="vie-can-compare-lines"><div><span>A</span><div class="vie-can-mini"><i data-mini="A"></i></div><b data-compare="A">83.33%</b></div><div><span>B</span><div class="vie-can-mini"><i data-mini="B"></i></div><b data-compare="B">88.89%</b></div></div><p data-value="compare-note"></p></div>
        <p class="vie-can-formula" data-value="formula"></p>
      </div>
    </details>
    <button type="button" class="vie-pill vie-can-why" data-action="why" aria-expanded="false"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.65"/><path d="M9.5 9a2.6 2.6 0 1 1 4.1 2.1c-1.1.8-1.6 1.4-1.6 2.6M12 17.3h.01" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/></svg> 为什么？</button>
  </div>
  <div class="vie-can-explanation" hidden>
    总 TQ 不变时，波特率不变；BS1 与 BS2 的分配决定采样点。采样点不是越晚越好，应结合传播延迟、时钟误差及设备手册选择。
  </div>
</section>`;

function mountCanLab(root,initial={},options={}){
 if(!root)throw Error('CAN lab root is missing');
 let baseline=normalizeCanPreset(initial);
 let values={...baseline};
 let scheme='A';let lock=true;let edited=false;let notify='';
 if(options.initialState?.values){try{values=normalizeCanPreset(options.initialState.values);scheme=options.initialState.scheme==='B'?'B':'A';lock=options.initialState.lock!==false;edited=options.initialState.edited===true;}catch{}}
 root.innerHTML=HTML;
 const el=(s)=>root.querySelector(s);
 const all=(s)=>Array.from(root.querySelectorAll(s));
 const num=(v,d=2)=>Number(v).toFixed(d);
 const pct=v=>`${num(v)}%`;
 const diffText=v=>Math.abs(v)<.000001?'相同':`${v>0?'晚':'早'} ${num(Math.abs(v))} 个百分点`;
 const bitrateLabel=v=>v>=1e6?`${num(v/1e6,v%1e6===0?0:2)} Mbps`:`${num(v/1e3,v%1e3===0?0:2)} kbps`;
 const current=()=>scheme==='A'?{bs1:values.bs1,bs2:values.bs2}:{bs1:values.compareBs1,bs2:values.compareBs2};
 const assign=(x)=>{if(scheme==='A'){values.bs1=x.bs1;values.bs2=x.bs2;}else{values.compareBs1=x.bs1;values.compareBs2=x.bs2;}};
 function update(){
  const s=current();const calc=calculateCanTiming({...values,...s});
  const A=calculateCanTiming(values);const B=calculateCanTiming({...values,bs1:values.compareBs1,bs2:values.compareBs2});
  all('[data-scheme]').forEach(b=>{const a=b.dataset.scheme===scheme;b.setAttribute('aria-pressed',String(a));b.classList.toggle('active',a);b.textContent=`方案 ${b.dataset.scheme} · ${b.dataset.scheme==='A'?values.bs1:values.compareBs1} + ${b.dataset.scheme==='A'?values.bs2:values.compareBs2}`;});
  const t=calc.totalTq;const segs=all('.vie-can-seg');segs.forEach((n,i)=>{n.style.flexGrow=String([1,s.bs1,s.bs2][i]);n.style.flexBasis='0';n.style.minWidth='0'});
  el('.vie-can-sp-indicator').style.left=`${calc.samplePoint}%`;
  const grab=el('.vie-can-grab');grab.style.left=`${calc.samplePoint}%`;
  const boundaryMin=(1+Math.max(1,t-1-8))/t*100,boundaryMax=(1+Math.min(16,t-1-values.sjw))/t*100;
  grab.setAttribute('aria-valuemin',String(+boundaryMin.toFixed(2)));grab.setAttribute('aria-valuemax',String(+boundaryMax.toFixed(2)));
  grab.setAttribute('aria-valuenow',String(+calc.samplePoint.toFixed(2)));grab.setAttribute('aria-valuetext',pct(calc.samplePoint));
  el('[data-value=sp]').textContent=`采样点 ${pct(calc.samplePoint)}`;
  el('[data-value=bs1]').textContent=`${s.bs1} TQ`;el('[data-value=bs2]').textContent=`${s.bs2} TQ`;
  el('[data-value=bitrate]').textContent=bitrateLabel(calc.bitrate);
  el('[data-value=sample]').textContent=pct(calc.samplePoint);
  el('[data-value=time]').textContent=`${num(calc.bitTimeUs)} µs`;
  el('[data-value=tq]').textContent=`${t} TQ · 每 TQ ${num(calc.tqNs)} ns`;
  el('[data-value=guidance]').textContent=A.totalTq===B.totalTq
    ?`方案 A 采样点 ${pct(A.samplePoint)}，方案 B 为 ${pct(B.samplePoint)}；两者波特率相同。`
    :`当前 ${scheme} 的采样点为 ${pct(calc.samplePoint)}；总 TQ 不同时，位速率也会变化。`;

  all('[data-input]').forEach(inp=>{if(inp.type==='checkbox'){inp.checked=lock;return;}const k=inp.dataset.input;if(k==='bs1'||k==='bs2')inp.value=String(s[k]);else if(document.activeElement!==inp)inp.value=String(values[k]);});
  el('[data-readout=bs1]').textContent=`${s.bs1} TQ`;el('[data-readout=bs2]').textContent=`${s.bs2} TQ`;
  el('[data-compare=A]').textContent=pct(A.samplePoint);el('[data-compare=B]').textContent=pct(B.samplePoint);
  el('[data-mini=A]').style.width=`${A.samplePoint}%`;el('[data-mini=B]').style.width=`${B.samplePoint}%`;
  const diff=B.samplePoint-A.samplePoint;
  el('[data-value=compare-note]').textContent=`A：${bitrateLabel(A.bitrate)} / ${pct(A.samplePoint)}；B：${bitrateLabel(B.bitrate)} / ${pct(B.samplePoint)}。B 的采样点比 A ${diff>0?'靠后':diff<0?'靠前':'相同'}${diff===0?'':` ${num(Math.abs(diff))} 个百分点`}。`;
  el('[data-value=formula]').textContent=`${values.clockMHz} MHz ÷ (${values.prescaler} × ${t} TQ) = ${bitrateLabel(calc.bitrate)}　·　采样点 (1 + ${s.bs1}) / ${t} = ${pct(calc.samplePoint)}`;
  el('[data-value=message]').textContent=notify;
  root.dispatchEvent(new CustomEvent('vie:can:change',{bubbles:true,detail:{scheme,values:{...values},result:calc}}));
  if(edited)options.onChange?.({scheme,lock,edited,values:{...values}});
 }
 function modifySegment(key,v,keepTotal=lock){
  if(!Number.isInteger(v))return;
  const limit=key==='bs1'?16:8;if(v<1||v>limit)return;
  const previous=current(),next={...previous,[key]:v};
  if(keepTotal){const total=1+previous.bs1+previous.bs2;const other=key==='bs1'?'bs2':'bs1';next[other]=total-1-v;
   if(next[other]<1||next[other]>(other==='bs1'?16:8)){
    notify=`锁定总 TQ 时，${other.toUpperCase()} 必须保持在有效范围；已保留原值。`;update();return;
   }
  }
  if(values.sjw>next.bs2){notify='BS2 不能小于 SJW；请先减小 SJW。';update();return;}
  assign(next);notify=keepTotal?'':'自由调节总 TQ 会同时改变波特率。';edited=true;update();
 }
 function changeNumber(key,raw){const n=Number(raw);if(raw.trim()===''||!Number.isFinite(n))return;
   const p={...values,[key]:n};try{calculateCanTiming(p);calculateCanTiming({...p,bs1:p.compareBs1,bs2:p.compareBs2});values=p;edited=true;notify='';update();}
   catch(e){notify=e.message;el('[data-value=message]').textContent=notify;}}
 const handle=(e)=>{
   const target=e.target;const input=target.closest?.('[data-input]');if(input){const k=input.dataset.input;if(k==='lock'){lock=input.checked;notify=lock?'已锁定当前总 TQ。':'已允许总 TQ 自由变化。';update();return;}
    if(k==='bs1'||k==='bs2'){modifySegment(k,Number(input.value));return;}
    if(e.type==='change')changeNumber(k,input.value);return;}
   if(e.type!=='click')return;
   const button=target.closest?.('button');if(!button||!root.contains(button))return;
   if(button.dataset.scheme){scheme=button.dataset.scheme;edited=true;notify='';update();return;}
   if(button.dataset.action==='reset'){values={...baseline};scheme='A';lock=true;edited=false;notify='已恢复初始配置。';update();options.onChange?.({scheme,lock,edited,values:{...values}});return;}
   if(button.dataset.action==='why'){const panel=el('.vie-can-explanation');panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));return;}
   if(button.dataset.bitrate){const targetBps=Number(button.dataset.bitrate);const total=1+values.bs1+values.bs2;const brp=values.clockMHz*1e6/(targetBps*total);if(!Number.isInteger(brp)||brp<1||brp>1024){notify='当前时钟与总 TQ 不能用整数 BRP 精确得到这个波特率；请调整配置。';update();return;}
     values.prescaler=brp;edited=true;notify=`已将 BRP 设为 ${brp}，匹配方案 A 的目标波特率。`;update();}
 };
 // Timeline boundary is a real interaction, not a decorative label.
 const grab=el('.vie-can-grab');const track=el('.vie-can-track');let dragging=false;
 function fromPointer(clientX){
   const rect=track.getBoundingClientRect();if(rect.width<1)return;
   const total=1+current().bs1+current().bs2;
   const tq=Math.round((clientX-rect.left)/rect.width*total)-1;
   const bs1=Math.max(1,Math.min(16,tq));
   if(bs1!==current().bs1)modifySegment('bs1',bs1,true);
 }
 const pointerDown=e=>{if(e.button!==0)return;dragging=true;grab.setPointerCapture?.(e.pointerId);fromPointer(e.clientX);e.preventDefault();};
 const pointerMove=e=>{if(dragging)fromPointer(e.clientX);};
 const pointerUp=()=>{dragging=false;};
 const keydown=e=>{
   if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
   e.preventDefault();const c=current(),total=1+c.bs1+c.bs2;
   const low=Math.max(1,total-1-8),high=Math.min(16,total-1-values.sjw);
   const next=e.key==='Home'?low:e.key==='End'?high:c.bs1+(e.key==='ArrowRight'?1:-1);
   modifySegment('bs1',Math.max(low,Math.min(high,next)),true);
 };
 grab.addEventListener('pointerdown',pointerDown);grab.addEventListener('pointermove',pointerMove);
 grab.addEventListener('pointerup',pointerUp);grab.addEventListener('pointercancel',pointerUp);grab.addEventListener('keydown',keydown);
 root.addEventListener('input',handle);root.addEventListener('change',handle);root.addEventListener('click',handle);
 update();
 return {dispose:()=>{root.removeEventListener('input',handle);root.removeEventListener('change',handle);root.removeEventListener('click',handle);grab.removeEventListener('pointerdown',pointerDown);grab.removeEventListener('pointermove',pointerMove);grab.removeEventListener('pointerup',pointerUp);grab.removeEventListener('pointercancel',pointerUp);grab.removeEventListener('keydown',keydown);root.replaceChildren();},applyInitial:(next)=>{const x=normalizeCanPreset(next);baseline=x;if(!edited){values={...x};update();}},snapshot:()=>({scheme,lock,edited,values:{...values}})};
}

/** Compact Cartesian vector explorer. Stable SVG nodes allow pointer capture during drag. */
function mountVectorLab(root, options = {}) {
  const maxMagnitude = 5;
  const origin = { x: 170, y: 128 };
  const scale = 21.5; // Identical pixels-per-unit on both axes.
  const state = { magnitude: 4, angle: 30 };
  const initial = options.initialState ?? {};
  if (Number.isFinite(initial.magnitude)) state.magnitude = Math.max(0, Math.min(maxMagnitude, Math.round(initial.magnitude * 10) / 10));
  if (Number.isFinite(initial.angle)) state.angle = Math.max(-180, Math.min(180, Math.round(initial.angle)));
  const defaults = { ...state };
  const fmt = (x) => Number.isInteger(x) ? String(x) : x.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  const short = (x) => x.toFixed(2).replace(/^-0\.00$/, '0.00');
  const xTick = (n) => origin.x + n * scale;
  const yTick = (n) => origin.y - n * scale;
  const guides = [-4, -2, 0, 2, 4].map((v) => {
    const x = xTick(v), y = yTick(v), active = v === 0;
    const stroke = active ? 'var(--vie-vector-axis)' : 'var(--vie-vector-grid)';
    return `<line x1="${x}" y1="19" x2="${x}" y2="238" stroke="${stroke}" stroke-width="${active ? 1.3 : 1}" />
      <line x1="56" y1="${y}" x2="284" y2="${y}" stroke="${stroke}" stroke-width="${active ? 1.3 : 1}" />
      ${v === 0 ? '' : `<text x="${x}" y="142" text-anchor="middle" class="vie-vector-tick">${v}</text><text x="160" y="${y + 4}" text-anchor="end" class="vie-vector-tick">${v}</text>`}`;
  }).join('');
  root.innerHTML = `<section class="vie-semantic-lab vie-lab-vector">
    <header class="vie-lab-head"><div><h3>向量分解</h3><p>拖动蓝色端点，观察水平与竖直分量。</p></div>
      <button type="button" class="vie-pill" data-action="reset"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M3 11a9 9 0 1 1 2.7 6.5M3 5v6h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>重置</button>
    </header>
    <div class="vie-vector-stage">
      <div class="vie-vector-canvas">
        <svg class="vie-vector-svg" viewBox="0 0 340 256" role="group" aria-label="可拖动的二维直角坐标系，蓝色为向量，青绿色为水平分量，橙色为竖直分量">
          ${guides}
          <text x="160" y="142" text-anchor="end" class="vie-vector-tick">0</text>
          <path d="M279 124l6 4-6 4 M166 24l4-6 4 6" fill="none" stroke="var(--vie-vector-axis)" stroke-width="1.4" stroke-linejoin="round"/>
          <text x="290" y="123" class="vie-vector-axis-label">x</text><text x="181" y="20" class="vie-vector-axis-label">y</text>
          <path data-v="horizontal" stroke="var(--vie-vector-x)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <path data-v="vertical" stroke="var(--vie-vector-y)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <path data-v="arc" stroke="var(--vie-vector-angle)" stroke-width="1.5" fill="none" />
          <text data-v="arc-label" class="vie-vector-arc-label"/>
          <path data-v="vector" stroke="var(--vie-vector-main)" stroke-width="3.5" stroke-linecap="round" fill="none" />
          <circle data-v="origin" cx="170" cy="128" r="3.5" fill="var(--vie-vector-axis)" />
          <circle data-vector-handle="true" cx="263" cy="82" r="18" fill="transparent" stroke="none" role="button" tabindex="0" aria-label="向量端点。拖动调整方向和长度；左右方向键调整角度，上下方向键调整长度"/>
          <circle data-v="tip" cx="263" cy="82" r="6.2" fill="var(--vie-vector-main)" stroke="var(--vie-vector-tip-ring)" stroke-width="2.5" pointer-events="none"/>
          <text data-v="coordinate" class="vie-vector-coordinate"/>
        </svg>
        <span class="vie-vector-hint"><svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 2v13l3.2-3 2.4 5 2-1-2.4-5H14L4 2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>拖动端点</span>
      </div>
      <div class="vie-vector-insights" aria-live="off">
        <div class="vie-vector-meta"><span>向量</span><strong data-v="polar">4 ∠ 30°</strong></div>
        <div class="vie-vector-metric x"><div class="vie-vector-metric-label"><span class="vie-vector-dot"></span>水平分量 x</div><strong data-v="x-num">3.46</strong><small>|v| cos θ</small></div>
        <div class="vie-vector-metric y"><div class="vie-vector-metric-label"><span class="vie-vector-dot"></span>竖直分量 y</div><strong data-v="y-num">2.00</strong><small>|v| sin θ</small></div>
      </div>
    </div>
    <div class="vie-lab-controls vie-vector-controls">
      <label class="vie-lab-slider"><span>模长 <b data-v="mag-label"></b></span><input type="range" data-param="magnitude" min="0" max="5" step="0.1" value="${state.magnitude}" aria-label="向量模长"/></label>
      <label class="vie-lab-slider"><span>角度 θ <b data-v="angle-label"></b></span><input type="range" data-param="angle" min="-180" max="180" step="1" value="${state.angle}" aria-label="向量角度"/></label>
    </div>
    <p class="vie-lab-explain vie-vector-explain" aria-live="polite">向量的投影随角度和长度改变。</p>
  </section>`;
  const $ = (selector) => root.querySelector(selector);
  const svg = $('.vie-vector-svg');
  const handle = $('[data-vector-handle]');
  const coordLabel = $('[data-v=coordinate]');
  const plot = {
    horizontal: $('[data-v=horizontal]'), vertical: $('[data-v=vertical]'),
    arc: $('[data-v=arc]'), vector: $('[data-v=vector]'),
    arcLabel: $('[data-v=arc-label]'), tip: $('[data-v=tip]')
  };
  let dragging = false;
  let trackingPointer = null;
  let disposed = false;
  function render() {
    const rad = state.angle * Math.PI / 180;
    const vx = state.magnitude * Math.cos(rad), vy = state.magnitude * Math.sin(rad);
    const ex = origin.x + vx * scale, ey = origin.y - vy * scale;
    // Both components are drawn end-to-end: vector = (vx,0) + (0,vy).
    plot.horizontal.setAttribute('d', `M${origin.x} ${origin.y}H${ex}`);
    plot.vertical.setAttribute('d', `M${ex} ${origin.y}V${ey}`);
    const len = state.magnitude * scale;
    if (len > 10) {
      const unitX = (ex-origin.x)/len, unitY=(ey-origin.y)/len;
      const baseX=ex-unitX*10, baseY=ey-unitY*10;
      const nx=-unitY,ny=unitX;
      plot.vector.setAttribute('d',`M${origin.x} ${origin.y}L${baseX} ${baseY} M${baseX+nx*4.7} ${baseY+ny*4.7}L${ex} ${ey}L${baseX-nx*4.7} ${baseY-ny*4.7}`);
    } else plot.vector.setAttribute('d', `M${origin.x} ${origin.y}L${ex} ${ey}`);
    plot.tip.setAttribute('cx', String(ex)); plot.tip.setAttribute('cy',String(ey));
    handle.setAttribute('cx',String(ex));handle.setAttribute('cy',String(ey));
    handle.setAttribute('aria-label',`向量端点，模长 ${fmt(state.magnitude)}，方向 ${state.angle}°；方向键可调整`);
    if (state.magnitude > 0.3) {
      const arcR=28;
      const segments=Math.max(2,Math.ceil(Math.abs(state.angle)/10));
      const pts=Array.from({length:segments+1},(_,i)=>{
        const a=(state.angle*i/segments)*Math.PI/180;
        return `${origin.x+arcR*Math.cos(a)} ${origin.y-arcR*Math.sin(a)}`;
      });
      plot.arc.setAttribute('d','M'+pts.join(' L'));
      const thetaLabelA=state.angle/2*Math.PI/180;
      plot.arcLabel.setAttribute('x',String(origin.x+41*Math.cos(thetaLabelA)));
      plot.arcLabel.setAttribute('y',String(origin.y-41*Math.sin(thetaLabelA)-4));
      plot.arcLabel.textContent = 'θ';
    } else {plot.arc.setAttribute('d','');plot.arcLabel.textContent='';}
    // Flip the coordinate label inward near the plot edges (all four quadrants).
    const anchor = ex < 105 ? 'start' : ex > 248 ? 'end' : (vx >= 0 ? 'start' : 'end');
    let lx = ex + (anchor==='start' ? 12 : -12);
    let ly = ey < 38 ? ey + 17 : ey - 12;
    lx=Math.max(36,Math.min(305,lx));ly=Math.max(18,Math.min(243,ly));
    coordLabel.setAttribute('x',String(lx));coordLabel.setAttribute('y',String(ly));
    coordLabel.setAttribute('text-anchor', anchor);
    coordLabel.textContent=`(${fmt(vx)}, ${fmt(vy)})`;
    $('[data-v=polar]').textContent=`${fmt(state.magnitude)} ∠ ${state.angle}°`;
    $('[data-v=x-num]').textContent=short(vx);
    $('[data-v=y-num]').textContent=short(vy);
    $('[data-v=mag-label]').textContent=fmt(state.magnitude);
    $('[data-v=angle-label]').textContent=state.angle+'°';
    for (const key of ['magnitude','angle']){
      const input=$(`[data-param=${key}]`);
      if(Number(input.value)!==state[key])input.value=String(state[key]);
    }
    $('.vie-vector-explain').textContent=`x = ${short(vx)}，y = ${short(vy)}。拖动向量，观察投影的长度和方向。`;
  }
  function notify(){ options.onChange?.({...state}); }
  function update(nextMag,nextAngle){
    const magnitude=Math.min(5,Math.max(0,Math.round(nextMag*10)/10));
    const angle=Math.min(180,Math.max(-180,Math.round(nextAngle)));
    if (magnitude===state.magnitude && angle===state.angle) return;
    Object.assign(state,{magnitude,angle});render();notify();
  }
  function onInput(e){
    const key=e.target.dataset?.param;
    if(key==='angle')update(state.magnitude,Number(e.target.value));
    if(key==='magnitude')update(Number(e.target.value),state.angle);
  }
  function onClick(e){
    if(e.target.closest('[data-action=reset]'))update(defaults.magnitude,defaults.angle);
  }
  function coords(e){
    const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;
    const m=svg.getScreenCTM(); if(!m) return null;
    const p=pt.matrixTransform(m.inverse());
    const dx=(p.x-origin.x)/scale,dy=(origin.y-p.y)/scale;
    return {magnitude:Math.hypot(dx,dy),angle:Math.atan2(dy,dx)*180/Math.PI};
  }
  function onDown(e){
    if(e.button!==undefined&&e.button!==0)return;
    if(e.target!==handle)return;
    dragging=true;trackingPointer=e.pointerId;
    handle.classList.add('dragging');
    svg.setPointerCapture(e.pointerId);
    e.preventDefault();
  }
  function onMove(e){
    if(!dragging||e.pointerId!==trackingPointer)return;
    const p=coords(e);if(p)update(p.magnitude,p.angle);
  }
  function stopDrag(e){
    if(!dragging||(e.pointerId!=null&&e.pointerId!==trackingPointer))return;
    dragging=false;trackingPointer=null;handle.classList.remove('dragging');
    if(e.pointerId!=null&&svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);
  }
  function onKey(e){
    if(e.target!==handle)return;
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))return;
    e.preventDefault();
    if(e.key==='Home') update(0,0);
    if(e.key==='ArrowLeft')update(state.magnitude,state.angle-(e.shiftKey?10:1));
    if(e.key==='ArrowRight')update(state.magnitude,state.angle+(e.shiftKey?10:1));
    if(e.key==='ArrowUp')update(state.magnitude+(e.shiftKey?1:0.1),state.angle);
    if(e.key==='ArrowDown')update(state.magnitude-(e.shiftKey?1:0.1),state.angle);
  }
  root.addEventListener('input',onInput);
  root.addEventListener('click',onClick);
  svg.addEventListener('pointerdown',onDown);
  svg.addEventListener('pointermove',onMove);
  svg.addEventListener('pointerup',stopDrag);
  svg.addEventListener('pointercancel',stopDrag);
  svg.addEventListener('lostpointercapture',stopDrag);
  handle.addEventListener('keydown',onKey);
  render();
  return {
    dispose(){
      if(disposed)return;disposed=true;
      root.removeEventListener('input',onInput);root.removeEventListener('click',onClick);
      svg.removeEventListener('pointerdown',onDown);svg.removeEventListener('pointermove',onMove);
      svg.removeEventListener('pointerup',stopDrag);svg.removeEventListener('pointercancel',stopDrag);
      svg.removeEventListener('lostpointercapture',stopDrag);handle.removeEventListener('keydown',onKey);
    },
    snapshot(){return {...state};}
  };
}

/** Native-sized semantic teaching surfaces. Fixed trusted markup; the model only selects a lab. */
function mountSemanticLab(root,kind,options={}){
  const configs={
    bitwise:{title:'8 位二进制运算',sub:'点按 A、B 中任意一位，观察逐位运算结果。'},
    timer:{title:'STM32 定时器计数',sub:'观察 PSC、ARR 如何决定更新频率。'},
    ohm:{title:'欧姆定律',sub:'调整电压和电阻，观察电流如何改变。'},
    fraction:{title:'分数等值',sub:'改变分子和分母，直观看到等值分数。'},
    probability:{title:'等可能事件的概率',sub:'点击六种结果，选出你关心的事件。'},
    vector:{title:'向量的分解',sub:'改变长度与角度，观察水平和竖直分量。'}
  };
  if(!Object.hasOwn(configs,kind))throw Error('Unsupported semantic lab');
  if(kind==='vector')return mountVectorLab(root,options);
  const config=configs[kind];
  const state={a:172,b:202,op:'AND',psc:71,arr:999,voltage:12,resistance:6,numerator:1,denominator:3,selected:[2,4,6],magnitude:4,angle:30};
  if(options.initialState&&typeof options.initialState==='object'){for(const [k,v] of Object.entries(options.initialState))if(Object.hasOwn(state,k)){if(typeof state[k]===typeof v)state[k]=Array.isArray(v)?[...v]:v;}}
  const num=(n,d=2)=>Number.isFinite(n)?(Number.isInteger(n)?String(n):n.toFixed(d)):'—';
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const elem=(sel)=>root.querySelector(sel);
  const svg=(body,view='0 0 600 150')=>`<svg viewBox="${view}" role="img" aria-label="${config.title}" class="vie-lab-svg">${body}</svg>`;
  const pill=(name)=>`<button type="button" class="vie-pill" data-action="reset" aria-label="重置${name}"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M3 11a9 9 0 1 1 2.7 6.5M3 5v6h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>重置</button>`;
  root.innerHTML=`<section class="vie-semantic-lab vie-lab-${kind}"><header class="vie-lab-head"><div><h3>${config.title}</h3><p>${config.sub}</p></div>${pill(config.title)}</header><div class="vie-lab-visual" data-region="visual"></div><div class="vie-lab-controls" data-region="controls"></div><p class="vie-lab-explain" data-region="explain" aria-live="polite"></p></section>`;
  function slider(key,label,min,max,step,unit=''){
    return `<label class="vie-lab-slider"><span>${label}<b data-readout="${key}"></b></span><input type="range" data-param="${key}" min="${min}" max="${max}" step="${step}" value="${state[key]}" aria-label="${label}"/></label>`;
  }
  const original={...state,selected:[...state.selected]};
  // Keep sliders mounted during input. Replacing controls.innerHTML on every
  // input event destroys the browser's drag gesture and pointer capture.
  function render(rebuildControls=false){
    const visual=elem('[data-region=visual]'),controls=elem('[data-region=controls]'),explain=elem('[data-region=explain]');
    let graphic='',panel='',note='';
    if(kind==='bitwise'){
      const names={AND:'与 AND',OR:'或 OR',XOR:'异或 XOR'};
      const op=state.op==='AND'?state.a&state.b:state.op==='OR'?state.a|state.b:state.a^state.b;
      const digits=value=>Array.from({length:8},(_,i)=>(value>>(7-i))&1);
      const row=(title,val,editable)=>`<div class="vie-bit-row"><span>${title}</span><div class="vie-bit-cells">${digits(val).map((bit,i)=>editable?`<button class="vie-bit" type="button" data-bit="${title}:${i}" aria-label="切换${title}的第${7-i}位">${bit}</button>`:`<strong class="vie-bit-result ${bit?'on':''}">${bit}</strong>`).join('')}</div><small>${val}</small></div>`;
      graphic=`<div class="vie-bit-panel">${row('A',state.a,true)}${row('B',state.b,true)}<div class="vie-bit-separator"></div>${row('=',op,false)}</div>`;
      panel=`<div class="vie-lab-pills" role="group" aria-label="选择运算">${Object.keys(names).map(k=>`<button type="button" class="vie-pill ${k===state.op?'selected':''}" data-op="${k}" aria-pressed="${k===state.op}">${names[k]}</button>`).join('')}</div>`;
      note=`${state.a} ${state.op==='AND'?'&':state.op==='OR'?'|':'^'} ${state.b} = ${op}。每一位独立计算，左边为最高位。`;
    }
    else if(kind==='timer'){
      const tick=72000000/(state.psc+1),hz=tick/(state.arr+1),period=1000/hz;
      graphic=svg(`<path d="M48 30V120H568" fill="none" stroke="var(--vie-stroke)" stroke-width="1.2"/>${Array.from({length:4},(_,i)=>{const x=72+i*118;return `<rect x="${x}" y="43" width="84" height="77" rx="7" fill="#eff5fc"/><path d="M${x} 112V54H${x+84}V112" fill="none" stroke="#448bd8" stroke-width="3" stroke-linejoin="round"/>`;}).join('')}<text x="48" y="18" font-size="12" fill="var(--vie-muted)">更新事件（示意，非真实时间比例）</text><text x="558" y="139" text-anchor="end" font-size="12" fill="var(--vie-muted)">t →</text>`);
      panel=`${slider('psc','预分频 PSC',0,143,1)}${slider('arr','自动重装载 ARR',99,1999,1)}`;
      note=`定时器输入时钟假设为 72 MHz：计数频率 ${num(tick/1e6)} MHz，更新频率 ${num(hz)} Hz，周期 ${num(period)} ms。`;
    }
    else if(kind==='ohm'){
      const i=state.voltage/state.resistance;
      graphic=svg(`<path d="M100 68V34H196M404 34H500V123H100V90" fill="none" stroke="#7b8b9e" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M196 34h17l14-13 16 26 16-26 16 26 16-26 16 13h97" fill="none" stroke="#4e93d6" stroke-width="3" stroke-linejoin="round"/><path d="M83 68H117M90 90H110" stroke="#7b8b9e" stroke-width="2.7" stroke-linecap="round"/><path d="M100 90V90" stroke="#7b8b9e"/><path d="M438 116h35m-8-7 8 7-8 7" fill="none" stroke="#3a9d7f" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><text x="78" y="51" font-size="13" fill="var(--vie-ink)">${num(state.voltage)} V</text><text x="300" y="14" font-size="14" text-anchor="middle" fill="var(--vie-ink)">${num(state.resistance)} Ω</text><text x="438" y="146" font-size="14" text-anchor="middle" fill="var(--vie-ink)">I = ${num(i)} A</text>`);
      panel=`${slider('voltage','电压 U',0,24,0.1,'V')}${slider('resistance','电阻 R',1,20,0.1,'Ω')}`;
      note=`I = U / R = ${state.voltage} / ${state.resistance} = ${num(i)} A。电阻不变时，电压越大，电流越大。`;
    }
    else if(kind==='fraction'){
      const n=clamp(state.numerator,0,state.denominator),d=state.denominator;
      const bars=(times,y)=>{const count=d*times,filled=n*times,unit=520/count;
        return `<text x="28" y="${y+25}" font-size="13" fill="var(--vie-muted)">${times===1?'原分数':'等值×2'}</text>`+
        Array.from({length:count},(_,j)=>`<rect x="${100+j*unit+1}" y="${y}" width="${Math.max(unit-2,1)}" height="38" rx="${unit>12?3:1}" fill="${j<filled?'#4c91d0':'#edf1f5'}"/>`).join('');};
      graphic=svg(`${bars(1,23)}${bars(2,90)}`,'0 0 650 145');
      panel=`${slider('numerator','分子',0,state.denominator,1)}${slider('denominator','分母',2,12,1)}`;
      note=`${n}/${d} = ${n*2}/${d*2}；分子和分母同时乘以 2，大小不变。`;
    }
    else if(kind==='probability'){
      const p=state.selected.length/6;
      graphic=`<div class="vie-outcomes">${Array.from({length:6},(_,i)=>`<button type="button" data-outcome="${i+1}" class="vie-outcome ${state.selected.includes(i+1)?'chosen':''}" aria-pressed="${state.selected.includes(i+1)}">${i+1}</button>`).join('')}</div><div class="vie-prob-bar"><div style="width:${p*100}%"></div></div><div class="vie-prob-label"><span>0%</span><strong>${num(p*100)}%</strong><span>100%</span></div>`;
      panel='';
      note=`事件包含 ${state.selected.length} 种结果，全部有 6 种等可能结果：P = ${state.selected.length}/6 = ${num(p*100)}%。`;
    }
    visual.innerHTML=graphic;
    if(rebuildControls || controls.dataset.mounted!=='true'){
      controls.innerHTML=panel;
      controls.dataset.mounted='true';
    }
    explain.textContent=note;
    for(const input of controls.querySelectorAll('[data-param]')){
      const key=input.dataset.param;
      const readout=controls.querySelector(`[data-readout="${key}"]`);
      if(readout)readout.textContent=num(state[key])+(key==='voltage'?' V':key==='resistance'?' Ω':key==='angle'?'°':'');
      // Cross-control constraints may clamp a value (e.g. a numerator); update
      // the native element without replacing it while the user is dragging.
      if(kind==='fraction' && key==='numerator')input.max=String(state.denominator);
      if(Number(input.value)!==state[key])input.value=String(state[key]);
    }
  }
  const notify=()=>options.onChange?.({...state,selected:[...state.selected]});
  const onInput=e=>{const key=e.target.dataset?.param;if(!key||!Object.hasOwn(state,key))return;state[key]=Number(e.target.value);if(kind==='fraction')state.numerator=clamp(state.numerator,0,state.denominator);render();notify();};
  const onClick=e=>{const t=e.target.closest('button');if(!t||!root.contains(t))return;
    if(t.dataset.action==='reset'){Object.assign(state,original,{selected:[...original.selected]});render(true);notify();return;}
    if(t.dataset.op){state.op=t.dataset.op;render(true);notify();return;}
    if(t.dataset.bit){const [which,index]=t.dataset.bit.split(':');state[which.toLowerCase()]^=1<<(7-Number(index));render();notify();return;}
    if(t.dataset.outcome){const k=Number(t.dataset.outcome);state.selected=state.selected.includes(k)?state.selected.filter(x=>x!==k):[...state.selected,k].sort((a,b)=>a-b);render();notify();}
  };
  root.addEventListener('input',onInput);root.addEventListener('click',onClick);render();
  return {dispose(){root.removeEventListener('input',onInput);root.removeEventListener('click',onClick);},snapshot(){return {...state,selected:[...state.selected]};}};
}

/** Declarative SVG animation runtime: DOM is updated in place, no remount on frame.
 * The motion grammar is purely kinematic. It never claims gears are meshed. */
function mountVisualAnimation(root, spec, initial={}){
  if(!root||!spec||!Array.isArray(spec.motions))return {dispose(){}};
  const doc=root.ownerDocument;
  const win=doc.defaultView;
  const svg=root.querySelector('.vie-visual-svg');
  const play=root.querySelector('[data-vie-play]');
  const scrub=root.querySelector('[data-vie-scrub]');
  const counter=root.querySelector('[data-vie-time]');
  const restart=root.querySelector('[data-vie-restart]');
  if(!svg||!scrub||!play||!counter||!restart)return {dispose(){}};
  let elapsed=Math.max(0,Math.min(1,Number(initial.progress)||0))*spec.duration;
  const reduced=win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
  let running=initial.playing===undefined?false:!!initial.playing&&!reduced;
  let raf=0,last=0,disposed=false;
  const byShape=new Map();
  for(const m of spec.motions){if(!byShape.has(m.id))byShape.set(m.id,[]);byShape.get(m.id).push(m);}
  const targets=[...byShape].map(([id,motions])=>({motions,node:[...svg.querySelectorAll('[data-vie-shape]')].find(x=>x.getAttribute('data-vie-shape')===id)}));
  function draw(){
    const progress=elapsed===spec.duration?1:(elapsed/spec.duration)%1;
    for(const {motions,node} of targets){if(!node)continue;
      const transforms=motions.map(m=>{
        const p=m.ease==='inOut'?(0.5-0.5*Math.cos(Math.PI*progress)):progress;
        const cycles=m.cycles??1;
        return m.kind==='rotate'?`rotate(${(m.degrees*cycles*p).toFixed(3)} ${m.cx} ${m.cy})`:`translate(${(m.dx*cycles*p).toFixed(3)} ${(m.dy*cycles*p).toFixed(3)})`;
      });
      // SVG transforms apply rightmost-first. Declare orbit first, local spin second.
      node.setAttribute('transform',transforms.join(' '));
    }
    scrub.value=String(Math.round(progress*1000));counter.textContent=Math.round(progress*100)+'%';
    play.textContent=running?'暂停':'播放';
  }
  function tick(t){if(disposed||!running)return;
    if(last)elapsed=(elapsed+(Math.min(80,t-last))/1000)%spec.duration;
    last=t;draw();raf=win.requestAnimationFrame(tick);
  }
  function setPlay(value){running=value;last=0;win.cancelAnimationFrame(raf);draw();if(running)raf=win.requestAnimationFrame(tick);}
  const onPlay=()=>setPlay(!running);
  const onScrub=()=>{elapsed=Number(scrub.value)/1000*spec.duration;last=0;draw();};
  const onRestart=()=>{elapsed=0;draw();setPlay(true);};
  play.addEventListener('click',onPlay);scrub.addEventListener('input',onScrub);restart.addEventListener('click',onRestart);
  draw();if(running)raf=win.requestAnimationFrame(tick);
  return {snapshot:()=>({progress:elapsed===spec.duration?1:(elapsed/spec.duration)%1,playing:running}),dispose(){disposed=true;win.cancelAnimationFrame(raf);play.removeEventListener('click',onPlay);scrub.removeEventListener('input',onScrub);restart.removeEventListener('click',onRestart);}};
}

/** VIE React renderer; React provided by embedding DSH runtime. */
function makeReactView(React, core) {
  const h=React.createElement;
  function useSvgScope(){const ref=React.useRef(null);if(ref.current===null)ref.current='vie-svg-'+(++svgScopeSequence);return ref.current;}
  const plotCache=new Map();
  function cachedFunctionPlot(expr,variables,options={}){
    const key=JSON.stringify([expr,variables,options]);
    if(plotCache.has(key)){
      const visual=plotCache.get(key);
      // LRU: hot values stay present while unrelated controls update.
      plotCache.delete(key);plotCache.set(key,visual);return visual;
    }
    const visual=functionPlotSVG(expr,variables,core.evaluate,options);
    plotCache.set(key,visual);
    if(plotCache.size>24)plotCache.delete(plotCache.keys().next().value);
    return visual;
  }

  function CanView({config,nodeId,store}){
    const root=React.useRef(null),api=React.useRef(null);
    React.useEffect(()=>{api.current=mountCanLab(root.current,config,{initialState:store.local(nodeId),onChange:state=>store.setLocal(nodeId,state)});return ()=>{api.current?.dispose();api.current=null;};},[]);
    React.useEffect(()=>{api.current?.applyInitial(config);},[JSON.stringify(config)]);
    return h('div',{ref:root,className:'vie-can-host'});
  }
  function SemanticView({kind,nodeId,store}){
    const root=React.useRef(null);
    React.useEffect(()=>{const instance=mountSemanticLab(root.current,kind,{initialState:store.local(nodeId),onChange:state=>store.setLocal(nodeId,state)});return ()=>instance.dispose();},[kind]);
    return h('div',{ref:root,className:'vie-semantic-host'});
  }
  function ExperimentView({config,nodeId,store}){
    const root=React.useRef(null);
    React.useEffect(()=>{const controller=mountInteractiveScene(root.current,config,{initialState:store.local(nodeId),onChange:value=>store.setLocal(nodeId,value)});return ()=>controller.dispose();},[store,nodeId,JSON.stringify(config)]);
    return h('div',{ref:root,className:'vie-experiment-host'});
  }
  function ChartView({config,nodeId,store}){
    const root=React.useRef(null),signature=JSON.stringify(config);
    React.useEffect(()=>{const api=mountChart(root.current,config,{initialState:store.local(nodeId),onChange:value=>store.setLocal(nodeId,value)});const unsubscribe=store.subscribe(()=>api.update(store.local(nodeId)??{}));return ()=>{unsubscribe();api.dispose();};},[store,nodeId,signature]);
    return h('div',{ref:root,'data-vie-chart':nodeId});
  }
  // Keep the mounted renderer in place: expansion is a layout change, not a remount.
  function useVisualExpansion(container,button,onCollapse){
    const [expanded,setExpanded]=React.useState(false);
    const close=()=>{setExpanded(false);onCollapse?.();};
    React.useEffect(()=>{
      if(!expanded)return;
      const panel=container.current,doc=panel.ownerDocument,prior=doc.activeElement;
      const focus=e=>{if(!panel.contains(e.target))button.current?.focus();};
      const key=e=>{
        if(e.key==='Escape'){e.preventDefault();close();}
        if(e.key==='Tab'){
          const all=[...panel.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href],iframe,[tabindex="0"]')].filter(el=>el.getClientRects().length),first=all[0],last=all.at(-1);
          if(e.shiftKey&&doc.activeElement===first){e.preventDefault();last?.focus();}
          else if(!e.shiftKey&&doc.activeElement===last){e.preventDefault();first?.focus();}
        }
      };
      doc.addEventListener('keydown',key);doc.addEventListener('focusin',focus);button.current?.focus();
      return ()=>{doc.removeEventListener('keydown',key);doc.removeEventListener('focusin',focus);if(prior?.isConnected)prior.focus();};
    },[expanded]);
    return [expanded,()=>expanded?close():setExpanded(true)];
  }
  function NativeVisualFrame({title,children}){
    const container=React.useRef(null),button=React.useRef(null);
    const [expanded,toggle]=useVisualExpansion(container,button);
    return h('section',{ref:container,className:'vie-native-frame'+(expanded?' vie-figure-expanded':''),role:expanded?'dialog':undefined,'aria-modal':expanded?true:undefined,'aria-label':title||'可视化图形'},[
      h('header',{key:'head',className:'vie-generated-heading','aria-label':'图形查看操作'},h('div',{className:'vie-figure-actions'},h('button',{ref:button,type:'button',className:'vie-context-button','aria-expanded':expanded,onClick:toggle},expanded?'收起':'展开'))),
      children
    ]);
  }
  function FigureView({config,nodeId,store}){
    const frame=React.useRef(null),controller=React.useRef(null);
    const [error,setError]=React.useState(''),[zoom,setZoom]=React.useState(false),[small,setSmall]=React.useState(false);
    const container=React.useRef(null),expandButton=React.useRef(null);
    const [expanded,toggle]=useVisualExpansion(container,expandButton,()=>setZoom(false));
    React.useEffect(()=>{controller.current=mountGeneratedFigure(frame.current,config,{initialState:store.local(nodeId)??config.state,onChange:state=>store.setLocal(nodeId,state),currentState:()=>store.local(nodeId),onError:message=>{setError(message);store.setFigureError(nodeId,message);}});const unsubscribe=store.subscribe(()=>{try{controller.current?.update(store.local(nodeId)??config.state);}catch(error){setError(error.message);}});return ()=>{unsubscribe();controller.current?.dispose();controller.current=null;};},[store,nodeId,JSON.stringify(config)]);
    React.useEffect(()=>{const observer=new MutationObserver(()=>setSmall(frame.current?.dataset.vieSmallText==='true'));observer.observe(frame.current,{attributes:true,attributeFilter:['data-vie-small-text']});return ()=>observer.disconnect();},[]);
    return h('section',{ref:container,className:'vie-generated-figure'+(expanded?' vie-figure-expanded':''),key:nodeId,role:expanded?'dialog':undefined,'aria-modal':expanded?true:undefined,'aria-label':expanded?config.title:undefined},[
      h('header',{key:'head',className:'vie-generated-heading'},[h('h3',{key:'title',title:config.title},config.title),h('div',{className:'vie-figure-actions',key:'actions'},[h('button',{type:'button',key:'expand',ref:expandButton,className:'vie-context-button','aria-expanded':expanded,onClick:toggle},expanded?'收起':'展开'),h('button',{type:'button',key:'zoom',className:'vie-context-button','aria-pressed':zoom,onClick:()=>setZoom(!zoom)},zoom?'适合宽度':'放大'),(config.js?.trim()||Object.keys(config.state??{}).length>0)&&h('button',{type:'button',key:'reset',className:'vie-context-button',onClick:()=>controller.current?.reset()},'复位')])]),
      small&&!zoom&&h('p',{key:'small',className:'vie-figure-hint',role:'status'},'图中文字较小，可展开或放大查看。'),
      h('div',{key:'viewport',className:'vie-figure-viewport',tabIndex:zoom?0:undefined,'aria-label':zoom?'放大图形，可横向滚动查看':undefined},h('iframe',{key:'frame',ref:frame,title:config.title,sandbox:'allow-scripts',referrerPolicy:'no-referrer',allow:"camera 'none'; microphone 'none'; geolocation 'none'; clipboard-read 'none'; clipboard-write 'none'",style:{width:zoom?'max(100%, 800px)':'100%',maxWidth:zoom?'none':'100%',height:config.height+'px',border:0},'data-vie-generated':nodeId})),
      error&&h('p',{key:'error',className:'vie-generated-error',role:'alert'},'交互图运行错误：'+error)
    ]);
  }
  function GenericVisual({kind,config,values={}}){
    const root=React.useRef(null),saved=React.useRef({progress:0,playing:undefined});
    const zoom=React.useRef(1);
    const scope=useSvgScope();
    const [selected,setSelected]=React.useState('');
    let markup='',failure='';
    try{markup=scopeSvgMarkup(makeVisualMarkup(kind,config,selected,values),scope);}catch(error){failure=String(error.message);}
    React.useEffect(()=>{if(kind!=='Animation'||failure)return;const controller=mountVisualAnimation(root.current,config,saved.current);return ()=>{saved.current=controller.snapshot?.()??saved.current;controller.dispose();};},[kind,JSON.stringify(config),markup,failure]);
    const applyZoom=()=>{const svg=root.current?.querySelector('.vie-visual-content>svg');if(!svg||!root.current?.querySelector('[data-vie-zoom]'))return;svg.style.width=(zoom.current*100)+'%';svg.style.minWidth='0';svg.style.maxHeight='none';root.current.querySelector('[data-vie-zoom-value]').textContent=Math.round(zoom.current*100)+'%';};
    React.useEffect(applyZoom,[markup]);
    if(failure)return h('p',{className:'vie-diagnostics',role:'alert'},'视觉规范校验失败：'+failure);
    const select=e=>{const control=e.target?.closest?.('[data-vie-zoom]');if(control){const action=control.dataset.vieZoom;zoom.current=action==='fit'?1:Math.min(3,Math.max(.5,zoom.current*(action==='in'?1.25:.8)));applyZoom();return;}const item=e.target?.closest?.('[data-vie-item]');if(item){setSelected(item.getAttribute('data-vie-item'));}};
    const keySelect=e=>{if(e.key==='Enter'||e.key===' '){const item=e.target?.closest?.('[data-vie-item]');if(item){e.preventDefault();setSelected(item.getAttribute('data-vie-item'));}}};
    return h('div',{ref:root,className:'vie-visual-host',onClick:select,onKeyDown:keySelect,dangerouslySetInnerHTML:{__html:markup}});
  }
  function fmt(x,format='number'){
    if(typeof x!=='number'||!Number.isFinite(x))return '—';
    if(format==='integer')return String(Math.round(x));
    if(format==='percent')return `${Number((x*100).toFixed(2))}%`;
    if(format==='signed')return (x>0?'+':'')+(Number.isInteger(x)?x:x.toFixed(2));
    return Number.isInteger(x)?String(x):x.toFixed(2);
  }
  function nodeView(n, env){
    const p=n.props;const value=(p.bind && Object.hasOwn(env.values,p.bind))?env.values[p.bind]:p.value;
    const ch=n.children.map(child=>nodeView(child,env));
    const child=(tag,props,children)=>h(tag,props,children);
    const cls='vie-'+n.type.toLowerCase();
    switch(n.type){
      case 'Flow':case 'RelationGraph':case 'Timeline':case 'Diagram':case 'Animation':return h(NativeVisualFrame,{key:n.id,title:p.title},h(GenericVisual,{key:n.id,kind:n.type,config:p,values:env.values}));
      case 'Chart':return h(NativeVisualFrame,{key:n.id,title:p.title},h(ChartView,{key:n.id,config:p,nodeId:n.id,store:env.store}));
      case 'GenerativeFigure':return h(FigureView,{key:n.id,config:p,nodeId:n.id,store:env.store});
      case 'InteractiveScene':return h(NativeVisualFrame,{key:n.id,title:p.title||'交互场景'},h(ExperimentView,{key:n.id,config:p,nodeId:n.id,store:env.store}));
      case 'InteractiveLab':return h(NativeVisualFrame,{key:n.id,title:'交互实验'},h(SemanticView,{key:n.id,kind:p.kind,nodeId:n.id,store:env.store}));
      case 'CanTimingLab':return h(NativeVisualFrame,{key:n.id,title:'CAN 采样点'},h(CanView,{key:n.id,config:p,nodeId:n.id,store:env.store}));
      case 'Text':return h('section',{className:cls,key:n.id},[p.title&&h('h3',{key:'t'},core.interpolateText(p.title,env.values)),p.body&&h('p',{key:'b'},core.interpolateText(p.body,env.values))]);
      case 'Column':return h('div',{className:'vie-column',key:n.id},ch);
      case 'Row':return h('div',{className:'vie-row',key:n.id},ch);
      case 'Split':return h('div',{className:'vie-split',key:n.id,style:{'--vie-split-ratio':String((p.ratio??0.5)*100)+'%'}},ch);
      case 'Card':return h('section',{className:'vie-card',key:n.id},[p.title&&h('div',{key:'t',className:'vie-card-title'},core.interpolateText(p.title,env.values)),...ch]);
      case 'Divider':return h('hr',{className:'vie-divider',key:n.id});
      case 'Badge':return h('span',{className:'vie-badge',key:n.id},p.label??p.title??'');
      case 'Metric':return h('section',{className:'vie-metric',key:n.id},[
        h('small',{key:'l'},p.label??''),h('strong',{key:'v'},fmt(value,p.format)+(p.unit?' '+p.unit:''))
      ]);
      case 'Slider':case 'NumberInput':case 'Toggle':case 'SegmentedControl':{
        const lower=p.min??0,upper=p.max??100,active=Number.isFinite(value)?value:lower;
        const label=h('span',{className:'vie-control-label',key:'label'},[h('span',{key:'a'},p.label??''),h('b',{key:'b'},(n.type==='Toggle'?(active?'开':'关'):n.type==='SegmentedControl'?(p.options.find(o=>o.value===active)?.label??fmt(active)):fmt(active,p.format))+(p.unit?' '+p.unit:''))]);
        if(n.type==='SegmentedControl')return h('section',{className:'vie-control',key:n.id},[label,h('div',{key:'choices',className:'vie-segmented',role:'group','aria-label':p.label},p.options.map(o=>h('button',{key:o.value,type:'button','aria-pressed':active===o.value,onClick:()=>env.set(p.bind,o.value)},o.label)))]);
        return h('label',{className:'vie-control',key:n.id},[label,h('input',{key:'input',type:n.type==='Toggle'?'checkbox':n.type==='NumberInput'?'number':'range',...(n.type==='Toggle'?{checked:active===1,role:'switch'}:{min:lower,max:upper,step:p.step??1,value:active}),onChange:e=>{if(n.type==='NumberInput'&&(!e.target.value||!e.target.validity.valid))return;env.set(p.bind,n.type==='Toggle'?(e.target.checked?1:0):Number(e.target.value));},'aria-label':p.label??n.id})]);
      }
      case 'Progress':{
        let v=Number.isFinite(value)?value:null;
        if(p.expr){try{v=core.derivedValue(p.expr,env.values);}catch{v=null;}}
        const min=p.min??0,max=p.max??100;
        const valid=Number.isFinite(v)&&max>min;
        const amount=valid?Math.max(0,Math.min(100,(v-min)/(max-min)*100)):0;
        const readable=valid?`${fmt(v,p.format)}${p.unit?' '+p.unit:''} · ${fmt(amount)}%`:'—';
        return h('section',{key:n.id,className:'vie-progress'},[
          h('div',{className:'vie-control-label',key:'label'},[h('span',{key:'a'},p.label??''),h('b',{key:'b'},readable)]),
          h('div',{className:'vie-track',key:'track',role:'progressbar','aria-label':p.label??n.id,
            'aria-valuemin':min,'aria-valuemax':max,...(valid?{'aria-valuenow':v}:{}),'aria-valuetext':readable},
            h('div',{className:'vie-track-fill',style:{width:amount+'%'}}))
        ]);
      }
      case 'Button':return h('button',{className:'vie-button',key:n.id,type:'button',onClick:()=>{
        if(p.action==='reset'&&p.target)env.reset(p.target);
        if(p.action==='set'&&p.target&&p.setValue!==undefined)env.set(p.target,p.setValue);
      }},p.label??'按钮');
      case 'BarChart':return h(BarChartView,{key:n.id,config:p,nodeId:n.id,store:env.store,values:env.values});
      case 'MotionScene':{
        const distance=Number.isFinite(value)?value:0;
        const lo=Number.isFinite(p.min)?p.min:0,hi=Number.isFinite(p.max)?p.max:400;
        const portion=hi>lo?Math.max(0,Math.min(1,(distance-lo)/(hi-lo))):0;
        const cx=60+portion*508;
        return h('section',{className:'vie-motion',key:n.id},[
          h('div',{className:'vie-motion-header',key:'head'},[
            h('span',{key:'title'},p.title??'运动距离'),h('strong',{key:'value'},`${fmt(distance)} ${p.unit??''}`)
          ]),
          h('svg',{viewBox:'0 0 628 142',role:'img','aria-label':`小汽车从起点行驶 ${fmt(distance)} ${p.unit??''}`,key:'svg'},[
            h('rect',{key:'road',x:19,y:111,width:590,height:13,rx:6.5,fill:'var(--vie-layer)'}),
            ...[0,1,2,3,4,5,6,7,8,9,10].map(i=>h('line',{key:'lane'+i,x1:31+i*55,y1:117,x2:52+i*55,y2:117,stroke:'#c2cbd4',strokeWidth:2.2,strokeLinecap:'round'})),
            h('path',{key:'trail',d:`M60 106H${cx}`,fill:'none',stroke:'#5a92f3',strokeWidth:3,strokeLinecap:'round'}),
            h('circle',{key:'origin',cx:60,cy:106,r:4.5,fill:'#617891'}),
            h('g',{key:'car',transform:`translate(${cx-32} 0)`,className:'vie-car',children:[
              h('path',{key:'cabin',d:'M9 82 L19 65 Q22 61 27 61 H43 Q47 61 50 65 L58 82Z',fill:'#8fc1fa'}),
              h('path',{key:'window',d:'M23 66H32V81H13L20 68Q21 66 23 66ZM36 66H43Q45 66 46 68L53 81H36Z',fill:'#e5f4ff'}),
              h('rect',{key:'body',x:0,y:80,width:65,height:25,rx:9,fill:'#397be6'}),
              h('rect',{key:'stripe',x:5,y:85,width:50,height:2.5,rx:1.25,fill:'#8bb9ff'}),
              h('rect',{key:'light',x:59,y:88,width:8,height:9,rx:3,fill:'#f5cb61'}),
              h('circle',{key:'wheel1',cx:15,cy:105,r:9,fill:'#25374f'}),
              h('circle',{key:'wheel2',cx:51,cy:105,r:9,fill:'#25374f'}),
              h('circle',{key:'hub1',cx:15,cy:105,r:4,fill:'#c8d7e8'}),
              h('circle',{key:'hub2',cx:51,cy:105,r:4,fill:'#c8d7e8'})
            ]}),
            h('text',{key:'originLabel',x:19,y:138},`${fmt(lo)} ${p.unit??''}`),
            h('text',{key:'endLabel',x:609,y:138,textAnchor:'end'},`${fmt(hi)} ${p.unit??''}`)
          ])
        ]);
      }
      case 'FunctionPlot':return h(FunctionPlotView,{key:n.id,config:p,values:env.values});
      default:return null;
    }
  }
  function FunctionPlotView({config:p,values}){
    const scope=useSvgScope();
    const variables=Object.fromEntries(Object.entries(values).filter(([k,v])=>typeof v==='number').map(([k,v])=>[k.split('/').at(-1),v]));
    const visual=cachedFunctionPlot(p.expr??'x',variables,{...p,sampleX:typeof p.sampleX==='string'?values[p.sampleX]:p.sampleX});
    return h('section',{className:'vie-chart vie-function-plot'},[
      p.title&&h('div',{className:'vie-chart-title',key:'title'},p.title),
      h('div',{key:'image',className:'vie-chart-drawing',dangerouslySetInnerHTML:{__html:scopeSvgMarkup(visual.svg,scope)}}),
      h('div',{key:'info',className:'vie-chart-note','data-plot-info':true},visual.info)
    ]);
  }
  function BarChartView({config,values={}}){
    const [selected,setSelected]=React.useState(0);
    const unavailable=config.data.map((v,i)=>typeof v==='string'&&!Number.isFinite(values[v])?i:-1).filter(i=>i>=0);
    // Missing bindings are displayed explicitly. Zero-height placeholders are NOT measurements.
    const safeData=config.data.map(v=>typeof v==='string'?(Number.isFinite(values[v])?values[v]:0):v);
    let visual;try{visual=barChartSVG({...config,data:safeData,unavailableIndices:unavailable,sourceLabel:unavailable.length?'部分数值未就绪，空柱仅为占位（不计为测量值）':config.sourceLabel,showAverage:unavailable.length?false:config.showAverage},selected);}catch(error){return h('p',{className:'vie-chart-note'},'数据暂不可用：'+String(error.message));}
    const act=e=>{const target=e.target?.closest?.('[data-bar-index]');if(!target)return;setSelected(Number(target.getAttribute('data-bar-index')));};
    const keyAct=e=>{if(e.key==='Enter'||e.key===' '){const target=e.target?.closest?.('[data-bar-index]');if(target){e.preventDefault();setSelected(Number(target.getAttribute('data-bar-index')));}}};
    return h('section',{className:'vie-chart vie-bar-chart'},[
      h('div',{className:'vie-chart-title',key:'title'},visual.title),
      h('div',{className:'vie-chart-drawing',key:'svg',onClick:act,onKeyDown:keyAct,dangerouslySetInnerHTML:{__html:visual.svg}}),
      h('div',{className:'vie-chart-note',key:'summary','data-chart-selection':true,role:unavailable.length?'status':undefined},unavailable.length?`等待有效数据：${unavailable.map(i=>config.labels[i]).join('、')}`:visual.selected),
      h('div',{className:'vie-chart-footer',key:'footer'},[
        config.showAverage!==false&&!unavailable.length&&h('span',{key:'average'},`平均值 ${fmt(visual.average)} ${visual.unit}`),
        h('span',{key:'source'},visual.sourceLabel)
      ]),
      h('details',{className:'vie-raw-data',key:'raw'},[
        h('summary',{key:'summary'},`查看原始数据（${visual.data.length} 条）`),
        h('div',{className:'vie-data-table',key:'table'},visual.labels.map((label,i)=>h('div',{key:i},[h('span',{key:'name'},label),h('strong',{key:'val'},unavailable.includes(i)?'— 等待有效数据':`${fmt(visual.data[i])} ${visual.unit}`)])))
      ])
    ]);
  }
  function Scene({source='',title='Visual Interactive Engine · 交互画面',callId='local',inputActions=null}){
    const [copyStatus,setCopyStatus]=React.useState('');
    const storeRef=React.useRef(null);
    if(storeRef.current===null)storeRef.current=core.getSceneStore?core.getSceneStore(callId,source):new core.SceneStore(source);
    const store=storeRef.current;
    // External store subscription produces an immutable revision signal. The
    // renderer never mutates parser state while React is rendering.
    const subscribe=React.useCallback(callback=>store.subscribe(callback),[store]);
    const getVersion=React.useCallback(()=>store.getVersion(),[store]);
    React.useSyncExternalStore(subscribe,getVersion,()=>0);
    React.useLayoutEffect(()=>{
      try{store.updateSource(source);}catch(error){console.warn('[VIE] invalid streamed source',error);}
    },[store,source]);
    const env={...store.snapshot(),store,
      set:(path,value)=>{try{store.set(path,value);}catch(e){console.warn('[VIE] invalid input',e);}},
      reset:path=>{try{store.reset(path);}catch(e){console.warn('[VIE] invalid reset',e);}}
    };
    return h('div',{className:'vie-shell','data-vie-surface':callId},[
      h('div',{className:'vie-body'+(['story-scene','document-scene'].includes(env.id)?' vie-body--article':''),key:'body'},[
        env.tree.length?env.tree.map(n=>nodeView(n,env)):h('div',{className:'vie-empty',key:'empty'},
          env.errors.length?'无法呈现该界面，请检查诊断信息。':'正在生成界面…'),
        (store.parser.modified.size||Object.keys(store.localState).length||Object.keys(store.figureErrors).length)?h('div',{key:'context',className:'vie-context-row'},[
          inputActions?.insertText&&h('button',{key:'insert',type:'button',className:'vie-context-button',onClick:()=>{const text='请结合当前交互参数继续解释：'+JSON.stringify(store.context());try{const applied=inputActions.insertText(text,inputActions.captureInsertion());setCopyStatus(applied?'参数已放入提问框，可补充问题后发送':'提问框已变化，请重试');}catch{setCopyStatus('暂时无法插入，请复制当前参数');}}},'带参数继续提问'),
          h('button',{key:'copy',type:'button',className:'vie-context-button',onClick:async()=>{
            const summary=JSON.stringify(store.context());
            try{
              if(typeof navigator==='undefined'||!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');
              await navigator.clipboard.writeText('当前交互场景状态：'+summary);
              setCopyStatus('已复制，可粘贴给 AI');
            }catch{setCopyStatus('复制失败，请使用浏览器的复制功能');}
          }},'复制当前参数'),
          copyStatus&&h('span',{key:'status',role:'status'},copyStatus)
        ]):null,
        env.diagnostics?.length?h('div',{key:'runtime',className:'vie-runtime-diagnostics',role:'status'},env.diagnostics.slice(0,3).map(d=>h('p',{key:d.path},`计算暂不可用 ${d.path} (${d.code})：${d.message}`))):null,
        env.errors.length?h('details',{key:'errors',className:'vie-diagnostics'},[
          h('summary',{key:'s'},`诊断信息 (${env.errors.length})`),
          h('pre',{key:'p'},env.errors.slice(0,8).join('\n'))]):null
      ])
    ]);
  }
  return Scene;
}

/**
 * VIE's Tool View is an in-progress preview. When a Turn settles, DSH's
 * conversation.chat.turnTail renders the durable tool-result scene outside
 * the collapsible work-process area.
 */
const name='dsh-Visual-Interactive-Engine';
const inject=['slots','uiConversation'];

function createViews(React,bridge){
  const View=makeReactView(React,{VIEStream,SceneStore,evaluate,derivedValue,interpolateText,getSceneStore:(key,source)=>bridge.getStore(key,source)});

  function VIEToolView(props){
    const raw=typeof props.useToolCallArgumentsPartial==='function'?props.useToolCallArgumentsPartial():'';
    const staticRaw=props.block?.argsRaw??props.block?.call?.argsRaw??'';
    const argsRaw=raw.length>=staticRaw.length?raw:staticRaw;
    const decoderRef=React.useRef(null);
    if(decoderRef.current===null)decoderRef.current=new IncrementalToolArguments({fields:['source','preset','kind','spec','document','query','templateId','parameters','caption','placement']});
    const legacyDecoder=decoderRef.current;
    // Current DSH observes lazy PartialArguments queries during every render.
    // Older hosts remain supported by the cumulative raw decoder.
    const partial=props.block?.args;
    let decoder=legacyDecoder,fields;
    if(partial&&typeof partial.text==='function'){
      fields=Object.create(null);const completeArgs={};
      for(const key of ['title','source','preset','kind','spec','document','query','templateId','parameters','caption','placement','dataset','state','derive']){
        const value=partial.text(key);if(typeof value==='string'){fields[key]=value;if(partial.complete(key))completeArgs[key]=value;}
      }
      for(const key of ['speed','time','a','clockMHz','prescaler','bs1','bs2','compareBs1','compareBs2','sjw']){const value=partial.value(key);if(value!==undefined)completeArgs[key]=value;}
      const document=partial.value('document');if(document&&typeof document==='object'){fields.document=JSON.stringify(document);if(partial.complete('document'))completeArgs.document=document;}
      decoder={completedObject:()=>partial.closed()?completeArgs:null};
    }else fields=legacyDecoder.update(argsRaw);
    const documentPreview=React.useRef(null);if(documentPreview.current===null)documentPreview.current=new DocumentPreview();
    const preview=fields.source??'';
    const preset=fields.preset??'';
    const kind=fields.kind??'';
    const presetCache=React.useRef({key:'',source:''});
    let fastSource=(fields.document??fields.spec)?documentPreview.current.update(fields.document??fields.spec):'';
    if(['motion','quadratic','data','can',...Object.keys(SEMANTIC_LABS)].includes(preset)){
      try {
        const args=decoder.completedObject(),config={};
        if(args){
          for(const field of ['speed','time','a','clockMHz','prescaler','bs1','bs2','compareBs1','compareBs2','sjw'])
            if(args[field]!==undefined)config[field]=args[field];
          if(preset==='data'&&typeof args.dataset==='string'&&args.dataset.length<=1200)
            Object.assign(config,JSON.parse(args.dataset));
        }
        const cacheKey=preset+'|'+JSON.stringify(config);
        if(presetCache.current.key!==cacheKey) presetCache.current={key:cacheKey,source:makePresetSource(preset,config)};
        fastSource=presetCache.current.source;
      }catch{
        try{
          const key=preset+'|{}';
          if(presetCache.current.key!==key)presetCache.current={key,source:makePresetSource(preset)};
          fastSource=presetCache.current.source;
        }catch{}
      }
    }
    if(!kind){try{const args=decoder.completedObject();if(args?.spec&&!args?.kind){const spec=JSON.parse(args.spec);fastSource=spec.blocks?documentSceneSource(spec):storySceneSource(spec);}}catch{}}
    if(VISUAL_KINDS.includes(kind)){
      try{const args=decoder.completedObject();if(args?.spec){fastSource=visualSceneSource(kind,JSON.parse(args.spec),{state:args.state===undefined?{}:JSON.parse(args.state),derive:args.derive===undefined?{}:JSON.parse(args.derive)});}}catch{}
    }
    // The unified router reuses the same validated source factory as the Host.
    // Never preview arbitrary JSON as graphics; await a fully valid arguments object.
    try{
      const args=decoder.completedObject();
      if(args&&typeof args.query==='string'){
        const route=routeTemplate(args.query);
        const id=args.templateId||(route.status==='matched'?route.id:null);
        if(id){
          const parameters=args.parameters===undefined?{}:JSON.parse(args.parameters);
          const spec=args.spec===undefined?undefined:JSON.parse(args.spec);
          fastSource=buildTemplateScene({templateId:id,parameters,spec}).source;
        }
      }
    }catch{}
    const meta=props.block?.meta??props.block?.result?.meta??props.block?.call?.meta;
    const settled=props.phase==='result'&&meta?.kind==='vie';
    const key=bridge.sceneKey(props.sessionId,props.callId);
    const subscribe=React.useCallback(cb=>bridge.subscribe(cb),[bridge]);
    const isShown=React.useCallback(()=>bridge.isShown(key),[bridge,key]);
    const published=React.useSyncExternalStore(subscribe,isShown,()=>false);
    if(published){
      return React.createElement('span',{className:'vie-published-marker',role:'status'},'交互界面已在回答中显示');
    }
    if(settled&&meta.valid===false){
      return React.createElement('div',{className:'vie-error',role:'alert'},[
        React.createElement('strong',{key:'title'},'界面校验未通过'),
        React.createElement('details',{key:'details'},[
          React.createElement('summary',{key:'summary'},'查看错误原因'),
          React.createElement('pre',{key:'errors'},(Array.isArray(meta.errors)?meta.errors.slice(0,8):[meta.error||'未提供诊断']).join('\n'))
        ])
      ]);
    }
    const source=settled?(meta.source??''):(fastSource||preview);
    const caption=settled?meta?.caption:(decoder.completedObject()?.caption??'');
    const visual=React.createElement(View,{key,source,title:settled?meta.title:'Visual Interactive Engine · 交互画面',callId:key,inputActions:props.inputActions});
    if(typeof caption!=='string'||!caption.trim())return visual;
    return React.createElement('div',{className:'vie-annotated-surface','data-vie-surface':true},
      visual,React.createElement('p',{className:'vie-figure-caption'},caption.slice(0,140))); 
  }

  function VIETurnTailView(props){
    // This DSH version uses a LIST slot: read the Turn projection from props.turn.
    // Retain matched as a forward-compatibility fallback for chain owners.
    const source=props.turn?.data?.source?.(VIE_TURN_KIND);
    const subscribe=React.useCallback(callback=>source?.subscribe(callback)??(()=>{}),[source]);
    const read=React.useCallback(()=>source?.getSnapshot()??selectVIETurnTail(props),[source,props.turn?.data]);
    const projected=React.useSyncExternalStore(subscribe,read,()=>null);
    const scenes=(props.matched?.items??projected?.items??[]).filter(item=>item.placement!=='process');
    // The owner supplies the session binding; never leak a scene across sessions.
    const sessionId=props.sessionId;
    const keys=scenes.map(item=>bridge.sceneKey(sessionId,item.callId));
    const keysToken=keys.join('\u0001');
    React.useEffect(()=>{
      for(const key of keys)bridge.show(key);
      return ()=>{for(const key of keys)bridge.hide(key);};
    },[keysToken]);
    if(scenes.length===0)return null;
    return React.createElement('section',{className:'vie-tail','data-vie-turn-tail':true},scenes.map(item=>
      React.createElement('div',{className:'vie-tail-item',key:item.callId},[
        React.createElement('div',{key:'label',className:'vie-tail-label'},item.title),
        React.createElement(View,{key:'scene',source:item.source,title:item.title,callId:bridge.sceneKey(sessionId,item.callId),inputActions:props.inputActions}),
        item.caption?React.createElement('p',{key:'caption',className:'vie-figure-caption'},item.caption):null
      ])
    ));
  }
  function VIEAnswerView(props){
    const items=props.node?.data?.items??[],signature=items.map(x=>x.callId+':'+(x.latestCallId??'')).join('|');
    React.useEffect(()=>{const keys=items.flatMap(x=>[bridge.sceneKey(props.sessionId,x.callId),...x.latestCallId?[bridge.sceneKey(props.sessionId,x.latestCallId)]:[]]);keys.forEach(k=>bridge.show(k));return ()=>keys.forEach(k=>bridge.hide(k));},[props.sessionId,signature]);
    return React.createElement('section',{className:'vie-answer','data-vie-answer':true},items.map(item=>React.createElement('div',{key:item.callId,'data-vie-answer-item':item.callId},[
      item.source?React.createElement(View,{key:'view',source:item.source,title:item.title,callId:bridge.sceneKey(props.sessionId,item.callId),inputActions:props.inputActions}):null,
      item.pending?React.createElement('p',{key:'pending',className:'vie-generation-status',role:'status'},item.source?'图解已可操作，正在补充解释…':'正在生成图解…'):null,
      item.interrupted?React.createElement('p',{key:'partial',role:'status'},'本次生成已停止；已完成的内容保留。'):null,
      item.repairError?React.createElement('p',{key:'repair-error',className:'vie-error',role:'alert'},'修订失败，已保留原图：'+item.repairError):null,
      item.error?React.createElement('p',{key:'error',className:'vie-error',role:'alert'},item.error):null,
      item.caption?React.createElement('p',{key:'caption',className:'vie-figure-caption'},item.caption):null
    ])));
  }
  return {VIEToolView,VIETurnTailView,VIEAnswerView};
}

function makeView(React){
  return createViews(React,createVIEBridge(SceneStore)).VIEToolView;
}

function apply(ctx){
  if(typeof document!=='undefined'&&!document.getElementById('vie-v0250-theme')){
    const st=document.createElement('style');st.id='vie-v0250-theme';st.textContent=VIE_CSS;document.head.appendChild(st);
  }
  const ModeControl=createVIEModeView(require('react'),require('react-dom'));
  ctx.inject?.(['sessions','remote.commands'],child=>child.slots.inject('conversation.input.activity',()=>child.slots.register({name:'conversation.input.activity',inject:sessionId=>({flip:async mode=>{const result=await child.remote.commands.execute(sessionId,'/vie '+mode,[]);if(!result.ok)throw Error(result.error?.message??'切换失败');if(result.value===undefined)throw Error('当前宿主未注册 /vie 命令');if(result.value.result?.kind==='error')throw Error(result.value.result.text);}})},ModeControl)));
  const bridge=createVIEBridge(SceneStore);
  const {VIEToolView,VIETurnTailView,VIEAnswerView}=createViews(require('react'),bridge);
  // Register the durable Turn projection before subscribing the tail seat.
  ctx.uiConversation.events.register(createVIETurnDefinition());
  ctx.uiConversation.events.register(createVIEAnswerDefinition());
  ctx.uiConversation.events.register(createVIEFlowDefinition());
  ctx.uiConversation.events.register(createVIEProseDefinition());
  ctx.slots.inject('conversation.chat.node',()=>ctx.slots.register({name:'conversation.chat.node',key:VIE_ANSWER_KIND},VIEAnswerView));
  ctx.slots.inject('conversation.chat.node',()=>ctx.slots.register({name:'conversation.chat.node',key:VIE_FLOW_KIND},VIEAnswerView));
  ctx.slots.inject('tool.call.toolview',()=>{
    const registrations=['vie_explain','vie_quick','vie_render','vie_compose','vie_story','vie_auto'].map(key=>ctx.slots.register({name:'tool.call.toolview',key},VIEToolView));
    return ()=>registrations.forEach(fn=>{if(typeof fn==='function')fn();});
  });
  ctx.slots.inject('conversation.chat.turnTail',()=>ctx.slots.register({
    name:'conversation.chat.turnTail',
    id:'dsh-vie',
    order:20,
  },VIETurnTailView));
  // Diagnostic only: if the browser's module was never materialized, this
  // marker will be absent. No HMR rewriting or unverified bootstrap hack.
  if(typeof window!=='undefined')window.__VIE_CLIENT_STATUS__={version:'0.28.0',activated:true,at:Date.now()};
}

exports.name=name;exports.inject=inject;exports.apply=apply;return module.exports;
}});
