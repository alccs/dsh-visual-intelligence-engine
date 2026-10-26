/** Topic-independent drawing helpers. Runs only inside the figure sandbox. */
function installGraphicsRuntime(api) {
  /* @include shared/sdk-geometry.js */
  const NS='http://www.w3.org/2000/svg', disposers=new Set();let sequence=0;
  const number=(v,fallback=0)=>{const n=v===undefined?fallback:v;if(typeof n!=='number'||!Number.isFinite(n)||Math.abs(n)>1e7)throw Error('VIE graphics: expected a finite coordinate');return n;};
  const point=v=>{if(!Array.isArray(v)||v.length!==2)throw Error('VIE graphics: expected [x,y]');return v.map(n=>number(n));};
  const rootOf=value=>{const root=typeof value==='string'?document.querySelector(value):value??document.getElementById('vie-root');if(!root?.appendChild)throw Error('VIE graphics: root not found');return root;};
  const tone=value=>{const color=svgSDKColor(value??'primary');if(typeof CSS!=='undefined'&&color!=='none'&&!CSS.supports('color',color))svgSDKError('color','value','invalid CSS color');return color;};
  const ownDispose=fn=>{let disposed=false;const stop=()=>{if(disposed)return;disposed=true;disposers.delete(stop);fn();};disposers.add(stop);return stop;};
  const listen=(name,fn)=>{window.addEventListener(name,fn);return ownDispose(()=>window.removeEventListener(name,fn));};
  api.onDispose=fn=>{if(typeof fn!=='function')throw Error('VIE.onDispose expects a function');return ownDispose(fn);};
  api.onState=(fn,options={})=>{if(typeof fn!=='function')throw Error('VIE.onState expects a function');const stop=listen('vie:statechange',()=>fn(api.state));if(options.immediate!==false)fn(api.state);return stop;};
  api.onTheme=(fn,options={})=>{if(typeof fn!=='function')throw Error('VIE.onTheme expects a function');const stop=listen('vie:themechange',()=>fn(api.theme));if(options.immediate!==false)fn(api.theme);return stop;};
  api.graphicsVersion=1;
  api.svg=function(options={}) {
    const root=rootOf(options.root),width=number(options.width,520),height=number(options.height,280);
    if(width<120||height<80||width>2400||height>1600)throw Error('VIE.svg: width/height out of range');
    const viewport=document.createElement('div');viewport.className='vie-sdk-viewport';viewport.tabIndex=0;viewport.setAttribute('aria-label',options.title??'交互示意图，可横向平移查看');root.append(viewport);
    const el=(tag,attrs={},parent)=>{const node=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))node.setAttribute(k,String(v));parent?.append(node);return node;};
    const svg=el('svg',{viewBox:'0 0 '+width+' '+height,role:'img','aria-label':options.title??'交互示意图',class:'vie-sdk-svg'},viewport);
    svg.style.width='100%';svg.style.display='block';svg.style.minWidth=Math.min(width,width*12/14)+'px';
    const defs=el('defs',{},svg),markerId='vie-sdk-arrow-'+(++sequence);
    el('path',{d:'M0 0L7 3.5L0 7Z',fill:'context-stroke'},el('marker',{id:markerId,viewBox:'0 0 7 7',refX:6.5,refY:3.5,markerWidth:7,markerHeight:7,orient:'auto-start-reverse',markerUnits:'userSpaceOnUse'},defs));
    const labels=[],connectors=new Set();let scheduled=0,disposed=false;
    const overlap=(a,b)=>a.left<b.right+3&&a.right>b.left-3&&a.top<b.bottom+3&&a.bottom>b.top-3;
    const layout=()=>{if(disposed)return;for(const connector of connectors)connector.refresh();viewport.dataset.viePannable=String(viewport.scrollWidth>viewport.clientWidth+2);const placed=[],box=svg.getBoundingClientRect();let conflicts=0;
      for(const item of labels){if(!item.node.isConnected)continue;const {x,y}=item;let accepted=false;
        for(const [dx,dy]of [[0,0],[0,-17],[0,17],[22,-17],[-22,-17],[22,17],[-22,17],[0,-34],[0,34]]){
          item.node.setAttribute('x',x+dx);item.node.setAttribute('y',y+dy);const b=item.node.getBoundingClientRect();
          if(b.left>=box.left+2&&b.right<=box.right-2&&b.top>=box.top+2&&b.bottom<=box.bottom-2&&!placed.some(p=>overlap(p,b))){accepted=true;placed.push(b);break;}
        }
        if(!accepted){item.node.setAttribute('x',x);item.node.setAttribute('y',y);placed.push(item.node.getBoundingClientRect());conflicts++;}
      }
      const minSize=Math.min(14,...labels.filter(l=>l.node.isConnected).map(l=>Number(l.node.getAttribute('font-size'))||14));svg.style.minWidth=Math.min(width,width*12/minSize)+'px';svg.dataset.vieLabelConflicts=String(conflicts);return conflicts;
    };
    const schedule=()=>{if(disposed||scheduled)return;scheduled=requestAnimationFrame(()=>{scheduled=0;layout();});};
    const observer=new ResizeObserver(schedule);observer.observe(viewport);
    const stopTheme=api.onTheme(schedule,{immediate:false});document.fonts?.ready.then(schedule);
    const dispose=ownDispose(()=>{disposed=true;if(scheduled)cancelAnimationFrame(scheduled);observer.disconnect();stopTheme();viewport.remove();});
    function scope(parent) {
      function primitive(kind,raw={}) {
        let value=normalizeSVGPrimitive(kind,raw);const group=el('g',{'data-vie-primitive':kind},parent),nodes=[],ownedLabels=[];
        const clear=()=>{for(const l of ownedLabels){const i=labels.indexOf(l);if(i>=0)labels.splice(i,1);}ownedLabels.length=0;group.replaceChildren();nodes.length=0;};
        const make=(tag,attrs)=>{const n=el(tag,attrs,group);nodes.push(n);return n;};
        const label=(at,text,extra={})=>{const [x,y]=point(at),node=make('text',{x,y,fill:tone(value.color??value.labelColor??'ink'),'font-size':value.fontSize??14,'text-anchor':'middle','dominant-baseline':'middle',...extra});node.textContent=String(text??'').slice(0,160);const record={node,x,y};labels.push(record);ownedLabels.push(record);return node;};
        const draw=()=>{clear();group.setAttribute('opacity',value.opacity);const stroke=tone(value.stroke),base={stroke,'stroke-width':value.strokeWidth,fill:tone(value.fill),'stroke-opacity':value.strokeOpacity,'fill-opacity':value.fillOpacity,...value.dash?{'stroke-dasharray':value.dash}:{},'stroke-linecap':'round','stroke-linejoin':'round'};
          if(kind==='line'||kind==='arrow'||kind==='dimension'){
            const [x1,y1]=point(value.from),[x2,y2]=point(value.to),length=Math.hypot(x2-x1,y2-y1),normal=length?[-(y2-y1)/length,(x2-x1)/length]:[0,-1];
            const offset=kind==='dimension'?number(value.offset,24):0,ax=x1+normal[0]*offset,ay=y1+normal[1]*offset,bx=x2+normal[0]*offset,by=y2+normal[1]*offset;
            if(kind==='dimension')for(const [x,y]of [[x1,y1],[x2,y2]])make('line',{...base,x1:x,y1:y,x2:x+normal[0]*(offset+6),y2:y+normal[1]*(offset+6),opacity:.5,'stroke-width':1});
            make('line',{...base,x1:ax,y1:ay,x2:bx,y2:by,...kind!=='line'?{'marker-end':'url(#'+markerId+')'}:{},...kind==='dimension'?{'marker-start':'url(#'+markerId+')'}:{}});
            if(value.label!==undefined)label([(ax+bx)/2+normal[0]*13,(ay+by)/2+normal[1]*13],value.label);
          } else if(kind==='label')label(value.at,value.text,{'text-anchor':value.anchor??'middle','font-weight':value.bold?600:400});
          else if(kind==='circle'){const [cx,cy]=point(value.at);make('circle',{...base,cx,cy,r:Math.max(0,number(value.radius)),fill:tone(value.fill)});if(value.label!==undefined)label([cx,cy],value.label);}
          else if(kind==='rect'){const [x,y]=point(value.at),w=number(value.width),h=number(value.height);if(w<0||h<0)throw Error('VIE rect: negative size');make('rect',{...base,x,y,width:w,height:h,rx:value.radius,ry:value.ry,fill:tone(value.fill)});if(value.label!==undefined)label([x+w/2,y+h/2],value.label);}
          else if(kind==='path')make('path',{...base,d:String(value.d??'')});
          else if(kind==='curve'){if(!Array.isArray(value.points)||value.points.length<2||value.points.length>2000)throw Error('VIE curve: expected 2–2000 points');make('polyline',{...base,points:value.points.map(point).map(p=>p.join(',')).join(' ')});}
          else if(kind==='angle'){
            const [x,y]=point(value.at),r=number(value.radius,32),from=number(value.from,0),to=number(value.to,45),rad=d=>d*Math.PI/180;
            if(r<=0||Math.abs(to-from)>=360)throw Error('VIE angle: expected radius > 0 and angle span < 360');
            const a=[x+r*Math.cos(rad(from)),y-r*Math.sin(rad(from))],b=[x+r*Math.cos(rad(to)),y-r*Math.sin(rad(to))];
            make('path',{...base,d:'M'+a.join(',')+' A'+r+','+r+' 0 '+(Math.abs(to-from)>180?1:0)+' '+(to<from?1:0)+' '+b.join(',')});
            if(value.label!==undefined)label([x+(r+14)*Math.cos(rad((from+to)/2)),y-(r+14)*Math.sin(rad((from+to)/2))],value.label);
          }
          schedule();
        };
        draw();return {element:group,set(next){if(disposed)return;value=normalizeSVGPrimitive(kind,next,value);draw();},remove(){clear();group.remove();schedule();}};
      }
      const result={element:parent};for(const k of ['line','arrow','label','circle','rect','path','curve','angle','dimension'])result[k]=p=>primitive(k,p);
      result.group=(initial={})=>{const node=el('g',{},parent),child=scope(node);child.element=node;let value={...initial};child.set=next=>{value={...value,...next};const [x,y]=point(value.translate??[0,0]);node.setAttribute('transform','translate('+x+' '+y+') rotate('+number(value.rotate)+') scale('+number(value.scale,1)+')');schedule();};child.set({});return child;};
      result.axes=(p={})=>{const [x,y]=point(p.at??[48,height-45]),xLength=number(p.xLength,width-x-30),yLength=number(p.yLength,y-25);return {x:result.arrow({from:[x,y],to:[x+xLength,y],label:p.xLabel??'x',tone:p.tone??'muted'}),y:result.arrow({from:[x,y],to:[x,y-yLength],label:p.yLabel??'y',tone:p.tone??'muted'})};};
      return result;
    }
    const drawing=scope(svg);
    drawing.anchor=(target,side='center')=>{
      const element=target?.element??target?.node??target;if(!element||!svg.contains(element))throw Error('VIE.svg.anchor: target must belong to this drawing');
      const shape=element.querySelector?.('rect,circle,path,line,polyline,ellipse')??element,box=shape.getBBox(),sides={center:[.5,.5],left:[0,.5],right:[1,.5],top:[.5,0],bottom:[.5,1]};
      if(!Object.hasOwn(sides,side))throw Error('VIE.svg.anchor: unknown side');const ratio=sides[side],p=svg.createSVGPoint();p.x=box.x+box.width*ratio[0];p.y=box.y+box.height*ratio[1];
      const base=svg.getCTM(),matrix=shape.getCTM();if(!base||!matrix)throw Error('VIE.svg.anchor: drawing is not mounted');const result=p.matrixTransform(base.inverse().multiply(matrix));return [result.x,result.y];
    };
    drawing.connect=(from,to,options={})=>{
      let config={fromAnchor:'right',toAnchor:'left',...options},signature='',removed=false,arrow;
      const refresh=()=>{if(removed)return;const a=from?.element??from,b=to?.element??to;if(!svg.contains(a)||!svg.contains(b)){remove();return;}
        const {fromAnchor,toAnchor,...style}=config,fromPoint=drawing.anchor(from,fromAnchor),toPoint=drawing.anchor(to,toAnchor),next=JSON.stringify([style,fromPoint,toPoint]);if(next===signature)return;signature=next;
        const value={...style,from:fromPoint,to:toPoint};if(arrow)arrow.set(value);else arrow=drawing.arrow(value);
      };
      const remove=()=>{if(removed)return;removed=true;connectors.delete(controller);arrow?.remove();};
      const controller={refresh,get element(){return arrow?.element;},set(next){config={...config,...next};refresh();},remove};refresh();connectors.add(controller);return controller;
    };
    drawing.coordinates=(options={})=>{const map=createSVGCoordinateMap(options,width,height),point=map.point;return {...map,line:options=>drawing.line({...options,from:point(options.from),to:point(options.to)}),series:(points,style={})=>drawing.curve({...style,points:points.map(p=>point(p))}),marker:options=>{let value={...options};const pixel=()=>point(value.at),text=()=>String(value.label??'')+' ('+value.at.map(n=>String(Number(n.toPrecision(8)))).join(', ')+')';const dot=drawing.circle({at:pixel(),radius:4,fill:true,tone:value.tone}),label=drawing.label({at:[pixel()[0],pixel()[1]-18],text:text(),tone:value.tone});return {set(next){value={...value,...next};dot.set({at:pixel(),tone:value.tone});label.set({at:[pixel()[0],pixel()[1]-18],text:text(),tone:value.tone});},remove(){dot.remove();label.remove();}};}};};
    return Object.assign(drawing,{element:svg,viewport,layoutLabels:layout,dispose});
  };
  api.canvas=function(options={}) {
    const root=rootOf(options.root),canvas=document.createElement('canvas');canvas.className='vie-sdk-canvas';canvas.setAttribute('aria-label',options.title??'交互画布');canvas.setAttribute('role','img');canvas.style.width='100%';canvas.style.height=number(options.height,280)+'px';root.append(canvas);
    const ctx=canvas.getContext('2d');if(!ctx)throw Error('VIE.canvas: 2D canvas unavailable');let scheduled=0,disposed=false;
    const draw=()=>{scheduled=0;if(disposed||!api.visible)return;const width=Math.max(1,canvas.getBoundingClientRect().width),height=Math.max(1,canvas.getBoundingClientRect().height),dpr=Math.min(2,Math.max(1,devicePixelRatio||1));canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);try{options.draw?.({ctx,width,height,state:api.state,theme:api.theme});}catch(e){api.reportError(e);}};
    const redraw=()=>{if(!scheduled&&!disposed&&api.visible)scheduled=requestAnimationFrame(draw);};
    const observer=new ResizeObserver(redraw);observer.observe(canvas);
    const stops=[api.onState(redraw,{immediate:false}),api.onTheme(redraw,{immediate:false}),listen('vie:visibilitychange',redraw)];
    const dispose=ownDispose(()=>{disposed=true;if(scheduled)cancelAnimationFrame(scheduled);observer.disconnect();stops.forEach(s=>s());canvas.remove();});redraw();
    return {canvas,ctx,redraw,dispose};
  };
  api.animate=function(options={}) {
    const duration=number(options.duration,4000);if(duration<100||duration>3600000)throw Error('VIE.animate: duration must be 100–3600000ms');
    if(typeof options.render!=='function')throw Error('VIE.animate: render callback required');
    const stateKey=options.stateKey;if(stateKey!==undefined&&(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(stateKey)||['constructor','prototype'].includes(stateKey)))throw Error('VIE.animate: invalid stateKey');
    const saved=stateKey?api.state[stateKey]:null;
    let elapsed=saved&&Number.isFinite(saved.elapsed)?Math.max(0,Math.min(1e7,saved.elapsed)):0,last=null,frame=0,wanted=!!options.autoplay&&!api.reducedMotion,disposed=false,transport,lastSave=-Infinity;
    if(options.loop!==false)elapsed%=duration;else elapsed=Math.min(duration,elapsed);
    const snapshot=()=>({elapsed,progress:options.loop===false?Math.min(1,elapsed/duration):(elapsed%duration)/duration,playing:wanted});
    const persist=force=>{if(!stateKey||!force&&performance.now()-lastSave<250)return;lastSave=performance.now();api.setState({...api.state,[stateKey]:{elapsed,playing:wanted}});};
    const render=delta=>{if(disposed)return;try{options.render({...snapshot(),delta});}catch(e){wanted=false;api.reportError(e);}sync();persist(delta===0);};
    const sync=()=>{if(!transport)return;transport.play.textContent=wanted?'暂停':'播放';transport.play.setAttribute('aria-pressed',String(wanted));transport.range.value=String(snapshot().progress*100);updateRangePresentation(transport.range);};
    const cancel=()=>{if(frame)cancelAnimationFrame(frame);frame=0;last=null;};
    const request=()=>{if(!frame&&wanted&&!disposed&&api.visible)frame=requestAnimationFrame(tick);};
    const tick=now=>{frame=0;if(disposed||!wanted||!api.visible){last=null;return;}const delta=last===null?0:Math.min(100,Math.max(0,now-last));last=now;elapsed+=delta;if(options.loop===false&&elapsed>=duration){elapsed=duration;wanted=false;}render(delta);request();};
    const controller={play(){if(disposed)return;wanted=true;last=null;sync();persist(true);request();},pause(){wanted=false;cancel();sync();persist(true);},reset(){wanted=false;elapsed=0;cancel();render(0);},step(ms=duration/24){wanted=false;cancel();elapsed=Math.max(0,elapsed+number(ms));if(options.loop===false)elapsed=Math.min(duration,elapsed);render(0);},snapshot};
    if(options.controls!==false){const host=rootOf(options.root),wrap=document.createElement('div');wrap.className='vie-sdk-transport';const button=(label,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',fn);wrap.append(b);return b;};const play=button('播放',()=>wanted?controller.pause():controller.play());button('单步',()=>controller.step());button('复位',()=>controller.reset());const range=document.createElement('input');range.type='range';range.min='0';range.max='100';range.step='.1';range.value='0';range.setAttribute('aria-label','动画进度');range.addEventListener('input',()=>{wanted=false;cancel();elapsed=Number(range.value)*duration/100;render(0);});wrap.append(range);host.append(wrap);transport={wrap,play,range};}
    const stop=listen('vie:visibilitychange',()=>{cancel();request();});
    controller.dispose=ownDispose(()=>{disposed=true;wanted=false;cancel();stop();transport?.wrap.remove();});render(0);request();return controller;
  };
  window.addEventListener('pagehide',()=>{for(const stop of [...disposers])stop();},{once:true});
}
