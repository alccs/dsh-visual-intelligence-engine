/** Runs inside the opaque figure. Topic-neutral stages and local understanding checks. */
function mountLearning(options){
  options={...validateLearningDefinition(options,true),root:options.root};
  const root=typeof options.root==='string'?document.querySelector(options.root):options.root;
  if(!root)throw Error('Learning root not found');
  if(options.questions)return mountQuestionSet(root,options);
  const stages=options.stages??[],quiz=options.quiz,key=options.key??'learning';
  if(!/^[a-zA-Z][\w-]{0,30}$/.test(key)||!Array.isArray(stages)||stages.length>8||(!stages.length&&!quiz))throw Error('Invalid learning configuration');
  if(quiz&&(!Array.isArray(quiz.options)||quiz.options.length<2||quiz.options.length>6||!Number.isInteger(quiz.correct)||quiz.correct<0||quiz.correct>=quiz.options.length))throw Error('Invalid learning quiz');
  const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e;};
  const card=el('section','vie-learn'),heading=el('header','vie-learn-heading'),title=el('strong','',options.title??'交互演示');if(options.title!==VIE.title)heading.append(title);
  if(options.legend)heading.append(el('small','',options.legend));if(heading.childNodes.length)card.append(heading);
  let stageIndex=0,answer=-1;
  const saved=()=>{const v=VIE.state[key]??{};stageIndex=Number.isInteger(v.stage)&&v.stage>=0&&v.stage<stages.length?v.stage:0;answer=Number.isInteger(v.answer)&&v.answer>=0&&v.answer<(quiz?.options.length??0)?v.answer:-1;};saved();
  const commit=()=>VIE.setState({...VIE.state,[key]:{stage:stageIndex,answer}});
  let panel,tabs,description,caption;
  if(stages.length){
    panel=el('div','vie-learn-panel');panel.id='vie-learning-panel-'+key;panel.setAttribute('role','tabpanel');panel.tabIndex=0;
    tabs=el('div','vie-learn-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',options.title??'学习阶段');
    stages.forEach((stage,i)=>{const b=el('button','',stage.label??String(i+1));b.type='button';b.id='vie-learning-tab-'+key+'-'+i;b.setAttribute('role','tab');b.setAttribute('aria-controls',panel.id);b.onclick=()=>{stageIndex=i;draw();commit();};tabs.append(b);});
    tabs.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?stages.length-1:(stageIndex+(e.key==='ArrowRight'?1:stages.length-1))%stages.length;tabs.children[next].click();tabs.children[next].focus();};
    description=el('div','vie-learn-description');description.setAttribute('aria-live','polite');caption=el('p');description.append(el('strong'),caption);card.append(panel,tabs,description);
  }
  if(options.note)card.append(el('small','vie-learn-note',options.note));
  let choices,feedback;
  if(quiz){
    const field=el('fieldset','vie-learn-quiz');field.append(el('legend','',quiz.question));choices=el('div','vie-learn-choices');
    quiz.options.forEach((choice,i)=>{const label=el('label'),input=el('input');input.type='radio';input.name='vie-learning-quiz-'+key;input.value=String(i);input.onchange=()=>{answer=i;draw();commit();};label.append(input,el('span','',choice.label));choices.append(label);});
    feedback=el('div','vie-learn-feedback');feedback.setAttribute('role','status');field.append(choices,feedback);card.append(field);
  }
  function draw(){
    if(panel){const stage=stages[stageIndex];panel.innerHTML=String(root.clientWidth<440?(stage.mobileHtml??stage.html??''):(stage.html??''));panel.setAttribute('aria-labelledby',tabs.children[stageIndex].id);[...tabs.children].forEach((b,i)=>{b.setAttribute('aria-selected',String(i===stageIndex));b.tabIndex=i===stageIndex?0:-1;});description.firstChild.textContent=stage.title??stage.label??'';caption.textContent=stage.caption??'';}
    if(choices){[...choices.querySelectorAll('input')].forEach((input,i)=>{input.checked=i===answer;});feedback.hidden=answer<0;feedback.dataset.correct=String(answer===quiz.correct);feedback.textContent=answer<0?'':(answer===quiz.correct?'回答正确。':'再想一想。')+(quiz.options[answer].feedback??'');}
  }
  const restore=()=>{saved();draw();};window.addEventListener('vie:statechange',restore);root.replaceChildren(card);draw();
  let width=root.clientWidth;const resize=new ResizeObserver(()=>{if(root.clientWidth!==width){width=root.clientWidth;draw();}});resize.observe(root);
  return {dispose(){resize.disconnect();window.removeEventListener('vie:statechange',restore);root.replaceChildren();}};
}

/** Shared, local-only exercise runner. Answers and score survive remounting. */
function mountQuestionSet(root,options){
 const qs=options.questions,key=options.key,el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e;};
 let index=0,answers=qs.map(()=>-1),done=false;
 function restore(){const v=VIE.state[key]??{};index=Number.isInteger(v.index)?Math.max(0,Math.min(qs.length-1,v.index)):0;answers=qs.map((q,i)=>Number.isInteger(v.answers?.[i])&&v.answers[i]>=0&&v.answers[i]<q.options.length?v.answers[i]:-1);done=v.done===true&&answers.every(x=>x>=0);}
 const save=()=>VIE.setState({...VIE.state,[key]:{index,answers:[...answers],done}});
 const score=()=>answers.filter((a,i)=>a===qs[i].correct).length;
 function draw(){
  const card=el('section','vie-questions');
  if(done){const completed=el('h3','','本组完成');completed.tabIndex=-1;card.append(completed,el('strong','vie-question-result',score()+' / '+qs.length),el('p','muted','答对 '+score()+' 题，共 '+qs.length+' 题。'));const again=el('button','vie-question-next','重新做一遍');again.type='button';again.onclick=()=>{index=0;answers=qs.map(()=>-1);done=false;draw();save();};card.append(again);root.replaceChildren(card);return;}
  const q=qs[index],picked=answers[index],locked=picked>=0,top=el('div','vie-question-top');top.append(el('span','vie-question-pill','第 '+(index+1)+' / '+qs.length+' 题'),el('span','vie-question-pill','得分 '+score()));
  const progress=el('progress','vie-question-progress');progress.max=qs.length;progress.value=answers.filter(x=>x>=0).length;progress.setAttribute('aria-label','答题进度');
  const heading=el('h3','vie-question-stem',q.question),choices=el('div','vie-question-options');card.append(top,progress,heading,choices);
  q.options.forEach((o,i)=>{const b=el('button','vie-question-option');b.type='button';b.disabled=locked;b.append(el('span','vie-question-letter',String.fromCharCode(65+i)),el('span','',o.label));if(locked&&i===q.correct)b.classList.add('is-correct');if(locked&&i===picked&&picked!==q.correct)b.classList.add('is-wrong');b.onclick=()=>{if(answers[index]>=0)return;answers[index]=i;draw();save();root.querySelector('.vie-question-next')?.focus();};choices.append(b);});
  if(locked){const feedback=el('div','vie-question-feedback');feedback.setAttribute('role','status');feedback.append(el('strong','',picked===q.correct?'答对了。':'正确答案是 '+String.fromCharCode(65+q.correct)+'。'));const explanation=q.explanation??q.options[picked].feedback??q.options[q.correct].feedback;if(explanation)feedback.append(el('p','',explanation));card.append(feedback);}
  const foot=el('div','vie-question-foot'),next=el('button','vie-question-next',index===qs.length-1?'查看结果 →':'下一题 →');next.type='button';next.disabled=!locked;next.onclick=()=>{if(answers[index]<0)return;if(index===qs.length-1)done=true;else index++;draw();save();root.querySelector('h3')?.focus();};heading.tabIndex=-1;foot.append(next);card.append(foot);root.replaceChildren(card);
 }
 const onState=()=>{const before=JSON.stringify([index,answers,done]);restore();if(JSON.stringify([index,answers,done])!==before)draw();};window.addEventListener('vie:statechange',onState);restore();draw();return {dispose(){window.removeEventListener('vie:statechange',onState);root.replaceChildren();}};
}
