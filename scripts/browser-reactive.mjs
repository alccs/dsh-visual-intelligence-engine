import {VERSION} from './version-info.mjs';
/** Real Chrome interactions; no model request and no browser check silently skipped. */
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';import {pathToFileURL} from 'node:url';import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..'),exe=path.join(root,'node_modules/agent-browser/bin/agent-browser-win32-x64.exe'),session='vie-023-reactive-'+process.pid,checks=[];
const chrome=process.env.VIE_CHROME??'C:/Program Files/Google/Chrome/Application/chrome.exe';if(!fs.existsSync(chrome))throw Error('Chrome required: set VIE_CHROME; this check must not be skipped');
function run(...args){const r=spawnSync(exe,['--session',session,'--json',...args],{cwd:root,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data;}
function evaluate(code){const r=spawnSync(exe,['--session',session,'--json','eval','--stdin'],{cwd:root,input:code,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data.result;}
const frames='await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);';
function check(name,code){assert.equal(evaluate(code),true,name);checks.push({name,passed:true});console.log('PASS '+name);}
try{
 run('--executable-path',chrome,'--allow-file-access','open',pathToFileURL(path.join(root,("dist/VIE-Interactive-"+VERSION+".html"))).href+'#reactive');run('set','viewport','1080','1200');run('snapshot','-i');
 run('wait','iframe[data-vie-ready="true"]');
 check('one document uses number, segmented, switch and slider controls',`document.querySelectorAll('#stage input[type=number]').length===1&&document.querySelectorAll('#stage .vie-segmented button').length===3&&document.querySelectorAll('#stage input[role=switch]').length===1&&document.querySelectorAll('#stage input[type=range]').length===1`);
 check('responsive composition renders chart, diagram and an opaque sandbox',`document.querySelectorAll('[data-vie-chart]').length===1&&document.querySelectorAll('[data-vie-visual=Diagram]').length===1&&document.querySelector('iframe').getAttribute('sandbox')==='allow-scripts'`);
 evaluate(`window.originalCurve=document.querySelector('.vie-general-chart [clip-path] path').getAttribute('d');window.originalFrame=document.querySelector('iframe').srcdoc`);
 run('fill','input[aria-label="振幅 A"]','4');run('press','Tab');run('snapshot','-i');
 check('number input updates the curve, shared calculation and bound figure',`(async()=>{${frames}const ctx=VIEDemo.context;return ctx.figures.block3.state.amplitude===4&&Math.abs(ctx.figures.block1.state.sample-4*Math.sin(1))<1e-10&&document.querySelector('.vie-general-chart [clip-path] path').getAttribute('d')!==window.originalCurve})()`);
 run('click','.vie-segmented button:nth-child(2)');run('snapshot','-i');
 check('a real segmented click changes both curve and diagram position',`(async()=>{${frames}return VIEDemo.context.figures.block1.state.w===2&&Math.abs(Number(document.querySelector('[data-vie-visual=Diagram] circle').getAttribute('cx'))-(180+24*4*Math.sin(2)))<.1})()`);
 run('click','input[role=switch]');run('snapshot','-i');
 check('switch clears the calculation across all views without another render call',`VIEDemo.context.figures.block1.state.on===0&&VIEDemo.context.figures.block3.state.sample===0&&Number(document.querySelector('[data-vie-visual=Diagram] circle').getAttribute('cx'))===180`);
 run('click','input[role=switch]');run('focus','input[type=range]');run('press','End');run('snapshot','-i');
 check('slider keyboard interaction updates the derived input',`(async()=>{${frames}return Math.abs(VIEDemo.context.figures.block1.state.sample-4*Math.sin(12))<1e-10})()`);
 const iframeRefs=run('snapshot','-i').refs,increase=Object.entries(iframeRefs).find(([_,item])=>item.role==='button'&&item.name==='振幅 +1');assert.ok(increase,'opaque frame button must be accessible');
 run('click','@'+increase[0]);run('snapshot','-i');
 check('sandbox button writes back to the shared control and chart',`(async()=>{${frames}return document.querySelector('input[type=number]').value==='5'&&VIEDemo.context.figures.block1.state.A===5&&VIEDemo.context.figures.block3.state.amplitude===5})()`);
 check('state propagation keeps the same iframe document',`document.querySelector('iframe').srcdoc===window.originalFrame`);
 run('click','#theme');run('snapshot','-i');
 check('theme tokens update chart colors without resetting the iframe or user values',`getComputedStyle(document.querySelector('.vie-shell')).getPropertyValue('--vie-primary').trim()==='#83afff'&&document.querySelector('iframe').srcdoc===window.originalFrame&&document.querySelector('input[type=number]').value==='5'`);
 run('screenshot','--full',("screenshots/reactive-dark-"+VERSION+".png"));
 run('click','#theme');run('set','viewport','1080','1200');run('screenshot','--full',("screenshots/reactive-desktop-"+VERSION+".png"));
 for(const width of [390,320]){run('set','viewport',String(width),'1200');run('snapshot','-i');check('all general graphics and controls fit '+width+'px',`document.documentElement.scrollWidth<=innerWidth&&getComputedStyle(document.querySelector('#stage .vie-row')).gridTemplateColumns.split(' ').length===1`);}
 run('screenshot','--full',("screenshots/reactive-mobile-"+VERSION+".png"));
 run('click','#remount');run('wait','iframe[data-vie-ready="true"]');run('snapshot','-i');
 check('remount restores shared controls and recomputes all bound views',`document.querySelector('input[type=number]').value==='5'&&VIEDemo.context.figures.block1.state.A===5&&VIEDemo.context.figures.block3.state.amplitude===5`);
 // Mount the actual composer component against a projection reader and command adapter.
 evaluate(`VIEDemo.setSource(VIEDemo.source,'composer');window.modeRoot=ReactDOM.createRoot(document.getElementById('intro'));window.modeView={mode:'auto',pending:false};window.modeCalls=[];window.modeLocked=false;window.modeFail=false;window.ModeComponent=VIE.createVIEModeView(React,ReactDOM);window.mountMode=()=>modeRoot.render(React.createElement(ModeComponent,{useProjection:()=>modeView,locked:modeLocked,flip:async mode=>{modeCalls.push(mode);if(modeFail)throw Error('测试切换失败');modeView={mode,pending:false};mountMode();}}));mountMode();`);run('set','viewport','1080','1200');run('snapshot','-i');
 check('composer trigger matches the native model selector dimensions and transparent borderless style',`(()=>{const t=document.querySelector('.vie-mode-trigger'),s=getComputedStyle(t);return s.height==='28px'&&s.fontSize==='13px'&&s.borderTopWidth==='0px'&&s.backgroundColor==='rgba(0, 0, 0, 0)'&&!document.querySelector('.vie-mode-control select')})()`);
 run('click','.vie-mode-trigger');run('snapshot','-i');
 check('menu uses a portal and focuses the selected mode',`document.activeElement.getAttribute('aria-checked')==='true'&&document.querySelector('.vie-mode-menu').parentElement===document.body&&document.querySelectorAll('[role=menuitemradio]').length===4`);
 run('screenshot','--full',("screenshots/composer-menu-"+VERSION+".png"));run('press','Escape');run('snapshot','-i');
 check('Escape closes the menu and returns focus to the trigger',`!document.querySelector('.vie-mode-menu')&&document.activeElement.classList.contains('vie-mode-trigger')`);
 run('press','ArrowDown');run('snapshot','-i');run('press','End');run('press','Enter');run('snapshot','-i');
 check('keyboard mode selection invokes its command adapter without sending a chat message',`modeCalls.length===1&&modeCalls[0]==='off'&&document.querySelector('.vie-mode-label').textContent.includes('关闭')&&document.querySelector('#draft').value===''&&!document.querySelector('.vie-mode-menu')`);
 evaluate('modeFail=true');run('click','.vie-mode-trigger');run('snapshot','-i');run('press','Home');run('press','Enter');run('snapshot','-i');
 check('failed selection preserves the Host mode and shows the error',`modeView.mode==='off'&&document.querySelector('.vie-mode-control [role=status]').textContent.includes('测试切换失败')&&!document.querySelector('.vie-mode-trigger').disabled`);
 evaluate('modeFail=false;modeView={mode:"off",pending:true};mountMode()');run('snapshot','-i');check('pending host projection disables the trigger',`document.querySelector('.vie-mode-trigger').disabled`);
 evaluate('modeView={mode:"off",pending:false};modeLocked=true;mountMode()');run('snapshot','-i');check('locked composer disables the trigger',`document.querySelector('.vie-mode-trigger').disabled`);
 evaluate('modeLocked=false;mountMode()');run('snapshot','-i');run('click','.vie-mode-trigger');run('click','#question');run('snapshot','-i');check('outside click closes the mode menu',`!document.querySelector('.vie-mode-menu')`);
 run('click','#theme');run('click','.vie-mode-trigger');run('snapshot','-i');run('screenshot','--full',("screenshots/composer-menu-dark-"+VERSION+".png"));run('press','Escape');
 evaluate('modeLocked=false;modeView={mode:"auto",pending:false};mountMode()');run('snapshot','-i');run('click','.vie-mode-trigger');run('snapshot','-i');
 const study=Object.entries(run('snapshot','-i').refs).find(([,v])=>v.role==='menuitemradio'&&v.name.includes('学习模式'));assert.ok(study);run('click','@'+study[0]);run('snapshot','-i');
 check('study menu selection persists through the projection adapter',`modeView.mode==='study'&&modeCalls.at(-1)==='study'&&document.querySelector('.vie-mode-label').textContent.includes('学习模式')`);
 check('no runtime errors are visible' ,`!document.querySelector('.vie-generated-error')&&!document.querySelector('.vie-error')`);
 const errors=run('errors').errors??[];assert.equal(errors.length,0,JSON.stringify(errors));
 fs.writeFileSync(path.join(root,'docs/validation/reactive-browser.json'),JSON.stringify({version:VERSION,checks:checks.length,results:checks,pageErrors:errors,externalModelRequests:0},null,2));
}finally{try{run('close');}catch{}}
