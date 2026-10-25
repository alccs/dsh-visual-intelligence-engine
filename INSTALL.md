# 安装 VIE 0.29.2

Desktop：下载[0.29.2插件包](https://github.com/alccs/dsh-visual-intelligence-engine/releases/download/v0.29.2/dsh-visual-interactive-engine-0.29.2.tgz)，在 DeepSeek Harness 应用内插件管理器安装，重启应用并新开聊天。官方 CLI 的 desktop profile 由 Electron 管理，不支持 `dsh plugin --profile desktop add`。

Web CLI：

```powershell
dsh plugin --profile web add "<下载路径>/dsh-visual-interactive-engine-0.29.2.tgz"
```

兼容 DSH >=0.2.1-rc.2 <0.3.0-0、Node >=22.19；验证使用 Node24、DSH0.2.1-rc.2、Cordis4、Chrome。输入区模式选择器依赖可选 sessions、remote、remote.commands、Host commands/sessionProjections；缺少服务时使用配置模式，不会把显式关闭改成开启。

## 聊天模式

输入区 VIE 可选自动、本聊天启用、学习模式、关闭，也可以输入：

```text
/vie
/vie auto
/vie on
/vie study
/vie off
/vie global auto
```

auto/on/study/off 只设置当前聊天；global auto/on/study/off 修改其他未配置聊天的默认模式，不覆盖现有明确选择。auto 保留知识讲解判断；on 仍尊重纯文字和开发任务。study 按交互学习结构组织回答。off 隐藏工具及生成提示并拒绝 VIE 执行，历史图形继续显示。

偏好位于 DSH_HOME/dsh-vie-mode.json（未设 DSH_HOME 时为 ~/.dsh/dsh-vie-mode.json），最多256个聊天，不包含对话或凭据。读取失败使用插件默认模式；保存失败返回错误并回滚本次内存更改。多进程同时写相同 DSH_HOME 没有文件锁，请通过同一 Harness 进程修改偏好。

## 配置

```yaml
- id: dsh-visual-interactive-engine
  name: dsh-visual-interactive-engine
  config:
    visualMode: auto
    fastWorkflow: true
    fastEffort: inherit
    fastMaxTokens: 0
    fastProseTokens: 0
    fastMaxRequests: 8
    fastMaxVisuals: 3
    fastMaxRepairs: 2
    fastMaxSearches: 2
    fastRequestMs: 0
    fastBudgetMs: 60000
```

visualMode 是没有保存偏好时的默认值。fastMaxTokens 为首图阶段额度，0继承、其他值为2048..32768；fastProseTokens 为后续正文/补图额度，0继承、其他值为2048..32768。较低的用户额度继续保留。fastEffort:low 只用于已验证支持的 DeepSeek 路由；inherit 保留原推理参数。默认不覆盖输出或推理设置；低推理与额度限制仅在用户显式配置时启用。用户明确要求完整推导/深度思考时保留原推理和输出设置。

fastMaxRequests 为2..12；fastMaxVisuals 为1..4；fastMaxRepairs 为1..4；fastMaxSearches 为0..4（也计量必要资料读取）。成功图、失败、读取分别计数，同时受总请求上限约束。尚无任何成功图时，失败阈值额外保留一次纠错机会；该阶段停止继续检索，成功后回到正常失败阈值。默认最多3次失败即停止，最后一次请求仅正文的总上限仍然有效。最后一次请求只输出Harness正文。fastBudgetMs只停止追加检索；fastRequestMs默认0表示关闭强制中止；显式设置10000..300000时启用，在有取消接口的宿主中只对等待首图的请求执行中止并显示提示，不伪装为用户取消，不自动重发。显式深度推导、首图后的正文/补图、token截断后的续写不启用首图请求看门狗。fastWorkflow:false 保留原始工具与请求设置，但仍尊重明确 off。

交互checkpoint保存在当前浏览器本地，最近8个场景且源必须完全相同；修图基线保存在DSH_HOME/vie-baselines-v1，每会话4份、最近64个会话。无法跨设备恢复，清理缓存或基线过期时需要重新提交文档。/vie status显示本进程统计，不含推理文本。

## 从公开源码构建与验证边界

npm ci后运行npm run build，再运行npm pack ./package生成插件TGZ。离线演示导出需要完整验证目录中的示例夹具。[GitHub Releases](https://github.com/alccs/dsh-visual-intelligence-engine/releases/tag/v0.29.2)已提供0.29.2插件TGZ和SHA256校验值。

本地完整项目已通过190项测试、11组浏览器检查及7组宿主/安装检查。npm run check/verify/release需要配套测试环境。

固定名称安装包与 Release 自动上传方式见[发布流程](docs/RELEASING.md)。已有版本包可运行 npm run release:assets 补充同名副本及校验值，包内版本保持不变。

## 从旧包迁移

本版显示名称为 `dsh-Visual-Interactive-Engine`，包标识为 `dsh-visual-interactive-engine`。先在插件管理器卸载旧 `dsh-vie`，再安装新 TGZ 并重启，避免两个包同时注册同名工具。工具名 vie_*、/vie 命令、历史事件、模式偏好文件与内部投影标识保持不变。旧版本目录保留。

## 0.29.2 输出额度修正

本次仍为0.29.2。默认fastMaxTokens:0、fastProseTokens:0、fastEffort:inherit；原先的16384/8192自动限制已取消。配置里若曾手工填写旧额度，应改为0才能继承。token截断后发送继续会保留已有图形与读取范围，续写不重复套用VIE限额；会话重开可从最近400条公开事件恢复被截断的视觉任务。

安装更新包后重启；建议新建聊天验证默认值。旧会话的Harness请求头或服务端原有上限可能仍会沿用，不通过改写历史日志来猜测和提高它们。/vie status中的effectiveMaxTokens是本中间件返回的额度，null表示交由宿主/提供方默认；不代表已探测服务端最大输出能力。
# 0.29.2 同版本修正：原生图展开

本包补齐流程图、曲线图、关系图、时间轴、示意图、动画和交互实验的“展开/收起”。更新后请重新安装本目录dist中的0.29.2 TGZ并重启Harness以刷新前端资源。已有会话中的成功原生图也由新渲染器提供展开按钮，无需模型重新生成。展开保留当前参数与挂载视图，支持Esc退出，工具栏继续避让窗口右上角。


## 0.29.2 可读性与生成改进

安装本版本TGZ并重启Harness。旧图会应用新的阅读布局和静态控件规则，原有图形内容保持不变。新生成的回答采用改进的图后解释、前后变化与适用范围指引。离线演示新增“变化前后”校正示例。自动字号适配针对无脚本的单一SVG，极小标签仍受1800px安全宽度上限约束；其他自定义复杂布局仍需作者使用响应式设计。

## 学习模式

输入区VIE菜单新增“学习模式”，或使用/vie study。只作用于本聊天，/vie global study修改未单独设置聊天的默认模式。学习模式按直观定义、因果链和主图组织回答，按需补应用和理解测试，不强制每题生成三张图。图与简短交互由VIE呈现，大段解释由Harness正文呈现。尊重纯文字和开发排查请求；不切换模型、不增加默认token上限。任意主题可使用通用VIE.mountLearning阶段与测验组件，接触电动势只是演示。

本次同版本修复菜单切换时的cannot get property "remote" without inject。请重新安装本目录dist中的0.29.2 TGZ并完全退出、重启Harness，刷新已加载的客户端资源。更新前可直接输入/vie study切换当前聊天。

## 学习组件与超时修正

本次仍为0.29.2。默认fastRequestMs改为0，不因生成超过120秒就取消。若旧配置手工保留120000，请改为0；模型推理与输出额度继续继承Harness。这消除插件强制截断，不等于保证模型在固定时间完成。

推荐直接提交document.blocks中的learning数据，例如：
```json
{"type":"learning","title":"过程","stages":[{"label":"前","html":"<svg viewBox='0 0 320 180'>...</svg>"},{"label":"后","html":"..."}]}
```

也可只提供quiz:{question,options:[{label,feedback}],correct:1}，correct为必填的零起始答案索引。Host和Client共用字段校验；按钮、状态与反馈由引擎提供，主题图形仍自由绘制。旧figure中可静态判定的字面量VIE.mountLearning调用可预检遗漏的quiz.correct；对象展开、简写、计算键、模板与正则等动态写法留待隔离运行校验；任意动态JavaScript仍必须在隔离视图运行，Host不会执行模型代码，也不声称完成科学语义认证。历史错误测验需要带正确答案重新生成；引擎不会猜答案或改写历史会话。


## 0.29.2 流程图与练习

流程图默认全景总览，学习模式默认逐步引导；图内可切换，支持分支选择、返回、重新开始与本地恢复。宽分类树按父子关系分组，窄屏重排，汇合和循环保留原图结构。新增 1–32 题的逐题练习。

此安装包同时修复旧样式残留导致的按钮和逐步布局异常。更新后请完全退出、重启 Harness，以载入新的客户端资源；已有原生流程图无需重新生成。
