/** Parse only: reject provable SDK mistakes without evaluating authored code. */
const VIEAcorn=(()=>{const exports={},module={exports};
/* @include vendor/acorn.js */
return module.exports;})();
function validateSDKCalls(js){
 if(!/VIE\s*(?:\.|\[)/.test(js))return;
 let tree;try{tree=VIEAcorn.parse(js,{ecmaVersion:'latest',sourceType:'script'});}catch{return;}// Native Script remains the syntax authority.
 const member=n=>n?.type==='MemberExpression'?(n.computed?n.property.type==='Literal'?String(n.property.value):null:n.property.name):null;
 const key=p=>p.type==='Property'&&!p.computed?(p.key.type==='Identifier'?p.key.name:p.key.type==='Literal'?String(p.key.value):null):null;
 const unknown=Symbol('dynamic');
 const literal=n=>{if(!n)return unknown;if(n.type==='Literal'&&!n.regex&&typeof n.value!=='bigint')return n.value;if(n.type==='UnaryExpression'&&['-','+'].includes(n.operator)){const v=literal(n.argument);return typeof v==='number'?(n.operator==='-'?-v:v):unknown;}if(n.type==='ArrayExpression'){const a=n.elements.map(literal);return a.includes(unknown)?unknown:a;}if(n.type==='ObjectExpression'){const a={};for(const p of n.properties){const k=key(p),v=literal(p.value);if(k===null||p.kind!=='init'||v===unknown||['__proto__','constructor','prototype'].includes(k))return unknown;a[k]=v;}return a;}return unknown;};
 const bindNames=(n,names)=>{if(!n)return;if(n.type==='Identifier')names.push(n.name);else if(n.type==='RestElement')bindNames(n.argument,names);else if(n.type==='AssignmentPattern')bindNames(n.left,names);else if(n.type==='ArrayPattern')n.elements.forEach(e=>bindNames(e,names));else if(n.type==='ObjectPattern')n.properties.forEach(p=>bindNames(p.value??p.argument,names));};
 const visit=(node,env)=>{if(!node||typeof node!=='object')return;
  if(node.type==='Program'||node.type==='BlockStatement'){const scope=new Map(env);for(const s of node.body)visit(s,scope);return;}
  if(/Function(?:Expression|Declaration)$/.test(node.type)||node.type==='ArrowFunctionExpression'){const scope=new Map(env),names=[];for(const p of node.params)bindNames(p,names);names.forEach(n=>scope.delete(n));visit(node.body,scope);return;}
  if(node.type==='VariableDeclaration'){for(const d of node.declarations){const method=member(d.init?.callee),object=d.init?.callee?.object;if(d.id.type==='Identifier'){env.delete(d.id.name);if(d.init?.type==='CallExpression'&&(object?.name==='VIE'&&method==='svg'||env.get(object?.name)==='svg'&&method==='group'))env.set(d.id.name,'svg');}visit(d.init,env);}return;}
  if(node.type==='CallExpression'&&env.get(node.callee?.object?.name)==='svg'){
   const method=member(node.callee),arg=node.arguments[0];
   if(method&&!SVG_SDK_KINDS.includes(method)&&!['group','axes','coordinates','anchor','connect','layoutLabels','dispose'].includes(method))svgSDKError(method,'method','unknown drawing method');
   if(SVG_SDK_KINDS.includes(method)&&arg?.type==='ObjectExpression'){
    const keys=new Map();let dynamic=false;
    for(const p of arg.properties){const k=key(p);if(k===null||p.kind!=='init'){dynamic=true;keys.clear();continue;}if(keys.has(k)){const e=Error('VIE_SDK_DUPLICATE_FIELD '+method+'.'+k+': duplicate object key; use strokeWidth for stroke thickness, width for rectangle geometry');e.code='VIE_SDK_DUPLICATE_FIELD';e.field=method+'.'+k;throw e;}keys.set(k,p);}
    if(!dynamic){const v=literal(arg);if(v!==unknown)normalizeSVGPrimitive(method,v);else{for(const k of keys.keys())if(![...SVG_SDK_KEYS[method],'tone','color','stroke','strokeWidth','stroke-width','fill','opacity','strokeOpacity','fillOpacity','dash','strokeDasharray'].includes(k))svgSDKError(method,k,'unknown field');if(['label','rect','circle','angle'].includes(method)&&!keys.has('at')&&!((keys.has('x')||method==='circle'&&keys.has('cx'))&&(keys.has('y')||method==='circle'&&keys.has('cy'))))svgSDKError(method,'at','expected at:[x,y] or complete coordinate aliases');}}
   }
  }
  for(const [k,v]of Object.entries(node)){if(['start','end','loc'].includes(k))continue;if(Array.isArray(v))v.forEach(n=>{if(n?.type)visit(n,env);});else if(v?.type)visit(v,env);}
 };
 visit(tree,new Map());
}
