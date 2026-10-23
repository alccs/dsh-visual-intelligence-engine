/** Generated code runs only inside an opaque-origin iframe, never the host DOM. */
function figureBootstrap(config){
  /* @include shared/learning.js */
  /* @include view/learning.js */
  let state=config.state,theme=config.theme,visible=true,failed=false;
  const post=(type,value)=>{try{parent.postMessage({v:1,channel:config.channel,type,value},'*');}catch{}};
  const reportError=error=>{failed=true;post('error',String(error?.message??error).slice(0,1200));};
  const applyTheme=value=>{
    theme=value;document.documentElement.dataset.theme=value.mode;
    for(const [key,color]of Object.entries(value.colors??{}))document.documentElement.style.setProperty('--vie-'+key,color);
    document.documentElement.style.colorScheme=value.mode;
    window.dispatchEvent(new CustomEvent('vie:themechange',{detail:value}));
  };
  window.VIE={get state(){return state;},get theme(){return theme;},get visible(){return visible;},get reducedMotion(){return !!theme.reducedMotion;},
    title:config.title,setState(value){if(!value||typeof value!=='object'||Array.isArray(value))throw Error('VIE.setState expects an object');state=value;post('state',value);},reportError,mountLearning};
  window.addEventListener('message',event=>{
    if(event.source!==parent||event.data?.channel!==config.channel)return;
    if(event.data.type==='theme')applyTheme(event.data.value);
    if(event.data.type==='state'){state=event.data.value;window.dispatchEvent(new CustomEvent('vie:statechange',{detail:state}));}
    if(event.data.type==='visibility'){visible=!!event.data.value;window.dispatchEvent(new CustomEvent('vie:visibilitychange',{detail:visible}));}
  });
  window.addEventListener('error',event=>reportError(event.message));
  window.addEventListener('unhandledrejection',event=>reportError(event.reason));
  document.addEventListener('submit',event=>event.preventDefault(),true);
  document.addEventListener('click',event=>{const a=event.target.closest?.('a[href]');if(a&&!a.getAttribute('href').startsWith('#'))event.preventDefault();},true);
  applyTheme(config.theme);
  document.addEventListener('DOMContentLoaded',()=>{
    const root=document.getElementById('vie-root');let frame=0,last='';
    if(config.staticSvg&&root.children.length===1&&root.firstElementChild.tagName.toLowerCase()==='svg'){
      const svg=root.firstElementChild;let readable=0;
      const fit=()=>{const fonts=[...svg.querySelectorAll('text')].map(t=>parseFloat(getComputedStyle(t).fontSize)*Math.hypot(t.getScreenCTM()?.a??1,t.getScreenCTM()?.b??0)).filter(n=>n>0);const min=Math.min(...fonts);if(min<10.99&&readable<1800){readable=Math.min(1800,Math.ceil(svg.getBoundingClientRect().width*11/min)+2);svg.style.minWidth=readable+'px';svg.style.maxWidth='none';root.style.overflowX='auto';root.tabIndex=0;root.setAttribute('aria-label','图形可横向滚动查看');}};
      new ResizeObserver(fit).observe(root);fit();
    }
    const measure=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;
      // scrollHeight includes positioned children; a small rounding allowance prevents
      // subpixel overflow from repeatedly adding/removing the Windows scrollbar gutter.
      const fonts=[...root.querySelectorAll('svg text')].filter(t=>t.textContent.trim()).map(t=>parseFloat(getComputedStyle(t).fontSize)*Math.hypot(t.getScreenCTM()?.a??1,t.getScreenCTM()?.b??0));
      const value={height:Math.ceil(Math.max(root.getBoundingClientRect().height,root.scrollHeight))+2,width:document.documentElement.scrollWidth,viewport:innerWidth,minFont:fonts.length?Math.min(...fonts):14},signature=JSON.stringify(value);
      if(signature!==last){last=signature;post('height',value);}
    });};
    new ResizeObserver(measure).observe(root);
    new MutationObserver(measure).observe(root,{childList:true,subtree:true,attributes:true,characterData:true});
    window.addEventListener('resize',measure);root.addEventListener('load',measure,true);document.fonts?.ready.then(measure);
    measure();post('ready',{ok:!failed});
  },{once:true});
}
const FIGURE_BASE_CSS=`*{box-sizing:border-box}html,body{margin:0;background:transparent;color:var(--vie-ink,#243044);font:14px/1.65 system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif}#vie-root{display:flow-root;padding:14px;overflow-wrap:anywhere;min-width:0}button,input,select,textarea{font:inherit}button{cursor:pointer;border:1px solid var(--vie-stroke,#dce3ec);background:var(--vie-layer,#f4f6fa);color:inherit;border-radius:8px;min-height:34px;padding:5px 11px}input[type=range]{accent-color:var(--vie-accent,#5483ef);max-width:100%}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--vie-accent,#5483ef);outline-offset:3px}svg,canvas{display:block;max-width:100%;height:auto}label{display:block}.muted{color:var(--vie-muted,#718096)}.controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.card{border:1px solid var(--vie-stroke,#dce3ec);border-radius:12px;padding:12px;background:var(--vie-layer,#f4f6fa)}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}`;
// Sandboxed content only. Keep overflow scrollable without native tracks or arrow buttons.
const FIGURE_SCROLL_CSS='html,body,#vie-root,#vie-root *{scrollbar-width:none!important}html::-webkit-scrollbar,body::-webkit-scrollbar,#vie-root::-webkit-scrollbar,#vie-root *::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}';
function buildFigureDocument(raw,{channel,state,theme}){
  const spec=validateFigureDefinition(raw),safeScript=x=>x.replace(/<\/script/gi,'<\\/script');
  const settings=JSON.stringify({channel,title:spec.title,state:validateFigureState(state??spec.state),theme,staticSvg:!spec.js.trim()}).replace(/</g,'\\u003c');
  const csp="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; media-src data: blob:; connect-src 'none'; object-src 'none'; frame-src 'none'; worker-src 'none'; base-uri 'none'; form-action 'none'";
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${csp}"><style>${FIGURE_BASE_CSS}\n.vie-learn{border:0;border-radius:0;padding:0;display:grid;gap:12px}.vie-learn-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.vie-learn-heading small,.vie-learn-note{color:var(--vie-muted);font-size:12px}.vie-learn-panel{min-width:0;overflow:auto}.vie-learn-panel svg{width:100%;display:block}.vie-learn-tabs{display:flex;gap:8px;flex-wrap:wrap}.vie-learn-tabs button{flex:1 1 120px;border-radius:999px;background:transparent;color:var(--vie-ink);border:1px solid var(--vie-stroke);font-size:13px;min-height:38px}.vie-learn-tabs button[aria-selected=true]{background:var(--vie-ink);color:var(--vie-bg);border-color:var(--vie-ink)}.vie-learn-description{background:var(--vie-layer);border-radius:14px;padding:12px}.vie-learn-description p{margin:4px 0 0;font-size:14px}.vie-learn-quiz{border:0;min-width:0;margin:0;padding:0}.vie-learn-quiz legend{font-weight:600;margin-bottom:12px}.vie-learn-choices{display:grid;gap:12px}.vie-learn-choices label{display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:14px}.vie-learn-choices input{flex:none;accent-color:var(--vie-primary)}.vie-learn-feedback{margin-top:14px;border-radius:12px;padding:12px;background:var(--vie-layer)}.vie-learn-feedback[data-correct=true]{border-left:3px solid var(--vie-secondary)}.vie-learn-feedback[data-correct=false]{border-left:3px solid var(--vie-warning)}@media(max-width:440px){.vie-learn{padding:0}.vie-learn-tabs button{flex-basis:88px;font-size:13px}.vie-learn-panel>svg{width:100%;height:auto}}\n${spec.css.replace(/<\/style/gi,'<\\/style')}\n${FIGURE_SCROLL_CSS}</style><script>(${safeScript(figureBootstrap.toString())})(${settings});</script></head><body><div id="vie-root">${spec.html}</div><script>${safeScript(spec.js)}</script></body></html>`;
}
function mountGeneratedFigure(frame,raw,options={}){
  const spec=validateFigureDefinition(raw),win=frame.ownerDocument.defaultView;
  let state=validateFigureState(options.initialState??spec.state),channel='',disposed=false,lastMessage=0,burst=0;
  const shell=frame.closest('.vie-shell');
  const theme=()=>{
    const css=win.getComputedStyle(shell??frame),explicit=frame.ownerDocument.documentElement.dataset.theme??(frame.ownerDocument.body.classList.contains('dark')?'dark':null);
    return {mode:explicit??(win.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),reducedMotion:win.matchMedia('(prefers-reduced-motion: reduce)').matches,
      colors:Object.fromEntries([['bg','--vie-bg','#fff'],['ink','--vie-ink','#243044'],['muted','--vie-muted','#718096'],['stroke','--vie-stroke','#dce3ec'],['layer','--vie-layer','#f4f6fa'],['accent','--vie-accent','#d58b16'],['primary','--vie-primary','#4d82d6'],['secondary','--vie-secondary','#149f91'],['warning','--vie-warning','#cf6854']].map(([k,token,fallback])=>[k,css.getPropertyValue(token).trim()||fallback]))};
  };
  const send=(type,value)=>{if(!disposed)frame.contentWindow?.postMessage({v:1,channel,type,value},'*');};
  const load=()=>{channel='vie-'+(++svgScopeSequence)+'-'+Math.random().toString(36).slice(2);frame.dataset.vieReady='false';frame.dataset.vieStatus='loading';options.onError?.('');frame.srcdoc=buildFigureDocument(spec,{channel,state,theme:theme()});};
  const onMessage=event=>{
    if(disposed||event.source!==frame.contentWindow||event.data?.channel!==channel||event.data?.v!==1)return;
    const now=Date.now();if(now-lastMessage>1000){lastMessage=now;burst=0;}if(++burst>60)return;
    const {type,value}=event.data;
    if(type==='height'&&value&&[value.height,value.width,value.viewport].every(v=>typeof v==='number'&&Number.isFinite(v)&&v>=0)){
      frame.dataset.vieSmallText=String(Number.isFinite(value.minFont)&&value.minFont>0&&value.minFont<11);
      frame.style.height=Math.min(10000,Math.max(160,value.height))+'px';frame.dataset.vieOverflow=String(value.width>value.viewport+2);frame.dataset.vieContentWidth=String(value.width);frame.dataset.vieViewportWidth=String(value.viewport);frame.dataset.vieContentHeight=String(value.height);
    }
    if(type==='state')try{const clean=validateFigureState(value);options.onChange?.(clean);state=validateFigureState(options.currentState?.()??clean);send('state',state);}catch(error){send('state',state);options.onError?.('交互状态无效：'+error.message);}
    if(type==='error'&&typeof value==='string'){frame.dataset.vieReady='false';frame.dataset.vieStatus='error';options.onError?.(value.slice(0,1200));}
    if(type==='ready'){const ok=value?.ok!==false&&frame.dataset.vieStatus!=='error';frame.dataset.vieReady=String(ok);frame.dataset.vieStatus=ok?'ready':'error';send('theme',theme());send('state',state);options.onReady?.();}
  };
  const onTheme=()=>send('theme',theme());
  const observer=new win.MutationObserver(onTheme);
  observer.observe(frame.ownerDocument.documentElement,{attributes:true,attributeFilter:['class','data-theme','style']});
  observer.observe(frame.ownerDocument.body,{attributes:true,attributeFilter:['class','data-theme','style']});
  const media=win.matchMedia('(prefers-reduced-motion: reduce)'),colorMedia=win.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change',onTheme);colorMedia.addEventListener('change',onTheme);
  const visibility=()=>send('visibility',!frame.ownerDocument.hidden);
  frame.ownerDocument.addEventListener('visibilitychange',visibility);
  const intersection=win.IntersectionObserver?new win.IntersectionObserver(entries=>send('visibility',!frame.ownerDocument.hidden&&entries[0].isIntersecting)):null;
  intersection?.observe(frame);win.addEventListener('message',onMessage);frame.addEventListener('load',onTheme);load();
  return {snapshot:()=>validateFigureState(state),update(value){const clean=validateFigureState(value);if(JSON.stringify(state)===JSON.stringify(clean))return;state=clean;send('state',state);},reset(){state=validateFigureState(spec.state);options.onChange?.(state);load();},dispose(){if(disposed)return;disposed=true;win.removeEventListener('message',onMessage);frame.removeEventListener('load',onTheme);observer.disconnect();intersection?.disconnect();media.removeEventListener('change',onTheme);colorMedia.removeEventListener('change',onTheme);frame.ownerDocument.removeEventListener('visibilitychange',visibility);frame.srcdoc='';}};
}
