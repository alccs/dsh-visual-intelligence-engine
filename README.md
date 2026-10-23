# dsh-Visual-Interactive-Engine 0.27.0

DeepSeek Harness 通用可视化插件。VIE 负责图形、交互和短标注；完整解释由 Harness 正文渲染，按「图 → 文 → 图 → 文」展开，一个概念一张图。

任意主题均可组合通用组件，复杂画面仍可自定义 figure。结构校验、iframe ready、动画运行都不等于科学正确；尚无真实外部模型端到端速度承诺。

## 下载

预构建产物见 [Releases](https://github.com/alccs/dsh-visual-intelligence-engine/releases)：

| 文件 | 用途 |
|---|---|
| `dsh-visual-interactive-engine-0.27.0.tgz` | Harness 安装包 |
| `VIE-Interactive-0.27.0.html` | 离线演示，浏览器直接打开 |
| `SHA256SUMS.txt` | 校验和 |

源码即本仓库，按下方「从源码构建」自行打包。

## 安装

Desktop：在 DeepSeek Harness 应用内插件管理器安装上面的 TGZ，重启应用并新开聊天。

Web CLI：

```powershell
dsh plugin --profile web add "<下载路径>/dsh-visual-interactive-engine-0.27.0.tgz"
```

兼容 DSH `>=0.2.1-rc.2 <0.3.0-0`、Node `>=22.19`。旧工具名、`/vie` 命令和偏好文件保持兼容。

安装后可直接提问，例如「画出齿轮啮合受力分析图」或「用图文解释文件系统为什么需要日志」；`/vie status` 查看本进程统计。

输入框的 VIE 开关支持自动 / 本聊天启用 / 关闭，也可直接输入：

```text
/vie
/vie auto
/vie on
/vie off
/vie global auto
```

`auto` / `on` / `off` 只设置当前聊天；`global auto|on|off` 修改其他未配置聊天的默认值，不覆盖已有明确选择。偏好保存在 `DSH_HOME/dsh-vie-mode.json`。

## 从源码构建

```bash
npm install
npm run build     # src/ -> package/lib/{index,client}.js
```

`npm run build` 是确定性的离线拼接，无外部依赖、无 eval。构建后可自行 `npm pack ./package` 得到安装包。

> 本仓库只发布源码与插件清单。完整验证门禁（`tests/`、`docs/`、`screenshots/`、隔离宿主运行时）不在仓库内，也不随 Release 分发；`npm run check`、`npm run verify`、`npm run release` 需要那套目录树才能运行。`npm run build` 与 `npm pack` 不依赖它们。

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
    fastRequestMs: 120000
    fastBudgetMs: 60000
```

默认 `fastMaxTokens: 0`、`fastProseTokens: 0`、`fastEffort: inherit`，即继承 Harness 的输出与推理设置，不覆盖。显式设置时取 2048..32768，且保留用户更低的额度。`fastMaxRequests` 1..12、`fastMaxVisuals` 1..4、`fastMaxRepairs` 1..4、`fastMaxSearches` 1..4、`fastRequestMs` 10000..300000。

## 许可

MIT，见 [LICENSE](LICENSE)。内嵌 React 18.3.1 与宿主源码快照的许可声明见 [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt)。
