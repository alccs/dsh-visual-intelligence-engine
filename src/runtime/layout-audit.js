/** Bounded, advisory geometry checks. Never alter content or trigger model requests. */
function inspectFigureLayout(root){
 const warnings=[],labels=[],controls=[],seen=new Set();
 const describe=(element,rect,box,index)=>({id:(element.id||element.closest?.('[data-vie-object]')?.dataset.vieObject||element.localName+'-'+index).slice(0,80),kind:element.localName,text:element.textContent?.trim().slice(0,60),bounds:{x:rect.left-box.left,y:rect.top-box.top,width:rect.width,height:rect.height}});
 const add=(code,message,target,box,related)=>{const key=code+':'+target.id;if(!seen.has(key)&&warnings.length<4){seen.add(key);warnings.push({code,message,target,viewport:{width:box.width,height:box.height},...(related?{related}:{}),coordinateSpace:'viewport-px'});}};
 const intersect=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>3&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>3;
 const visible=element=>{const style=getComputedStyle(element),rect=element.getBoundingClientRect();return style.display!=='none'&&style.visibility!=='hidden'&&Number(style.opacity)!==0&&rect.width>0&&rect.height>0?rect:null;};
 let index=0;for(const element of [...root.querySelectorAll('svg text,button,input,select')].slice(0,200)){
  index++;
  const rect=visible(element);if(!rect)continue;
  if(element.localName==='text'){
   if(!element.textContent.trim())continue;
   const svg=element.ownerSVGElement;if(!svg)continue;const box=svg.getBoundingClientRect(),target=describe(element,rect,box,index);
   if(getComputedStyle(svg).overflow!=='visible'&&(rect.left<box.left-2||rect.right>box.right+2||rect.top<box.top-2||rect.bottom>box.bottom+2))add('TEXT_CLIPPED','部分标注可能超出图形边界。',target,box);
   if(labels.length<80){const overlap=labels.find(row=>row.svg===svg&&intersect(row.rect,rect));if(overlap)add('TEXT_OVERLAP','部分标注可能重叠，可展开查看。',target,box,overlap.target);labels.push({svg,rect,target});}
  }else if(controls.length<40){
   const box=root.getBoundingClientRect(),target=describe(element,rect,box,index),overlap=controls.find(row=>!row.element.contains(element)&&!element.contains(row.element)&&intersect(row.rect,rect));
   if(overlap)add('CONTROL_OVERLAP','部分操作控件可能相互遮挡。',target,box,overlap.target);
   controls.push({element,rect,target});
  }
 }
 return warnings;
}
