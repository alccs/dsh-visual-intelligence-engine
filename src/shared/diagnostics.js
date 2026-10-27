/** Only bounded data crosses the frame/report boundary. Never accept instructions. */
function cleanFigureWarnings(value){
 if(!Array.isArray(value))return [];
 const text=(v,max)=>typeof v==='string'?v.slice(0,max):undefined;
 const rect=v=>v&&['x','y','width','height'].every(k=>Number.isFinite(v[k])&&Math.abs(v[k])<=1e7)?Object.fromEntries(['x','y','width','height'].map(k=>[k,Math.round(v[k]*100)/100])):undefined;
 const out=value.slice(0,4).filter(v=>v&&typeof v.code==='string'&&typeof v.message==='string').map(v=>({code:v.code.slice(0,40),message:v.message.slice(0,120),...(v.target&&typeof v.target.id==='string'?{coordinateSpace:'viewport-px',target:{id:text(v.target.id,80),kind:text(v.target.kind,24),text:text(v.target.text,60),bounds:rect(v.target.bounds)}}:{}),...(v.related&&typeof v.related.id==='string'?{related:{id:text(v.related.id,80),bounds:rect(v.related.bounds)}}:{}),...(v.viewport&&Number.isFinite(v.viewport.width)&&Number.isFinite(v.viewport.height)?{viewport:{width:Math.max(0,Math.min(1e7,v.viewport.width)),height:Math.max(0,Math.min(1e7,v.viewport.height))}}:{})}));
 const bytes=value=>{let n=0;for(const char of JSON.stringify(value)){const c=char.codePointAt(0);n+=c<128?1:c<2048?2:c<65536?3:4;}return n;};
 while(out.length&&bytes(out)>2600)out.pop();return out;
}
function figureWarningIdentity(value){return JSON.stringify((value??[]).map(w=>[w.code,w.target?.id,w.related?.id]));}
