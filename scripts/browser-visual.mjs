import {VERSION} from './version-info.mjs';
/** Native arguments, linked parameters and the visual/prose split in production React. */
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';import {pathToFileURL} from 'node:url';import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..'),exe=path.join(root,'node_modules/agent-browser/bin/agent-browser-win32-x64.exe'),session='vie-023-visual-'+process.pid,checks=[];
function run(...args){const r=spawnSync(exe,['--session',session,'--json',...args],{cwd:root,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data;}
function evaluate(code){const r=spawnSync(exe,['--session',session,'--json','eval','--stdin'],{cwd:root,input:code,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data.result;}
function check(name,code){assert.equal(evaluate(code),true,name);checks.push({name,passed:true});console.log('PASS '+name);}
const frames='await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);';
try{
 run('--executable-path',process.env.VIE_CHROME??'C:/Program Files/Google/Chrome/Application/chrome.exe','--allow-file-access','open',pathToFileURL(path.join(root,("dist/VIE-Interactive-"+VERSION+".html"))).href);run('set','viewport','1040','1100');run('snapshot','-i');
 check('default VIE contains only the graphic while ordinary prose is outside its shell',`document.querySelector('.vie-body').querySelectorAll('.vie-text').length===0&&document.querySelector('[data-native-explanation]').textContent.includes('Harness')&&!document.querySelector('.vie-shell [data-native-explanation]')`);
 run('screenshot','--full',("screenshots/visual-and-native-prose-"+VERSION+".png"));
 run('click','button[data-demo-topic="shared"]');run('snapshot','-i');
 check('two charts expose one shared speed slider',`document.querySelectorAll('[data-vie-chart]').length===2&&document.querySelectorAll('#stage input[type="range"]').length===1`);
 evaluate(`window.beforeCurves=[...document.querySelectorAll('.vie-general-chart [clip-path] path')].map(p=>p.getAttribute('d'))`);
 const refs=run('snapshot','-i').refs,slider=Object.entries(refs).find(([_,v])=>v.role==='slider'&&v.name.includes('速度 v'));assert.ok(slider);run('focus','@'+slider[0]);run('press','End');run('snapshot','-i');
 check('a real keyboard change updates both chart states',`VIEDemo.context.figures.block1.state.v===6&&VIEDemo.context.figures.block2.state.v===6`);
 check('both actual SVG curves change without a model request',`[...document.querySelectorAll('.vie-general-chart [clip-path] path')].every((p,i)=>p.getAttribute('d')!==window.beforeCurves[i])`);
 evaluate('VIEDemo.remount()');run('snapshot','-i');
 check('shared speed and both curves survive remount',`VIEDemo.context.figures.block1.state.v===6&&VIEDemo.context.figures.block2.state.v===6&&document.querySelector('#stage input[type="range"]').value==='6'`);
 run('screenshot','--full',("screenshots/shared-chart-desktop-"+VERSION+".png"));
 for(const width of [390,320]){run('set','viewport',String(width),'1100');run('snapshot','-i');check('linked charts and shared control fit '+width+'px',`document.documentElement.scrollWidth<=innerWidth&&document.querySelectorAll('[data-vie-chart] svg').length===2`);}
 run('screenshot','--full',("screenshots/shared-chart-mobile-"+VERSION+".png"));run('click','#theme');check('shared charts follow host dark theme',`document.body.classList.contains('dark')`);
 run('set','viewport','1040','1100');
 check('current lazy PartialArguments accepts a native document object',`(async()=>{VIEDemo.preview({text:()=>undefined,value:k=>k==='document'?window.VIELinkedMotion:undefined,complete:()=>true,closed:()=>true},'native-object');${frames}return document.querySelectorAll('[data-vie-chart]').length===2&&!document.querySelector('.vie-error')})()`);
 check('a raw native tool stream previews its first complete chart in the new flow node',`(async()=>{const raw=JSON.stringify({document:window.VIELinkedMotion}),cut=raw.indexOf('},{"type":"chart"')+1;VIEDemo.answerHistory([{type:'assistant/live-chunk',seq:1,time:1,data:{turn:1,step:1,chunk:{type:'tool-call-delta',id:'native-stream',name:'vie_explain',argumentsDelta:raw.slice(0,cut)}}}],true);${frames}return document.querySelectorAll('[data-vie-chart]').length===1&&!!document.querySelector('[data-vie-answer]')})()`);
 evaluate(`window.repairEvents=[1,2].map((revision,i)=>({type:'tool/result',seq:10+i,time:10+i,data:{turn:1,message:{source:{callId:'repair'+i}},meta:{kind:'vie',valid:true,visualId:'linked',revision,title:'linked',source:VIE.documentSceneSource(i?{...window.VIELinkedMotion,blocks:window.VIELinkedMotion.blocks.map((b,j)=>j?b:{...b,title:'修正标题'})}:window.VIELinkedMotion)}}}));VIEDemo.answerHistory(window.repairEvents.slice(0,1))`);run('snapshot','-i');
 const repairRefs=run('snapshot','-i').refs,repairSlider=Object.entries(repairRefs).find(([_,v])=>v.role==='slider'&&v.name.includes('速度 v'));assert.ok(repairSlider);run('focus','@'+repairSlider[0]);run('press','End');run('snapshot','-i');
 check('a repaired visual replaces the graphic and preserves shared user input',`(async()=>{VIEDemo.answerHistory(window.repairEvents);${frames}return document.querySelector('#stage input[type="range"]').value==='6'&&document.querySelectorAll('[data-vie-answer]').length===1&&document.querySelectorAll('[data-vie-chart]').length===2&&!!document.querySelector('[data-native-prose]')})()`);

 check('normal visual-only and linked examples have no visible runtime errors',`!document.querySelector('.vie-error')&&!document.querySelector('.vie-generated-error')`);
 const errors=run('errors').errors??[];assert.equal(errors.length,0,JSON.stringify(errors));
 fs.writeFileSync(path.join(root,'docs/validation/visual-browser.json'),JSON.stringify({version:VERSION,checks:checks.length,results:checks,pageErrors:errors,externalModelRequests:0},null,2));
}finally{try{run('close');}catch{}}
