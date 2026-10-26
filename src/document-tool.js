/** Per-agent, bounded repair baselines. Durable results always contain a full scene. */
let VIE_BASELINE_STORAGE=null;
function createDocumentExecutor(){
  const agents=new WeakMap(),unscoped=new Map(),namespace=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);let sequence=0;
  const cache=exec=>{if(!exec?.agent)return unscoped;let value=agents.get(exec.agent);if(!value){value=new Map();const session=exec.agent?.session?.id;if(session&&VIE_BASELINE_STORAGE)try{for(const [id,entry] of VIE_BASELINE_STORAGE.load(session))value.set(id,entry);}catch{}agents.set(exec.agent,value);}return value;};
  const save=(store,id,value)=>{store.delete(id);store.set(id,value);while(store.size>4)store.delete(store.keys().next().value);};
  return async(args,exec)=>{
    const store=cache(exec);let candidate,id,revision=1,display,anchorCallId=exec?.callId;
    try{
      display=appearance(args);
      if(args.changes!==undefined){
        if(args.document!==undefined||args.spec!==undefined)throw Error('Choose a document OR changes');
        const base=store.get(args.visualId);if(!base)throw Error('REPAIR_BASE_MISSING: baseline expired or belongs to another agent; submit document');
        if(args.baseRevision!==base.revision)throw Error('STALE_REVISION: use baseRevision '+base.revision);
        if(!Array.isArray(args.changes)||args.changes.length<1||args.changes.length>12)throw Error('Changes require 1..12 block replacements');
        candidate=normalizeLearningDocumentAlias(JSON.parse(JSON.stringify(base.document)));id=args.visualId;revision=base.revision+1;display=appearance({...base.display,...args});anchorCallId=base.anchorCallId??anchorCallId;
        const seen=new Set();
        for(const change of args.changes){
          if(!change||Object.keys(change).some(k=>!['index','block'].includes(k))||!Number.isInteger(change.index)||change.index<0||change.index>=candidate.blocks.length||seen.has(change.index)||!change.block)throw Error('Each change needs a unique existing zero-based index and block');
          seen.add(change.index);candidate.blocks[change.index]=change.block;
        }
      }else{
        if((args.document!==undefined)===(args.spec!==undefined))throw Error('Provide exactly one document object or legacy spec string');
        if(args.document!==undefined)candidate=args.document;
        else{if(typeof args.spec!=='string'||new TextEncoder().encode(args.spec).length>245760)throw Error('Invalid/oversized document spec');candidate=JSON.parse(args.spec);}
        id='visual-'+namespace+'-'+(++sequence);
      }
      if(new TextEncoder().encode(JSON.stringify(candidate)).length>245760)throw Error('Visual document exceeds 240KB');
      candidate=normalizeLearningDocumentAlias(candidate);
      const document=validateDocumentSpec(candidate);
      if(candidate.caption!==undefined)display=appearance({...args,caption:args.caption!==undefined?args.caption:candidate.caption});
      for(let i=0;i<document.blocks.length;i++)if(document.blocks[i].type==='figure'&&document.blocks[i].js)try{new VIEJavaScriptParser(document.blocks[i].js);validateSDKCalls(document.blocks[i].js);}catch(error){error.path='blocks['+i+'].js';error.message=error.path+(error.code?': SDK arguments: ':': JavaScript syntax: ')+error.message;throw error;}
      const source=documentSceneSource(document),parser=new VIEStream();parser.push(source);parser.finish();const snap=parser.snapshot();
      if(!snap.complete||snap.errors.length)throw Error(snap.errors[0]??'Incomplete scene');
      save(store,id,{document,revision,display,anchorCallId});
      if(exec?.agent?.session?.id&&VIE_BASELINE_STORAGE)try{VIE_BASELINE_STORAGE.save(exec.agent.session.id,[...store]);}catch{}
      return {note:'图形结构、脚本语法与可确定的SDK参数已校验，已提交视图；浏览器运行尚待确认，不能仅据此声称渲染成功。visualId='+id+'，revision='+revision+'。现在在Harness正文解释此图；还需另一概念图可继续调用，再紧跟对应正文，不要求more:true。每张图只表达当前概念，勿把各章节拼在一个SVG。visualId仅用于局部修改，不能写成图片链接。',meta:{kind:'vie',mode:'document',title:document.title,source,valid:true,visualUnits:documentVisualUnits(document),renderStatus:'submitted',validationScope:'schema-and-script',visualId:id,revision,...display,...anchorCallId?{anchorCallId:String(anchorCallId)}:{}}};
    }catch(error){
      // A parseable invalid draft can be repaired by replacing its failing block.
      // A failed patch never advances or overwrites its validated baseline.
      if(args.changes===undefined&&candidate&&id&&Array.isArray(candidate.blocks)&&candidate.blocks.length<=12&&new TextEncoder().encode(JSON.stringify(candidate)).length<=245760)save(store,id,{document:JSON.parse(JSON.stringify(candidate)),revision,display:display??{},anchorCallId});
      const savedId=id??args.visualId,saved=savedId&&store.get(savedId),repair=saved?{visualId:savedId,revision:saved.revision}:{};
      const message=String(error.message),errorPath=error.path??'$',errorCode=error.code?.startsWith('VIE_')?error.code:message.includes('VIE_LEARNING_INVALID')?'VIE_LEARNING_INVALID':message.includes('STALE_REVISION')?'VIE_STALE_REVISION':message.includes('REPAIR_BASE_MISSING')?'VIE_BASE_MISSING':/JavaScript syntax/.test(message)?'VIE_SCRIPT_SYNTAX':error instanceof SyntaxError?'VIE_JSON_SYNTAX':'VIE_INVALID_DOCUMENT';
      const learningHint='Use one learning block with title and stages/questions. If document.type is "learning", every block must be a stage object with html; type belongs on the learning block in the canonical form.';
      const rootLearningError=errorCode==='VIE_LEARNING_INVALID'&&errorPath==='$';
      const repairHint=errorCode==='VIE_STALE_REVISION'?'Use the latest baseRevision from this result; do not overwrite with a stale draft.':errorCode==='VIE_BASE_MISSING'?'Submit the complete document once to create a baseline.':rootLearningError?'Submit a complete canonical document; this root structure cannot be repaired by replacing a single block. '+learningHint:saved?'Replace only the block at '+errorPath+' using visualId, baseRevision and changes. Keep successful blocks.'+(errorCode==='VIE_LEARNING_INVALID'?' '+learningHint:''):'Submit a native document object with blocks; avoid JSON-inside-JSON escaping.';
      return {note:'主图未提交：参数或结构无效，并非浏览器渲染失败。'+message+(saved?'。保留草稿 '+savedId+' revision='+saved.revision+(rootLearningError?'；根结构不明确，请重新提交完整document。':'；只替换出错块，不必重写其余图。'):'。请使用原生document对象，避免嵌套JSON转义。'),meta:{kind:'vie',mode:'document',source:'',valid:false,visualUnits:documentVisualUnits(saved?.document??candidate),error:message,errorCode,errorPath,repairHint,...repair,...display,...(saved?.anchorCallId??anchorCallId)?{anchorCallId:String(saved?.anchorCallId??anchorCallId)}:{}}};
    }
  };
}
