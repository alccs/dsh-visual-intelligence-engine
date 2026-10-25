/** Prepare the stable Release filename from a verified, versioned installer. */
import fs from 'node:fs';
import path from 'node:path';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const packageName='dsh-visual-interactive-engine';
const stableName=packageName+'.tgz';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
function packageManifest(bytes){
  const tar=gunzipSync(bytes,{maxOutputLength:32*1024*1024});
  for(let at=0;at+512<=tar.length;){
    const header=tar.subarray(at,at+512);
    const text=(start,end)=>header.subarray(start,end).toString('utf8').replace(/\0.*$/s,'');
    const name=text(0,100),prefix=text(345,500),fullName=prefix?prefix+'/'+name:name;
    if(!name)break;
    const size=parseInt(text(124,136).trim()||'0',8);
    if(!Number.isSafeInteger(size)||size<0||at+512+size>tar.length)throw Error('Invalid installer archive');
    if(fullName==='package/package.json'&&(header[156]===0||header[156]===48))return JSON.parse(tar.subarray(at+512,at+512+size).toString('utf8'));
    at+=512+Math.ceil(size/512)*512;
  }
  throw Error('Installer has no package/package.json');
}
function readChecksums(file){
  const entries=new Map();
  if(!fs.existsSync(file))return entries;
  for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/).filter(line=>line.trim())){
    const match=/^([a-f0-9]{64}) [ *]([^/\\\r\n]+)$/i.exec(line);
    if(!match||entries.has(match[2]))throw Error('Invalid or duplicate Release checksum');
    entries.set(match[2],match[1].toLowerCase());
  }
  return entries;
}
export function prepareReleaseAssets(root,{version,files=[],verifyPublished=false}={}){
  const metadata=JSON.parse(fs.readFileSync(path.join(root,'package/package.json'),'utf8'));
  version=version??metadata.version;
  if(metadata.name!==packageName||typeof version!=='string'||!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(version))throw Error('Invalid VIE package name or version');
  const dist=path.join(root,'dist'),tarball=packageName+'-'+version+'.tgz',bytes=fs.readFileSync(path.join(dist,tarball)),manifest=packageManifest(bytes);
  if(manifest.name!==packageName||manifest.version!==version)throw Error('Installer version does not match the requested Release');
  const checksumFile=path.join(dist,'SHA256SUMS.txt'),previous=readChecksums(checksumFile),digest=sha(bytes);
  if(verifyPublished&&previous.get(tarball)!==digest)throw Error('Published installer does not match SHA256SUMS.txt');
  const entries=files.length?new Map():previous;
  for(const name of files){
    if(path.basename(name)!==name||name==='SHA256SUMS.txt'||name===stableName||name===tarball)throw Error('Invalid extra Release filename');
    entries.set(name,sha(fs.readFileSync(path.join(dist,name))));
  }
  fs.writeFileSync(path.join(dist,stableName),bytes);
  entries.set(tarball,digest);entries.set(stableName,digest);
  fs.writeFileSync(checksumFile,[...entries].map(([name,hash])=>hash+'  '+name).join('\n')+'\n');
  return {version,tarball,stableTarball:stableName,sha256:digest,files:[tarball,stableName,...files,'SHA256SUMS.txt']};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  let version,verifyPublished=false;
  for(let i=2;i<process.argv.length;i++){
    if(process.argv[i]==='--tag'&&process.argv[i+1])version=process.argv[++i].replace(/^v/,'');
    else if(process.argv[i]==='--verify-published')verifyPublished=true;
    else throw Error('Usage: node scripts/release-assets.mjs [--tag vX.Y.Z] [--verify-published]');
  }
  console.log(JSON.stringify(prepareReleaseAssets(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),{version,verifyPublished}),null,2));
}
