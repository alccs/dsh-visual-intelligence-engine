/** Exercise the real Harness host chunk route and browser module resolver together. */
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import assert from 'node:assert/strict';import {createRequire} from 'node:module';import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'..'),runtime=path.join(root,'.validation/runtime'),req=createRequire(path.join(runtime,'package.json'));
let packageDir=path.join(root,'package');
if(process.argv.includes('--installed')){const cli=JSON.parse(fs.readFileSync(path.join(root,'docs/validation/dsh-cli.json'),'utf8'));packageDir=path.join(root,cli.temporaryHome,'profiles/web/node_modules/dsh-visual-interactive-engine');}
const {ClientModuleRegistry}=await import(pathToFileURL(req.resolve('@deepseek-ai/dsh-client-modules')).href);
const id='dsh-visual-interactive-engine',rev='123456789abc',host=Object.create(ClientModuleRegistry.prototype);
host.table=new Map([[id,{entry:{id,rev},meta:{clientPath:path.join(packageDir,'lib/client.js')}}]]);host.responses=new Map();host.previousBatchResponses=new Map();host.readSourceMap=()=>undefined;
let registration;const world=vm.createContext({URL,Map,Set,Promise,console,window:{__ModuleLoader__:{load:value=>{registration=value;}}}});
vm.runInContext(fs.readFileSync(req.resolve('@deepseek-ai/dsh-client-modules/client'),'utf8'),world);
const {ClientModuleSystem}=registration.factory(()=>{throw Error('Unexpected browser dependency');});
const target=world.window.__ModuleLoader__={mode:'queue',pendingQueue:[]};let fetches=0;
const modules=new ClientModuleSystem({manifest:{modules:[{id,rev,url:'/plugins/??'+id+'/client.js&rev='+rev,inject:[],external:[]}],plugins:[]},staticModules:{},bootstrapModule:{id:'test-bootstrap',exports:{}},registrationTarget:target,loadBundle:async url=>{fetches++;const response=await host.bundleResource('GET',url);assert.equal(response.status,200);vm.runInContext(String(response.body),world);}});
target.load({id,factory:require=>({load:()=>require.async('./client.three.js')})});
const main=await modules.import(id);assert.equal(fetches,0,'2D materialization must not fetch Three.js');
const [a,b]=await Promise.all([main.load(),main.load()]);assert.equal(fetches,1);assert.equal(a,b);assert.match(a.source,/WebGLRenderer/);
assert.equal((await host.bundleResource('GET','/plugins/'+id+'/client.three.js?rev=outdated')).status,404);
assert.equal((await host.bundleResource('GET','/plugins/'+id+'/client.node.js?rev='+rev)).status,404);
const report={passed:true,installed:process.argv.includes('--installed'),actualHostRoute:true,actualBrowserResolver:true,initialThreeRequests:0,concurrentThreeRequests:fetches,staleRevisionRejected:true,externalModelRequests:0};
fs.writeFileSync(path.join(root,'docs/validation/client-chunk.json'),JSON.stringify(report,null,2));console.log('PASS actual Harness chunk route, lazy loading, deduplication and revision checks');
