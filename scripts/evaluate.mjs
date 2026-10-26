/** Summarize real exported runs. Never turns missing/review-pending work into success. */
import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';import {evalTasks} from './eval-tasks.mjs';
const percentile=(values,p)=>values.length?[...values].sort((a,b)=>a-b)[Math.max(0,Math.ceil(values.length*p)-1)]:null;
export function summarize(records,tasks=evalTasks){
 const ids=new Map(tasks.map(t=>[t.id,t])),seen=new Set(),groups=new Map();
 for(const r of records){const t=ids.get(r.taskId);if(!t)throw Error('Unknown task: '+r.taskId);if(typeof r.model!=='string'||!r.model||typeof r.variant!=='string'||!r.variant)throw Error('model/variant required');const key=JSON.stringify([r.model,r.variant]),id=key+r.taskId;if(seen.has(id))throw Error('Duplicate task result: '+r.taskId);seen.add(id);
  for(const k of ['previewMs','readyMs','requestToFirstTextMs','requestToSubmitMs','requestToVisibleMs','requestToReadyMs','modelMs','repairMs','totalMs'])if(r[k]!==undefined&&r[k]!==null&&(!Number.isFinite(r[k])||r[k]<0))throw Error('Invalid '+k);
  for(const k of ['outputTokens','inputTokens','repairs'])if(r[k]!==undefined&&(!Number.isSafeInteger(r[k])||r[k]<0))throw Error('Invalid '+k);
  let group=groups.get(key);if(!group){group={model:r.model,variant:r.variant,runs:[]};groups.set(key,group);}const success=r.completed===true&&r.followedVisualIntent===true&&(!t.expectsVisual||r.rendered===true&&r.interactionPassed===true)&&(!t.requiresReview||r.reviewPassed===true);group.runs.push({...r,success,split:t.split});
 }
 return {plannedTasks:tasks.length,holdoutTasks:tasks.filter(t=>t.split==='holdout').length,groups:[...groups.values()].map(g=>{
  const sample=field=>g.runs.filter(r=>r.success&&Number.isFinite(r[field])).map(r=>r[field]);
  const timing=(field,p)=>percentile(sample(field),p);
  return {...g,completed:g.runs.filter(r=>r.completed===true).length,missing:tasks.length-g.runs.length,passed:g.runs.filter(r=>r.success).length,successRate:tasks.length?g.runs.filter(r=>r.success).length/tasks.length:0,
   previewP50:timing('previewMs',.5),previewP95:timing('previewMs',.95),readyP50:timing('readyMs',.5),readyP95:timing('readyMs',.95),
   requestVisibleP50:timing('requestToVisibleMs',.5),requestVisibleP95:timing('requestToVisibleMs',.95),requestReadyP50:timing('requestToReadyMs',.5),requestReadyP95:timing('requestToReadyMs',.95),totalP95:timing('totalMs',.95),
   timingSamples:Object.fromEntries(['previewMs','readyMs','requestToSubmitMs','requestToVisibleMs','requestToReadyMs','totalMs'].map(field=>[field,sample(field).length])),
   totalInputTokens:g.runs.reduce((n,r)=>n+(r.inputTokens??0),0),totalOutputTokens:g.runs.reduce((n,r)=>n+(r.outputTokens??0),0),totalRepairs:g.runs.reduce((n,r)=>n+(r.repairs??0),0)};
 })};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const input=process.argv[2];if(input==='--tasks'){process.stdout.write(JSON.stringify(evalTasks,null,2)+'\n');}
 else{if(!input)throw Error('Usage: node scripts/evaluate.mjs runs.jsonl | --tasks');const records=fs.readFileSync(input,'utf8').split(/\r?\n/).filter(Boolean).map(l=>JSON.parse(l));process.stdout.write(JSON.stringify(summarize(records),null,2)+'\n');}
}
