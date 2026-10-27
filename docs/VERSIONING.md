# 版本与本地发版

唯一开发目录为工作区下的 `repo/`。Git 提交保存源码历史，不再为每个版本复制新的开发目录。`package/package.json` 是版本号的唯一来源；其他元数据、构建入口和演示文件名由脚本同步。

## 开发

使用 Node.js 24，在仓库中执行：

```sh
npm ci --ignore-scripts
npm run version -- 0.31.0
npm run build
npm run check
```

`npm run version:check` 检查根元数据和锁文件是否一致。`npm run demo` 生成对应版本的离线演示。`node_modules/` 由本仓库的锁文件安装，不链接到历史版本目录。

版本号直接使用正式语义版本，例如 0.31.0；无需添加 dev 后缀。通过完整验证并归档后交付。已交付版本不可覆盖，后续修复增加补丁号。

## 验证与交付

```sh
npm run verify
npm run release
```

公开源码使用通用代码与浏览器回归。具有本地完整回归材料时，`npm run verify:full` 运行完整宿主验证；发版脚本也会根据是否具备完整材料选择验证入口。清单记录实际验证范围，不把通用检查写成完整宿主检查。

`dist/` 是可重新生成的构建输出。`npm run release` 生成 TGZ、源码 ZIP、离线 HTML 和 SHA256，并保存到仓库旁的 `releases/<version>/`。已经验证过且源码未变时，可以执行：

```sh
npm run release -- --reuse-verification
```

`manifest.json` 记录版本、Git 提交、工作树是否有修改、验证指纹、检查数量及各交付文件的哈希。相同内容可以重复归档；同版本内容不同会被拒绝。归档后继续修改，应先变更开发版本号。

这些命令只执行本地构建与归档。Git 推送、GitHub Release、npm 发布和市场 PR 由明确的发布指令单独执行。

## 历史目录

`archive/versions/` 保存迁移前的版本快照，`archive/previous-publish-repo/` 保存原发布仓库及其未提交内容。整理备份还保存了 Git bundle、原始补丁与目录迁移记录。当前正式交付保存在 `releases/0.30.5/`；整理后的开发版本从 `0.30.6-dev.1` 开始。

