/** Topic-independent document and generated-figure contract. No topic allowlist. */
/* @include shared/learning.js */
function validateFigureState(input={}){
  const plain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&(Object.getPrototypeOf(x)===Object.prototype||Object.getPrototypeOf(x)===null);
  let nodes=0;
  const visit=(v,depth)=>{
    if(++nodes>256||depth>6)throw Error('Figure state is too complex');
    if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return;
    if(typeof v==='string'&&v.length<=2000)return;
    if(Array.isArray(v)&&v.length<=128){v.forEach(x=>visit(x,depth+1));return;}
    if(plain(v)&&Object.keys(v).length<=32){for(const [k,x]of Object.entries(v)){if(k.length>80||['__proto__','constructor','prototype'].includes(k))throw Error('Invalid figure state key');visit(x,depth+1);}return;}
    throw Error('Figure state must contain bounded JSON data');
  };
  if(!plain(input))throw Error('Figure state must be an object');visit(input,0);
  if(new TextEncoder().encode(JSON.stringify(input)).length>8192)throw Error('Figure state exceeds 8KB');
  return JSON.parse(JSON.stringify(input));
}
function validateFigureDefinition(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype)throw Error('Figure requires an object');
  for(const key of Object.keys(input))if(!DOCUMENT_CONTRACT.blocks.figure.fields.includes(key)&&key!=='type')throw Error('Unknown figure field: '+key);
  const bounded=(value,max,label)=>{if(typeof value!=='string'||new TextEncoder().encode(value).length>max)throw Error('Figure '+label+' exceeds limit or is not text');return value;};
  const result={title:bounded(input.title??'交互图解',300,'title'),html:bounded(input.html??'',16384,'html'),css:bounded(input.css??'',8192,'css'),js:bounded(input.js??'',32768,'js'),height:input.height??360,state:validateFigureState(input.state??{})};
  if(input.bindings!==undefined){
    if(!input.bindings||typeof input.bindings!=='object'||Array.isArray(input.bindings)||Object.keys(input.bindings).length>8)throw Error('Invalid figure bindings');
    result.bindings={};for(const [key,ref]of Object.entries(input.bindings)){if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(key)||['constructor','prototype','__proto__'].includes(key)||typeof ref!=='string'||!/^\/(shared|derived)\/[A-Za-z][A-Za-z0-9_]{0,19}$/.test(ref))throw Error('Invalid figure binding');result.bindings[key]=ref;}
  }
  if(!result.html.trim())throw Error('Figure html must not be empty');
  validateLearningCalls(result.js);
  if(!Number.isInteger(result.height)||result.height<160||result.height>1000)throw Error('Figure height must be 160–1000');
  if(/<(?:iframe|frame|object|embed|base)\b|<meta\b[^>]*http-equiv\s*=\s*["']?refresh/i.test(result.html))throw Error('Figure must be self-contained; nested browsing contexts and refresh are not supported');
  if(new TextEncoder().encode(JSON.stringify(result)).length>60000)throw Error('Figure exceeds serialized 60KB limit');
  return result;
}
function validateDocumentSpec(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype)throw Error('Document requires an object');
  if(input.caption!==undefined){if(typeof input.caption!=='string'||input.caption.length>140)throw Error('document.caption must be text of at most 140 characters');const {caption,...rest}=input;input=rest;}
  if(input.title===undefined){const first=isLearningQuestionGroup(input.blocks)?'选择题练习':input.blocks?.[0]?.title;input={...input,title:typeof first==='string'&&first.trim()?first.trim().slice(0,100):'交互图解'};}
  for(const key of Object.keys(input))if(!DOCUMENT_CONTRACT.fields.includes(key))throw Error('Unknown document field: '+key);
  if(typeof input.title!=='string'||!input.title.trim()||input.title.length>100)throw Error('Document requires a short title');
  if(!Array.isArray(input.blocks)||input.blocks.length<1||input.blocks.length>12)throw Error('Document requires 1–12 ordered blocks');
  if(isLearningQuestionGroup(input.blocks))input={...input,blocks:[{type:'learning',title:input.title,questions:input.blocks.map((b,i)=>{try{const q=validateLearningDefinition(b);return {...q.quiz,title:q.title};}catch(error){error.path='blocks['+i+']';throw error;}})}]};
  const controls=input.controls===undefined?[]:validateChartSpec({title:'shared',controls:input.controls,series:[{label:'validation',expr:'x'}]}).controls;
  if(controls.some(c=>c.bind))throw Error('Document controls cannot contain bind');
  const derive=input.derive??{};
  if(!derive||typeof derive!=='object'||Array.isArray(derive)||Object.getPrototypeOf(derive)!==Object.prototype||Object.keys(derive).length>8)throw Error('Invalid document derive');
  const formulas={},state=Object.fromEntries(controls.map(c=>['/shared/'+c.key,c.value]));
  for(const [key,expr]of Object.entries(derive)){if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(key)||['x','constructor','prototype','__proto__'].includes(key)||controls.some(c=>c.key===key)||typeof expr!=='string'||expr.length>300)throw Error('Invalid derived key/expression');formulas['/derived/'+key]=expr;}
  const issues=validateFormulas({state,formulas});if(issues.length)throw Error(issues.join('; '));
  const computed=computeDerived({state,formulas});if(computed.failures.size)throw Error('Initial derived value unavailable: '+[...computed.failures.values()].join('; '));
  const values=computed.values;
  const resolve=ref=>{const key=Object.hasOwn(state,'/shared/'+ref)?'/shared/'+ref:'/derived/'+ref;if(!Object.hasOwn(values,key))throw Error('Unknown shared binding: '+ref);return key;};
  if(input.layout!==undefined&&!['stack','grid'].includes(input.layout))throw Error('Unknown document layout');
  let figures=0;
  const blocks=input.blocks.map((raw,index)=>{try{
    let block=raw;
    if(block?.type==='learning'){
      const lesson=validateLearningDefinition(block);
      block={type:'figure',title:lesson.title,html:'<div id="vie-lesson"></div>',js:'VIE.mountLearning('+JSON.stringify({...lesson,root:'#vie-lesson'})+');'};
    }
    // Normalize only unambiguous legacy aliases, then apply the regular validators.
    if(block&&block.type===undefined&&['text','figure','chart','experiment'].includes(block.kind)){const {kind,...rest}=block;block={type:kind,...rest};}
    if(block&&block.type===undefined&&block.kind===undefined&&typeof block.html==='string'&&Object.keys(block).every(k=>DOCUMENT_CONTRACT.blocks.figure.fields.includes(k)))block={type:'figure',...block};
    if(block&&['Flow','RelationGraph','Timeline','Diagram','Animation'].includes(block.kind)&&block.spec&&(!block.type||block.type==='visual')){const {title,...rest}=block;block={...rest,type:'visual',spec:{...block.spec,...(!block.spec.title&&title?{title}:{})}};}
    if(!block||typeof block!=='object'||Array.isArray(block))throw Error('Invalid document block');
    const contract=DOCUMENT_CONTRACT.blocks[block.type];if(contract)for(const key of Object.keys(block))if(!contract.fields.includes(key))throw Error('Unknown '+block.type+' field: '+key);
    if(block.type==='graphic'){if(++figures>4)throw Error('Use at most four figures per document');return {type:'figure',...semanticGraphic(block)};}
    if(block.type==='figure'){
      if(++figures>4)throw Error('Use at most four figures per document');
      const {type,...spec}=block;
      if(spec.bindings){const bindings={},initial={...spec.state};for(const [key,ref]of Object.entries(spec.bindings)){const path=ref.startsWith('/')?ref:resolve(ref);if(!Object.hasOwn(values,path))throw Error('Unknown figure shared input: '+ref);bindings[key]=path;initial[key]=values[path];}spec.bindings=bindings;spec.state=initial;}
      return {type,...validateFigureDefinition(spec)};
    }
    if(block.type==='text'){
      for(const key of Object.keys(block))if(!['type','title','body'].includes(key))throw Error('Unknown text block field');
      if(typeof block.body!=='string'||block.body.length>1400||block.title!==undefined&&(typeof block.title!=='string'||block.title.length>100))throw Error('Invalid paragraph');
      return {type:'text',...(block.title===undefined?{}:{title:block.title}),body:block.body};
    }
    if(block.type==='chart'){
      const {type,bindings,...spec}=block;
      if(bindings!==undefined){
        if(!bindings||typeof bindings!=='object'||Array.isArray(bindings)||Object.getPrototypeOf(bindings)!==Object.prototype||Object.keys(bindings).length>4)throw Error('Invalid chart bindings');
        spec.controls=[...(spec.controls??[])];spec.inputs=[...(spec.inputs??[])];
        for(const [key,ref]of Object.entries(bindings)){if(typeof ref!=='string')throw Error('Invalid chart binding target');const path=resolve(ref),c=controls.find(c=>c.key===ref);if(c)spec.controls.push({...c,key,bind:path});else spec.inputs.push({key,bind:path,value:values[path]});}
      }
      const clean=validateChartSpec(spec);
      for(const c of clean.controls.filter(c=>c.bind)){const original=controls.find(x=>'/shared/'+x.key===c.bind);if(!original||['min','max','step','value','kind','options'].some(k=>JSON.stringify(c[k])!==JSON.stringify(original[k])))throw Error('Shared chart bounds must match document control');}
      for(const p of clean.inputs??[])if(!Object.hasOwn(formulas,p.bind)||p.value!==values[p.bind])throw Error('Unknown/mismatched derived chart input');
      return {type,...clean};
    }
    if(block.type==='visual'){
      for(const key of Object.keys(block))if(!['type','kind','spec'].includes(key))throw Error('Unknown visual block field');
      const spec=validateVisualSpec(block.kind,block.spec);
      for(const shape of spec.shapes??[])for(const value of Object.values(shape))if(value&&typeof value==='object'&&value.$bind&&!Object.hasOwn(values,value.$bind))throw Error('Unknown diagram binding: '+value.$bind);
      return {type:'visual',kind:block.kind,spec};
    }
    if(block.type==='experiment'){
      const {type,...spec}=block;return {type,...validateExperimentSpec(spec)};
    }
    throw Error('Unknown document block type: '+block.type);
  }catch(error){error.path='blocks['+index+']'+(error.path?'.spec.'+error.path:'');error.message=error.path+': '+error.message;throw error;}});
  return {title:input.title,...controls.length?{controls}:{},...(Object.keys(derive).length?{derive:{...derive}}:{}),...(input.layout?{layout:input.layout}:{}),blocks};
}
function documentSceneSource(input){
  const spec=validateDocumentSpec(input),events=[{v:1,op:'surface.begin',id:'document-scene'}];
  if(spec.layout==='grid'&&spec.controls?.length)events.push({v:1,op:'node.put',id:'document-controls',order:0,type:'Row',props:{}});
  (spec.controls??[]).forEach((c,i)=>events.push({v:1,op:'node.put',id:'shared-'+c.key,order:i,...(spec.layout==='grid'?{parent:'document-controls'}:{}),type:CONTROL_TYPES[c.kind??'slider'],props:{label:c.label,bind:'/shared/'+c.key,default:c.value,min:c.min,max:c.max,step:c.step,...(c.options?{options:c.options}:{})}}));
  for(const [key,expr]of Object.entries(spec.derive??{}))events.push({v:1,op:'state.derive',path:'/derived/'+key,expr});
  if(spec.layout==='grid')events.push({v:1,op:'node.put',id:'document-grid',order:(spec.controls??[]).length,type:'Row',props:{}});
  spec.blocks.forEach((block,i)=>{
    const {type,...data}=block;
    const nodeType=type==='text'?'Text':type==='figure'?'GenerativeFigure':type==='chart'?'Chart':type==='experiment'?'InteractiveScene':data.kind;
    const props=type==='visual'?data.spec:data;
    events.push({v:1,op:'node.put',id:'block'+(i+1),order:i+(spec.controls?.length??0),...(spec.layout==='grid'?{parent:'document-grid'}:{}),type:nodeType,props});
  });
  events.push({v:1,op:'surface.end',id:'document-scene'});
  const source=events.map(e=>JSON.stringify(e)+'\n').join('');
  if(new TextEncoder().encode(source).length>262144)throw Error('Document exceeds 256KB');
  return source;
}
