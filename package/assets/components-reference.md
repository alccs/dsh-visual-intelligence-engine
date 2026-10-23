# VIE component reference (generated)

VIE只画当前段落的图、交互、图例和短标注；完整解释/公式/表格由Harness正文渲染。任意主题均可。复杂主题按图→正文解释→下一图→正文解释展开，每张图聚焦一个概念；勿把各章节拼成一张SVG的编号小面板或多图海报。需同时比较或共享交互才并列。默认flow按调用位置显示，补图/修图无需more:true，通常1张、必要时2–3张。visualId仅供修改，不是图片URL；不必先加载技能或写脚本。

Document fields: caption, title, controls, derive, layout, blocks

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

One focused diagram in an isolated HTML/CSS/JS sandbox; do not pack independent chapters into numbered SVG mini-panels. Put each chapter graphic in its own call, separated by native prose. bindings map state keys to shared controls/derived keys.

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
