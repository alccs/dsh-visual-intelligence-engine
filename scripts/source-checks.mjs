/** Fixture-free contract smoke checks for a public Git checkout. */
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import assert from 'node:assert/strict';
export async function sourceChecks(root){
 const h=vm.createContext({TextEncoder,console,VIEJavaScriptParser:vm.Script,defineTool:x=>x});
 vm.runInContext(fs.readFileSync(path.join(root,'package/lib/index.js'),'utf8').replace(/^import[^\n]+\n/gm,'').replace(/^export\s+/gm,'')+';this.tool=createExplainImplementation();',h);
 const run=async document=>{h.args=JSON.stringify({document});return h.tool.execute(vm.runInContext('JSON.parse(args)',h),{agent:{}});};
 let checks=0;const check=(name,fn)=>{fn();checks++;console.log('SOURCE CHECK '+name);};
 const pkg=JSON.parse(fs.readFileSync(path.join(root,'package/package.json'),'utf8')),outer=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
 check('package identity and runtime files',()=>{assert.equal(pkg.name,'dsh-visual-interactive-engine');assert.equal(pkg.version,outer.version);for(const file of ['lib/index.js','lib/client.js','lib/client.three.js','cordis.patch.yml','assets/icon.svg'])assert.ok(fs.statSync(path.join(root,'package',file)).size>0,file);});
 const controls=[{key:'size',label:'尺寸',unit:'mm',min:40,max:200,value:80,step:1}],figure={type:'figure',height:240,html:'<div id="plot"></div>',bindings:{size:'size'},js:'VIE.svg({root:"#plot",width:360,height:180,draw:({g,state})=>g.rect({at:[10,10],width:state.size,height:30})});'};
 const managed=await run({controls,blocks:[figure]});
 check('managed SVG and compact panel contract',()=>{assert.equal(managed.meta.valid,true,managed.note);assert.equal(managed.meta.warnings,undefined);const nodes=managed.meta.source.trim().split('\n').map(JSON.parse).filter(e=>e.op==='node.put'),panel=nodes.find(n=>n.id==='document-controls'),block=nodes.find(n=>n.id==='block1');assert.equal(panel.props.role,'parameters');assert.ok(panel.order>block.order);assert.equal(nodes.find(n=>n.type==='Slider').props.unit,'mm');});
 const frozen=await run({controls,blocks:[{...figure,js:'const g=VIE.svg({root:"#plot"});g.circle({at:[80,80],radius:8});'}]});
 check('provable frozen drawing diagnosis',()=>assert.equal(frozen.meta.errorCode,'VIE_REACTIVITY_REQUIRED'));
 const html=await run({controls,blocks:[{...figure,html:figure.html+'<button onclick="document.querySelector(\'#plot circle\').setAttribute(\'cx\',VIE.state.size)">应用</button>',js:'const g=VIE.svg({root:"#plot"});g.circle({at:[80,80],radius:8});'}]});
 check('HTML-owned interaction stays compatible',()=>assert.equal(html.meta.valid,true,html.note));
 const unused=await run({controls,blocks:[{type:'graphic',kind:'bars',items:[{label:'A',value:80}]}]});
 check('unused controls return a structured advisory',()=>{assert.equal(unused.meta.valid,true,unused.note);assert.equal(unused.meta.warnings?.[0]?.code,'VIE_UNUSED_CONTROL');assert.equal(unused.meta.warnings[0].path,'controls[0]');});
 check('dsh-go receives a bounded chart while WebUI keeps its source',()=>{const meta=h.tool.output.presentationMeta({},unused);assert.equal(meta.source,unused.meta.source);assert.equal(meta['dsh-go/view'].children[0].type,'chart');assert.ok(Buffer.byteLength(JSON.stringify(meta['dsh-go/view']))<=8192);});
 check('native mode declaration is optional for desktop dependencies',()=>{assert.equal(pkg.dshGo.v,1);assert.ok(pkg.dshGo.contributes.panels.some(p=>p.id==='vie-modes'));assert.ok(!pkg.peerDependencies['@dsh-go/plugin-kit']);});
 const invalid=await run({blocks:[{type:'figure',html:'<svg/>',js:'const = ;'}]});
 check('script syntax failure is not reported as rendering success',()=>{assert.equal(invalid.meta.valid,false);assert.equal(invalid.meta.errorCode,'VIE_SCRIPT_SYNTAX');assert.equal(invalid.meta.source,'');});
 return checks;
}
