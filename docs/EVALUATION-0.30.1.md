# 0.30 评测方法与边界

本轮验证软件的输入契约、实际渲染、控件操作、预览安全、状态恢复、图文顺序与安装加载。没有调用外部模型，尚无真实模型延迟、token 节省或相对其他插件的胜率结论。

## 通用任务集

`scripts/eval-tasks.mjs` 包含 48 道人工编写的通用任务，分知识解释、流程、数据、变化、恢复及无需可视化六类，每类 8 题。16 题标为 holdout；比较版本时保持题目、宿主、模型配置和评分口径一致，不把保留题写入模型示例。任务覆盖自由绘图与原生图形，包含应当不出图的请求。

导出任务：

```sh
node scripts/evaluate.mjs --tasks > tasks.json
```

使用各插件实际运行后，将公开可记录的结果整理成 JSONL，每个模型与插件版本下每题只保留一条记录；第一次失败也必须保留在该条记录中，以 repairs 记录修复次数，不用重跑成功覆盖失败。

```json
{"taskId":"knowledge-1","model":"模型与版本","variant":"VIE-0.30.1","completed":true,"followedVisualIntent":true,"rendered":true,"interactionPassed":true,"reviewPassed":true,"previewMs":1600,"readyMs":4200,"inputTokens":1200,"outputTokens":900,"repairs":0}
```

上行只是格式示例，数值不是测量结果。数据和知识题 reviewPassed 需要人工检查标注、连线、布局、事实与假设；JS 能运行不能代替这项审核。恢复题的 interactionPassed 应来自实际操作；无需图的任务只要求 completed 与 followedVisualIntent，不能靠强制出图得分。

```sh
node scripts/evaluate.mjs actual-runs.jsonl > report.json
```

缺失、失败和待审核都不计为成功。成功率以计划中的全部 48 题为分母，报告保留各条失败记录；按 model/variant 分开汇总，不能把不同模型合并为插件效果。preview/ready 的 p50/p95 只统计有对应实测时间的成功任务，需同时看全量成功率，不能只报告耗时。token 与 repairs 汇总包括失败任务。

## 本地渲染时间

`mountGeneratedFigure.metrics()` 和 iframe 的 `data-vie-preview-ms`、`data-vie-ready-ms` 分别记录从本次挂载到静态预览/就绪的时间。没有静态预览时 previewMs 为 null。这些时间从浏览器挂载开始；流式场景的 readyMs 也可能包含等待最终参数的时间，不能单独分离模型与渲染开销，更不覆盖挂载前的思考、检索和输出。端到端比较应独立记录请求起点，不可直接用此值宣称生成更快。

## 已验证与后续

本次实际 Chrome 检查包括 320/390/768/1280px 阅读、SVG 标签与共享滑块、Canvas 初始化和参数更新、动画播放/暂停/复位/位置恢复，以及静态预览到一次性激活的同 iframe 路径。生命周期另有确定性测试验证隐藏时间不累积、减少动态效果、销毁后无回调。

补充检查包括实际工具执行前的重复属性诊断、SVG参数别名与颜色、数据坐标及读数一致、渐进预览中的离线Three.js注入、真实非空WebGL像素、相机缩放/复位、共享参数与三维动画。运行错误还通过实际Harness命令处理器进入下一次提示，验证不产生额外聊天消息、可以在图数上限内修复原图并清除旧修订错误。

真实模型对照仍需在相同 Harness 配置下运行完整任务集，并记录输入/输出 token、首个有效预览、最终 ready、第一次交互、修复数及人工质量评分。未提供自动计费的模型运行器；本地汇总器只读取已经产生的记录。


## 0.30.1计时口径与空值

previewMs和readyMs来自iframe挂载后的本地计时；未知时允许null，不作为0进入分位数。实际绘制确认另有visibleMs。requestToVisibleMs、requestToReadyMs等端到端字段需要请求起点的独立记录；Host的firstVisibleMs/firstReadyMs是收到客户端确认的时间，包含传输延迟。firstSubmittedMs仅表示工具提交，不能代替首个可见图。firstGraphicMs保留兼容别名，含义随firstVisibleMs。

ready表示脚本和控件完成初始化；屏幕外iframe不必等待绘制才报告ready。静态回退不报告交互成功。计数（token和repairs）必须是非负整数；时长可为非负小数。报告补充totalInputTokens、时间样本数及请求起点字段的分位数，失败记录仍参与token和修复总量。

## 包体成本

当前构建的实际字节和提示字符数由build.mjs自动写入BUILD-METRICS.json。主客户端与按需Three.js chunk分别统计；chunk在首次三维请求时由宿主本地包加载，不从CDN下载。离线演示仍包含两部分以保持单文件可用。字符数不是模型token计数，包体不是端到端模型延迟。
