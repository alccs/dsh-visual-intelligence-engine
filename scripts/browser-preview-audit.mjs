/** Regression cases found by the 0.30 delivery review. Uses the production view. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {browserDriver} from './browser-driver.mjs';
const b=browserDriver('preview-audit'),checks=[];
const check=(name,value)=>{checks.push({name,passed:!!value});console.log((value?'PASS ':'FAIL ')+name);};
const childHtml=()=>{b.enter();const html=b.value(b.run('get','html','#vie-root'));b.main();return String(html);};
const start=(doc,id)=>{b.ev('window.__auditDoc='+JSON.stringify(doc)+';window.__auditRaw=JSON.stringify(__auditDoc);window.__auditPartial=__auditRaw.slice(0,__auditRaw.indexOf("\\\"js\\\":")+7);VIEDemo.preview({text:k=>k==="spec"?__auditPartial:undefined,value:()=>undefined,complete:()=>false,closed:()=>false},'+JSON.stringify(id)+')');b.frames();};
const finish=id=>{b.ev('VIEDemo.setSource(VIE.documentSceneSource(__auditDoc),'+JSON.stringify(id)+')');b.frames();};
try{
 b.open('sdk-geometry');
 start({title:'内嵌样式',blocks:[{type:'figure',html:'<style id="embedded-style">#payload{color:rgb(9,87,123)}</style><script>VIE.setState({...VIE.state,inline:(VIE.state.inline||0)+1})</script><p id="payload">样式与脚本</p>',js:'VIE.setState({...VIE.state,color:getComputedStyle(document.getElementById("payload")).color,final:1});'}]},'embedded-audit');
 b.run('wait','iframe[data-vie-status="preview"]');
 check('preview keeps inline style but not inline script',childHtml().includes('embedded-style')&&!childHtml().includes('<script'));
 finish('embedded-audit');b.run('wait','iframe[data-vie-ready="true"]');
 check('final inline head styles and scripts match complete-load behavior',b.ev('Object.values(VIEDemo.context.figures).some(x=>x.state.color==="rgb(9, 87, 123)"&&x.state.inline===1&&x.state.final===1)'));
 b.run('set','viewport','320','900');
 start({title:'静态窄屏',blocks:[{type:'figure',html:'<svg viewBox="0 0 900 200"><text id="edge" x="880" y="100" text-anchor="end" font-size="10">窄屏测试</text></svg>',js:''}]},'static-fit-audit');b.run('wait','iframe[data-vie-status="preview"]');finish('static-fit-audit');b.run('wait','iframe[data-vie-ready="true"]');b.frames();
 const frameWidth=b.ev('document.querySelector("iframe").clientWidth');b.enter();const svgBox=b.run('get','box','svg'),edgeBox=b.run('get','box','#edge');b.main();
 check('streamed static SVG fully fits and reports small text like complete SVG',svgBox.x+svgBox.width<=frameWidth+1&&edgeBox.x+edgeBox.width<=frameWidth+1&&b.ev('Number(document.querySelector("iframe").dataset.vieMinFont)>0&&document.querySelector("iframe").dataset.vieSmallText==="true"&&document.documentElement.scrollWidth<=innerWidth'));
 start({title:'预览错误恢复',blocks:[{type:'figure',html:'<i/>'.repeat(4001),js:'VIE.setState({recovered:true})'}]},'preview-recovery-audit');b.run('wait','.vie-generated-error');
 check('oversized preview reports an error instead of false readiness',b.ev('document.querySelector("iframe").dataset.vieReady==="false"'));
 b.ev('__auditDoc.blocks[0].html="<p>已恢复</p>"');finish('preview-recovery-audit');b.ev('(async()=>{await new Promise(r=>setTimeout(r,180));return true})()');
 check('a valid final result recovers after static preview failed',b.ev('document.querySelector("iframe").dataset.vieReady==="true"&&!document.querySelector(".vie-generated-error")&&Object.values(VIEDemo.context.figures).some(x=>x.state.recovered===true)'));
 fs.writeFileSync(path.join(b.root,'docs/validation/preview-audit-browser.json'),JSON.stringify({passed:checks.every(c=>c.passed),checks,externalModelRequests:0},null,2));
 assert.ok(checks.every(c=>c.passed),JSON.stringify(checks.filter(c=>!c.passed)));
}finally{b.close();}
