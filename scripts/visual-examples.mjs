/** Ordinary visual-only input; not an engine template or topic registration. */
export const linkedMotion={title:'一个速度，两张图',controls:[{key:'speed',label:'速度 v（m/s）',min:1,max:6,value:3,step:.5}],blocks:[
 {type:'chart',title:'位移 s = vt',x:{min:0,max:10,label:'时间 t / s'},y:{min:0,max:60,label:'位移 s / m'},series:[{label:'s=vt',expr:'v*x'}],bindings:{v:'speed'}},
 {type:'chart',title:'速度 v 不随时间改变',x:{min:0,max:10,label:'时间 t / s'},y:{min:0,max:6,label:'速度 v / (m/s)'},series:[{label:'v',expr:'v',tone:'secondary'}],bindings:{v:'speed'}}
]};
