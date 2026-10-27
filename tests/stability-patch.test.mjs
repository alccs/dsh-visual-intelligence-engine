import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const h=vm.createContext({TextEncoder,console,defineTool:x=>x,VIEJavaScriptParser:vm.Script});
vm.runInContext(read('package/lib/index.js').replace(/^import[^\n]+\n/gm,'').replace(/^export\s+/gm,'')+';this.api={visualIntent,VIE_POLICY,tool:createExplainImplementation()}',h);
const intent=text=>h.api.visualIntent({source:{kind:'user'},content:[{type:'text',text}]});
test('knowledge about stacking and deletion retains visual scope; diagnostics and text-only do not',()=>{
 for(const text of ['用图文解释堆叠柱状图','用图文解释文字在内存中的存储和删除'])assert.equal(intent(text).active,true,text);
 for(const text of ['我发现图文最终渲染有问题，文字被折叠','图总是连在一起，正文丢失，排查插件','只用文字解释堆叠柱状图','修复VIE源码'])assert.equal(intent(text).active,false,text);
});
test('primary model tool and auto policy expose structured learning without loading a skill',()=>{
 assert.match(h.api.tool.description,/learning \{title/);assert.match(h.api.tool.description,/zero-based/);assert.match(h.api.VIE_POLICY,/learning数据块/);
});
function bridge(initial={}){
 let now=100000,seq=0,ready=0,intersect;const timers=new Map(),listeners=new Map(),documentListeners=new Map(),messages=[],errors=[],states=[];
 const Observer=class{observe(){}disconnect(){}};
 const win={getComputedStyle:()=>({getPropertyValue:()=>''}),matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}),MutationObserver:Observer,IntersectionObserver:class extends Observer{constructor(fn){super();intersect=fn;}},addEventListener:(k,v)=>listeners.set(k,v),removeEventListener:k=>listeners.delete(k),setTimeout:fn=>{timers.set(++seq,fn);return seq},clearTimeout:id=>timers.delete(id)};
 const doc={defaultView:win,hidden:false,documentElement:{dataset:{}},body:{classList:{contains:()=>false}},addEventListener:(k,v)=>documentListeners.set(k,v),removeEventListener:k=>documentListeners.delete(k)};
 const frame={ownerDocument:doc,dataset:{},style:{},closest:()=>null,contentWindow:{postMessage:m=>messages.push(m)},addEventListener(){},removeEventListener(){}};
 const c=vm.createContext({TextEncoder,console,Date:{now:()=>now},Math,svgScopeSequence:0});
 vm.runInContext(read('src/view/three-loader.js')+read('src/view/generated.js')+';this.mount=mountGeneratedFigure;buildFigureDocument=(_s,o)=>{this.loads=(this.loads||0)+1;this.channel=o.channel;return ""};function validateSDKCalls(){}function validateFigureDefinition(v){return v}function validateFigureState(v){return JSON.parse(JSON.stringify(v))}',c);
 const api=c.mount(frame,{title:'test',state:{},...initial},{onChange:s=>states.push(s),onError:e=>{if(e)errors.push(e)},onReady:()=>ready++});
 const send=(type,value)=>listeners.get('message')?.({source:frame.contentWindow,data:{v:1,channel:c.channel,type,value}});
 return {api,frame,send,errors,states,timers,messages,get loads(){return c.loads},get ready(){return ready},intersect:value=>intersect([{isIntersecting:value}]),hidden:value=>{doc.hidden=value;documentListeners.get('visibilitychange')?.();},flood(){for(let i=0;i<60;i++)send('state',{i})},flush(){now+=1001;for(const [id,fn] of [...timers]){timers.delete(id);fn()}}};
}
test('state traffic cannot starve ready or runtime errors',()=>{
 const b=bridge();b.flood();b.send('ready',{ok:true});assert.equal(b.ready,1);assert.equal(b.frame.dataset.vieReady,'true');b.send('error','runtime failure');assert.deepEqual(b.errors,['runtime failure']);b.send('ready',{ok:true});assert.equal(b.ready,1);assert.equal(b.frame.dataset.vieStatus,'error');b.api.dispose();
});
test('over-budget state updates coalesce and eventually commit the latest state',()=>{
 const b=bridge();b.flood();b.send('state',{i:60});b.send('state',{i:61});assert.equal(b.timers.size,1);b.flush();assert.equal(b.states.at(-1).i,61);assert.equal(b.api.snapshot().i,61);b.api.dispose();
});
test('reset and dispose cancel deferred state from the old frame',()=>{
 const b=bridge();b.flood();b.send('state',{i:60});b.api.reset();assert.equal(b.timers.size,0);assert.equal(b.api.snapshot().i,undefined);b.flood();b.send('state',{i:60});b.api.dispose();assert.equal(b.timers.size,0);
});
test('offscreen status survives tab visibility changes and the iframe boot handshake',()=>{
 const b=bridge(),last=()=>b.messages.filter(m=>m.type==='visibility').at(-1)?.value;b.intersect(false);b.send('ready',{ok:true});assert.equal(last(),false);b.hidden(true);b.hidden(false);assert.equal(last(),false);b.intersect(true);assert.equal(last(),true);b.hidden(true);b.intersect(true);assert.equal(last(),false);b.api.dispose();
});
test('final results arriving before a preview error still recover without retrying failed final scripts',()=>{
 const b=bridge({preview:true});b.api.revise({title:'test',state:{seed:42},preview:false});assert.equal(b.loads,1);b.send('error','preview failed');b.send('ready',{preview:true,ok:false});assert.equal(b.loads,2);assert.equal(b.api.snapshot().seed,42);b.send('ready',{ok:true});assert.equal(b.frame.dataset.vieReady,'true');b.send('error','final script failed');b.send('ready',{ok:false});assert.equal(b.loads,2);assert.equal(b.frame.dataset.vieReady,'false');b.api.dispose();
});

test('readonly fallback preserves failure and cannot activate the failed final script',()=>{
 const b=bridge({html:'<svg/>',js:'throw Error("failed")'});b.send('error','failed');const before=b.loads;b.api.showStaticPreview();assert.equal(b.loads,before+1);b.send('ready',{ok:true,preview:true});assert.equal(b.loads,before+1);assert.equal(b.frame.dataset.vieStatus,'fallback');assert.equal(b.frame.dataset.vieReady,'false');assert.equal(b.ready,0);b.api.dispose();
});

test('failed initialization never fills a successful ready measurement',()=>{
 const b=bridge();b.send('error','failed');b.send('ready',{ok:false});assert.equal(b.api.metrics().readyMs,null);b.api.dispose();
});

test('empty initialized content waits, and a replacement clears the old revision timings',()=>{
 const b=bridge();b.send('ready',{ok:true,content:{meaningful:false}});assert.equal(b.ready,0);assert.equal(b.frame.dataset.vieStatus,'waiting');assert.equal(b.api.metrics().readyMs,null);
 b.send('ready',{ok:true,content:{meaningful:true}});b.send('painted',{content:{meaningful:true}});assert.equal(b.ready,1);assert.notEqual(b.frame.dataset.vieReadyMs,undefined);
 b.flush();b.api.revise({title:'new',state:{},html:'<div>New</div>',js:''});assert.equal(b.api.metrics().readyMs,null);assert.equal(b.api.metrics().visibleMs,null);assert.equal(b.frame.dataset.vieReadyMs,undefined);assert.equal(b.frame.dataset.vieVisibleMs,undefined);
 b.send('ready',{ok:true,content:{meaningful:false}});assert.equal(b.frame.dataset.vieStatus,'waiting');assert.equal(b.ready,1);b.api.dispose();
});
