/** dsh-go presentation adapter. Data only; never execute or parse authored JS. */
function vieNativeCard(meta,document){
  const title=String(meta?.title??document?.title??'VIE 图解').slice(0,100);
  const fallback=()=>({type:'stack',title,children:[{type:'text',text:meta?.valid===false?'图形参数需要修复，请继续查看聊天中的说明。':'交互图已提交。在对话详情的「插件」中打开「VIE 图解」操作；不可用时切换网页版。'}]});
  if(meta?.valid===false)return fallback();
  try{
    const children=[];
    if(document){
      for(const block of document.blocks??[]){
        if(block.type==='graphic'&&['bars','donut'].includes(block.kind)){
          semanticGraphic(block); // The ordinary validator is also the adapter's authority.
          children.push({type:'chart',kind:block.kind==='bars'?'bar':'donut',categories:block.items.map(i=>i.label),series:[{name:block.title??title,values:block.items.map(i=>i.value)}],...(block.unit?{unit:block.unit}:{})});
        }else if(block.type==='learning'){
          const lesson=validateLearningDefinition(block);
          if(lesson.stages?.length)children.push({type:'steps',items:lesson.stages.slice(0,6).map((s,i)=>({label:s.label,status:i===0?'current':'todo'}))});
          if(lesson.questions?.length||lesson.quiz)children.push({type:'metric',label:'练习题数',value:lesson.questions?.length??1,caption:'进入 VIE 图解作答'});
        }
      }
    }
    if(!children.length&&meta?.source){
      const stream=new VIEStream();stream.push(meta.source);stream.finish();const snap=stream.snapshot();
      if(!snap.complete||snap.errors.length)return fallback();
      const visit=node=>{
        const p=node.props;
        if(node.type==='Chart'&&children.length<4){
          // Irregular points and discontinuities must not be silently resampled.
          const series=p.series;
          let xs;
          if(series.every(s=>s.points)&&series[0].points.length<=60&&series.every(s=>JSON.stringify(s.points.map(q=>q[0]))===JSON.stringify(series[0].points.map(q=>q[0]))))xs=series[0].points.map(q=>q[0]);
          else if(series.every(s=>s.expr&&!s.breaks?.length&&!s.keyPoints?.length))xs=Array.from({length:25},(_,i)=>p.x.min+(p.x.max-p.x.min)*i/24);
          if(xs){
            const variables=Object.fromEntries([...p.controls,...(p.inputs??[])].map(c=>[c.key,c.bind?snap.values[c.bind]:c.value]));
            const plotted=series.map(s=>({name:s.label,values:xs.map((x,i)=>{try{const v=s.points?s.points[i][1]:evaluate(s.expr,{...variables,x});return Number.isFinite(v)?v:null;}catch{return null;}})}));
            children.push({type:'chart',kind:'line',categories:xs.map(x=>Number(x.toPrecision(5)).toString()),series:plotted,caption:'初始参数快照 · '+p.x.label+' / '+p.y.label+(p.regions.length?'；区域填色请查看完整图':'')});
          }
        }else if(node.type==='BarChart'&&children.length<4){
          children.push({type:'chart',kind:'bar',categories:p.labels,series:[{name:p.title??title,values:p.data.map(v=>typeof v==='string'?(Number.isFinite(snap.values[v])?snap.values[v]:null):v)}],...(p.unit?{unit:p.unit}:{})});
        }else if(node.type==='Metric'&&children.length<4){
          const value=p.bind?snap.values[p.bind]:p.value;
          if(Number.isFinite(value))children.push({type:'metric',label:p.label??'读数',value,...(p.unit?{caption:p.unit}:{})});
        }else if(node.type==='Flow'&&children.length<4){
          children.push({type:'list',items:p.nodes.slice(0,6).map(n=>({title:n.label,subtitle:n.detail??''}))});
          children.push({type:'text',text:'节点概览；分支连线和逐步引导请打开完整图。',tone:'muted'});
        }
        node.children?.forEach(visit);
      };snap.tree.forEach(visit);
    }
    if(!children.length)return fallback();
    children.push({type:'text',text:'原生只读概览；完整交互在「VIE 图解」或网页版。',tone:'muted'});
    const view={type:'stack',title,children:children.slice(0,10)},json=JSON.stringify(view);
    return new TextEncoder().encode(json).length<=8192?JSON.parse(json):fallback();
  }catch{return fallback();}
}
function vieMobilePresentation(meta){
  if(meta?.kind!=='vie')return meta;
  // Keep the complete WebUI metadata outside the separately bounded native view.
  return {...meta,'dsh-go/view':meta['dsh-go/view']??vieNativeCard(meta)};
}
async function attachVIEImagePreview(meta){
  try{
    const svgs=viePreviewSVGs(meta);
    const images=svgs.length?await (await import('./mobile-raster.js')).renderVIEPreview(svgs):[];
    if(images.length){
      meta['dsh-go/view']={type:'stack',title:meta.title??'VIE 图解',children:images};
      meta.nativePreviewStatus='image-provided';
    }else meta.nativePreviewStatus='no-portable-svg';
  }catch{
    meta.nativePreviewError='图片预览生成失败；完整 Web 图保留。';
  }
}
function installVIEDshGo(ctx,mode,onBridge){
  return ctx.inject?.(['dshGo'],child=>{
    if(typeof child.dshGo?.panel!=='function')return;
    child.dshGo.panel('vie-modes',{
      view:(_scope,caps={})=>{const en=caps.locale?.startsWith('en');return {type:'stack',title:en?'VIE mode':'VIE 模式',children:[
        {type:'options',id:'mode',options:VIE_MODES.map((value,i)=>({label:(en?['Automatic','Enabled','Study','Off']:['自动','本聊天启用','学习模式','关闭'])[i],value})),selected:{$:'data.mode'}},
        {type:'text',text:(en?'Plugin version: ':'插件版本：')+VIE_ENGINE_VERSION,tone:'muted'},
        {type:'text',text:en?'Full graphics: conversation details → Plugins → VIE Figures, or the Web UI.':'完整图形：对话详情 → 插件 → VIE 图解；入口不可用时切换网页版。',tone:'muted'}
      ]};},
      data:(scope,emit)=>{
        let last;const update=()=>{const value=mode.get(scope.sessionId);if(value!==last){last=value;emit({mode:value});}};update();return mode.subscribe(update);
      },
      actions:{mode:(scope,event)=>{const value=event.value?.value;if(!scope.sessionId||!VIE_MODES.includes(value))throw Error('Invalid VIE session mode');mode.set(value,scope.sessionId);return {patch:{mode:value}};}}
    });
    onBridge(true);
    child.effect?.(()=>()=>onBridge(false));
  });
}
