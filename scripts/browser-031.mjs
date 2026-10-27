/** Actual frame readiness, shared stages, styling, diagnostics and iframe keyboard behavior. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {browserDriver} from './browser-driver.mjs';import {VERSION} from './version-info.mjs';
const b=browserDriver('031'),checks=[];
const pass=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS '+name);};
const attr=(selector,name)=>{b.enter();const value=b.value(b.run('get','attr',selector,name));b.main();return value;};
const text=selector=>{b.enter();const value=b.value(b.run('get','text',selector));b.main();return String(value);};
const click=selector=>{b.enter();b.run('click',selector);b.main();b.frames();};
const mount=(document,id)=>{b.ev('VIEDemo.setSource(VIE.documentSceneSource('+JSON.stringify(document)+'),'+JSON.stringify(id)+')');b.frames();};
const figure=(html,js='',css='')=>({blocks:[{type:'figure',title:'Content check',html,js,css}]});
try{
 b.open('shared-stages');b.run('wait','iframe[data-vie-ready="true"]');
 pass('the shared diagram begins with the baseline geometry and values',attr('#particle','cx')==='100'&&text('.vie-sdk-readouts').includes('100'));
 click('.vie-learn-tabs button:nth-child(3)');pass('jumping directly to the final stage applies its geometry and color',attr('#particle','cx')==='440'&&attr('#particle','fill')==='var(--vie-secondary)');
 click('.vie-learn-tabs button:nth-child(2)');pass('going backwards removes the final-stage color and updates the readout',attr('#particle','cx')==='280'&&attr('#particle','fill')==='var(--vie-primary)'&&text('.vie-sdk-readouts').includes('280'));
 b.ev('VIEDemo.remount()');b.run('wait','iframe[data-vie-ready="true"]');pass('history remount restores the same stage',attr('#particle','cx')==='280');
 b.run('click','.vie-figure-actions button:last-child');b.run('wait','iframe[data-vie-ready="true"]');pass('reset restores the baseline geometry and first stage',attr('#particle','cx')==='100'&&text('#phase-name').includes('初始'));
 b.run('click','.vie-figure-actions button:first-child');b.enter();b.run('focus','.vie-learn-panel');b.run('press','Escape');b.main();b.frames();pass('Escape inside an opaque iframe closes expansion and restores focus',b.ev('!document.querySelector(".vie-figure-expanded")&&document.activeElement.textContent==="展开"'));
 b.ev('window.__reports=[];VIEDemo.bridge.setReporter((id,value)=>__reports.push(value))');
 mount(figure('<h3>Only a title</h3><div id="empty"></div>','const done=true;'),'empty-content');
 pass('an empty initialized frame stays waiting rather than reporting success',b.ev('(async()=>{for(let i=0;i<40&&document.querySelector("iframe")?.dataset.vieStatus!=="waiting";i++)await new Promise(r=>setTimeout(r,25));return document.querySelector("iframe").dataset.vieReady==="false"&&document.querySelector("iframe").dataset.vieStatus==="waiting"&&VIEDemo.context.figureStatuses.block1==="waiting"})()'));
 pass('waiting has a compact visible status instead of a large blank card',b.ev('!!document.querySelector("[data-vie-waiting]")&&document.querySelector(".vie-figure-viewport").getBoundingClientRect().height<=40'));
 mount(figure('<canvas id="delayed" width="240" height="160"></canvas>','setTimeout(()=>{const c=document.getElementById("delayed"),x=c.getContext("2d");x.fillStyle="#149f91";x.fillRect(20,20,120,80);},550);'),'delayed-canvas');b.run('wait','iframe[data-vie-ready="true"]');
 pass('a delayed custom canvas becomes ready only after visible pixels exist',b.ev('Number(document.querySelector("iframe").dataset.vieReadyMs)>=500'));
 mount(figure('<canvas id="raf" width="240" height="160"></canvas>','requestAnimationFrame(()=>{const x=document.getElementById("raf").getContext("2d");x.fillStyle="#149f91";x.fillRect(20,20,120,80);});'),'animation-frame-canvas');b.run('wait','iframe[data-vie-ready="true"]');
 pass('animation-frame drawing can complete while the waiting placeholder is visible',b.ev('document.querySelector("iframe").dataset.vieContent==="canvas"&&!document.querySelector("[data-vie-waiting]")'));
 mount(figure('<div id="p"></div>','VIE.ui.toolbar({root:"#p",items:[{id:"action",label:"Operate",onClick:()=>{const s=getComputedStyle(document.querySelector(".vie-sdk-toolbar button"));VIE.setState({radius:s.borderRadius,background:s.backgroundColor});}}]});','button{border-radius:0;background:rgb(255,0,0);font-family:serif}'),'skin-scope');b.run('wait','iframe[data-vie-ready="true"]');
 click('.vie-sdk-toolbar button');
 pass('generic authored CSS cannot replace the engine toolbar skin',b.ev('VIEDemo.context.figures.block1.state.radius==="10px"&&VIEDemo.context.figures.block1.state.background!=="rgb(255, 0, 0)"'));
 mount(figure('<svg viewBox="0 0 300 150"><text id="clipped-label" x="-15" y="55">Clipped</text><text id="one" x="90" y="90">Overlap</text><text id="two" x="90" y="90">Overlap</text></svg>'),'layout-evidence');b.run('wait','iframe[data-vie-ready="true"]');b.frames();
 pass('layout reports contain a stable target, bounds and viewport',b.ev('__reports.some(r=>r.warnings?.some(w=>w.target?.id==="clipped-label"&&Number.isFinite(w.target.bounds.x)&&w.viewport.width>0))'));
 b.run('screenshot','--full',path.join(b.root,'screenshots/layout-evidence-'+VERSION+'.png'));
 b.ev('VIEDemo.select("shared-stages")');b.run('wait','iframe[data-vie-ready="true"]');b.run('set','viewport','390','1000');b.frames();
 pass('the shared diagram and stage controls fit a narrow viewport',b.ev('document.documentElement.scrollWidth<=innerWidth&&document.querySelector("iframe").dataset.vieReady==="true"'));
 b.run('screenshot','--full',path.join(b.root,'screenshots/shared-stages-'+VERSION+'.png'));
 fs.writeFileSync(path.join(b.root,'docs/validation/031-browser.json'),JSON.stringify({version:VERSION,passed:true,checks,externalModelRequests:0},null,2));
}finally{b.close();}
