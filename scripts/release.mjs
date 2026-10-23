/** Build, verify, npm-pack and create a small portable source ZIP using Node built-ins. */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {verificationHash} from './verification-hash.mjs';
const root=path.resolve(import.meta.dirname,'..'),dist=path.join(root,'dist');
fs.mkdirSync(dist,{recursive:true});fs.mkdirSync(path.join(root,'docs/validation'),{recursive:true});
const sha=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
function run(args){const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',timeout:60000});if(r.status!==0)throw Error(r.stderr||r.stdout||String(r.error));return r.stdout;}
let verified=false;
if(process.argv.includes('--reuse-verification'))try{const gate=JSON.parse(fs.readFileSync(path.join(root,'docs/validation/release-gate.json'),'utf8'));verified=gate.passed&&gate.verificationHash===verificationHash(root);}catch{}
if(!verified){const check=spawnSync(process.execPath,['scripts/verify.mjs'],{cwd:root,stdio:'inherit',timeout:1200000,windowsHide:true});if(check.status!==0)throw Error('Required release verification failed');}
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
const files=[...['README.md','INSTALL.md','CHANGELOG.md','LICENSE','THIRD-PARTY-NOTICES.txt','package.json','package-lock.json','.gitignore'],...['src','scripts','tests','package','docs','.github'].flatMap(walk),...walk('screenshots').filter(name=>name.endsWith('-0.28.0.png')),'dist/VIE-Interactive-0.28.0.html','dist/'+tarball].sort();
const entries=files.map(name=>({name:'Visual-Interactive-Engine-0.28.0/'+name,data:fs.readFileSync(path.join(root,name))}));
const zipName='VIE-0.28.0-source.zip';fs.writeFileSync(path.join(dist,zipName),makeZip(entries));
const deliverables=[tarball,zipName,'VIE-Interactive-0.28.0.html'];
fs.writeFileSync(path.join(dist,'SHA256SUMS.txt'),deliverables.map(name=>sha(fs.readFileSync(path.join(dist,name)))+'  '+name).join('\n')+'\n');
console.log('Release artifacts: '+deliverables.join(', '));
