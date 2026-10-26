# 安装 VIE

从 [GitHub Releases](https://github.com/alccs/dsh-visual-intelligence-engine/releases) 选择所需版本的 TGZ，在 Harness 桌面版插件管理器中安装，然后完全退出并重新打开 Harness。开发构建使用本地交付的 TGZ。

Web CLI 安装本地包（把文件名替换为实际版本）：

```sh
dsh plugin --profile web add ./dsh-visual-interactive-engine-X.Y.Z.tgz
```

所需版本已经发布到 npm 时，可在插件管理器选择 npm 来源，填写 `dsh-visual-interactive-engine`，或执行：

```sh
dsh plugin --profile web add dsh-visual-interactive-engine
```

固定 npm 版本时使用 `dsh-visual-interactive-engine@版本号`。本地开发版本不会自动上传 npm。Desktop profile 由应用管理，请使用桌面插件管理器安装。

兼容范围以安装包内的 `package.json` 为准。开发与验证使用 Node.js 24，流程见 [版本管理](docs/VERSIONING.md)。
