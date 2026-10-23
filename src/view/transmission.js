/** Geometry and local interactions share the semantic transmission models. */
const trainTone=(i,count)=>i===0?'var(--scene-sun)':i===count-1?'var(--scene-ring)':'var(--scene-planet)';
const trainName=(i,count)=>i===0?'主动轮':i===count-1?'从动轮':'惰轮 '+i;
function gearTrainMarkup(p) {
  const m=gearTrainModel(p),scale=Math.min(560/(m.width+4*p.module),112/(Math.max(...m.radii)+p.module));
  const offset=(620-m.width*scale)/2,y=148;
  const wheels=p.teeth.map((z,i)=>{
    const x=offset+m.centers[i]*scale,tone=trainTone(i,p.teeth.length),r=m.radii[i]*scale;
    return `<g transform="translate(${x} ${y})"><circle r="${r}" fill="none" stroke="${tone}" stroke-opacity=".28" stroke-dasharray="3 5"/><g transform="scale(${scale})"><g data-train-gear="${i}">${gearGlyph(z,p.module,tone)}</g><circle r="${2*p.module}" fill="var(--vie-bg)" stroke="${tone}" stroke-width="${.6*p.module}"/></g></g>`;
  }).join('');
  return `<svg viewBox="0 0 620 300" role="img" aria-label="${p.teeth.length}个外啮合定轴齿轮，齿数依次为${p.teeth.join('、')}。彩色轮廓为教学齿形，虚线为节圆。"><path d="M24 ${y}H596" stroke="var(--vie-stroke)" stroke-dasharray="4 7"/>${wheels}</svg>`;
}
function wormMarkup(p,scope) {
  return `<svg viewBox="0 0 560 350" role="img" aria-label="蜗杆沿水平轴旋转，驱动轴线垂直画面的蜗轮；交错轴和螺纹为结构示意">
  <defs><linearGradient id="${scope}-worm" x2="0" y2="1"><stop stop-color="var(--scene-sun)" stop-opacity=".15"/><stop offset=".45" stop-color="var(--scene-sun)" stop-opacity=".4"/><stop offset="1" stop-color="var(--scene-sun)" stop-opacity=".12"/></linearGradient><clipPath id="${scope}-thread"><rect x="137" y="60" width="286" height="66" rx="30"/></clipPath></defs>
  <path d="M65 93H495" stroke="var(--scene-sun)" stroke-width="3" stroke-dasharray="6 5"/>
  <path d="M280 145V334" stroke="var(--scene-ring)" stroke-opacity=".35" stroke-dasharray="4 6"/>
  <g transform="translate(280 211) scale(${86/(p.wheelTeeth/2+1)})"><g data-worm-wheel>${gearGlyph(p.wheelTeeth,1,'var(--scene-ring)')}</g><circle r="${p.wheelTeeth*.065}" fill="var(--vie-bg)" stroke="var(--scene-ring)" stroke-width=".6"/><circle r=".9" fill="var(--scene-ring)"/></g>
  <rect x="104" y="82" width="352" height="22" rx="10" fill="var(--scene-sun)" fill-opacity=".16" stroke="var(--scene-sun)"/>
  <rect x="137" y="60" width="286" height="66" rx="30" fill="url(#${scope}-worm)" stroke="var(--scene-sun)" stroke-width="2"/>
  <g clip-path="url(#${scope}-thread)"><path data-worm-thread fill="none" stroke="var(--scene-sun)" stroke-width="4" stroke-linecap="round"/></g>
  <path d="M117 67V119 M443 67V119" stroke="var(--vie-muted)" stroke-width="3"/>
  </svg>`;
}
function wormThreadPath(phase,starts) {
  const lines=[];
  // Projected helical bands communicate axial rotation; not a conjugate tooth surface.
  for(let band=-8;band<17;band++){
    const points=[];
    for(let j=0;j<=24;j++){
      const a=-Math.PI/2+Math.PI*j/24;
      const x=150+band*46+(a+phase*starts)*46/(2*Math.PI);
      points.push(`${j?'L':'M'}${x.toFixed(2)} ${(93+30*Math.sin(a)).toFixed(2)}`);
    }
    lines.push(points.join(' '));
  }
  return lines.join(' ');
}
