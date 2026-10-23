/** Trusted, deterministic experiment models shared by DSH Host and browser.
 * Model input is bounded data. It cannot provide JavaScript, HTML or a solver.
 */
const EXPERIMENT_CATALOG = Object.freeze({
  planetary: { id:'lab.planetary', title:'行星轮系', timed:true, description:'太阳轮、行星轮、内齿圈与行星架；三种固定工况', terms:['行星轮系','行星齿轮','周转轮系','planetary gear','epicyclic gear'] },
  gears: { id:'lab.gears', title:'齿轮传动', timed:true, description:'外啮合／内啮合的方向与传动比', terms:['齿轮传动','齿轮啮合','齿轮','gear ratio','gear mesh','spur gears'] },
  geartrain: { id:'lab.geartrain', title:'定轴轮系', timed:true, description:'2–6个相邻外啮合的平面定轴轮；齿数、惰轮、方向与总传动比', terms:['定轴轮系','平面轮系','三轮传动','三轮串联','多级齿轮','多轮传动','惰轮','gear train','idler gear'],priority:4 },
  worm: { id:'lab.worm', title:'蜗杆与蜗轮', timed:true, description:'蜗杆头数、蜗轮齿数与减速关系；交错轴结构示意', terms:['蜗杆','蜗轮','worm gear','worm drive'],priority:4 },
  wave: { id:'lab.wave', title:'波的叠加', timed:true, description:'改变振幅与相位，观察相长和相消干涉', terms:['波的叠加','波干涉','相长干涉','相消干涉','wave interference','superposition'] },
  process: { id:'lab.process', title:'流程逐步解释', timed:false, description:'有事实依据的流程、分支与逐步执行', terms:['逐步流程','流程单步','算法单步','step through process','process stepper'] },
  vector: { id:'lab.vector', title:'向量分解', timed:false, description:'拖动向量，观察水平与竖直分量', terms:['向量分解','向量','矢量','vector components','vector projection','vectors'] },
});
const EXPERIMENT_CASES = Object.freeze(['ring-fixed','sun-fixed','carrier-fixed']);
const experimentObject = x => x!==null && typeof x==='object' && !Array.isArray(x) && Object.getPrototypeOf(x)===Object.prototype;
function experimentKeys(value, allowed, label='parameters') {
  if(!experimentObject(value))throw Error('Experiment: '+label+' must be an object');
  for(const key of Object.keys(value))if(!allowed.includes(key))throw Error('Experiment: unsupported '+label+' field '+key);
}
function experimentNumber(value, min, max, name, integer=false) {
  if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max||integer&&!Number.isInteger(value))throw Error(`Experiment: ${name} must be ${integer?'an integer ':''}between ${min} and ${max}`);
  return value;
}
function experimentText(value, max, name) {
  if(typeof value!=='string'||value.length>max||/[\x00-\x08\x0b\x0e-\x1f]/.test(value))throw Error('Experiment: invalid '+name);
  return value;
}
/* @include shared/transmission.js */
function normalizeExperiment(template, input={}) {
  if(!Object.hasOwn(EXPERIMENT_CATALOG,template))throw Error('Experiment: unknown template');
  if(template==='geartrain')return normalizeGearTrain(input);
  if(template==='worm')return normalizeWorm(input);
  if(template==='planetary') {
    experimentKeys(input,['sunTeeth','planetTeeth','ringTeeth','planetCount','module','initialCase','inputSpeed']);
    const p={sunTeeth:36,planetTeeth:27,ringTeeth:90,planetCount:3,module:1,initialCase:'ring-fixed',inputSpeed:1,...input};
    const owns=k=>Object.hasOwn(input,k);
    if(!owns('ringTeeth')&&(owns('sunTeeth')||owns('planetTeeth')))p.ringTeeth=p.sunTeeth+2*p.planetTeeth;
    else if(owns('ringTeeth')&&owns('sunTeeth')&&!owns('planetTeeth'))p.planetTeeth=(p.ringTeeth-p.sunTeeth)/2;
    else if(owns('ringTeeth')&&owns('planetTeeth')&&!owns('sunTeeth'))p.sunTeeth=p.ringTeeth-2*p.planetTeeth;
    experimentNumber(p.sunTeeth,18,100,'sunTeeth',true); experimentNumber(p.planetTeeth,18,72,'planetTeeth',true);
    experimentNumber(p.ringTeeth,54,180,'ringTeeth',true); experimentNumber(p.planetCount,2,6,'planetCount',true);
    experimentNumber(p.module,.1,10,'module'); experimentNumber(p.inputSpeed,-20,20,'inputSpeed');
    if(!EXPERIMENT_CASES.includes(p.initialCase))throw Error('Experiment: unsupported planetary case');
    if(p.ringTeeth!==p.sunTeeth+2*p.planetTeeth)throw Error('行星轮系需满足：齿圈齿数 = 太阳轮齿数 + 2 × 行星轮齿数');
    if((p.sunTeeth+p.ringTeeth)%p.planetCount!==0)throw Error('等角度装配需满足：(太阳轮齿数 + 齿圈齿数) / 行星轮个数为整数');
    if(p.planetTeeth+2>=(p.sunTeeth+p.planetTeeth)*Math.sin(Math.PI/p.planetCount))throw Error('相邻行星轮的齿顶间距不足；请减小行星轮或行星轮个数');
    return p;
  }
  if(template==='gears') {
    experimentKeys(input,['driverTeeth','drivenTeeth','module','mesh','inputSpeed']);
    const p={driverTeeth:24,drivenTeeth:48,module:1,mesh:'external',inputSpeed:1,...input};
    experimentNumber(p.driverTeeth,18,100,'driverTeeth',true); experimentNumber(p.drivenTeeth,18,180,'drivenTeeth',true);
    experimentNumber(p.module,.1,10,'module'); experimentNumber(p.inputSpeed,-20,20,'inputSpeed');
    if(!['external','internal'].includes(p.mesh))throw Error('Experiment: unsupported mesh');
    if(p.mesh==='internal'&&p.drivenTeeth-p.driverTeeth<12)throw Error('内啮合教学布局要求从动齿圈比主动轮至少多 12 齿；不代表完整干涉校核');
    return p;
  }
  if(template==='wave') {
    experimentKeys(input,['amplitudeA','amplitudeB','phaseDegrees','frequencyHz','waveNumber']);
    const p={amplitudeA:1,amplitudeB:1,phaseDegrees:0,frequencyHz:.4,waveNumber:2,...input};
    experimentNumber(p.amplitudeA,0,2,'amplitudeA'); experimentNumber(p.amplitudeB,0,2,'amplitudeB');
    experimentNumber(p.phaseDegrees,0,360,'phaseDegrees'); experimentNumber(p.frequencyHz,.1,2,'frequencyHz');
    experimentNumber(p.waveNumber,1,5,'waveNumber',true); return p;
  }
  if(template==='vector') {
    experimentKeys(input,['magnitude','angle']); const p={magnitude:4,angle:30,...input};
    experimentNumber(p.magnitude,0,5,'magnitude'); experimentNumber(p.angle,-180,180,'angle',true);
    if(Math.abs(p.magnitude*10-Math.round(p.magnitude*10))>1e-8)throw Error('Experiment: vector magnitude uses increments of 0.1');
    return p;
  }
  experimentKeys(input,['title','nodes','edges']);
  const p={title:'观察、判断与行动',nodes:[{id:'observe',label:'观察现象',detail:'先记录已有事实。'},{id:'check',label:'检查条件',detail:'用明确条件决定接下来的路径。'},{id:'act',label:'执行行动',detail:'沿当前分支继续，并检查结果。'}],...input};
  experimentText(p.title,90,'title');
  if(!Array.isArray(p.nodes)||p.nodes.length<2||p.nodes.length>10)throw Error('Experiment: process requires 2–10 nodes');
  p.nodes=p.nodes.map(node=>{experimentKeys(node,['id','label','detail'],'node');if(typeof node.id!=='string'||! /^[A-Za-z][A-Za-z0-9_-]{0,43}$/.test(node.id))throw Error('Experiment: invalid node id');return {id:node.id,label:experimentText(node.label,52,'label'),detail:experimentText(node.detail??'',160,'detail')};});
  const ids=new Set(p.nodes.map(n=>n.id));if(ids.size!==p.nodes.length)throw Error('Experiment: duplicate node id');
  p.edges=p.edges??p.nodes.slice(0,-1).map((n,i)=>({from:n.id,to:p.nodes[i+1].id,label:'继续'}));
  if(!Array.isArray(p.edges)||p.edges.length>18)throw Error('Experiment: too many process edges');
  p.edges=p.edges.map(edge=>{experimentKeys(edge,['from','to','label'],'edge');if(!ids.has(edge.from)||!ids.has(edge.to)||edge.from===edge.to)throw Error('Experiment: invalid process edge');return {from:edge.from,to:edge.to,label:experimentText(edge.label??'继续',45,'edge label')};});
  return p;
}
function validateExperimentSpec(spec) {
  experimentKeys(spec,['template','parameters','title'],'scene');
  const parameters=normalizeExperiment(spec.template,spec.parameters??{});
  return {template:spec.template,parameters,title:experimentText(spec.title??(spec.template==='process'?parameters.title:EXPERIMENT_CATALOG[spec.template].title),100,'title')};
}
function experimentSceneSource(template, parameters={}) {
  const spec=validateExperimentSpec({template,parameters});
  const events=[{v:1,op:'surface.begin',id:'experiment-'+template},{v:1,op:'node.put',id:'experiment',type:'InteractiveScene',props:spec},{v:1,op:'surface.end',id:'experiment-'+template}];
  const lines=events.map(e=>JSON.stringify(e)+'\n');
  if(lines.some(line=>new TextEncoder().encode(line).length>6144))throw Error('Experiment: scene exceeds per-event limit');
  return lines.join('');
}
function planetaryRates(parameters, activeCase, inputSpeed=parameters.inputSpeed) {
  const {sunTeeth:s,planetTeeth:p,ringTeeth:r}=parameters;
  let sun=0,ring=0,carrier=0;
  if(activeCase==='ring-fixed'){sun=inputSpeed;carrier=s*sun/(s+r);}
  else if(activeCase==='sun-fixed'){ring=inputSpeed;carrier=r*ring/(s+r);}
  else if(activeCase==='carrier-fixed'){sun=inputSpeed;ring=-s*sun/r;}
  else throw Error('Experiment: unknown planetary case');
  const planet=carrier-s/p*(sun-carrier);
  return {sun,ring,carrier,planet,planetRelative:planet-carrier,residual:s*(sun-carrier)+r*(ring-carrier)};
}
function planetaryPhases(parameters, phase, activeCase=parameters.initialCase) {
  const rates=planetaryRates(parameters,activeCase,1),s=parameters.sunTeeth,p=parameters.planetTeeth,r=parameters.ringTeeth;
  const first=-Math.PI/2;
  const ringInitial=((s+r)*first+p*Math.PI)/r;
  const planets=Array.from({length:parameters.planetCount},(_,i)=>{
    const azimuth=first+2*Math.PI*i/parameters.planetCount;
    const initial=((s+p)*azimuth+p*Math.PI-Math.PI)/p;
    return {azimuth,absolute:initial+rates.planet*phase,relative:initial+(rates.planet-rates.carrier)*phase};
  });
  return {sun:rates.sun*phase,ring:ringInitial+rates.ring*phase,carrier:rates.carrier*phase,planets};
}
function waveSample(parameters,x,time=0) {
  const {amplitudeA:a,amplitudeB:b,phaseDegrees,frequencyHz:f,waveNumber:k}=parameters;
  const phase=phaseDegrees*Math.PI/180,base=k*x-2*Math.PI*f*time;
  const first=a*Math.sin(base),second=b*Math.sin(base+phase);
  return {first,second,sum:first+second,envelope:Math.sqrt(Math.max(0,a*a+b*b+2*a*b*Math.cos(phase)))};
}
/** A persisted UI snapshot is separate from the immutable scene definition. */
function validateExperimentSnapshot(spec, value) {
  experimentKeys(value,['v','template','case','phase','rate','direction','index','history','inputs'],'snapshot');
  if(value.v!==1||value.template!==spec.template)throw Error('Experiment: snapshot version/template mismatch');
  const result={v:1,template:spec.template,case:spec.template==='planetary'?spec.parameters.initialCase:'',phase:0,rate:1,direction:1,index:0,history:[0],inputs:{}};
  if(value.case!==undefined){if(spec.template==='planetary'&&!EXPERIMENT_CASES.includes(value.case)||spec.template!=='planetary'&&value.case!=='')throw Error('Experiment: invalid snapshot case');result.case=value.case;}
  for(const [key,min,max] of [['phase',-1e9,1e9],['rate',.1,2],['direction',-1,1],['index',0,spec.template==='process'?spec.parameters.nodes.length-1:0]])if(value[key]!==undefined)result[key]=experimentNumber(value[key],min,max,key,key==='index');
  if(![-1,1].includes(result.direction))throw Error('Experiment: invalid direction');
  if(value.history!==undefined){if(!Array.isArray(value.history)||value.history.length>64||!value.history.every(i=>Number.isInteger(i)&&i>=0&&i<=(spec.template==='process'?spec.parameters.nodes.length-1:0)))throw Error('Experiment: invalid history');result.history=[...value.history];}
  if(value.inputs!==undefined){
    const allowed=spec.template==='geartrain'?[...spec.parameters.teeth.map((_,i)=>'teeth'+i),'inputSpeed']:spec.template==='worm'?['starts','wheelTeeth','inputSpeed']:spec.template==='wave'?['amplitudeA','amplitudeB','phaseDegrees','frequencyHz']:spec.template==='vector'?['magnitude','angle']:[];
    experimentKeys(value.inputs,allowed,'interactive input');
    for(const [key,number] of Object.entries(value.inputs))experimentNumber(number,-1e6,1e6,key);
    effectiveExperimentParameters(spec,value.inputs);result.inputs={...value.inputs};
  }
  if(spec.template==='process'){
    if(!result.history.length||result.history.at(-1)!==result.index)throw Error('Experiment: history must end at the current node');
    for(let i=1;i<result.history.length;i++)if(!spec.parameters.edges.some(edge=>edge.from===spec.parameters.nodes[result.history[i-1]].id&&edge.to===spec.parameters.nodes[result.history[i]].id))throw Error('Experiment: history contains an undeclared branch');
  }
  return result;
}
function experimentContext(spec,saved){
  const state=validateExperimentSnapshot(spec,saved??{v:1,template:spec.template}),parameters=effectiveExperimentParameters(spec,state.inputs);
  let derived={};
  if(spec.template==='planetary')derived=planetaryRates(parameters,state.case,parameters.inputSpeed*state.direction);
  else if(spec.template==='gears'){const ratio=(parameters.mesh==='internal'?1:-1)*parameters.driverTeeth/parameters.drivenTeeth;derived={ratio,driver:parameters.inputSpeed*state.direction,driven:parameters.inputSpeed*state.direction*ratio};}
  else if(spec.template==='geartrain'){const m=gearTrainModel(parameters,state.phase,parameters.inputSpeed*state.direction);derived={speeds:m.speeds,outputRatio:m.outputRatio,transmissionRatio:m.transmissionRatio};}
  else if(spec.template==='worm')derived=wormModel(parameters,state.phase,parameters.inputSpeed*state.direction);
  else if(spec.template==='wave')derived={envelope:waveSample(parameters,0,state.phase).envelope};
  else if(spec.template==='vector'){const angle=parameters.angle*Math.PI/180;derived={x:parameters.magnitude*Math.cos(angle),y:parameters.magnitude*Math.sin(angle)};}
  else derived={currentNode:parameters.nodes[state.index].id,outgoing:parameters.edges.filter(edge=>edge.from===parameters.nodes[state.index].id)};
  return {template:spec.template,parameters,state,derived};
}
