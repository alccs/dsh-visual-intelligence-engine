/** Static streaming DOM only; author JavaScript is activated once at finalization. */
function createFigureContentRuntime(root,config,done) {
  let finalized=!config.preview;
  function content(html,preview) {
    // Parse as a fragment, just like the initial figure root. Document parsing
    // moves leading style/script into <head>, which would discard them below.
    const template=document.createElement('template');template.innerHTML=String(html);const doc=template.content;
    if(preview){
      for(const node of doc.querySelectorAll('script,iframe,frame,object,embed,base,link,meta'))node.remove();
      for(const node of doc.querySelectorAll('*'))for(const attr of [...node.attributes])if(/^on/i.test(attr.name)||['srcdoc','formaction'].includes(attr.name.toLowerCase())||/^(?:javascript|vbscript):/i.test(attr.value.trim()))node.removeAttribute(attr.name);
    }
    if(doc.querySelectorAll('*').length>4000)throw Error('Static preview DOM exceeds limit');
    let count=0;
    const patch=(target,source)=>{
      if(++count>4000)throw Error('Static preview DOM exceeds limit');
      const wanted=[...source.childNodes];
      for(let i=0;i<wanted.length;i++){
        const next=wanted[i];let current=target.childNodes[i];
        if(next.nodeType===1&&next.id&&(!current||current.id!==next.id)){const found=[...target.children].find(c=>c.id===next.id&&c.tagName===next.tagName);if(found){target.insertBefore(found,current??null);current=found;}}
        if(!current||current.nodeType!==next.nodeType||current.nodeName!==next.nodeName||next.nodeType===1&&current.id!==next.id){const clone=document.importNode(next,true);if(current)current.replaceWith(clone);else target.append(clone);continue;}
        if(next.nodeType===1){for(const a of [...current.attributes])if(!next.hasAttribute(a.name))current.removeAttribute(a.name);for(const a of next.attributes)if(current.getAttribute(a.name)!==a.value)current.setAttribute(a.name,a.value);patch(current,next);}
        else if(current.nodeValue!==next.nodeValue)current.nodeValue=next.nodeValue;
      }
      while(target.childNodes.length>wanted.length)target.lastChild.remove();
    };
    patch(root,doc);root.inert=preview;root.dataset.viePreview=String(preview);
  }
  const css=value=>{document.getElementById('vie-user-style').textContent=String(value??'');};
  return {
    update(value){if(finalized)return;css(value.css);content(value.html,true);},
    finalize(value){if(finalized)return;finalized=true;css(value.css);content(value.html,false);
      if(value.library&&!window.THREE){const library=document.createElement('script');library.textContent=value.library;document.head.append(library);}
      // Parsed HTML scripts are inert until explicitly inserted, as on a complete initial load.
      for(const old of root.querySelectorAll('script')){const script=document.createElement('script');for(const a of old.attributes)script.setAttribute(a.name,a.value);script.textContent=old.textContent;old.replaceWith(script);}
      if(value.js){const script=document.createElement('script');script.textContent=String(value.js);document.body.append(script);}
      requestAnimationFrame(()=>done());
    }
  };
}
