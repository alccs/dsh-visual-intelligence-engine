/** Only the reserved telemetry subcommand is hidden; normal /vie results stay readable. */
function isVIEInternalCommand(node){return node?.name==='vie'&&typeof node.args==='string'&&/^\s*__render(?:\s|$)/.test(node.args);}
function VIECommandView({node}){
 const h=React.createElement,internal=isVIEInternalCommand(node),marker=React.useRef(null);
 React.useLayoutEffect(()=>{
  if(!internal)return;
  const row=marker.current?.closest('[data-chat-node-key]');if(!row)return;
  const prior=row.hidden,id=String(node.commandId);row.dataset.vieInternalCommand=id;row.hidden=true;
  return ()=>{if(row.dataset.vieInternalCommand===id){row.hidden=prior;delete row.dataset.vieInternalCommand;}};
 },[internal,node.commandId]);
 if(internal)return h('span',{ref:marker,hidden:true,'aria-hidden':true,'data-vie-internal-command':true});
 const outcome=node.outcome,body=typeof outcome?.text==='string'?outcome.text:'',failed=outcome?.kind==='error',label='/vie'+(node.args?.trim()?' '+node.args.trim():'');
 const summary=outcome===null?'执行中…':failed?'执行失败':body&&body.length<160&&!body.includes('\n')?body:'执行完成';
 return h('div',{className:'vie-command-view','data-vie-manual-command':true,role:failed?'alert':'status'},[
  h('div',{key:'line',className:'vie-command-line'},[h('code',{key:'name'},label),h('span',{key:'result'},summary)]),
  body&&summary!==body&&h('details',{key:'body'},[h('summary',{key:'summary'},'查看结果'),h('pre',{key:'text'},body)])
 ]);
}
