/** Runs inside the opaque figure. Topic-neutral stages and local understanding checks. */
function mountLearning(options){
  options={...validateLearningDefinition(options,true),root:options.root};
  const root=typeof options.root==='string'?document.querySelector(options.root):options.root;
  if(!root)throw Error('Learning root not found');
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
