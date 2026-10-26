import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
/** Generated from actual artifacts. Byte counts are never described as model-token savings. */
export function buildMetrics(root){
 const bytes=file=>fs.statSync(path.join(root,file)).size;
 const context=vm.createContext({});vm.runInContext(fs.readFileSync(path.join(root,'src/shared/catalog.js'),'utf8')+';this.entry=VIE_ENTRY_POLICY.length;this.study=VIE_STUDY_POLICY.length;',context);
 const host=fs.readFileSync(path.join(root,'src/host.js'),'utf8'),expression=host.match(/name:'vie_explain',\s*description:([^\n]+)/)?.[1]?.replace(/,\s*$/,'');
 if(!expression)throw Error('Missing primary tool description');const toolChars=vm.runInContext(expression,context).length;
 return {version:JSON.parse(fs.readFileSync(path.join(root,'package/package.json'),'utf8')).version,uncompressedBytes:{client:bytes('package/lib/client.js'),threeChunk:bytes('package/lib/client.three.js'),host:bytes('package/lib/index.js')},promptCharacters:{entry:context.entry,study:context.study,primaryTool:toolChars},modelLatencyMeasured:false};
}
