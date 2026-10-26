/** Public synthetic example. Shows production controls, not prototype CSS. */
export const controlsA={title:'A 风格 · 通用交互组件',controls:[
 {key:'amount',label:'共享滑块',min:0,max:100,step:1,value:40},
 {key:'count',label:'数值输入',kind:'number',min:0,max:20,step:1,value:4},
 {key:'enabled',label:'显示图形',kind:'toggle',value:1},
 {key:'mode',label:'分段选择',kind:'select',min:0,max:1,step:1,value:0,options:[{label:'原理',value:0},{label:'细节',value:1}]}
],blocks:[{type:'figure',title:'按钮、滑块与输入框使用同一套规范',height:470,state:{offset:5,localEnabled:1,selection:'all'},bindings:{amount:'amount',enabled:'enabled'},
 html:'<div id="toolbar"></div><div id="plot"></div><div id="readouts"></div><div class="demo-fields"><label>图内滑块 <input id="local-range" type="range" min="-20" max="80" value="5"></label><label>图内数值 <input id="local-number" type="number" min="-20" max="80" value="5"></label><label>显示范围 <select id="local-select"><option value="all">显示全部</option><option value="key">只看关键点</option></select></label><label>辅助信息 <input id="local-switch" type="checkbox" role="switch" checked></label></div>',
 css:'.demo-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(180px,100%),1fr));gap:16px;align-items:center}.demo-fields label{font-size:12px;color:var(--vie-muted)}.demo-fields input:not([type=checkbox]),.demo-fields select{width:100%;margin-top:6px}',
 js:`const commit=patch=>VIE.setState({...VIE.state,...patch});
const toolbar=VIE.ui.toolbar({root:'#toolbar',items:[
 {id:'advance',label:'主要操作 +5',variant:'primary',onClick:s=>commit({offset:Math.min(80,(s.offset??5)+5)})},
 {id:'restore',label:'次要操作 · 复位',onClick:()=>commit({offset:5})},
 {id:'details',label:'文字操作',variant:'ghost',onClick:s=>commit({localEnabled:s.localEnabled?0:1})},
 {id:'unavailable',label:'暂不可用',disabled:true,onClick:()=>{}}
]});
const g=VIE.svg({root:'#plot',width:520,height:160}),dot=g.circle({at:[150,60],radius:18,tone:'primary',fill:true}),label=g.label({at:[260,130],text:'同一份状态，驱动图形和组件',anchor:'middle'});
g.line({from:[35,60],to:[485,60],tone:'muted'});
VIE.ui.readouts({root:'#readouts',items:[{id:'local',label:'图内参数',value:s=>s.offset??5},{id:'shared',label:'共享参数',value:s=>s.amount},{id:'status',label:'本地状态',value:s=>s.localEnabled?'开启':'关闭'}]});
VIE.onState(s=>{document.getElementById('local-range').value=s.offset??5;document.getElementById('local-number').value=s.offset??5;document.getElementById('local-switch').checked=!!s.localEnabled;document.getElementById('local-select').value=s.selection??'all';dot.set({at:[35+4.5*s.amount,60],opacity:s.enabled?1:.2});});
document.getElementById('local-range').oninput=e=>commit({offset:Number(e.target.value)});
document.getElementById('local-number').onchange=e=>{if(e.target.value!==''&&e.target.validity.valid)commit({offset:Number(e.target.value)});};
document.getElementById('local-switch').onchange=e=>commit({localEnabled:e.target.checked?1:0});
document.getElementById('local-select').onchange=e=>commit({selection:e.target.value});`
}]};
