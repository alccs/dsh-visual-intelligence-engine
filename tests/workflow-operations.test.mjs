import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const h=vm.createContext({Date,Set,WeakMap});vm.runInContext(fs.readFileSync(new URL('../src/workflow.js',import.meta.url),'utf8')+';this.api={visualIntent,createVisualWorkflow};',h);
const user=(text,other=[])=>({source:{kind:'user'},content:[{type:'text',text},...other]});
const artifact=String.raw`X:\packages\Visual-Interactive-Engine-0.30.5\dist\dsh-visual-interactive-engine-0.30.5.tgz`;
const operations=['安装','帮我安装','请安装一下','卸载','帮我重装',`@${artifact} 安装`,`安装 @${artifact}`,`把「${artifact}」安装到 desktop profile`,String.raw`"F:\My Apps\Visual-Interactive-Engine\plugin.tgz" 安装`,'请使用 plugin_manager 安装这个包','list_bundles 列出已安装插件','检查这个插件是否已安装','升级这个插件','卸载这个插件，继续使用别的工具','install this package','please install the plugin','install @/tmp/Visual-Interactive-Engine/plugin.tgz'];
test('maintenance commands never activate the visual fast path in any chat mode',()=>{
 for(const mode of ['auto','on','study','off'])for(const text of operations){
  const agent={},w=h.api.createVisualWorkflow({visualMode:mode});w.claim({agent,turn:1,message:user(text)});
  assert.equal(w.state(agent).active,false,mode+': '+text);
  for(const name of ['pwsh','plugin_manager','list_bundles','read'])assert.equal(w.allowed(agent,name),true,mode+': '+name+' '+text);
 }
});
test('file mentions and attachments do not turn installation into an explanation',()=>{
 for(const content of [[{type:'file',path:artifact}],[{type:'image',attachment:{path:'reference.png'}}]]){
  const agent={},w=h.api.createVisualWorkflow({visualMode:'study'});w.claim({agent,turn:1,message:user('安装',content)});assert.equal(w.state(agent).active,false);
 }
 for(const path of [artifact,'https://example.test/interactive/3d/plugin.tgz','@/tmp/interactive/3d/plugin.tgz'])assert.equal(h.api.visualIntent(user(path)).active,false,path);
});
test('installation knowledge and negated maintenance preserve visual explanations',()=>{
 for(const text of ['解释软件安装原理','讲解插件安装流程','可视化讲解 npm install 的工作原理','无需安装依赖，用3D动画解释蜗杆传动','不要安装插件，解释齿轮原理','使用3D动画','加个滑块','更新这张图','请仅修复图「示例」，使用visualId与baseRevision进行局部修订']){
  const mode=text==='更新这张图'?'study':'auto',agent={},w=h.api.createVisualWorkflow({visualMode:mode});w.claim({agent,turn:1,message:user(text)});assert.equal(w.state(agent).active,true,text);assert.equal(w.allowed(agent,'pwsh'),false,text);
 }
});
test('installing after an unfinished lesson releases tools and continue cannot resurrect it',()=>{
 for(const mode of ['on','study']){
  const agent={},w=h.api.createVisualWorkflow({visualMode:mode});w.claim({agent,turn:1,message:user('解释齿轮原理')});assert.equal(w.state(agent).active,true);w.claim({agent,turn:2,message:user('@'+artifact+' 安装')});w.claim({agent,turn:3,message:user('继续')});assert.equal(w.state(agent).active,false);assert.equal(w.allowed(agent,'plugin_manager'),true);
  const events=[{type:'user/message',data:user('@'+artifact+' 安装')},{type:'turn/end',data:{reason:{kind:'max-tokens'}}}],cold={session:{seq:2,eventAt:i=>events[i]}},reopened=h.api.createVisualWorkflow({visualMode:mode});reopened.claim({agent:cold,turn:3,message:user('继续')});assert.equal(reopened.state(cold).active,false);assert.equal(reopened.allowed(cold,'pwsh'),true);
 }
});
