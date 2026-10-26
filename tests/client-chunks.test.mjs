import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import {createHash} from 'node:crypto';
const source=fs.readFileSync(new URL('../src/view/three-loader.js',import.meta.url),'utf8');
const loader=asyncLoad=>{const require=Object.assign(()=>{},asyncLoad?{async:asyncLoad}:{}),context=vm.createContext({require,Promise});vm.runInContext(source+';this.load=loadFigureThree;this.needs=needsFigureThree;',context);return context;};
test('Three.js is lazy and concurrent requests share one package-local load',async()=>{
 let requests=0;const c=loader(async path=>{requests++;assert.equal(path,'./client.three.js');return {source:'WebGLRenderer shipped implementation'};});
 assert.equal(requests,0);assert.equal(c.needs({html:'<svg/>',js:''}),false);const [a,b]=await Promise.all([c.load(),c.load()]);assert.equal(a,b);assert.equal(requests,1);await c.load();assert.equal(requests,1);
});
test('failed local loads can be retried and missing host support is explicit',async()=>{
 let requests=0;const c=loader(async()=>{if(++requests===1)throw Error('temporary load failure');return {source:'WebGLRenderer'};});await assert.rejects(c.load(),/temporary/);assert.equal(await c.load(),'WebGLRenderer');assert.equal(requests,2);await assert.rejects(loader().load(),/host cannot load/);
});

test('owner revision changes when the packaged Three.js chunk changes',()=>{
 const client=fs.readFileSync(new URL('../package/lib/client.js',import.meta.url),'utf8'),chunk=fs.readFileSync(new URL('../package/lib/client.three.js',import.meta.url));assert.ok(client.includes('VIE Three chunk SHA256 '+createHash('sha256').update(chunk).digest('hex')));
});
