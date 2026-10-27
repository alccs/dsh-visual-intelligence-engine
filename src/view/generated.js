/** Generated code runs only inside an opaque-origin iframe, never the host DOM. */
function figureBootstrap(config){
  /* @include shared/control-presentation.js */
  /* @include shared/learning.js */
  /* @include view/learning.js */
  /* @include runtime/graphics.js */
  /* @include runtime/scene3d.js */
  /* @include runtime/ui.js */
  /* @include runtime/layout-audit.js */
  /* @include runtime/content.js */
  /* @include runtime/preview.js */
  let state=config.state,theme=config.theme,visible=true,failed=false,contentRuntime;
  const post=(type,value)=>{try{parent.postMessage({v:1,channel:config.channel,type,value},'*');}catch{}};
  let readyPreview=!!config.preview,phaseReady=false,readyMeaningful=false,contentPoll=0,emptyProbes=0;
  const probe=()=>inspectFigureContent(document.getElementById('vie-root'));
  const reportPaint=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{const content=probe();if(visible&&!failed&&content.meaningful)post('painted',{preview:readyPreview,content});}));
  const reportReady=value=>{readyPreview=!!value.preview;phaseReady=true;const content=probe();readyMeaningful=content.meaningful;post('ready',{...value,content});if(readyMeaningful){clearTimeout(contentPoll);contentPoll=0;emptyProbes=0;reportPaint();}else if(!failed&&!contentPoll)contentPoll=setTimeout(()=>{contentPoll=0;if(!failed&&phaseReady)reportReady({ok:true,preview:readyPreview});},Math.min(4000,400*Math.pow(2,Math.floor(emptyProbes++/4))));};
  const reportError=error=>{failed=true;clearTimeout(contentPoll);contentPoll=0;post('error',String(error?.message??error).slice(0,1200));};
  const applyTheme=value=>{
    theme=value;document.documentElement.dataset.theme=value.mode;
    for(const [key,color]of Object.entries(value.colors??{}))document.documentElement.style.setProperty('--vie-'+key,color);
    document.documentElement.style.colorScheme=value.mode;
    window.dispatchEvent(new CustomEvent('vie:themechange',{detail:value}));
  };
  window.VIE={get state(){return state;},get theme(){return theme;},get visible(){return visible;},get reducedMotion(){return !!theme.reducedMotion;},
    title:config.title,setState(value){if(!value||typeof value!=='object'||Array.isArray(value))throw Error('VIE.setState expects an object');state=value;window.dispatchEvent(new CustomEvent('vie:statechange',{detail:state}));post('state',value);},contentReady(target){const node=typeof target==='string'?document.querySelector(target):target??document.querySelector('#vie-root canvas');if(node?.localName!=='canvas'||!document.getElementById('vie-root')?.contains(node))throw Error('VIE.contentReady requires a canvas inside the figure');node.dataset.vieContentReady='true';},reportError,mountLearning};
  installGraphicsRuntime(window.VIE);installScene3DRuntime(window.VIE);installFigureUI(window.VIE);
  document.documentElement.dataset.vieRuntime='graphics-v1';
  window.addEventListener('message',event=>{
    if(event.source!==parent||event.data?.channel!==config.channel)return;
    if(event.data.type==='theme')applyTheme(event.data.value);
    if(event.data.type==='state'){state=event.data.value;window.dispatchEvent(new CustomEvent('vie:statechange',{detail:state}));}
    if(event.data.type==='visibility'){visible=!!event.data.value;window.dispatchEvent(new CustomEvent('vie:visibilitychange',{detail:visible}));if(visible&&document.readyState!=='loading')reportPaint();}
    if(event.data.type==='preview'&&config.preview)contentRuntime?.update(event.data.value);
    if(event.data.type==='finalize'&&config.preview){state=event.data.value.state;config.staticSvg=!event.data.value.js?.trim();config.preview=false;phaseReady=false;readyMeaningful=false;contentRuntime?.finalize(event.data.value);}
  });
  window.addEventListener('error',event=>reportError(event.message));
  window.addEventListener('unhandledrejection',event=>reportError(event.reason));
  document.addEventListener('submit',event=>event.preventDefault(),true);
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();post('close',null);}});
  window.addEventListener('pagehide',()=>clearTimeout(contentPoll),{once:true});
  document.addEventListener('click',event=>{const a=event.target.closest?.('a[href]');if(a&&!a.getAttribute('href').startsWith('#'))event.preventDefault();},true);
  applyTheme(config.theme);
  document.addEventListener('DOMContentLoaded',()=>{
    const root=document.getElementById('vie-root'),controlPresentation=installControlPresentation(root);let frame=0,last='',lastAudit=-Infinity,layoutWarnings=[],minFont=14,auditTimer=0;
    window.addEventListener('pagehide',()=>controlPresentation.dispose(),{once:true});
    let staticFitInstalled=false;
    const fitStaticSvg=()=>{if(staticFitInstalled||!config.staticSvg||root.children.length!==1||root.firstElementChild.tagName.toLowerCase()!=='svg')return;
      staticFitInstalled=true;
      const svg=root.firstElementChild,box=svg.viewBox.baseVal;
      // A viewBox lets the browser scale geometry and text together. Never enlarge
      // a static figure past its viewport to enforce a font floor: hidden overflow
      // made its right edge disappear. Small text is reported for the expand hint.
      if(box.width>0&&box.height>0){svg.style.width='100%';svg.style.minWidth='0';svg.style.maxWidth='100%';svg.style.height='auto';}
    };
    contentRuntime=createFigureContentRuntime(root,config,()=>{fitStaticSvg();measure(true);reportReady({ok:!failed,preview:false});});
    if(config.preview)try{contentRuntime.update({html:config.previewHtml,css:config.previewCss});}catch(error){reportError(error);}
    fitStaticSvg();
    const measure=(force=false)=>{const immediate=force===true;if(frame&&!immediate)return;if(frame){cancelAnimationFrame(frame);frame=0;}const run=()=>{frame=0;
      // scrollHeight includes positioned children; a small rounding allowance prevents
      // subpixel overflow from repeatedly adding/removing the Windows scrollbar gutter.
      if(immediate||performance.now()-lastAudit>=250){lastAudit=performance.now();layoutWarnings=inspectFigureLayout(root);const fonts=[...root.querySelectorAll('svg text')].slice(0,200).filter(t=>t.textContent.trim()).map(t=>parseFloat(getComputedStyle(t).fontSize)*Math.hypot(t.getScreenCTM()?.a??1,t.getScreenCTM()?.b??0));minFont=fonts.length?Math.min(...fonts):14;}else if(!auditTimer)auditTimer=setTimeout(()=>{auditTimer=0;measure();},Math.max(1,251-(performance.now()-lastAudit)));
      const value={height:Math.ceil(Math.max(root.getBoundingClientRect().height,root.scrollHeight))+2,width:document.documentElement.scrollWidth,viewport:innerWidth,minFont,layoutWarnings},signature=JSON.stringify(value);
      if(signature!==last){last=signature;post('height',value);}
      if(phaseReady&&!readyMeaningful&&!failed&&probe().meaningful)reportReady({ok:true,preview:readyPreview});
    };if(immediate)run();else frame=requestAnimationFrame(run);};
    window.addEventListener('pagehide',()=>clearTimeout(auditTimer),{once:true});
    new ResizeObserver(measure).observe(root);
    new MutationObserver(measure).observe(root,{childList:true,subtree:true,attributes:true,characterData:true});
    window.addEventListener('resize',measure);root.addEventListener('load',measure,true);document.fonts?.ready.then(measure);
    measure(true);reportReady({ok:!failed,preview:!!config.preview});
  },{once:true});
}
const FIGURE_BASE_CSS=`*{box-sizing:border-box}html,body{margin:0;background:transparent;color:var(--vie-ink,#243044);font:14px/1.65 system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif}#vie-root{display:flow-root;padding:14px;overflow-wrap:anywhere;min-width:0}button,input,select,textarea{font:inherit}button{cursor:pointer;border:1px solid var(--vie-stroke,#dce3ec);background:var(--vie-layer,#f4f6fa);color:inherit;border-radius:8px;min-height:34px;padding:5px 11px}input[type=range]{accent-color:var(--vie-accent,#5483ef);max-width:100%}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--vie-accent,#5483ef);outline-offset:3px}svg,canvas{display:block;max-width:100%;height:auto}label{display:block}.muted{color:var(--vie-muted,#718096)}.controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.card{border:1px solid var(--vie-stroke,#dce3ec);border-radius:12px;padding:12px;background:var(--vie-layer,#f4f6fa)}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}`;
// Sandboxed content only. Keep overflow scrollable without native tracks or arrow buttons.
const FIGURE_SCROLL_CSS='html,body,#vie-root,#vie-root *{scrollbar-width:none!important}html::-webkit-scrollbar,body::-webkit-scrollbar,#vie-root::-webkit-scrollbar,#vie-root *::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}';
/* @include view/three-loader.js */
const FIGURE_CONTROL_CSS=/* @style styles/controls.css */ "";
function buildFigureDocument(raw,{channel,state,theme}){
  const spec=validateFigureDefinition(raw,true),safeScript=x=>x.replace(/<\/script/gi,'<\\/script');
  const settings=JSON.stringify({channel,title:spec.title,state:validateFigureState(state??spec.state),theme,staticSvg:!spec.js.trim()&&!spec.preview,preview:!!spec.preview,previewHtml:spec.preview?spec.html:undefined,previewCss:spec.preview?spec.css:undefined}).replace(/</g,'\\u003c');
  const library=/scene3d|\bTHREE\b/.test(spec.js+' '+spec.html)?'<script>'+safeScript(VIE_THREE_LIBRARY)+'</script>':'';
  const csp="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; media-src data: blob:; connect-src 'none'; object-src 'none'; frame-src 'none'; worker-src 'none'; base-uri 'none'; form-action 'none'";
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${csp}"><style>${FIGURE_BASE_CSS}\n.vie-learn{border:0;border-radius:0;padding:0;display:grid;gap:12px}.vie-learn-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.vie-learn-heading small,.vie-learn-note{color:var(--vie-muted);font-size:12px}.vie-learn-panel{min-width:0;overflow:auto}.vie-learn-panel svg{width:100%;display:block}.vie-learn-tabs{display:flex;gap:8px;flex-wrap:wrap}.vie-learn-tabs button{flex:1 1 120px;border-radius:999px;background:transparent;color:var(--vie-ink);border:1px solid var(--vie-stroke);font-size:13px;min-height:38px}.vie-learn-tabs button[aria-selected=true]{background:var(--vie-ink);color:var(--vie-bg);border-color:var(--vie-ink)}.vie-learn-description{background:var(--vie-layer);border-radius:14px;padding:12px}.vie-learn-description p{margin:4px 0 0;font-size:14px}.vie-learn-quiz{border:0;min-width:0;margin:0;padding:0}.vie-learn-quiz legend{font-weight:600;margin-bottom:12px}.vie-learn-choices{display:grid;gap:12px}.vie-learn-choices label{display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:14px}.vie-learn-choices input{flex:none;accent-color:var(--vie-primary)}.vie-learn-feedback{margin-top:14px;border-radius:12px;padding:12px;background:var(--vie-layer)}.vie-learn-feedback[data-correct=true]{border-left:3px solid var(--vie-secondary)}.vie-learn-feedback[data-correct=false]{border-left:3px solid var(--vie-warning)}@media(max-width:440px){.vie-learn{padding:0}.vie-learn-tabs button{flex-basis:88px;font-size:13px}.vie-learn-panel>svg{width:100%;height:auto}}\n.vie-questions{display:grid;gap:12px}.vie-question-top{display:flex;justify-content:space-between;gap:8px}.vie-question-pill{font-size:12px;border-radius:999px;padding:3px 10px;background:var(--vie-layer);color:var(--vie-muted)}.vie-question-progress{width:100%;height:5px;accent-color:var(--vie-primary)}.vie-question-stem{margin:0;font-size:16px;line-height:1.65}.vie-question-options{display:grid;gap:8px}.vie-question-option{display:flex;align-items:center;gap:10px;text-align:left;width:100%;min-height:44px;border-radius:10px;background:var(--vie-bg);border:1px solid var(--vie-stroke);padding:10px 12px}.vie-question-letter{display:grid;place-items:center;flex:none;width:24px;height:24px;border-radius:6px;background:var(--vie-layer);font-weight:600}.vie-question-option.is-correct{border-color:var(--vie-secondary);background:color-mix(in srgb,var(--vie-secondary) 12%,var(--vie-bg))}.vie-question-option.is-wrong{border-color:var(--vie-warning);background:color-mix(in srgb,var(--vie-warning) 12%,var(--vie-bg))}.vie-question-feedback{border-left:3px solid var(--vie-primary);background:var(--vie-layer);padding:10px 12px;font-size:14px}.vie-question-feedback p{margin:5px 0 0}.vie-question-foot{display:flex;justify-content:flex-end}.vie-question-next{background:var(--vie-primary);color:var(--vie-bg);border:0;padding:8px 16px}.vie-question-next:disabled{opacity:.45;cursor:not-allowed}.vie-question-result{font-size:40px;color:var(--vie-primary)}\n${FIGURE_SCROLL_CSS}</style><style id="vie-user-style">${spec.css.replace(/<\/style/gi,'<\\/style')}</style><style id="vie-control-style">${FIGURE_CONTROL_CSS.replaceAll('[data-vie-runtime]','[data-vie-runtime] #vie-root')}</style>${library}<script>(${safeScript(figureBootstrap.toString())})(${settings});</script></head><body><div id="vie-root">${spec.preview?'':spec.html}</div><script>${safeScript(spec.preview?'':spec.js)}</script></body></html>`;
}
function mountGeneratedFigure(frame,raw,options={}){
  let spec=validateFigureDefinition(raw,true);const win=frame.ownerDocument.defaultView;
  let state=validateFigureState(options.initialState??spec.state),channel='',disposed=false,lastMessage=0,burst=0,criticalBurst=0,pendingState=null,stateTimer=0;
  let loaded=false,startedPreview=false,fallbackMode=false,loadGeneration=0,started=win.performance?.now?.()??Date.now();const metrics={previewMs:null,readyMs:null,visibleMs:null,errors:0};
  const elapsed=()=>Math.round(((win.performance?.now?.()??Date.now())-started)*100)/100;
  const shell=frame.closest('.vie-shell');
  const theme=()=>{
    const css=win.getComputedStyle(shell??frame),explicit=frame.ownerDocument.documentElement.dataset.theme??(frame.ownerDocument.body.classList.contains('dark')?'dark':null);
    return {mode:explicit??(win.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),reducedMotion:win.matchMedia('(prefers-reduced-motion: reduce)').matches,
      colors:Object.fromEntries([['bg','--vie-bg','#fff'],['ink','--vie-ink','#243044'],['muted','--vie-muted','#718096'],['stroke','--vie-stroke','#dce3ec'],['layer','--vie-layer','#f4f6fa'],['accent','--vie-accent','#d58b16'],['primary','--vie-primary','#4d82d6'],['secondary','--vie-secondary','#149f91'],['warning','--vie-warning','#cf6854']].map(([k,token,fallback])=>[k,css.getPropertyValue(token).trim()||fallback]))};
  };
  const send=(type,value)=>{if(!disposed)frame.contentWindow?.postMessage({v:1,channel,type,value},'*');};
  const content=()=>{if(!loaded||!startedPreview||fallbackMode)return;if(needsFigureThree(spec)&&!VIE_THREE_LIBRARY){const generation=loadGeneration;loadFigureThree().then(()=>{if(!disposed&&generation===loadGeneration)content();}).catch(error=>{if(!disposed&&generation===loadGeneration){frame.dataset.vieStatus='error';options.onError?.(error.message);}});return;}if(spec.preview)send('preview',spec);else{startedPreview=false;frame.dataset.vieStatus='loading';send('finalize',{...spec,state,.../scene3d|\bTHREE\b/.test(spec.js+' '+spec.html)?{library:VIE_THREE_LIBRARY}:{}});}};
  const load=()=>{const generation=++loadGeneration;started=win.performance?.now?.()??Date.now();Object.assign(metrics,{previewMs:null,readyMs:null,visibleMs:null,errors:0});for(const key of ['viePreviewMs','vieReadyMs','vieVisibleMs'])delete frame.dataset[key];const sourceSpec=fallbackMode?{...spec,preview:true,js:''}:spec;if(stateTimer)win.clearTimeout(stateTimer);stateTimer=0;pendingState=null;lastMessage=0;burst=0;criticalBurst=0;loaded=false;startedPreview=!!sourceSpec.preview;channel='vie-'+(++svgScopeSequence)+'-'+Math.random().toString(36).slice(2);frame.dataset.vieReady='false';frame.dataset.vieStatus='loading';if(!fallbackMode)options.onError?.('');try{if(needsFigureThree(sourceSpec)&&!VIE_THREE_LIBRARY){loadFigureThree().then(()=>{if(!disposed&&generation===loadGeneration)load();}).catch(error=>{if(!disposed&&generation===loadGeneration){frame.dataset.vieStatus='error';options.onError?.(error.message);}});return;}validateSDKCalls(sourceSpec.js);frame.srcdoc=buildFigureDocument(sourceSpec,{channel,state,theme:theme()});}catch(error){frame.srcdoc='';frame.dataset.vieStatus='error';frame.dataset.vieReady='false';options.onError?.(error.message);}};
  const onMessage=event=>{
    if(disposed||!channel||event.source!==frame.contentWindow||event.data?.channel!==channel||event.data?.v!==1)return;
    const {type,value}=event.data;
    if(!['state','height','ready','painted','error','close'].includes(type))return;
    if(type==='close'){options.onClose?.();return;}
    const now=Date.now();if(now-lastMessage>1000){lastMessage=now;burst=0;criticalBurst=0;}
    if(type==='ready'||type==='error'){if(++criticalBurst>16)return;}
    else if(++burst>60){
      if(type==='state'){
        pendingState=event;
        if(!stateTimer)stateTimer=win.setTimeout(()=>{stateTimer=0;const latest=pendingState;pendingState=null;if(latest)onMessage(latest);},Math.max(1,1001-(now-lastMessage)));
      }
      return;
    }else if(type==='state'&&pendingState){pendingState=null;if(stateTimer){win.clearTimeout(stateTimer);stateTimer=0;}}
    if(type==='height'&&value&&[value.height,value.width,value.viewport].every(v=>typeof v==='number'&&Number.isFinite(v)&&v>=0)){
      if(Array.isArray(value.layoutWarnings))options.onWarnings?.(cleanFigureWarnings(value.layoutWarnings));
      frame.dataset.vieSmallText=String(Number.isFinite(value.minFont)&&value.minFont>0&&value.minFont<11);
      if(Number.isFinite(value.minFont))frame.dataset.vieMinFont=String(value.minFont);
      frame.style.height=Math.min(10000,Math.max(160,value.height))+'px';frame.dataset.vieOverflow=String(value.width>value.viewport+2);frame.dataset.vieContentWidth=String(value.width);frame.dataset.vieViewportWidth=String(value.viewport);frame.dataset.vieContentHeight=String(value.height);
    }
    if(type==='painted'&&!fallbackMode&&!['error','waiting'].includes(frame.dataset.vieStatus)&&value?.content?.meaningful!==false){const rect=frame.getBoundingClientRect?.();if(!rect||rect.width>0&&rect.height>0&&rect.bottom>0&&rect.top<win.innerHeight&&rect.right>0&&rect.left<win.innerWidth){metrics.visibleMs??=elapsed();frame.dataset.vieVisibleMs=String(metrics.visibleMs);options.onVisible?.({...metrics});}}
    if(type==='state')try{const clean=validateFigureState(value);options.onChange?.(clean);state=validateFigureState(options.currentState?.()??clean);send('state',state);}catch(error){send('state',state);options.onError?.('交互状态无效：'+error.message);}
    if(type==='error'&&typeof value==='string'){metrics.errors++;frame.dataset.vieReady='false';frame.dataset.vieStatus='error';options.onError?.(value.slice(0,1200));}
    if(type==='ready'){loaded=true;const preview=value?.preview===true,ok=value?.ok!==false&&frame.dataset.vieStatus!=='error',meaningful=value?.content?.meaningful!==false;
      frame.dataset.vieContent=value?.content?.kind??'legacy';
      if(ok&&!meaningful){frame.dataset.vieReady='false';frame.dataset.vieStatus='waiting';if(!fallbackMode)options.onWaiting?.({});if(preview&&!fallbackMode)content();}
      else if(preview){if(ok){metrics.previewMs??=elapsed();frame.dataset.viePreviewMs=String(metrics.previewMs);}frame.dataset.vieReady='false';frame.dataset.vieStatus=ok?(fallbackMode?'fallback':'preview'):'error';if(ok&&!fallbackMode){options.onPreview?.({...metrics});content();}else if(!ok&&!spec.preview&&!fallbackMode)load();}
      else{if(ok){metrics.readyMs??=elapsed();frame.dataset.vieReadyMs=String(metrics.readyMs);}frame.dataset.vieReady=String(ok);frame.dataset.vieStatus=ok?'ready':'error';if(ok)options.onReady?.({...metrics});}
      send('theme',theme());send('state',state);visibility();}
  };
  const onTheme=()=>send('theme',theme());
  const observer=new win.MutationObserver(onTheme);
  observer.observe(frame.ownerDocument.documentElement,{attributes:true,attributeFilter:['class','data-theme','style']});
  observer.observe(frame.ownerDocument.body,{attributes:true,attributeFilter:['class','data-theme','style']});
  const media=win.matchMedia('(prefers-reduced-motion: reduce)'),colorMedia=win.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change',onTheme);colorMedia.addEventListener('change',onTheme);
  let intersecting=true;
  const visibility=()=>send('visibility',!frame.ownerDocument.hidden&&intersecting);
  frame.ownerDocument.addEventListener('visibilitychange',visibility);
  const intersection=win.IntersectionObserver?new win.IntersectionObserver(entries=>{intersecting=!!entries[0]?.isIntersecting;visibility();}):null;
  intersection?.observe(frame);win.addEventListener('message',onMessage);frame.addEventListener('load',onTheme);load();
  return {snapshot:()=>validateFigureState(state),metrics:()=>({...metrics}),revise(next){
    const checked=validateFigureDefinition(next,true);
    if(disposed||JSON.stringify(checked)===JSON.stringify(spec))return;
    const wasPreview=!!spec.preview;fallbackMode=false;spec=checked;
    try{validateSDKCalls(spec.js);}catch(error){
      // A rejected definition still retires the preceding executable frame.
      // Its queued messages and pending library loads belong to an old revision.
      loadGeneration++;channel='';loaded=false;startedPreview=false;
      if(stateTimer)win.clearTimeout(stateTimer);stateTimer=0;pendingState=null;
      frame.srcdoc='';frame.dataset.vieStatus='error';frame.dataset.vieReady='false';
      options.onError?.(error.message);return;
    }
    if(wasPreview){state=validateFigureState(options.currentState?.()??spec.state);if(frame.dataset.vieStatus==='error'){load();return;}content();return;}
    state=validateFigureState(options.currentState?.()??spec.state);load();
  },update(value){const clean=validateFigureState(value);if(JSON.stringify(state)===JSON.stringify(clean))return;state=clean;send('state',state);},showStaticPreview(){if(disposed)return;fallbackMode=true;load();},reset(){fallbackMode=false;state=validateFigureState(spec.state);options.onChange?.(state);load();},dispose(){if(disposed)return;disposed=true;loadGeneration++;if(stateTimer)win.clearTimeout(stateTimer);stateTimer=0;pendingState=null;win.removeEventListener('message',onMessage);frame.removeEventListener('load',onTheme);observer.disconnect();intersection?.disconnect();media.removeEventListener('change',onTheme);colorMedia.removeEventListener('change',onTheme);frame.ownerDocument.removeEventListener('visibilitychange',visibility);frame.srcdoc='';}};
}
