import {VERSION} from './version-info.mjs';
/** Partial figure source through the production tool view, not a stand-alone mock. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {browserDriver} from './browser-driver.mjs';
const b=browserDriver('preview'),checks=[];const pass=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS '+name);};
const child=(op,selector,name)=>{b.enter();const v=b.value(b.run('get',op,selector,...(name?[name]:[])));b.main();return v;};
const preview=`VIEDemo.preview({text:k=>k==='spec'?window.__partial:undefined,value:()=>undefined,complete:()=>false,closed:()=>false},'progressive-probe')`;
try{
 b.open('sdk-geometry');
 const document={title:'渐进式生成',blocks:[{type:'figure',title:'先看静态图，再启用交互',html:'<svg id="static" viewBox="0 0 400 160" onload="VIE.setState({unexpected:1})"><text id="label" x="40" y="80">静态步骤一</text></svg><button onclick="VIE.setState({unexpected:2})">预览控件</button>',js:'VIE.setState({...VIE.state,executions:(VIE.state.executions||0)+1});document.getElementById("label").textContent="交互已就绪";',state:{seed:42}}]};
 b.ev('window.__doc='+JSON.stringify(document)+';window.__raw=JSON.stringify(__doc);window.__partial=__raw.slice(0,__raw.indexOf("executions")+4);'+preview);
 b.run('wait','iframe[data-vie-status="preview"]');
 pass('partial HTML appears before JavaScript closes',String(child('text','#label')).includes('静态步骤一'));
 pass('preview strips executable HTML attributes',child('attr','#static','onload')===null);
 pass('preview controls are inert',child('attr','#vie-root','inert')!==null);
 pass('no author script runs during static preview',b.ev('!Object.values(VIEDemo.bridge.getStore(VIEDemo.bridge.sceneKey("offline-demo","progressive-probe")).context().figures).some(x=>x.state.executions||x.state.unexpected)'));
 b.ev('window.__previewFrame=document.querySelector("iframe");window.__previewSrc=__previewFrame.srcdoc;__doc.blocks[0].html=__doc.blocks[0].html.replace("步骤一","步骤二");__raw=JSON.stringify(__doc);__partial=__raw.slice(0,__raw.indexOf("executions")+4);'+preview);b.frames();
 pass('revised static content arrives in the same iframe document',String(child('text','#label')).includes('静态步骤二')&&b.ev('document.querySelector("iframe")===__previewFrame&&__previewFrame.srcdoc===__previewSrc'));
 b.ev('__doc.blocks[0].html=__doc.blocks[0].html.replace(/ onload="[^"]*"/g,"");VIEDemo.setSource(VIE.documentSceneSource(__doc),"progressive-probe")');b.run('wait','iframe[data-vie-ready="true"]');
 pass('finalization keeps the actual iframe and its document',b.ev('document.querySelector("iframe")===__previewFrame&&__previewFrame.srcdoc===__previewSrc'));
 pass('complete code executes exactly once and updates real content',String(child('text','#label')).includes('交互已就绪')&&b.ev('Object.values(VIEDemo.context.figures).some(x=>x.state.executions===1&&x.state.seed===42)'));
 b.ev('VIEDemo.setSource(VIE.documentSceneSource(__doc),"progressive-probe")');b.frames();pass('repeated final result does not execute code twice',b.ev('Object.values(VIEDemo.context.figures).some(x=>x.state.executions===1&&x.state.seed===42)'));
 pass('preview and ready timing are measured independently',b.ev('Number(document.querySelector("iframe").dataset.viePreviewMs)>=0&&Number(document.querySelector("iframe").dataset.vieReadyMs)>Number(document.querySelector("iframe").dataset.viePreviewMs)'));
 b.run('screenshot','--full',path.join(b.root,("screenshots/progressive-final-"+VERSION+".png")));
 b.ev('__doc.blocks[0].js='+JSON.stringify('throw Error("可定位运行错误")')+';VIEDemo.setSource(VIE.documentSceneSource(__doc),"progressive-probe")');b.run('wait','.vie-generated-error');
 pass('runtime failure remains error rather than false ready',b.ev('document.querySelector("iframe").dataset.vieReady==="false"&&document.querySelector(".vie-generated-error").textContent.includes("可定位运行错误")'));
 fs.writeFileSync(path.join(b.root,'docs/validation/preview-browser.json'),JSON.stringify({passed:true,checks,externalModelRequests:0},null,2));
}finally{b.close();}
