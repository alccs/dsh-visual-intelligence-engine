/** Decode only complete document blocks. Incomplete executable strings never run. */
class DocumentPreview {
  constructor(){this.reset();}
  reset(){this.raw='';this.cursor=0;this.depth=0;this.quoted=false;this.escape=false;this.begin=-1;this.blocks=[];this.array=false;this.closed=false;this.source='';this.pendingDecoder=null;this.pendingStart=-1;this.pendingSignature='';}
  update(raw){
    if(typeof raw!=='string'||new TextEncoder().encode(raw).length>245760)return '';
    if(!raw.startsWith(this.raw))this.reset();
    this.raw=raw;
    if(!this.array){
      const matches=raw.matchAll(/"blocks"\s*:\s*\[/g);let found=false;
      for(const m of matches){
        try{const prefix=raw.slice(0,m.index).trim().replace(/,$/,'');const header=JSON.parse(prefix+'}');if(header.title!==undefined&&typeof header.title!=='string'||Object.keys(header).some(k=>!DOCUMENT_CONTRACT.fields.filter(x=>x!=='blocks').includes(k)))continue;this.header=header;this.title=header.title??'交互图解';this.array=true;this.cursor=m.index+m[0].length;this.depth=2;found=true;break;}catch{}
      }
      if(!found)return '';

    }
    let changed=false;
    for(;this.cursor<raw.length&&!this.closed;this.cursor++){
      const c=raw[this.cursor];
      if(this.quoted){if(this.escape)this.escape=false;else if(c==='\\')this.escape=true;else if(c==='"')this.quoted=false;continue;}
      if(c==='"'){this.quoted=true;continue;}
      if(c==='{'||c==='['){if(this.depth===2&&c==='{')this.begin=this.cursor;this.depth++;}
      else if(c==='}'||c===']'){
        this.depth--;
        if(this.depth===2&&this.begin>=0){
          try{const block=JSON.parse(raw.slice(this.begin,this.cursor+1));validateDocumentSpec({...this.header,blocks:[block]});this.blocks.push(block);changed=true;}catch{this.closed=true;}
          this.begin=-1;
        }
        if(this.depth<2)this.closed=true;
      }
    }
    if(changed){try{this.source=documentSceneSource({...this.header,blocks:this.blocks});this.pendingSignature='';}catch{this.source='';this.closed=true;}}
    // Preview a completed HTML field while its JavaScript is still being generated.
    // The internal marker is never accepted on public document input.
    if(!this.closed&&this.begin>=0){
      if(this.pendingStart!==this.begin){this.pendingStart=this.begin;this.pendingDecoder=new IncrementalToolArguments({fields:['type','title','html','css','state','bindings'],maxRaw:65000,maxValue:32768});}
      const decoder=this.pendingDecoder,fields=decoder.update(raw.slice(this.begin));
      if(!decoder.invalid&&(!fields.type||fields.type==='figure')&&fields.html?.trim()&&!(decoder.inString&&decoder.currentField==='html')){
        try{
          const block={type:'figure',title:fields.title??this.title,html:fields.html,css:decoder.inString&&decoder.currentField==='css'?'':fields.css??'',js:''};
          for(const key of ['state','bindings'])if(fields[key])try{block[key]=JSON.parse(fields[key]);}catch{}
          const signature=JSON.stringify(block);
          if(signature!==this.pendingSignature){const source=documentSceneSource({...this.header,blocks:[...this.blocks,block]}),lines=source.split('\n').filter(Boolean).map(s=>JSON.parse(s));const figures=lines.filter(e=>e.op==='node.put'&&e.type==='GenerativeFigure');figures.at(-1).props.preview=true;this.source=lines.map(e=>JSON.stringify(e)).join('\n')+'\n';this.pendingSignature=signature;}
        }catch{}
      }
    }
    return this.source;
  }
}

function sourceFromArguments(fields,documentPreview){
  if(fields.source)return fields.source;
  if(fields.document!==undefined||fields.spec){
    const specText=fields.document??fields.spec;
    if(!fields.kind){const source=documentPreview.update(specText);if(documentPreview.array)return source;}
    // Avoid reparsing a large unfinished JSON/code string for every token.
    if(!specText.trimEnd().endsWith('}'))return '';
    try{const spec=JSON.parse(specText);return fields.kind?visualSceneSource(fields.kind,spec):spec.blocks?documentSceneSource(spec):storySceneSource(spec);}catch{}
    return '';
  }
  if(fields.preset){try{return makePresetSource(fields.preset);}catch{}}
  if(fields.query&&fields.templateId){try{return buildTemplateScene({templateId:fields.templateId,parameters:fields.parameters?JSON.parse(fields.parameters):{}}).source;}catch{}}
  return '';
}
