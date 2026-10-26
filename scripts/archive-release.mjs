/** Preserve a verified local delivery. This command never uploads or publishes. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {ROOT,readPackage,readVersion} from './version-info.mjs';
import {verificationHash} from './verification-hash.mjs';
import {packageManifest,readChecksums} from './release-assets.mjs';

const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
export function archiveRelease(root=ROOT,{directory=path.resolve(root,'../releases')}={}){
  const version=readVersion(root),metadata=readPackage(root),dist=path.join(root,'dist');
  const gate=JSON.parse(fs.readFileSync(path.join(root,'docs/validation/release-gate.json'),'utf8'));
  if(!gate.passed||gate.version!==version||gate.verificationHash!==verificationHash(root))throw Error('A matching release verification is required before archiving');
  const hashes=readChecksums(path.join(dist,'SHA256SUMS.txt'));
  for(const name of [metadata.name+'-'+version+'.tgz','VIE-'+version+'-source.zip','VIE-Interactive-'+version+'.html'])if(!hashes.has(name))throw Error('Missing release artifact: '+name);
  const files={};
  for(const [name,digest]of hashes){const bytes=fs.readFileSync(path.join(dist,name));if(sha(bytes)!==digest)throw Error('Artifact checksum mismatch: '+name);files[name]={sha256:digest,bytes:bytes.length};}
  const installer=packageManifest(fs.readFileSync(path.join(dist,metadata.name+'-'+version+'.tgz')));
  if(installer.version!==version||installer.name!==metadata.name)throw Error('Installer metadata does not match the release');
  const checksumBytes=fs.readFileSync(path.join(dist,'SHA256SUMS.txt'));files['SHA256SUMS.txt']={sha256:sha(checksumBytes),bytes:checksumBytes.length};
  const releaseRoot=path.resolve(directory),target=path.join(releaseRoot,version);
  if(fs.existsSync(target)){
    const previous=JSON.parse(fs.readFileSync(path.join(target,'manifest.json'),'utf8'));
    if(previous.version!==version||JSON.stringify(previous.files)!==JSON.stringify(files))throw Error('Release '+version+' is immutable; choose a new version');
    for(const [name,value]of Object.entries(files))if(sha(fs.readFileSync(path.join(target,name)))!==value.sha256)throw Error('Archived release was changed: '+name);
    return {version,directory:target,reused:true};
  }
  fs.mkdirSync(releaseRoot,{recursive:true});
  const temp=fs.mkdtempSync(path.join(releaseRoot,'.partial-'+version+'-'));
  try{
    for(const name of Object.keys(files))fs.copyFileSync(path.join(dist,name),path.join(temp,name),fs.constants.COPYFILE_EXCL);
    const git=args=>{const result=spawnSync('git',args,{cwd:root,encoding:'utf8',windowsHide:true});return result.status===0?result.stdout.trim():null;};
    const commit=git(['rev-parse','HEAD']),status=git(['status','--porcelain','--untracked-files=no']);
    const manifest={version,name:metadata.name,createdAt:new Date().toISOString(),gitCommit:commit,sourceDirty:status===null?null:status.length>0,verification:{hash:gate.verificationHash,nodeTests:gate.nodeTests,browserScripts:gate.browserScripts,hostScripts:gate.hostScripts,scope:gate.scope??'local-full'},files};
    fs.writeFileSync(path.join(temp,'manifest.json'),JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});
    fs.renameSync(temp,target);
  }finally{if(path.dirname(temp)===releaseRoot&&fs.existsSync(temp))fs.rmSync(temp,{recursive:true});}
  return {version,directory:target,reused:false};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const args=process.argv.slice(2);if(args.length&&!(args.length===2&&args[0]==='--directory'))throw Error('Usage: node scripts/archive-release.mjs [--directory PATH]');
  console.log(JSON.stringify(archiveRelease(ROOT,args.length?{directory:args[1]}:{}),null,2));
}

