/** Production renderer, native answer contribution, and complete-block streaming. */
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';import {pathToFileURL} from 'node:url';import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..'),checks=[],session='vie-020-speed-'+process.pid;
const exe=path.join(root,'node_modules/agent-browser/bin/agent-browser-win32-x64.exe'),base=['--session',session,'--json'];
function run(...args){const r=spawnSync(exe,[...base,...args],{cwd:root,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data;}
function evaluate(code){const r=spawnSync(exe,[...base,'eval','--stdin'],{cwd:root,input:code,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data.result;}
function check(name,code){assert.equal(evaluate(code),true,name);checks.push({name,passed:true});console.log('PASS '+name);}
const frames='await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);';
try{
 run('--executable-path',process.env.VIE_CHROME??'C:/Program Files/Google/Chrome/Application/chrome.exe','--allow-file-access','open',pathToFileURL(path.join(root,'dist/VIE-Interactive-0.29.2.html')).href);run('set','viewport','1040','1100');run('snapshot','-i');
 check('compact chart renders with no generated script or topic template',`!!document.querySelector('[data-vie-chart] svg')&&!VIEDemo.source.includes('GenerativeFigure')&&!VIEDemo.source.includes('InteractiveScene')`);
 run('focus','[data-chart-key="k"]');run('press','End');run('snapshot','-i');
 check('keyboard slider changes the computed curve locally',`VIEDemo.context.figures.block1.state.k===3&&document.querySelector('[data-chart-value="k"]').textContent==='3'`);
 evaluate('VIEDemo.remount()');run('snapshot','-i');
 check('chart edited state survives remount',`document.querySelector('[data-chart-key="k"]').value==='3'`);
 run('click','[data-chart-reset]');
 check('chart reset restores initial parameter',`VIEDemo.context.figures.block1.state.k===2`);
 run('screenshot','--full','screenshots/fast-chart-desktop-0.29.2.png');
 evaluate(`VIEDemo.select('curve')`);run('snapshot','-i');
 check('multiple series and declared region render together',`document.querySelectorAll('.vie-general-chart [clip-path] path').length===2&&document.querySelectorAll('.vie-general-chart polygon').length===1`);
 for(const width of [390,320]){run('set','viewport',String(width),'1000');run('snapshot','-i');check('general chart fits '+width+'px',`document.documentElement.scrollWidth<=innerWidth&&!!document.querySelector('.vie-general-chart svg')`);}
 run('screenshot','--full','screenshots/fast-chart-mobile-0.29.2.png');
 run('click','#theme');check('chart follows dark host theme',`document.body.classList.contains('dark')&&getComputedStyle(document.querySelector('.vie-general-chart')).color!=='rgb(0, 0, 0)'`);
 run('set','viewport','1040','1100');
 check('reported visual is a separate answer row before ordinary assistant prose',`(async()=>{VIEDemo.answerHistory(VIEHistory);${frames}const a=document.querySelector('[data-vie-answer]'),p=document.querySelector('[data-native-prose]');return !!a&&!!p&&!!(a.compareDocumentPosition(p)&Node.DOCUMENT_POSITION_FOLLOWING)&&a.querySelectorAll('.vie-experiment').length===2})()`);
 run('screenshot','--full','screenshots/answer-before-prose-0.29.2.png');
 check('cold replay keeps a single visual answer before prose',`(async()=>{VIEDemo.answerHistory(JSON.parse(JSON.stringify(VIEHistory)));${frames}return document.querySelectorAll('[data-vie-answer]').length===1&&document.querySelector('[data-vie-answer]').getBoundingClientRect().top<document.querySelector('[data-native-prose]').getBoundingClientRect().top})()`);
 check('complete chart previews before incomplete trailing text in the real tool view',`(async()=>{const spec=JSON.stringify(VIECompact.slope);const cut=spec.indexOf(',{"type":"text"');window.previewText=spec.slice(0,cut)+',{"type":"text","body":"not finished';VIEDemo.preview({text:k=>k==='spec'?window.previewText:undefined,value:()=>undefined,complete:()=>false,closed:()=>false},'progressive');${frames}return !!document.querySelector('[data-vie-chart]')&&!document.querySelector('.vie-diagnostics')})()`);
 check('changing a control during streaming survives later prose completion',`(async()=>{const slider=document.querySelector('[data-chart-key="k"]');slider.value='3';slider.dispatchEvent(new Event('input',{bubbles:true}));const spec=JSON.stringify(VIECompact.slope);VIEDemo.preview({text:k=>k==='spec'?spec:undefined,value:()=>undefined,complete:()=>false,closed:()=>false},'progressive');${frames}return document.querySelector('[data-chart-key="k"]').value==='3'&&document.querySelector('.vie-body').textContent.includes('斜率 k 越大')})()`);
 const baseline=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/payload-baseline.json'),'utf8'));
 evaluate(`VIEDemo.setSource(VIE.documentSceneSource(${JSON.stringify(baseline)}),'payload-baseline')`);run('snapshot','-i');
 check('free-code payload baseline really executes through the same production renderer',`(async()=>{${frames}return document.querySelector('iframe').dataset.vieReady==='true'&&!document.querySelector('.vie-generated-error')})()`);
 const snapshot=run('snapshot','-i'),slider=Object.entries(snapshot.refs??{}).find(([_,v])=>v.role==='slider'&&v.name==='斜率 k');assert.ok(slider,'baseline slider missing');run('focus','@'+slider[0]);run('press','End');run('snapshot','-i');
 check('payload baseline slider supports the same parameter change',`VIEDemo.context.figures.block1.state.k===3`);
 check('unclosed generated code does not create an executable iframe',`(async()=>{VIEDemo.preview({text:k=>k==='spec'?' {"title":"Incomplete code","blocks":[{"type":"figure","title":"x","html":"<div/>","js":"throw new Error(':undefined,value:()=>undefined,complete:()=>false,closed:()=>false},'incomplete-script');${frames}return !document.querySelector('iframe')})()`);
 check('normal examples have no runtime page errors',`!document.querySelector('.vie-generated-error')&&!document.querySelector('.vie-error')`);
 const errors=run('errors').errors??[];assert.equal(errors.length,0,JSON.stringify(errors));
 fs.writeFileSync(path.join(root,'docs/validation/speed-browser.json'),JSON.stringify({version:'0.29.2',checks:checks.length,results:checks,pageErrors:errors},null,2));
}finally{try{run('close');}catch{}}
