/** Install a tarball via the real dsh plugin command in a disposable, isolated home. */
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const runtime=path.resolve(process.env.VIE_DSH_RUNTIME??path.join(root,'.validation/runtime'));
const tarball=path.join(root,'dist/dsh-visual-interactive-engine-0.27.0.tgz');
const tarHash=crypto.createHash('sha256').update(fs.readFileSync(tarball)).digest('hex');
const home=path.join(root,'.validation/cli-home-'+tarHash.slice(0,12));
const staged=path.join(root,'.validation','dsh-visual-interactive-engine-'+tarHash.slice(0,12)+'.tgz');
const cwd=path.join(root,'.validation/empty-workspace');
for(const dir of [home,cwd,path.join(root,'docs/validation')])fs.mkdirSync(dir,{recursive:true});
fs.copyFileSync(tarball,staged);
const env={...process.env,DSH_HOME:home,DSH_AGENTS_HOME:path.join(root,'.validation/agents'),DSH_TELEMETRY_DISABLED:'1',PATH:path.join(runtime,'node_modules/.bin')+path.delimiter+process.env.PATH};
const cli=path.join(runtime,'node_modules/@deepseek-ai/dsh/lib/bin.js');
async function run(args,quiet=false){return new Promise((resolve,reject)=>{const proc=spawn(process.execPath,[cli,...args],{cwd,env,windowsHide:true});let output='';proc.stdout.on('data',data=>{output+=data;if(!quiet)process.stdout.write(data)});proc.stderr.on('data',data=>{output+=data;if(!quiet)process.stderr.write(data)});proc.on('error',reject);proc.on('exit',code=>code===0?resolve(output):reject(Error('dsh exited '+code+'\n'+output)));});}
const output=await run(['plugin','--profile','web','add',staged]);
const config=await run(['--profile','web','--dump-config'],true);
assert.match(config,/dsh-visual-interactive-engine/);
for(const name of ['index.js','client.js'])assert.ok(fs.readFileSync(path.join(home,'profiles/web/node_modules/dsh-visual-interactive-engine/lib',name)).equals(fs.readFileSync(path.join(root,'package/lib',name))),'Installed profile differs from final build: '+name);
console.log('Composed profile and installed files match the release.');
fs.writeFileSync(path.join(root,'docs/validation/dsh-cli.json'),JSON.stringify({dsh:'0.2.1-rc.2',isolated:true,command:'dsh plugin --profile web add <tarball>',tarballSha256:tarHash,temporaryHome:path.relative(root,home).replaceAll('\\','/'),tarballInstall:true,installedFilesMatchBuild:true,composedConfigContainsPlugin:true},null,2));
fs.writeFileSync(path.join(root,'.validation/cli-install.log'),output);
fs.writeFileSync(path.join(root,'.validation/composed-config.yml'),config);
