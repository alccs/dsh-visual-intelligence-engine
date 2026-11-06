const {makeVisualMarkup,makeVisualSVG}=(()=>{
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
function makeVisualMarkup(kind,input,selected='',values={},flowState){
  const s=resolveVisual(input,kind,values);
  const selectedId=kind==='Timeline'?s.items.find(i=>i.id===selected)?.id:(kind==='Diagram'||kind==='Animation')?s.shapes.find(i=>i.id===selected)?.id:s.nodes.find(i=>i.id===selected)?.id;
  const chosen=selectedId||'';
  let visual='';
  if(kind==='Flow')return flowMarkup(s,chosen,flowState);
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

function makeVisualSVG(kind,input,values={}){const spec=resolveVisual(input,kind,values);return kind==='Flow'?flowSVG(spec,'',true):kind==='RelationGraph'?graphSVG(spec,'',true):kind==='Diagram'||kind==='Animation'?diagramSVG(spec,''):'';}
return {makeVisualMarkup,makeVisualSVG};
})();
