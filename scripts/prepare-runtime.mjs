/** Install an isolated, pinned host for reproducible integration checks. */
import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..'),target=path.resolve(process.env.VIE_DSH_RUNTIME??path.join(root,'.validation/runtime'));
const deps={'@deepseek-ai/dsh':'0.2.1-rc.2','@deepseek-ai/dsh-client-store':'0.2.1-rc.2',immer:'10.1.1',react:'18.3.1','react-dom':'18.3.1',zustand:'5.0.8'};
try{const r=createRequire(path.join(target,'package.json'));r.resolve('@deepseek-ai/dsh');r.resolve('@deepseek-ai/dsh-client-store');console.log('Using configured isolated host runtime: '+target);process.exit(0);}catch{}
if(process.env.VIE_DSH_RUNTIME)throw Error('Configured VIE_DSH_RUNTIME is incomplete; install the pinned host dependencies there.');
fs.mkdirSync(target,{recursive:true});fs.writeFileSync(path.join(target,'package.json'),JSON.stringify({private:true,type:'module',dependencies:deps},null,2));
const npm=process.env.VIE_NPM_CLI??path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');
const r=spawnSync(process.execPath,[npm,'install','--ignore-scripts','--no-audit','--no-fund'],{cwd:target,stdio:'inherit',timeout:600000,windowsHide:true});if(r.status!==0)throw Error('Failed to prepare isolated Harness runtime');
