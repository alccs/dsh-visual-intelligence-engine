# 0.30.5 验证范围

本版的新增验证针对响应式图形完整性和 A 式组件：正文可用宽度、完整 SVG、右侧标签、等比缩放，以及控件的键盘操作、主题继承、局部状态、复位和动画填充同步。测试使用生产构建、实际 Chrome 与隔离 iframe。

`docs/validation/responsive-browser.json` 保存每个窗口的实测图形和标签边界；`docs/validation/release-gate.json` 记录完整软件与安装验证。没有调用外部模型，因此没有新增模型速度、token 节省或知识正确率结论。

通用模型评测继续使用 [既有方法](EVALUATION-0.30.1.md) 和 `scripts/eval-tasks.mjs` 的 48 题，不把截图修复冒充为模型评测成绩。
