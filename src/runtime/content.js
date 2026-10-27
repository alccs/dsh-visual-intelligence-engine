/** Content evidence is independent of frame load and script initialization. */
const figureCanvasSamples=new WeakMap();
function inspectFigureContent(root){
 if(!root)return {meaningful:false,kind:'empty'};
 const styles=new WeakMap(),boxes=new WeakMap(),svgNS='http://www.w3.org/2000/svg';
 const styleOf=node=>{if(!styles.has(node))styles.set(node,getComputedStyle(node));return styles.get(node);};
 const boxOf=node=>{if(!boxes.has(node))boxes.set(node,node.getBoundingClientRect());return boxes.get(node);};
 const painted=(color,opacity)=>{
  const value=String(color??'none').trim().toLowerCase();if(['none','transparent',''].includes(value)||parseFloat(opacity)===0)return false;
  const alpha=value.match(/\/\s*([+\-.\de%]+)\s*\)$/i)??(/^(?:rgba|hsla)\(/.test(value)?value.match(/,\s*([+\-.\de%]+)\s*\)$/i):null);
  return !alpha||parseFloat(alpha[1])>0;
 };
 const visible=element=>{
  if(element.closest?.('[data-vie-skeleton],defs,clipPath,mask,pattern,marker,symbol,script,style,template,title,desc'))return false;
  const rect=boxOf(element),ownStyle=styleOf(element),matrix=element.namespaceURI===svgNS?element.getScreenCTM?.():null;
  if(['hidden','collapse'].includes(ownStyle.visibility))return false;
  const scale=matrix?Math.max(Math.hypot(matrix.a,matrix.b),Math.hypot(matrix.c,matrix.d)):1;
  const pad=element.namespaceURI===svgNS&&painted(ownStyle.stroke,ownStyle.strokeOpacity)?Math.max(0,parseFloat(ownStyle.strokeWidth)||0)*scale/2:0;
  if(rect.width+pad*2<=0||rect.height+pad*2<=0)return false;
  let left=rect.left-pad,right=rect.right+pad,top=rect.top-pad,bottom=rect.bottom+pad;
  for(let node=element;node&&node!==root.parentElement;node=node.parentElement){
   const style=styleOf(node);if(style.display==='none'||parseFloat(style.opacity)===0)return false;
   if(node===element||node.namespaceURI===svgNS&&!['svg','foreignObject'].includes(node.localName))continue;
   const clipX=['hidden','clip','auto','scroll'].includes(style.overflowX??style.overflow),clipY=['hidden','clip','auto','scroll'].includes(style.overflowY??style.overflow);
   if(clipX||clipY){const box=boxOf(node);if(clipX){left=Math.max(left,box.left);right=Math.min(right,box.right);}if(clipY){top=Math.max(top,box.top);bottom=Math.min(bottom,box.bottom);}if(right<=left||bottom<=top)return false;}
  }
  return true;
 };
 let canvasPending=false;
 for(const element of [root,...root.querySelectorAll('*')].slice(0,800)){
  if(!visible(element))continue;
  const tag=element.localName;
  if(tag==='canvas'){
   if(element.dataset.vieContentReady==='true')return {meaningful:true,kind:'canvas',evidence:'author-confirmed'};
   if(element.dataset.vie3dRendered==='true'&&Number(element.dataset.vie3dDrawCalls)>0)return {meaningful:true,kind:'canvas',evidence:'sdk-webgl-draw'};
   canvasPending=true;
   try{
    let sample=figureCanvasSamples.get(element);if(!sample){const canvas=document.createElement('canvas');canvas.width=canvas.height=32;const context=canvas.getContext('2d',{willReadFrequently:true});sample={canvas,context};figureCanvasSamples.set(element,sample);}
    if(sample.context&&element.width&&element.height){sample.context.clearRect(0,0,32,32);sample.context.drawImage(element,0,0,32,32);const pixels=sample.context.getImageData(0,0,32,32).data;for(let i=3;i<pixels.length;i+=4)if(pixels[i])return {meaningful:true,kind:'canvas',evidence:'sampled-pixels'};}
   }catch{/* Unreadable buffers remain unknown; never claim successful drawing. */}
   continue;
  }
  if(tag==='img'&&element.complete&&element.naturalWidth>0)return {meaningful:true,kind:'image'};
  if(element.namespaceURI===svgNS){
   const style=styleOf(element),rect=boxOf(element),text=['text','tspan'].includes(tag);
   if(['path','line','polyline','polygon','circle','ellipse','rect','text','tspan'].includes(tag)&&(!text||element.textContent?.trim())&&(
    rect.width>0&&rect.height>0&&painted(style.fill,style.fillOpacity)||
    painted(style.stroke,style.strokeOpacity)&&parseFloat(style.strokeWidth)>0
   ))return {meaningful:true,kind:'svg'};
   // SVG container/label text is not ordinary HTML text when its paint is invisible.
   continue;
  }
  if(['button','input','select','textarea'].includes(tag)&&element.type!=='hidden')return {meaningful:true,kind:'controls'};
  if(!element.closest?.('h1,h2,h3,h4,h5,h6,.vie-learn-heading')&&[...element.childNodes].some(node=>node.nodeType===3&&node.textContent.trim()))return {meaningful:true,kind:'text'};
 }
 return {meaningful:false,kind:canvasPending?'unknown-canvas':'empty'};
}
