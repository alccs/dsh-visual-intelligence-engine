/** Trusted SVG rasterization only. Model scripts are never executed on Host. */
import {readFile} from 'node:fs/promises';
import UPNG from './resvg/upng.cjs';
import {createHash} from 'node:crypto';
let ready;
const cache=new Map();
async function renderer(){
  if(!ready)ready=(async()=>{const m=await import('./resvg/index.mjs');await m.initWasm(await readFile(new URL('./resvg/index_bg.wasm',import.meta.url)));const fonts=[];
    for(const p of process.platform==='win32'?['C:/Windows/Fonts/msyh.ttc']:['/system/fonts/NotoSansCJK-Regular.ttc','/system/fonts/NotoSansCJK-VF.ttc','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'])try{const bytes=await readFile(p);if(bytes.length<40*1024*1024){fonts.push(bytes);break;}}catch{}
    return {Resvg:m.Resvg,fonts};})();return ready;
}
const colors={'--vie-primary':'#4d82d6','--vie-secondary':'#149f91','--vie-accent':'#d58b16','--vie-muted':'#64748b','--vie-warning':'#cf6854','--vie-bg':'#ffffff','--vie-text':'#263548','--vie-stroke':'#d1dae5','--scene-sun':'#e89913','--scene-ring':'#5686ed','--scene-planet':'#08a594','--scene-carrier':'#a179db'};
export async function renderVIEPreview(svgs){
  if(!svgs.length)return [];
  const {Resvg,fonts}=await renderer(),images=[];
  for(const raw of svgs.slice(0,4)){
    const box=raw.match(/\bviewBox=["']([^"']+)["']/i)?.[1].trim().split(/[\s,]+/).map(Number);
    if(!box||box.length!==4||box.some(n=>!Number.isFinite(n))||box[2]<=0||box[3]<=0||box[2]/box[3]<0.25||box[2]/box[3]>4)continue;
    // No SVG external resources, authored CSS imports, scripts or foreign HTML.
    if(typeof raw!=='string'||raw.length>240000||/<(?:script|foreignObject|image|feImage)\b|<!DOCTYPE|<!ENTITY|@import|(?:href\s*=\s*["']\s*(?!#))|url\(\s*["']?(?!#)/i.test(raw))continue;
    let svg=raw.replace(/\sdata-[\w-]+(?:=(?:"[^"]*"|'[^']*'))?/g,'').replace(/var\((--[\w-]+)(?:,([^)]*))?\)/g,(_,k,f)=>colors[k]??f??'#64748b').replace(/color-mix\([^)]*\)/g,'#eaf0f7');
    if(!/\bxmlns=/.test(svg.slice(0,svg.indexOf('>'))))svg=svg.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"');
    const hash=createHash('sha256').update(svg).digest('hex'),budget=Math.floor(6800/Math.min(svgs.length,4));
    let uri=cache.get(hash+':'+budget);
    if(!uri){let r;try{r=new Resvg(svg,{background:'#ffffff',fitTo:{mode:'width',value:480},font:{fontBuffers:fonts,defaultFontFamily:'Microsoft YaHei'}});const pixels=r.render();try{const rgba=pixels.pixels,bytes=rgba.buffer.slice(rgba.byteOffset,rgba.byteOffset+rgba.byteLength);for(const colors of [64,32,16,8]){const png=Buffer.from(UPNG.encode([bytes],pixels.width,pixels.height,colors));const value='data:image/png;base64,'+png.toString('base64');if(value.length<=budget){uri=value;break;}}}finally{pixels.free();}}finally{r?.free();}}
    if(!uri)continue;cache.set(hash+':'+budget,uri);while(cache.size>16)cache.delete(cache.keys().next().value);
    images.push({type:'image',src:uri,alt:'图形初始状态',caption:'初始状态 · 完整交互在 VIE 图解'});
  }return images;
}
