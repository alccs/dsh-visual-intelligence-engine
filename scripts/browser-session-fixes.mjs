import {VERSION} from './version-info.mjs';
/** Real model error patterns, source-linked runtime reports and offline 3D. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {browserDriver} from './browser-driver.mjs';
const b=browserDriver('session-fixes'),checks=[],pass=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS '+name);};
const attr=(selector,name)=>{b.enter();const v=b.value(b.run('get','attr',selector,name));b.main();return v;};
const frameClick=selector=>{b.enter();b.run('click',selector);b.main();b.frames();};
try{
 b.open('fast');b.run('set','viewport','1000','1200');
 const legacy={blocks:[{type:'figure',html:'<div id="p"></div>',height:150,js:'const g=VIE.svg({root:"#p",width:520,height:240});g.label({x:120,y:45,text:"SVG 参数兼容",size:11,color:"#475569"});g.circle({cx:120,cy:100,r:20,fill:"#dc2626",stroke:"#334155",width:1.2,opacity:.75});g.rect({x:200,y:70,width:150,height:80,rx:6,fill:"#f8fafc",stroke:"#cbd5e1",strokeWidth:1.2});'}]};
 b.ev('window.__reports=[];VIEDemo.bridge.setReporter((sessionId,value)=>__reports.push({sessionId,...value}));VIEDemo.setSource(VIE.documentSceneSource('+JSON.stringify(legacy)+'),"legacy-input")');b.run('wait','iframe[data-vie-ready="true"]');
 pass('the generated SVG-style x/y/cx/cy/r/size/color pattern really renders',Number(attr('circle','cx'))===120&&Number(attr('rect','width'))===150&&attr('circle','fill')==='#dc2626');
 pass('ready is reported to the Host adapter with a source identity',b.ev('__reports.some(r=>r.nodeId==="block1"&&r.status==="ready"&&typeof r.sourceKey==="string")'));
 legacy.blocks[0].js='const g=VIE.svg({root:"#p"});g.rect({x:30,y:20,width:150,height:80,width:1.2});';
 b.ev('VIEDemo.setSource(VIE.documentSceneSource('+JSON.stringify(legacy)+'),"duplicate-field")');b.run('wait','.vie-generated-error');
 pass('duplicate rectangle width is diagnosed before executing a misleading drawing',b.ev('document.querySelector(".vie-generated-error").textContent.includes("VIE_SDK_DUPLICATE_FIELD")&&__reports.some(r=>r.status==="error"&&r.error.includes("rect.width"))'));
 const snapshot=b.run('snapshot','-i'),repair=Object.entries(snapshot.refs??{}).find(([,v])=>v.role==='button'&&v.name==='修复这张图');assert.ok(repair);b.run('click','@'+repair[0]);pass('repair action fills the Harness draft with the failing block and never auto-sends',b.ev('document.querySelector("#draft").value.includes("baseRevision")&&document.querySelector("#draft").value.includes("rect.width")'));
 b.ev('VIEDemo.select("sdk-coordinates")');b.run('wait','iframe[data-vie-ready="true"]');
 pass('data point and on-screen readout share the same coordinate mapping',Math.abs(Number(attr('circle','cx'))-348.55)<1e-8&&Math.abs(Number(attr('circle','cy'))-220.14)<1e-8);
 b.ev('window.__threeDoc=structuredClone(VIESDKExamples.scene3d);__threeDoc.blocks[0].js+=\';requestAnimationFrame(()=>requestAnimationFrame(()=>{const size=s.renderer.getDrawingBufferSize(new s.THREE.Vector2()),gl=s.renderer.getContext(),pixels=new Uint8Array(size.x*size.y*4);s.renderer.render(s.scene,s.camera);gl.readPixels(0,0,size.x,size.y,gl.RGBA,gl.UNSIGNED_BYTE,pixels);let painted=0;for(let i=3;i<pixels.length;i+=4)if(pixels[i])painted++;VIE.setState({...VIE.state,threeRevision:s.THREE.REVISION,paintedPixels:painted});}));\';window.__raw=JSON.stringify(__threeDoc);window.__partial=__raw.slice(0,__raw.indexOf("\\\"js\\\":")+8);VIEDemo.preview({text:k=>k==="spec"?__partial:undefined,value:()=>undefined,complete:()=>false,closed:()=>false},"lazy-three")');b.run('wait','iframe[data-vie-status="preview"]');
 b.ev('window.__threeFrame=document.querySelector("iframe");window.__threeSource=__threeFrame.srcdoc;VIEDemo.setSource(VIE.documentSceneSource(__threeDoc),"lazy-three")');b.run('wait','iframe[data-vie-ready="true"]');
 b.enter();b.run('wait','canvas[data-vie3d-rendered="true"]');b.main();b.frames();
 pass('a streamed 3D figure loads the local library in the same iframe document',b.ev('document.querySelector("iframe")===__threeFrame&&__threeFrame.srcdoc===__threeSource&&VIEDemo.context.figures.block1.state.threeRevision==="160"'));
 pass('Three.js produces actual nonempty WebGL pixels rather than a fake API',b.ev('VIEDemo.context.figures.block1.state.paintedPixels>100'));
 const original=attr('canvas','data-vie3d-camera');frameClick('#scene > .vie-sdk-transport button:first-child');pass('native zoom controls change the real perspective camera',attr('canvas','data-vie3d-camera')!==original);frameClick('#scene > .vie-sdk-transport button:nth-child(3)');pass('camera reset restores its original view',attr('canvas','data-vie3d-camera')===original);
 frameClick('#scene > .vie-sdk-transport:last-child button:nth-child(2)');pass('3D motion uses the same local step and state recovery path',b.ev('VIEDemo.context.figures.block1.state.motion.elapsed>0'));
 b.run('set','viewport','390','1000');b.frames();pass('3D shell and controls fit a phone viewport',b.ev('document.documentElement.scrollWidth<=innerWidth&&!document.querySelector(".vie-generated-error")'));b.run('click','#theme');b.frames();pass('3D theme changes retain the live figure',b.ev('document.querySelector("iframe").dataset.vieReady==="true"'));
 b.ev('VIEDemo.select("sdk-worm3d")');b.run('wait','iframe[data-vie-ready="true"]');b.enter();b.run('wait','canvas[data-vie3d-rendered="true"]');const text=b.value(b.run('get','text','#ratio'));b.main();pass('two-start example uses its actual parameters for the teaching readout',String(text).includes('40 / 2 = 20')&&String(text).includes('推进 2 齿'));
 b.run('focus','#stage input[type="range"]');b.run('press','Home');b.frames();b.enter();const oneStart=b.value(b.run('get','text','#ratio'));b.main();pass('shared controls update the 3D geometry and ratio locally',String(oneStart).includes('40 / 1 = 40')&&String(oneStart).includes('推进 1 齿'));
 b.run('set','viewport','1000','1100');b.run('click','#theme');b.ev('document.querySelector("#draft").value=""');b.frames();
 b.run('screenshot','--full',path.join(b.root,("screenshots/sdk-3d-"+VERSION+".png")));
 fs.writeFileSync(path.join(b.root,'docs/validation/session-fixes-browser.json'),JSON.stringify({passed:true,checks,externalModelRequests:0},null,2));
}finally{b.close();}
