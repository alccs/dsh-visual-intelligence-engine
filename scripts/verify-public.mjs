/** Reproducible checks using only the reviewed public source distribution. */
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';
import {VERSION} from './version-info.mjs';import {PUBLIC_TESTS} from './public-distribution.mjs';import {verificationHash} from './verification-hash.mjs';
import {sourceChecks} from './source-checks.mjs';
const root=path.resolve(import.meta.dirname,'..');fs.mkdirSync(path.join(root,'docs/validation'),{recursive:true});
function run(args){const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',windowsHide:true,timeout:600000,maxBuffer:8e6});process.stdout.write(r.stdout??'');process.stderr.write(r.stderr??'');if(r.status!==0)throw Error('Public verification failed: '+args.join(' '));return r.stdout;}
run(['scripts/build.mjs']);for(const name of ['index','client'])run(['--check','package/lib/'+name+'.js']);
const sourceCheckCount=await sourceChecks(root),present=PUBLIC_TESTS.filter(file=>fs.existsSync(path.join(root,file)));
if(present.length&&present.length!==PUBLIC_TESTS.length)throw Error('Public regression material is incomplete: restore the complete set or use a clean public Git checkout.');
const tap=present.length?run(['--test','--test-reporter=tap',...PUBLIC_TESTS]):'';
if(tap&&(!/# fail 0/.test(tap)||!/# skipped 0/.test(tap)))throw Error('Every public test must pass');
if(!present.length)console.log('Public Git scope: source smoke checks and browser checks; Node regression material is not included.');
run(['scripts/export-demo.mjs']);const testedHash=verificationHash(root);
const browsers=['sdk','preview','preview-audit','session-fixes','quality','command-feedback','responsive','controls','render-repair','031','0311','0312','0313','0315'];
for(const name of browsers)run(['scripts/browser-'+name+'.mjs']);
if(verificationHash(root)!==testedHash)throw Error('Sources changed during public verification');
fs.writeFileSync(path.join(root,'docs/validation/release-gate.json'),JSON.stringify({version:VERSION,scope:present.length?'public-regression':'public-source',passed:true,sourceChecks:sourceCheckCount,nodeTests:Number(tap.match(/# pass (\d+)/)?.[1]??0),browserScripts:browsers.length,hostScripts:0,verificationHash:testedHash,externalModelRequests:0},null,2)+'\n');
console.log('Public source checks passed.');
