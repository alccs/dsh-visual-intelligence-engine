import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const ROOT=fileURLToPath(new URL('..',import.meta.url));
const identifier='(?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*)';
const semver=new RegExp('^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)(?:-'+identifier+'(?:\\.'+identifier+')*)?(?:\\+[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?$');
export function assertVersion(version){if(typeof version!=='string'||!semver.test(version))throw Error('Expected a semantic version, such as 0.30.6 or 0.30.6-dev.1');return version;}
export function readPackage(root=ROOT){return JSON.parse(fs.readFileSync(path.join(root,'package/package.json'),'utf8'));}
export function readVersion(root=ROOT){return assertVersion(readPackage(root).version);}
export const VERSION=readVersion();

