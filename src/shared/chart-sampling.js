/** Whole-domain baseline followed by breadth-first, bounded refinement. */
function sampleChartSeries(series,spec,values={}){
  if(series.points)return series.points;
  const a=spec.x.min,b=spec.x.max,range=spec.y.max-spec.y.min,limit=4096,cache=new Map(),cuts=[a,...(series.breaks??[]).filter(x=>x>a&&x<b),b].sort((x,y)=>x-y);
  const value=x=>{if(cache.has(x))return cache.get(x);let y=null;try{y=evaluate(series.expr,{...values,x});}catch{}cache.set(x,y);return y;};
  const points=new Map(),queue=[],breaks=new Set(cuts.slice(1,-1));let limited=false;
  const count=Math.min(320,Math.max(16,Math.floor((limit-128)/(cuts.length-1))-2));
  for(let part=0;part<cuts.length-1;part++){
    const epsilon=Math.min((b-a)*1e-10,(cuts[part+1]-cuts[part])/4),lo=part?cuts[part]+epsilon:a,hi=part<cuts.length-2?cuts[part+1]-epsilon:b;
    const xs=[...new Set([...Array.from({length:count+1},(_,i)=>lo+(hi-lo)*i/count),...(series.keyPoints??[]).filter(x=>x>=lo&&x<=hi)])].sort((x,y)=>x-y);
    for(const x of xs)points.set(x,value(x));for(let i=0;i<xs.length-1;i++)queue.push([xs[i],xs[i+1],0]);
  }
  for(let cursor=0;cursor<queue.length;cursor++){
    const [x0,x1,depth]=queue[cursor],x=(x0+x1)/2,y0=value(x0),y1=value(x1),y=value(x);
    const bend=y!==null&&y0!==null&&y1!==null&&Math.abs(y-(y0+y1)/2)>range/800,transition=[y0,y,y1].some(v=>v===null)&&[y0,y,y1].some(v=>v!==null);
    if(!(bend||transition)||depth>=8||x<=x0||x>=x1)continue;
    if(points.size+breaks.size>=limit){limited=true;continue;}
    points.set(x,y);queue.push([x0,x,depth+1],[x,x1,depth+1]);
  }
  for(const x of breaks)points.set(x,null);const out=[...points].sort((a,b)=>a[0]-b[0]);out.limited=limited;return out;
}
