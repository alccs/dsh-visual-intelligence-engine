/** Public DSH Chat target contribution. No DOM relocation or host renderer takeover. */
const VIE_ANSWER_KIND='vie-answer';
const VIE_TOOL_NAMES=new Set(['vie_explain','vie_quick','vie_compose','vie_story','vie_render','vie_auto']);
function effectiveVIEPlacement(meta){
  if(meta?.placement==='process')return 'process';
  if(meta?.presentationVersion>=3&&meta.placement==='flow')return 'flow';
  // Old releases unconditionally wrote tail, so migrate their presentation without editing logs.
  return meta?.presentationVersion>=2&&meta.placement==='tail'?'tail':'start';
}
function createVIEAnswerDefinition(){
  const merge=(items,item)=>{const old=items.find(x=>x.callId===item.callId||item.visualId&&x.visualId===item.visualId);return old?items.filter(x=>x===old||x.callId!==item.callId).map(x=>x===old?{...item,callId:old.callId,latestCallId:item.callId,seq:old.seq}:x):[...items,item].slice(-4);};
  const coordinate=event=>Number.isSafeInteger(event.data?.turn)?event.data.turn:null;
  function update(context,match){
    const event=match.event,old=context.state??{items:[],calls:new Map(),anchor:null},state={...old,calls:new Map(old.calls)};
    if(event.type==='assistant/message'||event.type==='assistant/live-chunk')state.anchor=old.anchor??event.seq;
    function argumentsFor(callId,name,raw,append=false){
      if(!VIE_TOOL_NAMES.has(name)&&!state.calls.has(callId))return;
      const call=state.calls.get(callId)??{name,raw:'',decoder:new IncrementalToolArguments({fields:['source','spec','document','kind','preset','placement','query','templateId','parameters']}),preview:new DocumentPreview()};
      call.raw=append?call.raw+(raw??''):raw??call.raw;
      if(call.raw.length>1048576)return;
      const fields=call.decoder.update(call.raw);state.calls.set(callId,call);while(state.calls.size>4)state.calls.delete(state.calls.keys().next().value);
      // New live calls belong to their own chronological surface. The turn-wide
      // aggregator remains available for explicit start and historical results.
      if(fields.placement!=='start')return;
      const source=sourceFromArguments(fields,call.preview);
      state.items=merge(state.items,{callId,source,title:call.preview.title??'交互解释',seq:event.seq,pending:true});
    }
    if(event.type==='assistant/live-chunk'){
      const c=event.data.chunk;
      if(c.type==='tool-call-delta')argumentsFor(String(c.id),c.name,c.argumentsDelta,true);
    }else if(event.type==='assistant/message'){
      for(const b of event.data.message?.content??[])if(b.type==='tool-call')argumentsFor(String(b.id),b.name,b.arguments);
    }else if(event.type==='tool/call')argumentsFor(String(event.data.callId),event.data.name,event.data.arguments);
    else if(event.type==='tool/result'){
      const meta=event.data.meta,callId=String(event.data.message?.source?.callId??'');
      if(meta?.kind==='vie'){
        state.calls.delete(callId);
        if(effectiveVIEPlacement(meta)!=='start')state.items=state.items.filter(x=>x.callId!==callId);
        else if(meta.valid===true&&event.data.message?.isError!==true&&callId&&typeof meta.source==='string'&&new TextEncoder().encode(meta.source).length<=LIMITS.bytes)
          state.items=merge(state.items,{callId,visualId:meta.visualId,source:meta.source,title:String(meta.title??'交互解释').slice(0,120),caption:String(meta.caption??'').slice(0,140),seq:event.seq,pending:false});
        else state.items=merge(state.items,{callId,visualId:meta.visualId,source:'',title:'图解未完成',error:String(meta.error??meta.errors?.[0]??'图解校验失败').slice(0,500),seq:event.seq,pending:false});
      }
    }else if(event.type==='turn/end')state.items=state.items.map(x=>({...x,pending:false,interrupted:x.pending===true}));
    if(state.items.length&&state.anchor===null)state.anchor=state.items[0].seq;
    return state;
  }
  return {kind:VIE_ANSWER_KIND,target:'chat',
    match(event){if(coordinate(event)===null)return null;if(['assistant/message','assistant/live-chunk','turn/end'].includes(event.type)||event.type==='tool/call'&&VIE_TOOL_NAMES.has(event.data.name)||event.type==='tool/result'&&event.data.meta?.kind==='vie')return {id:String(event.data.turn),role:'start'};return null;},
    start(context,match){return update({...context,state:undefined},match);},update,
    publication:match=>match.event.type==='assistant/live-chunk'?'animation-frame':'immediate',
    buildViewNode(context){
      const s=context.state;if(!s?.items.length){const current=context.current?.get('chat');return current?{...current,visibility:'hidden',data:{items:[]}}:null;}
      return {key:context.key,id:context.id,kind:VIE_ANSWER_KIND,target:'chat',anchorSeq:Math.max(0,(s.anchor??s.items[0].seq)-0.04),
        location:context.start?.location??context.matches[0]?.location??{kind:'unresolved'},visibility:'visible',groupTree:'turn',data:{items:s.items}};
    }
  };
}
