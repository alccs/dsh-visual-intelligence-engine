import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
/** Cover source, the complete runtime package and the browser-tested demo. */
export function verificationHash(root){
 const walk=dir=>fs.readdirSync(path.join(root,dir),{withFileTypes:true}).filter(e=>e.name!=='node_modules').flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name]);
 const files=[...['src','scripts','tests','package'].flatMap(walk),'package.json','package-lock.json'];
 const version=JSON.parse(fs.readFileSync(path.join(root,'package/package.json'),'utf8')).version,demo='dist/VIE-Interactive-'+version+'.html';if(fs.existsSync(path.join(root,demo)))files.push(demo);if(fs.existsSync(path.join(root,'dist/index.html')))files.push('dist/index.html');
 const hash=crypto.createHash('sha256');for(const file of files.sort()){hash.update(file+'\0');hash.update(fs.readFileSync(path.join(root,file)));}return hash.digest('hex');
}
