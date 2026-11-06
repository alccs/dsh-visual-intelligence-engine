/** Dedicated conversation target: complete scenes, independent of Chat folding. */
const VIE_GALLERY_TARGET='vie-gallery';
function createVIEGalleryDefinition(){
  const update=(ctx,match)=>{
    const event=match.event,meta=event.data.meta,old=ctx.state;
    const valid=meta.valid===true&&event.data.message?.isError!==true&&typeof meta.source==='string'&&new TextEncoder().encode(meta.source).length<=LIMITS.bytes;
    if(!valid)return old?{...old,error:'修订未提交，保留原图。'}:{anchor:event.seq,callId:match.id,title:String(meta.title??'VIE 图解').slice(0,100),source:'',error:'图形参数需要修复。'};
    const revision=Number.isSafeInteger(meta.revision)?meta.revision:1;
    if(old?.revision>revision)return old;
    return {anchor:old?.anchor??event.seq,callId:old?.callId??String(meta.anchorCallId??event.data.message?.source?.callId??match.id),title:String(meta.title??'VIE 图解').slice(0,100),source:meta.source,revision,caption:String(meta.caption??'').slice(0,140)};
  };
  return {kind:'vie-gallery-item',target:VIE_GALLERY_TARGET,
    match(event){const meta=event.data?.meta;if(event.type!=='tool/result'||meta?.kind!=='vie')return null;const id=meta.visualId??meta.anchorCallId??event.data.message?.source?.callId;return typeof id==='string'&&id.length>0&&id.length<=200?{id,role:'start'}:null;},
    start(ctx,match){return update({...ctx,state:undefined},match);},update,publication:()=> 'immediate',
    buildViewNode(ctx){return {key:ctx.key,id:ctx.id,kind:'vie-gallery-item',target:VIE_GALLERY_TARGET,anchorSeq:ctx.state.anchor,location:ctx.start?.location??{kind:'unresolved'},visibility:'visible',data:ctx.state};}
  };
}
function createVIEGalleryViewDefinition(){
  return {target:VIE_GALLERY_TARGET,create(){
    const nodes=new Map();let items=[];
    const snapshot=()=>{items=[...nodes.values()].filter(n=>n.visibility!=='hidden').sort((a,b)=>a.anchorSeq-b.anchorSeq).slice(-32).map(n=>({...n.data,id:n.id}));return items;};
    return {empty:items,replace({nodes:values}){nodes.clear();values.forEach(n=>nodes.set(n.key,n));return snapshot();},apply({upserts}){if(!upserts.length)return items;upserts.forEach(n=>nodes.set(n.key,n));return snapshot();}};
  },isActive:items=>items.length>0};
}
function createVIEGallery(React,bridge){
  const View=makeReactView(React,{VIEStream,SceneStore,evaluate,derivedValue,interpolateText,getSceneStore:(key,source)=>bridge.getStore(key,source)});
  const empty=[];
  return function VIEGallery(props){
    const items=props.useConversation(value=>value.views.get(VIE_GALLERY_TARGET)??empty);
    const [selected,setSelected]=React.useState('');
    const item=items.find(x=>x.id===selected)??items.at(-1);
    return React.createElement('section',{className:'vie-mobile-gallery','data-vie-gallery':true},[
      React.createElement('header',{key:'header'},[
        React.createElement('h3',{key:'title'},'VIE 图解'),
        React.createElement('p',{key:'hint'},'选择一张图进行本地交互。完整解释请查看聊天正文。'),
        items.length>0&&React.createElement('label',{key:'selector'},['图解 ',React.createElement('select',{key:'select','aria-label':'选择 VIE 图解',value:item?.id??'',onChange:e=>setSelected(e.target.value)},items.map((x,i)=>React.createElement('option',{key:x.id,value:x.id},(i+1)+' · '+x.title)))])
      ]),
      !item?React.createElement('p',{key:'empty',role:'status'},'本会话尚无 VIE 图解；可先在聊天中生成一张图。'):React.createElement('div',{key:JSON.stringify([props.sessionId,item.id])},[
        item.error&&React.createElement('p',{key:'error',role:'status'},item.error),
        item.source&&React.createElement(View,{key:'view',source:item.source,title:item.title,callId:bridge.sceneKey(props.sessionId,item.callId),inputActions:props.inputActions}),
        item.caption&&React.createElement('p',{key:'caption'},item.caption)
      ])
    ]);
  };
}
