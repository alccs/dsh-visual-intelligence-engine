/** Equivalent payload sizes, not a measurement of model tokens or latency. */
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import assert from 'node:assert/strict';
import {sharedStageDocument,legacyStageDocument} from './stage-examples.mjs';import {VERSION} from './version-info.mjs';
const root=path.resolve(import.meta.dirname,'..'),c=vm.createContext({TextEncoder});vm.runInContext(fs.readFileSync(path.join(root,'src/shared/learning.js'),'utf8')+';this.validate=validateLearningDefinition;',c);
const legacy=legacyStageDocument();for(const document of [legacy,sharedStageDocument])c.validate(document.blocks[0]);
const size=value=>Buffer.byteLength(JSON.stringify(value),'utf8'),compare=(before,after)=>({beforeBytes:size(before),afterBytes:size(after),reductionPercent:Number((100*(1-size(after)/size(before))).toFixed(2))});
const changed=structuredClone(sharedStageDocument.blocks[0]);changed.stages[1].label='迁移';
const common={visualId:'visual-example',baseRevision:1},result={version:VERSION,comparison:'Equivalent 0.31.0 serialized inputs; not a model benchmark',sharedStages:compare({document:legacy},{document:sharedStageDocument}),oneLabelRepair:compare({...common,changes:[{index:0,block:changed}]},{...common,changes:[{index:0,updates:[{path:'/stages/1/label',value:'迁移'}]}]}),modelTokens:null,modelLatencyMs:null,externalModelRequests:0};
assert.ok(result.sharedStages.afterBytes<result.sharedStages.beforeBytes);assert.ok(result.oneLabelRepair.afterBytes<result.oneLabelRepair.beforeBytes);
fs.mkdirSync(path.join(root,'docs/validation'),{recursive:true});fs.writeFileSync(path.join(root,'docs/validation/031-payloads.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
