/** General data/formula plot, independent of subject or experiment catalogs. */
function validateChartSpec(input){
  const object=x=>x&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
  const text=(x,max=100)=>{if(typeof x!=='string'||x.length>max)throw Error('Chart requires bounded text');return x;};
  const num=x=>{if(typeof x!=='number'||!Number.isFinite(x)||Math.abs(x)>1e9)throw Error('Chart requires finite bounded numbers');return x;};
  const keys=(x,allowed)=>{if(!object(x)||Object.keys(x).some(k=>!allowed.includes(k)))throw Error('Unknown chart field');};
  const points=(p,min)=>{if(!Array.isArray(p)||p.length<min||p.length>256)throw Error('Chart points need '+min+'–256 pairs');return p.map(v=>{if(!Array.isArray(v)||v.length!==2)throw Error('Chart point requires [x,y]');return v.map(num);});};
  const tone=x=>{if(x!==undefined&&!['primary','secondary','accent','muted','warning'].includes(x))throw Error('Invalid chart tone');return x??'primary';};
  keys(input,['title','x','y','series','regions','controls','inputs','note']);
  function axis(a,defaultMin,defaultMax){a=a??{};keys(a,['min','max','label']);const out={min:num(a.min??defaultMin),max:num(a.max??defaultMax),label:text(a.label??'')};if(out.max<=out.min||out.max-out.min<1e-9)throw Error('Chart axis must have increasing bounds');return out;}
  const x=axis(input.x,0,10),y=axis(input.y,0,10);
  const controls=(input.controls??[]);if(!Array.isArray(controls)||controls.length>4)throw Error('Chart supports up to four controls');
  const names=new Set();const cleanControls=controls.map(c=>{const out=validateControlSpec(c);if(names.has(out.key))throw Error('Duplicate chart parameter');names.add(out.key);return out;});
  const inputs=input.inputs??[];if(!Array.isArray(inputs)||inputs.length>8)throw Error('Too many chart derived inputs');
  const cleanInputs=inputs.map(p=>{keys(p,['key','bind','value']);if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(p.key)||['x','constructor','prototype','__proto__'].includes(p.key)||names.has(p.key)||typeof p.bind!=='string'||!/^\/derived\/[A-Za-z][A-Za-z0-9_]{0,19}$/.test(p.bind))throw Error('Invalid chart derived input');names.add(p.key);return {key:p.key,bind:p.bind,value:num(p.value)};});
  const variables=Object.fromEntries([...cleanControls,...cleanInputs].map(c=>[c.key,c.value]));
  if(!Array.isArray(input.series)||input.series.length<1||input.series.length>6)throw Error('Chart needs 1–6 series');
  const series=input.series.map((s,index)=>{keys(s,['label','expr','points','tone','keyPoints','breaks']);const out={label:text(s.label),tone:tone(s.tone??['primary','secondary','accent','warning','muted','primary'][index])};if((s.expr!==undefined)===(s.points!==undefined))throw Error('Choose chart expression OR points');if(s.expr!==undefined){out.expr=text(s.expr,300);let valid=false;for(const q of [x.min,(x.min+x.max)/2,x.max]){try{evaluate(out.expr,{...variables,x:q});valid=true;}catch(e){if(!/Numeric overflow|Division by zero/.test(e.message))throw e;}}if(!valid)throw Error('Chart expression has no finite sample');}else out.points=points(s.points,2);for(const field of ['keyPoints','breaks'])if(s[field]!==undefined){if(!out.expr||!Array.isArray(s[field])||s[field].length>32||s[field].some(v=>typeof v!=='number'||!Number.isFinite(v)||v<x.min||v>x.max))throw Error('Invalid chart '+field);out[field]=[...new Set(s[field])].sort((a,b)=>a-b);}return out;});
  const regions=input.regions??[];if(!Array.isArray(regions)||regions.length>8)throw Error('Too many chart regions');
  return {title:text(input.title),x,y,series,controls:cleanControls,...(cleanInputs.length?{inputs:cleanInputs}:{}),regions:regions.map(r=>{keys(r,['label','points','tone']);return {label:text(r.label),points:points(r.points,3),tone:tone(r.tone)};}),note:text(input.note??'',600)};
}
function validateChartState(spec,value={}){
  if(value===null)value={};
  if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid chart state');
  const out={};for(const c of spec.controls){const v=value[c.key]??c.value;assertSliderValue({...c,...(c.options?{options:c.options.map(o=>o.value)}:{})},v,'Chart parameter');out[c.key]=v;}
  for(const p of spec.inputs??[])out[p.key]=value[p.key]===undefined?p.value:typeof value[p.key]==='number'&&Number.isFinite(value[p.key])?value[p.key]:NaN;
  if(Object.keys(value).some(k=>![...spec.controls,...(spec.inputs??[])].some(c=>c.key===k)))throw Error('Unknown chart parameter');
  return out;
}
