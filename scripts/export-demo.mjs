import {VERSION} from './version-info.mjs';
/** Self-contained offline preview, using the actual production React adapter. */
import fs from 'node:fs';
import path from 'node:path';
import {syntheticHistory} from './synthetic-history.mjs';
import {sdkExamples} from './sdk-examples.mjs';
import {wideFlowExample} from './wide-flow-example.mjs';
import {flowExample} from './flow-examples.mjs';
import {examples} from './general-examples.mjs';
import {changeComparison} from './change-comparison-example.mjs';
import {learningLesson} from './learning-examples.mjs';
import {compactExamples} from './compact-examples.mjs';
import {linkedMotion} from './visual-examples.mjs';
import {reactiveWave} from './reactive-examples.mjs';
import {progressiveI2C} from './progressive-examples.mjs';
import {controlsA} from './control-examples.mjs';
const root=path.resolve(import.meta.dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
// HTML's legacy script-comment states also interpret markers in JS comments.
const scriptSafe=text=>text.replace(/<\/script/gi,'<\\/script').replace(/<!--/g,'<\\!--');
const client=read('package/lib/client.js').replace('exports.name=name;',`window.VIE={createVIEAnswerDefinition,createVIEFlowDefinition,createVIETurnDefinition,DocumentPreview,validateChartSpec,documentSceneSource,validateDocumentSpec,validateFigureDefinition,validateFigureState,buildFigureDocument,VIE_CSS,createViews,createVIEBridge,SceneStore,createVIEModeView,experimentSceneSource,storySceneSource,makePresetSource,visualSceneSource,VIEStream,planetaryRates,normalizeExperiment,gearTrainModel,wormModel,mountInteractiveScene,mountCanLab,validateExperimentSnapshot};exports.name=name;`);
const html=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VIE ${VERSION} · 交互解释</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#fff;color:#1c2533;font-family:system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif;font-size:14px;line-height:1.7}body.dark{background:#14181e;color:#e4eaf1;color-scheme:dark}main{width:min(100% - 32px,740px);margin:30px auto 48px}header.top{display:flex;gap:16px;justify-content:space-between;align-items:center;border-bottom:1px solid #e6e9ed;padding-bottom:16px}.brand{font-size:12px;letter-spacing:.04em;color:#697487}h1{font-size:25px;line-height:1.4;letter-spacing:-.04em;margin:7px 0 0;font-weight:640}button,textarea{font:inherit}button{cursor:pointer;border:1px solid #dde3eb;border-radius:8px;background:transparent;color:inherit;padding:7px 11px}button:focus-visible,textarea:focus-visible{outline:2px solid #5b8cf4;outline-offset:3px}.topics{display:flex;gap:7px;flex-wrap:wrap;margin:18px 0}.topics button{font-size:12px}.topics button[aria-pressed=true]{border-color:#6d98f5;background:#5483ef0d}.question{display:flex;justify-content:flex-end;margin:24px 0 20px}.question p{max-width:90%;border-radius:16px 16px 3px 16px;background:#f2f4f7;padding:11px 15px;margin:0}.intro:empty{display:none}.intro{margin:0 0 16px;line-height:1.85}#stage{min-width:0}#stage>.vie-shell{margin:0}.followup{margin:22px 0 14px}.followup label{display:block;font-size:12px;color:#697487;margin-bottom:7px}.followup textarea{width:100%;resize:vertical;min-height:65px;max-height:180px;padding:11px 13px;border:1px solid #dce2e9;background:transparent;color:inherit;border-radius:12px;font-size:12px}.demo-tools{font-size:12px;color:#697487;margin-top:19px}.demo-tools summary{cursor:pointer}.demo-tools .buttons{display:flex;flex-wrap:wrap;gap:7px;margin:12px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:280px;overflow:auto;border:1px solid #e2e7ee;border-radius:9px;padding:12px;font:11px/1.6 ui-monospace,monospace}.fine{font-size:11px;color:#697487;margin:14px 0}body.dark header.top{border-color:#303844}body.dark .question p{background:#252c35}body.dark button,body.dark textarea,body.dark pre{border-color:#394453}body.dark .brand,body.dark .fine,body.dark .demo-tools,body.dark .followup label{color:#a2adbc}@media(max-width:440px){main{width:calc(100% - 24px);margin-top:19px}h1{font-size:21px}header.top{gap:9px}.question{margin:20px 0 16px}.intro{font-size:13px}.topics{gap:6px}.topics button{padding:6px 9px}}
</style></head><body><main><header class="top"><div><div class="brand">VIE ${VERSION} · 交互解释</div><h1>看见关系，动手理解</h1></div><button id="theme" type="button" aria-label="切换深色外观">深色外观</button></header>
<nav class="topics" aria-label="通用生成示例"></nav><details id="optional-components" class="demo-tools"><summary>可选预制组件示例</summary><nav id="legacy-topics" class="topics" aria-label="可选组件示例"></nav></details><div class="question"><p id="question"></p></div><p class="intro" id="intro"></p><div id="stage"></div><article data-native-explanation id="native-explanation"></article>
<div class="followup"><label for="draft">继续提问 · 操作后可把当前参数带入这里</label><textarea id="draft" placeholder="试试调整参数，再点击“带参数继续提问”…"></textarea></div>
<details class="demo-tools"><summary>演示与复核</summary><div class="buttons"><button id="stream" type="button">重放生成过程</button><button id="remount" type="button">重新挂载当前画面</button></div><p>此离线文件使用插件的实际渲染器。重新挂载保留本页内的编辑；刷新页面恢复初始场景。没有联网生成或自动发送。</p><details><summary>查看当前场景定义</summary><pre id="source"></pre></details></details><p class="fine">教学参数与理想模型 · 适用范围见各画面说明</p></main>
<!-- React and ReactDOM licenses: ${read('node_modules/react/LICENSE').replace(/--/g,'—')} -->
<script>${scriptSafe(read('node_modules/react/umd/react.production.min.js'))}</script>
<script>${scriptSafe(read('node_modules/react-dom/umd/react-dom.production.min.js'))}</script>
<script>window.__VIE_CHUNKS__=new Map();window.__ModuleLoader__={load:({chunk,factory})=>{if(chunk){__VIE_CHUNKS__.set(chunk,{factory});return;}const require=name=>{if(name==='react')return window.React;throw Error('Unknown import '+name)};require.async=async spec=>{const chunk=__VIE_CHUNKS__.get((spec.startsWith('./')?spec.slice(2):spec));if(!chunk)throw Error('Unknown chunk '+spec);return chunk.exports??=chunk.factory();};window.VIEPlugin=factory(require)}};</script>
<script>${scriptSafe(read('package/lib/client.three.js'))}</script>
<script>${scriptSafe(client)}</script>
<script>window.VIEControlsA=${scriptSafe(JSON.stringify(controlsA))};window.VIESDKExamples=${scriptSafe(JSON.stringify(sdkExamples))};window.VIEWideFlowExample=${scriptSafe(JSON.stringify(wideFlowExample))};window.VIEFlowExample=${scriptSafe(JSON.stringify(flowExample))};window.VIELearningLesson=${scriptSafe(JSON.stringify(learningLesson))};window.VIEExamples=${scriptSafe(JSON.stringify({...examples,changeComparison}))};window.VIECompact=${scriptSafe(JSON.stringify(compactExamples))};window.VIEReactive=${scriptSafe(JSON.stringify(reactiveWave))};window.VIELinkedMotion=${scriptSafe(JSON.stringify(linkedMotion))};window.VIEHistory=${scriptSafe(JSON.stringify(syntheticHistory))};window.VIEProgressiveI2C=${scriptSafe(JSON.stringify(progressiveI2C))};</script><script>${scriptSafe(read('scripts/demo-app.js'))}</script></body></html>`;
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
const file=path.join(root,'dist',("VIE-Interactive-"+VERSION+".html"));
fs.writeFileSync(file,html);console.log(file+' ('+Buffer.byteLength(html)+' bytes)');
fs.writeFileSync(path.join(root,'dist/index.html'),html);
