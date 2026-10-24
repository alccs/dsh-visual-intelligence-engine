import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {spawnSync} from 'node:child_process';import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'..'),version=JSON.parse(fs.readFileSync(path.join(root,'package/package.json'))).version,bin=path.join(root,'node_modules/agent-browser/bin/agent-browser-win32-x64.exe'),session='vie-questions-'+process.pid,checks=[];
function run(...args){const r=spawnSync(bin,['--session',session,'--json',...args],{encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stdout+r.stderr);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data;}
function ev(input){const r=spawnSync(bin,['--session',session,'--json','eval','--stdin'],{input,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stdout+r.stderr);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data.result;}
function click(name){const refs=run('snapshot','-i').refs;const pair=Object.entries(refs).find(([,v])=>v.role==='button'&&v.name===name);assert.ok(pair,name);run('click','@'+pair[0]);run('snapshot','-i');}
const question=i=>({question:'第 '+(i+1)+' 题：'+(i+1)+' + 1 = ?',options:[{label:String(i+2)},{label:String(i+3)},{label:String(i+4)},{label:String(i+5)}],correct:0,explanation:'解析：在 '+(i+1)+' 的基础上加一，得到 '+(i+2)+'。'});
const doc={title:'逐题闯关示例',blocks:[{type:'learning',title:'数学练习 · 10题',questions:Array.from({length:10},(_,i)=>question(i))}]};
const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS '+name);};
try{
 run('--executable-path',process.env.VIE_CHROME??'C:/Program Files/Google/Chrome/Application/chrome.exe','--allow-file-access','open',pathToFileURL(path.join(root,'dist/VIE-Interactive-'+version+'.html')).href);run('set','viewport','800','850');
 ev(`VIEDemo.setSource(VIE.documentSceneSource(${JSON.stringify(doc)}),'question-regression')`);run('wait','iframe[data-vie-ready="true"]');
 let snapshot=run('snapshot');check('one frame for ten questions and answers hidden initially',ev(`document.querySelectorAll('iframe').length===1&&!document.querySelector('.vie-generated-error')`)&&!JSON.stringify(snapshot).includes('解析：'));
 click('B 3');snapshot=run('snapshot');check('choice shows feedback and locks the answer',JSON.stringify(snapshot).includes('解析：')&&JSON.stringify(snapshot).includes('正确答案是 A'));
 click('下一题 →');check('second question and first score are restored after remount',ev(`VIEDemo.remount();true`));run('wait','iframe[data-vie-ready="true"]');snapshot=run('snapshot');check('state survived remount',JSON.stringify(snapshot).includes('第 2 / 10 题')&&JSON.stringify(snapshot).includes('得分 0'));
 for(let i=1;i<10;i++){click('A '+(i+2));click(i===9?'查看结果 →':'下一题 →');}
 snapshot=run('snapshot');check('all ten interactive answers yield the total score',JSON.stringify(snapshot).includes('9 / 10')&&JSON.stringify(snapshot).includes('本组完成'));
 click('重新做一遍');snapshot=run('snapshot');check('restart clears score and answers',JSON.stringify(snapshot).includes('得分 0')&&!JSON.stringify(snapshot).includes('解析：'));
 run('set','viewport','390','850');run('click','[data-demo-topic=questions]');run('wait','iframe[data-vie-ready="true"]');check('mobile frame fits viewport',ev(`document.documentElement.scrollWidth<=innerWidth`));run('screenshot','--full',path.join(root,'screenshots/questions-mobile-'+version+'.png'));
 run('set','viewport','800','850');run('screenshot','--full',path.join(root,'screenshots/questions-desktop-'+version+'.png'));
 run('click','#theme');snapshot=run('snapshot');check('dark theme keeps four answer choices',ev(`document.body.classList.contains('dark')`)&&JSON.stringify(snapshot).includes('D 5'));run('screenshot','--full',path.join(root,'screenshots/questions-dark-'+version+'.png'));check('runtime reports no error',ev(`!document.querySelector('.vie-generated-error')`));fs.writeFileSync(path.join(root,'docs/validation/questions-browser.json'),JSON.stringify({version,checks,externalModelRequests:0},null,2));
}finally{try{run('close')}catch{}}
