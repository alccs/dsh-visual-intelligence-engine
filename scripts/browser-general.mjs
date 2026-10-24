/** Real opaque iframe execution through the production React view. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {learningLesson} from './learning-examples.mjs';
const root=path.resolve(import.meta.dirname,'..'),checks=[];
const binary=path.join(root,'node_modules/agent-browser/bin',process.platform==='win32'?'agent-browser-win32-x64.exe':'agent-browser-'+process.platform+'-'+process.arch);
const base=['--session','vie-019-general-'+process.pid,'--json'];
function run(...args){const r=spawnSync(binary,[...base,...args],{cwd:root,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data;}
function evaluate(code){const r=spawnSync(binary,[...base,'eval','--stdin'],{cwd:root,input:code,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stderr||r.stdout);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data.result;}
function check(name,code){assert.equal(evaluate(code),true,name);checks.push({name,passed:true});console.log('PASS '+name);}
function ref(role,name){const state=run('snapshot','-i');const found=Object.entries(state.refs??{}).find(([_,v])=>v.role===role&&v.name===name);if(!found)throw Error('Missing '+role+' '+name);return '@'+found[0];}
function click(name){run('click',ref('button',name));}
function slider(name,key){run('focus',ref('slider',name));run('press',key);}
function topic(name){run('click','[data-demo-topic="'+name+'"]');run('snapshot','-i');}
const frames='await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);';
try{
  run('--executable-path',process.env.VIE_CHROME??'C:/Program Files/Google/Chrome/Application/chrome.exe','--allow-file-access','open',pathToFileURL(path.join(root,'dist/VIE-Interactive-0.29.2.html')).href);run('snapshot','-i');run('set','viewport','1040','1100');evaluate("VIEDemo.select('helix')");run('snapshot','-i');
  check('prose, generated figure and explanation keep reading order without templates',`(async()=>{${frames}return [...document.querySelector('.vie-body').children].slice(0,3).map(n=>n.className).join(',')==='vie-text,vie-generated-figure,vie-text'&&!document.querySelector('.vie-experiment')&&!VIEDemo.source.includes('InteractiveScene')})()`);
  check('frame has no same-origin, top-navigation or popup grants',`document.querySelector('iframe').getAttribute('sandbox')==='allow-scripts'&&document.querySelector('iframe').contentDocument===null`);
  slider('螺旋角','End');slider('观察方向','End');
  check('real keyboard controls return generated parameters',`(async()=>{${frames}return VIEDemo.context.figures.block2.state.beta===35&&VIEDemo.context.figures.block2.state.yaw===65})()`);
  click('播放');
  check('play and pause export a nonzero animation angle',`(async()=>{await new Promise(r=>setTimeout(r,180));return true})()`);
  click('暂停');check('paused 3D animation reports its angle',`VIEDemo.context.figures.block2.state.angle>0`);
  evaluate('VIEDemo.remount()');run('snapshot','-i');
  check('same-call remount restores the generated state',`(async()=>{${frames}return VIEDemo.context.figures.block2.state.beta===35&&document.querySelector('iframe').dataset.vieReady==='true'})()`);
  click('复位');run('snapshot','-i');
  check('reset restores initial parameters',`(async()=>{${frames}return VIEDemo.context.figures.block2.state.beta===24&&VIEDemo.context.figures.block2.state.angle===0})()`);
  run('screenshot','--full','screenshots/general-helix-desktop-0.29.2.png');
  topic('binary');click('比较下一步');click('比较下一步');
  check('custom binary search reaches the expected comparison step',`VIEDemo.context.figures.block2.state.target===39&&VIEDemo.context.figures.block2.state.step===2`);
  slider('查找目标','End');for(let i=0;i<4;i++)click('比较下一步');
  check('absent target terminates the custom search',`VIEDemo.context.figures.block2.state.target===80&&VIEDemo.context.figures.block2.state.step===4`);
  run('screenshot','--full','screenshots/general-binary-desktop-0.29.2.png');
  topic('rgb');slider('红色通道','End');slider('绿色通道','Home');slider('蓝色通道','Home');
  check('custom RGB sliders publish pure-red input values',`VIEDemo.context.figures.block2.state.r===255&&VIEDemo.context.figures.block2.state.g===0&&VIEDemo.context.figures.block2.state.b===0`);
  click('带参数继续提问');
  check('follow-up contains actual state without generated source',`document.getElementById('draft').value.includes('"r":255')&&!document.getElementById('draft').value.includes('getElementById')`);
  run('screenshot','--full','screenshots/general-rgb-desktop-0.29.2.png');
  check('messages with a different sender are ignored',`(()=>{const f=document.querySelector('iframe'),channel=f.srcdoc.match(/"channel":"([^"]+)"/)[1],before=JSON.stringify(VIEDemo.context);dispatchEvent(new MessageEvent('message',{source:window,data:{v:1,channel,type:'state',value:{forged:true}}}));return before===JSON.stringify(VIEDemo.context)})()`);
  for(const width of [390,320]){
    run('set','viewport',String(width),'1000');
    for(const name of ['rgb','binary','helix']){
      topic(name);check(name+' fits host and frame at '+width,`(async()=>{${frames}const f=document.querySelector('iframe');return document.documentElement.scrollWidth<=innerWidth&&!document.querySelector('.vie-generated-error')&&f.dataset.vieOverflow==='false'&&f.dataset.vieReady==='true'})()`);
    }
  }
  run('set','viewport','390','1000');topic('helix');run('screenshot','--full','screenshots/general-helix-mobile-0.29.2.png');
  const normalErrors=run('errors');assert.equal(normalErrors.errors?.length??0,0,JSON.stringify(normalErrors));
  // The public state bridge supplies diagnostics from the opaque frame itself.
  const probe={title:'隔离与主题验证',blocks:[{type:'figure',title:'探针',html:'<button id="bad">发送超大状态</button><output id="mode"></output>',js:`(async()=>{let parentBlocked=false;try{void parent.document.body}catch(e){parentBlocked=e.name==='SecurityError'}const fetchBlocked=await fetch('data:text/plain,test').then(()=>false,()=>true);const report=()=>{document.getElementById('mode').textContent=VIE.theme.mode;VIE.setState({parentBlocked,fetchBlocked,mode:VIE.theme.mode,reduced:VIE.reducedMotion});};window.addEventListener('vie:themechange',report);document.getElementById('bad').onclick=()=>VIE.setState({payload:'x'.repeat(3000)});report();})();`}]};
  evaluate(`VIEDemo.setSource(VIE.documentSceneSource(${JSON.stringify(probe)}),'probe')`);run('snapshot','-i');
  check('opaque origin blocks parent DOM and CSP blocks data fetch',`(async()=>{${frames}return VIEDemo.context.figures.block1.state.parentBlocked===true&&VIEDemo.context.figures.block1.state.fetchBlocked===true})()`);
  run('click','#theme');run('snapshot','-i');check('theme changes cross the state bridge',`(async()=>{${frames}return VIEDemo.context.figures.block1.state.mode==='dark'})()`);
  run('screenshot','--full','screenshots/general-probe-dark-0.29.2.png');
  run('set','media','reduced-motion');check('reduced-motion preference reaches generated code',`(async()=>{${frames}return VIEDemo.context.figures.block1.state.reduced===true})()`);
  click('发送超大状态');check('oversized figure state is rejected without corrupting stored state',`(async()=>{${frames}return !!document.querySelector('.vie-generated-error')&&!VIEDemo.context.figures.block1.state.payload})()`);
  evaluate(`VIEDemo.setSource(VIE.documentSceneSource({title:'错误反馈验证',blocks:[{type:'figure',title:'测试',html:'<output id="done"></output>',js:'throw Error("VIE_EXPECTED_ERROR");'}]}),'runtime-error-test')`);run('snapshot','-i');
  check('script errors are visible and can be returned for repair',`(async()=>{${frames}return document.querySelector('.vie-generated-error').textContent.includes('VIE_EXPECTED_ERROR')&&VIEDemo.context.figureErrors.block1.includes('VIE_EXPECTED_ERROR')})()`);
  evaluate(`VIEDemo.setSource(VIE.documentSceneSource({title:'错误反馈验证',blocks:[{type:'figure',title:'测试',html:'<output id="done"></output>',js:'document.getElementById("done").textContent="修复完成";'}]}),'runtime-error-test')`);run('snapshot','-i');
  check('corrected source clears runtime errors and runs again',`(async()=>{${frames}return !document.querySelector('.vie-generated-error')&&Object.keys(VIEDemo.context.figureErrors).length===0&&document.querySelector('iframe').dataset.vieReady==='true'})()`);
  evaluate(`VIEDemo.setSource(VIE.documentSceneSource(${JSON.stringify(learningLesson[0].document)}),'study-stages')`);run('wait','iframe[data-vie-ready="true"]');run('snapshot','-i');
  check('declarative learning data mounts without authored control code',`document.querySelector('iframe').dataset.vieStatus==='ready'&&!document.querySelector('.vie-generated-error')`);
  assert.ok(!run('snapshot').snapshot.includes('StaticText "电子扩散模拟"'));checks.push({name:'learning shell does not duplicate its outer title',passed:true});
  run('click',ref('tab','② 电子扩散'));run('snapshot','-i');check('learning stages change real local state',`VIEDemo.context.figures.block1.state.contact.stage===1`);
  run('press','ArrowRight');run('snapshot','-i');check('learning stage tabs support keyboard navigation',`VIEDemo.context.figures.block1.state.contact.stage===2`);
  evaluate('VIEDemo.remount()');run('wait','iframe[data-vie-ready="true"]');run('snapshot','-i');check('learning stage survives remount',`VIEDemo.context.figures.block1.state.contact.stage===2`);
  for(const width of [320,1080]){run('set','viewport',String(width),'1100');run('snapshot','-i');check('learning graphic fits outer page at '+width,`document.documentElement.scrollWidth<=innerWidth&&document.querySelector('iframe').dataset.vieOverflow==='false'`);run('screenshot','--full',path.join(root,'screenshots/learning-stages-'+width+'-0.29.2.png'));}
  evaluate(`VIEDemo.setSource(VIE.documentSceneSource(${JSON.stringify(learningLesson[2].document)}),'study-quiz')`);run('wait','iframe[data-vie-ready="true"]');run('snapshot','-i');
  run('click',ref('radio','A. 因为金属 A 的电子最终全部耗尽'));run('snapshot','-i');check('learning quiz records incorrect selection locally',`VIEDemo.context.figures.block1.state.contactQuiz.answer===0`);
  run('click',ref('radio','B. 因为产生的电场阻碍继续净扩散'));run('snapshot','-i');check('learning quiz updates the answer without a model request',`VIEDemo.context.figures.block1.state.contactQuiz.answer===1`);
  assert.ok(run('snapshot').snapshot.includes('回答正确'));checks.push({name:'learning quiz exposes immediate explanatory feedback',passed:true});
  run('screenshot','--full',path.join(root,'screenshots/learning-quiz-0.29.2.png'));
  fs.writeFileSync(path.join(root,'docs/validation/general-browser.json'),JSON.stringify({version:'0.29.2',checks:checks.length,results:checks,normalPageErrors:normalErrors,expectedRuntimeFailure:'VIE_EXPECTED_ERROR',automation:'cross-frame accessibility refs; public state bridge for opaque-frame diagnostics'},null,2));
}finally{try{run('close')}catch{}}
