/** Native content acknowledges readiness and visible painting through the same bridge. */
function NativeVisualFrame({title,children,nodeId,store,signature}){
 const container=React.useRef(null),button=React.useRef(null);
 const [expanded,toggle]=useVisualExpansion(container,button);
 React.useEffect(()=>{
  if(!store||!nodeId)return;
  const element=container.current,doc=element.ownerDocument,win=doc.defaultView,started=win.performance.now(),metrics={},frames=new Set();let ready=false,disposed=false;
  store.setFigureError(nodeId,'');
  const later=fn=>{const id=win.requestAnimationFrame(()=>{frames.delete(id);if(!disposed)fn();});frames.add(id);};
  const paint=()=>{if(!ready||metrics.visibleMs!==undefined||doc.hidden)return;const box=element.getBoundingClientRect();if(box.width&&box.height&&box.bottom>0&&box.top<win.innerHeight&&box.right>0&&box.left<win.innerWidth){metrics.visibleMs=win.performance.now()-started;store.setFigureReady(nodeId,metrics);}};
  later(()=>later(()=>{const error=element.querySelector('[role="alert"],.vie-error');if(error){store.setFigureError(nodeId,error.textContent);return;}ready=true;metrics.readyMs=win.performance.now()-started;store.setFigureReady(nodeId,metrics);paint();}));
  const observe=()=>later(()=>later(paint));
  const observer=win.IntersectionObserver?new win.IntersectionObserver(entries=>{if(entries[0]?.isIntersecting)observe();}):null;
  observer?.observe(element);doc.addEventListener('visibilitychange',observe);
  return ()=>{disposed=true;observer?.disconnect();doc.removeEventListener('visibilitychange',observe);for(const id of frames)win.cancelAnimationFrame(id);};
 },[store,nodeId,signature]);
 return h('section',{ref:container,className:'vie-native-frame'+(expanded?' vie-figure-expanded':''),role:expanded?'dialog':undefined,'aria-modal':expanded?true:undefined,'aria-label':title||'可视化图形'},[
  h('header',{key:'head',className:'vie-generated-heading','aria-label':'图形查看操作'},h('div',{className:'vie-figure-actions'},h('button',{ref:button,type:'button',className:'vie-context-button','aria-expanded':expanded,onClick:toggle},expanded?'收起':'展开'))),children
 ]);
}
