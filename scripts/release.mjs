/** Build, verify, npm-pack and create a small portable source ZIP using Node built-ins. */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {verificationHash} from './verification-hash.mjs';
import {VERSION} from './version-info.mjs';
import {distributionFiles} from './public-distribution.mjs';
import {archiveRelease} from './archive-release.mjs';
const root=path.resolve(import.meta.dirname,'..'),dist=path.join(root,'dist');
fs.mkdirSync(dist,{recursive:true});fs.mkdirSync(path.join(root,'docs/validation'),{recursive:true});
const sha=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
function run(args){const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',timeout:60000});if(r.status!==0)throw Error(r.stderr||r.stdout||String(r.error));return r.stdout;}
let verified=false;
if(process.argv.includes('--reuse-verification'))try{const gate=JSON.parse(fs.readFileSync(path.join(root,'docs/validation/release-gate.json'),'utf8'));verified=gate.passed&&gate.verificationHash===verificationHash(root);}catch{}
if(!verified){const verify=fs.existsSync(path.join(root,'tests/host-source/PROVENANCE.md'))?'scripts/verify.mjs':'scripts/verify-public.mjs';const check=spawnSync(process.execPath,[verify],{cwd:root,stdio:'inherit',timeout:1200000,windowsHide:true});if(check.status!==0)throw Error('Required release verification failed');}
else console.log('Reusing matching source/build/browser verification hash');
const npmCLI=[process.env.VIE_NPM_CLI,path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js'),process.env.npm_execpath].find(x=>x&&fs.existsSync(x));
if(!npmCLI)throw Error('Set VIE_NPM_CLI to the installed npm-cli.js path.');
const packed=JSON.parse(run([npmCLI,'pack','./package','--pack-destination','dist','--json']))[0];
const tarball=packed.filename;
fs.writeFileSync(path.join(root,'docs/validation/package.json'),JSON.stringify({name:packed.name,version:packed.version,size:packed.size,unpackedSize:packed.unpackedSize,sha256:sha(fs.readFileSync(path.join(dist,tarball))),files:packed.files.map(x=>x.path)},null,2));

// ZIP format: raw DEFLATE, UTF-8 names, standard local/central records, no Zip64 required.
const crcTable=Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
function crc32(buffer){let value=0xffffffff;for(const byte of buffer)value=crcTable[(value^byte)&255]^(value>>>8);return (value^0xffffffff)>>>0;}
function makeZip(entries){const local=[],central=[];let offset=0;
  for(const {name,data}of entries){const filename=Buffer.from(name),compressed=zlib.deflateRawSync(data,{level:9}),crc=crc32(data),date=((2026-1980)<<9)|(10<<5)|22;
    const header=Buffer.alloc(30);header.writeUInt32LE(0x04034b50);header.writeUInt16LE(20,4);header.writeUInt16LE(0x800,6);header.writeUInt16LE(8,8);header.writeUInt16LE(date,12);header.writeUInt32LE(crc,14);header.writeUInt32LE(compressed.length,18);header.writeUInt32LE(data.length,22);header.writeUInt16LE(filename.length,26);
    local.push(header,filename,compressed);
    const record=Buffer.alloc(46);record.writeUInt32LE(0x02014b50);record.writeUInt16LE(20,4);record.writeUInt16LE(20,6);record.writeUInt16LE(0x800,8);record.writeUInt16LE(8,10);record.writeUInt16LE(date,14);record.writeUInt32LE(crc,16);record.writeUInt32LE(compressed.length,20);record.writeUInt32LE(data.length,24);record.writeUInt16LE(filename.length,28);record.writeUInt32LE(offset,42);central.push(record,filename);offset+=header.length+filename.length+compressed.length;
  }
  const directory=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(entries.length,8);end.writeUInt16LE(entries.length,10);end.writeUInt32LE(directory.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...local,directory,end]);
}
function walk(folder){return fs.readdirSync(path.join(root,folder),{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(folder+'/'+entry.name):[folder+'/'+entry.name]);}
const files=distributionFiles(root,VERSION,tarball);
const entries=files.map(name=>{let data=fs.readFileSync(path.join(root,name));if(name==='package.json'){const p=JSON.parse(data);p.scripts={build:'node scripts/build.mjs',check:'node scripts/build.mjs && node --test tests/*.test.mjs',demo:'node scripts/build.mjs && node scripts/export-demo.mjs',verify:'node scripts/verify-public.mjs',version:'node scripts/version.mjs','version:check':'node scripts/version.mjs --check',release:'node scripts/release.mjs --archive','release:archive':'node scripts/archive-release.mjs'};data=Buffer.from(JSON.stringify(p,null,2)+'\n');}if(name==='scripts/learning-reference-scenes.json'){const {stages,application}=JSON.parse(data);data=Buffer.from(JSON.stringify({stages,application},null,2)+'\n');}return {name:'Visual-Interactive-Engine-'+VERSION+'/'+name,data};});
for(const entry of entries){if(/\.(?:png|tgz)$/.test(entry.name))continue;const text=entry.data.toString('utf8');if(/(?:C:[/\\]Users[/\\]|session-[a-f0-9]{8}-|(?:sk-|ghp_|github_pat_)[A-Za-z0-9_]{20,})/i.test(text))throw Error('Distribution audit failed: '+entry.name);}
const zipName='VIE-'+VERSION+'-source.zip';fs.writeFileSync(path.join(dist,zipName),makeZip(entries));
const deliverables=[tarball,zipName,'VIE-Interactive-'+VERSION+'.html'];
fs.writeFileSync(path.join(dist,'SHA256SUMS.txt'),deliverables.map(name=>sha(fs.readFileSync(path.join(dist,name)))+'  '+name).join('\n')+'\n');
console.log('Release artifacts: '+deliverables.join(', '));
if(process.argv.includes('--archive'))console.log(JSON.stringify(archiveRelease(root),null,2));
