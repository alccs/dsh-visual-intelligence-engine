/** Bounded semantic models. All angles are radians; speeds are rad/s.
 * Straight external spur trains share one module and fixed parallel axes. */
function normalizeGearTrain(input) {
  experimentKeys(input,['teeth','module','inputSpeed']);
  const p={teeth:[20,30,40],module:1,inputSpeed:1,...input};
  if(!Array.isArray(p.teeth)||p.teeth.length<2||p.teeth.length>6)throw Error('GearTrain: teeth requires 2–6 gears');
  p.teeth=p.teeth.map((z,i)=>experimentNumber(z,18,80,'teeth['+i+']',true));
  experimentNumber(p.module,.1,10,'module');experimentNumber(p.inputSpeed,-4,4,'inputSpeed');
  return p;
}
function gearTrainModel(p,phase=0,inputSpeed=p.inputSpeed) {
  const radii=p.teeth.map(z=>z*p.module/2),centers=[radii[0]],rates=[1],initial=[0];
  for(let i=1;i<radii.length;i++){
    centers.push(centers[i-1]+radii[i-1]+radii[i]);
    rates.push(-rates[i-1]*p.teeth[i-1]/p.teeth[i]);
    // A tooth centre faces a gap at each pitch contact, for every input angle.
    initial.push(Math.PI-Math.PI/p.teeth[i]-p.teeth[i-1]*initial[i-1]/p.teeth[i]);
  }
  return {radii,centers,rates,initial,angles:rates.map((r,i)=>initial[i]+r*phase),
    speeds:rates.map(r=>r*inputSpeed),outputRatio:rates.at(-1),
    transmissionRatio:1/rates.at(-1),width:centers.at(-1)+radii.at(-1)};
}
function normalizeWorm(input) {
  experimentKeys(input,['starts','wheelTeeth','inputSpeed']);
  const p={starts:2,wheelTeeth:40,inputSpeed:1,...input};
  experimentNumber(p.starts,1,4,'starts',true);experimentNumber(p.wheelTeeth,20,80,'wheelTeeth',true);
  experimentNumber(p.inputSpeed,-4,4,'inputSpeed');return p;
}
function wormModel(p,phase=0,inputSpeed=p.inputSpeed) {
  const speedRatio=p.starts/p.wheelTeeth;
  return {speedRatio,transmissionRatio:1/speedRatio,input:inputSpeed,outputMagnitude:Math.abs(inputSpeed)*speedRatio,
    wheelAngle:-phase*speedRatio,wormAngle:phase};
}
/** Interactive inputs and immutable definitions share one normalization path. */
function effectiveExperimentParameters(spec,inputs={}) {
  if(spec.template==='geartrain')return normalizeGearTrain({...spec.parameters,
    teeth:spec.parameters.teeth.map((z,i)=>inputs['teeth'+i]??z),
    inputSpeed:inputs.inputSpeed??spec.parameters.inputSpeed});
  return normalizeExperiment(spec.template,{...spec.parameters,...inputs});
}
