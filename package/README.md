# dsh-Visual-Interactive-Engine 0.28.0

本版修复参数容错、冷恢复、修图显示、脚本语法、采样覆盖、额度准入、协议示例误拦截、发布入口校验及展开键盘交互。详见 docs/OPTIMIZATIONS-0.28.0.md。

DeepSeek Harness 通用可视化插件。VIE 负责图形、交互和短标注；完整解释由 Harness 正文渲染，按图→文→图→文展开。

本版优化：绘图意图与资料权限分离、分阶段工具及重试预算，默认输出/推理继承Harness、可用宿主的120秒首图请求中止、可见进度与统计；新增无需代码的柱图/环图/向量；曲线自适应采样与关键点/断点；展开/放大、窄屏重排与配色；参数与修图基线恢复；完整宿主和浏览器发布门禁。

交付文件位于 dist/：dsh-visual-interactive-engine-0.28.0.tgz 为 Harness 安装包；VIE-0.28.0-source.zip 为源码包；VIE-Interactive-0.28.0.html 为离线演示；SHA256SUMS.txt 为校验。

安装：Desktop 使用应用内插件管理器安装 TGZ，重启并新开聊天。CLI web profile 方式见 INSTALL.md。旧工具名、/vie 命令和偏好文件保持兼容。可询问“画出齿轮啮合受力分析图”或“用图文解释文件系统为什么需要日志”。/vie status 查看本进程统计。

开发：npm ci；npm run check；node scripts/prepare-runtime.mjs；npm run verify；npm run release。验证使用Node24、Chrome和隔离Harness运行时。外部运行时可通过 VIE_DSH_RUNTIME/VIE_ASSEMBLY_RUNTIME 配置，不更改用户安装。完整变更与边界见 docs/OPTIMIZATIONS-0.28.0.md，架构见 docs/ARCHITECTURE.md。

任意主题可组合通用组件；复杂画面仍可自定义 figure。结构校验、iframe ready、动画运行均不等于科学正确。尚无真实外部模型端到端速度承诺。

图标：package/assets/icon.svg 为正式矢量图，icon.png 为512px透明预览；安装后由Harness元数据读取。

0.28.0同版本修正：取消默认16384/8192输出限制；截断后继续保留原图与任务，继承Harness额度。安装更新包后重启并新建聊天验证；既有显式配置与模型服务自身上限仍需按实际情况处理。详见INSTALL.md。
