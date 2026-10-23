/** Shared authoring policy and document contracts consumed by validation and reference generation. */
const VIE_POLICY='每张图后用Harness正文解释图中关键关系，不能仅过渡一句便出下一图。优先原生graphic/chart/Flow，减少手写SVG。变化过程明确分开前→后，箭头连接对应对象，不能将前后工件重叠或画成断裂材料。窄屏用CSS重排或分步查看，标注不低于11px。说明材料、工况与适用范围，不把热锻等同所有锻造；数值注明来源，示意值不能充当工艺限值。VIE只画当前段落的图、交互、图例和短标注；完整解释/公式/表格由Harness正文渲染。任意主题均可。复杂主题按图→正文解释→下一图→正文解释展开，每张图聚焦一个概念；勿把各章节拼成一张SVG的编号小面板或多图海报。需同时比较或共享交互才并列。默认flow按调用位置显示，补图/修图无需more:true，通常1张、必要时2–3张。visualId仅供修改，不是图片URL；不必先加载技能或写脚本。';
const VIE_VISUAL_POLICY='Use actual tool calls only; never print DSML/DSEL tags or visualization source in prose. When tools are unavailable, finish with normal prose. One focused concept per graphic; write the full explanation in normal Harness prose, then call the next graphic if needed. No multi-section SVG collages. Side-by-side only for comparisons/shared interaction. Any topic; prefer vie_explain, default flow. more is optional; visualId is not an image URL.';
const DOCUMENT_PROPERTIES=Object.freeze({caption:{type:'string',description:'Compatibility alias for top-level caption (max 140 characters). Prefer the tool-level caption; explicit tool-level value takes precedence.'},title:{type:'string',description:'Short title; if omitted, inferred from the first block title.'},controls:{type:'array',items:{type:'json'}},derive:{type:'json',description:'Optional unique derived keys mapped to numeric expressions.'},layout:{type:'string',enum:['stack','grid']},blocks:{type:'array',required:true,description:'One focused graphic per call. Flow example: [{type:"visual",kind:"Flow",spec:{title:"Process",nodes:[{id:"a",label:"Start"},{id:"b",label:"End"}],edges:[{from:"a",to:"b"}]}}]. For visual blocks put title inside spec.',items:{type:'json'}}});
const DOCUMENT_CONTRACT=Object.freeze({
  fields:Object.keys(DOCUMENT_PROPERTIES),
  blocks:{
    graphic:{fields:['type','kind','title','items','unit'],help:'Engine-rendered bars/donut/vectors. items:[{label,value}] or vectors [{label,x,y}], optional tone. No HTML/CSS/JS required.'},
    chart:{fields:['type','title','x','y','series','regions','controls','inputs','bindings','note'],help:'Formula or data curves, region fills; bindings map variable names to shared control/derived keys.'},
    visual:{fields:['type','kind','spec'],help:'Flow, RelationGraph, Timeline, Diagram or Animation. Diagram coordinates may bind /shared/key or /derived/key.'},
    figure:{fields:['type','title','html','css','js','state','height','bindings'],help:'One focused diagram in an isolated HTML/CSS/JS sandbox; do not pack independent chapters into numbered SVG mini-panels. Put each chapter graphic in its own call, separated by native prose. bindings map state keys to shared controls/derived keys.'},
    experiment:{fields:['type','template','parameters','title'],help:'Optional existing experiment shortcut, never a topic restriction.'},
    text:{fields:['type','title','body'],help:'Legacy compatibility only; new explanations belong in Harness prose.'}
  }
});
const CONTROL_TYPES=Object.freeze({slider:'Slider',number:'NumberInput',select:'SegmentedControl',toggle:'Toggle'});
function validateControlSpec(c){
  if(!c||typeof c!=='object'||Array.isArray(c)||Object.getPrototypeOf(c)!==Object.prototype)throw Error('Control requires an object');
  for(const key of Object.keys(c))if(!['key','label','min','max','step','value','bind','kind','options'].includes(key))throw Error('Unknown control field: '+key);
  if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(c.key)||['x','constructor','prototype','__proto__'].includes(c.key))throw Error('Invalid control key');
  if(typeof c.label!=='string'||c.label.length>100)throw Error('Invalid control label');
  const kind=c.kind??'slider';if(!Object.hasOwn(CONTROL_TYPES,kind))throw Error('Unknown control kind');
  const min=c.min??(kind==='toggle'?0:undefined),max=c.max??(kind==='toggle'?1:undefined),step=c.step??(kind==='toggle'?1:(max-min)/100);
  if(![min,max,step,c.value].every(n=>typeof n==='number'&&Number.isFinite(n)&&Math.abs(n)<=1e9)||max<=min||step<=0||step>max-min)throw Error('Invalid control bounds: '+c.key+' requires numeric min < max, 0 < step <= max-min and numeric value; select also needs these bounds and options [{label,value:number}]');
  assertSliderValue({min,max,step},c.value,'Control value');
  const out={key:c.key,label:c.label,min,max,step,value:c.value,...(c.kind===undefined?{}:{kind})};
  if(kind==='toggle'&&(min!==0||max!==1||step!==1))throw Error('Toggle must use numeric 0/1');
  if(kind==='select'){
    if(!Array.isArray(c.options)||c.options.length<2||c.options.length>8)throw Error('Select needs 2–8 options');
    out.options=c.options.map(option=>{if(!option||Object.keys(option).some(k=>!['label','value'].includes(k))||typeof option.label!=='string'||!option.label||option.label.length>40)throw Error('Invalid select option');assertSliderValue({min,max,step},option.value,'Option value');return {label:option.label,value:option.value};});
    if(new Set(out.options.map(o=>o.value)).size!==out.options.length||!out.options.some(o=>o.value===c.value))throw Error('Select needs unique values and a matching default');
  }else if(c.options!==undefined)throw Error('Options only apply to select');
  if(c.bind!==undefined){if(typeof c.bind!=='string'||!/^\/shared\/[A-Za-z][A-Za-z0-9_]{0,19}$/.test(c.bind))throw Error('Invalid shared control binding');out.bind=c.bind;}
  return out;
}
function documentReference(){
  return '# VIE component reference (generated)\n\n'+VIE_POLICY+'\n\nDocument fields: '+DOCUMENT_CONTRACT.fields.join(', ')+'\n\n'+Object.entries(DOCUMENT_CONTRACT.blocks).map(([type,c])=>'## '+type+'\n\nFields: '+c.fields.join(', ')+'\n\n'+c.help+'\n').join('\n')+'\n## Controls\n\n'+Object.entries(CONTROL_TYPES).map(([kind,type])=>'- '+kind+' → '+type).join('\n')+'\n\nControls are numeric. toggle uses 0/1; select uses options [{label,value}]. derive maps unique keys to bounded numeric expressions. layout is stack (default) or grid.\n';
}
