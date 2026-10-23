/** One chronological Chat node per logical visual, alongside native assistant prose. */
const VIE_FLOW_KIND='vie-flow-answer';
/** Publish only public prose outside the completed-process disclosure.
 * Reuse Harness's assistant-step renderer (Markdown/math/links), never VIE text.
 * Original events remain intact in the diagnostic process transcript.
 */
function createVIEProseDefinition(){
  return {kind:'vie-flow-prose',target:'chat',
    match(event){return event.type==='assistant/message'&&Number.isSafeInteger(event.data?.turn)&&Number.isSafeInteger(event.data?.step)?{id:event.data.turn+':'+event.data.step,role:'start'}:null;},
    start(_ctx,match){return {seq:match.event.seq};},
    update(_ctx,match){return {seq:match.event.seq};},
    publication:()=> 'immediate',
    buildViewNode(context){
      const loc=context.start?.location??context.matches[0]?.location,turn=loc?.turn;
      const hidden=()=>context.current?.get('chat')?{...context.current.get('chat'),visibility:'hidden'}:null;
      if(loc?.kind!=='step'||turn?.status!=='closed')return hidden();
      if(turn.data?.get(VIE_TURN_KIND)?.flow!==true)return hidden();
      const data=loc.step.data.get('assistant-step');
      if(!data||data.status==='running')return hidden();
      const answer=turn.data.get('turn-process');
      // The native final answer already survives folding; do not repeat it.
      if(answer?.answerStep===data.step)return hidden();
      if(!answer&&turn.steps.at(-1)?.step===data.step&&!data.blocks.some(b=>b.kind==='tool-call'))return hidden();
      const blocks=data.blocks.filter(b=>b.kind==='text'&&b.text?.trim());
      if(!blocks.length)return hidden();
      return {key:context.key,id:context.id,kind:'assistant-step',target:'chat',anchorSeq:context.state.seq-0.02,location:loc,groupTree:'turn',visibility:'visible',data:{...data,blocks}};
    }
  };
}
function flowVIECall(event){
  if(event.type==='tool/result'&&event.data.meta?.kind==='vie')return {id:String(event.data.meta.anchorCallId??event.data.message?.source?.callId??''),result:true};
  if(event.type==='tool/call'&&VIE_TOOL_NAMES.has(event.data.name))return {id:String(event.data.callId),name:event.data.name,raw:event.data.arguments};
  if(event.type==='assistant/live-chunk'&&event.data.chunk?.type==='tool-call-delta'){
    const c=event.data.chunk;return {id:String(c.id??''),name:c.name,raw:c.argumentsDelta,append:true};
  }
  if(event.type==='assistant/message'){
    const calls=(event.data.message?.content??[]).filter(b=>b.type==='tool-call'&&VIE_TOOL_NAMES.has(b.name));
    // Each tool/call still gets its own node when parallel calls share a message.
    const prose=(event.data.message?.content??[]).some(b=>b.type==='text'&&b.text?.trim());
    // A settled message can contain prose followed by a tool call. In cold history
    // the later tool/call event, not this message, is that graphic's anchor.
    if(calls.length===1&&!prose){const c=calls[0];return {id:String(c.id),name:c.name,raw:c.arguments};}
  }
  return null;
}
function createVIEFlowDefinition(){
  function update(context,match){
    const event=match.event,call=flowVIECall(event),old=context.state;
    const s=old?{...old}:{anchor:event.seq,callId:call.id,raw:'',name:call.name,decoder:new IncrementalToolArguments({fields:['source','spec','document','kind','preset','placement','query','templateId','parameters','visualId','changes']}),preview:new DocumentPreview(),item:null};
    if(call.result){
      const meta=event.data.meta,latestCallId=String(event.data.message?.source?.callId??call.id);
      if(effectiveVIEPlacement(meta)!=='flow'){s.item=null;return s;}
      const valid=meta.valid===true&&event.data.message?.isError!==true&&typeof meta.source==='string'&&new TextEncoder().encode(meta.source).length<=LIMITS.bytes;
      if(!valid&&s.item?.source&&!s.item.pending){s.item={...s.item,latestCallId,repairError:String(meta.error??'修订失败').slice(0,500)};return s;}
      s.item={callId:s.callId,latestCallId,visualId:meta.visualId,source:valid?meta.source:'',title:String(meta.title??'交互解释').slice(0,120),caption:String(meta.caption??'').slice(0,140),pending:false,...valid?{}:{error:String(meta.error??meta.errors?.[0]??'图解校验失败').slice(0,500)}};
      return s;
    }
    s.name=call.name??s.name;if(!VIE_TOOL_NAMES.has(s.name))return s;
    s.raw=call.append?s.raw+(call.raw??''):call.raw??s.raw;
    if(typeof s.raw!=='string'||s.raw.length>1048576)return s;
    const fields=s.decoder.update(s.raw);
    if(fields.placement&&fields.placement!=='flow'||fields.visualId||fields.changes){s.item=null;return s;}
    const source=sourceFromArguments(fields,s.preview);
    // An echoed completed call must not overwrite a terminal validated result.
    if(!s.item||s.item.pending)s.item={callId:s.callId,source,title:s.preview.title??'交互解释',pending:true};
    return s;
  }
  return {kind:VIE_FLOW_KIND,target:'chat',
    match(event){if(!Number.isSafeInteger(event.data?.turn))return null;const call=flowVIECall(event);return call?.id?{id:call.id,role:'start'}:null;},
    start(context,match){return update({...context,state:undefined},match);},update,
    publication:match=>match.event.type==='assistant/live-chunk'?'animation-frame':'immediate',
    buildViewNode(context){
      const s=context.state;if(!s?.item){const current=context.current?.get('chat');return current?{...current,visibility:'hidden',data:{items:[]}}:null;}
      const location=context.start?.location??context.matches[0]?.location??{kind:'unresolved'};
      const interrupted=s.item.pending&&location.turn?.status==='closed';
      const item=interrupted?{...s.item,pending:false,interrupted:true}:s.item;
      return {key:context.key,id:context.id,kind:VIE_FLOW_KIND,target:'chat',anchorSeq:Math.max(0,s.anchor-0.04),location,visibility:'visible',groupTree:'turn',data:{items:[item]}};
    }
  };
}
