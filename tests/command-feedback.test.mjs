import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const source=fs.readFileSync(new URL('../src/view/command.js',import.meta.url),'utf8');
function view(row){
 const effects=[],ref={current:{closest:selector=>{assert.equal(selector,'[data-chat-node-key]');return row;}}};
 const context=vm.createContext({React:{useRef:()=>ref,useLayoutEffect:effect=>effects.push(effect),createElement:(type,props,children)=>({type,props,children})}});
 vm.runInContext(source+';this.api={isVIEInternalCommand,VIECommandView};',context);
 return {...context.api,effects};
}
const internal={name:'vie',args:'__render {"status":"ready"}',commandId:'feedback-1',outcome:{kind:'success',text:''}};
test('only the reserved VIE render-feedback subcommand is internal',()=>{
 const {isVIEInternalCommand:isInternal}=view();
 for(const args of ['__render',' __render {}','__render\t{}','__render\n{}'])assert.equal(isInternal({...internal,args}),true);
 for(const args of ['auto','study','status','off','on','render','__rendering {}','status __render','',null,undefined])assert.equal(isInternal({...internal,args}),false);
 for(const name of ['other',null,undefined])assert.equal(isInternal({...internal,name}),false);
 assert.equal(isInternal(undefined),false);
});
test('internal feedback hides only its nearest chat seat and restores prior state',()=>{
 for(const prior of [false,true]){
  const row={hidden:prior,dataset:{}},v=view(row),rendered=v.VIECommandView({node:internal});
  assert.equal(rendered.props.hidden,true);assert.equal(rendered.props['aria-hidden'],true);
  const cleanup=v.effects[0]();assert.equal(row.hidden,true);assert.equal(row.dataset.vieInternalCommand,internal.commandId);
  cleanup();assert.equal(row.hidden,prior);assert.equal(Object.hasOwn(row.dataset,'vieInternalCommand'),false);
 }
 const v=view(null);v.VIECommandView({node:internal});assert.equal(v.effects[0](),undefined);
});
test('feedback cleanup does not unhide a seat already owned by another command',()=>{
 const row={hidden:false,dataset:{}},v=view(row);v.VIECommandView({node:internal});const cleanup=v.effects[0]();
 row.dataset.vieInternalCommand='new-feedback';cleanup();assert.equal(row.hidden,true);assert.equal(row.dataset.vieInternalCommand,'new-feedback');
});
test('manual VIE results, running state and errors remain visible',()=>{
 for(const [args,outcome,summary]of [['study',{kind:'success',text:'已启用学习模式'},'已启用学习模式'],['status',{kind:'success',text:'模式：auto\n图数：1'},'执行完成'],['auto',null,'执行中…'],['unknown',{kind:'error',text:'未知选项'},'执行失败']]){
  const row={hidden:false,dataset:{}},v=view(row),rendered=v.VIECommandView({node:{...internal,args,outcome}});
  assert.equal(rendered.props['data-vie-manual-command'],true);assert.equal(rendered.props.role,outcome?.kind==='error'?'alert':'status');
  assert.equal(rendered.children[0].children[0].children,'/vie '+args);assert.equal(rendered.children[0].children[1].children,summary);
  assert.equal(v.effects[0](),undefined);assert.equal(row.hidden,false);assert.deepEqual(row.dataset,{});
  if(outcome?.text&&summary!==outcome.text)assert.equal(rendered.children[1].children[1].children,outcome.text);
 }
});
