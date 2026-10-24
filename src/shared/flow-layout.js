/** Pure graph layout and local navigation. No topic names or inferred edges. */
function layoutFlow(spec){
  const nodes=spec.nodes,byId=new Map(nodes.map((n,i)=>[n.id,i])),next=new Map(nodes.map(n=>[n.id,[]]));
  for(const e of spec.edges)next.get(e.from).push(e.to);
  let tick=0;const indices=new Map(),low=new Map(),stack=[],active=new Set(),components=[];
  function visit(id){indices.set(id,tick);low.set(id,tick++);stack.push(id);active.add(id);for(const to of next.get(id)){if(!indices.has(to)){visit(to);low.set(id,Math.min(low.get(id),low.get(to)));}else if(active.has(to))low.set(id,Math.min(low.get(id),indices.get(to)));}if(low.get(id)===indices.get(id)){const part=[];let x;do{x=stack.pop();active.delete(x);part.push(x);}while(x!==id);components.push(part.sort((a,b)=>byId.get(a)-byId.get(b)));}}
  nodes.forEach(n=>{if(!indices.has(n.id))visit(n.id);});
  const group=new Map();components.forEach((c,i)=>c.forEach(id=>group.set(id,i)));
  const outgoing=components.map(()=>new Set()),incoming=components.map(()=>0),base=components.map(()=>0);
  for(const e of spec.edges){const a=group.get(e.from),b=group.get(e.to);if(a!==b&&!outgoing[a].has(b)){outgoing[a].add(b);incoming[b]++;}}
  const roots=components.filter((_,i)=>incoming[i]===0).map(c=>c[0]).sort((a,b)=>byId.get(a)-byId.get(b));
  const ready=components.map((_,i)=>i).filter(i=>incoming[i]===0),ranks=new Map();
  while(ready.length){ready.sort((a,b)=>byId.get(components[a][0])-byId.get(components[b][0]));const g=ready.shift();components[g].forEach((id,i)=>ranks.set(id,base[g]+i));for(const to of outgoing[g]){base[to]=Math.max(base[to],base[g]+components[g].length);if(--incoming[to]===0)ready.push(to);}}
  const rows=[];for(const n of nodes){const r=ranks.get(n.id);(rows[r]??=[]).push(n.id);}return {rows:rows.filter(Boolean),ranks:Object.fromEntries(ranks),roots};
}
function validateFlowState(spec,input){
  const start=layoutFlow(spec).roots[0]??spec.nodes[0].id;
  const value=input??{v:1,presentation:spec.presentation??'overview',history:[start]};
  if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(k=>!['v','presentation','history','choice'].includes(k))||value.v!==1||!['overview','guided'].includes(value.presentation)||!Array.isArray(value.history)||value.history.length<1||value.history.length>64)throw Error('Invalid flow navigation state');
  const known=new Set(spec.nodes.map(n=>n.id));if(value.history.some(id=>typeof id!=='string'||!known.has(id)))throw Error('Unknown flow navigation node');
  if(!layoutFlow(spec).roots.includes(value.history[0]))throw Error('Flow navigation must start at a root');
  for(let i=1;i<value.history.length;i++)if(!spec.edges.some(e=>e.from===value.history[i-1]&&e.to===value.history[i]))throw Error('Undeclared flow navigation edge');
  if(value.choice!==undefined&&!spec.edges.some(e=>e.from===value.history.at(-1)&&e.to===value.choice))throw Error('Invalid flow branch choice');
  return {v:1,presentation:value.presentation,history:[...value.history],...(value.choice===undefined?{}:{choice:value.choice})};
}
/** Freeze the mode default into durable results; explicit per-figure choice wins. */
function flowPresentationSource(source,mode){
  return source.split('\n').map(line=>{if(!line.trim())return line;const e=JSON.parse(line);if(e.op==='node.put'&&e.type==='Flow'&&e.props?.presentation===undefined)e.props={...e.props,presentation:mode==='study'?'guided':'overview'};return JSON.stringify(e);}).join('\n');
}
/** Wide classification trees can reflow as nested groups; never duplicate DAG merges or flatten cycles. */
function wideFlowTree(spec){
  if(Math.max(...layoutFlow(spec).rows.map(r=>r.length))<=3)return null;
  const children=new Map(spec.nodes.map(n=>[n.id,[]])),parents=new Map();
  for(const [index,e]of spec.edges.entries()){if(e.from===e.to||parents.has(e.to))return null;parents.set(e.to,e.from);children.get(e.from).push({...e,index});}
  const roots=spec.nodes.filter(n=>!parents.has(n.id)).map(n=>n.id),visited=new Set();
  const visit=id=>{if(visited.has(id))return false;visited.add(id);return children.get(id).every(e=>visit(e.to));};
  if(!roots.length||!roots.every(visit)||visited.size!==spec.nodes.length)return null;
  return {roots,children};
}
