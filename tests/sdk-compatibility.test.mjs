import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const h=vm.createContext({});const geometry=fs.readFileSync(new URL('../src/shared/sdk-geometry.js',import.meta.url),'utf8'),preflight=fs.readFileSync(new URL('../src/shared/sdk-preflight.js',import.meta.url),'utf8').replace('/* @include vendor/acorn.js */',()=>fs.readFileSync(new URL('../src/vendor/acorn.js',import.meta.url),'utf8'));vm.runInContext(geometry+'\n'+preflight+';this.api={normalizeSVGPrimitive,validateSDKCalls,createSVGCoordinateMap};',h);
const value=(kind,arg,base)=>JSON.parse(JSON.stringify(h.api.normalizeSVGPrimitive(kind,arg,base)));
test('native SVG coordinates and colors normalize to the canonical SDK contract',()=>{
 assert.deepEqual(value('circle',{cx:10,cy:20,r:4,fill:'#dc2626',stroke:'#334155',width:1.5,opacity:.75}),value('circle',{at:[10,20],radius:4,fill:'#dc2626',stroke:'#334155',strokeWidth:1.5,opacity:.75}));
 assert.deepEqual(value('label',{x:10,y:20,text:'A',size:11,color:'#475569'}),value('label',{at:[10,20],text:'A',fontSize:12,color:'#475569'}));
 const rect=value('rect',{x:2,y:3,width:150,height:90,rx:6,strokeWidth:1.2,fill:'#fff'});assert.equal(rect.width,150);assert.equal(rect.strokeWidth,1.2);assert.equal(rect.radius,6);
});
test('partial legacy handle updates retain the other coordinate and radius',()=>{const a=value('circle',{at:[10,20],radius:4,fill:true});const b=value('circle',{cx:30,tone:'accent'},a);assert.deepEqual(b.at,[30,20]);assert.equal(b.radius,4);assert.equal(b.fill,'var(--vie-accent)');});
test('label align aliases preserve anchor precedence and reject invalid alignment',()=>{
 for(const [align,anchor]of [['left','start'],['center','middle'],['right','end'],['start','start'],['middle','middle'],['end','end']]){
  assert.equal(value('label',{at:[40,60],text:'Label',align}).anchor,anchor);
  assert.doesNotThrow(()=>h.api.validateSDKCalls('const g=VIE.svg({});g.label({at:[40,60],text:"Label",align:'+JSON.stringify(align)+'});'));
  assert.doesNotThrow(()=>h.api.validateSDKCalls('const g=VIE.svg({});g.label({at:[x,y],text:label,align:'+JSON.stringify(align)+'});'));
 }
 assert.equal(value('label',{at:[40,60],anchor:'start',align:'right'}).anchor,'start');
 assert.equal(value('label',{at:[40,60],textAnchor:'end',align:'left'}).anchor,'end');
 assert.throws(()=>value('label',{at:[40,60],align:'justify'}),/label.anchor/);
});
test('the real duplicate-width pattern is rejected before a successful tool result',()=>{assert.throws(()=>h.api.validateSDKCalls('const g=VIE.svg({root:"#p"});g.rect({x:30,y:18,width:150,height:92,stroke:"#ddd",width:1.2});'),/VIE_SDK_DUPLICATE_FIELD rect.width/);});
test('preflight does not execute dynamic expressions, comments, strings or shadowed arguments',()=>{
 for(const js of ['const g=VIE.svg({}); const x="g.rect({width:1,width:2})";','const g=VIE.svg({}); function f(g){g.rect({width:1,width:2})}','const g=VIE.svg({});g.rect({...params,width:size()});','const g=VIE.svg({});g.label({at:[x,y],text:String(y)});'])assert.doesNotThrow(()=>h.api.validateSDKCalls(js));
 assert.throws(()=>h.api.validateSDKCalls('const g=VIE.svg({});g.circle({cx:1,cy:2,r:-1});'),/VIE_SDK_ARGUMENT circle.radius/);
});


test('coordinates and numeric labels can share the same data-to-pixel mapping',()=>{const m=h.api.createSVGCoordinateMap({x:[0,100],y:[100,600],bounds:[70,45,450,210]});const p=m.point([61.9,183]);assert.ok(Math.abs(p[0]-348.55)<1e-9);assert.ok(Math.abs(p[1]-220.14)<1e-9);assert.throws(()=>h.api.createSVGCoordinateMap({x:[1,1]}),/coordinates.x/);});
