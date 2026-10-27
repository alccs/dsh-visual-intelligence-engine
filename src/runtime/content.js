/** Content evidence is independent of frame load and script initialization. */
const figureCanvasSamples=new WeakMap();
function inspectFigureContent(root){
 if(!root)return {meaningful:false,kind:'empty'};
 const visible=element=>{
  if(element.closest?.('[data-vie-skeleton],defs,clipPath,mask,pattern,marker,symbol,script,style,template,title,desc'))return false;
  const rect=element.getBoundingClientRect();if(rect.width<=0&&rect.height<=0)return false;
  for(let node=element;node&&node!==root.parentElement;node=node.parentElement){const style=getComputedStyle(node);if(style.display==='none'||style.visibility==='hidden'||Number(style.opacity)===0)return false;}
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
  if(element.namespaceURI==='http://www.w3.org/2000/svg'&&['path','line','polyline','polygon','circle','ellipse','rect'].includes(tag)){
   const style=getComputedStyle(element),fill=style.fill,stroke=style.stroke;
   const rect=element.getBoundingClientRect();
   if(rect.width>0&&rect.height>0&&fill!=='none'&&fill!=='transparent'&&Number(style.fillOpacity)!==0||stroke!=='none'&&stroke!=='transparent'&&Number(style.strokeOpacity)!==0&&parseFloat(style.strokeWidth)>0)return {meaningful:true,kind:'svg'};
  }
  if(['button','input','select','textarea'].includes(tag)&&element.type!=='hidden')return {meaningful:true,kind:'controls'};
  if(!element.closest?.('h1,h2,h3,h4,h5,h6,.vie-learn-heading')&&[...element.childNodes].some(node=>node.nodeType===3&&node.textContent.trim()))return {meaningful:true,kind:'text'};
 }
 return {meaningful:false,kind:canvasPending?'unknown-canvas':'empty'};
}
