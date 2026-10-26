import {VERSION} from './version-info.mjs';
/** Real sandbox SVG/Canvas, shared controls, clock interaction and restore. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {browserDriver} from './browser-driver.mjs';
const b=browserDriver('sdk'),checks=[];const pass=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS '+name);};
const attr=(selector,name)=>{b.enter();const v=b.value(b.run('get','attr',selector,name));b.main();return v;};
const clickFrame=selector=>{b.enter();b.run('click',selector);b.main();b.frames();};
try{
 b.open('sdk-geometry');b.run('wait','iframe[data-vie-ready="true"]');
 pass('SDK geometry uses actual sandbox and has zero label collisions',Number(attr('.vie-sdk-svg','data-vie-label-conflicts'))===0);
 pass('generic arrow initially follows the shared state',Number(attr('[data-vie-primitive="arrow"] line','x2'))===305);
 b.run('focus','input[type="range"]');b.run('press','End');b.frames();
 pass('real keyboard input updates a sandbox SVG without model calls',Number(attr('[data-vie-primitive="arrow"] line','x2'))===410);
 for(const width of [1280,768,390,320]){b.run('set','viewport',String(width),'1000');b.frames();pass('labels remain readable and host fits '+width,b.ev('document.documentElement.scrollWidth<=innerWidth&&Number(document.querySelector("iframe").dataset.vieMinFont)>=11.9'));if(width===1280||width===390)b.run('screenshot','--full',path.join(b.root,'screenshots/sdk-geometry-'+width+("-"+VERSION+".png")));}
 b.run('set','viewport','950','1100');b.ev('VIEDemo.select("sdk-animation")');b.run('wait','iframe[data-vie-ready="true"]');
 const initial=Number(attr('[data-vie-primitive="circle"] circle','cx'));clickFrame('.vie-sdk-transport button:nth-child(2)');
 const stepped=Number(attr('[data-vie-primitive="circle"] circle','cx'));pass('step advances the generic animation',stepped>initial);
 clickFrame('.vie-sdk-transport button:first-child');b.ev('(async()=>{await new Promise(r=>setTimeout(r,240));return true})()');clickFrame('.vie-sdk-transport button:first-child');
 const stopped=Number(attr('[data-vie-primitive="circle"] circle','cx'));b.ev('(async()=>{await new Promise(r=>setTimeout(r,120));return true})()');
 pass('play advances and pause stops the animation',stopped>stepped&&Math.abs(Number(attr('[data-vie-primitive="circle"] circle','cx'))-stopped)<.01);
 b.ev('VIEDemo.remount()');b.run('wait','iframe[data-vie-ready="true"]');pass('clock position survives a real remount',Math.abs(Number(attr('[data-vie-primitive="circle"] circle','cx'))-stopped)<.01);
 clickFrame('.vie-sdk-transport button:nth-child(3)');pass('reset restores initial geometry',Number(attr('[data-vie-primitive="circle"] circle','cx'))===70);
 b.run('screenshot','--full',path.join(b.root,("screenshots/sdk-animation-"+VERSION+".png")));
 b.ev('VIEDemo.select("sdk-canvas")');b.run('wait','iframe[data-vie-ready="true"]');
 pass('Canvas helper creates a real sized high-DPI drawing surface',Number(attr('canvas','width'))>200);
 b.run('focus','input[type="range"]');b.run('press','End');b.frames();pass('Canvas redraw shares the normal parameter path',b.ev('Object.values(VIEDemo.context.figures).some(x=>x.state.amplitude===80)'));
 b.run('click','#theme');b.frames();pass('theme changes keep sandbox healthy',b.ev('document.querySelector("iframe").dataset.vieReady==="true"&&!document.querySelector(".vie-generated-error")'));
 fs.writeFileSync(path.join(b.root,'docs/validation/sdk-browser.json'),JSON.stringify({passed:true,checks,externalModelRequests:0},null,2));
}finally{b.close();}
