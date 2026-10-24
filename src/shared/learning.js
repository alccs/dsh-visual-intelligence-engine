/** Topic-neutral learning data. Never execute authored JavaScript on the Host. */
function validateLearningDefinition(input,withRoot=false){
 const fail=message=>{throw Error('VIE_LEARNING_INVALID: '+message);};
 const object=(v,path,keys)=>{if(!v||typeof v!=='object'||Array.isArray(v))fail(path+' must be an object');for(const k of Object.keys(v))if(!keys.includes(k))fail(path+'.'+k+' is unknown');};
 const text=(v,path,max=1000)=>{if(typeof v!=='string'||v.length>max)fail(path+' must be text (max '+max+')');return v;};
 const requiredText=(v,path,max=1000)=>{const s=text(v,path,max);if(!s.trim())fail(path+' must not be blank');return s;};
 object(input,'learning',['type','title','key','legend','note','stages','quiz','questions',...(withRoot?['root']:[])]);
 const out={title:requiredText(input.title??'交互演示','title',100),key:input.key??'learning'};
 if(typeof out.key!=='string'||!/^[a-zA-Z][\w-]{0,30}$/.test(out.key)||['__proto__','constructor','prototype'].includes(out.key))fail('key is invalid');
 for(const k of ['legend','note'])if(input[k]!==undefined)out[k]=text(input[k],k);
 const stages=input.stages??[];if(!Array.isArray(stages)||stages.length>8)fail('stages needs 0–8 entries');
 out.stages=stages.map((s,i)=>{const p='stages['+i+']';object(s,p,['label','title','caption','html','mobileHtml']);const v={label:requiredText(s.label??String(i+1),p+'.label',80),html:requiredText(s.html,p+'.html',16000)};for(const k of ['title','caption','mobileHtml'])if(s[k]!==undefined)v[k]=k==='mobileHtml'?requiredText(s[k],p+'.'+k,16000):text(s[k],p+'.'+k);return v;});
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
