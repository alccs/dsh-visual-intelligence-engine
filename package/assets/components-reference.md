# VIE component reference (generated)

学习模式面向任意主题：先给直观定义和因果链，再用一张主图解释；应用与测验按需要追加。判断流程优先原生Flow，由引擎提供全景和逐步引导。同一图形的多个阶段优先learning数据块：baseHtml写一次带稳定id的静态SVG，stages给label、patches:[{target:id,attrs?,text?,visible?}]及可选values；readouts:[{id,label,unit?}]由引擎显示。独立阶段仍兼容stages:[{label,html,title?,caption?,mobileHtml?}]。按钮、跳步、复位、主题和恢复由引擎处理，不重复输出整幅图或手写导航。出题优先learning.questions题组：questions:[{question,options:[{label,feedback?}],correct,explanation?}]，correct必填且是zero-based索引，答案与解析只在作答后显示。图中保留必要短标注；每图后用Harness正文解释新增关系，深入推导按用户要求展开。优先通用SVG/Canvas/离线三维SDK与A式中性控件，图形内容自由表达。参数、单位和假设明确，示意数据注明，引用需可核实，不臆测课本章节。理解测试按需设置，复杂自由绘图仍可用figure与VIE.mountLearning，沿用统一外壳。纯文字和开发/操作任务遵循用户意图。

VIE面向任意主题：数据图优先graphic/chart，流程优先原生Flow。自由图用SVG/Canvas或内置VIE.scene3d；三维的Three.js、相机和几何已本地提供。复用VIE.svg、VIE.animate、VIE.ui.toolbar/readouts以及document.controls/bindings，不重复生成控件、坐标轴、箭头和状态订阅。控件沿用A式中性UI，图形自由配色。同一主图的多个阶段优先learning数据块的baseHtml+stages.patches，仅给各步变化与values读数；旧stage.html仍可用。独立章节按图→Harness正文→下一图编排，每图聚焦一个概念；并列用于真实比较或共享交互。完整解释、公式和表格由Harness正文渲染。曲线、端点、标注、箭头与读数使用同一组数据和g.coordinates映射；保留实际连接与方向，明确单位、来源、假设，未知数值标为示意。窄屏保持完整图形与可读标注，需要时分步或展开。出题使用learning.questions，correct必填且从0开始，作答前不泄露答案。调用真实工具，visualId不是图片URL；修图使用visualId/baseRevision/changes保留其他图。优先局部替换；结构化块可用updates修改已有字段。仅已提交或waiting不等于已经显示成功。

Document fields: caption, type, title, controls, derive, layout, blocks

## learning

Fields: type, title, key, legend, note, stages, quiz, questions, baseHtml, baseMobileHtml, readouts

Shared SVG: baseHtml once, stages[{label,patches?:[{target:id,attrs?,text?,visible?}],values?}], readouts?:[{id,label,unit?}]. Every stage is applied from base; no repeated SVG or JS. Validated generic learning UI, no JavaScript needed. Prefer questions:[{title?,question,options:[{label,feedback?}],correct,explanation?}] for 1–32 question exercises: one card, progress, score, locked answer, next, results and restart. Correct is zero-based. stages:[{label,title?,caption?,html,mobileHtml?}] contains freely drawn SVG/HTML. Optional quiz:{question,options:[{label,feedback}],correct:1}; correct is required and zero-based. Stages, quiz or questions required. Use theme tokens; do not repeat the outer title.

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
