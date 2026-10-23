# dsh-Visual-Interactive-Engine 0.29.0

DeepSeek Harness 通用可视化插件。VIE 负责图形、交互和短标注；完整解释由 Harness 正文渲染，按「图 → 文 → 图 → 文」展开，一个概念一张图。

任意主题均可组合通用组件，复杂画面仍可自定义 figure。结构校验、iframe ready、动画运行都不等于科学正确；尚无真实外部模型端到端速度承诺。

0.29.0 更新：新增通用学习数据与学习模式，阶段图和测验复用统一交互外壳；修复模式菜单依赖、测验字段校验和动态SDK误拦；补齐短主题冷恢复，默认关闭120秒强制中止。保留原有最终图文阅读流、自由绘图及局部修订能力。

## 下载

本次更新推送0.29.0源码，未创建新的GitHub Release。历史预构建产物见 [Releases](https://github.com/alccs/dsh-visual-intelligence-engine/releases)。0.29.0可按下方说明构建，生成文件对应如下：

| 文件 | 用途 |
|---|---|
| `dsh-visual-interactive-engine-0.29.0.tgz` | Harness 安装包 |
| `VIE-Interactive-0.29.0.html` | 离线演示，浏览器直接打开 |
| `SHA256SUMS.txt` | 校验和 |

源码即本仓库，按下方「从源码构建」自行打包。

## 安装

Desktop：在 DeepSeek Harness 应用内插件管理器安装上面的 TGZ，重启应用并新开聊天。

Web CLI：

```powershell
dsh plugin --profile web add "<下载路径>/dsh-visual-interactive-engine-0.29.0.tgz"
```

兼容 DSH `>=0.2.1-rc.2 <0.3.0-0`、Node `>=22.19`。旧工具名、`/vie` 命令和偏好文件保持兼容。

安装后可直接提问，例如「画出齿轮啮合受力分析图」或「用图文解释文件系统为什么需要日志」；`/vie status` 查看本进程统计。

输入框的 VIE 开关支持自动 / 本聊天启用 / 学习模式 / 关闭，也可直接输入：

```text
/vie
/vie auto
/vie on
/vie study
/vie off
/vie global auto
```

`auto` / `on` / `study` / `off` 只设置当前聊天；`global auto|on|study|off` 修改其他未配置聊天的默认值，不覆盖已有明确选择。偏好保存在 `DSH_HOME/dsh-vie-mode.json`。

学习模式按直观定义、因果链和主图组织内容，应用与测验按需追加；自动模式共享同一套绘图能力，但不默认套用学习指引。

## 从源码构建

```bash
npm install
npm run build     # src/ -> package/lib/{index,client}.js
```

`npm run build` 是确定性的离线拼接，无外部依赖、无 eval。构建后可自行 `npm pack ./package` 得到安装包。

> 本仓库只发布源码与插件清单。完整验证门禁（`tests/`、验证报告、`screenshots/`、隔离宿主运行时）不在仓库内，也不随 Release 分发；`npm run check`、`npm run verify`、`npm run release` 需要那套目录树才能运行。`npm run build` 与 `npm pack` 不依赖它们。项目概览见[当前项目总结](docs/PROJECT-OVERVIEW-0.29.0.md)，模块与数据流见[架构说明](docs/ARCHITECTURE.md)。

## 目录结构

```text
src/                引擎源码
  host.js           Host 入口（工具定义、工作流、额度）
  client.js         浏览器入口
  workflow.js       分阶段预算与工具准入
  shared/           文档模型、图形、采样、协议
  view/             各类图形渲染
  styles/           样式
package/            插件包目录（npm pack 的输入）
  package.json      插件清单
  cordis.patch.yml  安装补丁
  assets/           图标、组件参考、技能文档
  lib/              构建产物（由 src/ 生成）
  locale/           本地化
scripts/            构建与验证脚本
```

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

默认 `fastMaxTokens: 0`、`fastProseTokens: 0`、`fastEffort: inherit`，即继承 Harness 的输出与推理设置，不覆盖。显式设置时取 2048..32768，且保留用户更低的额度。`fastMaxRequests` 2..12、`fastMaxVisuals` 1..4、`fastMaxRepairs` 1..4、`fastMaxSearches` 0..4、`fastRequestMs` 默认0关闭强制中止，显式开启范围10000..300000。

## 许可

MIT，见 [LICENSE](LICENSE)。内嵌 React 18.3.1 与宿主源码快照的许可声明见 [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt)。

## 发布与隐私

本仓库不上传真实聊天记录、回放fixtures、验证报告、截图、本机配置、缓存、凭据及本地完整源码ZIP。安装包与离线演示单独发布，GitHub自动源码归档只包含本仓库公开文件。此次完整本地验收：173项测试、8组浏览器检查和7组宿主检查通过；这不等于GitHub在线CI已执行。
