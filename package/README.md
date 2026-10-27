# dsh-Visual-Interactive-Engine 0.31.0

通用可视化与本地交互，图文结合可视化交互。

模型提供当前主题的图形与数据，插件提供统一控件、校验与隔离渲染；完整解释由DeepSeek Harness正文呈现。支持学习阶段与测验、数据图、声明式图形、自由SVG/Canvas/WebGL和可选实验。学习模式按需追加应用与测试，不要求每题生成三张图。

流程图按连线关系自动排列分支与汇合；默认全景总览，学习模式默认逐步引导。两种视图可在图内切换，路径选择、返回、重新开始与恢复在本地完成，任意学科共用同一套控件。

0.31 新增共享 SVG 主图与阶段变化、结构化数据字段修订、有界对象布局诊断和公开耗时统计。混合操作任务保留宿主工具；空白外壳保持等待，当前修订独立计时。统一控件优先于普通图形 CSS，展开后在图内按 Escape 可收起。参数体积收益取决于内容，真实模型生成耗时尚未做 A/B。

0.30 新增内置 SDK：VIE.svg 提供箭头、角度、尺寸、分组、标签与数据坐标映射；VIE.canvas 处理尺寸与共享参数重绘；VIE.animate 复用播放、单步、复位及位置恢复；VIE.scene3d 使用随包提供的 Three.js 绘制通用三维场景，无需 CDN 或项目开发。完整 HTML 可先显示不可交互的静态预览，最终在同一 iframe 中启用一次交互。

常见 SVG 参数别名和 CSS 颜色可兼容，解析器在提交前检查可确定的 SDK 错误。错误结果提供字段路径、错误码和局部修复提示；可用客户端将实际 ready/error 状态反馈给下一次模型请求，报错卡片也可生成修复草稿。修复受已有请求与失败预算约束。

输入区选择自动、本聊天启用、学习模式或关闭；也可输入/vie auto、/vie on、/vie study、/vie off。历史工具与偏好标识保持兼容。安装后完全退出并重启Harness以刷新前端资源。

默认推理与输出继承Harness，fastRequestMs:0不强制超时中止；若旧配置手动设置120000，请改为0才能关闭。交互通常在本地执行，无需额外模型请求；任意生成代码和科学结论仍需检查。

源码、架构、离线演示与通用 SDK 回归随源码交付包提供。许可证见LICENSE。

## 安装

使用 Harness 桌面插件管理器安装本地或 GitHub Releases 下载的 TGZ。所需版本已经发布到 npm 时，可以选择 npm 来源并填写 `dsh-visual-interactive-engine`；Web CLI 可执行 `dsh plugin --profile web add dsh-visual-interactive-engine`。固定版本时在包名后追加 `@版本号`。安装后完全退出并重启 Harness。

[效果展示与源码](https://github.com/alccs/dsh-visual-intelligence-engine#readme) · [安装说明](https://github.com/alccs/dsh-visual-intelligence-engine/blob/main/INSTALL.md) · [GitHub Releases](https://github.com/alccs/dsh-visual-intelligence-engine/releases)
