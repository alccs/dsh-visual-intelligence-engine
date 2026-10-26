/** Reproducible checks using only the reviewed public source distribution. */
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';
import {VERSION} from './version-info.mjs';import {PUBLIC_TESTS} from './public-distribution.mjs';import {verificationHash} from './verification-hash.mjs';
const root=path.resolve(import.meta.dirname,'..');fs.mkdirSync(path.join(root,'docs/validation'),{recursive:true});
function run(args){const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',windowsHide:true,timeout:600000,maxBuffer:8e6});process.stdout.write(r.stdout??'');process.stderr.write(r.stderr??'');if(r.status!==0)throw Error('Public verification failed: '+args.join(' '));return r.stdout;}
run(['scripts/build.mjs']);for(const name of ['index','client'])run(['--check','package/lib/'+name+'.js']);
const tap=run(['--test','--test-reporter=tap',...PUBLIC_TESTS]);
if(!/# fail 0/.test(tap)||!/# skipped 0/.test(tap))throw Error('Every public test must pass');
run(['scripts/export-demo.mjs']);const testedHash=verificationHash(root);
const browsers=['sdk','preview','preview-audit','session-fixes','quality','command-feedback','responsive','controls','render-repair'];
for(const name of browsers)run(['scripts/browser-'+name+'.mjs']);
if(verificationHash(root)!==testedHash)throw Error('Sources changed during public verification');
fs.writeFileSync(path.join(root,'docs/validation/release-gate.json'),JSON.stringify({version:VERSION,scope:'public',passed:true,nodeTests:Number(tap.match(/# pass (\d+)/)?.[1]),browserScripts:browsers.length,hostScripts:0,verificationHash:testedHash,externalModelRequests:0},null,2)+'\n');
console.log('Public source checks passed.');
