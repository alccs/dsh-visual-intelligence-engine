/* VIE v0.29.0 — DSH browser entry. Generated includes are resolved by build.mjs. */
window.__ModuleLoader__.load({id:'dsh-visual-interactive-engine',factory:(require)=>{
 const module={exports:{}};const exports=module.exports;
 const VIE_CSS="/* VIE 0.5 • content-first inline teaching widgets.\n   All rules are scoped to .vie-shell so DSH native chat stays untouched. */\n.vie-shell {\n  --vie-ink:var(--dsw-alias-text-primary,#222326);\n  --vie-muted:var(--dsw-alias-text-secondary,#777980);\n  --vie-stroke:var(--dsw-alias-border-l2,#e7e7e9);\n  --vie-layer:var(--dsw-alias-background-secondary,#f6f6f7);\n  --vie-bg:var(--dsw-alias-background-primary,#fff);\n  --vie-blue:#4088d0; --vie-green:#419d7d; --vie-amber:#c99f45;\n  --vie-color:#4088d0;\n  box-sizing:border-box; width:100%; max-width:760px; margin:6px 0 12px;\n  font-family:ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",sans-serif;\n  font-size:14px; line-height:1.55; color:var(--vie-ink); background:transparent;\n}\n.vie-shell *, .vie-shell *::before, .vie-shell *::after {box-sizing:border-box}\n.vie-body {display:flex;flex-direction:column;gap:14px;padding:17px 19px;border:1px solid var(--vie-stroke);border-radius:17px;background:var(--vie-bg)}\n.vie-body > [data-id],.vie-body > section {min-width:0}\n.vie-text h3 {font-weight:620;font-size:16px;line-height:1.4;margin:0 0 3px;letter-spacing:-.025em}\n.vie-text p {margin:0;color:var(--vie-muted);font-size:13px;line-height:1.6}\n.vie-row {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}\n.vie-column {display:flex;flex-direction:column;gap:9px;min-width:0}\n.vie-card {min-width:0;display:flex;flex-direction:column;gap:10px}\n.vie-card-title {font-size:12px;font-weight:600}\n.vie-divider {border:none;border-top:1px solid var(--vie-stroke);margin:1px 0}\n.vie-control {display:flex;flex-direction:column;gap:6px;min-width:0}\n.vie-control-label {display:flex;align-items:center;justify-content:space-between;gap:9px;font-size:13px;color:var(--vie-muted);font-variant-numeric:tabular-nums}\n.vie-control-label b {font-size:13px;color:var(--vie-ink);font-weight:620;white-space:nowrap}\n.vie-control input[type=\"range\"],.vie-can-inputs input[type=\"range\"] {width:100%;height:18px;background:transparent;appearance:none;-webkit-appearance:none;cursor:pointer;margin:0;touch-action:pan-y}\n.vie-control input[type=\"range\"]::-webkit-slider-runnable-track,.vie-can-inputs input[type=\"range\"]::-webkit-slider-runnable-track{height:5px;border-radius:999px;background:#ededee}\n.vie-control input[type=\"range\"]::-moz-range-track,.vie-can-inputs input[type=\"range\"]::-moz-range-track{height:5px;border-radius:999px;background:#ededee}\n.vie-control input[type=\"range\"]::-webkit-slider-thumb,.vie-can-inputs input[type=\"range\"]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;margin-top:-5.5px;border-radius:50%;background:#fff;border:1px solid #dfe0e3;box-shadow:0 1px 4px #00000024}\n.vie-control input[type=\"range\"]::-moz-range-thumb,.vie-can-inputs input[type=\"range\"]::-moz-range-thumb{width:15px;height:15px;border-radius:50%;background:#fff;border:1px solid #dfe0e3;box-shadow:0 1px 4px #00000024}\n.vie-metric {display:flex;flex-direction:row;justify-content:space-between;gap:12px;align-items:baseline;min-width:0}\n.vie-metric small {color:var(--vie-muted);font-size:12px}\n.vie-metric strong {font-weight:680;font-size:20px;letter-spacing:-.03em;font-variant-numeric:tabular-nums}\n.vie-badge {font-size:11px;padding:2px 7px;border:1px solid var(--vie-stroke);border-radius:999px;color:var(--vie-muted);width:max-content}\n.vie-shell button.vie-button,.vie-shell button.vie-pill {border:1px solid var(--vie-stroke);border-radius:999px;padding:5px 11px;min-height:32px;display:inline-flex;align-items:center;justify-content:center;gap:5px;background:transparent;color:var(--vie-ink);font:inherit;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:background .12s,border-color .12s,transform .1s}\n.vie-shell button.vie-button:hover,.vie-shell button.vie-pill:hover{background:var(--vie-layer);border-color:#d8d8db}\n.vie-shell button.vie-button:active,.vie-shell button.vie-pill:active{transform:scale(.985)}\n.vie-shell button:focus-visible,.vie-shell input:focus-visible,.vie-shell summary:focus-visible {outline:2px solid var(--vie-blue);outline-offset:3px}\n.vie-chart {min-width:0;display:flex;flex-direction:column;gap:5px}\n.vie-chart-title {font-weight:580;font-size:13px;color:var(--vie-muted)}\n.vie-chart svg {display:block;width:100%;height:auto;max-height:184px}\n.vie-chart text,.vie-motion text{font:10.5px ui-sans-serif,system-ui;fill:var(--vie-muted)}\n.vie-motion {min-width:0}\n.vie-motion-header {display:flex;justify-content:space-between;gap:10px;align-items:center;margin:0;color:var(--vie-muted);font-size:12px}\n.vie-motion-header strong{color:var(--vie-ink);font-weight:620}\n.vie-motion svg{display:block;width:100%;height:auto;max-height:156px}\n.vie-motion .vie-car{transition:transform .2s ease-out}\n.vie-progress{display:flex;flex-direction:column;gap:7px}\n.vie-track{height:5px;border-radius:999px;overflow:hidden;background:var(--vie-layer)}\n.vie-track-fill{height:100%;background:var(--vie-color);border-radius:999px;transition:width .15s}\n.vie-empty{font-size:12px;color:var(--vie-muted);padding:14px;text-align:center}\n.vie-diagnostics{font-size:11px;color:#9d6c36}.vie-diagnostics pre{overflow-wrap:anywhere;white-space:pre-wrap}\n/* Knowledge component: readable, one visual focus, quiet controls. */\n.vie-canlab{color:var(--vie-ink);min-width:0;width:100%;font-variant-numeric:tabular-nums}\n.vie-can-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 15px}\n.vie-can-head h3{font-size:16px;line-height:1.4;font-weight:610;letter-spacing:-.018em;margin:0}\n.vie-can-head .vie-can-reset{height:32px;min-height:32px;padding:3px 12px}\n.vie-can-tabs{display:grid;grid-template-columns:1fr 1fr;gap:3px;background:var(--vie-layer);border-radius:999px;padding:3px;margin:0 0 17px}\n.vie-shell .vie-can-tabs button.vie-can-tab{appearance:none;background:transparent;border:0;border-radius:999px;padding:6px 9px;min-width:0;min-height:30px;font:inherit;font-size:13px;line-height:1.3;cursor:pointer;color:var(--vie-muted);transition:background .16s,box-shadow .16s,color .16s}\n.vie-shell .vie-can-tabs button.vie-can-tab.active{color:var(--vie-ink);font-weight:610;background:var(--vie-bg);box-shadow:0 1px 3px #00000010}\n.vie-shell .vie-can-tabs button.vie-can-tab:hover:not(.active){background:color-mix(in srgb,var(--vie-bg) 45%,transparent)}\n.vie-can-segments{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:0 0 13px}\n.vie-can-segments>div{min-width:0;display:flex;flex-direction:column;gap:2px}\n.vie-can-segments span{font-size:12px;color:var(--vie-muted)}\n.vie-can-segments strong{font-size:18px;font-weight:660;line-height:1.35;letter-spacing:-.025em}\n.vie-can-timeline{position:relative;margin:0 0 17px}\n.vie-can-track{display:flex;overflow:hidden;width:100%;height:42px;border-radius:6px;user-select:none}\n.vie-can-seg{display:flex;align-items:center;justify-content:center;min-width:0;color:white;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;border-right:2px solid var(--vie-bg);transition:flex-grow .17s ease}\n.vie-can-seg.sync{background:#528ac4}.vie-can-seg.before{background:#3da080}.vie-can-seg.after{background:#c9a047;border-right:0}\n.vie-can-sp-indicator{position:absolute;top:41px;left:83.33%;transform:translateX(-50%);font-size:17px;line-height:17px;width:22px;text-align:center;color:#3984da;transition:left .17s;pointer-events:none}\n.vie-can-grab{position:absolute;top:3px;height:42px;width:26px;left:83.33%;transform:translateX(-50%);cursor:ew-resize;touch-action:none;z-index:2;outline-offset:4px;border-radius:8px}\n.vie-can-grab::before{content:'';display:block;position:absolute;top:-1px;left:50%;height:44px;width:2px;transform:translateX(-50%);background:#ffffffbb;box-shadow:0 0 0 1px #00000006;opacity:.85}\n.vie-can-grab:hover::after,.vie-can-grab:focus-visible::after{content:'';display:block;position:absolute;top:15px;left:50%;height:13px;width:7px;transform:translateX(-50%);border-radius:4px;background:#fff;box-shadow:0 1px 5px #0003}\n.vie-can-axis{display:flex;align-items:center;justify-content:space-between;position:relative;height:28px;padding-top:9px;color:var(--vie-muted);font-size:11.5px}\n.vie-can-axis strong{font-size:12px;color:#3984da;font-weight:570}\n.vie-can-metrics{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:0 0 13px}\n.vie-can-metrics>div{min-width:0}.vie-can-metrics span{display:block;color:var(--vie-muted);font-size:12px;margin-bottom:1px}\n.vie-can-metrics strong{display:block;font-size:23px;font-weight:660;letter-spacing:-.028em;line-height:1.4}\n.vie-can-guidance{font-size:13px;line-height:1.62;color:var(--vie-ink);margin:5px 0 8px}\n.vie-can-message{font-size:12px;line-height:1.5;color:#9a6b26;margin:4px 0}.vie-can-message:empty{display:none}\n.vie-can-footer{display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid var(--vie-stroke);padding-top:9px}\n.vie-can-more{min-width:0;flex:1}.vie-can-more summary{width:max-content;list-style:none;display:inline-flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;color:var(--vie-muted);padding:4px 2px}\n.vie-can-more summary::-webkit-details-marker{display:none}.vie-can-more[open] summary span{transform:rotate(180deg)}\n.vie-can-more summary span{font-size:12px;display:inline-block;transition:transform .14s}\n.vie-can-extra-body{display:flex;flex-direction:column;gap:13px;padding:13px 0 4px}\n.vie-can-inputs{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:0 0 3px}\n.vie-can-inputs label{display:flex;flex-direction:column;gap:8px;min-width:0}\n.vie-can-inputs label>span{display:flex;justify-content:space-between;gap:6px;font-size:13px;color:var(--vie-muted)}\n.vie-can-inputs b{color:var(--vie-ink);font-weight:610}\n.vie-can-lock{font-size:12px;display:flex;align-items:center;gap:7px;color:var(--vie-muted)}\n.vie-can-lock input{width:15px;height:15px;margin:0;accent-color:var(--vie-blue)}\n.vie-can-advanced{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}\n.vie-can-advanced label{display:flex;flex-direction:column;min-width:0;gap:5px;font-size:12px;color:var(--vie-muted)}\n.vie-can-advanced input{width:100%;min-width:0;border:1px solid var(--vie-stroke);border-radius:9px;height:34px;padding:4px 9px;background:var(--vie-bg);color:var(--vie-ink);font:inherit;font-size:13px}\n.vie-can-presets{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.vie-can-presets>span{font-size:12px;color:var(--vie-muted);margin-right:5px}\n.vie-can-extra-values{display:flex;flex-wrap:wrap;gap:8px;font-size:12px;color:var(--vie-muted)}.vie-can-extra-values strong{color:var(--vie-ink);font-weight:600}\n.vie-can-compare{border-top:1px solid var(--vie-stroke);padding-top:11px}.vie-can-compare>strong{font-size:13px;font-weight:610}\n.vie-can-compare-lines{display:grid;gap:8px;margin:10px 0}.vie-can-compare-lines>div{display:grid;grid-template-columns:16px 1fr 70px;gap:9px;align-items:center;color:var(--vie-muted);font-size:12px}\n.vie-can-compare-lines b{text-align:right;color:var(--vie-ink);font-weight:600}.vie-can-mini{height:5px;border-radius:99px;background:var(--vie-layer);overflow:hidden}\n.vie-can-mini i{display:block;height:100%;background:var(--vie-blue)}.vie-can-compare-lines>div:nth-child(2) i{background:var(--vie-green)}\n.vie-can-compare p,.vie-can-formula{font-size:12px;color:var(--vie-muted);line-height:1.6;margin:6px 0}\n.vie-can-explanation{margin-top:11px;padding:10px 12px;background:var(--vie-layer);border-radius:9px;line-height:1.65;color:var(--vie-ink);font-size:13px}.vie-can-explanation[hidden]{display:none}\n.vie-shell .vie-can-why{display:inline-flex;gap:6px}\n@media(max-width:580px){.vie-body{padding:14px 14px;gap:12px}.vie-can-head{margin-bottom:12px}.vie-can-segments{gap:8px}.vie-can-segments strong{font-size:16px}.vie-can-tabs{margin-bottom:13px}.vie-can-track{height:38px}.vie-can-grab{height:39px}.vie-can-sp-indicator{top:37px}.vie-can-metrics strong{font-size:21px}.vie-can-inputs{gap:12px}.vie-can-advanced{gap:6px}.vie-can-advanced label{font-size:11px}.vie-can-guidance{font-size:12.5px}}\n@media(prefers-color-scheme:dark){.vie-shell{--vie-ink:#f2f2f3;--vie-muted:#b5b5bc;--vie-stroke:#454549;--vie-layer:#313134;--vie-bg:#242426;--vie-blue:#78aaec;--vie-green:#479c80;--vie-amber:#b79045}.vie-can-seg{color:#fff}.vie-can-tab.active{background:#444448}}\n@media(prefers-reduced-motion:reduce){.vie-shell *, .vie-shell *::before,.vie-shell *::after{transition:none!important;animation:none!important}}\n\n/* VIE 0.8: legible coordinate plots and evidence-bearing data charts. */\n.vie-chart {gap:4px}\n.vie-chart-title{font-size:13px;font-weight:600;color:var(--vie-ink)}\n.vie-chart-drawing{width:100%;min-width:0}\n.vie-chart-drawing svg{display:block;width:100%;height:auto;max-height:245px;overflow:visible}\n.vie-chart-drawing svg text{font:11px ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",sans-serif;fill:var(--vie-muted);font-variant-numeric:tabular-nums}\n.vie-chart-drawing svg .vie-axis-name{font-size:12px;font-weight:600;fill:var(--vie-ink)}\n.vie-grid-line{stroke:var(--vie-stroke);stroke-width:1;stroke-dasharray:3 4}\n.vie-data-axis{stroke:var(--vie-muted);stroke-width:1.1;opacity:.6}\n.vie-bar-item{cursor:pointer;outline:none}\n.vie-bar-item:focus .vie-data-bar{stroke:var(--vie-ink);stroke-width:2.5}\n.vie-data-bar{fill:#9cbfe5;transition:fill .12s ease,opacity .12s ease}\n.vie-data-bar.is-active{fill:var(--vie-blue)}\n.vie-bar-item:hover .vie-data-bar{fill:#6ba2dc}\n.vie-chart-drawing svg .vie-bar-value{font-weight:600;font-size:11px;fill:var(--vie-ink)}\n.vie-chart-note{font-size:12.5px;line-height:1.5;color:var(--vie-ink);min-height:20px}\n.vie-chart-footer{display:flex;gap:8px;flex-wrap:wrap;justify-content:space-between;color:var(--vie-muted);font-size:11px}\n.vie-raw-data{border-top:1px solid var(--vie-stroke);margin-top:5px;padding-top:7px;font-size:12px;color:var(--vie-muted)}\n.vie-raw-data summary{cursor:pointer;list-style:none;width:max-content}\n.vie-raw-data summary::before{content:'＋';margin-right:6px}\n.vie-raw-data[open] summary::before{content:'－'}\n.vie-data-table{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding-top:12px}\n.vie-data-table>div{display:flex;flex-direction:column;gap:2px;padding:7px 9px;background:var(--vie-layer);border-radius:9px}\n.vie-data-table strong{font-size:13px;color:var(--vie-ink);font-weight:610}\n@media(max-width:450px){.vie-chart-drawing svg{max-height:225px}.vie-chart-note{font-size:12px}.vie-data-table{grid-template-columns:repeat(2,minmax(0,1fr))}}\n\n/* Context handoff remains invisible until a value changes; no extra default UI. */\n.vie-context-row{display:flex;gap:8px;align-items:center;justify-content:flex-end;flex-wrap:wrap;margin-top:2px;font-size:11px;color:var(--vie-muted)}\n.vie-context-button{font:500 12px system-ui,sans-serif;color:var(--vie-muted);border:1px solid var(--vie-stroke);background:transparent;border-radius:999px;padding:5px 10px;cursor:pointer}\n.vie-context-button:hover{color:var(--vie-ink);background:var(--vie-layer)}\n.vie-context-button:focus-visible{outline:2px solid var(--vie-blue);outline-offset:2px}\n\n.vie-error{padding:9px 12px;border:1px solid var(--vie-stroke);border-radius:10px;font:13px system-ui,sans-serif;color:var(--vie-muted)}\n\n/* VIE 0.13: generic semantics-first visual grammar */\n.vie-visual-host{min-width:0;width:100%}\n.vie-visual-panel{display:flex;flex-direction:column;gap:9px;min-width:0;color:var(--vie-ink);font:inherit}\n.vie-visual-heading{display:flex;align-items:center;gap:9px;justify-content:space-between;font-size:14px;line-height:1.45}\n.vie-visual-heading strong{font-weight:660}\n.vie-visual-subtitle{font-size:12.5px;line-height:1.5;color:var(--vie-muted);margin:0}\n.vie-visual-content{background:var(--vie-bg);min-width:0;border-radius:12px;overflow:hidden}\n.vie-visual-svg{width:100%;height:auto;max-height:440px;display:block;overflow:visible}\n.vie-visual-svg text{font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;paint-order:stroke}\n.vie-visual-hint{font-size:11.5px;color:var(--vie-muted);line-height:1.5}\n.vie-visual-selected{padding:10px 12px;border-radius:10px;background:var(--vie-layer);display:flex;gap:10px;flex-wrap:wrap;align-items:center;font-size:12.5px}\n.vie-visual-selected strong{font-size:13px;color:var(--vie-ink)}.vie-visual-selected span{color:var(--vie-muted)}\n.vie-visual-accuracy{font-size:11px;color:var(--vie-muted)}\n.vie-svg-item{outline:none;cursor:pointer}.vie-svg-item:focus-visible>rect,.vie-svg-item:hover>rect{stroke:#5285be;stroke-width:2.6}\n.vie-svg-item:focus-visible>circle,.vie-svg-item:hover>circle{stroke:#5285be;stroke-width:3}\n.vie-visual-mobile-list{display:none;flex-wrap:wrap;gap:7px}\n.vie-visual-mobile-list button{border:1px solid var(--vie-stroke);border-radius:999px;background:transparent;padding:6px 10px;color:var(--vie-ink);font:inherit;font-size:12px;cursor:pointer}\n.vie-visual-mobile-list button.is-active{border-color:var(--vie-blue);background:var(--vie-layer)}\n.vie-timeline-list{display:flex;gap:9px;overflow-x:auto;padding:4px 0 10px;scroll-snap-type:x proximity}\n.vie-timeline-item{position:relative;flex:1;min-width:94px;min-height:98px;border:1px solid var(--vie-stroke);border-radius:12px;background:var(--vie-bg);display:flex;flex-direction:column;gap:7px;align-items:flex-start;padding:12px 10px;text-align:left;color:var(--vie-ink);font:inherit;cursor:pointer;scroll-snap-align:start}\n.vie-timeline-item.is-active{border-color:var(--vie-blue);background:var(--vie-layer)}\n.vie-timeline-step{width:23px;height:23px;display:grid;place-items:center;border-radius:50%;background:var(--vie-layer);color:var(--vie-ink);font-size:11px;font-weight:600}\n.vie-timeline-when{font-size:11px;color:var(--vie-muted)}.vie-timeline-item strong{font-size:12px;line-height:1.4;font-weight:600}\n@media(max-width:550px){.vie-visual-svg{max-height:290px}.vie-visual-panel[data-vie-visual='RelationGraph'] .vie-visual-svg{max-height:230px}.vie-visual-mobile-list{display:flex}.vie-timeline-list{gap:7px}.vie-timeline-item{min-width:110px;flex:0 0 44%}}\n@media(prefers-reduced-motion:reduce){.vie-visual-panel *, .vie-visual-panel *::after,.vie-visual-panel *::before{animation:none!important;transition:none!important}}\n\n.vie-visual-legend{display:flex;flex-wrap:wrap;gap:6px}.vie-visual-legend button{font:inherit;font-size:11.5px;border:1px solid var(--vie-stroke);background:var(--vie-bg);color:var(--vie-ink);border-radius:999px;padding:5px 10px;cursor:pointer}.vie-visual-legend button.is-active{background:var(--vie-layer);border-color:var(--vie-blue)}\n\n.vie-visual-mobile-svg{display:none}\n@media(max-width:550px){.vie-visual-desktop-svg{display:none}.vie-visual-mobile-svg{display:block;max-height:none}.vie-visual-panel[data-vie-visual=\"Diagram\"] .vie-visual-content{overflow-x:auto}.vie-visual-panel[data-vie-visual=\"Diagram\"] .vie-visual-svg{min-width:450px;max-height:300px}}\n\n/* 0.14.1 runtime diagnostics and compact accessibility. */\n.vie-runtime-diagnostics{border:1px solid var(--vie-stroke);background:var(--vie-layer);border-radius:9px;padding:7px 10px;color:var(--vie-muted);font-size:12px;line-height:1.5}.vie-runtime-diagnostics p{margin:2px 0}.vie-error pre{white-space:pre-wrap;word-break:break-word;font-size:11px}.vie-error details{margin-top:7px}.vie-error summary{cursor:pointer}.vie-row{grid-template-columns:repeat(2,minmax(0,1fr))}@media(max-width:370px){.vie-row{grid-template-columns:minmax(0,1fr)}}\n\n/* Empty diagnostic holders must not reserve card space. */\n.vie-runtime-diagnostics:empty,.vie-diagnostics:empty{display:none}\n\n/* VIE 0.15.2: quiet, readable captions beneath optional single-scene visuals. */\n.vie-figure-caption{font-size:12px;line-height:1.65;color:var(--vie-muted,#64748b);margin:6px 0 2px;overflow-wrap:anywhere}\n.vie-annotated-surface{min-width:0;max-width:100%}\n@media (max-width:390px){.vie-figure-caption{font-size:11px}}\n\n/* 0.16 declarative responsive split; no untrusted freeform CSS. */\n.vie-split{display:grid;grid-template-columns:minmax(0,var(--vie-split-ratio,50%)) minmax(0,1fr);gap:12px;align-items:start}\n.vie-split>*{min-width:0}\n@media(max-width:600px){.vie-split{grid-template-columns:minmax(0,1fr)}}\n@media(prefers-reduced-motion:reduce){.vie-split *{scroll-behavior:auto}}\n\n/* Chat-scale visual experiments: one primary visual, one light control row, one takeaway. */\n.vie-semantic-host{width:100%;min-width:0}\n.vie-semantic-lab{min-width:0;color:var(--vie-ink)}\n.vie-lab-head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:12px}\n.vie-lab-head h3{font-size:16px;letter-spacing:-.025em;line-height:1.35;margin:0 0 3px;font-weight:650}\n.vie-lab-head p{margin:0;color:var(--vie-muted);font-size:12.5px;line-height:1.5}\n.vie-lab-head button{flex-shrink:0}\n.vie-lab-visual{min-width:0;margin:1px 0 12px}\n.vie-lab-svg{display:block;width:100%;max-height:175px;height:auto;overflow:visible}\n.vie-lab-explain{font-size:12.5px;line-height:1.6;color:var(--vie-ink);margin:11px 0 0}\n.vie-lab-controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 18px}\n.vie-lab-controls:empty{display:none}\n.vie-lab-slider{display:flex;flex-direction:column;min-width:0;gap:4px}\n.vie-lab-slider>span{font-size:12px;display:flex;justify-content:space-between;gap:8px;color:var(--vie-muted)}\n.vie-lab-slider b{color:var(--vie-ink);font-weight:650;font-variant-numeric:tabular-nums}\n.vie-lab-slider input{width:100%;margin:3px 0 0;accent-color:var(--vie-blue);cursor:pointer;min-height:22px}\n.vie-lab-pills{display:flex;align-items:center;gap:7px;flex-wrap:wrap}\n.vie-lab-pills .selected{background:var(--vie-layer)!important;border-color:#d6dbe1!important}\n.vie-bit-panel{padding:8px 0}\n.vie-bit-row{display:grid;grid-template-columns:28px minmax(0,1fr) 34px;gap:7px;align-items:center;margin:6px 0}\n.vie-bit-row>span{color:var(--vie-muted);font-size:12px;font-weight:650}\n.vie-bit-row>small{text-align:right;color:var(--vie-muted);font-variant-numeric:tabular-nums}\n.vie-bit-cells{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:4px}\n.vie-bit{min-width:0;height:34px;padding:0!important;border:1px solid var(--vie-stroke)!important;border-radius:7px!important;background:var(--vie-layer)!important;font:600 14px ui-monospace,monospace!important;color:var(--vie-ink)!important;cursor:pointer}\n.vie-bit:hover{border-color:var(--vie-blue)!important}\n.vie-bit-result{display:flex;align-items:center;justify-content:center;height:34px;background:var(--vie-layer);border-radius:7px;font:650 14px ui-monospace,monospace}\n.vie-bit-result.on{background:#e7f2ff;color:#237ac3}\n.vie-bit-separator{height:1px;background:var(--vie-stroke);margin:9px 37px 9px 35px}\n.vie-outcomes{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin:13px 0 15px}\n.vie-outcome{min-width:0;border-radius:10px!important;background:var(--vie-layer)!important;border:1px solid var(--vie-stroke)!important;min-height:53px;color:var(--vie-ink)!important;font:650 18px ui-sans-serif,system-ui!important;cursor:pointer}\n.vie-outcome.chosen{background:#e9f3ff!important;border-color:#83b5e8!important;color:#1767ac!important}\n.vie-prob-bar{height:12px;background:var(--vie-layer);border-radius:50px;overflow:hidden}\n.vie-prob-bar>div{background:#4a8bd1;height:100%;border-radius:50px;transition:width .12s}\n.vie-prob-label{display:flex;justify-content:space-between;font-size:12px;color:var(--vie-muted);margin-top:7px}\n.vie-prob-label strong{color:var(--vie-blue);font-weight:650}\n@media(max-width:440px){.vie-lab-controls{gap:13px;grid-template-columns:1fr}.vie-outcomes{gap:4px}.vie-outcome{min-height:45px}.vie-bit-cells{gap:2px}.vie-bit{height:32px}.vie-lab-head p{font-size:12px}}\n/* Shared native-like range controls: neutral track, quiet round thumb. */\n.vie-shell .vie-lab-slider input[type=\"range\"]{appearance:none;-webkit-appearance:none;height:20px;background:transparent;margin:1px 0 0}\n.vie-shell .vie-lab-slider input[type=\"range\"]::-webkit-slider-runnable-track{height:5px;border-radius:50px;background:#eaecef}\n.vie-shell .vie-lab-slider input[type=\"range\"]::-moz-range-track{height:5px;border-radius:50px;background:#eaecef}\n.vie-shell .vie-lab-slider input[type=\"range\"]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;margin-top:-5.5px;border-radius:50%;background:white;border:1px solid #d7d9dd;box-shadow:0 1px 4px #0000001c}\n.vie-shell .vie-lab-slider input[type=\"range\"]::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:white;border:1px solid #d7d9dd;box-shadow:0 1px 4px #0000001c}\n.vie-shell .vie-lab-slider input[type=\"range\"]:focus-visible{outline:2px solid var(--vie-blue);outline-offset:4px;border-radius:4px}\n\n/* Intelligent-UI-style vector explorer: the diagram is the lesson, not a mini dashboard. */\n.vie-lab-vector {\n  --vie-vector-main:#367eea;\n  --vie-vector-x:#2e9c7c;\n  --vie-vector-y:#d6a04b;\n  --vie-vector-axis:#9ba5b3;\n  --vie-vector-grid:rgba(145,159,175,.18);\n  --vie-vector-angle:#718399;\n  --vie-vector-tip-ring:#fff;\n}\n.vie-lab-vector .vie-lab-head{margin-bottom:5px}\n.vie-vector-stage{display:grid;grid-template-columns:minmax(0,1fr) minmax(142px,172px);align-items:center;gap:7px 12px;min-width:0}\n.vie-vector-canvas{position:relative;min-width:0;display:flex;align-items:center;justify-content:center}\n.vie-vector-svg{width:100%;height:auto;max-width:410px;max-height:242px;display:block;overflow:visible;touch-action:pan-y}\n.vie-vector-svg [data-vector-handle]{cursor:grab;outline:none;touch-action:none}\n.vie-vector-svg [data-vector-handle].dragging{cursor:grabbing}\n.vie-vector-svg [data-vector-handle]:focus-visible{stroke:var(--vie-vector-main);stroke-width:2;stroke-dasharray:3 3}\n.vie-vector-tick{font-size:10.5px;fill:var(--vie-muted);font-variant-numeric:tabular-nums}\n.vie-vector-axis-label{font-size:12px;fill:var(--vie-muted);font-weight:550}\n.vie-vector-arc-label{font-size:11px;fill:var(--vie-vector-angle);text-anchor:middle;font-variant-numeric:tabular-nums}\n.vie-vector-coordinate{font-size:10.5px;fill:var(--vie-ink);font-variant-numeric:tabular-nums;font-weight:550}\n.vie-vector-hint{display:inline-flex;align-items:center;gap:4px;position:absolute;left:11px;bottom:8px;color:var(--vie-muted);font-size:11px;pointer-events:none}\n.vie-vector-insights{min-width:0;display:flex;flex-direction:column;gap:13px;padding:2px 0 2px 13px;border-left:1px solid var(--vie-stroke)}\n.vie-vector-meta span{color:var(--vie-muted);font-size:11.5px;display:block;margin-bottom:3px}\n.vie-vector-meta strong{display:block;font-size:15px;font-weight:660;letter-spacing:-.018em;font-variant-numeric:tabular-nums}\n.vie-vector-metric-label{display:flex;align-items:center;gap:7px;color:var(--vie-muted);font-size:11.5px;white-space:nowrap}\n.vie-vector-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--vie-vector-x);flex-shrink:0}\n.vie-vector-metric.y .vie-vector-dot{background:var(--vie-vector-y)}\n.vie-vector-metric>strong{font-size:23px;line-height:1.2;letter-spacing:-.035em;display:block;font-weight:650;font-variant-numeric:tabular-nums;color:var(--vie-ink);margin-top:3px}\n.vie-vector-metric>small{font-size:10.5px;color:var(--vie-muted)}\n.vie-lab-vector .vie-vector-controls{margin:2px 0 0;gap:8px 19px}\n.vie-lab-vector .vie-vector-explain{margin:7px 0 0;color:var(--vie-muted);font-size:12px}\n@media(max-width:560px){\n .vie-vector-stage{grid-template-columns:minmax(0,1fr);gap:0}\n .vie-vector-svg{max-height:205px;max-width:325px}\n .vie-vector-insights{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px;padding:3px 0 9px;border:0;border-bottom:1px solid var(--vie-stroke)}\n .vie-vector-meta{align-self:center}\n .vie-vector-meta strong{font-size:13px}\n .vie-vector-metric-label{font-size:10px;gap:3px;white-space:normal}\n .vie-vector-metric>strong{font-size:18px;margin-top:2px}\n .vie-vector-metric>small{display:none}\n .vie-vector-hint{bottom:2px;left:0}\n .vie-lab-vector .vie-vector-controls{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:12px}\n .vie-lab-vector .vie-vector-explain{font-size:11.5px}\n}\n\n/* Stable completed-Turn surface; keeps the visual aid outside folded work steps. */\n.vie-tail{display:grid;gap:12px;margin:9px 0 16px;max-width:100%;min-width:0}\n.vie-tail-item{min-width:0}\n.vie-tail-label{font-size:12px;font-weight:600;color:var(--vie-text,#293342);margin:0 0 6px 2px}\n.vie-published-marker{display:inline-block;font-size:11px;color:var(--vie-muted,#64748b);padding:5px 1px}\n\n/* VIE 0.14: semantic multi-panel answers and motion controls */\n.vie-animation-controls{display:flex;gap:9px;align-items:center;margin:9px 0 3px;padding:7px 2px;min-width:0}\n.vie-animation-controls>button{border:1px solid var(--vie-border,#e5e9ef);background:var(--vie-layer,#f8f9fb);border-radius:999px;padding:5px 12px;color:inherit;white-space:nowrap;cursor:pointer;font:inherit;font-size:12px}\n.vie-animation-controls>button:focus-visible{outline:2px solid #4789db;outline-offset:2px}\n.vie-animation-controls>input{flex:1;min-width:36px;accent-color:#4c82c9;cursor:pointer;touch-action:pan-y}\n.vie-animation-controls>span{min-width:38px;font-size:11px;font-variant-numeric:tabular-nums;color:var(--vie-muted,#6c7987);text-align:right}\n.vie-visual-content svg [data-vie-shape]{transform-box:view-box}\n.vie-visual-host .vie-visual-panel{margin-bottom:5px}\n@media(max-width:380px){.vie-animation-controls{gap:5px}.vie-animation-controls>button{padding:5px 9px;font-size:11px}}\n\n/* VIE 0.16.1 article-flow for multi-panel stories inside the persistent turn tail. */\n.vie-body--article { border:0; border-radius:0; background:transparent; padding:4px 0; gap:18px }\n.vie-body--article > .vie-text {padding:2px 1px; max-width:72ch}\n.vie-body--article > .vie-text p {font-size:15px;line-height:1.8;color:var(--vie-ink);white-space:pre-line;overflow-wrap:anywhere}\n.vie-body--article > .vie-visual-host {border:1px solid var(--vie-stroke);background:var(--vie-bg);border-radius:14px;padding:12px}\n.vie-visual-warning{font-size:12px;color:#a46d2f;margin:4px 0}\n@media(max-width:420px){.vie-body--article > .vie-text p {font-size:14px;line-height:1.75}.vie-body--article > .vie-visual-host{padding:7px}}\n@media(prefers-reduced-motion:reduce){.vie-body--article *{scroll-behavior:auto!important;transition:none!important}}\n\n.vie-answer{min-width:0;margin:10px 0 18px}.vie-answer:empty{display:none}.vie-generation-status{font-size:12px;color:var(--vie-muted,#718096);margin:6px 0}.vie-general-chart{border:1px solid var(--vie-stroke,#dde3eb);border-radius:14px;padding:14px;min-width:0}.vie-general-chart header{display:flex;align-items:center;justify-content:space-between;gap:12px}.vie-general-chart h3{font-size:15px;margin:0}.vie-general-chart button{font:inherit;border:1px solid var(--vie-stroke,#dde3eb);border-radius:8px;background:transparent;color:inherit;padding:5px 10px;cursor:pointer}.vie-general-chart svg{display:block;width:100%;height:auto;overflow:visible}.vie-general-chart text{font:11px system-ui;fill:var(--vie-muted,#718096)}.vie-general-chart-grid{stroke:var(--vie-stroke,#dde3eb);stroke-width:.7;fill:none}.vie-general-chart-axis{stroke:var(--vie-muted,#718096);fill:none}.vie-general-chart-legend{display:flex;gap:12px;flex-wrap:wrap;font-size:12px}.vie-general-chart-legend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:5px}.vie-general-chart-controls{display:flex;gap:14px;flex-wrap:wrap;margin-top:12px}.vie-general-chart-controls label{display:flex;flex-direction:column;flex:1 1 160px;gap:5px;font-size:12px}.vie-general-chart-controls input{width:100%;accent-color:#4d82d6}.vie-general-chart-note,.vie-general-chart [data-chart-error]{font-size:12px;color:var(--vie-muted,#718096);line-height:1.6}.vie-general-chart [data-chart-error]:empty{display:none}\n\n/* VIE 0.18: focused conversational experiments. Every selector is scoped. */\n.vie-shell{font-family:ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",\"Microsoft YaHei\",sans-serif}\n:where([data-theme=dark],.dark) .vie-shell{--vie-ink:var(--dsw-alias-text-primary,#edf1f6);--vie-muted:var(--dsw-alias-text-secondary,#a9b4c4);--vie-stroke:var(--dsw-alias-border-l2,#394452);--vie-layer:var(--dsw-alias-background-secondary,#242c37);--vie-bg:var(--dsw-alias-background-primary,#1c232d)}\n[data-theme=light] .vie-shell{--vie-ink:var(--dsw-alias-text-primary,#222326);--vie-muted:var(--dsw-alias-text-secondary,#777980);--vie-stroke:var(--dsw-alias-border-l2,#e7e7e9);--vie-layer:var(--dsw-alias-background-secondary,#f6f6f7);--vie-bg:var(--dsw-alias-background-primary,#fff)}\n.vie-body:has(>.vie-experiment-host):not(.vie-body--article){border:0;padding:0;background:transparent}\n.vie-experiment-host{min-width:0;width:100%;container-type:inline-size}\n.vie-experiment{--scene-sun:#dc930e;--scene-planet:#009f96;--scene-ring:#5483ef;--scene-carrier:#9475c8;color:var(--vie-ink);font-size:13px;width:100%;min-width:0}\n.vie-experiment button,.vie-experiment select{font:inherit;color:inherit}\n.vie-case-tabs{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 9px}\n.vie-case-tabs button,.vie-scene-button{border:1px solid var(--vie-stroke);background:var(--vie-bg);border-radius:9px;padding:8px 11px;min-height:34px;cursor:pointer;font-size:12px;line-height:1.25}\n.vie-case-tabs button[aria-selected=true],.vie-scene-button.is-primary{border-color:#6f9bff;background:color-mix(in srgb,#5483ef 7%,var(--vie-bg));color:var(--vie-ink)}\n.vie-experiment button:focus-visible,.vie-experiment input:focus-visible,.vie-experiment select:focus-visible{outline:2px solid #4e8ef7;outline-offset:3px}\n.vie-experiment button:disabled{opacity:.45;cursor:default}\n.vie-scene-panel{border:1px solid var(--vie-stroke);border-radius:14px;background:color-mix(in srgb,var(--vie-layer) 48%,var(--vie-bg));padding:13px 15px 10px;min-width:0}\n.vie-scene-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}\n.vie-scene-heading h3{font-size:15px;line-height:1.45;font-weight:650;margin:0 0 4px;letter-spacing:-.02em}\n.vie-scene-subtitle{font-size:12px;line-height:1.55;color:var(--vie-muted);margin:0}\n.vie-scene-status{font-size:11px;white-space:nowrap;border:1px solid var(--vie-stroke);border-radius:7px;padding:5px 7px;background:var(--vie-bg);color:var(--vie-muted)}\n.vie-scene-stage{position:relative;min-width:0;display:flex;justify-content:center;align-items:center;padding:6px 0 0}\n.vie-scene-stage>svg{display:block;width:100%;height:auto;max-height:370px;overflow:visible}\n.vie-scene-stage .vie-visual-panel{width:100%;background:transparent;border:0;padding:0}\n.vie-scene-legend{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;font-size:11px;margin:3px 0 1px;color:var(--vie-muted)}\n.vie-scene-legend>span{display:inline-flex;align-items:center;gap:4px}\n.vie-scene-dot{width:7px;height:7px;border-radius:50%;display:inline-block;background:currentColor}\n.vie-scene-note{text-align:center;color:var(--vie-muted);font-size:11px;line-height:1.5;margin:3px 0 7px}\n.vie-scene-toolbar{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin:10px 0}\n.vie-scene-toolbar>button{flex-shrink:0}\n.vie-scene-speed{display:flex;align-items:center;gap:7px;min-width:130px;flex:1;color:var(--vie-muted);font-size:11px}\n.vie-scene-speed input{min-width:40px;width:100%;accent-color:#658ef4}\n.vie-scene-speed>span{white-space:nowrap}\n.vie-experiment input[data-scene-input]{appearance:none;-webkit-appearance:none;height:20px;background:transparent;cursor:pointer;margin:0}\n.vie-experiment input[data-scene-input]::-webkit-slider-runnable-track{height:6px;background:var(--vie-stroke);border-radius:99px}\n.vie-experiment input[data-scene-input]::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:15px;height:15px;border:1px solid #ccd3dd;border-radius:50%;margin-top:-4.5px;background:var(--vie-bg);box-shadow:0 1px 3px #0002}\n.vie-experiment input[data-scene-input]::-moz-range-track{height:6px;background:var(--vie-stroke);border-radius:99px}\n.vie-experiment input[data-scene-input]::-moz-range-thumb{width:14px;height:14px;border:1px solid #ccd3dd;border-radius:50%;background:var(--vie-bg)}\n.vie-scene-speed output{min-width:30px;font-variant-numeric:tabular-nums}\n.vie-scene-readouts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}\n.vie-scene-readout{border:1px solid var(--vie-stroke);border-radius:11px;padding:12px 8px 10px;text-align:center;min-width:0;background:var(--vie-bg)}\n.vie-scene-readout small{display:block;font-size:11px;color:var(--vie-muted);overflow-wrap:anywhere}\n.vie-scene-readout strong{display:block;font-size:21px;line-height:1.55;font-weight:650;font-variant-numeric:tabular-nums;color:var(--readout-color,var(--vie-ink));letter-spacing:-.02em}\n.vie-scene-readout span{display:block;font-size:10px;color:var(--vie-muted)}\n.vie-scene-insight{font-size:13px;line-height:1.75;margin:11px 1px 0;color:var(--vie-ink);overflow-wrap:anywhere}\n.vie-scene-details{margin:10px 1px 0;color:var(--vie-muted);font-size:12px;line-height:1.7}\n.vie-scene-details summary{cursor:pointer;width:max-content;max-width:100%}\n.vie-scene-details p{margin:6px 0}\n.vie-scene-controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 18px;margin:12px 0 3px}\n.vie-scene-control{display:flex;flex-direction:column;gap:5px;min-width:0}\n.vie-scene-control span{display:flex;justify-content:space-between;gap:8px;color:var(--vie-muted);font-size:12px}\n.vie-scene-control input{width:100%;accent-color:#5483ef}\n.vie-scene-control output{color:var(--vie-ink);font-variant-numeric:tabular-nums}\n.vie-process-choices{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0 0}\n.vie-process-choices:empty{display:none}\n.vie-scene-progress{font-size:12px;color:var(--vie-muted);font-variant-numeric:tabular-nums}\n.vie-runtime-diagnostics{font-size:12px;line-height:1.6;color:#a46d2f}\n.vie-body--article>.vie-experiment-host{padding:0;border:0;background:transparent}\n.vie-visual-selected{overflow-wrap:anywhere}\n.vie-visual-subtitle,.vie-figure-caption,.vie-tail-label{overflow-wrap:anywhere}\n.vie-visual-heading{gap:8px;flex-wrap:wrap}\n.vie-visual-accuracy{font-size:10px!important;white-space:normal}\n.vie-scene-svg-label{font-family:inherit;font-size:12px;fill:var(--vie-muted)}\n.vie-scene-vector .vie-lab-head,.vie-scene-vector .vie-vector-insights,.vie-scene-vector .vie-vector-explain{display:none}\n.vie-scene-vector .vie-vector-stage{grid-template-columns:minmax(0,1fr)}\n.vie-scene-vector .vie-vector-svg{max-height:290px;max-width:430px}\n.vie-experiment[data-scene-template=process] .vie-visual-heading,.vie-experiment[data-scene-template=process] .vie-visual-selected{display:none}\n.vie-experiment .vie-scene-stage text.vie-axis-label{font-size:11px;fill:var(--vie-muted)}\n@container(max-width:440px){.vie-scene-panel{padding:11px 10px 8px}.vie-scene-heading h3{font-size:13px}.vie-scene-subtitle{font-size:11px}.vie-case-tabs{gap:5px}.vie-case-tabs button{padding:8px;font-size:11px}.vie-scene-status{font-size:10px;padding:4px}.vie-scene-toolbar{gap:5px}.vie-scene-toolbar .vie-scene-button{padding:8px;font-size:11px}.vie-scene-speed{min-width:100%;order:2;padding:0 3px}.vie-scene-readouts{gap:6px}.vie-scene-readout{padding:10px 5px}.vie-scene-readout strong{font-size:19px}.vie-scene-readout small{font-size:10px}.vie-scene-legend{gap:8px}.vie-scene-insight{font-size:12px}.vie-scene-controls{gap:10px}.vie-scene-stage>svg{max-height:300px}}\n@media(prefers-reduced-motion:reduce){.vie-experiment *{transition:none!important;scroll-behavior:auto!important}}\n.vie-scene-parameters{margin:13px 1px 0;font-size:13px;color:var(--vie-muted)}\n.vie-scene-parameters>summary{cursor:pointer;width:max-content;max-width:100%}\n.vie-scene-parameters .vie-scene-controls{margin:10px 0 0}\n.vie-experiment[data-scene-template=geartrain] .vie-scene-stage>svg{max-height:330px}\n.vie-experiment[data-scene-template=geartrain] .vie-scene-panel{padding-bottom:13px}\n.vie-scene-readout small{font-size:12px;line-height:1.55}\n.vie-scene-readout span{font-size:11px;line-height:1.5}\n.vie-scene-legend{font-size:12px}\n.vie-scene-parameters .vie-scene-control span{font-size:13px}\n.vie-visual-zoom{display:flex;gap:6px;align-items:center;color:var(--vie-muted);font-size:12px}\n.vie-visual-zoom button{font:inherit;background:var(--vie-bg);color:var(--vie-ink);border:1px solid var(--vie-stroke);border-radius:7px;min-height:32px;padding:4px 10px;cursor:pointer}\n.vie-visual-zoom output{margin-left:auto;font-variant-numeric:tabular-nums}\n.vie-visual-panel:is([data-vie-visual=Diagram],[data-vie-visual=Animation]) .vie-visual-content{overflow:auto;max-height:520px;overscroll-behavior:contain}\n.vie-visual-zoom button:focus-visible{outline:2px solid #4e8ef7;outline-offset:2px}\n@container(max-width:440px){.vie-scene-readout small{font-size:12px}.vie-scene-readout span{font-size:11px}.vie-scene-legend{font-size:12px}.vie-scene-toolbar .vie-scene-button{font-size:12px}.vie-scene-subtitle{font-size:12px}.vie-scene-insight{font-size:13px}.vie-scene-panel{padding:12px 11px}.vie-scene-heading{gap:7px}.vie-scene-status{white-space:normal;text-align:right;font-size:11px;max-width:96px}.vie-visual-panel:is([data-vie-visual=Diagram],[data-vie-visual=Animation]) .vie-visual-content{max-height:360px}}\n.vie-generated-figure{min-width:0;max-width:100%;border:1px solid var(--vie-stroke);border-radius:13px;overflow:hidden;background:var(--vie-bg)}\n.vie-generated-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px 4px}\n.vie-generated-heading h3{font-size:15px;line-height:1.5;margin:0;color:var(--vie-ink)}\n.vie-generated-figure iframe{display:block;width:100%;max-width:100%;border:0;background:transparent}\n.vie-generated-error{margin:8px 14px 12px;color:#b84a38;font-size:12px;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere}\n.vie-body--article>.vie-generated-figure{padding:0}\n\n/* Shared visual vocabulary; scoped to the plugin and inherited by generic graphics. */\n.vie-shell{--vie-primary:#4d82d6;--vie-secondary:#149f91;--vie-accent:#d58b16;--vie-warning:#cf6854;--vie-radius:12px;--vie-gap:12px;--vie-blue:var(--vie-primary);--vie-green:var(--vie-secondary);--vie-amber:var(--vie-accent);font-size:14px;line-height:1.6}\n.vie-shell{--vie-muted:#626874}\n:where([data-theme=dark],.dark) .vie-shell{--vie-muted:#aeb8c8}\n.vie-figure-actions{display:flex;flex:0 0 auto;gap:8px;flex-wrap:wrap;justify-content:flex-start;align-items:center;width:100%;min-width:0}.vie-generated-heading{flex-direction:column;align-items:stretch;justify-content:flex-start;gap:12px;flex-wrap:nowrap;padding:16px 14px 10px}.vie-generated-heading h3{min-width:0;max-width:100%;overflow-wrap:anywhere}.vie-figure-actions button{position:static;float:none;flex:0 0 auto;margin:0;min-width:44px;min-height:32px;white-space:nowrap}\n/* Harness-owned windows/panes can expand without setting any VIE expansion class. */\n[data-windows-titlebar] .vie-generated-heading,[data-sidebar-right-panel='fullscreen'] .vie-generated-heading{padding-top:max(16px,var(--dsh-windows-titlebar-height,40px))}\n.vie-figure-viewport{width:100%;overflow:auto;scrollbar-width:none}.vie-figure-viewport::-webkit-scrollbar{display:none}.vie-figure-viewport:focus-visible{outline:2px solid var(--vie-primary)}\n.vie-figure-expanded{position:fixed;inset:max(96px,env(safe-area-inset-top,0px)) 12px 12px;z-index:1200;overflow:auto;background:var(--vie-bg,#fff);box-shadow:0 0 0 100vmax #0008;scrollbar-width:none}\n.vie-figure-expanded .vie-generated-heading{position:sticky;top:0;z-index:2;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:12px;background:var(--vie-bg,#fff);padding:16px}\n.vie-figure-expanded .vie-generated-heading h3{min-width:0;max-width:100%;margin:0;overflow-wrap:anywhere;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}\n.vie-figure-expanded .vie-figure-actions{width:100%;min-width:0;justify-content:flex-start;align-items:center;gap:8px;flex-wrap:wrap}\n.vie-figure-expanded .vie-figure-actions button{position:static;float:none;flex:0 0 auto;max-width:100%;margin:0}\n.vie-figure-expanded::-webkit-scrollbar{display:none}.vie-figure-hint{color:var(--vie-muted);font-size:12px;margin:0 0 8px}\n.vie-native-frame{min-width:0;max-width:100%;border:1px solid var(--vie-stroke);border-radius:var(--vie-radius);background:var(--vie-bg)}\n.vie-native-frame>.vie-generated-heading{padding:10px 12px 4px}\n.vie-native-frame>.vie-visual-host{padding:12px;box-sizing:border-box}\n.vie-native-frame .vie-general-chart{border:0}\n[data-windows-titlebar] .vie-native-frame>.vie-generated-heading,[data-sidebar-right-panel='fullscreen'] .vie-native-frame>.vie-generated-heading{padding-top:max(16px,var(--dsh-windows-titlebar-height,40px))}\n.vie-native-frame.vie-figure-expanded>.vie-generated-heading{padding:16px}\n.vie-native-frame.vie-figure-expanded .vie-visual-svg,.vie-native-frame.vie-figure-expanded .vie-visual-content{max-height:none}\n:where([data-theme=dark],.dark) .vie-shell{--vie-primary:#83afff;--vie-secondary:#59cebb;--vie-accent:#efba62;--vie-warning:#f69b8c}\n.vie-body{gap:var(--vie-gap)}\n.vie-card,.vie-general-chart,.vie-generated-figure{border-radius:var(--vie-radius);min-width:0}\n.vie-control input[type=number]{width:100%;min-width:0;min-height:36px;padding:6px 10px;border:1px solid var(--vie-stroke);border-radius:8px;background:var(--vie-bg);color:var(--vie-ink);font:inherit;font-variant-numeric:tabular-nums}\n.vie-control input[type=checkbox]{width:20px;height:20px;accent-color:var(--vie-primary);cursor:pointer}\n.vie-segmented{display:flex;gap:5px;flex-wrap:wrap;min-width:0}\n.vie-segmented button{flex:1 1 auto;min-height:36px;border:1px solid var(--vie-stroke);border-radius:8px;background:var(--vie-bg);color:var(--vie-muted);font:inherit;font-size:12px;padding:6px 10px;cursor:pointer;overflow-wrap:anywhere}\n.vie-segmented button[aria-pressed=true]{border-color:var(--vie-primary);color:var(--vie-primary);background:color-mix(in srgb,var(--vie-primary) 10%,var(--vie-bg))}\n.vie-visual-svg text{fill:var(--vie-ink);font-family:inherit}\n.vie-general-chart-controls{gap:var(--vie-gap)}\n.vie-general-chart-legend{gap:8px 14px;flex-wrap:wrap}\n.vie-control-label{flex-wrap:wrap}.vie-control-label>span{overflow-wrap:anywhere}\n.vie-row>.vie-generated-figure,.vie-row>div{min-width:0}\n.vie-generated-figure iframe{border-radius:8px;background:var(--vie-bg)}\n.vie-mode-control{display:inline-flex;align-items:center;min-width:0;gap:5px;font-size:13px}\n.vie-mode-trigger{display:flex;align-items:center;gap:4px;min-width:0;max-width:220px;height:28px;padding:0 4px 0 8px;border:none;border-radius:var(--dsw-radius-sm,6px);outline:none;background:transparent;color:var(--dsw-alias-label-secondary,#606776);font:400 13px/20px system-ui,sans-serif;cursor:pointer}\n.vie-mode-trigger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,#f0f2f5)}\n.vie-mode-trigger:focus-visible{box-shadow:0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary,#5483ef))}\n.vie-mode-trigger:disabled{color:var(--dsw-alias-label-dimmed,#a3a8b2);cursor:default}\n.vie-mode-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.vie-mode-chevron{flex:0 0 auto;color:var(--dsw-alias-label-caption,#8a919d);transition:transform 120ms ease}\n.vie-mode-trigger[aria-expanded=true] .vie-mode-chevron{transform:rotate(180deg)}\n.vie-mode-menu{z-index:1100;min-width:168px;padding:4px;border:0;border-radius:var(--dsw-radius-lg,12px);background:var(--dsw-menu-surface-fill,#fff);color:var(--dsw-alias-label-primary,#242933);box-shadow:var(--dsw-elevation-prominent,0 8px 28px #0002);backdrop-filter:var(--dsw-menu-backdrop-filter,none);font:13px/20px system-ui,sans-serif}\n.vie-mode-menu>button{display:flex;align-items:center;justify-content:space-between;gap:6px;width:100%;min-height:34px;padding:6px 8px;background:transparent;color:inherit;border:0;border-radius:var(--dsw-radius-md,6px);font:inherit;text-align:left;cursor:pointer}\n.vie-mode-menu>button:hover,.vie-mode-menu>button:focus-visible{background:var(--dsw-alias-interactive-bg-hover,#f0f2f5);outline:none}\n.vie-mode-menu>button[aria-checked=true]>span:last-child{color:var(--dsw-alias-state-business-primary,#5483ef)}\n:where([data-theme=dark],.dark) .vie-mode-control{color-scheme:dark}\n:where([data-theme=dark],.dark) .vie-mode-menu{background:var(--dsw-menu-surface-fill,#262b34);color:var(--dsw-alias-label-primary,#e4eaf1)}\n.vie-mode-control [role=status]{max-width:240px;font-size:11px}\n:where([data-theme=dark],.dark) .vie-mode-trigger{color:var(--dsw-alias-label-secondary,#b4bfcc)}\n:where([data-theme=dark],.dark) .vie-mode-trigger:hover:not(:disabled),:where([data-theme=dark],.dark) .vie-mode-menu>button:hover,:where([data-theme=dark],.dark) .vie-mode-menu>button:focus-visible{background:var(--dsw-alias-interactive-bg-hover,#343d49)}\n.vie-visual-content{scrollbar-width:none}.vie-visual-content::-webkit-scrollbar{display:none}\n@container(max-width:520px){.vie-row{grid-template-columns:minmax(0,1fr)}}\n@media(max-width:520px){.vie-row{grid-template-columns:minmax(0,1fr)}.vie-body{padding:12px}.vie-general-chart-controls{grid-template-columns:minmax(0,1fr)}}\n@media(prefers-reduced-motion:reduce){.vie-shell *{transition:none!important;scroll-behavior:auto!important}}\n\n.vie-visual-panel[data-vie-visual=Flow] .vie-visual-svg{max-height:none}\n\n.vie-visual-panel[data-vie-visual=Flow] .vie-visual-svg{min-width:320px}\n.vie-visual-panel[data-vie-visual=Flow] .vie-visual-content{overflow:auto}\n";
const VIE_STUDY_POLICY="学习模式：面向任意知识主题，按用户水平先给一句直观定义和因果链，再用一张主图解释。简单问题不强制应用图、第二张图或测验；确有教学价值再追加。每图正文先解释新增关系，默认3–5句，深入推导按用户要求展开；结尾只保留一条记忆链，不重复全文。优先document.blocks中的type:\"learning\"，由引擎统一生成按钮、阶段说明、测验、主题和状态恢复；模型只填写当前主题的SVG/HTML和数据，不重写控制逻辑。示例：{type:\"learning\",title:\"过程\",stages:[{label:\"前\",html:\"<svg viewBox=\\\"0 0 320 180\\\">...</svg>\"},{label:\"后\",html:\"...\"}]}。测验可单独提交{type:\"learning\",title:\"理解测试\",quiz:{question:\"问题\",options:[{label:\"A\",feedback:\"原因\"},{label:\"B\",feedback:\"原因\"}],correct:1}}，correct必填且从0开始，不能根据反馈猜答案。图注、正文及总结不得提前泄露该题答案或等价结论，答案原因只在选择后反馈。复杂动画仍可用figure及VIE.mountLearning，自由绘制内容，不限领域模板。阶段必须改变对象、数量、位置、连接或高亮，不能只换文字；线段真正连接对应部件，符号与标题分行，不用绝对定位把文字压进标题；窄屏重排且留白不过量。主图外壳已有标题，内部不重复；通用样式优先使用主题色。简化模型注明假设，动态平衡不是粒子停止，不臆测课本章节。正文由Harness渲染，纯文字与调试请求优先。";
/** Shared authoring policy and document contracts consumed by validation and reference generation. */
const VIE_POLICY='每张图后用Harness正文解释图中关键关系，不能仅过渡一句便出下一图。优先原生graphic/chart/Flow，减少手写SVG。变化过程明确分开前→后，箭头连接对应对象，不能将前后工件重叠或画成断裂材料。窄屏用CSS重排或分步查看，标注不低于11px。说明材料、工况与适用范围，不把热锻等同所有锻造；数值注明来源，示意值不能充当工艺限值。VIE只画当前段落的图、交互、图例和短标注；完整解释/公式/表格由Harness正文渲染。任意主题均可。复杂主题按图→正文解释→下一图→正文解释展开，每张图聚焦一个概念；勿把各章节拼成一张SVG的编号小面板或多图海报。需同时比较或共享交互才并列。默认flow按调用位置显示，补图/修图无需more:true，通常1张、必要时2–3张。visualId仅供修改，不是图片URL；不必先加载技能或写脚本。';
const VIE_VISUAL_POLICY='Use actual tool calls only; never print DSML/DSEL tags or visualization source in prose. When tools are unavailable, finish with normal prose. One focused concept per graphic; write the full explanation in normal Harness prose, then call the next graphic if needed. No multi-section SVG collages. Side-by-side only for comparisons/shared interaction. Any topic; prefer vie_explain, default flow. more is optional; visualId is not an image URL.';
const DOCUMENT_PROPERTIES=Object.freeze({caption:{type:'string',description:'Compatibility alias for top-level caption (max 140 characters). Prefer the tool-level caption; explicit tool-level value takes precedence.'},title:{type:'string',description:'Short title; if omitted, inferred from the first block title.'},controls:{type:'array',items:{type:'json'}},derive:{type:'json',description:'Optional unique derived keys mapped to numeric expressions.'},layout:{type:'string',enum:['stack','grid']},blocks:{type:'array',required:true,description:'One focused graphic per call. Flow example: [{type:"visual",kind:"Flow",spec:{title:"Process",nodes:[{id:"a",label:"Start"},{id:"b",label:"End"}],edges:[{from:"a",to:"b"}]}}]. For visual blocks put title inside spec.',items:{type:'json'}}});
const DOCUMENT_CONTRACT=Object.freeze({
  fields:Object.keys(DOCUMENT_PROPERTIES),
  blocks:{
    learning:{fields:['type','title','key','legend','note','stages','quiz'],help:'Validated generic learning UI, no JavaScript needed. stages:[{label,title?,caption?,html,mobileHtml?}] contains freely drawn SVG/HTML. Optional quiz:{question,options:[{label,feedback}],correct:1}; correct is required and zero-based. Stages or quiz required. Use theme tokens; do not repeat the outer title.'},
    graphic:{fields:['type','kind','title','items','unit'],help:'Engine-rendered bars/donut/vectors. items:[{label,value}] or vectors [{label,x,y}], optional tone. No HTML/CSS/JS required.'},
    chart:{fields:['type','title','x','y','series','regions','controls','inputs','bindings','note'],help:'Formula or data curves, region fills; bindings map variable names to shared control/derived keys.'},
    visual:{fields:['type','kind','spec'],help:'Flow, RelationGraph, Timeline, Diagram or Animation. Diagram coordinates may bind /shared/key or /derived/key.'},
    figure:{fields:['type','title','html','css','js','state','height','bindings'],help:'Learning UI: VIE.mountLearning({root:"#lesson",key:"lesson",title,legend?,note?,stages:[{label,title,caption,html,mobileHtml?}],quiz?:{question,options:[{label,feedback}],correct:0}}) supplies generic stages, local quiz feedback and state. One focused diagram in an isolated HTML/CSS/JS sandbox; do not pack independent chapters into numbered SVG mini-panels. Put each chapter graphic in its own call, separated by native prose. bindings map state keys to shared controls/derived keys.'},
    experiment:{fields:['type','template','parameters','title'],help:'Optional existing experiment shortcut, never a topic restriction.'},
    text:{fields:['type','title','body'],help:'Legacy compatibility only; new explanations belong in Harness prose.'}
  }
});
const CONTROL_TYPES=Object.freeze({slider:'Slider',number:'NumberInput',select:'SegmentedControl',toggle:'Toggle'});
function validateControlSpec(c){
  if(!c||typeof c!=='object'||Array.isArray(c)||Object.getPrototypeOf(c)!==Object.prototype)throw Error('Control requires an object');
  for(const key of Object.keys(c))if(!['key','label','min','max','step','value','bind','kind','options'].includes(key))throw Error('Unknown control field: '+key);
  if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(c.key)||['x','constructor','prototype','__proto__'].includes(c.key))throw Error('Invalid control key');
  if(typeof c.label!=='string'||c.label.length>100)throw Error('Invalid control label');
  const kind=c.kind??'slider';if(!Object.hasOwn(CONTROL_TYPES,kind))throw Error('Unknown control kind');
  const min=c.min??(kind==='toggle'?0:undefined),max=c.max??(kind==='toggle'?1:undefined),step=c.step??(kind==='toggle'?1:(max-min)/100);
  if(![min,max,step,c.value].every(n=>typeof n==='number'&&Number.isFinite(n)&&Math.abs(n)<=1e9)||max<=min||step<=0||step>max-min)throw Error('Invalid control bounds: '+c.key+' requires numeric min < max, 0 < step <= max-min and numeric value; select also needs these bounds and options [{label,value:number}]');
  assertSliderValue({min,max,step},c.value,'Control value');
  const out={key:c.key,label:c.label,min,max,step,value:c.value,...(c.kind===undefined?{}:{kind})};
  if(kind==='toggle'&&(min!==0||max!==1||step!==1))throw Error('Toggle must use numeric 0/1');
  if(kind==='select'){
    if(!Array.isArray(c.options)||c.options.length<2||c.options.length>8)throw Error('Select needs 2–8 options');
    out.options=c.options.map(option=>{if(!option||Object.keys(option).some(k=>!['label','value'].includes(k))||typeof option.label!=='string'||!option.label||option.label.length>40)throw Error('Invalid select option');assertSliderValue({min,max,step},option.value,'Option value');return {label:option.label,value:option.value};});
    if(new Set(out.options.map(o=>o.value)).size!==out.options.length||!out.options.some(o=>o.value===c.value))throw Error('Select needs unique values and a matching default');
  }else if(c.options!==undefined)throw Error('Options only apply to select');
  if(c.bind!==undefined){if(typeof c.bind!=='string'||!/^\/shared\/[A-Za-z][A-Za-z0-9_]{0,19}$/.test(c.bind))throw Error('Invalid shared control binding');out.bind=c.bind;}
  return out;
}
function documentReference(){
  return '# VIE component reference (generated)\n\n'+VIE_STUDY_POLICY+'\n\n'+VIE_POLICY+'\n\nDocument fields: '+DOCUMENT_CONTRACT.fields.join(', ')+'\n\n'+Object.entries(DOCUMENT_CONTRACT.blocks).map(([type,c])=>'## '+type+'\n\nFields: '+c.fields.join(', ')+'\n\n'+c.help+'\n').join('\n')+'\n## Controls\n\n'+Object.entries(CONTROL_TYPES).map(([kind,type])=>'- '+kind+' → '+type).join('\n')+'\n\nControls are numeric. toggle uses 0/1; select uses options [{label,value}]. derive maps unique keys to bounded numeric expressions. layout is stack (default) or grid.\n';
}

/** Trusted, deterministic experiment models shared by DSH Host and browser.
 * Model input is bounded data. It cannot provide JavaScript, HTML or a solver.
 */
const EXPERIMENT_CATALOG = Object.freeze({
  planetary: { id:'lab.planetary', title:'行星轮系', timed:true, description:'太阳轮、行星轮、内齿圈与行星架；三种固定工况', terms:['行星轮系','行星齿轮','周转轮系','planetary gear','epicyclic gear'] },
  gears: { id:'lab.gears', title:'齿轮传动', timed:true, description:'外啮合／内啮合的方向与传动比', terms:['齿轮传动','齿轮啮合','齿轮','gear ratio','gear mesh','spur gears'] },
  geartrain: { id:'lab.geartrain', title:'定轴轮系', timed:true, description:'2–6个相邻外啮合的平面定轴轮；齿数、惰轮、方向与总传动比', terms:['定轴轮系','平面轮系','三轮传动','三轮串联','多级齿轮','多轮传动','惰轮','gear train','idler gear'],priority:4 },
  worm: { id:'lab.worm', title:'蜗杆与蜗轮', timed:true, description:'蜗杆头数、蜗轮齿数与减速关系；交错轴结构示意', terms:['蜗杆','蜗轮','worm gear','worm drive'],priority:4 },
  wave: { id:'lab.wave', title:'波的叠加', timed:true, description:'改变振幅与相位，观察相长和相消干涉', terms:['波的叠加','波干涉','相长干涉','相消干涉','wave interference','superposition'] },
  process: { id:'lab.process', title:'流程逐步解释', timed:false, description:'有事实依据的流程、分支与逐步执行', terms:['逐步流程','流程单步','算法单步','step through process','process stepper'] },
  vector: { id:'lab.vector', title:'向量分解', timed:false, description:'拖动向量，观察水平与竖直分量', terms:['向量分解','向量','矢量','vector components','vector projection','vectors'] },
});
const EXPERIMENT_CASES = Object.freeze(['ring-fixed','sun-fixed','carrier-fixed']);
const experimentObject = x => x!==null && typeof x==='object' && !Array.isArray(x) && Object.getPrototypeOf(x)===Object.prototype;
function experimentKeys(value, allowed, label='parameters') {
  if(!experimentObject(value))throw Error('Experiment: '+label+' must be an object');
  for(const key of Object.keys(value))if(!allowed.includes(key))throw Error('Experiment: unsupported '+label+' field '+key);
}
function experimentNumber(value, min, max, name, integer=false) {
  if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max||integer&&!Number.isInteger(value))throw Error(`Experiment: ${name} must be ${integer?'an integer ':''}between ${min} and ${max}`);
  return value;
}
function experimentText(value, max, name) {
  if(typeof value!=='string'||value.length>max||/[\x00-\x08\x0b\x0e-\x1f]/.test(value))throw Error('Experiment: invalid '+name);
  return value;
}
/** Bounded semantic models. All angles are radians; speeds are rad/s.
 * Straight external spur trains share one module and fixed parallel axes. */
function normalizeGearTrain(input) {
  experimentKeys(input,['teeth','module','inputSpeed']);
  const p={teeth:[20,30,40],module:1,inputSpeed:1,...input};
  if(!Array.isArray(p.teeth)||p.teeth.length<2||p.teeth.length>6)throw Error('GearTrain: teeth requires 2–6 gears');
  p.teeth=p.teeth.map((z,i)=>experimentNumber(z,18,80,'teeth['+i+']',true));
  experimentNumber(p.module,.1,10,'module');experimentNumber(p.inputSpeed,-4,4,'inputSpeed');
  return p;
}
function gearTrainModel(p,phase=0,inputSpeed=p.inputSpeed) {
  const radii=p.teeth.map(z=>z*p.module/2),centers=[radii[0]],rates=[1],initial=[0];
  for(let i=1;i<radii.length;i++){
    centers.push(centers[i-1]+radii[i-1]+radii[i]);
    rates.push(-rates[i-1]*p.teeth[i-1]/p.teeth[i]);
    // A tooth centre faces a gap at each pitch contact, for every input angle.
    initial.push(Math.PI-Math.PI/p.teeth[i]-p.teeth[i-1]*initial[i-1]/p.teeth[i]);
  }
  return {radii,centers,rates,initial,angles:rates.map((r,i)=>initial[i]+r*phase),
    speeds:rates.map(r=>r*inputSpeed),outputRatio:rates.at(-1),
    transmissionRatio:1/rates.at(-1),width:centers.at(-1)+radii.at(-1)};
}
function normalizeWorm(input) {
  experimentKeys(input,['starts','wheelTeeth','inputSpeed']);
  const p={starts:2,wheelTeeth:40,inputSpeed:1,...input};
  experimentNumber(p.starts,1,4,'starts',true);experimentNumber(p.wheelTeeth,20,80,'wheelTeeth',true);
  experimentNumber(p.inputSpeed,-4,4,'inputSpeed');return p;
}
function wormModel(p,phase=0,inputSpeed=p.inputSpeed) {
  const speedRatio=p.starts/p.wheelTeeth;
  return {speedRatio,transmissionRatio:1/speedRatio,input:inputSpeed,outputMagnitude:Math.abs(inputSpeed)*speedRatio,
    wheelAngle:-phase*speedRatio,wormAngle:phase};
}
/** Interactive inputs and immutable definitions share one normalization path. */
function effectiveExperimentParameters(spec,inputs={}) {
  if(spec.template==='geartrain')return normalizeGearTrain({...spec.parameters,
    teeth:spec.parameters.teeth.map((z,i)=>inputs['teeth'+i]??z),
    inputSpeed:inputs.inputSpeed??spec.parameters.inputSpeed});
  return normalizeExperiment(spec.template,{...spec.parameters,...inputs});
}

function normalizeExperiment(template, input={}) {
  if(!Object.hasOwn(EXPERIMENT_CATALOG,template))throw Error('Experiment: unknown template');
  if(template==='geartrain')return normalizeGearTrain(input);
  if(template==='worm')return normalizeWorm(input);
  if(template==='planetary') {
    experimentKeys(input,['sunTeeth','planetTeeth','ringTeeth','planetCount','module','initialCase','inputSpeed']);
    const p={sunTeeth:36,planetTeeth:27,ringTeeth:90,planetCount:3,module:1,initialCase:'ring-fixed',inputSpeed:1,...input};
    const owns=k=>Object.hasOwn(input,k);
    if(!owns('ringTeeth')&&(owns('sunTeeth')||owns('planetTeeth')))p.ringTeeth=p.sunTeeth+2*p.planetTeeth;
    else if(owns('ringTeeth')&&owns('sunTeeth')&&!owns('planetTeeth'))p.planetTeeth=(p.ringTeeth-p.sunTeeth)/2;
    else if(owns('ringTeeth')&&owns('planetTeeth')&&!owns('sunTeeth'))p.sunTeeth=p.ringTeeth-2*p.planetTeeth;
    experimentNumber(p.sunTeeth,18,100,'sunTeeth',true); experimentNumber(p.planetTeeth,18,72,'planetTeeth',true);
    experimentNumber(p.ringTeeth,54,180,'ringTeeth',true); experimentNumber(p.planetCount,2,6,'planetCount',true);
    experimentNumber(p.module,.1,10,'module'); experimentNumber(p.inputSpeed,-20,20,'inputSpeed');
    if(!EXPERIMENT_CASES.includes(p.initialCase))throw Error('Experiment: unsupported planetary case');
    if(p.ringTeeth!==p.sunTeeth+2*p.planetTeeth)throw Error('行星轮系需满足：齿圈齿数 = 太阳轮齿数 + 2 × 行星轮齿数');
    if((p.sunTeeth+p.ringTeeth)%p.planetCount!==0)throw Error('等角度装配需满足：(太阳轮齿数 + 齿圈齿数) / 行星轮个数为整数');
    if(p.planetTeeth+2>=(p.sunTeeth+p.planetTeeth)*Math.sin(Math.PI/p.planetCount))throw Error('相邻行星轮的齿顶间距不足；请减小行星轮或行星轮个数');
    return p;
  }
  if(template==='gears') {
    experimentKeys(input,['driverTeeth','drivenTeeth','module','mesh','inputSpeed']);
    const p={driverTeeth:24,drivenTeeth:48,module:1,mesh:'external',inputSpeed:1,...input};
    experimentNumber(p.driverTeeth,18,100,'driverTeeth',true); experimentNumber(p.drivenTeeth,18,180,'drivenTeeth',true);
    experimentNumber(p.module,.1,10,'module'); experimentNumber(p.inputSpeed,-20,20,'inputSpeed');
    if(!['external','internal'].includes(p.mesh))throw Error('Experiment: unsupported mesh');
    if(p.mesh==='internal'&&p.drivenTeeth-p.driverTeeth<12)throw Error('内啮合教学布局要求从动齿圈比主动轮至少多 12 齿；不代表完整干涉校核');
    return p;
  }
  if(template==='wave') {
    experimentKeys(input,['amplitudeA','amplitudeB','phaseDegrees','frequencyHz','waveNumber']);
    const p={amplitudeA:1,amplitudeB:1,phaseDegrees:0,frequencyHz:.4,waveNumber:2,...input};
    experimentNumber(p.amplitudeA,0,2,'amplitudeA'); experimentNumber(p.amplitudeB,0,2,'amplitudeB');
    experimentNumber(p.phaseDegrees,0,360,'phaseDegrees'); experimentNumber(p.frequencyHz,.1,2,'frequencyHz');
    experimentNumber(p.waveNumber,1,5,'waveNumber',true); return p;
  }
  if(template==='vector') {
    experimentKeys(input,['magnitude','angle']); const p={magnitude:4,angle:30,...input};
    experimentNumber(p.magnitude,0,5,'magnitude'); experimentNumber(p.angle,-180,180,'angle',true);
    if(Math.abs(p.magnitude*10-Math.round(p.magnitude*10))>1e-8)throw Error('Experiment: vector magnitude uses increments of 0.1');
    return p;
  }
  experimentKeys(input,['title','nodes','edges']);
  const p={title:'观察、判断与行动',nodes:[{id:'observe',label:'观察现象',detail:'先记录已有事实。'},{id:'check',label:'检查条件',detail:'用明确条件决定接下来的路径。'},{id:'act',label:'执行行动',detail:'沿当前分支继续，并检查结果。'}],...input};
  experimentText(p.title,90,'title');
  if(!Array.isArray(p.nodes)||p.nodes.length<2||p.nodes.length>10)throw Error('Experiment: process requires 2–10 nodes');
  p.nodes=p.nodes.map(node=>{experimentKeys(node,['id','label','detail'],'node');if(typeof node.id!=='string'||! /^[A-Za-z][A-Za-z0-9_-]{0,43}$/.test(node.id))throw Error('Experiment: invalid node id');return {id:node.id,label:experimentText(node.label,52,'label'),detail:experimentText(node.detail??'',160,'detail')};});
  const ids=new Set(p.nodes.map(n=>n.id));if(ids.size!==p.nodes.length)throw Error('Experiment: duplicate node id');
  p.edges=p.edges??p.nodes.slice(0,-1).map((n,i)=>({from:n.id,to:p.nodes[i+1].id,label:'继续'}));
  if(!Array.isArray(p.edges)||p.edges.length>18)throw Error('Experiment: too many process edges');
  p.edges=p.edges.map(edge=>{experimentKeys(edge,['from','to','label'],'edge');if(!ids.has(edge.from)||!ids.has(edge.to)||edge.from===edge.to)throw Error('Experiment: invalid process edge');return {from:edge.from,to:edge.to,label:experimentText(edge.label??'继续',45,'edge label')};});
  return p;
}
function validateExperimentSpec(spec) {
  experimentKeys(spec,['template','parameters','title'],'scene');
  const parameters=normalizeExperiment(spec.template,spec.parameters??{});
  return {template:spec.template,parameters,title:experimentText(spec.title??(spec.template==='process'?parameters.title:EXPERIMENT_CATALOG[spec.template].title),100,'title')};
}
function experimentSceneSource(template, parameters={}) {
  const spec=validateExperimentSpec({template,parameters});
  const events=[{v:1,op:'surface.begin',id:'experiment-'+template},{v:1,op:'node.put',id:'experiment',type:'InteractiveScene',props:spec},{v:1,op:'surface.end',id:'experiment-'+template}];
  const lines=events.map(e=>JSON.stringify(e)+'\n');
  if(lines.some(line=>new TextEncoder().encode(line).length>6144))throw Error('Experiment: scene exceeds per-event limit');
  return lines.join('');
}
function planetaryRates(parameters, activeCase, inputSpeed=parameters.inputSpeed) {
  const {sunTeeth:s,planetTeeth:p,ringTeeth:r}=parameters;
  let sun=0,ring=0,carrier=0;
  if(activeCase==='ring-fixed'){sun=inputSpeed;carrier=s*sun/(s+r);}
  else if(activeCase==='sun-fixed'){ring=inputSpeed;carrier=r*ring/(s+r);}
  else if(activeCase==='carrier-fixed'){sun=inputSpeed;ring=-s*sun/r;}
  else throw Error('Experiment: unknown planetary case');
  const planet=carrier-s/p*(sun-carrier);
  return {sun,ring,carrier,planet,planetRelative:planet-carrier,residual:s*(sun-carrier)+r*(ring-carrier)};
}
function planetaryPhases(parameters, phase, activeCase=parameters.initialCase) {
  const rates=planetaryRates(parameters,activeCase,1),s=parameters.sunTeeth,p=parameters.planetTeeth,r=parameters.ringTeeth;
  const first=-Math.PI/2;
  const ringInitial=((s+r)*first+p*Math.PI)/r;
  const planets=Array.from({length:parameters.planetCount},(_,i)=>{
    const azimuth=first+2*Math.PI*i/parameters.planetCount;
    const initial=((s+p)*azimuth+p*Math.PI-Math.PI)/p;
    return {azimuth,absolute:initial+rates.planet*phase,relative:initial+(rates.planet-rates.carrier)*phase};
  });
  return {sun:rates.sun*phase,ring:ringInitial+rates.ring*phase,carrier:rates.carrier*phase,planets};
}
function waveSample(parameters,x,time=0) {
  const {amplitudeA:a,amplitudeB:b,phaseDegrees,frequencyHz:f,waveNumber:k}=parameters;
  const phase=phaseDegrees*Math.PI/180,base=k*x-2*Math.PI*f*time;
  const first=a*Math.sin(base),second=b*Math.sin(base+phase);
  return {first,second,sum:first+second,envelope:Math.sqrt(Math.max(0,a*a+b*b+2*a*b*Math.cos(phase)))};
}
/** A persisted UI snapshot is separate from the immutable scene definition. */
function validateExperimentSnapshot(spec, value) {
  experimentKeys(value,['v','template','case','phase','rate','direction','index','history','inputs'],'snapshot');
  if(value.v!==1||value.template!==spec.template)throw Error('Experiment: snapshot version/template mismatch');
  const result={v:1,template:spec.template,case:spec.template==='planetary'?spec.parameters.initialCase:'',phase:0,rate:1,direction:1,index:0,history:[0],inputs:{}};
  if(value.case!==undefined){if(spec.template==='planetary'&&!EXPERIMENT_CASES.includes(value.case)||spec.template!=='planetary'&&value.case!=='')throw Error('Experiment: invalid snapshot case');result.case=value.case;}
  for(const [key,min,max] of [['phase',-1e9,1e9],['rate',.1,2],['direction',-1,1],['index',0,spec.template==='process'?spec.parameters.nodes.length-1:0]])if(value[key]!==undefined)result[key]=experimentNumber(value[key],min,max,key,key==='index');
  if(![-1,1].includes(result.direction))throw Error('Experiment: invalid direction');
  if(value.history!==undefined){if(!Array.isArray(value.history)||value.history.length>64||!value.history.every(i=>Number.isInteger(i)&&i>=0&&i<=(spec.template==='process'?spec.parameters.nodes.length-1:0)))throw Error('Experiment: invalid history');result.history=[...value.history];}
  if(value.inputs!==undefined){
    const allowed=spec.template==='geartrain'?[...spec.parameters.teeth.map((_,i)=>'teeth'+i),'inputSpeed']:spec.template==='worm'?['starts','wheelTeeth','inputSpeed']:spec.template==='wave'?['amplitudeA','amplitudeB','phaseDegrees','frequencyHz']:spec.template==='vector'?['magnitude','angle']:[];
    experimentKeys(value.inputs,allowed,'interactive input');
    for(const [key,number] of Object.entries(value.inputs))experimentNumber(number,-1e6,1e6,key);
    effectiveExperimentParameters(spec,value.inputs);result.inputs={...value.inputs};
  }
  if(spec.template==='process'){
    if(!result.history.length||result.history.at(-1)!==result.index)throw Error('Experiment: history must end at the current node');
    for(let i=1;i<result.history.length;i++)if(!spec.parameters.edges.some(edge=>edge.from===spec.parameters.nodes[result.history[i-1]].id&&edge.to===spec.parameters.nodes[result.history[i]].id))throw Error('Experiment: history contains an undeclared branch');
  }
  return result;
}
function experimentContext(spec,saved){
  const state=validateExperimentSnapshot(spec,saved??{v:1,template:spec.template}),parameters=effectiveExperimentParameters(spec,state.inputs);
  let derived={};
  if(spec.template==='planetary')derived=planetaryRates(parameters,state.case,parameters.inputSpeed*state.direction);
  else if(spec.template==='gears'){const ratio=(parameters.mesh==='internal'?1:-1)*parameters.driverTeeth/parameters.drivenTeeth;derived={ratio,driver:parameters.inputSpeed*state.direction,driven:parameters.inputSpeed*state.direction*ratio};}
  else if(spec.template==='geartrain'){const m=gearTrainModel(parameters,state.phase,parameters.inputSpeed*state.direction);derived={speeds:m.speeds,outputRatio:m.outputRatio,transmissionRatio:m.transmissionRatio};}
  else if(spec.template==='worm')derived=wormModel(parameters,state.phase,parameters.inputSpeed*state.direction);
  else if(spec.template==='wave')derived={envelope:waveSample(parameters,0,state.phase).envelope};
  else if(spec.template==='vector'){const angle=parameters.angle*Math.PI/180;derived={x:parameters.magnitude*Math.cos(angle),y:parameters.magnitude*Math.sin(angle)};}
  else derived={currentNode:parameters.nodes[state.index].id,outgoing:parameters.edges.filter(edge=>edge.from===parameters.nodes[state.index].id)};
  return {template:spec.template,parameters,state,derived};
}

/** General data/formula plot, independent of subject or experiment catalogs. */
function validateChartSpec(input){
  const object=x=>x&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
  const text=(x,max=100)=>{if(typeof x!=='string'||x.length>max)throw Error('Chart requires bounded text');return x;};
  const num=x=>{if(typeof x!=='number'||!Number.isFinite(x)||Math.abs(x)>1e9)throw Error('Chart requires finite bounded numbers');return x;};
  const keys=(x,allowed)=>{if(!object(x)||Object.keys(x).some(k=>!allowed.includes(k)))throw Error('Unknown chart field');};
  const points=(p,min)=>{if(!Array.isArray(p)||p.length<min||p.length>256)throw Error('Chart points need '+min+'–256 pairs');return p.map(v=>{if(!Array.isArray(v)||v.length!==2)throw Error('Chart point requires [x,y]');return v.map(num);});};
  const tone=x=>{if(x!==undefined&&!['primary','secondary','accent','muted','warning'].includes(x))throw Error('Invalid chart tone');return x??'primary';};
  keys(input,['title','x','y','series','regions','controls','inputs','note']);
  function axis(a,defaultMin,defaultMax){a=a??{};keys(a,['min','max','label']);const out={min:num(a.min??defaultMin),max:num(a.max??defaultMax),label:text(a.label??'')};if(out.max<=out.min||out.max-out.min<1e-9)throw Error('Chart axis must have increasing bounds');return out;}
  const x=axis(input.x,0,10),y=axis(input.y,0,10);
  const controls=(input.controls??[]);if(!Array.isArray(controls)||controls.length>4)throw Error('Chart supports up to four controls');
  const names=new Set();const cleanControls=controls.map(c=>{const out=validateControlSpec(c);if(names.has(out.key))throw Error('Duplicate chart parameter');names.add(out.key);return out;});
  const inputs=input.inputs??[];if(!Array.isArray(inputs)||inputs.length>8)throw Error('Too many chart derived inputs');
  const cleanInputs=inputs.map(p=>{keys(p,['key','bind','value']);if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(p.key)||['x','constructor','prototype','__proto__'].includes(p.key)||names.has(p.key)||typeof p.bind!=='string'||!/^\/derived\/[A-Za-z][A-Za-z0-9_]{0,19}$/.test(p.bind))throw Error('Invalid chart derived input');names.add(p.key);return {key:p.key,bind:p.bind,value:num(p.value)};});
  const variables=Object.fromEntries([...cleanControls,...cleanInputs].map(c=>[c.key,c.value]));
  if(!Array.isArray(input.series)||input.series.length<1||input.series.length>6)throw Error('Chart needs 1–6 series');
  const series=input.series.map((s,index)=>{keys(s,['label','expr','points','tone','keyPoints','breaks']);const out={label:text(s.label),tone:tone(s.tone??['primary','secondary','accent','warning','muted','primary'][index])};if((s.expr!==undefined)===(s.points!==undefined))throw Error('Choose chart expression OR points');if(s.expr!==undefined){out.expr=text(s.expr,300);let valid=false;for(const q of [x.min,(x.min+x.max)/2,x.max]){try{evaluate(out.expr,{...variables,x:q});valid=true;}catch(e){if(!/Numeric overflow|Division by zero/.test(e.message))throw e;}}if(!valid)throw Error('Chart expression has no finite sample');}else out.points=points(s.points,2);for(const field of ['keyPoints','breaks'])if(s[field]!==undefined){if(!out.expr||!Array.isArray(s[field])||s[field].length>32||s[field].some(v=>typeof v!=='number'||!Number.isFinite(v)||v<x.min||v>x.max))throw Error('Invalid chart '+field);out[field]=[...new Set(s[field])].sort((a,b)=>a-b);}return out;});
  const regions=input.regions??[];if(!Array.isArray(regions)||regions.length>8)throw Error('Too many chart regions');
  return {title:text(input.title),x,y,series,controls:cleanControls,...(cleanInputs.length?{inputs:cleanInputs}:{}),regions:regions.map(r=>{keys(r,['label','points','tone']);return {label:text(r.label),points:points(r.points,3),tone:tone(r.tone)};}),note:text(input.note??'',600)};
}
function validateChartState(spec,value={}){
  if(value===null)value={};
  if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid chart state');
  const out={};for(const c of spec.controls){const v=value[c.key]??c.value;assertSliderValue({...c,...(c.options?{options:c.options.map(o=>o.value)}:{})},v,'Chart parameter');out[c.key]=v;}
  for(const p of spec.inputs??[])out[p.key]=value[p.key]===undefined?p.value:typeof value[p.key]==='number'&&Number.isFinite(value[p.key])?value[p.key]:NaN;
  if(Object.keys(value).some(k=>![...spec.controls,...(spec.inputs??[])].some(c=>c.key===k)))throw Error('Unknown chart parameter');
  return out;
}

/** Whole-domain baseline followed by breadth-first, bounded refinement. */
function sampleChartSeries(series,spec,values={}){
  if(series.points)return series.points;
  const a=spec.x.min,b=spec.x.max,range=spec.y.max-spec.y.min,limit=4096,cache=new Map(),cuts=[a,...(series.breaks??[]).filter(x=>x>a&&x<b),b].sort((x,y)=>x-y);
  const value=x=>{if(cache.has(x))return cache.get(x);let y=null;try{y=evaluate(series.expr,{...values,x});}catch{}cache.set(x,y);return y;};
  const points=new Map(),queue=[],breaks=new Set(cuts.slice(1,-1));let limited=false;
  const count=Math.min(320,Math.max(16,Math.floor((limit-128)/(cuts.length-1))-2));
  for(let part=0;part<cuts.length-1;part++){
    const epsilon=Math.min((b-a)*1e-10,(cuts[part+1]-cuts[part])/4),lo=part?cuts[part]+epsilon:a,hi=part<cuts.length-2?cuts[part+1]-epsilon:b;
    const xs=[...new Set([...Array.from({length:count+1},(_,i)=>lo+(hi-lo)*i/count),...(series.keyPoints??[]).filter(x=>x>=lo&&x<=hi)])].sort((x,y)=>x-y);
    for(const x of xs)points.set(x,value(x));for(let i=0;i<xs.length-1;i++)queue.push([xs[i],xs[i+1],0]);
  }
  for(let cursor=0;cursor<queue.length;cursor++){
    const [x0,x1,depth]=queue[cursor],x=(x0+x1)/2,y0=value(x0),y1=value(x1),y=value(x);
    const bend=y!==null&&y0!==null&&y1!==null&&Math.abs(y-(y0+y1)/2)>range/800,transition=[y0,y,y1].some(v=>v===null)&&[y0,y,y1].some(v=>v!==null);
    if(!(bend||transition)||depth>=8||x<=x0||x>=x1)continue;
    if(points.size+breaks.size>=limit){limited=true;continue;}
    points.set(x,y);queue.push([x0,x,depth+1],[x,x1,depth+1]);
  }
  for(const x of breaks)points.set(x,null);const out=[...points].sort((a,b)=>a[0]-b[0]);out.limited=limited;return out;
}

/** Cross-domain data graphics: the engine owns layout, labels and theme. */
function semanticGraphic(input){
  if(!input||Object.keys(input).some(k=>!['type','kind','title','items','unit'].includes(k)))throw Error('Unknown graphic field');
  if(!['bars','donut','vectors'].includes(input.kind)||!Array.isArray(input.items)||input.items.length<1||input.items.length>12)throw Error('Graphic needs bars/donut/vectors and 1–12 items');
  const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const title=input.title??'图解',unit=input.unit??'';if(typeof title!=='string'||title.length>100||typeof unit!=='string'||unit.length>20)throw Error('Invalid graphic title/unit');
  const tones=['primary','secondary','accent','warning','muted'];
  const items=input.items.map((x,i)=>{if(!x||Object.keys(x).some(k=>!['label','value','x','y','tone'].includes(k))||typeof x.label!=='string'||!x.label.trim()||x.label.length>80||x.tone!==undefined&&!tones.includes(x.tone))throw Error('Invalid graphic item');const keys=input.kind==='vectors'?['x','y']:['value'];for(const k of keys)if(typeof x[k]!=='number'||!Number.isFinite(x[k])||Math.abs(x[k])>1e9)throw Error('Graphic requires bounded numeric values');if(input.kind!=='vectors'&&x.value<0)throw Error('Use nonnegative graphic values');return {...x,tone:x.tone??tones[i%tones.length]};});
  const tone=x=>'var(--vie-'+x.tone+')',num=x=>Number(x.toPrecision(5)).toString(),total=items.reduce((s,x)=>s+(x.value??0),0),max=Math.max(1,...items.map(x=>x.value??Math.hypot(x.x,x.y)));
  let graphic='';
  if(input.kind==='bars')graphic='<div class="graphic-bars">'+items.map(x=>`<div class="graphic-item"><div class="graphic-line"><span>${esc(x.label)}</span><strong>${num(x.value)} ${esc(unit)}</strong></div><div class="graphic-track"><div style="width:${100*x.value/max}%;background:${tone(x)}"></div></div></div>`).join('')+'</div>';
  else if(input.kind==='donut'){
    if(total<=0)throw Error('Donut total must be positive');let start=0;const slices=items.map(x=>{const v=100*x.value/total,s=`${tone(x)} ${start}% ${start+v}%`;start+=v;return s;});
    graphic=`<div class="graphic-split"><div class="graphic-donut" role="img" aria-label="${esc(title)}" style="background:conic-gradient(${slices.join(',')})"><div><strong>${num(total)}</strong><span>${esc(unit)}</span></div></div><div class="graphic-list">${items.map(x=>`<div class="graphic-line"><span><i style="background:${tone(x)}"></i>${esc(x.label)}</span><strong>${num(x.value)} <small>${(100*x.value/total).toFixed(1)}%</small></strong></div>`).join('')}</div></div>`;
  }else{
    const scale=145/max;graphic=`<div class="graphic-split"><svg viewBox="0 0 360 360" role="img" aria-label="${esc(title)}"><path d="M20 180H340M180 340V20" stroke="var(--vie-muted)" opacity=".5"/><text x="333" y="173" fill="var(--vie-ink)" font-size="14">x</text><text x="190" y="25" fill="var(--vie-ink)" font-size="14">y</text>${items.map((x,i)=>{const px=180+x.x*scale,py=180-x.y*scale,angle=Math.atan2(-x.y,x.x)*180/Math.PI;return `<g stroke="${tone(x)}" fill="${tone(x)}"><path d="M180 180L${px} ${py}" stroke-width="3"/><path d="M-11 -5L0 0L-11 5Z" transform="translate(${px} ${py}) rotate(${angle})"/></g>`;}).join('')}</svg><div class="graphic-list">${items.map(x=>`<div class="graphic-line"><span><i style="background:${tone(x)}"></i>${esc(x.label)}</span><strong>(${num(x.x)}, ${num(x.y)}) ${esc(unit)}</strong></div>`).join('')}</div></div>`;
  }
  return validateFigureDefinition({title,html:'<div class="graphic">'+graphic+'</div>',height:360,css:'.graphic{font-size:14px;line-height:1.6}.graphic-split{display:grid;grid-template-columns:minmax(180px,1fr) minmax(180px,1.2fr);gap:24px;align-items:center}.graphic-list,.graphic-bars{display:grid;gap:14px}.graphic-line{display:flex;gap:12px;justify-content:space-between;align-items:baseline;flex-wrap:wrap}.graphic-line>span{overflow-wrap:anywhere}.graphic-line strong{font-variant-numeric:tabular-nums}.graphic-line i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:7px}.graphic-line small{color:var(--vie-muted);margin-left:8px}.graphic-track{height:12px;border-radius:6px;background:var(--vie-layer);overflow:hidden;margin-top:5px}.graphic-track>div{height:100%;border-radius:6px}.graphic-donut{width:220px;aspect-ratio:1;border-radius:50%;display:grid;place-items:center;justify-self:center}.graphic-donut>div{width:65%;height:65%;border-radius:50%;background:var(--vie-bg);display:flex;flex-direction:column;justify-content:center;align-items:center}.graphic-donut strong{font-size:25px}.graphic svg{width:100%}@media(max-width:520px){.graphic-split{grid-template-columns:minmax(0,1fr);gap:18px}.graphic-donut{width:min(220px,90%)}}'});
}

/** Topic-independent document and generated-figure contract. No topic allowlist. */
/** Topic-neutral learning data. Never execute authored JavaScript on the Host. */
function validateLearningDefinition(input,withRoot=false){
 const fail=message=>{throw Error('VIE_LEARNING_INVALID: '+message);};
 const object=(v,path,keys)=>{if(!v||typeof v!=='object'||Array.isArray(v))fail(path+' must be an object');for(const k of Object.keys(v))if(!keys.includes(k))fail(path+'.'+k+' is unknown');};
 const text=(v,path,max=1000)=>{if(typeof v!=='string'||v.length>max)fail(path+' must be text (max '+max+')');return v;};
 const requiredText=(v,path,max=1000)=>{const s=text(v,path,max);if(!s.trim())fail(path+' must not be blank');return s;};
 object(input,'learning',['type','title','key','legend','note','stages','quiz',...(withRoot?['root']:[])]);
 const out={title:requiredText(input.title??'交互演示','title',100),key:input.key??'learning'};
 if(typeof out.key!=='string'||!/^[a-zA-Z][\w-]{0,30}$/.test(out.key)||['__proto__','constructor','prototype'].includes(out.key))fail('key is invalid');
 for(const k of ['legend','note'])if(input[k]!==undefined)out[k]=text(input[k],k);
 const stages=input.stages??[];if(!Array.isArray(stages)||stages.length>8)fail('stages needs 0–8 entries');
 out.stages=stages.map((s,i)=>{const p='stages['+i+']';object(s,p,['label','title','caption','html','mobileHtml']);const v={label:requiredText(s.label??String(i+1),p+'.label',80),html:requiredText(s.html,p+'.html',16000)};for(const k of ['title','caption','mobileHtml'])if(s[k]!==undefined)v[k]=k==='mobileHtml'?requiredText(s[k],p+'.'+k,16000):text(s[k],p+'.'+k);return v;});
 if(input.quiz!==undefined){const q=input.quiz;object(q,'quiz',['question','options','correct']);if(!Array.isArray(q.options)||q.options.length<2||q.options.length>6)fail('quiz.options needs 2–6 entries');if(!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.options.length)fail('quiz.correct must be a zero-based option index; do not infer an answer from feedback');out.quiz={question:requiredText(q.question,'quiz.question'),correct:q.correct,options:q.options.map((o,i)=>{object(o,'quiz.options['+i+']',['label','feedback']);return {label:requiredText(o.label,'quiz.options['+i+'].label'),...(o.feedback!==undefined?{feedback:text(o.feedback,'quiz.options['+i+'].feedback')}:{})};})};}
 if(!out.stages.length&&!out.quiz)fail('stages or quiz is required');
 if(new TextEncoder().encode(JSON.stringify(out)).length>40000)fail('learning data exceeds 40KB');
 return out;
}
/** Narrow static preflight for literal SDK calls. Strings/comments are skipped;
 * dynamic JS remains subject to sandbox runtime validation, never Host eval. */
function validateLearningCalls(js){
 if(!js.includes('mountLearning'))return;
 const t=[];let i=0;
 while(i<js.length){const c=js[i];if(/\s/.test(c)){i++;continue;}if(js.startsWith('//',i)){i=js.indexOf('\n',i);if(i<0)break;continue;}if(js.startsWith('/*',i)){const end=js.indexOf('*/',i+2);i=end<0?js.length:end+2;continue;}
  // Regex/division and template interpolation require a complete JS parser.
  // Defer those scripts to the sandbox instead of guessing their meaning.
  if(c==='/'||c==='`')return;
  if(c==='"'||c==="'"){const quote=c;let value='',escaped=false;i++;while(i<js.length){const ch=js[i++];if(ch==='\\'){escaped=true;i++;continue;}if(ch===quote)break;value+=ch;}t.push({v:value,string:true,escaped});continue;}
  const word=js.slice(i).match(/^[A-Za-z_$][\w$]*/);if(word){t.push({v:word[0]});i+=word[0].length;}else{t.push({v:c});i++;}
 }
 const is=(n,v)=>t[n]?.v===v&&!t[n]?.string;
 const endOf=start=>{let depth=0;for(let n=start;n<t.length;n++){if(is(n,'{')||is(n,'[')||is(n,'('))depth++;if(is(n,'}')||is(n,']')||is(n,')'))if(--depth===0)return n;}return t.length;};
 const property=(start,end,key)=>{for(let n=start+1;n<end;n++){if(t[n].v===key&&is(n+1,':'))return n+2;if(is(n,'{')||is(n,'[')||is(n,'('))n=endOf(n);}return -1;};
 const staticKeys=(start,end)=>{let n=start+1;while(n<end){if(t[n].escaped||(!t[n].string&&!/^[A-Za-z_$][\w$]*$/.test(t[n].v))||!is(n+1,':'))return false;n+=2;while(n<end&&!is(n,',')){if(is(n,'{')||is(n,'[')||is(n,'('))n=endOf(n);n++;}n++;}return true;};
 for(let n=0;n<t.length-4;n++)if(is(n,'VIE')&&is(n+1,'.')&&is(n+2,'mountLearning')&&is(n+3,'(')&&is(n+4,'{')){const end=endOf(n+4),quiz=property(n+4,end,'quiz');if(staticKeys(n+4,end)&&quiz>=0&&is(quiz,'{')&&staticKeys(quiz,endOf(quiz))&&property(quiz,endOf(quiz),'correct')<0)throw Error('VIE_LEARNING_INVALID: quiz.correct is required (zero-based option index). Prefer a document block with type:"learning" for full data validation.');n=end;}
}

function validateFigureState(input={}){
  const plain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&(Object.getPrototypeOf(x)===Object.prototype||Object.getPrototypeOf(x)===null);
  let nodes=0;
  const visit=(v,depth)=>{
    if(++nodes>256||depth>6)throw Error('Figure state is too complex');
    if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return;
    if(typeof v==='string'&&v.length<=2000)return;
    if(Array.isArray(v)&&v.length<=128){v.forEach(x=>visit(x,depth+1));return;}
    if(plain(v)&&Object.keys(v).length<=32){for(const [k,x]of Object.entries(v)){if(k.length>80||['__proto__','constructor','prototype'].includes(k))throw Error('Invalid figure state key');visit(x,depth+1);}return;}
    throw Error('Figure state must contain bounded JSON data');
  };
  if(!plain(input))throw Error('Figure state must be an object');visit(input,0);
  if(new TextEncoder().encode(JSON.stringify(input)).length>8192)throw Error('Figure state exceeds 8KB');
  return JSON.parse(JSON.stringify(input));
}
function validateFigureDefinition(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype)throw Error('Figure requires an object');
  for(const key of Object.keys(input))if(!DOCUMENT_CONTRACT.blocks.figure.fields.includes(key)&&key!=='type')throw Error('Unknown figure field: '+key);
  const bounded=(value,max,label)=>{if(typeof value!=='string'||new TextEncoder().encode(value).length>max)throw Error('Figure '+label+' exceeds limit or is not text');return value;};
  const result={title:bounded(input.title??'交互图解',300,'title'),html:bounded(input.html??'',16384,'html'),css:bounded(input.css??'',8192,'css'),js:bounded(input.js??'',32768,'js'),height:input.height??360,state:validateFigureState(input.state??{})};
  if(input.bindings!==undefined){
    if(!input.bindings||typeof input.bindings!=='object'||Array.isArray(input.bindings)||Object.keys(input.bindings).length>8)throw Error('Invalid figure bindings');
    result.bindings={};for(const [key,ref]of Object.entries(input.bindings)){if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(key)||['constructor','prototype','__proto__'].includes(key)||typeof ref!=='string'||!/^\/(shared|derived)\/[A-Za-z][A-Za-z0-9_]{0,19}$/.test(ref))throw Error('Invalid figure binding');result.bindings[key]=ref;}
  }
  if(!result.html.trim())throw Error('Figure html must not be empty');
  validateLearningCalls(result.js);
  if(!Number.isInteger(result.height)||result.height<160||result.height>1000)throw Error('Figure height must be 160–1000');
  if(/<(?:iframe|frame|object|embed|base)\b|<meta\b[^>]*http-equiv\s*=\s*["']?refresh/i.test(result.html))throw Error('Figure must be self-contained; nested browsing contexts and refresh are not supported');
  if(new TextEncoder().encode(JSON.stringify(result)).length>60000)throw Error('Figure exceeds serialized 60KB limit');
  return result;
}
function validateDocumentSpec(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype)throw Error('Document requires an object');
  if(input.caption!==undefined){if(typeof input.caption!=='string'||input.caption.length>140)throw Error('document.caption must be text of at most 140 characters');const {caption,...rest}=input;input=rest;}
  if(input.title===undefined){const first=input.blocks?.[0]?.title;input={...input,title:typeof first==='string'&&first.trim()?first.trim().slice(0,100):'交互图解'};}
  for(const key of Object.keys(input))if(!DOCUMENT_CONTRACT.fields.includes(key))throw Error('Unknown document field: '+key);
  if(typeof input.title!=='string'||!input.title.trim()||input.title.length>100)throw Error('Document requires a short title');
  if(!Array.isArray(input.blocks)||input.blocks.length<1||input.blocks.length>12)throw Error('Document requires 1–12 ordered blocks');
  const controls=input.controls===undefined?[]:validateChartSpec({title:'shared',controls:input.controls,series:[{label:'validation',expr:'x'}]}).controls;
  if(controls.some(c=>c.bind))throw Error('Document controls cannot contain bind');
  const derive=input.derive??{};
  if(!derive||typeof derive!=='object'||Array.isArray(derive)||Object.getPrototypeOf(derive)!==Object.prototype||Object.keys(derive).length>8)throw Error('Invalid document derive');
  const formulas={},state=Object.fromEntries(controls.map(c=>['/shared/'+c.key,c.value]));
  for(const [key,expr]of Object.entries(derive)){if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(key)||['x','constructor','prototype','__proto__'].includes(key)||controls.some(c=>c.key===key)||typeof expr!=='string'||expr.length>300)throw Error('Invalid derived key/expression');formulas['/derived/'+key]=expr;}
  const issues=validateFormulas({state,formulas});if(issues.length)throw Error(issues.join('; '));
  const computed=computeDerived({state,formulas});if(computed.failures.size)throw Error('Initial derived value unavailable: '+[...computed.failures.values()].join('; '));
  const values=computed.values;
  const resolve=ref=>{const key=Object.hasOwn(state,'/shared/'+ref)?'/shared/'+ref:'/derived/'+ref;if(!Object.hasOwn(values,key))throw Error('Unknown shared binding: '+ref);return key;};
  if(input.layout!==undefined&&!['stack','grid'].includes(input.layout))throw Error('Unknown document layout');
  let figures=0;
  const blocks=input.blocks.map((raw,index)=>{try{
    let block=raw;
    if(block?.type==='learning'){
      const lesson=validateLearningDefinition(block);
      block={type:'figure',title:lesson.title,html:'<div id="vie-lesson"></div>',js:'VIE.mountLearning('+JSON.stringify({...lesson,root:'#vie-lesson'})+');'};
    }
    // Normalize only unambiguous legacy aliases, then apply the regular validators.
    if(block&&block.type===undefined&&['text','figure','chart','experiment'].includes(block.kind)){const {kind,...rest}=block;block={type:kind,...rest};}
    if(block&&block.type===undefined&&block.kind===undefined&&typeof block.html==='string'&&Object.keys(block).every(k=>DOCUMENT_CONTRACT.blocks.figure.fields.includes(k)))block={type:'figure',...block};
    if(block&&['Flow','RelationGraph','Timeline','Diagram','Animation'].includes(block.kind)&&block.spec&&(!block.type||block.type==='visual')){const {title,...rest}=block;block={...rest,type:'visual',spec:{...block.spec,...(!block.spec.title&&title?{title}:{})}};}
    if(!block||typeof block!=='object'||Array.isArray(block))throw Error('Invalid document block');
    const contract=DOCUMENT_CONTRACT.blocks[block.type];if(contract)for(const key of Object.keys(block))if(!contract.fields.includes(key))throw Error('Unknown '+block.type+' field: '+key);
    if(block.type==='graphic'){if(++figures>4)throw Error('Use at most four figures per document');return {type:'figure',...semanticGraphic(block)};}
    if(block.type==='figure'){
      if(++figures>4)throw Error('Use at most four figures per document');
      const {type,...spec}=block;
      if(spec.bindings){const bindings={},initial={...spec.state};for(const [key,ref]of Object.entries(spec.bindings)){const path=ref.startsWith('/')?ref:resolve(ref);if(!Object.hasOwn(values,path))throw Error('Unknown figure shared input: '+ref);bindings[key]=path;initial[key]=values[path];}spec.bindings=bindings;spec.state=initial;}
      return {type,...validateFigureDefinition(spec)};
    }
    if(block.type==='text'){
      for(const key of Object.keys(block))if(!['type','title','body'].includes(key))throw Error('Unknown text block field');
      if(typeof block.body!=='string'||block.body.length>1400||block.title!==undefined&&(typeof block.title!=='string'||block.title.length>100))throw Error('Invalid paragraph');
      return {type:'text',...(block.title===undefined?{}:{title:block.title}),body:block.body};
    }
    if(block.type==='chart'){
      const {type,bindings,...spec}=block;
      if(bindings!==undefined){
        if(!bindings||typeof bindings!=='object'||Array.isArray(bindings)||Object.getPrototypeOf(bindings)!==Object.prototype||Object.keys(bindings).length>4)throw Error('Invalid chart bindings');
        spec.controls=[...(spec.controls??[])];spec.inputs=[...(spec.inputs??[])];
        for(const [key,ref]of Object.entries(bindings)){if(typeof ref!=='string')throw Error('Invalid chart binding target');const path=resolve(ref),c=controls.find(c=>c.key===ref);if(c)spec.controls.push({...c,key,bind:path});else spec.inputs.push({key,bind:path,value:values[path]});}
      }
      const clean=validateChartSpec(spec);
      for(const c of clean.controls.filter(c=>c.bind)){const original=controls.find(x=>'/shared/'+x.key===c.bind);if(!original||['min','max','step','value','kind','options'].some(k=>JSON.stringify(c[k])!==JSON.stringify(original[k])))throw Error('Shared chart bounds must match document control');}
      for(const p of clean.inputs??[])if(!Object.hasOwn(formulas,p.bind)||p.value!==values[p.bind])throw Error('Unknown/mismatched derived chart input');
      return {type,...clean};
    }
    if(block.type==='visual'){
      for(const key of Object.keys(block))if(!['type','kind','spec'].includes(key))throw Error('Unknown visual block field');
      const spec=validateVisualSpec(block.kind,block.spec);
      for(const shape of spec.shapes??[])for(const value of Object.values(shape))if(value&&typeof value==='object'&&value.$bind&&!Object.hasOwn(values,value.$bind))throw Error('Unknown diagram binding: '+value.$bind);
      return {type:'visual',kind:block.kind,spec};
    }
    if(block.type==='experiment'){
      const {type,...spec}=block;return {type,...validateExperimentSpec(spec)};
    }
    throw Error('Unknown document block type: '+block.type);
  }catch(error){error.path='blocks['+index+']'+(error.path?'.spec.'+error.path:'');error.message=error.path+': '+error.message;throw error;}});
  return {title:input.title,...controls.length?{controls}:{},...(Object.keys(derive).length?{derive:{...derive}}:{}),...(input.layout?{layout:input.layout}:{}),blocks};
}
function documentSceneSource(input){
  const spec=validateDocumentSpec(input),events=[{v:1,op:'surface.begin',id:'document-scene'}];
  if(spec.layout==='grid'&&spec.controls?.length)events.push({v:1,op:'node.put',id:'document-controls',order:0,type:'Row',props:{}});
  (spec.controls??[]).forEach((c,i)=>events.push({v:1,op:'node.put',id:'shared-'+c.key,order:i,...(spec.layout==='grid'?{parent:'document-controls'}:{}),type:CONTROL_TYPES[c.kind??'slider'],props:{label:c.label,bind:'/shared/'+c.key,default:c.value,min:c.min,max:c.max,step:c.step,...(c.options?{options:c.options}:{})}}));
  for(const [key,expr]of Object.entries(spec.derive??{}))events.push({v:1,op:'state.derive',path:'/derived/'+key,expr});
  if(spec.layout==='grid')events.push({v:1,op:'node.put',id:'document-grid',order:(spec.controls??[]).length,type:'Row',props:{}});
  spec.blocks.forEach((block,i)=>{
    const {type,...data}=block;
    const nodeType=type==='text'?'Text':type==='figure'?'GenerativeFigure':type==='chart'?'Chart':type==='experiment'?'InteractiveScene':data.kind;
    const props=type==='visual'?data.spec:data;
    events.push({v:1,op:'node.put',id:'block'+(i+1),order:i+(spec.controls?.length??0),...(spec.layout==='grid'?{parent:'document-grid'}:{}),type:nodeType,props});
  });
  events.push({v:1,op:'surface.end',id:'document-scene'});
  const source=events.map(e=>JSON.stringify(e)+'\n').join('');
  if(new TextEncoder().encode(source).length>262144)throw Error('Document exceeds 256KB');
  return source;
}

const {VISUAL_KINDS,visualNodeProps,validateVisualSpec,visualSceneSource,sceneStateEvents}=(()=>{
/** VIE generic visual catalog: a single strict schema for Host and browser.
 * Only validated DATA reaches the SVG generator. No JS, HTML, URLs or CSS.
 */
const VISUAL_KINDS=Object.freeze(['Flow','RelationGraph','Timeline','Diagram','Animation']);
const VISUAL_LIMITS=Object.freeze({nodes:12,edges:20,items:12,shapes:256,labels:144,coordinate:1200,commands:1024});
const PL=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
const err=m=>{throw Error('Visual schema: '+m);};
const keys=(o,allowed)=>{if(!PL(o))err('expected plain object');for(const k of Object.keys(o))if(!allowed.includes(k))err('forbidden field '+k);};
const str=(v,max=80)=>{if(typeof v!=='string'||v.length>max||/[\x00-\x08\x0b\x0e-\x1f]/.test(v))err('invalid text');return v;};
const num=(v,min,max)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max)err('invalid number');return v;};
const id=x=>{if(typeof x!=='string'||! /^[A-Za-z][A-Za-z0-9_-]{0,43}$/.test(x))err('invalid id');return x;};
const tone=v=>{if(!['primary','secondary','accent','muted','warning'].includes(v))err('invalid color token');return v;};
const motionEase=v=>{if(!['linear','inOut'].includes(v))err('unsupported easing');return v;};
const role=v=>{if(!['default','input','output','fixed','step','important','neutral'].includes(v))err('invalid role');return v;};
const pathData=v=>{
  str(v,16000);
  // SVG 2D path subset. Reject script, URLs, exponents and non-path syntax.
  if(!/^[MmLlHhVvQqCcAaZz\d\-+.,\s]+$/.test(v))err('path command not allowed');
  if((v.match(/[MmLlHhVvQqCcAaZz]/g)||[]).length>VISUAL_LIMITS.commands)err('too many path commands');
  const numbers=v.match(/[-+]?(?:\d+\.?\d*|\.\d+)/g)||[];
  if(numbers.some(n=>!Number.isFinite(Number(n))||Math.abs(Number(n))>VISUAL_LIMITS.coordinate))err('path coordinate out of range');
  if(!/[Mm]/.test(v))err('path must start from moveto');
  return v;
};
function validateShape(obj){
  keys(obj,['k','id','label','detail','anchor','x','y','x1','y1','x2','y2','cx','cy','r','w','h','rx','ry','points','d','t','tone','fill','strokeWidth']);
  const k=str(obj.k,16);if(!['line','arrow','circle','rect','ellipse','polyline','path','text'].includes(k))err('unsupported shape '+k);
  const s={k};if(obj.id!==undefined)s.id=id(obj.id);
  if(obj.label!==undefined)s.label=str(obj.label,52);
  if(obj.detail!==undefined)s.detail=str(obj.detail,160);
  if(obj.anchor!==undefined){if(k!=='text'||!['start','middle','end'].includes(obj.anchor))err('invalid text anchor');s.anchor=obj.anchor;}
  if(obj.tone!==undefined)s.tone=tone(obj.tone);
  if(obj.fill!==undefined){if(typeof obj.fill!=='boolean')err('fill must be boolean');s.fill=obj.fill;}
  if(obj.strokeWidth!==undefined)s.strokeWidth=num(obj.strokeWidth,.5,8);
  const boundCoord=(value,min=-1200,max=1200)=>{
  if(typeof value==='number')return num(value,min,max);
  keys(value,['$bind','scale','offset']);
  if(typeof value.$bind!=='string'||!/^\/[A-Za-z][A-Za-z0-9_/-]{0,95}$/.test(value.$bind)||value.$bind.includes('//'))err('invalid geometric binding');
  return {$bind:value.$bind,...(value.scale===undefined?{}:{scale:num(value.scale,-100,100)}),...(value.offset===undefined?{}:{offset:num(value.offset,-1200,1200)})};
};
  const fields={line:['x1','y1','x2','y2'],arrow:['x1','y1','x2','y2'],circle:['cx','cy','r'],rect:['x','y','w','h'],ellipse:['cx','cy','rx','ry'],text:['x','y'],polyline:[],path:[]};
  for(const f of fields[k]){if(obj[f]===undefined)err('missing '+f);s[f]=boundCoord(obj[f],f==='r'||f==='w'||f==='h'||f==='rx'||f==='ry'?0:-1200,1200);}
  if(k==='rect')for(const optional of ['rx','ry'])if(obj[optional]!==undefined)s[optional]=boundCoord(obj[optional],0,200);
  if(k==='polyline'){
    if(!Array.isArray(obj.points)||obj.points.length<2||obj.points.length>512)err('invalid polyline');
    s.points=obj.points.map(p=>{if(!Array.isArray(p)||p.length!==2)err('invalid point');return [num(p[0],-1200,1200),num(p[1],-1200,1200)];});
  }
  if(k==='path')s.d=pathData(obj.d);
  if(k==='text'){if(obj.t===undefined)err('missing label');s.t=str(obj.t,72);}
  for(const f of ['x','y','x1','y1','x2','y2','cx','cy','r','w','h','rx','ry','points','d','t'])if(obj[f]!==undefined&&!Object.hasOwn(s,f))err('field not applicable: '+f);
  return s;
}
function validateNode(n){
  keys(n,['id','label','detail','role']);
  return {id:id(n.id),label:str(n.label,52),...(n.detail===undefined?{}:{detail:str(n.detail,160)}),...(n.role===undefined?{}:{role:role(n.role)})};
}
function validateEdge(e,known){
  keys(e,['from','to','label','kind']);
  const from=id(e.from),to=id(e.to);
  if(!known.has(from)||!known.has(to))err('unknown edge endpoint '+[from,to].filter(x=>!known.has(x)).join(', ')+'; valid node ids: '+[...known].join(', '));
  if(e.kind!==undefined&&!['arrow','line','supports','meshes','depends'].includes(e.kind))err('invalid edge kind');
  return {from,to,...(e.label===undefined?{}:{label:str(e.label,45)}),...(e.kind===undefined?{}:{kind:e.kind})};
}
function validateVisualSpec(kind,value){
  if(!VISUAL_KINDS.includes(kind))err('unknown visual kind');
  keys(value,['title','subtitle','layout','nodes','edges','items','shapes','width','height','accuracy','representation','duration','motions']);
  const result={title:str(value.title??'',100)};
  if(value.subtitle!==undefined)result.subtitle=str(value.subtitle,160);
  if(value.accuracy!==undefined){if(!['schematic','calculated','validated'].includes(value.accuracy))err('invalid accuracy');result.accuracy=value.accuracy;}
  if(value.representation!==undefined){if(!['structure','pitch-circles'].includes(value.representation)||!['Diagram','Animation'].includes(kind))err('invalid representation');result.representation=value.representation;}
  if(kind==='Flow'||kind==='RelationGraph'){
    if(!Array.isArray(value.nodes)||value.nodes.length<2||value.nodes.length>VISUAL_LIMITS.nodes)err('node count');
    const nodes=value.nodes.map(validateNode),known=new Set(nodes.map(n=>n.id));
    if(known.size!==nodes.length)err('duplicate node id');
    const edges=value.edges??[];
    if(!Array.isArray(edges)||edges.length>VISUAL_LIMITS.edges)err('edge count');
    result.nodes=nodes;result.edges=edges.map((e,i)=>{try{return validateEdge(e,known);}catch(error){error.path='edges['+i+']';throw error;}});
    const allowed=kind==='Flow'?['auto','horizontal','vertical']:['auto','radial','grid'];
    if(value.layout!==undefined){if(!allowed.includes(value.layout))err('layout not supported');result.layout=value.layout;}
    if(kind==='Flow' && !result.edges.length)result.edges=nodes.slice(0,-1).map((n,i)=>({from:n.id,to:nodes[i+1].id,kind:'arrow'}));
  } else if(kind==='Timeline'){
    if(!Array.isArray(value.items)||value.items.length<2||value.items.length>VISUAL_LIMITS.items)err('timeline count');
    result.items=value.items.map(item=>{
      keys(item,['id','at','label','detail']);
      return {id:id(item.id),at:str(item.at,28),label:str(item.label,60),...(item.detail===undefined?{}:{detail:str(item.detail,160)})};
    });
    if(new Set(result.items.map(i=>i.id)).size!==result.items.length)err('duplicate item id');
  } else {
    if(!Array.isArray(value.shapes)||value.shapes.length<1||value.shapes.length>VISUAL_LIMITS.shapes)err('shape count');
    if(value.shapes.filter(s=>s.k==='text').length>VISUAL_LIMITS.labels)err('too many labels');
    result.width=num(value.width??640,160,1200);
    result.height=num(value.height??280,120,850);
    result.shapes=value.shapes.map(validateShape);
    if(kind==='Animation'){
      result.duration=num(value.duration??4,.5,30);
      if(!Array.isArray(value.motions)||value.motions.length<1||value.motions.length>8)err('animation must contain 1–8 motions');
      const ids=new Set(result.shapes.filter(s=>s.id).map(s=>s.id));
      result.motions=value.motions.map(m=>{
        keys(m,['id','kind','degrees','cx','cy','dx','dy','ease','cycles']);
        const name=id(m.id);if(!ids.has(name))err('animation references unknown shape');
        const cycles=m.cycles===undefined?1:num(m.cycles,-20,20);if(!Number.isInteger(cycles)||cycles===0)err('cycles must be a nonzero integer');
        if(m.kind==='rotate'){if(m.degrees===undefined||m.cx===undefined||m.cy===undefined)err('rotation needs angle and pivot');return {id:name,kind:'rotate',degrees:num(m.degrees,-1440,1440),cx:num(m.cx,-1200,1200),cy:num(m.cy,-1200,1200),cycles,ease:m.ease===undefined?'linear':motionEase(m.ease)};}
        if(m.kind==='translate'){if(m.dx===undefined||m.dy===undefined)err('translation needs dx and dy');return {id:name,kind:'translate',dx:num(m.dx,-1200,1200),dy:num(m.dy,-1200,1200),cycles,ease:m.ease===undefined?'linear':motionEase(m.ease)};}
        err('unsupported motion kind');
      });
      const motionCount=new Map();for(const m of result.motions){const n=(motionCount.get(m.id)||0)+1;if(n>3)err('too many motions for one shape');motionCount.set(m.id,n);}
    }
    const used=result.shapes.filter(s=>s.id).map(s=>s.id);
    if(new Set(used).size!==used.length)err('duplicate shape id');
  }
  // Unsupported properties cannot silently disappear and mislead the user.
  for(const key of ['nodes','edges','items','shapes','width','height','layout','duration','motions'])if(value[key]!==undefined&&!Object.hasOwn(result,key))err('field not applicable: '+key);

  return result;
}

function visualNodeProps(type,props){
  if(!VISUAL_KINDS.includes(type))err('unsupported visual node');
  // The node's props are the spec itself; share identical rules in Host and Client.
  return validateVisualSpec(type,props);
}

/** Short model-facing API: kind + domain facts, not a hand-written JSONL stream. */
function sceneStateEvents(options={}){
  if(!options||typeof options!=='object'||Array.isArray(options))throw Error('Invalid scene state');
  const events=[];
  for(const [name,op] of [['state','state.init'],['derive','state.derive']]){
    const entries=options[name]??{};
    if(!PLAIN(entries)||Object.keys(entries).length>24)throw Error('Scene '+name+' requires at most 24 entries');
    for(const [key,value] of Object.entries(entries))events.push(validateEvent({v:1,op,path:key,...(op==='state.init'?{value}:{expr:value})}));
  }
  return events;
}
function visualSceneSource(kind,spec,options={}){
  const clean=validateVisualSpec(kind,spec);
  const events=[{v:1,op:'surface.begin',id:'visual-scene'},...sceneStateEvents(options),
    {v:1,op:'node.put',id:'visual',type:kind,props:clean},
    {v:1,op:'surface.end',id:'visual-scene'}];
  const lines=events.map(e=>JSON.stringify(e)+'\n');
  if(lines.some(line=>new TextEncoder().encode(line).length>65536))err('diagram is too large for one VIE JSONL event');
  return lines.join('');
}

return {VISUAL_KINDS,visualNodeProps,validateVisualSpec,visualSceneSource,sceneStateEvents};
})();
const {storySceneSource,validateStorySpec}=(()=>{
/** Multi-panel semantic answer. Preserve the authored teaching sequence. */
const checkText=(x,max)=>{if(typeof x!=='string'||x.length>max)throw Error('Story: invalid text');return x;};
function validateStorySpec(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype)throw Error('Story: invalid object');
  for(const k of Object.keys(input))if(!['title','opening','takeaway','panels','state','derive'].includes(k))throw Error('Story: forbidden field '+k);
  if(!Array.isArray(input.panels)||input.panels.length<1||input.panels.length>4)throw Error('Story: requires 1–4 panels');
  const panels=input.panels.map(p=>{
    if(!p||typeof p!=='object'||Array.isArray(p))throw Error('Story: invalid panel');
    for(const k of Object.keys(p))if(!['kind','spec','caption'].includes(k))throw Error('Story: forbidden panel field '+k);
    if(!VISUAL_KINDS.includes(p.kind)&&p.kind!=='InteractiveScene')throw Error('Story: invalid panel kind');
    return {kind:p.kind,spec:p.kind==='InteractiveScene'?validateExperimentSpec(p.spec):validateVisualSpec(p.kind,p.spec),caption:p.caption===undefined?'':checkText(p.caption,1200)};
  });
  return {title:checkText(input.title??'交互图文解释',90),opening:checkText(input.opening??'',1200),takeaway:checkText(input.takeaway??'',1200),panels,state:input.state??{},derive:input.derive??{}};
}
function storySceneSource(input){
  const s=validateStorySpec(input),panel=[...s.panels];
  const ev=[{v:1,op:'surface.begin',id:'story-scene'},...sceneStateEvents(s)];
  let order=0;
  const put=(type,props)=>{ev.push({v:1,op:'node.put',id:'panel'+(++order),order,type,props});};
  panel.forEach((p,i)=>{
    put(p.kind,p.spec);
    // Keep paragraphs independent so individual live-text budgets stay bounded.
    if(i===0&&s.opening)put('Text',{body:s.opening});
    if(p.caption)put('Text',{body:p.caption});
  });
  if(s.takeaway)put('Text',{title:'核心结论',body:s.takeaway});
  ev.push({v:1,op:'surface.end',id:'story-scene'});
  const lines=ev.map(e=>JSON.stringify(e)+'\n');
  const enc=new TextEncoder();if(lines.some(line=>enc.encode(line).length>65536))throw Error('Story: panel exceeds per-event bound');
  if(enc.encode(lines.join('')).length>262144)throw Error('Story: total source too large');
  return lines.join('');
}

return {storySceneSource,validateStorySpec};
})();
/** VIE v0.14.1 - pure, dependency-free, browser/Node compatible core.
 * DSL input is bounded data; generated figure scripts run only in isolated frames. */
const LIMITS = Object.freeze({bytes: 262144, line: 65536, events: 300, nodes: 80, depth: 10});

/** Authoritative VIE v1 component-property contract. A property must have a
 * meaningful renderer/runtime consumer before it can be listed here. */
const COMPONENT_CATALOG=Object.freeze({
  Chart:{props:['title','x','y','series','controls','inputs','regions','note'],description:'General formula/data chart with local controls and region fills; no generated code required'},
  GenerativeFigure:{props:['title','html','css','js','height','state','bindings'],description:'Topic-independent generated HTML/CSS/JS, isolated iframe; SVG/Canvas/WebGL and custom interaction, not bound to experiment templates'},
  Column:{props:[],description:'Vertical layout'}, Row:{props:[],description:'Horizontal layout'},
  Split:{props:['ratio'],description:'Responsive text / visual split layout'},
  Card:{props:['title'],description:'Grouped content'}, Text:{props:['title','body'],description:'Explanatory text'},
  Metric:{props:['label','value','bind','unit','format'],description:'Numeric readout (number/integer/percent/signed)'},
  Slider:{props:['label','bind','default','min','max','step','unit','format'],description:'Bound numeric slider'},
  NumberInput:{props:['label','bind','default','min','max','step','unit','format'],description:'Bound numeric input'},
  Toggle:{props:['label','bind','default','min','max','step'],description:'Numeric 0/1 switch'},
  SegmentedControl:{props:['label','bind','default','min','max','step','options'],description:'Numeric choice buttons'},
  Button:{props:['label','action','target','setValue'],description:'State set/reset action'},
  Progress:{props:['label','value','bind','min','max','unit','expr','format'],description:'Normalized progress with value and percent'},
  BarChart:{props:['title','data','labels','unit','sourceLabel','showAverage'],description:'Evidence-bearing labeled bars (optional aggregate summary)'},
  FunctionPlot:{props:['title','expr','xMin','xMax','yMin','yMax','sampleX'],description:'Configurable Cartesian function plot with optional dynamic sample point'},
  Divider:{props:[],description:'Divider'},Badge:{props:['label','title'],description:'Short label'},
  MotionScene:{props:['title','bind','min','max','unit'],description:'Preset moving-car displacement illustration'},
  CanTimingLab:{props:['clockMHz','prescaler','bs1','bs2','sjw','compareBs1','compareBs2'],description:'bxCAN bit timing experiment'},
  InteractiveLab:{props:['kind'],description:'Built-in bitwise/timer/ohm/fraction/probability/vector lab'},
  InteractiveScene:{props:['template','parameters','title'],description:'Registered experiment: planetary/gears/geartrain/worm/wave/process/vector; use geartrain for 2–6 serial external gears, worm for crossed-axis worm drive; trusted geometry, controls and readouts'},
  Flow:{props:['title','subtitle','layout','nodes','edges','accuracy'],description:'Automatic flow layout'},
  RelationGraph:{props:['title','subtitle','layout','nodes','edges','accuracy'],description:'Automatic relationship graph'},
  Timeline:{props:['title','subtitle','items','accuracy'],description:'Interactive chronological events'},
  Diagram:{props:['title','subtitle','shapes','width','height','accuracy','representation'],description:'Bounded schematic primitives; shapes can have label/detail; geometry is not a domain solver'},
  Animation:{props:['title','subtitle','shapes','width','height','accuracy','representation','duration','motions'],description:'Generic declared transform animation for any topic; use GenerativeFigure for arbitrary per-frame calculations or 3D projection'}
});
const COMPONENT_DESCRIPTIONS=Object.freeze(Object.entries(COMPONENT_CATALOG)
  .map(([type,details])=>`${type} (${details.props.join(',')||'no props'}): ${details.description}`));
const FORMATS=new Set(['number','integer','percent','signed']);
/** Restricted live-text placeholders. No HTML and no eval. */
function templatePaths(template){
  if(typeof template!=='string'||template.length>1400)error('Invalid template text');
  const references=[];let count=0;
  const mask=template.replace(/\\\{\{[^{}]*\}\}/g,'\u0001');
  const pattern=/\{\{([^{}]*)\}\}/g;
  let match;
  while((match=pattern.exec(mask))!==null){
    if(++count>12)error('Too many live text slots');
    const bits=match[1].split('|');const key=path(bits.shift());
    for(const filter of bits){
      if(!/^(integer|fixed:[0-4]|signed:[0-4]|percent:[0-3]|unit:[A-Za-z%°μΩ\u4e00-\u9fff]{1,12})$/.test(filter))error('Invalid text filter: '+filter);
    }
    references.push(key);
  }
  if(mask.replace(pattern,'').includes('{{')||mask.replace(pattern,'').includes('}}'))error('Unclosed text slot');
  return references;
}
function interpolateText(template,values={}){
  templatePaths(template);
  return template.replace(/\\\{\{([^{}]*)\}\}|\{\{([^{}]*)\}\}/g,(literal,escaped,content)=>{
    if(escaped!==undefined)return '{{'+escaped+'}}';
    const [key,...filters]=content.split('|');let value=Object.hasOwn(values,key)?values[key]:null;
    if(typeof value!=='number'||!Number.isFinite(value))return '—';
    let string=Number.isInteger(value)?String(value):String(Number(value.toFixed(2)));
    for(const filter of filters){
      if(filter==='integer')string=String(Math.round(value));
      else if(filter.startsWith('fixed:'))string=value.toFixed(Number(filter.slice(6)));
      else if(filter.startsWith('signed:'))string=(value>0?'+':'')+value.toFixed(Number(filter.slice(7)));
      else if(filter.startsWith('percent:'))string=(value*100).toFixed(Number(filter.slice(8)))+'%';
      else if(filter.startsWith('unit:'))string+=' '+filter.slice(5);
    }
    return string;
  });
}

const ALLOWED = new Set(Object.keys(COMPONENT_CATALOG));
const ID = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const PATH = /^\/[a-zA-Z][a-zA-Z0-9_/-]{0,95}$/;
const PLAIN = x => x !== null && typeof x === 'object' && !Array.isArray(x) && Object.getPrototypeOf(x) === Object.prototype;
const finite = x => typeof x === 'number' && Number.isFinite(x);
function error(message){throw new Error(message)}
function text(x,max=300){ if(typeof x!=='string'||x.length>max) error('Invalid text'); return x; }
function id(x){if(typeof x!=='string'||!ID.test(x))error('Invalid id'); return x;}
function path(x){if(typeof x!=='string'||!PATH.test(x)||x.includes('//'))error('Invalid state path');return x;}
function val(x){ if(!(typeof x==='string' && x.length<=200 || typeof x==='boolean' || finite(x)))error('Invalid state value'); return x; }
function number(x,min,max){if(!finite(x)||x<min||x>max)error('Invalid numeric value');return x;}
const shared = o => {if(!PLAIN(o))error('Expected object');return o;};
function validateEvent(event) {
  shared(event);
  if(event.v!==1)error('Unsupported protocol version');
  if(!['surface.begin','node.put','node.remove','state.init','state.derive','surface.end'].includes(event.op))error('Unknown operation');
  if(event.op==='surface.begin'||event.op==='surface.end')return {v:1,op:event.op,id:id(event.id)};
  if(event.op==='node.remove')return {v:1,op:event.op,id:id(event.id)};
  if(event.op==='state.init')return {v:1,op:event.op,path:path(event.path),value:val(event.value)};
  if(event.op==='state.derive')return {v:1,op:event.op,path:path(event.path),expr:text(event.expr,300)};
  const type=text(event.type,32);
  if(!ALLOWED.has(type)) error('Unsupported component: '+type);
  const props=shared(event.props??{});
  if(type==='Chart')return {v:1,op:'node.put',id:id(event.id),type,props:validateChartSpec(props),parent:event.parent===undefined?'root':id(event.parent),order:event.order===undefined?0:number(event.order,-10000,10000)};
  if(type==='GenerativeFigure')return {v:1,op:'node.put',id:id(event.id),type,props:validateFigureDefinition(props),parent:event.parent===undefined?'root':id(event.parent),order:event.order===undefined?0:number(event.order,-10000,10000)};
  if(type==='InteractiveScene'){
    return {v:1,op:'node.put',id:id(event.id),type,props:validateExperimentSpec(props),parent:event.parent===undefined?'root':id(event.parent),order:event.order===undefined?0:number(event.order,-10000,10000)};
  }
  if(VISUAL_KINDS.includes(type)){
    const parent=event.parent===undefined?'root':id(event.parent);
    const order=event.order===undefined?0:number(event.order,-10000,10000);
    return {v:1,op:'node.put',id:id(event.id),type,props:visualNodeProps(type,props),parent,order};
  }
  if(Object.keys(props).length>25)error('Too many props');
  const contract=COMPONENT_CATALOG[type].props;
  const sanitized={};
  for(const [key,value] of Object.entries(props)) {
    if(!/^[a-zA-Z][\w]*$/.test(key))error('Invalid prop key');
    if(!contract.includes(key))error('Unsupported prop '+type+'.'+key);
    if(['label','title','body','unit','sourceLabel','kind'].includes(key)) {sanitized[key]=text(value,key==='body'?1400:700);if(['title','body'].includes(key))templatePaths(sanitized[key]);}
    else if(['bind','target'].includes(key))sanitized[key]=path(value);
    else if(key==='format'){if(!FORMATS.has(value))error('Unsupported format: '+value);sanitized[key]=value;}
    else if(key==='showAverage'){if(typeof value!=='boolean')error('Invalid showAverage flag');sanitized[key]=value;}
    else if(key==='ratio')sanitized[key]=number(value,0.2,0.8);
    else if(['xMin','xMax','yMin','yMax'].includes(key))sanitized[key]=number(value,-1000,1000);
    else if(key==='sampleX')sanitized[key]=typeof value==='string'?path(value):number(value,-1000,1000);
    else if(key==='action') {if(!['reset','set'].includes(value))error('Invalid action');sanitized[key]=value;}
    else if(['value','min','max','step','default','setValue','clockMHz','prescaler','bs1','bs2','sjw','compareBs1','compareBs2'].includes(key))sanitized[key]=typeof value==='string' && key==='default'?text(value,200):number(value,-1e9,1e9);
    else if(key==='expr')sanitized[key]=text(value,300);
    else if(key==='options') {if(!Array.isArray(value)||value.length<2||value.length>8)error('Invalid options');sanitized.options=value.map(o=>{if(!PLAIN(o)||Object.keys(o).some(k=>!['label','value'].includes(k)))error('Invalid option');return {label:text(o.label,40),value:number(o.value,-1e9,1e9)};});}
    else if(key==='labels') { if(!Array.isArray(value)||value.length>10||!value.every(v=>typeof v==='string'&&v.length>0&&v.length<=24))error('Invalid chart labels'); sanitized[key]=[...value]; }
    else if(['data'].includes(key)) {
      if(!Array.isArray(value)||value.length>160)error('Too many chart points');
      sanitized[key]=value.map(x=>typeof x==='string'?path(x):number(x,-1e9,1e9));
    }
  }
  if(['Slider','NumberInput','Toggle','SegmentedControl'].includes(type)) {
    if(!sanitized.bind)error('Slider requires a state binding');
    if(type==='Toggle'&&(sanitized.min!==0||sanitized.max!==1||sanitized.step!==1))error('Toggle requires 0/1 bounds');
    if(type==='SegmentedControl'){if(!sanitized.options||new Set(sanitized.options.map(o=>o.value)).size!==sanitized.options.length||!sanitized.options.some(o=>o.value===sanitized.default))error('Invalid segmented default/options');for(const o of sanitized.options)assertSliderValue({min:sanitized.min??0,max:sanitized.max??100,step:sanitized.step??1},o.value);}
    const min=sanitized.min??0,max=sanitized.max??100,step=sanitized.step??1;
    if(!(min<max))error('Slider min must be less than max');
    if(!(step>0&&step<=max-min))error('Slider step must be positive and within range');
    if((max-min)/step>1e7)error('Slider resolution is excessive');
    if(sanitized.default!==undefined){
      if(!finite(sanitized.default))error('Slider default must be numeric');
      assertSliderValue({min,max,step},sanitized.default,'Slider default');
    }
  }
  if(type==='Progress'){
    const min=sanitized.min??0,max=sanitized.max??100;
    if(!(min<max))error('Progress min must be less than max');
    if(sanitized.value===undefined&&!sanitized.bind&&!sanitized.expr)error('Progress requires value, bind or expr');
  }
  if(type==='Button') {
    if(!sanitized.action)error('Button requires action');
    if(sanitized.action==='set' && (!sanitized.target||sanitized.setValue===undefined))error('Set button requires target and value');
    if(sanitized.action==='reset'&&!sanitized.target)error('Reset button requires target');
  }
  if(type==='FunctionPlot'){
    if((sanitized.xMin??-4)>=(sanitized.xMax??4)||(sanitized.yMin??-12)>=(sanitized.yMax??12))error('FunctionPlot bounds must be increasing');
    if(typeof sanitized.sampleX==='number'&&(sanitized.sampleX<(sanitized.xMin??-4)||sanitized.sampleX>(sanitized.xMax??4)))error('FunctionPlot sample outside x bounds');
  }
  if(type==='InteractiveLab' && !['bitwise','timer','ohm','fraction','probability','vector'].includes(sanitized.kind))error('Unknown semantic lab kind');
  if(type==='BarChart' && (!Array.isArray(sanitized.data)||sanitized.data.length<2||sanitized.data.length>10||!Array.isArray(sanitized.labels)||sanitized.labels.length!==sanitized.data.length))error('BarChart needs 2–10 labeled values');
  const parent=event.parent===undefined?'root':id(event.parent);
  const order=event.order===undefined?0:number(event.order,-10000,10000);
  return {v:1,op:'node.put',id:id(event.id),type,props:sanitized,parent,order};
}
/** Sliders are declarative constraints, not merely visual hints.
 * Reject incompatible programmatic/model writes instead of silently clamping.
 */
function assertSliderValue({min,max,step,options},value,label='Slider value'){
  if(options&&!options.includes(value))error(label+' is not a declared option');
  if(!finite(value)||value<min-1e-9||value>max+1e-9)error(label+' outside slider bounds');
  const steps=(value-min)/step;
  const nearest=min+Math.round(steps)*step;
  const epsilon=Math.max(32*Number.EPSILON*Math.max(1,Math.abs(min),Math.abs(value)),1e-10*step);
  if(Math.abs(value-nearest)>Math.min(epsilon,step*1e-4))error(label+' does not match slider step');
  return value;
}
function sliderConstraints(nodes){
  const constraints=new Map();
  for(const node of nodes.values()){
    if(!['Slider','NumberInput','Toggle','SegmentedControl'].includes(node.type))continue;
    const p=node.props;const item={min:p.min??0,max:p.max??100,step:p.step??1,...(node.type==='SegmentedControl'?{options:p.options.map(o=>o.value)}:{})};
    if(constraints.has(p.bind)){
      const earlier=constraints.get(p.bind);
      if(earlier.min!==item.min||earlier.max!==item.max||earlier.step!==item.step||JSON.stringify(earlier.options)!==JSON.stringify(item.options))error('Conflicting slider constraints: '+p.bind);
    }
    constraints.set(p.bind,item);
  }
  return constraints;
}
const MATH_FNS=Object.freeze({sin:Math.sin,cos:Math.cos,tan:Math.tan,sqrt:Math.sqrt,abs:Math.abs,log:Math.log,log10:Math.log10,exp:Math.exp,floor:Math.floor,ceil:Math.ceil,round:Math.round,min:Math.min,max:Math.max,clamp:(x,a,b)=>Math.min(Math.max(x,a),b),step:(edge,x)=>x<edge?0:1,atan2:Math.atan2,asin:Math.asin,acos:Math.acos,hypot:Math.hypot});
const MATH_CONST=Object.freeze({PI:Math.PI,E:Math.E});
const EXPRESSION_CACHE=new Map();
function evaluate(expr,data={}){
  if(typeof expr!=='string'||expr.length>300)error('Expression too long');
  let ast=EXPRESSION_CACHE.get(expr);
  if(!ast){
  const tokens=[];
  const scanner=/\s*([A-Za-z_][A-Za-z_0-9]*|(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|\*\*|<=|>=|==|!=|[()+\-*\/%?,:<>])\s*/gy;
  let pos=0;while(pos<expr.length){scanner.lastIndex=pos;const match=scanner.exec(expr);if(!match)error('Expression token refused at '+pos);tokens.push(match[1]);pos=scanner.lastIndex;if(tokens.length>120)error('Too many expression tokens');}
  let i=0;const precedences={'==':5,'!=':5,'<':5,'>':5,'<=':5,'>=':5,'+':10,'-':10,'*':20,'/':20,'%':20,'**':40};
  const primary=()=>{
    const t=tokens[i++];if(t===undefined)error('Missing value');
    if(t==='('){const result=parse(0);if(tokens[i++]!==')')error('Unclosed parenthesis');return result;}
    if(t==='+'||t==='-')return {op:'unary',sign:t,value:parse(35)};
    if(/^(?:\d|\.)/.test(t))return {op:'number',value:Number(t)};
    if(/^[A-Za-z_]/.test(t)){
      if(tokens[i]==='('){i++;const args=[];if(tokens[i]!==')'){do{if(args.length>=8)error('Too many call arguments');args.push(parse(0));if(tokens[i]!==',')break;i++;}while(true);}if(tokens[i++]!==')')error('Function arguments not closed');if(t!=='if'&&!Object.hasOwn(MATH_FNS,t))error('Unknown function: '+t);return {op:'call',name:t,args};}
      return {op:'variable',name:t};
    }
    error('Invalid expression value');
  };
  const parse=(min=0)=>{
    let left=primary();
    while(i<tokens.length){const operator=tokens[i],precedence=precedences[operator];if(precedence===undefined||precedence<min)break;i++;const right=parse(precedence+(operator==='**'?0:1));left={op:'binary',operator,left,right};}
    if(min===0&&tokens[i]==='?'){i++;const yes=parse(0);if(tokens[i++]!==':')error('Conditional needs colon');const no=parse(0);left={op:'condition',check:left,yes,no};}
    return left;
  };
  ast=parse(0);if(i!==tokens.length)error('Unparsed expression');
  EXPRESSION_CACHE.set(expr,ast);if(EXPRESSION_CACHE.size>128)EXPRESSION_CACHE.delete(EXPRESSION_CACHE.keys().next().value);
  }
  let budget=0;
  const calculate=node=>{
    if(++budget>250)error('Expression complexity exceeded');
    let result;
    if(node.op==='number')result=node.value;
    else if(node.op==='variable'){
      if(Object.hasOwn(MATH_CONST,node.name))result=MATH_CONST[node.name];
      else {if(!Object.hasOwn(data,node.name)||!finite(data[node.name]))error('Unbound variable: '+node.name);result=data[node.name];}
    }else if(node.op==='unary')result=(node.sign==='-'?-1:1)*calculate(node.value);
    else if(node.op==='condition')result=calculate(node.check)!==0?calculate(node.yes):calculate(node.no);
    else if(node.op==='call'){
      if(node.name==='if'){
        if(node.args.length!==3)error('if requires three arguments');
        result=calculate(node.args[0])!==0?calculate(node.args[1]):calculate(node.args[2]);
      }else{
        const args=node.args.map(calculate);
        const argc={clamp:3,step:2,atan2:2,asin:1,acos:1,hypot:2,sin:1,cos:1,tan:1,sqrt:1,abs:1,log:1,log10:1,exp:1,floor:1,ceil:1,round:1};
        if(argc[node.name]!==undefined&&args.length!==argc[node.name]||(['min','max'].includes(node.name)&&args.length<1))error('Invalid argument count');
        result=MATH_FNS[node.name](...args);
      }
    }else if(node.op==='binary'){
      const a=calculate(node.left),b=calculate(node.right);
      if(['/','%'].includes(node.operator)&&b===0)error('Division by zero');
      switch(node.operator){case '+':result=a+b;break;case '-':result=a-b;break;case '*':result=a*b;break;case '/':result=a/b;break;case '%':result=a%b;break;case '**':result=a**b;break;case '<':result=Number(a<b);break;case '>':result=Number(a>b);break;case '<=':result=Number(a<=b);break;case '>=':result=Number(a>=b);break;case '==':result=Number(a===b);break;case '!=':result=Number(a!==b);break;default:error('Unsupported operator');}
    }
    if(!finite(result)||Math.abs(result)>1e12)error('Numeric overflow');
    return result;
  };
  return calculate(ast);
}
function variables(state) { const vars=Object.create(null);for(const [k,v] of Object.entries(state)) {const key=k.split('/').at(-1);if(typeof v==='number'&&/^[A-Za-z_]\w*$/.test(key))vars[key]=v;}return vars; }
function derivedValue(expr, state){return evaluate(expr,variables(state));}
/** A finite-value-only result channel. Invalid runtime numbers never enter
 * scene.state, derived values, checkpoint JSON, or SVG attributes. */
function computeDerived(scene){
  const values={...scene.state};
  const failures=new Map();
  const maxPasses=Object.keys(scene.formulas).length+1;
  for(let pass=0;pass<maxPasses;pass++){
    let changed=false;
    for(const [key,expr] of Object.entries(scene.formulas)){
      try{
        const result=derivedValue(expr,values);
        if(values[key]!==result){values[key]=result;changed=true;}
        failures.delete(key);
      }catch(cause){failures.set(key,String(cause.message||cause));}
    }
    if(!changed)break;
  }
  return {values,failures};
}
/** Validate dependencies structurally, independently of runtime numeric values.
 * Pending input values while streaming are different from missing inputs once
 * surface.end has arrived. */
function validateFormulas(scene){
  const errors=[], aliases=new Map(), keys=[...Object.keys(scene.state),...Object.keys(scene.formulas)];
  for(const key of keys){
    const alias=key.slice(key.lastIndexOf('/')+1);
    if(aliases.has(alias)&&aliases.get(alias)!==key)errors.push('Ambiguous expression variable: '+alias);
    else aliases.set(alias,key);
  }
  const formulaAliases=new Map(Object.keys(scene.formulas).map(key=>[key.slice(key.lastIndexOf('/')+1),key]));
  const references=new Map();
  for(const [key,expr] of Object.entries(scene.formulas)){
    if(Object.hasOwn(scene.state,key))errors.push('Derived state conflicts with input: '+key);
    // Evaluate once with dummy finite placeholders to check syntax independent
    // of runtime division by zero. Numeric domain errors are nonfatal here.
    const names=[...new Set(expr.match(/\b[A-Za-z_][A-Za-z_0-9]*\b/g)??[])].filter(x=>!/^e\d+$/i.test(x)&&!Object.hasOwn(MATH_FNS,x)&&!Object.hasOwn(MATH_CONST,x)&&x!=='if');
    for(const name of names)if(!aliases.has(name))errors.push('Unknown expression input: '+key+' -> '+name);
    references.set(key,names.filter(name=>formulaAliases.has(name)).map(name=>formulaAliases.get(name)));
    // Check lexical/syntax errors even when the real inputs are not yet usable.
    try{evaluate(expr,Object.fromEntries(names.map(name=>[name,1])));}catch(e){
      if(!/Unsafe numeric result|Division by zero|Numeric overflow/.test(String(e.message)))errors.push('Invalid expression '+key+': '+e.message);
    }
  }
  const seen=new Set(), active=new Set();
  const visit=key=>{
    if(active.has(key)){errors.push('Cyclic formula: '+key);return;}
    if(seen.has(key))return;
    active.add(key);for(const dependency of references.get(key)??[])visit(dependency);
    active.delete(key);seen.add(key);
  };
  for(const key of references.keys())visit(key);
  return errors;
}
class VIEStream {
  constructor(){this.buffer='';this.source='';this.events=0;this.lineNumber=0;this.errors=[];this.modified=new Set();this.defaults=Object.create(null);this.scene={id:null,nodes:new Map(),state:Object.create(null),formulas:Object.create(null),complete:false};this.begun=false;this.ended=false;this.finished=false;this.failed=false;this.total=0;}
  push(part){
    if(typeof part!=='string')error('Chunk must be text');
    if(this.finished){this.errors.push('Stream already finalized');this.failed=true;return 0;}
    this.total+=new TextEncoder().encode(part).length;
    if(this.total>LIMITS.bytes){this.errors.push('Source size limit exceeded');this.failed=true;return 0;}
    this.buffer+=part; let n=0, at;
    while((at=this.buffer.indexOf('\n'))!==-1) {
      const line=this.buffer.slice(0,at).trim();this.buffer=this.buffer.slice(at+1);
      this.lineNumber++;
      if(line){this.consume(line,this.lineNumber);n++;}
    }
    if(new TextEncoder().encode(this.buffer).length>LIMITS.line){this.errors.push('Incomplete line too long');this.failed=true;this.buffer='';}
    return n;
  }
  finish(){
    if(this.finished)return this.snapshot();
    if(this.buffer.trim()){this.consume(this.buffer.trim(),this.lineNumber+1);this.buffer='';}
    this.finished=true;
    if(!this.begun){this.errors.push('Missing surface.begin');this.failed=true;}
    if(!this.ended){this.errors.push('Missing surface.end');this.failed=true;}
    const {errors}=this.tree();
    if(errors.length){this.errors.push(...errors);this.failed=true;}
    if(this.errors.length)this.failed=true;
    this.scene.complete=this.ended&&!this.failed;
    return this.snapshot();
  }
  consume(line,sourceLine=this.lineNumber+1){
    this.events++;if(this.events>LIMITS.events){if(this.events===LIMITS.events+1)this.errors.push('Event limit exceeded');this.failed=true;return;}
    if(new TextEncoder().encode(line).length>LIMITS.line){this.errors.push('Line too large');this.failed=true;return;}
    try{const e=validateEvent(JSON.parse(line));this.apply(e);}catch(ex){this.failed=true;this.errors.push(`Line ${sourceLine} (event ${this.events}): ${String(ex.message||ex)}`);}
  }
  apply(e){
    const s=this.scene;
    if(e.op==='surface.begin'){
      if(this.begun||this.ended)error('Duplicate surface.begin');
      this.begun=true;s.id=e.id;return;
    }
    if(!this.begun)error('Event before surface.begin');
    if(this.ended)error('Event after surface.end');
    if(e.op==='surface.end'){
      if(e.id!==s.id)error(`Mismatched surface.end: ${e.id} != ${s.id}`);
      this.ended=true;
      const check=this.tree();
      if(check.errors.length)error(check.errors.join('; '));
      if(!s.nodes.size)error('Empty surface');
      if(this.errors.length||this.failed)error('Surface contains rejected events');
      s.complete=true;return;
    }
    else if(e.op==='node.put'){
      if(e.type==='CanTimingLab')normalizeCanPreset(e.props);
      if(!s.nodes.has(e.id)&&s.nodes.size>=LIMITS.nodes)error('Too many nodes');
      if(e.parent===e.id)error('Node cannot parent itself');
      if(e.props.bind && e.props.default!==undefined){
        if(Object.hasOwn(this.defaults,e.props.bind)&&this.defaults[e.props.bind]!==e.props.default)error('Conflicting slider default: '+e.props.bind);
        if(!Object.hasOwn(this.defaults,e.props.bind))this.defaults[e.props.bind]=e.props.default;
        if(!Object.hasOwn(s.state,e.props.bind))s.state[e.props.bind]=e.props.default;
      }
      s.nodes.set(e.id,e);
    }
    else if(e.op==='node.remove'){s.nodes.delete(e.id);}
    else if(e.op==='state.init'){
      if(Object.hasOwn(this.defaults,e.path)&&this.defaults[e.path]!==e.value)error('Conflicting state defaults: '+e.path);
      if(!Object.hasOwn(this.defaults,e.path))this.defaults[e.path]=e.value;
      if(!Object.hasOwn(s.state,e.path))s.state[e.path]=e.value;
    }
    else if(e.op==='state.derive'){s.formulas[e.path]=e.expr;}
  }
  set(pathKey,value){
    path(pathKey);val(value);
    if(!Object.hasOwn(this.scene.state,pathKey))error('Unknown state path');
    const constraint=sliderConstraints(this.scene.nodes).get(pathKey);
    if(constraint)assertSliderValue(constraint,value,'State '+pathKey);
    const previous=this.scene.state[pathKey];
    if(typeof previous!==typeof value)error('State type mismatch: '+pathKey);
    this.scene.state[pathKey]=value;this.modified.add(pathKey);
  }
  reset(pathKey){path(pathKey);if(!Object.hasOwn(this.defaults,pathKey))error('Unknown default');this.scene.state[pathKey]=this.defaults[pathKey];this.modified.delete(pathKey);}
  tree(){
    const nodes=this.scene.nodes;
    const memo=new Set();const errors=[];
    const derived=computeDerived(this.scene).values;
    const build=(parent,depth,seen)=>{
      if(depth>LIMITS.depth){errors.push('Depth limit exceeded');return [];}
      const list=[...nodes.values()].filter(n=>n.parent===parent).sort((a,b)=>a.order-b.order);
      return list.flatMap(n=>{
        if(seen.has(n.id)){errors.push('Cycle at '+n.id);return [];}
        if(memo.has(n.id)){errors.push('Duplicate node '+n.id);return [];}
        if(n.props.bind && !Object.hasOwn(derived,n.props.bind) && !Object.hasOwn(this.scene.formulas,n.props.bind)){
          if(this.ended)errors.push('Missing binding: node '+n.id+' -> '+n.props.bind);
          return [];
        }
        memo.add(n.id);return [{...n,children:build(n.id,depth+1,new Set([...seen,n.id]))}];
      });
    };
    const tree=build('root',0,new Set());
    if(this.ended && memo.size<nodes.size){
      const missing=[...nodes.keys()].filter(k=>!memo.has(k));
      errors.push('Unresolved/cyclic nodes: '+missing.slice(0,8).join(', '));
    }
    // State may arrive before or after its component, so check once the
    // entire surface exists as well as on every user update.
    if(this.ended){
      try {
        for(const [statePath,constraint] of sliderConstraints(nodes)){
          if(Object.hasOwn(this.scene.state,statePath))assertSliderValue(constraint,this.scene.state[statePath],'State '+statePath);
        }
      } catch(ex) {errors.push(String(ex.message||ex));}
    }
    if(this.ended){
      const available=new Set([...Object.keys(this.scene.state),...Object.keys(this.scene.formulas)]);
      const verify=(ref,where)=>{if(!available.has(ref))errors.push('Missing visual/text binding: '+where+' -> '+ref);};
      for(const node of nodes.values()){
        for(const field of ['title','body','caption'])if(typeof node.props[field]==='string'){
          try{for(const ref of templatePaths(node.props[field]))verify(ref,node.id+'.'+field);}catch(ex){errors.push('Invalid text template '+node.id+': '+ex.message);}
        }
        if(['Flow','RelationGraph','Timeline'].includes(node.type)){
          for(const item of [...(node.props.nodes??[]),...(node.props.items??[]),...(node.props.edges??[])])
            for(const field of ['label','detail','at'])if(typeof item[field]==='string')
              for(const ref of templatePaths(item[field]))verify(ref,node.id+'.'+field);
        }
        if(node.type==='Diagram'||node.type==='Animation')for(const shape of node.props.shapes){
          for(const [k,v] of Object.entries(shape)){
            if(v&&typeof v==='object'&&!Array.isArray(v)&&Object.hasOwn(v,'$bind'))verify(v.$bind,node.id+'.'+(shape.id??shape.k)+'.'+k);
            if(k==='t'&&typeof v==='string')for(const ref of templatePaths(v))verify(ref,node.id+'.text');
          }
        }
        if(node.type==='GenerativeFigure')for(const ref of Object.values(node.props.bindings??{}))verify(ref,node.id+'.bindings');
        if(node.type==='Chart')for(const p of [...node.props.controls.filter(c=>c.bind),...(node.props.inputs??[])])verify(p.bind,node.id+'.chart');
        if(node.type==='BarChart')for(const ref of node.props.data.filter(v=>typeof v==='string'))verify(ref,node.id+'.data');
        if(node.type==='Chart')for(const c of node.props.controls.filter(c=>c.bind)){verify(c.bind,node.id+'.controls');const v=this.scene.state[c.bind];if(typeof v!=='number'||v<c.min||v>c.max)errors.push('Invalid shared chart state: '+c.bind);}
        if(node.type==='FunctionPlot'&&typeof node.props.sampleX==='string')verify(node.props.sampleX,node.id+'.sampleX');
      }
    }
    if(this.ended)errors.push(...validateFormulas(this.scene));
    return {tree,errors};
  }
  interactionContext(){
    const updated=Object.create(null);
    for(const key of [...this.modified].sort().slice(0,24)){
      if(Object.hasOwn(this.scene.state,key))updated[key]=this.scene.state[key];
    }
    const derived=Object.create(null),values=computeDerived(this.scene).values;
    for(const key of Object.keys(this.scene.formulas).slice(0,24)){
      if(Object.hasOwn(values,key))derived[key]=values[key];
    }
    return {sceneId:this.scene.id,updated,derived};
  }
  snapshot(){
    const {tree,errors}=this.tree(),result=computeDerived(this.scene);
    const diagnostics=[...result.failures].map(([path,message])=>({path,code:message.includes('Division by zero')?'DIV_ZERO':message.includes('overflow')?'OVERFLOW':'EVAL_UNAVAILABLE',message}));
    const allErrors=[...new Set([...this.errors,...errors])];
    return {id:this.scene.id,complete:this.scene.complete&&!this.failed&&allErrors.length===0,tree,state:{...this.scene.state},values:result.values,formulas:{...this.scene.formulas},errors:allErrors,diagnostics,events:this.events};
  }
}
function parseSource(s){const p=new VIEStream();p.push(s);p.finish();return p;}
/** Decode an incrementally streamed JSON string argument without executing it. */
function partialString(raw, key='source'){
  if(typeof raw!=='string'||raw.length>LIMITS.bytes*3)return '';
  const re=new RegExp('"'+key+'"\\s*:\\s*"','u');const hit=re.exec(raw);if(!hit)return '';
  let pos=hit.index+hit[0].length,out='';
  for(;pos<raw.length&&out.length<LIMITS.bytes;pos++){
    const c=raw[pos];if(c==='"')return out;if(c!=='\\'){out+=c;continue;}
    if(pos+1>=raw.length)break;
    const n=raw[++pos];const table={n:'\n',t:'\t',r:'\r',b:'\b',f:'\f','"':'"','\\':'\\','/':'/'};
    if(n==='u'){
      if(pos+4>=raw.length)break;
      const hex=raw.slice(pos+1,pos+5);if(!/^[0-9a-fA-F]{4}$/.test(hex))break;
      out+=String.fromCharCode(parseInt(hex,16));pos+=4;
    } else if(Object.hasOwn(table,n))out+=table[n]; else break;
  }
  return out;
}
const DEMO_SOURCE = [
  {v:1,op:'surface.begin',id:'motion-lab'},
  {v:1,op:'node.put',id:'hero',type:'Text',props:{title:'匀速运动',body:'调整速度与时间，观察位移 s = vt。'}},
  {v:1,op:'node.put',id:'motion',type:'MotionScene',order:1,props:{title:'运动距离',bind:'/distance',min:0,max:400,unit:'m'}},
  {v:1,op:'node.put',id:'controls',type:'Column',order:2,props:{}},
  {v:1,op:'node.put',id:'sliders',type:'Row',parent:'controls',props:{}},
  {v:1,op:'node.put',id:'speed',parent:'sliders',order:1,type:'Slider',props:{label:'速度 v',unit:'m/s',bind:'/speed',default:20,min:0,max:40,step:1}},
  {v:1,op:'node.put',id:'time',parent:'sliders',order:2,type:'Slider',props:{label:'时间 t',unit:'s',bind:'/time',default:5,min:0,max:10,step:1}},
  {v:1,op:'state.derive',path:'/distance',expr:'speed * time'},
  {v:1,op:'node.put',id:'summary',type:'Column',order:3,props:{}},
  {v:1,op:'node.put',id:'distance',parent:'summary',type:'Metric',order:1,props:{label:'位移 s = v × t',bind:'/distance',unit:'m'}},
  {v:1,op:'node.put',id:'outro',order:4,type:'Text',props:{body:'速度不变时，时间加倍，位移也加倍。'}},
  {v:1,op:'surface.end',id:'motion-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');

const FUNCTION_DEMO_SOURCE = [
  {v:1,op:'surface.begin',id:'function-lab'},
  {v:1,op:'node.put',id:'hero',type:'Text',props:{title:'二次函数 y = ax²',body:'调节 a，观察抛物线在坐标系中的变化。'}},
  {v:1,op:'node.put',id:'curve',type:'FunctionPlot',order:1,props:{title:'实时函数图像  ·  y = a × x²',expr:'a * x ** 2'}},
  {v:1,op:'node.put',id:'panel',type:'Column',order:2,props:{}},
  {v:1,op:'node.put',id:'a',type:'Slider',parent:'panel',props:{label:'二次项系数 a',bind:'/a',default:1,min:-3,max:3,step:0.1}},
  {v:1,op:'node.put',id:'outro',type:'Text',order:3,props:{body:'x 轴和 y 轴的每格都有真实数值。a = 0 时退化为直线 y = 0。'}},
  {v:1,op:'surface.end',id:'function-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');

const DATA_DEMO_SOURCE = [
  {v:1,op:'surface.begin',id:'data-lab'},
  {v:1,op:'node.put',id:'hero',type:'Text',props:{title:'数据对比',body:'以下为教学示例数据，点击柱子查看对应数值。'}},
  {v:1,op:'node.put',id:'data',type:'BarChart',order:1,props:{title:'每日处理量（示例）',data:[18,29,23,41,35,48],labels:['周一','周二','周三','周四','周五','周六'],unit:'份',sourceLabel:'教学示例数据，不代表真实测量'}},
  {v:1,op:'surface.end',id:'data-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');

/** Pure, deterministic SVG drawing for browser playground and DSH React host.
 * All label strings are escaped; numeric coordinates derive only from validated finite values.
 * No model-supplied code or HTML is executed. */
const CHART_ESC = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CNUM = n => Number.isInteger(n)?String(n):Number(n).toFixed(1);
const DEFAULT_CATEGORIES=['周一','周二','周三','周四','周五','周六'];
const DEFAULT_VALUES=[18,29,23,41,35,48];
function normalizeDataset({labels=DEFAULT_CATEGORIES,data=DEFAULT_VALUES,unit='份',title='每日处理量（示例）',sourceLabel='演示数据，不代表真实统计'}={}){
 if(!Array.isArray(data)||data.length<2||data.length>10||!data.every(x=>typeof x==='number'&&Number.isFinite(x)&&Math.abs(x)<=1000000000))throw Error('数据需要 2–10 个有限数值');
 if(!Array.isArray(labels)||labels.length!==data.length||!labels.every(x=>typeof x==='string'&&x.length>0&&x.length<=24))throw Error('类别名称与数值必须一一对应');
 if(typeof unit!=='string'||unit.length>15||typeof title!=='string'||title.length>70||typeof sourceLabel!=='string'||sourceLabel.length>100)throw Error('无效的数据说明');
 return {labels:[...labels],data:[...data],unit,title,sourceLabel};
}
function functionPlotSVG(expr='a * x ** 2',vars={},evaluate,options={}){
 const W=520,H=238,L=45,R=494,T=17,B=208;
 const xMin=options.xMin??-4,xMax=options.xMax??4,yMin=options.yMin??-12,yMax=options.yMax??12;
 if(![xMin,xMax,yMin,yMax].every(Number.isFinite)||!(xMin<xMax&&yMin<yMax)||xMin< -1000||xMax>1000||yMin< -1000||yMax>1000)throw Error('Invalid plot bounds');
 const X=x=>L+(x-xMin)/(xMax-xMin)*(R-L),Y=y=>T+(yMax-y)/(yMax-yMin)*(B-T);
 const grid=[];
 for(let i=0;i<=8;i++){
  const x=xMin+(xMax-xMin)*i/8,sx=X(x);
  grid.push(`<line x1="${sx.toFixed(2)}" y1="${T}" x2="${sx.toFixed(2)}" y2="${B}" class="vie-grid-line"/>`);
  if(i%2===0&&Math.abs(x)>1e-9)grid.push(`<text x="${sx.toFixed(2)}" y="${B+17}" text-anchor="middle">${CNUM(x)}</text>`);
 }
 for(let i=0;i<=4;i++){
  const y=yMin+(yMax-yMin)*i/4,sy=Y(y);
  grid.push(`<line x1="${L}" y1="${sy.toFixed(2)}" x2="${R}" y2="${sy.toFixed(2)}" class="vie-grid-line"/>`);
  if(Math.abs(y)>1e-9)grid.push(`<text x="${L-9}" y="${(sy+4).toFixed(2)}" text-anchor="end">${CNUM(y)}</text>`);
 }
 const points=[];let lastValid=false;
 for(let i=0;i<=240;i++){
  const x=xMin+i*(xMax-xMin)/240;let y;
  try{y=evaluate(expr,{...vars,x});}catch{lastValid=false;continue;}
  if(!Number.isFinite(y)){lastValid=false;continue;}
  points.push((lastValid?'L':'M')+X(x).toFixed(2)+' '+Y(y).toFixed(2));lastValid=true;
 }
 let info='拖动参数，观察曲线变化';
 if(/\ba\s*\*\s*x\s*\*\*\s*2\b/.test(expr)&&typeof vars.a==='number'){
  const a=vars.a;info=a===0?'a = 0：退化为 y = 0，不再是二次函数':`a = ${CNUM(a)}：开口向${a>0?'上':'下'}，|a| 越大越窄`;
 }
 let point='';
 const sampleX=options.sampleX;
 if(Number.isFinite(sampleX)&&sampleX>=xMin&&sampleX<=xMax){
  try{
   const sampleY=evaluate(expr,{...vars,x:sampleX});
   if(Number.isFinite(sampleY)&&sampleY>=yMin&&sampleY<=yMax){
    point=`<circle data-vie-sample-point="true" cx="${X(sampleX).toFixed(2)}" cy="${Y(sampleY).toFixed(2)}" r="5.3" fill="#e8a34c" stroke="white" stroke-width="1.5"/>`;
    info+=` · 采样点 (${CNUM(sampleX)}, ${CNUM(sampleY)})`;
   }
  }catch{/* runtime invalid sample point is simply omitted */}
 }
 const Xzero=X(Math.max(xMin,Math.min(xMax,0))),Yzero=Y(Math.max(yMin,Math.min(yMax,0)));
 const svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="带坐标轴、数值刻度与原点的函数图像" data-vie-chart="function"><defs><clipPath id="vie-function-clip"><rect x="${L}" y="${T}" width="${R-L}" height="${B-T}"/></clipPath></defs>
 ${grid.join('')}<path d="M${L} ${Yzero}H${R+6}m-7-4l7 4-7 4 M${Xzero} ${B+2}V${T-6}m-4 7l4-7 4 7" fill="none" stroke="currentColor" stroke-opacity=".58" stroke-width="1.3"/>
 <text x="${R+9}" y="${Yzero-8}" class="vie-axis-name">x</text><text x="${Xzero+9}" y="${T+1}" class="vie-axis-name">y</text>
 <g clip-path="url(#vie-function-clip)"><path d="${points.join(' ')}" fill="none" stroke="var(--vie-color,#4088d0)" stroke-width="2.7" stroke-linejoin="round" stroke-linecap="round"/>${point}</g></svg>`;
 return {svg,info};
}
function niceStep(v){const exp=Math.floor(Math.log10(Math.max(1e-10,v))),scale=10**exp;const n=v/scale;return (n<=1?1:n<=2?2:n<=5?5:10)*scale;}
function barChartSVG(props={},activeIndex=0){
 const {labels,data,unit,title,sourceLabel}=normalizeDataset(props);
 const unavailable=new Set(props.unavailableIndices??[]);
 const W=520,H=235,L=48,R=501,T=20,B=198,lo=Math.min(0,...data),hi=Math.max(0,...data),span=hi-lo||1;
 const step=niceStep(span/4),min=Math.floor(lo/step)*step,max=Math.ceil(hi/step)*step||(step),Y=y=>T+(max-y)/(max-min)*(B-T);
 const bw=(R-L)/data.length;
 const active=Math.max(0,Math.min(data.length-1,activeIndex));
 const lines=[];
 for(let tick=min;tick<=max+step/100;tick+=step){
  const sy=Y(tick);lines.push(`<line x1="${L}" y1="${sy.toFixed(2)}" x2="${R}" y2="${sy.toFixed(2)}" class="vie-grid-line"/><text x="${L-9}" y="${(sy+4).toFixed(2)}" text-anchor="end">${CHART_ESC(CNUM(tick))}</text>`);
 }
 lines.push(`<path d="M${L} ${T}V${B}H${R}" class="vie-data-axis" fill="none"/>`);
 const bars=[];
 for(let i=0;i<data.length;i++){
  const x=L+i*bw+bw*.18,w=bw*.64,v=data[i],y=Math.min(Y(0),Y(v)),h=Math.max(2,Math.abs(Y(0)-Y(v)));
  bars.push(`<g data-bar-index="${i}" role="button" tabindex="0" aria-label="${CHART_ESC(labels[i])}：${unavailable.has(i)?'等待有效数据':CHART_ESC(CNUM(v))+CHART_ESC(unit)}" aria-pressed="${i===active}" class="vie-bar-item">
   <rect x="${(L+i*bw).toFixed(2)}" y="${T}" width="${bw.toFixed(2)}" height="${B-T+12}" fill="transparent"/>
   ${unavailable.has(i)?'':`<rect class="vie-data-bar${i===active?' is-active':''}" x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" rx="4"/>`}
   <text x="${(x+w/2).toFixed(2)}" y="${Math.max(11,y-7).toFixed(2)}" text-anchor="middle" class="vie-bar-value">${unavailable.has(i)?'—':CHART_ESC(CNUM(v))}</text>
   <text x="${(x+w/2).toFixed(2)}" y="${B+19}" text-anchor="middle">${CHART_ESC(labels[i])}</text>
  </g>`);
 }
 const valid=data.filter((_,i)=>!unavailable.has(i));
 const avg=valid.length?valid.reduce((s,n)=>s+n,0)/valid.length:0;
 const delta=data[active]-avg;
 return {svg:`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="带类别、数值和纵轴刻度的数据柱状图；缺失值以横线表示" data-vie-chart="bars">${lines.join('')}${bars.join('')}</svg>`,selected:unavailable.has(active)?`${labels[active]}：等待有效数据`:props.showAverage===false?`${labels[active]}：${CNUM(data[active])}${unit}`:`${labels[active]}：${CNUM(data[active])}${unit}（${delta>=0?'高于':'低于'}平均值 ${CNUM(Math.abs(delta))}${unit}）`,average:avg,sourceLabel,labels,data,unit,title};
}

/** VIE bxCAN nominal bit timing calculator (STM32F4 bxCAN profile).
 * fCAN = APB1 peripheral clock (not generic CPU system clock).
 * CAN_BTR fields encode hardware value minus one; public values are actual TQ/BRP.
 * Sampling guideline is illustrative, not an electrical conformance verdict.
 */
const integer=(v,lo,hi,label)=>{if(!Number.isInteger(v)||v<lo||v>hi)throw Error(`${label} 应为 ${lo}～${hi} 的整数`);return v;};
const CAN_PROFILE=Object.freeze({name:'STM32F4 bxCAN（经典 CAN）',bs1:[1,16],bs2:[1,8],sjw:[1,4],brp:[1,1024]});
function calculateCanTiming({clockMHz=36,prescaler=4,bs1=14,bs2=3,sjw=1}={}){
 if(typeof clockMHz!=='number'||!Number.isFinite(clockMHz)||clockMHz<1||clockMHz>100)throw Error('CAN 外设时钟应在 1～100 MHz 的教学范围内');
 integer(prescaler,1,1024,'BRP');integer(bs1,1,16,'BS1');integer(bs2,1,8,'BS2');integer(sjw,1,4,'SJW');
 if(sjw>bs2)throw Error('SJW 不能大于 BS2');
 const totalTq=1+bs1+bs2;
 const bitrate=clockMHz*1e6/(prescaler*totalTq);
 const samplePoint=(1+bs1)/totalTq*100;
 return Object.freeze({clockMHz,prescaler,bs1,bs2,sjw,totalTq,bitrate,samplePoint,tqNs:prescaler/clockMHz*1000,bitTimeUs:prescaler*totalTq/clockMHz});
}
function normalizeCanPreset(args={}){
 const allowed=['clockMHz','prescaler','sjw','bs1','bs2','compareBs1','compareBs2'];
 if(args===null||typeof args!=='object'||Array.isArray(args)||Object.keys(args).some(k=>!allowed.includes(k)))throw Error('不支持的 CAN 预置参数');
 const p={clockMHz:36,prescaler:4,sjw:1,bs1:14,bs2:3,compareBs1:15,compareBs2:2,...args};
 calculateCanTiming(p);
 calculateCanTiming({...p,bs1:p.compareBs1,bs2:p.compareBs2});
 return p;
}
function compareCanSchemes(config){
 const p=normalizeCanPreset(config);
 return Object.freeze({A:calculateCanTiming(p),B:calculateCanTiming({...p,bs1:p.compareBs1,bs2:p.compareBs2})});
}

/** Six small, framework-rendered knowledge labs. All behavior is trusted code, not model-written JS. */
const SEMANTIC_LABS = Object.freeze({
  bitwise:{label:'位运算',description:'逐位观察 AND / OR / XOR',parameters:[]},
  timer:{label:'STM32 定时器',description:'PSC、ARR 与计数频率',parameters:[]},
  ohm:{label:'欧姆定律',description:'电压、电阻、电流的关系',parameters:[]},
  fraction:{label:'分数与等值',description:'把分数切成可见的等份',parameters:[]},
  probability:{label:'基础概率',description:'从六种等可能结果中选择事件',parameters:[]},
  vector:{label:'向量分解',description:'观察向量的 x、y 分量',parameters:[]}
});
function semanticLabSource(kind){
 if(!Object.hasOwn(SEMANTIC_LABS,kind))throw Error('Unknown semantic lab');
 return [
  {v:1,op:'surface.begin',id:'lab-'+kind},
  {v:1,op:'node.put',id:'lab',type:'InteractiveLab',props:{kind}},
  {v:1,op:'surface.end',id:'lab-'+kind}
 ].map(e=>JSON.stringify(e)+'\n').join('');
}

/** Deterministic teaching scenes. The LLM selects a preset and explains the topic;
 * presentation, binding and calculations are handled by the runtime. */
const PRESET_CATALOG = Object.freeze({
  ...SEMANTIC_LABS,
  motion:{label:'匀速运动',description:'位置、速度与时间的关系',parameters:['speed','time']},
  quadratic:{label:'二次函数',description:'函数 y = ax² 的参数探索',parameters:['a']},
  data:{label:'数据对比',description:'六个数值的直观比较',parameters:['labels','values','unit','title']},
  can:{label:'CAN 位时序',description:'STM32F4 bxCAN 采样点、BS1/BS2、波特率',parameters:['clockMHz','prescaler','sjw','bs1','bs2','compareBs1','compareBs2']}
});
const CAN_SOURCE=[
{v:1,op:'surface.begin',id:'can-bit-lab'},
{v:1,op:'node.put',id:'can-timing',type:'CanTimingLab',props:normalizeCanPreset()},
{v:1,op:'surface.end',id:'can-bit-lab'}
].map(x=>JSON.stringify(x)+'\n').join('');
const bases={...Object.fromEntries(Object.keys(SEMANTIC_LABS).map(k=>[k,semanticLabSource(k)])),motion:DEMO_SOURCE,quadratic:FUNCTION_DEMO_SOURCE,data:DATA_DEMO_SOURCE,can:CAN_SOURCE};
const ranges={speed:[0,40],time:[0,10],a:[-3,3]};
function makePresetSource(preset, parameters={}){
  if(!Object.hasOwn(bases,preset)) throw new Error('Unknown preset');
  if(parameters===null||typeof parameters!=='object'||Array.isArray(parameters))throw new Error('Invalid preset parameters');
  if(Object.keys(parameters).some(k=>!PRESET_CATALOG[preset].parameters.includes(k)))throw new Error('Unknown preset parameter');
  const updates=new Map();
  if(preset==='data') {
    const hasCustom=Object.keys(parameters).length>0;
    if(hasCustom && (!Array.isArray(parameters.labels)||!Array.isArray(parameters.values)))throw Error('Data needs both labels and values');
    const options=hasCustom?normalizeDataset({labels:parameters.labels,data:parameters.values,unit:parameters.unit??'',title:parameters.title??'用户提供的数据',sourceLabel:'用户提供的数据'}):normalizeDataset();
    const events=DATA_DEMO_SOURCE.trim().split('\n').map(line=>JSON.parse(line));
    if(hasCustom)events.find(e=>e.id==='hero').props.body='使用用户提供的数据；点击柱子或展开原始数据查看比较。';
    const bar=events.find(e=>e.type==='BarChart');bar.props={title:options.title,data:options.data,labels:options.labels,unit:options.unit,sourceLabel:options.sourceLabel};
    const result=events.map(e=>JSON.stringify(e)+'\n').join('');
    const parser=new VIEStream();parser.push(result);parser.finish();if(parser.snapshot().errors.length)throw Error('Data preset invalid');
    return result;
  }
  for(const [key,value] of Object.entries(parameters)){
    const bounds=ranges[key];
    if(preset==='can'){updates.set('/'+key,value);continue;}
    const [min,max]=bounds;
    if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max)throw new Error('Invalid preset parameter: '+key);
    if(key==='a'&&Math.abs(value*10-Math.round(value*10))>1e-7)throw new Error('Quadratic a must use increments of 0.1');
    updates.set('/'+key,value);
  }
  if(preset==='can'){
    const props=normalizeCanPreset(parameters);
    const events=CAN_SOURCE.trim().split('\n').map(x=>JSON.parse(x));
    events.find(e=>e.type==='CanTimingLab').props=props;
    const result=events.map(e=>JSON.stringify(e)+'\n').join('');
    const p=new VIEStream();p.push(result);p.finish();if(p.snapshot().errors.length)throw Error('CAN preset invalid');
    return result;
  }
  if(updates.size===0)return bases[preset];
  const events=bases[preset].trimEnd().split('\n').map(line=>JSON.parse(line));
  for(const event of events){
    if(event.op==='node.put'&&event.props?.bind&&updates.has(event.props.bind))event.props.default=updates.get(event.props.bind);
  }
  const result=events.map(e=>JSON.stringify(e)+'\n').join('');
  const p=new VIEStream();p.push(result);p.finish();
  if(p.snapshot().errors.length)throw new Error('Internal preset invalid');
  return result;
}

/** VIE template catalog and conservative, deterministic routing.
 * Subject-domain matches never infer measurements or fabricate graph contents.
 * Model may supply a specific templateId and validated data; otherwise routing
 * only happens for strong keyword evidence. A miss returns structured choices.
 */
const quick={
  motion:{zh:['匀速','位移','路程 = 速度','速度和时间'],en:['uniform motion','constant speed','displacement']},
  quadratic:{zh:['二次函数','抛物线','二次项系数'],en:['quadratic','parabola']},
  data:{zh:['数据对比','数据比较','柱状图','对比数据'],en:['bar chart','data comparison']},
  can:{zh:['CAN总线','CAN 总线','CAN位时序','CAN 位时序','采样点','BS1','BS2','波特率'],en:['bxcan','can bus','bit timing']},
  bitwise:{zh:['位运算','按位与','按位或','异或','二进制位运算'],en:['bitwise','xor','bitwise and']},
  timer:{zh:['定时器','预分频','自动重装载','PSC','ARR','定时中断'],en:['stm32 timer','prescaler']},
  ohm:{zh:['欧姆定律','电流与电阻','电压与电阻'],en:["ohm's law",'ohms law']},
  fraction:{zh:['分数','分子分母','通分','约分','等值分数'],en:['fraction','fractions']},
  probability:{zh:['概率','骰子','等可能事件','样本空间'],en:['probability','dice probability']},
  vector:{zh:['向量分解','向量','矢量','水平分量','竖直分量'],en:['vector components','vector projection','vectors']}
};
const visuals={
  Flow:{zh:['流程图','执行流程','工作流程','操作流程','排查步骤','故障排查'],en:['flowchart','workflow','troubleshooting steps']},
  RelationGraph:{zh:['关系图','组成关系','依赖关系','关联网络','构件关系'],en:['relationship graph','dependency graph']},
  Timeline:{zh:['时间线','发展历程','时间顺序','年代顺序','历史阶段'],en:['timeline','chronology']},
  Diagram:{zh:['结构示意','几何示意','结构图','剖面示意','受力示意'],en:['schematic diagram','geometry diagram']},
  Animation:{zh:['运动动画','旋转动画','位移动画','动画演示'],en:['motion animation','animated demonstration']}
};
const story={zh:['多画面','多张图','图文结合','图文交替','动画加流程','综合解释','同时展示'],en:['multiple visuals','multi panel','visual story']};
const freezeEntries=obj=>Object.freeze(Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,Object.freeze(v)])));
const TEMPLATE_REGISTRY=freezeEntries({
  ...Object.fromEntries(Object.entries(PRESET_CATALOG).map(([name,info])=>['lab.'+name,{
    id:'lab.'+name,family:'quick',title:info.label,description:info.description,
    parameters:Object.freeze([...info.parameters]),terms:Object.freeze([...(quick[name]?.zh??[]),...(quick[name]?.en??[])])
  }])),
  ...Object.fromEntries(VISUAL_KINDS.map(kind=>['visual.'+kind.toLowerCase(),{
    id:'visual.'+kind.toLowerCase(),family:'compose',kind,title:kind,
    description:{Flow:'顺序与分支流程',RelationGraph:'对象关系与依赖',Timeline:'有序历史与事件',Diagram:'受限的几何示意',Animation:'可播放的概念运动'}[kind],
    parameters:Object.freeze(['spec']),terms:Object.freeze([...(visuals[kind]?.zh??[]),...(visuals[kind]?.en??[])])
  }])),
  ...Object.fromEntries(Object.entries(EXPERIMENT_CATALOG).map(([template,entry])=>[entry.id,{
    id:entry.id,family:'experiment',template,title:entry.title,description:entry.description,
    parameters:Object.freeze(['parameters']),terms:Object.freeze(entry.terms),priority:entry.priority??(template==='planetary'?3:template==='process'?2:0)
  }])),
  'story.multi':{id:'story.multi',family:'story',title:'多画面图文',description:'一至四张可视化图文混排，动画优先',parameters:Object.freeze(['spec']),terms:Object.freeze([...story.zh,...story.en])}
});
const TEMPLATE_IDS=Object.freeze(Object.keys(TEMPLATE_REGISTRY));
function describeTemplateCatalog(){
 return TEMPLATE_IDS.map(id=>{const t=TEMPLATE_REGISTRY[id];return `${id}: ${t.description} (${t.parameters.join(',')||'无参数'})`;});
}
const isPlain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
const safeText=x=>typeof x==='string'&&x.length<=500&&x.trim().length>0;
function matchTerm(query,term){
 const latin=/^[\x00-\x7F]+$/.test(term);
 // ASCII terms must have word boundaries: English "can" must not trigger CAN bus.
 if(latin){const normalized=term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return new RegExp('(^|[^a-z0-9])'+normalized+'(?=$|[^a-z0-9])','i').test(query);}
 return query.includes(term);
}
/** Pure ranked suggestions. Conservatively abstains on ambiguous or weak matches. */
function routeTemplate(query,{maxCandidates=3}={}){
 if(!safeText(query))return {status:'none',reason:'query must contain 1–500 characters',candidates:[]};
 if(/(?:只要文字|不要图|无需图|不要可视化|text only|no visual)/i.test(query))return {status:'none',reason:'user requested no visual',candidates:[]};
 const ranked=TEMPLATE_IDS.map(id=>{
   const t=TEMPLATE_REGISTRY[id];let score=0;const hits=[];
   for(const term of t.terms)if(matchTerm(query,term))hits.push(term);
   // Nested synonyms are one piece of evidence, not separate votes.
   for(const term of hits)if(!hits.some(other=>other!==term&&other.includes(term)))score+=term.length>=4?3:2;
   return {id,family:t.family,score:score>0?score+(t.priority??0):0,hits};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
 const candidates=ranked.slice(0,Math.max(1,Math.min(5,Math.trunc(maxCandidates)||3)));
 if(candidates.length===0)return {status:'none',reason:'no supported template matched',candidates:[]};
 const top=candidates[0],second=candidates[1];
 if(top.score<2)return {status:'none',reason:'insufficient topic evidence',candidates};
 if(second&&top.score-second.score<=1)return {status:'ambiguous',reason:'multiple similarly suitable templates',candidates};
 return {status:'matched',id:top.id,confidence:!second||top.score>=second.score+3?'high':'medium',candidates};
}
function buildTemplateScene({templateId,parameters={},spec}={}){
 const entry=TEMPLATE_REGISTRY[templateId];if(!entry)throw Error('Unknown template ID');
 if(!isPlain(parameters))throw Error('Template parameters must be an object');
 if(entry.family==='experiment'){
   if(spec!==undefined)throw Error('Interactive experiments use parameters, not spec');
   return {id:templateId,title:entry.title,family:entry.family,source:experimentSceneSource(entry.template,parameters)};
  }
  if(entry.family==='quick'){
   if(spec!==undefined)throw Error('Quick template does not accept spec');
   const name=templateId.slice(4);
   return {id:templateId,title:entry.title,family:entry.family,source:makePresetSource(name,parameters)};
 }
 if(Object.keys(parameters).length)throw Error('Visual templates use spec, not parameters');
 if(!isPlain(spec))throw Error('Visual template needs a validated spec object');
 return {id:templateId,title:spec.title||entry.title,family:entry.family,source:entry.family==='compose'?visualSceneSource(entry.kind,spec):storySceneSource(spec)};
}


/** Decode only complete document blocks. Incomplete executable strings never run. */
class DocumentPreview {
  constructor(){this.reset();}
  reset(){this.raw='';this.cursor=0;this.depth=0;this.quoted=false;this.escape=false;this.begin=-1;this.blocks=[];this.array=false;this.closed=false;this.source='';}
  update(raw){
    if(typeof raw!=='string'||new TextEncoder().encode(raw).length>245760)return '';
    if(!raw.startsWith(this.raw))this.reset();
    this.raw=raw;
    if(!this.array){
      const matches=raw.matchAll(/"blocks"\s*:\s*\[/g);let found=false;
      for(const m of matches){
        try{const prefix=raw.slice(0,m.index).trim().replace(/,$/,'');const header=JSON.parse(prefix+'}');if(header.title!==undefined&&typeof header.title!=='string'||Object.keys(header).some(k=>!DOCUMENT_CONTRACT.fields.filter(x=>x!=='blocks').includes(k)))continue;this.header=header;this.title=header.title??'交互图解';this.array=true;this.cursor=m.index+m[0].length;this.depth=2;found=true;break;}catch{}
      }
      if(!found)return '';

    }
    let changed=false;
    for(;this.cursor<raw.length&&!this.closed;this.cursor++){
      const c=raw[this.cursor];
      if(this.quoted){if(this.escape)this.escape=false;else if(c==='\\')this.escape=true;else if(c==='"')this.quoted=false;continue;}
      if(c==='"'){this.quoted=true;continue;}
      if(c==='{'||c==='['){if(this.depth===2&&c==='{')this.begin=this.cursor;this.depth++;}
      else if(c==='}'||c===']'){
        this.depth--;
        if(this.depth===2&&this.begin>=0){
          try{const block=JSON.parse(raw.slice(this.begin,this.cursor+1));validateDocumentSpec({...this.header,blocks:[block]});this.blocks.push(block);changed=true;}catch{this.closed=true;}
          this.begin=-1;
        }
        if(this.depth<2)this.closed=true;
      }
    }
    if(changed){try{this.source=documentSceneSource({...this.header,blocks:this.blocks});}catch{this.source='';this.closed=true;}}
    return this.source;
  }
}

function sourceFromArguments(fields,documentPreview){
  if(fields.source)return fields.source;
  if(fields.document!==undefined||fields.spec){
    const specText=fields.document??fields.spec;
    if(!fields.kind){const source=documentPreview.update(specText);if(documentPreview.array)return source;}
    // Avoid reparsing a large unfinished JSON/code string for every token.
    if(!specText.trimEnd().endsWith('}'))return '';
    try{const spec=JSON.parse(specText);return fields.kind?visualSceneSource(fields.kind,spec):spec.blocks?documentSceneSource(spec):storySceneSource(spec);}catch{}
    return '';
  }
  if(fields.preset){try{return makePresetSource(fields.preset);}catch{}}
  if(fields.query&&fields.templateId){try{return buildTemplateScene({templateId:fields.templateId,parameters:fields.parameters?JSON.parse(fields.parameters):{}}).source;}catch{}}
  return '';
}

/** Generated code runs only inside an opaque-origin iframe, never the host DOM. */
function figureBootstrap(config){
  /** Topic-neutral learning data. Never execute authored JavaScript on the Host. */
function validateLearningDefinition(input,withRoot=false){
 const fail=message=>{throw Error('VIE_LEARNING_INVALID: '+message);};
 const object=(v,path,keys)=>{if(!v||typeof v!=='object'||Array.isArray(v))fail(path+' must be an object');for(const k of Object.keys(v))if(!keys.includes(k))fail(path+'.'+k+' is unknown');};
 const text=(v,path,max=1000)=>{if(typeof v!=='string'||v.length>max)fail(path+' must be text (max '+max+')');return v;};
 const requiredText=(v,path,max=1000)=>{const s=text(v,path,max);if(!s.trim())fail(path+' must not be blank');return s;};
 object(input,'learning',['type','title','key','legend','note','stages','quiz',...(withRoot?['root']:[])]);
 const out={title:requiredText(input.title??'交互演示','title',100),key:input.key??'learning'};
 if(typeof out.key!=='string'||!/^[a-zA-Z][\w-]{0,30}$/.test(out.key)||['__proto__','constructor','prototype'].includes(out.key))fail('key is invalid');
 for(const k of ['legend','note'])if(input[k]!==undefined)out[k]=text(input[k],k);
 const stages=input.stages??[];if(!Array.isArray(stages)||stages.length>8)fail('stages needs 0–8 entries');
 out.stages=stages.map((s,i)=>{const p='stages['+i+']';object(s,p,['label','title','caption','html','mobileHtml']);const v={label:requiredText(s.label??String(i+1),p+'.label',80),html:requiredText(s.html,p+'.html',16000)};for(const k of ['title','caption','mobileHtml'])if(s[k]!==undefined)v[k]=k==='mobileHtml'?requiredText(s[k],p+'.'+k,16000):text(s[k],p+'.'+k);return v;});
 if(input.quiz!==undefined){const q=input.quiz;object(q,'quiz',['question','options','correct']);if(!Array.isArray(q.options)||q.options.length<2||q.options.length>6)fail('quiz.options needs 2–6 entries');if(!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.options.length)fail('quiz.correct must be a zero-based option index; do not infer an answer from feedback');out.quiz={question:requiredText(q.question,'quiz.question'),correct:q.correct,options:q.options.map((o,i)=>{object(o,'quiz.options['+i+']',['label','feedback']);return {label:requiredText(o.label,'quiz.options['+i+'].label'),...(o.feedback!==undefined?{feedback:text(o.feedback,'quiz.options['+i+'].feedback')}:{})};})};}
 if(!out.stages.length&&!out.quiz)fail('stages or quiz is required');
 if(new TextEncoder().encode(JSON.stringify(out)).length>40000)fail('learning data exceeds 40KB');
 return out;
}
/** Narrow static preflight for literal SDK calls. Strings/comments are skipped;
 * dynamic JS remains subject to sandbox runtime validation, never Host eval. */
function validateLearningCalls(js){
 if(!js.includes('mountLearning'))return;
 const t=[];let i=0;
 while(i<js.length){const c=js[i];if(/\s/.test(c)){i++;continue;}if(js.startsWith('//',i)){i=js.indexOf('\n',i);if(i<0)break;continue;}if(js.startsWith('/*',i)){const end=js.indexOf('*/',i+2);i=end<0?js.length:end+2;continue;}
  // Regex/division and template interpolation require a complete JS parser.
  // Defer those scripts to the sandbox instead of guessing their meaning.
  if(c==='/'||c==='`')return;
  if(c==='"'||c==="'"){const quote=c;let value='',escaped=false;i++;while(i<js.length){const ch=js[i++];if(ch==='\\'){escaped=true;i++;continue;}if(ch===quote)break;value+=ch;}t.push({v:value,string:true,escaped});continue;}
  const word=js.slice(i).match(/^[A-Za-z_$][\w$]*/);if(word){t.push({v:word[0]});i+=word[0].length;}else{t.push({v:c});i++;}
 }
 const is=(n,v)=>t[n]?.v===v&&!t[n]?.string;
 const endOf=start=>{let depth=0;for(let n=start;n<t.length;n++){if(is(n,'{')||is(n,'[')||is(n,'('))depth++;if(is(n,'}')||is(n,']')||is(n,')'))if(--depth===0)return n;}return t.length;};
 const property=(start,end,key)=>{for(let n=start+1;n<end;n++){if(t[n].v===key&&is(n+1,':'))return n+2;if(is(n,'{')||is(n,'[')||is(n,'('))n=endOf(n);}return -1;};
 const staticKeys=(start,end)=>{let n=start+1;while(n<end){if(t[n].escaped||(!t[n].string&&!/^[A-Za-z_$][\w$]*$/.test(t[n].v))||!is(n+1,':'))return false;n+=2;while(n<end&&!is(n,',')){if(is(n,'{')||is(n,'[')||is(n,'('))n=endOf(n);n++;}n++;}return true;};
 for(let n=0;n<t.length-4;n++)if(is(n,'VIE')&&is(n+1,'.')&&is(n+2,'mountLearning')&&is(n+3,'(')&&is(n+4,'{')){const end=endOf(n+4),quiz=property(n+4,end,'quiz');if(staticKeys(n+4,end)&&quiz>=0&&is(quiz,'{')&&staticKeys(quiz,endOf(quiz))&&property(quiz,endOf(quiz),'correct')<0)throw Error('VIE_LEARNING_INVALID: quiz.correct is required (zero-based option index). Prefer a document block with type:"learning" for full data validation.');n=end;}
}

  /** Runs inside the opaque figure. Topic-neutral stages and local understanding checks. */
function mountLearning(options){
  options={...validateLearningDefinition(options,true),root:options.root};
  const root=typeof options.root==='string'?document.querySelector(options.root):options.root;
  if(!root)throw Error('Learning root not found');
  const stages=options.stages??[],quiz=options.quiz,key=options.key??'learning';
  if(!/^[a-zA-Z][\w-]{0,30}$/.test(key)||!Array.isArray(stages)||stages.length>8||(!stages.length&&!quiz))throw Error('Invalid learning configuration');
  if(quiz&&(!Array.isArray(quiz.options)||quiz.options.length<2||quiz.options.length>6||!Number.isInteger(quiz.correct)||quiz.correct<0||quiz.correct>=quiz.options.length))throw Error('Invalid learning quiz');
  const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e;};
  const card=el('section','vie-learn'),heading=el('header','vie-learn-heading'),title=el('strong','',options.title??'交互演示');if(options.title!==VIE.title)heading.append(title);
  if(options.legend)heading.append(el('small','',options.legend));if(heading.childNodes.length)card.append(heading);
  let stageIndex=0,answer=-1;
  const saved=()=>{const v=VIE.state[key]??{};stageIndex=Number.isInteger(v.stage)&&v.stage>=0&&v.stage<stages.length?v.stage:0;answer=Number.isInteger(v.answer)&&v.answer>=0&&v.answer<(quiz?.options.length??0)?v.answer:-1;};saved();
  const commit=()=>VIE.setState({...VIE.state,[key]:{stage:stageIndex,answer}});
  let panel,tabs,description,caption;
  if(stages.length){
    panel=el('div','vie-learn-panel');panel.id='vie-learning-panel-'+key;panel.setAttribute('role','tabpanel');panel.tabIndex=0;
    tabs=el('div','vie-learn-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',options.title??'学习阶段');
    stages.forEach((stage,i)=>{const b=el('button','',stage.label??String(i+1));b.type='button';b.id='vie-learning-tab-'+key+'-'+i;b.setAttribute('role','tab');b.setAttribute('aria-controls',panel.id);b.onclick=()=>{stageIndex=i;draw();commit();};tabs.append(b);});
    tabs.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?stages.length-1:(stageIndex+(e.key==='ArrowRight'?1:stages.length-1))%stages.length;tabs.children[next].click();tabs.children[next].focus();};
    description=el('div','vie-learn-description');description.setAttribute('aria-live','polite');caption=el('p');description.append(el('strong'),caption);card.append(panel,tabs,description);
  }
  if(options.note)card.append(el('small','vie-learn-note',options.note));
  let choices,feedback;
  if(quiz){
    const field=el('fieldset','vie-learn-quiz');field.append(el('legend','',quiz.question));choices=el('div','vie-learn-choices');
    quiz.options.forEach((choice,i)=>{const label=el('label'),input=el('input');input.type='radio';input.name='vie-learning-quiz-'+key;input.value=String(i);input.onchange=()=>{answer=i;draw();commit();};label.append(input,el('span','',choice.label));choices.append(label);});
    feedback=el('div','vie-learn-feedback');feedback.setAttribute('role','status');field.append(choices,feedback);card.append(field);
  }
  function draw(){
    if(panel){const stage=stages[stageIndex];panel.innerHTML=String(root.clientWidth<440?(stage.mobileHtml??stage.html??''):(stage.html??''));panel.setAttribute('aria-labelledby',tabs.children[stageIndex].id);[...tabs.children].forEach((b,i)=>{b.setAttribute('aria-selected',String(i===stageIndex));b.tabIndex=i===stageIndex?0:-1;});description.firstChild.textContent=stage.title??stage.label??'';caption.textContent=stage.caption??'';}
    if(choices){[...choices.querySelectorAll('input')].forEach((input,i)=>{input.checked=i===answer;});feedback.hidden=answer<0;feedback.dataset.correct=String(answer===quiz.correct);feedback.textContent=answer<0?'':(answer===quiz.correct?'回答正确。':'再想一想。')+(quiz.options[answer].feedback??'');}
  }
  const restore=()=>{saved();draw();};window.addEventListener('vie:statechange',restore);root.replaceChildren(card);draw();
  let width=root.clientWidth;const resize=new ResizeObserver(()=>{if(root.clientWidth!==width){width=root.clientWidth;draw();}});resize.observe(root);
  return {dispose(){resize.disconnect();window.removeEventListener('vie:statechange',restore);root.replaceChildren();}};
}

  let state=config.state,theme=config.theme,visible=true,failed=false;
  const post=(type,value)=>{try{parent.postMessage({v:1,channel:config.channel,type,value},'*');}catch{}};
  const reportError=error=>{failed=true;post('error',String(error?.message??error).slice(0,1200));};
  const applyTheme=value=>{
    theme=value;document.documentElement.dataset.theme=value.mode;
    for(const [key,color]of Object.entries(value.colors??{}))document.documentElement.style.setProperty('--vie-'+key,color);
    document.documentElement.style.colorScheme=value.mode;
    window.dispatchEvent(new CustomEvent('vie:themechange',{detail:value}));
  };
  window.VIE={get state(){return state;},get theme(){return theme;},get visible(){return visible;},get reducedMotion(){return !!theme.reducedMotion;},
    title:config.title,setState(value){if(!value||typeof value!=='object'||Array.isArray(value))throw Error('VIE.setState expects an object');state=value;post('state',value);},reportError,mountLearning};
  window.addEventListener('message',event=>{
    if(event.source!==parent||event.data?.channel!==config.channel)return;
    if(event.data.type==='theme')applyTheme(event.data.value);
    if(event.data.type==='state'){state=event.data.value;window.dispatchEvent(new CustomEvent('vie:statechange',{detail:state}));}
    if(event.data.type==='visibility'){visible=!!event.data.value;window.dispatchEvent(new CustomEvent('vie:visibilitychange',{detail:visible}));}
  });
  window.addEventListener('error',event=>reportError(event.message));
  window.addEventListener('unhandledrejection',event=>reportError(event.reason));
  document.addEventListener('submit',event=>event.preventDefault(),true);
  document.addEventListener('click',event=>{const a=event.target.closest?.('a[href]');if(a&&!a.getAttribute('href').startsWith('#'))event.preventDefault();},true);
  applyTheme(config.theme);
  document.addEventListener('DOMContentLoaded',()=>{
    const root=document.getElementById('vie-root');let frame=0,last='';
    if(config.staticSvg&&root.children.length===1&&root.firstElementChild.tagName.toLowerCase()==='svg'){
      const svg=root.firstElementChild;let readable=0;
      const fit=()=>{const fonts=[...svg.querySelectorAll('text')].map(t=>parseFloat(getComputedStyle(t).fontSize)*Math.hypot(t.getScreenCTM()?.a??1,t.getScreenCTM()?.b??0)).filter(n=>n>0);const min=Math.min(...fonts);if(min<10.99&&readable<1800){readable=Math.min(1800,Math.ceil(svg.getBoundingClientRect().width*11/min)+2);svg.style.minWidth=readable+'px';svg.style.maxWidth='none';root.style.overflowX='auto';root.tabIndex=0;root.setAttribute('aria-label','图形可横向滚动查看');}};
      new ResizeObserver(fit).observe(root);fit();
    }
    const measure=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;
      // scrollHeight includes positioned children; a small rounding allowance prevents
      // subpixel overflow from repeatedly adding/removing the Windows scrollbar gutter.
      const fonts=[...root.querySelectorAll('svg text')].filter(t=>t.textContent.trim()).map(t=>parseFloat(getComputedStyle(t).fontSize)*Math.hypot(t.getScreenCTM()?.a??1,t.getScreenCTM()?.b??0));
      const value={height:Math.ceil(Math.max(root.getBoundingClientRect().height,root.scrollHeight))+2,width:document.documentElement.scrollWidth,viewport:innerWidth,minFont:fonts.length?Math.min(...fonts):14},signature=JSON.stringify(value);
      if(signature!==last){last=signature;post('height',value);}
    });};
    new ResizeObserver(measure).observe(root);
    new MutationObserver(measure).observe(root,{childList:true,subtree:true,attributes:true,characterData:true});
    window.addEventListener('resize',measure);root.addEventListener('load',measure,true);document.fonts?.ready.then(measure);
    measure();post('ready',{ok:!failed});
  },{once:true});
}
const FIGURE_BASE_CSS=`*{box-sizing:border-box}html,body{margin:0;background:transparent;color:var(--vie-ink,#243044);font:14px/1.65 system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif}#vie-root{display:flow-root;padding:14px;overflow-wrap:anywhere;min-width:0}button,input,select,textarea{font:inherit}button{cursor:pointer;border:1px solid var(--vie-stroke,#dce3ec);background:var(--vie-layer,#f4f6fa);color:inherit;border-radius:8px;min-height:34px;padding:5px 11px}input[type=range]{accent-color:var(--vie-accent,#5483ef);max-width:100%}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--vie-accent,#5483ef);outline-offset:3px}svg,canvas{display:block;max-width:100%;height:auto}label{display:block}.muted{color:var(--vie-muted,#718096)}.controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.card{border:1px solid var(--vie-stroke,#dce3ec);border-radius:12px;padding:12px;background:var(--vie-layer,#f4f6fa)}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}`;
// Sandboxed content only. Keep overflow scrollable without native tracks or arrow buttons.
const FIGURE_SCROLL_CSS='html,body,#vie-root,#vie-root *{scrollbar-width:none!important}html::-webkit-scrollbar,body::-webkit-scrollbar,#vie-root::-webkit-scrollbar,#vie-root *::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}';
function buildFigureDocument(raw,{channel,state,theme}){
  const spec=validateFigureDefinition(raw),safeScript=x=>x.replace(/<\/script/gi,'<\\/script');
  const settings=JSON.stringify({channel,title:spec.title,state:validateFigureState(state??spec.state),theme,staticSvg:!spec.js.trim()}).replace(/</g,'\\u003c');
  const csp="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; media-src data: blob:; connect-src 'none'; object-src 'none'; frame-src 'none'; worker-src 'none'; base-uri 'none'; form-action 'none'";
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${csp}"><style>${FIGURE_BASE_CSS}\n.vie-learn{border:0;border-radius:0;padding:0;display:grid;gap:12px}.vie-learn-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.vie-learn-heading small,.vie-learn-note{color:var(--vie-muted);font-size:12px}.vie-learn-panel{min-width:0;overflow:auto}.vie-learn-panel svg{width:100%;display:block}.vie-learn-tabs{display:flex;gap:8px;flex-wrap:wrap}.vie-learn-tabs button{flex:1 1 120px;border-radius:999px;background:transparent;color:var(--vie-ink);border:1px solid var(--vie-stroke);font-size:13px;min-height:38px}.vie-learn-tabs button[aria-selected=true]{background:var(--vie-ink);color:var(--vie-bg);border-color:var(--vie-ink)}.vie-learn-description{background:var(--vie-layer);border-radius:14px;padding:12px}.vie-learn-description p{margin:4px 0 0;font-size:14px}.vie-learn-quiz{border:0;min-width:0;margin:0;padding:0}.vie-learn-quiz legend{font-weight:600;margin-bottom:12px}.vie-learn-choices{display:grid;gap:12px}.vie-learn-choices label{display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:14px}.vie-learn-choices input{flex:none;accent-color:var(--vie-primary)}.vie-learn-feedback{margin-top:14px;border-radius:12px;padding:12px;background:var(--vie-layer)}.vie-learn-feedback[data-correct=true]{border-left:3px solid var(--vie-secondary)}.vie-learn-feedback[data-correct=false]{border-left:3px solid var(--vie-warning)}@media(max-width:440px){.vie-learn{padding:0}.vie-learn-tabs button{flex-basis:88px;font-size:13px}.vie-learn-panel>svg{width:100%;height:auto}}\n${spec.css.replace(/<\/style/gi,'<\\/style')}\n${FIGURE_SCROLL_CSS}</style><script>(${safeScript(figureBootstrap.toString())})(${settings});</script></head><body><div id="vie-root">${spec.html}</div><script>${safeScript(spec.js)}</script></body></html>`;
}
function mountGeneratedFigure(frame,raw,options={}){
  const spec=validateFigureDefinition(raw),win=frame.ownerDocument.defaultView;
  let state=validateFigureState(options.initialState??spec.state),channel='',disposed=false,lastMessage=0,burst=0;
  const shell=frame.closest('.vie-shell');
  const theme=()=>{
    const css=win.getComputedStyle(shell??frame),explicit=frame.ownerDocument.documentElement.dataset.theme??(frame.ownerDocument.body.classList.contains('dark')?'dark':null);
    return {mode:explicit??(win.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),reducedMotion:win.matchMedia('(prefers-reduced-motion: reduce)').matches,
      colors:Object.fromEntries([['bg','--vie-bg','#fff'],['ink','--vie-ink','#243044'],['muted','--vie-muted','#718096'],['stroke','--vie-stroke','#dce3ec'],['layer','--vie-layer','#f4f6fa'],['accent','--vie-accent','#d58b16'],['primary','--vie-primary','#4d82d6'],['secondary','--vie-secondary','#149f91'],['warning','--vie-warning','#cf6854']].map(([k,token,fallback])=>[k,css.getPropertyValue(token).trim()||fallback]))};
  };
  const send=(type,value)=>{if(!disposed)frame.contentWindow?.postMessage({v:1,channel,type,value},'*');};
  const load=()=>{channel='vie-'+(++svgScopeSequence)+'-'+Math.random().toString(36).slice(2);frame.dataset.vieReady='false';frame.dataset.vieStatus='loading';options.onError?.('');frame.srcdoc=buildFigureDocument(spec,{channel,state,theme:theme()});};
  const onMessage=event=>{
    if(disposed||event.source!==frame.contentWindow||event.data?.channel!==channel||event.data?.v!==1)return;
    const now=Date.now();if(now-lastMessage>1000){lastMessage=now;burst=0;}if(++burst>60)return;
    const {type,value}=event.data;
    if(type==='height'&&value&&[value.height,value.width,value.viewport].every(v=>typeof v==='number'&&Number.isFinite(v)&&v>=0)){
      frame.dataset.vieSmallText=String(Number.isFinite(value.minFont)&&value.minFont>0&&value.minFont<11);
      frame.style.height=Math.min(10000,Math.max(160,value.height))+'px';frame.dataset.vieOverflow=String(value.width>value.viewport+2);frame.dataset.vieContentWidth=String(value.width);frame.dataset.vieViewportWidth=String(value.viewport);frame.dataset.vieContentHeight=String(value.height);
    }
    if(type==='state')try{const clean=validateFigureState(value);options.onChange?.(clean);state=validateFigureState(options.currentState?.()??clean);send('state',state);}catch(error){send('state',state);options.onError?.('交互状态无效：'+error.message);}
    if(type==='error'&&typeof value==='string'){frame.dataset.vieReady='false';frame.dataset.vieStatus='error';options.onError?.(value.slice(0,1200));}
    if(type==='ready'){const ok=value?.ok!==false&&frame.dataset.vieStatus!=='error';frame.dataset.vieReady=String(ok);frame.dataset.vieStatus=ok?'ready':'error';send('theme',theme());send('state',state);options.onReady?.();}
  };
  const onTheme=()=>send('theme',theme());
  const observer=new win.MutationObserver(onTheme);
  observer.observe(frame.ownerDocument.documentElement,{attributes:true,attributeFilter:['class','data-theme','style']});
  observer.observe(frame.ownerDocument.body,{attributes:true,attributeFilter:['class','data-theme','style']});
  const media=win.matchMedia('(prefers-reduced-motion: reduce)'),colorMedia=win.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change',onTheme);colorMedia.addEventListener('change',onTheme);
  const visibility=()=>send('visibility',!frame.ownerDocument.hidden);
  frame.ownerDocument.addEventListener('visibilitychange',visibility);
  const intersection=win.IntersectionObserver?new win.IntersectionObserver(entries=>send('visibility',!frame.ownerDocument.hidden&&entries[0].isIntersecting)):null;
  intersection?.observe(frame);win.addEventListener('message',onMessage);frame.addEventListener('load',onTheme);load();
  return {snapshot:()=>validateFigureState(state),update(value){const clean=validateFigureState(value);if(JSON.stringify(state)===JSON.stringify(clean))return;state=clean;send('state',state);},reset(){state=validateFigureState(spec.state);options.onChange?.(state);load();},dispose(){if(disposed)return;disposed=true;win.removeEventListener('message',onMessage);frame.removeEventListener('load',onTheme);observer.disconnect();intersection?.disconnect();media.removeEventListener('change',onTheme);colorMedia.removeEventListener('change',onTheme);frame.ownerDocument.removeEventListener('visibilitychange',visibility);frame.srcdoc='';}};
}

/** Local, bounded UI recovery. Never changes the Harness journal. */
function createCheckpointRepository(storage){
  const key='vie:checkpoints:v1';let entries=[];
  try{const saved=JSON.parse(storage?.getItem(key)??'[]');if(Array.isArray(saved))entries=saved.filter(x=>x&&typeof x.key==='string'&&x.checkpoint?.format==='vie-checkpoint').slice(-8);}catch{}
  return {
    load(id,source){const value=entries.find(x=>x.key===id)?.checkpoint;return value?.source===source?value:null;},
    save(id,checkpoint){entries=entries.filter(x=>x.key!==id);entries.push({key:id,checkpoint});while(entries.length>8||JSON.stringify(entries).length>1500000)entries.shift();try{storage?.setItem(key,JSON.stringify(entries));return !!storage;}catch{return false;}},
    clear(id){entries=entries.filter(x=>x.key!==id);try{storage?.setItem(key,JSON.stringify(entries));}catch{}}
  };
}

function chartControlMarkup(c,value){
  const esc=x=>String(x).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const input=c.kind==='select'?'<div class="vie-segmented" role="group" aria-label="'+esc(c.label)+'">'+c.options.map(o=>'<button type="button" data-chart-key="'+c.key+'" value="'+o.value+'" aria-pressed="'+(o.value===value)+'">'+esc(o.label)+'</button>').join('')+'</div>':'<input type="'+(c.kind==='toggle'?'checkbox':c.kind==='number'?'number':'range')+'" '+(c.kind==='toggle'?'role="switch" '+(value===1?'checked':''):'min="'+c.min+'" max="'+c.max+'" step="'+c.step+'" value="'+value+'"')+' aria-label="'+esc(c.label)+'" data-chart-key="'+c.key+'">';
  return '<div class="vie-control"><span class="vie-control-label"><span>'+esc(c.label)+'</span><output data-chart-value="'+c.key+'"></output></span>'+input+'</div>';
}
function mountChart(root,input,options={}){
  const spec=validateChartSpec(input),esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const colors={primary:'var(--vie-primary,#4d82d6)',secondary:'var(--vie-secondary,#149f91)',accent:'var(--vie-accent,#d58b16)',muted:'var(--vie-muted,#8c91a4)',warning:'var(--vie-warning,#cf6854)'};
  let values;try{values=validateChartState(spec,options.initialState);}catch{values=validateChartState(spec);}
  const visibleControls=spec.controls.filter(c=>!c.bind);
  const scope='chart-'+Math.random().toString(36).slice(2),clip=scope+'-clip';
  root.innerHTML=`<section class="vie-general-chart"><header><h3>${esc(spec.title)}</h3>${visibleControls.length?'<button type="button" data-chart-reset>复位</button>':''}</header><div data-chart-plot></div><div class="vie-general-chart-legend">${[...spec.series,...spec.regions].map(s=>`<span><i style="background:${colors[s.tone]}"></i>${esc(s.label)}</span>`).join('')}</div><div class="vie-general-chart-controls">${visibleControls.map(c=>chartControlMarkup(c,values[c.key])).join('')}</div>${spec.note?`<p class="vie-general-chart-note">${esc(spec.note)}</p>`:''}<p data-chart-error role="status"></p></section>`;
  const concise=n=>n!==0&&(Math.abs(n)>=1e5||Math.abs(n)<1e-3)?n.toExponential(2):Number(n.toPrecision(4)).toString();
  let scheduled=0,disposed=false;const schedule=()=>{if(!scheduled&&!disposed)scheduled=root.ownerDocument.defaultView.requestAnimationFrame(()=>{scheduled=0;draw();});};
  function draw(){
    const W=Math.max(300,Math.min(760,root.clientWidth||640)),H=320,L=58,R=22,T=18,B=53,w=W-L-R,h=H-T-B;
    const sx=x=>L+(x-spec.x.min)/(spec.x.max-spec.x.min)*w,sy=y=>T+h-(y-spec.y.min)/(spec.y.max-spec.y.min)*h;
    let svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(spec.title)}"><title>${esc(spec.title)}</title><defs><clipPath id="${clip}"><rect x="${L}" y="${T}" width="${w}" height="${h}"/></clipPath></defs>`;
    for(let i=0;i<=4;i++){const x=L+w*i/4,y=T+h-h*i/4;svg+=`<path d="M${x} ${T}V${T+h}M${L} ${y}H${L+w}" class="vie-general-chart-grid"/><text x="${x}" y="${T+h+20}" text-anchor="middle">${concise(spec.x.min+(spec.x.max-spec.x.min)*i/4)}</text><text x="${L-8}" y="${y+4}" text-anchor="end">${concise(spec.y.min+(spec.y.max-spec.y.min)*i/4)}</text>`;}
    svg+=`<g clip-path="url(#${clip})">`;
    for(const r of spec.regions)svg+=`<polygon points="${r.points.map(([x,y])=>sx(x)+','+sy(y)).join(' ')}" fill="${colors[r.tone]}" fill-opacity=".13"/>`;
    let gaps=0,limited=false;
    for(const s of spec.series){let segments=[],path='',open=false;const ps=sampleChartSeries(s,spec,values);limited ||= !!ps.limited;
      for(const [x,y]of ps){const a=sx(x),b=sy(y);if(y===null||!Number.isFinite(b)||Math.abs(a)>1e7||Math.abs(b)>1e7){open=false;gaps++;continue;}path+=(open?'L':'M')+a.toFixed(2)+' '+b.toFixed(2);open=true;}
      svg+=`<path d="${path}" stroke="${colors[s.tone]}" stroke-width="2.5" fill="none"><title>${esc(s.label)}</title></path>`;
    }
    svg+=`</g><path d="M${L} ${T}V${T+h}H${L+w}" class="vie-general-chart-axis"/><text x="${L+w/2}" y="${H-8}" text-anchor="middle">${esc(spec.x.label)}</text><text x="16" y="${T+h/2}" text-anchor="middle" transform="rotate(-90 16 ${T+h/2})">${esc(spec.y.label)}</text></svg>`;
    root.querySelector('[data-chart-plot]').innerHTML=svg;
    for(const c of visibleControls){root.querySelector(`[data-chart-value="${c.key}"]`).textContent=concise(values[c.key]);for(const el of root.querySelectorAll(`[data-chart-key="${c.key}"]`)){if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',String(Number(el.value)===values[c.key]));else if(el.type==='checkbox')el.checked=values[c.key]===1;else if(el!==root.ownerDocument.activeElement)el.value=values[c.key];}}
    root.querySelector('[data-chart-error]').textContent=limited?'采样分辨率已达上限，请缩小横轴范围查看细节。':gaps?'定义域之外的部分未绘制。':'';
  }
  const commit=(key,value)=>{try{const next=validateChartState(spec,{...values,[key]:value});options.onChange?.({...next});values=next;schedule();}catch(error){root.querySelector('[data-chart-error]').textContent=error.message;}};
  const inputEvent=e=>{const target=e.target,key=target.dataset.chartKey;if(!key||target.tagName==='BUTTON'||target.type==='number'&&(!target.value||!target.validity.valid))return;commit(key,target.type==='checkbox'?(target.checked?1:0):Number(target.value));};
  const click=e=>{const choice=e.target.closest('button[data-chart-key]');if(choice){commit(choice.dataset.chartKey,Number(choice.value));return;}if(!e.target.closest('[data-chart-reset]'))return;const next=validateChartState(spec,{...values,...Object.fromEntries(visibleControls.map(c=>[c.key,c.value]))});options.onChange?.({...next});values=next;draw();};
  root.addEventListener('input',inputEvent);root.addEventListener('click',click);const resize=new ResizeObserver(schedule);resize.observe(root);draw();
  return {snapshot:()=>({...values}),update(value){const next=validateChartState(spec,value);if(JSON.stringify(next)===JSON.stringify(values))return;values=next;schedule();},dispose(){disposed=true;root.ownerDocument.defaultView.cancelAnimationFrame(scheduled);resize.disconnect();root.removeEventListener('input',inputEvent);root.removeEventListener('click',click);root.replaceChildren();}};

}

/** Composer mode picker using the Harness model selector's sizing and theme tokens. */
function createVIEModeView(React,ReactDOM){
  const items=[{id:'auto',label:'自动'},{id:'on',label:'本聊天启用'},{id:'study',label:'学习模式'},{id:'off',label:'关闭'}];
  return function VIEModeControl({useProjection,locked,flip}){
    const view=useProjection('dsh-vie:mode'),[busy,setBusy]=React.useState(false),[error,setError]=React.useState(''),[open,setOpen]=React.useState(false),[position,setPosition]=React.useState(null);
    const trigger=React.useRef(null),menu=React.useRef(null),alive=React.useRef(true),id=React.useId(),disabled=!!locked||busy||!!view?.pending;
    React.useEffect(()=>{alive.current=true;return ()=>{alive.current=false;};},[]);
    const close=restore=>{setOpen(false);setPosition(null);if(restore)trigger.current?.focus({preventScroll:true});};
    React.useEffect(()=>{if(disabled||!view)close(false);},[disabled,!!view]);
    React.useLayoutEffect(()=>{
      if(!open||!trigger.current)return;
      const win=trigger.current.ownerDocument.defaultView;
      const reposition=()=>{const rect=trigger.current.getBoundingClientRect(),height=menu.current?.offsetHeight??112,next={left:Math.max(8,Math.min(rect.left,win.innerWidth-176)),...(rect.top>height+14?{bottom:Math.max(8,win.innerHeight-rect.top+6)}:{top:Math.max(8,Math.min(rect.bottom+6,win.innerHeight-height-8))})};setPosition(old=>JSON.stringify(old)===JSON.stringify(next)?old:next);};
      reposition();
      const doc=trigger.current.ownerDocument;
      const outside=event=>{if(!trigger.current?.contains(event.target)&&!menu.current?.contains(event.target))close(false);};
      doc.addEventListener('pointerdown',outside);win.addEventListener('resize',reposition);win.addEventListener('scroll',reposition,true);
      return ()=>{doc.removeEventListener('pointerdown',outside);win.removeEventListener('resize',reposition);win.removeEventListener('scroll',reposition,true);};
    },[open]);
    React.useLayoutEffect(()=>{if(open&&position)menu.current?.querySelector('[aria-checked=true]')?.focus({preventScroll:true});},[open,!!position]);
    async function choose(mode){
      close(true);if(disabled||mode===view.mode)return;
      setBusy(true);setError('');try{await flip(mode);}catch(error){if(alive.current)setError(String(error.message??error));}finally{if(alive.current)setBusy(false);}
    }
    function keys(event){
      if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close(true);return;}
      if(event.key==='Tab'){close(true);return;}
      const buttons=[...menu.current.querySelectorAll('[role=menuitemradio]')],index=buttons.indexOf(event.target);
      const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:event.key==='ArrowDown'?(index+1)%buttons.length:event.key==='ArrowUp'?(index+buttons.length-1)%buttons.length:-1;
      if(next>=0){event.preventDefault();buttons[next].focus({preventScroll:true});}
    }
    if(!view)return null;
    const popup=open?React.createElement('div',{id,ref:menu,className:'vie-mode-menu',role:'menu','aria-label':'本聊天可视化模式',onKeyDown:keys,style:position?{position:'fixed',...position}:undefined},items.map(item=>React.createElement('button',{key:item.id,type:'button',role:'menuitemradio','aria-checked':view.mode===item.id,tabIndex:-1,onClick:()=>choose(item.id)},[
      React.createElement('span',{key:'label'},item.label),React.createElement('span',{key:'check','aria-hidden':true},view.mode===item.id?'✓':'')
    ]))):null;
    return React.createElement('div',{className:'vie-mode-control'},[
      React.createElement('button',{key:'trigger',ref:trigger,type:'button',className:'vie-mode-trigger','aria-label':'本聊天可视化模式','aria-haspopup':'menu','aria-expanded':open,'aria-controls':open?id:undefined,'aria-busy':busy||view.pending||undefined,disabled,title:'本聊天可视化：'+items.find(x=>x.id===view.mode)?.label,onClick:()=>{if(!disabled)setOpen(!open);},onKeyDown:event=>{if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();setOpen(true);}}},[
        React.createElement('span',{key:'label',className:'vie-mode-label'},'VIE · '+(items.find(x=>x.id===view.mode)?.label??'自动')),
        React.createElement('svg',{key:'chevron',className:'vie-mode-chevron',width:16,height:16,viewBox:'0 0 16 16','aria-hidden':true},React.createElement('path',{d:'m4 6 4 4 4-4',fill:'none',stroke:'currentColor',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}))
      ]),popup&&(ReactDOM?.createPortal?ReactDOM.createPortal(popup,trigger.current.ownerDocument.body):popup),
      (error||view.status)&&React.createElement('span',{key:'error',role:'status'},error||view.status)
    ]);
  };
}

const {makeVisualMarkup}=(()=>{
/** Reusable declarative visual renderer. The same pure function powers React and
 * the no-dependency playground. All strings are escaped; input is revalidated.
 */
const esc=x=>String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const palette={primary:'var(--vie-primary,#4d82d6)',secondary:'var(--vie-secondary,#149f91)',accent:'var(--vie-accent,#d58b16)',muted:'var(--vie-muted,#8291a2)',warning:'var(--vie-warning,#cf6854)'};
const fillPalette=Object.fromEntries(Object.entries(palette).map(([key,color])=>[key,'color-mix(in srgb,'+color+' 12%,var(--vie-bg,#fff))']));
const color=k=>palette[k]??palette.primary;
const bg=k=>fillPalette[k]??fillPalette.primary;
const roleTone={input:'primary',output:'secondary',fixed:'warning',important:'accent',step:'primary',default:'muted',neutral:'muted'};
const svgOpen=(w,h,title)=>`<svg class="vie-visual-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}" preserveAspectRatio="xMidYMid meet"><defs><marker id="vie-arrow-head" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L7 3.5L0 7Z" fill="#8e9cac"/></marker></defs>`;
const text=(x,y,label,extra='')=>`<text x="${x}" y="${y}" ${extra}>${esc(label)}</text>`;
/** Measured-budget multiline labels, with full text retained in aria/detail. */
function wrappedText(x,y,label,width,fontSize=13,maxLines=3,extra=''){
  const lines=[];let line='',units=0;const capacity=Math.max(3,(width-16)/fontSize);
  for(const char of Array.from(label)){const size=/[\u2e80-\uffff]/u.test(char)?1:.58;if(units+size>capacity&&line){lines.push(line);line='';units=0;}line+=char;units+=size;}
  if(line)lines.push(line);
  if(lines.length>maxLines){lines.length=maxLines;lines[maxLines-1]=lines[maxLines-1].slice(0,-1)+'…';}
  const step=fontSize*1.23,top=y-(lines.length-1)*step/2;
  return `<text font-size="${fontSize}" text-anchor="middle" ${extra}>${lines.map((value,i)=>`<tspan x="${x}" y="${(top+i*step).toFixed(2)}">${esc(value)}</tspan>`).join('')}</text>`;
}
function flowSVG(spec,selected,compact=false){
  const horizontal=!compact&&(spec.layout==='horizontal'||spec.layout!=='vertical'&&spec.nodes.length<=4);
  const W=compact?320:680,H=horizontal?210:spec.nodes.length*112+24;
  const locations=new Map();
  spec.nodes.forEach((node,i)=>{const width=horizontal?Math.min(142,W/spec.nodes.length-24):compact?210:326;locations.set(node.id,{x:horizontal?W*(i+.5)/spec.nodes.length-width/2:(W-width)/2,y:horizontal?78:18+i*112,w:width,h:76});});
  const edges=spec.edges.map((edge,i)=>{
    const a=locations.get(edge.from),b=locations.get(edge.to),from=spec.nodes.findIndex(n=>n.id===edge.from),to=spec.nodes.findIndex(n=>n.id===edge.to);
    const ax=a.x+a.w/2,ay=a.y+a.h/2,bx=b.x+b.w/2,by=b.y+b.h/2;
    let path,lx,ly,lw=compact?60:112;
    if(edge.from===edge.to&&horizontal){path=`M${ax-18} ${a.y}C${ax-58} ${a.y-60} ${ax+58} ${a.y-60} ${ax+18} ${a.y}`;lx=ax;ly=a.y-38;lw=Math.min(100,a.w);}else if(edge.from===edge.to){const x=a.x+a.w,reach=compact?46:90;path=`M${x} ${ay-18}C${x+reach} ${ay-58} ${x+reach} ${ay+58} ${x} ${ay+18}`;lx=x+(compact?31:62);ly=ay;lw=compact?42:100;}else if(horizontal){
      const direction=bx>ax?1:-1,sx=ax+direction*a.w/2,ex=bx-direction*b.w/2;
      if(to===from+1){path=`M${sx} ${ay}L${ex} ${by}`;lx=(sx+ex)/2;ly=65;}
      else{const rail=14+(i%3)*12;path=`M${ax} ${a.y}C${ax} ${rail} ${bx} ${rail} ${bx} ${b.y}`;lx=(ax+bx)/2;ly=rail+9;}
    }else if(to===from+1){
      const direction=by>ay?1:-1,sy=ay+direction*a.h/2,ey=by-direction*b.h/2;path=`M${ax} ${sy}L${bx} ${ey}`;lx=ax+54;ly=(sy+ey)/2+3;lw=96;
    }else{
      const rail=compact?25:70;path=`M${a.x} ${ay}C${rail} ${ay} ${rail} ${by} ${b.x} ${by}`;lx=rail;ly=(ay+by)/2;lw=compact?44:112;
    }
    const label=edge.label?`<rect x="${lx-lw/2}" y="${ly-18}" width="${lw}" height="33" rx="7" fill="var(--vie-bg,#fff)" fill-opacity=".95"/>${wrappedText(lx,ly,edge.label,lw,12,2,'fill="var(--vie-muted,#647587)"')}`:'';
    return `<path ${edge.from===edge.to?'data-vie-self-loop="true"':''} d="${path}" fill="none" stroke="#98a8b8" stroke-width="1.6" ${edge.kind==='line'?'':'marker-end="url(#vie-arrow-head)"'}><title>${esc(edge.label??'')}</title></path>${label}`;
  }).join('');
  const cards=spec.nodes.map(node=>{
    const r=locations.get(node.id),tone=roleTone[node.role]||'muted',active=selected===node.id,role=node.role&&node.role!=='default';
    return `<g data-vie-item="${esc(node.id)}" tabindex="0" role="button" aria-label="${esc(node.label)}" class="vie-svg-item${active?' is-active':''}" style="cursor:pointer"><rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="13" fill="${bg(tone)}" stroke="${active?color(tone):'#d2dce5'}" stroke-width="${active?2.5:1.3}"/>${wrappedText(r.x+r.w/2,r.y+(role?29:41),node.label,r.w,14,role?2:3,'font-weight="600" fill="#334358"')}${role?text(r.x+r.w/2,r.y+61,{input:'输入',output:'输出',fixed:'固定',important:'重点',step:'步骤',neutral:'',default:''}[node.role]??'','font-size="11" text-anchor="middle" fill="'+color(tone)+'"'):''}</g>`;
  }).join('');
  return svgOpen(W,H,spec.title).replace('class="vie-visual-svg"',`class="vie-visual-svg ${compact?'vie-visual-mobile-svg':'vie-visual-desktop-svg'}"`)+edges+cards+'</svg>';
}

function graphSVG(spec,selected,compact=false){
  const W=compact?320:680,H=compact?310:340,cx=W/2,cy=compact?148:162;
  const loc=new Map();const count=spec.nodes.length;
  spec.nodes.forEach((n,i)=>{
    if(spec.layout==='grid'){
      const columns=compact?2:Math.ceil(Math.sqrt(count));
      const rows=Math.ceil(count/columns);
      const gapX=(W-(compact?110:170))/Math.max(1,columns-1),gapY=(H-92)/Math.max(1,rows-1);
      loc.set(n.id,{x:columns===1?cx:(compact?55:85)+(i%columns)*gapX,y:rows===1?cy:46+Math.floor(i/columns)*gapY});
    }else{
      const a=(2*Math.PI*i/count)-Math.PI/2;
      loc.set(n.id,{x:cx+Math.cos(a)*(compact?108:236),y:cy+Math.sin(a)*(compact?92:103)});
    }
  });
  const edgeHTML=spec.edges.map(e=>{
    const a=loc.get(e.from),b=loc.get(e.to);
    if(e.from===e.to){const direction=a.x>W/2?-1:1,x=a.x+direction*(compact?45:57),reach=direction*(compact?46:70),label=e.label?wrappedText(x+reach*.6,a.y,e.label,compact?48:90,10,2,'fill="var(--vie-muted)"'):'';return `<path data-vie-self-loop="true" d="M${x} ${a.y-12}C${x+reach} ${a.y-52} ${x+reach} ${a.y+52} ${x} ${a.y+12}" fill="none" stroke="#9faebb" stroke-width="1.6" ${e.kind==='line'?'':'marker-end="url(#vie-arrow-head)"'}><title>${esc(e.label??'')}</title></path>${label}`;}
    const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1;
    const sx=a.x+dx/d*(compact?29:37),sy=a.y+dy/d*(compact?25:29),ex=b.x-dx/d*(compact?30:40),ey=b.y-dy/d*(compact?25:32);
    const mx=(sx+ex)/2,my=(sy+ey)/2;
    return `<line x1="${sx.toFixed(2)}" y1="${sy.toFixed(2)}" x2="${ex.toFixed(2)}" y2="${ey.toFixed(2)}" stroke="#9faebb" stroke-width="1.6" ${e.kind==='line'?'':'marker-end="url(#vie-arrow-head)"'}/>${e.label&&!compact?`<rect x="${(mx-42).toFixed(2)}" y="${(my-12).toFixed(2)}" width="84" height="20" rx="9" fill="#fff" fill-opacity=".95"/>${text(mx.toFixed(2),(my+2).toFixed(2),e.label,'font-size="10" text-anchor="middle" fill="#647587"')}`:''}`;
  }).join('');
  const vertices=spec.nodes.map(n=>{
    const p=loc.get(n.id),tone=roleTone[n.role]||'primary',active=selected===n.id;
    return `<g data-vie-item="${esc(n.id)}" tabindex="0" role="button" aria-label="${esc(n.label)}" class="vie-svg-item${active?' is-active':''}" style="cursor:pointer"><rect x="${(p.x-(compact?45:57)).toFixed(2)}" y="${(p.y-(compact?23:27)).toFixed(2)}" width="${compact?90:114}" height="${compact?46:54}" rx="13" fill="${bg(tone)}" stroke="${active?color(tone):'#cedae4'}" stroke-width="${active?2.6:1.2}"/>${wrappedText(p.x,p.y+4,n.label,compact?90:114,compact?11:12,3,'font-weight="600" fill="#34485d"')}</g>`;
  }).join('');
  return svgOpen(W,H,spec.title).replace('class="vie-visual-svg"',`class="vie-visual-svg ${compact?'vie-visual-mobile-svg':'vie-visual-desktop-svg'}"`)+edgeHTML+vertices+'</svg>';
}
function shapeSVG(s,selected,index){
  const c=color(s.tone),fill=s.fill===false?'none':bg(s.tone),sw=s.strokeWidth??1.8;
  let inner='';
  const base=`stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
  if(s.k==='circle')inner=`<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" fill="${fill}" ${base}/>`;
  else if(s.k==='ellipse')inner=`<ellipse cx="${s.cx}" cy="${s.cy}" rx="${s.rx}" ry="${s.ry}" fill="${fill}" ${base}/>`;
  else if(s.k==='rect')inner=`<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="${s.rx??6}" ry="${s.ry??s.rx??6}" fill="${fill}" ${base}/>`;
  else if(s.k==='line'||s.k==='arrow')inner=`<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" ${base} ${s.k==='arrow'?'marker-end="url(#vie-arrow-head)"':''}/>`;
  else if(s.k==='polyline')inner=`<polyline points="${s.points.map(p=>p.join(',')).join(' ')}" fill="none" ${base}/>`;
  else if(s.k==='path')inner=`<path d="${esc(s.d)}" fill="${s.fill?fill:'none'}" ${base}/>`;
  else inner=text(s.x,s.y,s.t,`fill="${c}" font-size="15" font-weight="560" text-anchor="${s.anchor??'start'}"`);
  const label=s.label||s.t;
  return s.id?label?`<g data-vie-item="${esc(s.id)}" data-vie-shape="${esc(s.id)}" tabindex="0" role="button" aria-label="${esc(label)}" class="vie-svg-item${selected===s.id?' is-active':''}">${inner}</g>`:`<g data-vie-shape="${esc(s.id)}">${inner}</g>`:inner;
}
function diagramSVG(spec,selected){
  return svgOpen(spec.width,spec.height,spec.title)+spec.shapes.map((s,i)=>shapeSVG(s,selected,i)).join('')+'</svg>';
}
/** Numeric state bindings resolve to bounded finite SVG coordinates only. */
function resolveVisual(input,kind,values){
  const resolved=validateVisualSpec(kind,input);
  const limited=[];
  const read=coordinate=>{
    if(!coordinate||typeof coordinate!=='object'||!Object.hasOwn(coordinate,'$bind'))return coordinate;
    const n=values[coordinate.$bind];
    if(typeof n!=='number'||!Number.isFinite(n)){limited.push(coordinate.$bind);return 0;}
    const result=n*(coordinate.scale??1)+(coordinate.offset??0);
    if(!Number.isFinite(result))throw Error('Diagram binding is not finite: '+coordinate.$bind);
    if(Math.abs(result)>1200)limited.push(coordinate.$bind);
    return Math.max(-1200,Math.min(1200,result));
  };
  const live=value=>typeof value==='string'?interpolateText(value,values):value;
  return {...resolved,get _limited(){return limited;},title:live(resolved.title),subtitle:live(resolved.subtitle),
    ...(resolved.nodes?{nodes:resolved.nodes.map(item=>({...item,label:live(item.label),detail:live(item.detail)}))}:{}),
    ...(resolved.items?{items:resolved.items.map(item=>({...item,label:live(item.label),detail:live(item.detail),at:live(item.at)}))}:{}),
    ...(resolved.edges?{edges:resolved.edges.map(item=>({...item,label:live(item.label)}))}:{}),
    ...(resolved.shapes?{shapes:resolved.shapes.map(shape=>Object.fromEntries(Object.entries(shape).map(([key,value])=>{
      const v=key==='t'?live(value):read(value);
      // Signed numeric bindings can temporarily cross zero. Clamp the shape,
      // but expose the fact that clipping occurred in the figure's note.
      if(['w','h','r','rx','ry'].includes(key)&&typeof v==='number'){
        const cap=shape.k==='rect'&&['rx','ry'].includes(key)?200:1200;
        if(v<0||v>cap)limited.push(key);
        return [key,Math.max(0,Math.min(cap,v))];
      }
      return [key,v];
    })))}:{})
  };
}
/** Returns trusted HTML only after strict validation. User labels are XML-escaped. */
function makeVisualMarkup(kind,input,selected='',values={}){
  const s=resolveVisual(input,kind,values);
  const selectedId=kind==='Timeline'?s.items.find(i=>i.id===selected)?.id:(kind==='Diagram'||kind==='Animation')?s.shapes.find(i=>i.id===selected)?.id:s.nodes.find(i=>i.id===selected)?.id;
  const chosen=selectedId||'';
  let visual='';
  if(kind==='Flow')visual=flowSVG(s,chosen)+flowSVG(s,chosen,true);
  if(kind==='RelationGraph')visual=graphSVG(s,chosen)+graphSVG(s,chosen,true);
  if(kind==='Diagram'||kind==='Animation')visual=diagramSVG(s,chosen);
  if(kind==='Timeline')visual=`<div class="vie-timeline-list" role="list">${s.items.map((v,i)=>`<button type="button" role="listitem" class="vie-timeline-item${chosen===v.id?' is-active':''}" data-vie-item="${esc(v.id)}"><span class="vie-timeline-step">${i+1}</span><span class="vie-timeline-when">${esc(v.at)}</span><strong>${esc(v.label)}</strong></button>`).join('')}</div>`;
  const all=kind==='Timeline'?s.items:(kind==='Diagram'||kind==='Animation')?s.shapes.filter(i=>i.id&&(i.label||i.t)).map(i=>({id:i.id,label:i.label||i.t,detail:i.detail})):s.nodes;
  const found=all.find(n=>n.id===selectedId);
  const info=found?`<div class="vie-visual-selected" role="status"><strong>${esc(found.label)}</strong><span>${esc(found.detail??'已选中')}</span></div>`:`<div class="vie-visual-hint">${s.representation==='pitch-circles'?'分度圆示意 · 不表示真实齿形或接触校核':kind==='Animation'?'运动示意 · 按声明的几何变换播放':kind==='Diagram'?'示意图 · 数据依据与适用范围见图注':kind==='Timeline'?'点击事件查看详细信息':'点击图中的节点查看说明'}</div>`;
  const accuracy=s.accuracy&&s.accuracy!=='schematic'?`<span class="vie-visual-accuracy">${s.accuracy==='validated'?'输入标注 · 待独立校核':'输入标注 · 计算结果'}</span>`:'';
  const zoomTools=(kind==='Diagram'||kind==='Animation')?'<div class="vie-visual-zoom" role="group" aria-label="图形缩放"><button type="button" data-vie-zoom="out" aria-label="缩小图形">−</button><button type="button" data-vie-zoom="in" aria-label="放大图形">＋</button><button type="button" data-vie-zoom="fit">适合宽度</button><output data-vie-zoom-value aria-label="相对适合宽度的缩放">100%</output></div>':'';
  return `<section class="vie-visual-panel" data-vie-visual="${kind}"><div class="vie-visual-heading"><strong>${esc(s.title)}</strong>${accuracy}</div>${s.subtitle?`<p class="vie-visual-subtitle">${esc(s.subtitle)}</p>`:''}${zoomTools}<div class="vie-visual-content">${visual}</div>${kind==='Animation'?'<div class="vie-animation-controls"><button type="button" data-vie-play aria-label="暂停或播放动画">暂停</button><input type="range" min="0" max="1000" step="1" value="0" aria-label="动画时间进度" data-vie-scrub /><span data-vie-time>0%</span><button type="button" data-vie-restart>重播</button></div>':''}${s._limited?.length?`<p class="vie-visual-warning" role="status">部分动态坐标暂不可用或超出范围，已使用占位／截断值；该形状仅供示意。</p>`:''}${info}${(kind==='Diagram'||kind==='Animation')&&all.length?`<div class="vie-visual-legend">${all.map(n=>`<button type="button" data-vie-item="${esc(n.id)}" class="${chosen===n.id?'is-active':''}">${esc(n.label)}</button>`).join('')}</div>`:''}${kind==='Flow'||kind==='RelationGraph'?`<div class="vie-visual-mobile-list">${s.nodes.map(n=>`<button type="button" data-vie-item="${esc(n.id)}" class="${chosen===n.id?'is-active':''}">${esc(n.label)}</button>`).join('')}</div>`:''}</section>`;
}

return {makeVisualMarkup};
})();
let svgScopeSequence=0;
function scopeSvgMarkup(markup,prefix){
  let index=0;
  return markup.replace(/<svg\b[\s\S]*?<\/svg>/g,svg=>{
    const ids=new Map();for(const match of svg.matchAll(/\sid="([\w-]+)"/g))ids.set(match[1],prefix+'-'+index+'-'+match[1]);index++;
    for(const [old,id]of ids)svg=svg.replaceAll('id="'+old+'"','id="'+id+'"').replaceAll('url(#'+old+')','url(#'+id+')');return svg;
  });
}
/** VIE SceneStore: external, observable source of truth.
 * No React or DSH dependency. All scene revisions are atomic; rejected updates
 * never mutate the published parser. Model-originated source is never executed.
 */
const own=(object,key)=>Object.hasOwn(object,key);
const plain=x=>x!==null&&typeof x==='object'&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
const SIZE_LIMIT=LIMITS.bytes;
const MAX_PATCH_CHANGES=24;
const MAX_CHECKPOINT_BYTES=2*SIZE_LIMIT+65536;
const getId=source=>{const first=source.trimStart().split('\n',1)[0];try{const obj=JSON.parse(first);return obj.op==='surface.begin'&&typeof obj.id==='string'?obj.id:null;}catch{return null;}};
const parse=source=>{const p=new VIEStream();p.push(source);return p;};
const finalized=source=>{const p=parse(source);p.finish();return p;};
const copyValue=value=>JSON.parse(JSON.stringify(value));

class SceneStore {
  constructor(source=''){
    this.source='';this.parser=new VIEStream();this.version=0;
    this.revision=0;this.listeners=new Set();this.lastError=null;this.localState=Object.create(null);this.figureErrors=Object.create(null);
    if(source)this.updateSource(source);
  }
  subscribe(listener){if(typeof listener!=='function')throw Error('Listener required');this.listeners.add(listener);return ()=>this.listeners.delete(listener);}
  getVersion(){return this.version;}
  snapshot(){return {...this.parser.snapshot(),revision:this.revision,storeError:this.lastError};}
  context(){const summary=this.parser.interactionContext(),experiments={},figures={};for(const node of this.parser.scene.nodes.values()){if(node.type==='InteractiveScene')experiments[node.id]=experimentContext(node.props,this.localState[node.id]);if(node.type==='Chart')figures[node.id]={title:node.props.title,state:this.local(node.id)??validateChartState(node.props)};if(node.type==='GenerativeFigure')figures[node.id]={title:node.props.title,state:this.local(node.id)??node.props.state};}return {...summary,revision:this.revision,interactiveState:copyValue(this.localState),experiments,figures,figureErrors:{...this.figureErrors}};}
  setFigureError(nodeId,message){if(this.figureErrors[nodeId]===(message||undefined))return;if(message)this.figureErrors[nodeId]=String(message).slice(0,1200);else delete this.figureErrors[nodeId];this.emit();}
  emit(){this.version++;for(const cb of this.listeners)cb();}
  modifiedValues(){const result=Object.create(null);for(const path of this.parser.modified){if(own(this.parser.scene.state,path))result[path]=this.parser.scene.state[path];}return result;}
  reconcileLocal(parser){
    const next=Object.create(null);
    for(const [id,value] of Object.entries(this.localState)){
      const node=parser.scene.nodes.get(id),previous=this.parser.scene.nodes.get(id);
      if(!node||node.type!==previous?.type)continue;
      try{if(node.type==='GenerativeFigure'&&JSON.stringify(previous.props)!==JSON.stringify(node.props))continue;next[id]=node.type==='GenerativeFigure'?validateFigureState(value):node.type==='Chart'?validateChartState(node.props,value):node.type==='InteractiveScene'?validateExperimentSnapshot(node.props,value):copyValue(value);}catch{/* A replacement definition can invalidate old interactive inputs. */}
    }
    return next;
  }
  /** Streaming chunks should be passed as the accumulated source string.
   * A preview->final replacement preserves validated user input only if its
   * scene identity is the same. Otherwise previous state is discarded.
   */
  updateSource(source){
    if(typeof source!=='string'||new TextEncoder().encode(source).length>SIZE_LIMIT)throw Error('Scene source too large');
    if(source===this.source)return false;
    // True append-only flow: parse *only* the newly arrived bytes, retaining
    // committed controls and user edits. The React adapter invokes this in an
    // effect, never during render. Full replacement is transactional below.
    if(this.source && source.startsWith(this.source) && !this.parser.finished){
      this.parser.push(source.slice(this.source.length));
      this.localState=this.reconcileLocal(this.parser);
      this.source=source;this.revision++;this.emit();return true;
    }
    const sameScene=this.parser.scene.id!==null&&getId(source)===this.parser.scene.id;
    const priorValues=sameScene?this.modifiedValues():{};
    const parser=parse(source);
    for(const [path,value] of Object.entries(priorValues)){
      if(own(parser.scene.state,path))try{parser.set(path,value);}catch{/* updated constraints win */}
    }
    this.localState=sameScene?this.reconcileLocal(parser):Object.create(null);
    this.figureErrors=Object.fromEntries(Object.entries(this.figureErrors).filter(([id])=>sameScene&&parser.scene.nodes.get(id)?.type==='GenerativeFigure'));this.source=source;this.parser=parser;this.lastError=null;this.revision++;this.emit();return true;
  }
  local(nodeId){const node=this.parser.scene.nodes.get(nodeId),computed=this.parser.snapshot().values;if(node?.type==='GenerativeFigure'&&node.props.bindings)return validateFigureState({...node.props.state,...(this.localState[nodeId]??{}),...Object.fromEntries(Object.entries(node.props.bindings).map(([key,path])=>[key,Number.isFinite(computed[path])?computed[path]:null]))});if(node?.type==='Chart'&&(node.props.controls.some(c=>c.bind)||(node.props.inputs??[]).length))return validateChartState(node.props,{...(this.localState[nodeId]??{}),...Object.fromEntries([...node.props.controls.filter(c=>c.bind),...(node.props.inputs??[])].map(c=>[c.key,Object.hasOwn(computed,c.bind)?computed[c.bind]:NaN]))});return own(this.localState,nodeId)?copyValue(this.localState[nodeId]):null;}
  setLocal(nodeId,value){
    const node=this.parser.scene.nodes.get(nodeId);
    if(!node||!['CanTimingLab','InteractiveLab','InteractiveScene','GenerativeFigure','Chart'].includes(node.type))throw Error('Unknown interactive node');
    if(node.type==='Chart'){const clean=validateChartState(node.props,value);for(const c of node.props.controls.filter(c=>c.bind)){for(const other of this.parser.scene.nodes.values())if(other.type==='Chart')for(const peer of other.props.controls.filter(x=>x.bind===c.bind))if(clean[c.key]<peer.min||clean[c.key]>peer.max)throw Error('Shared chart parameter out of range');}const sharedChanged=node.props.controls.some(c=>c.bind&&this.parser.scene.state[c.bind]!==clean[c.key]);for(const c of node.props.controls.filter(c=>c.bind))this.parser.set(c.bind,clean[c.key]);if(!sharedChanged&&JSON.stringify(this.localState[nodeId])===JSON.stringify(clean))return;this.localState[nodeId]=copyValue(clean);this.revision++;this.emit();return;}
    if(node.type==='GenerativeFigure'){const clean=validateFigureState(value);const writes=[];for(const [key,path]of Object.entries(node.props.bindings??{})){if(!path.startsWith('/shared/')||!Object.hasOwn(clean,key)||Object.is(clean[key],this.parser.scene.state[path]))continue;const constraint=sliderConstraints(this.parser.scene.nodes).get(path);if(!constraint)throw Error('Missing bound figure control');assertSliderValue(constraint,clean[key],'Figure shared parameter');writes.push([path,clean[key]]);}for(const [path,v]of writes)this.parser.set(path,v);if(!writes.length&&JSON.stringify(this.localState[nodeId])===JSON.stringify(clean))return;this.localState[nodeId]=copyValue(clean);this.revision++;this.emit();return;}
    if(node.type==='InteractiveScene'){const clean=validateExperimentSnapshot(node.props,value);if(JSON.stringify(this.localState[nodeId])===JSON.stringify(clean))return;this.localState[nodeId]=copyValue(clean);this.revision++;this.emit();return;}
    if(!plain(value)||JSON.stringify(value).length>2048)throw Error('Invalid interactive state');
    // Restrict persisted local state to small JSON primitives and lists.
    for(const [key,item] of Object.entries(value)){
      if(!/^[A-Za-z][\w-]{0,40}$/.test(key)||!(typeof item==='boolean'||
         typeof item==='string'&&item.length<80||typeof item==='number'&&Number.isFinite(item)||
         Array.isArray(item)&&item.length<=12&&item.every(v=>typeof v==='number'&&Number.isFinite(v))||
         plain(item)&&Object.keys(item).length<=12&&Object.values(item).every(v=>typeof v==='number'&&Number.isFinite(v))))throw Error('Unsupported interactive state value');
    }
    if(JSON.stringify(this.localState[nodeId])===JSON.stringify(value))return;
    this.localState[nodeId]=copyValue(value);this.revision++;this.emit();
  }
  set(path,value){
    // Repeating a value is not an interaction change. Avoid invalidating
    // every subscribed React component or recomputing dependent visuals.
    if(own(this.parser.scene.state,path)&&Object.is(this.parser.scene.state[path],value))return false;
    this.parser.set(path,value);this.revision++;this.lastError=null;this.emit();return true;
  }
  reset(path){
    // A reset still clears modified status; a no-op only when both value
    // and modification tracking already equal the default.
    if(own(this.parser.defaults,path)&&Object.is(this.parser.scene.state[path],this.parser.defaults[path])&&!this.parser.modified.has(path))return false;
    this.parser.reset(path);this.revision++;this.lastError=null;this.emit();return true;
  }
  /** Patches require a completed, validated baseline and exact revision.
   * Allowed changes: state.set, node.put, node.remove. No arbitrary path mutation.
   * The implementation replays all events and validates before publishing.
   */
  patch(request){
    if(!plain(request))throw Error('Invalid scene patch');
    if(request.sceneId!==this.parser.scene.id)throw Error('Scene ID mismatch');
    if(!Number.isSafeInteger(request.baseRevision)||request.baseRevision!==this.revision)throw Error('Stale scene revision');
    if(!Array.isArray(request.changes)||request.changes.length<1||request.changes.length>MAX_PATCH_CHANGES)throw Error('Invalid patch change count');
    const baseline=finalized(this.source);
    if(!baseline.snapshot().complete)throw Error('Cannot patch incomplete scene');
    const events=this.source.trim().split('\n').map(line=>JSON.parse(line));
    if(events.at(-1)?.op!=='surface.end')throw Error('Invalid surface ending');
    const newEvents=[];
    const writes=[];
    for(const change of request.changes){
      if(!plain(change))throw Error('Invalid patch operation');
      if(change.op==='state.set'){
        if(typeof change.path!=='string'||!own(baseline.scene.state,change.path))throw Error('Patch target state missing');
        writes.push([change.path,change.value]);
      }else if(change.op==='node.put'){
        if(!plain(change.node)||change.node.op!=='node.put')throw Error('Invalid node patch');
        newEvents.push({...copyValue(change.node),v:1});
      }else if(change.op==='node.remove'){
        if(typeof change.id!=='string'||!baseline.scene.nodes.has(change.id))throw Error('Node does not exist');
        newEvents.push({v:1,op:'node.remove',id:change.id});
      }else throw Error('Disallowed patch operation');
    }
    const end=events.pop();
    const nextSource=[...events,...newEvents,end].map(e=>JSON.stringify(e)+'\n').join('');
    if(new TextEncoder().encode(nextSource).length>SIZE_LIMIT)throw Error('Patch exceeds source limit');
    const next=finalized(nextSource);
    let result=next.snapshot();if(!result.complete)throw Error('Invalid scene patch: '+result.errors.join('; '));
    for(const [path,value] of Object.entries(this.modifiedValues())){
      if(own(next.scene.state,path))try{next.set(path,value);}catch{/* cannot keep invalid previous value */}
    }
    for(const [path,value] of writes)next.set(path,value);
    result=next.snapshot();if(!result.complete||result.errors.length)throw Error('Invalid scene patch state');
    for(const id of Object.keys(this.localState))if(!next.scene.nodes.has(id))delete this.localState[id];
    this.parser=next;this.source=nextSource;this.revision++;this.lastError=null;this.emit();
    return this.snapshot();
  }
  /** Checkpoints are explicit opt-in exports. They can be stored in a DSH
   * Session resource by a future verified Host adapter; no hidden localStorage.
   */
  checkpoint(){
    if(!this.parser.snapshot().complete)throw Error('Cannot checkpoint incomplete scene');
    return {format:'vie-checkpoint',v:1,sceneId:this.parser.scene.id,
      revision:this.revision,source:this.source,userValues:{...this.modifiedValues()},interactiveState:copyValue(this.localState)};
  }
  restore(checkpoint){
    if(!plain(checkpoint)||checkpoint.format!=='vie-checkpoint'||checkpoint.v!==1||
       typeof checkpoint.source!=='string'||!plain(checkpoint.userValues)||
       new TextEncoder().encode(JSON.stringify(checkpoint)).length>MAX_CHECKPOINT_BYTES)throw Error('Invalid checkpoint');
    const parser=finalized(checkpoint.source);
    if(!parser.snapshot().complete||parser.scene.id!==checkpoint.sceneId)throw Error('Checkpoint scene mismatch');
    if(Object.keys(checkpoint.userValues).length>64)throw Error('Checkpoint state limit exceeded');
    for(const [path,value] of Object.entries(checkpoint.userValues))parser.set(path,value);
    if(!Number.isSafeInteger(checkpoint.revision)||checkpoint.revision<0)throw Error('Invalid checkpoint revision');
    if(checkpoint.interactiveState!==undefined&&!plain(checkpoint.interactiveState))throw Error('Invalid interactive checkpoint');
    const labStates=Object.create(null);
    for(const [id,value] of Object.entries(checkpoint.interactiveState??{})){
      const node=parser.scene.nodes.get(id);
      if(!node||!['CanTimingLab','InteractiveLab','InteractiveScene','GenerativeFigure','Chart'].includes(node.type))throw Error('Unknown interactive node');
      if(node.type==='Chart'){labStates[id]=validateChartState(node.props,value);continue;}
      if(node.type==='GenerativeFigure'){labStates[id]=validateFigureState(value);continue;}
      if(node.type==='InteractiveScene'){labStates[id]=validateExperimentSnapshot(node.props,value);continue;}
      if(!plain(value)||JSON.stringify(value).length>2048)throw Error('Invalid interactive state');
      for(const [key,item] of Object.entries(value)){
        if(!/^[A-Za-z][\w-]{0,40}$/.test(key)||!(typeof item==='boolean'||
           typeof item==='string'&&item.length<80||typeof item==='number'&&Number.isFinite(item)||
           Array.isArray(item)&&item.length<=12&&item.every(v=>typeof v==='number'&&Number.isFinite(v))||
           plain(item)&&Object.keys(item).length<=12&&Object.values(item).every(v=>typeof v==='number'&&Number.isFinite(v))))throw Error('Unsupported interactive state value');
      }
      labStates[id]=copyValue(value);
    }
    // Atomic commit. The previous scene stays intact on any failed restore.
    this.parser=parser;this.source=checkpoint.source;this.revision=checkpoint.revision;
    this.lastError=null;this.figureErrors=Object.create(null);this.localState=labStates;this.emit();return this.snapshot();
  }
}

/**
 * Turn-scoped VIE projection from durable DSH tool/result events.
 * This is deliberately independent of React, localStorage and the DOM.
 * Each visible item contains its complete source, so tail-first history can
 * recover even when tool/call or turn/start lies on an older unloaded page.
 */
/** Public DSH Chat target contribution. No DOM relocation or host renderer takeover. */
const VIE_ANSWER_KIND='vie-answer';
const VIE_TOOL_NAMES=new Set(['vie_explain','vie_quick','vie_compose','vie_story','vie_render','vie_auto']);
function effectiveVIEPlacement(meta){
  if(meta?.placement==='process')return 'process';
  if(meta?.presentationVersion>=3&&meta.placement==='flow')return 'flow';
  // Old releases unconditionally wrote tail, so migrate their presentation without editing logs.
  return meta?.presentationVersion>=2&&meta.placement==='tail'?'tail':'start';
}
function createVIEAnswerDefinition(){
  const merge=(items,item)=>{const old=items.find(x=>x.callId===item.callId||item.visualId&&x.visualId===item.visualId);return old?items.filter(x=>x===old||x.callId!==item.callId).map(x=>x===old?{...item,callId:old.callId,latestCallId:item.callId,seq:old.seq}:x):[...items,item].slice(-4);};
  const coordinate=event=>Number.isSafeInteger(event.data?.turn)?event.data.turn:null;
  function update(context,match){
    const event=match.event,old=context.state??{items:[],calls:new Map(),anchor:null},state={...old,calls:new Map(old.calls)};
    if(event.type==='assistant/message'||event.type==='assistant/live-chunk')state.anchor=old.anchor??event.seq;
    function argumentsFor(callId,name,raw,append=false){
      if(!VIE_TOOL_NAMES.has(name)&&!state.calls.has(callId))return;
      const call=state.calls.get(callId)??{name,raw:'',decoder:new IncrementalToolArguments({fields:['source','spec','document','kind','preset','placement','query','templateId','parameters']}),preview:new DocumentPreview()};
      call.raw=append?call.raw+(raw??''):raw??call.raw;
      if(call.raw.length>1048576)return;
      const fields=call.decoder.update(call.raw);state.calls.set(callId,call);while(state.calls.size>4)state.calls.delete(state.calls.keys().next().value);
      // New live calls belong to their own chronological surface. The turn-wide
      // aggregator remains available for explicit start and historical results.
      if(fields.placement!=='start')return;
      const source=sourceFromArguments(fields,call.preview);
      state.items=merge(state.items,{callId,source,title:call.preview.title??'交互解释',seq:event.seq,pending:true});
    }
    if(event.type==='assistant/live-chunk'){
      const c=event.data.chunk;
      if(c.type==='tool-call-delta')argumentsFor(String(c.id),c.name,c.argumentsDelta,true);
    }else if(event.type==='assistant/message'){
      for(const b of event.data.message?.content??[])if(b.type==='tool-call')argumentsFor(String(b.id),b.name,b.arguments);
    }else if(event.type==='tool/call')argumentsFor(String(event.data.callId),event.data.name,event.data.arguments);
    else if(event.type==='tool/result'){
      const meta=event.data.meta,callId=String(event.data.message?.source?.callId??'');
      if(meta?.kind==='vie'){
        state.calls.delete(callId);
        if(effectiveVIEPlacement(meta)!=='start')state.items=state.items.filter(x=>x.callId!==callId);
        else if(meta.valid===true&&event.data.message?.isError!==true&&callId&&typeof meta.source==='string'&&new TextEncoder().encode(meta.source).length<=LIMITS.bytes)
          state.items=merge(state.items,{callId,visualId:meta.visualId,source:meta.source,title:String(meta.title??'交互解释').slice(0,120),caption:String(meta.caption??'').slice(0,140),seq:event.seq,pending:false});
        else state.items=merge(state.items,{callId,visualId:meta.visualId,source:'',title:'图解未完成',error:String(meta.error??meta.errors?.[0]??'图解校验失败').slice(0,500),seq:event.seq,pending:false});
      }
    }else if(event.type==='turn/end')state.items=state.items.map(x=>({...x,pending:false,interrupted:x.pending===true}));
    if(state.items.length&&state.anchor===null)state.anchor=state.items[0].seq;
    return state;
  }
  return {kind:VIE_ANSWER_KIND,target:'chat',
    match(event){if(coordinate(event)===null)return null;if(['assistant/message','assistant/live-chunk','turn/end'].includes(event.type)||event.type==='tool/call'&&VIE_TOOL_NAMES.has(event.data.name)||event.type==='tool/result'&&event.data.meta?.kind==='vie')return {id:String(event.data.turn),role:'start'};return null;},
    start(context,match){return update({...context,state:undefined},match);},update,
    publication:match=>match.event.type==='assistant/live-chunk'?'animation-frame':'immediate',
    buildViewNode(context){
      const s=context.state;if(!s?.items.length){const current=context.current?.get('chat');return current?{...current,visibility:'hidden',data:{items:[]}}:null;}
      return {key:context.key,id:context.id,kind:VIE_ANSWER_KIND,target:'chat',anchorSeq:Math.max(0,(s.anchor??s.items[0].seq)-0.04),
        location:context.start?.location??context.matches[0]?.location??{kind:'unresolved'},visibility:'visible',groupTree:'turn',data:{items:s.items}};
    }
  };
}

/** One chronological Chat node per logical visual, alongside native assistant prose. */
const VIE_FLOW_KIND='vie-flow-answer';
/** Publish only public prose outside the completed-process disclosure.
 * Reuse Harness's assistant-step renderer (Markdown/math/links), never VIE text.
 * Original events remain intact in the diagnostic process transcript.
 */
function createVIEProseDefinition(){
  return {kind:'vie-flow-prose',target:'chat',
    match(event){return event.type==='assistant/message'&&Number.isSafeInteger(event.data?.turn)&&Number.isSafeInteger(event.data?.step)?{id:event.data.turn+':'+event.data.step,role:'start'}:null;},
    start(_ctx,match){return {seq:match.event.seq};},
    update(_ctx,match){return {seq:match.event.seq};},
    publication:()=> 'immediate',
    buildViewNode(context){
      const loc=context.start?.location??context.matches[0]?.location,turn=loc?.turn;
      const hidden=()=>context.current?.get('chat')?{...context.current.get('chat'),visibility:'hidden'}:null;
      if(loc?.kind!=='step'||turn?.status!=='closed')return hidden();
      if(turn.data?.get(VIE_TURN_KIND)?.flow!==true)return hidden();
      const data=loc.step.data.get('assistant-step');
      if(!data||data.status==='running')return hidden();
      const answer=turn.data.get('turn-process');
      // The native final answer already survives folding; do not repeat it.
      if(answer?.answerStep===data.step)return hidden();
      if(!answer&&turn.steps.at(-1)?.step===data.step&&!data.blocks.some(b=>b.kind==='tool-call'))return hidden();
      const blocks=data.blocks.filter(b=>b.kind==='text'&&b.text?.trim());
      if(!blocks.length)return hidden();
      return {key:context.key,id:context.id,kind:'assistant-step',target:'chat',anchorSeq:context.state.seq-0.02,location:loc,groupTree:'turn',visibility:'visible',data:{...data,blocks}};
    }
  };
}
function flowVIECall(event){
  if(event.type==='tool/result'&&event.data.meta?.kind==='vie')return {id:String(event.data.meta.anchorCallId??event.data.message?.source?.callId??''),result:true};
  if(event.type==='tool/call'&&VIE_TOOL_NAMES.has(event.data.name))return {id:String(event.data.callId),name:event.data.name,raw:event.data.arguments};
  if(event.type==='assistant/live-chunk'&&event.data.chunk?.type==='tool-call-delta'){
    const c=event.data.chunk;return {id:String(c.id??''),name:c.name,raw:c.argumentsDelta,append:true};
  }
  if(event.type==='assistant/message'){
    const calls=(event.data.message?.content??[]).filter(b=>b.type==='tool-call'&&VIE_TOOL_NAMES.has(b.name));
    // Each tool/call still gets its own node when parallel calls share a message.
    const prose=(event.data.message?.content??[]).some(b=>b.type==='text'&&b.text?.trim());
    // A settled message can contain prose followed by a tool call. In cold history
    // the later tool/call event, not this message, is that graphic's anchor.
    if(calls.length===1&&!prose){const c=calls[0];return {id:String(c.id),name:c.name,raw:c.arguments};}
  }
  return null;
}
function createVIEFlowDefinition(){
  function update(context,match){
    const event=match.event,call=flowVIECall(event),old=context.state;
    const s=old?{...old}:{anchor:event.seq,callId:call.id,raw:'',name:call.name,decoder:new IncrementalToolArguments({fields:['source','spec','document','kind','preset','placement','query','templateId','parameters','visualId','changes']}),preview:new DocumentPreview(),item:null};
    if(call.result){
      const meta=event.data.meta,latestCallId=String(event.data.message?.source?.callId??call.id);
      if(effectiveVIEPlacement(meta)!=='flow'){s.item=null;return s;}
      const valid=meta.valid===true&&event.data.message?.isError!==true&&typeof meta.source==='string'&&new TextEncoder().encode(meta.source).length<=LIMITS.bytes;
      if(!valid&&s.item?.source&&!s.item.pending){s.item={...s.item,latestCallId,repairError:String(meta.error??'修订失败').slice(0,500)};return s;}
      s.item={callId:s.callId,latestCallId,visualId:meta.visualId,source:valid?meta.source:'',title:String(meta.title??'交互解释').slice(0,120),caption:String(meta.caption??'').slice(0,140),pending:false,...valid?{}:{error:String(meta.error??meta.errors?.[0]??'图解校验失败').slice(0,500)}};
      return s;
    }
    s.name=call.name??s.name;if(!VIE_TOOL_NAMES.has(s.name))return s;
    s.raw=call.append?s.raw+(call.raw??''):call.raw??s.raw;
    if(typeof s.raw!=='string'||s.raw.length>1048576)return s;
    const fields=s.decoder.update(s.raw);
    if(fields.placement&&fields.placement!=='flow'||fields.visualId||fields.changes){s.item=null;return s;}
    const source=sourceFromArguments(fields,s.preview);
    // An echoed completed call must not overwrite a terminal validated result.
    if(!s.item||s.item.pending)s.item={callId:s.callId,source,title:s.preview.title??'交互解释',pending:true};
    return s;
  }
  return {kind:VIE_FLOW_KIND,target:'chat',
    match(event){if(!Number.isSafeInteger(event.data?.turn))return null;const call=flowVIECall(event);return call?.id?{id:call.id,role:'start'}:null;},
    start(context,match){return update({...context,state:undefined},match);},update,
    publication:match=>match.event.type==='assistant/live-chunk'?'animation-frame':'immediate',
    buildViewNode(context){
      const s=context.state;if(!s?.item){const current=context.current?.get('chat');return current?{...current,visibility:'hidden',data:{items:[]}}:null;}
      const location=context.start?.location??context.matches[0]?.location??{kind:'unresolved'};
      const interrupted=s.item.pending&&location.turn?.status==='closed';
      const item=interrupted?{...s.item,pending:false,interrupted:true}:s.item;
      return {key:context.key,id:context.id,kind:VIE_FLOW_KIND,target:'chat',anchorSeq:Math.max(0,s.anchor-0.04),location,visibility:'visible',groupTree:'turn',data:{items:[item]}};
    }
  };
}

const VIE_TURN_KIND = 'vie-turn-surfaces';
const VIE_MAX_TURN_SCENES = 4;
const isVIETurnRecord = v => v !== null && typeof v === 'object' && !Array.isArray(v);

function toVIEResult(event) {
  if (!event || event.type !== 'tool/result') return null;
  const data = event.data;
  const meta = data?.meta;
  if (effectiveVIEPlacement(meta) !== 'tail') return null; // Opt-in: preserve tool-call position, subject to DSH folding.
  const source = meta?.source;
  const callId = data?.message?.source?.callId;
  if (!isVIETurnRecord(meta) || meta.kind !== 'vie' || meta.valid !== true ||
      typeof source !== 'string' || !source || new TextEncoder().encode(source).length > LIMITS.bytes ||
      typeof callId !== 'string' || !callId || data.message?.isError === true ||
      !Number.isSafeInteger(data.turn) || data.turn < 0) return null;
  return {callId, source, title: typeof meta.title === 'string' ? meta.title.slice(0,120) : '交互实验', caption: typeof meta.caption==='string' ? meta.caption.slice(0,140) : '', seq: event.seq};
}

function createVIETurnDefinition() {
  const project = event => toVIEResult(event);
  const flow = event => event.type==='tool/result'&&event.data?.meta?.kind==='vie'&&event.data.meta.valid===true&&event.data.message?.isError!==true&&effectiveVIEPlacement(event.data.meta)==='flow'&&!!event.data.meta.source;
  const merge = (items, item) => {
    const next = items.filter(v => v.callId !== item.callId);
    next.push(item);
    return next.slice(-VIE_MAX_TURN_SCENES);
  };
  return {
    kind: VIE_TURN_KIND,
    match(event) {
      if (event?.type === 'turn/start' && Number.isSafeInteger(event.data?.turn))
        return {id: String(event.data.turn), role: 'start'};
      // Use start instead of update so a tail-first history page has a
      // checkpoint even without the earlier turn/start event.
      if (project(event)||flow(event)) return {id:String(event.data.turn), role:'start'};
      return null;
    },
    start(_context, match) {
      const event = match.event;
      const item = project(event);
      return {turn: event.data.turn, items: item ? [item] : [],flow:flow(event)};
    },
    update(context, match) {
      const item = project(match.event);
      if (!item) return flow(match.event)?{...context.state,flow:true}:context.state;
      return {...context.state, items:merge(context.state.items, item)};
    },
    publication: () => 'immediate',
    buildLocationData(context, scope) {
      const state = context.state;
      if (scope !== 'turn' || !state || (!state.items.length&&!state.flow)) return null;
      // The key MUST equal the Definition kind or DSH rejects the projection.
      return {kind:'turn', turn:state.turn, key:VIE_TURN_KIND, value:{items:state.items,flow:state.flow===true}};
    }
  };
}

/** The chain selection must be pure and must not claim a non-VIE turn. */
function selectVIETurnTail(owner) {
  const data = owner?.turn?.data;
  const value = typeof data?.get === 'function' ? data.get(VIE_TURN_KIND) : null;
  return Array.isArray(value?.items) && value.items.length > 0 ? value : null;
}

/** An in-memory bridge between the streaming tool card and final turn tail.
 * Durable scene definitions come from the DSH session tool/result event,
 * not from this cache. Interactive parameter edits survive a view handoff,
 * but without an approved DSH write API they do NOT survive a page reload.
 */
function createVIEBridge(SceneStore, capacity=96) {
  const stores=new Map(), shown=new Set(), watchers=new Set(),persistence=new Map();
  let storage;try{storage=window.localStorage;}catch{}
  const checkpoints=createCheckpointRepository(storage);
  if(typeof window.addEventListener==='function')window.addEventListener('pagehide',()=>{for(const item of persistence.values())item.flush();});
  const sceneKey = (sessionId,callId) => JSON.stringify([String(sessionId??''),String(callId??'')]);
  const notify = () => {for(const callback of watchers)callback();};
  return {
    sceneKey,
    getStore(key,source='') {
      if(stores.has(key)) {
        const existing=stores.get(key);
        stores.delete(key);stores.set(key,existing);
        return existing;
      }
      const store=new SceneStore(source);
      const saved=checkpoints.load(key,source);if(saved)try{store.restore(saved);}catch{checkpoints.clear(key);}
      let timer;const persist=()=>{try{checkpoints.save(key,store.checkpoint());}catch{}};
      const unsubscribe=store.subscribe(()=>{clearTimeout(timer);timer=setTimeout(persist,250);});
      persistence.set(key,{flush:persist,dispose(){clearTimeout(timer);persist();unsubscribe();}});
      stores.set(key,store);
      // The held instance remains owned by its mounted views even if evicted.
      while(stores.size>capacity){const oldest=stores.keys().next().value;persistence.get(oldest)?.dispose();persistence.delete(oldest);stores.delete(oldest);}
      return store;
    },
    show(key) {
      if(shown.has(key))return;
      shown.add(key);notify();
    },
    hide(key) {
      if(!shown.delete(key))return;
      notify();
    },
    isShown(key){return shown.has(key);},
    subscribe(cb){watchers.add(cb);return()=>watchers.delete(cb);},
    stats(){return {cached:stores.size,visible:shown.size};},
  };
}

/** Incremental decoder for tool arguments emitted as a cumulative JSON string.
 * It reads each appended character once and decodes selected top-level JSON
 * string properties without executing model-provided code. Works on incomplete
 * JSON and arbitrary stream boundaries, including within escapes / Unicode.
 * All output is untrusted and must still pass VIE's regular validators.
 */
class IncrementalToolArguments {
  constructor({fields=['source','preset'],maxRaw=1048576,maxValue=262144}={}){
    this.fields=new Set(fields);
    this.maxRaw=maxRaw;
    this.maxValue=maxValue;
    this.reset();
  }
  reset(){
    this.raw='';this.scannedChars=0;this.depth=0;this.inString=false;
    this.mode='start';this.stringRole=null;this.key='';this.currentField=null;
    this.escaped=false;this.unicode='';this.pending='';
    this.values=Object.create(null);this.complete=false;this.invalid=false;this.objectField=null;this.objectStart=0;
  }
  update(raw){
    if(typeof raw!=='string')return this.values;
    if(raw.length>this.maxRaw){this.invalid=true;return this.values;}
    if(!raw.startsWith(this.raw))this.reset();
    const chunk=raw.slice(this.raw.length);
    this.raw=raw;
    if(this.invalid)return this.values;
    for(let i=0;i<chunk.length;i++){
      const c=chunk[i];this.scannedChars++;
      if(this.inString){
        if(this.unicode!==''){
          if(!/^[0-9a-fA-F]$/.test(c)){this.invalid=true;break;}
          this.unicode+=c;
          if(this.unicode.length===5){this.capture(String.fromCharCode(parseInt(this.unicode.slice(1),16)));this.unicode='';}
        }else if(this.escaped){
          this.escaped=false;
          const escaped={n:'\n',t:'\t',r:'\r',b:'\b',f:'\f','"':'"','\\':'\\','/':'/'};
          if(c==='u')this.unicode='u';
          else if(Object.hasOwn(escaped,c))this.capture(escaped[c]);
          else {this.invalid=true;break;}
        }else if(c==='\\')this.escaped=true;
        else if(c==='"'){
          this.flush();this.inString=false;
          if(this.depth===1&&this.stringRole==='key')this.mode='colon';
          else if(this.depth===1&&this.stringRole==='value')this.mode='comma';
          this.stringRole=null;this.currentField=null;
        }else this.capture(c);
        continue;
      }
      if(c==='"'){
        this.inString=true;this.escaped=false;this.unicode='';
        this.stringRole=this.depth===1&&this.mode==='key'?'key':this.depth===1&&this.mode==='value'?'value':'ignore';
        this.currentField=this.stringRole==='value'&&this.fields.has(this.key)?this.key:null;
        if(this.stringRole==='key')this.key='';
        continue;
      }
      if(c==='{'||c==='['){if(this.depth===1&&this.mode==='value'&&this.fields.has(this.key)){this.objectField=this.key;this.objectStart=this.scannedChars-1;}this.depth++;if(this.depth===1)this.mode='key';continue;}
      if(c==='}'||c===']'){
        this.depth--;
        if(this.depth<0){this.invalid=true;break;}
        if(this.depth===0){this.complete=true;this.mode='done';}
        else if(this.depth===1&&this.mode==='value'){if(this.objectField){this.values[this.objectField]=raw.slice(this.objectStart,this.scannedChars);this.objectField=null;}this.mode='comma';}
        continue;
      }
      if(this.depth!==1)continue;
      if(c===':'&&this.mode==='colon'){this.mode='value';continue;}
      if(c===','&&this.mode==='comma'){this.mode='key';this.key='';continue;}
      // Numeric/boolean/null values are not captured, but must allow a following comma.
      if(this.mode==='value'&&!/\s/.test(c))this.mode='comma';
    }
    this.flush();
    if(this.objectField)this.values[this.objectField]=raw.slice(this.objectStart);
    return this.values;
  }
  capture(char){
    if(this.stringRole==='key'){if(this.key.length<128)this.key+=char;return;}
    if(this.currentField){
      if((this.values[this.currentField]?.length??0)+this.pending.length+char.length>this.maxValue){this.invalid=true;return;}
      this.pending+=char;
    }
  }
  flush(){
    if(this.currentField&&this.pending){this.values[this.currentField]=(this.values[this.currentField]??'')+this.pending;this.pending='';}
  }
  /** Only parses fully closed, valid argument objects; never evaluates code. */
  completedObject(){
    if(!this.complete||this.invalid||this.inString||this.depth!==0)return null;
    try{
      const parsed=JSON.parse(this.raw);
      if(!parsed||Array.isArray(parsed)||typeof parsed!=='object')return null;
      return parsed;
    }catch{return null;}
  }
}


/** Framework-owned SVG geometry and focused experiment controllers. */
const sceneEscape = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sceneSigned = value => Math.abs(value)<1e-10?'0.00':(value>0?'+':'')+value.toFixed(2);
const sceneDegrees = radians => (radians*180/Math.PI)%360;
const gearGeometryCache = new Map();
let experimentInstanceSequence=0;
/** Involute flanks with simplified root transitions. This is a teaching glyph,
 * not a manufactured tooth profile or a complete interference calculation. */
function gearPath(teeth, module=1, internal=false) {
  const key=[teeth,module,internal].join(':');
  if(gearGeometryCache.has(key))return gearGeometryCache.get(key);
  const r=module*teeth/2,base=r*Math.cos(Math.PI/9),tip=r+(internal?-1:1)*module,root=r+(internal?1.25:-1.25)*module;
  const inv=angle=>Math.tan(angle)-angle,atPitch=inv(Math.PI/9),half=Math.PI/(2*teeth);
  const flank=radius=>{const angle=Math.acos(Math.min(1,base/Math.max(base,radius)));return internal?half-atPitch+inv(angle):half+atPitch-inv(angle);};
  const point=(radius,angle)=>`${(radius*Math.cos(angle)).toFixed(5)} ${(radius*Math.sin(angle)).toFixed(5)}`;
  const parts=[];const n=5;
  for(let tooth=0;tooth<teeth;tooth++){
    const center=2*Math.PI*tooth/teeth;
    if(internal){
      const outer=flank(root);parts.push((tooth?'L':'M')+point(root,center-outer));
      for(let j=0;j<=n;j++){const radius=root+(tip-root)*j/n;parts.push('L'+point(radius,center-flank(radius)));}
      parts.push(`A${tip} ${tip} 0 0 1 ${point(tip,center+flank(tip))}`);
      for(let j=n;j>=0;j--){const radius=root+(tip-root)*j/n;parts.push('L'+point(radius,center+flank(radius)));}
      const end=2*Math.PI*(tooth+1)/teeth-outer;parts.push(`A${root} ${root} 0 0 1 ${point(root,end)}`);
    }else{
      const low=Math.max(root,base),outer=flank(low);parts.push((tooth?'L':'M')+point(root,center-outer));
      for(let j=0;j<=n;j++){const radius=low+(tip-low)*j/n;parts.push('L'+point(radius,center-flank(radius)));}
      parts.push(`A${tip} ${tip} 0 0 1 ${point(tip,center+flank(tip))}`);
      for(let j=n;j>=0;j--){const radius=low+(tip-low)*j/n;parts.push('L'+point(radius,center+flank(radius)));}
      parts.push('L'+point(root,center+outer));
      const end=2*Math.PI*(tooth+1)/teeth-outer;parts.push(`A${root} ${root} 0 0 1 ${point(root,end)}`);
    }
  }
  parts.push('Z');
  let data=parts.join(' ');
  if(internal){const outer=r+3.5*module;data=`M${outer} 0 A${outer} ${outer} 0 1 1 ${-outer} 0 A${outer} ${outer} 0 1 1 ${outer} 0 Z `+data;}
  gearGeometryCache.set(key,data);if(gearGeometryCache.size>48)gearGeometryCache.delete(gearGeometryCache.keys().next().value);
  return data;
}
function gearGlyph(teeth,module,tone,internal=false,marker=true){
  const r=teeth*module/2;
  return `<path d="${gearPath(teeth,module,internal)}" fill="${tone}" fill-opacity="${internal?'.07':'.20'}" stroke="${tone}" stroke-width="${module*.42}" stroke-linejoin="round" fill-rule="evenodd"/>${marker&&!internal?`<line x1="0" y1="0" x2="${r*.72}" y2="0" stroke="${tone}" stroke-width="${module*1.2}" stroke-linecap="round"/>`:''}`;
}
function planetaryMarkup(p){
  const m=p.module,rs=p.sunTeeth*m/2,rp=p.planetTeeth*m/2,rr=p.ringTeeth*m/2,a=rs+rp,scale=162/(rr+3.5*m);
  const positions=Array.from({length:p.planetCount},(_,i)=>{const angle=-Math.PI/2+2*Math.PI*i/p.planetCount;return {x:a*Math.cos(angle),y:a*Math.sin(angle)};});
  return `<svg viewBox="0 0 520 370" role="img" aria-label="太阳轮、${p.planetCount}个行星轮、内齿圈和行星架的理想运动示意"><g transform="translate(260 184) scale(${scale})">
    <g data-scene-shaft="ring">${gearGlyph(p.ringTeeth,m,'var(--scene-ring)',true,false)}${[0,1,2,3,4,5].map(i=>{const angle=i*Math.PI/3;return `<circle cx="${(rr+2.2*m)*Math.cos(angle)}" cy="${(rr+2.2*m)*Math.sin(angle)}" r="${m*.45}" fill="var(--scene-ring)"/>`;}).join('')}</g>
    <g data-scene-shaft="carrier">${positions.map(({x,y})=>`<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="var(--scene-carrier)" stroke-opacity=".55" stroke-width="${2*m}" stroke-linecap="round"/>`).join('')}${positions.map(({x,y},i)=>`<g transform="translate(${x} ${y})"><g data-scene-planet="${i}">${gearGlyph(p.planetTeeth,m,'var(--scene-planet)')}</g><circle r="${2*m}" fill="var(--vie-bg)" stroke="var(--scene-planet)" stroke-width="${m*.55}"/></g>`).join('')}</g>
    <g data-scene-shaft="sun">${gearGlyph(p.sunTeeth,m,'var(--scene-sun)')}${[1,2,3].map(i=>`<line transform="rotate(${90*i})" x1="0" y1="0" x2="${rs*.72}" y2="0" stroke="var(--scene-sun)" stroke-width="${1.2*m}" stroke-linecap="round"/>`).join('')}</g>
    <circle r="${2.8*m}" fill="var(--scene-sun)" stroke="#9b6410" stroke-width="${m*.45}"/><circle r="${m*.7}" fill="#7b4b0b"/>
  </g></svg>`;
}
function gearsMarkup(p){
  const m=p.module,r1=p.driverTeeth*m/2,r2=p.drivenTeeth*m/2;
  const internal=p.mesh==='internal';
  const scale=internal?155/(r2+3.5*m):Math.min(430/(2*(r1+r2)+8*m),135/(Math.max(r1,r2)+m));
  const x1=internal?260+(r2-r1)*scale:260-r2*scale,x2=internal?260:260+r1*scale;
  const circle=(x,shaft,z,tone,inside)=>`<g transform="translate(${x} 176) scale(${scale})"><g data-scene-shaft="${shaft}">${gearGlyph(z,m,tone,inside)}</g>${inside?'':`<circle r="${m*2}" fill="var(--vie-bg)" stroke="${tone}" stroke-width="${m*.6}"/>`}</g>`;
  return `<svg viewBox="0 0 520 370" role="img" aria-label="${internal?'内':'外'}啮合齿轮传动示意">${internal?circle(x2,'driven',p.drivenTeeth,'var(--scene-ring)',true):''}${circle(x1,'driver',p.driverTeeth,'var(--scene-sun)',false)}${internal?'':circle(x2,'driven',p.drivenTeeth,'var(--scene-ring)',false)}<text x="${x1}" y="350" text-anchor="middle" class="vie-scene-svg-label">主动轮 ${p.driverTeeth} 齿</text><text x="${internal?160:x2}" y="350" text-anchor="middle" class="vie-scene-svg-label">从动${internal?'齿圈':'轮'} ${p.drivenTeeth} 齿</text></svg>`;
}
/** Geometry and local interactions share the semantic transmission models. */
const trainTone=(i,count)=>i===0?'var(--scene-sun)':i===count-1?'var(--scene-ring)':'var(--scene-planet)';
const trainName=(i,count)=>i===0?'主动轮':i===count-1?'从动轮':'惰轮 '+i;
function gearTrainMarkup(p) {
  const m=gearTrainModel(p),scale=Math.min(560/(m.width+4*p.module),112/(Math.max(...m.radii)+p.module));
  const offset=(620-m.width*scale)/2,y=148;
  const wheels=p.teeth.map((z,i)=>{
    const x=offset+m.centers[i]*scale,tone=trainTone(i,p.teeth.length),r=m.radii[i]*scale;
    return `<g transform="translate(${x} ${y})"><circle r="${r}" fill="none" stroke="${tone}" stroke-opacity=".28" stroke-dasharray="3 5"/><g transform="scale(${scale})"><g data-train-gear="${i}">${gearGlyph(z,p.module,tone)}</g><circle r="${2*p.module}" fill="var(--vie-bg)" stroke="${tone}" stroke-width="${.6*p.module}"/></g></g>`;
  }).join('');
  return `<svg viewBox="0 0 620 300" role="img" aria-label="${p.teeth.length}个外啮合定轴齿轮，齿数依次为${p.teeth.join('、')}。彩色轮廓为教学齿形，虚线为节圆。"><path d="M24 ${y}H596" stroke="var(--vie-stroke)" stroke-dasharray="4 7"/>${wheels}</svg>`;
}
function wormMarkup(p,scope) {
  return `<svg viewBox="0 0 560 350" role="img" aria-label="蜗杆沿水平轴旋转，驱动轴线垂直画面的蜗轮；交错轴和螺纹为结构示意">
  <defs><linearGradient id="${scope}-worm" x2="0" y2="1"><stop stop-color="var(--scene-sun)" stop-opacity=".15"/><stop offset=".45" stop-color="var(--scene-sun)" stop-opacity=".4"/><stop offset="1" stop-color="var(--scene-sun)" stop-opacity=".12"/></linearGradient><clipPath id="${scope}-thread"><rect x="137" y="60" width="286" height="66" rx="30"/></clipPath></defs>
  <path d="M65 93H495" stroke="var(--scene-sun)" stroke-width="3" stroke-dasharray="6 5"/>
  <path d="M280 145V334" stroke="var(--scene-ring)" stroke-opacity=".35" stroke-dasharray="4 6"/>
  <g transform="translate(280 211) scale(${86/(p.wheelTeeth/2+1)})"><g data-worm-wheel>${gearGlyph(p.wheelTeeth,1,'var(--scene-ring)')}</g><circle r="${p.wheelTeeth*.065}" fill="var(--vie-bg)" stroke="var(--scene-ring)" stroke-width=".6"/><circle r=".9" fill="var(--scene-ring)"/></g>
  <rect x="104" y="82" width="352" height="22" rx="10" fill="var(--scene-sun)" fill-opacity=".16" stroke="var(--scene-sun)"/>
  <rect x="137" y="60" width="286" height="66" rx="30" fill="url(#${scope}-worm)" stroke="var(--scene-sun)" stroke-width="2"/>
  <g clip-path="url(#${scope}-thread)"><path data-worm-thread fill="none" stroke="var(--scene-sun)" stroke-width="4" stroke-linecap="round"/></g>
  <path d="M117 67V119 M443 67V119" stroke="var(--vie-muted)" stroke-width="3"/>
  </svg>`;
}
function wormThreadPath(phase,starts) {
  const lines=[];
  // Projected helical bands communicate axial rotation; not a conjugate tooth surface.
  for(let band=-8;band<17;band++){
    const points=[];
    for(let j=0;j<=24;j++){
      const a=-Math.PI/2+Math.PI*j/24;
      const x=150+band*46+(a+phase*starts)*46/(2*Math.PI);
      points.push(`${j?'L':'M'}${x.toFixed(2)} ${(93+30*Math.sin(a)).toFixed(2)}`);
    }
    lines.push(points.join(' '));
  }
  return lines.join(' ');
}

function waveMarkup(){
  return `<svg viewBox="0 0 520 300" role="img" aria-label="两列同频正弦波与叠加结果"><path d="M30 30V265H498 M30 150H498" fill="none" stroke="var(--vie-stroke)"/>${[60,105,195,240].map(y=>`<path d="M30 ${y}H498" stroke="var(--vie-stroke)" stroke-dasharray="3 5"/>`).join('')}<path data-wave="first" fill="none" stroke="var(--scene-ring)" stroke-width="1.8" opacity=".7"/><path data-wave="second" fill="none" stroke="var(--scene-planet)" stroke-width="1.8" opacity=".7"/><path data-wave="sum" fill="none" stroke="var(--scene-sun)" stroke-width="3"/><text x="18" y="34" text-anchor="end" class="vie-axis-label">+4</text><text x="18" y="154" text-anchor="end" class="vie-axis-label">0</text><text x="18" y="269" text-anchor="end" class="vie-axis-label">−4</text><text x="497" y="286" text-anchor="end" class="vie-axis-label">位置 x →（相对单位）</text></svg>`;
}
function sceneSlider(key,label,value,min,max,step,unit=''){
  return `<label class="vie-scene-control"><span>${sceneEscape(label)}<output data-scene-output="${key}">${sceneEscape(value+unit)}</output></span><input type="range" data-scene-input="${key}" aria-label="${sceneEscape(label)}" min="${min}" max="${max}" step="${step}" value="${value}"/></label>`;
}
/** Shared shell, actions, simulation clock and snapshot lifecycle. */
function mountInteractiveScene(root,rawSpec,options={}){
  const spec=validateExperimentSpec(rawSpec),kind=spec.template,catalog=EXPERIMENT_CATALOG[kind],p=spec.parameters;
  const win=root.ownerDocument.defaultView;
  let state=validateExperimentSnapshot(spec,{v:1,template:kind});
  if(options.initialState)try{state=validateExperimentSnapshot(spec,options.initialState);}catch{/* schema changes discard invalid saved inputs */}
  let running=false,raf=0,last=0,disposed=false,vector=null,lastReadout=0;
  const svgScope='vie-experiment-svg-'+(++svgScopeSequence);
  const el=selector=>root.querySelector(selector);
  const snapshot=()=>validateExperimentSnapshot(spec,{...state,inputs:{...state.inputs},history:[...state.history]});
  const notify=()=>options.onChange?.(snapshot());
  const effective=()=>effectiveExperimentParameters(spec,state.inputs);
  const caseNames={'ring-fixed':'固定齿圈','sun-fixed':'固定太阳轮','carrier-fixed':'固定行星架'};
  const caseTabs=kind==='planetary'?`<div class="vie-case-tabs" role="tablist" aria-label="选择固定工况">${EXPERIMENT_CASES.map((id,i)=>`<button type="button" role="tab" aria-selected="${state.case===id}" data-scene-case="${id}">${i+1} ${caseNames[id]}</button>`).join('')}</div>`:'';
  const editableTransmission=kind==='geartrain'||kind==='worm';
  const controls=editableTransmission?'<details class="vie-scene-parameters" open><summary>调整齿数与输入转速</summary><div class="vie-scene-controls" data-scene-controls></div></details>':'<div class="vie-scene-controls" data-scene-controls></div>';
  root.innerHTML=`<section class="vie-experiment" data-scene-template="${kind}">${caseTabs}<div class="vie-scene-panel"><header class="vie-scene-heading"><div><h3 data-scene-title></h3><p class="vie-scene-subtitle" data-scene-subtitle></p></div><span class="vie-scene-status" data-scene-status></span></header><div class="vie-scene-stage" data-scene-stage></div><p class="vie-scene-note" data-scene-note></p><div class="vie-scene-legend" data-scene-legend></div></div><div class="vie-scene-toolbar">${catalog.timed?'<button type="button" class="vie-scene-button is-primary" data-scene-action="play" aria-label="播放动画">▶ 播放</button>':''}${kind!=='vector'?`<button type="button" class="vie-scene-button" data-scene-action="step">${kind==='process'?'下一步':kind==='wave'?'单步 +0.1 s':'单步 +15°'}</button>`:''}<button type="button" class="vie-scene-button" data-scene-action="reset">复位</button>${catalog.timed&&kind!=='wave'?'<button type="button" class="vie-scene-button" data-scene-action="reverse" aria-label="反转输入方向">反转</button>':''}${catalog.timed?'<label class="vie-scene-speed"><span>播放速率</span><input type="range" min="0.1" max="2" step="0.1" value="1" aria-label="播放速率" data-scene-input="rate"><output data-scene-rate>1.0×</output></label>':'<span class="vie-scene-progress" data-scene-progress></span>'}</div><div class="vie-scene-readouts" data-scene-readouts></div><div class="vie-process-choices" data-scene-choices></div><p class="vie-scene-insight" data-scene-insight aria-live="polite"></p>${controls}<details class="vie-scene-details"><summary>关系、参数与适用范围</summary><p data-scene-equation></p><p data-scene-scope></p></details></section>`;
  const stage=el('[data-scene-stage]');
  if(kind==='planetary'){
    const id='vie-planetary-'+(++experimentInstanceSequence),panel=el('.vie-scene-panel');panel.id=id+'-panel';panel.setAttribute('role','tabpanel');
    root.querySelectorAll('[data-scene-case]').forEach(button=>{button.id=id+'-'+button.dataset.sceneCase;button.setAttribute('aria-controls',panel.id);});
  }
  const readouts=items=>{el('[data-scene-readouts]').innerHTML=items.map(([name,value,role,color])=>`<div class="vie-scene-readout" style="--readout-color:${color||'var(--vie-ink)'}"><small>${sceneEscape(name)}</small><strong>${sceneEscape(value)}</strong><span>${sceneEscape(role)}</span></div>`).join('');};
  const legend=items=>{el('[data-scene-legend]').innerHTML=items.map(([name,color])=>`<span><i class="vie-scene-dot" style="color:${color}"></i>${sceneEscape(name)}</span>`).join('');};
  const pause=()=>{running=false;last=0;win.cancelAnimationFrame(raf);const button=el('[data-scene-action="play"]');if(button){button.textContent='▶ 播放';button.setAttribute('aria-label','播放动画');}};
  function draw(){
    if(kind==='geartrain'){
      const frame=gearTrainModel(effective(),state.phase);
      frame.angles.forEach((angle,i)=>el(`[data-train-gear="${i}"]`).setAttribute('transform',`rotate(${sceneDegrees(angle)})`));return;
    }
    if(kind==='worm'){
      const parameters=effective(),frame=wormModel(parameters,state.phase);
      el('[data-worm-wheel]').setAttribute('transform',`rotate(${sceneDegrees(frame.wheelAngle)})`);
      el('[data-worm-thread]').setAttribute('d',wormThreadPath(state.phase%(2*Math.PI),parameters.starts));return;
    }
    if(kind==='planetary'){
      const frame=planetaryPhases(p,state.phase,state.case);
      for(const shaft of ['sun','ring','carrier'])el(`[data-scene-shaft="${shaft}"]`).setAttribute('transform',`rotate(${sceneDegrees(frame[shaft])})`);
      frame.planets.forEach((planet,i)=>el(`[data-scene-planet="${i}"]`).setAttribute('transform',`rotate(${sceneDegrees(planet.relative)})`));
    }else if(kind==='gears'){
      const ratio=(p.mesh==='internal'?1:-1)*p.driverTeeth/p.drivenTeeth;
      el('[data-scene-shaft="driver"]').setAttribute('transform',`rotate(${sceneDegrees(state.phase)})`);
      const initial=p.mesh==='internal'?-Math.PI/p.drivenTeeth:Math.PI-Math.PI/p.drivenTeeth;
      el('[data-scene-shaft="driven"]').setAttribute('transform',`rotate(${sceneDegrees(initial+state.phase*ratio)})`);
    }else if(kind==='wave'){
      const paths={first:[],second:[],sum:[]},parameters=effective();
      for(let i=0;i<=180;i++){const x=2*Math.PI*i/180,values=waveSample(parameters,x,state.phase);for(const key of Object.keys(paths))paths[key].push(`${i?'L':'M'}${(30+468*i/180).toFixed(2)} ${(150-values[key]*28).toFixed(2)}`);}
      for(const key of Object.keys(paths))el(`[data-wave="${key}"]`).setAttribute('d',paths[key].join(' '));
    }
  }
  function renderProcess(){
    const node=p.nodes[state.index],outgoing=p.edges.filter(edge=>edge.from===node.id);
    const markup=makeVisualMarkup('Flow',{title:p.title,nodes:p.nodes.map((item,i)=>({...item,role:i===state.index?'step':'default'})),edges:p.edges},node.id);
    stage.innerHTML=scopeSvgMarkup(markup,svgScope);
    // These nodes show the declared route; only step/branch controls advance it.
    stage.querySelectorAll('[data-vie-item]').forEach(item=>{if(item.tagName.toLowerCase()==='button'){item.remove();return;}item.removeAttribute('tabindex');item.setAttribute('role','group');item.style.cursor='default';});
    el('[data-scene-choices]').innerHTML=outgoing.length>1?outgoing.map((edge,i)=>`<button type="button" class="vie-scene-button" data-scene-branch="${i}">${sceneEscape(edge.label)} → ${sceneEscape(p.nodes.find(n=>n.id===edge.to).label)}</button>`).join(''):'';
    el('[data-scene-action="step"]').disabled=outgoing.length!==1;
    el('[data-scene-insight]').textContent=node.detail||'沿有标签的分支推进，观察当前步骤。';
    el('[data-scene-progress]').textContent='已推进 '+Math.max(0,state.history.length-1)+' 步';
    readouts([['当前节点',String(state.index+1),'节点编号'],['可选分支',String(outgoing.length),outgoing.length?'等待选择或下一步':'当前路径结束'],['访问记录',String(state.history.length),'最多保留 64 项']]);
  }
  function refresh(){
    const parameters=effective();
    el('[data-scene-title]').textContent=spec.title;
    if(kind==='planetary'){
      const rates=planetaryRates(p,state.case,p.inputSpeed*state.direction);
      const fixed=state.case==='ring-fixed'?'ring':state.case==='sun-fixed'?'sun':'carrier';
      const input=state.case==='sun-fixed'?'ring':'sun',output=state.case==='carrier-fixed'?'ring':'carrier';
      const names={sun:'太阳轮',ring:'齿圈',carrier:'行星架'};
      el('[data-scene-title]').textContent=caseNames[state.case]+' · '+names[input]+'输入';
      el('[data-scene-subtitle]').textContent='观察轮心的公转和轮体的自转；切换固定构件比较输出。';
      el('[data-scene-status]').textContent=names[fixed]+'固定';
      el('[data-scene-note]').textContent='教学齿廓 · 基本装配条件与理想速比已计算';
      el('[data-scene-insight]').textContent=`${names[fixed]}保持不动，${names[input]}驱动${names[output]}。行星轮绝对自转为 ${sceneSigned(rates.planet)}，相对行星架为 ${sceneSigned(rates.planetRelative)}；两者参考系不同。`;
      readouts(['sun','ring','carrier'].map(shaft=>[`${names[shaft]} ω${shaft==='sun'?'S':shaft==='ring'?'R':'H'}`,sceneSigned(rates[shaft]),(shaft===fixed?'固定':shaft===input?'输入':'输出')+' · rad/s',`var(--scene-${shaft})`]));
      el('[data-scene-equation]').textContent=`ZS(ωS−ωH)+ZR(ωR−ωH)=0。太阳轮 ${p.sunTeeth} 齿，行星轮 ${p.planetTeeth} 齿，齿圈 ${p.ringTeeth} 齿，共 ${p.planetCount} 个行星轮。模数 ${p.module} mm；输入为 ${p.inputSpeed*state.direction} rad/s 的演示设定。`;
      el('[data-scene-scope]').textContent='已检查齿数关系、等角度装配、相邻间距与理想运动关系。齿廓根部为教学近似；未进行完整齿廓干涉、强度、齿隙、摩擦或载荷分析。';
      root.querySelectorAll('[data-scene-case]').forEach(button=>{const selected=button.dataset.sceneCase===state.case;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;if(selected)el('.vie-scene-panel').setAttribute('aria-labelledby',button.id);});
    }else if(kind==='gears'){
      const ratio=(p.mesh==='internal'?1:-1)*p.driverTeeth/p.drivenTeeth,drive=p.inputSpeed*state.direction;
      el('[data-scene-subtitle]').textContent=p.mesh==='internal'?'内啮合：两轮同向转动。':'外啮合：两轮反向转动。';
      el('[data-scene-status]').textContent=p.mesh==='internal'?'内啮合':'外啮合';
      el('[data-scene-note]').textContent='节圆位置与理想传动比计算；齿廓为教学近似';
      readouts([['主动轮 ω1',sceneSigned(drive),'输入','var(--scene-sun)'],['从动轮 ω2',sceneSigned(drive*ratio),'输出','var(--scene-ring)'],['ω2 / ω1',sceneSigned(ratio),'理想速比','var(--scene-carrier)']]);
      el('[data-scene-insight]').textContent=`${p.driverTeeth} 齿驱动 ${p.drivenTeeth} 齿，输出转速为输入的 ${Math.abs(ratio).toFixed(3)} 倍，方向${ratio<0?'相反':'相同'}。单步只推进输入轴，其余角度由同一关系计算。`;
      el('[data-scene-equation]').textContent=`ω2 / ω1 = ${p.mesh==='internal'?'':'−'}Z1 / Z2。输入 ${drive} rad/s，为演示设定。`;
      el('[data-scene-scope]').textContent='支持同模数平面直齿轮的理想运动教学；根部轮廓简化，未校核真实接触、制造公差或载荷。';
    }else if(kind==='geartrain'){
      const frame=gearTrainModel(parameters,state.phase,parameters.inputSpeed*state.direction),count=parameters.teeth.length;
      el('[data-scene-subtitle]').textContent='所有轮轴固定；从左到右观察每次外啮合如何改变方向。';
      el('[data-scene-status]').textContent=count+'轮 · 平面外啮合';
      el('[data-scene-note]').textContent='教学齿形 · 虚线为节圆 · 输入与输出使用同一运动模型';
      readouts(parameters.teeth.map((z,i)=>[`${trainName(i,count)} · ${z}齿`,sceneSigned(frame.speeds[i]),'ω'+(i+1)+' · rad/s',trainTone(i,count)]));
      el('[data-scene-readouts]').style.gridTemplateColumns=`repeat(${count===2?2:3},minmax(0,1fr))`;
      el('[data-scene-insight]').textContent=`${count-1} 次外啮合，首尾${frame.outputRatio>0?'同向':'反向'}。ω${count}/ω1 = ${sceneSigned(frame.outputRatio)}；传动比 i1${count} = ${sceneSigned(frame.transmissionRatio)}。${count>2?'改变中间惰轮齿数，只改变中间轮转速与中心距，首尾速比不变。':'输出齿数越多，相对输入转得越慢。'}`;
      el('[data-scene-equation]').textContent=`相邻轮满足 Zj·ωj + Zj+1·ωj+1 = 0；ω${count}/ω1 = (−1)^${count-1} × ${parameters.teeth[0]}/${parameters.teeth.at(-1)}。同模数 ${parameters.module} mm。`;
      el('[data-scene-scope]').textContent='2–6 个平行固定轴、相邻外啮合的直齿轮；不包含同轴复合级或闭环。渐开线侧面与根部过渡用于教学，未校核完整干涉、强度、齿隙或制造公差。';
      parameters.teeth.forEach((z,i)=>{el(`[data-scene-output="teeth${i}"]`).textContent=z+'齿';});
      el('[data-scene-output="inputSpeed"]').textContent=sceneSigned(parameters.inputSpeed)+' rad/s';
    }else if(kind==='worm'){
      const frame=wormModel(parameters,state.phase,parameters.inputSpeed*state.direction);
      el('[data-scene-subtitle]').textContent='蜗杆每转一圈，蜗轮前进与头数相同的齿数。';
      el('[data-scene-status]').textContent='交错轴 · 结构示意';
      el('[data-scene-note]').textContent='螺旋与轮齿为结构示意；转速大小由头数和齿数计算';
      readouts([['蜗杆输入',sceneSigned(frame.input),'rad/s','var(--scene-sun)'],['蜗轮速率',frame.outputMagnitude.toFixed(3),'rad/s · 大小','var(--scene-ring)'],['减速比 i',frame.transmissionRatio.toFixed(2),'蜗轮齿数 / 蜗杆头数','var(--scene-carrier)']]);
      el('[data-scene-insight]').textContent=`${parameters.starts} 头蜗杆驱动 ${parameters.wheelTeeth} 齿蜗轮。输入转一圈，蜗轮前进 ${parameters.starts} 齿、转过 ${(360*frame.speedRatio).toFixed(1)}°。反转输入，图示输出也反转。`;
      el('[data-scene-equation]').textContent='|ω蜗轮 / ω蜗杆| = 头数 / 蜗轮齿数。图示轮齿不用于验证真实空间接触；轴向正方向与观察方向会影响转速符号。';
      el('[data-scene-scope]').textContent='只计算理想转速大小；螺纹与蜗轮是帮助辨认交错轴的投影图形，不是共轭蜗轮齿面。不能从该图判断自锁、效率、受力或制造参数。';
      for(const [key,unit] of [['starts','头'],['wheelTeeth','齿'],['inputSpeed',' rad/s']])el(`[data-scene-output="${key}"]`).textContent=parameters[key]+unit;
    }else if(kind==='wave'){
      const result=waveSample(parameters,0,state.phase);
      el('[data-scene-subtitle]').textContent='改变相位与振幅，观察两列同频波如何叠加。';
      el('[data-scene-status]').textContent='线性叠加';
      el('[data-scene-note]').textContent='蓝色波 A + 青色波 B = 橙色合成波；振幅为相对单位';
      readouts([['相位差',parameters.phaseDegrees.toFixed(0)+'°','波 B 相对波 A','var(--scene-carrier)'],['合成振幅',result.envelope.toFixed(2),'由叠加公式计算','var(--scene-sun)'],['频率',parameters.frequencyHz.toFixed(1)+' Hz','演示参数','var(--scene-ring)']]);
      el('[data-scene-insight]').textContent=result.envelope<1e-6?'两列等幅波反相，当前模型中的合成波完全相消。':`合成振幅为 ${result.envelope.toFixed(2)}。相位差改变峰谷的相对位置，振幅由两列波共同决定。`;
      el('[data-scene-equation]').textContent='yA=A sin(kx−2πft)，yB=B sin(kx−2πft+φ)，y=yA+yB。';
      el('[data-scene-scope]').textContent='同波数、同频率的理想线性正弦波演示，不包含介质损耗、边界反射或真实测量。';
      for(const key of ['amplitudeA','amplitudeB','phaseDegrees','frequencyHz']){const output=el(`[data-scene-output="${key}"]`);if(output)output.textContent=parameters[key].toFixed(key==='phaseDegrees'?0:2)+(key==='phaseDegrees'?'°':key==='frequencyHz'?' Hz':'');}
    }else if(kind==='process'){
      el('[data-scene-subtitle]').textContent='一次只走一步；有分支时明确选择条件。';
      el('[data-scene-status]').textContent='离散步骤';el('[data-scene-note]').textContent='路径由输入的事实与分支定义，未自动验证业务规则。';
      el('[data-scene-equation]').textContent='下一步只沿当前节点的已声明边推进；分支条件由用户判断。';
      el('[data-scene-scope]').textContent='这是流程解释工具，不会自动执行外部命令或判断真实业务条件。';renderProcess();
    }else{
      const angle=parameters.angle*Math.PI/180,x=parameters.magnitude*Math.cos(angle),y=parameters.magnitude*Math.sin(angle);
      el('[data-scene-subtitle]').textContent='拖动端点或调整长度与角度，观察两个分量。';
      el('[data-scene-status]').textContent='几何关系';el('[data-scene-note]').textContent='坐标轴使用相同缩放；长度为相对单位';
      readouts([['水平分量 x',sceneSigned(x),'r cos θ','var(--scene-planet)'],['竖直分量 y',sceneSigned(y),'r sin θ','var(--scene-sun)'],['向量长度',parameters.magnitude.toFixed(2),'相对单位','var(--scene-ring)']]);
      el('[data-scene-insight]').textContent=`角度 ${parameters.angle}°，长度 ${parameters.magnitude.toFixed(1)}，水平分量 ${sceneSigned(x)}，竖直分量 ${sceneSigned(y)}。`;
      el('[data-scene-equation]').textContent='x=r cos θ，y=r sin θ；x²+y²=r²。';el('[data-scene-scope]').textContent='二维直角坐标的几何关系；数值为教学设定。';
    }
    if(catalog.timed){el('[data-scene-rate]').textContent=state.rate.toFixed(1)+'×';el('[data-scene-input="rate"]').value=String(state.rate);}
    draw();
  }
  function mountVector(){
    vector?.dispose();stage.innerHTML='<div class="vie-scene-vector" style="width:100%"></div>';
    vector=mountVectorLab(stage.firstElementChild,{initialState:effective(),onChange:value=>{state.inputs={magnitude:value.magnitude,angle:value.angle};refresh();notify();}});
  }
  if(kind==='planetary'){stage.innerHTML=planetaryMarkup(p);legend([['太阳轮 S','var(--scene-sun)'],['行星轮 P','var(--scene-planet)'],['齿圈 R','var(--scene-ring)'],['行星架 H','var(--scene-carrier)']]);}
  else if(kind==='gears'){stage.innerHTML=gearsMarkup(p);legend([['主动轮','var(--scene-sun)'],['从动轮','var(--scene-ring)']]);}
  else if(kind==='geartrain'){
    stage.innerHTML=gearTrainMarkup(effective());legend(p.teeth.map((z,i)=>[trainName(i,p.teeth.length),trainTone(i,p.teeth.length)]));
    const values=effective();el('[data-scene-controls]').innerHTML=values.teeth.map((z,i)=>sceneSlider('teeth'+i,trainName(i,p.teeth.length)+'齿数',z,18,80,1,'齿')).join('')+sceneSlider('inputSpeed','输入转速',values.inputSpeed,-4,4,'any',' rad/s');
  }else if(kind==='worm'){
    const values=effective();stage.innerHTML=wormMarkup(values,svgScope);legend([['蜗杆 · 输入','var(--scene-sun)'],['蜗轮 · 输出','var(--scene-ring)']]);
    el('[data-scene-controls]').innerHTML=sceneSlider('starts','蜗杆头数',values.starts,1,4,1,'头')+sceneSlider('wheelTeeth','蜗轮齿数',values.wheelTeeth,20,80,1,'齿')+sceneSlider('inputSpeed','输入转速',values.inputSpeed,-4,4,'any',' rad/s');
  }
  else if(kind==='wave'){
    stage.innerHTML=waveMarkup();legend([['波 A','var(--scene-ring)'],['波 B','var(--scene-planet)'],['合成波','var(--scene-sun)']]);
    const values=effective();el('[data-scene-controls]').innerHTML=sceneSlider('phaseDegrees','相位差',values.phaseDegrees,0,360,'any','°')+sceneSlider('amplitudeB','波 B 振幅',values.amplitudeB,0,2,'any');
  }else if(kind==='vector')mountVector();
  function tick(time){
    if(disposed||!running)return;
    if(last){const delta=Math.min(.1,Math.max(0,(time-last)/1000));state.phase+=delta*state.rate*(kind==='wave'?1:effective().inputSpeed*state.direction);}
    last=time;draw();
    if(time-lastReadout>250){lastReadout=time;stage.dataset.scenePhase=String(state.phase);}
    raf=win.requestAnimationFrame(tick);
  }
  function play(){if(disposed)return;running=true;last=0;const button=el('[data-scene-action="play"]');button.textContent='Ⅱ 暂停';button.setAttribute('aria-label','暂停动画');raf=win.requestAnimationFrame(tick);}
  function moveProcess(edge){
    if(!edge)return;
    const index=p.nodes.findIndex(node=>node.id===edge.to);state.index=index;state.history=[...state.history,index].slice(-64);refresh();notify();
  }
  function click(event){
    const caseButton=event.target.closest?.('[data-scene-case]');
    if(caseButton&&root.contains(caseButton)){pause();state.case=caseButton.dataset.sceneCase;state.phase=0;refresh();notify();return;}
    const branch=event.target.closest?.('[data-scene-branch]');
    if(branch&&kind==='process'){moveProcess(p.edges.filter(edge=>edge.from===p.nodes[state.index].id)[Number(branch.dataset.sceneBranch)]);return;}
    const button=event.target.closest?.('[data-scene-action]');if(!button||!root.contains(button))return;
    const action=button.dataset.sceneAction;
    if(action==='play'){if(running){pause();notify();}else play();}
    else if(action==='step'){pause();if(kind==='process'){const edges=p.edges.filter(edge=>edge.from===p.nodes[state.index].id);if(edges.length===1)moveProcess(edges[0]);}else{const drive=effective().inputSpeed;state.phase+=kind==='wave'?.1:(drive===0?0:Math.sign(drive)*state.direction*Math.PI/12);refresh();notify();}}
    else if(action==='reverse'){state.direction*=-1;refresh();notify();}
    else if(action==='reset'){pause();state=validateExperimentSnapshot(spec,{v:1,template:kind,case:state.case});if(kind==='vector')mountVector();if(kind==='geartrain')stage.innerHTML=gearTrainMarkup(p);if(kind==='worm')stage.innerHTML=wormMarkup(p,svgScope);if(kind==='wave'||editableTransmission){for(const input of root.querySelectorAll('[data-scene-controls] input')){const k=input.dataset.sceneInput;input.value=String(k.startsWith('teeth')?p.teeth[Number(k.slice(5))]:p[k]);}}refresh();notify();}
  }
  function input(event){
    const target=event.target,key=target.dataset?.sceneInput;if(!key)return;
    const value=Number(target.value);if(!Number.isFinite(value))return;
    if(key==='rate')state.rate=value;
    else if(kind==='wave'||editableTransmission)state.inputs={...state.inputs,[key]:value};
    if(kind==='geartrain'&&key.startsWith('teeth'))stage.innerHTML=gearTrainMarkup(effective());
    if(kind==='worm'&&key==='wheelTeeth')stage.innerHTML=wormMarkup(effective(),svgScope);
    state=validateExperimentSnapshot(spec,state);refresh();notify();
  }
  function visibility(){if(root.ownerDocument.hidden){pause();notify();}}
  function keydown(event){
    const button=event.target.closest?.('[data-scene-case]');if(!button||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();const buttons=[...root.querySelectorAll('[data-scene-case]')],i=buttons.indexOf(button),next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(i+(event.key==='ArrowRight'?1:buttons.length-1))%buttons.length;buttons[next].focus();buttons[next].click();
  }
  root.addEventListener('click',click);root.addEventListener('input',input);root.addEventListener('keydown',keydown);root.ownerDocument.addEventListener('visibilitychange',visibility);
  refresh();
  return {snapshot,dispose(){if(disposed)return;pause();notify();disposed=true;vector?.dispose();root.removeEventListener('click',click);root.removeEventListener('input',input);root.removeEventListener('keydown',keydown);root.ownerDocument.removeEventListener('visibilitychange',visibility);}};
}

const HTML=`
<section class="vie-canlab" aria-label="CAN 位时序交互实验">
  <header class="vie-can-head">
    <h3>CAN 位时序</h3>
    <button type="button" class="vie-pill vie-can-reset" data-action="reset" aria-label="重置实验"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M3 11a9 9 0 1 1 2.7 6.5M3 5v6h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>重置</button>
  </header>
  <div class="vie-can-tabs" role="group" aria-label="切换方案">
    <button type="button" class="vie-can-tab" data-scheme="A" aria-pressed="true">方案 A · 14 + 3</button>
    <button type="button" class="vie-can-tab" data-scheme="B" aria-pressed="false">方案 B · 15 + 2</button>
  </div>
  <div class="vie-can-segments" aria-label="当前位时序参数">
    <div><span>SYNC</span><strong>1 TQ</strong></div>
    <div><span>BS1</span><strong data-value="bs1">14 TQ</strong></div>
    <div><span>BS2</span><strong data-value="bs2">3 TQ</strong></div>
  </div>
  <div class="vie-can-timeline">
    <div class="vie-can-track" role="img" aria-label="SYNC、BS1、BS2 比特时序示意">
      <div class="vie-can-seg sync">S</div><div class="vie-can-seg before">BS1</div><div class="vie-can-seg after">BS2</div>
    </div>
    <div class="vie-can-sp-indicator" aria-hidden="true">↑</div>
    <div class="vie-can-grab" role="slider" tabindex="0" aria-label="拖动采样点，调整 BS1 和 BS2 的分配" aria-valuemin="20" aria-valuemax="95" aria-valuenow="83.33" aria-valuetext="83.33%" title="拖动改变采样点；左右方向键微调"></div>
    <div class="vie-can-axis"><span>0%</span><strong data-value="sp">采样点 83.33%</strong><span>100%</span></div>
  </div>
  <div class="vie-can-metrics">
    <div><span>CAN 波特率</span><strong data-value="bitrate">500 kbps</strong></div>
    <div><span>采样点</span><strong data-value="sample">83.33%</strong></div>
  </div>
  <p class="vie-can-guidance" data-value="guidance" aria-live="polite">总 TQ 相同，位速率相同；调整 BS1/BS2 会改变采样点。</p>
  <p class="vie-can-message" data-value="message" aria-live="polite"></p>
  <div class="vie-can-footer">
    <details class="vie-can-more"><summary><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M4 7h16M4 17h16M9 4v6M16 14v6" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/></svg> 调节参数 <span aria-hidden="true">⌄</span></summary>
      <div class="vie-can-extra-body">
  <div class="vie-can-inputs" aria-label="调整时间段">
    <label><span>BS1 <b data-readout="bs1">14 TQ</b></span><input type="range" data-input="bs1" aria-label="BS1 时间长度" min="1" max="16" step="1"/></label>
    <label><span>BS2 <b data-readout="bs2">3 TQ</b></span><input type="range" data-input="bs2" aria-label="BS2 时间长度" min="1" max="8" step="1"/></label>
  </div>

        <label class="vie-can-lock"><input type="checkbox" data-input="lock" checked/> 固定当前总 TQ（波特率保持不变）</label>
        <div class="vie-can-advanced">
          <label>CAN 时钟 / MHz<input type="number" data-input="clockMHz" aria-label="CAN 外设时钟 MHz" min="1" max="100" step="1" inputmode="numeric"/></label>
          <label>BRP<input type="number" data-input="prescaler" aria-label="BRP 预分频" min="1" max="1024" step="1" inputmode="numeric"/></label>
          <label>SJW / TQ<input type="number" data-input="sjw" aria-label="SJW TQ" min="1" max="4" step="1" inputmode="numeric"/></label>
        </div>
        <div class="vie-can-presets"><span>快捷示例</span><button type="button" class="vie-pill" data-bitrate="500000">500k</button><button type="button" class="vie-pill" data-bitrate="250000">250k</button><button type="button" class="vie-pill" data-bitrate="1000000">1M</button></div>
        <div class="vie-can-extra-values">位时间 <strong data-value="time">2.00 µs</strong><span data-value="tq">18 TQ · 每 TQ 111.11 ns</span></div>
        <div class="vie-can-compare"><strong>方案比较</strong><div class="vie-can-compare-lines"><div><span>A</span><div class="vie-can-mini"><i data-mini="A"></i></div><b data-compare="A">83.33%</b></div><div><span>B</span><div class="vie-can-mini"><i data-mini="B"></i></div><b data-compare="B">88.89%</b></div></div><p data-value="compare-note"></p></div>
        <p class="vie-can-formula" data-value="formula"></p>
      </div>
    </details>
    <button type="button" class="vie-pill vie-can-why" data-action="why" aria-expanded="false"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.65"/><path d="M9.5 9a2.6 2.6 0 1 1 4.1 2.1c-1.1.8-1.6 1.4-1.6 2.6M12 17.3h.01" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/></svg> 为什么？</button>
  </div>
  <div class="vie-can-explanation" hidden>
    总 TQ 不变时，波特率不变；BS1 与 BS2 的分配决定采样点。采样点不是越晚越好，应结合传播延迟、时钟误差及设备手册选择。
  </div>
</section>`;

function mountCanLab(root,initial={},options={}){
 if(!root)throw Error('CAN lab root is missing');
 let baseline=normalizeCanPreset(initial);
 let values={...baseline};
 let scheme='A';let lock=true;let edited=false;let notify='';
 if(options.initialState?.values){try{values=normalizeCanPreset(options.initialState.values);scheme=options.initialState.scheme==='B'?'B':'A';lock=options.initialState.lock!==false;edited=options.initialState.edited===true;}catch{}}
 root.innerHTML=HTML;
 const el=(s)=>root.querySelector(s);
 const all=(s)=>Array.from(root.querySelectorAll(s));
 const num=(v,d=2)=>Number(v).toFixed(d);
 const pct=v=>`${num(v)}%`;
 const diffText=v=>Math.abs(v)<.000001?'相同':`${v>0?'晚':'早'} ${num(Math.abs(v))} 个百分点`;
 const bitrateLabel=v=>v>=1e6?`${num(v/1e6,v%1e6===0?0:2)} Mbps`:`${num(v/1e3,v%1e3===0?0:2)} kbps`;
 const current=()=>scheme==='A'?{bs1:values.bs1,bs2:values.bs2}:{bs1:values.compareBs1,bs2:values.compareBs2};
 const assign=(x)=>{if(scheme==='A'){values.bs1=x.bs1;values.bs2=x.bs2;}else{values.compareBs1=x.bs1;values.compareBs2=x.bs2;}};
 function update(){
  const s=current();const calc=calculateCanTiming({...values,...s});
  const A=calculateCanTiming(values);const B=calculateCanTiming({...values,bs1:values.compareBs1,bs2:values.compareBs2});
  all('[data-scheme]').forEach(b=>{const a=b.dataset.scheme===scheme;b.setAttribute('aria-pressed',String(a));b.classList.toggle('active',a);b.textContent=`方案 ${b.dataset.scheme} · ${b.dataset.scheme==='A'?values.bs1:values.compareBs1} + ${b.dataset.scheme==='A'?values.bs2:values.compareBs2}`;});
  const t=calc.totalTq;const segs=all('.vie-can-seg');segs.forEach((n,i)=>{n.style.flexGrow=String([1,s.bs1,s.bs2][i]);n.style.flexBasis='0';n.style.minWidth='0'});
  el('.vie-can-sp-indicator').style.left=`${calc.samplePoint}%`;
  const grab=el('.vie-can-grab');grab.style.left=`${calc.samplePoint}%`;
  const boundaryMin=(1+Math.max(1,t-1-8))/t*100,boundaryMax=(1+Math.min(16,t-1-values.sjw))/t*100;
  grab.setAttribute('aria-valuemin',String(+boundaryMin.toFixed(2)));grab.setAttribute('aria-valuemax',String(+boundaryMax.toFixed(2)));
  grab.setAttribute('aria-valuenow',String(+calc.samplePoint.toFixed(2)));grab.setAttribute('aria-valuetext',pct(calc.samplePoint));
  el('[data-value=sp]').textContent=`采样点 ${pct(calc.samplePoint)}`;
  el('[data-value=bs1]').textContent=`${s.bs1} TQ`;el('[data-value=bs2]').textContent=`${s.bs2} TQ`;
  el('[data-value=bitrate]').textContent=bitrateLabel(calc.bitrate);
  el('[data-value=sample]').textContent=pct(calc.samplePoint);
  el('[data-value=time]').textContent=`${num(calc.bitTimeUs)} µs`;
  el('[data-value=tq]').textContent=`${t} TQ · 每 TQ ${num(calc.tqNs)} ns`;
  el('[data-value=guidance]').textContent=A.totalTq===B.totalTq
    ?`方案 A 采样点 ${pct(A.samplePoint)}，方案 B 为 ${pct(B.samplePoint)}；两者波特率相同。`
    :`当前 ${scheme} 的采样点为 ${pct(calc.samplePoint)}；总 TQ 不同时，位速率也会变化。`;

  all('[data-input]').forEach(inp=>{if(inp.type==='checkbox'){inp.checked=lock;return;}const k=inp.dataset.input;if(k==='bs1'||k==='bs2')inp.value=String(s[k]);else if(document.activeElement!==inp)inp.value=String(values[k]);});
  el('[data-readout=bs1]').textContent=`${s.bs1} TQ`;el('[data-readout=bs2]').textContent=`${s.bs2} TQ`;
  el('[data-compare=A]').textContent=pct(A.samplePoint);el('[data-compare=B]').textContent=pct(B.samplePoint);
  el('[data-mini=A]').style.width=`${A.samplePoint}%`;el('[data-mini=B]').style.width=`${B.samplePoint}%`;
  const diff=B.samplePoint-A.samplePoint;
  el('[data-value=compare-note]').textContent=`A：${bitrateLabel(A.bitrate)} / ${pct(A.samplePoint)}；B：${bitrateLabel(B.bitrate)} / ${pct(B.samplePoint)}。B 的采样点比 A ${diff>0?'靠后':diff<0?'靠前':'相同'}${diff===0?'':` ${num(Math.abs(diff))} 个百分点`}。`;
  el('[data-value=formula]').textContent=`${values.clockMHz} MHz ÷ (${values.prescaler} × ${t} TQ) = ${bitrateLabel(calc.bitrate)}　·　采样点 (1 + ${s.bs1}) / ${t} = ${pct(calc.samplePoint)}`;
  el('[data-value=message]').textContent=notify;
  root.dispatchEvent(new CustomEvent('vie:can:change',{bubbles:true,detail:{scheme,values:{...values},result:calc}}));
  if(edited)options.onChange?.({scheme,lock,edited,values:{...values}});
 }
 function modifySegment(key,v,keepTotal=lock){
  if(!Number.isInteger(v))return;
  const limit=key==='bs1'?16:8;if(v<1||v>limit)return;
  const previous=current(),next={...previous,[key]:v};
  if(keepTotal){const total=1+previous.bs1+previous.bs2;const other=key==='bs1'?'bs2':'bs1';next[other]=total-1-v;
   if(next[other]<1||next[other]>(other==='bs1'?16:8)){
    notify=`锁定总 TQ 时，${other.toUpperCase()} 必须保持在有效范围；已保留原值。`;update();return;
   }
  }
  if(values.sjw>next.bs2){notify='BS2 不能小于 SJW；请先减小 SJW。';update();return;}
  assign(next);notify=keepTotal?'':'自由调节总 TQ 会同时改变波特率。';edited=true;update();
 }
 function changeNumber(key,raw){const n=Number(raw);if(raw.trim()===''||!Number.isFinite(n))return;
   const p={...values,[key]:n};try{calculateCanTiming(p);calculateCanTiming({...p,bs1:p.compareBs1,bs2:p.compareBs2});values=p;edited=true;notify='';update();}
   catch(e){notify=e.message;el('[data-value=message]').textContent=notify;}}
 const handle=(e)=>{
   const target=e.target;const input=target.closest?.('[data-input]');if(input){const k=input.dataset.input;if(k==='lock'){lock=input.checked;notify=lock?'已锁定当前总 TQ。':'已允许总 TQ 自由变化。';update();return;}
    if(k==='bs1'||k==='bs2'){modifySegment(k,Number(input.value));return;}
    if(e.type==='change')changeNumber(k,input.value);return;}
   if(e.type!=='click')return;
   const button=target.closest?.('button');if(!button||!root.contains(button))return;
   if(button.dataset.scheme){scheme=button.dataset.scheme;edited=true;notify='';update();return;}
   if(button.dataset.action==='reset'){values={...baseline};scheme='A';lock=true;edited=false;notify='已恢复初始配置。';update();options.onChange?.({scheme,lock,edited,values:{...values}});return;}
   if(button.dataset.action==='why'){const panel=el('.vie-can-explanation');panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));return;}
   if(button.dataset.bitrate){const targetBps=Number(button.dataset.bitrate);const total=1+values.bs1+values.bs2;const brp=values.clockMHz*1e6/(targetBps*total);if(!Number.isInteger(brp)||brp<1||brp>1024){notify='当前时钟与总 TQ 不能用整数 BRP 精确得到这个波特率；请调整配置。';update();return;}
     values.prescaler=brp;edited=true;notify=`已将 BRP 设为 ${brp}，匹配方案 A 的目标波特率。`;update();}
 };
 // Timeline boundary is a real interaction, not a decorative label.
 const grab=el('.vie-can-grab');const track=el('.vie-can-track');let dragging=false;
 function fromPointer(clientX){
   const rect=track.getBoundingClientRect();if(rect.width<1)return;
   const total=1+current().bs1+current().bs2;
   const tq=Math.round((clientX-rect.left)/rect.width*total)-1;
   const bs1=Math.max(1,Math.min(16,tq));
   if(bs1!==current().bs1)modifySegment('bs1',bs1,true);
 }
 const pointerDown=e=>{if(e.button!==0)return;dragging=true;grab.setPointerCapture?.(e.pointerId);fromPointer(e.clientX);e.preventDefault();};
 const pointerMove=e=>{if(dragging)fromPointer(e.clientX);};
 const pointerUp=()=>{dragging=false;};
 const keydown=e=>{
   if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
   e.preventDefault();const c=current(),total=1+c.bs1+c.bs2;
   const low=Math.max(1,total-1-8),high=Math.min(16,total-1-values.sjw);
   const next=e.key==='Home'?low:e.key==='End'?high:c.bs1+(e.key==='ArrowRight'?1:-1);
   modifySegment('bs1',Math.max(low,Math.min(high,next)),true);
 };
 grab.addEventListener('pointerdown',pointerDown);grab.addEventListener('pointermove',pointerMove);
 grab.addEventListener('pointerup',pointerUp);grab.addEventListener('pointercancel',pointerUp);grab.addEventListener('keydown',keydown);
 root.addEventListener('input',handle);root.addEventListener('change',handle);root.addEventListener('click',handle);
 update();
 return {dispose:()=>{root.removeEventListener('input',handle);root.removeEventListener('change',handle);root.removeEventListener('click',handle);grab.removeEventListener('pointerdown',pointerDown);grab.removeEventListener('pointermove',pointerMove);grab.removeEventListener('pointerup',pointerUp);grab.removeEventListener('pointercancel',pointerUp);grab.removeEventListener('keydown',keydown);root.replaceChildren();},applyInitial:(next)=>{const x=normalizeCanPreset(next);baseline=x;if(!edited){values={...x};update();}},snapshot:()=>({scheme,lock,edited,values:{...values}})};
}

/** Compact Cartesian vector explorer. Stable SVG nodes allow pointer capture during drag. */
function mountVectorLab(root, options = {}) {
  const maxMagnitude = 5;
  const origin = { x: 170, y: 128 };
  const scale = 21.5; // Identical pixels-per-unit on both axes.
  const state = { magnitude: 4, angle: 30 };
  const initial = options.initialState ?? {};
  if (Number.isFinite(initial.magnitude)) state.magnitude = Math.max(0, Math.min(maxMagnitude, Math.round(initial.magnitude * 10) / 10));
  if (Number.isFinite(initial.angle)) state.angle = Math.max(-180, Math.min(180, Math.round(initial.angle)));
  const defaults = { ...state };
  const fmt = (x) => Number.isInteger(x) ? String(x) : x.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  const short = (x) => x.toFixed(2).replace(/^-0\.00$/, '0.00');
  const xTick = (n) => origin.x + n * scale;
  const yTick = (n) => origin.y - n * scale;
  const guides = [-4, -2, 0, 2, 4].map((v) => {
    const x = xTick(v), y = yTick(v), active = v === 0;
    const stroke = active ? 'var(--vie-vector-axis)' : 'var(--vie-vector-grid)';
    return `<line x1="${x}" y1="19" x2="${x}" y2="238" stroke="${stroke}" stroke-width="${active ? 1.3 : 1}" />
      <line x1="56" y1="${y}" x2="284" y2="${y}" stroke="${stroke}" stroke-width="${active ? 1.3 : 1}" />
      ${v === 0 ? '' : `<text x="${x}" y="142" text-anchor="middle" class="vie-vector-tick">${v}</text><text x="160" y="${y + 4}" text-anchor="end" class="vie-vector-tick">${v}</text>`}`;
  }).join('');
  root.innerHTML = `<section class="vie-semantic-lab vie-lab-vector">
    <header class="vie-lab-head"><div><h3>向量分解</h3><p>拖动蓝色端点，观察水平与竖直分量。</p></div>
      <button type="button" class="vie-pill" data-action="reset"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M3 11a9 9 0 1 1 2.7 6.5M3 5v6h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>重置</button>
    </header>
    <div class="vie-vector-stage">
      <div class="vie-vector-canvas">
        <svg class="vie-vector-svg" viewBox="0 0 340 256" role="group" aria-label="可拖动的二维直角坐标系，蓝色为向量，青绿色为水平分量，橙色为竖直分量">
          ${guides}
          <text x="160" y="142" text-anchor="end" class="vie-vector-tick">0</text>
          <path d="M279 124l6 4-6 4 M166 24l4-6 4 6" fill="none" stroke="var(--vie-vector-axis)" stroke-width="1.4" stroke-linejoin="round"/>
          <text x="290" y="123" class="vie-vector-axis-label">x</text><text x="181" y="20" class="vie-vector-axis-label">y</text>
          <path data-v="horizontal" stroke="var(--vie-vector-x)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <path data-v="vertical" stroke="var(--vie-vector-y)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <path data-v="arc" stroke="var(--vie-vector-angle)" stroke-width="1.5" fill="none" />
          <text data-v="arc-label" class="vie-vector-arc-label"/>
          <path data-v="vector" stroke="var(--vie-vector-main)" stroke-width="3.5" stroke-linecap="round" fill="none" />
          <circle data-v="origin" cx="170" cy="128" r="3.5" fill="var(--vie-vector-axis)" />
          <circle data-vector-handle="true" cx="263" cy="82" r="18" fill="transparent" stroke="none" role="button" tabindex="0" aria-label="向量端点。拖动调整方向和长度；左右方向键调整角度，上下方向键调整长度"/>
          <circle data-v="tip" cx="263" cy="82" r="6.2" fill="var(--vie-vector-main)" stroke="var(--vie-vector-tip-ring)" stroke-width="2.5" pointer-events="none"/>
          <text data-v="coordinate" class="vie-vector-coordinate"/>
        </svg>
        <span class="vie-vector-hint"><svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 2v13l3.2-3 2.4 5 2-1-2.4-5H14L4 2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>拖动端点</span>
      </div>
      <div class="vie-vector-insights" aria-live="off">
        <div class="vie-vector-meta"><span>向量</span><strong data-v="polar">4 ∠ 30°</strong></div>
        <div class="vie-vector-metric x"><div class="vie-vector-metric-label"><span class="vie-vector-dot"></span>水平分量 x</div><strong data-v="x-num">3.46</strong><small>|v| cos θ</small></div>
        <div class="vie-vector-metric y"><div class="vie-vector-metric-label"><span class="vie-vector-dot"></span>竖直分量 y</div><strong data-v="y-num">2.00</strong><small>|v| sin θ</small></div>
      </div>
    </div>
    <div class="vie-lab-controls vie-vector-controls">
      <label class="vie-lab-slider"><span>模长 <b data-v="mag-label"></b></span><input type="range" data-param="magnitude" min="0" max="5" step="0.1" value="${state.magnitude}" aria-label="向量模长"/></label>
      <label class="vie-lab-slider"><span>角度 θ <b data-v="angle-label"></b></span><input type="range" data-param="angle" min="-180" max="180" step="1" value="${state.angle}" aria-label="向量角度"/></label>
    </div>
    <p class="vie-lab-explain vie-vector-explain" aria-live="polite">向量的投影随角度和长度改变。</p>
  </section>`;
  const $ = (selector) => root.querySelector(selector);
  const svg = $('.vie-vector-svg');
  const handle = $('[data-vector-handle]');
  const coordLabel = $('[data-v=coordinate]');
  const plot = {
    horizontal: $('[data-v=horizontal]'), vertical: $('[data-v=vertical]'),
    arc: $('[data-v=arc]'), vector: $('[data-v=vector]'),
    arcLabel: $('[data-v=arc-label]'), tip: $('[data-v=tip]')
  };
  let dragging = false;
  let trackingPointer = null;
  let disposed = false;
  function render() {
    const rad = state.angle * Math.PI / 180;
    const vx = state.magnitude * Math.cos(rad), vy = state.magnitude * Math.sin(rad);
    const ex = origin.x + vx * scale, ey = origin.y - vy * scale;
    // Both components are drawn end-to-end: vector = (vx,0) + (0,vy).
    plot.horizontal.setAttribute('d', `M${origin.x} ${origin.y}H${ex}`);
    plot.vertical.setAttribute('d', `M${ex} ${origin.y}V${ey}`);
    const len = state.magnitude * scale;
    if (len > 10) {
      const unitX = (ex-origin.x)/len, unitY=(ey-origin.y)/len;
      const baseX=ex-unitX*10, baseY=ey-unitY*10;
      const nx=-unitY,ny=unitX;
      plot.vector.setAttribute('d',`M${origin.x} ${origin.y}L${baseX} ${baseY} M${baseX+nx*4.7} ${baseY+ny*4.7}L${ex} ${ey}L${baseX-nx*4.7} ${baseY-ny*4.7}`);
    } else plot.vector.setAttribute('d', `M${origin.x} ${origin.y}L${ex} ${ey}`);
    plot.tip.setAttribute('cx', String(ex)); plot.tip.setAttribute('cy',String(ey));
    handle.setAttribute('cx',String(ex));handle.setAttribute('cy',String(ey));
    handle.setAttribute('aria-label',`向量端点，模长 ${fmt(state.magnitude)}，方向 ${state.angle}°；方向键可调整`);
    if (state.magnitude > 0.3) {
      const arcR=28;
      const segments=Math.max(2,Math.ceil(Math.abs(state.angle)/10));
      const pts=Array.from({length:segments+1},(_,i)=>{
        const a=(state.angle*i/segments)*Math.PI/180;
        return `${origin.x+arcR*Math.cos(a)} ${origin.y-arcR*Math.sin(a)}`;
      });
      plot.arc.setAttribute('d','M'+pts.join(' L'));
      const thetaLabelA=state.angle/2*Math.PI/180;
      plot.arcLabel.setAttribute('x',String(origin.x+41*Math.cos(thetaLabelA)));
      plot.arcLabel.setAttribute('y',String(origin.y-41*Math.sin(thetaLabelA)-4));
      plot.arcLabel.textContent = 'θ';
    } else {plot.arc.setAttribute('d','');plot.arcLabel.textContent='';}
    // Flip the coordinate label inward near the plot edges (all four quadrants).
    const anchor = ex < 105 ? 'start' : ex > 248 ? 'end' : (vx >= 0 ? 'start' : 'end');
    let lx = ex + (anchor==='start' ? 12 : -12);
    let ly = ey < 38 ? ey + 17 : ey - 12;
    lx=Math.max(36,Math.min(305,lx));ly=Math.max(18,Math.min(243,ly));
    coordLabel.setAttribute('x',String(lx));coordLabel.setAttribute('y',String(ly));
    coordLabel.setAttribute('text-anchor', anchor);
    coordLabel.textContent=`(${fmt(vx)}, ${fmt(vy)})`;
    $('[data-v=polar]').textContent=`${fmt(state.magnitude)} ∠ ${state.angle}°`;
    $('[data-v=x-num]').textContent=short(vx);
    $('[data-v=y-num]').textContent=short(vy);
    $('[data-v=mag-label]').textContent=fmt(state.magnitude);
    $('[data-v=angle-label]').textContent=state.angle+'°';
    for (const key of ['magnitude','angle']){
      const input=$(`[data-param=${key}]`);
      if(Number(input.value)!==state[key])input.value=String(state[key]);
    }
    $('.vie-vector-explain').textContent=`x = ${short(vx)}，y = ${short(vy)}。拖动向量，观察投影的长度和方向。`;
  }
  function notify(){ options.onChange?.({...state}); }
  function update(nextMag,nextAngle){
    const magnitude=Math.min(5,Math.max(0,Math.round(nextMag*10)/10));
    const angle=Math.min(180,Math.max(-180,Math.round(nextAngle)));
    if (magnitude===state.magnitude && angle===state.angle) return;
    Object.assign(state,{magnitude,angle});render();notify();
  }
  function onInput(e){
    const key=e.target.dataset?.param;
    if(key==='angle')update(state.magnitude,Number(e.target.value));
    if(key==='magnitude')update(Number(e.target.value),state.angle);
  }
  function onClick(e){
    if(e.target.closest('[data-action=reset]'))update(defaults.magnitude,defaults.angle);
  }
  function coords(e){
    const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;
    const m=svg.getScreenCTM(); if(!m) return null;
    const p=pt.matrixTransform(m.inverse());
    const dx=(p.x-origin.x)/scale,dy=(origin.y-p.y)/scale;
    return {magnitude:Math.hypot(dx,dy),angle:Math.atan2(dy,dx)*180/Math.PI};
  }
  function onDown(e){
    if(e.button!==undefined&&e.button!==0)return;
    if(e.target!==handle)return;
    dragging=true;trackingPointer=e.pointerId;
    handle.classList.add('dragging');
    svg.setPointerCapture(e.pointerId);
    e.preventDefault();
  }
  function onMove(e){
    if(!dragging||e.pointerId!==trackingPointer)return;
    const p=coords(e);if(p)update(p.magnitude,p.angle);
  }
  function stopDrag(e){
    if(!dragging||(e.pointerId!=null&&e.pointerId!==trackingPointer))return;
    dragging=false;trackingPointer=null;handle.classList.remove('dragging');
    if(e.pointerId!=null&&svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);
  }
  function onKey(e){
    if(e.target!==handle)return;
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))return;
    e.preventDefault();
    if(e.key==='Home') update(0,0);
    if(e.key==='ArrowLeft')update(state.magnitude,state.angle-(e.shiftKey?10:1));
    if(e.key==='ArrowRight')update(state.magnitude,state.angle+(e.shiftKey?10:1));
    if(e.key==='ArrowUp')update(state.magnitude+(e.shiftKey?1:0.1),state.angle);
    if(e.key==='ArrowDown')update(state.magnitude-(e.shiftKey?1:0.1),state.angle);
  }
  root.addEventListener('input',onInput);
  root.addEventListener('click',onClick);
  svg.addEventListener('pointerdown',onDown);
  svg.addEventListener('pointermove',onMove);
  svg.addEventListener('pointerup',stopDrag);
  svg.addEventListener('pointercancel',stopDrag);
  svg.addEventListener('lostpointercapture',stopDrag);
  handle.addEventListener('keydown',onKey);
  render();
  return {
    dispose(){
      if(disposed)return;disposed=true;
      root.removeEventListener('input',onInput);root.removeEventListener('click',onClick);
      svg.removeEventListener('pointerdown',onDown);svg.removeEventListener('pointermove',onMove);
      svg.removeEventListener('pointerup',stopDrag);svg.removeEventListener('pointercancel',stopDrag);
      svg.removeEventListener('lostpointercapture',stopDrag);handle.removeEventListener('keydown',onKey);
    },
    snapshot(){return {...state};}
  };
}

/** Native-sized semantic teaching surfaces. Fixed trusted markup; the model only selects a lab. */
function mountSemanticLab(root,kind,options={}){
  const configs={
    bitwise:{title:'8 位二进制运算',sub:'点按 A、B 中任意一位，观察逐位运算结果。'},
    timer:{title:'STM32 定时器计数',sub:'观察 PSC、ARR 如何决定更新频率。'},
    ohm:{title:'欧姆定律',sub:'调整电压和电阻，观察电流如何改变。'},
    fraction:{title:'分数等值',sub:'改变分子和分母，直观看到等值分数。'},
    probability:{title:'等可能事件的概率',sub:'点击六种结果，选出你关心的事件。'},
    vector:{title:'向量的分解',sub:'改变长度与角度，观察水平和竖直分量。'}
  };
  if(!Object.hasOwn(configs,kind))throw Error('Unsupported semantic lab');
  if(kind==='vector')return mountVectorLab(root,options);
  const config=configs[kind];
  const state={a:172,b:202,op:'AND',psc:71,arr:999,voltage:12,resistance:6,numerator:1,denominator:3,selected:[2,4,6],magnitude:4,angle:30};
  if(options.initialState&&typeof options.initialState==='object'){for(const [k,v] of Object.entries(options.initialState))if(Object.hasOwn(state,k)){if(typeof state[k]===typeof v)state[k]=Array.isArray(v)?[...v]:v;}}
  const num=(n,d=2)=>Number.isFinite(n)?(Number.isInteger(n)?String(n):n.toFixed(d)):'—';
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const elem=(sel)=>root.querySelector(sel);
  const svg=(body,view='0 0 600 150')=>`<svg viewBox="${view}" role="img" aria-label="${config.title}" class="vie-lab-svg">${body}</svg>`;
  const pill=(name)=>`<button type="button" class="vie-pill" data-action="reset" aria-label="重置${name}"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M3 11a9 9 0 1 1 2.7 6.5M3 5v6h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>重置</button>`;
  root.innerHTML=`<section class="vie-semantic-lab vie-lab-${kind}"><header class="vie-lab-head"><div><h3>${config.title}</h3><p>${config.sub}</p></div>${pill(config.title)}</header><div class="vie-lab-visual" data-region="visual"></div><div class="vie-lab-controls" data-region="controls"></div><p class="vie-lab-explain" data-region="explain" aria-live="polite"></p></section>`;
  function slider(key,label,min,max,step,unit=''){
    return `<label class="vie-lab-slider"><span>${label}<b data-readout="${key}"></b></span><input type="range" data-param="${key}" min="${min}" max="${max}" step="${step}" value="${state[key]}" aria-label="${label}"/></label>`;
  }
  const original={...state,selected:[...state.selected]};
  // Keep sliders mounted during input. Replacing controls.innerHTML on every
  // input event destroys the browser's drag gesture and pointer capture.
  function render(rebuildControls=false){
    const visual=elem('[data-region=visual]'),controls=elem('[data-region=controls]'),explain=elem('[data-region=explain]');
    let graphic='',panel='',note='';
    if(kind==='bitwise'){
      const names={AND:'与 AND',OR:'或 OR',XOR:'异或 XOR'};
      const op=state.op==='AND'?state.a&state.b:state.op==='OR'?state.a|state.b:state.a^state.b;
      const digits=value=>Array.from({length:8},(_,i)=>(value>>(7-i))&1);
      const row=(title,val,editable)=>`<div class="vie-bit-row"><span>${title}</span><div class="vie-bit-cells">${digits(val).map((bit,i)=>editable?`<button class="vie-bit" type="button" data-bit="${title}:${i}" aria-label="切换${title}的第${7-i}位">${bit}</button>`:`<strong class="vie-bit-result ${bit?'on':''}">${bit}</strong>`).join('')}</div><small>${val}</small></div>`;
      graphic=`<div class="vie-bit-panel">${row('A',state.a,true)}${row('B',state.b,true)}<div class="vie-bit-separator"></div>${row('=',op,false)}</div>`;
      panel=`<div class="vie-lab-pills" role="group" aria-label="选择运算">${Object.keys(names).map(k=>`<button type="button" class="vie-pill ${k===state.op?'selected':''}" data-op="${k}" aria-pressed="${k===state.op}">${names[k]}</button>`).join('')}</div>`;
      note=`${state.a} ${state.op==='AND'?'&':state.op==='OR'?'|':'^'} ${state.b} = ${op}。每一位独立计算，左边为最高位。`;
    }
    else if(kind==='timer'){
      const tick=72000000/(state.psc+1),hz=tick/(state.arr+1),period=1000/hz;
      graphic=svg(`<path d="M48 30V120H568" fill="none" stroke="var(--vie-stroke)" stroke-width="1.2"/>${Array.from({length:4},(_,i)=>{const x=72+i*118;return `<rect x="${x}" y="43" width="84" height="77" rx="7" fill="#eff5fc"/><path d="M${x} 112V54H${x+84}V112" fill="none" stroke="#448bd8" stroke-width="3" stroke-linejoin="round"/>`;}).join('')}<text x="48" y="18" font-size="12" fill="var(--vie-muted)">更新事件（示意，非真实时间比例）</text><text x="558" y="139" text-anchor="end" font-size="12" fill="var(--vie-muted)">t →</text>`);
      panel=`${slider('psc','预分频 PSC',0,143,1)}${slider('arr','自动重装载 ARR',99,1999,1)}`;
      note=`定时器输入时钟假设为 72 MHz：计数频率 ${num(tick/1e6)} MHz，更新频率 ${num(hz)} Hz，周期 ${num(period)} ms。`;
    }
    else if(kind==='ohm'){
      const i=state.voltage/state.resistance;
      graphic=svg(`<path d="M100 68V34H196M404 34H500V123H100V90" fill="none" stroke="#7b8b9e" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M196 34h17l14-13 16 26 16-26 16 26 16-26 16 13h97" fill="none" stroke="#4e93d6" stroke-width="3" stroke-linejoin="round"/><path d="M83 68H117M90 90H110" stroke="#7b8b9e" stroke-width="2.7" stroke-linecap="round"/><path d="M100 90V90" stroke="#7b8b9e"/><path d="M438 116h35m-8-7 8 7-8 7" fill="none" stroke="#3a9d7f" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><text x="78" y="51" font-size="13" fill="var(--vie-ink)">${num(state.voltage)} V</text><text x="300" y="14" font-size="14" text-anchor="middle" fill="var(--vie-ink)">${num(state.resistance)} Ω</text><text x="438" y="146" font-size="14" text-anchor="middle" fill="var(--vie-ink)">I = ${num(i)} A</text>`);
      panel=`${slider('voltage','电压 U',0,24,0.1,'V')}${slider('resistance','电阻 R',1,20,0.1,'Ω')}`;
      note=`I = U / R = ${state.voltage} / ${state.resistance} = ${num(i)} A。电阻不变时，电压越大，电流越大。`;
    }
    else if(kind==='fraction'){
      const n=clamp(state.numerator,0,state.denominator),d=state.denominator;
      const bars=(times,y)=>{const count=d*times,filled=n*times,unit=520/count;
        return `<text x="28" y="${y+25}" font-size="13" fill="var(--vie-muted)">${times===1?'原分数':'等值×2'}</text>`+
        Array.from({length:count},(_,j)=>`<rect x="${100+j*unit+1}" y="${y}" width="${Math.max(unit-2,1)}" height="38" rx="${unit>12?3:1}" fill="${j<filled?'#4c91d0':'#edf1f5'}"/>`).join('');};
      graphic=svg(`${bars(1,23)}${bars(2,90)}`,'0 0 650 145');
      panel=`${slider('numerator','分子',0,state.denominator,1)}${slider('denominator','分母',2,12,1)}`;
      note=`${n}/${d} = ${n*2}/${d*2}；分子和分母同时乘以 2，大小不变。`;
    }
    else if(kind==='probability'){
      const p=state.selected.length/6;
      graphic=`<div class="vie-outcomes">${Array.from({length:6},(_,i)=>`<button type="button" data-outcome="${i+1}" class="vie-outcome ${state.selected.includes(i+1)?'chosen':''}" aria-pressed="${state.selected.includes(i+1)}">${i+1}</button>`).join('')}</div><div class="vie-prob-bar"><div style="width:${p*100}%"></div></div><div class="vie-prob-label"><span>0%</span><strong>${num(p*100)}%</strong><span>100%</span></div>`;
      panel='';
      note=`事件包含 ${state.selected.length} 种结果，全部有 6 种等可能结果：P = ${state.selected.length}/6 = ${num(p*100)}%。`;
    }
    visual.innerHTML=graphic;
    if(rebuildControls || controls.dataset.mounted!=='true'){
      controls.innerHTML=panel;
      controls.dataset.mounted='true';
    }
    explain.textContent=note;
    for(const input of controls.querySelectorAll('[data-param]')){
      const key=input.dataset.param;
      const readout=controls.querySelector(`[data-readout="${key}"]`);
      if(readout)readout.textContent=num(state[key])+(key==='voltage'?' V':key==='resistance'?' Ω':key==='angle'?'°':'');
      // Cross-control constraints may clamp a value (e.g. a numerator); update
      // the native element without replacing it while the user is dragging.
      if(kind==='fraction' && key==='numerator')input.max=String(state.denominator);
      if(Number(input.value)!==state[key])input.value=String(state[key]);
    }
  }
  const notify=()=>options.onChange?.({...state,selected:[...state.selected]});
  const onInput=e=>{const key=e.target.dataset?.param;if(!key||!Object.hasOwn(state,key))return;state[key]=Number(e.target.value);if(kind==='fraction')state.numerator=clamp(state.numerator,0,state.denominator);render();notify();};
  const onClick=e=>{const t=e.target.closest('button');if(!t||!root.contains(t))return;
    if(t.dataset.action==='reset'){Object.assign(state,original,{selected:[...original.selected]});render(true);notify();return;}
    if(t.dataset.op){state.op=t.dataset.op;render(true);notify();return;}
    if(t.dataset.bit){const [which,index]=t.dataset.bit.split(':');state[which.toLowerCase()]^=1<<(7-Number(index));render();notify();return;}
    if(t.dataset.outcome){const k=Number(t.dataset.outcome);state.selected=state.selected.includes(k)?state.selected.filter(x=>x!==k):[...state.selected,k].sort((a,b)=>a-b);render();notify();}
  };
  root.addEventListener('input',onInput);root.addEventListener('click',onClick);render();
  return {dispose(){root.removeEventListener('input',onInput);root.removeEventListener('click',onClick);},snapshot(){return {...state,selected:[...state.selected]};}};
}

/** Declarative SVG animation runtime: DOM is updated in place, no remount on frame.
 * The motion grammar is purely kinematic. It never claims gears are meshed. */
function mountVisualAnimation(root, spec, initial={}){
  if(!root||!spec||!Array.isArray(spec.motions))return {dispose(){}};
  const doc=root.ownerDocument;
  const win=doc.defaultView;
  const svg=root.querySelector('.vie-visual-svg');
  const play=root.querySelector('[data-vie-play]');
  const scrub=root.querySelector('[data-vie-scrub]');
  const counter=root.querySelector('[data-vie-time]');
  const restart=root.querySelector('[data-vie-restart]');
  if(!svg||!scrub||!play||!counter||!restart)return {dispose(){}};
  let elapsed=Math.max(0,Math.min(1,Number(initial.progress)||0))*spec.duration;
  const reduced=win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
  let running=initial.playing===undefined?false:!!initial.playing&&!reduced;
  let raf=0,last=0,disposed=false;
  const byShape=new Map();
  for(const m of spec.motions){if(!byShape.has(m.id))byShape.set(m.id,[]);byShape.get(m.id).push(m);}
  const targets=[...byShape].map(([id,motions])=>({motions,node:[...svg.querySelectorAll('[data-vie-shape]')].find(x=>x.getAttribute('data-vie-shape')===id)}));
  function draw(){
    const progress=elapsed===spec.duration?1:(elapsed/spec.duration)%1;
    for(const {motions,node} of targets){if(!node)continue;
      const transforms=motions.map(m=>{
        const p=m.ease==='inOut'?(0.5-0.5*Math.cos(Math.PI*progress)):progress;
        const cycles=m.cycles??1;
        return m.kind==='rotate'?`rotate(${(m.degrees*cycles*p).toFixed(3)} ${m.cx} ${m.cy})`:`translate(${(m.dx*cycles*p).toFixed(3)} ${(m.dy*cycles*p).toFixed(3)})`;
      });
      // SVG transforms apply rightmost-first. Declare orbit first, local spin second.
      node.setAttribute('transform',transforms.join(' '));
    }
    scrub.value=String(Math.round(progress*1000));counter.textContent=Math.round(progress*100)+'%';
    play.textContent=running?'暂停':'播放';
  }
  function tick(t){if(disposed||!running)return;
    if(last)elapsed=(elapsed+(Math.min(80,t-last))/1000)%spec.duration;
    last=t;draw();raf=win.requestAnimationFrame(tick);
  }
  function setPlay(value){running=value;last=0;win.cancelAnimationFrame(raf);draw();if(running)raf=win.requestAnimationFrame(tick);}
  const onPlay=()=>setPlay(!running);
  const onScrub=()=>{elapsed=Number(scrub.value)/1000*spec.duration;last=0;draw();};
  const onRestart=()=>{elapsed=0;draw();setPlay(true);};
  play.addEventListener('click',onPlay);scrub.addEventListener('input',onScrub);restart.addEventListener('click',onRestart);
  draw();if(running)raf=win.requestAnimationFrame(tick);
  return {snapshot:()=>({progress:elapsed===spec.duration?1:(elapsed/spec.duration)%1,playing:running}),dispose(){disposed=true;win.cancelAnimationFrame(raf);play.removeEventListener('click',onPlay);scrub.removeEventListener('input',onScrub);restart.removeEventListener('click',onRestart);}};
}

/** VIE React renderer; React provided by embedding DSH runtime. */
function makeReactView(React, core) {
  const h=React.createElement;
  function useSvgScope(){const ref=React.useRef(null);if(ref.current===null)ref.current='vie-svg-'+(++svgScopeSequence);return ref.current;}
  const plotCache=new Map();
  function cachedFunctionPlot(expr,variables,options={}){
    const key=JSON.stringify([expr,variables,options]);
    if(plotCache.has(key)){
      const visual=plotCache.get(key);
      // LRU: hot values stay present while unrelated controls update.
      plotCache.delete(key);plotCache.set(key,visual);return visual;
    }
    const visual=functionPlotSVG(expr,variables,core.evaluate,options);
    plotCache.set(key,visual);
    if(plotCache.size>24)plotCache.delete(plotCache.keys().next().value);
    return visual;
  }

  function CanView({config,nodeId,store}){
    const root=React.useRef(null),api=React.useRef(null);
    React.useEffect(()=>{api.current=mountCanLab(root.current,config,{initialState:store.local(nodeId),onChange:state=>store.setLocal(nodeId,state)});return ()=>{api.current?.dispose();api.current=null;};},[]);
    React.useEffect(()=>{api.current?.applyInitial(config);},[JSON.stringify(config)]);
    return h('div',{ref:root,className:'vie-can-host'});
  }
  function SemanticView({kind,nodeId,store}){
    const root=React.useRef(null);
    React.useEffect(()=>{const instance=mountSemanticLab(root.current,kind,{initialState:store.local(nodeId),onChange:state=>store.setLocal(nodeId,state)});return ()=>instance.dispose();},[kind]);
    return h('div',{ref:root,className:'vie-semantic-host'});
  }
  function ExperimentView({config,nodeId,store}){
    const root=React.useRef(null);
    React.useEffect(()=>{const controller=mountInteractiveScene(root.current,config,{initialState:store.local(nodeId),onChange:value=>store.setLocal(nodeId,value)});return ()=>controller.dispose();},[store,nodeId,JSON.stringify(config)]);
    return h('div',{ref:root,className:'vie-experiment-host'});
  }
  function ChartView({config,nodeId,store}){
    const root=React.useRef(null),signature=JSON.stringify(config);
    React.useEffect(()=>{const api=mountChart(root.current,config,{initialState:store.local(nodeId),onChange:value=>store.setLocal(nodeId,value)});const unsubscribe=store.subscribe(()=>api.update(store.local(nodeId)??{}));return ()=>{unsubscribe();api.dispose();};},[store,nodeId,signature]);
    return h('div',{ref:root,'data-vie-chart':nodeId});
  }
  // Keep the mounted renderer in place: expansion is a layout change, not a remount.
  function useVisualExpansion(container,button,onCollapse){
    const [expanded,setExpanded]=React.useState(false);
    const close=()=>{setExpanded(false);onCollapse?.();};
    React.useEffect(()=>{
      if(!expanded)return;
      const panel=container.current,doc=panel.ownerDocument,prior=doc.activeElement;
      const focus=e=>{if(!panel.contains(e.target))button.current?.focus();};
      const key=e=>{
        if(e.key==='Escape'){e.preventDefault();close();}
        if(e.key==='Tab'){
          const all=[...panel.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href],iframe,[tabindex="0"]')].filter(el=>el.getClientRects().length),first=all[0],last=all.at(-1);
          if(e.shiftKey&&doc.activeElement===first){e.preventDefault();last?.focus();}
          else if(!e.shiftKey&&doc.activeElement===last){e.preventDefault();first?.focus();}
        }
      };
      doc.addEventListener('keydown',key);doc.addEventListener('focusin',focus);button.current?.focus();
      return ()=>{doc.removeEventListener('keydown',key);doc.removeEventListener('focusin',focus);if(prior?.isConnected)prior.focus();};
    },[expanded]);
    return [expanded,()=>expanded?close():setExpanded(true)];
  }
  function NativeVisualFrame({title,children}){
    const container=React.useRef(null),button=React.useRef(null);
    const [expanded,toggle]=useVisualExpansion(container,button);
    return h('section',{ref:container,className:'vie-native-frame'+(expanded?' vie-figure-expanded':''),role:expanded?'dialog':undefined,'aria-modal':expanded?true:undefined,'aria-label':title||'可视化图形'},[
      h('header',{key:'head',className:'vie-generated-heading','aria-label':'图形查看操作'},h('div',{className:'vie-figure-actions'},h('button',{ref:button,type:'button',className:'vie-context-button','aria-expanded':expanded,onClick:toggle},expanded?'收起':'展开'))),
      children
    ]);
  }
  function FigureView({config,nodeId,store}){
    const frame=React.useRef(null),controller=React.useRef(null);
    const [error,setError]=React.useState(''),[zoom,setZoom]=React.useState(false),[small,setSmall]=React.useState(false);
    const container=React.useRef(null),expandButton=React.useRef(null);
    const [expanded,toggle]=useVisualExpansion(container,expandButton,()=>setZoom(false));
    React.useEffect(()=>{controller.current=mountGeneratedFigure(frame.current,config,{initialState:store.local(nodeId)??config.state,onChange:state=>store.setLocal(nodeId,state),currentState:()=>store.local(nodeId),onError:message=>{setError(message);store.setFigureError(nodeId,message);}});const unsubscribe=store.subscribe(()=>{try{controller.current?.update(store.local(nodeId)??config.state);}catch(error){setError(error.message);}});return ()=>{unsubscribe();controller.current?.dispose();controller.current=null;};},[store,nodeId,JSON.stringify(config)]);
    React.useEffect(()=>{const observer=new MutationObserver(()=>setSmall(frame.current?.dataset.vieSmallText==='true'));observer.observe(frame.current,{attributes:true,attributeFilter:['data-vie-small-text']});return ()=>observer.disconnect();},[]);
    return h('section',{ref:container,className:'vie-generated-figure'+(expanded?' vie-figure-expanded':''),key:nodeId,role:expanded?'dialog':undefined,'aria-modal':expanded?true:undefined,'aria-label':expanded?config.title:undefined},[
      h('header',{key:'head',className:'vie-generated-heading'},[h('h3',{key:'title',title:config.title},config.title),h('div',{className:'vie-figure-actions',key:'actions'},[h('button',{type:'button',key:'expand',ref:expandButton,className:'vie-context-button','aria-expanded':expanded,onClick:toggle},expanded?'收起':'展开'),h('button',{type:'button',key:'zoom',className:'vie-context-button','aria-pressed':zoom,onClick:()=>setZoom(!zoom)},zoom?'适合宽度':'放大'),(config.js?.trim()||Object.keys(config.state??{}).length>0)&&h('button',{type:'button',key:'reset',className:'vie-context-button',onClick:()=>controller.current?.reset()},'复位')])]),
      small&&!zoom&&h('p',{key:'small',className:'vie-figure-hint',role:'status'},'图中文字较小，可展开或放大查看。'),
      h('div',{key:'viewport',className:'vie-figure-viewport',tabIndex:zoom?0:undefined,'aria-label':zoom?'放大图形，可横向滚动查看':undefined},h('iframe',{key:'frame',ref:frame,title:config.title,sandbox:'allow-scripts',referrerPolicy:'no-referrer',allow:"camera 'none'; microphone 'none'; geolocation 'none'; clipboard-read 'none'; clipboard-write 'none'",style:{width:zoom?'max(100%, 800px)':'100%',maxWidth:zoom?'none':'100%',height:config.height+'px',border:0},'data-vie-generated':nodeId})),
      error&&h('p',{key:'error',className:'vie-generated-error',role:'alert'},'交互图运行错误：'+error)
    ]);
  }
  function GenericVisual({kind,config,values={}}){
    const root=React.useRef(null),saved=React.useRef({progress:0,playing:undefined});
    const zoom=React.useRef(1);
    const scope=useSvgScope();
    const [selected,setSelected]=React.useState('');
    let markup='',failure='';
    try{markup=scopeSvgMarkup(makeVisualMarkup(kind,config,selected,values),scope);}catch(error){failure=String(error.message);}
    React.useEffect(()=>{if(kind!=='Animation'||failure)return;const controller=mountVisualAnimation(root.current,config,saved.current);return ()=>{saved.current=controller.snapshot?.()??saved.current;controller.dispose();};},[kind,JSON.stringify(config),markup,failure]);
    const applyZoom=()=>{const svg=root.current?.querySelector('.vie-visual-content>svg');if(!svg||!root.current?.querySelector('[data-vie-zoom]'))return;svg.style.width=(zoom.current*100)+'%';svg.style.minWidth='0';svg.style.maxHeight='none';root.current.querySelector('[data-vie-zoom-value]').textContent=Math.round(zoom.current*100)+'%';};
    React.useEffect(applyZoom,[markup]);
    if(failure)return h('p',{className:'vie-diagnostics',role:'alert'},'视觉规范校验失败：'+failure);
    const select=e=>{const control=e.target?.closest?.('[data-vie-zoom]');if(control){const action=control.dataset.vieZoom;zoom.current=action==='fit'?1:Math.min(3,Math.max(.5,zoom.current*(action==='in'?1.25:.8)));applyZoom();return;}const item=e.target?.closest?.('[data-vie-item]');if(item){setSelected(item.getAttribute('data-vie-item'));}};
    const keySelect=e=>{if(e.key==='Enter'||e.key===' '){const item=e.target?.closest?.('[data-vie-item]');if(item){e.preventDefault();setSelected(item.getAttribute('data-vie-item'));}}};
    return h('div',{ref:root,className:'vie-visual-host',onClick:select,onKeyDown:keySelect,dangerouslySetInnerHTML:{__html:markup}});
  }
  function fmt(x,format='number'){
    if(typeof x!=='number'||!Number.isFinite(x))return '—';
    if(format==='integer')return String(Math.round(x));
    if(format==='percent')return `${Number((x*100).toFixed(2))}%`;
    if(format==='signed')return (x>0?'+':'')+(Number.isInteger(x)?x:x.toFixed(2));
    return Number.isInteger(x)?String(x):x.toFixed(2);
  }
  function nodeView(n, env){
    const p=n.props;const value=(p.bind && Object.hasOwn(env.values,p.bind))?env.values[p.bind]:p.value;
    const ch=n.children.map(child=>nodeView(child,env));
    const child=(tag,props,children)=>h(tag,props,children);
    const cls='vie-'+n.type.toLowerCase();
    switch(n.type){
      case 'Flow':case 'RelationGraph':case 'Timeline':case 'Diagram':case 'Animation':return h(NativeVisualFrame,{key:n.id,title:p.title},h(GenericVisual,{key:n.id,kind:n.type,config:p,values:env.values}));
      case 'Chart':return h(NativeVisualFrame,{key:n.id,title:p.title},h(ChartView,{key:n.id,config:p,nodeId:n.id,store:env.store}));
      case 'GenerativeFigure':return h(FigureView,{key:n.id,config:p,nodeId:n.id,store:env.store});
      case 'InteractiveScene':return h(NativeVisualFrame,{key:n.id,title:p.title||'交互场景'},h(ExperimentView,{key:n.id,config:p,nodeId:n.id,store:env.store}));
      case 'InteractiveLab':return h(NativeVisualFrame,{key:n.id,title:'交互实验'},h(SemanticView,{key:n.id,kind:p.kind,nodeId:n.id,store:env.store}));
      case 'CanTimingLab':return h(NativeVisualFrame,{key:n.id,title:'CAN 采样点'},h(CanView,{key:n.id,config:p,nodeId:n.id,store:env.store}));
      case 'Text':return h('section',{className:cls,key:n.id},[p.title&&h('h3',{key:'t'},core.interpolateText(p.title,env.values)),p.body&&h('p',{key:'b'},core.interpolateText(p.body,env.values))]);
      case 'Column':return h('div',{className:'vie-column',key:n.id},ch);
      case 'Row':return h('div',{className:'vie-row',key:n.id},ch);
      case 'Split':return h('div',{className:'vie-split',key:n.id,style:{'--vie-split-ratio':String((p.ratio??0.5)*100)+'%'}},ch);
      case 'Card':return h('section',{className:'vie-card',key:n.id},[p.title&&h('div',{key:'t',className:'vie-card-title'},core.interpolateText(p.title,env.values)),...ch]);
      case 'Divider':return h('hr',{className:'vie-divider',key:n.id});
      case 'Badge':return h('span',{className:'vie-badge',key:n.id},p.label??p.title??'');
      case 'Metric':return h('section',{className:'vie-metric',key:n.id},[
        h('small',{key:'l'},p.label??''),h('strong',{key:'v'},fmt(value,p.format)+(p.unit?' '+p.unit:''))
      ]);
      case 'Slider':case 'NumberInput':case 'Toggle':case 'SegmentedControl':{
        const lower=p.min??0,upper=p.max??100,active=Number.isFinite(value)?value:lower;
        const label=h('span',{className:'vie-control-label',key:'label'},[h('span',{key:'a'},p.label??''),h('b',{key:'b'},(n.type==='Toggle'?(active?'开':'关'):n.type==='SegmentedControl'?(p.options.find(o=>o.value===active)?.label??fmt(active)):fmt(active,p.format))+(p.unit?' '+p.unit:''))]);
        if(n.type==='SegmentedControl')return h('section',{className:'vie-control',key:n.id},[label,h('div',{key:'choices',className:'vie-segmented',role:'group','aria-label':p.label},p.options.map(o=>h('button',{key:o.value,type:'button','aria-pressed':active===o.value,onClick:()=>env.set(p.bind,o.value)},o.label)))]);
        return h('label',{className:'vie-control',key:n.id},[label,h('input',{key:'input',type:n.type==='Toggle'?'checkbox':n.type==='NumberInput'?'number':'range',...(n.type==='Toggle'?{checked:active===1,role:'switch'}:{min:lower,max:upper,step:p.step??1,value:active}),onChange:e=>{if(n.type==='NumberInput'&&(!e.target.value||!e.target.validity.valid))return;env.set(p.bind,n.type==='Toggle'?(e.target.checked?1:0):Number(e.target.value));},'aria-label':p.label??n.id})]);
      }
      case 'Progress':{
        let v=Number.isFinite(value)?value:null;
        if(p.expr){try{v=core.derivedValue(p.expr,env.values);}catch{v=null;}}
        const min=p.min??0,max=p.max??100;
        const valid=Number.isFinite(v)&&max>min;
        const amount=valid?Math.max(0,Math.min(100,(v-min)/(max-min)*100)):0;
        const readable=valid?`${fmt(v,p.format)}${p.unit?' '+p.unit:''} · ${fmt(amount)}%`:'—';
        return h('section',{key:n.id,className:'vie-progress'},[
          h('div',{className:'vie-control-label',key:'label'},[h('span',{key:'a'},p.label??''),h('b',{key:'b'},readable)]),
          h('div',{className:'vie-track',key:'track',role:'progressbar','aria-label':p.label??n.id,
            'aria-valuemin':min,'aria-valuemax':max,...(valid?{'aria-valuenow':v}:{}),'aria-valuetext':readable},
            h('div',{className:'vie-track-fill',style:{width:amount+'%'}}))
        ]);
      }
      case 'Button':return h('button',{className:'vie-button',key:n.id,type:'button',onClick:()=>{
        if(p.action==='reset'&&p.target)env.reset(p.target);
        if(p.action==='set'&&p.target&&p.setValue!==undefined)env.set(p.target,p.setValue);
      }},p.label??'按钮');
      case 'BarChart':return h(BarChartView,{key:n.id,config:p,nodeId:n.id,store:env.store,values:env.values});
      case 'MotionScene':{
        const distance=Number.isFinite(value)?value:0;
        const lo=Number.isFinite(p.min)?p.min:0,hi=Number.isFinite(p.max)?p.max:400;
        const portion=hi>lo?Math.max(0,Math.min(1,(distance-lo)/(hi-lo))):0;
        const cx=60+portion*508;
        return h('section',{className:'vie-motion',key:n.id},[
          h('div',{className:'vie-motion-header',key:'head'},[
            h('span',{key:'title'},p.title??'运动距离'),h('strong',{key:'value'},`${fmt(distance)} ${p.unit??''}`)
          ]),
          h('svg',{viewBox:'0 0 628 142',role:'img','aria-label':`小汽车从起点行驶 ${fmt(distance)} ${p.unit??''}`,key:'svg'},[
            h('rect',{key:'road',x:19,y:111,width:590,height:13,rx:6.5,fill:'var(--vie-layer)'}),
            ...[0,1,2,3,4,5,6,7,8,9,10].map(i=>h('line',{key:'lane'+i,x1:31+i*55,y1:117,x2:52+i*55,y2:117,stroke:'#c2cbd4',strokeWidth:2.2,strokeLinecap:'round'})),
            h('path',{key:'trail',d:`M60 106H${cx}`,fill:'none',stroke:'#5a92f3',strokeWidth:3,strokeLinecap:'round'}),
            h('circle',{key:'origin',cx:60,cy:106,r:4.5,fill:'#617891'}),
            h('g',{key:'car',transform:`translate(${cx-32} 0)`,className:'vie-car',children:[
              h('path',{key:'cabin',d:'M9 82 L19 65 Q22 61 27 61 H43 Q47 61 50 65 L58 82Z',fill:'#8fc1fa'}),
              h('path',{key:'window',d:'M23 66H32V81H13L20 68Q21 66 23 66ZM36 66H43Q45 66 46 68L53 81H36Z',fill:'#e5f4ff'}),
              h('rect',{key:'body',x:0,y:80,width:65,height:25,rx:9,fill:'#397be6'}),
              h('rect',{key:'stripe',x:5,y:85,width:50,height:2.5,rx:1.25,fill:'#8bb9ff'}),
              h('rect',{key:'light',x:59,y:88,width:8,height:9,rx:3,fill:'#f5cb61'}),
              h('circle',{key:'wheel1',cx:15,cy:105,r:9,fill:'#25374f'}),
              h('circle',{key:'wheel2',cx:51,cy:105,r:9,fill:'#25374f'}),
              h('circle',{key:'hub1',cx:15,cy:105,r:4,fill:'#c8d7e8'}),
              h('circle',{key:'hub2',cx:51,cy:105,r:4,fill:'#c8d7e8'})
            ]}),
            h('text',{key:'originLabel',x:19,y:138},`${fmt(lo)} ${p.unit??''}`),
            h('text',{key:'endLabel',x:609,y:138,textAnchor:'end'},`${fmt(hi)} ${p.unit??''}`)
          ])
        ]);
      }
      case 'FunctionPlot':return h(FunctionPlotView,{key:n.id,config:p,values:env.values});
      default:return null;
    }
  }
  function FunctionPlotView({config:p,values}){
    const scope=useSvgScope();
    const variables=Object.fromEntries(Object.entries(values).filter(([k,v])=>typeof v==='number').map(([k,v])=>[k.split('/').at(-1),v]));
    const visual=cachedFunctionPlot(p.expr??'x',variables,{...p,sampleX:typeof p.sampleX==='string'?values[p.sampleX]:p.sampleX});
    return h('section',{className:'vie-chart vie-function-plot'},[
      p.title&&h('div',{className:'vie-chart-title',key:'title'},p.title),
      h('div',{key:'image',className:'vie-chart-drawing',dangerouslySetInnerHTML:{__html:scopeSvgMarkup(visual.svg,scope)}}),
      h('div',{key:'info',className:'vie-chart-note','data-plot-info':true},visual.info)
    ]);
  }
  function BarChartView({config,values={}}){
    const [selected,setSelected]=React.useState(0);
    const unavailable=config.data.map((v,i)=>typeof v==='string'&&!Number.isFinite(values[v])?i:-1).filter(i=>i>=0);
    // Missing bindings are displayed explicitly. Zero-height placeholders are NOT measurements.
    const safeData=config.data.map(v=>typeof v==='string'?(Number.isFinite(values[v])?values[v]:0):v);
    let visual;try{visual=barChartSVG({...config,data:safeData,unavailableIndices:unavailable,sourceLabel:unavailable.length?'部分数值未就绪，空柱仅为占位（不计为测量值）':config.sourceLabel,showAverage:unavailable.length?false:config.showAverage},selected);}catch(error){return h('p',{className:'vie-chart-note'},'数据暂不可用：'+String(error.message));}
    const act=e=>{const target=e.target?.closest?.('[data-bar-index]');if(!target)return;setSelected(Number(target.getAttribute('data-bar-index')));};
    const keyAct=e=>{if(e.key==='Enter'||e.key===' '){const target=e.target?.closest?.('[data-bar-index]');if(target){e.preventDefault();setSelected(Number(target.getAttribute('data-bar-index')));}}};
    return h('section',{className:'vie-chart vie-bar-chart'},[
      h('div',{className:'vie-chart-title',key:'title'},visual.title),
      h('div',{className:'vie-chart-drawing',key:'svg',onClick:act,onKeyDown:keyAct,dangerouslySetInnerHTML:{__html:visual.svg}}),
      h('div',{className:'vie-chart-note',key:'summary','data-chart-selection':true,role:unavailable.length?'status':undefined},unavailable.length?`等待有效数据：${unavailable.map(i=>config.labels[i]).join('、')}`:visual.selected),
      h('div',{className:'vie-chart-footer',key:'footer'},[
        config.showAverage!==false&&!unavailable.length&&h('span',{key:'average'},`平均值 ${fmt(visual.average)} ${visual.unit}`),
        h('span',{key:'source'},visual.sourceLabel)
      ]),
      h('details',{className:'vie-raw-data',key:'raw'},[
        h('summary',{key:'summary'},`查看原始数据（${visual.data.length} 条）`),
        h('div',{className:'vie-data-table',key:'table'},visual.labels.map((label,i)=>h('div',{key:i},[h('span',{key:'name'},label),h('strong',{key:'val'},unavailable.includes(i)?'— 等待有效数据':`${fmt(visual.data[i])} ${visual.unit}`)])))
      ])
    ]);
  }
  function Scene({source='',title='Visual Interactive Engine · 交互画面',callId='local',inputActions=null}){
    const [copyStatus,setCopyStatus]=React.useState('');
    const storeRef=React.useRef(null);
    if(storeRef.current===null)storeRef.current=core.getSceneStore?core.getSceneStore(callId,source):new core.SceneStore(source);
    const store=storeRef.current;
    // External store subscription produces an immutable revision signal. The
    // renderer never mutates parser state while React is rendering.
    const subscribe=React.useCallback(callback=>store.subscribe(callback),[store]);
    const getVersion=React.useCallback(()=>store.getVersion(),[store]);
    React.useSyncExternalStore(subscribe,getVersion,()=>0);
    React.useLayoutEffect(()=>{
      try{store.updateSource(source);}catch(error){console.warn('[VIE] invalid streamed source',error);}
    },[store,source]);
    const env={...store.snapshot(),store,
      set:(path,value)=>{try{store.set(path,value);}catch(e){console.warn('[VIE] invalid input',e);}},
      reset:path=>{try{store.reset(path);}catch(e){console.warn('[VIE] invalid reset',e);}}
    };
    return h('div',{className:'vie-shell','data-vie-surface':callId},[
      h('div',{className:'vie-body'+(['story-scene','document-scene'].includes(env.id)?' vie-body--article':''),key:'body'},[
        env.tree.length?env.tree.map(n=>nodeView(n,env)):h('div',{className:'vie-empty',key:'empty'},
          env.errors.length?'无法呈现该界面，请检查诊断信息。':'正在生成界面…'),
        (store.parser.modified.size||Object.keys(store.localState).length||Object.keys(store.figureErrors).length)?h('div',{key:'context',className:'vie-context-row'},[
          inputActions?.insertText&&h('button',{key:'insert',type:'button',className:'vie-context-button',onClick:()=>{const text='请结合当前交互参数继续解释：'+JSON.stringify(store.context());try{const applied=inputActions.insertText(text,inputActions.captureInsertion());setCopyStatus(applied?'参数已放入提问框，可补充问题后发送':'提问框已变化，请重试');}catch{setCopyStatus('暂时无法插入，请复制当前参数');}}},'带参数继续提问'),
          h('button',{key:'copy',type:'button',className:'vie-context-button',onClick:async()=>{
            const summary=JSON.stringify(store.context());
            try{
              if(typeof navigator==='undefined'||!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');
              await navigator.clipboard.writeText('当前交互场景状态：'+summary);
              setCopyStatus('已复制，可粘贴给 AI');
            }catch{setCopyStatus('复制失败，请使用浏览器的复制功能');}
          }},'复制当前参数'),
          copyStatus&&h('span',{key:'status',role:'status'},copyStatus)
        ]):null,
        env.diagnostics?.length?h('div',{key:'runtime',className:'vie-runtime-diagnostics',role:'status'},env.diagnostics.slice(0,3).map(d=>h('p',{key:d.path},`计算暂不可用 ${d.path} (${d.code})：${d.message}`))):null,
        env.errors.length?h('details',{key:'errors',className:'vie-diagnostics'},[
          h('summary',{key:'s'},`诊断信息 (${env.errors.length})`),
          h('pre',{key:'p'},env.errors.slice(0,8).join('\n'))]):null
      ])
    ]);
  }
  return Scene;
}

/**
 * VIE's Tool View is an in-progress preview. When a Turn settles, DSH's
 * conversation.chat.turnTail renders the durable tool-result scene outside
 * the collapsible work-process area.
 */
const name='dsh-Visual-Interactive-Engine';
const inject=['slots','uiConversation'];

function createViews(React,bridge){
  const View=makeReactView(React,{VIEStream,SceneStore,evaluate,derivedValue,interpolateText,getSceneStore:(key,source)=>bridge.getStore(key,source)});

  function VIEToolView(props){
    const raw=typeof props.useToolCallArgumentsPartial==='function'?props.useToolCallArgumentsPartial():'';
    const staticRaw=props.block?.argsRaw??props.block?.call?.argsRaw??'';
    const argsRaw=raw.length>=staticRaw.length?raw:staticRaw;
    const decoderRef=React.useRef(null);
    if(decoderRef.current===null)decoderRef.current=new IncrementalToolArguments({fields:['source','preset','kind','spec','document','query','templateId','parameters','caption','placement']});
    const legacyDecoder=decoderRef.current;
    // Current DSH observes lazy PartialArguments queries during every render.
    // Older hosts remain supported by the cumulative raw decoder.
    const partial=props.block?.args;
    let decoder=legacyDecoder,fields;
    if(partial&&typeof partial.text==='function'){
      fields=Object.create(null);const completeArgs={};
      for(const key of ['title','source','preset','kind','spec','document','query','templateId','parameters','caption','placement','dataset','state','derive']){
        const value=partial.text(key);if(typeof value==='string'){fields[key]=value;if(partial.complete(key))completeArgs[key]=value;}
      }
      for(const key of ['speed','time','a','clockMHz','prescaler','bs1','bs2','compareBs1','compareBs2','sjw']){const value=partial.value(key);if(value!==undefined)completeArgs[key]=value;}
      const document=partial.value('document');if(document&&typeof document==='object'){fields.document=JSON.stringify(document);if(partial.complete('document'))completeArgs.document=document;}
      decoder={completedObject:()=>partial.closed()?completeArgs:null};
    }else fields=legacyDecoder.update(argsRaw);
    const documentPreview=React.useRef(null);if(documentPreview.current===null)documentPreview.current=new DocumentPreview();
    const preview=fields.source??'';
    const preset=fields.preset??'';
    const kind=fields.kind??'';
    const presetCache=React.useRef({key:'',source:''});
    let fastSource=(fields.document??fields.spec)?documentPreview.current.update(fields.document??fields.spec):'';
    if(['motion','quadratic','data','can',...Object.keys(SEMANTIC_LABS)].includes(preset)){
      try {
        const args=decoder.completedObject(),config={};
        if(args){
          for(const field of ['speed','time','a','clockMHz','prescaler','bs1','bs2','compareBs1','compareBs2','sjw'])
            if(args[field]!==undefined)config[field]=args[field];
          if(preset==='data'&&typeof args.dataset==='string'&&args.dataset.length<=1200)
            Object.assign(config,JSON.parse(args.dataset));
        }
        const cacheKey=preset+'|'+JSON.stringify(config);
        if(presetCache.current.key!==cacheKey) presetCache.current={key:cacheKey,source:makePresetSource(preset,config)};
        fastSource=presetCache.current.source;
      }catch{
        try{
          const key=preset+'|{}';
          if(presetCache.current.key!==key)presetCache.current={key,source:makePresetSource(preset)};
          fastSource=presetCache.current.source;
        }catch{}
      }
    }
    if(!kind){try{const args=decoder.completedObject();if(args?.spec&&!args?.kind){const spec=JSON.parse(args.spec);fastSource=spec.blocks?documentSceneSource(spec):storySceneSource(spec);}}catch{}}
    if(VISUAL_KINDS.includes(kind)){
      try{const args=decoder.completedObject();if(args?.spec){fastSource=visualSceneSource(kind,JSON.parse(args.spec),{state:args.state===undefined?{}:JSON.parse(args.state),derive:args.derive===undefined?{}:JSON.parse(args.derive)});}}catch{}
    }
    // The unified router reuses the same validated source factory as the Host.
    // Never preview arbitrary JSON as graphics; await a fully valid arguments object.
    try{
      const args=decoder.completedObject();
      if(args&&typeof args.query==='string'){
        const route=routeTemplate(args.query);
        const id=args.templateId||(route.status==='matched'?route.id:null);
        if(id){
          const parameters=args.parameters===undefined?{}:JSON.parse(args.parameters);
          const spec=args.spec===undefined?undefined:JSON.parse(args.spec);
          fastSource=buildTemplateScene({templateId:id,parameters,spec}).source;
        }
      }
    }catch{}
    const meta=props.block?.meta??props.block?.result?.meta??props.block?.call?.meta;
    const settled=props.phase==='result'&&meta?.kind==='vie';
    const key=bridge.sceneKey(props.sessionId,props.callId);
    const subscribe=React.useCallback(cb=>bridge.subscribe(cb),[bridge]);
    const isShown=React.useCallback(()=>bridge.isShown(key),[bridge,key]);
    const published=React.useSyncExternalStore(subscribe,isShown,()=>false);
    if(published){
      return React.createElement('span',{className:'vie-published-marker',role:'status'},'交互界面已在回答中显示');
    }
    if(settled&&meta.valid===false){
      return React.createElement('div',{className:'vie-error',role:'alert'},[
        React.createElement('strong',{key:'title'},'界面校验未通过'),
        React.createElement('details',{key:'details'},[
          React.createElement('summary',{key:'summary'},'查看错误原因'),
          React.createElement('pre',{key:'errors'},(Array.isArray(meta.errors)?meta.errors.slice(0,8):[meta.error||'未提供诊断']).join('\n'))
        ])
      ]);
    }
    const source=settled?(meta.source??''):(fastSource||preview);
    const caption=settled?meta?.caption:(decoder.completedObject()?.caption??'');
    const visual=React.createElement(View,{key,source,title:settled?meta.title:'Visual Interactive Engine · 交互画面',callId:key,inputActions:props.inputActions});
    if(typeof caption!=='string'||!caption.trim())return visual;
    return React.createElement('div',{className:'vie-annotated-surface','data-vie-surface':true},
      visual,React.createElement('p',{className:'vie-figure-caption'},caption.slice(0,140))); 
  }

  function VIETurnTailView(props){
    // This DSH version uses a LIST slot: read the Turn projection from props.turn.
    // Retain matched as a forward-compatibility fallback for chain owners.
    const source=props.turn?.data?.source?.(VIE_TURN_KIND);
    const subscribe=React.useCallback(callback=>source?.subscribe(callback)??(()=>{}),[source]);
    const read=React.useCallback(()=>source?.getSnapshot()??selectVIETurnTail(props),[source,props.turn?.data]);
    const projected=React.useSyncExternalStore(subscribe,read,()=>null);
    const scenes=(props.matched?.items??projected?.items??[]).filter(item=>item.placement!=='process');
    // The owner supplies the session binding; never leak a scene across sessions.
    const sessionId=props.sessionId;
    const keys=scenes.map(item=>bridge.sceneKey(sessionId,item.callId));
    const keysToken=keys.join('\u0001');
    React.useEffect(()=>{
      for(const key of keys)bridge.show(key);
      return ()=>{for(const key of keys)bridge.hide(key);};
    },[keysToken]);
    if(scenes.length===0)return null;
    return React.createElement('section',{className:'vie-tail','data-vie-turn-tail':true},scenes.map(item=>
      React.createElement('div',{className:'vie-tail-item',key:item.callId},[
        React.createElement('div',{key:'label',className:'vie-tail-label'},item.title),
        React.createElement(View,{key:'scene',source:item.source,title:item.title,callId:bridge.sceneKey(sessionId,item.callId),inputActions:props.inputActions}),
        item.caption?React.createElement('p',{key:'caption',className:'vie-figure-caption'},item.caption):null
      ])
    ));
  }
  function VIEAnswerView(props){
    const items=props.node?.data?.items??[],signature=items.map(x=>x.callId+':'+(x.latestCallId??'')).join('|');
    React.useEffect(()=>{const keys=items.flatMap(x=>[bridge.sceneKey(props.sessionId,x.callId),...x.latestCallId?[bridge.sceneKey(props.sessionId,x.latestCallId)]:[]]);keys.forEach(k=>bridge.show(k));return ()=>keys.forEach(k=>bridge.hide(k));},[props.sessionId,signature]);
    return React.createElement('section',{className:'vie-answer','data-vie-answer':true},items.map(item=>React.createElement('div',{key:item.callId,'data-vie-answer-item':item.callId},[
      item.source?React.createElement(View,{key:'view',source:item.source,title:item.title,callId:bridge.sceneKey(props.sessionId,item.callId),inputActions:props.inputActions}):null,
      item.pending?React.createElement('p',{key:'pending',className:'vie-generation-status',role:'status'},item.source?'图解已可操作，正在补充解释…':'正在生成图解…'):null,
      item.interrupted?React.createElement('p',{key:'partial',role:'status'},'本次生成已停止；已完成的内容保留。'):null,
      item.repairError?React.createElement('p',{key:'repair-error',className:'vie-error',role:'alert'},'修订失败，已保留原图：'+item.repairError):null,
      item.error?React.createElement('p',{key:'error',className:'vie-error',role:'alert'},item.error):null,
      item.caption?React.createElement('p',{key:'caption',className:'vie-figure-caption'},item.caption):null
    ])));
  }
  return {VIEToolView,VIETurnTailView,VIEAnswerView};
}

function makeView(React){
  return createViews(React,createVIEBridge(SceneStore)).VIEToolView;
}

function apply(ctx){
  if(typeof document!=='undefined'&&!document.getElementById('vie-v0250-theme')){
    const st=document.createElement('style');st.id='vie-v0250-theme';st.textContent=VIE_CSS;document.head.appendChild(st);
  }
  const ModeControl=createVIEModeView(require('react'),require('react-dom'));
  // Cordis requires the namespace as well as its command capability. Keeping
  // both in this scope also unloads the control when either service disconnects.
  ctx.inject?.(['sessions','remote','remote.commands'],child=>child.slots.inject('conversation.input.activity',()=>child.slots.register({name:'conversation.input.activity',inject:sessionId=>({flip:async mode=>{const result=await child.remote.commands.execute(sessionId,'/vie '+mode,[]);if(!result.ok)throw Error(result.error?.message??'切换失败');if(result.value===undefined)throw Error('当前宿主未注册 /vie 命令');if(result.value.result?.kind==='error')throw Error(result.value.result.text);}})},ModeControl)));
  const bridge=createVIEBridge(SceneStore);
  const {VIEToolView,VIETurnTailView,VIEAnswerView}=createViews(require('react'),bridge);
  // Register the durable Turn projection before subscribing the tail seat.
  ctx.uiConversation.events.register(createVIETurnDefinition());
  ctx.uiConversation.events.register(createVIEAnswerDefinition());
  ctx.uiConversation.events.register(createVIEFlowDefinition());
  ctx.uiConversation.events.register(createVIEProseDefinition());
  ctx.slots.inject('conversation.chat.node',()=>ctx.slots.register({name:'conversation.chat.node',key:VIE_ANSWER_KIND},VIEAnswerView));
  ctx.slots.inject('conversation.chat.node',()=>ctx.slots.register({name:'conversation.chat.node',key:VIE_FLOW_KIND},VIEAnswerView));
  ctx.slots.inject('tool.call.toolview',()=>{
    const registrations=['vie_explain','vie_quick','vie_render','vie_compose','vie_story','vie_auto'].map(key=>ctx.slots.register({name:'tool.call.toolview',key},VIEToolView));
    return ()=>registrations.forEach(fn=>{if(typeof fn==='function')fn();});
  });
  ctx.slots.inject('conversation.chat.turnTail',()=>ctx.slots.register({
    name:'conversation.chat.turnTail',
    id:'dsh-vie',
    order:20,
  },VIETurnTailView));
  // Diagnostic only: if the browser's module was never materialized, this
  // marker will be absent. No HMR rewriting or unverified bootstrap hack.
  if(typeof window!=='undefined')window.__VIE_CLIENT_STATUS__={version:'0.29.0',activated:true,at:Date.now()};
}

exports.name=name;exports.inject=inject;exports.apply=apply;return module.exports;
}});
