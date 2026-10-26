import test from 'node:test';import assert from 'node:assert/strict';import {evalTasks} from '../scripts/eval-tasks.mjs';import {summarize} from '../scripts/evaluate.mjs';
test('public corpus contains 48 tasks, six categories and 16 holdouts',()=>{assert.equal(evalTasks.length,48);assert.equal(new Set(evalTasks.map(t=>t.category)).size,6);assert.equal(evalTasks.filter(t=>t.split==='holdout').length,16);assert.equal(new Set(evalTasks.map(t=>t.id)).size,48);});
test('missing, failed and unreviewed runs cannot inflate success',()=>{const rows=[{taskId:'knowledge-1',model:'M',variant:'V',completed:true,rendered:true,interactionPassed:true,followedVisualIntent:true,readyMs:10},{taskId:'knowledge-2',model:'M',variant:'V',completed:true,rendered:true,interactionPassed:true,followedVisualIntent:true,reviewPassed:true,readyMs:30},{taskId:'noUI-1',model:'M',variant:'V',completed:true,followedVisualIntent:true}];const g=summarize(rows).groups[0];assert.equal(g.passed,2);assert.equal(g.missing,45);assert.equal(g.successRate,2/48);assert.equal(g.readyP50,30);assert.equal(g.runs[0].success,false);});
test('comparison groups are separate; duplicate or impossible timing is rejected',()=>{const r={taskId:'noUI-1',model:'M',variant:'V',completed:true,followedVisualIntent:true};assert.throws(()=>summarize([r,r]),/Duplicate/);assert.throws(()=>summarize([{...r,readyMs:-1}]),/Invalid/);assert.equal(summarize([r,{...r,variant:'B'}]).groups.length,2);});

test('absent previews stay unknown and never become zero-duration samples',()=>{
 const base={model:'M',variant:'V',completed:true,followedVisualIntent:true};
 const g=summarize([{...base,taskId:'noUI-1',previewMs:null,readyMs:null,inputTokens:12,outputTokens:5},{...base,taskId:'noUI-2',previewMs:120,readyMs:180,inputTokens:8,outputTokens:3}]).groups[0];
 assert.equal(g.previewP50,120);assert.equal(g.previewP95,120);assert.equal(g.readyP50,180);assert.equal(g.totalInputTokens,20);assert.equal(g.totalOutputTokens,8);
 const empty=summarize([{...base,taskId:'noUI-1',previewMs:null,readyMs:null}]).groups[0];assert.equal(empty.previewP50,null);assert.equal(empty.readyP95,null);
});

test('timing origins and count fields remain explicit',()=>{
 const base={taskId:'noUI-1',model:'M',variant:'V',completed:true,followedVisualIntent:true};
 for(const [field,value]of [['repairs',.5],['inputTokens',null],['readyMs',NaN],['requestToReadyMs',-1]])assert.throws(()=>summarize([{...base,[field]:value}]),/Invalid/);
 const g=summarize([{...base,previewMs:40,readyMs:80,requestToVisibleMs:500,requestToReadyMs:700,totalMs:900}]).groups[0];assert.equal(g.requestVisibleP50,500);assert.equal(g.requestReadyP50,700);assert.equal(g.totalP95,900);
});
