# Release 安装包与固定下载地址

当前版本保持 0.29.2。每个正式 Release 保留带版本号的安装包，同时提供固定文件名 `dsh-visual-interactive-engine.tgz`。两份 TGZ 的字节与 SHA256 必须完全一致。

## 本地准备

完整发布脚本会自动生成两个名称，并将它们写入 `dist/SHA256SUMS.txt`。只为已经生成的安装包补充固定名时，可运行：

```sh
npm run release:assets
```

该命令检查安装包内部的名称、版本，再复制固定名；不会修改版本号。完整验证仍由原来的发布门禁执行。

## GitHub Release

发布时先上传 `dsh-visual-interactive-engine-<版本>.tgz` 与 `SHA256SUMS.txt`。仓库中的 `Release stable installer` 工作流监听 Release 的 published 事件：下载对应版本安装包，核对原 SHA256 和包内版本，再补充固定名附件与更新后的校验文件。原带版本号安装包保持原样。

已有的 v0.29.2 不会因添加工作流而自动重发。工作流推送并启用后，可在 Actions 中选择 `Release stable installer → Run workflow`，tag 填 `v0.29.2`，为现有 Release 补充固定名。工作流也支持其他已有版本的 tag。

本地仅需准备本次附件时，也可复制已发布的版本包与 SHA256 到 dist，再运行：

```sh
node scripts/release-assets.mjs --tag v0.29.2 --verify-published
```

## 市场条目切换

先确认下面地址能下载到正确安装包，再修改社区市场条目的 tarball：

```yaml
tarball: https://github.com/alccs/dsh-visual-intelligence-engine/releases/latest/download/dsh-visual-interactive-engine.tgz
```

正式 Release 应设为 Latest；预发布版本不用于这条公开下载入口。每个后续正式版本继续上传同名附件，市场 tarball 行无需逐次改版本号。已经安装的用户仍需执行更新。

工作流和市场条目都需要各自的 Git 提交发布后才会在线生效；只生成本地附件不会改变网页市场。
