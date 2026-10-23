/** Examples are ordinary vie_explain inputs, not engine templates or routes. */
function rgbApp(){
  let state={r:80,g:130,b:240,...VIE.state};
  const keys=['r','g','b'];
  function draw(){
    keys.forEach(k=>{document.getElementById(k).value=state[k];document.getElementById(k+'v').textContent=state[k];});
    const rgb=keys.map(k=>state[k]);
    document.getElementById('swatch').style.backgroundColor='rgb('+rgb.join(',')+')';
    document.getElementById('hex').textContent='#'+rgb.map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();
    document.getElementById('rgbvalue').textContent='RGB('+rgb.join(', ')+')';
    document.getElementById('swatch').style.color=rgb.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0)>145?'#172230':'#fff';
  }
  keys.forEach(k=>document.getElementById(k).addEventListener('input',event=>{state={...state,[k]:Number(event.target.value)};draw();VIE.setState(state);}));
  document.getElementById('white').onclick=()=>{state={r:255,g:255,b:255};draw();VIE.setState(state);};
  document.getElementById('black').onclick=()=>{state={r:0,g:0,b:0};draw();VIE.setState(state);};draw();
}
function binaryApp(){
  const data=[3,8,12,17,24,31,39,46,54,63,71];
  let state={target:39,step:0,...VIE.state};
  function steps(target){const frames=[];let lo=0,hi=data.length-1;while(lo<=hi){const mid=Math.floor((lo+hi)/2),found=data[mid]===target;frames.push({lo,hi,mid,found,done:found});if(found)return frames;if(data[mid]<target)lo=mid+1;else hi=mid-1;}frames.push({lo,hi,mid:-1,found:false,done:true});return frames;}
  function draw(){
    const frames=steps(state.target);state.step=Math.min(state.step,frames.length-1);const f=frames[state.step];
    document.getElementById('target').value=state.target;document.getElementById('targetv').textContent=state.target;
    document.getElementById('cells').innerHTML=data.map((n,i)=>'<div class="cell '+(f.found&&i===f.mid?'found':i===f.mid?'mid':i<f.lo||i>f.hi?'off':'active')+'"><small>'+i+'</small><strong>'+n+'</strong></div>').join('');
    document.getElementById('status').textContent=f.found?'找到 '+state.target+'，下标为 '+f.mid+'。':f.done?'当前区间为空，数组中没有 '+state.target+'。':'第 '+(state.step+1)+' 次比较：中点值 '+data[f.mid]+'，目标 '+state.target+'；下一步排除'+(data[f.mid]<state.target?'左':'右')+'侧。';
    document.getElementById('next').disabled=f.done;
  }
  document.getElementById('target').oninput=event=>{state={target:Number(event.target.value),step:0};draw();VIE.setState(state);};
  document.getElementById('next').onclick=()=>{state.step++;draw();VIE.setState(state);};
  document.getElementById('restart').onclick=()=>{state.step=0;draw();VIE.setState(state);};draw();
}
function helixApp(){
  const canvas=document.getElementById('gears'),ctx=canvas.getContext('2d');
  let state={beta:24,yaw:-28,angle:0,...VIE.state},playing=false,raf=0,last=0;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function rotate(p){const y=state.yaw*Math.PI/180,c=Math.cos(y),s=Math.sin(y),x=p[0]*c+p[2]*s,z=-p[0]*s+p[2]*c,a=.38;return [x,p[1]*Math.cos(a)-z*Math.sin(a),p[1]*Math.sin(a)+z*Math.cos(a)];}
  function normal(a,b,c){const u=b.map((n,i)=>n-a[i]),v=c.map((n,i)=>n-a[i]),n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],d=Math.hypot(...n)||1;return n.map(x=>x/d);}
  function mesh(cx,r,teeth,phase,hand,color){
    const rings=[-.48,.48].map(z=>{
      const points=[];
      for(let t=0;t<teeth;t++)for(const [fraction,offset]of [[-.5,-.1],[-.32,-.1],[-.22,.1],[.22,.1],[.32,-.1]]){
        const angle=(t+fraction)*2*Math.PI/teeth+phase+hand*z*Math.tan(state.beta*Math.PI/180)/r;
        points.push([cx+(r+offset)*Math.cos(angle),(r+offset)*Math.sin(angle),z]);
      }return points;
    });
    const faces=[{points:[...rings[0]].reverse(),color},{points:rings[1],color}];
    for(let i=0;i<rings[0].length;i++){const j=(i+1)%rings[0].length;faces.push({points:[rings[0][i],rings[0][j],rings[1][j],rings[1][i]],color});}
    // Small shaft caps make the axial depth visible in the projection.
    for(const z of [-.69,.69])faces.push({points:Array.from({length:24},(_,i)=>[cx+.19*Math.cos(i*Math.PI/12),.19*Math.sin(i*Math.PI/12),z]),color:[122,137,157]});
    return faces;
  }
  function draw(){
    const w=Math.max(240,canvas.clientWidth),h=Math.max(205,w*.58),dpr=Math.min(2,devicePixelRatio||1);
    if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
    const project=p=>[w/2+p[0]*w*.94/(7+p[2]),h*.5+p[1]*w*.94/(7+p[2])];
    const faces=[...mesh(-1.8,1.08,18,state.angle,1,[224,154,30]),...mesh(1.08,1.8,30,Math.PI-Math.PI/30-state.angle*18/30,-1,[0,158,151])].map(f=>{const points=f.points.map(rotate);return {...f,points,depth:points.reduce((s,p)=>s+p[2],0)/points.length};}).sort((a,b)=>b.depth-a.depth);
    for(const face of faces){const n=normal(...face.points.slice(0,3)),light=clamp(.62+.34*Math.abs(n[0]*.3+n[1]*.4+n[2]*.85),.35,1),rgb=face.color.map(x=>Math.round(x*light));ctx.fillStyle='rgb('+rgb.join(',')+')';ctx.strokeStyle='rgba(50,65,80,.15)';ctx.lineWidth=.5;ctx.beginPath();face.points.forEach((p,i)=>{const q=project(p);i?ctx.lineTo(...q):ctx.moveTo(...q);});ctx.closePath();ctx.fill();ctx.stroke();}
    document.getElementById('betav').textContent=state.beta+'°';document.getElementById('yawv').textContent=state.yaw+'°';
    document.getElementById('beta').value=state.beta;document.getElementById('yaw').value=state.yaw;
  }
  function tick(t){if(!playing)return;const dt=last?Math.min(.05,(t-last)/1000):0;last=t;if(VIE.visible){state.angle+=dt;draw();}raf=requestAnimationFrame(tick);}
  document.getElementById('play').onclick=event=>{playing=!playing;event.target.textContent=playing?'暂停':'播放';last=0;if(playing)raf=requestAnimationFrame(tick);else{cancelAnimationFrame(raf);VIE.setState(state);}};
  for(const key of ['beta','yaw'])document.getElementById(key).oninput=event=>{state={...state,[key]:Number(event.target.value)};draw();VIE.setState(state);};
  window.addEventListener('vie:themechange',draw);window.addEventListener('resize',draw);draw();
}
const figure=(title,html,css,app,state,height=360)=>({type:'figure',title,html,css,js:'('+app.toString()+')();',state,height});
export const examples={
  rgb:{title:'RGB加色：从三个数值到一种颜色',blocks:[
    {type:'text',body:'屏幕用红、绿、蓝三种光的强度组合颜色。先改变一个通道，再比较三个通道都取最大值与都取零的情况。'},
    figure('动手混合三种光','<div id="swatch"><strong id="hex"></strong><span id="rgbvalue"></span></div><div class="channels">'+['r','g','b'].map((k,i)=>'<label>'+['红 R','绿 G','蓝 B'][i]+' <output id="'+k+'v"></output><input id="'+k+'" aria-label="'+['红色通道','绿色通道','蓝色通道'][i]+'" type="range" min="0" max="255" step="1"></label>').join('')+'</div><div class="controls"><button id="white">全部拉满</button><button id="black">全部归零</button></div>',
      '#swatch{min-height:160px;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:18px}#hex{font-size:29px;letter-spacing:.03em}.channels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-bottom:16px}.channels label{font-weight:600}.channels output{display:block;font-weight:400}.channels input{width:100%}',rgbApp,{r:80,g:130,b:240}),
    {type:'text',title:'为什么“全开”得到白色？',body:'这是光的加色混合。三个通道都归零时不发光，显示黑色；都拉满时显示白色。它与颜料混合的机制不同。'}]},
  binary:{title:'二分查找：每一步排除一半候选',blocks:[
    {type:'text',body:'二分查找要求数据有序。下方数组固定为升序；选择目标，逐次比较中点，观察候选区间怎样缩小。'},
    figure('目标与搜索区间','<div class="controls"><label>目标 <output id="targetv"></output><input id="target" aria-label="查找目标" type="range" min="0" max="80" step="1"></label><button id="next">比较下一步</button><button id="restart">重新查找</button></div><div id="cells"></div><p id="status" aria-live="polite"></p><p class="muted">橙色：当前中点；蓝色：候选；灰色：已排除；绿色：找到。</p>',
      '#cells{display:grid;grid-template-columns:repeat(11,minmax(0,1fr));gap:3px;margin-top:24px}.cell{text-align:center;border-radius:7px;padding:9px 1px;border:1px solid var(--vie-stroke)}.cell small{display:block;font-size:10px}.cell strong{font-size:14px}.active{background:#5483ef20}.mid{background:#dc930e44;border-color:#dc930e}.off{opacity:.38}.found{background:#009f9640;border-color:#009f96}#status{min-height:48px;font-weight:600}',binaryApp,{target:39,step:0}),
    {type:'text',title:'可以概括出的规律',body:'只有当前区间中可能含有目标的那一半会被保留。找到目标或区间为空时停止。这里展示的是有序数组上的标准二分过程，不把无序数据直接交给二分查找。'}]},
  helix:{title:'斜齿轮：沿齿宽方向观察齿线扭转',blocks:[
    {type:'text',body:'斜齿的特征在齿宽方向。改变螺旋角和观察方向，比较“正面轮廓相似”与“沿轴向结构不同”；点击播放观察两轮的相反转向。'},
    figure('三维投影与螺旋角','<canvas id="gears" aria-label="两片有轴向扭转的近似齿轮三维投影"></canvas><div class="controls"><button id="play">播放</button><label>螺旋角 β <output id="betav"></output><input id="beta" aria-label="螺旋角" type="range" min="0" max="35" step="1"></label><label>观察方向 <output id="yawv"></output><input id="yaw" aria-label="观察方向" type="range" min="-65" max="65" step="1"></label></div><p class="muted">橙色18齿 · 青色30齿 · 平行轴结构示意</p>',
      'canvas{width:100%;background:var(--vie-layer);border-radius:12px;margin-bottom:16px}.controls label{flex:1;min-width:110px}.controls input{display:block;width:100%}',helixApp,{beta:24,yaw:-28,angle:0},430),
    {type:'text',title:'这个画面回答什么',body:'画面用程序逐帧生成空间顶点、透视投影和明暗，展示齿线沿轴向的扭转。齿廓与啮合为近似示意，未计算真实渐开螺旋面、接触线或载荷；这些结论需要独立的几何和力学模型。'}]}
};
