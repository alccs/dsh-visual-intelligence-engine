# VIE component reference (generated)

学习模式：面向任意知识主题，按用户水平先给一句直观定义和因果链，再用一张主图解释。简单问题不强制应用图、第二张图或测验；确有教学价值再追加。每图正文先解释新增关系，默认3–5句，深入推导按用户要求展开；结尾只保留一条记忆链，不重复全文。优先document.blocks中的type:"learning"，由引擎统一生成按钮、阶段说明、测验、主题和状态恢复；模型只填写当前主题的SVG/HTML和数据，不重写控制逻辑。示例：{type:"learning",title:"过程",stages:[{label:"前",html:"<svg viewBox=\"0 0 320 180\">...</svg>"},{label:"后",html:"..."}]}。测验可单独提交{type:"learning",title:"理解测试",quiz:{question:"问题",options:[{label:"A",feedback:"原因"},{label:"B",feedback:"原因"}],correct:1}}，correct必填且从0开始，不能根据反馈猜答案。图注、正文及总结不得提前泄露该题答案或等价结论，答案原因只在选择后反馈。复杂动画仍可用figure及VIE.mountLearning，自由绘制内容，不限领域模板。阶段必须改变对象、数量、位置、连接或高亮，不能只换文字；线段真正连接对应部件，符号与标题分行，不用绝对定位把文字压进标题；窄屏重排且留白不过量。主图外壳已有标题，内部不重复；通用样式优先使用主题色。简化模型注明假设，动态平衡不是粒子停止，不臆测课本章节。正文由Harness渲染，纯文字与调试请求优先。

每张图后用Harness正文解释图中关键关系，不能仅过渡一句便出下一图。优先原生graphic/chart/Flow，减少手写SVG。变化过程明确分开前→后，箭头连接对应对象，不能将前后工件重叠或画成断裂材料。窄屏用CSS重排或分步查看，标注不低于11px。说明材料、工况与适用范围，不把热锻等同所有锻造；数值注明来源，示意值不能充当工艺限值。VIE只画当前段落的图、交互、图例和短标注；完整解释/公式/表格由Harness正文渲染。任意主题均可。复杂主题按图→正文解释→下一图→正文解释展开，每张图聚焦一个概念；勿把各章节拼成一张SVG的编号小面板或多图海报。需同时比较或共享交互才并列。默认flow按调用位置显示，补图/修图无需more:true，通常1张、必要时2–3张。visualId仅供修改，不是图片URL；不必先加载技能或写脚本。

Document fields: caption, title, controls, derive, layout, blocks

## learning

Fields: type, title, key, legend, note, stages, quiz

Validated generic learning UI, no JavaScript needed. stages:[{label,title?,caption?,html,mobileHtml?}] contains freely drawn SVG/HTML. Optional quiz:{question,options:[{label,feedback}],correct:1}; correct is required and zero-based. Stages or quiz required. Use theme tokens; do not repeat the outer title.

## graphic

Fields: type, kind, title, items, unit

Engine-rendered bars/donut/vectors. items:[{label,value}] or vectors [{label,x,y}], optional tone. No HTML/CSS/JS required.

## chart

Fields: type, title, x, y, series, regions, controls, inputs, bindings, note

Formula or data curves, region fills; bindings map variable names to shared control/derived keys.

## visual

Fields: type, kind, spec

Flow, RelationGraph, Timeline, Diagram or Animation. Diagram coordinates may bind /shared/key or /derived/key.

## figure

Fields: type, title, html, css, js, state, height, bindings

Learning UI: VIE.mountLearning({root:"#lesson",key:"lesson",title,legend?,note?,stages:[{label,title,caption,html,mobileHtml?}],quiz?:{question,options:[{label,feedback}],correct:0}}) supplies generic stages, local quiz feedback and state. One focused diagram in an isolated HTML/CSS/JS sandbox; do not pack independent chapters into numbered SVG mini-panels. Put each chapter graphic in its own call, separated by native prose. bindings map state keys to shared controls/derived keys.

## experiment

Fields: type, template, parameters, title

Optional existing experiment shortcut, never a topic restriction.

## text

Fields: type, title, body

Legacy compatibility only; new explanations belong in Harness prose.

## Controls

- slider → Slider
- number → NumberInput
- select → SegmentedControl
- toggle → Toggle

Controls are numeric. toggle uses 0/1; select uses options [{label,value}]. derive maps unique keys to bounded numeric expressions. layout is stack (default) or grid.
