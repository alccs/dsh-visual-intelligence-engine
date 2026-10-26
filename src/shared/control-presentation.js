/** Presentation only: never write control values or dispatch application events. */
function updateRangePresentation(input){
  if(input?.type!=='range')return;
  const min=input.min===''?0:Number(input.min),max=input.max===''?100:Number(input.max),value=Number(input.value);
  const percent=Number.isFinite(min)&&Number.isFinite(max)&&Number.isFinite(value)&&max>min?Math.max(0,Math.min(100,(value-min)/(max-min)*100)):0;
  const fill=Number(percent.toFixed(4))+'%';
  if(input.style.getPropertyValue('--vie-range-fill')!==fill)input.style.setProperty('--vie-range-fill',fill);
}
function installControlPresentation(root){
  const win=root.ownerDocument.defaultView,inputs=new Set();let pending=0,disposed=false;
  const add=node=>{if(node.nodeType!==1||node.namespaceURI!=='http://www.w3.org/1999/xhtml')return;
    if(node.matches('input[type="range"]'))inputs.add(node);
    for(const input of node.querySelectorAll('input[type="range"]'))inputs.add(input);
  };
  const refresh=()=>{if(disposed)return;for(const input of inputs){if(!root.contains(input)||input.type!=='range')inputs.delete(input);else updateRangePresentation(input);}};
  const schedule=()=>{if(!pending&&!disposed)pending=win.requestAnimationFrame(()=>{pending=0;refresh();});};
  const change=event=>updateRangePresentation(event.target);
  const click=event=>{if(event.target.closest?.('button'))schedule();};
  add(root);refresh();
  const observer=new win.MutationObserver(records=>{let changed=false;for(const record of records){
    if(record.type==='attributes'){add(record.target);updateRangePresentation(record.target);continue;}
    for(const node of record.addedNodes){const before=inputs.size;add(node);if(inputs.size!==before)changed=true;}
    if(record.removedNodes.length)changed=true;
  }if(changed)schedule();});
  observer.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['type','value','min','max']});
  root.addEventListener('input',change,true);root.addEventListener('change',change,true);
  root.addEventListener('click',click,true);
  win.addEventListener('vie:statechange',schedule);
  return {refresh,dispose(){if(disposed)return;disposed=true;observer.disconnect();win.cancelAnimationFrame(pending);root.removeEventListener('input',change,true);root.removeEventListener('change',change,true);root.removeEventListener('click',click,true);win.removeEventListener('vie:statechange',schedule);inputs.clear();}};
}
