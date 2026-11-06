/** Real input must change SVG geometry; lifecycle and old drawing APIs remain usable. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
import {browserDriver} from './browser-driver.mjs';import {VERSION} from './version-info.mjs';
const b=browserDriver('0312'),checks=[];
const pass=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS '+name);};
const attr=(selector,name)=>{b.enter();const value=b.value(b.run('get','attr',selector,name));b.main();return value;};
const html=selector=>{b.enter();const value=b.value(b.run('get','html',selector));b.main();return value;};
const click=selector=>{b.enter();b.run('click',selector);b.main();b.frames();};
const doc={title:'尺寸与中心位置',controls:[{key:'size',label:'尺寸',min:40,max:200,value:80,step:1}],derive:{center:'size/2'},blocks:[{type:'figure',title:'参数变化驱动图形',height:300,bindings:{size:'size',center:'center'},html:'<div id="plot"></div><output id="draws" data-count="0"></output><button id="dispose">清理绘图</button><button id="redraw">重新绘制</button>',js:`
let first;
const drawing=VIE.svg({root:'#plot',width:520,height:240,draw:({g,state})=>{
 const counter=document.querySelector('#draws');counter.dataset.count=String(Number(counter.dataset.count)+1);
 const rectangle=g.rect({at:[40,70],width:state.size,height:80,fill:'primary'});
 const center=g.circle({at:[40+state.center,110],radius:6,fill:'accent'});
 g.label({at:[300,30],text:'尺寸 '+state.size,anchor:'start'});g.connect(rectangle,center);first??=rectangle;
}});
document.querySelector('#dispose').addEventListener('click',()=>drawing.dispose());
document.querySelector('#redraw').addEventListener('click',()=>{first?.set({width:1});drawing.redraw();});`} ]};
try{
 b.open('sdk-geometry');b.run('set','viewport','1080','1200');
 b.ev('VIEDemo.setSource(VIE.documentSceneSource('+JSON.stringify(doc)+'),"managed-svg")');b.run('wait','iframe[data-vie-ready="true"]');b.run('snapshot','-i');
 const width=()=>Number(attr('[data-vie-primitive="rect"] rect','width'));
 const center=()=>Number(attr('[data-vie-primitive="circle"] circle','cx'));
 pass('managed SVG draws the initial bound values',width()===80&&center()===80);
 b.run('focus','#stage input[type=range]');b.run('press','End');b.frames();
 pass('keyboard input updates actual rectangle, center and readout',width()===200&&center()===140&&html('#plot').includes('尺寸 200'));
 for(let n=0;n<2;n++){b.run('focus','#stage input[type=range]');b.run('press',n%2?'End':'Home');b.frames();}
 pass('repeated updates retain one viewport, one marker and four drawing objects',(()=>{const content=html('#plot');return (content.match(/class="vie-sdk-viewport"/g)??[]).length===1&&(content.match(/<marker /g)??[]).length===1&&(content.match(/data-vie-primitive=/g)??[]).length===4;})());
 b.run('focus','#stage input[type=range]');b.run('press','Home');b.frames();
 b.ev('document.querySelector("#stage input[type=range]").scrollIntoView({block:"center"});true');b.frames();
 const rect=b.ev('(()=>{const r=document.querySelector("#stage input[type=range]").getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}})()');
 assert.ok([rect.x,rect.y,rect.width,rect.height].every(Number.isFinite),'Observed slider bounds: '+JSON.stringify(rect));
 const startX=String(Math.round(rect.x+9)),endX=String(Math.round(rect.x+rect.width*.73)),pointerY=String(Math.round(rect.y+rect.height/2));
 b.run('mouse','move',startX,pointerY);b.run('mouse','down');b.run('mouse','move',endX,pointerY,'--steps','8');b.run('mouse','up');b.frames();
 const state=b.ev('VIEDemo.context.figures.block1.state');
 pass('real pointer dragging changes both geometry and derived center',state.size>100&&width()===state.size&&center()===40+state.size/2);
 const count=Number(attr('#draws','data-count'));b.run('click','#theme');b.frames();
 pass('theme change redraws without losing shared parameters',Number(attr('#draws','data-count'))>count&&width()===state.size);
 b.ev('VIEDemo.remount()');b.run('wait','iframe[data-vie-ready="true"]');
 pass('remount restores geometry from the saved shared state',width()===state.size&&center()===40+state.size/2);
 b.run('click','.vie-generated-figure .vie-figure-actions button:last-child');b.frames();
 pass('reset returns controls, rectangle and derived center to initial values',width()===80&&center()===80&&b.ev('Number(document.querySelector("#stage input[type=range]").value)')===80);
 click('#redraw');pass('explicit redraw clears old objects and keeps current geometry',width()===80&&(html('#plot').match(/data-vie-primitive=/g)??[]).length===4);
 const beforeDispose=Number(attr('#draws','data-count'));click('#dispose');b.run('focus','#stage input[type=range]');b.run('press','End');b.frames();click('#redraw');
 pass('dispose cancels subscriptions and cannot resurrect removed SVG',!html('#plot').includes('<svg')&&Number(attr('#draws','data-count'))===beforeDispose);
 const errors=b.run('errors').errors??[];pass('no browser runtime errors',errors.length===0);
 fs.writeFileSync(path.join(b.root,'docs/validation/0312-browser.json'),JSON.stringify({version:VERSION,passed:true,checks,errors},null,2));
}finally{b.close();}
