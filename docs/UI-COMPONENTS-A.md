# A 式共享组件

这是控件规范，不是图形内容或页面布局模板。按钮、滑块、页签、开关、输入和读数可以用于任意学科，图形配色与布局自由表达。

| 元素 | 规范 |
| --- | --- |
| 常规按钮 | 10px 圆角，38px 最小高度，中性填充主操作、细边框次操作 |
| 紧凑操作 | 32px 最小高度，用于展开、复位等次要操作 |
| 触摸环境 | 按钮最小高度提升为 44px |
| 滑块 | 4px 轨道、14px 白色圆点，填充按真实 min/max/value 计算 |
| 开关 | 34 × 20px，保留真实 checkbox 和 role=switch |
| 分段选择 | 浅色背景轨道，选中项使用表面色和轻边框 |
| 数字/下拉 | 统一高度、圆角、边框、文字和焦点 |
| 状态 | hover、disabled、focus-visible 使用共享规则；答题正误保留语义颜色 |

CSS 入口为 `src/styles/controls.css`。`--vie-control-*` 独立于图形的 `--vie-primary/secondary/accent`，深色模式通过宿主文字、背景与边框变量自适应。

参数优先使用 `document.controls`，图内操作优先使用工具栏：

```js
const toolbar = VIE.ui.toolbar({
  root: '#actions',
  items: [
    { id: 'play', label: '播放', variant: 'primary', onClick: () => clock.play() },
    { id: 'reset', label: '复位', onClick: () => clock.reset() },
    { id: 'detail', label: '查看说明', variant: 'ghost', onClick: showDetail }
  ]
});
toolbar.set('play', { label: '暂停', pressed: true });
```

`variant` 只接受 primary、secondary、ghost；缺省为 secondary，未知值也回退为 secondary，不中断图形。工具栏 `set` 也可更新 variant。默认 HTML 输入控件同样继承共享样式，单纯样式调整不会改变原有状态或事件。

滑轨填充由 `shared/control-presentation.js` 管理。它不写入 value、不派发 input/change；用户输入、共享状态及已知动画/复位路径都会更新呈现。显式自定义 figure CSS 可覆盖默认值，但不应为普通讲解重新制作一整套按钮和滑轨。

正式预览：打开离线 HTML 的 `#controls` 页面。原型 A 只提供了选定的风格依据，没有把原型的固定版式带入引擎。
