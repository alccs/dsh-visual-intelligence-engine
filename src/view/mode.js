/** Composer mode picker using the Harness model selector's sizing and theme tokens. */
function createVIEModeView(React,ReactDOM){
  const items=[{id:'auto',label:'自动'},{id:'on',label:'本聊天启用'},{id:'study',label:'学习模式'},{id:'off',label:'关闭'}];
  return function VIEModeControl({useProjection,locked,flip}){
    const view=useProjection('dsh-vie:mode'),[busy,setBusy]=React.useState(false),[error,setError]=React.useState(''),[open,setOpen]=React.useState(false),[position,setPosition]=React.useState(null);
    const trigger=React.useRef(null),menu=React.useRef(null),alive=React.useRef(true),id=React.useId(),disabled=!!locked||busy||!!view?.pending;
    React.useEffect(()=>{alive.current=true;return ()=>{alive.current=false;};},[]);
    const close=restore=>{setOpen(false);setPosition(null);if(restore)trigger.current?.focus({preventScroll:true});};
    React.useEffect(()=>{if(disabled||!view)close(false);},[disabled,!!view]);
    React.useLayoutEffect(()=>{
      if(!open||!trigger.current)return;
      const win=trigger.current.ownerDocument.defaultView;
      const reposition=()=>{const rect=trigger.current.getBoundingClientRect(),height=menu.current?.offsetHeight??112,next={left:Math.max(8,Math.min(rect.left,win.innerWidth-176)),...(rect.top>height+14?{bottom:Math.max(8,win.innerHeight-rect.top+6)}:{top:Math.max(8,Math.min(rect.bottom+6,win.innerHeight-height-8))})};setPosition(old=>JSON.stringify(old)===JSON.stringify(next)?old:next);};
      reposition();
      const doc=trigger.current.ownerDocument;
      const outside=event=>{if(!trigger.current?.contains(event.target)&&!menu.current?.contains(event.target))close(false);};
      doc.addEventListener('pointerdown',outside);win.addEventListener('resize',reposition);win.addEventListener('scroll',reposition,true);
      return ()=>{doc.removeEventListener('pointerdown',outside);win.removeEventListener('resize',reposition);win.removeEventListener('scroll',reposition,true);};
    },[open]);
    React.useLayoutEffect(()=>{if(open&&position)menu.current?.querySelector('[aria-checked=true]')?.focus({preventScroll:true});},[open,!!position]);
    async function choose(mode){
      close(true);if(disabled||mode===view.mode)return;
      setBusy(true);setError('');try{await flip(mode);}catch(error){if(alive.current)setError(String(error.message??error));}finally{if(alive.current)setBusy(false);}
    }
    function keys(event){
      if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close(true);return;}
      if(event.key==='Tab'){close(true);return;}
      const buttons=[...menu.current.querySelectorAll('[role=menuitemradio]')],index=buttons.indexOf(event.target);
      const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:event.key==='ArrowDown'?(index+1)%buttons.length:event.key==='ArrowUp'?(index+buttons.length-1)%buttons.length:-1;
      if(next>=0){event.preventDefault();buttons[next].focus({preventScroll:true});}
    }
    if(!view)return null;
    const popup=open?React.createElement('div',{id,ref:menu,className:'vie-mode-menu',role:'menu','aria-label':'本聊天可视化模式',onKeyDown:keys,style:position?{position:'fixed',...position}:undefined},items.map(item=>React.createElement('button',{key:item.id,type:'button',role:'menuitemradio','aria-checked':view.mode===item.id,tabIndex:-1,onClick:()=>choose(item.id)},[
      React.createElement('span',{key:'label'},item.label),React.createElement('span',{key:'check','aria-hidden':true},view.mode===item.id?'✓':'')
    ]))):null;
    return React.createElement('div',{className:'vie-mode-control'},[
      React.createElement('button',{key:'trigger',ref:trigger,type:'button',className:'vie-mode-trigger','aria-label':'本聊天可视化模式','aria-haspopup':'menu','aria-expanded':open,'aria-controls':open?id:undefined,'aria-busy':busy||view.pending||undefined,disabled,title:'本聊天可视化：'+items.find(x=>x.id===view.mode)?.label,onClick:()=>{if(!disabled)setOpen(!open);},onKeyDown:event=>{if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();setOpen(true);}}},[
        React.createElement('span',{key:'label',className:'vie-mode-label'},'VIE · '+(items.find(x=>x.id===view.mode)?.label??'自动')),
        React.createElement('svg',{key:'chevron',className:'vie-mode-chevron',width:16,height:16,viewBox:'0 0 16 16','aria-hidden':true},React.createElement('path',{d:'m4 6 4 4 4-4',fill:'none',stroke:'currentColor',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}))
      ]),popup&&(ReactDOM?.createPortal?ReactDOM.createPortal(popup,trigger.current.ownerDocument.body):popup),
      (error||view.status)&&React.createElement('span',{key:'error',role:'status'},error||view.status)
    ]);
  };
}
