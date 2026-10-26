/** Full-width shells and complete static SVGs, using public synthetic content only. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {browserDriver} from './browser-driver.mjs';
const b=browserDriver('responsive'),checks=[],measurements=[];
const version=JSON.parse(fs.readFileSync(path.join(b.root,'package/package.json'))).version;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" width="720" height="320"><rect x="8" y="8" width="704" height="304" rx="12" fill="#f4f6fa" stroke="#5483ef"/><line x1="36" y1="120" x2="684" y2="120" stroke="#5483ef" stroke-width="3"/><text x="36" y="70" font-size="16">完整图形边界</text><text x="684" y="290" text-anchor="end" font-size="9.5" id="right-edge">右侧终点</text></svg>`;
function check(name,ok){checks.push({name,passed:!!ok});console.log((ok?'PASS ':'FAIL ')+name);}
function inspect(name){
 b.main();b.frames();
 const host=b.ev(`(()=>{const s=document.querySelector('.vie-shell'),f=document.querySelector('iframe');return {host:s.parentElement.clientWidth,shell:s.clientWidth,frame:f.clientWidth,small:f.dataset.vieSmallText,overflow:f.dataset.vieOverflow,hint:!![...document.querySelectorAll('.vie-figure-hint')].find(p=>p.textContent.includes('图中文字较小'))}})()`);
 const frame=b.run('get','box','iframe');
 b.enter();const drawing=b.run('get','box','svg'),edge=b.run('get','box','#right-edge');
 // Frame-local boxes are relative to the iframe viewport, not the parent page.
 check(name+' uses available prose width',Math.abs(host.shell-host.host)<=1);
 check(name+' keeps the entire SVG in the frame',drawing.x>=-1&&drawing.x+drawing.width<=frame.width+1);
 check(name+' shows the rightmost label',edge.x>=0&&edge.x+edge.width<=frame.width);
 check(name+' preserves aspect ratio',Math.abs(drawing.width/drawing.height-720/320)<.02);
 check(name+' never widens the page',b.ev('document.documentElement.scrollWidth<=innerWidth'));
 if(!name.includes('expanded'))check(name+' reports small text without widening',host.small!=='true'||host.hint);
 measurements.push({name,...host,frame,drawing,edge});b.main();
}
try{
 b.open();
 b.ev(`document.querySelector('main').style.width='calc(100% - 48px)'`);
 b.ev(`VIEDemo.setSource(VIE.documentSceneSource({title:'Responsive drawing',blocks:[{type:'figure',title:'完整图形',html:${JSON.stringify(svg)}}]}),'responsive')`);
 b.run('wait','iframe[data-vie-ready="true"]');
 for(const width of [1131,760,390,320,1131]){b.run('set','viewport',String(width),'1100');inspect('viewport '+width);}
 b.ev(`(()=>{window.__responsiveFrame=document.querySelector('iframe');return true})()`);
 b.run('click','.vie-figure-actions button[aria-expanded="false"]');inspect('expanded');
 check('expansion retains the mounted frame',b.ev(`document.querySelector('iframe')===window.__responsiveFrame`));
 b.run('click','.vie-figure-actions button[aria-expanded="true"]');inspect('collapsed');
 // Desktop viewport with a narrow chat pane: container width must drive the fit.
 b.ev(`document.querySelector('main').style.width='350px'`);inspect('narrow pane');
 b.ev(`document.querySelector('main').style.width='calc(100% - 48px)'`);inspect('wider pane');
 b.run('screenshot','--full',path.join(b.root,'screenshots/responsive-width-'+version+'.png'));
 const errors=b.run('errors').errors??[];check('no browser errors',errors.length===0);
 fs.writeFileSync(path.join(b.root,'docs/validation/responsive-browser.json'),JSON.stringify({version,checks:checks.length,results:checks,measurements,pageErrors:errors,externalModelRequests:0},null,2));
 assert.ok(checks.every(c=>c.passed),'Responsive layout regression; see responsive-browser.json');
}finally{b.close();}
