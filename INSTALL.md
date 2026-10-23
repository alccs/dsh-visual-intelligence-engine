# 安装 VIE 0.27.0

Desktop：在 DeepSeek Harness 应用内插件管理器安装 `dsh-visual-interactive-engine-0.27.0.tgz`（从 [Releases](https://github.com/alccs/dsh-visual-intelligence-engine/releases) 下载，或本地 `npm pack ./package` 生成），重启应用并新开聊天。官方 CLI 的 desktop profile 由 Electron 管理，不支持 `dsh plugin --profile desktop add`。

Web CLI：

```powershell
dsh plugin --profile web add "<下载路径>/dsh-visual-interactive-engine-0.27.0.tgz"
```

兼容 DSH >=0.2.1-rc.2 <0.3.0-0、Node >=22.19；验证使用 Node24、DSH0.2.1-rc.2、Cordis4、Chrome。输入区模式选择器依赖可选 sessions、remote.commands、Host commands/sessionProjections；缺少服务时使用配置模式，不会把显式关闭改成开启。

## 聊天模式

输入区 VIE 可选自动、本聊天启用、关闭，也可以输入：

```text
/vie
/vie auto
/vie on
/vie off
/vie global auto
```

auto/on/off 只设置当前聊天；global auto/on/off 修改其他未配置聊天的默认模式，不覆盖现有明确选择。auto 保留知识讲解判断；on 仍尊重纯文字和开发任务。off 隐藏工具及生成提示并拒绝 VIE 执行，历史图形继续显示。

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
    fastRequestMs: 120000
    fastBudgetMs: 60000
```

visualMode 是没有保存偏好时的默认值。fastMaxTokens 为首图阶段额度，0继承、其他值为2048..32768；fastProseTokens 为后续正文/补图额度，0继承、其他值为2048..32768。较低的用户额度继续保留。fastEffort:low 只用于已验证支持的 DeepSeek 路由；inherit 保留原推理参数。默认不覆盖输出或推理设置；低推理与额度限制仅在用户显式配置时启用。用户明确要求完整推导/深度思考时保留原推理和输出设置。

fastMaxRequests 为2..12；fastMaxVisuals 为1..4；fastMaxRepairs 为1..4；fastMaxSearches 为0..4（也计量必要资料读取）。成功图、失败、读取分别计数，同时受总请求上限约束。尚无任何成功图时，失败阈值额外保留一次纠错机会；该阶段停止继续检索，成功后回到正常失败阈值。默认最多3次失败即停止，最后一次请求仅正文的总上限仍然有效。最后一次请求只输出Harness正文。fastBudgetMs只停止追加检索；fastRequestMs为10000..300000，在有取消接口的宿主中只对等待首图的请求执行中止并显示提示，不伪装为用户取消，不自动重发。显式深度推导、首图后的正文/补图、token截断后的续写不启用首图请求看门狗。fastWorkflow:false 保留原始工具与请求设置，但仍尊重明确 off。

交互checkpoint保存在当前浏览器本地，最近8个场景且源必须完全相同；修图基线保存在DSH_HOME/vie-baselines-v1，每会话4份、最近64个会话。无法跨设备恢复，清理缓存或基线过期时需要重新提交文档。/vie status显示本进程统计，不含推理文本。

## 开发验证

本仓库只发布源码与插件清单，不含 `tests/`、`docs/`、`screenshots/` 与 `.validation/`，因此 `npm run check`、`npm run verify`、`npm run release` 需要在完整验证树中运行。仅构建可执行：

```bash
npm install
npm run build
```

完整门禁流程为 npm ci、npm run check、node scripts/prepare-runtime.mjs、npm run verify、npm run release。Windows可通过VIE_CHROME指定Chrome。完整门禁包含8组浏览器、实际Host流程/模式/组装、隔离CLI安装、安装后工具和名称验证。所有安装写入.validation中的隔离DSH_HOME。

默认宿主测试环境在.validation/runtime，prepare-runtime会安装固定依赖；已配置环境可用VIE_DSH_RUNTIME，组装客户端依赖可另设VIE_ASSEMBLY_RUNTIME。组装源码快照已随tests/host-source提供，也可用VIE_DSH_SOURCE选择其他源码。Node24的transform-types仅用于测试Harness源码。发布后可单独运行test-workflow.mjs --installed复核安装产物。本地通过不表示已推送或在GitHub云端运行。

release --reuse-verification 仅在源码、测试、脚本、资产、构建产物哈希与已通过门禁完全相同时复用。源码 ZIP 不包含 node_modules、.validation、用户会话、凭据或 Harness 完整源码。

## 从旧包迁移

本版显示名称为 `dsh-Visual-Interactive-Engine`，包标识为 `dsh-visual-interactive-engine`。先在插件管理器卸载旧 `dsh-vie`，再安装新 TGZ 并重启，避免两个包同时注册同名工具。工具名 vie_*、/vie 命令、历史事件、模式偏好文件与内部投影标识保持不变。旧版本目录保留。

## 0.27.0 输出额度修正

本次仍为0.27.0。默认fastMaxTokens:0、fastProseTokens:0、fastEffort:inherit；原先的16384/8192自动限制已取消。配置里若曾手工填写旧额度，应改为0才能继承。token截断后发送继续会保留已有图形与读取范围，续写不重复套用VIE限额；会话重开可从最近400条公开事件恢复被截断的视觉任务。

安装更新包后重启；建议新建聊天验证默认值。旧会话的Harness请求头或服务端原有上限可能仍会沿用，不通过改写历史日志来猜测和提高它们。/vie status中的effectiveMaxTokens是本中间件返回的额度，null表示交由宿主/提供方默认；不代表已探测服务端最大输出能力。

## 0.27.0 同版本修正：原生图展开

本包补齐流程图、曲线图、关系图、时间轴、示意图、动画和交互实验的“展开/收起”。更新后请重新安装 0.27.0 TGZ 并重启 Harness 以刷新前端资源。已有会话中的成功原生图也由新渲染器提供展开按钮，无需模型重新生成。展开保留当前参数与挂载视图，支持 Esc 退出，工具栏继续避让窗口右上角。

