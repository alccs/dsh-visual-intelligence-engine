import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=name=>fs.readFileSync(new URL('../'+name,import.meta.url),'utf8');
const h=vm.createContext({Date,Set,Map,WeakMap,setTimeout,clearTimeout});
vm.runInContext(read('src/shared/catalog.js')+read('src/workflow.js')+';this.api={installVisualWorkflow,VIE_STUDY_POLICY,VIE_ENTRY_POLICY};',h);
test('learning instructions are injected once and remain available without a skill call',()=>{
 const sections=[],hooks=new Map(),agent={};const ctx={systemPrompt:{section:value=>sections.push(value)},on:(name,fn)=>hooks.set(name,fn),effect:()=>{}};
 h.api.installVisualWorkflow(ctx,{}, {get:()=> 'study'});
 assert.ok(sections[0].text({agent}).includes(h.api.VIE_STUDY_POLICY),'learning mode applies before the first user turn');
 hooks.get('agent/inbox/claimed')({agent,turn:1,message:{source:{kind:'user'},content:[{type:'text',text:'解释一个知识概念'}]}});
 const entry=sections[0].text({agent});assert.ok(entry.length<600);assert.ok(!entry.includes(h.api.VIE_STUDY_POLICY));assert.match(entry,/通用/);
});
