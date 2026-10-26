import {VERSION} from './version-info.mjs';
/** A rejected tool preview must not report its error against a repaired answer. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {browserDriver} from './browser-driver.mjs';

const b=browserDriver('render-repair'),checks=[];
const pass=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS '+name);};
const figure=js=>({title:'Figure repair',blocks:[{type:'figure',title:'Drawing',html:'<div id="plot"></div>',js}]});
const broken=figure('const g=VIE.svg({root:"#plot",width:400,height:180});g.label({at:[200,90],text:"Old drawing",unsupportedAlignment:"center"});');
const repaired=figure('const g=VIE.svg({root:"#plot",width:400,height:180});g.circle({at:[200,90],radius:32});g.label({at:[200,145],text:"Repaired drawing"});');
const result=(source,anchor,revision=2)=>({type:'tool/result',seq:10+revision,time:10+revision,data:{turn:1,step:2,message:{source:{callId:anchor+'-repair'}},meta:{kind:'vie',valid:true,anchorCallId:anchor,visualId:anchor,revision,presentationVersion:3,placement:'flow',source}}});
const sourceKey=source=>{let hash=2166136261;for(let i=0;i<source.length;i++){hash^=source.charCodeAt(i);hash=Math.imul(hash,16777619);}return source.length.toString(36)+'-'+(hash>>>0).toString(36);};

try{
 b.open('fast');
 b.ev('window.__reports=[];VIEDemo.bridge.setReporter((id,value)=>__reports.push(value));window.__broken='+JSON.stringify(JSON.stringify(broken))+';window.__repaired='+JSON.stringify(repaired));
 b.ev('VIEDemo.preview({text:k=>k==="document"?__broken:undefined,value:()=>undefined,complete:()=>true,closed:()=>true},"repair-handoff")');
 b.run('wait','.vie-generated-error');
 pass('unsupported SDK arguments visibly reject the original preview',b.ev('__reports.some(r=>r.status==="error"&&r.error.includes("unsupportedAlignment"))'));
 const repairedSource=b.ev('VIE.documentSceneSource(__repaired)'),repairedKey=sourceKey(repairedSource);
 b.ev('VIEDemo.answerHistory('+JSON.stringify([result(repairedSource,'repair-handoff')])+',true)');
 b.run('wait','iframe[data-vie-ready="true"]');b.frames();
 pass('preview to answer handoff never attributes an old error to repaired source',b.ev('__reports.filter(r=>r.sourceKey==='+JSON.stringify(repairedKey)+').every(r=>r.status!=="error")'));
 b.enter();
 pass('the repaired answer contains actual SVG geometry and readable labels',String(b.value(b.run('get','text','#plot'))).includes('Repaired drawing')&&Number(b.value(b.run('get','attr','#plot circle','r')))===32);
 b.main();
 pass('repaired source produces a ready report',b.ev('__reports.some(r=>r.sourceKey==='+JSON.stringify(repairedKey)+'&&r.status==="ready")'));

 // A renderer can finish after its shared store has moved to another source.
 const next=figure('const g=VIE.svg({root:"#plot"});g.label({at:[160,80],text:"Current drawing"});');
 const nextSource=b.ev('VIE.documentSceneSource('+JSON.stringify(next)+')'),nextKey=sourceKey(nextSource);
 b.ev('(()=>{const frame=document.querySelector("iframe"),match=frame.srcdoc.match(/"channel":"([^"]+)"/),store=VIEDemo.bridge.getStore(VIEDemo.bridge.sceneKey("offline-demo","repair-handoff"));store.updateSource('+JSON.stringify(nextSource)+');window.dispatchEvent(new MessageEvent("message",{source:frame.contentWindow,data:{v:1,channel:match[1],type:"error",value:"OBSOLETE_FRAME_ERROR"}}));return true})()');
 b.run('wait','iframe[data-vie-ready="true"]');b.frames();
 pass('an obsolete renderer callback cannot poison the current source',b.ev('__reports.filter(r=>r.sourceKey==='+JSON.stringify(nextKey)+').every(r=>r.status!=="error")&&!document.querySelector(".vie-generated-error")'));

 const genuine=figure('throw Error("CURRENT_FRAME_ERROR");');
 b.ev('VIEDemo.setSource(VIE.documentSceneSource('+JSON.stringify(genuine)+'),"current-failure")');
 b.run('wait','.vie-generated-error');
 pass('real current-frame failures still stay failed',b.ev('document.querySelector("iframe").dataset.vieReady==="false"&&__reports.some(r=>r.status==="error"&&r.error.includes("CURRENT_FRAME_ERROR"))'));
 b.ev('VIEDemo.setSource('+JSON.stringify(repairedSource)+',"current-failure")');
 b.run('wait','iframe[data-vie-ready="true"]');b.frames();
 pass('a new revision can recover from a genuine runtime failure',b.ev('!document.querySelector(".vie-generated-error")'));
 b.ev('window.__retiredFrame=document.querySelector("iframe");window.__retiredChannel=__retiredFrame.srcdoc.match(/"channel":"([^"]+)"/)[1];VIEDemo.setSource(VIE.documentSceneSource('+JSON.stringify(broken)+'),"current-failure")');
 b.run('wait','.vie-generated-error');
 b.ev('window.dispatchEvent(new MessageEvent("message",{source:__retiredFrame.contentWindow,data:{v:1,channel:__retiredChannel,type:"error",value:"RETIRED_CHANNEL_ERROR"}}))');
 b.frames();
 pass('a rejected replacement retires messages from its previous frame',b.ev('!__reports.some(r=>r.error==="RETIRED_CHANNEL_ERROR")&&document.querySelector(".vie-generated-error").textContent.includes("unsupportedAlignment")'));
 const aligned=figure('const g=VIE.svg({root:"#plot",width:400,height:180});["left","center","right"].forEach((align,i)=>g.label({at:[200,40+i*50],text:align,align}));');
 b.ev('VIEDemo.setSource(VIE.documentSceneSource('+JSON.stringify(aligned)+'),"current-failure")');
 b.run('wait','iframe[data-vie-ready="true"]');b.enter();
 for(const anchor of ['start','middle','end'])pass('the runtime renders align as SVG '+anchor,b.value(b.run('get','attr','text[text-anchor="'+anchor+'"]','text-anchor'))===anchor);
 b.main();
 b.run('screenshot','--full',path.join(b.root,("screenshots/render-repair-"+VERSION+".png")));
 fs.writeFileSync(path.join(b.root,'docs/validation/render-repair-browser.json'),JSON.stringify({passed:true,checks,externalModelRequests:0},null,2));
}finally{b.close();}
