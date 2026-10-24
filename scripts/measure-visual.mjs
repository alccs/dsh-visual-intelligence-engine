/** Submission bytes only. No model call, token estimate, or latency claim. */
import fs from 'node:fs';import path from 'node:path';import {linkedMotion} from './visual-examples.mjs';
const root=path.resolve(import.meta.dirname,'..'),bytes=x=>Buffer.byteLength(JSON.stringify(x));
const native={document:linkedMotion},legacy={spec:JSON.stringify(linkedMotion)},replacement={...linkedMotion.blocks[0],title:'位移图（修正标题）'};
const full={document:{...linkedMotion,blocks:[replacement,linkedMotion.blocks[1]]}},patch={visualId:'visual-example-1',baseRevision:1,changes:[{index:0,block:replacement}]};
const result={version:'0.29.2',scope:'Same linked two-chart visual serialized natively vs legacy string; one-block correction vs resubmitting both. UTF-8 argument bytes only; no model or latency measurement.',nativeArgumentBytes:bytes(native),legacyStringArgumentBytes:bytes(legacy),fullReplacementBytes:bytes(full),oneBlockPatchBytes:bytes(patch),externalModelRequests:0,modelLatencyMeasured:false};
fs.writeFileSync(path.join(root,'docs/validation/visual-payload.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
