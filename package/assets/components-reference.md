# VIE component reference (generated)

学习模式：顺序与判断流程优先原生visual{kind:Flow,spec:{title,nodes,edges}}，默认由引擎逐步引导，可切回总览；无需手写步骤控件或把每个节点做成learning阶段。出题、练习或测验请求优先直接交付题组，不先安排概念图或长篇讲课；使用learning.questions数组，一张卡片逐题作答，进度、计分、点击后解析、下一题、结果与重做由引擎提供；不得在正文、图注或表格提前给出答案。面向任意知识主题，按用户水平先给一句直观定义和因果链，再用一张主图解释。简单问题不强制应用图、第二张图或测验；确有教学价值再追加。每图正文先解释新增关系，默认3–5句，深入推导按用户要求展开；结尾只保留一条记忆链，不重复全文。优先document.blocks中的type:"learning"，由引擎统一生成按钮、阶段说明、测验、主题和状态恢复；模型只填写当前主题的SVG/HTML和数据，不重写控制逻辑。示例：{type:"learning",title:"过程",stages:[{label:"前",html:"<svg viewBox=\"0 0 320 180\">...</svg>"},{label:"后",html:"..."}]}。测验可单独提交{type:"learning",title:"理解测试",quiz:{question:"问题",options:[{label:"A",feedback:"原因"},{label:"B",feedback:"原因"}],correct:1}}，correct必填且从0开始，不能根据反馈猜答案。图注、正文及总结不得提前泄露该题答案或等价结论，答案原因只在选择后反馈。复杂动画仍可用figure及VIE.mountLearning，自由绘制内容，不限领域模板。阶段必须改变对象、数量、位置、连接或高亮，不能只换文字；线段真正连接对应部件，符号与标题分行，不用绝对定位把文字压进标题；窄屏重排且留白不过量。主图外壳已有标题，内部不重复；通用样式优先使用主题色。简化模型注明假设，动态平衡不是粒子停止，不臆测课本章节。正文由Harness渲染，纯文字与调试请求优先。

三维讲解用内置VIE.scene3d（本地Three.js、相机/光照/旋转缩放与通用几何），不为知识问题搭建外部项目、安装依赖或调用其他开发技能。数据图优先chart；自由SVG用g.coordinates统一映射坐标、标注与读数，不把原始像素与数据值分开硬编码。 自绘二维图优先内置VIE.svg与VIE.animate，参数用document.controls与bindings；不要重复编写箭头、播放栏和状态订阅。控件沿用A式中性UI；参数用document.controls，操作用VIE.ui.toolbar（item.variant为primary/secondary/ghost），不重绘默认按钮、滑轨和开关。图形内容自由配色。SDK坐标用像素数组，标签由引擎尝试避让，密集图仍需减少标注。 流程图优先原生Flow数据；默认全景分支布局按连线分层，学习模式默认逐步引导。模型只给nodes/edges和必要detail，不手写导航按钮。每条边必须表达实际关系，不因列表顺序添加连线。 每张图后用Harness正文解释图中关键关系，不能仅过渡一句便出下一图。优先原生graphic/chart/Flow，减少手写SVG。变化过程明确分开前→后，箭头连接对应对象，不能将前后工件重叠或画成断裂材料。窄屏用CSS重排或分步查看，标注不低于11px。说明材料、工况与适用范围，不把热锻等同所有锻造；数值注明来源，示意值不能充当工艺限值。VIE只画当前段落的图、交互、图例和短标注；完整解释/公式/表格由Harness正文渲染。同图内的曲线、端点、标签、箭头和读数必须来自同一组坐标或数据，不能互换左右端点、让方向与标签冲突；无法核实的数值省略或明确标为示意。任意主题均可。出题优先使用learning.questions题组，一张卡片逐题作答并计分，答案解析只在作答后展示；阶段演示与测验优先使用learning数据块，由引擎提供通用控件，无需手写JS；其他图形继续自由绘制。复杂主题按图→正文解释→下一图→正文解释展开，每张图聚焦一个概念；勿把各章节拼成一张SVG的编号小面板或多图海报。需同时比较或共享交互才并列。默认flow按调用位置显示，补图/修图无需more:true，通常1张、必要时2–3张。visualId仅供修改，不是图片URL；不必先加载技能或写脚本。

Document fields: caption, type, title, controls, derive, layout, blocks

## learning

Fields: type, title, key, legend, note, stages, quiz, questions

Validated generic learning UI, no JavaScript needed. Prefer questions:[{title?,question,options:[{label,feedback?}],correct,explanation?}] for 1–32 question exercises: one card, progress, score, locked answer, next, results and restart. Correct is zero-based. stages:[{label,title?,caption?,html,mobileHtml?}] contains freely drawn SVG/HTML. Optional quiz:{question,options:[{label,feedback}],correct:1}; correct is required and zero-based. Stages, quiz or questions required. Use theme tokens; do not repeat the outer title.

## graphic

Fields: type, kind, title, items, unit

Engine-rendered bars/donut/vectors. items:[{label,value}] or vectors [{label,x,y}], optional tone. No HTML/CSS/JS required.

## chart

Fields: type, title, x, y, series, regions, controls, inputs, bindings, note

Formula or data curves, region fills; bindings map variable names to shared control/derived keys.

## visual

Fields: type, kind, spec

Flow {title,nodes:[{id,label,detail?}],edges:[{from,to,label?}],presentation?:overview|guided} uses topology-based overview or guided navigation, defaults by session mode; controls are reusable across subjects. RelationGraph, Timeline, Diagram and Animation also supported. Diagram coordinates may bind /shared/key or /derived/key.

## figure

Fields: type, title, html, css, js, state, height, bindings

Built-in SDK: VIE.scene3d({root,height}) provides offline Three.js, camera/light/orbit/zoom and box/sphere/cylinder/torus/helix/mesh/group; use VIE.animate for motion, no CDN/npm/project setup. VIE.svg({root,width,height}) -> line/arrow/circle/rect/path/curve/angle/dimension/axes/label/group; geometry uses [x,y] points (x/y and cx/cy/r aliases accepted); strokeWidth is stroke thickness, rect.width is geometry. g.coordinates({x:[min,max],y:[min,max],bounds:[left,top,width,height]}) maps data with point/line/series/marker. Returned handles have set(next). VIE.onState(callback), VIE.canvas({root,draw}), VIE.animate({root,duration,stateKey,render}) reuse state, resize and transport controls. SDK details are in the skill. Learning UI: VIE.mountLearning({root:"#lesson",key:"lesson",title,legend?,note?,stages:[{label,title,caption,html,mobileHtml?}],quiz?:{question,options:[{label,feedback}],correct:0}}) supplies generic stages, local quiz feedback and state. One focused diagram in an isolated HTML/CSS/JS sandbox; do not pack independent chapters into numbered SVG mini-panels. Put each chapter graphic in its own call, separated by native prose. bindings map state keys to shared controls/derived keys.

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
