function chartControlMarkup(c,value){
  const esc=x=>String(x).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const input=c.kind==='select'?'<div class="vie-segmented" role="group" aria-label="'+esc(c.label)+'">'+c.options.map(o=>'<button type="button" data-chart-key="'+c.key+'" value="'+o.value+'" aria-pressed="'+(o.value===value)+'">'+esc(o.label)+'</button>').join('')+'</div>':'<input type="'+(c.kind==='toggle'?'checkbox':c.kind==='number'?'number':'range')+'" '+(c.kind==='toggle'?'role="switch" '+(value===1?'checked':''):'min="'+c.min+'" max="'+c.max+'" step="'+c.step+'" value="'+value+'"')+' aria-label="'+esc(c.label)+'" data-chart-key="'+c.key+'">';
  return '<div class="vie-control"><span class="vie-control-label"><span>'+esc(c.label)+'</span><output data-chart-value="'+c.key+'"></output></span>'+input+'</div>';
}
function mountChart(root,input,options={}){
  const spec=validateChartSpec(input),esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const colors={primary:'var(--vie-primary,#4d82d6)',secondary:'var(--vie-secondary,#149f91)',accent:'var(--vie-accent,#d58b16)',muted:'var(--vie-muted,#8c91a4)',warning:'var(--vie-warning,#cf6854)'};
  let values;try{values=validateChartState(spec,options.initialState);}catch{values=validateChartState(spec);}
  const visibleControls=spec.controls.filter(c=>!c.bind);
  const scope='chart-'+Math.random().toString(36).slice(2),clip=scope+'-clip';
  root.innerHTML=`<section class="vie-general-chart"><header><h3>${esc(spec.title)}</h3>${visibleControls.length?'<button type="button" data-chart-reset>复位</button>':''}</header><div data-chart-plot></div><div class="vie-general-chart-legend">${[...spec.series,...spec.regions].map(s=>`<span><i style="background:${colors[s.tone]}"></i>${esc(s.label)}</span>`).join('')}</div><div class="vie-general-chart-controls">${visibleControls.map(c=>chartControlMarkup(c,values[c.key])).join('')}</div>${spec.note?`<p class="vie-general-chart-note">${esc(spec.note)}</p>`:''}<p data-chart-error role="status"></p></section>`;
  const concise=n=>n!==0&&(Math.abs(n)>=1e5||Math.abs(n)<1e-3)?n.toExponential(2):Number(n.toPrecision(4)).toString();
  let scheduled=0,disposed=false;const schedule=()=>{if(!scheduled&&!disposed)scheduled=root.ownerDocument.defaultView.requestAnimationFrame(()=>{scheduled=0;draw();});};
  function draw(){
    const W=Math.max(300,Math.min(760,root.clientWidth||640)),H=320,L=58,R=22,T=18,B=53,w=W-L-R,h=H-T-B;
    const sx=x=>L+(x-spec.x.min)/(spec.x.max-spec.x.min)*w,sy=y=>T+h-(y-spec.y.min)/(spec.y.max-spec.y.min)*h;
    let svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(spec.title)}"><title>${esc(spec.title)}</title><defs><clipPath id="${clip}"><rect x="${L}" y="${T}" width="${w}" height="${h}"/></clipPath></defs>`;
    for(let i=0;i<=4;i++){const x=L+w*i/4,y=T+h-h*i/4;svg+=`<path d="M${x} ${T}V${T+h}M${L} ${y}H${L+w}" class="vie-general-chart-grid"/><text x="${x}" y="${T+h+20}" text-anchor="middle">${concise(spec.x.min+(spec.x.max-spec.x.min)*i/4)}</text><text x="${L-8}" y="${y+4}" text-anchor="end">${concise(spec.y.min+(spec.y.max-spec.y.min)*i/4)}</text>`;}
    svg+=`<g clip-path="url(#${clip})">`;
    for(const r of spec.regions)svg+=`<polygon points="${r.points.map(([x,y])=>sx(x)+','+sy(y)).join(' ')}" fill="${colors[r.tone]}" fill-opacity=".13"/>`;
    let gaps=0,limited=false;
    for(const s of spec.series){let segments=[],path='',open=false;const ps=sampleChartSeries(s,spec,values);limited ||= !!ps.limited;
      for(const [x,y]of ps){const a=sx(x),b=sy(y);if(y===null||!Number.isFinite(b)||Math.abs(a)>1e7||Math.abs(b)>1e7){open=false;gaps++;continue;}path+=(open?'L':'M')+a.toFixed(2)+' '+b.toFixed(2);open=true;}
      svg+=`<path d="${path}" stroke="${colors[s.tone]}" stroke-width="2.5" fill="none"><title>${esc(s.label)}</title></path>`;
    }
    svg+=`</g><path d="M${L} ${T}V${T+h}H${L+w}" class="vie-general-chart-axis"/><text x="${L+w/2}" y="${H-8}" text-anchor="middle">${esc(spec.x.label)}</text><text x="16" y="${T+h/2}" text-anchor="middle" transform="rotate(-90 16 ${T+h/2})">${esc(spec.y.label)}</text></svg>`;
    root.querySelector('[data-chart-plot]').innerHTML=svg;
    for(const c of visibleControls){root.querySelector(`[data-chart-value="${c.key}"]`).textContent=concise(values[c.key]);for(const el of root.querySelectorAll(`[data-chart-key="${c.key}"]`)){if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',String(Number(el.value)===values[c.key]));else if(el.type==='checkbox')el.checked=values[c.key]===1;else if(el!==root.ownerDocument.activeElement)el.value=values[c.key];}}
    root.querySelector('[data-chart-error]').textContent=limited?'采样分辨率已达上限，请缩小横轴范围查看细节。':gaps?'定义域之外的部分未绘制。':'';
  }
  const commit=(key,value)=>{try{const next=validateChartState(spec,{...values,[key]:value});options.onChange?.({...next});values=next;schedule();}catch(error){root.querySelector('[data-chart-error]').textContent=error.message;}};
  const inputEvent=e=>{const target=e.target,key=target.dataset.chartKey;if(!key||target.tagName==='BUTTON'||target.type==='number'&&(!target.value||!target.validity.valid))return;commit(key,target.type==='checkbox'?(target.checked?1:0):Number(target.value));};
  const click=e=>{const choice=e.target.closest('button[data-chart-key]');if(choice){commit(choice.dataset.chartKey,Number(choice.value));return;}if(!e.target.closest('[data-chart-reset]'))return;const next=validateChartState(spec,{...values,...Object.fromEntries(visibleControls.map(c=>[c.key,c.value]))});options.onChange?.({...next});values=next;draw();};
  root.addEventListener('input',inputEvent);root.addEventListener('click',click);const resize=new ResizeObserver(schedule);resize.observe(root);draw();
  return {snapshot:()=>({...values}),update(value){const next=validateChartState(spec,value);if(JSON.stringify(next)===JSON.stringify(values))return;values=next;schedule();},dispose(){disposed=true;root.ownerDocument.defaultView.cancelAnimationFrame(scheduled);resize.disconnect();root.removeEventListener('input',inputEvent);root.removeEventListener('click',click);root.replaceChildren();}};

}
