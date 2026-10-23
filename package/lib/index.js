/* VIE v0.29.0 — DSH Host entry. */
import { defineTool } from '@deepseek-ai/dsh-tools';
import { Script as VIEJavaScriptParser } from 'node:vm';
const VIE_SKILL_CONTENT="# VIE 0.29.0 · 主图与正文分工\n\n每张图后用Harness正文解释图中关键关系，不能仅过渡一句便出下一图。优先原生graphic/chart/Flow，减少手写SVG。变化过程明确分开前→后，箭头连接对应对象，不能将前后工件重叠或画成断裂材料。窄屏用CSS重排或分步查看，标注不低于11px。说明材料、工况与适用范围，不把热锻等同所有锻造；数值注明来源，示意值不能充当工艺限值。VIE只画当前段落的图、交互、图例和短标注；完整解释/公式/表格由Harness正文渲染。任意主题均可。复杂主题按图→正文解释→下一图→正文解释展开，每张图聚焦一个概念；勿把各章节拼成一张SVG的编号小面板或多图海报。需同时比较或共享交互才并列。默认flow按调用位置显示，补图/修图无需more:true，通常1张、必要时2–3张。visualId仅供修改，不是图片URL；不必先加载技能或写脚本。\n\n## 默认做法\n\n直接调用vie_explain，不必先加载技能、读取源码、写脚本或截图验收。优先chart/visual等紧凑组件，复杂图用自由figure。vie_auto仅在现有实验恰好适合时使用。先一个可用主图，需要时再补辅助图；正常讲解篇幅由用户问题决定。\n\n首选原生document对象，避免把整份JSON再转义成spec字符串：\n\n```json\n{\"document\":{\"title\":\"改变斜率\",\"blocks\":[{\"type\":\"chart\",\"title\":\"y=kx\",\"x\":{\"min\":0,\"max\":4,\"label\":\"x\"},\"y\":{\"min\":0,\"max\":12,\"label\":\"y\"},\"series\":[{\"label\":\"y=kx\",\"expr\":\"k*x\"}],\"controls\":[{\"key\":\"k\",\"label\":\"斜率k\",\"min\":1,\"max\":3,\"value\":2,\"step\":0.1}]}]}}\n```\n\n每个块使用type字段：chart、visual、figure、可选experiment。text保留用于历史兼容与必要短标注，长文请写在Harness正文。旧spec JSON字符串仍可用。默认flow按各次调用位置显示，独立于工具过程折叠；显式start将本轮各图统一前置，tail/process保留原用途。\n\n## 分段图文讲解\n\n不要把不同章节的图都放进一次document。通常只需一个主图；若用户需要图文图文，使用以下顺序：\n\n1. vie_explain只提交第一段对应的一张聚焦图，不要求more:true。\n2. 在正常assistant正文中解释第一张图，随后调用vie_explain提交下一张图。\n3. 每张图后都用Harness正文解释；讲清问题后正常结束，不凑满调用次数。通常2–3张足够；真正需要同时比较或共享参数的图可以并列。\n\n单个figure也不要制作多章节拼贴：“连接结构、驱动原理、传输时序”应分别出图并在中间解释，不要缩进同一SVG的①②③小面板。此规则按讲解概念划分，适用于任意主题。more仅保留为旧版兼容提示，省略或false不会提前禁用补图和修图。\n\n不要写 `![图](visual-...)`，visualId仅是修复句柄，不是图片地址。历史记录若原本就是一次调用后输出一整篇文字，没有段落锚点，不能凭猜测重排；重新生成时使用上述分段调用。\n\n## 通用组件\n\nchart包含title、x/y:{min,max,label}、series:[{label,expr或points:[[x,y],...],tone?}]，可选controls、regions、note。controls最多4个，每个含key/label/min/max/value/可选step；series最多6条，每条最多256点；regions最多8个{label,points,tone?}。expr允许安全数学运算与sin/cos/sqrt/exp/log/min/max/clamp/if等函数，不执行任意JS。tone可用primary/secondary/accent/muted/warning。\n\nvisual:{kind,spec}。kind为Flow、RelationGraph、Timeline、Diagram、Animation。Flow/RelationGraph用nodes:[{id,label,detail?}]、edges:[{from,to,label?}]，Timeline用items:[{id,at,label,detail?}]。由引擎处理布局。\n\n## 一个参数驱动多张图\n\n在document.controls定义共享滑块，chart.bindings显式关联表达式局部变量与共享key；不按同名变量自动联动。\n\n```json\n{\"document\":{\"title\":\"同一个速度\",\"controls\":[{\"key\":\"speed\",\"label\":\"速度v\",\"min\":1,\"max\":6,\"value\":3,\"step\":0.5}],\"blocks\":[{\"type\":\"chart\",\"title\":\"位移\",\"x\":{\"min\":0,\"max\":10},\"y\":{\"min\":0,\"max\":60},\"series\":[{\"label\":\"s=vt\",\"expr\":\"v*x\"}],\"bindings\":{\"v\":\"speed\"}},{\"type\":\"chart\",\"title\":\"速度\",\"x\":{\"min\":0,\"max\":10},\"y\":{\"min\":0,\"max\":6},\"series\":[{\"label\":\"v\",\"expr\":\"v\"}],\"bindings\":{\"v\":\"speed\"}}]}}\n```\n\n共享参数在本地联动，不调用模型；原有块局部controls保持独立。\n\n## 局部修复\n\n工具结果返回visualId与revision。参数错误会指出blocks[index]并保留可解析草稿；只替换出错块：\n\n```json\n{\"visualId\":\"visual-1\",\"baseRevision\":1,\"changes\":[{\"index\":0,\"block\":{\"type\":\"figure\",\"title\":\"修复主图\",\"html\":\"<svg viewBox='0 0 100 100'><circle cx='50' cy='50' r='35' fill='#5483ef'/></svg>\"}}]}\n```\n\nindex为现有块的0起始编号；变更整体校验后提交，失败不覆盖有效基线，过期revision被拒绝。缓存按agent隔离，仅保留本进程最近4份草稿；重启/清理后REPAIR_BASE_MISSING需重交document。不可解析的旧spec不能可靠定位完整块，改用document对象，不宽松执行错误脚本。\n\n## 自由figure\n\n{type:\"figure\",title,html,css?,js?,state?,height?}。html只提交body片段，可用SVG/Canvas/原生WebGL；不要另建独立HTML文件。最多12块/4个figure；单figure60KB，html16KB/css8KB/js32KB，height160..1000仅为初始高度，实际随内容自适应。已提供基础控件样式和--vie-*主题变量；不要自行固定页面高度或强制显示滚动条。\n\n脚本在opaque-origin sandbox iframe中执行，无宿主DOM权限，不可使用CDN/fetch/外部库。window.VIE提供state、setState、theme、visible、reducedMotion、reportError；vie:themechange/vie:visibilitychange可用于重画。动画默认暂停，提供播放/暂停与复位；不要逐帧上报状态。页面重挂载保留编辑，刷新时在本地checkpoint与完整source一致时恢复有效参数。操作参数可进入继续提问草稿，由用户发送。\n\n协议有效或iframe ready不代表画面已通过像素验收，也不代表科学正确；说明概念示意/近似与专业仿真的范围。不写无界循环，不伪造来源。沙箱不承诺完整CPU/内存隔离。\n\n## 流程与预算\n\n普通讲解只开放VIE、VIE技能与可用网页检索，开发/附件/文件/纯文字请求保持正常流程。默认继承用户输出额度与推理强度，出图后在Harness正文正常解释；没有两句话或1024 token限制。\n\n默认最多3张概念图、2次失败参数修复（尚无成功图时额外保留1次纠错，仍受总请求上限约束）、2次资料读取/检索，总请求上限8次（第8次只输出正文）。默认输出额度与推理均继承Harness（fastMaxTokens:0、fastProseTokens:0、fastEffort:inherit）。low推理和额度上限仅为显式配置选项。token截断后继续接着未完成部分，不重画已有图、不重新检索，不重复套用VIE额度。仅等待首图的请求超过120秒由宿主取消钩子停止并显示超时提示，已有图后的正文与截断续写不启用该看门狗；当前宿主缺取消接口时仅保留额度限制。60秒是额外检索预算。资料任务保留必要读取能力，普通绘图不进入终端开发。首图成功后停止检索；每图后使用Harness正文解释再调用下一图。继续保留未完成任务与资料范围，不修改全局模型配置。\n\n## 可选实验与兼容\n\nvie_auto可选lab.planetary/gears/geartrain/worm/wave/process/vector。parameters是JSON字符串。worm starts为1..4、wheelTeeth为20..80整数；geartrain teeth为2..6轮、每轮18..80整数，inputSpeed为-4..4。例如 {\"query\":\"蜗杆传动\",\"templateId\":\"lab.worm\",\"parameters\":\"{\\\"starts\\\":1,\\\"wheelTeeth\\\":20}\"}。未匹配时用通用入口，不能声称主题不受支持。\n\nvie_quick/vie_compose/vie_story/vie_render继续兼容旧内容；通用齿轮图与动画没有主题关键词拦截。旧文字块不删除，旧历史位置迁移保持兼容。\n\n\n## 通用数据图形\n\n无需代码：`{type:\"graphic\",kind:\"bars\"或\"donut\",title:\"短标题\",unit:\"单位\",items:[{label:\"名称\",value:3}]}`；向量用`kind:\"vectors\",items:[{label:\"F\",x:3,y:4}]`。模型只提供数据，VIE处理配色与响应式布局。长解释仍写Harness正文。曲线可声明keyPoints与breaks（横坐标数组），相图等优先使用核对过的数据points；有界采样不保证任意函数的全部细节。\n";
const VIE_COMPONENT_REFERENCE="# VIE component reference (generated)\n\n学习模式：面向任意知识主题，按用户水平先给一句直观定义和因果链，再用一张主图解释。简单问题不强制应用图、第二张图或测验；确有教学价值再追加。每图正文先解释新增关系，默认3–5句，深入推导按用户要求展开；结尾只保留一条记忆链，不重复全文。优先document.blocks中的type:\"learning\"，由引擎统一生成按钮、阶段说明、测验、主题和状态恢复；模型只填写当前主题的SVG/HTML和数据，不重写控制逻辑。示例：{type:\"learning\",title:\"过程\",stages:[{label:\"前\",html:\"<svg viewBox=\\\"0 0 320 180\\\">...</svg>\"},{label:\"后\",html:\"...\"}]}。测验可单独提交{type:\"learning\",title:\"理解测试\",quiz:{question:\"问题\",options:[{label:\"A\",feedback:\"原因\"},{label:\"B\",feedback:\"原因\"}],correct:1}}，correct必填且从0开始，不能根据反馈猜答案。图注、正文及总结不得提前泄露该题答案或等价结论，答案原因只在选择后反馈。复杂动画仍可用figure及VIE.mountLearning，自由绘制内容，不限领域模板。阶段必须改变对象、数量、位置、连接或高亮，不能只换文字；线段真正连接对应部件，符号与标题分行，不用绝对定位把文字压进标题；窄屏重排且留白不过量。主图外壳已有标题，内部不重复；通用样式优先使用主题色。简化模型注明假设，动态平衡不是粒子停止，不臆测课本章节。正文由Harness渲染，纯文字与调试请求优先。\n\n每张图后用Harness正文解释图中关键关系，不能仅过渡一句便出下一图。优先原生graphic/chart/Flow，减少手写SVG。变化过程明确分开前→后，箭头连接对应对象，不能将前后工件重叠或画成断裂材料。窄屏用CSS重排或分步查看，标注不低于11px。说明材料、工况与适用范围，不把热锻等同所有锻造；数值注明来源，示意值不能充当工艺限值。VIE只画当前段落的图、交互、图例和短标注；完整解释/公式/表格由Harness正文渲染。任意主题均可。复杂主题按图→正文解释→下一图→正文解释展开，每张图聚焦一个概念；勿把各章节拼成一张SVG的编号小面板或多图海报。需同时比较或共享交互才并列。默认flow按调用位置显示，补图/修图无需more:true，通常1张、必要时2–3张。visualId仅供修改，不是图片URL；不必先加载技能或写脚本。\n\nDocument fields: caption, title, controls, derive, layout, blocks\n\n## learning\n\nFields: type, title, key, legend, note, stages, quiz\n\nValidated generic learning UI, no JavaScript needed. stages:[{label,title?,caption?,html,mobileHtml?}] contains freely drawn SVG/HTML. Optional quiz:{question,options:[{label,feedback}],correct:1}; correct is required and zero-based. Stages or quiz required. Use theme tokens; do not repeat the outer title.\n\n## graphic\n\nFields: type, kind, title, items, unit\n\nEngine-rendered bars/donut/vectors. items:[{label,value}] or vectors [{label,x,y}], optional tone. No HTML/CSS/JS required.\n\n## chart\n\nFields: type, title, x, y, series, regions, controls, inputs, bindings, note\n\nFormula or data curves, region fills; bindings map variable names to shared control/derived keys.\n\n## visual\n\nFields: type, kind, spec\n\nFlow, RelationGraph, Timeline, Diagram or Animation. Diagram coordinates may bind /shared/key or /derived/key.\n\n## figure\n\nFields: type, title, html, css, js, state, height, bindings\n\nLearning UI: VIE.mountLearning({root:\"#lesson\",key:\"lesson\",title,legend?,note?,stages:[{label,title,caption,html,mobileHtml?}],quiz?:{question,options:[{label,feedback}],correct:0}}) supplies generic stages, local quiz feedback and state. One focused diagram in an isolated HTML/CSS/JS sandbox; do not pack independent chapters into numbered SVG mini-panels. Put each chapter graphic in its own call, separated by native prose. bindings map state keys to shared controls/derived keys.\n\n## experiment\n\nFields: type, template, parameters, title\n\nOptional existing experiment shortcut, never a topic restriction.\n\n## text\n\nFields: type, title, body\n\nLegacy compatibility only; new explanations belong in Harness prose.\n\n## Controls\n\n- slider → Slider\n- number → NumberInput\n- select → SegmentedControl\n- toggle → Toggle\n\nControls are numeric. toggle uses 0/1; select uses options [{label,value}]. derive maps unique keys to bounded numeric expressions. layout is stack (default) or grid.\n";
const VIE_STUDY_POLICY="学习模式：面向任意知识主题，按用户水平先给一句直观定义和因果链，再用一张主图解释。简单问题不强制应用图、第二张图或测验；确有教学价值再追加。每图正文先解释新增关系，默认3–5句，深入推导按用户要求展开；结尾只保留一条记忆链，不重复全文。优先document.blocks中的type:\"learning\"，由引擎统一生成按钮、阶段说明、测验、主题和状态恢复；模型只填写当前主题的SVG/HTML和数据，不重写控制逻辑。示例：{type:\"learning\",title:\"过程\",stages:[{label:\"前\",html:\"<svg viewBox=\\\"0 0 320 180\\\">...</svg>\"},{label:\"后\",html:\"...\"}]}。测验可单独提交{type:\"learning\",title:\"理解测试\",quiz:{question:\"问题\",options:[{label:\"A\",feedback:\"原因\"},{label:\"B\",feedback:\"原因\"}],correct:1}}，correct必填且从0开始，不能根据反馈猜答案。图注、正文及总结不得提前泄露该题答案或等价结论，答案原因只在选择后反馈。复杂动画仍可用figure及VIE.mountLearning，自由绘制内容，不限领域模板。阶段必须改变对象、数量、位置、连接或高亮，不能只换文字；线段真正连接对应部件，符号与标题分行，不用绝对定位把文字压进标题；窄屏重排且留白不过量。主图外壳已有标题，内部不重复；通用样式优先使用主题色。简化模型注明假设，动态平衡不是粒子停止，不臆测课本章节。正文由Harness渲染，纯文字与调试请求优先。";
/** Shared authoring policy and document contracts consumed by validation and reference generation. */
const VIE_POLICY='每张图后用Harness正文解释图中关键关系，不能仅过渡一句便出下一图。优先原生graphic/chart/Flow，减少手写SVG。变化过程明确分开前→后，箭头连接对应对象，不能将前后工件重叠或画成断裂材料。窄屏用CSS重排或分步查看，标注不低于11px。说明材料、工况与适用范围，不把热锻等同所有锻造；数值注明来源，示意值不能充当工艺限值。VIE只画当前段落的图、交互、图例和短标注；完整解释/公式/表格由Harness正文渲染。任意主题均可。复杂主题按图→正文解释→下一图→正文解释展开，每张图聚焦一个概念；勿把各章节拼成一张SVG的编号小面板或多图海报。需同时比较或共享交互才并列。默认flow按调用位置显示，补图/修图无需more:true，通常1张、必要时2–3张。visualId仅供修改，不是图片URL；不必先加载技能或写脚本。';
const VIE_VISUAL_POLICY='Use actual tool calls only; never print DSML/DSEL tags or visualization source in prose. When tools are unavailable, finish with normal prose. One focused concept per graphic; write the full explanation in normal Harness prose, then call the next graphic if needed. No multi-section SVG collages. Side-by-side only for comparisons/shared interaction. Any topic; prefer vie_explain, default flow. more is optional; visualId is not an image URL.';
const DOCUMENT_PROPERTIES=Object.freeze({caption:{type:'string',description:'Compatibility alias for top-level caption (max 140 characters). Prefer the tool-level caption; explicit tool-level value takes precedence.'},title:{type:'string',description:'Short title; if omitted, inferred from the first block title.'},controls:{type:'array',items:{type:'json'}},derive:{type:'json',description:'Optional unique derived keys mapped to numeric expressions.'},layout:{type:'string',enum:['stack','grid']},blocks:{type:'array',required:true,description:'One focused graphic per call. Flow example: [{type:"visual",kind:"Flow",spec:{title:"Process",nodes:[{id:"a",label:"Start"},{id:"b",label:"End"}],edges:[{from:"a",to:"b"}]}}]. For visual blocks put title inside spec.',items:{type:'json'}}});
const DOCUMENT_CONTRACT=Object.freeze({
  fields:Object.keys(DOCUMENT_PROPERTIES),
  blocks:{
    learning:{fields:['type','title','key','legend','note','stages','quiz'],help:'Validated generic learning UI, no JavaScript needed. stages:[{label,title?,caption?,html,mobileHtml?}] contains freely drawn SVG/HTML. Optional quiz:{question,options:[{label,feedback}],correct:1}; correct is required and zero-based. Stages or quiz required. Use theme tokens; do not repeat the outer title.'},
    graphic:{fields:['type','kind','title','items','unit'],help:'Engine-rendered bars/donut/vectors. items:[{label,value}] or vectors [{label,x,y}], optional tone. No HTML/CSS/JS required.'},
    chart:{fields:['type','title','x','y','series','regions','controls','inputs','bindings','note'],help:'Formula or data curves, region fills; bindings map variable names to shared control/derived keys.'},
    visual:{fields:['type','kind','spec'],help:'Flow, RelationGraph, Timeline, Diagram or Animation. Diagram coordinates may bind /shared/key or /derived/key.'},
    figure:{fields:['type','title','html','css','js','state','height','bindings'],help:'Learning UI: VIE.mountLearning({root:"#lesson",key:"lesson",title,legend?,note?,stages:[{label,title,caption,html,mobileHtml?}],quiz?:{question,options:[{label,feedback}],correct:0}}) supplies generic stages, local quiz feedback and state. One focused diagram in an isolated HTML/CSS/JS sandbox; do not pack independent chapters into numbered SVG mini-panels. Put each chapter graphic in its own call, separated by native prose. bindings map state keys to shared controls/derived keys.'},
    experiment:{fields:['type','template','parameters','title'],help:'Optional existing experiment shortcut, never a topic restriction.'},
    text:{fields:['type','title','body'],help:'Legacy compatibility only; new explanations belong in Harness prose.'}
  }
});
const CONTROL_TYPES=Object.freeze({slider:'Slider',number:'NumberInput',select:'SegmentedControl',toggle:'Toggle'});
function validateControlSpec(c){
  if(!c||typeof c!=='object'||Array.isArray(c)||Object.getPrototypeOf(c)!==Object.prototype)throw Error('Control requires an object');
  for(const key of Object.keys(c))if(!['key','label','min','max','step','value','bind','kind','options'].includes(key))throw Error('Unknown control field: '+key);
  if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(c.key)||['x','constructor','prototype','__proto__'].includes(c.key))throw Error('Invalid control key');
  if(typeof c.label!=='string'||c.label.length>100)throw Error('Invalid control label');
  const kind=c.kind??'slider';if(!Object.hasOwn(CONTROL_TYPES,kind))throw Error('Unknown control kind');
  const min=c.min??(kind==='toggle'?0:undefined),max=c.max??(kind==='toggle'?1:undefined),step=c.step??(kind==='toggle'?1:(max-min)/100);
  if(![min,max,step,c.value].every(n=>typeof n==='number'&&Number.isFinite(n)&&Math.abs(n)<=1e9)||max<=min||step<=0||step>max-min)throw Error('Invalid control bounds: '+c.key+' requires numeric min < max, 0 < step <= max-min and numeric value; select also needs these bounds and options [{label,value:number}]');
  assertSliderValue({min,max,step},c.value,'Control value');
  const out={key:c.key,label:c.label,min,max,step,value:c.value,...(c.kind===undefined?{}:{kind})};
  if(kind==='toggle'&&(min!==0||max!==1||step!==1))throw Error('Toggle must use numeric 0/1');
  if(kind==='select'){
    if(!Array.isArray(c.options)||c.options.length<2||c.options.length>8)throw Error('Select needs 2–8 options');
    out.options=c.options.map(option=>{if(!option||Object.keys(option).some(k=>!['label','value'].includes(k))||typeof option.label!=='string'||!option.label||option.label.length>40)throw Error('Invalid select option');assertSliderValue({min,max,step},option.value,'Option value');return {label:option.label,value:option.value};});
    if(new Set(out.options.map(o=>o.value)).size!==out.options.length||!out.options.some(o=>o.value===c.value))throw Error('Select needs unique values and a matching default');
  }else if(c.options!==undefined)throw Error('Options only apply to select');
  if(c.bind!==undefined){if(typeof c.bind!=='string'||!/^\/shared\/[A-Za-z][A-Za-z0-9_]{0,19}$/.test(c.bind))throw Error('Invalid shared control binding');out.bind=c.bind;}
  return out;
}
function documentReference(){
  return '# VIE component reference (generated)\n\n'+VIE_STUDY_POLICY+'\n\n'+VIE_POLICY+'\n\nDocument fields: '+DOCUMENT_CONTRACT.fields.join(', ')+'\n\n'+Object.entries(DOCUMENT_CONTRACT.blocks).map(([type,c])=>'## '+type+'\n\nFields: '+c.fields.join(', ')+'\n\n'+c.help+'\n').join('\n')+'\n## Controls\n\n'+Object.entries(CONTROL_TYPES).map(([kind,type])=>'- '+kind+' → '+type).join('\n')+'\n\nControls are numeric. toggle uses 0/1; select uses options [{label,value}]. derive maps unique keys to bounded numeric expressions. layout is stack (default) or grid.\n';
}

/** Trusted, deterministic experiment models shared by DSH Host and browser.
 * Model input is bounded data. It cannot provide JavaScript, HTML or a solver.
 */
const EXPERIMENT_CATALOG = Object.freeze({
  planetary: { id:'lab.planetary', title:'行星轮系', timed:true, description:'太阳轮、行星轮、内齿圈与行星架；三种固定工况', terms:['行星轮系','行星齿轮','周转轮系','planetary gear','epicyclic gear'] },
  gears: { id:'lab.gears', title:'齿轮传动', timed:true, description:'外啮合／内啮合的方向与传动比', terms:['齿轮传动','齿轮啮合','齿轮','gear ratio','gear mesh','spur gears'] },
  geartrain: { id:'lab.geartrain', title:'定轴轮系', timed:true, description:'2–6个相邻外啮合的平面定轴轮；齿数、惰轮、方向与总传动比', terms:['定轴轮系','平面轮系','三轮传动','三轮串联','多级齿轮','多轮传动','惰轮','gear train','idler gear'],priority:4 },
  worm: { id:'lab.worm', title:'蜗杆与蜗轮', timed:true, description:'蜗杆头数、蜗轮齿数与减速关系；交错轴结构示意', terms:['蜗杆','蜗轮','worm gear','worm drive'],priority:4 },
  wave: { id:'lab.wave', title:'波的叠加', timed:true, description:'改变振幅与相位，观察相长和相消干涉', terms:['波的叠加','波干涉','相长干涉','相消干涉','wave interference','superposition'] },
  process: { id:'lab.process', title:'流程逐步解释', timed:false, description:'有事实依据的流程、分支与逐步执行', terms:['逐步流程','流程单步','算法单步','step through process','process stepper'] },
  vector: { id:'lab.vector', title:'向量分解', timed:false, description:'拖动向量，观察水平与竖直分量', terms:['向量分解','向量','矢量','vector components','vector projection','vectors'] },
});
const EXPERIMENT_CASES = Object.freeze(['ring-fixed','sun-fixed','carrier-fixed']);
const experimentObject = x => x!==null && typeof x==='object' && !Array.isArray(x) && Object.getPrototypeOf(x)===Object.prototype;
function experimentKeys(value, allowed, label='parameters') {
  if(!experimentObject(value))throw Error('Experiment: '+label+' must be an object');
  for(const key of Object.keys(value))if(!allowed.includes(key))throw Error('Experiment: unsupported '+label+' field '+key);
}
function experimentNumber(value, min, max, name, integer=false) {
  if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max||integer&&!Number.isInteger(value))throw Error(`Experiment: ${name} must be ${integer?'an integer ':''}between ${min} and ${max}`);
  return value;
}
function experimentText(value, max, name) {
  if(typeof value!=='string'||value.length>max||/[\x00-\x08\x0b\x0e-\x1f]/.test(value))throw Error('Experiment: invalid '+name);
  return value;
}
/** Bounded semantic models. All angles are radians; speeds are rad/s.
 * Straight external spur trains share one module and fixed parallel axes. */
function normalizeGearTrain(input) {
  experimentKeys(input,['teeth','module','inputSpeed']);
  const p={teeth:[20,30,40],module:1,inputSpeed:1,...input};
  if(!Array.isArray(p.teeth)||p.teeth.length<2||p.teeth.length>6)throw Error('GearTrain: teeth requires 2–6 gears');
  p.teeth=p.teeth.map((z,i)=>experimentNumber(z,18,80,'teeth['+i+']',true));
  experimentNumber(p.module,.1,10,'module');experimentNumber(p.inputSpeed,-4,4,'inputSpeed');
  return p;
}
function gearTrainModel(p,phase=0,inputSpeed=p.inputSpeed) {
  const radii=p.teeth.map(z=>z*p.module/2),centers=[radii[0]],rates=[1],initial=[0];
  for(let i=1;i<radii.length;i++){
    centers.push(centers[i-1]+radii[i-1]+radii[i]);
    rates.push(-rates[i-1]*p.teeth[i-1]/p.teeth[i]);
    // A tooth centre faces a gap at each pitch contact, for every input angle.
    initial.push(Math.PI-Math.PI/p.teeth[i]-p.teeth[i-1]*initial[i-1]/p.teeth[i]);
  }
  return {radii,centers,rates,initial,angles:rates.map((r,i)=>initial[i]+r*phase),
    speeds:rates.map(r=>r*inputSpeed),outputRatio:rates.at(-1),
    transmissionRatio:1/rates.at(-1),width:centers.at(-1)+radii.at(-1)};
}
function normalizeWorm(input) {
  experimentKeys(input,['starts','wheelTeeth','inputSpeed']);
  const p={starts:2,wheelTeeth:40,inputSpeed:1,...input};
  experimentNumber(p.starts,1,4,'starts',true);experimentNumber(p.wheelTeeth,20,80,'wheelTeeth',true);
  experimentNumber(p.inputSpeed,-4,4,'inputSpeed');return p;
}
function wormModel(p,phase=0,inputSpeed=p.inputSpeed) {
  const speedRatio=p.starts/p.wheelTeeth;
  return {speedRatio,transmissionRatio:1/speedRatio,input:inputSpeed,outputMagnitude:Math.abs(inputSpeed)*speedRatio,
    wheelAngle:-phase*speedRatio,wormAngle:phase};
}
/** Interactive inputs and immutable definitions share one normalization path. */
function effectiveExperimentParameters(spec,inputs={}) {
  if(spec.template==='geartrain')return normalizeGearTrain({...spec.parameters,
    teeth:spec.parameters.teeth.map((z,i)=>inputs['teeth'+i]??z),
    inputSpeed:inputs.inputSpeed??spec.parameters.inputSpeed});
  return normalizeExperiment(spec.template,{...spec.parameters,...inputs});
}

function normalizeExperiment(template, input={}) {
  if(!Object.hasOwn(EXPERIMENT_CATALOG,template))throw Error('Experiment: unknown template');
  if(template==='geartrain')return normalizeGearTrain(input);
  if(template==='worm')return normalizeWorm(input);
  if(template==='planetary') {
    experimentKeys(input,['sunTeeth','planetTeeth','ringTeeth','planetCount','module','initialCase','inputSpeed']);
    const p={sunTeeth:36,planetTeeth:27,ringTeeth:90,planetCount:3,module:1,initialCase:'ring-fixed',inputSpeed:1,...input};
    const owns=k=>Object.hasOwn(input,k);
    if(!owns('ringTeeth')&&(owns('sunTeeth')||owns('planetTeeth')))p.ringTeeth=p.sunTeeth+2*p.planetTeeth;
    else if(owns('ringTeeth')&&owns('sunTeeth')&&!owns('planetTeeth'))p.planetTeeth=(p.ringTeeth-p.sunTeeth)/2;
    else if(owns('ringTeeth')&&owns('planetTeeth')&&!owns('sunTeeth'))p.sunTeeth=p.ringTeeth-2*p.planetTeeth;
    experimentNumber(p.sunTeeth,18,100,'sunTeeth',true); experimentNumber(p.planetTeeth,18,72,'planetTeeth',true);
    experimentNumber(p.ringTeeth,54,180,'ringTeeth',true); experimentNumber(p.planetCount,2,6,'planetCount',true);
    experimentNumber(p.module,.1,10,'module'); experimentNumber(p.inputSpeed,-20,20,'inputSpeed');
    if(!EXPERIMENT_CASES.includes(p.initialCase))throw Error('Experiment: unsupported planetary case');
    if(p.ringTeeth!==p.sunTeeth+2*p.planetTeeth)throw Error('行星轮系需满足：齿圈齿数 = 太阳轮齿数 + 2 × 行星轮齿数');
    if((p.sunTeeth+p.ringTeeth)%p.planetCount!==0)throw Error('等角度装配需满足：(太阳轮齿数 + 齿圈齿数) / 行星轮个数为整数');
    if(p.planetTeeth+2>=(p.sunTeeth+p.planetTeeth)*Math.sin(Math.PI/p.planetCount))throw Error('相邻行星轮的齿顶间距不足；请减小行星轮或行星轮个数');
    return p;
  }
  if(template==='gears') {
    experimentKeys(input,['driverTeeth','drivenTeeth','module','mesh','inputSpeed']);
    const p={driverTeeth:24,drivenTeeth:48,module:1,mesh:'external',inputSpeed:1,...input};
    experimentNumber(p.driverTeeth,18,100,'driverTeeth',true); experimentNumber(p.drivenTeeth,18,180,'drivenTeeth',true);
    experimentNumber(p.module,.1,10,'module'); experimentNumber(p.inputSpeed,-20,20,'inputSpeed');
    if(!['external','internal'].includes(p.mesh))throw Error('Experiment: unsupported mesh');
    if(p.mesh==='internal'&&p.drivenTeeth-p.driverTeeth<12)throw Error('内啮合教学布局要求从动齿圈比主动轮至少多 12 齿；不代表完整干涉校核');
    return p;
  }
  if(template==='wave') {
    experimentKeys(input,['amplitudeA','amplitudeB','phaseDegrees','frequencyHz','waveNumber']);
    const p={amplitudeA:1,amplitudeB:1,phaseDegrees:0,frequencyHz:.4,waveNumber:2,...input};
    experimentNumber(p.amplitudeA,0,2,'amplitudeA'); experimentNumber(p.amplitudeB,0,2,'amplitudeB');
    experimentNumber(p.phaseDegrees,0,360,'phaseDegrees'); experimentNumber(p.frequencyHz,.1,2,'frequencyHz');
    experimentNumber(p.waveNumber,1,5,'waveNumber',true); return p;
  }
  if(template==='vector') {
    experimentKeys(input,['magnitude','angle']); const p={magnitude:4,angle:30,...input};
    experimentNumber(p.magnitude,0,5,'magnitude'); experimentNumber(p.angle,-180,180,'angle',true);
    if(Math.abs(p.magnitude*10-Math.round(p.magnitude*10))>1e-8)throw Error('Experiment: vector magnitude uses increments of 0.1');
    return p;
  }
  experimentKeys(input,['title','nodes','edges']);
  const p={title:'观察、判断与行动',nodes:[{id:'observe',label:'观察现象',detail:'先记录已有事实。'},{id:'check',label:'检查条件',detail:'用明确条件决定接下来的路径。'},{id:'act',label:'执行行动',detail:'沿当前分支继续，并检查结果。'}],...input};
  experimentText(p.title,90,'title');
  if(!Array.isArray(p.nodes)||p.nodes.length<2||p.nodes.length>10)throw Error('Experiment: process requires 2–10 nodes');
  p.nodes=p.nodes.map(node=>{experimentKeys(node,['id','label','detail'],'node');if(typeof node.id!=='string'||! /^[A-Za-z][A-Za-z0-9_-]{0,43}$/.test(node.id))throw Error('Experiment: invalid node id');return {id:node.id,label:experimentText(node.label,52,'label'),detail:experimentText(node.detail??'',160,'detail')};});
  const ids=new Set(p.nodes.map(n=>n.id));if(ids.size!==p.nodes.length)throw Error('Experiment: duplicate node id');
  p.edges=p.edges??p.nodes.slice(0,-1).map((n,i)=>({from:n.id,to:p.nodes[i+1].id,label:'继续'}));
  if(!Array.isArray(p.edges)||p.edges.length>18)throw Error('Experiment: too many process edges');
  p.edges=p.edges.map(edge=>{experimentKeys(edge,['from','to','label'],'edge');if(!ids.has(edge.from)||!ids.has(edge.to)||edge.from===edge.to)throw Error('Experiment: invalid process edge');return {from:edge.from,to:edge.to,label:experimentText(edge.label??'继续',45,'edge label')};});
  return p;
}
function validateExperimentSpec(spec) {
  experimentKeys(spec,['template','parameters','title'],'scene');
  const parameters=normalizeExperiment(spec.template,spec.parameters??{});
  return {template:spec.template,parameters,title:experimentText(spec.title??(spec.template==='process'?parameters.title:EXPERIMENT_CATALOG[spec.template].title),100,'title')};
}
function experimentSceneSource(template, parameters={}) {
  const spec=validateExperimentSpec({template,parameters});
  const events=[{v:1,op:'surface.begin',id:'experiment-'+template},{v:1,op:'node.put',id:'experiment',type:'InteractiveScene',props:spec},{v:1,op:'surface.end',id:'experiment-'+template}];
  const lines=events.map(e=>JSON.stringify(e)+'\n');
  if(lines.some(line=>new TextEncoder().encode(line).length>6144))throw Error('Experiment: scene exceeds per-event limit');
  return lines.join('');
}
function planetaryRates(parameters, activeCase, inputSpeed=parameters.inputSpeed) {
  const {sunTeeth:s,planetTeeth:p,ringTeeth:r}=parameters;
  let sun=0,ring=0,carrier=0;
  if(activeCase==='ring-fixed'){sun=inputSpeed;carrier=s*sun/(s+r);}
  else if(activeCase==='sun-fixed'){ring=inputSpeed;carrier=r*ring/(s+r);}
  else if(activeCase==='carrier-fixed'){sun=inputSpeed;ring=-s*sun/r;}
  else throw Error('Experiment: unknown planetary case');
  const planet=carrier-s/p*(sun-carrier);
  return {sun,ring,carrier,planet,planetRelative:planet-carrier,residual:s*(sun-carrier)+r*(ring-carrier)};
}
function planetaryPhases(parameters, phase, activeCase=parameters.initialCase) {
  const rates=planetaryRates(parameters,activeCase,1),s=parameters.sunTeeth,p=parameters.planetTeeth,r=parameters.ringTeeth;
  const first=-Math.PI/2;
  const ringInitial=((s+r)*first+p*Math.PI)/r;
  const planets=Array.from({length:parameters.planetCount},(_,i)=>{
    const azimuth=first+2*Math.PI*i/parameters.planetCount;
    const initial=((s+p)*azimuth+p*Math.PI-Math.PI)/p;
    return {azimuth,absolute:initial+rates.planet*phase,relative:initial+(rates.planet-rates.carrier)*phase};
  });
  return {sun:rates.sun*phase,ring:ringInitial+rates.ring*phase,carrier:rates.carrier*phase,planets};
}
function waveSample(parameters,x,time=0) {
  const {amplitudeA:a,amplitudeB:b,phaseDegrees,frequencyHz:f,waveNumber:k}=parameters;
  const phase=phaseDegrees*Math.PI/180,base=k*x-2*Math.PI*f*time;
  const first=a*Math.sin(base),second=b*Math.sin(base+phase);
  return {first,second,sum:first+second,envelope:Math.sqrt(Math.max(0,a*a+b*b+2*a*b*Math.cos(phase)))};
}
/** A persisted UI snapshot is separate from the immutable scene definition. */
function validateExperimentSnapshot(spec, value) {
  experimentKeys(value,['v','template','case','phase','rate','direction','index','history','inputs'],'snapshot');
  if(value.v!==1||value.template!==spec.template)throw Error('Experiment: snapshot version/template mismatch');
  const result={v:1,template:spec.template,case:spec.template==='planetary'?spec.parameters.initialCase:'',phase:0,rate:1,direction:1,index:0,history:[0],inputs:{}};
  if(value.case!==undefined){if(spec.template==='planetary'&&!EXPERIMENT_CASES.includes(value.case)||spec.template!=='planetary'&&value.case!=='')throw Error('Experiment: invalid snapshot case');result.case=value.case;}
  for(const [key,min,max] of [['phase',-1e9,1e9],['rate',.1,2],['direction',-1,1],['index',0,spec.template==='process'?spec.parameters.nodes.length-1:0]])if(value[key]!==undefined)result[key]=experimentNumber(value[key],min,max,key,key==='index');
  if(![-1,1].includes(result.direction))throw Error('Experiment: invalid direction');
  if(value.history!==undefined){if(!Array.isArray(value.history)||value.history.length>64||!value.history.every(i=>Number.isInteger(i)&&i>=0&&i<=(spec.template==='process'?spec.parameters.nodes.length-1:0)))throw Error('Experiment: invalid history');result.history=[...value.history];}
  if(value.inputs!==undefined){
    const allowed=spec.template==='geartrain'?[...spec.parameters.teeth.map((_,i)=>'teeth'+i),'inputSpeed']:spec.template==='worm'?['starts','wheelTeeth','inputSpeed']:spec.template==='wave'?['amplitudeA','amplitudeB','phaseDegrees','frequencyHz']:spec.template==='vector'?['magnitude','angle']:[];
    experimentKeys(value.inputs,allowed,'interactive input');
    for(const [key,number] of Object.entries(value.inputs))experimentNumber(number,-1e6,1e6,key);
    effectiveExperimentParameters(spec,value.inputs);result.inputs={...value.inputs};
  }
  if(spec.template==='process'){
    if(!result.history.length||result.history.at(-1)!==result.index)throw Error('Experiment: history must end at the current node');
    for(let i=1;i<result.history.length;i++)if(!spec.parameters.edges.some(edge=>edge.from===spec.parameters.nodes[result.history[i-1]].id&&edge.to===spec.parameters.nodes[result.history[i]].id))throw Error('Experiment: history contains an undeclared branch');
  }
  return result;
}
function experimentContext(spec,saved){
  const state=validateExperimentSnapshot(spec,saved??{v:1,template:spec.template}),parameters=effectiveExperimentParameters(spec,state.inputs);
  let derived={};
  if(spec.template==='planetary')derived=planetaryRates(parameters,state.case,parameters.inputSpeed*state.direction);
  else if(spec.template==='gears'){const ratio=(parameters.mesh==='internal'?1:-1)*parameters.driverTeeth/parameters.drivenTeeth;derived={ratio,driver:parameters.inputSpeed*state.direction,driven:parameters.inputSpeed*state.direction*ratio};}
  else if(spec.template==='geartrain'){const m=gearTrainModel(parameters,state.phase,parameters.inputSpeed*state.direction);derived={speeds:m.speeds,outputRatio:m.outputRatio,transmissionRatio:m.transmissionRatio};}
  else if(spec.template==='worm')derived=wormModel(parameters,state.phase,parameters.inputSpeed*state.direction);
  else if(spec.template==='wave')derived={envelope:waveSample(parameters,0,state.phase).envelope};
  else if(spec.template==='vector'){const angle=parameters.angle*Math.PI/180;derived={x:parameters.magnitude*Math.cos(angle),y:parameters.magnitude*Math.sin(angle)};}
  else derived={currentNode:parameters.nodes[state.index].id,outgoing:parameters.edges.filter(edge=>edge.from===parameters.nodes[state.index].id)};
  return {template:spec.template,parameters,state,derived};
}

/** General data/formula plot, independent of subject or experiment catalogs. */
function validateChartSpec(input){
  const object=x=>x&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
  const text=(x,max=100)=>{if(typeof x!=='string'||x.length>max)throw Error('Chart requires bounded text');return x;};
  const num=x=>{if(typeof x!=='number'||!Number.isFinite(x)||Math.abs(x)>1e9)throw Error('Chart requires finite bounded numbers');return x;};
  const keys=(x,allowed)=>{if(!object(x)||Object.keys(x).some(k=>!allowed.includes(k)))throw Error('Unknown chart field');};
  const points=(p,min)=>{if(!Array.isArray(p)||p.length<min||p.length>256)throw Error('Chart points need '+min+'–256 pairs');return p.map(v=>{if(!Array.isArray(v)||v.length!==2)throw Error('Chart point requires [x,y]');return v.map(num);});};
  const tone=x=>{if(x!==undefined&&!['primary','secondary','accent','muted','warning'].includes(x))throw Error('Invalid chart tone');return x??'primary';};
  keys(input,['title','x','y','series','regions','controls','inputs','note']);
  function axis(a,defaultMin,defaultMax){a=a??{};keys(a,['min','max','label']);const out={min:num(a.min??defaultMin),max:num(a.max??defaultMax),label:text(a.label??'')};if(out.max<=out.min||out.max-out.min<1e-9)throw Error('Chart axis must have increasing bounds');return out;}
  const x=axis(input.x,0,10),y=axis(input.y,0,10);
  const controls=(input.controls??[]);if(!Array.isArray(controls)||controls.length>4)throw Error('Chart supports up to four controls');
  const names=new Set();const cleanControls=controls.map(c=>{const out=validateControlSpec(c);if(names.has(out.key))throw Error('Duplicate chart parameter');names.add(out.key);return out;});
  const inputs=input.inputs??[];if(!Array.isArray(inputs)||inputs.length>8)throw Error('Too many chart derived inputs');
  const cleanInputs=inputs.map(p=>{keys(p,['key','bind','value']);if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(p.key)||['x','constructor','prototype','__proto__'].includes(p.key)||names.has(p.key)||typeof p.bind!=='string'||!/^\/derived\/[A-Za-z][A-Za-z0-9_]{0,19}$/.test(p.bind))throw Error('Invalid chart derived input');names.add(p.key);return {key:p.key,bind:p.bind,value:num(p.value)};});
  const variables=Object.fromEntries([...cleanControls,...cleanInputs].map(c=>[c.key,c.value]));
  if(!Array.isArray(input.series)||input.series.length<1||input.series.length>6)throw Error('Chart needs 1–6 series');
  const series=input.series.map((s,index)=>{keys(s,['label','expr','points','tone','keyPoints','breaks']);const out={label:text(s.label),tone:tone(s.tone??['primary','secondary','accent','warning','muted','primary'][index])};if((s.expr!==undefined)===(s.points!==undefined))throw Error('Choose chart expression OR points');if(s.expr!==undefined){out.expr=text(s.expr,300);let valid=false;for(const q of [x.min,(x.min+x.max)/2,x.max]){try{evaluate(out.expr,{...variables,x:q});valid=true;}catch(e){if(!/Numeric overflow|Division by zero/.test(e.message))throw e;}}if(!valid)throw Error('Chart expression has no finite sample');}else out.points=points(s.points,2);for(const field of ['keyPoints','breaks'])if(s[field]!==undefined){if(!out.expr||!Array.isArray(s[field])||s[field].length>32||s[field].some(v=>typeof v!=='number'||!Number.isFinite(v)||v<x.min||v>x.max))throw Error('Invalid chart '+field);out[field]=[...new Set(s[field])].sort((a,b)=>a-b);}return out;});
  const regions=input.regions??[];if(!Array.isArray(regions)||regions.length>8)throw Error('Too many chart regions');
  return {title:text(input.title),x,y,series,controls:cleanControls,...(cleanInputs.length?{inputs:cleanInputs}:{}),regions:regions.map(r=>{keys(r,['label','points','tone']);return {label:text(r.label),points:points(r.points,3),tone:tone(r.tone)};}),note:text(input.note??'',600)};
}
function validateChartState(spec,value={}){
  if(value===null)value={};
  if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid chart state');
  const out={};for(const c of spec.controls){const v=value[c.key]??c.value;assertSliderValue({...c,...(c.options?{options:c.options.map(o=>o.value)}:{})},v,'Chart parameter');out[c.key]=v;}
  for(const p of spec.inputs??[])out[p.key]=value[p.key]===undefined?p.value:typeof value[p.key]==='number'&&Number.isFinite(value[p.key])?value[p.key]:NaN;
  if(Object.keys(value).some(k=>![...spec.controls,...(spec.inputs??[])].some(c=>c.key===k)))throw Error('Unknown chart parameter');
  return out;
}

/** Whole-domain baseline followed by breadth-first, bounded refinement. */
function sampleChartSeries(series,spec,values={}){
  if(series.points)return series.points;
  const a=spec.x.min,b=spec.x.max,range=spec.y.max-spec.y.min,limit=4096,cache=new Map(),cuts=[a,...(series.breaks??[]).filter(x=>x>a&&x<b),b].sort((x,y)=>x-y);
  const value=x=>{if(cache.has(x))return cache.get(x);let y=null;try{y=evaluate(series.expr,{...values,x});}catch{}cache.set(x,y);return y;};
  const points=new Map(),queue=[],breaks=new Set(cuts.slice(1,-1));let limited=false;
  const count=Math.min(320,Math.max(16,Math.floor((limit-128)/(cuts.length-1))-2));
  for(let part=0;part<cuts.length-1;part++){
    const epsilon=Math.min((b-a)*1e-10,(cuts[part+1]-cuts[part])/4),lo=part?cuts[part]+epsilon:a,hi=part<cuts.length-2?cuts[part+1]-epsilon:b;
    const xs=[...new Set([...Array.from({length:count+1},(_,i)=>lo+(hi-lo)*i/count),...(series.keyPoints??[]).filter(x=>x>=lo&&x<=hi)])].sort((x,y)=>x-y);
    for(const x of xs)points.set(x,value(x));for(let i=0;i<xs.length-1;i++)queue.push([xs[i],xs[i+1],0]);
  }
  for(let cursor=0;cursor<queue.length;cursor++){
    const [x0,x1,depth]=queue[cursor],x=(x0+x1)/2,y0=value(x0),y1=value(x1),y=value(x);
    const bend=y!==null&&y0!==null&&y1!==null&&Math.abs(y-(y0+y1)/2)>range/800,transition=[y0,y,y1].some(v=>v===null)&&[y0,y,y1].some(v=>v!==null);
    if(!(bend||transition)||depth>=8||x<=x0||x>=x1)continue;
    if(points.size+breaks.size>=limit){limited=true;continue;}
    points.set(x,y);queue.push([x0,x,depth+1],[x,x1,depth+1]);
  }
  for(const x of breaks)points.set(x,null);const out=[...points].sort((a,b)=>a[0]-b[0]);out.limited=limited;return out;
}

/** Cross-domain data graphics: the engine owns layout, labels and theme. */
function semanticGraphic(input){
  if(!input||Object.keys(input).some(k=>!['type','kind','title','items','unit'].includes(k)))throw Error('Unknown graphic field');
  if(!['bars','donut','vectors'].includes(input.kind)||!Array.isArray(input.items)||input.items.length<1||input.items.length>12)throw Error('Graphic needs bars/donut/vectors and 1–12 items');
  const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const title=input.title??'图解',unit=input.unit??'';if(typeof title!=='string'||title.length>100||typeof unit!=='string'||unit.length>20)throw Error('Invalid graphic title/unit');
  const tones=['primary','secondary','accent','warning','muted'];
  const items=input.items.map((x,i)=>{if(!x||Object.keys(x).some(k=>!['label','value','x','y','tone'].includes(k))||typeof x.label!=='string'||!x.label.trim()||x.label.length>80||x.tone!==undefined&&!tones.includes(x.tone))throw Error('Invalid graphic item');const keys=input.kind==='vectors'?['x','y']:['value'];for(const k of keys)if(typeof x[k]!=='number'||!Number.isFinite(x[k])||Math.abs(x[k])>1e9)throw Error('Graphic requires bounded numeric values');if(input.kind!=='vectors'&&x.value<0)throw Error('Use nonnegative graphic values');return {...x,tone:x.tone??tones[i%tones.length]};});
  const tone=x=>'var(--vie-'+x.tone+')',num=x=>Number(x.toPrecision(5)).toString(),total=items.reduce((s,x)=>s+(x.value??0),0),max=Math.max(1,...items.map(x=>x.value??Math.hypot(x.x,x.y)));
  let graphic='';
  if(input.kind==='bars')graphic='<div class="graphic-bars">'+items.map(x=>`<div class="graphic-item"><div class="graphic-line"><span>${esc(x.label)}</span><strong>${num(x.value)} ${esc(unit)}</strong></div><div class="graphic-track"><div style="width:${100*x.value/max}%;background:${tone(x)}"></div></div></div>`).join('')+'</div>';
  else if(input.kind==='donut'){
    if(total<=0)throw Error('Donut total must be positive');let start=0;const slices=items.map(x=>{const v=100*x.value/total,s=`${tone(x)} ${start}% ${start+v}%`;start+=v;return s;});
    graphic=`<div class="graphic-split"><div class="graphic-donut" role="img" aria-label="${esc(title)}" style="background:conic-gradient(${slices.join(',')})"><div><strong>${num(total)}</strong><span>${esc(unit)}</span></div></div><div class="graphic-list">${items.map(x=>`<div class="graphic-line"><span><i style="background:${tone(x)}"></i>${esc(x.label)}</span><strong>${num(x.value)} <small>${(100*x.value/total).toFixed(1)}%</small></strong></div>`).join('')}</div></div>`;
  }else{
    const scale=145/max;graphic=`<div class="graphic-split"><svg viewBox="0 0 360 360" role="img" aria-label="${esc(title)}"><path d="M20 180H340M180 340V20" stroke="var(--vie-muted)" opacity=".5"/><text x="333" y="173" fill="var(--vie-ink)" font-size="14">x</text><text x="190" y="25" fill="var(--vie-ink)" font-size="14">y</text>${items.map((x,i)=>{const px=180+x.x*scale,py=180-x.y*scale,angle=Math.atan2(-x.y,x.x)*180/Math.PI;return `<g stroke="${tone(x)}" fill="${tone(x)}"><path d="M180 180L${px} ${py}" stroke-width="3"/><path d="M-11 -5L0 0L-11 5Z" transform="translate(${px} ${py}) rotate(${angle})"/></g>`;}).join('')}</svg><div class="graphic-list">${items.map(x=>`<div class="graphic-line"><span><i style="background:${tone(x)}"></i>${esc(x.label)}</span><strong>(${num(x.x)}, ${num(x.y)}) ${esc(unit)}</strong></div>`).join('')}</div></div>`;
  }
  return validateFigureDefinition({title,html:'<div class="graphic">'+graphic+'</div>',height:360,css:'.graphic{font-size:14px;line-height:1.6}.graphic-split{display:grid;grid-template-columns:minmax(180px,1fr) minmax(180px,1.2fr);gap:24px;align-items:center}.graphic-list,.graphic-bars{display:grid;gap:14px}.graphic-line{display:flex;gap:12px;justify-content:space-between;align-items:baseline;flex-wrap:wrap}.graphic-line>span{overflow-wrap:anywhere}.graphic-line strong{font-variant-numeric:tabular-nums}.graphic-line i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:7px}.graphic-line small{color:var(--vie-muted);margin-left:8px}.graphic-track{height:12px;border-radius:6px;background:var(--vie-layer);overflow:hidden;margin-top:5px}.graphic-track>div{height:100%;border-radius:6px}.graphic-donut{width:220px;aspect-ratio:1;border-radius:50%;display:grid;place-items:center;justify-self:center}.graphic-donut>div{width:65%;height:65%;border-radius:50%;background:var(--vie-bg);display:flex;flex-direction:column;justify-content:center;align-items:center}.graphic-donut strong{font-size:25px}.graphic svg{width:100%}@media(max-width:520px){.graphic-split{grid-template-columns:minmax(0,1fr);gap:18px}.graphic-donut{width:min(220px,90%)}}'});
}

/** Topic-independent document and generated-figure contract. No topic allowlist. */
/** Topic-neutral learning data. Never execute authored JavaScript on the Host. */
function validateLearningDefinition(input,withRoot=false){
 const fail=message=>{throw Error('VIE_LEARNING_INVALID: '+message);};
 const object=(v,path,keys)=>{if(!v||typeof v!=='object'||Array.isArray(v))fail(path+' must be an object');for(const k of Object.keys(v))if(!keys.includes(k))fail(path+'.'+k+' is unknown');};
 const text=(v,path,max=1000)=>{if(typeof v!=='string'||v.length>max)fail(path+' must be text (max '+max+')');return v;};
 const requiredText=(v,path,max=1000)=>{const s=text(v,path,max);if(!s.trim())fail(path+' must not be blank');return s;};
 object(input,'learning',['type','title','key','legend','note','stages','quiz',...(withRoot?['root']:[])]);
 const out={title:requiredText(input.title??'交互演示','title',100),key:input.key??'learning'};
 if(typeof out.key!=='string'||!/^[a-zA-Z][\w-]{0,30}$/.test(out.key)||['__proto__','constructor','prototype'].includes(out.key))fail('key is invalid');
 for(const k of ['legend','note'])if(input[k]!==undefined)out[k]=text(input[k],k);
 const stages=input.stages??[];if(!Array.isArray(stages)||stages.length>8)fail('stages needs 0–8 entries');
 out.stages=stages.map((s,i)=>{const p='stages['+i+']';object(s,p,['label','title','caption','html','mobileHtml']);const v={label:requiredText(s.label??String(i+1),p+'.label',80),html:requiredText(s.html,p+'.html',16000)};for(const k of ['title','caption','mobileHtml'])if(s[k]!==undefined)v[k]=k==='mobileHtml'?requiredText(s[k],p+'.'+k,16000):text(s[k],p+'.'+k);return v;});
 if(input.quiz!==undefined){const q=input.quiz;object(q,'quiz',['question','options','correct']);if(!Array.isArray(q.options)||q.options.length<2||q.options.length>6)fail('quiz.options needs 2–6 entries');if(!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.options.length)fail('quiz.correct must be a zero-based option index; do not infer an answer from feedback');out.quiz={question:requiredText(q.question,'quiz.question'),correct:q.correct,options:q.options.map((o,i)=>{object(o,'quiz.options['+i+']',['label','feedback']);return {label:requiredText(o.label,'quiz.options['+i+'].label'),...(o.feedback!==undefined?{feedback:text(o.feedback,'quiz.options['+i+'].feedback')}:{})};})};}
 if(!out.stages.length&&!out.quiz)fail('stages or quiz is required');
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

function validateFigureState(input={}){
  const plain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&(Object.getPrototypeOf(x)===Object.prototype||Object.getPrototypeOf(x)===null);
  let nodes=0;
  const visit=(v,depth)=>{
    if(++nodes>256||depth>6)throw Error('Figure state is too complex');
    if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return;
    if(typeof v==='string'&&v.length<=2000)return;
    if(Array.isArray(v)&&v.length<=128){v.forEach(x=>visit(x,depth+1));return;}
    if(plain(v)&&Object.keys(v).length<=32){for(const [k,x]of Object.entries(v)){if(k.length>80||['__proto__','constructor','prototype'].includes(k))throw Error('Invalid figure state key');visit(x,depth+1);}return;}
    throw Error('Figure state must contain bounded JSON data');
  };
  if(!plain(input))throw Error('Figure state must be an object');visit(input,0);
  if(new TextEncoder().encode(JSON.stringify(input)).length>8192)throw Error('Figure state exceeds 8KB');
  return JSON.parse(JSON.stringify(input));
}
function validateFigureDefinition(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype)throw Error('Figure requires an object');
  for(const key of Object.keys(input))if(!DOCUMENT_CONTRACT.blocks.figure.fields.includes(key)&&key!=='type')throw Error('Unknown figure field: '+key);
  const bounded=(value,max,label)=>{if(typeof value!=='string'||new TextEncoder().encode(value).length>max)throw Error('Figure '+label+' exceeds limit or is not text');return value;};
  const result={title:bounded(input.title??'交互图解',300,'title'),html:bounded(input.html??'',16384,'html'),css:bounded(input.css??'',8192,'css'),js:bounded(input.js??'',32768,'js'),height:input.height??360,state:validateFigureState(input.state??{})};
  if(input.bindings!==undefined){
    if(!input.bindings||typeof input.bindings!=='object'||Array.isArray(input.bindings)||Object.keys(input.bindings).length>8)throw Error('Invalid figure bindings');
    result.bindings={};for(const [key,ref]of Object.entries(input.bindings)){if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(key)||['constructor','prototype','__proto__'].includes(key)||typeof ref!=='string'||!/^\/(shared|derived)\/[A-Za-z][A-Za-z0-9_]{0,19}$/.test(ref))throw Error('Invalid figure binding');result.bindings[key]=ref;}
  }
  if(!result.html.trim())throw Error('Figure html must not be empty');
  validateLearningCalls(result.js);
  if(!Number.isInteger(result.height)||result.height<160||result.height>1000)throw Error('Figure height must be 160–1000');
  if(/<(?:iframe|frame|object|embed|base)\b|<meta\b[^>]*http-equiv\s*=\s*["']?refresh/i.test(result.html))throw Error('Figure must be self-contained; nested browsing contexts and refresh are not supported');
  if(new TextEncoder().encode(JSON.stringify(result)).length>60000)throw Error('Figure exceeds serialized 60KB limit');
  return result;
}
function validateDocumentSpec(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype)throw Error('Document requires an object');
  if(input.caption!==undefined){if(typeof input.caption!=='string'||input.caption.length>140)throw Error('document.caption must be text of at most 140 characters');const {caption,...rest}=input;input=rest;}
  if(input.title===undefined){const first=input.blocks?.[0]?.title;input={...input,title:typeof first==='string'&&first.trim()?first.trim().slice(0,100):'交互图解'};}
  for(const key of Object.keys(input))if(!DOCUMENT_CONTRACT.fields.includes(key))throw Error('Unknown document field: '+key);
  if(typeof input.title!=='string'||!input.title.trim()||input.title.length>100)throw Error('Document requires a short title');
  if(!Array.isArray(input.blocks)||input.blocks.length<1||input.blocks.length>12)throw Error('Document requires 1–12 ordered blocks');
  const controls=input.controls===undefined?[]:validateChartSpec({title:'shared',controls:input.controls,series:[{label:'validation',expr:'x'}]}).controls;
  if(controls.some(c=>c.bind))throw Error('Document controls cannot contain bind');
  const derive=input.derive??{};
  if(!derive||typeof derive!=='object'||Array.isArray(derive)||Object.getPrototypeOf(derive)!==Object.prototype||Object.keys(derive).length>8)throw Error('Invalid document derive');
  const formulas={},state=Object.fromEntries(controls.map(c=>['/shared/'+c.key,c.value]));
  for(const [key,expr]of Object.entries(derive)){if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(key)||['x','constructor','prototype','__proto__'].includes(key)||controls.some(c=>c.key===key)||typeof expr!=='string'||expr.length>300)throw Error('Invalid derived key/expression');formulas['/derived/'+key]=expr;}
  const issues=validateFormulas({state,formulas});if(issues.length)throw Error(issues.join('; '));
  const computed=computeDerived({state,formulas});if(computed.failures.size)throw Error('Initial derived value unavailable: '+[...computed.failures.values()].join('; '));
  const values=computed.values;
  const resolve=ref=>{const key=Object.hasOwn(state,'/shared/'+ref)?'/shared/'+ref:'/derived/'+ref;if(!Object.hasOwn(values,key))throw Error('Unknown shared binding: '+ref);return key;};
  if(input.layout!==undefined&&!['stack','grid'].includes(input.layout))throw Error('Unknown document layout');
  let figures=0;
  const blocks=input.blocks.map((raw,index)=>{try{
    let block=raw;
    if(block?.type==='learning'){
      const lesson=validateLearningDefinition(block);
      block={type:'figure',title:lesson.title,html:'<div id="vie-lesson"></div>',js:'VIE.mountLearning('+JSON.stringify({...lesson,root:'#vie-lesson'})+');'};
    }
    // Normalize only unambiguous legacy aliases, then apply the regular validators.
    if(block&&block.type===undefined&&['text','figure','chart','experiment'].includes(block.kind)){const {kind,...rest}=block;block={type:kind,...rest};}
    if(block&&block.type===undefined&&block.kind===undefined&&typeof block.html==='string'&&Object.keys(block).every(k=>DOCUMENT_CONTRACT.blocks.figure.fields.includes(k)))block={type:'figure',...block};
    if(block&&['Flow','RelationGraph','Timeline','Diagram','Animation'].includes(block.kind)&&block.spec&&(!block.type||block.type==='visual')){const {title,...rest}=block;block={...rest,type:'visual',spec:{...block.spec,...(!block.spec.title&&title?{title}:{})}};}
    if(!block||typeof block!=='object'||Array.isArray(block))throw Error('Invalid document block');
    const contract=DOCUMENT_CONTRACT.blocks[block.type];if(contract)for(const key of Object.keys(block))if(!contract.fields.includes(key))throw Error('Unknown '+block.type+' field: '+key);
    if(block.type==='graphic'){if(++figures>4)throw Error('Use at most four figures per document');return {type:'figure',...semanticGraphic(block)};}
    if(block.type==='figure'){
      if(++figures>4)throw Error('Use at most four figures per document');
      const {type,...spec}=block;
      if(spec.bindings){const bindings={},initial={...spec.state};for(const [key,ref]of Object.entries(spec.bindings)){const path=ref.startsWith('/')?ref:resolve(ref);if(!Object.hasOwn(values,path))throw Error('Unknown figure shared input: '+ref);bindings[key]=path;initial[key]=values[path];}spec.bindings=bindings;spec.state=initial;}
      return {type,...validateFigureDefinition(spec)};
    }
    if(block.type==='text'){
      for(const key of Object.keys(block))if(!['type','title','body'].includes(key))throw Error('Unknown text block field');
      if(typeof block.body!=='string'||block.body.length>1400||block.title!==undefined&&(typeof block.title!=='string'||block.title.length>100))throw Error('Invalid paragraph');
      return {type:'text',...(block.title===undefined?{}:{title:block.title}),body:block.body};
    }
    if(block.type==='chart'){
      const {type,bindings,...spec}=block;
      if(bindings!==undefined){
        if(!bindings||typeof bindings!=='object'||Array.isArray(bindings)||Object.getPrototypeOf(bindings)!==Object.prototype||Object.keys(bindings).length>4)throw Error('Invalid chart bindings');
        spec.controls=[...(spec.controls??[])];spec.inputs=[...(spec.inputs??[])];
        for(const [key,ref]of Object.entries(bindings)){if(typeof ref!=='string')throw Error('Invalid chart binding target');const path=resolve(ref),c=controls.find(c=>c.key===ref);if(c)spec.controls.push({...c,key,bind:path});else spec.inputs.push({key,bind:path,value:values[path]});}
      }
      const clean=validateChartSpec(spec);
      for(const c of clean.controls.filter(c=>c.bind)){const original=controls.find(x=>'/shared/'+x.key===c.bind);if(!original||['min','max','step','value','kind','options'].some(k=>JSON.stringify(c[k])!==JSON.stringify(original[k])))throw Error('Shared chart bounds must match document control');}
      for(const p of clean.inputs??[])if(!Object.hasOwn(formulas,p.bind)||p.value!==values[p.bind])throw Error('Unknown/mismatched derived chart input');
      return {type,...clean};
    }
    if(block.type==='visual'){
      for(const key of Object.keys(block))if(!['type','kind','spec'].includes(key))throw Error('Unknown visual block field');
      const spec=validateVisualSpec(block.kind,block.spec);
      for(const shape of spec.shapes??[])for(const value of Object.values(shape))if(value&&typeof value==='object'&&value.$bind&&!Object.hasOwn(values,value.$bind))throw Error('Unknown diagram binding: '+value.$bind);
      return {type:'visual',kind:block.kind,spec};
    }
    if(block.type==='experiment'){
      const {type,...spec}=block;return {type,...validateExperimentSpec(spec)};
    }
    throw Error('Unknown document block type: '+block.type);
  }catch(error){error.path='blocks['+index+']'+(error.path?'.spec.'+error.path:'');error.message=error.path+': '+error.message;throw error;}});
  return {title:input.title,...controls.length?{controls}:{},...(Object.keys(derive).length?{derive:{...derive}}:{}),...(input.layout?{layout:input.layout}:{}),blocks};
}
function documentSceneSource(input){
  const spec=validateDocumentSpec(input),events=[{v:1,op:'surface.begin',id:'document-scene'}];
  if(spec.layout==='grid'&&spec.controls?.length)events.push({v:1,op:'node.put',id:'document-controls',order:0,type:'Row',props:{}});
  (spec.controls??[]).forEach((c,i)=>events.push({v:1,op:'node.put',id:'shared-'+c.key,order:i,...(spec.layout==='grid'?{parent:'document-controls'}:{}),type:CONTROL_TYPES[c.kind??'slider'],props:{label:c.label,bind:'/shared/'+c.key,default:c.value,min:c.min,max:c.max,step:c.step,...(c.options?{options:c.options}:{})}}));
  for(const [key,expr]of Object.entries(spec.derive??{}))events.push({v:1,op:'state.derive',path:'/derived/'+key,expr});
  if(spec.layout==='grid')events.push({v:1,op:'node.put',id:'document-grid',order:(spec.controls??[]).length,type:'Row',props:{}});
  spec.blocks.forEach((block,i)=>{
    const {type,...data}=block;
    const nodeType=type==='text'?'Text':type==='figure'?'GenerativeFigure':type==='chart'?'Chart':type==='experiment'?'InteractiveScene':data.kind;
    const props=type==='visual'?data.spec:data;
    events.push({v:1,op:'node.put',id:'block'+(i+1),order:i+(spec.controls?.length??0),...(spec.layout==='grid'?{parent:'document-grid'}:{}),type:nodeType,props});
  });
  events.push({v:1,op:'surface.end',id:'document-scene'});
  const source=events.map(e=>JSON.stringify(e)+'\n').join('');
  if(new TextEncoder().encode(source).length>262144)throw Error('Document exceeds 256KB');
  return source;
}

const {VISUAL_KINDS,visualNodeProps,validateVisualSpec,visualSceneSource,sceneStateEvents}=(()=>{
/** VIE generic visual catalog: a single strict schema for Host and browser.
 * Only validated DATA reaches the SVG generator. No JS, HTML, URLs or CSS.
 */
const VISUAL_KINDS=Object.freeze(['Flow','RelationGraph','Timeline','Diagram','Animation']);
const VISUAL_LIMITS=Object.freeze({nodes:12,edges:20,items:12,shapes:256,labels:144,coordinate:1200,commands:1024});
const PL=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
const err=m=>{throw Error('Visual schema: '+m);};
const keys=(o,allowed)=>{if(!PL(o))err('expected plain object');for(const k of Object.keys(o))if(!allowed.includes(k))err('forbidden field '+k);};
const str=(v,max=80)=>{if(typeof v!=='string'||v.length>max||/[\x00-\x08\x0b\x0e-\x1f]/.test(v))err('invalid text');return v;};
const num=(v,min,max)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max)err('invalid number');return v;};
const id=x=>{if(typeof x!=='string'||! /^[A-Za-z][A-Za-z0-9_-]{0,43}$/.test(x))err('invalid id');return x;};
const tone=v=>{if(!['primary','secondary','accent','muted','warning'].includes(v))err('invalid color token');return v;};
const motionEase=v=>{if(!['linear','inOut'].includes(v))err('unsupported easing');return v;};
const role=v=>{if(!['default','input','output','fixed','step','important','neutral'].includes(v))err('invalid role');return v;};
const pathData=v=>{
  str(v,16000);
  // SVG 2D path subset. Reject script, URLs, exponents and non-path syntax.
  if(!/^[MmLlHhVvQqCcAaZz\d\-+.,\s]+$/.test(v))err('path command not allowed');
  if((v.match(/[MmLlHhVvQqCcAaZz]/g)||[]).length>VISUAL_LIMITS.commands)err('too many path commands');
  const numbers=v.match(/[-+]?(?:\d+\.?\d*|\.\d+)/g)||[];
  if(numbers.some(n=>!Number.isFinite(Number(n))||Math.abs(Number(n))>VISUAL_LIMITS.coordinate))err('path coordinate out of range');
  if(!/[Mm]/.test(v))err('path must start from moveto');
  return v;
};
function validateShape(obj){
  keys(obj,['k','id','label','detail','anchor','x','y','x1','y1','x2','y2','cx','cy','r','w','h','rx','ry','points','d','t','tone','fill','strokeWidth']);
  const k=str(obj.k,16);if(!['line','arrow','circle','rect','ellipse','polyline','path','text'].includes(k))err('unsupported shape '+k);
  const s={k};if(obj.id!==undefined)s.id=id(obj.id);
  if(obj.label!==undefined)s.label=str(obj.label,52);
  if(obj.detail!==undefined)s.detail=str(obj.detail,160);
  if(obj.anchor!==undefined){if(k!=='text'||!['start','middle','end'].includes(obj.anchor))err('invalid text anchor');s.anchor=obj.anchor;}
  if(obj.tone!==undefined)s.tone=tone(obj.tone);
  if(obj.fill!==undefined){if(typeof obj.fill!=='boolean')err('fill must be boolean');s.fill=obj.fill;}
  if(obj.strokeWidth!==undefined)s.strokeWidth=num(obj.strokeWidth,.5,8);
  const boundCoord=(value,min=-1200,max=1200)=>{
  if(typeof value==='number')return num(value,min,max);
  keys(value,['$bind','scale','offset']);
  if(typeof value.$bind!=='string'||!/^\/[A-Za-z][A-Za-z0-9_/-]{0,95}$/.test(value.$bind)||value.$bind.includes('//'))err('invalid geometric binding');
  return {$bind:value.$bind,...(value.scale===undefined?{}:{scale:num(value.scale,-100,100)}),...(value.offset===undefined?{}:{offset:num(value.offset,-1200,1200)})};
};
  const fields={line:['x1','y1','x2','y2'],arrow:['x1','y1','x2','y2'],circle:['cx','cy','r'],rect:['x','y','w','h'],ellipse:['cx','cy','rx','ry'],text:['x','y'],polyline:[],path:[]};
  for(const f of fields[k]){if(obj[f]===undefined)err('missing '+f);s[f]=boundCoord(obj[f],f==='r'||f==='w'||f==='h'||f==='rx'||f==='ry'?0:-1200,1200);}
  if(k==='rect')for(const optional of ['rx','ry'])if(obj[optional]!==undefined)s[optional]=boundCoord(obj[optional],0,200);
  if(k==='polyline'){
    if(!Array.isArray(obj.points)||obj.points.length<2||obj.points.length>512)err('invalid polyline');
    s.points=obj.points.map(p=>{if(!Array.isArray(p)||p.length!==2)err('invalid point');return [num(p[0],-1200,1200),num(p[1],-1200,1200)];});
  }
  if(k==='path')s.d=pathData(obj.d);
  if(k==='text'){if(obj.t===undefined)err('missing label');s.t=str(obj.t,72);}
  for(const f of ['x','y','x1','y1','x2','y2','cx','cy','r','w','h','rx','ry','points','d','t'])if(obj[f]!==undefined&&!Object.hasOwn(s,f))err('field not applicable: '+f);
  return s;
}
function validateNode(n){
  keys(n,['id','label','detail','role']);
  return {id:id(n.id),label:str(n.label,52),...(n.detail===undefined?{}:{detail:str(n.detail,160)}),...(n.role===undefined?{}:{role:role(n.role)})};
}
function validateEdge(e,known){
  keys(e,['from','to','label','kind']);
  const from=id(e.from),to=id(e.to);
  if(!known.has(from)||!known.has(to))err('unknown edge endpoint '+[from,to].filter(x=>!known.has(x)).join(', ')+'; valid node ids: '+[...known].join(', '));
  if(e.kind!==undefined&&!['arrow','line','supports','meshes','depends'].includes(e.kind))err('invalid edge kind');
  return {from,to,...(e.label===undefined?{}:{label:str(e.label,45)}),...(e.kind===undefined?{}:{kind:e.kind})};
}
function validateVisualSpec(kind,value){
  if(!VISUAL_KINDS.includes(kind))err('unknown visual kind');
  keys(value,['title','subtitle','layout','nodes','edges','items','shapes','width','height','accuracy','representation','duration','motions']);
  const result={title:str(value.title??'',100)};
  if(value.subtitle!==undefined)result.subtitle=str(value.subtitle,160);
  if(value.accuracy!==undefined){if(!['schematic','calculated','validated'].includes(value.accuracy))err('invalid accuracy');result.accuracy=value.accuracy;}
  if(value.representation!==undefined){if(!['structure','pitch-circles'].includes(value.representation)||!['Diagram','Animation'].includes(kind))err('invalid representation');result.representation=value.representation;}
  if(kind==='Flow'||kind==='RelationGraph'){
    if(!Array.isArray(value.nodes)||value.nodes.length<2||value.nodes.length>VISUAL_LIMITS.nodes)err('node count');
    const nodes=value.nodes.map(validateNode),known=new Set(nodes.map(n=>n.id));
    if(known.size!==nodes.length)err('duplicate node id');
    const edges=value.edges??[];
    if(!Array.isArray(edges)||edges.length>VISUAL_LIMITS.edges)err('edge count');
    result.nodes=nodes;result.edges=edges.map((e,i)=>{try{return validateEdge(e,known);}catch(error){error.path='edges['+i+']';throw error;}});
    const allowed=kind==='Flow'?['auto','horizontal','vertical']:['auto','radial','grid'];
    if(value.layout!==undefined){if(!allowed.includes(value.layout))err('layout not supported');result.layout=value.layout;}
    if(kind==='Flow' && !result.edges.length)result.edges=nodes.slice(0,-1).map((n,i)=>({from:n.id,to:nodes[i+1].id,kind:'arrow'}));
  } else if(kind==='Timeline'){
    if(!Array.isArray(value.items)||value.items.length<2||value.items.length>VISUAL_LIMITS.items)err('timeline count');
    result.items=value.items.map(item=>{
      keys(item,['id','at','label','detail']);
      return {id:id(item.id),at:str(item.at,28),label:str(item.label,60),...(item.detail===undefined?{}:{detail:str(item.detail,160)})};
    });
    if(new Set(result.items.map(i=>i.id)).size!==result.items.length)err('duplicate item id');
  } else {
    if(!Array.isArray(value.shapes)||value.shapes.length<1||value.shapes.length>VISUAL_LIMITS.shapes)err('shape count');
    if(value.shapes.filter(s=>s.k==='text').length>VISUAL_LIMITS.labels)err('too many labels');
    result.width=num(value.width??640,160,1200);
    result.height=num(value.height??280,120,850);
    result.shapes=value.shapes.map(validateShape);
    if(kind==='Animation'){
      result.duration=num(value.duration??4,.5,30);
      if(!Array.isArray(value.motions)||value.motions.length<1||value.motions.length>8)err('animation must contain 1–8 motions');
      const ids=new Set(result.shapes.filter(s=>s.id).map(s=>s.id));
      result.motions=value.motions.map(m=>{
        keys(m,['id','kind','degrees','cx','cy','dx','dy','ease','cycles']);
        const name=id(m.id);if(!ids.has(name))err('animation references unknown shape');
        const cycles=m.cycles===undefined?1:num(m.cycles,-20,20);if(!Number.isInteger(cycles)||cycles===0)err('cycles must be a nonzero integer');
        if(m.kind==='rotate'){if(m.degrees===undefined||m.cx===undefined||m.cy===undefined)err('rotation needs angle and pivot');return {id:name,kind:'rotate',degrees:num(m.degrees,-1440,1440),cx:num(m.cx,-1200,1200),cy:num(m.cy,-1200,1200),cycles,ease:m.ease===undefined?'linear':motionEase(m.ease)};}
        if(m.kind==='translate'){if(m.dx===undefined||m.dy===undefined)err('translation needs dx and dy');return {id:name,kind:'translate',dx:num(m.dx,-1200,1200),dy:num(m.dy,-1200,1200),cycles,ease:m.ease===undefined?'linear':motionEase(m.ease)};}
        err('unsupported motion kind');
      });
      const motionCount=new Map();for(const m of result.motions){const n=(motionCount.get(m.id)||0)+1;if(n>3)err('too many motions for one shape');motionCount.set(m.id,n);}
    }
    const used=result.shapes.filter(s=>s.id).map(s=>s.id);
    if(new Set(used).size!==used.length)err('duplicate shape id');
  }
  // Unsupported properties cannot silently disappear and mislead the user.
  for(const key of ['nodes','edges','items','shapes','width','height','layout','duration','motions'])if(value[key]!==undefined&&!Object.hasOwn(result,key))err('field not applicable: '+key);

  return result;
}

function visualNodeProps(type,props){
  if(!VISUAL_KINDS.includes(type))err('unsupported visual node');
  // The node's props are the spec itself; share identical rules in Host and Client.
  return validateVisualSpec(type,props);
}

/** Short model-facing API: kind + domain facts, not a hand-written JSONL stream. */
function sceneStateEvents(options={}){
  if(!options||typeof options!=='object'||Array.isArray(options))throw Error('Invalid scene state');
  const events=[];
  for(const [name,op] of [['state','state.init'],['derive','state.derive']]){
    const entries=options[name]??{};
    if(!PLAIN(entries)||Object.keys(entries).length>24)throw Error('Scene '+name+' requires at most 24 entries');
    for(const [key,value] of Object.entries(entries))events.push(validateEvent({v:1,op,path:key,...(op==='state.init'?{value}:{expr:value})}));
  }
  return events;
}
function visualSceneSource(kind,spec,options={}){
  const clean=validateVisualSpec(kind,spec);
  const events=[{v:1,op:'surface.begin',id:'visual-scene'},...sceneStateEvents(options),
    {v:1,op:'node.put',id:'visual',type:kind,props:clean},
    {v:1,op:'surface.end',id:'visual-scene'}];
  const lines=events.map(e=>JSON.stringify(e)+'\n');
  if(lines.some(line=>new TextEncoder().encode(line).length>65536))err('diagram is too large for one VIE JSONL event');
  return lines.join('');
}

return {VISUAL_KINDS,visualNodeProps,validateVisualSpec,visualSceneSource,sceneStateEvents};
})();
const {storySceneSource,validateStorySpec}=(()=>{
/** Multi-panel semantic answer. Preserve the authored teaching sequence. */
const checkText=(x,max)=>{if(typeof x!=='string'||x.length>max)throw Error('Story: invalid text');return x;};
function validateStorySpec(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype)throw Error('Story: invalid object');
  for(const k of Object.keys(input))if(!['title','opening','takeaway','panels','state','derive'].includes(k))throw Error('Story: forbidden field '+k);
  if(!Array.isArray(input.panels)||input.panels.length<1||input.panels.length>4)throw Error('Story: requires 1–4 panels');
  const panels=input.panels.map(p=>{
    if(!p||typeof p!=='object'||Array.isArray(p))throw Error('Story: invalid panel');
    for(const k of Object.keys(p))if(!['kind','spec','caption'].includes(k))throw Error('Story: forbidden panel field '+k);
    if(!VISUAL_KINDS.includes(p.kind)&&p.kind!=='InteractiveScene')throw Error('Story: invalid panel kind');
    return {kind:p.kind,spec:p.kind==='InteractiveScene'?validateExperimentSpec(p.spec):validateVisualSpec(p.kind,p.spec),caption:p.caption===undefined?'':checkText(p.caption,1200)};
  });
  return {title:checkText(input.title??'交互图文解释',90),opening:checkText(input.opening??'',1200),takeaway:checkText(input.takeaway??'',1200),panels,state:input.state??{},derive:input.derive??{}};
}
function storySceneSource(input){
  const s=validateStorySpec(input),panel=[...s.panels];
  const ev=[{v:1,op:'surface.begin',id:'story-scene'},...sceneStateEvents(s)];
  let order=0;
  const put=(type,props)=>{ev.push({v:1,op:'node.put',id:'panel'+(++order),order,type,props});};
  panel.forEach((p,i)=>{
    put(p.kind,p.spec);
    // Keep paragraphs independent so individual live-text budgets stay bounded.
    if(i===0&&s.opening)put('Text',{body:s.opening});
    if(p.caption)put('Text',{body:p.caption});
  });
  if(s.takeaway)put('Text',{title:'核心结论',body:s.takeaway});
  ev.push({v:1,op:'surface.end',id:'story-scene'});
  const lines=ev.map(e=>JSON.stringify(e)+'\n');
  const enc=new TextEncoder();if(lines.some(line=>enc.encode(line).length>65536))throw Error('Story: panel exceeds per-event bound');
  if(enc.encode(lines.join('')).length>262144)throw Error('Story: total source too large');
  return lines.join('');
}

return {storySceneSource,validateStorySpec};
})();
/** VIE v0.14.1 - pure, dependency-free, browser/Node compatible core.
 * DSL input is bounded data; generated figure scripts run only in isolated frames. */
const LIMITS = Object.freeze({bytes: 262144, line: 65536, events: 300, nodes: 80, depth: 10});

/** Authoritative VIE v1 component-property contract. A property must have a
 * meaningful renderer/runtime consumer before it can be listed here. */
const COMPONENT_CATALOG=Object.freeze({
  Chart:{props:['title','x','y','series','controls','inputs','regions','note'],description:'General formula/data chart with local controls and region fills; no generated code required'},
  GenerativeFigure:{props:['title','html','css','js','height','state','bindings'],description:'Topic-independent generated HTML/CSS/JS, isolated iframe; SVG/Canvas/WebGL and custom interaction, not bound to experiment templates'},
  Column:{props:[],description:'Vertical layout'}, Row:{props:[],description:'Horizontal layout'},
  Split:{props:['ratio'],description:'Responsive text / visual split layout'},
  Card:{props:['title'],description:'Grouped content'}, Text:{props:['title','body'],description:'Explanatory text'},
  Metric:{props:['label','value','bind','unit','format'],description:'Numeric readout (number/integer/percent/signed)'},
  Slider:{props:['label','bind','default','min','max','step','unit','format'],description:'Bound numeric slider'},
  NumberInput:{props:['label','bind','default','min','max','step','unit','format'],description:'Bound numeric input'},
  Toggle:{props:['label','bind','default','min','max','step'],description:'Numeric 0/1 switch'},
  SegmentedControl:{props:['label','bind','default','min','max','step','options'],description:'Numeric choice buttons'},
  Button:{props:['label','action','target','setValue'],description:'State set/reset action'},
  Progress:{props:['label','value','bind','min','max','unit','expr','format'],description:'Normalized progress with value and percent'},
  BarChart:{props:['title','data','labels','unit','sourceLabel','showAverage'],description:'Evidence-bearing labeled bars (optional aggregate summary)'},
  FunctionPlot:{props:['title','expr','xMin','xMax','yMin','yMax','sampleX'],description:'Configurable Cartesian function plot with optional dynamic sample point'},
  Divider:{props:[],description:'Divider'},Badge:{props:['label','title'],description:'Short label'},
  MotionScene:{props:['title','bind','min','max','unit'],description:'Preset moving-car displacement illustration'},
  CanTimingLab:{props:['clockMHz','prescaler','bs1','bs2','sjw','compareBs1','compareBs2'],description:'bxCAN bit timing experiment'},
  InteractiveLab:{props:['kind'],description:'Built-in bitwise/timer/ohm/fraction/probability/vector lab'},
  InteractiveScene:{props:['template','parameters','title'],description:'Registered experiment: planetary/gears/geartrain/worm/wave/process/vector; use geartrain for 2–6 serial external gears, worm for crossed-axis worm drive; trusted geometry, controls and readouts'},
  Flow:{props:['title','subtitle','layout','nodes','edges','accuracy'],description:'Automatic flow layout'},
  RelationGraph:{props:['title','subtitle','layout','nodes','edges','accuracy'],description:'Automatic relationship graph'},
  Timeline:{props:['title','subtitle','items','accuracy'],description:'Interactive chronological events'},
  Diagram:{props:['title','subtitle','shapes','width','height','accuracy','representation'],description:'Bounded schematic primitives; shapes can have label/detail; geometry is not a domain solver'},
  Animation:{props:['title','subtitle','shapes','width','height','accuracy','representation','duration','motions'],description:'Generic declared transform animation for any topic; use GenerativeFigure for arbitrary per-frame calculations or 3D projection'}
});
const COMPONENT_DESCRIPTIONS=Object.freeze(Object.entries(COMPONENT_CATALOG)
  .map(([type,details])=>`${type} (${details.props.join(',')||'no props'}): ${details.description}`));
const FORMATS=new Set(['number','integer','percent','signed']);
/** Restricted live-text placeholders. No HTML and no eval. */
function templatePaths(template){
  if(typeof template!=='string'||template.length>1400)error('Invalid template text');
  const references=[];let count=0;
  const mask=template.replace(/\\\{\{[^{}]*\}\}/g,'\u0001');
  const pattern=/\{\{([^{}]*)\}\}/g;
  let match;
  while((match=pattern.exec(mask))!==null){
    if(++count>12)error('Too many live text slots');
    const bits=match[1].split('|');const key=path(bits.shift());
    for(const filter of bits){
      if(!/^(integer|fixed:[0-4]|signed:[0-4]|percent:[0-3]|unit:[A-Za-z%°μΩ\u4e00-\u9fff]{1,12})$/.test(filter))error('Invalid text filter: '+filter);
    }
    references.push(key);
  }
  if(mask.replace(pattern,'').includes('{{')||mask.replace(pattern,'').includes('}}'))error('Unclosed text slot');
  return references;
}
function interpolateText(template,values={}){
  templatePaths(template);
  return template.replace(/\\\{\{([^{}]*)\}\}|\{\{([^{}]*)\}\}/g,(literal,escaped,content)=>{
    if(escaped!==undefined)return '{{'+escaped+'}}';
    const [key,...filters]=content.split('|');let value=Object.hasOwn(values,key)?values[key]:null;
    if(typeof value!=='number'||!Number.isFinite(value))return '—';
    let string=Number.isInteger(value)?String(value):String(Number(value.toFixed(2)));
    for(const filter of filters){
      if(filter==='integer')string=String(Math.round(value));
      else if(filter.startsWith('fixed:'))string=value.toFixed(Number(filter.slice(6)));
      else if(filter.startsWith('signed:'))string=(value>0?'+':'')+value.toFixed(Number(filter.slice(7)));
      else if(filter.startsWith('percent:'))string=(value*100).toFixed(Number(filter.slice(8)))+'%';
      else if(filter.startsWith('unit:'))string+=' '+filter.slice(5);
    }
    return string;
  });
}

const ALLOWED = new Set(Object.keys(COMPONENT_CATALOG));
const ID = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const PATH = /^\/[a-zA-Z][a-zA-Z0-9_/-]{0,95}$/;
const PLAIN = x => x !== null && typeof x === 'object' && !Array.isArray(x) && Object.getPrototypeOf(x) === Object.prototype;
const finite = x => typeof x === 'number' && Number.isFinite(x);
function error(message){throw new Error(message)}
function text(x,max=300){ if(typeof x!=='string'||x.length>max) error('Invalid text'); return x; }
function id(x){if(typeof x!=='string'||!ID.test(x))error('Invalid id'); return x;}
function path(x){if(typeof x!=='string'||!PATH.test(x)||x.includes('//'))error('Invalid state path');return x;}
function val(x){ if(!(typeof x==='string' && x.length<=200 || typeof x==='boolean' || finite(x)))error('Invalid state value'); return x; }
function number(x,min,max){if(!finite(x)||x<min||x>max)error('Invalid numeric value');return x;}
const shared = o => {if(!PLAIN(o))error('Expected object');return o;};
function validateEvent(event) {
  shared(event);
  if(event.v!==1)error('Unsupported protocol version');
  if(!['surface.begin','node.put','node.remove','state.init','state.derive','surface.end'].includes(event.op))error('Unknown operation');
  if(event.op==='surface.begin'||event.op==='surface.end')return {v:1,op:event.op,id:id(event.id)};
  if(event.op==='node.remove')return {v:1,op:event.op,id:id(event.id)};
  if(event.op==='state.init')return {v:1,op:event.op,path:path(event.path),value:val(event.value)};
  if(event.op==='state.derive')return {v:1,op:event.op,path:path(event.path),expr:text(event.expr,300)};
  const type=text(event.type,32);
  if(!ALLOWED.has(type)) error('Unsupported component: '+type);
  const props=shared(event.props??{});
  if(type==='Chart')return {v:1,op:'node.put',id:id(event.id),type,props:validateChartSpec(props),parent:event.parent===undefined?'root':id(event.parent),order:event.order===undefined?0:number(event.order,-10000,10000)};
  if(type==='GenerativeFigure')return {v:1,op:'node.put',id:id(event.id),type,props:validateFigureDefinition(props),parent:event.parent===undefined?'root':id(event.parent),order:event.order===undefined?0:number(event.order,-10000,10000)};
  if(type==='InteractiveScene'){
    return {v:1,op:'node.put',id:id(event.id),type,props:validateExperimentSpec(props),parent:event.parent===undefined?'root':id(event.parent),order:event.order===undefined?0:number(event.order,-10000,10000)};
  }
  if(VISUAL_KINDS.includes(type)){
    const parent=event.parent===undefined?'root':id(event.parent);
    const order=event.order===undefined?0:number(event.order,-10000,10000);
    return {v:1,op:'node.put',id:id(event.id),type,props:visualNodeProps(type,props),parent,order};
  }
  if(Object.keys(props).length>25)error('Too many props');
  const contract=COMPONENT_CATALOG[type].props;
  const sanitized={};
  for(const [key,value] of Object.entries(props)) {
    if(!/^[a-zA-Z][\w]*$/.test(key))error('Invalid prop key');
    if(!contract.includes(key))error('Unsupported prop '+type+'.'+key);
    if(['label','title','body','unit','sourceLabel','kind'].includes(key)) {sanitized[key]=text(value,key==='body'?1400:700);if(['title','body'].includes(key))templatePaths(sanitized[key]);}
    else if(['bind','target'].includes(key))sanitized[key]=path(value);
    else if(key==='format'){if(!FORMATS.has(value))error('Unsupported format: '+value);sanitized[key]=value;}
    else if(key==='showAverage'){if(typeof value!=='boolean')error('Invalid showAverage flag');sanitized[key]=value;}
    else if(key==='ratio')sanitized[key]=number(value,0.2,0.8);
    else if(['xMin','xMax','yMin','yMax'].includes(key))sanitized[key]=number(value,-1000,1000);
    else if(key==='sampleX')sanitized[key]=typeof value==='string'?path(value):number(value,-1000,1000);
    else if(key==='action') {if(!['reset','set'].includes(value))error('Invalid action');sanitized[key]=value;}
    else if(['value','min','max','step','default','setValue','clockMHz','prescaler','bs1','bs2','sjw','compareBs1','compareBs2'].includes(key))sanitized[key]=typeof value==='string' && key==='default'?text(value,200):number(value,-1e9,1e9);
    else if(key==='expr')sanitized[key]=text(value,300);
    else if(key==='options') {if(!Array.isArray(value)||value.length<2||value.length>8)error('Invalid options');sanitized.options=value.map(o=>{if(!PLAIN(o)||Object.keys(o).some(k=>!['label','value'].includes(k)))error('Invalid option');return {label:text(o.label,40),value:number(o.value,-1e9,1e9)};});}
    else if(key==='labels') { if(!Array.isArray(value)||value.length>10||!value.every(v=>typeof v==='string'&&v.length>0&&v.length<=24))error('Invalid chart labels'); sanitized[key]=[...value]; }
    else if(['data'].includes(key)) {
      if(!Array.isArray(value)||value.length>160)error('Too many chart points');
      sanitized[key]=value.map(x=>typeof x==='string'?path(x):number(x,-1e9,1e9));
    }
  }
  if(['Slider','NumberInput','Toggle','SegmentedControl'].includes(type)) {
    if(!sanitized.bind)error('Slider requires a state binding');
    if(type==='Toggle'&&(sanitized.min!==0||sanitized.max!==1||sanitized.step!==1))error('Toggle requires 0/1 bounds');
    if(type==='SegmentedControl'){if(!sanitized.options||new Set(sanitized.options.map(o=>o.value)).size!==sanitized.options.length||!sanitized.options.some(o=>o.value===sanitized.default))error('Invalid segmented default/options');for(const o of sanitized.options)assertSliderValue({min:sanitized.min??0,max:sanitized.max??100,step:sanitized.step??1},o.value);}
    const min=sanitized.min??0,max=sanitized.max??100,step=sanitized.step??1;
    if(!(min<max))error('Slider min must be less than max');
    if(!(step>0&&step<=max-min))error('Slider step must be positive and within range');
    if((max-min)/step>1e7)error('Slider resolution is excessive');
    if(sanitized.default!==undefined){
      if(!finite(sanitized.default))error('Slider default must be numeric');
      assertSliderValue({min,max,step},sanitized.default,'Slider default');
    }
  }
  if(type==='Progress'){
    const min=sanitized.min??0,max=sanitized.max??100;
    if(!(min<max))error('Progress min must be less than max');
    if(sanitized.value===undefined&&!sanitized.bind&&!sanitized.expr)error('Progress requires value, bind or expr');
  }
  if(type==='Button') {
    if(!sanitized.action)error('Button requires action');
    if(sanitized.action==='set' && (!sanitized.target||sanitized.setValue===undefined))error('Set button requires target and value');
    if(sanitized.action==='reset'&&!sanitized.target)error('Reset button requires target');
  }
  if(type==='FunctionPlot'){
    if((sanitized.xMin??-4)>=(sanitized.xMax??4)||(sanitized.yMin??-12)>=(sanitized.yMax??12))error('FunctionPlot bounds must be increasing');
    if(typeof sanitized.sampleX==='number'&&(sanitized.sampleX<(sanitized.xMin??-4)||sanitized.sampleX>(sanitized.xMax??4)))error('FunctionPlot sample outside x bounds');
  }
  if(type==='InteractiveLab' && !['bitwise','timer','ohm','fraction','probability','vector'].includes(sanitized.kind))error('Unknown semantic lab kind');
  if(type==='BarChart' && (!Array.isArray(sanitized.data)||sanitized.data.length<2||sanitized.data.length>10||!Array.isArray(sanitized.labels)||sanitized.labels.length!==sanitized.data.length))error('BarChart needs 2–10 labeled values');
  const parent=event.parent===undefined?'root':id(event.parent);
  const order=event.order===undefined?0:number(event.order,-10000,10000);
  return {v:1,op:'node.put',id:id(event.id),type,props:sanitized,parent,order};
}
/** Sliders are declarative constraints, not merely visual hints.
 * Reject incompatible programmatic/model writes instead of silently clamping.
 */
function assertSliderValue({min,max,step,options},value,label='Slider value'){
  if(options&&!options.includes(value))error(label+' is not a declared option');
  if(!finite(value)||value<min-1e-9||value>max+1e-9)error(label+' outside slider bounds');
  const steps=(value-min)/step;
  const nearest=min+Math.round(steps)*step;
  const epsilon=Math.max(32*Number.EPSILON*Math.max(1,Math.abs(min),Math.abs(value)),1e-10*step);
  if(Math.abs(value-nearest)>Math.min(epsilon,step*1e-4))error(label+' does not match slider step');
  return value;
}
function sliderConstraints(nodes){
  const constraints=new Map();
  for(const node of nodes.values()){
    if(!['Slider','NumberInput','Toggle','SegmentedControl'].includes(node.type))continue;
    const p=node.props;const item={min:p.min??0,max:p.max??100,step:p.step??1,...(node.type==='SegmentedControl'?{options:p.options.map(o=>o.value)}:{})};
    if(constraints.has(p.bind)){
      const earlier=constraints.get(p.bind);
      if(earlier.min!==item.min||earlier.max!==item.max||earlier.step!==item.step||JSON.stringify(earlier.options)!==JSON.stringify(item.options))error('Conflicting slider constraints: '+p.bind);
    }
    constraints.set(p.bind,item);
  }
  return constraints;
}
const MATH_FNS=Object.freeze({sin:Math.sin,cos:Math.cos,tan:Math.tan,sqrt:Math.sqrt,abs:Math.abs,log:Math.log,log10:Math.log10,exp:Math.exp,floor:Math.floor,ceil:Math.ceil,round:Math.round,min:Math.min,max:Math.max,clamp:(x,a,b)=>Math.min(Math.max(x,a),b),step:(edge,x)=>x<edge?0:1,atan2:Math.atan2,asin:Math.asin,acos:Math.acos,hypot:Math.hypot});
const MATH_CONST=Object.freeze({PI:Math.PI,E:Math.E});
const EXPRESSION_CACHE=new Map();
function evaluate(expr,data={}){
  if(typeof expr!=='string'||expr.length>300)error('Expression too long');
  let ast=EXPRESSION_CACHE.get(expr);
  if(!ast){
  const tokens=[];
  const scanner=/\s*([A-Za-z_][A-Za-z_0-9]*|(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|\*\*|<=|>=|==|!=|[()+\-*\/%?,:<>])\s*/gy;
  let pos=0;while(pos<expr.length){scanner.lastIndex=pos;const match=scanner.exec(expr);if(!match)error('Expression token refused at '+pos);tokens.push(match[1]);pos=scanner.lastIndex;if(tokens.length>120)error('Too many expression tokens');}
  let i=0;const precedences={'==':5,'!=':5,'<':5,'>':5,'<=':5,'>=':5,'+':10,'-':10,'*':20,'/':20,'%':20,'**':40};
  const primary=()=>{
    const t=tokens[i++];if(t===undefined)error('Missing value');
    if(t==='('){const result=parse(0);if(tokens[i++]!==')')error('Unclosed parenthesis');return result;}
    if(t==='+'||t==='-')return {op:'unary',sign:t,value:parse(35)};
    if(/^(?:\d|\.)/.test(t))return {op:'number',value:Number(t)};
    if(/^[A-Za-z_]/.test(t)){
      if(tokens[i]==='('){i++;const args=[];if(tokens[i]!==')'){do{if(args.length>=8)error('Too many call arguments');args.push(parse(0));if(tokens[i]!==',')break;i++;}while(true);}if(tokens[i++]!==')')error('Function arguments not closed');if(t!=='if'&&!Object.hasOwn(MATH_FNS,t))error('Unknown function: '+t);return {op:'call',name:t,args};}
      return {op:'variable',name:t};
    }
    error('Invalid expression value');
  };
  const parse=(min=0)=>{
    let left=primary();
    while(i<tokens.length){const operator=tokens[i],precedence=precedences[operator];if(precedence===undefined||precedence<min)break;i++;const right=parse(precedence+(operator==='**'?0:1));left={op:'binary',operator,left,right};}
    if(min===0&&tokens[i]==='?'){i++;const yes=parse(0);if(tokens[i++]!==':')error('Conditional needs colon');const no=parse(0);left={op:'condition',check:left,yes,no};}
    return left;
  };
  ast=parse(0);if(i!==tokens.length)error('Unparsed expression');
  EXPRESSION_CACHE.set(expr,ast);if(EXPRESSION_CACHE.size>128)EXPRESSION_CACHE.delete(EXPRESSION_CACHE.keys().next().value);
  }
  let budget=0;
  const calculate=node=>{
    if(++budget>250)error('Expression complexity exceeded');
    let result;
    if(node.op==='number')result=node.value;
    else if(node.op==='variable'){
      if(Object.hasOwn(MATH_CONST,node.name))result=MATH_CONST[node.name];
      else {if(!Object.hasOwn(data,node.name)||!finite(data[node.name]))error('Unbound variable: '+node.name);result=data[node.name];}
    }else if(node.op==='unary')result=(node.sign==='-'?-1:1)*calculate(node.value);
    else if(node.op==='condition')result=calculate(node.check)!==0?calculate(node.yes):calculate(node.no);
    else if(node.op==='call'){
      if(node.name==='if'){
        if(node.args.length!==3)error('if requires three arguments');
        result=calculate(node.args[0])!==0?calculate(node.args[1]):calculate(node.args[2]);
      }else{
        const args=node.args.map(calculate);
        const argc={clamp:3,step:2,atan2:2,asin:1,acos:1,hypot:2,sin:1,cos:1,tan:1,sqrt:1,abs:1,log:1,log10:1,exp:1,floor:1,ceil:1,round:1};
        if(argc[node.name]!==undefined&&args.length!==argc[node.name]||(['min','max'].includes(node.name)&&args.length<1))error('Invalid argument count');
        result=MATH_FNS[node.name](...args);
      }
    }else if(node.op==='binary'){
      const a=calculate(node.left),b=calculate(node.right);
      if(['/','%'].includes(node.operator)&&b===0)error('Division by zero');
      switch(node.operator){case '+':result=a+b;break;case '-':result=a-b;break;case '*':result=a*b;break;case '/':result=a/b;break;case '%':result=a%b;break;case '**':result=a**b;break;case '<':result=Number(a<b);break;case '>':result=Number(a>b);break;case '<=':result=Number(a<=b);break;case '>=':result=Number(a>=b);break;case '==':result=Number(a===b);break;case '!=':result=Number(a!==b);break;default:error('Unsupported operator');}
    }
    if(!finite(result)||Math.abs(result)>1e12)error('Numeric overflow');
    return result;
  };
  return calculate(ast);
}
function variables(state) { const vars=Object.create(null);for(const [k,v] of Object.entries(state)) {const key=k.split('/').at(-1);if(typeof v==='number'&&/^[A-Za-z_]\w*$/.test(key))vars[key]=v;}return vars; }
function derivedValue(expr, state){return evaluate(expr,variables(state));}
/** A finite-value-only result channel. Invalid runtime numbers never enter
 * scene.state, derived values, checkpoint JSON, or SVG attributes. */
function computeDerived(scene){
  const values={...scene.state};
  const failures=new Map();
  const maxPasses=Object.keys(scene.formulas).length+1;
  for(let pass=0;pass<maxPasses;pass++){
    let changed=false;
    for(const [key,expr] of Object.entries(scene.formulas)){
      try{
        const result=derivedValue(expr,values);
        if(values[key]!==result){values[key]=result;changed=true;}
        failures.delete(key);
      }catch(cause){failures.set(key,String(cause.message||cause));}
    }
    if(!changed)break;
  }
  return {values,failures};
}
/** Validate dependencies structurally, independently of runtime numeric values.
 * Pending input values while streaming are different from missing inputs once
 * surface.end has arrived. */
function validateFormulas(scene){
  const errors=[], aliases=new Map(), keys=[...Object.keys(scene.state),...Object.keys(scene.formulas)];
  for(const key of keys){
    const alias=key.slice(key.lastIndexOf('/')+1);
    if(aliases.has(alias)&&aliases.get(alias)!==key)errors.push('Ambiguous expression variable: '+alias);
    else aliases.set(alias,key);
  }
  const formulaAliases=new Map(Object.keys(scene.formulas).map(key=>[key.slice(key.lastIndexOf('/')+1),key]));
  const references=new Map();
  for(const [key,expr] of Object.entries(scene.formulas)){
    if(Object.hasOwn(scene.state,key))errors.push('Derived state conflicts with input: '+key);
    // Evaluate once with dummy finite placeholders to check syntax independent
    // of runtime division by zero. Numeric domain errors are nonfatal here.
    const names=[...new Set(expr.match(/\b[A-Za-z_][A-Za-z_0-9]*\b/g)??[])].filter(x=>!/^e\d+$/i.test(x)&&!Object.hasOwn(MATH_FNS,x)&&!Object.hasOwn(MATH_CONST,x)&&x!=='if');
    for(const name of names)if(!aliases.has(name))errors.push('Unknown expression input: '+key+' -> '+name);
    references.set(key,names.filter(name=>formulaAliases.has(name)).map(name=>formulaAliases.get(name)));
    // Check lexical/syntax errors even when the real inputs are not yet usable.
    try{evaluate(expr,Object.fromEntries(names.map(name=>[name,1])));}catch(e){
      if(!/Unsafe numeric result|Division by zero|Numeric overflow/.test(String(e.message)))errors.push('Invalid expression '+key+': '+e.message);
    }
  }
  const seen=new Set(), active=new Set();
  const visit=key=>{
    if(active.has(key)){errors.push('Cyclic formula: '+key);return;}
    if(seen.has(key))return;
    active.add(key);for(const dependency of references.get(key)??[])visit(dependency);
    active.delete(key);seen.add(key);
  };
  for(const key of references.keys())visit(key);
  return errors;
}
class VIEStream {
  constructor(){this.buffer='';this.source='';this.events=0;this.lineNumber=0;this.errors=[];this.modified=new Set();this.defaults=Object.create(null);this.scene={id:null,nodes:new Map(),state:Object.create(null),formulas:Object.create(null),complete:false};this.begun=false;this.ended=false;this.finished=false;this.failed=false;this.total=0;}
  push(part){
    if(typeof part!=='string')error('Chunk must be text');
    if(this.finished){this.errors.push('Stream already finalized');this.failed=true;return 0;}
    this.total+=new TextEncoder().encode(part).length;
    if(this.total>LIMITS.bytes){this.errors.push('Source size limit exceeded');this.failed=true;return 0;}
    this.buffer+=part; let n=0, at;
    while((at=this.buffer.indexOf('\n'))!==-1) {
      const line=this.buffer.slice(0,at).trim();this.buffer=this.buffer.slice(at+1);
      this.lineNumber++;
      if(line){this.consume(line,this.lineNumber);n++;}
    }
    if(new TextEncoder().encode(this.buffer).length>LIMITS.line){this.errors.push('Incomplete line too long');this.failed=true;this.buffer='';}
    return n;
  }
  finish(){
    if(this.finished)return this.snapshot();
    if(this.buffer.trim()){this.consume(this.buffer.trim(),this.lineNumber+1);this.buffer='';}
    this.finished=true;
    if(!this.begun){this.errors.push('Missing surface.begin');this.failed=true;}
    if(!this.ended){this.errors.push('Missing surface.end');this.failed=true;}
    const {errors}=this.tree();
    if(errors.length){this.errors.push(...errors);this.failed=true;}
    if(this.errors.length)this.failed=true;
    this.scene.complete=this.ended&&!this.failed;
    return this.snapshot();
  }
  consume(line,sourceLine=this.lineNumber+1){
    this.events++;if(this.events>LIMITS.events){if(this.events===LIMITS.events+1)this.errors.push('Event limit exceeded');this.failed=true;return;}
    if(new TextEncoder().encode(line).length>LIMITS.line){this.errors.push('Line too large');this.failed=true;return;}
    try{const e=validateEvent(JSON.parse(line));this.apply(e);}catch(ex){this.failed=true;this.errors.push(`Line ${sourceLine} (event ${this.events}): ${String(ex.message||ex)}`);}
  }
  apply(e){
    const s=this.scene;
    if(e.op==='surface.begin'){
      if(this.begun||this.ended)error('Duplicate surface.begin');
      this.begun=true;s.id=e.id;return;
    }
    if(!this.begun)error('Event before surface.begin');
    if(this.ended)error('Event after surface.end');
    if(e.op==='surface.end'){
      if(e.id!==s.id)error(`Mismatched surface.end: ${e.id} != ${s.id}`);
      this.ended=true;
      const check=this.tree();
      if(check.errors.length)error(check.errors.join('; '));
      if(!s.nodes.size)error('Empty surface');
      if(this.errors.length||this.failed)error('Surface contains rejected events');
      s.complete=true;return;
    }
    else if(e.op==='node.put'){
      if(e.type==='CanTimingLab')normalizeCanPreset(e.props);
      if(!s.nodes.has(e.id)&&s.nodes.size>=LIMITS.nodes)error('Too many nodes');
      if(e.parent===e.id)error('Node cannot parent itself');
      if(e.props.bind && e.props.default!==undefined){
        if(Object.hasOwn(this.defaults,e.props.bind)&&this.defaults[e.props.bind]!==e.props.default)error('Conflicting slider default: '+e.props.bind);
        if(!Object.hasOwn(this.defaults,e.props.bind))this.defaults[e.props.bind]=e.props.default;
        if(!Object.hasOwn(s.state,e.props.bind))s.state[e.props.bind]=e.props.default;
      }
      s.nodes.set(e.id,e);
    }
    else if(e.op==='node.remove'){s.nodes.delete(e.id);}
    else if(e.op==='state.init'){
      if(Object.hasOwn(this.defaults,e.path)&&this.defaults[e.path]!==e.value)error('Conflicting state defaults: '+e.path);
      if(!Object.hasOwn(this.defaults,e.path))this.defaults[e.path]=e.value;
      if(!Object.hasOwn(s.state,e.path))s.state[e.path]=e.value;
    }
    else if(e.op==='state.derive'){s.formulas[e.path]=e.expr;}
  }
  set(pathKey,value){
    path(pathKey);val(value);
    if(!Object.hasOwn(this.scene.state,pathKey))error('Unknown state path');
    const constraint=sliderConstraints(this.scene.nodes).get(pathKey);
    if(constraint)assertSliderValue(constraint,value,'State '+pathKey);
    const previous=this.scene.state[pathKey];
    if(typeof previous!==typeof value)error('State type mismatch: '+pathKey);
    this.scene.state[pathKey]=value;this.modified.add(pathKey);
  }
  reset(pathKey){path(pathKey);if(!Object.hasOwn(this.defaults,pathKey))error('Unknown default');this.scene.state[pathKey]=this.defaults[pathKey];this.modified.delete(pathKey);}
  tree(){
    const nodes=this.scene.nodes;
    const memo=new Set();const errors=[];
    const derived=computeDerived(this.scene).values;
    const build=(parent,depth,seen)=>{
      if(depth>LIMITS.depth){errors.push('Depth limit exceeded');return [];}
      const list=[...nodes.values()].filter(n=>n.parent===parent).sort((a,b)=>a.order-b.order);
      return list.flatMap(n=>{
        if(seen.has(n.id)){errors.push('Cycle at '+n.id);return [];}
        if(memo.has(n.id)){errors.push('Duplicate node '+n.id);return [];}
        if(n.props.bind && !Object.hasOwn(derived,n.props.bind) && !Object.hasOwn(this.scene.formulas,n.props.bind)){
          if(this.ended)errors.push('Missing binding: node '+n.id+' -> '+n.props.bind);
          return [];
        }
        memo.add(n.id);return [{...n,children:build(n.id,depth+1,new Set([...seen,n.id]))}];
      });
    };
    const tree=build('root',0,new Set());
    if(this.ended && memo.size<nodes.size){
      const missing=[...nodes.keys()].filter(k=>!memo.has(k));
      errors.push('Unresolved/cyclic nodes: '+missing.slice(0,8).join(', '));
    }
    // State may arrive before or after its component, so check once the
    // entire surface exists as well as on every user update.
    if(this.ended){
      try {
        for(const [statePath,constraint] of sliderConstraints(nodes)){
          if(Object.hasOwn(this.scene.state,statePath))assertSliderValue(constraint,this.scene.state[statePath],'State '+statePath);
        }
      } catch(ex) {errors.push(String(ex.message||ex));}
    }
    if(this.ended){
      const available=new Set([...Object.keys(this.scene.state),...Object.keys(this.scene.formulas)]);
      const verify=(ref,where)=>{if(!available.has(ref))errors.push('Missing visual/text binding: '+where+' -> '+ref);};
      for(const node of nodes.values()){
        for(const field of ['title','body','caption'])if(typeof node.props[field]==='string'){
          try{for(const ref of templatePaths(node.props[field]))verify(ref,node.id+'.'+field);}catch(ex){errors.push('Invalid text template '+node.id+': '+ex.message);}
        }
        if(['Flow','RelationGraph','Timeline'].includes(node.type)){
          for(const item of [...(node.props.nodes??[]),...(node.props.items??[]),...(node.props.edges??[])])
            for(const field of ['label','detail','at'])if(typeof item[field]==='string')
              for(const ref of templatePaths(item[field]))verify(ref,node.id+'.'+field);
        }
        if(node.type==='Diagram'||node.type==='Animation')for(const shape of node.props.shapes){
          for(const [k,v] of Object.entries(shape)){
            if(v&&typeof v==='object'&&!Array.isArray(v)&&Object.hasOwn(v,'$bind'))verify(v.$bind,node.id+'.'+(shape.id??shape.k)+'.'+k);
            if(k==='t'&&typeof v==='string')for(const ref of templatePaths(v))verify(ref,node.id+'.text');
          }
        }
        if(node.type==='GenerativeFigure')for(const ref of Object.values(node.props.bindings??{}))verify(ref,node.id+'.bindings');
        if(node.type==='Chart')for(const p of [...node.props.controls.filter(c=>c.bind),...(node.props.inputs??[])])verify(p.bind,node.id+'.chart');
        if(node.type==='BarChart')for(const ref of node.props.data.filter(v=>typeof v==='string'))verify(ref,node.id+'.data');
        if(node.type==='Chart')for(const c of node.props.controls.filter(c=>c.bind)){verify(c.bind,node.id+'.controls');const v=this.scene.state[c.bind];if(typeof v!=='number'||v<c.min||v>c.max)errors.push('Invalid shared chart state: '+c.bind);}
        if(node.type==='FunctionPlot'&&typeof node.props.sampleX==='string')verify(node.props.sampleX,node.id+'.sampleX');
      }
    }
    if(this.ended)errors.push(...validateFormulas(this.scene));
    return {tree,errors};
  }
  interactionContext(){
    const updated=Object.create(null);
    for(const key of [...this.modified].sort().slice(0,24)){
      if(Object.hasOwn(this.scene.state,key))updated[key]=this.scene.state[key];
    }
    const derived=Object.create(null),values=computeDerived(this.scene).values;
    for(const key of Object.keys(this.scene.formulas).slice(0,24)){
      if(Object.hasOwn(values,key))derived[key]=values[key];
    }
    return {sceneId:this.scene.id,updated,derived};
  }
  snapshot(){
    const {tree,errors}=this.tree(),result=computeDerived(this.scene);
    const diagnostics=[...result.failures].map(([path,message])=>({path,code:message.includes('Division by zero')?'DIV_ZERO':message.includes('overflow')?'OVERFLOW':'EVAL_UNAVAILABLE',message}));
    const allErrors=[...new Set([...this.errors,...errors])];
    return {id:this.scene.id,complete:this.scene.complete&&!this.failed&&allErrors.length===0,tree,state:{...this.scene.state},values:result.values,formulas:{...this.scene.formulas},errors:allErrors,diagnostics,events:this.events};
  }
}
function parseSource(s){const p=new VIEStream();p.push(s);p.finish();return p;}
/** Decode an incrementally streamed JSON string argument without executing it. */
function partialString(raw, key='source'){
  if(typeof raw!=='string'||raw.length>LIMITS.bytes*3)return '';
  const re=new RegExp('"'+key+'"\\s*:\\s*"','u');const hit=re.exec(raw);if(!hit)return '';
  let pos=hit.index+hit[0].length,out='';
  for(;pos<raw.length&&out.length<LIMITS.bytes;pos++){
    const c=raw[pos];if(c==='"')return out;if(c!=='\\'){out+=c;continue;}
    if(pos+1>=raw.length)break;
    const n=raw[++pos];const table={n:'\n',t:'\t',r:'\r',b:'\b',f:'\f','"':'"','\\':'\\','/':'/'};
    if(n==='u'){
      if(pos+4>=raw.length)break;
      const hex=raw.slice(pos+1,pos+5);if(!/^[0-9a-fA-F]{4}$/.test(hex))break;
      out+=String.fromCharCode(parseInt(hex,16));pos+=4;
    } else if(Object.hasOwn(table,n))out+=table[n]; else break;
  }
  return out;
}
const DEMO_SOURCE = [
  {v:1,op:'surface.begin',id:'motion-lab'},
  {v:1,op:'node.put',id:'hero',type:'Text',props:{title:'匀速运动',body:'调整速度与时间，观察位移 s = vt。'}},
  {v:1,op:'node.put',id:'motion',type:'MotionScene',order:1,props:{title:'运动距离',bind:'/distance',min:0,max:400,unit:'m'}},
  {v:1,op:'node.put',id:'controls',type:'Column',order:2,props:{}},
  {v:1,op:'node.put',id:'sliders',type:'Row',parent:'controls',props:{}},
  {v:1,op:'node.put',id:'speed',parent:'sliders',order:1,type:'Slider',props:{label:'速度 v',unit:'m/s',bind:'/speed',default:20,min:0,max:40,step:1}},
  {v:1,op:'node.put',id:'time',parent:'sliders',order:2,type:'Slider',props:{label:'时间 t',unit:'s',bind:'/time',default:5,min:0,max:10,step:1}},
  {v:1,op:'state.derive',path:'/distance',expr:'speed * time'},
  {v:1,op:'node.put',id:'summary',type:'Column',order:3,props:{}},
  {v:1,op:'node.put',id:'distance',parent:'summary',type:'Metric',order:1,props:{label:'位移 s = v × t',bind:'/distance',unit:'m'}},
  {v:1,op:'node.put',id:'outro',order:4,type:'Text',props:{body:'速度不变时，时间加倍，位移也加倍。'}},
  {v:1,op:'surface.end',id:'motion-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');

const FUNCTION_DEMO_SOURCE = [
  {v:1,op:'surface.begin',id:'function-lab'},
  {v:1,op:'node.put',id:'hero',type:'Text',props:{title:'二次函数 y = ax²',body:'调节 a，观察抛物线在坐标系中的变化。'}},
  {v:1,op:'node.put',id:'curve',type:'FunctionPlot',order:1,props:{title:'实时函数图像  ·  y = a × x²',expr:'a * x ** 2'}},
  {v:1,op:'node.put',id:'panel',type:'Column',order:2,props:{}},
  {v:1,op:'node.put',id:'a',type:'Slider',parent:'panel',props:{label:'二次项系数 a',bind:'/a',default:1,min:-3,max:3,step:0.1}},
  {v:1,op:'node.put',id:'outro',type:'Text',order:3,props:{body:'x 轴和 y 轴的每格都有真实数值。a = 0 时退化为直线 y = 0。'}},
  {v:1,op:'surface.end',id:'function-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');

const DATA_DEMO_SOURCE = [
  {v:1,op:'surface.begin',id:'data-lab'},
  {v:1,op:'node.put',id:'hero',type:'Text',props:{title:'数据对比',body:'以下为教学示例数据，点击柱子查看对应数值。'}},
  {v:1,op:'node.put',id:'data',type:'BarChart',order:1,props:{title:'每日处理量（示例）',data:[18,29,23,41,35,48],labels:['周一','周二','周三','周四','周五','周六'],unit:'份',sourceLabel:'教学示例数据，不代表真实测量'}},
  {v:1,op:'surface.end',id:'data-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');

/** Pure, deterministic SVG drawing for browser playground and DSH React host.
 * All label strings are escaped; numeric coordinates derive only from validated finite values.
 * No model-supplied code or HTML is executed. */
const CHART_ESC = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CNUM = n => Number.isInteger(n)?String(n):Number(n).toFixed(1);
const DEFAULT_CATEGORIES=['周一','周二','周三','周四','周五','周六'];
const DEFAULT_VALUES=[18,29,23,41,35,48];
function normalizeDataset({labels=DEFAULT_CATEGORIES,data=DEFAULT_VALUES,unit='份',title='每日处理量（示例）',sourceLabel='演示数据，不代表真实统计'}={}){
 if(!Array.isArray(data)||data.length<2||data.length>10||!data.every(x=>typeof x==='number'&&Number.isFinite(x)&&Math.abs(x)<=1000000000))throw Error('数据需要 2–10 个有限数值');
 if(!Array.isArray(labels)||labels.length!==data.length||!labels.every(x=>typeof x==='string'&&x.length>0&&x.length<=24))throw Error('类别名称与数值必须一一对应');
 if(typeof unit!=='string'||unit.length>15||typeof title!=='string'||title.length>70||typeof sourceLabel!=='string'||sourceLabel.length>100)throw Error('无效的数据说明');
 return {labels:[...labels],data:[...data],unit,title,sourceLabel};
}
function functionPlotSVG(expr='a * x ** 2',vars={},evaluate,options={}){
 const W=520,H=238,L=45,R=494,T=17,B=208;
 const xMin=options.xMin??-4,xMax=options.xMax??4,yMin=options.yMin??-12,yMax=options.yMax??12;
 if(![xMin,xMax,yMin,yMax].every(Number.isFinite)||!(xMin<xMax&&yMin<yMax)||xMin< -1000||xMax>1000||yMin< -1000||yMax>1000)throw Error('Invalid plot bounds');
 const X=x=>L+(x-xMin)/(xMax-xMin)*(R-L),Y=y=>T+(yMax-y)/(yMax-yMin)*(B-T);
 const grid=[];
 for(let i=0;i<=8;i++){
  const x=xMin+(xMax-xMin)*i/8,sx=X(x);
  grid.push(`<line x1="${sx.toFixed(2)}" y1="${T}" x2="${sx.toFixed(2)}" y2="${B}" class="vie-grid-line"/>`);
  if(i%2===0&&Math.abs(x)>1e-9)grid.push(`<text x="${sx.toFixed(2)}" y="${B+17}" text-anchor="middle">${CNUM(x)}</text>`);
 }
 for(let i=0;i<=4;i++){
  const y=yMin+(yMax-yMin)*i/4,sy=Y(y);
  grid.push(`<line x1="${L}" y1="${sy.toFixed(2)}" x2="${R}" y2="${sy.toFixed(2)}" class="vie-grid-line"/>`);
  if(Math.abs(y)>1e-9)grid.push(`<text x="${L-9}" y="${(sy+4).toFixed(2)}" text-anchor="end">${CNUM(y)}</text>`);
 }
 const points=[];let lastValid=false;
 for(let i=0;i<=240;i++){
  const x=xMin+i*(xMax-xMin)/240;let y;
  try{y=evaluate(expr,{...vars,x});}catch{lastValid=false;continue;}
  if(!Number.isFinite(y)){lastValid=false;continue;}
  points.push((lastValid?'L':'M')+X(x).toFixed(2)+' '+Y(y).toFixed(2));lastValid=true;
 }
 let info='拖动参数，观察曲线变化';
 if(/\ba\s*\*\s*x\s*\*\*\s*2\b/.test(expr)&&typeof vars.a==='number'){
  const a=vars.a;info=a===0?'a = 0：退化为 y = 0，不再是二次函数':`a = ${CNUM(a)}：开口向${a>0?'上':'下'}，|a| 越大越窄`;
 }
 let point='';
 const sampleX=options.sampleX;
 if(Number.isFinite(sampleX)&&sampleX>=xMin&&sampleX<=xMax){
  try{
   const sampleY=evaluate(expr,{...vars,x:sampleX});
   if(Number.isFinite(sampleY)&&sampleY>=yMin&&sampleY<=yMax){
    point=`<circle data-vie-sample-point="true" cx="${X(sampleX).toFixed(2)}" cy="${Y(sampleY).toFixed(2)}" r="5.3" fill="#e8a34c" stroke="white" stroke-width="1.5"/>`;
    info+=` · 采样点 (${CNUM(sampleX)}, ${CNUM(sampleY)})`;
   }
  }catch{/* runtime invalid sample point is simply omitted */}
 }
 const Xzero=X(Math.max(xMin,Math.min(xMax,0))),Yzero=Y(Math.max(yMin,Math.min(yMax,0)));
 const svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="带坐标轴、数值刻度与原点的函数图像" data-vie-chart="function"><defs><clipPath id="vie-function-clip"><rect x="${L}" y="${T}" width="${R-L}" height="${B-T}"/></clipPath></defs>
 ${grid.join('')}<path d="M${L} ${Yzero}H${R+6}m-7-4l7 4-7 4 M${Xzero} ${B+2}V${T-6}m-4 7l4-7 4 7" fill="none" stroke="currentColor" stroke-opacity=".58" stroke-width="1.3"/>
 <text x="${R+9}" y="${Yzero-8}" class="vie-axis-name">x</text><text x="${Xzero+9}" y="${T+1}" class="vie-axis-name">y</text>
 <g clip-path="url(#vie-function-clip)"><path d="${points.join(' ')}" fill="none" stroke="var(--vie-color,#4088d0)" stroke-width="2.7" stroke-linejoin="round" stroke-linecap="round"/>${point}</g></svg>`;
 return {svg,info};
}
function niceStep(v){const exp=Math.floor(Math.log10(Math.max(1e-10,v))),scale=10**exp;const n=v/scale;return (n<=1?1:n<=2?2:n<=5?5:10)*scale;}
function barChartSVG(props={},activeIndex=0){
 const {labels,data,unit,title,sourceLabel}=normalizeDataset(props);
 const unavailable=new Set(props.unavailableIndices??[]);
 const W=520,H=235,L=48,R=501,T=20,B=198,lo=Math.min(0,...data),hi=Math.max(0,...data),span=hi-lo||1;
 const step=niceStep(span/4),min=Math.floor(lo/step)*step,max=Math.ceil(hi/step)*step||(step),Y=y=>T+(max-y)/(max-min)*(B-T);
 const bw=(R-L)/data.length;
 const active=Math.max(0,Math.min(data.length-1,activeIndex));
 const lines=[];
 for(let tick=min;tick<=max+step/100;tick+=step){
  const sy=Y(tick);lines.push(`<line x1="${L}" y1="${sy.toFixed(2)}" x2="${R}" y2="${sy.toFixed(2)}" class="vie-grid-line"/><text x="${L-9}" y="${(sy+4).toFixed(2)}" text-anchor="end">${CHART_ESC(CNUM(tick))}</text>`);
 }
 lines.push(`<path d="M${L} ${T}V${B}H${R}" class="vie-data-axis" fill="none"/>`);
 const bars=[];
 for(let i=0;i<data.length;i++){
  const x=L+i*bw+bw*.18,w=bw*.64,v=data[i],y=Math.min(Y(0),Y(v)),h=Math.max(2,Math.abs(Y(0)-Y(v)));
  bars.push(`<g data-bar-index="${i}" role="button" tabindex="0" aria-label="${CHART_ESC(labels[i])}：${unavailable.has(i)?'等待有效数据':CHART_ESC(CNUM(v))+CHART_ESC(unit)}" aria-pressed="${i===active}" class="vie-bar-item">
   <rect x="${(L+i*bw).toFixed(2)}" y="${T}" width="${bw.toFixed(2)}" height="${B-T+12}" fill="transparent"/>
   ${unavailable.has(i)?'':`<rect class="vie-data-bar${i===active?' is-active':''}" x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" rx="4"/>`}
   <text x="${(x+w/2).toFixed(2)}" y="${Math.max(11,y-7).toFixed(2)}" text-anchor="middle" class="vie-bar-value">${unavailable.has(i)?'—':CHART_ESC(CNUM(v))}</text>
   <text x="${(x+w/2).toFixed(2)}" y="${B+19}" text-anchor="middle">${CHART_ESC(labels[i])}</text>
  </g>`);
 }
 const valid=data.filter((_,i)=>!unavailable.has(i));
 const avg=valid.length?valid.reduce((s,n)=>s+n,0)/valid.length:0;
 const delta=data[active]-avg;
 return {svg:`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="带类别、数值和纵轴刻度的数据柱状图；缺失值以横线表示" data-vie-chart="bars">${lines.join('')}${bars.join('')}</svg>`,selected:unavailable.has(active)?`${labels[active]}：等待有效数据`:props.showAverage===false?`${labels[active]}：${CNUM(data[active])}${unit}`:`${labels[active]}：${CNUM(data[active])}${unit}（${delta>=0?'高于':'低于'}平均值 ${CNUM(Math.abs(delta))}${unit}）`,average:avg,sourceLabel,labels,data,unit,title};
}

/** VIE bxCAN nominal bit timing calculator (STM32F4 bxCAN profile).
 * fCAN = APB1 peripheral clock (not generic CPU system clock).
 * CAN_BTR fields encode hardware value minus one; public values are actual TQ/BRP.
 * Sampling guideline is illustrative, not an electrical conformance verdict.
 */
const integer=(v,lo,hi,label)=>{if(!Number.isInteger(v)||v<lo||v>hi)throw Error(`${label} 应为 ${lo}～${hi} 的整数`);return v;};
const CAN_PROFILE=Object.freeze({name:'STM32F4 bxCAN（经典 CAN）',bs1:[1,16],bs2:[1,8],sjw:[1,4],brp:[1,1024]});
function calculateCanTiming({clockMHz=36,prescaler=4,bs1=14,bs2=3,sjw=1}={}){
 if(typeof clockMHz!=='number'||!Number.isFinite(clockMHz)||clockMHz<1||clockMHz>100)throw Error('CAN 外设时钟应在 1～100 MHz 的教学范围内');
 integer(prescaler,1,1024,'BRP');integer(bs1,1,16,'BS1');integer(bs2,1,8,'BS2');integer(sjw,1,4,'SJW');
 if(sjw>bs2)throw Error('SJW 不能大于 BS2');
 const totalTq=1+bs1+bs2;
 const bitrate=clockMHz*1e6/(prescaler*totalTq);
 const samplePoint=(1+bs1)/totalTq*100;
 return Object.freeze({clockMHz,prescaler,bs1,bs2,sjw,totalTq,bitrate,samplePoint,tqNs:prescaler/clockMHz*1000,bitTimeUs:prescaler*totalTq/clockMHz});
}
function normalizeCanPreset(args={}){
 const allowed=['clockMHz','prescaler','sjw','bs1','bs2','compareBs1','compareBs2'];
 if(args===null||typeof args!=='object'||Array.isArray(args)||Object.keys(args).some(k=>!allowed.includes(k)))throw Error('不支持的 CAN 预置参数');
 const p={clockMHz:36,prescaler:4,sjw:1,bs1:14,bs2:3,compareBs1:15,compareBs2:2,...args};
 calculateCanTiming(p);
 calculateCanTiming({...p,bs1:p.compareBs1,bs2:p.compareBs2});
 return p;
}
function compareCanSchemes(config){
 const p=normalizeCanPreset(config);
 return Object.freeze({A:calculateCanTiming(p),B:calculateCanTiming({...p,bs1:p.compareBs1,bs2:p.compareBs2})});
}

/** Six small, framework-rendered knowledge labs. All behavior is trusted code, not model-written JS. */
const SEMANTIC_LABS = Object.freeze({
  bitwise:{label:'位运算',description:'逐位观察 AND / OR / XOR',parameters:[]},
  timer:{label:'STM32 定时器',description:'PSC、ARR 与计数频率',parameters:[]},
  ohm:{label:'欧姆定律',description:'电压、电阻、电流的关系',parameters:[]},
  fraction:{label:'分数与等值',description:'把分数切成可见的等份',parameters:[]},
  probability:{label:'基础概率',description:'从六种等可能结果中选择事件',parameters:[]},
  vector:{label:'向量分解',description:'观察向量的 x、y 分量',parameters:[]}
});
function semanticLabSource(kind){
 if(!Object.hasOwn(SEMANTIC_LABS,kind))throw Error('Unknown semantic lab');
 return [
  {v:1,op:'surface.begin',id:'lab-'+kind},
  {v:1,op:'node.put',id:'lab',type:'InteractiveLab',props:{kind}},
  {v:1,op:'surface.end',id:'lab-'+kind}
 ].map(e=>JSON.stringify(e)+'\n').join('');
}

/** Deterministic teaching scenes. The LLM selects a preset and explains the topic;
 * presentation, binding and calculations are handled by the runtime. */
const PRESET_CATALOG = Object.freeze({
  ...SEMANTIC_LABS,
  motion:{label:'匀速运动',description:'位置、速度与时间的关系',parameters:['speed','time']},
  quadratic:{label:'二次函数',description:'函数 y = ax² 的参数探索',parameters:['a']},
  data:{label:'数据对比',description:'六个数值的直观比较',parameters:['labels','values','unit','title']},
  can:{label:'CAN 位时序',description:'STM32F4 bxCAN 采样点、BS1/BS2、波特率',parameters:['clockMHz','prescaler','sjw','bs1','bs2','compareBs1','compareBs2']}
});
const CAN_SOURCE=[
{v:1,op:'surface.begin',id:'can-bit-lab'},
{v:1,op:'node.put',id:'can-timing',type:'CanTimingLab',props:normalizeCanPreset()},
{v:1,op:'surface.end',id:'can-bit-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');
const bases={...Object.fromEntries(Object.keys(SEMANTIC_LABS).map(k=>[k,semanticLabSource(k)])),motion:DEMO_SOURCE,quadratic:FUNCTION_DEMO_SOURCE,data:DATA_DEMO_SOURCE,can:CAN_SOURCE};
const ranges={speed:[0,40],time:[0,10],a:[-3,3]};
function makePresetSource(preset, parameters={}){
  if(!Object.hasOwn(bases,preset)) throw new Error('Unknown preset');
  if(parameters===null||typeof parameters!=='object'||Array.isArray(parameters))throw new Error('Invalid preset parameters');
  if(Object.keys(parameters).some(k=>!PRESET_CATALOG[preset].parameters.includes(k)))throw new Error('Unknown preset parameter');
  const updates=new Map();
  if(preset==='data') {
    const hasCustom=Object.keys(parameters).length>0;
    if(hasCustom && (!Array.isArray(parameters.labels)||!Array.isArray(parameters.values)))throw Error('Data needs both labels and values');
    const options=hasCustom?normalizeDataset({labels:parameters.labels,data:parameters.values,unit:parameters.unit??'',title:parameters.title??'用户提供的数据',sourceLabel:'用户提供的数据'}):normalizeDataset();
    const events=DATA_DEMO_SOURCE.trim().split('\n').map(line=>JSON.parse(line));
    if(hasCustom)events.find(e=>e.id==='hero').props.body='使用用户提供的数据；点击柱子或展开原始数据查看比较。';
    const bar=events.find(e=>e.type==='BarChart');bar.props={title:options.title,data:options.data,labels:options.labels,unit:options.unit,sourceLabel:options.sourceLabel};
    const result=events.map(e=>JSON.stringify(e)+'\n').join('');
    const parser=new VIEStream();parser.push(result);parser.finish();if(parser.snapshot().errors.length)throw Error('Data preset invalid');
    return result;
  }
  for(const [key,value] of Object.entries(parameters)){
    const bounds=ranges[key];
    if(preset==='can'){updates.set('/'+key,value);continue;}
    const [min,max]=bounds;
    if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max)throw new Error('Invalid preset parameter: '+key);
    if(key==='a'&&Math.abs(value*10-Math.round(value*10))>1e-7)throw new Error('Quadratic a must use increments of 0.1');
    updates.set('/'+key,value);
  }
  if(preset==='can'){
    const props=normalizeCanPreset(parameters);
    const events=CAN_SOURCE.trim().split('\n').map(x=>JSON.parse(x));
    events.find(e=>e.type==='CanTimingLab').props=props;
    const result=events.map(e=>JSON.stringify(e)+'\n').join('');
    const p=new VIEStream();p.push(result);p.finish();if(p.snapshot().errors.length)throw Error('CAN preset invalid');
    return result;
  }
  if(updates.size===0)return bases[preset];
  const events=bases[preset].trimEnd().split('\n').map(line=>JSON.parse(line));
  for(const event of events){
    if(event.op==='node.put'&&event.props?.bind&&updates.has(event.props.bind))event.props.default=updates.get(event.props.bind);
  }
  const result=events.map(e=>JSON.stringify(e)+'\n').join('');
  const p=new VIEStream();p.push(result);p.finish();
  if(p.snapshot().errors.length)throw new Error('Internal preset invalid');
  return result;
}

/** VIE template catalog and conservative, deterministic routing.
 * Subject-domain matches never infer measurements or fabricate graph contents.
 * Model may supply a specific templateId and validated data; otherwise routing
 * only happens for strong keyword evidence. A miss returns structured choices.
 */
const quick={
  motion:{zh:['匀速','位移','路程 = 速度','速度和时间'],en:['uniform motion','constant speed','displacement']},
  quadratic:{zh:['二次函数','抛物线','二次项系数'],en:['quadratic','parabola']},
  data:{zh:['数据对比','数据比较','柱状图','对比数据'],en:['bar chart','data comparison']},
  can:{zh:['CAN总线','CAN 总线','CAN位时序','CAN 位时序','采样点','BS1','BS2','波特率'],en:['bxcan','can bus','bit timing']},
  bitwise:{zh:['位运算','按位与','按位或','异或','二进制位运算'],en:['bitwise','xor','bitwise and']},
  timer:{zh:['定时器','预分频','自动重装载','PSC','ARR','定时中断'],en:['stm32 timer','prescaler']},
  ohm:{zh:['欧姆定律','电流与电阻','电压与电阻'],en:["ohm's law",'ohms law']},
  fraction:{zh:['分数','分子分母','通分','约分','等值分数'],en:['fraction','fractions']},
  probability:{zh:['概率','骰子','等可能事件','样本空间'],en:['probability','dice probability']},
  vector:{zh:['向量分解','向量','矢量','水平分量','竖直分量'],en:['vector components','vector projection','vectors']}
};
const visuals={
  Flow:{zh:['流程图','执行流程','工作流程','操作流程','排查步骤','故障排查'],en:['flowchart','workflow','troubleshooting steps']},
  RelationGraph:{zh:['关系图','组成关系','依赖关系','关联网络','构件关系'],en:['relationship graph','dependency graph']},
  Timeline:{zh:['时间线','发展历程','时间顺序','年代顺序','历史阶段'],en:['timeline','chronology']},
  Diagram:{zh:['结构示意','几何示意','结构图','剖面示意','受力示意'],en:['schematic diagram','geometry diagram']},
  Animation:{zh:['运动动画','旋转动画','位移动画','动画演示'],en:['motion animation','animated demonstration']}
};
const story={zh:['多画面','多张图','图文结合','图文交替','动画加流程','综合解释','同时展示'],en:['multiple visuals','multi panel','visual story']};
const freezeEntries=obj=>Object.freeze(Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,Object.freeze(v)])));
const TEMPLATE_REGISTRY=freezeEntries({
  ...Object.fromEntries(Object.entries(PRESET_CATALOG).map(([name,info])=>['lab.'+name,{
    id:'lab.'+name,family:'quick',title:info.label,description:info.description,
    parameters:Object.freeze([...info.parameters]),terms:Object.freeze([...(quick[name]?.zh??[]),...(quick[name]?.en??[])])
  }])),
  ...Object.fromEntries(VISUAL_KINDS.map(kind=>['visual.'+kind.toLowerCase(),{
    id:'visual.'+kind.toLowerCase(),family:'compose',kind,title:kind,
    description:{Flow:'顺序与分支流程',RelationGraph:'对象关系与依赖',Timeline:'有序历史与事件',Diagram:'受限的几何示意',Animation:'可播放的概念运动'}[kind],
    parameters:Object.freeze(['spec']),terms:Object.freeze([...(visuals[kind]?.zh??[]),...(visuals[kind]?.en??[])])
  }])),
  ...Object.fromEntries(Object.entries(EXPERIMENT_CATALOG).map(([template,entry])=>[entry.id,{
    id:entry.id,family:'experiment',template,title:entry.title,description:entry.description,
    parameters:Object.freeze(['parameters']),terms:Object.freeze(entry.terms),priority:entry.priority??(template==='planetary'?3:template==='process'?2:0)
  }])),
  'story.multi':{id:'story.multi',family:'story',title:'多画面图文',description:'一至四张可视化图文混排，动画优先',parameters:Object.freeze(['spec']),terms:Object.freeze([...story.zh,...story.en])}
});
const TEMPLATE_IDS=Object.freeze(Object.keys(TEMPLATE_REGISTRY));
function describeTemplateCatalog(){
 return TEMPLATE_IDS.map(id=>{const t=TEMPLATE_REGISTRY[id];return `${id}: ${t.description} (${t.parameters.join(',')||'无参数'})`;});
}
const isPlain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
const safeText=x=>typeof x==='string'&&x.length<=500&&x.trim().length>0;
function matchTerm(query,term){
 const latin=/^[\x00-\x7F]+$/.test(term);
 // ASCII terms must have word boundaries: English "can" must not trigger CAN bus.
 if(latin){const normalized=term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return new RegExp('(^|[^a-z0-9])'+normalized+'(?=$|[^a-z0-9])','i').test(query);}
 return query.includes(term);
}
/** Pure ranked suggestions. Conservatively abstains on ambiguous or weak matches. */
function routeTemplate(query,{maxCandidates=3}={}){
 if(!safeText(query))return {status:'none',reason:'query must contain 1–500 characters',candidates:[]};
 if(/(?:只要文字|不要图|无需图|不要可视化|text only|no visual)/i.test(query))return {status:'none',reason:'user requested no visual',candidates:[]};
 const ranked=TEMPLATE_IDS.map(id=>{
   const t=TEMPLATE_REGISTRY[id];let score=0;const hits=[];
   for(const term of t.terms)if(matchTerm(query,term))hits.push(term);
   // Nested synonyms are one piece of evidence, not separate votes.
   for(const term of hits)if(!hits.some(other=>other!==term&&other.includes(term)))score+=term.length>=4?3:2;
   return {id,family:t.family,score:score>0?score+(t.priority??0):0,hits};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
 const candidates=ranked.slice(0,Math.max(1,Math.min(5,Math.trunc(maxCandidates)||3)));
 if(candidates.length===0)return {status:'none',reason:'no supported template matched',candidates:[]};
 const top=candidates[0],second=candidates[1];
 if(top.score<2)return {status:'none',reason:'insufficient topic evidence',candidates};
 if(second&&top.score-second.score<=1)return {status:'ambiguous',reason:'multiple similarly suitable templates',candidates};
 return {status:'matched',id:top.id,confidence:!second||top.score>=second.score+3?'high':'medium',candidates};
}
function buildTemplateScene({templateId,parameters={},spec}={}){
 const entry=TEMPLATE_REGISTRY[templateId];if(!entry)throw Error('Unknown template ID');
 if(!isPlain(parameters))throw Error('Template parameters must be an object');
 if(entry.family==='experiment'){
   if(spec!==undefined)throw Error('Interactive experiments use parameters, not spec');
   return {id:templateId,title:entry.title,family:entry.family,source:experimentSceneSource(entry.template,parameters)};
  }
  if(entry.family==='quick'){
   if(spec!==undefined)throw Error('Quick template does not accept spec');
   const name=templateId.slice(4);
   return {id:templateId,title:entry.title,family:entry.family,source:makePresetSource(name,parameters)};
 }
 if(Object.keys(parameters).length)throw Error('Visual templates use spec, not parameters');
 if(!isPlain(spec))throw Error('Visual template needs a validated spec object');
 return {id:templateId,title:spec.title||entry.title,family:entry.family,source:entry.family==='compose'?visualSceneSource(entry.kind,spec):storySceneSource(spec)};
}


/** Transparent, bounded quality metadata. This is not a visual or scientific certification. */
function analyzeSceneQuality(source) {
  const parser=new VIEStream();parser.push(source);parser.finish();const snap=parser.snapshot();
  if(snap.errors.length||!snap.complete)return {status:'rejected',checks:['schema'],issues:snap.errors.slice(0,3)};
  const issues=[],templates=[];
  let schematic=false,generatedFigures=0;
  const visit=nodes=>{for(const node of nodes){
    if(node.type==='InteractiveScene')templates.push(node.props.template);
    if(node.type==='GenerativeFigure')generatedFigures++;
    if(node.type==='Diagram'||node.type==='Animation'){
      schematic=true;
      if(node.props.accuracy==='validated')issues.push({code:'SELF_DECLARED_ACCURACY',message:'输入标记 validated 不等于获得独立专业校核。'});
      if(node.props.representation==='pitch-circles')issues.push({code:'PITCH_CIRCLE_SCHEMATIC',message:'仅为分度圆示意，不能宣称已绘制真实齿形。'});
    }
    visit(node.children??[]);
  }};visit(snap.tree);
  if(templates.includes('worm'))issues.push({code:'PROJECTED_WORM_GEOMETRY',message:'蜗杆使用结构投影示意；只计算理想速比。'});
  return {status:issues.length?'review':generatedFigures?'generated':schematic?'schematic':'ready',checks:['schema','bounded-data','isolated-figure-contract'],templates,generatedFigures,issues,
    scope:'代码规则检查；不代表像素验收或独立科学认证'};
}

/** Request-local fast path for self-contained visual explanations, not a topic catalog. */
const VIE_WORKFLOW_STATS=new WeakMap();
const VIE_READ_TOOLS=new Set(['read','read_image','glob','grep','web_fetch','fetch_url','mcp__web__fetch']);
const VIE_FAST_TOOLS=new Set(['vie_explain','vie_auto']);
const VIE_SEARCH_TOOLS=new Set(['web_search','web_fetch','search_web','fetch_url','mcp__web__search','mcp__web__fetch']);
const VIE_CONTINUE_RE=/^(?:继续(?:生成|完成|讲解|解释|绘制|画图)?|接着(?:讲|画)?|continue|go on)[。.!！]?$/i;
/** Bounded streaming recognizer. Never execute model-written protocol text. */
function createVIETextGuard(onIssue=()=>{}){
  const open=/<[｜|]{2}(?:DSML|DSEL)[｜|]{2}\s*calls\s*>/i,close=/<\/[｜|]{2}(?:DSML|DSEL)[｜|]{2}\s*calls\s*>/i;
  let pending='',hidden=false;
  return {push(text,final=false){pending+=text;let out='';
    while(pending){const match=(hidden?close:open).exec(pending);
      if(match){if(!hidden){out+=pending.slice(0,match.index)+'（图形调用格式异常，已拦截源码显示。）';onIssue();}pending=pending.slice(match.index+match[0].length);hidden=!hidden;continue;}
      if(final){if(!hidden)out+=pending;pending='';break;}
      // Hold only a possible delimiter suffix; normal prose streams immediately.
      const at=pending.lastIndexOf('<'),keep=at>=0&&pending.length-at<80?at:pending.length;
      if(!hidden)out+=pending.slice(0,keep);pending=pending.slice(keep);break;
    }return out;}};
}
/** Inspect bounded, public session events only when recovering a truncated turn. */
function visualContinuationHistory(agent,allowShortTopic=false){
  const session=agent?.session;if(typeof session?.eventAt!=='function'||!Number.isSafeInteger(session.seq))return null;
  let truncated=false,timedOut=false,closed=false;const visuals=new Set();
  try{for(let n=session.seq-1;n>=Math.max(0,session.seq-400);n--){const event=session.eventAt(n);if(!event||typeof event.then==='function')return null;const d=event.data??{};
    if(!closed){if(event.type!=='turn/end')continue;closed=true;truncated=d.reason?.kind==='max-tokens';timedOut=d.reason?.kind==='aborted'&&d.reason.reason?.kind==='hook'&&/^VIE_REQUEST_TIMEOUT:/.test(d.reason.reason.reason??'');if(!truncated&&!timedOut)return null;}
    if(event.type==='tool/result'&&d.meta?.kind==='vie'&&d.meta.valid===true)visuals.add(String(d.meta.anchorCallId??d.meta.visualId??d.message?.source?.callId??event.seq));
    if(event.type==='user/message'&&(d.message??d).source?.kind==='user'){const message=d.message??d;const raw=(message.content??[]).filter(b=>b.type==='text').map(b=>b.text??'').join(' ').trim();if(VIE_CONTINUE_RE.test(raw))continue;let intent=visualIntent(message);if(allowShortTopic&&intent.reason==='ambiguous'&&raw&&raw.length<=3000)intent={active:true,reason:'mode-on'};return intent.active?{...intent,truncated,timedOut,visuals,rendered:visuals.size>0,failures:0,searches:0,searchUnavailable:new Set()}:null;}
  }}catch{}return null;
}
function visualIntent(message){
  if(message?.source?.kind!=='user')return {active:false,reason:'non-user'};
  const attachment=(message.content??[]).some(b=>b.type!=='text');
  const raw=(message.content??[]).filter(b=>b.type==='text').map(b=>b.text??'').join('\n').trim();
  if(!raw||raw.length>3000)return {active:false,reason:'ambiguous'};
  if((/(?:最终显示|最终渲染|已完成|打开思考|渲染)/.test(raw)&&/(?:问题|异常|错误|丢失|去掉|删|连在一起|堆|折叠|排查|修复)/.test(raw))||(/(?:图文|正文|文字)/.test(raw)&&/(?:丢失|去掉|删除|连在一起|堆叠|被折叠)/.test(raw)))return {active:false,reason:'development-or-source'};
  if(/只(?:要|用|需)?(?:纯)?文字|纯文字|不要(?:任何)?(?:图|画图|可视化)|不(?:用|使用)VIE|text[ -]only|no visual/i.test(raw))return {active:false,reason:'text-only'};
  const text=raw.replace(/(?:不需要|不用|不要|无需|无须|别)(?:再|先|额外)?(?:读取|搜索|生成|编写|创建|启动|运行|做|进行)?(?:插件源码|源码|安装包|截图|文件|脚本|测试|调试|浏览器|命令)[^，。;；\n]*/g,'');
  const readSources=attachment||/(?:[a-z]:[\\/]|https?:\/\/|\.(?:pdf|docx?|xlsx?|csv|json|html?|py|js|ts)\b|附件|这张图|此图|这份|上传|资料|@\S+)/i.test(text);
  if(/(?:修复|修改|优化|开发|调试|安装|卸载|部署|打包|排查|诊断|执行|运行)(?:.{0,16})(?:插件|源码|仓库|项目|程序|脚本|代码|命令|文件|问题|组件|VIE)|(?:源码|仓库|代码库|这段代码|这个项目).{0,12}(?:修改|修复|开发|调试)|精确仿真|有限元|真实接触线|\b(?:debug|implement|repository)\b/i.test(text))return {active:false,reason:'development-or-source'};
  if(!/解释|讲解|讲讲|介绍|说明|原理|区别|差异|比较|对比|是什么|怎么工作|如何|怎样|为什么|可视化|示意图|图文|演示|画出|绘制|画一|画个|画图|受力图|流程图|\bdraw\b|\bdiagram\b|explain|describe|compare|visuali[sz]e|illustrat|what is|how (?:does|do)|why (?:does|do)/i.test(text))return {active:false,reason:readSources?'source-task':'ambiguous'};
  return {active:true,readSources,reason:'explanation',keepEffort:/深度思考|完整推导|仔细推导|高推理|high reasoning|think hard/i.test(text)};
}
function visualWorkflowOptions(input={}){
  if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid VIE configuration');
  for(const k of Object.keys(input))if(!['visualMode','fastWorkflow','fastEffort','fastMaxTokens','fastMaxRequests','fastBudgetMs','fastMaxVisuals','fastMaxRepairs','fastMaxSearches','fastProseTokens','fastRequestMs'].includes(k))throw Error('Unknown VIE configuration: '+k);
  const o={visualMode:'auto',fastWorkflow:true,fastEffort:'inherit',fastMaxTokens:0,fastMaxRequests:8,fastBudgetMs:60000,fastMaxVisuals:3,fastMaxRepairs:2,fastMaxSearches:2,fastProseTokens:0,fastRequestMs:0,...input};
  if(!['auto','on','study','off'].includes(o.visualMode))throw Error('Invalid visualMode');
  if(typeof o.fastWorkflow!=='boolean'||!['low','inherit'].includes(o.fastEffort))throw Error('Invalid VIE workflow mode');
  if(o.fastMaxTokens!==0&&(!Number.isSafeInteger(o.fastMaxTokens)||o.fastMaxTokens<2048||o.fastMaxTokens>32768))throw Error('Invalid VIE workflow bound: fastMaxTokens');
  if(o.fastProseTokens!==0&&(!Number.isSafeInteger(o.fastProseTokens)||o.fastProseTokens<2048||o.fastProseTokens>32768))throw Error('Invalid VIE workflow bound: fastProseTokens');
  for(const [key,min,max]of [['fastMaxRequests',2,12],['fastBudgetMs',10000,300000],['fastMaxVisuals',1,4],['fastMaxRepairs',1,4],['fastMaxSearches',0,4]])if(!Number.isSafeInteger(o[key])||o[key]<min||o[key]>max)throw Error('Invalid VIE workflow bound: '+key);
  if(o.fastRequestMs!==0&&(!Number.isSafeInteger(o.fastRequestMs)||o.fastRequestMs<10000||o.fastRequestMs>300000))throw Error('Invalid VIE workflow bound: fastRequestMs');
  return o;
}
function createVisualWorkflow(input={},clock=()=>Date.now(),modeFor=()=>input.visualMode??'auto'){
  const options=visualWorkflowOptions(input),states=new WeakMap(),sessions=new WeakMap(),overrides=new WeakMap(),routes=new Map();
  function claim({agent,message,turn}){
    if(!agent||message?.source?.kind!=='user')return;
    const raw=(message.content??[]).filter(b=>b.type==='text').map(b=>b.text??'').join(' ').trim(),previous=states.get(agent);
    if(previous?.timer&&typeof clearTimeout==='function')clearTimeout(previous.timer);
    const continuation=(message.content??[]).every(b=>b.type==='text')&&VIE_CONTINUE_RE.test(raw);
    const resume=continuation?(previous?.active&&(!previous.rendered||previous.truncated)?previous:!previous?visualContinuationHistory(agent,['on','study'].includes(modeFor(agent))):null):null;
    const continuing=!!resume;
    let intent=continuing?{active:true,reason:'continuation',keepEffort:resume.keepEffort,readSources:resume.readSources}:continuation?{active:false,reason:'continuation-without-pending'}:visualIntent(message);
    if(modeFor(agent)==='off')intent={active:false,reason:'mode-off'};
    else if(['on','study'].includes(modeFor(agent))&&intent.reason==='ambiguous'&&raw&&raw.length<=3000)intent={active:true,reason:'mode-on'};
    // A new, explicit user instruction always re-elects this scope; runtime contexts never do.
    const value={...intent,study:modeFor(agent)==='study',active:options.fastWorkflow&&intent.active,turn,started:clock(),searches:resume?.searches??0,requests:0,steps:new Set(),pending:new Map(),rendered:resume?.rendered??false,visuals:new Set(resume?.visuals??[]),failures:resume?.failures??0,allowProtocolText:/DSML|DSEL|工具调用协议|调用格式示例/i.test(raw),fresh:true,resumeAfterTruncation:!!resume?.truncated,resumeAfterTimeout:!!resume?.timedOut,truncated:false,searchUnavailable:new Set(resume?.searchUnavailable??[])};
    states.set(agent,value);if(agent.session&&typeof agent.session==='object')sessions.set(agent.session,value);
  }
  function state(agent){return agent&&states.get(agent);}
  function repairLimit(s){return options.fastMaxRepairs+(s.visuals.size===0?1:0);}
  function closing(s){return s.visuals.size>=options.fastMaxVisuals||s.failures>=repairLimit(s)||s.requests>=options.fastMaxRequests-1;}
  function visualWeight(args){try{const d=args?.document??(args?.spec?JSON.parse(args.spec):null);if(!d||d.controls?.length)return 1;return Math.max(1,(d.blocks??[]).filter(b=>['figure','learning','graphic','chart','visual','experiment'].includes(b.type)||b.kind).length);}catch{return 1;}}
  function allowed(agent,name,args){
    if(modeFor(agent)==='off')return !/^vie_/.test(name);
    const s=state(agent);if(!s?.active)return true;if(s.closingAtAssembly||s.requests>options.fastMaxRequests)return false;
    if(VIE_FAST_TOOLS.has(name))return s.visuals.size+[...s.pending.values()].reduce((a,b)=>a+b,0)+visualWeight(args)<=options.fastMaxVisuals&&s.failures<repairLimit(s);
    if(s.failures>=options.fastMaxRepairs)return false;
    if(s.readSources&&VIE_READ_TOOLS.has(name))return s.visuals.size===0&&s.searches<options.fastMaxSearches;
    if(VIE_SEARCH_TOOLS.has(name))return s.visuals.size===0&&s.searches<options.fastMaxSearches&&clock()-s.started<options.fastBudgetMs&&!s.searchUnavailable.has(name);
    return name==='skill'&&(args===undefined||args?.name==='dsh-vie');
  }
  function guidanceBase(agent){
    const s=state(agent);if(!s?.active)return '';
    if(s.resumeAfterTimeout)return '上一轮被VIE显式超时配置中止。恢复原问题，保留已有图和正文，不重新规划整堂课或重新检索；尚无主图时先交付最小可用图及对应解释，优先type:"learning"数据入口。已有图可继续解释，不重复生成。不声称上一轮已经出图。';
    if(s.resumeAfterTruncation)return '上一轮因输出token上限截断。接着续写未完成的内容，保留已有图形及其原调用锚点，不重画已完成图、不重新检索。仅在剩余图形/修复预算允许且确需补完原任务时调用VIE；完整解释继续使用Harness正文。续写继承Harness的输出和推理设置，不重复套用VIE额度。';
    if(closing(s))return '本轮可视化工具尝试已结束。禁止在正文模拟工具调用、输出DSML/DSEL标签、图形JSON或HTML/SVG源码。由Harness原生正文正常讲解；按问题需要决定篇幅，不限两句话。若主图未成功，如实说明，不声称已显示。';
    if(!s.visuals.size&&s.failures>=options.fastMaxRepairs)return '尚无成功主图，保留最后一次参数纠错机会。只使用vie_explain或vie_auto修正工具反馈中的具体字段，优先简单通用图，不重新检索、不编写外部脚本，不在正文输出伪调用。若仍失败，正常正文结束并如实说明。';
    if(s.visuals.size)return '当前图形已提交视图。先在Harness原生正文讲解这张图；原问题还需另一概念图时，直接调用vie_explain，再写对应正文，形成图→文→图→文。补图和局部修复不要求more:true；无需额外图时正常结束，不凑调用次数。不要把完整解释写进VIE、不重复造图、不再检索。修图可用visualId/baseRevision/changes；visualId不是图片URL。正文不限两句话。';
    const lookup=clock()-s.started>=options.fastBudgetMs||s.searchUnavailable.size?'额外检索已停止或不可用；仍可调用VIE完成主图或修复参数。未核实的品牌/机型细节说明范围，不编造来源。':'';
    return (s.readSources?'先用必要读取工具核对用户资料，然后直接出图，不进入终端开发。':'')+'可视化讲解：先用一句话说明正在画什么；下一步直接用vie_explain生成第一张图，恰好匹配的实验可用vie_auto。每张图后用Harness正文解释图中关键关系，不能仅过渡一句便出下一图。优先原生graphic/chart/Flow，减少手写SVG。变化过程明确分开前→后，箭头连接对应对象，不能将前后工件重叠或画成断裂材料。窄屏用CSS重排或分步查看，标注不低于11px。说明材料、工况与适用范围，不把热锻等同所有锻造；数值注明来源，示意值不能充当工艺限值。每次只画当前段落的一个核心概念，先图→Harness原生正文解释→下一张图→对应正文；通常1张，复杂主题按需2–3张。不要把多个章节画成同一张SVG里的编号小面板、拼贴海报或缩小的多图总览；必须同时比较或共享交互的视图才可并列。补图不要求more，首图成功后仍可继续。VIE只放图、交互、图例与必要短标注，完整解释/公式/列表/表格写Harness正文。任意主题优先用graphic{kind:bars|donut|vectors,title,items}、chart或visual；特殊效果用隔离figure，不限模板。不要读取源码/安装包、写外部脚本或截图开发；visualId仅用于局部修复，不是图片URL。'+lookup;

  }
  function guidance(agent){const s=state(agent);return (s?.active&&s.study?VIE_STUDY_POLICY+'\n':'')+guidanceBase(agent);}
  function assembly(value,{agent}={}){
    if(modeFor(agent)==='off')return {...value,tools:value.tools.filter(t=>!/^vie_/.test(t.name)),sections:value.sections.filter(s=>!s.name?.startsWith('dsh-vie:'))};
    const s=state(agent);if(!s?.active)return value;
    // Missing capability on initial assembly means another scope disabled VIE.
    // A later empty tool set can also be our own closing assembly.
    if(!value.tools.some(t=>VIE_FAST_TOOLS.has(t.name))&&!s.closingAtAssembly){s.active=false;return value;}
    s.closingAtAssembly=closing(s);
    return {...value,tools:s.closingAtAssembly?[]:value.tools.filter(t=>allowed(agent,t.name)),sections:[...value.sections,{name:'dsh-vie:fast-turn',text:guidance(agent),interpolate:false}]};
  }
  function restore(agent,config){
    const saved=overrides.get(agent);if(!saved)return config;
    const out={...config};
    for(const [key,v]of Object.entries(saved.patch))if(out[key]===v){if(Object.hasOwn(saved.original,key))out[key]=saved.original[key];else delete out[key];}
    overrides.delete(agent);return out;
  }
  function request({agent,turn,step},config){
    const s=state(agent);if(!s?.active||s.turn!==turn)return restore(agent,config);
    // Restore only this instance's own override, preserving independent user edits.
    config=restore(agent,config);s.fresh=false;
    if(agent.session?.id){routes.delete(agent.session.id);routes.set(agent.session.id,{agent,s});while(routes.size>64)routes.delete(routes.keys().next().value);}
    const final=closing(s);
    if(!s.steps.has(step)){s.steps.add(step);s.requests++;}
    const record=(out,cap=0)=>{s.requestLimits={provider:out.provider,model:out.model,inheritedMaxTokens:config.maxTokens??null,configuredVIECap:cap,effectiveMaxTokens:out.maxTokens??null,outputLimitSource:out.maxTokens!==config.maxTokens?'vie-explicit':'harness',reasoningEffort:out.reasoningEffort??null,reasoningSource:out.reasoningEffort!==config.reasoningEffort?'vie-explicit':'harness'};VIE_WORKFLOW_STATS.set(agent,{requests:s.requests,...s.requestLimits});return out;};
    if(s.keepEffort||s.resumeAfterTruncation)return record(config);
    let saved=overrides.get(agent);if(!saved){saved={original:{},patch:{}};for(const k of ['maxTokens','reasoningEffort'])if(Object.hasOwn(config,k))saved.original[k]=config[k];overrides.set(agent,saved);}
    // Respect independently changed settings instead of restoring over a new user choice.
    for(const [k,v]of Object.entries(saved.patch))if(config[k]!==v){if(Object.hasOwn(config,k))saved.original[k]=config[k];else delete saved.original[k];}
    const out={...config};
    const cap=s.visuals.size||final?options.fastProseTokens:options.fastMaxTokens;
    if(cap>0){out.maxTokens=Math.min(Number.isSafeInteger(config.maxTokens)?config.maxTokens:cap,cap);saved.patch.maxTokens=out.maxTokens;}
    if(options.fastEffort==='low'&&!s.keepEffort&&['deepseek-account','deepseek-official'].includes(config.provider)&&(!config.reasoningEffort||['high','max'].includes(config.reasoningEffort))){out.reasoningEffort='low';saved.patch.reasoningEffort='low';}
    return record(out,cap);
  }
  function reserve(exec){const s=state(exec.agent);if(!allowed(exec.agent,exec.name,exec.arguments))return false;if(s?.active&&VIE_FAST_TOOLS.has(exec.name))s.pending.set(exec.callId,visualWeight(exec.arguments));return true;}
  function release(exec){state(exec.agent)?.pending.delete(exec.callId);}
  function result(exec,value){
    release(exec);
    const s=state(exec.agent);if(!s?.active)return;
    if(VIE_SEARCH_TOOLS.has(exec.name)||VIE_READ_TOOLS.has(exec.name))s.searches++;
    s.lastTool=exec.name;
    if(VIE_FAST_TOOLS.has(exec.name)){if(value.isError!==true&&value.meta?.kind==='vie'&&value.meta.valid===true){const id=value.meta.anchorCallId??value.meta.visualId??exec.callId??s.visuals.size;for(let i=0;i<visualWeight(exec.arguments);i++)s.visuals.add(i?String(id)+':'+i:id);s.rendered=value.meta.more!==true;if(s.firstGraphicMs===undefined)s.firstGraphicMs=clock()-s.started;}else s.failures++;}
    if(VIE_SEARCH_TOOLS.has(exec.name)&&value.isError===true){const reason=JSON.stringify(value.error??value.content??value.message??'').slice(0,5000);if(/API.?key|credential|ACCOUNT_QUOTA|quota|balance|unauthori[sz]ed|authentication|凭据|密钥|额度/i.test(reason))s.searchUnavailable.add(exec.name);}
    VIE_WORKFLOW_STATS.set(exec.agent,{requests:s.requests,searches:s.searches,repairs:s.failures,visuals:s.visuals.size,firstTextMs:s.firstTextMs,firstGraphicMs:s.firstGraphicMs,elapsedMs:clock()-s.started,...s.requestLimits,truncated:!!s.truncated});
  }

  function observe(session,event){const s=sessions.get(session);if(s&&event.type==='turn/end'&&event.data?.turn===s.turn)s.truncated=event.data.reason?.kind==='max-tokens';}
  async function* stream(call,next){
    const route=routes.get(call.sessionId),agent=route?.agent,s=route?.s;
    if(call.purpose||s?.allowProtocolText||!s?.active||states.get(agent)!==s||modeFor(agent)==='off'){yield* next();return;}
    const guards=new Map();let malformed=false,realCall=false;
    const guard=index=>{if(!guards.has(index))guards.set(index,createVIETextGuard(()=>{malformed=true;s.formatIssues=(s.formatIssues??0)+1;}));return guards.get(index);};
    for await(const chunk of next()){
      if(chunk.type==='tool-call-delta'||chunk.type==='block-end'&&chunk.block?.type==='tool-call')realCall=true;
      if(chunk.type==='text-delta'){const text=guard(chunk.index).push(chunk.text);if(text)yield {...chunk,text};continue;}
      if(chunk.type==='block-end'&&chunk.block?.type==='text'){
        const text=guards.get(chunk.index)?.push('',true);if(text)yield {type:'text-delta',index:chunk.index,text};
        // block-end is authoritative: sanitize independently to prevent raw source restoration.
        const clean=createVIETextGuard(()=>{if(!malformed){malformed=true;s.formatIssues=(s.formatIssues??0)+1;}});yield {...chunk,block:{...chunk.block,text:clean.push(chunk.block.text,true)}};guards.delete(chunk.index);continue;
      }
      if(chunk.type==='finish'){
        for(const [index,g]of guards){const text=g.push('',true);if(text)yield {type:'text-delta',index,text};}guards.clear();
        if(malformed&&!realCall&&!call.signal?.aborted&&chunk.reason?.kind!=='max-tokens'&&chunk.reason?.kind!=='error'&&chunk.reason?.kind!=='aborted'&&!s.formatFeedback&&typeof agent.inject==='function'){
          s.formatFeedback=1;agent.inject({id:'vie-format-'+s.turn,role:'user',source:{kind:'vie-format-check'},content:[{type:'text',text:'VIE_FORMAT_INVALID：上一条响应把工具调用写成了DSML/DSEL正文，已拦截；没有执行该调用。不要复述源码或伪造调用标签。'+(closing(s)?'工具预算已结束，请直接用正常正文完成解释。':'如仍需这张图，使用本次真实提供的vie_explain工具提交document对象；保留已完成的图和解释。只纠正本次格式，不重新检索。')}]});
        }
      }
      yield chunk;
    }
  }
  return {options,claim,state,allowed,guidance,assembly,request,result,observe,stream,reserve,release};
}
function installVisualWorkflow(ctx,options,mode={get:()=>options.visualMode??'auto'}){
  if(typeof ctx.on!=='function'||!ctx.systemPrompt)return;
  const workflow=createVisualWorkflow(options,()=>Date.now(),agent=>mode.get(agent));
  const timers=new Set();
  const finish=s=>{if(!s)return;if(s.timer){clearTimeout(s.timer);timers.delete(s.timer);s.timer=null;}s.removeAbort?.();s.removeAbort=null;};
  ctx.effect?.(()=>()=>{for(const timer of timers)clearTimeout(timer);timers.clear();});
  ctx.systemPrompt.section({name:'dsh-vie:entry',order:2950,interpolate:false,text:context=>mode.get(context?.agent)==='off'?'':VIE_POLICY+(mode.get(context?.agent)==='study'?VIE_STUDY_POLICY:'')+' 用户要求纯文字或开发/调试时遵循该请求。'});
  ctx.on('agent/inbox/claimed',payload=>{if(payload.message?.source?.kind==='user')finish(workflow.state(payload.agent));workflow.claim(payload);});
  ctx.on('session/event',(session,event)=>workflow.observe(session,event));
  ctx.on('llm/stream',(call,next)=>workflow.stream(call,next));
  ctx.on('system-prompt/assemble',async(value,context,next)=>workflow.assembly(await next(),context));
  ctx.on('agent/request',async(payload,next)=>{
    const config=workflow.request(payload,await next()),s=workflow.state(payload.agent);
    finish(s);if(s)s.requestStarted=Date.now();
    if(workflow.options.fastRequestMs>0&&s?.active&&!s.keepEffort&&!s.resumeAfterTruncation&&!s.resumeAfterTimeout&&!s.visuals.size&&typeof payload.agent?.cancel==='function'){
      s.timer=setTimeout(()=>{finish(s);if(workflow.state(payload.agent)!==s||mode.get(payload.agent)==='off')return;s.timedOut=true;payload.agent.cancel({kind:'hook',reason:'VIE_REQUEST_TIMEOUT: 可视化请求超过 '+workflow.options.fastRequestMs+'ms，已按显式超时配置停止；发送继续可恢复，fastRequestMs:0可关闭此限制。'},{keepInbox:true});},workflow.options.fastRequestMs);s.timer.unref?.();timers.add(s.timer);
      const abort=()=>finish(s);payload.signal?.addEventListener('abort',abort,{once:true});s.removeAbort=()=>payload.signal?.removeEventListener('abort',abort);
    }
    return config;
  });
  ctx.on('agent/assistant-stream',({agent,frame})=>{
    const s=workflow.state(agent);if(!s?.active)return;
    if(frame.type==='chunk'&&frame.chunk?.type==='text-delta'&&s.firstTextMs===undefined)s.firstTextMs=Date.now()-s.started;
    if(frame.type==='chunk'&&frame.chunk?.type==='finish'){s.finishReason=frame.chunk.reason?.kind;if(s.finishReason==='max-tokens')s.truncated=true;}
    if(frame.type==='end'){finish(s);VIE_WORKFLOW_STATS.set(agent,{requests:s.requests,searches:s.searches,repairs:s.failures,visuals:s.visuals.size,firstTextMs:s.firstTextMs,firstGraphicMs:s.firstGraphicMs,lastRequestMs:Date.now()-(s.requestStarted??s.started),timedOut:!!s.timedOut,formatIssues:s.formatIssues??0,formatFeedback:s.formatFeedback??0,...s.requestLimits,finishReason:s.finishReason,truncated:!!s.truncated});}
  });
  ctx.on('agent/status',({agent,status})=>{if(status?.kind==='idle')finish(workflow.state(agent));});
  ctx.on('tools/pre-execute',async(exec,next)=>{if(workflow.reserve(exec)){try{const decision=await next();if(decision?.kind==='deny')workflow.release(exec);return decision;}catch(error){workflow.release(exec);throw error;}}return {kind:'deny',reason:'VIE_FAST_PATH: 普通知识讲解请直接使用vie_explain或vie_auto；不进入文件/终端/截图调试。主图已生成时请在Harness正文正常讲解。'};});
  ctx.on('tools/result',(exec,result)=>{workflow.result(exec,result);});
}

/** Session preferences are independent of subjects and never change model settings. */
const VIE_MODES=['auto','on','study','off'];
const VIE_NAMES=new Set(['vie_explain','vie_auto','vie_render','vie_compose','vie_story','vie_quick']);
function createVIEMode(defaultMode='auto',snapshot={},persist=()=>{}){
  if(!VIE_MODES.includes(defaultMode))throw Error('Invalid visualMode');
  if(!snapshot||typeof snapshot!=='object'||Array.isArray(snapshot))snapshot={};
  let global=VIE_MODES.includes(snapshot.global)?snapshot.global:defaultMode;
  const sessions=new Map(Object.entries(snapshot.sessions??{}).filter(([id,value])=>id.length<=200&&VIE_MODES.includes(value)).slice(-256));
  return {
    get:agent=>sessions.get(typeof agent==='string'?agent:agent?.session?.id)??global,
    snapshot:()=>({global,sessions:Object.fromEntries(sessions)}),
    set(mode,sessionId){if(!VIE_MODES.includes(mode))throw Error('Use auto, on, study or off');const before=new Map(sessions),prior=global;try{if(sessionId){sessions.delete(sessionId);sessions.set(sessionId,mode);while(sessions.size>256)sessions.delete(sessions.keys().next().value);}else global=mode;persist({global,sessions:Object.fromEntries(sessions)});}catch(error){global=prior;sessions.clear();for(const [id,value]of before)sessions.set(id,value);throw error;}}
  };
}
async function installVIESessionMode(ctx,defaultMode='auto'){
  // Lightweight stubs and old hosts keep the configured mode without filesystem access.
  if(typeof ctx.on!=='function')return createVIEMode(defaultMode);
  const [fs,path,os,crypto]=await Promise.all([import('node:fs'),import('node:path'),import('node:os'),import('node:crypto')]);
  const file=path.join(process.env.DSH_HOME??path.join(os.homedir(),'.dsh'),'dsh-vie-mode.json');let snapshot={};
  try{snapshot=JSON.parse(fs.readFileSync(file,'utf8'));}catch(error){if(error.code!=='ENOENT')ctx.logger?.warn('VIE mode preferences could not be read; using configured default');}
  const baseDir=path.join(path.dirname(file),'vie-baselines-v1'),baselineFile=id=>path.join(baseDir,crypto.createHash('sha256').update(String(id)).digest('hex')+'.json');
  VIE_BASELINE_STORAGE={load(id){const p=baselineFile(id);if(!fs.existsSync(p)||fs.statSync(p).size>1100000)return [];const data=JSON.parse(fs.readFileSync(p,'utf8'));return data.v===1&&Array.isArray(data.entries)?data.entries.slice(-4):[];},save(id,entries){fs.mkdirSync(baseDir,{recursive:true});const target=baselineFile(id),tmp=target+'.'+process.pid+'.tmp';fs.writeFileSync(tmp,JSON.stringify({v:1,entries:entries.slice(-4)}));fs.renameSync(tmp,target);const files=fs.readdirSync(baseDir).filter(n=>/^[a-f0-9]{64}\.json$/.test(n)).map(n=>({path:path.join(baseDir,n),time:fs.statSync(path.join(baseDir,n)).mtimeMs})).sort((a,b)=>b.time-a.time);for(const f of files.slice(64))fs.unlinkSync(f.path);}};
  const mode=createVIEMode(defaultMode,snapshot,value=>{const temporary=file+'.'+process.pid+'.tmp';fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(temporary,JSON.stringify(value)+'\n');fs.renameSync(temporary,file);});
  ctx.inject?.(['commands'],scope=>scope.commands.register({definitionId:'dsh-vie:mode',name:'vie',description:'VIE auto/on/study/off for this chat; global auto/on/study/off sets the default for other chats',input:{hint:'[auto|on|study|off|global auto|global on|global study|global off]'},handler:({agent,rawInput})=>{
    const words=rawInput.trim().split(/\s+/),isGlobal=words[0]==='global',value=isGlobal?words[1]:words[0],sessionId=isGlobal?undefined:agent?.session?.id;
    if(rawInput.trim()==='status')return {kind:'success',text:JSON.stringify(VIE_WORKFLOW_STATS.get(agent)??{status:'No visual request measured in this process'})};
    if(!rawInput.trim())return {kind:'success',text:'VIE: '+mode.get(agent)};
    if(!VIE_MODES.includes(value)||words.length>(isGlobal?2:1)||!isGlobal&&!sessionId)return {kind:'error',text:'Usage: /vie [auto|on|study|off|global auto|global on|global study|global off]'};
    try{mode.set(value,sessionId);return {kind:'success',text:'VIE '+(isGlobal?'默认模式':'本聊天')+'：'+value};}catch(error){return {kind:'error',text:'VIE preference could not be saved: '+error.message};}
  }}));
  // Optional projection only; a missing composer surface does not silently turn an explicit off into on.
  try{
    const {z}=await import('zod');
    ctx.inject?.(['sessionProjections','commands'],scope=>scope.sessionProjections.register({key:'dsh-vie:mode',stateVersion:2,stateSchema:z.object({sessionId:z.string(),pending:z.boolean(),status:z.string()}),init:header=>({sessionId:header.id,pending:false,status:''}),apply:(state,event)=>{
    if(event.type==='user/message'&&visualIntent(event.data?.message??event.data).active&&mode.get(state.sessionId)!=='off')return {...state,status:'正在准备主图…'};
    if(event.type==='tool/call'&&VIE_NAMES.has(event.data?.name))return {...state,status:'正在绘制…'};
    if(event.type==='tool/result'&&event.data?.meta?.kind==='vie')return {...state,status:event.data.meta.valid?'主图已生成':'图形参数需要修复'};
    if(event.type==='turn/end')return {...state,status:event.data?.reason?.reason?.kind==='hook'&&event.data.reason.reason.reason?.includes('VIE_REQUEST_TIMEOUT')?'出图请求超时，已停止；可降低推理档位重试。':''};
    return event.data?.name==='vie'&&event.type==='command/run'?{...state,pending:true}:event.type==='command/done'?{...state,pending:false}:state;
  },wire:{viewSchema:z.object({mode:z.enum(VIE_MODES),pending:z.boolean(),status:z.string()}),view:state=>({mode:mode.get(state.sessionId),pending:state.pending,status:state.status??''})}}));
  }catch(error){ctx.logger?.warn('VIE composer mode indicator unavailable; /vie command and configured mode remain active: '+error.message);}
  return mode;
}

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
        candidate=JSON.parse(JSON.stringify(base.document));id=args.visualId;revision=base.revision+1;display=appearance({...base.display,...args});anchorCallId=base.anchorCallId??anchorCallId;
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
      const document=validateDocumentSpec(candidate);
      if(candidate.caption!==undefined)display=appearance({...args,caption:args.caption!==undefined?args.caption:candidate.caption});
      for(let i=0;i<document.blocks.length;i++)if(document.blocks[i].type==='figure'&&document.blocks[i].js)try{new VIEJavaScriptParser(document.blocks[i].js);}catch(error){error.path='blocks['+i+'].js';error.message=error.path+': JavaScript syntax: '+error.message;throw error;}
      const source=documentSceneSource(document),parser=new VIEStream();parser.push(source);parser.finish();const snap=parser.snapshot();
      if(!snap.complete||snap.errors.length)throw Error(snap.errors[0]??'Incomplete scene');
      save(store,id,{document,revision,display,anchorCallId});
      if(exec?.agent?.session?.id&&VIE_BASELINE_STORAGE)try{VIE_BASELINE_STORAGE.save(exec.agent.session.id,[...store]);}catch{}
      return {note:'图形参数与脚本语法已通过校验，已提交视图渲染。visualId='+id+'，revision='+revision+'。现在在Harness正文解释此图；还需另一概念图可继续调用，再紧跟对应正文，不要求more:true。每张图只表达当前概念，勿把各章节拼在一个SVG。visualId仅用于局部修改，不能写成图片链接。',meta:{kind:'vie',mode:'document',title:document.title,source,valid:true,visualId:id,revision,...display,...anchorCallId?{anchorCallId:String(anchorCallId)}:{}}};
    }catch(error){
      // A parseable invalid draft can be repaired by replacing its failing block.
      // A failed patch never advances or overwrites its validated baseline.
      if(args.changes===undefined&&candidate&&id&&Array.isArray(candidate.blocks)&&candidate.blocks.length<=12&&new TextEncoder().encode(JSON.stringify(candidate)).length<=245760)save(store,id,{document:JSON.parse(JSON.stringify(candidate)),revision,display:display??{},anchorCallId});
      const saved=id&&store.get(id),repair=saved?{visualId:id,revision:saved.revision,errorPath:error.path??'$'}:{};
      return {note:'主图参数无效：'+error.message+(saved?'。保留草稿 '+id+' revision='+saved.revision+'；只替换出错块，不必重写其余图。':'。请使用原生document对象，避免嵌套JSON转义。'),meta:{kind:'vie',mode:'document',source:'',valid:false,error:String(error.message),...repair,...display,...(saved?.anchorCallId??anchorCallId)?{anchorCallId:String(saved?.anchorCallId??anchorCallId)}:{}}};
    }
  };
}

/** A valid protocol and a useful teaching visual are separate claims. */
function defineVisualTool(definition){
  return defineTool({...definition,execute:async(...args)=>{
    const value=await definition.execute(...args);
    if(value.meta?.kind==='vie'){
      const exec=args[1];
      if(value.meta.presentationVersion===undefined)try{value.meta={...appearance(args[0]),...value.meta};}catch{}
      if(exec?.callId&&!value.meta.anchorCallId)value.meta.anchorCallId=String(exec.callId);
      value.meta.quality=value.meta.valid?analyzeSceneQuality(value.meta.source):{status:'rejected',checks:['schema'],issues:[{code:'SCENE_REJECTED',message:value.meta.error??value.meta.errors?.[0]??'场景无效'}]};
      if(value.meta.quality.status==='review')value.note+='；范围提示：'+value.meta.quality.issues.map(x=>x.message).join(' ');
    }
    return value;
  }});
}
/** Host plugin: DSH canonical tool-output projections; declarative content only. */
export const name='dsh-Visual-Interactive-Engine';
export const inject=['tools'];
export const OUTPUT_SCHEMA={type:'object',additionalProperties:false,properties:{note:{type:'string',required:true},meta:{type:'json',required:true}}};
/** Default flow is a separate chronological Chat node outside the folded work-process.
 * 'process' is explicitly opt-in and may be folded by DSH; it is NOT native paragraph inline. */
export const PRESENTATION_PARAMETERS={
  placement:{type:'string',enum:['flow','start','tail','process'],description:'Default flow follows each call; start groups before prose; tail/process opt-in.'},
  more:{type:'boolean',description:'Legacy optional continuation hint; later graphics/repairs remain available within the request budget.'},
  caption:{type:'string',description:'Optional short factual takeaway/figure caption (max 140 characters). Do not duplicate the entire explanation.'}
};
function appearance(args){
  if(args?.placement!==undefined&&!['flow','start','tail','process'].includes(args.placement))throw Error('Invalid placement');
  if(args?.more!==undefined&&typeof args.more!=='boolean')throw Error('Invalid more');
  if(args?.caption!==undefined&&(typeof args.caption!=='string'||args.caption.length>140))throw Error('Invalid caption');
  return {presentationVersion:3,placement:args?.placement??'flow',more:args?.more===true,...(args?.caption?.trim()?{caption:args.caption.trim()}:{})};
}

export const PARAMETERS={
  title:{type:'string',description:'A short Chinese title for the interactive explanation.'},
  source:{type:'string',description:'Complete VIE v1 JSONL event stream, one compact JSON object per line. Start with surface.begin, then node.put, state.init/state.derive, finish with surface.end. Put source early in the arguments so the UI can preview as it streams.'},
  ...PRESENTATION_PARAMETERS
};
export function createVIEImplementation(){
  return defineVisualTool({
    name:'vie_render',
    description:'Advanced VIE JSONL stream. Prefer vie_explain. Emit surface.begin, node.put/state.*, surface.end; source streams incrementally. Generated scripts belong only in isolated GenerativeFigure nodes. Max80 nodes/256KB. Default flow follows each call, separated by native prose. Load dsh-vie skill for the advanced protocol.',
    parameters:PARAMETERS,
    output:{
      schema:OUTPUT_SCHEMA,
      render:(_args,value)=>[{type:'text',text:value.note}],
      presentationMeta:(_args,value)=>value.meta
    },
    isConcurrencySafe:()=>true,
    execute: async args=>{
      const title=typeof args.title==='string'?args.title.slice(0,120):'交互可视化';
      let display;try{display=appearance(args);}catch(e){return {note:'VIE 展示参数无效：'+e.message,meta:{kind:'vie',source:'',title,valid:false,error:String(e.message)}};}
      if(typeof args.source!=='string'||new TextEncoder().encode(args.source).length>LIMITS.bytes){return {note:'VIE rejected oversized/invalid source',meta:{kind:'vie',source:'',title,valid:false,errors:['Invalid/oversized source']}};}
      const stream=new VIEStream();stream.push(args.source);stream.finish();
      const snap=stream.snapshot();
      const valid=snap.complete&&snap.tree.length>0&&snap.errors.length===0;
      return {note:valid?`已创建交互界面：${title}`:`VIE 校验未通过：${snap.errors.slice(0,3).join('; ')||'没有有效组件'}`,meta:{kind:'vie',title,source:valid?args.source:'',valid,errors:snap.errors.slice(0,12),...display}};
    },
    presentCall:()=>({card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 交互界面',kind:'other'}),
    presentResult:(_args,result)=>result.isError?undefined:{card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 可交互',kind:'other'}
  });
}
/** Lightweight path: the model spends its tokens on explaining the subject,
 * and chooses a prebuilt interactive experiment with a handful of parameters. */
export function createQuickImplementation(){
 return defineVisualTool({
  name:'vie_quick',
  description:'Optional fast prebuilt experiment. Choose preset and essential inputs; runtime handles UI and calculations. Presets: bitwise,timer,ohm,fraction,probability,vector,motion,quadratic,data,can. Other subjects use vie_explain. Data must be user supplied or labeled as example. Default flow follows the call position.',
  parameters:{
    preset:{type:'string',enum:['motion','quadratic','data','can','bitwise','timer','ohm','fraction','probability','vector'],description:'Required. Which validated teaching experiment to show.'},
    speed:{type:'number',description:'Optional initial m/s for motion (0..40).'},
    time:{type:'number',description:'Optional initial seconds (0..10).'},
    a:{type:'number',description:'Optional quadratic coefficient (-3..3, step 0.1).'},
    dataset:{type:'string',description:'Only for data: optional JSON string {labels:[...],values:[...],unit:,title:}. Provide this ONLY for real data supplied by the user. Otherwise clearly label the demonstration dataset. Max 1200 characters.'},
    clockMHz:{type:'number',description:'CAN peripheral APB1 clock in MHz, default 36.'},
    prescaler:{type:'number',description:'CAN BRP, integer, default 4.'},
    bs1:{type:'number',description:'Scheme A BS1 time quanta, default 14.'},
    bs2:{type:'number',description:'Scheme A BS2 time quanta, default 3.'},
    compareBs1:{type:'number',description:'Scheme B BS1 time quanta, default 15.'},
    compareBs2:{type:'number',description:'Scheme B BS2 time quanta, default 2.'},
    sjw:{type:'number',description:'CAN SJW time quanta, default 1.'},
    ...PRESENTATION_PARAMETERS
  },
  output:{schema:OUTPUT_SCHEMA,render:(_args,value)=>[{type:'text',text:value.note}],presentationMeta:(_args,value)=>value.meta},
  isConcurrencySafe:()=>true,
  execute:async args=>{
    try{
      const display=appearance(args);
      const preset=args.preset;
      if(!Object.hasOwn(PRESET_CATALOG,preset))throw Error('Unknown preset');
      const parameters={};
      for(const name of PRESET_CATALOG[preset].parameters){
        if(args[name]!==undefined)parameters[name]=args[name];
      }
      if(preset==='data' && args.dataset!==undefined){if(typeof args.dataset!=='string'||args.dataset.length>1200)throw Error('Invalid dataset');Object.assign(parameters,JSON.parse(args.dataset));}
      const source=makePresetSource(preset,parameters);
      return {note:`已呈现交互实验：${PRESET_CATALOG[preset].label}`,meta:{kind:'vie',mode:'preset',preset,title:PRESET_CATALOG[preset].label,source,valid:true,...display}};
    }catch(e){return {note:`快速实验参数不合法：${e.message}`,meta:{kind:'vie',valid:false,source:'',error:String(e.message)}};}
  },
  presentCall:()=>({card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 即时实验',kind:'other'}),
  presentResult:(_args,result)=>result.isError?undefined:{card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 交互实验',kind:'other'}
 });
}
/** Flexible path for common subjects: structured facts instead of SVG coordinates. */
export function createComposeImplementation(){
 return defineVisualTool({
  name:'vie_compose',
  description:VIE_VISUAL_POLICY+' Compatibility tool for Flow/RelationGraph/Timeline/Diagram/Animation. spec is JSON. Prefer automatic Flow/Timeline layouts; use vie_explain figure for arbitrary geometry. Diagram supports numeric {$bind:"/path",scale?,offset?}. Animation supports rotate/translate, at most 3 motions per shape and integer cycles -20..20 except 0. Not a physical solver. Max spec64KB.',
  parameters:{state:{type:'string',description:'Optional JSON object of declared numeric state paths, e.g. {"/x":100}; max 4096 bytes.'},derive:{type:'string',description:'Optional JSON object mapping state paths to safe numeric expressions; max 4096 bytes.'},kind:{type:'string',enum:['Flow','RelationGraph','Timeline','Diagram','Animation'],description:'Semantic visual form.'},spec:{type:'string',description:'Compact JSON object for the selected kind, containing facts and labels; never JavaScript, CSS, HTML or arbitrary SVG.'},...PRESENTATION_PARAMETERS},
  output:{schema:OUTPUT_SCHEMA,render:(_args,value)=>[{type:'text',text:value.note}],presentationMeta:(_args,value)=>value.meta},
  isConcurrencySafe:()=>true,
  execute:async args=>{
    try{
      const display=appearance(args);
      if(!VISUAL_KINDS.includes(args.kind)||typeof args.spec!=='string'||new TextEncoder().encode(args.spec).length>65536)throw Error('Invalid visual arguments');
      const parsed=JSON.parse(args.spec);
      for(const key of ['state','derive'])if(args[key]!==undefined&&(typeof args[key]!=='string'||new TextEncoder().encode(args[key]).length>4096))throw Error('Invalid '+key+' argument');
      const source=visualSceneSource(args.kind,parsed,{state:args.state===undefined?{}:JSON.parse(args.state),derive:args.derive===undefined?{}:JSON.parse(args.derive)});
      const stream=new VIEStream();stream.push(source);stream.finish();
      const snap=stream.snapshot();if(!snap.complete||snap.errors.length)throw Error(snap.errors[0]||'Invalid visual scene');
      return {note:`已创建${args.kind}交互图：${parsed.title??'通用示意'}`,meta:{kind:'vie',mode:'compose',title:parsed.title??'通用示意',source,valid:true,...display}};
    }catch(e){return {note:`通用可视化参数无效：${e.message}`,meta:{kind:'vie',valid:false,source:'',error:String(e.message)}};}
  },
  presentCall:()=>({card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 通用可视化',kind:'other'}),
  presentResult:(_args,result)=>result.isError?undefined:{card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 图文解释',kind:'other'}
 });
}
export function createStoryImplementation(){
 return defineVisualTool({
  name:'vie_story',
  description:VIE_VISUAL_POLICY+' Compatibility tool for 1–4 ordered visual panels: spec JSON {title,panels:[{kind,spec,caption?}]}. Keep captions short; opening/takeaway paragraphs remain accepted for historical compatibility. Use vie_explain for new documents and put explanations in Harness prose.',
  parameters:{spec:{type:'string',description:'Serialized JSON story with 1–4 panels, each validated by the generic visual catalog. Short visual captions only; explanations go in Harness prose. Maximum 192KB UTF-8 bytes.'},...PRESENTATION_PARAMETERS},
  output:{schema:OUTPUT_SCHEMA,render:(_a,v)=>[{type:'text',text:v.note}],presentationMeta:(_a,v)=>v.meta},
  isConcurrencySafe:()=>true,
  execute:async args=>{try{
    const display=appearance(args);
    if(typeof args.spec!=='string'||new TextEncoder().encode(args.spec).length>196608)throw Error('Invalid story input');
    const spec=JSON.parse(args.spec),source=storySceneSource(spec);
    const stream=new VIEStream();stream.push(source);stream.finish();const snap=stream.snapshot();if(!snap.complete||snap.errors.length)throw Error(snap.errors.join('; ')||'Invalid story');
    return {note:`已生成图文解释：${spec.title??'交互讲解'}`,meta:{kind:'vie',mode:'story',title:spec.title??'交互讲解',source,valid:true,...display}};
  }catch(e){return {note:`组合图文参数无效：${e.message}`,meta:{kind:'vie',valid:false,source:'',error:String(e.message)}};}
  },presentCall:()=>({card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 图文联动',kind:'other'}),presentResult:(_a,r)=>r.isError?undefined:{card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 图文讲解',kind:'other'}
 });
}
/** Unified single-call routing: a strong match chooses a validated template.
 * Unknown/ambiguous topics fail closed with ranked hints; no fabricated diagram.
 * Explicit templateId is a model choice, still fully schema-validated.
 */
export function createAutoImplementation(){
 return defineVisualTool({
  name:'vie_auto',
  description:'Optional shortcut: lab.planetary/gears/geartrain/worm/wave/process/vector. Other topics use vie_explain. worm: starts integer1..4, wheelTeeth integer20..80; geartrain: teeth array2..6, each18..80, inputSpeed -4..4. No preliminary skill load or UI code needed. Explain in Harness prose.',
  parameters:{
    query:{type:'string',description:'User subject, max500 characters.'},
    templateId:{type:'string',enum:TEMPLATE_IDS,description:'Optional explicit shortcut ID.'},
    parameters:{type:'string',description:'Optional experiment parameters as JSON string, max2000 bytes; no fabricated measurements.'},
    spec:{type:'string',description:'Legacy visual/story JSON string, max192KB.'},
    ...PRESENTATION_PARAMETERS
  },
  output:{schema:OUTPUT_SCHEMA,render:(_a,v)=>[{type:'text',text:v.note}],presentationMeta:(_a,v)=>v.meta},
  isConcurrencySafe:()=>true,
  execute:async args=>{try{
    const display=appearance(args);
    if(typeof args.query!=='string'||!args.query.trim()||args.query.length>500)throw Error('Query must contain 1–500 characters');
    const routing=routeTemplate(args.query);
    if(routing.reason==='user requested no visual')throw Error('User requested text only');
    const id=args.templateId|| (routing.status==='matched'?routing.id:null);
    if(!id)throw Error('No shortcut matched. This topic is still supported: use vie_explain for graphics and explain in Harness prose. Candidate shortcuts: '+routing.candidates.map(c=>c.id).join(', '));
    if(args.parameters!==undefined&&(typeof args.parameters!=='string'||new TextEncoder().encode(args.parameters).length>2000))throw Error('Invalid parameters size');
    if(args.spec!==undefined&&(typeof args.spec!=='string'||new TextEncoder().encode(args.spec).length>196608))throw Error('Invalid spec size');
    const params=args.parameters===undefined?{}:JSON.parse(args.parameters);
    const spec=args.spec===undefined?undefined:JSON.parse(args.spec);
    const scene=buildTemplateScene({templateId:id,parameters:params,spec});
    const p=new VIEStream();p.push(scene.source);p.finish();const snap=p.snapshot();
    if(!snap.complete||snap.errors.length)throw Error(snap.errors[0]||'Invalid scene');
    return {note:'已呈现交互解释：'+scene.title,meta:{kind:'vie',mode:'auto',title:scene.title,templateId:id,route:routing.status==='matched'&&id===routing.id?routing.confidence:'explicit',source:scene.source,valid:true,...display}};
  }catch(e){return {note:'VIE 自动路由失败：'+e.message,meta:{kind:'vie',mode:'auto',source:'',valid:false,error:String(e.message)}};}
  },
  presentCall:()=>({card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 智能匹配',kind:'other'}),
  presentResult:(_a,r)=>r.isError?undefined:{card:'generic',title:'Visual Interactive Engine（智能图文交互引擎） · 图文解释',kind:'other'}
 });
}
export function apply(ctx,options={}){
  const workflowOptions=visualWorkflowOptions(options);
  ctx.tools.register(createExplainImplementation());
  ctx.tools.register(createQuickImplementation());ctx.tools.register(createVIEImplementation());
  ctx.tools.register(createComposeImplementation());ctx.tools.register(createStoryImplementation());ctx.tools.register(createAutoImplementation());
  const finish=mode=>{
  ctx.inject?.(['systemPrompt'],services=>installVisualWorkflow(services,workflowOptions,mode));
  ctx.inject?.(['skills'],services=>{
    services.skills.register({name:'dsh-vie',description:'Optional detailed reference for VIE visual explanations. Direct vie_explain/vie_auto calls need no preliminary skill load. Any subject; templates optional.',source:'bundled',content:VIE_SKILL_CONTENT+'\n\n'+VIE_COMPONENT_REFERENCE});
  });
  };
  if(typeof ctx.on==='function')return installVIESessionMode(ctx,workflowOptions.visualMode).then(finish);
  finish(createVIEMode(workflowOptions.visualMode));
}

/** Primary route: compose explanation and generated interactions for any topic. */
export function createExplainImplementation(){
  return defineVisualTool({
    name:'vie_explain',
    description:VIE_VISUAL_POLICY+' Native document {title,controls?,derive?,layout?:stack|grid,blocks:[...]}. Blocks: graphic {kind:bars|donut|vectors,title,items:[{label,value}] OR vectors [{label,x,y}],unit?}; chart {title,x:{min,max,label?},y:{min,max,label?},series:[{label,expr OR points:[[x,y],...],keyPoints?:[x],breaks?:[x]}],controls?,bindings?,regions?:[{label,points}],note?}; visual {kind:Flow|RelationGraph|Timeline|Diagram|Animation,spec}; figure {title,html,css?,js?,state?,height?,bindings?} for SVG/Canvas/WebGL. Flow spec {title,nodes:[{id,label,detail?}],edges:[{from,to,label?}]}. Self loops express feedback cycles; use node.detail for descriptions. caption belongs at tool level (document.caption accepted as alias). Controls [{key,label,min,max,value,step?,kind?:slider|number|select|toggle,options?:[{label,value}]}]; numeric toggle 0/1. derive:{s:"A*sin(w*t)"}; unique keys. Chart/figure bindings map local keys to control/derive keys; Diagram coordinates use {$bind:"/derived/s",scale?,offset?}. Figures have no network/libraries; use VIE.state,setState,theme,visible,reducedMotion,reportError and vie:statechange events. Complete blocks preview early. Repair only changed blocks with visualId/baseRevision/changes. Max12 blocks/4 figures, figure60KB. Detailed optional reference: dsh-vie skill. Scientific accuracy requires checking data and calculations.',
    parameters:{document:{type:'object',description:'Preferred native object. Only graphics and necessary short labels; full explanation belongs in Harness prose.',additionalProperties:false,properties:DOCUMENT_PROPERTIES},spec:{type:'string',description:'Legacy JSON string alternative to document; avoid double escaping.'},visualId:{type:'string',description:'Returned baseline ID for changes.'},baseRevision:{type:'integer',description:'Exact baseline revision for changes.'},changes:{type:'array',description:'Atomic block replacements [{index,block}], existing zero-based indices.',items:{type:'object',additionalProperties:false,properties:{index:{type:'integer',required:true},block:{type:'json',required:true}}}},...PRESENTATION_PARAMETERS},
    output:{schema:OUTPUT_SCHEMA,render:(_a,v)=>[{type:'text',text:v.note}],presentationMeta:(_a,v)=>v.meta},
    isConcurrencySafe:()=>true,
    execute:createDocumentExecutor(),
    presentCall:()=>({card:'generic',title:'VIE · 生成主图',kind:'other'}),
    presentResult:(_a,r)=>r.isError?undefined:{card:'generic',title:'VIE · 交互主图',kind:'other'}
  });
}
