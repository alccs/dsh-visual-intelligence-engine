import {VERSION} from './version-info.mjs';
/** Named agent-browser session; opaque frames are addressed by observed snapshot refs. */
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';import {pathToFileURL} from 'node:url';
export function browserDriver(name){
 const root=path.resolve(import.meta.dirname,'..'),session='vie-'+name+'-'+process.pid,bin=path.join(root,'node_modules/agent-browser/bin/agent-browser-win32-x64.exe');
 for(const folder of ['docs/validation','screenshots'])fs.mkdirSync(path.join(root,folder),{recursive:true});
 const command=(args,input)=>{const r=spawnSync(bin,['--session',session,'--json',...args],{cwd:root,input,encoding:'utf8',timeout:35000});if(r.status!==0)throw Error(r.stdout+r.stderr);const j=JSON.parse(r.stdout);if(!j.success)throw Error(JSON.stringify(j));return j.data;};
 const run=(...args)=>command(args),ev=code=>command(['eval','--stdin'],code).result;
 const main=()=>run('frame','main');
 const enter=()=>{main();const snap=run('snapshot','-i'),entry=Object.entries(snap.refs??{}).find(([,v])=>v.role?.toLowerCase()==='iframe');if(!entry)throw Error('No iframe in current snapshot');run('frame','@'+entry[0]);return entry[0];};
 const value=data=>Object.hasOwn(data,'value')?data.value:data.attribute??data.html??data.text??data;
 return {root,run,ev,main,enter,value,open(hash=''){run('--executable-path',process.env.VIE_CHROME??'C:/Program Files/Google/Chrome/Application/chrome.exe','--allow-file-access','open',pathToFileURL(path.join(root,("dist/VIE-Interactive-"+VERSION+".html"))).href+'?test='+Date.now()+'#'+hash);run('snapshot','-i');},frames:()=>{main();return ev('(async()=>{await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);return true})()');},close:()=>run('close')};
}
