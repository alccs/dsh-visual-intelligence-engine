/** Generated figure UI is independent of chat assembly and native renderers. */
  function FigureView({config,nodeId,store,inputActions}){
    const frame=React.useRef(null),controller=React.useRef(null),appliedConfig=React.useRef(null);
    const [error,setError]=React.useState(''),[small,setSmall]=React.useState(false),[warnings,setWarnings]=React.useState([]),[fallback,setFallback]=React.useState(false),[waiting,setWaiting]=React.useState(true);
    const container=React.useRef(null),expandButton=React.useRef(null);
    const [expanded,toggle]=useVisualExpansion(container,expandButton);
    const isCurrent=definition=>{const node=store.parser.scene.nodes.get(nodeId);return node?.type==='GenerativeFigure'&&JSON.stringify(node.props)===JSON.stringify(definition);};
    const acceptsCallback=()=>appliedConfig.current!==null&&isCurrent(appliedConfig.current);
    React.useEffect(()=>{
      // A retained store can advance in the parent's layout effect before this
      // view mounts. Never execute or report the previous render's definition.
      if(!isCurrent(config))return;
      setFallback(false);setWaiting(!['ready','preview'].includes(frame.current?.dataset.vieStatus));appliedConfig.current=config;
      if(controller.current){controller.current.revise(config);return;}
      controller.current=mountGeneratedFigure(frame.current,config,{
        initialState:store.local(nodeId)??config.state,
        onChange:state=>{if(acceptsCallback())store.setLocal(nodeId,state);},
        currentState:()=>store.local(nodeId),
        onError:message=>{if(acceptsCallback()){setError(message);if(message)setWaiting(false);else if(frame.current?.dataset.vieStatus==='loading')setWaiting(true);store.setFigureError(nodeId,message);}},
        onClose:()=>{if(acceptsCallback())container.current?.dispatchEvent(new CustomEvent('vie:close'));},
        onWarnings:next=>{if(acceptsCallback()){setWarnings(previous=>JSON.stringify(previous)===JSON.stringify(next)?previous:next);store.setFigureWarnings(nodeId,next);}},
        onWaiting:metrics=>{if(acceptsCallback()){setWaiting(true);store.setFigureProgress(nodeId,'waiting',metrics);}},
        onVisible:metrics=>{if(acceptsCallback())store.setFigureProgress(nodeId,store.figureStatuses[nodeId]==='ready'?'ready':'preview',metrics);},
        onPreview:metrics=>{if(acceptsCallback()){setWaiting(false);store.setFigureProgress(nodeId,'preview',metrics);}},
        onReady:metrics=>{if(acceptsCallback()){setWaiting(false);store.setFigureReady(nodeId,metrics);}}
      });
    },[store,nodeId,JSON.stringify(config)]);
    React.useEffect(()=>{const unsubscribe=store.subscribe(()=>{if(!acceptsCallback())return;try{controller.current?.update(store.local(nodeId)??appliedConfig.current.state);}catch(error){setError(error.message);}});return ()=>{unsubscribe();appliedConfig.current=null;controller.current?.dispose();controller.current=null;};},[store,nodeId]);
    React.useEffect(()=>{const observer=new MutationObserver(()=>setSmall(frame.current?.dataset.vieSmallText==='true'));observer.observe(frame.current,{attributes:true,attributeFilter:['data-vie-small-text']});return ()=>observer.disconnect();},[]);
    return h('section',{ref:container,className:'vie-generated-figure'+(expanded?' vie-figure-expanded':''),key:nodeId,role:expanded?'dialog':undefined,'aria-modal':expanded?true:undefined,'aria-label':expanded?config.title:undefined},[
      h('header',{key:'head',className:'vie-generated-heading'},[h('h3',{key:'title',title:config.title},config.title),h('div',{className:'vie-figure-actions',key:'actions'},[h('button',{type:'button',key:'expand',ref:expandButton,className:'vie-context-button','aria-expanded':expanded,onClick:toggle},expanded?'收起':'展开'),(config.js?.trim()||Object.keys(config.state??{}).length>0)&&h('button',{type:'button',key:'reset',className:'vie-context-button',onClick:()=>controller.current?.reset()},'复位')])]),
      waiting&&!error&&h('p',{key:'waiting',className:'vie-figure-hint',role:'status','data-vie-waiting':true},'正在等待图形内容…'),
      config.preview&&!waiting&&h('p',{key:'preview',className:'vie-figure-hint',role:'status'},'正在生成，当前为静态预览。'),
      fallback&&h('p',{key:'fallback',className:'vie-figure-hint',role:'status'},'当前显示只读静态预览，交互脚本未运行。'),
      warnings.length>0&&!fallback&&h('p',{key:'layout',className:'vie-figure-hint',role:'status','data-vie-layout-warning':true},warnings.map(item=>item.message).join(' ')),
      small&&!expanded&&h('p',{key:'small',className:'vie-figure-hint',role:'status'},'图中文字较小，可展开查看。'),
      h('div',{key:'viewport',className:'vie-figure-viewport','aria-hidden':!!error&&!fallback||undefined,style:error&&!fallback?{height:0,overflow:'hidden'}:waiting?{maxHeight:'36px',overflow:'hidden'}:undefined},h('iframe',{key:'frame',ref:frame,title:config.title,sandbox:'allow-scripts',referrerPolicy:'no-referrer',allow:"camera 'none'; microphone 'none'; geolocation 'none'; clipboard-read 'none'; clipboard-write 'none'",style:{width:'100%',maxWidth:'100%',height:config.height+'px',border:0,opacity:waiting?0:undefined,pointerEvents:waiting?'none':undefined},'data-vie-generated':nodeId})),
      error&&h('div',{key:'error'},[h('p',{key:'message',className:'vie-generated-error',role:'alert'},'交互图运行错误：'+error),!fallback&&/<(?:svg|img|table|p|h[1-6])\b/i.test(config.html)&&h('button',{key:'static',type:'button',className:'vie-context-button',onClick:()=>{controller.current?.showStaticPreview();setFallback(true);}},'查看静态预览'),inputActions?.insertText&&h('button',{key:'repair',type:'button',className:'vie-context-button',onClick:()=>{const index=Number(nodeId.replace(/^block/,''))-1,text='请仅修复图「'+config.title+'」的第'+(index+1)+'个图块，保留其余图和正文。浏览器错误：'+error+'。使用该图最近返回的visualId、baseRevision和changes进行局部修订。';inputActions.insertText(text,inputActions.captureInsertion());}},'修复这张图')])
    ]);
  }
