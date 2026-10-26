import {VERSION} from './version-info.mjs';
/** Production command slot component in the verified Harness chat-seat shape. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {browserDriver} from './browser-driver.mjs';
const b=browserDriver('command-feedback'),checks=[];
const pass=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS '+name);};
try{
 b.open('fast');
 b.ev(`(()=>{
  document.querySelector('main').hidden=true;
  const seat=document.createElement('main');seat.id='command-feedback-fixture';document.body.append(seat);
  const {VIECommandView}=VIE.createViews(React,VIE.createVIEBridge(VIE.SceneStore)),h=React.createElement;
  window.__commandFixture={seat,root:ReactDOM.createRoot(seat),manual:false};
  __commandFixture.render=()=>ReactDOM.flushSync(()=>__commandFixture.root.render(h('article',{'data-chat-node-key':'turn-with-command-children'},[
   h('p',{key:'before','data-command-prose':'before'},'图形前的正常解释。'),
   ...Array.from({length:8},(_,index)=>h('div',{key:'feedback-'+index,'data-chat-node-key':'feedback-'+index,'data-feedback-seat':index,style:{padding:'12px 0',margin:'8px 0'}},h('div',{className:'callRow'},h(VIECommandView,{node:{name:'vie',args:__commandFixture.manual&&index===0?'auto':'__render '+JSON.stringify({status:'ready',revision:1}),commandId:'feedback-'+index,outcome:{kind:'success',text:__commandFixture.manual&&index===0?'已切换自动模式':''}}})))),
   h('p',{key:'after','data-command-prose':'after'},'图形后的正常解释。'),
   ...[{args:'study',text:'已启用学习模式'},{args:'status',text:'模式：study\\n图形：已就绪'}].map(({args,text})=>h('div',{key:args,'data-chat-node-key':'manual-'+args},h(VIECommandView,{node:{name:'vie',args,commandId:'manual-'+args,outcome:{kind:'success',text}}}))),
   h('div',{key:'other','data-chat-node-key':'other-command'},'其他插件命令 · 正常结果')
  ])));
  __commandFixture.render();return true;
 })()`);
 pass('all eight internal feedback seats have zero height and are excluded from chat anchors',b.ev('Array.from(document.querySelectorAll("[data-feedback-seat]")).every(row=>row.hidden&&row.getBoundingClientRect().height===0&&getComputedStyle(row).display==="none")'));
 pass('nested command seats do not hide the enclosing turn or prose',b.ev('!document.querySelector("[data-chat-node-key=turn-with-command-children]").hidden&&document.querySelector("[data-command-prose=before]").getBoundingClientRect().height>0&&document.querySelector("[data-command-prose=after]").getBoundingClientRect().height>0'));
 pass('internal feedback leaves no blank vertical stack between explanations',b.ev('(()=>{const before=document.querySelector("[data-command-prose=before]").getBoundingClientRect(),after=document.querySelector("[data-command-prose=after]").getBoundingClientRect();return after.top-before.bottom<35})()'));
 pass('manual study, status and unrelated command results remain visible',b.ev('document.querySelectorAll("[data-vie-manual-command]").length===2&&["manual-study","manual-status","other-command"].every(key=>document.querySelector(`[data-chat-node-key="${key}"]`).getBoundingClientRect().height>0)'));
 b.run('click','[data-chat-node-key=manual-status] summary');
 pass('manual multiline status details can still be expanded',b.ev('document.querySelector("[data-chat-node-key=manual-status] details").open&&document.querySelector("[data-chat-node-key=manual-status] pre").textContent.includes("图形：已就绪")'));
 b.ev('ReactDOM.flushSync(()=>__commandFixture.root.unmount());__commandFixture.root=ReactDOM.createRoot(__commandFixture.seat);__commandFixture.render()');b.frames();
 pass('full-history remount suppresses the same old internal rows',b.ev('Array.from(document.querySelectorAll("[data-feedback-seat]")).every(row=>row.hidden&&row.getBoundingClientRect().height===0)&&document.querySelectorAll("[data-vie-manual-command]").length===2'));
 b.ev('__commandFixture.manual=true;__commandFixture.render()');b.frames();
 pass('reused seat is restored when it becomes a manual command',b.ev('!document.querySelector("[data-feedback-seat=\\"0\\"]").hidden&&document.querySelector("[data-feedback-seat=\\"0\\"]").getBoundingClientRect().height>0&&!document.querySelector("[data-feedback-seat=\\"0\\"]").hasAttribute("data-vie-internal-command")'));
 b.ev('__commandFixture.manual=false;__commandFixture.render()');b.frames();
 for(const width of [1280,390]){b.run('set','viewport',String(width),'900');b.frames();pass('internal rows stay absent and visible commands fit at '+width,b.ev('document.documentElement.scrollWidth<=innerWidth&&Array.from(document.querySelectorAll("[data-feedback-seat]")).every(row=>row.getBoundingClientRect().height===0)'));}
 b.run('screenshot','--full',path.join(b.root,("screenshots/internal-feedback-"+VERSION+".png")));
 fs.writeFileSync(path.join(b.root,'docs/validation/command-feedback-browser.json'),JSON.stringify({passed:true,checks,adapter:'actual VIE command slot component; verified Harness nested chat-seat markup; full-history remount',externalModelRequests:0},null,2));
}finally{b.close();}
