# VIE 0.31.0 · 主图与正文分工

VIE面向任意主题：数据图优先graphic/chart，流程优先原生Flow。自由图用SVG/Canvas或内置VIE.scene3d；三维的Three.js、相机和几何已本地提供。复用VIE.svg、VIE.animate、VIE.ui.toolbar/readouts以及document.controls/bindings，不重复生成控件、坐标轴、箭头和状态订阅。控件沿用A式中性UI，图形自由配色。同一主图的多个阶段优先learning数据块的baseHtml+stages.patches，仅给各步变化与values读数；旧stage.html仍可用。独立章节按图→Harness正文→下一图编排，每图聚焦一个概念；并列用于真实比较或共享交互。完整解释、公式和表格由Harness正文渲染。曲线、端点、标注、箭头与读数使用同一组数据和g.coordinates映射；保留实际连接与方向，明确单位、来源、假设，未知数值标为示意。窄屏保持完整图形与可读标注，需要时分步或展开。出题使用learning.questions，correct必填且从0开始，作答前不泄露答案。调用真实工具，visualId不是图片URL；修图使用visualId/baseRevision/changes保留其他图。优先局部替换；结构化块可用updates修改已有字段。仅已提交或waiting不等于已经显示成功。

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

{type:"figure",title,html,css?,js?,state?,height?}。html只提交body片段，可用SVG/Canvas/原生WebGL；不要另建独立HTML文件。最多12块/4个figure；单figure60KB，html16KB/css8KB/js32KB，height80..1000（低于160调整为160）仅为初始高度，实际随内容自适应。已提供基础控件样式和--vie-*主题变量；不要自行固定页面高度或强制显示滚动条。

脚本在opaque-origin sandbox iframe中执行，无宿主DOM权限，不可使用CDN/fetch/网络导入；本地内置Three.js通过VIE.scene3d使用。window.VIE提供state、setState、theme、visible、reducedMotion、reportError；vie:themechange/vie:visibilitychange可用于重画。动画默认暂停，提供播放/暂停与复位；不要逐帧上报状态。页面重挂载保留编辑，刷新时在本地checkpoint与完整source一致时恢复有效参数。操作参数可进入继续提问草稿，由用户发送。

协议有效或iframe ready不代表画面已通过像素验收，也不代表科学正确；说明概念示意/近似与专业仿真的范围。不写无界循环，不伪造来源。沙箱不承诺完整CPU/内存隔离。

## 流程与预算

普通讲解只开放VIE、VIE技能与可用网页检索，开发/附件/文件/纯文字请求保持正常流程。默认继承用户输出额度与推理强度，出图后在Harness正文正常解释；没有两句话或1024 token限制。

默认最多3张概念图、2次失败参数修复（尚无成功图时额外保留1次纠错，仍受总请求上限约束）、2次资料读取/检索，总请求上限8次（第8次只输出正文）。默认输出额度与推理均继承Harness（fastMaxTokens:0、fastProseTokens:0、fastEffort:inherit）。low推理和额度上限仅为显式配置选项。token截断后继续接着未完成部分，不重画已有图、不重新检索，不重复套用VIE额度。默认fastRequestMs:0关闭强制首图超时；仅显式配置10000..300000ms才由可用宿主取消钩子停止并显示提示。已有图后的正文与截断续写不启用该看门狗；当前宿主缺取消接口时仅保留额度限制。60秒是额外检索预算。资料任务保留必要读取能力，普通绘图不进入终端开发。首图成功后停止检索；每图后使用Harness正文解释再调用下一图。继续保留未完成任务与资料范围，不修改全局模型配置。

## 可选实验与兼容

vie_auto可选lab.planetary/gears/geartrain/worm/wave/process/vector。parameters是JSON字符串。worm starts为1..4、wheelTeeth为20..80整数；geartrain teeth为2..6轮、每轮18..80整数，inputSpeed为-4..4。例如 {"query":"蜗杆传动","templateId":"lab.worm","parameters":"{\"starts\":1,\"wheelTeeth\":20}"}。未匹配时用通用入口，不能声称主题不受支持。

vie_quick/vie_compose/vie_story/vie_render继续兼容旧内容；通用齿轮图与动画没有主题关键词拦截。旧文字块不删除，旧历史位置迁移保持兼容。


## 通用数据图形

无需代码：`{type:"graphic",kind:"bars"或"donut",title:"短标题",unit:"单位",items:[{label:"名称",value:3}]}`；向量用`kind:"vectors",items:[{label:"F",x:3,y:4}]`。模型只提供数据，VIE处理配色与响应式布局。长解释仍写Harness正文。曲线可声明keyPoints与breaks（横坐标数组），相图等优先使用核对过的数据points；有界采样不保证任意函数的全部细节。


## 内置二维 SDK（0.30）

无需安装或加载外部库。一般参数优先 document.controls + figure.bindings，避免另写滑块与同步逻辑。自绘使用 SVG 助手；大量像素或连续曲线使用 Canvas。API 只负责绘图和时钟，不验证领域规律。

```js
const g = VIE.svg({root:'#plot', width:520, height:260});
const arrow = g.arrow({from:[100,180], to:[320,90], label:'F'});
g.angle({at:[100,180], radius:40, from:0, to:30, label:'α'});
g.dimension({from:[100,180], to:[320,180], offset:35, label:'L'});
VIE.onState(s => arrow.set({to:[100 + Number(s.force),90]}));
```

html 提供 `<div id="plot"></div>`。circle 使用 at/radius；rect 使用 at/width/height；line/arrow/dimension 使用 from/to；curve 使用 points 数组；path 使用 d；label 使用 at/text。tone 为 primary/secondary/accent/muted/warning/ink/bg，fill 可为 true 或上述色名。group({translate:[x,y],rotate:角度,scale:倍数}) 下可继续创建图形，group.set 更新变换。角度按数学方向、单位度；其他坐标遵循 SVG 向下为正。

```js
const g = VIE.svg({root:'#motion',width:520,height:220});
const p = g.circle({at:[60,110],radius:12,fill:'primary'});
VIE.animate({root:'#motion',duration:4000,stateKey:'motion',
  render:({progress}) => p.set({at:[60+380*progress,110]})});
```

默认暂停，用户可播放/暂停、单步、复位和拖动进度；duration 为毫秒，loop:false 为单次播放。stateKey 可选，用于恢复已保存的位置；恢复后默认暂停。controls:false 可隐藏时间控件。render 中只更新画面，勿调用 setState 写回时钟。隐藏时暂停计时，重新显示不补跳；减少动态效果偏好会关闭自动播放。

`VIE.canvas({root:'#wave',height:240,draw:({ctx,width,height,state,theme})=>{...}})` 自动处理尺寸、像素比、主题与状态变化；ctx 使用逻辑像素。VIE.onState/onTheme 返回取消订阅函数；图形助手返回 dispose。自行创建定时器/监听器时用 VIE.onDispose 清理。

先输出完整 html，再补 css/js，可提前显示静态预览；未完成的脚本与 HTML 事件不执行，预览控件不可操作。完成后原图就地启用交互。单图不应为了预览而堆入整篇解释。

出错结果包含 errorCode、errorPath、repairHint。沿 errorPath 修正对应块，使用 visualId/baseRevision/changes，勿重复生成已成功的图；运行错误可由客户端反馈到下一次模型请求，受已有预算约束；也可由用户生成修复草稿，不自动发送聊天消息。


## 0.30 兼容与三维补充

常用二维写法：g.label({at:[x,y],text})、g.circle({at:[x,y],radius})、g.rect({at:[x,y],width,height,radius})。同时兼容 label/rect 的 x/y、circle 的 cx/cy/r、size、color、stroke、opacity；label 对齐优先用 anchor:'start'|'middle'|'end'，也兼容 align:'left'|'center'|'right'（或 start/middle/end），同时传入时 anchor 优先。strokeWidth 表示线宽，rect.width 只表示矩形宽度，不能重复同名属性。主题名与普通 CSS 颜色都可用。小于12的文字调整为12，并保留窄屏局部平移。figure.height 可为80..1000，低于160时按160起始显示。

坐标图优先原生 chart。自由图需要数据坐标时：

```js
const g=VIE.svg({root:'#p',width:560,height:300});
const p=g.coordinates({x:[0,100],y:[100,600],bounds:[70,45,450,210]});
p.line({from:[0,183],to:[100,183],tone:'muted'});
p.marker({at:[61.9,183],label:'数据点'});
```

坐标转换、marker位置和数值读数来自同一 at。p.point([x,y]) 返回像素，p.series(points,style)绘制数据折线。它不验证材料常数或相区规律；不要把想象的像素点当真实数据。

三维讲解直接用离线 SDK，不加载 mech-sim 等项目开发技能，不安装 npm、下载 CDN 或写外部 HTML：

```js
const s=VIE.scene3d({root:'#scene',height:300});
const rotor=s.group();
rotor.cylinder({radius:.3,height:3,tone:'muted'});
rotor.helix({radius:.4,height:3,turns:4,tube:.06,tone:'accent'});
VIE.animate({root:'#scene',duration:5000,
  render:({progress})=>rotor.set({rotation:[0,progress*Math.PI*2,0]})});
```

html 提供 `<div id="scene"></div>`。s 的 box 使用 size:[w,h,d]；sphere 使用 radius；cylinder 使用 radius/height；torus 使用 radius/tube；helix 使用 radius/height/turns/tube；mesh 使用 positions:xyz扁平数组与可选indices；line 使用 points:xyz数组。几何均支持 at:[x,y,z]、rotation:[rx,ry,rz]（弧度）、color/tone、opacity。group 可嵌套，返回 set/remove。s.THREE 为真实的本地Three.js，s.scene/camera/renderer 可供必要扩展，修改原对象后调用s.redraw。相机、光照、旋转/缩放/复位、尺寸适配、主题及卸载清理由运行时提供。默认暂停，本地播放使用VIE.animate；不假装已验证真实齿面接触、材料或有限元结果。WebGL不可用时明确反馈，不反复启动浏览器或重建渲染器。

工具valid只表示结构、语法与可确定SDK参数校验。renderStatus:submitted 尚未证明浏览器运行。可用客户端将ready/error通过受限通道反馈到下一次模型请求，最多等待300ms；错误按visualId/revision对应，仅修报错图块，不重画已成功图，也不越过已有请求/修复预算。无客户端反馈时保留submitted，不能声称像素验收通过；用户也可点击“修复这张图”把诊断放入提问草稿。


## A 式共享控件

按钮、滑块、数字框、开关与页签沿用默认中性样式，图形内容仍自由配色和布局。参数优先document.controls，操作优先VIE.ui.toolbar。工具栏item.variant及set(id,{variant})接受primary、secondary、ghost，缺省secondary；不要为普通讲解重写一套控件CSS。
