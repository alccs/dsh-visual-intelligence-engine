/** Measured-budget multiline labels, with full text retained in aria/detail. */
function wrappedText(x,y,label,width,fontSize=13,maxLines=3,extra=''){
  const lines=[];let line='',units=0;const capacity=Math.max(3,(width-16)/fontSize);
  for(const char of Array.from(label)){const size=/[\u2e80-\uffff]/u.test(char)?1:.58;if(units+size>capacity&&line){lines.push(line);line='';units=0;}line+=char;units+=size;}
  if(line)lines.push(line);
  if(lines.length>maxLines){lines.length=maxLines;lines[maxLines-1]=lines[maxLines-1].slice(0,-1)+'…';}
  const step=fontSize*1.23,top=y-(lines.length-1)*step/2;
  return `<text font-size="${fontSize}" text-anchor="middle" ${extra}>${lines.map((value,i)=>`<tspan x="${x}" y="${(top+i*step).toFixed(2)}">${esc(value)}</tspan>`).join('')}</text>`;
}
/** Rank by declared edges, never by the authoring array. SVG keeps full labels in accessible names. */
function flowSVG(spec,selected,compact=false){
  const graph=layoutFlow(spec),horizontal=spec.layout==='horizontal'||!compact&&spec.layout!=='vertical'&&graph.rows.length===spec.nodes.length&&spec.nodes.length<=4;
  const columns=Math.max(...graph.rows.map(r=>r.length)),margin=compact?20:30,h=compact?78:60,gap=compact?50:54;
  const nodeWidth=horizontal?(compact?118:142):columns===1?(compact?246:280):(compact?Math.max(84,Math.min(110,(320-margin*2-(columns-1)*12)/columns)):Math.max(154,Math.min(194,(680-margin*2-(columns-1)*24)/columns)));
  const W=horizontal?Math.max(compact?320:680,graph.rows.length*(nodeWidth+26)+margin*2-26):Math.max(compact?320:680,columns*nodeWidth+(columns-1)*(compact?12:24)+margin*2);
  const H=horizontal?Math.max(160,columns*(h+gap)+margin*2-gap):graph.rows.length*(h+gap)+margin*2-gap;
  const locations=new Map(),tones=new Map();
  graph.rows.forEach((row,r)=>row.forEach((id,i)=>{const w=horizontal?nodeWidth:row.length===1?(compact?246:280):Math.max(compact?84:154,Math.min(compact?144:194,(W-margin*2-(row.length-1)*(compact?12:24))/row.length));const x=horizontal?(W-graph.rows.length*w-(graph.rows.length-1)*26)/2+r*(w+26):(W-row.length*w-(row.length-1)*(compact?12:24))/2+i*(w+(compact?12:24));const y=horizontal?(H-row.length*h-(row.length-1)*gap)/2+i*(h+gap):margin+r*(h+gap);locations.set(id,{x,y,w,h});tones.set(id,row.length>1?['primary','secondary','accent'][i%3]:'muted');}));
  const edges=spec.edges.map((edge,i)=>{
    const a=locations.get(edge.from),b=locations.get(edge.to),ax=a.x+a.w/2,ay=a.y+a.h/2,bx=b.x+b.w/2,by=b.y+b.h/2;
    let path,lx,ly,lw=compact?72:116;
    if(edge.from===edge.to){const x=a.x+a.w,reach=Math.max(8,Math.min(compact?42:68,W-x-6));path=`M${x} ${ay-14}C${x+reach} ${ay-52} ${x+reach} ${ay+52} ${x} ${ay+14}`;lx=x+reach*.5;ly=ay;lw=Math.min(lw,Math.max(28,reach));}
    else if(graph.ranks[edge.to]<=graph.ranks[edge.from]){const rail=8+(i%3)*5;path=`M${a.x} ${ay}H${rail}V${by}H${b.x}`;lx=rail+Math.min(lw/2,32);ly=(ay+by)/2;lw=compact?60:86;}
    else if(horizontal){const sx=a.x+a.w,ex=b.x,mx=(sx+ex)/2;path=`M${sx} ${ay}H${mx}V${by}H${ex}`;lx=mx;ly=(ay+by)/2-9;lw=compact?62:96;}
    else{const sy=a.y+a.h,ey=b.y,middle=(sy+ey)/2;path=`M${ax} ${sy}V${middle}H${bx}V${ey}`;lx=ax===bx?ax+Math.min(lw/2+6,78):bx;ly=middle-8;}
    const label=edge.label?`<g class="vie-flow-edge-label"><title>${esc(edge.label)}</title>${wrappedText(lx,ly,edge.label,lw,compact?11:11.5,2,'fill="var(--vie-muted,#788698)" stroke="var(--vie-bg,#fff)" stroke-width="3" paint-order="stroke" stroke-linejoin="round"')}</g>`:'';
    return `<path data-vie-flow-edge="${i}" ${edge.from===edge.to?'data-vie-self-loop="true"':''} d="${path}" fill="none" stroke="var(--vie-flow-line,#bdc9dc)" stroke-width="1.5" stroke-linejoin="round" ${edge.kind==='line'?'':'marker-end="url(#vie-arrow-head)"'}><title>${esc(edge.label??'')}</title></path>${label}`;
  }).join('');
  const cards=spec.nodes.map(n=>{const r=locations.get(n.id),tone=n.role&&n.role!=='default'&&n.role!=='neutral'?roleTone[n.role]:tones.get(n.id),active=n.id===selected;return `<g data-vie-item="${esc(n.id)}" data-vie-flow-rank="${graph.ranks[n.id]}" tabindex="0" role="button" aria-pressed="${active}" aria-label="${esc(n.label)}" class="vie-svg-item${active?' is-active':''}"><title>${esc(n.label)}</title><rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="11" fill="${bg(tone)}" stroke="${active?color(tone):'var(--vie-stroke,#dce2eb)'}" stroke-width="${active?2:1.2}"/>${wrappedText(r.x+r.w/2,r.y+r.h/2+4,n.label,r.w,compact?12:14,3,`font-weight="600" fill="${tone==='muted'?'var(--vie-ink,#35435a)':color(tone)}"`)}</g>`;}).join('');
  return svgOpen(W,H,spec.title).replace('class="vie-visual-svg"',`class="vie-visual-svg vie-flow-svg ${compact?'vie-visual-mobile-svg':'vie-visual-desktop-svg'}" style="min-width:${W}px"`)+edges+cards+'</svg>';
}
function flowMarkup(spec,selected,input){
  const state=validateFlowState(spec,input),current=spec.nodes.find(n=>n.id===state.history.at(-1)),nodes=new Map(spec.nodes.map(n=>[n.id,n]));
  const mode=`<div class="vie-flow-modes" role="group" aria-label="流程图阅读方式"><button type="button" data-vie-flow-action="overview" aria-pressed="${state.presentation==='overview'}">全景总览</button><button type="button" data-vie-flow-action="guided" aria-pressed="${state.presentation==='guided'}">逐步引导</button></div>`;
  const head=`<header class="vie-flow-heading"><div><strong>${esc(spec.title)}</strong>${spec.subtitle?`<p>${esc(spec.subtitle)}</p>`:''}</div>${mode}</header>`;
  if(state.presentation==='overview'){
    const tree=wideFlowTree(spec);
    const found=nodes.get(selected),info=found?`<aside class="vie-flow-detail" role="status"><strong>${esc(found.label)}</strong><span>${esc(found.detail??'已选中此节点；连线表示声明的关系。')}</span></aside>`:'<p class="vie-visual-hint">点击节点查看说明 · 并列分支按连线关系排列</p>';
    return `<section class="vie-visual-panel vie-flow-panel" data-vie-visual="Flow" data-vie-flow-presentation="overview">${head}<div class="vie-visual-content vie-flow-scroll" tabindex="0" aria-label="流程图；宽图可横向滚动查看">${tree?flowTreeMarkup(spec,selected,tree):flowSVG(spec,selected)+flowSVG(spec,selected,true)}</div>${info}</section>`;
  }
  const outgoing=spec.edges.filter(e=>e.from===current.id),choice=state.choice??(outgoing.length===1?outgoing[0].to:undefined),target=nodes.get(choice),finished=outgoing.length===0,limited=state.history.length>=64;
  const history=`<nav class="vie-flow-rail" aria-label="已走过的流程路径">${state.history.map((id,i)=>`<button type="button" data-vie-flow-action="seek" data-vie-flow-index="${i}" ${i===state.history.length-1?'aria-current="step"':''}><span>${i+1}</span><span>${esc(nodes.get(id).label)}</span></button>`).join('')}</nav>`;
  const roots=layoutFlow(spec).roots,rootChoices=roots.length>1&&state.history.length===1?`<div class="vie-flow-roots" role="group" aria-label="选择流程起点">${roots.map(id=>`<button type="button" data-vie-flow-action="root" data-vie-flow-target="${esc(id)}" aria-pressed="${id===current.id}">${esc(nodes.get(id).label)}</button>`).join('')}</div>`:'';
  const options=outgoing.length?`<div class="vie-flow-choices" role="group" aria-label="选择下一条路径">${outgoing.map((edge,i)=>`<button type="button" data-vie-flow-action="choice" data-vie-flow-target="${esc(edge.to)}" aria-pressed="${choice===edge.to}"><span><strong>${esc(edge.label||nodes.get(edge.to).label)}</strong>${edge.label?`<small>${esc(nodes.get(edge.to).label)}</small>`:''}</span><span class="vie-flow-choice-mark" aria-hidden="true">${choice===edge.to?'✓':'→'}</span></button>`).join('')}</div>`:'';
  const preview=target?`<div class="vie-flow-result" aria-live="polite"><strong>下一步：${esc(target.label)}</strong>${target.detail?`<p>${esc(target.detail)}</p>`:''}</div>`:'';
  return `<section class="vie-visual-panel vie-flow-panel" data-vie-visual="Flow" data-vie-flow-presentation="guided">${head}<div class="vie-flow-guided">${history}<div class="vie-flow-work">${rootChoices}<h3 data-vie-flow-current tabindex="-1">${esc(current.label)}</h3>${current.detail?`<p class="vie-flow-description">${esc(current.detail)}</p>`:''}${options}${preview}${finished?'<p class="vie-flow-terminal" role="status">当前路径已到终点，可返回查看其他分支。</p>':''}${limited&&!finished?'<p class="vie-flow-terminal" role="status">已记录 64 步，请重新开始查看；没有自动跳过循环。</p>':''}<footer class="vie-flow-footer"><span>已查看 ${state.history.length} 个节点</span><div><button type="button" data-vie-flow-action="back" ${state.history.length<2?'disabled':''}>上一步</button>${finished||limited?'<button type="button" data-vie-flow-action="restart">重新开始</button>':`<button type="button" class="vie-flow-next" data-vie-flow-action="next" ${!choice?'disabled':''}>下一步 →</button>`}</div></footer></div></div></section>`;
}
/** CSS tree connections follow parent groups; conditions live inside their own node card. */
function flowTreeMarkup(spec,selected,tree){
  const nodes=new Map(spec.nodes.map(n=>[n.id,n]));
  const draw=(id,incoming,depth,tone='primary')=>{
    const node=nodes.get(id),children=tree.children.get(id),split=depth===0&&children.length>1&&children.length<=3,hasCondition=!!incoming?.label,different=hasCondition&&incoming.label!==node.label;
    const condition=different?`<span class="vie-flow-tree-condition" data-vie-flow-condition>${esc(incoming.label)}</span>`:'';
    const childList=children.length?`<ul class="vie-flow-tree-children ${split?'is-split':'is-stack'}" style="--vie-flow-columns:${children.length}">${children.map((e,i)=>draw(e.to,e,depth+1,depth===0?['primary','secondary','accent'][i%3]:tone)).join('')}</ul>`:'';
    return `<li class="vie-flow-tree-node${depth===0?' is-root':''}${split?' has-split':''}" data-vie-flow-node="${esc(id)}" ${incoming?`data-vie-flow-edge="${incoming.index}" data-vie-flow-parent="${esc(incoming.from)}"`:''} style="--vie-flow-branch:${color(tone)}"><button type="button" data-vie-item="${esc(id)}" class="vie-flow-tree-card" aria-pressed="${id===selected}" aria-label="${esc(node.label)}">${condition}<strong ${hasCondition&&!different?'data-vie-flow-condition':''}>${esc(node.label)}</strong></button>${childList}</li>`;
  };
  return `<div class="vie-flow-tree" role="group" aria-label="按父分支分组的完整流程"><ul class="vie-flow-tree-roots">${tree.roots.map(id=>draw(id,null,0)).join('')}</ul></div>`;
}
