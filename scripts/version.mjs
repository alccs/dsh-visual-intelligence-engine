import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {ROOT,assertVersion,readVersion} from './version-info.mjs';

const writeJSON=(file,value)=>fs.writeFileSync(file,JSON.stringify(value,null,2)+'\n');
export function synchronizeVersion(root=ROOT,next=readVersion(root),{check=false}={}){
  const version=assertVersion(next),changes=[];
  const edit=(relative,mutate)=>{
    const file=path.join(root,relative);if(!fs.existsSync(file))return;
    const data=JSON.parse(fs.readFileSync(file,'utf8'));
    if(mutate(data)){changes.push(relative);if(!check)writeJSON(file,data);}
  };
  edit('package/package.json',data=>{if(data.version===version)return false;data.version=version;return true;});
  edit('package.json',data=>{if(data.version===version)return false;data.version=version;return true;});
  edit('package-lock.json',data=>{let changed=data.version!==version;data.version=version;if(data.packages?.['']&&data.packages[''].version!==version){data.packages[''].version=version;changed=true;}return changed;});
  for(const relative of ['package/README.md','package/assets/visual-lab-skill.md']){
    const file=path.join(root,relative);if(!fs.existsSync(file))continue;
    const before=fs.readFileSync(file,'utf8'),after=before.replace(/^[^\r\n]+/,line=>line.replace(/\b\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?\b/,version));
    if(after!==before){changes.push(relative);if(!check)fs.writeFileSync(file,after);}
  }
  if(check&&changes.length)throw Error('Version drift: '+changes.join(', ')+'. Run node scripts/version.mjs');
  return {version,changed:changes};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const args=process.argv.slice(2);if(args.length>1||args[0]?.startsWith('--')&&args[0]!=='--check')throw Error('Usage: node scripts/version.mjs [X.Y.Z[-dev.N] | --check]');
  console.log(JSON.stringify(synchronizeVersion(ROOT,args[0]&&args[0]!=='--check'?args[0]:readVersion(),{check:args[0]==='--check'}),null,2));
}

