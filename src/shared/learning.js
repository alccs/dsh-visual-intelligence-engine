/** Topic-neutral learning data. Never execute authored JavaScript on the Host. */
function validateLearningDefinition(input,withRoot=false){
 const fail=message=>{throw Error('VIE_LEARNING_INVALID: '+message);};
 const object=(v,path,keys)=>{if(!v||typeof v!=='object'||Array.isArray(v))fail(path+' must be an object');for(const k of Object.keys(v))if(!keys.includes(k))fail(path+'.'+k+' is unknown');};
 const text=(v,path,max=1000)=>{if(typeof v!=='string'||v.length>max)fail(path+' must be text (max '+max+')');return v;};
 const requiredText=(v,path,max=1000)=>{const s=text(v,path,max);if(!s.trim())fail(path+' must not be blank');return s;};
 object(input,'learning',['type','title','key','legend','note','stages','quiz','questions','baseHtml','baseMobileHtml','readouts',...(withRoot?['root']:[])]);
 const out={title:requiredText(input.title??'交互演示','title',100),key:input.key??'learning'};
 if(typeof out.key!=='string'||!/^[a-zA-Z][\w-]{0,30}$/.test(out.key)||['__proto__','constructor','prototype'].includes(out.key))fail('key is invalid');
 for(const k of ['legend','note'])if(input[k]!==undefined)out[k]=text(input[k],k);
 const stages=input.stages??[];if(!Array.isArray(stages)||stages.length>8)fail('stages needs 0–8 entries');
 const shared=input.baseHtml!==undefined,idPattern=/^[A-Za-z_][\w.:-]{0,79}$/;
 const unsafeURL=value=>[...String(value).matchAll(/url\(([^)]*)\)/gi)].some(match=>!/^#[A-Za-z_][\w.:-]*$/.test(match[1].trim().replace(/^(['"])(.*)\1$/,'$2')));
 const svgIds=(html,path)=>{
  requiredText(html,path,20000);
  if(!/^\s*<svg\b[\s\S]*(?:<\/svg>|\/>)\s*$/i.test(html)||(html.match(/<svg\b/gi)??[]).length!==1||/<(?:script|style|foreignObject|iframe|object|embed|audio|video|animate|animateMotion|animateTransform|set)\b|\son[a-z]+\s*=/i.test(html)||[...html.matchAll(/\b(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)].some(m=>!/^#[A-Za-z_][\w.:-]*$/.test(m[1]??m[2]??m[3]))||unsafeURL(html))fail(path+' must be one static SVG with local references only');
  const ids=new Map();for(const match of html.matchAll(/<([A-Za-z][\w:-]*)\b([^>]*)>/g)){const id=match[2].match(/(?:^|\s)id\s*=\s*(?:"([^"]*)"|'([^']*)')/);if(id){const key=id[1]??id[2];if(!idPattern.test(key)||ids.has(key))fail(path+' has an invalid or duplicate id: '+key);ids.set(key,match[1].toLowerCase());}}return ids;
 };
 let baseIds,mobileIds;
 if(shared){if(!stages.length)fail('baseHtml requires stages');out.baseHtml=requiredText(input.baseHtml,'baseHtml',20000);baseIds=svgIds(out.baseHtml,'baseHtml');if(input.baseMobileHtml!==undefined){out.baseMobileHtml=requiredText(input.baseMobileHtml,'baseMobileHtml',20000);mobileIds=svgIds(out.baseMobileHtml,'baseMobileHtml');}}
 else if(input.baseMobileHtml!==undefined)fail('baseMobileHtml requires baseHtml');
 const readoutIds=new Set();
 if(input.readouts!==undefined){if(!stages.length||!Array.isArray(input.readouts)||input.readouts.length>8)fail('readouts needs stages and at most 8 entries');out.readouts=input.readouts.map((item,i)=>{const p='readouts['+i+']';object(item,p,['id','label','unit']);if(typeof item.id!=='string'||!idPattern.test(item.id)||readoutIds.has(item.id)||['__proto__','constructor','prototype'].includes(item.id))fail(p+'.id is invalid or duplicated');readoutIds.add(item.id);return {id:item.id,label:requiredText(item.label,p+'.label',80),...(item.unit!==undefined?{unit:text(item.unit,p+'.unit',40)}:{})};});}
 const attributes=new Set(['x','y','x1','y1','x2','y2','cx','cy','r','rx','ry','width','height','d','points','transform','fill','stroke','stroke-width','opacity','fill-opacity','stroke-opacity','visibility','text-anchor','font-size','font-weight']);
 out.stages=stages.map((s,i)=>{
  const p='stages['+i+']';object(s,p,['label','title','caption','html','mobileHtml','patches','values']);const v={label:requiredText(s.label??String(i+1),p+'.label',80)};
  for(const k of ['title','caption'])if(s[k]!==undefined)v[k]=text(s[k],p+'.'+k);
  if(shared){
   if(s.html!==undefined||s.mobileHtml!==undefined)fail(p+' cannot mix shared baseHtml with stage HTML');
   const patches=s.patches??[];if(!Array.isArray(patches)||patches.length>80)fail(p+'.patches needs at most 80 entries');
   v.patches=patches.map((patch,j)=>{const at=p+'.patches['+j+']';object(patch,at,['target','attrs','text','visible']);if(!baseIds.has(patch.target)||mobileIds&&!mobileIds.has(patch.target))fail(at+'.target must name an id in every base SVG');const clean={target:patch.target};
    if(patch.attrs!==undefined){object(patch.attrs,at+'.attrs',[...attributes]);clean.attrs={};for(const [name,value]of Object.entries(patch.attrs)){if(!(typeof value==='number'&&Number.isFinite(value)||typeof value==='string'&&value.length<=8192)||unsafeURL(value)||/javascript:|expression\(/i.test(String(value)))fail(at+'.attrs.'+name+' is invalid');clean.attrs[name]=value;}}
    if(patch.text!==undefined){if(!['text','tspan','title','desc'].includes(baseIds.get(patch.target))||mobileIds&&!['text','tspan','title','desc'].includes(mobileIds.get(patch.target)))fail(at+'.text requires an SVG text element');clean.text=text(patch.text,at+'.text',160);}
    if(patch.visible!==undefined){if(typeof patch.visible!=='boolean')fail(at+'.visible must be boolean');clean.visible=patch.visible;}
    return clean;
   });
  }else{if(s.patches!==undefined)fail(p+'.patches requires baseHtml');v.html=requiredText(s.html,p+'.html',16000);if(s.mobileHtml!==undefined)v.mobileHtml=requiredText(s.mobileHtml,p+'.mobileHtml',16000);}
  if(s.values!==undefined){object(s.values,p+'.values',[...readoutIds]);v.values={};for(const [name,value]of Object.entries(s.values)){if(!(typeof value==='number'&&Number.isFinite(value)||typeof value==='boolean'||typeof value==='string'&&value.length<=120))fail(p+'.values.'+name+' must be a small primitive');v.values[name]=value;}}
  return v;
 });
 if(input.quiz!==undefined){const q=input.quiz;object(q,'quiz',['question','options','correct']);if(!Array.isArray(q.options)||q.options.length<2||q.options.length>6)fail('quiz.options needs 2–6 entries');if(!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.options.length)fail('quiz.correct must be a zero-based option index; do not infer an answer from feedback');out.quiz={question:requiredText(q.question,'quiz.question'),correct:q.correct,options:q.options.map((o,i)=>{object(o,'quiz.options['+i+']',['label','feedback']);return {label:requiredText(o.label,'quiz.options['+i+'].label'),...(o.feedback!==undefined?{feedback:text(o.feedback,'quiz.options['+i+'].feedback')}:{})};})};}
 if(input.questions!==undefined){
  if(input.quiz!==undefined||stages.length)fail('questions cannot be mixed with quiz or stages');
  if(!Array.isArray(input.questions)||input.questions.length<1||input.questions.length>32)fail('questions needs 1–32 entries');
  out.questions=input.questions.map((q,i)=>{object(q,'questions['+i+']',['title','question','options','correct','explanation']);const {title,explanation,...quiz}=q;let clean;try{clean=validateLearningDefinition({quiz}).quiz;}catch(e){fail('questions['+i+']: '+e.message);}return {...clean,...(title!==undefined?{title:requiredText(title,'questions['+i+'].title',100)}:{}),...(explanation!==undefined?{explanation:text(explanation,'questions['+i+'].explanation',2000)}:{})};});
 }
 if(!out.stages.length&&!out.quiz&&!out.questions)fail('stages, quiz or questions is required');
 if(new TextEncoder().encode(JSON.stringify(out)).length>40000)fail('learning data exceeds 40KB');
 return out;
}
/** Narrow static preflight for literal SDK calls. Strings/comments are skipped;
 * dynamic JS remains subject to sandbox runtime validation, never Host eval. */
function validateLearningCalls(js){
 if(!js.includes('mountLearning'))return;
 const t=[];let i=0;
 while(i<js.length){const c=js[i];if(/\s/.test(c)){i++;continue;}if(js.startsWith('//',i)){i=js.indexOf('\n',i);if(i<0)break;continue;}if(js.startsWith('/*',i)){const end=js.indexOf('*/',i+2);i=end<0?js.length:end+2;continue;}
  // Regex/division and template interpolation require a complete JS parser.
  // Defer those scripts to the sandbox instead of guessing their meaning.
  if(c==='/'||c==='`')return;
  if(c==='"'||c==="'"){const quote=c;let value='',escaped=false;i++;while(i<js.length){const ch=js[i++];if(ch==='\\'){escaped=true;i++;continue;}if(ch===quote)break;value+=ch;}t.push({v:value,string:true,escaped});continue;}
  const word=js.slice(i).match(/^[A-Za-z_$][\w$]*/);if(word){t.push({v:word[0]});i+=word[0].length;}else{t.push({v:c});i++;}
 }
 const is=(n,v)=>t[n]?.v===v&&!t[n]?.string;
 const endOf=start=>{let depth=0;for(let n=start;n<t.length;n++){if(is(n,'{')||is(n,'[')||is(n,'('))depth++;if(is(n,'}')||is(n,']')||is(n,')'))if(--depth===0)return n;}return t.length;};
 const property=(start,end,key)=>{for(let n=start+1;n<end;n++){if(t[n].v===key&&is(n+1,':'))return n+2;if(is(n,'{')||is(n,'[')||is(n,'('))n=endOf(n);}return -1;};
 const staticKeys=(start,end)=>{let n=start+1;while(n<end){if(t[n].escaped||(!t[n].string&&!/^[A-Za-z_$][\w$]*$/.test(t[n].v))||!is(n+1,':'))return false;n+=2;while(n<end&&!is(n,',')){if(is(n,'{')||is(n,'[')||is(n,'('))n=endOf(n);n++;}n++;}return true;};
 for(let n=0;n<t.length-4;n++)if(is(n,'VIE')&&is(n+1,'.')&&is(n+2,'mountLearning')&&is(n+3,'(')&&is(n+4,'{')){const end=endOf(n+4),quiz=property(n+4,end,'quiz');if(staticKeys(n+4,end)&&quiz>=0&&is(quiz,'{')&&staticKeys(quiz,endOf(quiz))&&property(quiz,endOf(quiz),'correct')<0)throw Error('VIE_LEARNING_INVALID: quiz.correct is required (zero-based option index). Prefer a document block with type:"learning" for full data validation.');n=end;}
}

/** Multiple legacy quiz-only blocks are one exercise, not separate diagrams. */
function isLearningQuestionGroup(blocks){return Array.isArray(blocks)&&blocks.length>1&&blocks.every(b=>b&&b.type==='learning'&&b.quiz&&Object.keys(b).every(k=>['type','title','key','quiz'].includes(k)));}
