/** Shared presentation controls; content remains authored by the model. */
function installFigureUI(api){
 const rootOf=value=>{const root=typeof value==='string'?document.querySelector(value):value??document.getElementById('vie-root');if(!root?.append)throw Error('VIE.ui: root not found');return root;};
 const itemsOf=(items,max)=>{if(!Array.isArray(items)||!items.length||items.length>max)throw Error('VIE.ui: invalid item count');const ids=new Set();for(const item of items){if(!item||typeof item.id!=='string'||!item.id||item.id.length>80||ids.has(item.id))throw Error('VIE.ui: item IDs must be unique');ids.add(item.id);}return items;};
 const text=value=>String(value??'').slice(0,160);
 api.ui={
  toolbar(options={}){
   const items=itemsOf(options.items,16),root=rootOf(options.root),element=document.createElement('div'),buttons=new Map();let disposed=false;
   element.className='vie-sdk-toolbar';element.setAttribute('role','group');element.setAttribute('aria-label',text(options.label??'图形操作'));
   const set=(id,patch={})=>{const row=buttons.get(id);if(!row)throw Error('VIE.ui.toolbar: unknown item');if(patch.variant!==undefined){row.button.dataset.vieButton=['primary','secondary','ghost'].includes(patch.variant)?patch.variant:'secondary';}if(patch.label!==undefined)row.button.textContent=text(patch.label);if(patch.disabled!==undefined)row.button.disabled=!!patch.disabled;if(patch.pressed!==undefined)row.button.setAttribute('aria-pressed',String(!!patch.pressed));};
   for(const item of items){if(typeof item.onClick!=='function')throw Error('VIE.ui.toolbar: onClick required');const button=document.createElement('button');button.type='button';button.dataset.vieAction=item.id;buttons.set(item.id,{button,item});set(item.id,{label:item.label??item.id,variant:item.variant??'secondary',disabled:item.disabled,pressed:item.pressed});button.addEventListener('click',()=>{if(!disposed&&!button.disabled)try{item.onClick(api.state);}catch(error){api.reportError(error);}});element.append(button);}
   root.append(element);const dispose=api.onDispose(()=>{disposed=true;buttons.clear();element.remove();});return {element,set,dispose};
  },
  readouts(options={}){
   const items=itemsOf(options.items,24),root=rootOf(options.root),element=document.createElement('dl'),rows=new Map();let disposed=false;
   element.className='vie-sdk-readouts';element.setAttribute('aria-label',text(options.label??'当前读数'));
   const set=(id,patch={})=>{const row=rows.get(id);if(!row)throw Error('VIE.ui.readouts: unknown item');row.config={...row.config,...patch};row.label.textContent=text(row.config.label??id);const value=typeof row.config.value==='function'?row.config.value(api.state):row.config.value;row.value.textContent=text(value??'—')+(row.config.unit?' '+text(row.config.unit):'');};
   for(const item of items){const wrap=document.createElement('div'),label=document.createElement('dt'),value=document.createElement('dd');wrap.append(label,value);element.append(wrap);rows.set(item.id,{config:{...item},label,value});}
   const draw=()=>{if(disposed)return;try{for(const id of rows.keys())set(id);}catch(error){api.reportError(error);}};
   root.append(element);draw();const stop=api.onState(draw,{immediate:false});const dispose=api.onDispose(()=>{disposed=true;stop();rows.clear();element.remove();});return {element,set,dispose};
  }
 };
}
