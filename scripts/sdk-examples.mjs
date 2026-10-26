/** These examples use generic SDK operations, not subject-specific renderers. */
export const sdkExamples={
  worm3d:{title:'三维蜗杆与理想速比',controls:[{key:'starts',label:'蜗杆头数 z₁',min:1,max:4,value:2,step:1},{key:'teeth',label:'蜗轮齿数 z₂',min:20,max:60,value:40,step:1}],blocks:[{type:'figure',title:'本地三维结构与速比示意',html:'<div id="worm-scene"></div><p id="ratio"></p><small>结构与理想速比示意；未校验真实齿面接触，旋向按演示视角约定。</small>',height:480,bindings:{starts:'starts',teeth:'teeth'},js:`const s=VIE.scene3d({root:'#worm-scene',height:320,camera:[5,4,7],target:[0,.3,.4]});
let assembly,worm,wheel,z1=0,z2=0;
VIE.onState(state=>{const a=Number(state.starts),b=Number(state.teeth);if(a===z1&&b===z2)return;z1=a;z2=b;assembly?.remove();assembly=s.group();
const carrier=assembly.group({at:[0,.62,1.4],rotation:[0,0,Math.PI/2]});worm=carrier.group();worm.cylinder({radius:.35,height:4.2,tone:'muted'});
for(let k=0;k<z1;k++)worm.helix({radius:.44,height:4,turns:4,tube:.06,tone:'accent',rotation:[0,k*Math.PI*2/z1,0]});
wheel=assembly.group();wheel.cylinder({radius:1.3,height:.36,tone:'primary'});wheel.cylinder({radius:.3,height:.7,tone:'muted'});
for(let k=0;k<z2;k++){const a=k*Math.PI*2/z2;wheel.box({at:[1.4*Math.cos(a),0,1.4*Math.sin(a)],size:[.23,.4,.1],rotation:[0,-a,0],tone:k===0?'secondary':'primary'});}
document.getElementById('ratio').textContent='|i| = '+z2+' / '+z1+' = '+Number((z2/z1).toFixed(2))+'；蜗杆每圈推进 '+z1+' 齿。';});
VIE.animate({root:'#worm-scene',duration:20000,stateKey:'motion',render:({progress})=>{if(worm){worm.set({rotation:[0,progress*Math.PI*2*z2/z1,0]});wheel.set({rotation:[0,progress*Math.PI*2,0]});}}});`}]},

  coordinates:{title:'数据与坐标同源',blocks:[{type:'figure',title:'数值、位置与读数来自同一数据',html:'<div id="data-plot"></div>',height:300,js:`const g=VIE.svg({root:'#data-plot',width:560,height:300});
const p=g.coordinates({x:[0,100],y:[100,600],bounds:[70,45,450,210]});
g.axes({at:[70,255],xLength:450,yLength:210,xLabel:'成分 / %',yLabel:'温度'});
p.line({from:[0,183],to:[100,183],tone:'muted'});
p.marker({at:[61.9,183],label:'数据点',tone:'accent'});`}]},
  scene3d:{title:'离线三维与通用控件',blocks:[{type:'figure',title:'拖动旋转、滚轮缩放与本地动画',html:'<div id="scene"></div>',height:420,js:`const s=VIE.scene3d({root:'#scene',height:300,title:'三维几何示意'});
const group=s.group();
group.cylinder({radius:.35,height:3.5,tone:'muted',rotation:[0,0,Math.PI/2]});
group.helix({radius:.42,height:3.3,turns:4,tube:.08,tone:'accent',rotation:[0,0,Math.PI/2]});
s.sphere({at:[0,-1.2,0],radius:.75,tone:'secondary'});
VIE.animate({root:'#scene',stateKey:'motion',duration:5000,render:({progress})=>group.set({rotation:[progress*Math.PI*2,0,0]})});`}]},

  geometry:{title:'通用二维图形与参数联动',controls:[{key:'force',label:'作用量',min:20,max:160,value:90,step:1}],blocks:[{type:'figure',title:'同一套图形助手：方向、角度与尺寸',height:320,html:'<div id="plot"></div>',state:{force:90},bindings:{force:'force'},js:`const g=VIE.svg({root:'#plot',width:520,height:260,title:'方向与几何关系'});
g.line({from:[65,200],to:[460,200],tone:'muted'});
g.circle({at:[170,180],radius:28,tone:'muted'});
g.dimension({from:[170,180],to:[410,180],offset:45,label:'参考长度 L',tone:'muted'});
const f=g.arrow({from:[170,180],to:[330,90],label:'作用方向 F'});
g.angle({at:[170,180],radius:42,from:0,to:Math.atan2(.7,1.5)*180/Math.PI,label:'α',tone:'accent'});
VIE.onState(s=>f.set({to:[170+Number(s.force)*1.5,180-Number(s.force)*.7]}));`}]},
  animation:{title:'通用动画时钟',blocks:[{type:'figure',title:'播放、单步、复位与暂停恢复',html:'<div id="motion"></div>',height:330,js:`const g=VIE.svg({root:'#motion',width:520,height:220,title:'周期位置示意'});
g.line({from:[55,120],to:[465,120],tone:'muted'});
const p=g.circle({at:[70,120],radius:15,fill:'primary'});
VIE.animate({root:'#motion',duration:4000,stateKey:'motion',render:({progress})=>p.set({at:[70+380*progress,120]})});`}]},
  canvas:{title:'通用 Canvas 与共享状态',controls:[{key:'amplitude',label:'振幅',min:10,max:80,value:45}],blocks:[{type:'figure',title:'画布自动适配尺寸和参数',html:'<div id="wave"></div>',state:{amplitude:45},bindings:{amplitude:'amplitude'},height:300,js:`VIE.canvas({root:'#wave',height:240,title:'可调节曲线',draw:({ctx,width,height,state})=>{ctx.strokeStyle=VIE.theme.colors.primary;ctx.lineWidth=2;ctx.beginPath();for(let x=0;x<=width;x++){const y=height/2-Number(state.amplitude)*Math.sin(x/width*Math.PI*4);x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}});`}]}
};
