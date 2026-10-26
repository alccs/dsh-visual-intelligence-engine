import {i2cStaticExample as original} from './i2c-static-example.mjs';
// Reframe the supplied static case into three focused views for the offline preview.
// This is an explicit example, not an automatic semantic SVG splitter in the plugin.
const views=[
 {title:'① 两线总线：SCL 与 SDA',box:'0 76 484 164',text:'SCL 提供时钟，SDA 传输数据。多个器件共享这两根线，主机通过地址选择目标从机。图中两根信号线分别通过上拉电阻连接电源；先理解连接关系，再看下一张图的驱动方式。'},
 {title:'② 开漏输出：拉低与释放',box:'490 72 440 144',text:'开漏输出通过“拉低”或“释放”控制线路。器件释放线路后，上拉电阻使电平回到高；任何一个器件拉低，共享线路就保持低。这解释了多个器件如何共用 SDA，也为应答位由接收方拉低提供了基础。'},
 {title:'③ 一帧时序：地址、应答与数据',box:'36 330 800 236',text:'传输由 START 开始，接着发送地址和读写方向，随后是应答位与数据字节，最后由 STOP 结束。通常 SDA 在 SCL 低电平期间改变，在高电平期间保持稳定；START 和 STOP 使用特定的 SDA 跳变表示。图中的 ACK 位展示接收方拉低应答的阶段。'}
];
export const progressiveI2C=views.map(({title,box,text})=>{const [, ,width,height]=box.split(' ').map(Number);return {text,document:{title,blocks:[{...original,title,height:300,css:original.css+`\nsvg{width:100%;height:auto;aspect-ratio:${width}/${height}}`,html:original.html.replace(/viewBox='[^']*'/,`viewBox='${box}'`).replace(/width='100%' height='100%'/,`width='${width}' height='${height}'`).replace(/aria-label='[^']*'/,`aria-label='${title}'`).replace(/font-size='(?:9(?:\.5)?|10)'/g,"font-size='13'")}]}};});
