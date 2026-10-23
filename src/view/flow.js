/** Measured-budget multiline labels, with full text retained in aria/detail. */
function wrappedText(x,y,label,width,fontSize=13,maxLines=3,extra=''){
  const lines=[];let line='',units=0;const capacity=Math.max(3,(width-16)/fontSize);
  for(const char of Array.from(label)){const size=/[\u2e80-\uffff]/u.test(char)?1:.58;if(units+size>capacity&&line){lines.push(line);line='';units=0;}line+=char;units+=size;}
  if(line)lines.push(line);
  if(lines.length>maxLines){lines.length=maxLines;lines[maxLines-1]=lines[maxLines-1].slice(0,-1)+'…';}
  const step=fontSize*1.23,top=y-(lines.length-1)*step/2;
  return `<text font-size="${fontSize}" text-anchor="middle" ${extra}>${lines.map((value,i)=>`<tspan x="${x}" y="${(top+i*step).toFixed(2)}">${esc(value)}</tspan>`).join('')}</text>`;
}
function flowSVG(spec,selected,compact=false){
  const horizontal=!compact&&(spec.layout==='horizontal'||spec.layout!=='vertical'&&spec.nodes.length<=4);
  const W=compact?320:680,H=horizontal?210:spec.nodes.length*112+24;
  const locations=new Map();
  spec.nodes.forEach((node,i)=>{const width=horizontal?Math.min(142,W/spec.nodes.length-24):compact?210:326;locations.set(node.id,{x:horizontal?W*(i+.5)/spec.nodes.length-width/2:(W-width)/2,y:horizontal?78:18+i*112,w:width,h:76});});
  const edges=spec.edges.map((edge,i)=>{
    const a=locations.get(edge.from),b=locations.get(edge.to),from=spec.nodes.findIndex(n=>n.id===edge.from),to=spec.nodes.findIndex(n=>n.id===edge.to);
    const ax=a.x+a.w/2,ay=a.y+a.h/2,bx=b.x+b.w/2,by=b.y+b.h/2;
    let path,lx,ly,lw=compact?60:112;
    if(edge.from===edge.to&&horizontal){path=`M${ax-18} ${a.y}C${ax-58} ${a.y-60} ${ax+58} ${a.y-60} ${ax+18} ${a.y}`;lx=ax;ly=a.y-38;lw=Math.min(100,a.w);}else if(edge.from===edge.to){const x=a.x+a.w,reach=compact?46:90;path=`M${x} ${ay-18}C${x+reach} ${ay-58} ${x+reach} ${ay+58} ${x} ${ay+18}`;lx=x+(compact?31:62);ly=ay;lw=compact?42:100;}else if(horizontal){
      const direction=bx>ax?1:-1,sx=ax+direction*a.w/2,ex=bx-direction*b.w/2;
      if(to===from+1){path=`M${sx} ${ay}L${ex} ${by}`;lx=(sx+ex)/2;ly=65;}
      else{const rail=14+(i%3)*12;path=`M${ax} ${a.y}C${ax} ${rail} ${bx} ${rail} ${bx} ${b.y}`;lx=(ax+bx)/2;ly=rail+9;}
    }else if(to===from+1){
      const direction=by>ay?1:-1,sy=ay+direction*a.h/2,ey=by-direction*b.h/2;path=`M${ax} ${sy}L${bx} ${ey}`;lx=ax+54;ly=(sy+ey)/2+3;lw=96;
    }else{
      const rail=compact?25:70;path=`M${a.x} ${ay}C${rail} ${ay} ${rail} ${by} ${b.x} ${by}`;lx=rail;ly=(ay+by)/2;lw=compact?44:112;
    }
    const label=edge.label?`<rect x="${lx-lw/2}" y="${ly-18}" width="${lw}" height="33" rx="7" fill="var(--vie-bg,#fff)" fill-opacity=".95"/>${wrappedText(lx,ly,edge.label,lw,12,2,'fill="var(--vie-muted,#647587)"')}`:'';
    return `<path ${edge.from===edge.to?'data-vie-self-loop="true"':''} d="${path}" fill="none" stroke="#98a8b8" stroke-width="1.6" ${edge.kind==='line'?'':'marker-end="url(#vie-arrow-head)"'}><title>${esc(edge.label??'')}</title></path>${label}`;
  }).join('');
  const cards=spec.nodes.map(node=>{
    const r=locations.get(node.id),tone=roleTone[node.role]||'muted',active=selected===node.id,role=node.role&&node.role!=='default';
    return `<g data-vie-item="${esc(node.id)}" tabindex="0" role="button" aria-label="${esc(node.label)}" class="vie-svg-item${active?' is-active':''}" style="cursor:pointer"><rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="13" fill="${bg(tone)}" stroke="${active?color(tone):'#d2dce5'}" stroke-width="${active?2.5:1.3}"/>${wrappedText(r.x+r.w/2,r.y+(role?29:41),node.label,r.w,14,role?2:3,'font-weight="600" fill="#334358"')}${role?text(r.x+r.w/2,r.y+61,{input:'输入',output:'输出',fixed:'固定',important:'重点',step:'步骤',neutral:'',default:''}[node.role]??'','font-size="11" text-anchor="middle" fill="'+color(tone)+'"'):''}</g>`;
  }).join('');
  return svgOpen(W,H,spec.title).replace('class="vie-visual-svg"',`class="vie-visual-svg ${compact?'vie-visual-mobile-svg':'vie-visual-desktop-svg'}"`)+edges+cards+'</svg>';
}
