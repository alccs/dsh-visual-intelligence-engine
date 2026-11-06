import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';import {sourceChecks} from './source-checks.mjs';
const root=path.resolve(import.meta.dirname,'..');
const run=args=>{const r=spawnSync(process.execPath,args,{cwd:root,stdio:'inherit',windowsHide:true});if(r.status!==0)throw Error('Check failed: '+args.join(' '));};
run(['scripts/build.mjs']);for(const name of ['index','client'])run(['--check','package/lib/'+name+'.js']);
const checks=await sourceChecks(root),folder=path.join(root,'tests');
const tests=fs.existsSync(folder)?fs.readdirSync(folder).filter(n=>n.endsWith('.test.mjs')).sort().map(n=>'tests/'+n):[];
if(tests.length)run(['--test',...tests]);
else console.log('Public source smoke checks: '+checks+'; no Node regression tests are included in this checkout. Run npm run verify for browser checks.');
