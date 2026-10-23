# VIE 0.27.0 · 主图与正文分工

VIE只画当前段落的图、交互、图例和短标注；完整解释/公式/表格由Harness正文渲染。任意主题均可。复杂主题按图→正文解释→下一图→正文解释展开，每张图聚焦一个概念；勿把各章节拼成一张SVG的编号小面板或多图海报。需同时比较或共享交互才并列。默认flow按调用位置显示，补图/修图无需more:true，通常1张、必要时2–3张。visualId仅供修改，不是图片URL；不必先加载技能或写脚本。

## 默认做法

直接调用vie_explain，不必先加载技能、读取源码、写脚本或截图验收。优先chart/visual等紧凑组件，复杂图用自由figure。vie_auto仅在现有实验恰好适合时使用。先一个可用主图，需要时再补辅助图；正常讲解篇幅由用户问题决定。

首选原生document对象，避免把整份JSON再转义成spec字符串：

```json
{"document":{"title":"改变斜率","blocks":[{"type":"chart","title":"y=kx","x":{"min":0,"max":4,"label":"x"},"y":{"min":0,"max":12,"label":"y"},"series":[{"label":"y=kx","expr":"k*x"}],"controls":[{"key":"k","label":"斜率k","min":1,"max":3,"value":2,"step":0.1}]}]}}
```

每个块使用type字段：chart、visual、figure、可选experiment。text保留用于历史兼容与必要短标注，长文请写在Harness正文。旧spec JSON字符串仍可用。默认flow按各次调用位置显示，独立于工具过程折叠；显式start将本轮各图统一前置，tail/process保留原用途。

## 分段图文讲解

不要把不同章节的图都放进一次document。通常只需一个主图；若用户需要图文图文，使用以下顺序：

1. vie_explain只提交第一段对应的一张聚焦图，不要求more:true。
2. 在正常assistant正文中解释第一张图，随后调用vie_explain提交下一张图。
3. 每张图后都用Harness正文解释；讲清问题后正常结束，不凑满调用次数。通常2–3张足够；真正需要同时比较或共享参数的图可以并列。

单个figure也不要制作多章节拼贴：“连接结构、驱动原理、传输时序”应分别出图并在中间解释，不要缩进同一SVG的①②③小面板。此规则按讲解概念划分，适用于任意主题。more仅保留为旧版兼容提示，省略或false不会提前禁用补图和修图。

不要写 `![图](visual-...)`，visualId仅是修复句柄，不是图片地址。历史记录若原本就是一次调用后输出一整篇文字，没有段落锚点，不能凭猜测重排；重新生成时使用上述分段调用。

## 通用组件

chart包含title、x/y:{min,max,label}、series:[{label,expr或points:[[x,y],...],tone?}]，可选controls、regions、note。controls最多4个，每个含key/label/min/max/value/可选step；series最多6条，每条最多256点；regions最多8个{label,points,tone?}。expr允许安全数学运算与sin/cos/sqrt/exp/log/min/max/clamp/if等函数，不执行任意JS。tone可用primary/secondary/accent/muted/warning。

visual:{kind,spec}。kind为Flow、RelationGraph、Timeline、Diagram、Animation。Flow/RelationGraph用nodes:[{id,label,detail?}]、edges:[{from,to,label?}]，Timeline用items:[{id,at,label,detail?}]。由引擎处理布局。

## 一个参数驱动多张图

在document.controls定义共享滑块，chart.bindings显式关联表达式局部变量与共享key；不按同名变量自动联动。

```json
{"document":{"title":"同一个速度","controls":[{"key":"speed","label":"速度v","min":1,"max":6,"value":3,"step":0.5}],"blocks":[{"type":"chart","title":"位移","x":{"min":0,"max":10},"y":{"min":0,"max":60},"series":[{"label":"s=vt","expr":"v*x"}],"bindings":{"v":"speed"}},{"type":"chart","title":"速度","x":{"min":0,"max":10},"y":{"min":0,"max":6},"series":[{"label":"v","expr":"v"}],"bindings":{"v":"speed"}}]}}
```

共享参数在本地联动，不调用模型；原有块局部controls保持独立。

## 局部修复

工具结果返回visualId与revision。参数错误会指出blocks[index]并保留可解析草稿；只替换出错块：

```json
{"visualId":"visual-1","baseRevision":1,"changes":[{"index":0,"block":{"type":"figure","title":"修复主图","html":"<svg viewBox='0 0 100 100'><circle cx='50' cy='50' r='35' fill='#5483ef'/></svg>"}}]}
```

index为现有块的0起始编号；变更整体校验后提交，失败不覆盖有效基线，过期revision被拒绝。缓存按agent隔离，仅保留本进程最近4份草稿；重启/清理后REPAIR_BASE_MISSING需重交document。不可解析的旧spec不能可靠定位完整块，改用document对象，不宽松执行错误脚本。

## 自由figure

{type:"figure",title,html,css?,js?,state?,height?}。html只提交body片段，可用SVG/Canvas/原生WebGL；不要另建独立HTML文件。最多12块/4个figure；单figure60KB，html16KB/css8KB/js32KB，height160..1000仅为初始高度，实际随内容自适应。已提供基础控件样式和--vie-*主题变量；不要自行固定页面高度或强制显示滚动条。

脚本在opaque-origin sandbox iframe中执行，无宿主DOM权限，不可使用CDN/fetch/外部库。window.VIE提供state、setState、theme、visible、reducedMotion、reportError；vie:themechange/vie:visibilitychange可用于重画。动画默认暂停，提供播放/暂停与复位；不要逐帧上报状态。页面重挂载保留编辑，刷新时在本地checkpoint与完整source一致时恢复有效参数。操作参数可进入继续提问草稿，由用户发送。

协议有效或iframe ready不代表画面已通过像素验收，也不代表科学正确；说明概念示意/近似与专业仿真的范围。不写无界循环，不伪造来源。沙箱不承诺完整CPU/内存隔离。

## 流程与预算

普通讲解只开放VIE、VIE技能与可用网页检索，开发/附件/文件/纯文字请求保持正常流程。默认继承用户输出额度与推理强度，出图后在Harness正文正常解释；没有两句话或1024 token限制。

默认最多3张概念图、2次失败参数修复（尚无成功图时额外保留1次纠错，仍受总请求上限约束）、2次资料读取/检索，总请求上限8次（第8次只输出正文）。默认输出额度与推理均继承Harness（fastMaxTokens:0、fastProseTokens:0、fastEffort:inherit）。low推理和额度上限仅为显式配置选项。token截断后继续接着未完成部分，不重画已有图、不重新检索，不重复套用VIE额度。仅等待首图的请求超过120秒由宿主取消钩子停止并显示超时提示，已有图后的正文与截断续写不启用该看门狗；当前宿主缺取消接口时仅保留额度限制。60秒是额外检索预算。资料任务保留必要读取能力，普通绘图不进入终端开发。首图成功后停止检索；每图后使用Harness正文解释再调用下一图。继续保留未完成任务与资料范围，不修改全局模型配置。

## 可选实验与兼容

vie_auto可选lab.planetary/gears/geartrain/worm/wave/process/vector。parameters是JSON字符串。worm starts为1..4、wheelTeeth为20..80整数；geartrain teeth为2..6轮、每轮18..80整数，inputSpeed为-4..4。例如 {"query":"蜗杆传动","templateId":"lab.worm","parameters":"{\"starts\":1,\"wheelTeeth\":20}"}。未匹配时用通用入口，不能声称主题不受支持。

vie_quick/vie_compose/vie_story/vie_render继续兼容旧内容；通用齿轮图与动画没有主题关键词拦截。旧文字块不删除，旧历史位置迁移保持兼容。


## 通用数据图形

无需代码：`{type:"graphic",kind:"bars"或"donut",title:"短标题",unit:"单位",items:[{label:"名称",value:3}]}`；向量用`kind:"vectors",items:[{label:"F",x:3,y:4}]`。模型只提供数据，VIE处理配色与响应式布局。长解释仍写Harness正文。曲线可声明keyPoints与breaks（横坐标数组），相图等优先使用核对过的数据points；有界采样不保证任意函数的全部细节。
