/** Framework-owned SVG geometry and focused experiment controllers. */
const sceneEscape = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sceneSigned = value => Math.abs(value)<1e-10?'0.00':(value>0?'+':'')+value.toFixed(2);
const sceneDegrees = radians => (radians*180/Math.PI)%360;
const gearGeometryCache = new Map();
let experimentInstanceSequence=0;
/** Involute flanks with simplified root transitions. This is a teaching glyph,
 * not a manufactured tooth profile or a complete interference calculation. */
function gearPath(teeth, module=1, internal=false) {
  const key=[teeth,module,internal].join(':');
  if(gearGeometryCache.has(key))return gearGeometryCache.get(key);
  const r=module*teeth/2,base=r*Math.cos(Math.PI/9),tip=r+(internal?-1:1)*module,root=r+(internal?1.25:-1.25)*module;
  const inv=angle=>Math.tan(angle)-angle,atPitch=inv(Math.PI/9),half=Math.PI/(2*teeth);
  const flank=radius=>{const angle=Math.acos(Math.min(1,base/Math.max(base,radius)));return internal?half-atPitch+inv(angle):half+atPitch-inv(angle);};
  const point=(radius,angle)=>`${(radius*Math.cos(angle)).toFixed(5)} ${(radius*Math.sin(angle)).toFixed(5)}`;
  const parts=[];const n=5;
  for(let tooth=0;tooth<teeth;tooth++){
    const center=2*Math.PI*tooth/teeth;
    if(internal){
      const outer=flank(root);parts.push((tooth?'L':'M')+point(root,center-outer));
      for(let j=0;j<=n;j++){const radius=root+(tip-root)*j/n;parts.push('L'+point(radius,center-flank(radius)));}
      parts.push(`A${tip} ${tip} 0 0 1 ${point(tip,center+flank(tip))}`);
      for(let j=n;j>=0;j--){const radius=root+(tip-root)*j/n;parts.push('L'+point(radius,center+flank(radius)));}
      const end=2*Math.PI*(tooth+1)/teeth-outer;parts.push(`A${root} ${root} 0 0 1 ${point(root,end)}`);
    }else{
      const low=Math.max(root,base),outer=flank(low);parts.push((tooth?'L':'M')+point(root,center-outer));
      for(let j=0;j<=n;j++){const radius=low+(tip-low)*j/n;parts.push('L'+point(radius,center-flank(radius)));}
      parts.push(`A${tip} ${tip} 0 0 1 ${point(tip,center+flank(tip))}`);
      for(let j=n;j>=0;j--){const radius=low+(tip-low)*j/n;parts.push('L'+point(radius,center+flank(radius)));}
      parts.push('L'+point(root,center+outer));
      const end=2*Math.PI*(tooth+1)/teeth-outer;parts.push(`A${root} ${root} 0 0 1 ${point(root,end)}`);
    }
  }
  parts.push('Z');
  let data=parts.join(' ');
  if(internal){const outer=r+3.5*module;data=`M${outer} 0 A${outer} ${outer} 0 1 1 ${-outer} 0 A${outer} ${outer} 0 1 1 ${outer} 0 Z `+data;}
  gearGeometryCache.set(key,data);if(gearGeometryCache.size>48)gearGeometryCache.delete(gearGeometryCache.keys().next().value);
  return data;
}
function gearGlyph(teeth,module,tone,internal=false,marker=true){
  const r=teeth*module/2;
  return `<path d="${gearPath(teeth,module,internal)}" fill="${tone}" fill-opacity="${internal?'.07':'.20'}" stroke="${tone}" stroke-width="${module*.42}" stroke-linejoin="round" fill-rule="evenodd"/>${marker&&!internal?`<line x1="0" y1="0" x2="${r*.72}" y2="0" stroke="${tone}" stroke-width="${module*1.2}" stroke-linecap="round"/>`:''}`;
}
function planetaryMarkup(p){
  const m=p.module,rs=p.sunTeeth*m/2,rp=p.planetTeeth*m/2,rr=p.ringTeeth*m/2,a=rs+rp,scale=162/(rr+3.5*m);
  const positions=Array.from({length:p.planetCount},(_,i)=>{const angle=-Math.PI/2+2*Math.PI*i/p.planetCount;return {x:a*Math.cos(angle),y:a*Math.sin(angle)};});
  return `<svg viewBox="0 0 520 370" role="img" aria-label="太阳轮、${p.planetCount}个行星轮、内齿圈和行星架的理想运动示意"><g transform="translate(260 184) scale(${scale})">
    <g data-scene-shaft="ring">${gearGlyph(p.ringTeeth,m,'var(--scene-ring)',true,false)}${[0,1,2,3,4,5].map(i=>{const angle=i*Math.PI/3;return `<circle cx="${(rr+2.2*m)*Math.cos(angle)}" cy="${(rr+2.2*m)*Math.sin(angle)}" r="${m*.45}" fill="var(--scene-ring)"/>`;}).join('')}</g>
    <g data-scene-shaft="carrier">${positions.map(({x,y})=>`<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="var(--scene-carrier)" stroke-opacity=".55" stroke-width="${2*m}" stroke-linecap="round"/>`).join('')}${positions.map(({x,y},i)=>`<g transform="translate(${x} ${y})"><g data-scene-planet="${i}">${gearGlyph(p.planetTeeth,m,'var(--scene-planet)')}</g><circle r="${2*m}" fill="var(--vie-bg)" stroke="var(--scene-planet)" stroke-width="${m*.55}"/></g>`).join('')}</g>
    <g data-scene-shaft="sun">${gearGlyph(p.sunTeeth,m,'var(--scene-sun)')}${[1,2,3].map(i=>`<line transform="rotate(${90*i})" x1="0" y1="0" x2="${rs*.72}" y2="0" stroke="var(--scene-sun)" stroke-width="${1.2*m}" stroke-linecap="round"/>`).join('')}</g>
    <circle r="${2.8*m}" fill="var(--scene-sun)" stroke="#9b6410" stroke-width="${m*.45}"/><circle r="${m*.7}" fill="#7b4b0b"/>
  </g></svg>`;
}
function gearsMarkup(p){
  const m=p.module,r1=p.driverTeeth*m/2,r2=p.drivenTeeth*m/2;
  const internal=p.mesh==='internal';
  const scale=internal?155/(r2+3.5*m):Math.min(430/(2*(r1+r2)+8*m),135/(Math.max(r1,r2)+m));
  const x1=internal?260+(r2-r1)*scale:260-r2*scale,x2=internal?260:260+r1*scale;
  const circle=(x,shaft,z,tone,inside)=>`<g transform="translate(${x} 176) scale(${scale})"><g data-scene-shaft="${shaft}">${gearGlyph(z,m,tone,inside)}</g>${inside?'':`<circle r="${m*2}" fill="var(--vie-bg)" stroke="${tone}" stroke-width="${m*.6}"/>`}</g>`;
  return `<svg viewBox="0 0 520 370" role="img" aria-label="${internal?'内':'外'}啮合齿轮传动示意">${internal?circle(x2,'driven',p.drivenTeeth,'var(--scene-ring)',true):''}${circle(x1,'driver',p.driverTeeth,'var(--scene-sun)',false)}${internal?'':circle(x2,'driven',p.drivenTeeth,'var(--scene-ring)',false)}<text x="${x1}" y="350" text-anchor="middle" class="vie-scene-svg-label">主动轮 ${p.driverTeeth} 齿</text><text x="${internal?160:x2}" y="350" text-anchor="middle" class="vie-scene-svg-label">从动${internal?'齿圈':'轮'} ${p.drivenTeeth} 齿</text></svg>`;
}
/* @include view/transmission.js */
function waveMarkup(){
  return `<svg viewBox="0 0 520 300" role="img" aria-label="两列同频正弦波与叠加结果"><path d="M30 30V265H498 M30 150H498" fill="none" stroke="var(--vie-stroke)"/>${[60,105,195,240].map(y=>`<path d="M30 ${y}H498" stroke="var(--vie-stroke)" stroke-dasharray="3 5"/>`).join('')}<path data-wave="first" fill="none" stroke="var(--scene-ring)" stroke-width="1.8" opacity=".7"/><path data-wave="second" fill="none" stroke="var(--scene-planet)" stroke-width="1.8" opacity=".7"/><path data-wave="sum" fill="none" stroke="var(--scene-sun)" stroke-width="3"/><text x="18" y="34" text-anchor="end" class="vie-axis-label">+4</text><text x="18" y="154" text-anchor="end" class="vie-axis-label">0</text><text x="18" y="269" text-anchor="end" class="vie-axis-label">−4</text><text x="497" y="286" text-anchor="end" class="vie-axis-label">位置 x →（相对单位）</text></svg>`;
}
function sceneSlider(key,label,value,min,max,step,unit=''){
  return `<label class="vie-scene-control"><span>${sceneEscape(label)}<output data-scene-output="${key}">${sceneEscape(value+unit)}</output></span><input type="range" data-scene-input="${key}" aria-label="${sceneEscape(label)}" min="${min}" max="${max}" step="${step}" value="${value}"/></label>`;
}
/** Shared shell, actions, simulation clock and snapshot lifecycle. */
function mountInteractiveScene(root,rawSpec,options={}){
  const spec=validateExperimentSpec(rawSpec),kind=spec.template,catalog=EXPERIMENT_CATALOG[kind],p=spec.parameters;
  const win=root.ownerDocument.defaultView;
  let state=validateExperimentSnapshot(spec,{v:1,template:kind});
  if(options.initialState)try{state=validateExperimentSnapshot(spec,options.initialState);}catch{/* schema changes discard invalid saved inputs */}
  let running=false,raf=0,last=0,disposed=false,vector=null,lastReadout=0;
  const svgScope='vie-experiment-svg-'+(++svgScopeSequence);
  const el=selector=>root.querySelector(selector);
  const snapshot=()=>validateExperimentSnapshot(spec,{...state,inputs:{...state.inputs},history:[...state.history]});
  const notify=()=>options.onChange?.(snapshot());
  const effective=()=>effectiveExperimentParameters(spec,state.inputs);
  const caseNames={'ring-fixed':'固定齿圈','sun-fixed':'固定太阳轮','carrier-fixed':'固定行星架'};
  const caseTabs=kind==='planetary'?`<div class="vie-case-tabs" role="tablist" aria-label="选择固定工况">${EXPERIMENT_CASES.map((id,i)=>`<button type="button" role="tab" aria-selected="${state.case===id}" data-scene-case="${id}">${i+1} ${caseNames[id]}</button>`).join('')}</div>`:'';
  const editableTransmission=kind==='geartrain'||kind==='worm';
  const controls=editableTransmission?'<details class="vie-scene-parameters" open><summary>调整齿数与输入转速</summary><div class="vie-scene-controls" data-scene-controls></div></details>':'<div class="vie-scene-controls" data-scene-controls></div>';
  root.innerHTML=`<section class="vie-experiment" data-scene-template="${kind}">${caseTabs}<div class="vie-scene-panel"><header class="vie-scene-heading"><div><h3 data-scene-title></h3><p class="vie-scene-subtitle" data-scene-subtitle></p></div><span class="vie-scene-status" data-scene-status></span></header><div class="vie-scene-stage" data-scene-stage></div><p class="vie-scene-note" data-scene-note></p><div class="vie-scene-legend" data-scene-legend></div></div><div class="vie-scene-toolbar">${catalog.timed?'<button type="button" class="vie-scene-button is-primary" data-scene-action="play" aria-label="播放动画">▶ 播放</button>':''}${kind!=='vector'?`<button type="button" class="vie-scene-button" data-scene-action="step">${kind==='process'?'下一步':kind==='wave'?'单步 +0.1 s':'单步 +15°'}</button>`:''}<button type="button" class="vie-scene-button" data-scene-action="reset">复位</button>${catalog.timed&&kind!=='wave'?'<button type="button" class="vie-scene-button" data-scene-action="reverse" aria-label="反转输入方向">反转</button>':''}${catalog.timed?'<label class="vie-scene-speed"><span>播放速率</span><input type="range" min="0.1" max="2" step="0.1" value="1" aria-label="播放速率" data-scene-input="rate"><output data-scene-rate>1.0×</output></label>':'<span class="vie-scene-progress" data-scene-progress></span>'}</div><div class="vie-scene-readouts" data-scene-readouts></div><div class="vie-process-choices" data-scene-choices></div><p class="vie-scene-insight" data-scene-insight aria-live="polite"></p>${controls}<details class="vie-scene-details"><summary>关系、参数与适用范围</summary><p data-scene-equation></p><p data-scene-scope></p></details></section>`;
  const stage=el('[data-scene-stage]');
  if(kind==='planetary'){
    const id='vie-planetary-'+(++experimentInstanceSequence),panel=el('.vie-scene-panel');panel.id=id+'-panel';panel.setAttribute('role','tabpanel');
    root.querySelectorAll('[data-scene-case]').forEach(button=>{button.id=id+'-'+button.dataset.sceneCase;button.setAttribute('aria-controls',panel.id);});
  }
  const readouts=items=>{el('[data-scene-readouts]').innerHTML=items.map(([name,value,role,color])=>`<div class="vie-scene-readout" style="--readout-color:${color||'var(--vie-ink)'}"><small>${sceneEscape(name)}</small><strong>${sceneEscape(value)}</strong><span>${sceneEscape(role)}</span></div>`).join('');};
  const legend=items=>{el('[data-scene-legend]').innerHTML=items.map(([name,color])=>`<span><i class="vie-scene-dot" style="color:${color}"></i>${sceneEscape(name)}</span>`).join('');};
  const pause=()=>{running=false;last=0;win.cancelAnimationFrame(raf);const button=el('[data-scene-action="play"]');if(button){button.textContent='▶ 播放';button.setAttribute('aria-label','播放动画');}};
  function draw(){
    if(kind==='geartrain'){
      const frame=gearTrainModel(effective(),state.phase);
      frame.angles.forEach((angle,i)=>el(`[data-train-gear="${i}"]`).setAttribute('transform',`rotate(${sceneDegrees(angle)})`));return;
    }
    if(kind==='worm'){
      const parameters=effective(),frame=wormModel(parameters,state.phase);
      el('[data-worm-wheel]').setAttribute('transform',`rotate(${sceneDegrees(frame.wheelAngle)})`);
      el('[data-worm-thread]').setAttribute('d',wormThreadPath(state.phase%(2*Math.PI),parameters.starts));return;
    }
    if(kind==='planetary'){
      const frame=planetaryPhases(p,state.phase,state.case);
      for(const shaft of ['sun','ring','carrier'])el(`[data-scene-shaft="${shaft}"]`).setAttribute('transform',`rotate(${sceneDegrees(frame[shaft])})`);
      frame.planets.forEach((planet,i)=>el(`[data-scene-planet="${i}"]`).setAttribute('transform',`rotate(${sceneDegrees(planet.relative)})`));
    }else if(kind==='gears'){
      const ratio=(p.mesh==='internal'?1:-1)*p.driverTeeth/p.drivenTeeth;
      el('[data-scene-shaft="driver"]').setAttribute('transform',`rotate(${sceneDegrees(state.phase)})`);
      const initial=p.mesh==='internal'?-Math.PI/p.drivenTeeth:Math.PI-Math.PI/p.drivenTeeth;
      el('[data-scene-shaft="driven"]').setAttribute('transform',`rotate(${sceneDegrees(initial+state.phase*ratio)})`);
    }else if(kind==='wave'){
      const paths={first:[],second:[],sum:[]},parameters=effective();
      for(let i=0;i<=180;i++){const x=2*Math.PI*i/180,values=waveSample(parameters,x,state.phase);for(const key of Object.keys(paths))paths[key].push(`${i?'L':'M'}${(30+468*i/180).toFixed(2)} ${(150-values[key]*28).toFixed(2)}`);}
      for(const key of Object.keys(paths))el(`[data-wave="${key}"]`).setAttribute('d',paths[key].join(' '));
    }
  }
  function renderProcess(){
    const node=p.nodes[state.index],outgoing=p.edges.filter(edge=>edge.from===node.id);
    const markup=makeVisualMarkup('Flow',{title:p.title,nodes:p.nodes.map((item,i)=>({...item,role:i===state.index?'step':'default'})),edges:p.edges},node.id);
    stage.innerHTML=scopeSvgMarkup(markup,svgScope);
    // These nodes show the declared route; only step/branch controls advance it.
    stage.querySelectorAll('[data-vie-item]').forEach(item=>{if(item.tagName.toLowerCase()==='button'){item.remove();return;}item.removeAttribute('tabindex');item.setAttribute('role','group');item.style.cursor='default';});
    el('[data-scene-choices]').innerHTML=outgoing.length>1?outgoing.map((edge,i)=>`<button type="button" class="vie-scene-button" data-scene-branch="${i}">${sceneEscape(edge.label)} → ${sceneEscape(p.nodes.find(n=>n.id===edge.to).label)}</button>`).join(''):'';
    el('[data-scene-action="step"]').disabled=outgoing.length!==1;
    el('[data-scene-insight]').textContent=node.detail||'沿有标签的分支推进，观察当前步骤。';
    el('[data-scene-progress]').textContent='已推进 '+Math.max(0,state.history.length-1)+' 步';
    readouts([['当前节点',String(state.index+1),'节点编号'],['可选分支',String(outgoing.length),outgoing.length?'等待选择或下一步':'当前路径结束'],['访问记录',String(state.history.length),'最多保留 64 项']]);
  }
  function refresh(){
    const parameters=effective();
    el('[data-scene-title]').textContent=spec.title;
    if(kind==='planetary'){
      const rates=planetaryRates(p,state.case,p.inputSpeed*state.direction);
      const fixed=state.case==='ring-fixed'?'ring':state.case==='sun-fixed'?'sun':'carrier';
      const input=state.case==='sun-fixed'?'ring':'sun',output=state.case==='carrier-fixed'?'ring':'carrier';
      const names={sun:'太阳轮',ring:'齿圈',carrier:'行星架'};
      el('[data-scene-title]').textContent=caseNames[state.case]+' · '+names[input]+'输入';
      el('[data-scene-subtitle]').textContent='观察轮心的公转和轮体的自转；切换固定构件比较输出。';
      el('[data-scene-status]').textContent=names[fixed]+'固定';
      el('[data-scene-note]').textContent='教学齿廓 · 基本装配条件与理想速比已计算';
      el('[data-scene-insight]').textContent=`${names[fixed]}保持不动，${names[input]}驱动${names[output]}。行星轮绝对自转为 ${sceneSigned(rates.planet)}，相对行星架为 ${sceneSigned(rates.planetRelative)}；两者参考系不同。`;
      readouts(['sun','ring','carrier'].map(shaft=>[`${names[shaft]} ω${shaft==='sun'?'S':shaft==='ring'?'R':'H'}`,sceneSigned(rates[shaft]),(shaft===fixed?'固定':shaft===input?'输入':'输出')+' · rad/s',`var(--scene-${shaft})`]));
      el('[data-scene-equation]').textContent=`ZS(ωS−ωH)+ZR(ωR−ωH)=0。太阳轮 ${p.sunTeeth} 齿，行星轮 ${p.planetTeeth} 齿，齿圈 ${p.ringTeeth} 齿，共 ${p.planetCount} 个行星轮。模数 ${p.module} mm；输入为 ${p.inputSpeed*state.direction} rad/s 的演示设定。`;
      el('[data-scene-scope]').textContent='已检查齿数关系、等角度装配、相邻间距与理想运动关系。齿廓根部为教学近似；未进行完整齿廓干涉、强度、齿隙、摩擦或载荷分析。';
      root.querySelectorAll('[data-scene-case]').forEach(button=>{const selected=button.dataset.sceneCase===state.case;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;if(selected)el('.vie-scene-panel').setAttribute('aria-labelledby',button.id);});
    }else if(kind==='gears'){
      const ratio=(p.mesh==='internal'?1:-1)*p.driverTeeth/p.drivenTeeth,drive=p.inputSpeed*state.direction;
      el('[data-scene-subtitle]').textContent=p.mesh==='internal'?'内啮合：两轮同向转动。':'外啮合：两轮反向转动。';
      el('[data-scene-status]').textContent=p.mesh==='internal'?'内啮合':'外啮合';
      el('[data-scene-note]').textContent='节圆位置与理想传动比计算；齿廓为教学近似';
      readouts([['主动轮 ω1',sceneSigned(drive),'输入','var(--scene-sun)'],['从动轮 ω2',sceneSigned(drive*ratio),'输出','var(--scene-ring)'],['ω2 / ω1',sceneSigned(ratio),'理想速比','var(--scene-carrier)']]);
      el('[data-scene-insight]').textContent=`${p.driverTeeth} 齿驱动 ${p.drivenTeeth} 齿，输出转速为输入的 ${Math.abs(ratio).toFixed(3)} 倍，方向${ratio<0?'相反':'相同'}。单步只推进输入轴，其余角度由同一关系计算。`;
      el('[data-scene-equation]').textContent=`ω2 / ω1 = ${p.mesh==='internal'?'':'−'}Z1 / Z2。输入 ${drive} rad/s，为演示设定。`;
      el('[data-scene-scope]').textContent='支持同模数平面直齿轮的理想运动教学；根部轮廓简化，未校核真实接触、制造公差或载荷。';
    }else if(kind==='geartrain'){
      const frame=gearTrainModel(parameters,state.phase,parameters.inputSpeed*state.direction),count=parameters.teeth.length;
      el('[data-scene-subtitle]').textContent='所有轮轴固定；从左到右观察每次外啮合如何改变方向。';
      el('[data-scene-status]').textContent=count+'轮 · 平面外啮合';
      el('[data-scene-note]').textContent='教学齿形 · 虚线为节圆 · 输入与输出使用同一运动模型';
      readouts(parameters.teeth.map((z,i)=>[`${trainName(i,count)} · ${z}齿`,sceneSigned(frame.speeds[i]),'ω'+(i+1)+' · rad/s',trainTone(i,count)]));
      el('[data-scene-readouts]').style.gridTemplateColumns=`repeat(${count===2?2:3},minmax(0,1fr))`;
      el('[data-scene-insight]').textContent=`${count-1} 次外啮合，首尾${frame.outputRatio>0?'同向':'反向'}。ω${count}/ω1 = ${sceneSigned(frame.outputRatio)}；传动比 i1${count} = ${sceneSigned(frame.transmissionRatio)}。${count>2?'改变中间惰轮齿数，只改变中间轮转速与中心距，首尾速比不变。':'输出齿数越多，相对输入转得越慢。'}`;
      el('[data-scene-equation]').textContent=`相邻轮满足 Zj·ωj + Zj+1·ωj+1 = 0；ω${count}/ω1 = (−1)^${count-1} × ${parameters.teeth[0]}/${parameters.teeth.at(-1)}。同模数 ${parameters.module} mm。`;
      el('[data-scene-scope]').textContent='2–6 个平行固定轴、相邻外啮合的直齿轮；不包含同轴复合级或闭环。渐开线侧面与根部过渡用于教学，未校核完整干涉、强度、齿隙或制造公差。';
      parameters.teeth.forEach((z,i)=>{el(`[data-scene-output="teeth${i}"]`).textContent=z+'齿';});
      el('[data-scene-output="inputSpeed"]').textContent=sceneSigned(parameters.inputSpeed)+' rad/s';
    }else if(kind==='worm'){
      const frame=wormModel(parameters,state.phase,parameters.inputSpeed*state.direction);
      el('[data-scene-subtitle]').textContent='蜗杆每转一圈，蜗轮前进与头数相同的齿数。';
      el('[data-scene-status]').textContent='交错轴 · 结构示意';
      el('[data-scene-note]').textContent='螺旋与轮齿为结构示意；转速大小由头数和齿数计算';
      readouts([['蜗杆输入',sceneSigned(frame.input),'rad/s','var(--scene-sun)'],['蜗轮速率',frame.outputMagnitude.toFixed(3),'rad/s · 大小','var(--scene-ring)'],['减速比 i',frame.transmissionRatio.toFixed(2),'蜗轮齿数 / 蜗杆头数','var(--scene-carrier)']]);
      el('[data-scene-insight]').textContent=`${parameters.starts} 头蜗杆驱动 ${parameters.wheelTeeth} 齿蜗轮。输入转一圈，蜗轮前进 ${parameters.starts} 齿、转过 ${(360*frame.speedRatio).toFixed(1)}°。反转输入，图示输出也反转。`;
      el('[data-scene-equation]').textContent='|ω蜗轮 / ω蜗杆| = 头数 / 蜗轮齿数。图示轮齿不用于验证真实空间接触；轴向正方向与观察方向会影响转速符号。';
      el('[data-scene-scope]').textContent='只计算理想转速大小；螺纹与蜗轮是帮助辨认交错轴的投影图形，不是共轭蜗轮齿面。不能从该图判断自锁、效率、受力或制造参数。';
      for(const [key,unit] of [['starts','头'],['wheelTeeth','齿'],['inputSpeed',' rad/s']])el(`[data-scene-output="${key}"]`).textContent=parameters[key]+unit;
    }else if(kind==='wave'){
      const result=waveSample(parameters,0,state.phase);
      el('[data-scene-subtitle]').textContent='改变相位与振幅，观察两列同频波如何叠加。';
      el('[data-scene-status]').textContent='线性叠加';
      el('[data-scene-note]').textContent='蓝色波 A + 青色波 B = 橙色合成波；振幅为相对单位';
      readouts([['相位差',parameters.phaseDegrees.toFixed(0)+'°','波 B 相对波 A','var(--scene-carrier)'],['合成振幅',result.envelope.toFixed(2),'由叠加公式计算','var(--scene-sun)'],['频率',parameters.frequencyHz.toFixed(1)+' Hz','演示参数','var(--scene-ring)']]);
      el('[data-scene-insight]').textContent=result.envelope<1e-6?'两列等幅波反相，当前模型中的合成波完全相消。':`合成振幅为 ${result.envelope.toFixed(2)}。相位差改变峰谷的相对位置，振幅由两列波共同决定。`;
      el('[data-scene-equation]').textContent='yA=A sin(kx−2πft)，yB=B sin(kx−2πft+φ)，y=yA+yB。';
      el('[data-scene-scope]').textContent='同波数、同频率的理想线性正弦波演示，不包含介质损耗、边界反射或真实测量。';
      for(const key of ['amplitudeA','amplitudeB','phaseDegrees','frequencyHz']){const output=el(`[data-scene-output="${key}"]`);if(output)output.textContent=parameters[key].toFixed(key==='phaseDegrees'?0:2)+(key==='phaseDegrees'?'°':key==='frequencyHz'?' Hz':'');}
    }else if(kind==='process'){
      el('[data-scene-subtitle]').textContent='一次只走一步；有分支时明确选择条件。';
      el('[data-scene-status]').textContent='离散步骤';el('[data-scene-note]').textContent='路径由输入的事实与分支定义，未自动验证业务规则。';
      el('[data-scene-equation]').textContent='下一步只沿当前节点的已声明边推进；分支条件由用户判断。';
      el('[data-scene-scope]').textContent='这是流程解释工具，不会自动执行外部命令或判断真实业务条件。';renderProcess();
    }else{
      const angle=parameters.angle*Math.PI/180,x=parameters.magnitude*Math.cos(angle),y=parameters.magnitude*Math.sin(angle);
      el('[data-scene-subtitle]').textContent='拖动端点或调整长度与角度，观察两个分量。';
      el('[data-scene-status]').textContent='几何关系';el('[data-scene-note]').textContent='坐标轴使用相同缩放；长度为相对单位';
      readouts([['水平分量 x',sceneSigned(x),'r cos θ','var(--scene-planet)'],['竖直分量 y',sceneSigned(y),'r sin θ','var(--scene-sun)'],['向量长度',parameters.magnitude.toFixed(2),'相对单位','var(--scene-ring)']]);
      el('[data-scene-insight]').textContent=`角度 ${parameters.angle}°，长度 ${parameters.magnitude.toFixed(1)}，水平分量 ${sceneSigned(x)}，竖直分量 ${sceneSigned(y)}。`;
      el('[data-scene-equation]').textContent='x=r cos θ，y=r sin θ；x²+y²=r²。';el('[data-scene-scope]').textContent='二维直角坐标的几何关系；数值为教学设定。';
    }
    if(catalog.timed){el('[data-scene-rate]').textContent=state.rate.toFixed(1)+'×';el('[data-scene-input="rate"]').value=String(state.rate);updateRangePresentation(el('[data-scene-input="rate"]'));}
    draw();
  }
  function mountVector(){
    vector?.dispose();stage.innerHTML='<div class="vie-scene-vector" style="width:100%"></div>';
    vector=mountVectorLab(stage.firstElementChild,{initialState:effective(),onChange:value=>{state.inputs={magnitude:value.magnitude,angle:value.angle};refresh();notify();}});
  }
  if(kind==='planetary'){stage.innerHTML=planetaryMarkup(p);legend([['太阳轮 S','var(--scene-sun)'],['行星轮 P','var(--scene-planet)'],['齿圈 R','var(--scene-ring)'],['行星架 H','var(--scene-carrier)']]);}
  else if(kind==='gears'){stage.innerHTML=gearsMarkup(p);legend([['主动轮','var(--scene-sun)'],['从动轮','var(--scene-ring)']]);}
  else if(kind==='geartrain'){
    stage.innerHTML=gearTrainMarkup(effective());legend(p.teeth.map((z,i)=>[trainName(i,p.teeth.length),trainTone(i,p.teeth.length)]));
    const values=effective();el('[data-scene-controls]').innerHTML=values.teeth.map((z,i)=>sceneSlider('teeth'+i,trainName(i,p.teeth.length)+'齿数',z,18,80,1,'齿')).join('')+sceneSlider('inputSpeed','输入转速',values.inputSpeed,-4,4,'any',' rad/s');
  }else if(kind==='worm'){
    const values=effective();stage.innerHTML=wormMarkup(values,svgScope);legend([['蜗杆 · 输入','var(--scene-sun)'],['蜗轮 · 输出','var(--scene-ring)']]);
    el('[data-scene-controls]').innerHTML=sceneSlider('starts','蜗杆头数',values.starts,1,4,1,'头')+sceneSlider('wheelTeeth','蜗轮齿数',values.wheelTeeth,20,80,1,'齿')+sceneSlider('inputSpeed','输入转速',values.inputSpeed,-4,4,'any',' rad/s');
  }
  else if(kind==='wave'){
    stage.innerHTML=waveMarkup();legend([['波 A','var(--scene-ring)'],['波 B','var(--scene-planet)'],['合成波','var(--scene-sun)']]);
    const values=effective();el('[data-scene-controls]').innerHTML=sceneSlider('phaseDegrees','相位差',values.phaseDegrees,0,360,'any','°')+sceneSlider('amplitudeB','波 B 振幅',values.amplitudeB,0,2,'any');
  }else if(kind==='vector')mountVector();
  function tick(time){
    if(disposed||!running)return;
    if(last){const delta=Math.min(.1,Math.max(0,(time-last)/1000));state.phase+=delta*state.rate*(kind==='wave'?1:effective().inputSpeed*state.direction);}
    last=time;draw();
    if(time-lastReadout>250){lastReadout=time;stage.dataset.scenePhase=String(state.phase);}
    raf=win.requestAnimationFrame(tick);
  }
  function play(){if(disposed)return;running=true;last=0;const button=el('[data-scene-action="play"]');button.textContent='Ⅱ 暂停';button.setAttribute('aria-label','暂停动画');raf=win.requestAnimationFrame(tick);}
  function moveProcess(edge){
    if(!edge)return;
    const index=p.nodes.findIndex(node=>node.id===edge.to);state.index=index;state.history=[...state.history,index].slice(-64);refresh();notify();
  }
  function click(event){
    const caseButton=event.target.closest?.('[data-scene-case]');
    if(caseButton&&root.contains(caseButton)){pause();state.case=caseButton.dataset.sceneCase;state.phase=0;refresh();notify();return;}
    const branch=event.target.closest?.('[data-scene-branch]');
    if(branch&&kind==='process'){moveProcess(p.edges.filter(edge=>edge.from===p.nodes[state.index].id)[Number(branch.dataset.sceneBranch)]);return;}
    const button=event.target.closest?.('[data-scene-action]');if(!button||!root.contains(button))return;
    const action=button.dataset.sceneAction;
    if(action==='play'){if(running){pause();notify();}else play();}
    else if(action==='step'){pause();if(kind==='process'){const edges=p.edges.filter(edge=>edge.from===p.nodes[state.index].id);if(edges.length===1)moveProcess(edges[0]);}else{const drive=effective().inputSpeed;state.phase+=kind==='wave'?.1:(drive===0?0:Math.sign(drive)*state.direction*Math.PI/12);refresh();notify();}}
    else if(action==='reverse'){state.direction*=-1;refresh();notify();}
    else if(action==='reset'){pause();state=validateExperimentSnapshot(spec,{v:1,template:kind,case:state.case});if(kind==='vector')mountVector();if(kind==='geartrain')stage.innerHTML=gearTrainMarkup(p);if(kind==='worm')stage.innerHTML=wormMarkup(p,svgScope);if(kind==='wave'||editableTransmission){for(const input of root.querySelectorAll('[data-scene-controls] input')){const k=input.dataset.sceneInput;input.value=String(k.startsWith('teeth')?p.teeth[Number(k.slice(5))]:p[k]);}}refresh();notify();}
  }
  function input(event){
    const target=event.target,key=target.dataset?.sceneInput;if(!key)return;
    const value=Number(target.value);if(!Number.isFinite(value))return;
    if(key==='rate')state.rate=value;
    else if(kind==='wave'||editableTransmission)state.inputs={...state.inputs,[key]:value};
    if(kind==='geartrain'&&key.startsWith('teeth'))stage.innerHTML=gearTrainMarkup(effective());
    if(kind==='worm'&&key==='wheelTeeth')stage.innerHTML=wormMarkup(effective(),svgScope);
    state=validateExperimentSnapshot(spec,state);refresh();notify();
  }
  function visibility(){if(root.ownerDocument.hidden){pause();notify();}}
  function keydown(event){
    const button=event.target.closest?.('[data-scene-case]');if(!button||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();const buttons=[...root.querySelectorAll('[data-scene-case]')],i=buttons.indexOf(button),next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(i+(event.key==='ArrowRight'?1:buttons.length-1))%buttons.length;buttons[next].focus();buttons[next].click();
  }
  root.addEventListener('click',click);root.addEventListener('input',input);root.addEventListener('keydown',keydown);root.ownerDocument.addEventListener('visibilitychange',visibility);
  refresh();
  return {snapshot,dispose(){if(disposed)return;pause();notify();disposed=true;vector?.dispose();root.removeEventListener('click',click);root.removeEventListener('input',input);root.removeEventListener('keydown',keydown);root.ownerDocument.removeEventListener('visibilitychange',visibility);}};
}
