import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {synchronizeVersion} from '../scripts/version.mjs';
import {readVersion} from '../scripts/version-info.mjs';
import {archiveRelease} from '../scripts/archive-release.mjs';
import {verificationHash} from '../scripts/verification-hash.mjs';

const json=(file,value)=>fs.writeFileSync(file,JSON.stringify(value,null,2)+'\n');
const sha=data=>createHash('sha256').update(data).digest('hex');
function fixture(t){
  const base=fs.mkdtempSync(path.join(os.tmpdir(),'vie-versioning-')),root=path.join(base,'repo');
  t.after(()=>{assert.equal(path.dirname(base),path.resolve(os.tmpdir()));fs.rmSync(base,{recursive:true});});
  for(const directory of ['src','scripts','tests','package/assets','dist','docs/validation'])fs.mkdirSync(path.join(root,directory),{recursive:true});
  json(path.join(root,'package/package.json'),{name:'dsh-visual-interactive-engine',version:'1.2.3'});
  json(path.join(root,'package.json'),{version:'1.2.2',private:true});
  json(path.join(root,'package-lock.json'),{version:'1.2.2',packages:{'':{version:'1.2.2'}}});
  return {base,root,directory:path.join(base,'releases')};
}
function tarball(metadata){
  const data=Buffer.from(JSON.stringify(metadata)),header=Buffer.alloc(512);
  header.write('package/package.json');header.write(data.length.toString(8).padStart(11,'0')+'\0',124);header[156]=48;
  return gzipSync(Buffer.concat([header,data,Buffer.alloc((512-data.length%512)%512+1024)]));
}
function seal(root){
  const dist=path.join(root,'dist'),names=['dsh-visual-interactive-engine-1.2.3.tgz','VIE-1.2.3-source.zip','VIE-Interactive-1.2.3.html'];
  fs.writeFileSync(path.join(dist,'SHA256SUMS.txt'),names.map(name=>sha(fs.readFileSync(path.join(dist,name)))+'  '+name).join('\n')+'\n');
  json(path.join(root,'docs/validation/release-gate.json'),{version:'1.2.3',passed:true,scope:'fixture',verificationHash:verificationHash(root),nodeTests:1,browserScripts:0,hostScripts:0});
}
function releaseFixture(t){
  const f=fixture(t),metadata=JSON.parse(fs.readFileSync(path.join(f.root,'package/package.json')));
  fs.writeFileSync(path.join(f.root,'dist/dsh-visual-interactive-engine-1.2.3.tgz'),tarball(metadata));
  fs.writeFileSync(path.join(f.root,'dist/VIE-1.2.3-source.zip'),'fixture source archive');
  fs.writeFileSync(path.join(f.root,'dist/VIE-Interactive-1.2.3.html'),'<svg/>');seal(f.root);return f;
}
test('one package version synchronizes root metadata and the lockfile without losing dependencies',t=>{
  const {root}=fixture(t);json(path.join(root,'package.json'),{version:'1.2.2',private:true,devDependencies:{example:'2.0.0'}});
  assert.throws(()=>synchronizeVersion(root,readVersion(root),{check:true}),/Version drift/);
  synchronizeVersion(root,'1.2.4-dev.1');assert.equal(readVersion(root),'1.2.4-dev.1');
  const metadata=JSON.parse(fs.readFileSync(path.join(root,'package.json'))),lock=JSON.parse(fs.readFileSync(path.join(root,'package-lock.json')));
  assert.equal(metadata.version,'1.2.4-dev.1');assert.equal(metadata.devDependencies.example,'2.0.0');assert.equal(lock.packages[''].version,metadata.version);
  assert.deepEqual(synchronizeVersion(root,metadata.version,{check:true}).changed,[]);
});
test('invalid versions are rejected before writing metadata',t=>{
  const {root}=fixture(t),before=fs.readFileSync(path.join(root,'package/package.json'));
  for(const version of ['../1.2.3','01.2.3','1.2','1.2.3-dev.01','v1.2.3'])assert.throws(()=>synchronizeVersion(root,version),/semantic version/);
  assert.ok(before.equals(fs.readFileSync(path.join(root,'package/package.json'))));
});
test('a metadata-only version change reaches both compiled entry points and skill headings',t=>{
  const {root}=fixture(t),sourceRoot=fileURLToPath(new URL('..',import.meta.url));
  for(const directory of ['src','package'])fs.cpSync(path.join(sourceRoot,directory),path.join(root,directory),{recursive:true});
  for(const name of ['build.mjs','build-metrics.mjs','version-info.mjs','version.mjs'])fs.copyFileSync(path.join(sourceRoot,'scripts',name),path.join(root,'scripts',name));
  for(const version of ['1.2.4-dev.7','1.2.4']){
    synchronizeVersion(root,version);const result=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:root,encoding:'utf8',windowsHide:true});assert.equal(result.status,0,result.stderr);
    const host=fs.readFileSync(path.join(root,'package/lib/index.js'),'utf8'),client=fs.readFileSync(path.join(root,'package/lib/client.js'),'utf8');
    assert.ok(host.startsWith('/* VIE v'+version));assert.ok(client.includes("st.dataset.vieVersion='"+version+"'"));assert.ok(!client.includes('__VIE_VERSION__'));
    assert.ok(fs.readFileSync(path.join(root,'package/assets/visual-lab-skill.md'),'utf8').split('\n')[0].includes(version));
  }
});
test('an identical verified delivery reuses its archived manifest without rewriting it',t=>{
  const f=releaseFixture(t),first=archiveRelease(f.root,{directory:f.directory}),manifest=fs.readFileSync(path.join(first.directory,'manifest.json'));
  assert.equal(first.reused,false);assert.equal(archiveRelease(f.root,{directory:f.directory}).reused,true);
  assert.ok(manifest.equals(fs.readFileSync(path.join(first.directory,'manifest.json'))));
});
test('another build with the same version cannot overwrite a frozen delivery',t=>{
  const f=releaseFixture(t),first=archiveRelease(f.root,{directory:f.directory}),original=fs.readFileSync(path.join(first.directory,'VIE-Interactive-1.2.3.html'));
  fs.writeFileSync(path.join(f.root,'dist/VIE-Interactive-1.2.3.html'),'<svg>changed</svg>');seal(f.root);
  assert.throws(()=>archiveRelease(f.root,{directory:f.directory}),/immutable/);
  assert.ok(original.equals(fs.readFileSync(path.join(first.directory,'VIE-Interactive-1.2.3.html'))));
});
test('changed source and corrupt installers cannot be archived as verified releases',t=>{
  const f=releaseFixture(t);fs.writeFileSync(path.join(f.root,'src/changed.js'),'changed');
  assert.throws(()=>archiveRelease(f.root,{directory:f.directory}),/matching release verification/);
  seal(f.root);fs.appendFileSync(path.join(f.root,'dist/dsh-visual-interactive-engine-1.2.3.tgz'),'corrupt');
  assert.throws(()=>archiveRelease(f.root,{directory:f.directory}),/checksum mismatch/);
});

