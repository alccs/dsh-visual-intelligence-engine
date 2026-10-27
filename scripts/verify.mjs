import {VERSION} from './version-info.mjs';
/** Required release gate. Missing Chrome or a failed browser script is a failure. */
import fs from 'node:fs';import path from 'node:path';import {spawn,spawnSync} from 'node:child_process';import {verificationHash} from './verification-hash.mjs';
const root=path.resolve(import.meta.dirname,'..');fs.mkdirSync(path.join(root,'docs/validation'),{recursive:true});
function run(args){const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',timeout:600000,maxBuffer:8e6,windowsHide:true});if(r.status!==0)throw Error((r.stdout??'')+'\n'+(r.stderr??'')+'\n'+(r.error??''));process.stdout.write(r.stdout);return r.stdout;}
run(['scripts/build.mjs']);for(const entry of ['index','client'])run(['--check','package/lib/'+entry+'.js']);
const tests=fs.readdirSync(path.join(root,'tests')).filter(n=>n.endsWith('.test.mjs')).sort().map(n=>'tests/'+n),tap=run(['--test','--test-reporter=tap',...tests]);
fs.writeFileSync(path.join(root,'docs/validation/node-test.tap'),tap);if(!/# fail 0/.test(tap)||!/# skipped 0/.test(tap))throw Error('Every required Node test must run and pass');
run(['scripts/export-demo.mjs']);
const testedHash=verificationHash(root);
async function browser(name){return new Promise((resolve,reject)=>{const child=spawn(process.execPath,['scripts/browser-'+name+'.mjs'],{cwd:root,windowsHide:true,timeout:600000});let output='';child.stdout.on('data',data=>{output+=data;});child.stderr.on('data',data=>{output+=data;});child.on('error',reject);child.on('close',code=>{process.stdout.write(output);code===0?resolve():reject(Error('Browser suite failed: '+name));});});}
// Separate named browser sessions and separate reports/screenshots; no shared app state.
for(const batch of [['reactive','visual','speed'],['general','test','transmission'],['layout','optimization','questions'],['flow-ui','flow-repair','responsive'],['controls','render-repair'],['sdk','preview','preview-audit'],['session-fixes','quality','command-feedback'],['031','0311']]){const results=await Promise.allSettled(batch.map(browser));for(const result of results)if(result.status==='rejected')throw result.reason;}
for(const script of ['test-workflow','test-mode-runtime','test-runtime-feedback'])run(['scripts/'+script+'.mjs']);
run(['--experimental-transform-types','scripts/test-assembly.mjs']);
const npm=process.env.VIE_NPM_CLI??path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');
run([npm,'pack','./package','--pack-destination','dist','--json']);
run(['scripts/test-cli.mjs']);run(['scripts/test-dsh.mjs']);run(['--expose-internals','scripts/test-native-resolver.mjs']);run(['scripts/test-name-runtime.mjs']);run(['scripts/test-mode-runtime.mjs','--installed']);
run(['scripts/test-client-chunk.mjs','--installed']);
if(verificationHash(root)!==testedHash)throw Error('Sources changed during verification; rerun the release gate');
fs.writeFileSync(path.join(root,'docs/validation/release-gate.json'),JSON.stringify({version:VERSION,passed:true,nodeTests:Number(tap.match(/# pass (\d+)/)?.[1]),browserScripts:22,hostScripts:10,verificationHash:verificationHash(root),externalModelRequests:0},null,2));
console.log('Required release checks passed.');
