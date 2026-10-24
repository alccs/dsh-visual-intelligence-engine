/** Focused production-renderer acceptance for the real 0.17 conversation failure. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'..');
const binary=path.join(root,'node_modules/agent-browser/bin',process.platform==='win32'?'agent-browser-win32-x64.exe':'agent-browser-'+process.platform+'-'+process.arch);
const base=['--session','vie-018-transmission-'+process.pid,'--json'];
const checks=[];
function run(...args){const r=spawnSync(binary,[...base,...args],{cwd:root,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data;}
function evaluate(code){const r=spawnSync(binary,[...base,'eval','--stdin'],{cwd:root,input:code,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data.result;}
function check(name,code){assert.equal(evaluate(code),true,name);checks.push({name,passed:true});console.log('PASS '+name);}
const frames='await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);';
const set=(key,value)=>evaluate(`{const n=document.querySelector('[data-scene-input="${key}"]');n.value=${JSON.stringify(String(value))};n.dispatchEvent(new Event('input',{bubbles:true}));}`);
try{
  run('--executable-path',process.env.VIE_CHROME??'C:/Program Files/Google/Chrome/Application/chrome.exe','--allow-file-access','open',pathToFileURL(path.join(root,'dist/VIE-Interactive-0.29.2.html')).href);run('snapshot','-i');run('set','viewport','1040','1100');
  // The gallery now opens on a generic graphic; select this suite's subject explicitly.
  run('click','#optional-components>summary');run('click','button[data-demo-topic="geartrain"]');run('snapshot','-i');
  check('three real tooth paths and correct initial rates',`(async()=>{${frames}return document.querySelectorAll('[data-train-gear]>path').length===3&&[...document.querySelectorAll('.vie-scene-readout strong')].map(n=>n.textContent).join(',')==='+1.00,-0.67,+0.50'})()`);
  run('screenshot','--full','screenshots/geartrain-desktop-0.29.2.png');
  set('teeth1',53);run('snapshot','-i');
  check('idler edit changes geometry but retains terminal ratio',`VIEDemo.context.experiments.experiment.parameters.teeth[1]===53&&VIEDemo.context.experiments.experiment.derived.outputRatio===.5&&document.querySelectorAll('.vie-scene-readout strong')[1].textContent==='-0.38'`);
  evaluate('VIEDemo.remount()');run('snapshot','-i');
  check('remount restores actual edited slider',`(async()=>{${frames}return document.querySelector('[data-scene-input="teeth1"]').value==='53'})()`);
  run('click','[data-scene-action="reverse"]');run('snapshot','-i');
  check('reverse recomputes every wheel speed',`VIEDemo.context.experiments.experiment.derived.speeds[0]===-1&&VIEDemo.context.experiments.experiment.derived.speeds[2]===-.5`);
  run('click','[data-scene-action="step"]');
  check('reverse single-step follows the reversed input',`VIEDemo.context.experiments.experiment.state.phase<0`);
  set('inputSpeed',0);run('click','[data-scene-action="reset"]');set('inputSpeed',0);run('click','[data-scene-action="step"]');
  check('zero speed does not advance the single-step model',`VIEDemo.context.experiments.experiment.state.phase===0&&VIEDemo.context.experiments.experiment.derived.speeds.every(x=>x===0)`);
  set('inputSpeed',1);run('click','[data-scene-action="play"]');
  check('play advances and pause records the current state',`(async()=>{await new Promise(r=>setTimeout(r,160));document.querySelector('[data-scene-action="play"]').click();return VIEDemo.context.experiments.experiment.state.phase>0&&!!document.querySelector('[aria-label="播放动画"]')})()`);
  run('find','role','button','click','--name','带参数继续提问');
  check('draft insertion contains the actual geartrain inputs',`document.querySelector('#draft').value.includes('geartrain')&&document.querySelector('#draft').value.includes('teeth')`);
  run('click','[data-demo-topic="worm"]');run('snapshot','-i');set('starts',4);set('wheelTeeth',60);
  check('worm controls update the ideal reduction and wheel geometry',`VIEDemo.context.experiments.experiment.derived.transmissionRatio===15&&document.querySelectorAll('.vie-scene-readout strong')[2].textContent==='15.00'`);
  run('screenshot','--full','screenshots/worm-desktop-0.29.2.png');
  run('click','[data-demo-topic="schematic"]');run('snapshot','-i');
  check('human labels replace technical IDs',`[...document.querySelectorAll('.vie-visual-legend button')].map(n=>n.textContent).join(',')==='输入,计算关系,输出'`);
  run('find','role','button','click','--name','放大图形');
  check('zoom enlarges the actual drawing',`document.querySelector('[data-vie-zoom-value]').textContent==='125%'&&document.querySelector('.vie-visual-content>svg').style.width==='125%'`);
  run('find','role','button','click','--name','适合宽度');run('find','role','button','click','--name','计算关系');run('snapshot','-i');
  check('shape interaction exposes semantic detail',`document.querySelector('.vie-visual-selected').textContent.includes('领域公式')`);
  for(const width of [390,320]){
    run('set','viewport',String(width),'1000');
    for(const topic of ['geartrain','worm','comparison','schematic']){
      evaluate(`VIEDemo.select('${topic}')`);run('snapshot','-i');
      check(topic+' readable shell at '+width,`document.documentElement.scrollWidth<=innerWidth&&!document.querySelector('.vie-diagnostics')&&[...document.querySelectorAll('.vie-scene-readout small')].every(n=>parseFloat(getComputedStyle(n).fontSize)>=12)`);
    }
  }
  evaluate(`VIEDemo.setSource(VIE.experimentSceneSource('geartrain',{teeth:[18,80,19,63,24,75]}),'six-wheels')`);run('snapshot','-i');
  check('six wheels render without page overflow',`document.querySelectorAll('[data-train-gear]').length===6&&document.documentElement.scrollWidth<=innerWidth`);
  run('set','viewport','390','1000');evaluate(`VIEDemo.select('geartrain')`);run('snapshot','-i');run('click','[data-scene-action="reset"]');run('screenshot','--full','screenshots/geartrain-mobile-0.29.2.png');
  run('click','#theme');run('snapshot','-i');run('screenshot','--full','screenshots/geartrain-dark-0.29.2.png');
  check('dark appearance and visible tooth geometry coexist',`document.body.classList.contains('dark')&&document.querySelectorAll('[data-train-gear]>path').length===3`);
  run('set','media','reduced-motion');evaluate(`VIEDemo.select('worm')`);run('snapshot','-i');
  check('reduced motion does not start animation automatically',`!!document.querySelector('[aria-label="播放动画"]')`);
  const fixed=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/gear-story-fixed.json'),'utf8'));
  evaluate(`VIEDemo.setSource(VIE.storySceneSource(${fixed.spec}),'repaired-conversation')`);run('snapshot','-i');
  check('repaired real conversation renders domain panels in teaching order',`(async()=>{${frames}return [...document.querySelectorAll('[data-scene-template]')].map(n=>n.dataset.sceneTemplate).join(',')==='geartrain,worm'&&!document.querySelector('.vie-visual-legend')})()`);
  const old=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/gear-story-before-018.json'),'utf8'));
  evaluate(`VIEDemo.setSource(VIE.storySceneSource(${old.spec}),'historical-conversation')`);run('snapshot','-i');
  check('historical recorded scenes remain readable and visibly qualified',`(async()=>{${frames}return !!document.querySelector('.vie-visual-hint')&&document.body.textContent.includes('运动示意')&&!document.querySelector('.vie-diagnostics')&&[...document.querySelectorAll('.vie-visual-legend button')].every(n=>!['s1','s2','s3'].includes(n.textContent))})()`);
  const errors=run('errors');assert.equal(errors.errors?.length??0,0,JSON.stringify(errors));
  fs.writeFileSync(path.join(root,'docs/validation/transmission-browser.json'),JSON.stringify({version:'0.29.2',checks:checks.length,results:checks,errors},null,2));
}finally{try{run('close')}catch{}}
