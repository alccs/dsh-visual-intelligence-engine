import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const context=vm.createContext({TextEncoder});vm.runInContext(fs.readFileSync(new URL('../src/shared/learning.js',import.meta.url),'utf8')+';this.validate=validateLearningDefinition;',context);
const baseHtml='<svg viewBox="0 0 300 160"><circle id="particle" cx="50" cy="80" r="12"/><text id="amount" x="150" y="130">0</text></svg>';
const lesson=()=>({title:'Shared drawing',baseHtml,readouts:[{id:'count',label:'Count',unit:'items'}],stages:[{label:'Before',values:{count:0}},{label:'After',patches:[{target:'particle',attrs:{cx:220,fill:'#149f91'}},{target:'amount',text:'1'}],values:{count:1}}]});
test('one shared drawing accepts independently addressable stages and readouts',()=>{const result=context.validate(lesson());assert.equal(result.baseHtml,baseHtml);assert.equal(result.stages[0].patches.length,0);assert.equal(result.stages[1].patches[0].target,'particle');assert.equal(result.stages[1].values.count,1);});
test('stage patches reject missing targets, unsafe attributes and ambiguous definitions',()=>{
 for(const patch of [{target:'missing',text:'x'},{target:'particle',attrs:{onclick:'alert(1)'}},{target:'particle',attrs:{href:'https://example.test'}},{target:'particle',attrs:{fill:'url(https://example.test)'}}]){const value=lesson();value.stages[1].patches=[patch];assert.throws(()=>context.validate(value),/VIE_LEARNING_INVALID/);}
 const mixed=lesson();mixed.stages[1].html='<svg/>';assert.throws(()=>context.validate(mixed),/VIE_LEARNING_INVALID/);
 const duplicate=lesson();duplicate.baseHtml=baseHtml.replace('id="amount"','id="particle"');assert.throws(()=>context.validate(duplicate),/VIE_LEARNING_INVALID/);
});
test('legacy stage HTML and quiz data keep the existing contract',()=>{const result=context.validate({title:'Legacy',stages:[{label:'Step',html:'<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="5"/></svg>'}],quiz:{question:'Q',options:[{label:'A'},{label:'B'}],correct:1}});assert.ok(result.stages[0].html.includes('circle'));assert.equal(result.quiz.correct,1);});
