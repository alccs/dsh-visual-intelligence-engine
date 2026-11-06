/** These markup functions are the Web renderer's trusted pure geometry. */
/* @include view/markup.js */
/* @include view/experiments.js */
function viePreviewSVGs(meta){
  const result=[];if(!meta.valid||!meta.source)return result;
  const stream=new VIEStream();stream.push(meta.source);stream.finish();const snapshot=stream.snapshot();if(snapshot.errors.length)return result;
  const svg=html=>{const all=String(html??'').match(/<svg\b[\s\S]*?<\/svg>/g);if(all)result.push(all[0]);};
  const visit=n=>{try{
    if(['Flow','RelationGraph','Diagram','Animation'].includes(n.type))svg(makeVisualSVG(n.type,n.props,snapshot.values));
    else if(n.type==='GenerativeFigure'){
      const call=n.props.js?.match(/^VIE\.mountLearning\((\{[\s\S]*\})\);$/);
      if(call){const lesson=validateLearningDefinition(JSON.parse(call[1]),true);if(!lesson.stages?.[0]?.patches?.length)svg(lesson.baseMobileHtml??lesson.baseHtml??lesson.stages?.[0]?.mobileHtml??lesson.stages?.[0]?.html);}
      else svg(n.props.html); // Extract static geometry; never run its script.
    }
    else if(n.type==='Chart')result.push(vieChartPreview(n.props,snapshot.values));
    else if(n.type==='InteractiveScene'){
      const p=n.props.parameters,t=n.props.template;
      if(t==='worm')svg(wormMarkup(p,'native').replace('data-worm-thread fill=',`d="${wormThreadPath(0,p.starts)}" data-worm-thread fill=`));
      else if(t==='gears')svg(gearsMarkup(p));else if(t==='planetary')svg(planetaryMarkup(p));else if(t==='geartrain')svg(gearTrainMarkup(p));
    }
  }catch{}n.children?.forEach(visit);};snapshot.tree.forEach(visit);return result.slice(0,4);
}
function vieChartPreview(p,state){
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 const W=640,H=360,L=62,T=38,w=550,h=260,x=v=>L+(v-p.x.min)/(p.x.max-p.x.min)*w,y=v=>T+h-(v-p.y.min)/(p.y.max-p.y.min)*h;
 const colors={primary:'#4d82d6',secondary:'#149f91',accent:'#d58b16',muted:'#8291a2',warning:'#cf6854'},values=Object.fromEntries([...p.controls,...(p.inputs??[])].map(c=>[c.key,c.bind?state[c.bind]:c.value]));
 let s=`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="640" height="360" fill="white"/><style>text{font-size:13px;fill:#334155}</style><text x="320" y="22" text-anchor="middle">${esc(p.title)}</text><defs><clipPath id="plot"><rect x="${L}" y="${T}" width="${w}" height="${h}"/></clipPath></defs>`;
 for(let i=0;i<=4;i++)s+=`<path d="M${L+w*i/4} ${T}V${T+h}M${L} ${T+h*i/4}H${L+w}" fill="none" stroke="#e2e8f0"/><text x="${L+w*i/4}" y="${T+h+20}" text-anchor="middle">${Number((p.x.min+(p.x.max-p.x.min)*i/4).toPrecision(4))}</text><text x="54" y="${T+h-h*i/4+4}" text-anchor="end">${Number((p.y.min+(p.y.max-p.y.min)*i/4).toPrecision(4))}</text>`;
 s+='<g clip-path="url(#plot)">';for(const r of p.regions)s+=`<polygon points="${r.points.map(v=>x(v[0])+','+y(v[1])).join(' ')}" fill="${colors[r.tone]}" fill-opacity=".15"/>`;
 for(const row of p.series){let d='',open=false;for(const [a,b]of sampleChartSeries(row,p,values)){if(b===null||!Number.isFinite(b)||Math.abs(x(a))>1e7||Math.abs(y(b))>1e7){open=false;continue;}d+=(open?'L':'M')+x(a).toFixed(2)+' '+y(b).toFixed(2);open=true;}s+=`<path d="${d}" fill="none" stroke="${colors[row.tone]}" stroke-width="2.5"/>`;}
 return s+`</g><path d="M${L} ${T}V${T+h}H${L+w}" fill="none" stroke="#64748b"/><text x="${L+w/2}" y="350" text-anchor="middle">${esc(p.x.label)}</text><text x="16" y="180" transform="rotate(-90 16 180)" text-anchor="middle">${esc(p.y.label)}</text></svg>`;
}
