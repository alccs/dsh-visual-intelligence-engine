import {VERSION} from './version-info.mjs';
/** Behavioral and responsive checks through the agent-browser CLI, with real React. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const binary=path.join(root,'node_modules/agent-browser/bin',process.platform==='win32'?'agent-browser-win32-x64.exe':process.platform==='darwin'?'agent-browser-darwin-'+process.arch:'agent-browser-linux-'+process.arch);
const session='vie-0180-regression-'+process.pid;
const chrome=process.env.VIE_CHROME??(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':null);
const base=['--session',session,'--json'];
const checks=[];fs.mkdirSync(path.join(root,'screenshots'),{recursive:true});
// A partially visible button can have its center outside the viewport. Scroll before real pointer clicks.
function run(...args){if(args[0]==='click')run('scrollintoview',args[1]);const r=spawnSync(binary,[...base,...args],{cwd:root,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const value=JSON.parse(r.stdout);if(!value.success)throw Error(JSON.stringify(value));return value.data;}
function evaluate(code){const r=spawnSync(binary,[...base,'eval','--stdin'],{cwd:root,input:code,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const value=JSON.parse(r.stdout);if(!value.success)throw Error(JSON.stringify(value));return value.data.result;}
function check(name,code){const result=evaluate(code);assert.equal(result,true,name+': '+JSON.stringify(result));checks.push({name,passed:true});console.log('PASS '+name);}
const frame='await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);';
try{
  run(...(chrome?['--executable-path',chrome]:[]),'--allow-file-access','open',pathToFileURL(path.join(root,("dist/VIE-Interactive-"+VERSION+".html"))).href);
  run('snapshot','-i');run('set','viewport','1040','1100');evaluate(`VIEDemo.select('planetary')`);run('snapshot','-i');
  check('planetary correct initial rates and paused',`(async()=>{${frame}return JSON.stringify([...document.querySelectorAll('.vie-scene-readout strong')].map(n=>n.textContent))===JSON.stringify(['+1.00','0.00','+0.29'])&&!!document.querySelector('[aria-label="播放动画"]')})()`);
  run('click','[data-scene-case="sun-fixed"]');run('snapshot','-i');
  check('switch fixed member recomputes rates',`[...document.querySelectorAll('.vie-scene-readout strong')].map(n=>n.textContent).join(',')==='0.00,+1.00,+0.71'`);
  run('click','[data-scene-action="step"]');run('snapshot','-i');
  check('single step persists into conversation context',`Math.abs(VIEDemo.context.experiments.experiment.state.phase-Math.PI/12)<1e-10`);
  run('click','[data-scene-action="reset"]');
  check('reset keeps current fixed case and clears phase',`VIEDemo.context.experiments.experiment.state.phase===0&&VIEDemo.context.experiments.experiment.state.case==='sun-fixed'`);
  evaluate(`VIEDemo.remount()`);run('snapshot','-i');
  check('same-session remount restores edited case',`document.querySelector('[data-scene-case="sun-fixed"]').getAttribute('aria-selected')==='true'`);
  run('focus','[data-scene-case="sun-fixed"]');run('press','ArrowLeft');run('press','ArrowRight');run('snapshot','-i');
  check('case tabs support keyboard navigation and named panels',`document.querySelector('[data-scene-case="sun-fixed"]').getAttribute('aria-selected')==='true'&&document.querySelector('[role="tabpanel"]').getAttribute('aria-labelledby')===document.activeElement.id`);
  run('click','[data-scene-action="step"]');run('snapshot','-i');
  run('find','role','button','click','--name','带参数继续提问');
  check('explicit continuation inserts current parameters into draft',`document.querySelector('#draft').value.includes('sun-fixed')&&document.querySelector('#draft').value.includes('0.261799')`);
  evaluate(`VIEDemo.select('planetary')`);run('snapshot','-i');run('click','[data-scene-case="ring-fixed"]');
  run('click','[data-scene-action="play"]');
  check('play advances continuously and pause exports current phase',`(async()=>{await new Promise(r=>setTimeout(r,250));document.querySelector('[data-scene-action="play"]').click();return VIEDemo.context.experiments.experiment.state.phase>0&&!!document.querySelector('[aria-label="播放动画"]')})()`);
  run('click','[data-scene-action="reset"]');
  run('screenshot','--full',("screenshots/planetary-desktop-"+VERSION+".png"));
  run('click','[data-demo-topic="wave"]');run('snapshot','-i');
  evaluate(`const slider=document.querySelector('[data-scene-input="phaseDegrees"]');slider.value='180';slider.dispatchEvent(new Event('input',{bubbles:true}));`);
  check('wave opposite phase cancels',`document.querySelectorAll('.vie-scene-readout strong')[1].textContent==='0.00'`);
  run('screenshot','--full',("screenshots/wave-desktop-"+VERSION+".png"));
  run('click','[data-demo-topic="process"]');run('snapshot','-i');run('click','[data-scene-action="step"]');run('snapshot','-i');
  check('process branch requires explicit selection',`document.querySelector('[data-scene-action="step"]').disabled&&document.querySelectorAll('[data-scene-branch]').length===2`);
  run('click','[data-scene-branch="1"]');run('snapshot','-i');
  check('process selected branch reaches declared target',`VIEDemo.context.experiments.experiment.derived.currentNode==='explain'&&document.querySelector('[data-scene-action="step"]').disabled`);
  run('screenshot','--full',("screenshots/process-desktop-"+VERSION+".png"));
  run('click','[data-demo-topic="vector"]');run('snapshot','-i');
  check('vector shares geometric model and exposes keyboard handle',`Math.abs(VIEDemo.context.experiments.experiment.derived.x-Math.sqrt(12))<1e-8&&document.querySelector('[data-vector-handle]').getAttribute('tabindex')==='0'`);
  run('focus','[data-vector-handle]');run('press','ArrowLeft');run('snapshot','-i');
  check('vector handle responds to keyboard',`VIEDemo.context.experiments.experiment.parameters.angle!==30`);
  run('screenshot','--full',("screenshots/vector-desktop-"+VERSION+".png"));
  check('current lazy PartialArguments API renders preparing scene',`(async()=>{const values={query:'行星轮系',templateId:'lab.planetary',parameters:'{}'};VIEDemo.preview({text:k=>values[k],value:()=>undefined,complete:()=>true,closed:()=>true});${frame}return !!document.querySelector('[data-scene-template="planetary"]')})()`);
  check('keyed turn data updates without parent render',`(async()=>{VIEDemo.tail({items:[]});${frame}VIEDemo.updateTail({items:[{callId:'tail-wave',title:'Tail wave',source:VIE.experimentSceneSource('wave')}]});${frame}return !!document.querySelector('[data-scene-template="wave"]')})()`);
  for(const width of [740,600,390,320]){
    run('set','viewport',String(width),'1000');
    for(const topic of ['planetary','gears','wave','process','vector','story']){
      evaluate(`VIEDemo.select(${JSON.stringify(topic)})`);run('snapshot','-i');
      check(topic+' fits '+width+'px',`document.documentElement.scrollWidth<=innerWidth&&!document.querySelector('.vie-diagnostics')`);
    }
  }
  run('set','viewport','390','1000');evaluate(`VIEDemo.select('planetary')`);run('snapshot','-i');run('screenshot','--full',("screenshots/planetary-mobile-"+VERSION+".png"));
  run('click','#theme');run('snapshot','-i');
  check('dark appearance has a dark widget background',`getComputedStyle(document.querySelector('.vie-shell')).getPropertyValue('--vie-bg').trim()!=='#fff'`);
  run('screenshot','--full',("screenshots/planetary-dark-"+VERSION+".png"));
  run('set','media','reduced-motion');evaluate(`VIEDemo.select('gears')`);run('snapshot','-i');
  check('reduced-motion mode does not auto-play',`!!document.querySelector('[aria-label="播放动画"]')&&!document.querySelector('[aria-label="暂停动画"]')`);
  const errors=run('errors');assert.equal(errors.errors?.length??0,0,JSON.stringify(errors));
  fs.mkdirSync(path.join(root,'docs/validation'),{recursive:true});
  fs.writeFileSync(path.join(root,'docs/validation/browser.json'),JSON.stringify({browser:'Chrome via agent-browser',react:'18.3.1',checks:checks.length,results:checks,errors},null,2));
}finally{try{run('close')}catch{}}
