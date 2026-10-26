const {VISUAL_KINDS,visualNodeProps,validateVisualSpec,visualSceneSource,sceneStateEvents}=(()=>{
/** VIE generic visual catalog: a single strict schema for Host and browser.
 * Only validated DATA reaches the SVG generator. No JS, HTML, URLs or CSS.
 */
const VISUAL_KINDS=Object.freeze(['Flow','RelationGraph','Timeline','Diagram','Animation']);
const VISUAL_LIMITS=Object.freeze({nodes:12,edges:20,items:12,shapes:256,labels:144,coordinate:1200,commands:1024});
const PL=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
const err=m=>{throw Error('Visual schema: '+m);};
const keys=(o,allowed)=>{if(!PL(o))err('expected plain object');for(const k of Object.keys(o))if(!allowed.includes(k))err('forbidden field '+k);};
const str=(v,max=80)=>{if(typeof v!=='string'||v.length>max||/[\x00-\x08\x0b\x0e-\x1f]/.test(v))err('invalid text');return v;};
const num=(v,min,max)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max)err('invalid number');return v;};
const id=x=>{if(typeof x!=='string'||! /^[A-Za-z][A-Za-z0-9_-]{0,43}$/.test(x))err('invalid id');return x;};
const tone=v=>{if(!['primary','secondary','accent','muted','warning'].includes(v))err('invalid color token');return v;};
const motionEase=v=>{if(!['linear','inOut'].includes(v))err('unsupported easing');return v;};
const role=v=>{if(!['default','input','output','fixed','step','important','neutral'].includes(v))err('invalid role');return v;};
const pathData=v=>{
  str(v,16000);
  // SVG 2D path subset. Reject script, URLs, exponents and non-path syntax.
  if(!/^[MmLlHhVvQqCcAaZz\d\-+.,\s]+$/.test(v))err('path command not allowed');
  if((v.match(/[MmLlHhVvQqCcAaZz]/g)||[]).length>VISUAL_LIMITS.commands)err('too many path commands');
  const numbers=v.match(/[-+]?(?:\d+\.?\d*|\.\d+)/g)||[];
  if(numbers.some(n=>!Number.isFinite(Number(n))||Math.abs(Number(n))>VISUAL_LIMITS.coordinate))err('path coordinate out of range');
  if(!/[Mm]/.test(v))err('path must start from moveto');
  return v;
};
function validateShape(obj){
  keys(obj,['k','id','label','detail','anchor','x','y','x1','y1','x2','y2','cx','cy','r','w','h','rx','ry','points','d','t','tone','fill','strokeWidth']);
  const k=str(obj.k,16);if(!['line','arrow','circle','rect','ellipse','polyline','path','text'].includes(k))err('unsupported shape '+k);
  const s={k};if(obj.id!==undefined)s.id=id(obj.id);
  if(obj.label!==undefined)s.label=str(obj.label,52);
  if(obj.detail!==undefined)s.detail=str(obj.detail,160);
  if(obj.anchor!==undefined){if(k!=='text'||!['start','middle','end'].includes(obj.anchor))err('invalid text anchor');s.anchor=obj.anchor;}
  if(obj.tone!==undefined)s.tone=tone(obj.tone);
  if(obj.fill!==undefined){if(typeof obj.fill!=='boolean')err('fill must be boolean');s.fill=obj.fill;}
  if(obj.strokeWidth!==undefined)s.strokeWidth=num(obj.strokeWidth,.5,8);
  const boundCoord=(value,min=-1200,max=1200)=>{
  if(typeof value==='number')return num(value,min,max);
  keys(value,['$bind','scale','offset']);
  if(typeof value.$bind!=='string'||!/^\/[A-Za-z][A-Za-z0-9_/-]{0,95}$/.test(value.$bind)||value.$bind.includes('//'))err('invalid geometric binding');
  return {$bind:value.$bind,...(value.scale===undefined?{}:{scale:num(value.scale,-100,100)}),...(value.offset===undefined?{}:{offset:num(value.offset,-1200,1200)})};
};
  const fields={line:['x1','y1','x2','y2'],arrow:['x1','y1','x2','y2'],circle:['cx','cy','r'],rect:['x','y','w','h'],ellipse:['cx','cy','rx','ry'],text:['x','y'],polyline:[],path:[]};
  for(const f of fields[k]){if(obj[f]===undefined)err('missing '+f);s[f]=boundCoord(obj[f],f==='r'||f==='w'||f==='h'||f==='rx'||f==='ry'?0:-1200,1200);}
  if(k==='rect')for(const optional of ['rx','ry'])if(obj[optional]!==undefined)s[optional]=boundCoord(obj[optional],0,200);
  if(k==='polyline'){
    if(!Array.isArray(obj.points)||obj.points.length<2||obj.points.length>512)err('invalid polyline');
    s.points=obj.points.map(p=>{if(!Array.isArray(p)||p.length!==2)err('invalid point');return [num(p[0],-1200,1200),num(p[1],-1200,1200)];});
  }
  if(k==='path')s.d=pathData(obj.d);
  if(k==='text'){if(obj.t===undefined)err('missing label');s.t=str(obj.t,72);}
  for(const f of ['x','y','x1','y1','x2','y2','cx','cy','r','w','h','rx','ry','points','d','t'])if(obj[f]!==undefined&&!Object.hasOwn(s,f))err('field not applicable: '+f);
  return s;
}
function validateNode(n){
  keys(n,['id','label','detail','role']);
  return {id:id(n.id),label:str(n.label,52),...(n.detail===undefined?{}:{detail:str(n.detail,160)}),...(n.role===undefined?{}:{role:role(n.role)})};
}
function validateEdge(e,known){
  keys(e,['from','to','label','kind']);
  const from=id(e.from),to=id(e.to);
  if(!known.has(from)||!known.has(to))err('unknown edge endpoint '+[from,to].filter(x=>!known.has(x)).join(', ')+'; valid node ids: '+[...known].join(', '));
  if(e.kind!==undefined&&!['arrow','line','supports','meshes','depends'].includes(e.kind))err('invalid edge kind');
  return {from,to,...(e.label===undefined?{}:{label:str(e.label,45)}),...(e.kind===undefined?{}:{kind:e.kind})};
}
function validateVisualSpec(kind,value){
  if(!VISUAL_KINDS.includes(kind))err('unknown visual kind');
  keys(value,['title','subtitle','layout','nodes','edges','items','shapes','width','height','accuracy','representation','duration','motions','presentation']);
  const result={title:str(value.title??'',100)};
  if(value.subtitle!==undefined)result.subtitle=str(value.subtitle,160);
  if(value.presentation!==undefined){if(kind!=='Flow'||!['overview','guided'].includes(value.presentation))err('invalid flow presentation');result.presentation=value.presentation;}
  if(value.accuracy!==undefined){if(!['schematic','calculated','validated'].includes(value.accuracy))err('invalid accuracy');result.accuracy=value.accuracy;}
  if(value.representation!==undefined){if(!['structure','pitch-circles'].includes(value.representation)||!['Diagram','Animation'].includes(kind))err('invalid representation');result.representation=value.representation;}
  if(kind==='Flow'||kind==='RelationGraph'){
    if(!Array.isArray(value.nodes)||value.nodes.length<2||value.nodes.length>VISUAL_LIMITS.nodes)err('node count');
    const nodes=value.nodes.map(validateNode),known=new Set(nodes.map(n=>n.id));
    if(known.size!==nodes.length)err('duplicate node id');
    const edges=value.edges??[];
    if(!Array.isArray(edges)||edges.length>VISUAL_LIMITS.edges)err('edge count');
    result.nodes=nodes;result.edges=edges.map((e,i)=>{try{return validateEdge(e,known);}catch(error){error.path='edges['+i+']';throw error;}});
    const allowed=kind==='Flow'?['auto','horizontal','vertical']:['auto','radial','grid'];
    if(value.layout!==undefined){if(!allowed.includes(value.layout))err('layout not supported');result.layout=value.layout;}
    if(kind==='Flow' && !result.edges.length)result.edges=nodes.slice(0,-1).map((n,i)=>({from:n.id,to:nodes[i+1].id,kind:'arrow'}));
  } else if(kind==='Timeline'){
    if(!Array.isArray(value.items)||value.items.length<2||value.items.length>VISUAL_LIMITS.items)err('timeline count');
    result.items=value.items.map(item=>{
      keys(item,['id','at','label','detail']);
      return {id:id(item.id),at:str(item.at,28),label:str(item.label,60),...(item.detail===undefined?{}:{detail:str(item.detail,160)})};
    });
    if(new Set(result.items.map(i=>i.id)).size!==result.items.length)err('duplicate item id');
  } else {
    if(!Array.isArray(value.shapes)||value.shapes.length<1||value.shapes.length>VISUAL_LIMITS.shapes)err('shape count');
    if(value.shapes.filter(s=>s.k==='text').length>VISUAL_LIMITS.labels)err('too many labels');
    result.width=num(value.width??640,160,1200);
    result.height=num(value.height??280,120,850);
    result.shapes=value.shapes.map(validateShape);
    if(kind==='Animation'){
      result.duration=num(value.duration??4,.5,30);
      if(!Array.isArray(value.motions)||value.motions.length<1||value.motions.length>8)err('animation must contain 1–8 motions');
      const ids=new Set(result.shapes.filter(s=>s.id).map(s=>s.id));
      result.motions=value.motions.map(m=>{
        keys(m,['id','kind','degrees','cx','cy','dx','dy','ease','cycles']);
        const name=id(m.id);if(!ids.has(name))err('animation references unknown shape');
        const cycles=m.cycles===undefined?1:num(m.cycles,-20,20);if(!Number.isInteger(cycles)||cycles===0)err('cycles must be a nonzero integer');
        if(m.kind==='rotate'){if(m.degrees===undefined||m.cx===undefined||m.cy===undefined)err('rotation needs angle and pivot');return {id:name,kind:'rotate',degrees:num(m.degrees,-1440,1440),cx:num(m.cx,-1200,1200),cy:num(m.cy,-1200,1200),cycles,ease:m.ease===undefined?'linear':motionEase(m.ease)};}
        if(m.kind==='translate'){if(m.dx===undefined||m.dy===undefined)err('translation needs dx and dy');return {id:name,kind:'translate',dx:num(m.dx,-1200,1200),dy:num(m.dy,-1200,1200),cycles,ease:m.ease===undefined?'linear':motionEase(m.ease)};}
        err('unsupported motion kind');
      });
      const motionCount=new Map();for(const m of result.motions){const n=(motionCount.get(m.id)||0)+1;if(n>3)err('too many motions for one shape');motionCount.set(m.id,n);}
    }
    const used=result.shapes.filter(s=>s.id).map(s=>s.id);
    if(new Set(used).size!==used.length)err('duplicate shape id');
  }
  // Unsupported properties cannot silently disappear and mislead the user.
  for(const key of ['nodes','edges','items','shapes','width','height','layout','duration','motions'])if(value[key]!==undefined&&!Object.hasOwn(result,key))err('field not applicable: '+key);

  return result;
}

function visualNodeProps(type,props){
  if(!VISUAL_KINDS.includes(type))err('unsupported visual node');
  // The node's props are the spec itself; share identical rules in Host and Client.
  return validateVisualSpec(type,props);
}

/** Short model-facing API: kind + domain facts, not a hand-written JSONL stream. */
function sceneStateEvents(options={}){
  if(!options||typeof options!=='object'||Array.isArray(options))throw Error('Invalid scene state');
  const events=[];
  for(const [name,op] of [['state','state.init'],['derive','state.derive']]){
    const entries=options[name]??{};
    if(!PLAIN(entries)||Object.keys(entries).length>24)throw Error('Scene '+name+' requires at most 24 entries');
    for(const [key,value] of Object.entries(entries))events.push(validateEvent({v:1,op,path:key,...(op==='state.init'?{value}:{expr:value})}));
  }
  return events;
}
function visualSceneSource(kind,spec,options={}){
  const clean=validateVisualSpec(kind,spec);
  const events=[{v:1,op:'surface.begin',id:'visual-scene'},...sceneStateEvents(options),
    {v:1,op:'node.put',id:'visual',type:kind,props:clean},
    {v:1,op:'surface.end',id:'visual-scene'}];
  const lines=events.map(e=>JSON.stringify(e)+'\n');
  if(lines.some(line=>new TextEncoder().encode(line).length>65536))err('diagram is too large for one VIE JSONL event');
  return lines.join('');
}

return {VISUAL_KINDS,visualNodeProps,validateVisualSpec,visualSceneSource,sceneStateEvents};
})();
const {storySceneSource,validateStorySpec}=(()=>{
/** Multi-panel semantic answer. Preserve the authored teaching sequence. */
const checkText=(x,max)=>{if(typeof x!=='string'||x.length>max)throw Error('Story: invalid text');return x;};
function validateStorySpec(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype)throw Error('Story: invalid object');
  for(const k of Object.keys(input))if(!['title','opening','takeaway','panels','state','derive'].includes(k))throw Error('Story: forbidden field '+k);
  if(!Array.isArray(input.panels)||input.panels.length<1||input.panels.length>4)throw Error('Story: requires 1–4 panels');
  const panels=input.panels.map(p=>{
    if(!p||typeof p!=='object'||Array.isArray(p))throw Error('Story: invalid panel');
    for(const k of Object.keys(p))if(!['kind','spec','caption'].includes(k))throw Error('Story: forbidden panel field '+k);
    if(!VISUAL_KINDS.includes(p.kind)&&p.kind!=='InteractiveScene')throw Error('Story: invalid panel kind');
    return {kind:p.kind,spec:p.kind==='InteractiveScene'?validateExperimentSpec(p.spec):validateVisualSpec(p.kind,p.spec),caption:p.caption===undefined?'':checkText(p.caption,1200)};
  });
  return {title:checkText(input.title??'交互图文解释',90),opening:checkText(input.opening??'',1200),takeaway:checkText(input.takeaway??'',1200),panels,state:input.state??{},derive:input.derive??{}};
}
function storySceneSource(input){
  const s=validateStorySpec(input),panel=[...s.panels];
  const ev=[{v:1,op:'surface.begin',id:'story-scene'},...sceneStateEvents(s)];
  let order=0;
  const put=(type,props)=>{ev.push({v:1,op:'node.put',id:'panel'+(++order),order,type,props});};
  panel.forEach((p,i)=>{
    put(p.kind,p.spec);
    // Keep paragraphs independent so individual live-text budgets stay bounded.
    if(i===0&&s.opening)put('Text',{body:s.opening});
    if(p.caption)put('Text',{body:p.caption});
  });
  if(s.takeaway)put('Text',{title:'核心结论',body:s.takeaway});
  ev.push({v:1,op:'surface.end',id:'story-scene'});
  const lines=ev.map(e=>JSON.stringify(e)+'\n');
  const enc=new TextEncoder();if(lines.some(line=>enc.encode(line).length>65536))throw Error('Story: panel exceeds per-event bound');
  if(enc.encode(lines.join('')).length>262144)throw Error('Story: total source too large');
  return lines.join('');
}

return {storySceneSource,validateStorySpec};
})();
/** VIE v0.14.1 - pure, dependency-free, browser/Node compatible core.
 * DSL input is bounded data; generated figure scripts run only in isolated frames. */
const LIMITS = Object.freeze({bytes: 262144, line: 65536, events: 300, nodes: 80, depth: 10});

/** Authoritative VIE v1 component-property contract. A property must have a
 * meaningful renderer/runtime consumer before it can be listed here. */
const COMPONENT_CATALOG=Object.freeze({
  Chart:{props:['title','x','y','series','controls','inputs','regions','note'],description:'General formula/data chart with local controls and region fills; no generated code required'},
  GenerativeFigure:{props:['title','html','css','js','height','state','bindings','preview'],description:'Topic-independent generated HTML/CSS/JS, isolated iframe; SVG/Canvas/WebGL and custom interaction, not bound to experiment templates'},
  Column:{props:[],description:'Vertical layout'}, Row:{props:[],description:'Horizontal layout'},
  Split:{props:['ratio'],description:'Responsive text / visual split layout'},
  Card:{props:['title'],description:'Grouped content'}, Text:{props:['title','body'],description:'Explanatory text'},
  Metric:{props:['label','value','bind','unit','format'],description:'Numeric readout (number/integer/percent/signed)'},
  Slider:{props:['label','bind','default','min','max','step','unit','format'],description:'Bound numeric slider'},
  NumberInput:{props:['label','bind','default','min','max','step','unit','format'],description:'Bound numeric input'},
  Toggle:{props:['label','bind','default','min','max','step'],description:'Numeric 0/1 switch'},
  SegmentedControl:{props:['label','bind','default','min','max','step','options'],description:'Numeric choice buttons'},
  Button:{props:['label','action','target','setValue'],description:'State set/reset action'},
  Progress:{props:['label','value','bind','min','max','unit','expr','format'],description:'Normalized progress with value and percent'},
  BarChart:{props:['title','data','labels','unit','sourceLabel','showAverage'],description:'Evidence-bearing labeled bars (optional aggregate summary)'},
  FunctionPlot:{props:['title','expr','xMin','xMax','yMin','yMax','sampleX'],description:'Configurable Cartesian function plot with optional dynamic sample point'},
  Divider:{props:[],description:'Divider'},Badge:{props:['label','title'],description:'Short label'},
  MotionScene:{props:['title','bind','min','max','unit'],description:'Preset moving-car displacement illustration'},
  CanTimingLab:{props:['clockMHz','prescaler','bs1','bs2','sjw','compareBs1','compareBs2'],description:'bxCAN bit timing experiment'},
  InteractiveLab:{props:['kind'],description:'Built-in bitwise/timer/ohm/fraction/probability/vector lab'},
  InteractiveScene:{props:['template','parameters','title'],description:'Registered experiment: planetary/gears/geartrain/worm/wave/process/vector; use geartrain for 2–6 serial external gears, worm for crossed-axis worm drive; trusted geometry, controls and readouts'},
  Flow:{props:['title','subtitle','layout','nodes','edges','accuracy','presentation'],description:'Topology-based overview or guided flow navigation'},
  RelationGraph:{props:['title','subtitle','layout','nodes','edges','accuracy'],description:'Automatic relationship graph'},
  Timeline:{props:['title','subtitle','items','accuracy'],description:'Interactive chronological events'},
  Diagram:{props:['title','subtitle','shapes','width','height','accuracy','representation'],description:'Bounded schematic primitives; shapes can have label/detail; geometry is not a domain solver'},
  Animation:{props:['title','subtitle','shapes','width','height','accuracy','representation','duration','motions'],description:'Generic declared transform animation for any topic; use GenerativeFigure for arbitrary per-frame calculations or 3D projection'}
});
const COMPONENT_DESCRIPTIONS=Object.freeze(Object.entries(COMPONENT_CATALOG)
  .map(([type,details])=>`${type} (${details.props.join(',')||'no props'}): ${details.description}`));
const FORMATS=new Set(['number','integer','percent','signed']);
/** Restricted live-text placeholders. No HTML and no eval. */
function templatePaths(template){
  if(typeof template!=='string'||template.length>1400)error('Invalid template text');
  const references=[];let count=0;
  const mask=template.replace(/\\\{\{[^{}]*\}\}/g,'\u0001');
  const pattern=/\{\{([^{}]*)\}\}/g;
  let match;
  while((match=pattern.exec(mask))!==null){
    if(++count>12)error('Too many live text slots');
    const bits=match[1].split('|');const key=path(bits.shift());
    for(const filter of bits){
      if(!/^(integer|fixed:[0-4]|signed:[0-4]|percent:[0-3]|unit:[A-Za-z%°μΩ\u4e00-\u9fff]{1,12})$/.test(filter))error('Invalid text filter: '+filter);
    }
    references.push(key);
  }
  if(mask.replace(pattern,'').includes('{{')||mask.replace(pattern,'').includes('}}'))error('Unclosed text slot');
  return references;
}
function interpolateText(template,values={}){
  templatePaths(template);
  return template.replace(/\\\{\{([^{}]*)\}\}|\{\{([^{}]*)\}\}/g,(literal,escaped,content)=>{
    if(escaped!==undefined)return '{{'+escaped+'}}';
    const [key,...filters]=content.split('|');let value=Object.hasOwn(values,key)?values[key]:null;
    if(typeof value!=='number'||!Number.isFinite(value))return '—';
    let string=Number.isInteger(value)?String(value):String(Number(value.toFixed(2)));
    for(const filter of filters){
      if(filter==='integer')string=String(Math.round(value));
      else if(filter.startsWith('fixed:'))string=value.toFixed(Number(filter.slice(6)));
      else if(filter.startsWith('signed:'))string=(value>0?'+':'')+value.toFixed(Number(filter.slice(7)));
      else if(filter.startsWith('percent:'))string=(value*100).toFixed(Number(filter.slice(8)))+'%';
      else if(filter.startsWith('unit:'))string+=' '+filter.slice(5);
    }
    return string;
  });
}

const ALLOWED = new Set(Object.keys(COMPONENT_CATALOG));
const ID = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const PATH = /^\/[a-zA-Z][a-zA-Z0-9_/-]{0,95}$/;
const PLAIN = x => x !== null && typeof x === 'object' && !Array.isArray(x) && Object.getPrototypeOf(x) === Object.prototype;
const finite = x => typeof x === 'number' && Number.isFinite(x);
function error(message){throw new Error(message)}
function text(x,max=300){ if(typeof x!=='string'||x.length>max) error('Invalid text'); return x; }
function id(x){if(typeof x!=='string'||!ID.test(x))error('Invalid id'); return x;}
function path(x){if(typeof x!=='string'||!PATH.test(x)||x.includes('//'))error('Invalid state path');return x;}
function val(x){ if(!(typeof x==='string' && x.length<=200 || typeof x==='boolean' || finite(x)))error('Invalid state value'); return x; }
function number(x,min,max){if(!finite(x)||x<min||x>max)error('Invalid numeric value');return x;}
const shared = o => {if(!PLAIN(o))error('Expected object');return o;};
function validateEvent(event) {
  shared(event);
  if(event.v!==1)error('Unsupported protocol version');
  if(!['surface.begin','node.put','node.remove','state.init','state.derive','surface.end'].includes(event.op))error('Unknown operation');
  if(event.op==='surface.begin'||event.op==='surface.end')return {v:1,op:event.op,id:id(event.id)};
  if(event.op==='node.remove')return {v:1,op:event.op,id:id(event.id)};
  if(event.op==='state.init')return {v:1,op:event.op,path:path(event.path),value:val(event.value)};
  if(event.op==='state.derive')return {v:1,op:event.op,path:path(event.path),expr:text(event.expr,300)};
  const type=text(event.type,32);
  if(!ALLOWED.has(type)) error('Unsupported component: '+type);
  const props=shared(event.props??{});
  if(type==='Chart')return {v:1,op:'node.put',id:id(event.id),type,props:validateChartSpec(props),parent:event.parent===undefined?'root':id(event.parent),order:event.order===undefined?0:number(event.order,-10000,10000)};
  if(type==='GenerativeFigure')return {v:1,op:'node.put',id:id(event.id),type,props:validateFigureDefinition(props,true),parent:event.parent===undefined?'root':id(event.parent),order:event.order===undefined?0:number(event.order,-10000,10000)};
  if(type==='InteractiveScene'){
    return {v:1,op:'node.put',id:id(event.id),type,props:validateExperimentSpec(props),parent:event.parent===undefined?'root':id(event.parent),order:event.order===undefined?0:number(event.order,-10000,10000)};
  }
  if(VISUAL_KINDS.includes(type)){
    const parent=event.parent===undefined?'root':id(event.parent);
    const order=event.order===undefined?0:number(event.order,-10000,10000);
    return {v:1,op:'node.put',id:id(event.id),type,props:visualNodeProps(type,props),parent,order};
  }
  if(Object.keys(props).length>25)error('Too many props');
  const contract=COMPONENT_CATALOG[type].props;
  const sanitized={};
  for(const [key,value] of Object.entries(props)) {
    if(!/^[a-zA-Z][\w]*$/.test(key))error('Invalid prop key');
    if(!contract.includes(key))error('Unsupported prop '+type+'.'+key);
    if(['label','title','body','unit','sourceLabel','kind'].includes(key)) {sanitized[key]=text(value,key==='body'?1400:700);if(['title','body'].includes(key))templatePaths(sanitized[key]);}
    else if(['bind','target'].includes(key))sanitized[key]=path(value);
    else if(key==='format'){if(!FORMATS.has(value))error('Unsupported format: '+value);sanitized[key]=value;}
    else if(key==='showAverage'){if(typeof value!=='boolean')error('Invalid showAverage flag');sanitized[key]=value;}
    else if(key==='ratio')sanitized[key]=number(value,0.2,0.8);
    else if(['xMin','xMax','yMin','yMax'].includes(key))sanitized[key]=number(value,-1000,1000);
    else if(key==='sampleX')sanitized[key]=typeof value==='string'?path(value):number(value,-1000,1000);
    else if(key==='action') {if(!['reset','set'].includes(value))error('Invalid action');sanitized[key]=value;}
    else if(['value','min','max','step','default','setValue','clockMHz','prescaler','bs1','bs2','sjw','compareBs1','compareBs2'].includes(key))sanitized[key]=typeof value==='string' && key==='default'?text(value,200):number(value,-1e9,1e9);
    else if(key==='expr')sanitized[key]=text(value,300);
    else if(key==='options') {if(!Array.isArray(value)||value.length<2||value.length>8)error('Invalid options');sanitized.options=value.map(o=>{if(!PLAIN(o)||Object.keys(o).some(k=>!['label','value'].includes(k)))error('Invalid option');return {label:text(o.label,40),value:number(o.value,-1e9,1e9)};});}
    else if(key==='labels') { if(!Array.isArray(value)||value.length>10||!value.every(v=>typeof v==='string'&&v.length>0&&v.length<=24))error('Invalid chart labels'); sanitized[key]=[...value]; }
    else if(['data'].includes(key)) {
      if(!Array.isArray(value)||value.length>160)error('Too many chart points');
      sanitized[key]=value.map(x=>typeof x==='string'?path(x):number(x,-1e9,1e9));
    }
  }
  if(['Slider','NumberInput','Toggle','SegmentedControl'].includes(type)) {
    if(!sanitized.bind)error('Slider requires a state binding');
    if(type==='Toggle'&&(sanitized.min!==0||sanitized.max!==1||sanitized.step!==1))error('Toggle requires 0/1 bounds');
    if(type==='SegmentedControl'){if(!sanitized.options||new Set(sanitized.options.map(o=>o.value)).size!==sanitized.options.length||!sanitized.options.some(o=>o.value===sanitized.default))error('Invalid segmented default/options');for(const o of sanitized.options)assertSliderValue({min:sanitized.min??0,max:sanitized.max??100,step:sanitized.step??1},o.value);}
    const min=sanitized.min??0,max=sanitized.max??100,step=sanitized.step??1;
    if(!(min<max))error('Slider min must be less than max');
    if(!(step>0&&step<=max-min))error('Slider step must be positive and within range');
    if((max-min)/step>1e7)error('Slider resolution is excessive');
    if(sanitized.default!==undefined){
      if(!finite(sanitized.default))error('Slider default must be numeric');
      assertSliderValue({min,max,step},sanitized.default,'Slider default');
    }
  }
  if(type==='Progress'){
    const min=sanitized.min??0,max=sanitized.max??100;
    if(!(min<max))error('Progress min must be less than max');
    if(sanitized.value===undefined&&!sanitized.bind&&!sanitized.expr)error('Progress requires value, bind or expr');
  }
  if(type==='Button') {
    if(!sanitized.action)error('Button requires action');
    if(sanitized.action==='set' && (!sanitized.target||sanitized.setValue===undefined))error('Set button requires target and value');
    if(sanitized.action==='reset'&&!sanitized.target)error('Reset button requires target');
  }
  if(type==='FunctionPlot'){
    if((sanitized.xMin??-4)>=(sanitized.xMax??4)||(sanitized.yMin??-12)>=(sanitized.yMax??12))error('FunctionPlot bounds must be increasing');
    if(typeof sanitized.sampleX==='number'&&(sanitized.sampleX<(sanitized.xMin??-4)||sanitized.sampleX>(sanitized.xMax??4)))error('FunctionPlot sample outside x bounds');
  }
  if(type==='InteractiveLab' && !['bitwise','timer','ohm','fraction','probability','vector'].includes(sanitized.kind))error('Unknown semantic lab kind');
  if(type==='BarChart' && (!Array.isArray(sanitized.data)||sanitized.data.length<2||sanitized.data.length>10||!Array.isArray(sanitized.labels)||sanitized.labels.length!==sanitized.data.length))error('BarChart needs 2–10 labeled values');
  const parent=event.parent===undefined?'root':id(event.parent);
  const order=event.order===undefined?0:number(event.order,-10000,10000);
  return {v:1,op:'node.put',id:id(event.id),type,props:sanitized,parent,order};
}
/** Sliders are declarative constraints, not merely visual hints.
 * Reject incompatible programmatic/model writes instead of silently clamping.
 */
function assertSliderValue({min,max,step,options},value,label='Slider value'){
  if(options&&!options.includes(value))error(label+' is not a declared option');
  if(!finite(value)||value<min-1e-9||value>max+1e-9)error(label+' outside slider bounds');
  const steps=(value-min)/step;
  const nearest=min+Math.round(steps)*step;
  const epsilon=Math.max(32*Number.EPSILON*Math.max(1,Math.abs(min),Math.abs(value)),1e-10*step);
  if(Math.abs(value-nearest)>Math.min(epsilon,step*1e-4))error(label+' does not match slider step');
  return value;
}
function sliderConstraints(nodes){
  const constraints=new Map();
  for(const node of nodes.values()){
    if(!['Slider','NumberInput','Toggle','SegmentedControl'].includes(node.type))continue;
    const p=node.props;const item={min:p.min??0,max:p.max??100,step:p.step??1,...(node.type==='SegmentedControl'?{options:p.options.map(o=>o.value)}:{})};
    if(constraints.has(p.bind)){
      const earlier=constraints.get(p.bind);
      if(earlier.min!==item.min||earlier.max!==item.max||earlier.step!==item.step||JSON.stringify(earlier.options)!==JSON.stringify(item.options))error('Conflicting slider constraints: '+p.bind);
    }
    constraints.set(p.bind,item);
  }
  return constraints;
}
const MATH_FNS=Object.freeze({sin:Math.sin,cos:Math.cos,tan:Math.tan,sqrt:Math.sqrt,abs:Math.abs,log:Math.log,log10:Math.log10,exp:Math.exp,floor:Math.floor,ceil:Math.ceil,round:Math.round,min:Math.min,max:Math.max,clamp:(x,a,b)=>Math.min(Math.max(x,a),b),step:(edge,x)=>x<edge?0:1,atan2:Math.atan2,asin:Math.asin,acos:Math.acos,hypot:Math.hypot});
const MATH_CONST=Object.freeze({PI:Math.PI,E:Math.E});
const EXPRESSION_CACHE=new Map();
function evaluate(expr,data={}){
  if(typeof expr!=='string'||expr.length>300)error('Expression too long');
  let ast=EXPRESSION_CACHE.get(expr);
  if(!ast){
  const tokens=[];
  const scanner=/\s*([A-Za-z_][A-Za-z_0-9]*|(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|\*\*|<=|>=|==|!=|[()+\-*\/%?,:<>])\s*/gy;
  let pos=0;while(pos<expr.length){scanner.lastIndex=pos;const match=scanner.exec(expr);if(!match)error('Expression token refused at '+pos);tokens.push(match[1]);pos=scanner.lastIndex;if(tokens.length>120)error('Too many expression tokens');}
  let i=0;const precedences={'==':5,'!=':5,'<':5,'>':5,'<=':5,'>=':5,'+':10,'-':10,'*':20,'/':20,'%':20,'**':40};
  const primary=()=>{
    const t=tokens[i++];if(t===undefined)error('Missing value');
    if(t==='('){const result=parse(0);if(tokens[i++]!==')')error('Unclosed parenthesis');return result;}
    if(t==='+'||t==='-')return {op:'unary',sign:t,value:parse(35)};
    if(/^(?:\d|\.)/.test(t))return {op:'number',value:Number(t)};
    if(/^[A-Za-z_]/.test(t)){
      if(tokens[i]==='('){i++;const args=[];if(tokens[i]!==')'){do{if(args.length>=8)error('Too many call arguments');args.push(parse(0));if(tokens[i]!==',')break;i++;}while(true);}if(tokens[i++]!==')')error('Function arguments not closed');if(t!=='if'&&!Object.hasOwn(MATH_FNS,t))error('Unknown function: '+t);return {op:'call',name:t,args};}
      return {op:'variable',name:t};
    }
    error('Invalid expression value');
  };
  const parse=(min=0)=>{
    let left=primary();
    while(i<tokens.length){const operator=tokens[i],precedence=precedences[operator];if(precedence===undefined||precedence<min)break;i++;const right=parse(precedence+(operator==='**'?0:1));left={op:'binary',operator,left,right};}
    if(min===0&&tokens[i]==='?'){i++;const yes=parse(0);if(tokens[i++]!==':')error('Conditional needs colon');const no=parse(0);left={op:'condition',check:left,yes,no};}
    return left;
  };
  ast=parse(0);if(i!==tokens.length)error('Unparsed expression');
  EXPRESSION_CACHE.set(expr,ast);if(EXPRESSION_CACHE.size>128)EXPRESSION_CACHE.delete(EXPRESSION_CACHE.keys().next().value);
  }
  let budget=0;
  const calculate=node=>{
    if(++budget>250)error('Expression complexity exceeded');
    let result;
    if(node.op==='number')result=node.value;
    else if(node.op==='variable'){
      if(Object.hasOwn(MATH_CONST,node.name))result=MATH_CONST[node.name];
      else {if(!Object.hasOwn(data,node.name)||!finite(data[node.name]))error('Unbound variable: '+node.name);result=data[node.name];}
    }else if(node.op==='unary')result=(node.sign==='-'?-1:1)*calculate(node.value);
    else if(node.op==='condition')result=calculate(node.check)!==0?calculate(node.yes):calculate(node.no);
    else if(node.op==='call'){
      if(node.name==='if'){
        if(node.args.length!==3)error('if requires three arguments');
        result=calculate(node.args[0])!==0?calculate(node.args[1]):calculate(node.args[2]);
      }else{
        const args=node.args.map(calculate);
        const argc={clamp:3,step:2,atan2:2,asin:1,acos:1,hypot:2,sin:1,cos:1,tan:1,sqrt:1,abs:1,log:1,log10:1,exp:1,floor:1,ceil:1,round:1};
        if(argc[node.name]!==undefined&&args.length!==argc[node.name]||(['min','max'].includes(node.name)&&args.length<1))error('Invalid argument count');
        result=MATH_FNS[node.name](...args);
      }
    }else if(node.op==='binary'){
      const a=calculate(node.left),b=calculate(node.right);
      if(['/','%'].includes(node.operator)&&b===0)error('Division by zero');
      switch(node.operator){case '+':result=a+b;break;case '-':result=a-b;break;case '*':result=a*b;break;case '/':result=a/b;break;case '%':result=a%b;break;case '**':result=a**b;break;case '<':result=Number(a<b);break;case '>':result=Number(a>b);break;case '<=':result=Number(a<=b);break;case '>=':result=Number(a>=b);break;case '==':result=Number(a===b);break;case '!=':result=Number(a!==b);break;default:error('Unsupported operator');}
    }
    if(!finite(result)||Math.abs(result)>1e12)error('Numeric overflow');
    return result;
  };
  return calculate(ast);
}
function variables(state) { const vars=Object.create(null);for(const [k,v] of Object.entries(state)) {const key=k.split('/').at(-1);if(typeof v==='number'&&/^[A-Za-z_]\w*$/.test(key))vars[key]=v;}return vars; }
function derivedValue(expr, state){return evaluate(expr,variables(state));}
/** A finite-value-only result channel. Invalid runtime numbers never enter
 * scene.state, derived values, checkpoint JSON, or SVG attributes. */
function computeDerived(scene){
  const values={...scene.state};
  const failures=new Map();
  const maxPasses=Object.keys(scene.formulas).length+1;
  for(let pass=0;pass<maxPasses;pass++){
    let changed=false;
    for(const [key,expr] of Object.entries(scene.formulas)){
      try{
        const result=derivedValue(expr,values);
        if(values[key]!==result){values[key]=result;changed=true;}
        failures.delete(key);
      }catch(cause){failures.set(key,String(cause.message||cause));}
    }
    if(!changed)break;
  }
  return {values,failures};
}
/** Validate dependencies structurally, independently of runtime numeric values.
 * Pending input values while streaming are different from missing inputs once
 * surface.end has arrived. */
function validateFormulas(scene){
  const errors=[], aliases=new Map(), keys=[...Object.keys(scene.state),...Object.keys(scene.formulas)];
  for(const key of keys){
    const alias=key.slice(key.lastIndexOf('/')+1);
    if(aliases.has(alias)&&aliases.get(alias)!==key)errors.push('Ambiguous expression variable: '+alias);
    else aliases.set(alias,key);
  }
  const formulaAliases=new Map(Object.keys(scene.formulas).map(key=>[key.slice(key.lastIndexOf('/')+1),key]));
  const references=new Map();
  for(const [key,expr] of Object.entries(scene.formulas)){
    if(Object.hasOwn(scene.state,key))errors.push('Derived state conflicts with input: '+key);
    // Evaluate once with dummy finite placeholders to check syntax independent
    // of runtime division by zero. Numeric domain errors are nonfatal here.
    const names=[...new Set(expr.match(/\b[A-Za-z_][A-Za-z_0-9]*\b/g)??[])].filter(x=>!/^e\d+$/i.test(x)&&!Object.hasOwn(MATH_FNS,x)&&!Object.hasOwn(MATH_CONST,x)&&x!=='if');
    for(const name of names)if(!aliases.has(name))errors.push('Unknown expression input: '+key+' -> '+name);
    references.set(key,names.filter(name=>formulaAliases.has(name)).map(name=>formulaAliases.get(name)));
    // Check lexical/syntax errors even when the real inputs are not yet usable.
    try{evaluate(expr,Object.fromEntries(names.map(name=>[name,1])));}catch(e){
      if(!/Unsafe numeric result|Division by zero|Numeric overflow/.test(String(e.message)))errors.push('Invalid expression '+key+': '+e.message);
    }
  }
  const seen=new Set(), active=new Set();
  const visit=key=>{
    if(active.has(key)){errors.push('Cyclic formula: '+key);return;}
    if(seen.has(key))return;
    active.add(key);for(const dependency of references.get(key)??[])visit(dependency);
    active.delete(key);seen.add(key);
  };
  for(const key of references.keys())visit(key);
  return errors;
}
class VIEStream {
  constructor(){this.buffer='';this.source='';this.events=0;this.lineNumber=0;this.errors=[];this.modified=new Set();this.defaults=Object.create(null);this.scene={id:null,nodes:new Map(),state:Object.create(null),formulas:Object.create(null),complete:false};this.begun=false;this.ended=false;this.finished=false;this.failed=false;this.total=0;}
  push(part){
    if(typeof part!=='string')error('Chunk must be text');
    if(this.finished){this.errors.push('Stream already finalized');this.failed=true;return 0;}
    this.total+=new TextEncoder().encode(part).length;
    if(this.total>LIMITS.bytes){this.errors.push('Source size limit exceeded');this.failed=true;return 0;}
    this.buffer+=part; let n=0, at;
    while((at=this.buffer.indexOf('\n'))!==-1) {
      const line=this.buffer.slice(0,at).trim();this.buffer=this.buffer.slice(at+1);
      this.lineNumber++;
      if(line){this.consume(line,this.lineNumber);n++;}
    }
    if(new TextEncoder().encode(this.buffer).length>LIMITS.line){this.errors.push('Incomplete line too long');this.failed=true;this.buffer='';}
    return n;
  }
  finish(){
    if(this.finished)return this.snapshot();
    if(this.buffer.trim()){this.consume(this.buffer.trim(),this.lineNumber+1);this.buffer='';}
    this.finished=true;
    if(!this.begun){this.errors.push('Missing surface.begin');this.failed=true;}
    if(!this.ended){this.errors.push('Missing surface.end');this.failed=true;}
    const {errors}=this.tree();
    if(errors.length){this.errors.push(...errors);this.failed=true;}
    if(this.errors.length)this.failed=true;
    this.scene.complete=this.ended&&!this.failed;
    return this.snapshot();
  }
  consume(line,sourceLine=this.lineNumber+1){
    this.events++;if(this.events>LIMITS.events){if(this.events===LIMITS.events+1)this.errors.push('Event limit exceeded');this.failed=true;return;}
    if(new TextEncoder().encode(line).length>LIMITS.line){this.errors.push('Line too large');this.failed=true;return;}
    try{const e=validateEvent(JSON.parse(line));this.apply(e);}catch(ex){this.failed=true;this.errors.push(`Line ${sourceLine} (event ${this.events}): ${String(ex.message||ex)}`);}
  }
  apply(e){
    const s=this.scene;
    if(e.op==='surface.begin'){
      if(this.begun||this.ended)error('Duplicate surface.begin');
      this.begun=true;s.id=e.id;return;
    }
    if(!this.begun)error('Event before surface.begin');
    if(this.ended)error('Event after surface.end');
    if(e.op==='surface.end'){
      if(e.id!==s.id)error(`Mismatched surface.end: ${e.id} != ${s.id}`);
      this.ended=true;
      const check=this.tree();
      if(check.errors.length)error(check.errors.join('; '));
      if(!s.nodes.size)error('Empty surface');
      if(this.errors.length||this.failed)error('Surface contains rejected events');
      s.complete=true;return;
    }
    else if(e.op==='node.put'){
      if(e.type==='CanTimingLab')normalizeCanPreset(e.props);
      if(!s.nodes.has(e.id)&&s.nodes.size>=LIMITS.nodes)error('Too many nodes');
      if(e.parent===e.id)error('Node cannot parent itself');
      if(e.props.bind && e.props.default!==undefined){
        if(Object.hasOwn(this.defaults,e.props.bind)&&this.defaults[e.props.bind]!==e.props.default)error('Conflicting slider default: '+e.props.bind);
        if(!Object.hasOwn(this.defaults,e.props.bind))this.defaults[e.props.bind]=e.props.default;
        if(!Object.hasOwn(s.state,e.props.bind))s.state[e.props.bind]=e.props.default;
      }
      s.nodes.set(e.id,e);
    }
    else if(e.op==='node.remove'){s.nodes.delete(e.id);}
    else if(e.op==='state.init'){
      if(Object.hasOwn(this.defaults,e.path)&&this.defaults[e.path]!==e.value)error('Conflicting state defaults: '+e.path);
      if(!Object.hasOwn(this.defaults,e.path))this.defaults[e.path]=e.value;
      if(!Object.hasOwn(s.state,e.path))s.state[e.path]=e.value;
    }
    else if(e.op==='state.derive'){s.formulas[e.path]=e.expr;}
  }
  set(pathKey,value){
    path(pathKey);val(value);
    if(!Object.hasOwn(this.scene.state,pathKey))error('Unknown state path');
    const constraint=sliderConstraints(this.scene.nodes).get(pathKey);
    if(constraint)assertSliderValue(constraint,value,'State '+pathKey);
    const previous=this.scene.state[pathKey];
    if(typeof previous!==typeof value)error('State type mismatch: '+pathKey);
    this.scene.state[pathKey]=value;this.modified.add(pathKey);
  }
  reset(pathKey){path(pathKey);if(!Object.hasOwn(this.defaults,pathKey))error('Unknown default');this.scene.state[pathKey]=this.defaults[pathKey];this.modified.delete(pathKey);}
  tree(){
    const nodes=this.scene.nodes;
    const memo=new Set();const errors=[];
    const derived=computeDerived(this.scene).values;
    const build=(parent,depth,seen)=>{
      if(depth>LIMITS.depth){errors.push('Depth limit exceeded');return [];}
      const list=[...nodes.values()].filter(n=>n.parent===parent).sort((a,b)=>a.order-b.order);
      return list.flatMap(n=>{
        if(seen.has(n.id)){errors.push('Cycle at '+n.id);return [];}
        if(memo.has(n.id)){errors.push('Duplicate node '+n.id);return [];}
        if(n.props.bind && !Object.hasOwn(derived,n.props.bind) && !Object.hasOwn(this.scene.formulas,n.props.bind)){
          if(this.ended)errors.push('Missing binding: node '+n.id+' -> '+n.props.bind);
          return [];
        }
        memo.add(n.id);return [{...n,children:build(n.id,depth+1,new Set([...seen,n.id]))}];
      });
    };
    const tree=build('root',0,new Set());
    if(this.ended && memo.size<nodes.size){
      const missing=[...nodes.keys()].filter(k=>!memo.has(k));
      errors.push('Unresolved/cyclic nodes: '+missing.slice(0,8).join(', '));
    }
    // State may arrive before or after its component, so check once the
    // entire surface exists as well as on every user update.
    if(this.ended){
      try {
        for(const [statePath,constraint] of sliderConstraints(nodes)){
          if(Object.hasOwn(this.scene.state,statePath))assertSliderValue(constraint,this.scene.state[statePath],'State '+statePath);
        }
      } catch(ex) {errors.push(String(ex.message||ex));}
    }
    if(this.ended){
      const available=new Set([...Object.keys(this.scene.state),...Object.keys(this.scene.formulas)]);
      const verify=(ref,where)=>{if(!available.has(ref))errors.push('Missing visual/text binding: '+where+' -> '+ref);};
      for(const node of nodes.values()){
        for(const field of ['title','body','caption'])if(typeof node.props[field]==='string'){
          try{for(const ref of templatePaths(node.props[field]))verify(ref,node.id+'.'+field);}catch(ex){errors.push('Invalid text template '+node.id+': '+ex.message);}
        }
        if(['Flow','RelationGraph','Timeline'].includes(node.type)){
          for(const item of [...(node.props.nodes??[]),...(node.props.items??[]),...(node.props.edges??[])])
            for(const field of ['label','detail','at'])if(typeof item[field]==='string')
              for(const ref of templatePaths(item[field]))verify(ref,node.id+'.'+field);
        }
        if(node.type==='Diagram'||node.type==='Animation')for(const shape of node.props.shapes){
          for(const [k,v] of Object.entries(shape)){
            if(v&&typeof v==='object'&&!Array.isArray(v)&&Object.hasOwn(v,'$bind'))verify(v.$bind,node.id+'.'+(shape.id??shape.k)+'.'+k);
            if(k==='t'&&typeof v==='string')for(const ref of templatePaths(v))verify(ref,node.id+'.text');
          }
        }
        if(node.type==='GenerativeFigure')for(const ref of Object.values(node.props.bindings??{}))verify(ref,node.id+'.bindings');
        if(node.type==='Chart')for(const p of [...node.props.controls.filter(c=>c.bind),...(node.props.inputs??[])])verify(p.bind,node.id+'.chart');
        if(node.type==='BarChart')for(const ref of node.props.data.filter(v=>typeof v==='string'))verify(ref,node.id+'.data');
        if(node.type==='Chart')for(const c of node.props.controls.filter(c=>c.bind)){verify(c.bind,node.id+'.controls');const v=this.scene.state[c.bind];if(typeof v!=='number'||v<c.min||v>c.max)errors.push('Invalid shared chart state: '+c.bind);}
        if(node.type==='FunctionPlot'&&typeof node.props.sampleX==='string')verify(node.props.sampleX,node.id+'.sampleX');
      }
    }
    if(this.ended)errors.push(...validateFormulas(this.scene));
    return {tree,errors};
  }
  interactionContext(){
    const updated=Object.create(null);
    for(const key of [...this.modified].sort().slice(0,24)){
      if(Object.hasOwn(this.scene.state,key))updated[key]=this.scene.state[key];
    }
    const derived=Object.create(null),values=computeDerived(this.scene).values;
    for(const key of Object.keys(this.scene.formulas).slice(0,24)){
      if(Object.hasOwn(values,key))derived[key]=values[key];
    }
    return {sceneId:this.scene.id,updated,derived};
  }
  snapshot(){
    const {tree,errors}=this.tree(),result=computeDerived(this.scene);
    const diagnostics=[...result.failures].map(([path,message])=>({path,code:message.includes('Division by zero')?'DIV_ZERO':message.includes('overflow')?'OVERFLOW':'EVAL_UNAVAILABLE',message}));
    const allErrors=[...new Set([...this.errors,...errors])];
    return {id:this.scene.id,complete:this.scene.complete&&!this.failed&&allErrors.length===0,tree,state:{...this.scene.state},values:result.values,formulas:{...this.scene.formulas},errors:allErrors,diagnostics,events:this.events};
  }
}
function parseSource(s){const p=new VIEStream();p.push(s);p.finish();return p;}
/** Decode an incrementally streamed JSON string argument without executing it. */
function partialString(raw, key='source'){
  if(typeof raw!=='string'||raw.length>LIMITS.bytes*3)return '';
  const re=new RegExp('"'+key+'"\\s*:\\s*"','u');const hit=re.exec(raw);if(!hit)return '';
  let pos=hit.index+hit[0].length,out='';
  for(;pos<raw.length&&out.length<LIMITS.bytes;pos++){
    const c=raw[pos];if(c==='"')return out;if(c!=='\\'){out+=c;continue;}
    if(pos+1>=raw.length)break;
    const n=raw[++pos];const table={n:'\n',t:'\t',r:'\r',b:'\b',f:'\f','"':'"','\\':'\\','/':'/'};
    if(n==='u'){
      if(pos+4>=raw.length)break;
      const hex=raw.slice(pos+1,pos+5);if(!/^[0-9a-fA-F]{4}$/.test(hex))break;
      out+=String.fromCharCode(parseInt(hex,16));pos+=4;
    } else if(Object.hasOwn(table,n))out+=table[n]; else break;
  }
  return out;
}
const DEMO_SOURCE = [
  {v:1,op:'surface.begin',id:'motion-lab'},
  {v:1,op:'node.put',id:'hero',type:'Text',props:{title:'匀速运动',body:'调整速度与时间，观察位移 s = vt。'}},
  {v:1,op:'node.put',id:'motion',type:'MotionScene',order:1,props:{title:'运动距离',bind:'/distance',min:0,max:400,unit:'m'}},
  {v:1,op:'node.put',id:'controls',type:'Column',order:2,props:{}},
  {v:1,op:'node.put',id:'sliders',type:'Row',parent:'controls',props:{}},
  {v:1,op:'node.put',id:'speed',parent:'sliders',order:1,type:'Slider',props:{label:'速度 v',unit:'m/s',bind:'/speed',default:20,min:0,max:40,step:1}},
  {v:1,op:'node.put',id:'time',parent:'sliders',order:2,type:'Slider',props:{label:'时间 t',unit:'s',bind:'/time',default:5,min:0,max:10,step:1}},
  {v:1,op:'state.derive',path:'/distance',expr:'speed * time'},
  {v:1,op:'node.put',id:'summary',type:'Column',order:3,props:{}},
  {v:1,op:'node.put',id:'distance',parent:'summary',type:'Metric',order:1,props:{label:'位移 s = v × t',bind:'/distance',unit:'m'}},
  {v:1,op:'node.put',id:'outro',order:4,type:'Text',props:{body:'速度不变时，时间加倍，位移也加倍。'}},
  {v:1,op:'surface.end',id:'motion-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');

const FUNCTION_DEMO_SOURCE = [
  {v:1,op:'surface.begin',id:'function-lab'},
  {v:1,op:'node.put',id:'hero',type:'Text',props:{title:'二次函数 y = ax²',body:'调节 a，观察抛物线在坐标系中的变化。'}},
  {v:1,op:'node.put',id:'curve',type:'FunctionPlot',order:1,props:{title:'实时函数图像  ·  y = a × x²',expr:'a * x ** 2'}},
  {v:1,op:'node.put',id:'panel',type:'Column',order:2,props:{}},
  {v:1,op:'node.put',id:'a',type:'Slider',parent:'panel',props:{label:'二次项系数 a',bind:'/a',default:1,min:-3,max:3,step:0.1}},
  {v:1,op:'node.put',id:'outro',type:'Text',order:3,props:{body:'x 轴和 y 轴的每格都有真实数值。a = 0 时退化为直线 y = 0。'}},
  {v:1,op:'surface.end',id:'function-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');

const DATA_DEMO_SOURCE = [
  {v:1,op:'surface.begin',id:'data-lab'},
  {v:1,op:'node.put',id:'hero',type:'Text',props:{title:'数据对比',body:'以下为教学示例数据，点击柱子查看对应数值。'}},
  {v:1,op:'node.put',id:'data',type:'BarChart',order:1,props:{title:'每日处理量（示例）',data:[18,29,23,41,35,48],labels:['周一','周二','周三','周四','周五','周六'],unit:'份',sourceLabel:'教学示例数据，不代表真实测量'}},
  {v:1,op:'surface.end',id:'data-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');

/** Pure, deterministic SVG drawing for browser playground and DSH React host.
 * All label strings are escaped; numeric coordinates derive only from validated finite values.
 * No model-supplied code or HTML is executed. */
const CHART_ESC = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CNUM = n => Number.isInteger(n)?String(n):Number(n).toFixed(1);
const DEFAULT_CATEGORIES=['周一','周二','周三','周四','周五','周六'];
const DEFAULT_VALUES=[18,29,23,41,35,48];
function normalizeDataset({labels=DEFAULT_CATEGORIES,data=DEFAULT_VALUES,unit='份',title='每日处理量（示例）',sourceLabel='演示数据，不代表真实统计'}={}){
 if(!Array.isArray(data)||data.length<2||data.length>10||!data.every(x=>typeof x==='number'&&Number.isFinite(x)&&Math.abs(x)<=1000000000))throw Error('数据需要 2–10 个有限数值');
 if(!Array.isArray(labels)||labels.length!==data.length||!labels.every(x=>typeof x==='string'&&x.length>0&&x.length<=24))throw Error('类别名称与数值必须一一对应');
 if(typeof unit!=='string'||unit.length>15||typeof title!=='string'||title.length>70||typeof sourceLabel!=='string'||sourceLabel.length>100)throw Error('无效的数据说明');
 return {labels:[...labels],data:[...data],unit,title,sourceLabel};
}
function functionPlotSVG(expr='a * x ** 2',vars={},evaluate,options={}){
 const W=520,H=238,L=45,R=494,T=17,B=208;
 const xMin=options.xMin??-4,xMax=options.xMax??4,yMin=options.yMin??-12,yMax=options.yMax??12;
 if(![xMin,xMax,yMin,yMax].every(Number.isFinite)||!(xMin<xMax&&yMin<yMax)||xMin< -1000||xMax>1000||yMin< -1000||yMax>1000)throw Error('Invalid plot bounds');
 const X=x=>L+(x-xMin)/(xMax-xMin)*(R-L),Y=y=>T+(yMax-y)/(yMax-yMin)*(B-T);
 const grid=[];
 for(let i=0;i<=8;i++){
  const x=xMin+(xMax-xMin)*i/8,sx=X(x);
  grid.push(`<line x1="${sx.toFixed(2)}" y1="${T}" x2="${sx.toFixed(2)}" y2="${B}" class="vie-grid-line"/>`);
  if(i%2===0&&Math.abs(x)>1e-9)grid.push(`<text x="${sx.toFixed(2)}" y="${B+17}" text-anchor="middle">${CNUM(x)}</text>`);
 }
 for(let i=0;i<=4;i++){
  const y=yMin+(yMax-yMin)*i/4,sy=Y(y);
  grid.push(`<line x1="${L}" y1="${sy.toFixed(2)}" x2="${R}" y2="${sy.toFixed(2)}" class="vie-grid-line"/>`);
  if(Math.abs(y)>1e-9)grid.push(`<text x="${L-9}" y="${(sy+4).toFixed(2)}" text-anchor="end">${CNUM(y)}</text>`);
 }
 const points=[];let lastValid=false;
 for(let i=0;i<=240;i++){
  const x=xMin+i*(xMax-xMin)/240;let y;
  try{y=evaluate(expr,{...vars,x});}catch{lastValid=false;continue;}
  if(!Number.isFinite(y)){lastValid=false;continue;}
  points.push((lastValid?'L':'M')+X(x).toFixed(2)+' '+Y(y).toFixed(2));lastValid=true;
 }
 let info='拖动参数，观察曲线变化';
 if(/\ba\s*\*\s*x\s*\*\*\s*2\b/.test(expr)&&typeof vars.a==='number'){
  const a=vars.a;info=a===0?'a = 0：退化为 y = 0，不再是二次函数':`a = ${CNUM(a)}：开口向${a>0?'上':'下'}，|a| 越大越窄`;
 }
 let point='';
 const sampleX=options.sampleX;
 if(Number.isFinite(sampleX)&&sampleX>=xMin&&sampleX<=xMax){
  try{
   const sampleY=evaluate(expr,{...vars,x:sampleX});
   if(Number.isFinite(sampleY)&&sampleY>=yMin&&sampleY<=yMax){
    point=`<circle data-vie-sample-point="true" cx="${X(sampleX).toFixed(2)}" cy="${Y(sampleY).toFixed(2)}" r="5.3" fill="#e8a34c" stroke="white" stroke-width="1.5"/>`;
    info+=` · 采样点 (${CNUM(sampleX)}, ${CNUM(sampleY)})`;
   }
  }catch{/* runtime invalid sample point is simply omitted */}
 }
 const Xzero=X(Math.max(xMin,Math.min(xMax,0))),Yzero=Y(Math.max(yMin,Math.min(yMax,0)));
 const svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="带坐标轴、数值刻度与原点的函数图像" data-vie-chart="function"><defs><clipPath id="vie-function-clip"><rect x="${L}" y="${T}" width="${R-L}" height="${B-T}"/></clipPath></defs>
 ${grid.join('')}<path d="M${L} ${Yzero}H${R+6}m-7-4l7 4-7 4 M${Xzero} ${B+2}V${T-6}m-4 7l4-7 4 7" fill="none" stroke="currentColor" stroke-opacity=".58" stroke-width="1.3"/>
 <text x="${R+9}" y="${Yzero-8}" class="vie-axis-name">x</text><text x="${Xzero+9}" y="${T+1}" class="vie-axis-name">y</text>
 <g clip-path="url(#vie-function-clip)"><path d="${points.join(' ')}" fill="none" stroke="var(--vie-color,#4088d0)" stroke-width="2.7" stroke-linejoin="round" stroke-linecap="round"/>${point}</g></svg>`;
 return {svg,info};
}
function niceStep(v){const exp=Math.floor(Math.log10(Math.max(1e-10,v))),scale=10**exp;const n=v/scale;return (n<=1?1:n<=2?2:n<=5?5:10)*scale;}
function barChartSVG(props={},activeIndex=0){
 const {labels,data,unit,title,sourceLabel}=normalizeDataset(props);
 const unavailable=new Set(props.unavailableIndices??[]);
 const W=520,H=235,L=48,R=501,T=20,B=198,lo=Math.min(0,...data),hi=Math.max(0,...data),span=hi-lo||1;
 const step=niceStep(span/4),min=Math.floor(lo/step)*step,max=Math.ceil(hi/step)*step||(step),Y=y=>T+(max-y)/(max-min)*(B-T);
 const bw=(R-L)/data.length;
 const active=Math.max(0,Math.min(data.length-1,activeIndex));
 const lines=[];
 for(let tick=min;tick<=max+step/100;tick+=step){
  const sy=Y(tick);lines.push(`<line x1="${L}" y1="${sy.toFixed(2)}" x2="${R}" y2="${sy.toFixed(2)}" class="vie-grid-line"/><text x="${L-9}" y="${(sy+4).toFixed(2)}" text-anchor="end">${CHART_ESC(CNUM(tick))}</text>`);
 }
 lines.push(`<path d="M${L} ${T}V${B}H${R}" class="vie-data-axis" fill="none"/>`);
 const bars=[];
 for(let i=0;i<data.length;i++){
  const x=L+i*bw+bw*.18,w=bw*.64,v=data[i],y=Math.min(Y(0),Y(v)),h=Math.max(2,Math.abs(Y(0)-Y(v)));
  bars.push(`<g data-bar-index="${i}" role="button" tabindex="0" aria-label="${CHART_ESC(labels[i])}：${unavailable.has(i)?'等待有效数据':CHART_ESC(CNUM(v))+CHART_ESC(unit)}" aria-pressed="${i===active}" class="vie-bar-item">
   <rect x="${(L+i*bw).toFixed(2)}" y="${T}" width="${bw.toFixed(2)}" height="${B-T+12}" fill="transparent"/>
   ${unavailable.has(i)?'':`<rect class="vie-data-bar${i===active?' is-active':''}" x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" rx="4"/>`}
   <text x="${(x+w/2).toFixed(2)}" y="${Math.max(11,y-7).toFixed(2)}" text-anchor="middle" class="vie-bar-value">${unavailable.has(i)?'—':CHART_ESC(CNUM(v))}</text>
   <text x="${(x+w/2).toFixed(2)}" y="${B+19}" text-anchor="middle">${CHART_ESC(labels[i])}</text>
  </g>`);
 }
 const valid=data.filter((_,i)=>!unavailable.has(i));
 const avg=valid.length?valid.reduce((s,n)=>s+n,0)/valid.length:0;
 const delta=data[active]-avg;
 return {svg:`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="带类别、数值和纵轴刻度的数据柱状图；缺失值以横线表示" data-vie-chart="bars">${lines.join('')}${bars.join('')}</svg>`,selected:unavailable.has(active)?`${labels[active]}：等待有效数据`:props.showAverage===false?`${labels[active]}：${CNUM(data[active])}${unit}`:`${labels[active]}：${CNUM(data[active])}${unit}（${delta>=0?'高于':'低于'}平均值 ${CNUM(Math.abs(delta))}${unit}）`,average:avg,sourceLabel,labels,data,unit,title};
}

/** VIE bxCAN nominal bit timing calculator (STM32F4 bxCAN profile).
 * fCAN = APB1 peripheral clock (not generic CPU system clock).
 * CAN_BTR fields encode hardware value minus one; public values are actual TQ/BRP.
 * Sampling guideline is illustrative, not an electrical conformance verdict.
 */
const integer=(v,lo,hi,label)=>{if(!Number.isInteger(v)||v<lo||v>hi)throw Error(`${label} 应为 ${lo}～${hi} 的整数`);return v;};
const CAN_PROFILE=Object.freeze({name:'STM32F4 bxCAN（经典 CAN）',bs1:[1,16],bs2:[1,8],sjw:[1,4],brp:[1,1024]});
function calculateCanTiming({clockMHz=36,prescaler=4,bs1=14,bs2=3,sjw=1}={}){
 if(typeof clockMHz!=='number'||!Number.isFinite(clockMHz)||clockMHz<1||clockMHz>100)throw Error('CAN 外设时钟应在 1～100 MHz 的教学范围内');
 integer(prescaler,1,1024,'BRP');integer(bs1,1,16,'BS1');integer(bs2,1,8,'BS2');integer(sjw,1,4,'SJW');
 if(sjw>bs2)throw Error('SJW 不能大于 BS2');
 const totalTq=1+bs1+bs2;
 const bitrate=clockMHz*1e6/(prescaler*totalTq);
 const samplePoint=(1+bs1)/totalTq*100;
 return Object.freeze({clockMHz,prescaler,bs1,bs2,sjw,totalTq,bitrate,samplePoint,tqNs:prescaler/clockMHz*1000,bitTimeUs:prescaler*totalTq/clockMHz});
}
function normalizeCanPreset(args={}){
 const allowed=['clockMHz','prescaler','sjw','bs1','bs2','compareBs1','compareBs2'];
 if(args===null||typeof args!=='object'||Array.isArray(args)||Object.keys(args).some(k=>!allowed.includes(k)))throw Error('不支持的 CAN 预置参数');
 const p={clockMHz:36,prescaler:4,sjw:1,bs1:14,bs2:3,compareBs1:15,compareBs2:2,...args};
 calculateCanTiming(p);
 calculateCanTiming({...p,bs1:p.compareBs1,bs2:p.compareBs2});
 return p;
}
function compareCanSchemes(config){
 const p=normalizeCanPreset(config);
 return Object.freeze({A:calculateCanTiming(p),B:calculateCanTiming({...p,bs1:p.compareBs1,bs2:p.compareBs2})});
}

/** Six small, framework-rendered knowledge labs. All behavior is trusted code, not model-written JS. */
const SEMANTIC_LABS = Object.freeze({
  bitwise:{label:'位运算',description:'逐位观察 AND / OR / XOR',parameters:[]},
  timer:{label:'STM32 定时器',description:'PSC、ARR 与计数频率',parameters:[]},
  ohm:{label:'欧姆定律',description:'电压、电阻、电流的关系',parameters:[]},
  fraction:{label:'分数与等值',description:'把分数切成可见的等份',parameters:[]},
  probability:{label:'基础概率',description:'从六种等可能结果中选择事件',parameters:[]},
  vector:{label:'向量分解',description:'观察向量的 x、y 分量',parameters:[]}
});
function semanticLabSource(kind){
 if(!Object.hasOwn(SEMANTIC_LABS,kind))throw Error('Unknown semantic lab');
 return [
  {v:1,op:'surface.begin',id:'lab-'+kind},
  {v:1,op:'node.put',id:'lab',type:'InteractiveLab',props:{kind}},
  {v:1,op:'surface.end',id:'lab-'+kind}
 ].map(e=>JSON.stringify(e)+'\n').join('');
}

/** Deterministic teaching scenes. The LLM selects a preset and explains the topic;
 * presentation, binding and calculations are handled by the runtime. */
const PRESET_CATALOG = Object.freeze({
  ...SEMANTIC_LABS,
  motion:{label:'匀速运动',description:'位置、速度与时间的关系',parameters:['speed','time']},
  quadratic:{label:'二次函数',description:'函数 y = ax² 的参数探索',parameters:['a']},
  data:{label:'数据对比',description:'六个数值的直观比较',parameters:['labels','values','unit','title']},
  can:{label:'CAN 位时序',description:'STM32F4 bxCAN 采样点、BS1/BS2、波特率',parameters:['clockMHz','prescaler','sjw','bs1','bs2','compareBs1','compareBs2']}
});
const CAN_SOURCE=[
{v:1,op:'surface.begin',id:'can-bit-lab'},
{v:1,op:'node.put',id:'can-timing',type:'CanTimingLab',props:normalizeCanPreset()},
{v:1,op:'surface.end',id:'can-bit-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');
const bases={...Object.fromEntries(Object.keys(SEMANTIC_LABS).map(k=>[k,semanticLabSource(k)])),motion:DEMO_SOURCE,quadratic:FUNCTION_DEMO_SOURCE,data:DATA_DEMO_SOURCE,can:CAN_SOURCE};
const ranges={speed:[0,40],time:[0,10],a:[-3,3]};
function makePresetSource(preset, parameters={}){
  if(!Object.hasOwn(bases,preset)) throw new Error('Unknown preset');
  if(parameters===null||typeof parameters!=='object'||Array.isArray(parameters))throw new Error('Invalid preset parameters');
  if(Object.keys(parameters).some(k=>!PRESET_CATALOG[preset].parameters.includes(k)))throw new Error('Unknown preset parameter');
  const updates=new Map();
  if(preset==='data') {
    const hasCustom=Object.keys(parameters).length>0;
    if(hasCustom && (!Array.isArray(parameters.labels)||!Array.isArray(parameters.values)))throw Error('Data needs both labels and values');
    const options=hasCustom?normalizeDataset({labels:parameters.labels,data:parameters.values,unit:parameters.unit??'',title:parameters.title??'用户提供的数据',sourceLabel:'用户提供的数据'}):normalizeDataset();
    const events=DATA_DEMO_SOURCE.trim().split('\n').map(line=>JSON.parse(line));
    if(hasCustom)events.find(e=>e.id==='hero').props.body='使用用户提供的数据；点击柱子或展开原始数据查看比较。';
    const bar=events.find(e=>e.type==='BarChart');bar.props={title:options.title,data:options.data,labels:options.labels,unit:options.unit,sourceLabel:options.sourceLabel};
    const result=events.map(e=>JSON.stringify(e)+'\n').join('');
    const parser=new VIEStream();parser.push(result);parser.finish();if(parser.snapshot().errors.length)throw Error('Data preset invalid');
    return result;
  }
  for(const [key,value] of Object.entries(parameters)){
    const bounds=ranges[key];
    if(preset==='can'){updates.set('/'+key,value);continue;}
    const [min,max]=bounds;
    if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max)throw new Error('Invalid preset parameter: '+key);
    if(key==='a'&&Math.abs(value*10-Math.round(value*10))>1e-7)throw new Error('Quadratic a must use increments of 0.1');
    updates.set('/'+key,value);
  }
  if(preset==='can'){
    const props=normalizeCanPreset(parameters);
    const events=CAN_SOURCE.trim().split('\n').map(x=>JSON.parse(x));
    events.find(e=>e.type==='CanTimingLab').props=props;
    const result=events.map(e=>JSON.stringify(e)+'\n').join('');
    const p=new VIEStream();p.push(result);p.finish();if(p.snapshot().errors.length)throw Error('CAN preset invalid');
    return result;
  }
  if(updates.size===0)return bases[preset];
  const events=bases[preset].trimEnd().split('\n').map(line=>JSON.parse(line));
  for(const event of events){
    if(event.op==='node.put'&&event.props?.bind&&updates.has(event.props.bind))event.props.default=updates.get(event.props.bind);
  }
  const result=events.map(e=>JSON.stringify(e)+'\n').join('');
  const p=new VIEStream();p.push(result);p.finish();
  if(p.snapshot().errors.length)throw new Error('Internal preset invalid');
  return result;
}

/** VIE template catalog and conservative, deterministic routing.
 * Subject-domain matches never infer measurements or fabricate graph contents.
 * Model may supply a specific templateId and validated data; otherwise routing
 * only happens for strong keyword evidence. A miss returns structured choices.
 */
const quick={
  motion:{zh:['匀速','位移','路程 = 速度','速度和时间'],en:['uniform motion','constant speed','displacement']},
  quadratic:{zh:['二次函数','抛物线','二次项系数'],en:['quadratic','parabola']},
  data:{zh:['数据对比','数据比较','柱状图','对比数据'],en:['bar chart','data comparison']},
  can:{zh:['CAN总线','CAN 总线','CAN位时序','CAN 位时序','采样点','BS1','BS2','波特率'],en:['bxcan','can bus','bit timing']},
  bitwise:{zh:['位运算','按位与','按位或','异或','二进制位运算'],en:['bitwise','xor','bitwise and']},
  timer:{zh:['定时器','预分频','自动重装载','PSC','ARR','定时中断'],en:['stm32 timer','prescaler']},
  ohm:{zh:['欧姆定律','电流与电阻','电压与电阻'],en:["ohm's law",'ohms law']},
  fraction:{zh:['分数','分子分母','通分','约分','等值分数'],en:['fraction','fractions']},
  probability:{zh:['概率','骰子','等可能事件','样本空间'],en:['probability','dice probability']},
  vector:{zh:['向量分解','向量','矢量','水平分量','竖直分量'],en:['vector components','vector projection','vectors']}
};
const visuals={
  Flow:{zh:['流程图','执行流程','工作流程','操作流程','排查步骤','故障排查'],en:['flowchart','workflow','troubleshooting steps']},
  RelationGraph:{zh:['关系图','组成关系','依赖关系','关联网络','构件关系'],en:['relationship graph','dependency graph']},
  Timeline:{zh:['时间线','发展历程','时间顺序','年代顺序','历史阶段'],en:['timeline','chronology']},
  Diagram:{zh:['结构示意','几何示意','结构图','剖面示意','受力示意'],en:['schematic diagram','geometry diagram']},
  Animation:{zh:['运动动画','旋转动画','位移动画','动画演示'],en:['motion animation','animated demonstration']}
};
const story={zh:['多画面','多张图','图文结合','图文交替','动画加流程','综合解释','同时展示'],en:['multiple visuals','multi panel','visual story']};
const freezeEntries=obj=>Object.freeze(Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,Object.freeze(v)])));
const TEMPLATE_REGISTRY=freezeEntries({
  ...Object.fromEntries(Object.entries(PRESET_CATALOG).map(([name,info])=>['lab.'+name,{
    id:'lab.'+name,family:'quick',title:info.label,description:info.description,
    parameters:Object.freeze([...info.parameters]),terms:Object.freeze([...(quick[name]?.zh??[]),...(quick[name]?.en??[])])
  }])),
  ...Object.fromEntries(VISUAL_KINDS.map(kind=>['visual.'+kind.toLowerCase(),{
    id:'visual.'+kind.toLowerCase(),family:'compose',kind,title:kind,
    description:{Flow:'顺序与分支流程',RelationGraph:'对象关系与依赖',Timeline:'有序历史与事件',Diagram:'受限的几何示意',Animation:'可播放的概念运动'}[kind],
    parameters:Object.freeze(['spec']),terms:Object.freeze([...(visuals[kind]?.zh??[]),...(visuals[kind]?.en??[])])
  }])),
  ...Object.fromEntries(Object.entries(EXPERIMENT_CATALOG).map(([template,entry])=>[entry.id,{
    id:entry.id,family:'experiment',template,title:entry.title,description:entry.description,
    parameters:Object.freeze(['parameters']),terms:Object.freeze(entry.terms),priority:entry.priority??(template==='planetary'?3:template==='process'?2:0)
  }])),
  'story.multi':{id:'story.multi',family:'story',title:'多画面图文',description:'一至四张可视化图文混排，动画优先',parameters:Object.freeze(['spec']),terms:Object.freeze([...story.zh,...story.en])}
});
const TEMPLATE_IDS=Object.freeze(Object.keys(TEMPLATE_REGISTRY));
function describeTemplateCatalog(){
 return TEMPLATE_IDS.map(id=>{const t=TEMPLATE_REGISTRY[id];return `${id}: ${t.description} (${t.parameters.join(',')||'无参数'})`;});
}
const isPlain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
const safeText=x=>typeof x==='string'&&x.length<=500&&x.trim().length>0;
function matchTerm(query,term){
 const latin=/^[\x00-\x7F]+$/.test(term);
 // ASCII terms must have word boundaries: English "can" must not trigger CAN bus.
 if(latin){const normalized=term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return new RegExp('(^|[^a-z0-9])'+normalized+'(?=$|[^a-z0-9])','i').test(query);}
 return query.includes(term);
}
/** Pure ranked suggestions. Conservatively abstains on ambiguous or weak matches. */
function routeTemplate(query,{maxCandidates=3}={}){
 if(!safeText(query))return {status:'none',reason:'query must contain 1–500 characters',candidates:[]};
 if(/(?:只要文字|不要图|无需图|不要可视化|text only|no visual)/i.test(query))return {status:'none',reason:'user requested no visual',candidates:[]};
 const ranked=TEMPLATE_IDS.map(id=>{
   const t=TEMPLATE_REGISTRY[id];let score=0;const hits=[];
   for(const term of t.terms)if(matchTerm(query,term))hits.push(term);
   // Nested synonyms are one piece of evidence, not separate votes.
   for(const term of hits)if(!hits.some(other=>other!==term&&other.includes(term)))score+=term.length>=4?3:2;
   return {id,family:t.family,score:score>0?score+(t.priority??0):0,hits};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
 const candidates=ranked.slice(0,Math.max(1,Math.min(5,Math.trunc(maxCandidates)||3)));
 if(candidates.length===0)return {status:'none',reason:'no supported template matched',candidates:[]};
 const top=candidates[0],second=candidates[1];
 if(top.score<2)return {status:'none',reason:'insufficient topic evidence',candidates};
 if(second&&top.score-second.score<=1)return {status:'ambiguous',reason:'multiple similarly suitable templates',candidates};
 return {status:'matched',id:top.id,confidence:!second||top.score>=second.score+3?'high':'medium',candidates};
}
function buildTemplateScene({templateId,parameters={},spec}={}){
 const entry=TEMPLATE_REGISTRY[templateId];if(!entry)throw Error('Unknown template ID');
 if(!isPlain(parameters))throw Error('Template parameters must be an object');
 if(entry.family==='experiment'){
   if(spec!==undefined)throw Error('Interactive experiments use parameters, not spec');
   return {id:templateId,title:entry.title,family:entry.family,source:experimentSceneSource(entry.template,parameters)};
  }
  if(entry.family==='quick'){
   if(spec!==undefined)throw Error('Quick template does not accept spec');
   const name=templateId.slice(4);
   return {id:templateId,title:entry.title,family:entry.family,source:makePresetSource(name,parameters)};
 }
 if(Object.keys(parameters).length)throw Error('Visual templates use spec, not parameters');
 if(!isPlain(spec))throw Error('Visual template needs a validated spec object');
 return {id:templateId,title:spec.title||entry.title,family:entry.family,source:entry.family==='compose'?visualSceneSource(entry.kind,spec):storySceneSource(spec)};
}

