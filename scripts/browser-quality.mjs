import {VERSION} from './version-info.mjs';
/** End-to-end controls, anchored geometry, warnings, fallback and GPU redraw regression. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {browserDriver} from './browser-driver.mjs';
const b=browserDriver('quality'),checks=[];
const pass=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS '+name);};
const show=(figure,id)=>{
 const raw=JSON.stringify({title:figure.title,blocks:[{type:'figure',...figure}]});
 b.ev('window.__qualityRaw='+JSON.stringify(raw)+';VIEDemo.setSource(VIE.documentSceneSource(JSON.parse(__qualityRaw)),'+JSON.stringify(id)+')');
};
const frameRead=(command,selector,name)=>{b.enter();const value=b.value(b.run('get',command,selector,...(name?[name]:[])));b.main();return value;};
try{
 b.open('sdk-geometry');b.run('wait','iframe[data-vie-ready="true"]');
 show({title:'通用控件与连线',html:'<div id="plot"></div><div id="ui"></div>',height:380,state:{dx:0},js:`const g=VIE.svg({root:'#plot',width:520,height:220});
 const a=g.rect({at:[40,60],width:80,height:50}),group=g.group({translate:[300,0]});const c=group.circle({at:[20,85],radius:25});
 g.connect(a,c,{label:'关系'});const toolbar=VIE.ui.toolbar({root:'#ui',items:[{id:'move',label:'移动',onClick:()=>VIE.setState({...VIE.state,dx:60})},{id:'reset',label:'还原',onClick:()=>VIE.setState({...VIE.state,dx:0})}]});
 VIE.ui.readouts({root:'#ui',items:[{id:'offset',label:'位移',value:s=>s.dx,unit:'px'}]});VIE.onState(s=>{a.set({at:[40+s.dx,60]});toolbar.set('move',{pressed:s.dx>0});});`},'controls-and-anchors');
 b.run('wait','iframe[data-vie-ready="true"]');
 pass('connectors attach to transformed geometry rather than copied coordinates',Number(frameRead('attr','[data-vie-primitive=arrow] line','x2'))===295);
 b.enter();b.run('click','[data-vie-action="move"]');b.main();b.frames();
 pass('local control updates anchored line and readout together',Number(frameRead('attr','[data-vie-primitive=arrow] line','x1'))===180&&frameRead('text','.vie-sdk-readouts dd')==='60 px');
 pass('toolbar exposes state using shared accessible controls',frameRead('attr','[data-vie-action=move]','aria-pressed')==='true');
 for(const width of [1280,390,320]){
  b.run('set','viewport',String(width),'1000');b.frames();
  pass('shared controls fit the viewport at '+width,b.ev('document.documentElement.scrollWidth<=innerWidth')&&frameRead('text','[data-vie-action=move]')==='移动');
 }
 b.run('screenshot','--full',path.join(b.root,("screenshots/shared-controls-"+VERSION+".png")));
 show({title:'布局提示',html:'<svg viewBox="0 0 400 180"><text x="120" y="90">标注甲</text><text x="120" y="90">标注乙</text></svg>',height:220},'layout-advisory');
 b.run('wait','iframe[data-vie-ready="true"]');b.run('wait','[data-vie-layout-warning]');
 pass('overlapping labels produce an advisory without blocking the graph',b.ev('document.querySelector("iframe").dataset.vieReady==="true"&&document.querySelector("[data-vie-layout-warning]").textContent.includes("重叠")&&!document.querySelector(".vie-generated-error")'));
 show({title:'失败后的静态图',html:'<svg viewBox="0 0 400 180" onclick="window.unexpected=true"><circle cx="200" cy="90" r="35" fill="#5483ef"/><text x="140" y="150">已有静态内容</text></svg>',js:'throw Error("quality-runtime-error")',height:220},'static-fallback');
 b.run('wait','iframe[data-vie-status="error"]');b.run('find','role','button','click','--name','查看静态预览');b.run('wait','iframe[data-vie-status="fallback"]');
 pass('fallback keeps the error visible and does not report interactive success',b.ev('document.querySelector("iframe").dataset.vieReady==="false"&&document.querySelector(".vie-generated-error").textContent.includes("quality-runtime-error")'));
 pass('static fallback sanitizes event handlers and stays inert',frameRead('attr','#vie-root','data-vie-preview')==='true'&&!frameRead('html','#vie-root').includes('onclick='));
 show({title:'三维绘制预算',html:'<div id="plot"></div>',height:340,js:`const scene=VIE.scene3d({root:'#plot',height:260,maxVertices:1000});scene.box({});
 (async()=>{await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);const s=scene,original=s.renderer.setSize.bind(s.renderer);let resizeCalls=0;s.renderer.setSize=(...args)=>{resizeCalls++;return original(...args)};for(let i=0;i<3;i++){s.orbit(2,0);await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);}let budget=false;try{s.sphere({radius:.3});s.sphere({radius:.3});}catch(error){budget=error.message.includes('VIE_3D_GEOMETRY_BUDGET');}VIE.setState({...VIE.state,gpu:{resizeCalls,budget,preserve:s.renderer.getContext().getContextAttributes().preserveDrawingBuffer}});})();`},'gpu-quality');
 b.run('wait','iframe[data-vie-ready="true"]');b.run('scrollintoview','iframe');
 b.run('wait','--fn','!!VIEDemo.context.figures.block1.state.gpu');const gpu=b.ev('VIEDemo.context.figures.block1.state.gpu');
 pass('camera redraws do not resize unchanged GPU drawing buffers',gpu.resizeCalls===0);
 pass('drawing-buffer retention is explicit and scene complexity is bounded',gpu.preserve===false&&gpu.budget===true);
 fs.writeFileSync(path.join(b.root,'docs/validation/quality-browser.json'),JSON.stringify({passed:true,checks,externalModelRequests:0},null,2));
}catch(error){b.main();console.error(JSON.stringify(b.ev('({error:document.querySelector(".vie-generated-error")?.textContent,state:VIEDemo.context,frame:document.querySelector("iframe")?.dataset})')));throw error;}finally{b.close();}
