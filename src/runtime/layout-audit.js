/** Bounded, advisory geometry checks. Never alter content or trigger model requests. */
function inspectFigureLayout(root){
 const warnings=[],labels=[],controls=[],seen=new Set();
 const add=(code,message)=>{if(!seen.has(code)&&warnings.length<4){seen.add(code);warnings.push({code,message});}};
 const intersect=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>3&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>3;
 const visible=element=>{const style=getComputedStyle(element),rect=element.getBoundingClientRect();return style.display!=='none'&&style.visibility!=='hidden'&&Number(style.opacity)!==0&&rect.width>0&&rect.height>0?rect:null;};
 for(const element of [...root.querySelectorAll('svg text,button,input,select')].slice(0,200)){
  const rect=visible(element);if(!rect)continue;
  if(element.localName==='text'){
   if(!element.textContent.trim())continue;
   const svg=element.ownerSVGElement;if(!svg)continue;const box=svg.getBoundingClientRect();
   if(getComputedStyle(svg).overflow!=='visible'&&(rect.left<box.left-2||rect.right>box.right+2||rect.top<box.top-2||rect.bottom>box.bottom+2))add('TEXT_CLIPPED','部分标注可能超出图形边界。');
   if(labels.length<80){if(labels.some(row=>row.svg===svg&&intersect(row.rect,rect)))add('TEXT_OVERLAP','部分标注可能重叠，可展开查看。');labels.push({svg,rect});}
  }else if(controls.length<40){
   if(controls.some(row=>!row.element.contains(element)&&!element.contains(row.element)&&intersect(row.rect,rect)))add('CONTROL_OVERLAP','部分操作控件可能相互遮挡。');
   controls.push({element,rect});
  }
 }
 return warnings;
}
