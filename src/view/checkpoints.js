/** Local, bounded UI recovery. Never changes the Harness journal. */
function createCheckpointRepository(storage){
  const key='vie:checkpoints:v1';let entries=[];
  try{const saved=JSON.parse(storage?.getItem(key)??'[]');if(Array.isArray(saved))entries=saved.filter(x=>x&&typeof x.key==='string'&&x.checkpoint?.format==='vie-checkpoint').slice(-8);}catch{}
  return {
    load(id,source){const value=entries.find(x=>x.key===id)?.checkpoint;return value?.source===source?value:null;},
    save(id,checkpoint){entries=entries.filter(x=>x.key!==id);entries.push({key:id,checkpoint});while(entries.length>8||JSON.stringify(entries).length>1500000)entries.shift();try{storage?.setItem(key,JSON.stringify(entries));return !!storage;}catch{return false;}},
    clear(id){entries=entries.filter(x=>x.key!==id);try{storage?.setItem(key,JSON.stringify(entries));}catch{}}
  };
}
