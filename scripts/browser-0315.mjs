/** Real production gallery component and scene renderer; no native APK claim. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {browserDriver} from './browser-driver.mjs';import {VERSION} from './version-info.mjs';
const b=browserDriver('0315'),checks=[];const pass=(name,ok)=>{assert.ok(ok,name);checks.push(name);console.log('PASS '+name);};
const width=()=>{b.enter();const v=Number(b.value(b.run('get','attr','[data-vie-primitive="rect"] rect','width')));b.main();return v;};
const ready=()=>{b.run('wait','iframe[data-vie-ready="true"]');b.frames();};
try{
 b.open('mobile-gallery');b.run('set','viewport','1080','1200');ready();b.run('snapshot','-i');
 pass('gallery defaults to latest complete scene and mounts one sandbox',width()===160&&b.ev('document.querySelectorAll("#stage iframe").length===1'));
 b.run('select','[aria-label="选择 VIE 图解"]','gallery-alpha');ready();pass('real scene selector opens a historical figure',width()===80);
 b.run('focus','#stage input[type=range]');b.run('press','End');b.frames();pass('historical figure controls still change actual geometry',width()===200);
 b.run('select','[aria-label="选择 VIE 图解"]','gallery-beta');ready();b.run('select','[aria-label="选择 VIE 图解"]','gallery-alpha');ready();pass('switching figures restores their own edited parameters',width()===200);
 b.ev('VIEDemo.remount();true');ready();b.run('select','[aria-label="选择 VIE 图解"]','gallery-alpha');ready();pass('gallery remount retains the saved scene state',width()===200);
 b.ev('VIEDemo.gallerySession("other-session");true');ready();pass('gallery state is isolated by session',width()===80);b.ev('VIEDemo.gallerySession("offline-demo");true');ready();pass('returning to original session restores its own values',width()===200);
 for(const viewport of [390,320]){b.run('set','viewport',String(viewport),'1100');b.frames();pass('mobile gallery fits '+viewport,b.ev('document.documentElement.scrollWidth<=innerWidth&&document.querySelectorAll("#stage iframe").length===1'));}
 b.run('click','#theme');b.frames();pass('dark mode retains the current interactive figure',width()===200);b.run('click','#theme');
 b.ev('VIEDemo.galleryUpdate({visualId:"gallery-alpha",revision:3,title:"参数修订",valid:false});true');b.frames();pass('failed revision preserves an operable previous graphic',width()===200&&b.ev('document.querySelector("[data-vie-gallery]").textContent.includes("保留原图")'));
 b.run('screenshot','--full',path.join(b.root,'screenshots/sdk-mobile-gallery-'+VERSION+'.png'));
 b.ev('VIEDemo.select("sdk-managed");true');ready();pass('ordinary WebUI view remains operable outside gallery',b.ev('!document.querySelector("[data-vie-gallery]")&&document.querySelector("iframe").dataset.vieReady==="true"'));
 pass('no browser errors',(b.run('errors').errors??[]).length===0);
 fs.writeFileSync(path.join(b.root,'docs/validation/0315-browser.json'),JSON.stringify({version:VERSION,passed:true,checks,realDevice:false,externalModelRequests:0},null,2)+'\n');
}finally{b.close();}
