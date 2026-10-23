/** Use Harness' actual metadata reader against the installed renamed package. */
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {createRequire} from 'node:module';import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'..'),runtime=createRequire(path.resolve(process.env.VIE_DSH_RUNTIME??path.join(root,'.validation/runtime'),'package.json'));
const {readPluginMeta}=await import(pathToFileURL(runtime.resolve('@deepseek-ai/dsh-app-boot')).href),cli=JSON.parse(fs.readFileSync(path.join(root,'docs/validation/dsh-cli.json'),'utf8'));
const profile=path.join(root,cli.temporaryHome,'profiles/web'),meta=readPluginMeta('dsh-visual-interactive-engine',pathToFileURL(path.join(profile,'package.json')).href);
assert.ok(meta,JSON.stringify(meta));for(const language of ['en','zh'])assert.equal(typeof meta.title==='string'?meta.title:meta.title[language],'dsh-Visual-Interactive-Engine');
assert.ok(meta.icon?.startsWith('data:image/svg+xml;base64,'),JSON.stringify(meta));
assert.ok(Buffer.from(meta.icon.split(',')[1],'base64').equals(fs.readFileSync(path.join(root,'package/assets/icon.svg'))));
fs.writeFileSync(path.join(root,'docs/validation/name-runtime.json'),JSON.stringify({version:'0.29.0',package:'dsh-visual-interactive-engine',displayName:'dsh-Visual-Interactive-Engine',reader:'real Harness readPluginMeta',languages:['en','zh'],passed:true,meta},null,2));
console.log('PASS actual Harness metadata reader resolves the exact requested display name in en/zh');
