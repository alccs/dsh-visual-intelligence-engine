/** Regressions for actual SVG visibility, clipping and stage restoration. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {browserDriver} from './browser-driver.mjs';import {VERSION} from './version-info.mjs';
const b=browserDriver('0311'),checks=[],pass=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS '+name);};
const mount=(document,id)=>{b.ev('VIEDemo.setSource(VIE.documentSceneSource('+JSON.stringify(document)+'),'+JSON.stringify(id)+')');b.frames();};
const click=selector=>{b.enter();b.run('click',selector);b.main();b.frames();};
const sample=()=>{click('[data-vie-action=inspect]');return b.ev('VIEDemo.context.figures.block1.state.review');};
const figure=html=>({blocks:[{type:'figure',title:'Content evidence',html}]});
const waitStatus=expected=>b.ev('(async()=>{for(let i=0;i<60&&document.querySelector("iframe")?.dataset.vieStatus!=='+JSON.stringify(expected)+';i++)await new Promise(r=>setTimeout(r,20));return document.querySelector("iframe")?.dataset.vieStatus})()');
try{
 b.open('shared-stages');b.run('wait','iframe[data-vie-ready="true"]');
 const lesson={root:'#lesson',key:'visibility',title:'Stage visibility',baseHtml:'<svg viewBox="0 0 300 100"><circle cx="30" cy="30" r="12"/><circle id="attribute-hidden" display="none" cx="100" cy="50" r="12"/><circle id="style-hidden" style="display:none" cx="180" cy="50" r="12"/><text id="visibility-hidden" visibility="hidden" x="230" y="50">Label</text></svg>',stages:[{label:'Hidden'},{label:'Show',patches:[{target:'attribute-hidden',visible:true},{target:'style-hidden',visible:true},{target:'visibility-hidden',visible:true}]},{label:'Hide again',patches:[{target:'attribute-hidden',visible:false},{target:'style-hidden',visible:false},{target:'visibility-hidden',visible:false}]}]};
 const js='VIE.mountLearning('+JSON.stringify(lesson)+');VIE.ui.toolbar({root:"#debug",items:[{id:"inspect",label:"Inspect",onClick:()=>VIE.setState({...VIE.state,review:Object.fromEntries(["attribute-hidden","style-hidden","visibility-hidden"].map(id=>{const s=getComputedStyle(document.getElementById(id));return [id,{display:s.display,visibility:s.visibility}];}))})}]});';
 mount({blocks:[{type:'figure',title:'Stage visibility',html:'<div id="lesson"></div><div id="debug"></div>',js}]},'stage-visibility');b.run('wait','iframe[data-vie-ready="true"]');
 const before=sample();pass('base stage preserves all original hiding mechanisms',before['attribute-hidden'].display==='none'&&before['style-hidden'].display==='none'&&before['visibility-hidden'].visibility==='hidden');
 click('.vie-learn-tabs button:nth-child(2)');const shown=sample();pass('visible:true shows SVG targets hidden by attributes or inline styles',Object.values(shown).every(value=>value.display!=='none'&&value.visibility==='visible'));
 click('.vie-learn-tabs button:nth-child(3)');pass('visible:false hides the same targets again',Object.values(sample()).every(value=>value.display==='none'));
 click('.vie-learn-tabs button:first-child');const restored=sample();pass('jumping backwards reconstructs the original visibility',restored['attribute-hidden'].display==='none'&&restored['style-hidden'].display==='none'&&restored['visibility-hidden'].visibility==='hidden');
 click('.vie-learn-tabs button:nth-child(2)');b.ev('VIEDemo.remount()');b.run('wait','iframe[data-vie-ready="true"]');pass('history restores the selected stage and visible targets',Object.values(sample()).every(value=>value.display!=='none'&&value.visibility==='visible'));
 for(const [id,html]of [
  ['transparent-fill','<svg viewBox="0 0 300 100"><rect x="30" y="20" width="100" height="50" fill="rgba(0,0,0,0)" stroke="none"/></svg>'],
  ['transparent-stroke','<svg viewBox="0 0 300 100"><line x1="30" x2="240" y1="50" y2="50" stroke="rgba(0,0,0,0)" stroke-width="3"/></svg>'],
  ['transparent-label','<svg viewBox="0 0 300 100"><text x="30" y="50" fill="color(srgb 0 0 0 / 0)">Hidden label</text></svg>'],
  ['clipped-svg','<svg viewBox="0 0 300 100" style="overflow:hidden"><rect x="500" y="20" width="100" height="50" fill="red"/></svg>'],
  ['clipped-html','<div style="height:100px;overflow:hidden;position:relative"><svg style="position:absolute;left:2000px" viewBox="0 0 300 100"><circle cx="60" cy="50" r="20"/></svg></div>']
 ]){mount(figure(html),id);pass(id+' stays waiting without false successful timings',waitStatus('waiting')==='waiting'&&b.ev('document.querySelector("iframe").dataset.vieReady==="false"&&!VIEDemo.context.figureMetrics.block1.readyMs&&!VIEDemo.context.figureMetrics.block1.visibleMs'));}
 for(const [id,html]of [
  ['partially-visible','<svg viewBox="0 0 300 100" style="overflow:hidden"><rect x="280" y="20" width="100" height="50" fill="red"/></svg>'],
  ['stroked-line','<svg viewBox="0 0 300 100" style="overflow:hidden"><line x1="80" x2="80" y1="20" y2="80" fill="none" stroke="blue" stroke-width="3"/></svg>'],
  ['normal-label','<svg viewBox="0 0 300 100"><text x="30" y="50">Visible label</text></svg>'],
  ['visibility-override','<svg viewBox="0 0 300 100"><g visibility="hidden"><circle visibility="visible" cx="60" cy="50" r="20"/></g></svg>']
 ]){mount(figure(html),id);pass(id+' remains useful content',waitStatus('ready')==='ready');}
 b.run('set','viewport','390','1000');b.frames();pass('narrow viewport keeps the normal graph and controls operable',b.ev('document.documentElement.scrollWidth<=innerWidth&&!document.querySelector(".vie-generated-error")'));
 fs.writeFileSync(path.join(b.root,'docs/validation/0311-browser.json'),JSON.stringify({version:VERSION,passed:true,checks,externalModelRequests:0},null,2)+'\n');
}finally{b.close();}
