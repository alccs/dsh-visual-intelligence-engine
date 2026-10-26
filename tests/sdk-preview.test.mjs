import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {sdkExamples} from '../scripts/sdk-examples.mjs';
const ctx={TextEncoder,console,VIEJavaScriptParser:vm.Script,defineTool:x=>x,window:{__ModuleLoader__:{load:({factory})=>factory(()=>({}))}}};
const js=fs.readFileSync(new URL('../package/lib/client.js',import.meta.url),'utf8').replace('exports.name=name;','globalThis.api={DocumentPreview,VIEStream,validateDocumentSpec,buildFigureDocument};exports.name=name;');vm.runInNewContext(js,ctx);
const client=x=>vm.runInNewContext('api.validateDocumentSpec(JSON.parse('+JSON.stringify(JSON.stringify(x))+'))',ctx);
test('generic SDK examples use the existing document contract without topic registration',()=>{
 for(const [key,document]of Object.entries(sdkExamples)){const d=client(document);assert.equal(d.blocks[0].type,'figure',key);assert.ok(d.blocks[0].js.includes('VIE.'),key);}
});
test('static preview is internal, never a public escape from script validation',()=>{
 assert.throws(()=>client({blocks:[{type:'figure',html:'<svg/>',preview:true}]}),/Unknown figure field/);
 const p=new ctx.api.DocumentPreview(),doc={blocks:[{type:'figure',html:'<svg><text>ready</text></svg>',js:'globalThis.executed=true;'}]},raw=JSON.stringify(doc),partial=p.update(raw.slice(0,raw.indexOf('executed')+3));
 const events=partial.trim().split('\n').map(s=>JSON.parse(s)),figure=events.find(e=>e.type==='GenerativeFigure');assert.equal(figure.props.preview,true);assert.equal(figure.props.js,'');assert.ok(!partial.includes('executed'));
 const done=p.update(raw).trim().split('\n').map(s=>JSON.parse(s)).find(e=>e.type==='GenerativeFigure');assert.equal(done.props.preview,undefined);assert.ok(done.props.js.includes('executed'));
});
test('preview prefixes reset their decoder and cannot mix another figure or text',()=>{
 const p=new ctx.api.DocumentPreview(),a=JSON.stringify({blocks:[{type:'figure',html:'<svg>A</svg>',js:'first();'}]}),b=JSON.stringify({blocks:[{type:'figure',html:'<svg>B</svg>',js:'second();'}]});
 assert.ok(p.update(a.slice(0,a.indexOf('first')+2)).includes('A'));
 const source=p.update(b.slice(0,b.indexOf('second')+2));assert.ok(source.includes('B'));assert.ok(!source.includes('<svg>A'));assert.ok(!source.includes('second'));
 assert.equal(p.update('{"blocks":[{"type":"figure","html":"unfinished'), '');
});
test('a preview document keeps author HTML out of initial markup until sanitization',()=>{
 ctx.input=JSON.stringify({title:'static',html:'<svg onload="unexpected()"><text>test</text></svg>',preview:true});
 const doc=vm.runInNewContext('api.buildFigureDocument(JSON.parse(input),{channel:"test",state:{},theme:{mode:"light",colors:{}}})',ctx);
 assert.match(doc,/<div id="vie-root"><\/div>/);assert.ok(doc.includes('createFigureContentRuntime'));assert.ok(!doc.includes('<svg onload='));assert.ok(doc.includes('installGraphicsRuntime'));
});
