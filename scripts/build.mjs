/** Offline deterministic bundling of local shared source and CSS. No eval or dependencies. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {buildMetrics} from './build-metrics.mjs';
import {synchronizeVersion} from './version.mjs';
import {VERSION} from './version-info.mjs';
const root=path.resolve(import.meta.dirname,'..');
const sourceRoot=path.join(root,'src');
const version=VERSION;
synchronizeVersion(root,version);
const catalogContext={};vm.runInNewContext(fs.readFileSync(path.join(sourceRoot,'shared/catalog.js'),'utf8')+';this.reference=documentReference();this.policy=VIE_POLICY;',catalogContext);
fs.mkdirSync(path.join(root,'docs'),{recursive:true});fs.writeFileSync(path.join(root,'docs/COMPONENTS.generated.md'),catalogContext.reference);
fs.writeFileSync(path.join(root,'package/assets/components-reference.md'),catalogContext.reference);
const skillPath=path.join(root,'package/assets/visual-lab-skill.md');const skill=fs.readFileSync(skillPath,'utf8').replace(/\r\n/g,'\n');fs.writeFileSync(skillPath,skill.replace(/^(# [^\n]+\n\n)[\s\S]*?(?=\n\n## )/,(_,heading)=>heading+catalogContext.policy));
const buildFiles=folder=>fs.readdirSync(folder,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?buildFiles(path.join(folder,entry.name)):[path.join(folder,entry.name)]);
const buildHash=createHash('sha256');for(const file of [...buildFiles(sourceRoot),...buildFiles(path.join(root,'package/assets')),path.join(root,'package/package.json')].sort()){buildHash.update(path.relative(root,file).replaceAll('\\','/'));const bytes=fs.readFileSync(file);buildHash.update(/\.(?:js|css|md|json|txt|svg)$/.test(file)?bytes.toString('utf8').replace(/\r\n/g,'\n'):bytes);}
const buildId=buildHash.digest('hex').slice(0,16);
const read=file=>fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n').replaceAll('__VIE_VERSION__',version).replaceAll('__VIE_BUILD_ID__',buildId);
function expand(relative,seen=new Set()){
  const full=path.resolve(sourceRoot,relative);
  if(!full.startsWith(sourceRoot+path.sep)||seen.has(full))throw Error('Invalid/cyclic source include: '+relative);
  const next=new Set([...seen,full]);
  return read(full)
    .replace(/\/\* @include ([\w./-]+) \*\//g,(_,name)=>expand(name,next))
    .replace(/\/\* @asset ([\w./-]+) \*\/ ""/g,(_,name)=>JSON.stringify(read(path.join(root,'package',name))))
    .replace(/\/\* @style ([\w.,/-]+) \*\/ ""/g,(_,names)=>JSON.stringify(names.split(',').map(name=>read(path.join(sourceRoot,name))).join('\n')));
}
const threeSource=read(path.join(root,'package/assets/three-0.160.1.min.js'));
const threeChunk='window.__ModuleLoader__.load({id:"dsh-visual-interactive-engine",chunk:"client.three.js",factory:()=>({source:'+JSON.stringify(threeSource)+'})});\n';
const threeHash=createHash('sha256').update(threeChunk).digest('hex');
for(const [input,output] of [['host.js','index.js'],['client.js','client.js']]){
  const content=expand(input)+(input==='client.js'?'\n/* VIE Three chunk SHA256 '+threeHash+' */\n':'');
  if(!content.includes('v'+version)||/\/\* @(include|style|asset)/.test(content))throw Error('Build/version mismatch: '+input);
  fs.mkdirSync(path.join(root,'package/lib'),{recursive:true});
  fs.writeFileSync(path.join(root,'package/lib',output),content);
  console.log(`${input} -> package/lib/${output} (${Buffer.byteLength(content)} bytes)`);
}
// The Host's standard package-local chunk route preserves revision and source identity.
fs.writeFileSync(path.join(root,'package/lib/client.three.js'),threeChunk);
console.log('Three.js -> package/lib/client.three.js ('+Buffer.byteLength(threeChunk)+' bytes; on demand)');
fs.writeFileSync(path.join(root,'docs/BUILD-METRICS.json'),JSON.stringify(buildMetrics(root),null,2)+'\n');
