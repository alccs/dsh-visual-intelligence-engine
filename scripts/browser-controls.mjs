import {VERSION} from './version-info.mjs';
/** Actual native + opaque-frame controls: theme, geometry, state and keyboard. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
import {browserDriver} from './browser-driver.mjs';import {controlsA} from './control-examples.mjs';
const b=browserDriver('controls'),checks=[],audits=[];
const pass=(name,ok)=>{assert.ok(ok,name);checks.push({name,passed:true});console.log('PASS '+name);};
const probe=`VIE.ui.toolbar({root:'#toolbar',items:[{id:'audit',label:'样式检查',variant:'ghost',onClick:()=>{
 const style=(selector,pseudo)=>getComputedStyle(document.querySelector(selector),pseudo),primary=style('[data-vie-action=advance]'),secondary=style('[data-vie-action=restore]'),range=document.getElementById('local-range');
 toolbar.set('restore',{variant:'rainbow'});const variantFallback=document.querySelector('[data-vie-action=restore]').dataset.vieButton==='secondary';
 VIE.setState({...VIE.state,styleAudit:{primary:{background:primary.backgroundColor,color:primary.color,radius:primary.borderRadius,height:primary.minHeight},secondary:{background:secondary.backgroundColor,radius:secondary.borderRadius},rangeHeight:style('#local-range').height,rangeAppearance:style('#local-range').appearance,fill:range.style.getPropertyValue('--vie-range-fill'),switchWidth:style('#local-switch').width,disabledOpacity:style('[data-vie-action=unavailable]').opacity,graphColor:getComputedStyle(document.querySelector('[data-vie-primitive=circle] circle')).stroke,variantFallback}});
 }}]});`;
function audit(){b.enter();b.run('click','[data-vie-action=audit]');b.main();b.frames();return b.ev('VIEDemo.context.figures.block1.state.styleAudit');}
function frameValue(selector){b.enter();const v=b.value(b.run('get','value',selector));b.main();return v;}
try{
 b.open('controls');b.run('set','viewport','1080','1200');
 const doc=JSON.parse(JSON.stringify(controlsA));doc.blocks[0].js+='\n'+probe;
 b.ev(`VIEDemo.setSource(VIE.documentSceneSource(${JSON.stringify(doc)}),'controls-regression')`);b.run('wait','iframe[data-vie-ready="true"]');b.frames();
 const light=audit();audits.push({theme:'light',...light});
 pass('native and sandbox buttons share the A radius',light.primary.radius==='10px'&&light.secondary.radius==='10px'&&b.ev('getComputedStyle(document.querySelector(".vie-figure-actions button")).borderRadius==="10px"'));
 pass('primary and secondary controls have clear neutral hierarchy',light.primary.background!==light.secondary.background&&light.primary.color!==light.primary.background&&light.primary.height==='38px');
 const native=b.ev(`(()=>{const r=document.querySelector('.vie-shell input[type=range]');return {rangeHeight:getComputedStyle(r).height,rangeAppearance:getComputedStyle(r).appearance,fill:r.style.getPropertyValue('--vie-range-fill'),toggle:getComputedStyle(document.querySelector('.vie-shell input[role=switch]')).width}})()`);
 pass('native and sandbox sliders share the custom A input surface',native.rangeHeight==='24px'&&light.rangeHeight==='24px'&&native.rangeAppearance==='none'&&light.rangeAppearance==='none');
 pass('initial fills reflect real signed and shared domains',light.fill==='25%'&&native.fill==='40%');
 pass('switches share geometry and disabled controls retain feedback',light.switchWidth==='34px'&&native.toggle==='34px'&&Number(light.disabledOpacity)<.6);
 pass('unknown button variants safely fall back and leave data colors intact',light.variantFallback&&light.graphColor==='rgb(77, 130, 214)'&&light.primary.background!==light.graphColor);
 b.enter();b.run('click','[data-vie-action=advance]');b.main();b.frames();pass('programmatic state changes update range value and filled track',frameValue('#local-range')==='10'&&audit().fill==='30%');
 b.enter();b.run('click','[data-vie-action=restore]');b.main();b.frames();pass('reset updates both the parameter and its presentation',frameValue('#local-range')==='5'&&audit().fill==='25%');
 b.enter();b.run('focus','#local-range');b.run('press','End');b.main();b.frames();pass('sandbox keyboard input updates state and fills to the endpoint',frameValue('#local-range')==='80'&&audit().fill==='100%');
 b.run('focus','.vie-shell input[type=range]');b.run('press','End');b.frames();pass('native keyboard input retains shared bindings',b.ev('VIEDemo.context.figures.block1.state.amount===100&&document.querySelector(".vie-shell input[type=range]").style.getPropertyValue("--vie-range-fill")==="100%"'));
 b.run('focus','.vie-shell input[role=switch]');b.run('press','Space');b.frames();pass('native switch remains an operable form control',b.ev('VIEDemo.context.figures.block1.state.enabled===0'));
 b.enter();b.run('fill','#local-number','24');b.run('press','Tab');b.main();b.frames();pass('numeric entry still synchronizes through local state',frameValue('#local-range')==='24'&&audit().fill==='44%');
 b.run('click','#theme');b.frames();const dark=audit();audits.push({theme:'dark',...dark});
 pass('dark mode adapts neutral control contrast without resetting state',dark.primary.background!==light.primary.background&&dark.primary.color!==light.primary.color&&frameValue('#local-range')==='24'&&dark.fill==='44%');
 pass('dark mode preserves the shared control geometry',dark.primary.radius==='10px'&&dark.rangeHeight==='24px'&&dark.rangeAppearance==='none');
 b.run('screenshot','--full',path.join(b.root,("screenshots/controls-a-dark-"+VERSION+".png")));b.run('click','#theme');
 b.ev(`(()=>{const p=document.createElement('button');p.id='native-host-control';p.style.cssText='border-radius:3px;min-height:21px';p.textContent='Host control';document.body.append(p);return true})()`);
 pass('component styles do not leak into Harness controls',b.ev('getComputedStyle(document.querySelector("#native-host-control")).borderRadius==="3px"'));
 b.ev('document.querySelector("#native-host-control").remove()');
 for(const width of [1080,760,390,320]){b.run('set','viewport',String(width),'1100');b.frames();pass('controls remain within the outer viewport at '+width,b.ev('document.documentElement.scrollWidth<=innerWidth&&!document.querySelector(".vie-generated-error")'));}
 b.run('screenshot','--full',path.join(b.root,("screenshots/controls-a-mobile-"+VERSION+".png")));b.run('set','viewport','1080','1200');
 b.run('screenshot','--full',path.join(b.root,("screenshots/controls-a-"+VERSION+".png")));
 b.ev(`VIEDemo.select('sdk-animation')`);b.run('wait','iframe[data-vie-ready="true"]');b.enter();b.run('click','.vie-sdk-transport button:first-child');b.main();b.frames();
 b.enter();const clockStyle=String(b.value(b.run('get','attr','.vie-sdk-transport input[type=range]','style')));b.main();pass('animation clocks keep the filled track synchronized',/--vie-range-fill:\s*(?!0%)[\d.]+%/.test(clockStyle));
 const errors=b.run('errors').errors??[];pass('shared presentation has no browser errors',errors.length===0);
 fs.writeFileSync(path.join(b.root,'docs/validation/controls-browser.json'),JSON.stringify({version:VERSION,checks:checks.length,results:checks,audits,externalModelRequests:0},null,2));
}finally{b.close();}
