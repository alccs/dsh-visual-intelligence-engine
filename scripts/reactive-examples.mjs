/** Ordinary input to the generic engine; no subject registration is involved. */
export const reactiveWave={title:'参数改变，三个视图一起更新',layout:'grid',controls:[
  {key:'A',label:'振幅 A',kind:'number',min:0,max:6,value:2,step:1},
  {key:'freq',label:'频率系数',kind:'select',min:1,max:3,value:1,step:1,options:[{label:'1 倍',value:1},{label:'2 倍',value:2},{label:'3 倍',value:3}]},
  {key:'enabled',label:'启用振动',kind:'toggle',value:1},
  {key:'t',label:'观察时刻 t',min:0,max:6,value:1,step:0.1}
],derive:{sample:'enabled*A*sin(freq*t)'},blocks:[
  {type:'chart',title:'y = A sin(ωt)',x:{min:0,max:6,label:'时间 t'},y:{min:-6,max:6,label:'位移'},bindings:{A:'A',w:'freq',on:'enabled',sample:'sample'},series:[{label:'完整波形',expr:'on*A*sin(w*x)'},{label:'当前时刻位移',expr:'sample'}]},
  {type:'visual',kind:'Diagram',spec:{title:'同一计算值驱动位置与读数',width:360,height:180,shapes:[{k:'line',x1:20,y1:90,x2:340,y2:90,tone:'muted'},{k:'circle',cx:{$bind:'/derived/sample',scale:24,offset:180},cy:90,r:18,fill:true,tone:'secondary'},{k:'text',x:180,y:145,t:'位移 {{/derived/sample|fixed:2}}',anchor:'middle'}]}},
  {type:'figure',title:'自由图形也可读写共享参数',height:200,bindings:{amplitude:'A',sample:'sample',time:'t'},html:'<div class="card"><svg viewBox="0 0 320 110" aria-label="当前位移"><path d="M16 55H304" stroke="var(--vie-stroke)"/><circle id="dot" cy="55" r="15" fill="var(--vie-secondary)"/><text id="value" x="160" y="100" text-anchor="middle" fill="var(--vie-ink)"></text></svg><button id="increase" type="button">振幅 +1</button></div>',js:'function draw(){const s=VIE.state;document.querySelector("#dot").setAttribute("cx",160+22*s.sample);document.querySelector("#value").textContent="A="+s.amplitude+"，位移="+(s.sample===null?"暂不可用":s.sample.toFixed(2));}addEventListener("vie:statechange",draw);document.querySelector("#increase").onclick=()=>VIE.setState({...VIE.state,amplitude:Math.min(6,VIE.state.amplitude+1)});draw();'}
]};
