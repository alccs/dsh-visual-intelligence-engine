/* VIE v0.30.6-dev.1 — DSH browser entry. Generated includes are resolved by build.mjs. */
window.__ModuleLoader__.load({id:'dsh-visual-interactive-engine',factory:(require)=>{
 const module={exports:{}};const exports=module.exports;
 const VIE_CSS="/* VIE 0.5 • content-first inline teaching widgets.\n   All rules are scoped to .vie-shell so DSH native chat stays untouched. */\n.vie-shell {\n  --vie-ink:var(--dsw-alias-text-primary,#222326);\n  --vie-muted:var(--dsw-alias-text-secondary,#777980);\n  --vie-stroke:var(--dsw-alias-border-l2,#e7e7e9);\n  --vie-layer:var(--dsw-alias-background-secondary,#f6f6f7);\n  --vie-bg:var(--dsw-alias-background-primary,#fff);\n  --vie-blue:#4088d0; --vie-green:#419d7d; --vie-amber:#c99f45;\n  --vie-color:#4088d0;\n  box-sizing:border-box; width:100%; min-width:0; max-width:100%; margin:6px 0 12px;\n  font-family:ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",sans-serif;\n  font-size:14px; line-height:1.55; color:var(--vie-ink); background:transparent;\n}\n.vie-shell *, .vie-shell *::before, .vie-shell *::after {box-sizing:border-box}\n.vie-body {display:flex;flex-direction:column;gap:14px;padding:17px 19px;border:1px solid var(--vie-stroke);border-radius:17px;background:var(--vie-bg)}\n.vie-body > [data-id],.vie-body > section {min-width:0}\n.vie-text h3 {font-weight:620;font-size:16px;line-height:1.4;margin:0 0 3px;letter-spacing:-.025em}\n.vie-text p {margin:0;color:var(--vie-muted);font-size:13px;line-height:1.6}\n.vie-row {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}\n.vie-column {display:flex;flex-direction:column;gap:9px;min-width:0}\n.vie-card {min-width:0;display:flex;flex-direction:column;gap:10px}\n.vie-card-title {font-size:12px;font-weight:600}\n.vie-divider {border:none;border-top:1px solid var(--vie-stroke);margin:1px 0}\n.vie-control {display:flex;flex-direction:column;gap:6px;min-width:0}\n.vie-control-label {display:flex;align-items:center;justify-content:space-between;gap:9px;font-size:13px;color:var(--vie-muted);font-variant-numeric:tabular-nums}\n.vie-control-label b {font-size:13px;color:var(--vie-ink);font-weight:620;white-space:nowrap}\n.vie-metric {display:flex;flex-direction:row;justify-content:space-between;gap:12px;align-items:baseline;min-width:0}\n.vie-metric small {color:var(--vie-muted);font-size:12px}\n.vie-metric strong {font-weight:680;font-size:20px;letter-spacing:-.03em;font-variant-numeric:tabular-nums}\n.vie-badge {font-size:11px;padding:2px 7px;border:1px solid var(--vie-stroke);border-radius:999px;color:var(--vie-muted);width:max-content}\n.vie-shell button.vie-button,.vie-shell button.vie-pill {border:1px solid var(--vie-stroke);border-radius:999px;padding:5px 11px;min-height:32px;display:inline-flex;align-items:center;justify-content:center;gap:5px;background:transparent;color:var(--vie-ink);font:inherit;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:background .12s,border-color .12s,transform .1s}\n.vie-shell button.vie-button:hover,.vie-shell button.vie-pill:hover{background:var(--vie-layer);border-color:#d8d8db}\n.vie-shell button.vie-button:active,.vie-shell button.vie-pill:active{transform:scale(.985)}\n.vie-shell button:focus-visible,.vie-shell input:focus-visible,.vie-shell summary:focus-visible {outline:2px solid var(--vie-blue);outline-offset:3px}\n.vie-chart {min-width:0;display:flex;flex-direction:column;gap:5px}\n.vie-chart-title {font-weight:580;font-size:13px;color:var(--vie-muted)}\n.vie-chart svg {display:block;width:100%;height:auto;max-height:184px}\n.vie-chart text,.vie-motion text{font:10.5px ui-sans-serif,system-ui;fill:var(--vie-muted)}\n.vie-motion {min-width:0}\n.vie-motion-header {display:flex;justify-content:space-between;gap:10px;align-items:center;margin:0;color:var(--vie-muted);font-size:12px}\n.vie-motion-header strong{color:var(--vie-ink);font-weight:620}\n.vie-motion svg{display:block;width:100%;height:auto;max-height:156px}\n.vie-motion .vie-car{transition:transform .2s ease-out}\n.vie-progress{display:flex;flex-direction:column;gap:7px}\n.vie-track{height:5px;border-radius:999px;overflow:hidden;background:var(--vie-layer)}\n.vie-track-fill{height:100%;background:var(--vie-color);border-radius:999px;transition:width .15s}\n.vie-empty{font-size:12px;color:var(--vie-muted);padding:14px;text-align:center}\n.vie-diagnostics{font-size:11px;color:#9d6c36}.vie-diagnostics pre{overflow-wrap:anywhere;white-space:pre-wrap}\n/* Knowledge component: readable, one visual focus, quiet controls. */\n.vie-canlab{color:var(--vie-ink);min-width:0;width:100%;font-variant-numeric:tabular-nums}\n.vie-can-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 15px}\n.vie-can-head h3{font-size:16px;line-height:1.4;font-weight:610;letter-spacing:-.018em;margin:0}\n.vie-can-head .vie-can-reset{height:32px;min-height:32px;padding:3px 12px}\n.vie-can-tabs{display:grid;grid-template-columns:1fr 1fr;gap:3px;background:var(--vie-layer);border-radius:999px;padding:3px;margin:0 0 17px}\n.vie-shell .vie-can-tabs button.vie-can-tab{appearance:none;background:transparent;border:0;border-radius:999px;padding:6px 9px;min-width:0;min-height:30px;font:inherit;font-size:13px;line-height:1.3;cursor:pointer;color:var(--vie-muted);transition:background .16s,box-shadow .16s,color .16s}\n.vie-shell .vie-can-tabs button.vie-can-tab.active{color:var(--vie-ink);font-weight:610;background:var(--vie-bg);box-shadow:0 1px 3px #00000010}\n.vie-shell .vie-can-tabs button.vie-can-tab:hover:not(.active){background:color-mix(in srgb,var(--vie-bg) 45%,transparent)}\n.vie-can-segments{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:0 0 13px}\n.vie-can-segments>div{min-width:0;display:flex;flex-direction:column;gap:2px}\n.vie-can-segments span{font-size:12px;color:var(--vie-muted)}\n.vie-can-segments strong{font-size:18px;font-weight:660;line-height:1.35;letter-spacing:-.025em}\n.vie-can-timeline{position:relative;margin:0 0 17px}\n.vie-can-track{display:flex;overflow:hidden;width:100%;height:42px;border-radius:6px;user-select:none}\n.vie-can-seg{display:flex;align-items:center;justify-content:center;min-width:0;color:white;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;border-right:2px solid var(--vie-bg);transition:flex-grow .17s ease}\n.vie-can-seg.sync{background:#528ac4}.vie-can-seg.before{background:#3da080}.vie-can-seg.after{background:#c9a047;border-right:0}\n.vie-can-sp-indicator{position:absolute;top:41px;left:83.33%;transform:translateX(-50%);font-size:17px;line-height:17px;width:22px;text-align:center;color:#3984da;transition:left .17s;pointer-events:none}\n.vie-can-grab{position:absolute;top:3px;height:42px;width:26px;left:83.33%;transform:translateX(-50%);cursor:ew-resize;touch-action:none;z-index:2;outline-offset:4px;border-radius:8px}\n.vie-can-grab::before{content:'';display:block;position:absolute;top:-1px;left:50%;height:44px;width:2px;transform:translateX(-50%);background:#ffffffbb;box-shadow:0 0 0 1px #00000006;opacity:.85}\n.vie-can-grab:hover::after,.vie-can-grab:focus-visible::after{content:'';display:block;position:absolute;top:15px;left:50%;height:13px;width:7px;transform:translateX(-50%);border-radius:4px;background:#fff;box-shadow:0 1px 5px #0003}\n.vie-can-axis{display:flex;align-items:center;justify-content:space-between;position:relative;height:28px;padding-top:9px;color:var(--vie-muted);font-size:11.5px}\n.vie-can-axis strong{font-size:12px;color:#3984da;font-weight:570}\n.vie-can-metrics{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:0 0 13px}\n.vie-can-metrics>div{min-width:0}.vie-can-metrics span{display:block;color:var(--vie-muted);font-size:12px;margin-bottom:1px}\n.vie-can-metrics strong{display:block;font-size:23px;font-weight:660;letter-spacing:-.028em;line-height:1.4}\n.vie-can-guidance{font-size:13px;line-height:1.62;color:var(--vie-ink);margin:5px 0 8px}\n.vie-can-message{font-size:12px;line-height:1.5;color:#9a6b26;margin:4px 0}.vie-can-message:empty{display:none}\n.vie-can-footer{display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid var(--vie-stroke);padding-top:9px}\n.vie-can-more{min-width:0;flex:1}.vie-can-more summary{width:max-content;list-style:none;display:inline-flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;color:var(--vie-muted);padding:4px 2px}\n.vie-can-more summary::-webkit-details-marker{display:none}.vie-can-more[open] summary span{transform:rotate(180deg)}\n.vie-can-more summary span{font-size:12px;display:inline-block;transition:transform .14s}\n.vie-can-extra-body{display:flex;flex-direction:column;gap:13px;padding:13px 0 4px}\n.vie-can-inputs{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:0 0 3px}\n.vie-can-inputs label{display:flex;flex-direction:column;gap:8px;min-width:0}\n.vie-can-inputs label>span{display:flex;justify-content:space-between;gap:6px;font-size:13px;color:var(--vie-muted)}\n.vie-can-inputs b{color:var(--vie-ink);font-weight:610}\n.vie-can-lock{font-size:12px;display:flex;align-items:center;gap:7px;color:var(--vie-muted)}\n.vie-can-lock input{width:15px;height:15px;margin:0;accent-color:var(--vie-blue)}\n.vie-can-advanced{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}\n.vie-can-advanced label{display:flex;flex-direction:column;min-width:0;gap:5px;font-size:12px;color:var(--vie-muted)}\n.vie-can-advanced input{width:100%;min-width:0;border:1px solid var(--vie-stroke);border-radius:9px;height:34px;padding:4px 9px;background:var(--vie-bg);color:var(--vie-ink);font:inherit;font-size:13px}\n.vie-can-presets{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.vie-can-presets>span{font-size:12px;color:var(--vie-muted);margin-right:5px}\n.vie-can-extra-values{display:flex;flex-wrap:wrap;gap:8px;font-size:12px;color:var(--vie-muted)}.vie-can-extra-values strong{color:var(--vie-ink);font-weight:600}\n.vie-can-compare{border-top:1px solid var(--vie-stroke);padding-top:11px}.vie-can-compare>strong{font-size:13px;font-weight:610}\n.vie-can-compare-lines{display:grid;gap:8px;margin:10px 0}.vie-can-compare-lines>div{display:grid;grid-template-columns:16px 1fr 70px;gap:9px;align-items:center;color:var(--vie-muted);font-size:12px}\n.vie-can-compare-lines b{text-align:right;color:var(--vie-ink);font-weight:600}.vie-can-mini{height:5px;border-radius:99px;background:var(--vie-layer);overflow:hidden}\n.vie-can-mini i{display:block;height:100%;background:var(--vie-blue)}.vie-can-compare-lines>div:nth-child(2) i{background:var(--vie-green)}\n.vie-can-compare p,.vie-can-formula{font-size:12px;color:var(--vie-muted);line-height:1.6;margin:6px 0}\n.vie-can-explanation{margin-top:11px;padding:10px 12px;background:var(--vie-layer);border-radius:9px;line-height:1.65;color:var(--vie-ink);font-size:13px}.vie-can-explanation[hidden]{display:none}\n.vie-shell .vie-can-why{display:inline-flex;gap:6px}\n@media(max-width:580px){.vie-body{padding:14px 14px;gap:12px}.vie-can-head{margin-bottom:12px}.vie-can-segments{gap:8px}.vie-can-segments strong{font-size:16px}.vie-can-tabs{margin-bottom:13px}.vie-can-track{height:38px}.vie-can-grab{height:39px}.vie-can-sp-indicator{top:37px}.vie-can-metrics strong{font-size:21px}.vie-can-inputs{gap:12px}.vie-can-advanced{gap:6px}.vie-can-advanced label{font-size:11px}.vie-can-guidance{font-size:12.5px}}\n@media(prefers-color-scheme:dark){.vie-shell{--vie-ink:#f2f2f3;--vie-muted:#b5b5bc;--vie-stroke:#454549;--vie-layer:#313134;--vie-bg:#242426;--vie-blue:#78aaec;--vie-green:#479c80;--vie-amber:#b79045}.vie-can-seg{color:#fff}.vie-can-tab.active{background:#444448}}\n@media(prefers-reduced-motion:reduce){.vie-shell *, .vie-shell *::before,.vie-shell *::after{transition:none!important;animation:none!important}}\n\n/* VIE 0.8: legible coordinate plots and evidence-bearing data charts. */\n.vie-chart {gap:4px}\n.vie-chart-title{font-size:13px;font-weight:600;color:var(--vie-ink)}\n.vie-chart-drawing{width:100%;min-width:0}\n.vie-chart-drawing svg{display:block;width:100%;height:auto;max-height:245px;overflow:visible}\n.vie-chart-drawing svg text{font:11px ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",sans-serif;fill:var(--vie-muted);font-variant-numeric:tabular-nums}\n.vie-chart-drawing svg .vie-axis-name{font-size:12px;font-weight:600;fill:var(--vie-ink)}\n.vie-grid-line{stroke:var(--vie-stroke);stroke-width:1;stroke-dasharray:3 4}\n.vie-data-axis{stroke:var(--vie-muted);stroke-width:1.1;opacity:.6}\n.vie-bar-item{cursor:pointer;outline:none}\n.vie-bar-item:focus .vie-data-bar{stroke:var(--vie-ink);stroke-width:2.5}\n.vie-data-bar{fill:#9cbfe5;transition:fill .12s ease,opacity .12s ease}\n.vie-data-bar.is-active{fill:var(--vie-blue)}\n.vie-bar-item:hover .vie-data-bar{fill:#6ba2dc}\n.vie-chart-drawing svg .vie-bar-value{font-weight:600;font-size:11px;fill:var(--vie-ink)}\n.vie-chart-note{font-size:12.5px;line-height:1.5;color:var(--vie-ink);min-height:20px}\n.vie-chart-footer{display:flex;gap:8px;flex-wrap:wrap;justify-content:space-between;color:var(--vie-muted);font-size:11px}\n.vie-raw-data{border-top:1px solid var(--vie-stroke);margin-top:5px;padding-top:7px;font-size:12px;color:var(--vie-muted)}\n.vie-raw-data summary{cursor:pointer;list-style:none;width:max-content}\n.vie-raw-data summary::before{content:'＋';margin-right:6px}\n.vie-raw-data[open] summary::before{content:'－'}\n.vie-data-table{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding-top:12px}\n.vie-data-table>div{display:flex;flex-direction:column;gap:2px;padding:7px 9px;background:var(--vie-layer);border-radius:9px}\n.vie-data-table strong{font-size:13px;color:var(--vie-ink);font-weight:610}\n@media(max-width:450px){.vie-chart-drawing svg{max-height:225px}.vie-chart-note{font-size:12px}.vie-data-table{grid-template-columns:repeat(2,minmax(0,1fr))}}\n\n/* Context handoff remains invisible until a value changes; no extra default UI. */\n.vie-context-row{display:flex;gap:8px;align-items:center;justify-content:flex-end;flex-wrap:wrap;margin-top:2px;font-size:11px;color:var(--vie-muted)}\n.vie-context-button{font:500 12px system-ui,sans-serif;color:var(--vie-muted);border:1px solid var(--vie-stroke);background:transparent;border-radius:999px;padding:5px 10px;cursor:pointer}\n.vie-context-button:hover{color:var(--vie-ink);background:var(--vie-layer)}\n.vie-context-button:focus-visible{outline:2px solid var(--vie-blue);outline-offset:2px}\n\n.vie-error{padding:9px 12px;border:1px solid var(--vie-stroke);border-radius:10px;font:13px system-ui,sans-serif;color:var(--vie-muted)}\n\n/* VIE 0.13: generic semantics-first visual grammar */\n.vie-visual-host{min-width:0;width:100%}\n.vie-visual-panel{display:flex;flex-direction:column;gap:9px;min-width:0;color:var(--vie-ink);font:inherit}\n.vie-visual-heading{display:flex;align-items:center;gap:9px;justify-content:space-between;font-size:14px;line-height:1.45}\n.vie-visual-heading strong{font-weight:660}\n.vie-visual-subtitle{font-size:12.5px;line-height:1.5;color:var(--vie-muted);margin:0}\n.vie-visual-content{background:var(--vie-bg);min-width:0;border-radius:12px;overflow:hidden}\n.vie-visual-svg{width:100%;height:auto;max-height:440px;display:block;overflow:visible}\n.vie-visual-svg text{font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;paint-order:stroke}\n.vie-visual-hint{font-size:11.5px;color:var(--vie-muted);line-height:1.5}\n.vie-visual-selected{padding:10px 12px;border-radius:10px;background:var(--vie-layer);display:flex;gap:10px;flex-wrap:wrap;align-items:center;font-size:12.5px}\n.vie-visual-selected strong{font-size:13px;color:var(--vie-ink)}.vie-visual-selected span{color:var(--vie-muted)}\n.vie-visual-accuracy{font-size:11px;color:var(--vie-muted)}\n.vie-svg-item{outline:none;cursor:pointer}.vie-svg-item:focus-visible>rect,.vie-svg-item:hover>rect{stroke:#5285be;stroke-width:2.6}\n.vie-svg-item:focus-visible>circle,.vie-svg-item:hover>circle{stroke:#5285be;stroke-width:3}\n.vie-visual-mobile-list{display:none;flex-wrap:wrap;gap:7px}\n.vie-visual-mobile-list button{border:1px solid var(--vie-stroke);border-radius:999px;background:transparent;padding:6px 10px;color:var(--vie-ink);font:inherit;font-size:12px;cursor:pointer}\n.vie-visual-mobile-list button.is-active{border-color:var(--vie-blue);background:var(--vie-layer)}\n.vie-timeline-list{display:flex;gap:9px;overflow-x:auto;padding:4px 0 10px;scroll-snap-type:x proximity}\n.vie-timeline-item{position:relative;flex:1;min-width:94px;min-height:98px;border:1px solid var(--vie-stroke);border-radius:12px;background:var(--vie-bg);display:flex;flex-direction:column;gap:7px;align-items:flex-start;padding:12px 10px;text-align:left;color:var(--vie-ink);font:inherit;cursor:pointer;scroll-snap-align:start}\n.vie-timeline-item.is-active{border-color:var(--vie-blue);background:var(--vie-layer)}\n.vie-timeline-step{width:23px;height:23px;display:grid;place-items:center;border-radius:50%;background:var(--vie-layer);color:var(--vie-ink);font-size:11px;font-weight:600}\n.vie-timeline-when{font-size:11px;color:var(--vie-muted)}.vie-timeline-item strong{font-size:12px;line-height:1.4;font-weight:600}\n@media(max-width:550px){.vie-visual-svg{max-height:290px}.vie-visual-panel[data-vie-visual='RelationGraph'] .vie-visual-svg{max-height:230px}.vie-visual-mobile-list{display:flex}.vie-timeline-list{gap:7px}.vie-timeline-item{min-width:110px;flex:0 0 44%}}\n@media(prefers-reduced-motion:reduce){.vie-visual-panel *, .vie-visual-panel *::after,.vie-visual-panel *::before{animation:none!important;transition:none!important}}\n\n.vie-visual-legend{display:flex;flex-wrap:wrap;gap:6px}.vie-visual-legend button{font:inherit;font-size:11.5px;border:1px solid var(--vie-stroke);background:var(--vie-bg);color:var(--vie-ink);border-radius:999px;padding:5px 10px;cursor:pointer}.vie-visual-legend button.is-active{background:var(--vie-layer);border-color:var(--vie-blue)}\n\n.vie-visual-mobile-svg{display:none}\n@media(max-width:550px){.vie-visual-desktop-svg{display:none}.vie-visual-mobile-svg{display:block;max-height:none}.vie-visual-panel[data-vie-visual=\"Diagram\"] .vie-visual-content{overflow-x:auto}.vie-visual-panel[data-vie-visual=\"Diagram\"] .vie-visual-svg{min-width:450px;max-height:300px}}\n\n/* 0.14.1 runtime diagnostics and compact accessibility. */\n.vie-runtime-diagnostics{border:1px solid var(--vie-stroke);background:var(--vie-layer);border-radius:9px;padding:7px 10px;color:var(--vie-muted);font-size:12px;line-height:1.5}.vie-runtime-diagnostics p{margin:2px 0}.vie-error pre{white-space:pre-wrap;word-break:break-word;font-size:11px}.vie-error details{margin-top:7px}.vie-error summary{cursor:pointer}.vie-row{grid-template-columns:repeat(2,minmax(0,1fr))}@media(max-width:370px){.vie-row{grid-template-columns:minmax(0,1fr)}}\n\n/* Empty diagnostic holders must not reserve card space. */\n.vie-runtime-diagnostics:empty,.vie-diagnostics:empty{display:none}\n\n/* VIE 0.15.2: quiet, readable captions beneath optional single-scene visuals. */\n.vie-figure-caption{font-size:12px;line-height:1.65;color:var(--vie-muted,#64748b);margin:6px 0 2px;overflow-wrap:anywhere}\n.vie-annotated-surface{min-width:0;max-width:100%}\n@media (max-width:390px){.vie-figure-caption{font-size:11px}}\n\n/* 0.16 declarative responsive split; no untrusted freeform CSS. */\n.vie-split{display:grid;grid-template-columns:minmax(0,var(--vie-split-ratio,50%)) minmax(0,1fr);gap:12px;align-items:start}\n.vie-split>*{min-width:0}\n@media(max-width:600px){.vie-split{grid-template-columns:minmax(0,1fr)}}\n@media(prefers-reduced-motion:reduce){.vie-split *{scroll-behavior:auto}}\n\n/* Chat-scale visual experiments: one primary visual, one light control row, one takeaway. */\n.vie-semantic-host{width:100%;min-width:0}\n.vie-semantic-lab{min-width:0;color:var(--vie-ink)}\n.vie-lab-head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:12px}\n.vie-lab-head h3{font-size:16px;letter-spacing:-.025em;line-height:1.35;margin:0 0 3px;font-weight:650}\n.vie-lab-head p{margin:0;color:var(--vie-muted);font-size:12.5px;line-height:1.5}\n.vie-lab-head button{flex-shrink:0}\n.vie-lab-visual{min-width:0;margin:1px 0 12px}\n.vie-lab-svg{display:block;width:100%;max-height:175px;height:auto;overflow:visible}\n.vie-lab-explain{font-size:12.5px;line-height:1.6;color:var(--vie-ink);margin:11px 0 0}\n.vie-lab-controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 18px}\n.vie-lab-controls:empty{display:none}\n.vie-lab-slider{display:flex;flex-direction:column;min-width:0;gap:4px}\n.vie-lab-slider>span{font-size:12px;display:flex;justify-content:space-between;gap:8px;color:var(--vie-muted)}\n.vie-lab-slider b{color:var(--vie-ink);font-weight:650;font-variant-numeric:tabular-nums}\n.vie-lab-slider input{width:100%;margin:3px 0 0;accent-color:var(--vie-blue);cursor:pointer;min-height:22px}\n.vie-lab-pills{display:flex;align-items:center;gap:7px;flex-wrap:wrap}\n.vie-lab-pills .selected{background:var(--vie-layer)!important;border-color:#d6dbe1!important}\n.vie-bit-panel{padding:8px 0}\n.vie-bit-row{display:grid;grid-template-columns:28px minmax(0,1fr) 34px;gap:7px;align-items:center;margin:6px 0}\n.vie-bit-row>span{color:var(--vie-muted);font-size:12px;font-weight:650}\n.vie-bit-row>small{text-align:right;color:var(--vie-muted);font-variant-numeric:tabular-nums}\n.vie-bit-cells{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:4px}\n.vie-bit{min-width:0;height:34px;padding:0!important;border:1px solid var(--vie-stroke)!important;border-radius:7px!important;background:var(--vie-layer)!important;font:600 14px ui-monospace,monospace!important;color:var(--vie-ink)!important;cursor:pointer}\n.vie-bit:hover{border-color:var(--vie-blue)!important}\n.vie-bit-result{display:flex;align-items:center;justify-content:center;height:34px;background:var(--vie-layer);border-radius:7px;font:650 14px ui-monospace,monospace}\n.vie-bit-result.on{background:#e7f2ff;color:#237ac3}\n.vie-bit-separator{height:1px;background:var(--vie-stroke);margin:9px 37px 9px 35px}\n.vie-outcomes{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin:13px 0 15px}\n.vie-outcome{min-width:0;border-radius:10px!important;background:var(--vie-layer)!important;border:1px solid var(--vie-stroke)!important;min-height:53px;color:var(--vie-ink)!important;font:650 18px ui-sans-serif,system-ui!important;cursor:pointer}\n.vie-outcome.chosen{background:#e9f3ff!important;border-color:#83b5e8!important;color:#1767ac!important}\n.vie-prob-bar{height:12px;background:var(--vie-layer);border-radius:50px;overflow:hidden}\n.vie-prob-bar>div{background:#4a8bd1;height:100%;border-radius:50px;transition:width .12s}\n.vie-prob-label{display:flex;justify-content:space-between;font-size:12px;color:var(--vie-muted);margin-top:7px}\n.vie-prob-label strong{color:var(--vie-blue);font-weight:650}\n@media(max-width:440px){.vie-lab-controls{gap:13px;grid-template-columns:1fr}.vie-outcomes{gap:4px}.vie-outcome{min-height:45px}.vie-bit-cells{gap:2px}.vie-bit{height:32px}.vie-lab-head p{font-size:12px}}\n/* Shared native-like range controls: neutral track, quiet round thumb. */\n\n/* Intelligent-UI-style vector explorer: the diagram is the lesson, not a mini dashboard. */\n.vie-lab-vector {\n  --vie-vector-main:#367eea;\n  --vie-vector-x:#2e9c7c;\n  --vie-vector-y:#d6a04b;\n  --vie-vector-axis:#9ba5b3;\n  --vie-vector-grid:rgba(145,159,175,.18);\n  --vie-vector-angle:#718399;\n  --vie-vector-tip-ring:#fff;\n}\n.vie-lab-vector .vie-lab-head{margin-bottom:5px}\n.vie-vector-stage{display:grid;grid-template-columns:minmax(0,1fr) minmax(142px,172px);align-items:center;gap:7px 12px;min-width:0}\n.vie-vector-canvas{position:relative;min-width:0;display:flex;align-items:center;justify-content:center}\n.vie-vector-svg{width:100%;height:auto;max-width:410px;max-height:242px;display:block;overflow:visible;touch-action:pan-y}\n.vie-vector-svg [data-vector-handle]{cursor:grab;outline:none;touch-action:none}\n.vie-vector-svg [data-vector-handle].dragging{cursor:grabbing}\n.vie-vector-svg [data-vector-handle]:focus-visible{stroke:var(--vie-vector-main);stroke-width:2;stroke-dasharray:3 3}\n.vie-vector-tick{font-size:10.5px;fill:var(--vie-muted);font-variant-numeric:tabular-nums}\n.vie-vector-axis-label{font-size:12px;fill:var(--vie-muted);font-weight:550}\n.vie-vector-arc-label{font-size:11px;fill:var(--vie-vector-angle);text-anchor:middle;font-variant-numeric:tabular-nums}\n.vie-vector-coordinate{font-size:10.5px;fill:var(--vie-ink);font-variant-numeric:tabular-nums;font-weight:550}\n.vie-vector-hint{display:inline-flex;align-items:center;gap:4px;position:absolute;left:11px;bottom:8px;color:var(--vie-muted);font-size:11px;pointer-events:none}\n.vie-vector-insights{min-width:0;display:flex;flex-direction:column;gap:13px;padding:2px 0 2px 13px;border-left:1px solid var(--vie-stroke)}\n.vie-vector-meta span{color:var(--vie-muted);font-size:11.5px;display:block;margin-bottom:3px}\n.vie-vector-meta strong{display:block;font-size:15px;font-weight:660;letter-spacing:-.018em;font-variant-numeric:tabular-nums}\n.vie-vector-metric-label{display:flex;align-items:center;gap:7px;color:var(--vie-muted);font-size:11.5px;white-space:nowrap}\n.vie-vector-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--vie-vector-x);flex-shrink:0}\n.vie-vector-metric.y .vie-vector-dot{background:var(--vie-vector-y)}\n.vie-vector-metric>strong{font-size:23px;line-height:1.2;letter-spacing:-.035em;display:block;font-weight:650;font-variant-numeric:tabular-nums;color:var(--vie-ink);margin-top:3px}\n.vie-vector-metric>small{font-size:10.5px;color:var(--vie-muted)}\n.vie-lab-vector .vie-vector-controls{margin:2px 0 0;gap:8px 19px}\n.vie-lab-vector .vie-vector-explain{margin:7px 0 0;color:var(--vie-muted);font-size:12px}\n@media(max-width:560px){\n .vie-vector-stage{grid-template-columns:minmax(0,1fr);gap:0}\n .vie-vector-svg{max-height:205px;max-width:325px}\n .vie-vector-insights{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px;padding:3px 0 9px;border:0;border-bottom:1px solid var(--vie-stroke)}\n .vie-vector-meta{align-self:center}\n .vie-vector-meta strong{font-size:13px}\n .vie-vector-metric-label{font-size:10px;gap:3px;white-space:normal}\n .vie-vector-metric>strong{font-size:18px;margin-top:2px}\n .vie-vector-metric>small{display:none}\n .vie-vector-hint{bottom:2px;left:0}\n .vie-lab-vector .vie-vector-controls{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:12px}\n .vie-lab-vector .vie-vector-explain{font-size:11.5px}\n}\n\n/* Stable completed-Turn surface; keeps the visual aid outside folded work steps. */\n.vie-tail{display:grid;gap:12px;margin:9px 0 16px;max-width:100%;min-width:0}\n.vie-tail-item{min-width:0}\n.vie-tail-label{font-size:12px;font-weight:600;color:var(--vie-text,#293342);margin:0 0 6px 2px}\n.vie-published-marker{display:inline-block;font-size:11px;color:var(--vie-muted,#64748b);padding:5px 1px}\n\n/* VIE 0.14: semantic multi-panel answers and motion controls */\n.vie-animation-controls{display:flex;gap:9px;align-items:center;margin:9px 0 3px;padding:7px 2px;min-width:0}\n.vie-animation-controls>button{border:1px solid var(--vie-border,#e5e9ef);background:var(--vie-layer,#f8f9fb);border-radius:999px;padding:5px 12px;color:inherit;white-space:nowrap;cursor:pointer;font:inherit;font-size:12px}\n.vie-animation-controls>button:focus-visible{outline:2px solid #4789db;outline-offset:2px}\n.vie-animation-controls>input{flex:1;min-width:36px;accent-color:#4c82c9;cursor:pointer;touch-action:pan-y}\n.vie-animation-controls>span{min-width:38px;font-size:11px;font-variant-numeric:tabular-nums;color:var(--vie-muted,#6c7987);text-align:right}\n.vie-visual-content svg [data-vie-shape]{transform-box:view-box}\n.vie-visual-host .vie-visual-panel{margin-bottom:5px}\n@media(max-width:380px){.vie-animation-controls{gap:5px}.vie-animation-controls>button{padding:5px 9px;font-size:11px}}\n\n/* VIE 0.16.1 article-flow for multi-panel stories inside the persistent turn tail. */\n.vie-body--article { border:0; border-radius:0; background:transparent; padding:4px 0; gap:18px }\n.vie-body--article > .vie-text {padding:2px 1px; max-width:72ch}\n.vie-body--article > .vie-text p {font-size:15px;line-height:1.8;color:var(--vie-ink);white-space:pre-line;overflow-wrap:anywhere}\n.vie-body--article > .vie-visual-host {border:1px solid var(--vie-stroke);background:var(--vie-bg);border-radius:14px;padding:12px}\n.vie-visual-warning{font-size:12px;color:#a46d2f;margin:4px 0}\n@media(max-width:420px){.vie-body--article > .vie-text p {font-size:14px;line-height:1.75}.vie-body--article > .vie-visual-host{padding:7px}}\n@media(prefers-reduced-motion:reduce){.vie-body--article *{scroll-behavior:auto!important;transition:none!important}}\n\n.vie-answer{min-width:0;margin:10px 0 18px}.vie-answer:empty{display:none}.vie-generation-status{font-size:12px;color:var(--vie-muted,#718096);margin:6px 0}.vie-general-chart{border:1px solid var(--vie-stroke,#dde3eb);border-radius:14px;padding:14px;min-width:0}.vie-general-chart header{display:flex;align-items:center;justify-content:space-between;gap:12px}.vie-general-chart h3{font-size:15px;margin:0}.vie-general-chart button{font:inherit;border:1px solid var(--vie-stroke,#dde3eb);border-radius:8px;background:transparent;color:inherit;padding:5px 10px;cursor:pointer}.vie-general-chart svg{display:block;width:100%;height:auto;overflow:visible}.vie-general-chart text{font:11px system-ui;fill:var(--vie-muted,#718096)}.vie-general-chart-grid{stroke:var(--vie-stroke,#dde3eb);stroke-width:.7;fill:none}.vie-general-chart-axis{stroke:var(--vie-muted,#718096);fill:none}.vie-general-chart-legend{display:flex;gap:12px;flex-wrap:wrap;font-size:12px}.vie-general-chart-legend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:5px}.vie-general-chart-controls{display:flex;gap:14px;flex-wrap:wrap;margin-top:12px}.vie-general-chart-controls label{display:flex;flex-direction:column;flex:1 1 160px;gap:5px;font-size:12px}.vie-general-chart-controls input{width:100%;accent-color:#4d82d6}.vie-general-chart-note,.vie-general-chart [data-chart-error]{font-size:12px;color:var(--vie-muted,#718096);line-height:1.6}.vie-general-chart [data-chart-error]:empty{display:none}\n/* 0.30.5: topology overview and topic-independent guided navigation. */\n.vie-flow-panel{gap:12px}.vie-flow-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap}.vie-flow-heading strong{font-size:15px;line-height:1.5;font-weight:650}.vie-flow-heading p{font-size:12px;color:var(--vie-muted);margin:5px 0 0;line-height:1.7}.vie-flow-modes{display:flex;padding:3px;border:1px solid var(--vie-stroke);border-radius:20px;flex-shrink:0;gap:2px}.vie-flow-modes button{border:0;background:transparent;border-radius:16px;color:var(--vie-muted);padding:5px 11px;font:inherit;font-size:11px;cursor:pointer}.vie-flow-modes button[aria-pressed=true]{background:var(--vie-layer);color:var(--vie-ink);font-weight:600}.vie-flow-scroll{overflow-x:auto;scrollbar-width:none;container-type:inline-size;outline:none}.vie-flow-scroll::-webkit-scrollbar{display:none}.vie-flow-panel .vie-flow-svg{max-height:none!important;min-height:0;overflow:visible}.vie-flow-detail{border:1px solid var(--vie-stroke);background:var(--vie-layer);border-radius:11px;padding:13px 15px;display:flex;flex-direction:column;gap:5px;font-size:12px;line-height:1.8;overflow-wrap:anywhere}.vie-flow-detail strong{font-weight:600;color:var(--vie-ink)}.vie-flow-detail span{color:var(--vie-muted)}.vie-flow-guided{display:grid;grid-template-columns:minmax(100px,30%) minmax(0,1fr);gap:26px;padding:12px 0 6px;align-items:start;min-width:0}.vie-flow-rail{display:flex;flex-direction:column;max-height:420px;overflow:auto;scrollbar-width:none}.vie-flow-rail::-webkit-scrollbar{display:none}.vie-flow-rail button{position:relative;display:flex;gap:10px;align-items:flex-start;text-align:left;border:0;padding:8px 3px 20px;background:transparent;color:var(--vie-muted);font:inherit;font-size:11px;cursor:pointer;line-height:1.7;overflow-wrap:anywhere}.vie-flow-rail button>span:first-child{display:grid;place-items:center;border-radius:50%;width:25px;height:25px;flex-shrink:0;background:var(--vie-layer);border:1px solid var(--vie-stroke);font-size:10px;z-index:1}.vie-flow-rail button:not(:last-child):after{content:\"\";position:absolute;left:15px;top:32px;bottom:0;border-left:1px solid var(--vie-stroke)}.vie-flow-rail button[aria-current=step]{color:var(--vie-ink);font-weight:600}.vie-flow-rail button[aria-current=step]>span:first-child{background:var(--vie-primary,#4b71ed);color:var(--vie-bg,#fff);border-color:transparent}.vie-flow-work{min-width:0}.vie-flow-work h3{font-size:17px;font-weight:650;line-height:1.6;margin:3px 0 10px;overflow-wrap:anywhere}.vie-flow-description{font-size:12px;line-height:1.9;color:var(--vie-muted);margin:0 0 18px;overflow-wrap:anywhere}.vie-flow-choices{display:flex;flex-direction:column;gap:8px}.vie-flow-choices button{display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid var(--vie-stroke);background:var(--vie-bg);color:var(--vie-ink);border-radius:11px;padding:12px 14px;cursor:pointer;font:inherit;text-align:left;line-height:1.65;min-height:48px}.vie-flow-choices strong{font-size:12px;font-weight:550;overflow-wrap:anywhere}.vie-flow-choices small{display:block;color:var(--vie-muted);font-size:11px;margin-top:3px;overflow-wrap:anywhere}.vie-flow-choices button[aria-pressed=true]{border-color:var(--vie-primary,#4b71ed);background:color-mix(in srgb,var(--vie-primary,#4b71ed) 7%,var(--vie-bg,#fff))}.vie-flow-choice-mark{width:20px;height:20px;display:grid;place-items:center;border:1px solid var(--vie-stroke);border-radius:50%;font-size:10px;flex-shrink:0}.vie-flow-choices button[aria-pressed=true] .vie-flow-choice-mark{background:var(--vie-primary,#4b71ed);color:#fff;border-color:transparent}.vie-flow-result{padding:3px 0 3px 12px;border-left:2px solid var(--vie-primary,#4b71ed);margin-top:18px;font-size:12px;color:var(--vie-muted);line-height:1.8;overflow-wrap:anywhere}.vie-flow-result strong{color:var(--vie-ink);font-weight:550}.vie-flow-result p{margin:5px 0 0}.vie-flow-footer{margin-top:24px;display:flex;gap:10px;justify-content:space-between;align-items:center;flex-wrap:wrap}.vie-flow-footer>span{font-size:11px;color:var(--vie-muted)}.vie-flow-footer>div{display:flex;gap:7px}.vie-flow-footer button,.vie-flow-roots button{border:1px solid var(--vie-stroke);background:var(--vie-bg);color:var(--vie-ink);font:inherit;font-size:12px;padding:6px 12px;border-radius:20px;cursor:pointer}.vie-flow-footer button.vie-flow-next{background:var(--vie-ink);color:var(--vie-bg);border-color:var(--vie-ink)}.vie-flow-footer button:disabled{opacity:.4;cursor:default}.vie-flow-terminal{background:var(--vie-layer);padding:14px;border-radius:10px;font-size:12px;color:var(--vie-muted);line-height:1.8}.vie-flow-roots{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}.vie-flow-roots button[aria-pressed=true]{border-color:var(--vie-primary,#4b71ed)}.vie-flow-panel button:focus-visible,.vie-flow-scroll:focus-visible,.vie-flow-work h3:focus-visible{outline:2px solid var(--vie-primary,#4b71ed);outline-offset:3px}\n@container(max-width:550px){.vie-flow-scroll>.vie-visual-desktop-svg{display:none}.vie-flow-scroll>.vie-visual-mobile-svg{display:block}}\n@container(min-width:551px){.vie-flow-scroll>.vie-visual-desktop-svg{display:block}.vie-flow-scroll>.vie-visual-mobile-svg{display:none}}\n@media(max-width:550px){.vie-flow-guided{grid-template-columns:1fr;gap:14px}.vie-flow-rail{flex-direction:row;gap:6px;max-height:120px}.vie-flow-rail button{flex:0 0 94px;flex-direction:column;align-items:center;text-align:center;padding:4px 2px 9px;font-size:10px}.vie-flow-rail button:not(:last-child):after{display:none}.vie-flow-work h3{font-size:16px}.vie-flow-heading{gap:10px}.vie-flow-modes button{font-size:11px;padding:5px 9px}}\n/* Wide trees retain the declared parent groups instead of one oversized leaf rank. */\n.vie-flow-tree{width:100%;min-width:0;container-type:inline-size;color:var(--vie-ink);padding:12px 4px 4px;box-sizing:border-box}.vie-flow-tree ul{list-style:none;margin:0;padding:0;min-width:0}.vie-flow-tree-roots{display:flex;flex-direction:column;gap:22px}.vie-flow-tree-node{position:relative;min-width:0;box-sizing:border-box}.vie-flow-tree .vie-flow-tree-card{display:flex;flex-direction:column;gap:4px;text-align:left;width:100%;min-width:0;min-height:60px;box-sizing:border-box;padding:11px 13px;border:1px solid var(--vie-stroke);border-radius:11px;background:var(--vie-bg);color:var(--vie-ink);font:inherit;line-height:1.65;cursor:pointer;overflow-wrap:anywhere;box-shadow:none;appearance:none}.vie-flow-tree-card strong{font-size:13px;font-weight:600}.vie-flow-tree-condition{display:block;font-size:11px;color:var(--vie-muted);line-height:1.7;overflow-wrap:anywhere}.vie-flow-tree .vie-flow-tree-card:hover{border-color:var(--vie-flow-branch)}.vie-flow-tree .vie-flow-tree-card[aria-pressed=true]{border-color:var(--vie-flow-branch);background:color-mix(in srgb,var(--vie-flow-branch) 7%,var(--vie-bg));box-shadow:0 0 0 1px var(--vie-flow-branch)}.vie-flow-tree .is-root>.vie-flow-tree-card{max-width:280px;margin:0 auto;text-align:center;align-items:center;background:var(--vie-layer)}.vie-flow-tree .vie-flow-tree-children.is-split{position:relative;display:grid;grid-template-columns:repeat(var(--vie-flow-columns),minmax(0,1fr));gap:20px;margin:24px 0 0;padding-top:18px}.vie-flow-tree .is-split:before{content:\"\";position:absolute;top:0;left:calc(50% / var(--vie-flow-columns));right:calc(50% / var(--vie-flow-columns));height:0;border-top:1px solid var(--vie-stroke)}.vie-flow-tree .is-split:after{content:\"\";position:absolute;top:-24px;left:50%;height:24px;border-left:1px solid var(--vie-stroke)}.vie-flow-tree .is-split>.vie-flow-tree-node:before{content:\"\";position:absolute;left:50%;top:-18px;height:18px;border-left:1px solid var(--vie-stroke)}.vie-flow-tree .vie-flow-tree-children.is-stack{position:relative;display:flex;flex-direction:column;gap:10px;margin:12px 0 0 13px;padding-left:15px;border-left:1px solid var(--vie-stroke)}.vie-flow-tree .is-stack>.vie-flow-tree-node:before{content:\"\";position:absolute;left:-15px;top:27px;width:15px;border-top:1px solid var(--vie-stroke)}.vie-flow-tree .is-root:not(.has-split)>.vie-flow-tree-card{max-width:none;text-align:left;align-items:flex-start}.vie-flow-tree-card:focus-visible{outline:2px solid var(--vie-primary,#4b71ed);outline-offset:3px}\n@container(max-width:550px){.vie-flow-tree .vie-flow-tree-children.is-split{display:flex;flex-direction:column;gap:16px;margin:12px 0 0 13px;padding:0 0 0 15px;border-left:1px solid var(--vie-stroke)}.vie-flow-tree .is-split:before,.vie-flow-tree .is-split:after{display:none}.vie-flow-tree .is-split>.vie-flow-tree-node:before{left:-15px;top:27px;width:15px;height:0;border-left:0;border-top:1px solid var(--vie-stroke)}.vie-flow-tree .is-root>.vie-flow-tree-card{max-width:none}.vie-flow-tree .vie-flow-tree-card{min-height:56px}.vie-flow-tree-card strong{font-size:12px}}\n/* These controls use the same sizing after a stylesheet refresh and a fresh activation. */\n.vie-flow-modes button,.vie-flow-footer button,.vie-flow-roots button{appearance:none;box-shadow:none;font-family:inherit;line-height:1.5;white-space:nowrap}.vie-flow-modes button{min-height:28px}.vie-flow-choices button{appearance:none;box-shadow:none;white-space:normal}.vie-flow-rail button{appearance:none;box-shadow:none;white-space:normal}\n\n/* VIE 0.18: focused conversational experiments. Every selector is scoped. */\n.vie-shell{font-family:ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",\"Microsoft YaHei\",sans-serif}\n:where([data-theme=dark],.dark) .vie-shell{--vie-ink:var(--dsw-alias-text-primary,#edf1f6);--vie-muted:var(--dsw-alias-text-secondary,#a9b4c4);--vie-stroke:var(--dsw-alias-border-l2,#394452);--vie-layer:var(--dsw-alias-background-secondary,#242c37);--vie-bg:var(--dsw-alias-background-primary,#1c232d)}\n[data-theme=light] .vie-shell{--vie-ink:var(--dsw-alias-text-primary,#222326);--vie-muted:var(--dsw-alias-text-secondary,#777980);--vie-stroke:var(--dsw-alias-border-l2,#e7e7e9);--vie-layer:var(--dsw-alias-background-secondary,#f6f6f7);--vie-bg:var(--dsw-alias-background-primary,#fff)}\n.vie-body:has(>.vie-experiment-host):not(.vie-body--article){border:0;padding:0;background:transparent}\n.vie-experiment-host{min-width:0;width:100%;container-type:inline-size}\n.vie-experiment{--scene-sun:#dc930e;--scene-planet:#009f96;--scene-ring:#5483ef;--scene-carrier:#9475c8;color:var(--vie-ink);font-size:13px;width:100%;min-width:0}\n.vie-experiment button,.vie-experiment select{font:inherit;color:inherit}\n.vie-case-tabs{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 9px}\n.vie-case-tabs button,.vie-scene-button{border:1px solid var(--vie-stroke);background:var(--vie-bg);border-radius:9px;padding:8px 11px;min-height:34px;cursor:pointer;font-size:12px;line-height:1.25}\n.vie-case-tabs button[aria-selected=true],.vie-scene-button.is-primary{border-color:#6f9bff;background:color-mix(in srgb,#5483ef 7%,var(--vie-bg));color:var(--vie-ink)}\n.vie-experiment button:focus-visible,.vie-experiment input:focus-visible,.vie-experiment select:focus-visible{outline:2px solid #4e8ef7;outline-offset:3px}\n.vie-experiment button:disabled{opacity:.45;cursor:default}\n.vie-scene-panel{border:1px solid var(--vie-stroke);border-radius:14px;background:color-mix(in srgb,var(--vie-layer) 48%,var(--vie-bg));padding:13px 15px 10px;min-width:0}\n.vie-scene-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}\n.vie-scene-heading h3{font-size:15px;line-height:1.45;font-weight:650;margin:0 0 4px;letter-spacing:-.02em}\n.vie-scene-subtitle{font-size:12px;line-height:1.55;color:var(--vie-muted);margin:0}\n.vie-scene-status{font-size:11px;white-space:nowrap;border:1px solid var(--vie-stroke);border-radius:7px;padding:5px 7px;background:var(--vie-bg);color:var(--vie-muted)}\n.vie-scene-stage{position:relative;min-width:0;display:flex;justify-content:center;align-items:center;padding:6px 0 0}\n.vie-scene-stage>svg{display:block;width:100%;height:auto;max-height:370px;overflow:visible}\n.vie-scene-stage .vie-visual-panel{width:100%;background:transparent;border:0;padding:0}\n.vie-scene-legend{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;font-size:11px;margin:3px 0 1px;color:var(--vie-muted)}\n.vie-scene-legend>span{display:inline-flex;align-items:center;gap:4px}\n.vie-scene-dot{width:7px;height:7px;border-radius:50%;display:inline-block;background:currentColor}\n.vie-scene-note{text-align:center;color:var(--vie-muted);font-size:11px;line-height:1.5;margin:3px 0 7px}\n.vie-scene-toolbar{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin:10px 0}\n.vie-scene-toolbar>button{flex-shrink:0}\n.vie-scene-speed{display:flex;align-items:center;gap:7px;min-width:130px;flex:1;color:var(--vie-muted);font-size:11px}\n.vie-scene-speed input{min-width:40px;width:100%;accent-color:#658ef4}\n.vie-scene-speed>span{white-space:nowrap}\n.vie-experiment input[data-scene-input]{appearance:none;-webkit-appearance:none;height:20px;background:transparent;cursor:pointer;margin:0}\n.vie-experiment input[data-scene-input]::-webkit-slider-runnable-track{height:6px;background:var(--vie-stroke);border-radius:99px}\n.vie-experiment input[data-scene-input]::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:15px;height:15px;border:1px solid #ccd3dd;border-radius:50%;margin-top:-4.5px;background:var(--vie-bg);box-shadow:0 1px 3px #0002}\n.vie-experiment input[data-scene-input]::-moz-range-track{height:6px;background:var(--vie-stroke);border-radius:99px}\n.vie-experiment input[data-scene-input]::-moz-range-thumb{width:14px;height:14px;border:1px solid #ccd3dd;border-radius:50%;background:var(--vie-bg)}\n.vie-scene-speed output{min-width:30px;font-variant-numeric:tabular-nums}\n.vie-scene-readouts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}\n.vie-scene-readout{border:1px solid var(--vie-stroke);border-radius:11px;padding:12px 8px 10px;text-align:center;min-width:0;background:var(--vie-bg)}\n.vie-scene-readout small{display:block;font-size:11px;color:var(--vie-muted);overflow-wrap:anywhere}\n.vie-scene-readout strong{display:block;font-size:21px;line-height:1.55;font-weight:650;font-variant-numeric:tabular-nums;color:var(--readout-color,var(--vie-ink));letter-spacing:-.02em}\n.vie-scene-readout span{display:block;font-size:10px;color:var(--vie-muted)}\n.vie-scene-insight{font-size:13px;line-height:1.75;margin:11px 1px 0;color:var(--vie-ink);overflow-wrap:anywhere}\n.vie-scene-details{margin:10px 1px 0;color:var(--vie-muted);font-size:12px;line-height:1.7}\n.vie-scene-details summary{cursor:pointer;width:max-content;max-width:100%}\n.vie-scene-details p{margin:6px 0}\n.vie-scene-controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 18px;margin:12px 0 3px}\n.vie-scene-control{display:flex;flex-direction:column;gap:5px;min-width:0}\n.vie-scene-control span{display:flex;justify-content:space-between;gap:8px;color:var(--vie-muted);font-size:12px}\n.vie-scene-control input{width:100%;accent-color:#5483ef}\n.vie-scene-control output{color:var(--vie-ink);font-variant-numeric:tabular-nums}\n.vie-process-choices{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0 0}\n.vie-process-choices:empty{display:none}\n.vie-scene-progress{font-size:12px;color:var(--vie-muted);font-variant-numeric:tabular-nums}\n.vie-runtime-diagnostics{font-size:12px;line-height:1.6;color:#a46d2f}\n.vie-body--article>.vie-experiment-host{padding:0;border:0;background:transparent}\n.vie-visual-selected{overflow-wrap:anywhere}\n.vie-visual-subtitle,.vie-figure-caption,.vie-tail-label{overflow-wrap:anywhere}\n.vie-visual-heading{gap:8px;flex-wrap:wrap}\n.vie-visual-accuracy{font-size:10px!important;white-space:normal}\n.vie-scene-svg-label{font-family:inherit;font-size:12px;fill:var(--vie-muted)}\n.vie-scene-vector .vie-lab-head,.vie-scene-vector .vie-vector-insights,.vie-scene-vector .vie-vector-explain{display:none}\n.vie-scene-vector .vie-vector-stage{grid-template-columns:minmax(0,1fr)}\n.vie-scene-vector .vie-vector-svg{max-height:290px;max-width:430px}\n.vie-experiment[data-scene-template=process] .vie-visual-heading,.vie-experiment[data-scene-template=process] .vie-visual-selected{display:none}\n.vie-experiment .vie-scene-stage text.vie-axis-label{font-size:11px;fill:var(--vie-muted)}\n@container(max-width:440px){.vie-scene-panel{padding:11px 10px 8px}.vie-scene-heading h3{font-size:13px}.vie-scene-subtitle{font-size:11px}.vie-case-tabs{gap:5px}.vie-case-tabs button{padding:8px;font-size:11px}.vie-scene-status{font-size:10px;padding:4px}.vie-scene-toolbar{gap:5px}.vie-scene-toolbar .vie-scene-button{padding:8px;font-size:11px}.vie-scene-speed{min-width:100%;order:2;padding:0 3px}.vie-scene-readouts{gap:6px}.vie-scene-readout{padding:10px 5px}.vie-scene-readout strong{font-size:19px}.vie-scene-readout small{font-size:10px}.vie-scene-legend{gap:8px}.vie-scene-insight{font-size:12px}.vie-scene-controls{gap:10px}.vie-scene-stage>svg{max-height:300px}}\n@media(prefers-reduced-motion:reduce){.vie-experiment *{transition:none!important;scroll-behavior:auto!important}}\n.vie-scene-parameters{margin:13px 1px 0;font-size:13px;color:var(--vie-muted)}\n.vie-scene-parameters>summary{cursor:pointer;width:max-content;max-width:100%}\n.vie-scene-parameters .vie-scene-controls{margin:10px 0 0}\n.vie-experiment[data-scene-template=geartrain] .vie-scene-stage>svg{max-height:330px}\n.vie-experiment[data-scene-template=geartrain] .vie-scene-panel{padding-bottom:13px}\n.vie-scene-readout small{font-size:12px;line-height:1.55}\n.vie-scene-readout span{font-size:11px;line-height:1.5}\n.vie-scene-legend{font-size:12px}\n.vie-scene-parameters .vie-scene-control span{font-size:13px}\n.vie-visual-zoom{display:flex;gap:6px;align-items:center;color:var(--vie-muted);font-size:12px}\n.vie-visual-zoom button{font:inherit;background:var(--vie-bg);color:var(--vie-ink);border:1px solid var(--vie-stroke);border-radius:7px;min-height:32px;padding:4px 10px;cursor:pointer}\n.vie-visual-zoom output{margin-left:auto;font-variant-numeric:tabular-nums}\n.vie-visual-panel:is([data-vie-visual=Diagram],[data-vie-visual=Animation]) .vie-visual-content{overflow:auto;max-height:520px;overscroll-behavior:contain}\n.vie-visual-zoom button:focus-visible{outline:2px solid #4e8ef7;outline-offset:2px}\n@container(max-width:440px){.vie-scene-readout small{font-size:12px}.vie-scene-readout span{font-size:11px}.vie-scene-legend{font-size:12px}.vie-scene-toolbar .vie-scene-button{font-size:12px}.vie-scene-subtitle{font-size:12px}.vie-scene-insight{font-size:13px}.vie-scene-panel{padding:12px 11px}.vie-scene-heading{gap:7px}.vie-scene-status{white-space:normal;text-align:right;font-size:11px;max-width:96px}.vie-visual-panel:is([data-vie-visual=Diagram],[data-vie-visual=Animation]) .vie-visual-content{max-height:360px}}\n.vie-generated-figure{min-width:0;max-width:100%;border:1px solid var(--vie-stroke);border-radius:13px;overflow:hidden;background:var(--vie-bg)}\n.vie-generated-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px 4px}\n.vie-generated-heading h3{font-size:15px;line-height:1.5;margin:0;color:var(--vie-ink)}\n.vie-generated-figure iframe{display:block;width:100%;max-width:100%;border:0;background:transparent}\n.vie-generated-error{margin:8px 14px 12px;color:#b84a38;font-size:12px;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere}\n.vie-body--article>.vie-generated-figure{padding:0}\n\n/* Shared visual vocabulary; scoped to the plugin and inherited by generic graphics. */\n.vie-shell{--vie-primary:#4d82d6;--vie-secondary:#149f91;--vie-accent:#d58b16;--vie-warning:#cf6854;--vie-radius:12px;--vie-gap:12px;--vie-blue:var(--vie-primary);--vie-green:var(--vie-secondary);--vie-amber:var(--vie-accent);font-size:14px;line-height:1.6}\n.vie-shell{--vie-muted:#626874}\n:where([data-theme=dark],.dark) .vie-shell{--vie-muted:#aeb8c8}\n.vie-figure-actions{display:flex;flex:0 0 auto;gap:8px;flex-wrap:wrap;justify-content:flex-start;align-items:center;width:100%;min-width:0}.vie-generated-heading{flex-direction:column;align-items:stretch;justify-content:flex-start;gap:12px;flex-wrap:nowrap;padding:16px 14px 10px}.vie-generated-heading h3{min-width:0;max-width:100%;overflow-wrap:anywhere}.vie-figure-actions button{position:static;float:none;flex:0 0 auto;margin:0;min-width:44px;min-height:32px;white-space:nowrap}\n/* Harness-owned windows/panes can expand without setting any VIE expansion class. */\n[data-windows-titlebar] .vie-generated-heading,[data-sidebar-right-panel='fullscreen'] .vie-generated-heading{padding-top:max(16px,var(--dsh-windows-titlebar-height,40px))}\n.vie-figure-viewport{width:100%;overflow:auto;scrollbar-width:none}.vie-figure-viewport::-webkit-scrollbar{display:none}.vie-figure-viewport:focus-visible{outline:2px solid var(--vie-primary)}\n.vie-figure-expanded{position:fixed;inset:max(96px,env(safe-area-inset-top,0px)) 12px 12px;z-index:1200;overflow:auto;background:var(--vie-bg,#fff);box-shadow:0 0 0 100vmax #0008;scrollbar-width:none}\n.vie-figure-expanded .vie-generated-heading{position:sticky;top:0;z-index:2;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:12px;background:var(--vie-bg,#fff);padding:16px}\n.vie-figure-expanded .vie-generated-heading h3{min-width:0;max-width:100%;margin:0;overflow-wrap:anywhere;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}\n.vie-figure-expanded .vie-figure-actions{width:100%;min-width:0;justify-content:flex-start;align-items:center;gap:8px;flex-wrap:wrap}\n.vie-figure-expanded .vie-figure-actions button{position:static;float:none;flex:0 0 auto;max-width:100%;margin:0}\n.vie-figure-expanded::-webkit-scrollbar{display:none}.vie-figure-hint{color:var(--vie-muted);font-size:12px;margin:0 0 8px}\n.vie-native-frame{min-width:0;max-width:100%;border:1px solid var(--vie-stroke);border-radius:var(--vie-radius);background:var(--vie-bg)}\n.vie-native-frame>.vie-generated-heading{padding:10px 12px 4px}\n.vie-native-frame>.vie-visual-host{padding:12px;box-sizing:border-box}\n.vie-native-frame .vie-general-chart{border:0}\n[data-windows-titlebar] .vie-native-frame>.vie-generated-heading,[data-sidebar-right-panel='fullscreen'] .vie-native-frame>.vie-generated-heading{padding-top:max(16px,var(--dsh-windows-titlebar-height,40px))}\n.vie-native-frame.vie-figure-expanded>.vie-generated-heading{padding:16px}\n.vie-native-frame.vie-figure-expanded .vie-visual-svg,.vie-native-frame.vie-figure-expanded .vie-visual-content{max-height:none}\n:where([data-theme=dark],.dark) .vie-shell{--vie-primary:#83afff;--vie-secondary:#59cebb;--vie-accent:#efba62;--vie-warning:#f69b8c}\n.vie-body{gap:var(--vie-gap)}\n.vie-card,.vie-general-chart,.vie-generated-figure{border-radius:var(--vie-radius);min-width:0}\n.vie-control input[type=number]{width:100%;min-width:0;min-height:36px;padding:6px 10px;border:1px solid var(--vie-stroke);border-radius:8px;background:var(--vie-bg);color:var(--vie-ink);font:inherit;font-variant-numeric:tabular-nums}\n.vie-control input[type=checkbox]{width:20px;height:20px;accent-color:var(--vie-primary);cursor:pointer}\n.vie-segmented{display:flex;gap:5px;flex-wrap:wrap;min-width:0}\n.vie-segmented button{flex:1 1 auto;min-height:36px;border:1px solid var(--vie-stroke);border-radius:8px;background:var(--vie-bg);color:var(--vie-muted);font:inherit;font-size:12px;padding:6px 10px;cursor:pointer;overflow-wrap:anywhere}\n.vie-segmented button[aria-pressed=true]{border-color:var(--vie-primary);color:var(--vie-primary);background:color-mix(in srgb,var(--vie-primary) 10%,var(--vie-bg))}\n.vie-visual-svg text{fill:var(--vie-ink);font-family:inherit}\n.vie-general-chart-controls{gap:var(--vie-gap)}\n.vie-general-chart-legend{gap:8px 14px;flex-wrap:wrap}\n.vie-control-label{flex-wrap:wrap}.vie-control-label>span{overflow-wrap:anywhere}\n.vie-row>.vie-generated-figure,.vie-row>div{min-width:0}\n.vie-generated-figure iframe{border-radius:8px;background:var(--vie-bg)}\n.vie-mode-control{display:inline-flex;align-items:center;min-width:0;gap:5px;font-size:13px}\n.vie-mode-trigger{display:flex;align-items:center;gap:4px;min-width:0;max-width:220px;height:28px;padding:0 4px 0 8px;border:none;border-radius:var(--dsw-radius-sm,6px);outline:none;background:transparent;color:var(--dsw-alias-label-secondary,#606776);font:400 13px/20px system-ui,sans-serif;cursor:pointer}\n.vie-mode-trigger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,#f0f2f5)}\n.vie-mode-trigger:focus-visible{box-shadow:0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary,#5483ef))}\n.vie-mode-trigger:disabled{color:var(--dsw-alias-label-dimmed,#a3a8b2);cursor:default}\n.vie-mode-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.vie-mode-chevron{flex:0 0 auto;color:var(--dsw-alias-label-caption,#8a919d);transition:transform 120ms ease}\n.vie-mode-trigger[aria-expanded=true] .vie-mode-chevron{transform:rotate(180deg)}\n.vie-mode-menu{z-index:1100;min-width:168px;padding:4px;border:0;border-radius:var(--dsw-radius-lg,12px);background:var(--dsw-menu-surface-fill,#fff);color:var(--dsw-alias-label-primary,#242933);box-shadow:var(--dsw-elevation-prominent,0 8px 28px #0002);backdrop-filter:var(--dsw-menu-backdrop-filter,none);font:13px/20px system-ui,sans-serif}\n.vie-mode-menu>button{display:flex;align-items:center;justify-content:space-between;gap:6px;width:100%;min-height:34px;padding:6px 8px;background:transparent;color:inherit;border:0;border-radius:var(--dsw-radius-md,6px);font:inherit;text-align:left;cursor:pointer}\n.vie-mode-menu>button:hover,.vie-mode-menu>button:focus-visible{background:var(--dsw-alias-interactive-bg-hover,#f0f2f5);outline:none}\n.vie-mode-menu>button[aria-checked=true]>span:last-child{color:var(--dsw-alias-state-business-primary,#5483ef)}\n:where([data-theme=dark],.dark) .vie-mode-control{color-scheme:dark}\n:where([data-theme=dark],.dark) .vie-mode-menu{background:var(--dsw-menu-surface-fill,#262b34);color:var(--dsw-alias-label-primary,#e4eaf1)}\n.vie-mode-control [role=status]{max-width:240px;font-size:11px}\n:where([data-theme=dark],.dark) .vie-mode-trigger{color:var(--dsw-alias-label-secondary,#b4bfcc)}\n:where([data-theme=dark],.dark) .vie-mode-trigger:hover:not(:disabled),:where([data-theme=dark],.dark) .vie-mode-menu>button:hover,:where([data-theme=dark],.dark) .vie-mode-menu>button:focus-visible{background:var(--dsw-alias-interactive-bg-hover,#343d49)}\n.vie-visual-content{scrollbar-width:none}.vie-visual-content::-webkit-scrollbar{display:none}\n@container(max-width:520px){.vie-row{grid-template-columns:minmax(0,1fr)}}\n@media(max-width:520px){.vie-row{grid-template-columns:minmax(0,1fr)}.vie-body{padding:12px}.vie-general-chart-controls{grid-template-columns:minmax(0,1fr)}}\n@media(prefers-reduced-motion:reduce){.vie-shell *{transition:none!important;scroll-behavior:auto!important}}\n\n.vie-visual-panel[data-vie-visual=Flow] .vie-visual-svg{max-height:none}\n\n.vie-visual-panel[data-vie-visual=Flow] .vie-visual-svg{min-width:320px}\n.vie-visual-panel[data-vie-visual=Flow] .vie-visual-content{overflow:auto}\n\n/* A / neutral controls. Native views and opaque figures share this vocabulary.\n   Control colors are separate from semantic graph/data colors. */\n.vie-shell,[data-vie-runtime]{--vie-control-radius:10px;--vie-control-height:38px;--vie-control-compact:32px;--vie-control-gap:8px;--vie-control-primary:var(--vie-ink,#272c33);--vie-control-on-primary:var(--vie-bg,#fff);--vie-control-stroke:var(--vie-stroke,#e4e8ed);--vie-control-layer:color-mix(in srgb,var(--vie-ink,#272c33) 5%,var(--vie-bg,#fff));--vie-control-track:color-mix(in srgb,var(--vie-ink,#272c33) 12%,var(--vie-bg,#fff));--vie-control-focus:color-mix(in srgb,var(--vie-ink,#272c33) 65%,var(--vie-bg,#fff));--vie-control-thumb:#fff}\n.vie-shell :where(button),[data-vie-runtime] :where(button){box-sizing:border-box;font:inherit;min-height:var(--vie-control-height);border-radius:var(--vie-control-radius);padding:7px 12px;cursor:pointer;touch-action:manipulation}\n.vie-shell :is(button.vie-button,button.vie-pill,button.vie-context-button,button.vie-can-tab,button.vie-scene-button),.vie-shell :is(.vie-visual-zoom,.vie-case-tabs,.vie-animation-controls,.vie-flow-footer,.vie-flow-roots,.vie-general-chart>header)>button,[data-vie-runtime] button{appearance:none;font:500 12px/1.5 system-ui,-apple-system,\"Segoe UI\",\"Microsoft YaHei\",sans-serif;min-height:var(--vie-control-height);border:1px solid var(--vie-control-stroke);border-radius:var(--vie-control-radius);background:var(--vie-bg,#fff);color:var(--vie-ink,#272c33);padding:7px 12px;box-shadow:none;transition:background-color .12s,border-color .12s}\n.vie-shell :where(button):disabled,[data-vie-runtime] :where(button):disabled{cursor:default;opacity:.45}\n.vie-shell button:hover:not(:disabled),[data-vie-runtime] button:hover:not(:disabled){background:var(--vie-control-layer)}\n.vie-shell :is(button,input,select):focus-visible,[data-vie-runtime] :is(button,input,select):focus-visible{outline:2px solid var(--vie-control-focus);outline-offset:3px}\n.vie-shell :is(.vie-pill,.vie-button,.vie-context-button,.vie-flow-footer button,.vie-case-tabs button,.vie-scene-button):focus-visible{outline:2px solid var(--vie-control-focus);outline-offset:3px}\n.vie-shell :is([data-vie-play],.vie-scene-button.is-primary,.vie-flow-footer button.vie-flow-next),.vie-sdk-transport button:first-child,[data-vie-runtime] :is(button.primary,button[data-vie-button=primary],button.vie-question-next){background:var(--vie-control-primary);border-color:var(--vie-control-primary);color:var(--vie-control-on-primary)}\n.vie-shell :is([data-vie-play],.vie-scene-button.is-primary,.vie-flow-footer button.vie-flow-next):hover:not(:disabled),.vie-sdk-transport button:first-child:hover:not(:disabled),[data-vie-runtime] :is(button.primary,button[data-vie-button=primary],button.vie-question-next):hover:not(:disabled){background:color-mix(in srgb,var(--vie-control-primary) 88%,var(--vie-control-on-primary));border-color:transparent}\n[data-vie-runtime] button[data-vie-button=ghost]{background:transparent;border-color:transparent;color:var(--vie-muted,#7d8794)}\n[data-vie-runtime] button[data-vie-button=ghost]:hover:not(:disabled){background:var(--vie-control-layer);color:var(--vie-ink)}\n.vie-shell .vie-figure-actions button,.vie-shell .vie-context-row button{min-height:var(--vie-control-compact);font-size:12px;border-radius:var(--vie-control-radius);padding:5px 10px;color:var(--vie-muted)}\n.vie-shell .vie-segmented,.vie-shell .vie-flow-modes,[data-vie-runtime] .vie-learn-tabs{padding:3px;gap:3px;border-radius:10px;background:var(--vie-control-layer)}\n.vie-shell .vie-segmented button,.vie-shell .vie-flow-modes button,[data-vie-runtime] .vie-learn-tabs button{min-height:var(--vie-control-compact);padding:5px 10px;border:1px solid transparent;border-radius:7px;background:transparent;color:var(--vie-muted,#7d8794);font:500 12px/1.5 system-ui,-apple-system,\"Segoe UI\",\"Microsoft YaHei\",sans-serif;box-shadow:none}\n.vie-shell .vie-segmented button[aria-pressed=true],.vie-shell .vie-flow-modes button[aria-pressed=true],[data-vie-runtime] .vie-learn-tabs button[aria-selected=true]{background:var(--vie-bg,#fff);color:var(--vie-ink,#272c33);border-color:var(--vie-control-stroke);box-shadow:0 1px 3px #1420330a}\n.vie-shell .vie-case-tabs button[aria-selected=true],.vie-shell button.vie-can-tab.active,.vie-shell button.vie-pill.selected,[data-vie-runtime] .vie-sdk-toolbar button[aria-pressed=true]{background:var(--vie-control-layer);border-color:var(--vie-control-primary);color:var(--vie-ink,#272c33)}\n.vie-shell :is(select,input[type=number]),[data-vie-runtime] :is(select,input[type=number]){box-sizing:border-box;max-width:100%;min-width:0;min-height:var(--vie-control-height);border:1px solid var(--vie-control-stroke);border-radius:var(--vie-control-radius);background:var(--vie-bg,#fff);color:var(--vie-ink,#272c33);font:400 13px/1.5 system-ui,-apple-system,\"Segoe UI\",\"Microsoft YaHei\",sans-serif;padding:7px 10px;font-variant-numeric:tabular-nums}\n.vie-shell input[type=number],[data-vie-runtime] input[type=number]{appearance:textfield;-moz-appearance:textfield}\n.vie-shell input[type=number]::-webkit-inner-spin-button,.vie-shell input[type=number]::-webkit-outer-spin-button,[data-vie-runtime] input[type=number]::-webkit-inner-spin-button,[data-vie-runtime] input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}\n.vie-shell input[type=range],[data-vie-runtime] input[type=range]{appearance:none;-webkit-appearance:none;box-sizing:border-box;display:block;width:100%;max-width:100%;height:24px;min-height:24px;padding:0;margin:0;background:transparent;cursor:pointer;touch-action:pan-y;accent-color:var(--vie-control-primary)}\n.vie-shell input[type=range]::-webkit-slider-runnable-track,[data-vie-runtime] input[type=range]::-webkit-slider-runnable-track{height:4px;border-radius:999px;background:linear-gradient(to right,var(--vie-control-primary) var(--vie-range-fill,0%),var(--vie-control-track) var(--vie-range-fill,0%))}\n.vie-shell input[type=range]::-moz-range-track,[data-vie-runtime] input[type=range]::-moz-range-track{height:4px;border-radius:999px;background:var(--vie-control-track)}\n.vie-shell input[type=range]::-moz-range-progress,[data-vie-runtime] input[type=range]::-moz-range-progress{height:4px;border-radius:999px;background:var(--vie-control-primary)}\n.vie-shell input[type=range]::-webkit-slider-thumb,[data-vie-runtime] input[type=range]::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:14px;height:14px;margin-top:-5px;border-radius:50%;border:1px solid var(--vie-control-stroke);background:var(--vie-control-thumb);box-shadow:0 1px 4px #10182826}\n.vie-shell input[type=range]::-moz-range-thumb,[data-vie-runtime] input[type=range]::-moz-range-thumb{width:14px;height:14px;border-radius:50%;border:1px solid var(--vie-control-stroke);background:var(--vie-control-thumb);box-shadow:0 1px 4px #10182826}\n.vie-shell :is(input[type=range],input[type=number],select):disabled,[data-vie-runtime] :is(input[type=range],input[type=number],select):disabled{opacity:.45;cursor:default}\n.vie-shell :is(input[type=checkbox],input[type=radio]),[data-vie-runtime] :is(input[type=checkbox],input[type=radio]){accent-color:var(--vie-control-primary)}\n.vie-shell input[type=checkbox][role=switch],[data-vie-runtime] input[type=checkbox][role=switch]{appearance:none;-webkit-appearance:none;position:relative;display:inline-block;width:34px;height:20px;min-width:34px;min-height:20px;padding:0;margin:0;border:0;border-radius:999px;background:var(--vie-control-track);cursor:pointer;vertical-align:middle}\n.vie-shell input[type=checkbox][role=switch]::before,[data-vie-runtime] input[type=checkbox][role=switch]::before{content:\"\";position:absolute;left:3px;top:3px;width:14px;height:14px;border-radius:50%;background:var(--vie-control-thumb);box-shadow:0 1px 3px #10182820;transition:transform .14s}\n.vie-shell input[type=checkbox][role=switch]:checked,[data-vie-runtime] input[type=checkbox][role=switch]:checked{background:var(--vie-control-primary)}\n.vie-shell input[type=checkbox][role=switch]:checked::before,[data-vie-runtime] input[type=checkbox][role=switch]:checked::before{transform:translateX(14px);background:var(--vie-control-on-primary)}\n.vie-shell input[type=checkbox][role=switch]:disabled,[data-vie-runtime] input[type=checkbox][role=switch]:disabled{opacity:.45;cursor:default}\n.vie-sdk-viewport{max-width:100%;overflow:auto;overscroll-behavior:contain;border-radius:12px}\n.vie-sdk-viewport[data-vie-pannable=true]::after{content:'左右滑动查看完整图形';display:block;position:sticky;left:0;width:100%;font-size:12px;color:var(--vie-muted,#718096);padding:4px 0;text-align:center}\n.vie-sdk-transport{display:flex;flex-wrap:wrap;align-items:center;gap:var(--vie-control-gap);margin-top:12px}\n.vie-sdk-transport input[type=range]{flex:1 1 140px;min-width:80px;max-width:100%}\n.vie-sdk-canvas{display:block;max-width:100%}\n.vie-sdk-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:var(--vie-control-gap);margin-block:10px}\n.vie-sdk-readouts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(120px,100%),1fr));gap:8px;margin:10px 0}\n.vie-sdk-readouts>div{min-width:0;border:1px solid var(--vie-stroke);border-radius:var(--vie-control-radius);padding:10px 12px;background:var(--vie-bg,#fff)}\n.vie-sdk-readouts dt{font-size:12px;color:var(--vie-muted,#718096);overflow-wrap:anywhere}\n.vie-sdk-readouts dd{margin:4px 0 0;font-variant-numeric:tabular-nums;font-weight:600;overflow-wrap:anywhere}\n[data-vie-runtime] .vie-question-option{min-height:44px;padding:10px 12px;border-radius:var(--vie-control-radius);font-size:14px;text-align:left}\n[data-vie-runtime] .vie-question-option:disabled{opacity:1}\n[data-vie-runtime] .vie-question-option.is-correct{border-color:var(--vie-secondary);background:color-mix(in srgb,var(--vie-secondary) 12%,var(--vie-bg))}\n[data-vie-runtime] .vie-question-option.is-wrong{border-color:var(--vie-warning);background:color-mix(in srgb,var(--vie-warning) 12%,var(--vie-bg))}\n[data-vie-runtime] .vie-question-progress{accent-color:var(--vie-control-primary)}\n.vie-sdk-3d{position:relative;width:100%;max-width:100%;overflow:hidden;border-radius:12px;background:var(--vie-layer,#f4f6fa)}.vie-sdk-3d canvas{display:block;width:100%;height:100%;max-width:100%}\n@media(pointer:coarse){.vie-shell,[data-vie-runtime]{--vie-control-height:44px;--vie-control-compact:44px}}\n@media(max-width:440px){.vie-sdk-transport{gap:6px}.vie-sdk-transport button{flex:1}.vie-sdk-transport input[type=range]{flex-basis:100%}}\n@media(prefers-reduced-motion:reduce){.vie-shell input[role=switch]::before,[data-vie-runtime] input[role=switch]::before{transition:none}}\n\n/* Narrow to command rows carrying VIE's own internal marker. No log rewriting. */\n[data-chat-node-key][data-vie-internal-command]{display:none!important;margin:0!important}\n.vie-command-view{font:inherit;color:inherit;padding:6px 0;min-width:0}\n.vie-command-line{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;font-size:13px}\n.vie-command-line code{font-family:inherit;color:inherit;opacity:.65}\n.vie-command-view details{margin-top:6px;font-size:13px}\n.vie-command-view pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.65 ui-monospace,monospace}\n";
const VIE_STUDY_POLICY="学习模式：顺序与判断流程优先原生visual{kind:Flow,spec:{title,nodes,edges}}，默认由引擎逐步引导，可切回总览；无需手写步骤控件或把每个节点做成learning阶段。出题、练习或测验请求优先直接交付题组，不先安排概念图或长篇讲课；使用learning.questions数组，一张卡片逐题作答，进度、计分、点击后解析、下一题、结果与重做由引擎提供；不得在正文、图注或表格提前给出答案。面向任意知识主题，按用户水平先给一句直观定义和因果链，再用一张主图解释。简单问题不强制应用图、第二张图或测验；确有教学价值再追加。每图正文先解释新增关系，默认3–5句，深入推导按用户要求展开；结尾只保留一条记忆链，不重复全文。优先document.blocks中的type:\"learning\"，由引擎统一生成按钮、阶段说明、测验、主题和状态恢复；模型只填写当前主题的SVG/HTML和数据，不重写控制逻辑。示例：{type:\"learning\",title:\"过程\",stages:[{label:\"前\",html:\"<svg viewBox=\\\"0 0 320 180\\\">...</svg>\"},{label:\"后\",html:\"...\"}]}。测验可单独提交{type:\"learning\",title:\"理解测试\",quiz:{question:\"问题\",options:[{label:\"A\",feedback:\"原因\"},{label:\"B\",feedback:\"原因\"}],correct:1}}，correct必填且从0开始，不能根据反馈猜答案。图注、正文及总结不得提前泄露该题答案或等价结论，答案原因只在选择后反馈。复杂动画仍可用figure及VIE.mountLearning，自由绘制内容，不限领域模板。阶段必须改变对象、数量、位置、连接或高亮，不能只换文字；线段真正连接对应部件，符号与标题分行，不用绝对定位把文字压进标题；窄屏重排且留白不过量。主图外壳已有标题，内部不重复；通用样式优先使用主题色。简化模型注明假设，动态平衡不是粒子停止，不臆测课本章节。正文由Harness渲染，纯文字与调试请求优先。";
/** Shared authoring policy and document contracts consumed by validation and reference generation. */
const VIE_POLICY='三维讲解用内置VIE.scene3d（本地Three.js、相机/光照/旋转缩放与通用几何），不为知识问题搭建外部项目、安装依赖或调用其他开发技能。数据图优先chart；自由SVG用g.coordinates统一映射坐标、标注与读数，不把原始像素与数据值分开硬编码。 自绘二维图优先内置VIE.svg与VIE.animate，参数用document.controls与bindings；不要重复编写箭头、播放栏和状态订阅。控件沿用A式中性UI；参数用document.controls，操作用VIE.ui.toolbar（item.variant为primary/secondary/ghost），不重绘默认按钮、滑轨和开关。图形内容自由配色。SDK坐标用像素数组，标签由引擎尝试避让，密集图仍需减少标注。 流程图优先原生Flow数据；默认全景分支布局按连线分层，学习模式默认逐步引导。模型只给nodes/edges和必要detail，不手写导航按钮。每条边必须表达实际关系，不因列表顺序添加连线。 每张图后用Harness正文解释图中关键关系，不能仅过渡一句便出下一图。优先原生graphic/chart/Flow，减少手写SVG。变化过程明确分开前→后，箭头连接对应对象，不能将前后工件重叠或画成断裂材料。窄屏用CSS重排或分步查看，标注不低于11px。说明材料、工况与适用范围，不把热锻等同所有锻造；数值注明来源，示意值不能充当工艺限值。VIE只画当前段落的图、交互、图例和短标注；完整解释/公式/表格由Harness正文渲染。同图内的曲线、端点、标签、箭头和读数必须来自同一组坐标或数据，不能互换左右端点、让方向与标签冲突；无法核实的数值省略或明确标为示意。任意主题均可。出题优先使用learning.questions题组，一张卡片逐题作答并计分，答案解析只在作答后展示；阶段演示与测验优先使用learning数据块，由引擎提供通用控件，无需手写JS；其他图形继续自由绘制。复杂主题按图→正文解释→下一图→正文解释展开，每张图聚焦一个概念；勿把各章节拼成一张SVG的编号小面板或多图海报。需同时比较或共享交互才并列。默认flow按调用位置显示，补图/修图无需more:true，通常1张、必要时2–3张。visualId仅供修改，不是图片URL；不必先加载技能或写脚本。';
const VIE_ENTRY_POLICY='VIE是通用图文交互引擎。讲解直接调用vie_explain，图与交互由VIE显示，完整解释由Harness正文呈现；按图→文→图→文编排，每图聚焦一个概念。优先原生数据图与Flow；自由绘制可用SVG/Canvas或离线VIE.scene3d，无需安装依赖或搭建项目。复用引擎A式中性控件与状态，坐标、标注和读数共用数据；注明假设与数值来源。纯文字、文件任务和开发调试遵循用户意图。只使用真实工具调用，预算结束后正常正文收尾。';
const VIE_VISUAL_POLICY='Use actual tool calls only; never print DSML/DSEL tags or visualization source in prose. When tools are unavailable, finish with normal prose. One focused concept per graphic; write the full explanation in normal Harness prose, then call the next graphic if needed. No multi-section SVG collages. Side-by-side only for comparisons/shared interaction. Any topic; prefer vie_explain, default flow. more is optional; visualId is not an image URL.';
const DOCUMENT_PROPERTIES=Object.freeze({caption:{type:'string',description:'Compatibility alias for top-level caption (max 140 characters). Prefer the tool-level caption; explicit tool-level value takes precedence.'},type:{type:'string',enum:['learning'],description:'Compatibility shorthand. When blocks are stage objects with html, the engine wraps them into one learning block. In canonical documents, put type on each block, not at the document root.'},title:{type:'string',description:'Short title; if omitted, inferred from the first block title.'},controls:{type:'array',items:{type:'json'}},derive:{type:'json',description:'Optional unique derived keys mapped to numeric expressions.'},layout:{type:'string',enum:['stack','grid']},blocks:{type:'array',required:true,description:'One focused graphic per call. Flow example: [{type:"visual",kind:"Flow",spec:{title:"Process",nodes:[{id:"a",label:"Start"},{id:"b",label:"End"}],edges:[{from:"a",to:"b"}]}}]. For visual blocks put title inside spec.',items:{type:'json'}}});
const DOCUMENT_CONTRACT=Object.freeze({
  fields:Object.keys(DOCUMENT_PROPERTIES),
  blocks:{
    learning:{fields:['type','title','key','legend','note','stages','quiz','questions'],help:'Validated generic learning UI, no JavaScript needed. Prefer questions:[{title?,question,options:[{label,feedback?}],correct,explanation?}] for 1–32 question exercises: one card, progress, score, locked answer, next, results and restart. Correct is zero-based. stages:[{label,title?,caption?,html,mobileHtml?}] contains freely drawn SVG/HTML. Optional quiz:{question,options:[{label,feedback}],correct:1}; correct is required and zero-based. Stages, quiz or questions required. Use theme tokens; do not repeat the outer title.'},
    graphic:{fields:['type','kind','title','items','unit'],help:'Engine-rendered bars/donut/vectors. items:[{label,value}] or vectors [{label,x,y}], optional tone. No HTML/CSS/JS required.'},
    chart:{fields:['type','title','x','y','series','regions','controls','inputs','bindings','note'],help:'Formula or data curves, region fills; bindings map variable names to shared control/derived keys.'},
    visual:{fields:['type','kind','spec'],help:'Flow {title,nodes:[{id,label,detail?}],edges:[{from,to,label?}],presentation?:overview|guided} uses topology-based overview or guided navigation, defaults by session mode; controls are reusable across subjects. RelationGraph, Timeline, Diagram and Animation also supported. Diagram coordinates may bind /shared/key or /derived/key.'},
    figure:{fields:['type','title','html','css','js','state','height','bindings'],help:'Built-in SDK: VIE.scene3d({root,height}) provides offline Three.js, camera/light/orbit/zoom and box/sphere/cylinder/torus/helix/mesh/group; use VIE.animate for motion, no CDN/npm/project setup. VIE.svg({root,width,height}) -> line/arrow/circle/rect/path/curve/angle/dimension/axes/label/group; geometry uses [x,y] points (x/y and cx/cy/r aliases accepted); strokeWidth is stroke thickness, rect.width is geometry. g.coordinates({x:[min,max],y:[min,max],bounds:[left,top,width,height]}) maps data with point/line/series/marker. Returned handles have set(next). VIE.onState(callback), VIE.canvas({root,draw}), VIE.animate({root,duration,stateKey,render}) reuse state, resize and transport controls. SDK details are in the skill. Learning UI: VIE.mountLearning({root:"#lesson",key:"lesson",title,legend?,note?,stages:[{label,title,caption,html,mobileHtml?}],quiz?:{question,options:[{label,feedback}],correct:0}}) supplies generic stages, local quiz feedback and state. One focused diagram in an isolated HTML/CSS/JS sandbox; do not pack independent chapters into numbered SVG mini-panels. Put each chapter graphic in its own call, separated by native prose. bindings map state keys to shared controls/derived keys.'},
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


/** Stable scene identity for small, session-scoped runtime acknowledgements. */
function vieSourceIdentity(source){let hash=2166136261;for(let i=0;i<source.length;i++)hash=Math.imul(hash^source.charCodeAt(i),16777619);return source.length.toString(36)+'-'+(hash>>>0).toString(36);}

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

/** Shared, deterministic SVG argument contract. No DOM or authored-code execution. */
const SVG_SDK_KINDS=['line','arrow','label','circle','rect','path','curve','angle','dimension'];
const SVG_SDK_KEYS={
 line:['from','to','x1','y1','x2','y2','label','width'],arrow:['from','to','x1','y1','x2','y2','label','width'],dimension:['from','to','x1','y1','x2','y2','offset','label','width'],
 label:['at','x','y','text','anchor','textAnchor','text-anchor','align','bold','fontSize','size','fontWeight'],circle:['at','x','y','cx','cy','radius','r','label','width'],rect:['at','x','y','width','height','w','h','radius','rx','ry','label'],path:['d','width'],curve:['points','width'],angle:['at','x','y','radius','r','from','to','label','width']
};
function svgSDKError(kind,key,message){const error=Error('VIE_SDK_ARGUMENT '+kind+'.'+key+': '+message);error.code='VIE_SDK_ARGUMENT';error.field=kind+'.'+key;throw error;}
function svgSDKNumber(value,kind,key,min=-1e7,max=1e7){if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max)svgSDKError(kind,key,'expected a finite number in '+min+'..'+max);return value;}
function svgSDKColor(value){
 const themes=['primary','secondary','accent','muted','warning','ink','bg','stroke','layer'];if(themes.includes(value))return 'var(--vie-'+value+')';
 if(typeof value!=='string'||value.length>160||!(/^(?:#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})|[a-z]+|var\(--vie-[a-z-]+\)|(?:rgb|rgba|hsl|hsla)\([\d\s.,%+\-/deg]+\))$/i.test(value)))svgSDKError('color','value','use a theme name or a CSS color');return value;
}
function normalizeSVGPrimitive(kind,input,base={}){
 if(!SVG_SDK_KINDS.includes(kind))svgSDKError(kind,'method','unknown drawing method');
 if(!input||typeof input!=='object'||Array.isArray(input))svgSDKError(kind,'options','expected an object');
 const common=['tone','color','stroke','strokeWidth','stroke-width','fill','opacity','strokeOpacity','fillOpacity','dash','strokeDasharray'];
 for(const k of Object.keys(input))if(![...common,...SVG_SDK_KEYS[kind]].includes(k))svgSDKError(kind,k,'unknown field');
 const own=k=>Object.hasOwn(input,k),pick=(key,aliases=[],fallback)=>own(key)?input[key]:(aliases.find(own)!==undefined?input[aliases.find(own)]:base[key]??fallback);
 const n=(key,aliases,fallback,min=-1e7,max=1e7)=>svgSDKNumber(pick(key,aliases,fallback),kind,key,min,max);
 const p=(key,x,y)=>{let at=pick(key);const ax=Array.isArray(x)?x.find(own):own(x)?x:undefined,ay=Array.isArray(y)?y.find(own):own(y)?y:undefined;
  if(ax!==undefined||ay!==undefined){const alias=[ax===undefined?base[key]?.[0]:input[ax],ay===undefined?base[key]?.[1]:input[ay]];if(own(key)&&(!Array.isArray(at)||alias.some((v,i)=>v!==undefined&&v!==at[i])))svgSDKError(kind,key,'conflicting coordinate aliases');at=own(key)?at:alias;}
  if(!Array.isArray(at)||at.length!==2)svgSDKError(kind,key,'expected [x,y] (x/y aliases also accepted)');return at.map(v=>svgSDKNumber(v,kind,key));};
 const tone=pick('tone'),stroke=svgSDKColor(own('stroke')?input.stroke:own('tone')?input.tone:own('color')?input.color:base.stroke??'primary'),fill=pick('fill',[],false);
 const out={stroke,labelColor:svgSDKColor(pick('color',[],tone??base.labelColor??'ink')),strokeWidth:n('strokeWidth',['stroke-width',...(kind==='rect'?[]:['width'])],2,0,100),fill:fill===true||!own('fill')&&base.fillFollowsStroke?stroke:fill===false||fill===undefined?'none':svgSDKColor(fill),fillFollowsStroke:fill===true||!own('fill')&&!!base.fillFollowsStroke,opacity:n('opacity',[],1,0,1),strokeOpacity:n('strokeOpacity',[],1,0,1),fillOpacity:n('fillOpacity',[],1,0,1)};
 const dash=pick('dash',['strokeDasharray']);if(dash!==undefined){const values=Array.isArray(dash)?dash:typeof dash==='string'?dash.trim().split(/[ ,]+/).map(Number):null;if(!values||values.length>16)svgSDKError(kind,'dash','expected at most 16 numeric lengths');out.dash=values.map(v=>svgSDKNumber(v,kind,'dash',0,1000)).join(' ');}
 if(['line','arrow','dimension'].includes(kind)){out.from=p('from','x1','y1');out.to=p('to','x2','y2');if(kind==='dimension')out.offset=n('offset',[],24);}
 if(['label','rect','circle','angle'].includes(kind))out.at=p('at',kind==='circle'?['cx','x']:'x',kind==='circle'?['cy','y']:'y');
 if(['circle','angle'].includes(kind))out.radius=n('radius',['r'],kind==='angle'?32:undefined,0,1e7);
 if(kind==='rect'){out.width=n('width',['w'],undefined,0,1e7);out.height=n('height',['h'],undefined,0,1e7);out.radius=n('radius',['rx'],10,0,1e7);out.ry=n('ry',[],out.radius,0,1e7);}
 if(kind==='label'){out.text=String(pick('text',[],'' )).slice(0,160);out.color=svgSDKColor(pick('color',[],own('fill')?input.fill:tone??base.color??'ink'));out.fontSize=n('fontSize',['size'],14,1,96);out.fontSize=Math.max(12,out.fontSize);const anchor=pick('anchor',['textAnchor','text-anchor','align'],'middle');out.anchor=({center:'middle',left:'start',right:'end'})[anchor]??anchor;if(!['middle','start','end'].includes(out.anchor))svgSDKError(kind,'anchor','use start, middle or end');out.bold=!!pick('bold',[],false)||Number(pick('fontWeight',[],400))>=600;}
 if(kind==='angle'){out.from=n('from',[],0);out.to=n('to',[],45);if(out.radius<=0||Math.abs(out.to-out.from)>=360)svgSDKError(kind,'angle','use radius > 0 and span < 360 degrees');}
 if(kind==='path'){out.d=pick('d',[],'');if(typeof out.d!=='string'||out.d.length>32768)svgSDKError(kind,'d','expected path text of at most 32768 characters');}
 if(kind==='curve'){const points=pick('points');if(!Array.isArray(points)||points.length<2||points.length>2000)svgSDKError(kind,'points','expected 2..2000 points');out.points=points.map(point=>{if(!Array.isArray(point)||point.length!==2)svgSDKError(kind,'points','expected [x,y]');return point.map(v=>svgSDKNumber(v,kind,'points'));});}
 if(kind!=='label'&&pick('label')!==undefined)out.label=String(pick('label')).slice(0,160);
 return out;
}
/** Affine data-to-pixel mapping; no guessed phase boundaries or domain values. */
function createSVGCoordinateMap(options={},width=520,height=280){
 const range=(value,key)=>{if(!Array.isArray(value)||value.length!==2||!value.every(Number.isFinite)||value[0]>=value[1])svgSDKError('coordinates',key,'expected [min,max] with min < max');return [...value];};
 const x=range(options.x??[0,1],'x'),y=range(options.y??[0,1],'y'),bounds=options.bounds??[48,24,width-72,height-60];
 if(!Array.isArray(bounds)||bounds.length!==4||!bounds.every(Number.isFinite)||bounds[2]<=0||bounds[3]<=0)svgSDKError('coordinates','bounds','expected [left,top,width,height]');
 return {x,y,bounds:[...bounds],point(value,second){const p=Array.isArray(value)?value:[value,second];if(p.length!==2||!p.every(Number.isFinite))svgSDKError('coordinates','point','expected finite [x,y] data');return [bounds[0]+(p[0]-x[0])/(x[1]-x[0])*bounds[2],bounds[1]+bounds[3]-(p[1]-y[0])/(y[1]-y[0])*bounds[3]];}};
}

/** Parse only: reject provable SDK mistakes without evaluating authored code. */
const VIEAcorn=(()=>{const exports={},module={exports};
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.acorn = {}));
})(this, (function (exports) { 'use strict';

  // This file was generated. Do not modify manually!
  var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];

  // This file was generated. Do not modify manually!
  var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];

  // This file was generated. Do not modify manually!
  var nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0897-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0cf3\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ece\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\u30fb\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f\uff65";

  // This file was generated. Do not modify manually!
  var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c8a\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7cd\ua7d0\ua7d1\ua7d3\ua7d5-\ua7dc\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";

  // These are a run-length and offset encoded representation of the
  // >0xffff code points that are a valid part of identifiers. The
  // offset starts at 0x10000, and each pair of numbers represents an
  // offset to the next range, and then a size of the range.

  // Reserved word lists for various dialects of the language

  var reservedWords = {
    3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
    5: "class enum extends super const export import",
    6: "enum",
    strict: "implements interface let package private protected public static yield",
    strictBind: "eval arguments"
  };

  // And the keywords

  var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

  var keywords$1 = {
    5: ecma5AndLessKeywords,
    "5module": ecma5AndLessKeywords + " export import",
    6: ecma5AndLessKeywords + " const class extends export import super"
  };

  var keywordRelationalOperator = /^in(stanceof)?$/;

  // ## Character categories

  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

  // This has a complexity linear to the value of the code. The
  // assumption is that looking up astral identifier characters is
  // rare.
  function isInAstralSet(code, set) {
    var pos = 0x10000;
    for (var i = 0; i < set.length; i += 2) {
      pos += set[i];
      if (pos > code) { return false }
      pos += set[i + 1];
      if (pos >= code) { return true }
    }
    return false
  }

  // Test whether a given character code starts an identifier.

  function isIdentifierStart(code, astral) {
    if (code < 65) { return code === 36 }
    if (code < 91) { return true }
    if (code < 97) { return code === 95 }
    if (code < 123) { return true }
    if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code)) }
    if (astral === false) { return false }
    return isInAstralSet(code, astralIdentifierStartCodes)
  }

  // Test whether a given character is part of an identifier.

  function isIdentifierChar(code, astral) {
    if (code < 48) { return code === 36 }
    if (code < 58) { return true }
    if (code < 65) { return false }
    if (code < 91) { return true }
    if (code < 97) { return code === 95 }
    if (code < 123) { return true }
    if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code)) }
    if (astral === false) { return false }
    return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes)
  }

  // ## Token types

  // The assignment of fine-grained, information-carrying type objects
  // allows the tokenizer to store the information it has about a
  // token in a way that is very cheap for the parser to look up.

  // All token type variables start with an underscore, to make them
  // easy to recognize.

  // The `beforeExpr` property is used to disambiguate between regular
  // expressions and divisions. It is set on all token types that can
  // be followed by an expression (thus, a slash after them would be a
  // regular expression).
  //
  // The `startsExpr` property is used to check if the token ends a
  // `yield` expression. It is set on all token types that either can
  // directly start an expression (like a quotation mark) or can
  // continue an expression (like the body of a string).
  //
  // `isLoop` marks a keyword as starting a loop, which is important
  // to know when parsing a label, in order to allow or disallow
  // continue jumps to that label.

  var TokenType = function TokenType(label, conf) {
    if ( conf === void 0 ) conf = {};

    this.label = label;
    this.keyword = conf.keyword;
    this.beforeExpr = !!conf.beforeExpr;
    this.startsExpr = !!conf.startsExpr;
    this.isLoop = !!conf.isLoop;
    this.isAssign = !!conf.isAssign;
    this.prefix = !!conf.prefix;
    this.postfix = !!conf.postfix;
    this.binop = conf.binop || null;
    this.updateContext = null;
  };

  function binop(name, prec) {
    return new TokenType(name, {beforeExpr: true, binop: prec})
  }
  var beforeExpr = {beforeExpr: true}, startsExpr = {startsExpr: true};

  // Map keyword names to token types.

  var keywords = {};

  // Succinct definitions of keyword token types
  function kw(name, options) {
    if ( options === void 0 ) options = {};

    options.keyword = name;
    return keywords[name] = new TokenType(name, options)
  }

  var types$1 = {
    num: new TokenType("num", startsExpr),
    regexp: new TokenType("regexp", startsExpr),
    string: new TokenType("string", startsExpr),
    name: new TokenType("name", startsExpr),
    privateId: new TokenType("privateId", startsExpr),
    eof: new TokenType("eof"),

    // Punctuation token types.
    bracketL: new TokenType("[", {beforeExpr: true, startsExpr: true}),
    bracketR: new TokenType("]"),
    braceL: new TokenType("{", {beforeExpr: true, startsExpr: true}),
    braceR: new TokenType("}"),
    parenL: new TokenType("(", {beforeExpr: true, startsExpr: true}),
    parenR: new TokenType(")"),
    comma: new TokenType(",", beforeExpr),
    semi: new TokenType(";", beforeExpr),
    colon: new TokenType(":", beforeExpr),
    dot: new TokenType("."),
    question: new TokenType("?", beforeExpr),
    questionDot: new TokenType("?."),
    arrow: new TokenType("=>", beforeExpr),
    template: new TokenType("template"),
    invalidTemplate: new TokenType("invalidTemplate"),
    ellipsis: new TokenType("...", beforeExpr),
    backQuote: new TokenType("`", startsExpr),
    dollarBraceL: new TokenType("${", {beforeExpr: true, startsExpr: true}),

    // Operators. These carry several kinds of properties to help the
    // parser use them properly (the presence of these properties is
    // what categorizes them as operators).
    //
    // `binop`, when present, specifies that this operator is a binary
    // operator, and will refer to its precedence.
    //
    // `prefix` and `postfix` mark the operator as a prefix or postfix
    // unary operator.
    //
    // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
    // binary operators with a very low precedence, that should result
    // in AssignmentExpression nodes.

    eq: new TokenType("=", {beforeExpr: true, isAssign: true}),
    assign: new TokenType("_=", {beforeExpr: true, isAssign: true}),
    incDec: new TokenType("++/--", {prefix: true, postfix: true, startsExpr: true}),
    prefix: new TokenType("!/~", {beforeExpr: true, prefix: true, startsExpr: true}),
    logicalOR: binop("||", 1),
    logicalAND: binop("&&", 2),
    bitwiseOR: binop("|", 3),
    bitwiseXOR: binop("^", 4),
    bitwiseAND: binop("&", 5),
    equality: binop("==/!=/===/!==", 6),
    relational: binop("</>/<=/>=", 7),
    bitShift: binop("<</>>/>>>", 8),
    plusMin: new TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true}),
    modulo: binop("%", 10),
    star: binop("*", 10),
    slash: binop("/", 10),
    starstar: new TokenType("**", {beforeExpr: true}),
    coalesce: binop("??", 1),

    // Keyword token types.
    _break: kw("break"),
    _case: kw("case", beforeExpr),
    _catch: kw("catch"),
    _continue: kw("continue"),
    _debugger: kw("debugger"),
    _default: kw("default", beforeExpr),
    _do: kw("do", {isLoop: true, beforeExpr: true}),
    _else: kw("else", beforeExpr),
    _finally: kw("finally"),
    _for: kw("for", {isLoop: true}),
    _function: kw("function", startsExpr),
    _if: kw("if"),
    _return: kw("return", beforeExpr),
    _switch: kw("switch"),
    _throw: kw("throw", beforeExpr),
    _try: kw("try"),
    _var: kw("var"),
    _const: kw("const"),
    _while: kw("while", {isLoop: true}),
    _with: kw("with"),
    _new: kw("new", {beforeExpr: true, startsExpr: true}),
    _this: kw("this", startsExpr),
    _super: kw("super", startsExpr),
    _class: kw("class", startsExpr),
    _extends: kw("extends", beforeExpr),
    _export: kw("export"),
    _import: kw("import", startsExpr),
    _null: kw("null", startsExpr),
    _true: kw("true", startsExpr),
    _false: kw("false", startsExpr),
    _in: kw("in", {beforeExpr: true, binop: 7}),
    _instanceof: kw("instanceof", {beforeExpr: true, binop: 7}),
    _typeof: kw("typeof", {beforeExpr: true, prefix: true, startsExpr: true}),
    _void: kw("void", {beforeExpr: true, prefix: true, startsExpr: true}),
    _delete: kw("delete", {beforeExpr: true, prefix: true, startsExpr: true})
  };

  // Matches a whole line break (where CRLF is considered a single
  // line break). Used to count lines.

  var lineBreak = /\r\n?|\n|\u2028|\u2029/;
  var lineBreakG = new RegExp(lineBreak.source, "g");

  function isNewLine(code) {
    return code === 10 || code === 13 || code === 0x2028 || code === 0x2029
  }

  function nextLineBreak(code, from, end) {
    if ( end === void 0 ) end = code.length;

    for (var i = from; i < end; i++) {
      var next = code.charCodeAt(i);
      if (isNewLine(next))
        { return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1 }
    }
    return -1
  }

  var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

  var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

  var ref = Object.prototype;
  var hasOwnProperty = ref.hasOwnProperty;
  var toString = ref.toString;

  var hasOwn = Object.hasOwn || (function (obj, propName) { return (
    hasOwnProperty.call(obj, propName)
  ); });

  var isArray = Array.isArray || (function (obj) { return (
    toString.call(obj) === "[object Array]"
  ); });

  var regexpCache = Object.create(null);

  function wordsRegexp(words) {
    return regexpCache[words] || (regexpCache[words] = new RegExp("^(?:" + words.replace(/ /g, "|") + ")$"))
  }

  function codePointToString(code) {
    // UTF-16 Decoding
    if (code <= 0xFFFF) { return String.fromCharCode(code) }
    code -= 0x10000;
    return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
  }

  var loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;

  // These are used when `options.locations` is on, for the
  // `startLoc` and `endLoc` properties.

  var Position = function Position(line, col) {
    this.line = line;
    this.column = col;
  };

  Position.prototype.offset = function offset (n) {
    return new Position(this.line, this.column + n)
  };

  var SourceLocation = function SourceLocation(p, start, end) {
    this.start = start;
    this.end = end;
    if (p.sourceFile !== null) { this.source = p.sourceFile; }
  };

  // The `getLineInfo` function is mostly useful when the
  // `locations` option is off (for performance reasons) and you
  // want to find the line/column position for a given character
  // offset. `input` should be the code string that the offset refers
  // into.

  function getLineInfo(input, offset) {
    for (var line = 1, cur = 0;;) {
      var nextBreak = nextLineBreak(input, cur, offset);
      if (nextBreak < 0) { return new Position(line, offset - cur) }
      ++line;
      cur = nextBreak;
    }
  }

  // A second argument must be given to configure the parser process.
  // These options are recognized (only `ecmaVersion` is required):

  var defaultOptions = {
    // `ecmaVersion` indicates the ECMAScript version to parse. Must be
    // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
    // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
    // (the latest version the library supports). This influences
    // support for strict mode, the set of reserved words, and support
    // for new syntax features.
    ecmaVersion: null,
    // `sourceType` indicates the mode the code should be parsed in.
    // Can be either `"script"` or `"module"`. This influences global
    // strict mode and parsing of `import` and `export` declarations.
    sourceType: "script",
    // `onInsertedSemicolon` can be a callback that will be called when
    // a semicolon is automatically inserted. It will be passed the
    // position of the inserted semicolon as an offset, and if
    // `locations` is enabled, it is given the location as a `{line,
    // column}` object as second argument.
    onInsertedSemicolon: null,
    // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
    // trailing commas.
    onTrailingComma: null,
    // By default, reserved words are only enforced if ecmaVersion >= 5.
    // Set `allowReserved` to a boolean value to explicitly turn this on
    // an off. When this option has the value "never", reserved words
    // and keywords can also not be used as property names.
    allowReserved: null,
    // When enabled, a return at the top level is not considered an
    // error.
    allowReturnOutsideFunction: false,
    // When enabled, import/export statements are not constrained to
    // appearing at the top of the program, and an import.meta expression
    // in a script isn't considered an error.
    allowImportExportEverywhere: false,
    // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
    // When enabled, await identifiers are allowed to appear at the top-level scope,
    // but they are still not allowed in non-async functions.
    allowAwaitOutsideFunction: null,
    // When enabled, super identifiers are not constrained to
    // appearing in methods and do not raise an error when they appear elsewhere.
    allowSuperOutsideMethod: null,
    // When enabled, hashbang directive in the beginning of file is
    // allowed and treated as a line comment. Enabled by default when
    // `ecmaVersion` >= 2023.
    allowHashBang: false,
    // By default, the parser will verify that private properties are
    // only used in places where they are valid and have been declared.
    // Set this to false to turn such checks off.
    checkPrivateFields: true,
    // When `locations` is on, `loc` properties holding objects with
    // `start` and `end` properties in `{line, column}` form (with
    // line being 1-based and column 0-based) will be attached to the
    // nodes.
    locations: false,
    // A function can be passed as `onToken` option, which will
    // cause Acorn to call that function with object in the same
    // format as tokens returned from `tokenizer().getToken()`. Note
    // that you are not allowed to call the parser from the
    // callback—that will corrupt its internal state.
    onToken: null,
    // A function can be passed as `onComment` option, which will
    // cause Acorn to call that function with `(block, text, start,
    // end)` parameters whenever a comment is skipped. `block` is a
    // boolean indicating whether this is a block (`/* */`) comment,
    // `text` is the content of the comment, and `start` and `end` are
    // character offsets that denote the start and end of the comment.
    // When the `locations` option is on, two more parameters are
    // passed, the full `{line, column}` locations of the start and
    // end of the comments. Note that you are not allowed to call the
    // parser from the callback—that will corrupt its internal state.
    // When this option has an array as value, objects representing the
    // comments are pushed to it.
    onComment: null,
    // Nodes have their start and end characters offsets recorded in
    // `start` and `end` properties (directly on the node, rather than
    // the `loc` object, which holds line/column data. To also add a
    // [semi-standardized][range] `range` property holding a `[start,
    // end]` array with the same numbers, set the `ranges` option to
    // `true`.
    //
    // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
    ranges: false,
    // It is possible to parse multiple files into a single AST by
    // passing the tree produced by parsing the first file as
    // `program` option in subsequent parses. This will add the
    // toplevel forms of the parsed file to the `Program` (top) node
    // of an existing parse tree.
    program: null,
    // When `locations` is on, you can pass this to record the source
    // file in every node's `loc` object.
    sourceFile: null,
    // This value, if given, is stored in every node, whether
    // `locations` is on or off.
    directSourceFile: null,
    // When enabled, parenthesized expressions are represented by
    // (non-standard) ParenthesizedExpression nodes
    preserveParens: false
  };

  // Interpret and default an options object

  var warnedAboutEcmaVersion = false;

  function getOptions(opts) {
    var options = {};

    for (var opt in defaultOptions)
      { options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt]; }

    if (options.ecmaVersion === "latest") {
      options.ecmaVersion = 1e8;
    } else if (options.ecmaVersion == null) {
      if (!warnedAboutEcmaVersion && typeof console === "object" && console.warn) {
        warnedAboutEcmaVersion = true;
        console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.");
      }
      options.ecmaVersion = 11;
    } else if (options.ecmaVersion >= 2015) {
      options.ecmaVersion -= 2009;
    }

    if (options.allowReserved == null)
      { options.allowReserved = options.ecmaVersion < 5; }

    if (!opts || opts.allowHashBang == null)
      { options.allowHashBang = options.ecmaVersion >= 14; }

    if (isArray(options.onToken)) {
      var tokens = options.onToken;
      options.onToken = function (token) { return tokens.push(token); };
    }
    if (isArray(options.onComment))
      { options.onComment = pushComment(options, options.onComment); }

    return options
  }

  function pushComment(options, array) {
    return function(block, text, start, end, startLoc, endLoc) {
      var comment = {
        type: block ? "Block" : "Line",
        value: text,
        start: start,
        end: end
      };
      if (options.locations)
        { comment.loc = new SourceLocation(this, startLoc, endLoc); }
      if (options.ranges)
        { comment.range = [start, end]; }
      array.push(comment);
    }
  }

  // Each scope gets a bitset that may contain these flags
  var
      SCOPE_TOP = 1,
      SCOPE_FUNCTION = 2,
      SCOPE_ASYNC = 4,
      SCOPE_GENERATOR = 8,
      SCOPE_ARROW = 16,
      SCOPE_SIMPLE_CATCH = 32,
      SCOPE_SUPER = 64,
      SCOPE_DIRECT_SUPER = 128,
      SCOPE_CLASS_STATIC_BLOCK = 256,
      SCOPE_CLASS_FIELD_INIT = 512,
      SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;

  function functionFlags(async, generator) {
    return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0)
  }

  // Used in checkLVal* and declareName to determine the type of a binding
  var
      BIND_NONE = 0, // Not a binding
      BIND_VAR = 1, // Var-style binding
      BIND_LEXICAL = 2, // Let- or const-style binding
      BIND_FUNCTION = 3, // Function declaration
      BIND_SIMPLE_CATCH = 4, // Simple (identifier pattern) catch binding
      BIND_OUTSIDE = 5; // Special case for function names as bound inside the function

  var Parser = function Parser(options, input, startPos) {
    this.options = options = getOptions(options);
    this.sourceFile = options.sourceFile;
    this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
    var reserved = "";
    if (options.allowReserved !== true) {
      reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
      if (options.sourceType === "module") { reserved += " await"; }
    }
    this.reservedWords = wordsRegexp(reserved);
    var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
    this.reservedWordsStrict = wordsRegexp(reservedStrict);
    this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
    this.input = String(input);

    // Used to signal to callers of `readWord1` whether the word
    // contained any escape sequences. This is needed because words with
    // escape sequences must not be interpreted as keywords.
    this.containsEsc = false;

    // Set up token state

    // The current position of the tokenizer in the input.
    if (startPos) {
      this.pos = startPos;
      this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
      this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
    } else {
      this.pos = this.lineStart = 0;
      this.curLine = 1;
    }

    // Properties of the current token:
    // Its type
    this.type = types$1.eof;
    // For tokens that include more information than their type, the value
    this.value = null;
    // Its start and end offset
    this.start = this.end = this.pos;
    // And, if locations are used, the {line, column} object
    // corresponding to those offsets
    this.startLoc = this.endLoc = this.curPosition();

    // Position information for the previous token
    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;

    // The context stack is used to superficially track syntactic
    // context to predict whether a regular expression is allowed in a
    // given position.
    this.context = this.initialContext();
    this.exprAllowed = true;

    // Figure out if it's a module code.
    this.inModule = options.sourceType === "module";
    this.strict = this.inModule || this.strictDirective(this.pos);

    // Used to signify the start of a potential arrow function
    this.potentialArrowAt = -1;
    this.potentialArrowInForAwait = false;

    // Positions to delayed-check that yield/await does not exist in default parameters.
    this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
    // Labels in scope.
    this.labels = [];
    // Thus-far undefined exports.
    this.undefinedExports = Object.create(null);

    // If enabled, skip leading hashbang line.
    if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!")
      { this.skipLineComment(2); }

    // Scope tracking for duplicate variable names (see scope.js)
    this.scopeStack = [];
    this.enterScope(SCOPE_TOP);

    // For RegExp validation
    this.regexpState = null;

    // The stack of private names.
    // Each element has two properties: 'declared' and 'used'.
    // When it exited from the outermost class definition, all used private names must be declared.
    this.privateNameStack = [];
  };

  var prototypeAccessors = { inFunction: { configurable: true },inGenerator: { configurable: true },inAsync: { configurable: true },canAwait: { configurable: true },allowSuper: { configurable: true },allowDirectSuper: { configurable: true },treatFunctionsAsVar: { configurable: true },allowNewDotTarget: { configurable: true },inClassStaticBlock: { configurable: true } };

  Parser.prototype.parse = function parse () {
    var node = this.options.program || this.startNode();
    this.nextToken();
    return this.parseTopLevel(node)
  };

  prototypeAccessors.inFunction.get = function () { return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0 };

  prototypeAccessors.inGenerator.get = function () { return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0 };

  prototypeAccessors.inAsync.get = function () { return (this.currentVarScope().flags & SCOPE_ASYNC) > 0 };

  prototypeAccessors.canAwait.get = function () {
    for (var i = this.scopeStack.length - 1; i >= 0; i--) {
      var ref = this.scopeStack[i];
        var flags = ref.flags;
      if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT)) { return false }
      if (flags & SCOPE_FUNCTION) { return (flags & SCOPE_ASYNC) > 0 }
    }
    return (this.inModule && this.options.ecmaVersion >= 13) || this.options.allowAwaitOutsideFunction
  };

  prototypeAccessors.allowSuper.get = function () {
    var ref = this.currentThisScope();
      var flags = ref.flags;
    return (flags & SCOPE_SUPER) > 0 || this.options.allowSuperOutsideMethod
  };

  prototypeAccessors.allowDirectSuper.get = function () { return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0 };

  prototypeAccessors.treatFunctionsAsVar.get = function () { return this.treatFunctionsAsVarInScope(this.currentScope()) };

  prototypeAccessors.allowNewDotTarget.get = function () {
    for (var i = this.scopeStack.length - 1; i >= 0; i--) {
      var ref = this.scopeStack[i];
        var flags = ref.flags;
      if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT) ||
          ((flags & SCOPE_FUNCTION) && !(flags & SCOPE_ARROW))) { return true }
    }
    return false
  };

  prototypeAccessors.inClassStaticBlock.get = function () {
    return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0
  };

  Parser.extend = function extend () {
      var plugins = [], len = arguments.length;
      while ( len-- ) plugins[ len ] = arguments[ len ];

    var cls = this;
    for (var i = 0; i < plugins.length; i++) { cls = plugins[i](cls); }
    return cls
  };

  Parser.parse = function parse (input, options) {
    return new this(options, input).parse()
  };

  Parser.parseExpressionAt = function parseExpressionAt (input, pos, options) {
    var parser = new this(options, input, pos);
    parser.nextToken();
    return parser.parseExpression()
  };

  Parser.tokenizer = function tokenizer (input, options) {
    return new this(options, input)
  };

  Object.defineProperties( Parser.prototype, prototypeAccessors );

  var pp$9 = Parser.prototype;

  // ## Parser utilities

  var literal = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
  pp$9.strictDirective = function(start) {
    if (this.options.ecmaVersion < 5) { return false }
    for (;;) {
      // Try to find string literal.
      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;
      var match = literal.exec(this.input.slice(start));
      if (!match) { return false }
      if ((match[1] || match[2]) === "use strict") {
        skipWhiteSpace.lastIndex = start + match[0].length;
        var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length;
        var next = this.input.charAt(end);
        return next === ";" || next === "}" ||
          (lineBreak.test(spaceAfter[0]) &&
           !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "="))
      }
      start += match[0].length;

      // Skip semicolon, if any.
      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;
      if (this.input[start] === ";")
        { start++; }
    }
  };

  // Predicate that tests whether the next token is of the given
  // type, and if yes, consumes it as a side effect.

  pp$9.eat = function(type) {
    if (this.type === type) {
      this.next();
      return true
    } else {
      return false
    }
  };

  // Tests whether parsed token is a contextual keyword.

  pp$9.isContextual = function(name) {
    return this.type === types$1.name && this.value === name && !this.containsEsc
  };

  // Consumes contextual keyword if possible.

  pp$9.eatContextual = function(name) {
    if (!this.isContextual(name)) { return false }
    this.next();
    return true
  };

  // Asserts that following token is given contextual keyword.

  pp$9.expectContextual = function(name) {
    if (!this.eatContextual(name)) { this.unexpected(); }
  };

  // Test whether a semicolon can be inserted at the current position.

  pp$9.canInsertSemicolon = function() {
    return this.type === types$1.eof ||
      this.type === types$1.braceR ||
      lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
  };

  pp$9.insertSemicolon = function() {
    if (this.canInsertSemicolon()) {
      if (this.options.onInsertedSemicolon)
        { this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc); }
      return true
    }
  };

  // Consume a semicolon, or, failing that, see if we are allowed to
  // pretend that there is a semicolon at this position.

  pp$9.semicolon = function() {
    if (!this.eat(types$1.semi) && !this.insertSemicolon()) { this.unexpected(); }
  };

  pp$9.afterTrailingComma = function(tokType, notNext) {
    if (this.type === tokType) {
      if (this.options.onTrailingComma)
        { this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc); }
      if (!notNext)
        { this.next(); }
      return true
    }
  };

  // Expect a token of a given type. If found, consume it, otherwise,
  // raise an unexpected token error.

  pp$9.expect = function(type) {
    this.eat(type) || this.unexpected();
  };

  // Raise an unexpected token error.

  pp$9.unexpected = function(pos) {
    this.raise(pos != null ? pos : this.start, "Unexpected token");
  };

  var DestructuringErrors = function DestructuringErrors() {
    this.shorthandAssign =
    this.trailingComma =
    this.parenthesizedAssign =
    this.parenthesizedBind =
    this.doubleProto =
      -1;
  };

  pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
    if (!refDestructuringErrors) { return }
    if (refDestructuringErrors.trailingComma > -1)
      { this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element"); }
    var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
    if (parens > -1) { this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern"); }
  };

  pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
    if (!refDestructuringErrors) { return false }
    var shorthandAssign = refDestructuringErrors.shorthandAssign;
    var doubleProto = refDestructuringErrors.doubleProto;
    if (!andThrow) { return shorthandAssign >= 0 || doubleProto >= 0 }
    if (shorthandAssign >= 0)
      { this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns"); }
    if (doubleProto >= 0)
      { this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property"); }
  };

  pp$9.checkYieldAwaitInDefaultParams = function() {
    if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos))
      { this.raise(this.yieldPos, "Yield expression cannot be a default value"); }
    if (this.awaitPos)
      { this.raise(this.awaitPos, "Await expression cannot be a default value"); }
  };

  pp$9.isSimpleAssignTarget = function(expr) {
    if (expr.type === "ParenthesizedExpression")
      { return this.isSimpleAssignTarget(expr.expression) }
    return expr.type === "Identifier" || expr.type === "MemberExpression"
  };

  var pp$8 = Parser.prototype;

  // ### Statement parsing

  // Parse a program. Initializes the parser, reads any number of
  // statements, and wraps them in a Program node.  Optionally takes a
  // `program` argument.  If present, the statements will be appended
  // to its body instead of creating a new node.

  pp$8.parseTopLevel = function(node) {
    var exports = Object.create(null);
    if (!node.body) { node.body = []; }
    while (this.type !== types$1.eof) {
      var stmt = this.parseStatement(null, true, exports);
      node.body.push(stmt);
    }
    if (this.inModule)
      { for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1)
        {
          var name = list[i];

          this.raiseRecoverable(this.undefinedExports[name].start, ("Export '" + name + "' is not defined"));
        } }
    this.adaptDirectivePrologue(node.body);
    this.next();
    node.sourceType = this.options.sourceType;
    return this.finishNode(node, "Program")
  };

  var loopLabel = {kind: "loop"}, switchLabel = {kind: "switch"};

  pp$8.isLet = function(context) {
    if (this.options.ecmaVersion < 6 || !this.isContextual("let")) { return false }
    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
    // For ambiguous cases, determine if a LexicalDeclaration (or only a
    // Statement) is allowed here. If context is not empty then only a Statement
    // is allowed. However, `let [` is an explicit negative lookahead for
    // ExpressionStatement, so special-case it first.
    if (nextCh === 91 || nextCh === 92) { return true } // '[', '\'
    if (context) { return false }

    if (nextCh === 123 || nextCh > 0xd7ff && nextCh < 0xdc00) { return true } // '{', astral
    if (isIdentifierStart(nextCh, true)) {
      var pos = next + 1;
      while (isIdentifierChar(nextCh = this.input.charCodeAt(pos), true)) { ++pos; }
      if (nextCh === 92 || nextCh > 0xd7ff && nextCh < 0xdc00) { return true }
      var ident = this.input.slice(next, pos);
      if (!keywordRelationalOperator.test(ident)) { return true }
    }
    return false
  };

  // check 'async [no LineTerminator here] function'
  // - 'async /*foo*/ function' is OK.
  // - 'async /*\n*/ function' is invalid.
  pp$8.isAsyncFunction = function() {
    if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
      { return false }

    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length, after;
    return !lineBreak.test(this.input.slice(this.pos, next)) &&
      this.input.slice(next, next + 8) === "function" &&
      (next + 8 === this.input.length ||
       !(isIdentifierChar(after = this.input.charCodeAt(next + 8)) || after > 0xd7ff && after < 0xdc00))
  };

  pp$8.isUsingKeyword = function(isAwaitUsing, isFor) {
    if (this.options.ecmaVersion < 17 || !this.isContextual(isAwaitUsing ? "await" : "using"))
      { return false }

    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length;

    if (lineBreak.test(this.input.slice(this.pos, next))) { return false }

    if (isAwaitUsing) {
      var awaitEndPos = next + 5 /* await */, after;
      if (this.input.slice(next, awaitEndPos) !== "using" ||
        awaitEndPos === this.input.length ||
        isIdentifierChar(after = this.input.charCodeAt(awaitEndPos)) ||
        (after > 0xd7ff && after < 0xdc00)
      ) { return false }

      skipWhiteSpace.lastIndex = awaitEndPos;
      var skipAfterUsing = skipWhiteSpace.exec(this.input);
      if (skipAfterUsing && lineBreak.test(this.input.slice(awaitEndPos, awaitEndPos + skipAfterUsing[0].length))) { return false }
    }

    if (isFor) {
      var ofEndPos = next + 2 /* of */, after$1;
      if (this.input.slice(next, ofEndPos) === "of") {
        if (ofEndPos === this.input.length ||
          (!isIdentifierChar(after$1 = this.input.charCodeAt(ofEndPos)) && !(after$1 > 0xd7ff && after$1 < 0xdc00))) { return false }
      }
    }

    var ch = this.input.charCodeAt(next);
    return isIdentifierStart(ch, true) || ch === 92 // '\'
  };

  pp$8.isAwaitUsing = function(isFor) {
    return this.isUsingKeyword(true, isFor)
  };

  pp$8.isUsing = function(isFor) {
    return this.isUsingKeyword(false, isFor)
  };

  // Parse a single statement.
  //
  // If expecting a statement and finding a slash operator, parse a
  // regular expression literal. This is to handle cases like
  // `if (foo) /blah/.exec(foo)`, where looking at the previous token
  // does not help.

  pp$8.parseStatement = function(context, topLevel, exports) {
    var starttype = this.type, node = this.startNode(), kind;

    if (this.isLet(context)) {
      starttype = types$1._var;
      kind = "let";
    }

    // Most types of statements are recognized by the keyword they
    // start with. Many are trivial to parse, some require a bit of
    // complexity.

    switch (starttype) {
    case types$1._break: case types$1._continue: return this.parseBreakContinueStatement(node, starttype.keyword)
    case types$1._debugger: return this.parseDebuggerStatement(node)
    case types$1._do: return this.parseDoStatement(node)
    case types$1._for: return this.parseForStatement(node)
    case types$1._function:
      // Function as sole body of either an if statement or a labeled statement
      // works, but not when it is part of a labeled statement that is the sole
      // body of an if statement.
      if ((context && (this.strict || context !== "if" && context !== "label")) && this.options.ecmaVersion >= 6) { this.unexpected(); }
      return this.parseFunctionStatement(node, false, !context)
    case types$1._class:
      if (context) { this.unexpected(); }
      return this.parseClass(node, true)
    case types$1._if: return this.parseIfStatement(node)
    case types$1._return: return this.parseReturnStatement(node)
    case types$1._switch: return this.parseSwitchStatement(node)
    case types$1._throw: return this.parseThrowStatement(node)
    case types$1._try: return this.parseTryStatement(node)
    case types$1._const: case types$1._var:
      kind = kind || this.value;
      if (context && kind !== "var") { this.unexpected(); }
      return this.parseVarStatement(node, kind)
    case types$1._while: return this.parseWhileStatement(node)
    case types$1._with: return this.parseWithStatement(node)
    case types$1.braceL: return this.parseBlock(true, node)
    case types$1.semi: return this.parseEmptyStatement(node)
    case types$1._export:
    case types$1._import:
      if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
        skipWhiteSpace.lastIndex = this.pos;
        var skip = skipWhiteSpace.exec(this.input);
        var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
        if (nextCh === 40 || nextCh === 46) // '(' or '.'
          { return this.parseExpressionStatement(node, this.parseExpression()) }
      }

      if (!this.options.allowImportExportEverywhere) {
        if (!topLevel)
          { this.raise(this.start, "'import' and 'export' may only appear at the top level"); }
        if (!this.inModule)
          { this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'"); }
      }
      return starttype === types$1._import ? this.parseImport(node) : this.parseExport(node, exports)

      // If the statement does not start with a statement keyword or a
      // brace, it's an ExpressionStatement or LabeledStatement. We
      // simply start parsing an expression, and afterwards, if the
      // next token is a colon and the expression was a simple
      // Identifier node, we switch to interpreting it as a label.
    default:
      if (this.isAsyncFunction()) {
        if (context) { this.unexpected(); }
        this.next();
        return this.parseFunctionStatement(node, true, !context)
      }

      var usingKind = this.isAwaitUsing(false) ? "await using" : this.isUsing(false) ? "using" : null;
      if (usingKind) {
        if (topLevel && this.options.sourceType === "script") {
          this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script`");
        }
        if (usingKind === "await using") {
          if (!this.canAwait) {
            this.raise(this.start, "Await using cannot appear outside of async function");
          }
          this.next();
        }
        this.next();
        this.parseVar(node, false, usingKind);
        this.semicolon();
        return this.finishNode(node, "VariableDeclaration")
      }

      var maybeName = this.value, expr = this.parseExpression();
      if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon))
        { return this.parseLabeledStatement(node, maybeName, expr, context) }
      else { return this.parseExpressionStatement(node, expr) }
    }
  };

  pp$8.parseBreakContinueStatement = function(node, keyword) {
    var isBreak = keyword === "break";
    this.next();
    if (this.eat(types$1.semi) || this.insertSemicolon()) { node.label = null; }
    else if (this.type !== types$1.name) { this.unexpected(); }
    else {
      node.label = this.parseIdent();
      this.semicolon();
    }

    // Verify that there is an actual destination to break or
    // continue to.
    var i = 0;
    for (; i < this.labels.length; ++i) {
      var lab = this.labels[i];
      if (node.label == null || lab.name === node.label.name) {
        if (lab.kind != null && (isBreak || lab.kind === "loop")) { break }
        if (node.label && isBreak) { break }
      }
    }
    if (i === this.labels.length) { this.raise(node.start, "Unsyntactic " + keyword); }
    return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement")
  };

  pp$8.parseDebuggerStatement = function(node) {
    this.next();
    this.semicolon();
    return this.finishNode(node, "DebuggerStatement")
  };

  pp$8.parseDoStatement = function(node) {
    this.next();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("do");
    this.labels.pop();
    this.expect(types$1._while);
    node.test = this.parseParenExpression();
    if (this.options.ecmaVersion >= 6)
      { this.eat(types$1.semi); }
    else
      { this.semicolon(); }
    return this.finishNode(node, "DoWhileStatement")
  };

  // Disambiguating between a `for` and a `for`/`in` or `for`/`of`
  // loop is non-trivial. Basically, we have to parse the init `var`
  // statement or expression, disallowing the `in` operator (see
  // the second parameter to `parseExpression`), and then check
  // whether the next token is `in` or `of`. When there is no init
  // part (semicolon immediately after the opening parenthesis), it
  // is a regular `for` loop.

  pp$8.parseForStatement = function(node) {
    this.next();
    var awaitAt = (this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await")) ? this.lastTokStart : -1;
    this.labels.push(loopLabel);
    this.enterScope(0);
    this.expect(types$1.parenL);
    if (this.type === types$1.semi) {
      if (awaitAt > -1) { this.unexpected(awaitAt); }
      return this.parseFor(node, null)
    }
    var isLet = this.isLet();
    if (this.type === types$1._var || this.type === types$1._const || isLet) {
      var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
      this.next();
      this.parseVar(init$1, true, kind);
      this.finishNode(init$1, "VariableDeclaration");
      return this.parseForAfterInit(node, init$1, awaitAt)
    }
    var startsWithLet = this.isContextual("let"), isForOf = false;

    var usingKind = this.isUsing(true) ? "using" : this.isAwaitUsing(true) ? "await using" : null;
    if (usingKind) {
      var init$2 = this.startNode();
      this.next();
      if (usingKind === "await using") { this.next(); }
      this.parseVar(init$2, true, usingKind);
      this.finishNode(init$2, "VariableDeclaration");
      return this.parseForAfterInit(node, init$2, awaitAt)
    }
    var containsEsc = this.containsEsc;
    var refDestructuringErrors = new DestructuringErrors;
    var initPos = this.start;
    var init = awaitAt > -1
      ? this.parseExprSubscripts(refDestructuringErrors, "await")
      : this.parseExpression(true, refDestructuringErrors);
    if (this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
      if (awaitAt > -1) { // implies `ecmaVersion >= 9` (see declaration of awaitAt)
        if (this.type === types$1._in) { this.unexpected(awaitAt); }
        node.await = true;
      } else if (isForOf && this.options.ecmaVersion >= 8) {
        if (init.start === initPos && !containsEsc && init.type === "Identifier" && init.name === "async") { this.unexpected(); }
        else if (this.options.ecmaVersion >= 9) { node.await = false; }
      }
      if (startsWithLet && isForOf) { this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'."); }
      this.toAssignable(init, false, refDestructuringErrors);
      this.checkLValPattern(init);
      return this.parseForIn(node, init)
    } else {
      this.checkExpressionErrors(refDestructuringErrors, true);
    }
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, init)
  };

  // Helper method to parse for loop after variable initialization
  pp$8.parseForAfterInit = function(node, init, awaitAt) {
    if ((this.type === types$1._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) && init.declarations.length === 1) {
      if (this.options.ecmaVersion >= 9) {
        if (this.type === types$1._in) {
          if (awaitAt > -1) { this.unexpected(awaitAt); }
        } else { node.await = awaitAt > -1; }
      }
      return this.parseForIn(node, init)
    }
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, init)
  };

  pp$8.parseFunctionStatement = function(node, isAsync, declarationPosition) {
    this.next();
    return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync)
  };

  pp$8.parseIfStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    // allow function declarations in branches, but only in non-strict mode
    node.consequent = this.parseStatement("if");
    node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
    return this.finishNode(node, "IfStatement")
  };

  pp$8.parseReturnStatement = function(node) {
    if (!this.inFunction && !this.options.allowReturnOutsideFunction)
      { this.raise(this.start, "'return' outside of function"); }
    this.next();

    // In `return` (and `break`/`continue`), the keywords with
    // optional arguments, we eagerly look for a semicolon or the
    // possibility to insert one.

    if (this.eat(types$1.semi) || this.insertSemicolon()) { node.argument = null; }
    else { node.argument = this.parseExpression(); this.semicolon(); }
    return this.finishNode(node, "ReturnStatement")
  };

  pp$8.parseSwitchStatement = function(node) {
    this.next();
    node.discriminant = this.parseParenExpression();
    node.cases = [];
    this.expect(types$1.braceL);
    this.labels.push(switchLabel);
    this.enterScope(0);

    // Statements under must be grouped (by label) in SwitchCase
    // nodes. `cur` is used to keep the node that we are currently
    // adding statements to.

    var cur;
    for (var sawDefault = false; this.type !== types$1.braceR;) {
      if (this.type === types$1._case || this.type === types$1._default) {
        var isCase = this.type === types$1._case;
        if (cur) { this.finishNode(cur, "SwitchCase"); }
        node.cases.push(cur = this.startNode());
        cur.consequent = [];
        this.next();
        if (isCase) {
          cur.test = this.parseExpression();
        } else {
          if (sawDefault) { this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"); }
          sawDefault = true;
          cur.test = null;
        }
        this.expect(types$1.colon);
      } else {
        if (!cur) { this.unexpected(); }
        cur.consequent.push(this.parseStatement(null));
      }
    }
    this.exitScope();
    if (cur) { this.finishNode(cur, "SwitchCase"); }
    this.next(); // Closing brace
    this.labels.pop();
    return this.finishNode(node, "SwitchStatement")
  };

  pp$8.parseThrowStatement = function(node) {
    this.next();
    if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start)))
      { this.raise(this.lastTokEnd, "Illegal newline after throw"); }
    node.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(node, "ThrowStatement")
  };

  // Reused empty array added for node fields that are always empty.

  var empty$1 = [];

  pp$8.parseCatchClauseParam = function() {
    var param = this.parseBindingAtom();
    var simple = param.type === "Identifier";
    this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
    this.checkLValPattern(param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
    this.expect(types$1.parenR);

    return param
  };

  pp$8.parseTryStatement = function(node) {
    this.next();
    node.block = this.parseBlock();
    node.handler = null;
    if (this.type === types$1._catch) {
      var clause = this.startNode();
      this.next();
      if (this.eat(types$1.parenL)) {
        clause.param = this.parseCatchClauseParam();
      } else {
        if (this.options.ecmaVersion < 10) { this.unexpected(); }
        clause.param = null;
        this.enterScope(0);
      }
      clause.body = this.parseBlock(false);
      this.exitScope();
      node.handler = this.finishNode(clause, "CatchClause");
    }
    node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
    if (!node.handler && !node.finalizer)
      { this.raise(node.start, "Missing catch or finally clause"); }
    return this.finishNode(node, "TryStatement")
  };

  pp$8.parseVarStatement = function(node, kind, allowMissingInitializer) {
    this.next();
    this.parseVar(node, false, kind, allowMissingInitializer);
    this.semicolon();
    return this.finishNode(node, "VariableDeclaration")
  };

  pp$8.parseWhileStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("while");
    this.labels.pop();
    return this.finishNode(node, "WhileStatement")
  };

  pp$8.parseWithStatement = function(node) {
    if (this.strict) { this.raise(this.start, "'with' in strict mode"); }
    this.next();
    node.object = this.parseParenExpression();
    node.body = this.parseStatement("with");
    return this.finishNode(node, "WithStatement")
  };

  pp$8.parseEmptyStatement = function(node) {
    this.next();
    return this.finishNode(node, "EmptyStatement")
  };

  pp$8.parseLabeledStatement = function(node, maybeName, expr, context) {
    for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1)
      {
      var label = list[i$1];

      if (label.name === maybeName)
        { this.raise(expr.start, "Label '" + maybeName + "' is already declared");
    } }
    var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
    for (var i = this.labels.length - 1; i >= 0; i--) {
      var label$1 = this.labels[i];
      if (label$1.statementStart === node.start) {
        // Update information about previous labels on this node
        label$1.statementStart = this.start;
        label$1.kind = kind;
      } else { break }
    }
    this.labels.push({name: maybeName, kind: kind, statementStart: this.start});
    node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
    this.labels.pop();
    node.label = expr;
    return this.finishNode(node, "LabeledStatement")
  };

  pp$8.parseExpressionStatement = function(node, expr) {
    node.expression = expr;
    this.semicolon();
    return this.finishNode(node, "ExpressionStatement")
  };

  // Parse a semicolon-enclosed block of statements, handling `"use
  // strict"` declarations when `allowStrict` is true (used for
  // function bodies).

  pp$8.parseBlock = function(createNewLexicalScope, node, exitStrict) {
    if ( createNewLexicalScope === void 0 ) createNewLexicalScope = true;
    if ( node === void 0 ) node = this.startNode();

    node.body = [];
    this.expect(types$1.braceL);
    if (createNewLexicalScope) { this.enterScope(0); }
    while (this.type !== types$1.braceR) {
      var stmt = this.parseStatement(null);
      node.body.push(stmt);
    }
    if (exitStrict) { this.strict = false; }
    this.next();
    if (createNewLexicalScope) { this.exitScope(); }
    return this.finishNode(node, "BlockStatement")
  };

  // Parse a regular `for` loop. The disambiguation code in
  // `parseStatement` will already have parsed the init statement or
  // expression.

  pp$8.parseFor = function(node, init) {
    node.init = init;
    this.expect(types$1.semi);
    node.test = this.type === types$1.semi ? null : this.parseExpression();
    this.expect(types$1.semi);
    node.update = this.type === types$1.parenR ? null : this.parseExpression();
    this.expect(types$1.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, "ForStatement")
  };

  // Parse a `for`/`in` and `for`/`of` loop, which are almost
  // same from parser's perspective.

  pp$8.parseForIn = function(node, init) {
    var isForIn = this.type === types$1._in;
    this.next();

    if (
      init.type === "VariableDeclaration" &&
      init.declarations[0].init != null &&
      (
        !isForIn ||
        this.options.ecmaVersion < 8 ||
        this.strict ||
        init.kind !== "var" ||
        init.declarations[0].id.type !== "Identifier"
      )
    ) {
      this.raise(
        init.start,
        ((isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer")
      );
    }
    node.left = init;
    node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
    this.expect(types$1.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement")
  };

  // Parse a list of variable declarations.

  pp$8.parseVar = function(node, isFor, kind, allowMissingInitializer) {
    node.declarations = [];
    node.kind = kind;
    for (;;) {
      var decl = this.startNode();
      this.parseVarId(decl, kind);
      if (this.eat(types$1.eq)) {
        decl.init = this.parseMaybeAssign(isFor);
      } else if (!allowMissingInitializer && kind === "const" && !(this.type === types$1._in || (this.options.ecmaVersion >= 6 && this.isContextual("of")))) {
        this.unexpected();
      } else if (!allowMissingInitializer && (kind === "using" || kind === "await using") && this.options.ecmaVersion >= 17 && this.type !== types$1._in && !this.isContextual("of")) {
        this.raise(this.lastTokEnd, ("Missing initializer in " + kind + " declaration"));
      } else if (!allowMissingInitializer && decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of")))) {
        this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
      } else {
        decl.init = null;
      }
      node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
      if (!this.eat(types$1.comma)) { break }
    }
    return node
  };

  pp$8.parseVarId = function(decl, kind) {
    decl.id = kind === "using" || kind === "await using"
      ? this.parseIdent()
      : this.parseBindingAtom();

    this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
  };

  var FUNC_STATEMENT = 1, FUNC_HANGING_STATEMENT = 2, FUNC_NULLABLE_ID = 4;

  // Parse a function declaration or literal (depending on the
  // `statement & FUNC_STATEMENT`).

  // Remove `allowExpressionBody` for 7.0.0, as it is only called with false
  pp$8.parseFunction = function(node, statement, allowExpressionBody, isAsync, forInit) {
    this.initFunction(node);
    if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
      if (this.type === types$1.star && (statement & FUNC_HANGING_STATEMENT))
        { this.unexpected(); }
      node.generator = this.eat(types$1.star);
    }
    if (this.options.ecmaVersion >= 8)
      { node.async = !!isAsync; }

    if (statement & FUNC_STATEMENT) {
      node.id = (statement & FUNC_NULLABLE_ID) && this.type !== types$1.name ? null : this.parseIdent();
      if (node.id && !(statement & FUNC_HANGING_STATEMENT))
        // If it is a regular function declaration in sloppy mode, then it is
        // subject to Annex B semantics (BIND_FUNCTION). Otherwise, the binding
        // mode depends on properties of the current scope (see
        // treatFunctionsAsVar).
        { this.checkLValSimple(node.id, (this.strict || node.generator || node.async) ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION); }
    }

    var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(functionFlags(node.async, node.generator));

    if (!(statement & FUNC_STATEMENT))
      { node.id = this.type === types$1.name ? this.parseIdent() : null; }

    this.parseFunctionParams(node);
    this.parseFunctionBody(node, allowExpressionBody, false, forInit);

    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, (statement & FUNC_STATEMENT) ? "FunctionDeclaration" : "FunctionExpression")
  };

  pp$8.parseFunctionParams = function(node) {
    this.expect(types$1.parenL);
    node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
  };

  // Parse a class declaration or literal (depending on the
  // `isStatement` parameter).

  pp$8.parseClass = function(node, isStatement) {
    this.next();

    // ecma-262 14.6 Class Definitions
    // A class definition is always strict mode code.
    var oldStrict = this.strict;
    this.strict = true;

    this.parseClassId(node, isStatement);
    this.parseClassSuper(node);
    var privateNameMap = this.enterClassBody();
    var classBody = this.startNode();
    var hadConstructor = false;
    classBody.body = [];
    this.expect(types$1.braceL);
    while (this.type !== types$1.braceR) {
      var element = this.parseClassElement(node.superClass !== null);
      if (element) {
        classBody.body.push(element);
        if (element.type === "MethodDefinition" && element.kind === "constructor") {
          if (hadConstructor) { this.raiseRecoverable(element.start, "Duplicate constructor in the same class"); }
          hadConstructor = true;
        } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element)) {
          this.raiseRecoverable(element.key.start, ("Identifier '#" + (element.key.name) + "' has already been declared"));
        }
      }
    }
    this.strict = oldStrict;
    this.next();
    node.body = this.finishNode(classBody, "ClassBody");
    this.exitClassBody();
    return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression")
  };

  pp$8.parseClassElement = function(constructorAllowsSuper) {
    if (this.eat(types$1.semi)) { return null }

    var ecmaVersion = this.options.ecmaVersion;
    var node = this.startNode();
    var keyName = "";
    var isGenerator = false;
    var isAsync = false;
    var kind = "method";
    var isStatic = false;

    if (this.eatContextual("static")) {
      // Parse static init block
      if (ecmaVersion >= 13 && this.eat(types$1.braceL)) {
        this.parseClassStaticBlock(node);
        return node
      }
      if (this.isClassElementNameStart() || this.type === types$1.star) {
        isStatic = true;
      } else {
        keyName = "static";
      }
    }
    node.static = isStatic;
    if (!keyName && ecmaVersion >= 8 && this.eatContextual("async")) {
      if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon()) {
        isAsync = true;
      } else {
        keyName = "async";
      }
    }
    if (!keyName && (ecmaVersion >= 9 || !isAsync) && this.eat(types$1.star)) {
      isGenerator = true;
    }
    if (!keyName && !isAsync && !isGenerator) {
      var lastValue = this.value;
      if (this.eatContextual("get") || this.eatContextual("set")) {
        if (this.isClassElementNameStart()) {
          kind = lastValue;
        } else {
          keyName = lastValue;
        }
      }
    }

    // Parse element name
    if (keyName) {
      // 'async', 'get', 'set', or 'static' were not a keyword contextually.
      // The last token is any of those. Make it the element name.
      node.computed = false;
      node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
      node.key.name = keyName;
      this.finishNode(node.key, "Identifier");
    } else {
      this.parseClassElementName(node);
    }

    // Parse element value
    if (ecmaVersion < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
      var isConstructor = !node.static && checkKeyName(node, "constructor");
      var allowsDirectSuper = isConstructor && constructorAllowsSuper;
      // Couldn't move this check into the 'parseClassMethod' method for backward compatibility.
      if (isConstructor && kind !== "method") { this.raise(node.key.start, "Constructor can't have get/set modifier"); }
      node.kind = isConstructor ? "constructor" : kind;
      this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
    } else {
      this.parseClassField(node);
    }

    return node
  };

  pp$8.isClassElementNameStart = function() {
    return (
      this.type === types$1.name ||
      this.type === types$1.privateId ||
      this.type === types$1.num ||
      this.type === types$1.string ||
      this.type === types$1.bracketL ||
      this.type.keyword
    )
  };

  pp$8.parseClassElementName = function(element) {
    if (this.type === types$1.privateId) {
      if (this.value === "constructor") {
        this.raise(this.start, "Classes can't have an element named '#constructor'");
      }
      element.computed = false;
      element.key = this.parsePrivateIdent();
    } else {
      this.parsePropertyName(element);
    }
  };

  pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
    // Check key and flags
    var key = method.key;
    if (method.kind === "constructor") {
      if (isGenerator) { this.raise(key.start, "Constructor can't be a generator"); }
      if (isAsync) { this.raise(key.start, "Constructor can't be an async method"); }
    } else if (method.static && checkKeyName(method, "prototype")) {
      this.raise(key.start, "Classes may not have a static property named prototype");
    }

    // Parse value
    var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);

    // Check value
    if (method.kind === "get" && value.params.length !== 0)
      { this.raiseRecoverable(value.start, "getter should have no params"); }
    if (method.kind === "set" && value.params.length !== 1)
      { this.raiseRecoverable(value.start, "setter should have exactly one param"); }
    if (method.kind === "set" && value.params[0].type === "RestElement")
      { this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params"); }

    return this.finishNode(method, "MethodDefinition")
  };

  pp$8.parseClassField = function(field) {
    if (checkKeyName(field, "constructor")) {
      this.raise(field.key.start, "Classes can't have a field named 'constructor'");
    } else if (field.static && checkKeyName(field, "prototype")) {
      this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
    }

    if (this.eat(types$1.eq)) {
      // To raise SyntaxError if 'arguments' exists in the initializer.
      this.enterScope(SCOPE_CLASS_FIELD_INIT | SCOPE_SUPER);
      field.value = this.parseMaybeAssign();
      this.exitScope();
    } else {
      field.value = null;
    }
    this.semicolon();

    return this.finishNode(field, "PropertyDefinition")
  };

  pp$8.parseClassStaticBlock = function(node) {
    node.body = [];

    var oldLabels = this.labels;
    this.labels = [];
    this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER);
    while (this.type !== types$1.braceR) {
      var stmt = this.parseStatement(null);
      node.body.push(stmt);
    }
    this.next();
    this.exitScope();
    this.labels = oldLabels;

    return this.finishNode(node, "StaticBlock")
  };

  pp$8.parseClassId = function(node, isStatement) {
    if (this.type === types$1.name) {
      node.id = this.parseIdent();
      if (isStatement)
        { this.checkLValSimple(node.id, BIND_LEXICAL, false); }
    } else {
      if (isStatement === true)
        { this.unexpected(); }
      node.id = null;
    }
  };

  pp$8.parseClassSuper = function(node) {
    node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, false) : null;
  };

  pp$8.enterClassBody = function() {
    var element = {declared: Object.create(null), used: []};
    this.privateNameStack.push(element);
    return element.declared
  };

  pp$8.exitClassBody = function() {
    var ref = this.privateNameStack.pop();
    var declared = ref.declared;
    var used = ref.used;
    if (!this.options.checkPrivateFields) { return }
    var len = this.privateNameStack.length;
    var parent = len === 0 ? null : this.privateNameStack[len - 1];
    for (var i = 0; i < used.length; ++i) {
      var id = used[i];
      if (!hasOwn(declared, id.name)) {
        if (parent) {
          parent.used.push(id);
        } else {
          this.raiseRecoverable(id.start, ("Private field '#" + (id.name) + "' must be declared in an enclosing class"));
        }
      }
    }
  };

  function isPrivateNameConflicted(privateNameMap, element) {
    var name = element.key.name;
    var curr = privateNameMap[name];

    var next = "true";
    if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
      next = (element.static ? "s" : "i") + element.kind;
    }

    // `class { get #a(){}; static set #a(_){} }` is also conflict.
    if (
      curr === "iget" && next === "iset" ||
      curr === "iset" && next === "iget" ||
      curr === "sget" && next === "sset" ||
      curr === "sset" && next === "sget"
    ) {
      privateNameMap[name] = "true";
      return false
    } else if (!curr) {
      privateNameMap[name] = next;
      return false
    } else {
      return true
    }
  }

  function checkKeyName(node, name) {
    var computed = node.computed;
    var key = node.key;
    return !computed && (
      key.type === "Identifier" && key.name === name ||
      key.type === "Literal" && key.value === name
    )
  }

  // Parses module export declaration.

  pp$8.parseExportAllDeclaration = function(node, exports) {
    if (this.options.ecmaVersion >= 11) {
      if (this.eatContextual("as")) {
        node.exported = this.parseModuleExportName();
        this.checkExport(exports, node.exported, this.lastTokStart);
      } else {
        node.exported = null;
      }
    }
    this.expectContextual("from");
    if (this.type !== types$1.string) { this.unexpected(); }
    node.source = this.parseExprAtom();
    if (this.options.ecmaVersion >= 16)
      { node.attributes = this.parseWithClause(); }
    this.semicolon();
    return this.finishNode(node, "ExportAllDeclaration")
  };

  pp$8.parseExport = function(node, exports) {
    this.next();
    // export * from '...'
    if (this.eat(types$1.star)) {
      return this.parseExportAllDeclaration(node, exports)
    }
    if (this.eat(types$1._default)) { // export default ...
      this.checkExport(exports, "default", this.lastTokStart);
      node.declaration = this.parseExportDefaultDeclaration();
      return this.finishNode(node, "ExportDefaultDeclaration")
    }
    // export var|const|let|function|class ...
    if (this.shouldParseExportStatement()) {
      node.declaration = this.parseExportDeclaration(node);
      if (node.declaration.type === "VariableDeclaration")
        { this.checkVariableExport(exports, node.declaration.declarations); }
      else
        { this.checkExport(exports, node.declaration.id, node.declaration.id.start); }
      node.specifiers = [];
      node.source = null;
      if (this.options.ecmaVersion >= 16)
        { node.attributes = []; }
    } else { // export { x, y as z } [from '...']
      node.declaration = null;
      node.specifiers = this.parseExportSpecifiers(exports);
      if (this.eatContextual("from")) {
        if (this.type !== types$1.string) { this.unexpected(); }
        node.source = this.parseExprAtom();
        if (this.options.ecmaVersion >= 16)
          { node.attributes = this.parseWithClause(); }
      } else {
        for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
          // check for keywords used as local names
          var spec = list[i];

          this.checkUnreserved(spec.local);
          // check if export is defined
          this.checkLocalExport(spec.local);

          if (spec.local.type === "Literal") {
            this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
          }
        }

        node.source = null;
        if (this.options.ecmaVersion >= 16)
          { node.attributes = []; }
      }
      this.semicolon();
    }
    return this.finishNode(node, "ExportNamedDeclaration")
  };

  pp$8.parseExportDeclaration = function(node) {
    return this.parseStatement(null)
  };

  pp$8.parseExportDefaultDeclaration = function() {
    var isAsync;
    if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
      var fNode = this.startNode();
      this.next();
      if (isAsync) { this.next(); }
      return this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync)
    } else if (this.type === types$1._class) {
      var cNode = this.startNode();
      return this.parseClass(cNode, "nullableID")
    } else {
      var declaration = this.parseMaybeAssign();
      this.semicolon();
      return declaration
    }
  };

  pp$8.checkExport = function(exports, name, pos) {
    if (!exports) { return }
    if (typeof name !== "string")
      { name = name.type === "Identifier" ? name.name : name.value; }
    if (hasOwn(exports, name))
      { this.raiseRecoverable(pos, "Duplicate export '" + name + "'"); }
    exports[name] = true;
  };

  pp$8.checkPatternExport = function(exports, pat) {
    var type = pat.type;
    if (type === "Identifier")
      { this.checkExport(exports, pat, pat.start); }
    else if (type === "ObjectPattern")
      { for (var i = 0, list = pat.properties; i < list.length; i += 1)
        {
          var prop = list[i];

          this.checkPatternExport(exports, prop);
        } }
    else if (type === "ArrayPattern")
      { for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
        var elt = list$1[i$1];

          if (elt) { this.checkPatternExport(exports, elt); }
      } }
    else if (type === "Property")
      { this.checkPatternExport(exports, pat.value); }
    else if (type === "AssignmentPattern")
      { this.checkPatternExport(exports, pat.left); }
    else if (type === "RestElement")
      { this.checkPatternExport(exports, pat.argument); }
  };

  pp$8.checkVariableExport = function(exports, decls) {
    if (!exports) { return }
    for (var i = 0, list = decls; i < list.length; i += 1)
      {
      var decl = list[i];

      this.checkPatternExport(exports, decl.id);
    }
  };

  pp$8.shouldParseExportStatement = function() {
    return this.type.keyword === "var" ||
      this.type.keyword === "const" ||
      this.type.keyword === "class" ||
      this.type.keyword === "function" ||
      this.isLet() ||
      this.isAsyncFunction()
  };

  // Parses a comma-separated list of module exports.

  pp$8.parseExportSpecifier = function(exports) {
    var node = this.startNode();
    node.local = this.parseModuleExportName();

    node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local;
    this.checkExport(
      exports,
      node.exported,
      node.exported.start
    );

    return this.finishNode(node, "ExportSpecifier")
  };

  pp$8.parseExportSpecifiers = function(exports) {
    var nodes = [], first = true;
    // export { x, y as z } [from '...']
    this.expect(types$1.braceL);
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) { break }
      } else { first = false; }

      nodes.push(this.parseExportSpecifier(exports));
    }
    return nodes
  };

  // Parses import declaration.

  pp$8.parseImport = function(node) {
    this.next();

    // import '...'
    if (this.type === types$1.string) {
      node.specifiers = empty$1;
      node.source = this.parseExprAtom();
    } else {
      node.specifiers = this.parseImportSpecifiers();
      this.expectContextual("from");
      node.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
    }
    if (this.options.ecmaVersion >= 16)
      { node.attributes = this.parseWithClause(); }
    this.semicolon();
    return this.finishNode(node, "ImportDeclaration")
  };

  // Parses a comma-separated list of module imports.

  pp$8.parseImportSpecifier = function() {
    var node = this.startNode();
    node.imported = this.parseModuleExportName();

    if (this.eatContextual("as")) {
      node.local = this.parseIdent();
    } else {
      this.checkUnreserved(node.imported);
      node.local = node.imported;
    }
    this.checkLValSimple(node.local, BIND_LEXICAL);

    return this.finishNode(node, "ImportSpecifier")
  };

  pp$8.parseImportDefaultSpecifier = function() {
    // import defaultObj, { x, y as z } from '...'
    var node = this.startNode();
    node.local = this.parseIdent();
    this.checkLValSimple(node.local, BIND_LEXICAL);
    return this.finishNode(node, "ImportDefaultSpecifier")
  };

  pp$8.parseImportNamespaceSpecifier = function() {
    var node = this.startNode();
    this.next();
    this.expectContextual("as");
    node.local = this.parseIdent();
    this.checkLValSimple(node.local, BIND_LEXICAL);
    return this.finishNode(node, "ImportNamespaceSpecifier")
  };

  pp$8.parseImportSpecifiers = function() {
    var nodes = [], first = true;
    if (this.type === types$1.name) {
      nodes.push(this.parseImportDefaultSpecifier());
      if (!this.eat(types$1.comma)) { return nodes }
    }
    if (this.type === types$1.star) {
      nodes.push(this.parseImportNamespaceSpecifier());
      return nodes
    }
    this.expect(types$1.braceL);
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) { break }
      } else { first = false; }

      nodes.push(this.parseImportSpecifier());
    }
    return nodes
  };

  pp$8.parseWithClause = function() {
    var nodes = [];
    if (!this.eat(types$1._with)) {
      return nodes
    }
    this.expect(types$1.braceL);
    var attributeKeys = {};
    var first = true;
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) { break }
      } else { first = false; }

      var attr = this.parseImportAttribute();
      var keyName = attr.key.type === "Identifier" ? attr.key.name : attr.key.value;
      if (hasOwn(attributeKeys, keyName))
        { this.raiseRecoverable(attr.key.start, "Duplicate attribute key '" + keyName + "'"); }
      attributeKeys[keyName] = true;
      nodes.push(attr);
    }
    return nodes
  };

  pp$8.parseImportAttribute = function() {
    var node = this.startNode();
    node.key = this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
    this.expect(types$1.colon);
    if (this.type !== types$1.string) {
      this.unexpected();
    }
    node.value = this.parseExprAtom();
    return this.finishNode(node, "ImportAttribute")
  };

  pp$8.parseModuleExportName = function() {
    if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
      var stringLiteral = this.parseLiteral(this.value);
      if (loneSurrogate.test(stringLiteral.value)) {
        this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
      }
      return stringLiteral
    }
    return this.parseIdent(true)
  };

  // Set `ExpressionStatement#directive` property for directive prologues.
  pp$8.adaptDirectivePrologue = function(statements) {
    for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
      statements[i].directive = statements[i].expression.raw.slice(1, -1);
    }
  };
  pp$8.isDirectiveCandidate = function(statement) {
    return (
      this.options.ecmaVersion >= 5 &&
      statement.type === "ExpressionStatement" &&
      statement.expression.type === "Literal" &&
      typeof statement.expression.value === "string" &&
      // Reject parenthesized strings.
      (this.input[statement.start] === "\"" || this.input[statement.start] === "'")
    )
  };

  var pp$7 = Parser.prototype;

  // Convert existing expression atom to assignable pattern
  // if possible.

  pp$7.toAssignable = function(node, isBinding, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 6 && node) {
      switch (node.type) {
      case "Identifier":
        if (this.inAsync && node.name === "await")
          { this.raise(node.start, "Cannot use 'await' as identifier inside an async function"); }
        break

      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break

      case "ObjectExpression":
        node.type = "ObjectPattern";
        if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
        for (var i = 0, list = node.properties; i < list.length; i += 1) {
          var prop = list[i];

        this.toAssignable(prop, isBinding);
          // Early error:
          //   AssignmentRestProperty[Yield, Await] :
          //     `...` DestructuringAssignmentTarget[Yield, Await]
          //
          //   It is a Syntax Error if |DestructuringAssignmentTarget| is an |ArrayLiteral| or an |ObjectLiteral|.
          if (
            prop.type === "RestElement" &&
            (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")
          ) {
            this.raise(prop.argument.start, "Unexpected token");
          }
        }
        break

      case "Property":
        // AssignmentProperty has type === "Property"
        if (node.kind !== "init") { this.raise(node.key.start, "Object pattern can't contain getter or setter"); }
        this.toAssignable(node.value, isBinding);
        break

      case "ArrayExpression":
        node.type = "ArrayPattern";
        if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
        this.toAssignableList(node.elements, isBinding);
        break

      case "SpreadElement":
        node.type = "RestElement";
        this.toAssignable(node.argument, isBinding);
        if (node.argument.type === "AssignmentPattern")
          { this.raise(node.argument.start, "Rest elements cannot have a default value"); }
        break

      case "AssignmentExpression":
        if (node.operator !== "=") { this.raise(node.left.end, "Only '=' operator can be used for specifying default value."); }
        node.type = "AssignmentPattern";
        delete node.operator;
        this.toAssignable(node.left, isBinding);
        break

      case "ParenthesizedExpression":
        this.toAssignable(node.expression, isBinding, refDestructuringErrors);
        break

      case "ChainExpression":
        this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
        break

      case "MemberExpression":
        if (!isBinding) { break }

      default:
        this.raise(node.start, "Assigning to rvalue");
      }
    } else if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
    return node
  };

  // Convert list of expression atoms to binding list.

  pp$7.toAssignableList = function(exprList, isBinding) {
    var end = exprList.length;
    for (var i = 0; i < end; i++) {
      var elt = exprList[i];
      if (elt) { this.toAssignable(elt, isBinding); }
    }
    if (end) {
      var last = exprList[end - 1];
      if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier")
        { this.unexpected(last.argument.start); }
    }
    return exprList
  };

  // Parses spread element.

  pp$7.parseSpread = function(refDestructuringErrors) {
    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    return this.finishNode(node, "SpreadElement")
  };

  pp$7.parseRestBinding = function() {
    var node = this.startNode();
    this.next();

    // RestElement inside of a function parameter must be an identifier
    if (this.options.ecmaVersion === 6 && this.type !== types$1.name)
      { this.unexpected(); }

    node.argument = this.parseBindingAtom();

    return this.finishNode(node, "RestElement")
  };

  // Parses lvalue (assignable) atom.

  pp$7.parseBindingAtom = function() {
    if (this.options.ecmaVersion >= 6) {
      switch (this.type) {
      case types$1.bracketL:
        var node = this.startNode();
        this.next();
        node.elements = this.parseBindingList(types$1.bracketR, true, true);
        return this.finishNode(node, "ArrayPattern")

      case types$1.braceL:
        return this.parseObj(true)
      }
    }
    return this.parseIdent()
  };

  pp$7.parseBindingList = function(close, allowEmpty, allowTrailingComma, allowModifiers) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      if (first) { first = false; }
      else { this.expect(types$1.comma); }
      if (allowEmpty && this.type === types$1.comma) {
        elts.push(null);
      } else if (allowTrailingComma && this.afterTrailingComma(close)) {
        break
      } else if (this.type === types$1.ellipsis) {
        var rest = this.parseRestBinding();
        this.parseBindingListItem(rest);
        elts.push(rest);
        if (this.type === types$1.comma) { this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"); }
        this.expect(close);
        break
      } else {
        elts.push(this.parseAssignableListItem(allowModifiers));
      }
    }
    return elts
  };

  pp$7.parseAssignableListItem = function(allowModifiers) {
    var elem = this.parseMaybeDefault(this.start, this.startLoc);
    this.parseBindingListItem(elem);
    return elem
  };

  pp$7.parseBindingListItem = function(param) {
    return param
  };

  // Parses assignment pattern around given atom if possible.

  pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
    left = left || this.parseBindingAtom();
    if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) { return left }
    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.right = this.parseMaybeAssign();
    return this.finishNode(node, "AssignmentPattern")
  };

  // The following three functions all verify that a node is an lvalue —
  // something that can be bound, or assigned to. In order to do so, they perform
  // a variety of checks:
  //
  // - Check that none of the bound/assigned-to identifiers are reserved words.
  // - Record name declarations for bindings in the appropriate scope.
  // - Check duplicate argument names, if checkClashes is set.
  //
  // If a complex binding pattern is encountered (e.g., object and array
  // destructuring), the entire pattern is recursively checked.
  //
  // There are three versions of checkLVal*() appropriate for different
  // circumstances:
  //
  // - checkLValSimple() shall be used if the syntactic construct supports
  //   nothing other than identifiers and member expressions. Parenthesized
  //   expressions are also correctly handled. This is generally appropriate for
  //   constructs for which the spec says
  //
  //   > It is a Syntax Error if AssignmentTargetType of [the production] is not
  //   > simple.
  //
  //   It is also appropriate for checking if an identifier is valid and not
  //   defined elsewhere, like import declarations or function/class identifiers.
  //
  //   Examples where this is used include:
  //     a += …;
  //     import a from '…';
  //   where a is the node to be checked.
  //
  // - checkLValPattern() shall be used if the syntactic construct supports
  //   anything checkLValSimple() supports, as well as object and array
  //   destructuring patterns. This is generally appropriate for constructs for
  //   which the spec says
  //
  //   > It is a Syntax Error if [the production] is neither an ObjectLiteral nor
  //   > an ArrayLiteral and AssignmentTargetType of [the production] is not
  //   > simple.
  //
  //   Examples where this is used include:
  //     (a = …);
  //     const a = …;
  //     try { … } catch (a) { … }
  //   where a is the node to be checked.
  //
  // - checkLValInnerPattern() shall be used if the syntactic construct supports
  //   anything checkLValPattern() supports, as well as default assignment
  //   patterns, rest elements, and other constructs that may appear within an
  //   object or array destructuring pattern.
  //
  //   As a special case, function parameters also use checkLValInnerPattern(),
  //   as they also support defaults and rest constructs.
  //
  // These functions deliberately support both assignment and binding constructs,
  // as the logic for both is exceedingly similar. If the node is the target of
  // an assignment, then bindingType should be set to BIND_NONE. Otherwise, it
  // should be set to the appropriate BIND_* constant, like BIND_VAR or
  // BIND_LEXICAL.
  //
  // If the function is called with a non-BIND_NONE bindingType, then
  // additionally a checkClashes object may be specified to allow checking for
  // duplicate argument names. checkClashes is ignored if the provided construct
  // is an assignment (i.e., bindingType is BIND_NONE).

  pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
    if ( bindingType === void 0 ) bindingType = BIND_NONE;

    var isBind = bindingType !== BIND_NONE;

    switch (expr.type) {
    case "Identifier":
      if (this.strict && this.reservedWordsStrictBind.test(expr.name))
        { this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode"); }
      if (isBind) {
        if (bindingType === BIND_LEXICAL && expr.name === "let")
          { this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name"); }
        if (checkClashes) {
          if (hasOwn(checkClashes, expr.name))
            { this.raiseRecoverable(expr.start, "Argument name clash"); }
          checkClashes[expr.name] = true;
        }
        if (bindingType !== BIND_OUTSIDE) { this.declareName(expr.name, bindingType, expr.start); }
      }
      break

    case "ChainExpression":
      this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
      break

    case "MemberExpression":
      if (isBind) { this.raiseRecoverable(expr.start, "Binding member expression"); }
      break

    case "ParenthesizedExpression":
      if (isBind) { this.raiseRecoverable(expr.start, "Binding parenthesized expression"); }
      return this.checkLValSimple(expr.expression, bindingType, checkClashes)

    default:
      this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
    }
  };

  pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
    if ( bindingType === void 0 ) bindingType = BIND_NONE;

    switch (expr.type) {
    case "ObjectPattern":
      for (var i = 0, list = expr.properties; i < list.length; i += 1) {
        var prop = list[i];

      this.checkLValInnerPattern(prop, bindingType, checkClashes);
      }
      break

    case "ArrayPattern":
      for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
        var elem = list$1[i$1];

      if (elem) { this.checkLValInnerPattern(elem, bindingType, checkClashes); }
      }
      break

    default:
      this.checkLValSimple(expr, bindingType, checkClashes);
    }
  };

  pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
    if ( bindingType === void 0 ) bindingType = BIND_NONE;

    switch (expr.type) {
    case "Property":
      // AssignmentProperty has type === "Property"
      this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
      break

    case "AssignmentPattern":
      this.checkLValPattern(expr.left, bindingType, checkClashes);
      break

    case "RestElement":
      this.checkLValPattern(expr.argument, bindingType, checkClashes);
      break

    default:
      this.checkLValPattern(expr, bindingType, checkClashes);
    }
  };

  // The algorithm used to determine whether a regexp can appear at a
  // given point in the program is loosely based on sweet.js' approach.
  // See https://github.com/mozilla/sweet.js/wiki/design


  var TokContext = function TokContext(token, isExpr, preserveSpace, override, generator) {
    this.token = token;
    this.isExpr = !!isExpr;
    this.preserveSpace = !!preserveSpace;
    this.override = override;
    this.generator = !!generator;
  };

  var types = {
    b_stat: new TokContext("{", false),
    b_expr: new TokContext("{", true),
    b_tmpl: new TokContext("${", false),
    p_stat: new TokContext("(", false),
    p_expr: new TokContext("(", true),
    q_tmpl: new TokContext("`", true, true, function (p) { return p.tryReadTemplateToken(); }),
    f_stat: new TokContext("function", false),
    f_expr: new TokContext("function", true),
    f_expr_gen: new TokContext("function", true, false, null, true),
    f_gen: new TokContext("function", false, false, null, true)
  };

  var pp$6 = Parser.prototype;

  pp$6.initialContext = function() {
    return [types.b_stat]
  };

  pp$6.curContext = function() {
    return this.context[this.context.length - 1]
  };

  pp$6.braceIsBlock = function(prevType) {
    var parent = this.curContext();
    if (parent === types.f_expr || parent === types.f_stat)
      { return true }
    if (prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr))
      { return !parent.isExpr }

    // The check for `tt.name && exprAllowed` detects whether we are
    // after a `yield` or `of` construct. See the `updateContext` for
    // `tt.name`.
    if (prevType === types$1._return || prevType === types$1.name && this.exprAllowed)
      { return lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) }
    if (prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow)
      { return true }
    if (prevType === types$1.braceL)
      { return parent === types.b_stat }
    if (prevType === types$1._var || prevType === types$1._const || prevType === types$1.name)
      { return false }
    return !this.exprAllowed
  };

  pp$6.inGeneratorContext = function() {
    for (var i = this.context.length - 1; i >= 1; i--) {
      var context = this.context[i];
      if (context.token === "function")
        { return context.generator }
    }
    return false
  };

  pp$6.updateContext = function(prevType) {
    var update, type = this.type;
    if (type.keyword && prevType === types$1.dot)
      { this.exprAllowed = false; }
    else if (update = type.updateContext)
      { update.call(this, prevType); }
    else
      { this.exprAllowed = type.beforeExpr; }
  };

  // Used to handle edge cases when token context could not be inferred correctly during tokenization phase

  pp$6.overrideContext = function(tokenCtx) {
    if (this.curContext() !== tokenCtx) {
      this.context[this.context.length - 1] = tokenCtx;
    }
  };

  // Token-specific context update code

  types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
    if (this.context.length === 1) {
      this.exprAllowed = true;
      return
    }
    var out = this.context.pop();
    if (out === types.b_stat && this.curContext().token === "function") {
      out = this.context.pop();
    }
    this.exprAllowed = !out.isExpr;
  };

  types$1.braceL.updateContext = function(prevType) {
    this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
    this.exprAllowed = true;
  };

  types$1.dollarBraceL.updateContext = function() {
    this.context.push(types.b_tmpl);
    this.exprAllowed = true;
  };

  types$1.parenL.updateContext = function(prevType) {
    var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
    this.context.push(statementParens ? types.p_stat : types.p_expr);
    this.exprAllowed = true;
  };

  types$1.incDec.updateContext = function() {
    // tokExprAllowed stays unchanged
  };

  types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
    if (prevType.beforeExpr && prevType !== types$1._else &&
        !(prevType === types$1.semi && this.curContext() !== types.p_stat) &&
        !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) &&
        !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat))
      { this.context.push(types.f_expr); }
    else
      { this.context.push(types.f_stat); }
    this.exprAllowed = false;
  };

  types$1.colon.updateContext = function() {
    if (this.curContext().token === "function") { this.context.pop(); }
    this.exprAllowed = true;
  };

  types$1.backQuote.updateContext = function() {
    if (this.curContext() === types.q_tmpl)
      { this.context.pop(); }
    else
      { this.context.push(types.q_tmpl); }
    this.exprAllowed = false;
  };

  types$1.star.updateContext = function(prevType) {
    if (prevType === types$1._function) {
      var index = this.context.length - 1;
      if (this.context[index] === types.f_expr)
        { this.context[index] = types.f_expr_gen; }
      else
        { this.context[index] = types.f_gen; }
    }
    this.exprAllowed = true;
  };

  types$1.name.updateContext = function(prevType) {
    var allowed = false;
    if (this.options.ecmaVersion >= 6 && prevType !== types$1.dot) {
      if (this.value === "of" && !this.exprAllowed ||
          this.value === "yield" && this.inGeneratorContext())
        { allowed = true; }
    }
    this.exprAllowed = allowed;
  };

  // A recursive descent parser operates by defining functions for all
  // syntactic elements, and recursively calling those, each function
  // advancing the input stream and returning an AST node. Precedence
  // of constructs (for example, the fact that `!x[1]` means `!(x[1])`
  // instead of `(!x)[1]` is handled by the fact that the parser
  // function that parses unary prefix operators is called first, and
  // in turn calls the function that parses `[]` subscripts — that
  // way, it'll receive the node for `x[1]` already parsed, and wraps
  // *that* in the unary operator node.
  //
  // Acorn uses an [operator precedence parser][opp] to handle binary
  // operator precedence, because it is much more compact than using
  // the technique outlined above, which uses different, nesting
  // functions to specify precedence, for all of the ten binary
  // precedence levels that JavaScript defines.
  //
  // [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser


  var pp$5 = Parser.prototype;

  // Check if property name clashes with already added.
  // Object/class getters and setters are not allowed to clash —
  // either with each other or with an init property — and in
  // strict mode, init properties are also not allowed to be repeated.

  pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement")
      { return }
    if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))
      { return }
    var key = prop.key;
    var name;
    switch (key.type) {
    case "Identifier": name = key.name; break
    case "Literal": name = String(key.value); break
    default: return
    }
    var kind = prop.kind;
    if (this.options.ecmaVersion >= 6) {
      if (name === "__proto__" && kind === "init") {
        if (propHash.proto) {
          if (refDestructuringErrors) {
            if (refDestructuringErrors.doubleProto < 0) {
              refDestructuringErrors.doubleProto = key.start;
            }
          } else {
            this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
          }
        }
        propHash.proto = true;
      }
      return
    }
    name = "$" + name;
    var other = propHash[name];
    if (other) {
      var redefinition;
      if (kind === "init") {
        redefinition = this.strict && other.init || other.get || other.set;
      } else {
        redefinition = other.init || other[kind];
      }
      if (redefinition)
        { this.raiseRecoverable(key.start, "Redefinition of property"); }
    } else {
      other = propHash[name] = {
        init: false,
        get: false,
        set: false
      };
    }
    other[kind] = true;
  };

  // ### Expression parsing

  // These nest, from the most general expression type at the top to
  // 'atomic', nondivisible expression types at the bottom. Most of
  // the functions will simply let the function(s) below them parse,
  // and, *if* the syntactic construct they handle is present, wrap
  // the AST node that the inner parser gave them in another node.

  // Parse a full expression. The optional arguments are used to
  // forbid the `in` operator (in for loops initalization expressions)
  // and provide reference for storing '=' operator inside shorthand
  // property assignment in contexts where both object expression
  // and object pattern might appear (so it's possible to raise
  // delayed syntax error at correct position).

  pp$5.parseExpression = function(forInit, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
    if (this.type === types$1.comma) {
      var node = this.startNodeAt(startPos, startLoc);
      node.expressions = [expr];
      while (this.eat(types$1.comma)) { node.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors)); }
      return this.finishNode(node, "SequenceExpression")
    }
    return expr
  };

  // Parse an assignment expression. This includes applications of
  // operators like `+=`.

  pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
    if (this.isContextual("yield")) {
      if (this.inGenerator) { return this.parseYield(forInit) }
      // The tokenizer will assume an expression is allowed after
      // `yield`, but this isn't that kind of yield
      else { this.exprAllowed = false; }
    }

    var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
    if (refDestructuringErrors) {
      oldParenAssign = refDestructuringErrors.parenthesizedAssign;
      oldTrailingComma = refDestructuringErrors.trailingComma;
      oldDoubleProto = refDestructuringErrors.doubleProto;
      refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
    } else {
      refDestructuringErrors = new DestructuringErrors;
      ownDestructuringErrors = true;
    }

    var startPos = this.start, startLoc = this.startLoc;
    if (this.type === types$1.parenL || this.type === types$1.name) {
      this.potentialArrowAt = this.start;
      this.potentialArrowInForAwait = forInit === "await";
    }
    var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
    if (afterLeftParse) { left = afterLeftParse.call(this, left, startPos, startLoc); }
    if (this.type.isAssign) {
      var node = this.startNodeAt(startPos, startLoc);
      node.operator = this.value;
      if (this.type === types$1.eq)
        { left = this.toAssignable(left, false, refDestructuringErrors); }
      if (!ownDestructuringErrors) {
        refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
      }
      if (refDestructuringErrors.shorthandAssign >= left.start)
        { refDestructuringErrors.shorthandAssign = -1; } // reset because shorthand default was used correctly
      if (this.type === types$1.eq)
        { this.checkLValPattern(left); }
      else
        { this.checkLValSimple(left); }
      node.left = left;
      this.next();
      node.right = this.parseMaybeAssign(forInit);
      if (oldDoubleProto > -1) { refDestructuringErrors.doubleProto = oldDoubleProto; }
      return this.finishNode(node, "AssignmentExpression")
    } else {
      if (ownDestructuringErrors) { this.checkExpressionErrors(refDestructuringErrors, true); }
    }
    if (oldParenAssign > -1) { refDestructuringErrors.parenthesizedAssign = oldParenAssign; }
    if (oldTrailingComma > -1) { refDestructuringErrors.trailingComma = oldTrailingComma; }
    return left
  };

  // Parse a ternary conditional (`?:`) operator.

  pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseExprOps(forInit, refDestructuringErrors);
    if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
    if (this.eat(types$1.question)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.test = expr;
      node.consequent = this.parseMaybeAssign();
      this.expect(types$1.colon);
      node.alternate = this.parseMaybeAssign(forInit);
      return this.finishNode(node, "ConditionalExpression")
    }
    return expr
  };

  // Start the precedence parser.

  pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
    if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
    return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit)
  };

  // Parse binary operators with the operator precedence parsing
  // algorithm. `left` is the left-hand side of the operator.
  // `minPrec` provides context that allows the function to stop and
  // defer further parser to one of its callers when it encounters an
  // operator that has a lower precedence than the set it is parsing.

  pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
    var prec = this.type.binop;
    if (prec != null && (!forInit || this.type !== types$1._in)) {
      if (prec > minPrec) {
        var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
        var coalesce = this.type === types$1.coalesce;
        if (coalesce) {
          // Handle the precedence of `tt.coalesce` as equal to the range of logical expressions.
          // In other words, `node.right` shouldn't contain logical expressions in order to check the mixed error.
          prec = types$1.logicalAND.binop;
        }
        var op = this.value;
        this.next();
        var startPos = this.start, startLoc = this.startLoc;
        var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
        var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
        if ((logical && this.type === types$1.coalesce) || (coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND))) {
          this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
        }
        return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit)
      }
    }
    return left
  };

  pp$5.buildBinary = function(startPos, startLoc, left, right, op, logical) {
    if (right.type === "PrivateIdentifier") { this.raise(right.start, "Private identifier can only be left side of binary expression"); }
    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.operator = op;
    node.right = right;
    return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression")
  };

  // Parse unary operators, both prefix and postfix.

  pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
    var startPos = this.start, startLoc = this.startLoc, expr;
    if (this.isContextual("await") && this.canAwait) {
      expr = this.parseAwait(forInit);
      sawUnary = true;
    } else if (this.type.prefix) {
      var node = this.startNode(), update = this.type === types$1.incDec;
      node.operator = this.value;
      node.prefix = true;
      this.next();
      node.argument = this.parseMaybeUnary(null, true, update, forInit);
      this.checkExpressionErrors(refDestructuringErrors, true);
      if (update) { this.checkLValSimple(node.argument); }
      else if (this.strict && node.operator === "delete" && isLocalVariableAccess(node.argument))
        { this.raiseRecoverable(node.start, "Deleting local variable in strict mode"); }
      else if (node.operator === "delete" && isPrivateFieldAccess(node.argument))
        { this.raiseRecoverable(node.start, "Private fields can not be deleted"); }
      else { sawUnary = true; }
      expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    } else if (!sawUnary && this.type === types$1.privateId) {
      if ((forInit || this.privateNameStack.length === 0) && this.options.checkPrivateFields) { this.unexpected(); }
      expr = this.parsePrivateIdent();
      // only could be private fields in 'in', such as #x in obj
      if (this.type !== types$1._in) { this.unexpected(); }
    } else {
      expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
      if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
      while (this.type.postfix && !this.canInsertSemicolon()) {
        var node$1 = this.startNodeAt(startPos, startLoc);
        node$1.operator = this.value;
        node$1.prefix = false;
        node$1.argument = expr;
        this.checkLValSimple(expr);
        this.next();
        expr = this.finishNode(node$1, "UpdateExpression");
      }
    }

    if (!incDec && this.eat(types$1.starstar)) {
      if (sawUnary)
        { this.unexpected(this.lastTokStart); }
      else
        { return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false) }
    } else {
      return expr
    }
  };

  function isLocalVariableAccess(node) {
    return (
      node.type === "Identifier" ||
      node.type === "ParenthesizedExpression" && isLocalVariableAccess(node.expression)
    )
  }

  function isPrivateFieldAccess(node) {
    return (
      node.type === "MemberExpression" && node.property.type === "PrivateIdentifier" ||
      node.type === "ChainExpression" && isPrivateFieldAccess(node.expression) ||
      node.type === "ParenthesizedExpression" && isPrivateFieldAccess(node.expression)
    )
  }

  // Parse call, dot, and `[]`-subscript expressions.

  pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseExprAtom(refDestructuringErrors, forInit);
    if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
      { return expr }
    var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
    if (refDestructuringErrors && result.type === "MemberExpression") {
      if (refDestructuringErrors.parenthesizedAssign >= result.start) { refDestructuringErrors.parenthesizedAssign = -1; }
      if (refDestructuringErrors.parenthesizedBind >= result.start) { refDestructuringErrors.parenthesizedBind = -1; }
      if (refDestructuringErrors.trailingComma >= result.start) { refDestructuringErrors.trailingComma = -1; }
    }
    return result
  };

  pp$5.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
    var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" &&
        this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 &&
        this.potentialArrowAt === base.start;
    var optionalChained = false;

    while (true) {
      var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);

      if (element.optional) { optionalChained = true; }
      if (element === base || element.type === "ArrowFunctionExpression") {
        if (optionalChained) {
          var chainNode = this.startNodeAt(startPos, startLoc);
          chainNode.expression = element;
          element = this.finishNode(chainNode, "ChainExpression");
        }
        return element
      }

      base = element;
    }
  };

  pp$5.shouldParseAsyncArrow = function() {
    return !this.canInsertSemicolon() && this.eat(types$1.arrow)
  };

  pp$5.parseSubscriptAsyncArrow = function(startPos, startLoc, exprList, forInit) {
    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit)
  };

  pp$5.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
    var optionalSupported = this.options.ecmaVersion >= 11;
    var optional = optionalSupported && this.eat(types$1.questionDot);
    if (noCalls && optional) { this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions"); }

    var computed = this.eat(types$1.bracketL);
    if (computed || (optional && this.type !== types$1.parenL && this.type !== types$1.backQuote) || this.eat(types$1.dot)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      if (computed) {
        node.property = this.parseExpression();
        this.expect(types$1.bracketR);
      } else if (this.type === types$1.privateId && base.type !== "Super") {
        node.property = this.parsePrivateIdent();
      } else {
        node.property = this.parseIdent(this.options.allowReserved !== "never");
      }
      node.computed = !!computed;
      if (optionalSupported) {
        node.optional = optional;
      }
      base = this.finishNode(node, "MemberExpression");
    } else if (!noCalls && this.eat(types$1.parenL)) {
      var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
      this.yieldPos = 0;
      this.awaitPos = 0;
      this.awaitIdentPos = 0;
      var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
      if (maybeAsyncArrow && !optional && this.shouldParseAsyncArrow()) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();
        if (this.awaitIdentPos > 0)
          { this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"); }
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit)
      }
      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;
      this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.callee = base;
      node$1.arguments = exprList;
      if (optionalSupported) {
        node$1.optional = optional;
      }
      base = this.finishNode(node$1, "CallExpression");
    } else if (this.type === types$1.backQuote) {
      if (optional || optionalChained) {
        this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
      }
      var node$2 = this.startNodeAt(startPos, startLoc);
      node$2.tag = base;
      node$2.quasi = this.parseTemplate({isTagged: true});
      base = this.finishNode(node$2, "TaggedTemplateExpression");
    }
    return base
  };

  // Parse an atomic expression — either a single token that is an
  // expression, an expression started by a keyword like `function` or
  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
  // or `{}`.

  pp$5.parseExprAtom = function(refDestructuringErrors, forInit, forNew) {
    // If a division operator appears in an expression position, the
    // tokenizer got confused, and we force it to read a regexp instead.
    if (this.type === types$1.slash) { this.readRegexp(); }

    var node, canBeArrow = this.potentialArrowAt === this.start;
    switch (this.type) {
    case types$1._super:
      if (!this.allowSuper)
        { this.raise(this.start, "'super' keyword outside a method"); }
      node = this.startNode();
      this.next();
      if (this.type === types$1.parenL && !this.allowDirectSuper)
        { this.raise(node.start, "super() call outside constructor of a subclass"); }
      // The `super` keyword can appear at below:
      // SuperProperty:
      //     super [ Expression ]
      //     super . IdentifierName
      // SuperCall:
      //     super ( Arguments )
      if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL)
        { this.unexpected(); }
      return this.finishNode(node, "Super")

    case types$1._this:
      node = this.startNode();
      this.next();
      return this.finishNode(node, "ThisExpression")

    case types$1.name:
      var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
      var id = this.parseIdent(false);
      if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) {
        this.overrideContext(types.f_expr);
        return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit)
      }
      if (canBeArrow && !this.canInsertSemicolon()) {
        if (this.eat(types$1.arrow))
          { return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit) }
        if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc &&
            (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
          id = this.parseIdent(false);
          if (this.canInsertSemicolon() || !this.eat(types$1.arrow))
            { this.unexpected(); }
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit)
        }
      }
      return id

    case types$1.regexp:
      var value = this.value;
      node = this.parseLiteral(value.value);
      node.regex = {pattern: value.pattern, flags: value.flags};
      return node

    case types$1.num: case types$1.string:
      return this.parseLiteral(this.value)

    case types$1._null: case types$1._true: case types$1._false:
      node = this.startNode();
      node.value = this.type === types$1._null ? null : this.type === types$1._true;
      node.raw = this.type.keyword;
      this.next();
      return this.finishNode(node, "Literal")

    case types$1.parenL:
      var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
      if (refDestructuringErrors) {
        if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr))
          { refDestructuringErrors.parenthesizedAssign = start; }
        if (refDestructuringErrors.parenthesizedBind < 0)
          { refDestructuringErrors.parenthesizedBind = start; }
      }
      return expr

    case types$1.bracketL:
      node = this.startNode();
      this.next();
      node.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors);
      return this.finishNode(node, "ArrayExpression")

    case types$1.braceL:
      this.overrideContext(types.b_expr);
      return this.parseObj(false, refDestructuringErrors)

    case types$1._function:
      node = this.startNode();
      this.next();
      return this.parseFunction(node, 0)

    case types$1._class:
      return this.parseClass(this.startNode(), false)

    case types$1._new:
      return this.parseNew()

    case types$1.backQuote:
      return this.parseTemplate()

    case types$1._import:
      if (this.options.ecmaVersion >= 11) {
        return this.parseExprImport(forNew)
      } else {
        return this.unexpected()
      }

    default:
      return this.parseExprAtomDefault()
    }
  };

  pp$5.parseExprAtomDefault = function() {
    this.unexpected();
  };

  pp$5.parseExprImport = function(forNew) {
    var node = this.startNode();

    // Consume `import` as an identifier for `import.meta`.
    // Because `this.parseIdent(true)` doesn't check escape sequences, it needs the check of `this.containsEsc`.
    if (this.containsEsc) { this.raiseRecoverable(this.start, "Escape sequence in keyword import"); }
    this.next();

    if (this.type === types$1.parenL && !forNew) {
      return this.parseDynamicImport(node)
    } else if (this.type === types$1.dot) {
      var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
      meta.name = "import";
      node.meta = this.finishNode(meta, "Identifier");
      return this.parseImportMeta(node)
    } else {
      this.unexpected();
    }
  };

  pp$5.parseDynamicImport = function(node) {
    this.next(); // skip `(`

    // Parse node.source.
    node.source = this.parseMaybeAssign();

    if (this.options.ecmaVersion >= 16) {
      if (!this.eat(types$1.parenR)) {
        this.expect(types$1.comma);
        if (!this.afterTrailingComma(types$1.parenR)) {
          node.options = this.parseMaybeAssign();
          if (!this.eat(types$1.parenR)) {
            this.expect(types$1.comma);
            if (!this.afterTrailingComma(types$1.parenR)) {
              this.unexpected();
            }
          }
        } else {
          node.options = null;
        }
      } else {
        node.options = null;
      }
    } else {
      // Verify ending.
      if (!this.eat(types$1.parenR)) {
        var errorPos = this.start;
        if (this.eat(types$1.comma) && this.eat(types$1.parenR)) {
          this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
        } else {
          this.unexpected(errorPos);
        }
      }
    }

    return this.finishNode(node, "ImportExpression")
  };

  pp$5.parseImportMeta = function(node) {
    this.next(); // skip `.`

    var containsEsc = this.containsEsc;
    node.property = this.parseIdent(true);

    if (node.property.name !== "meta")
      { this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'"); }
    if (containsEsc)
      { this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters"); }
    if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere)
      { this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module"); }

    return this.finishNode(node, "MetaProperty")
  };

  pp$5.parseLiteral = function(value) {
    var node = this.startNode();
    node.value = value;
    node.raw = this.input.slice(this.start, this.end);
    if (node.raw.charCodeAt(node.raw.length - 1) === 110)
      { node.bigint = node.value != null ? node.value.toString() : node.raw.slice(0, -1).replace(/_/g, ""); }
    this.next();
    return this.finishNode(node, "Literal")
  };

  pp$5.parseParenExpression = function() {
    this.expect(types$1.parenL);
    var val = this.parseExpression();
    this.expect(types$1.parenR);
    return val
  };

  pp$5.shouldParseArrow = function(exprList) {
    return !this.canInsertSemicolon()
  };

  pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
    var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
    if (this.options.ecmaVersion >= 6) {
      this.next();

      var innerStartPos = this.start, innerStartLoc = this.startLoc;
      var exprList = [], first = true, lastIsComma = false;
      var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
      this.yieldPos = 0;
      this.awaitPos = 0;
      // Do not save awaitIdentPos to allow checking awaits nested in parameters
      while (this.type !== types$1.parenR) {
        first ? first = false : this.expect(types$1.comma);
        if (allowTrailingComma && this.afterTrailingComma(types$1.parenR, true)) {
          lastIsComma = true;
          break
        } else if (this.type === types$1.ellipsis) {
          spreadStart = this.start;
          exprList.push(this.parseParenItem(this.parseRestBinding()));
          if (this.type === types$1.comma) {
            this.raiseRecoverable(
              this.start,
              "Comma is not permitted after the rest element"
            );
          }
          break
        } else {
          exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
        }
      }
      var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
      this.expect(types$1.parenR);

      if (canBeArrow && this.shouldParseArrow(exprList) && this.eat(types$1.arrow)) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        return this.parseParenArrowList(startPos, startLoc, exprList, forInit)
      }

      if (!exprList.length || lastIsComma) { this.unexpected(this.lastTokStart); }
      if (spreadStart) { this.unexpected(spreadStart); }
      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;

      if (exprList.length > 1) {
        val = this.startNodeAt(innerStartPos, innerStartLoc);
        val.expressions = exprList;
        this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
      } else {
        val = exprList[0];
      }
    } else {
      val = this.parseParenExpression();
    }

    if (this.options.preserveParens) {
      var par = this.startNodeAt(startPos, startLoc);
      par.expression = val;
      return this.finishNode(par, "ParenthesizedExpression")
    } else {
      return val
    }
  };

  pp$5.parseParenItem = function(item) {
    return item
  };

  pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit)
  };

  // New's precedence is slightly tricky. It must allow its argument to
  // be a `[]` or dot subscript expression, but not a call — at least,
  // not without wrapping it in parentheses. Thus, it uses the noCalls
  // argument to parseSubscripts to prevent it from consuming the
  // argument list.

  var empty = [];

  pp$5.parseNew = function() {
    if (this.containsEsc) { this.raiseRecoverable(this.start, "Escape sequence in keyword new"); }
    var node = this.startNode();
    this.next();
    if (this.options.ecmaVersion >= 6 && this.type === types$1.dot) {
      var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
      meta.name = "new";
      node.meta = this.finishNode(meta, "Identifier");
      this.next();
      var containsEsc = this.containsEsc;
      node.property = this.parseIdent(true);
      if (node.property.name !== "target")
        { this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'"); }
      if (containsEsc)
        { this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters"); }
      if (!this.allowNewDotTarget)
        { this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block"); }
      return this.finishNode(node, "MetaProperty")
    }
    var startPos = this.start, startLoc = this.startLoc;
    node.callee = this.parseSubscripts(this.parseExprAtom(null, false, true), startPos, startLoc, true, false);
    if (this.eat(types$1.parenL)) { node.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false); }
    else { node.arguments = empty; }
    return this.finishNode(node, "NewExpression")
  };

  // Parse template expression.

  pp$5.parseTemplateElement = function(ref) {
    var isTagged = ref.isTagged;

    var elem = this.startNode();
    if (this.type === types$1.invalidTemplate) {
      if (!isTagged) {
        this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
      }
      elem.value = {
        raw: this.value.replace(/\r\n?/g, "\n"),
        cooked: null
      };
    } else {
      elem.value = {
        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
        cooked: this.value
      };
    }
    this.next();
    elem.tail = this.type === types$1.backQuote;
    return this.finishNode(elem, "TemplateElement")
  };

  pp$5.parseTemplate = function(ref) {
    if ( ref === void 0 ) ref = {};
    var isTagged = ref.isTagged; if ( isTagged === void 0 ) isTagged = false;

    var node = this.startNode();
    this.next();
    node.expressions = [];
    var curElt = this.parseTemplateElement({isTagged: isTagged});
    node.quasis = [curElt];
    while (!curElt.tail) {
      if (this.type === types$1.eof) { this.raise(this.pos, "Unterminated template literal"); }
      this.expect(types$1.dollarBraceL);
      node.expressions.push(this.parseExpression());
      this.expect(types$1.braceR);
      node.quasis.push(curElt = this.parseTemplateElement({isTagged: isTagged}));
    }
    this.next();
    return this.finishNode(node, "TemplateLiteral")
  };

  pp$5.isAsyncProp = function(prop) {
    return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" &&
      (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || (this.options.ecmaVersion >= 9 && this.type === types$1.star)) &&
      !lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
  };

  // Parse an object literal or binding pattern.

  pp$5.parseObj = function(isPattern, refDestructuringErrors) {
    var node = this.startNode(), first = true, propHash = {};
    node.properties = [];
    this.next();
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) { break }
      } else { first = false; }

      var prop = this.parseProperty(isPattern, refDestructuringErrors);
      if (!isPattern) { this.checkPropClash(prop, propHash, refDestructuringErrors); }
      node.properties.push(prop);
    }
    return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression")
  };

  pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
    var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
    if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
      if (isPattern) {
        prop.argument = this.parseIdent(false);
        if (this.type === types$1.comma) {
          this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
        }
        return this.finishNode(prop, "RestElement")
      }
      // Parse argument.
      prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
      // To disallow trailing comma via `this.toAssignable()`.
      if (this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
        refDestructuringErrors.trailingComma = this.start;
      }
      // Finish
      return this.finishNode(prop, "SpreadElement")
    }
    if (this.options.ecmaVersion >= 6) {
      prop.method = false;
      prop.shorthand = false;
      if (isPattern || refDestructuringErrors) {
        startPos = this.start;
        startLoc = this.startLoc;
      }
      if (!isPattern)
        { isGenerator = this.eat(types$1.star); }
    }
    var containsEsc = this.containsEsc;
    this.parsePropertyName(prop);
    if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
      this.parsePropertyName(prop);
    } else {
      isAsync = false;
    }
    this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
    return this.finishNode(prop, "Property")
  };

  pp$5.parseGetterSetter = function(prop) {
    var kind = prop.key.name;
    this.parsePropertyName(prop);
    prop.value = this.parseMethod(false);
    prop.kind = kind;
    var paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start;
      if (prop.kind === "get")
        { this.raiseRecoverable(start, "getter should have no params"); }
      else
        { this.raiseRecoverable(start, "setter should have exactly one param"); }
    } else {
      if (prop.kind === "set" && prop.value.params[0].type === "RestElement")
        { this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params"); }
    }
  };

  pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
    if ((isGenerator || isAsync) && this.type === types$1.colon)
      { this.unexpected(); }

    if (this.eat(types$1.colon)) {
      prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
      prop.kind = "init";
    } else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL) {
      if (isPattern) { this.unexpected(); }
      prop.method = true;
      prop.value = this.parseMethod(isGenerator, isAsync);
      prop.kind = "init";
    } else if (!isPattern && !containsEsc &&
               this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
               (prop.key.name === "get" || prop.key.name === "set") &&
               (this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq)) {
      if (isGenerator || isAsync) { this.unexpected(); }
      this.parseGetterSetter(prop);
    } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
      if (isGenerator || isAsync) { this.unexpected(); }
      this.checkUnreserved(prop.key);
      if (prop.key.name === "await" && !this.awaitIdentPos)
        { this.awaitIdentPos = startPos; }
      if (isPattern) {
        prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
      } else if (this.type === types$1.eq && refDestructuringErrors) {
        if (refDestructuringErrors.shorthandAssign < 0)
          { refDestructuringErrors.shorthandAssign = this.start; }
        prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
      } else {
        prop.value = this.copyNode(prop.key);
      }
      prop.kind = "init";
      prop.shorthand = true;
    } else { this.unexpected(); }
  };

  pp$5.parsePropertyName = function(prop) {
    if (this.options.ecmaVersion >= 6) {
      if (this.eat(types$1.bracketL)) {
        prop.computed = true;
        prop.key = this.parseMaybeAssign();
        this.expect(types$1.bracketR);
        return prop.key
      } else {
        prop.computed = false;
      }
    }
    return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never")
  };

  // Initialize empty function node.

  pp$5.initFunction = function(node) {
    node.id = null;
    if (this.options.ecmaVersion >= 6) { node.generator = node.expression = false; }
    if (this.options.ecmaVersion >= 8) { node.async = false; }
  };

  // Parse object or class method.

  pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
    var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;

    this.initFunction(node);
    if (this.options.ecmaVersion >= 6)
      { node.generator = isGenerator; }
    if (this.options.ecmaVersion >= 8)
      { node.async = !!isAsync; }

    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));

    this.expect(types$1.parenL);
    node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
    this.parseFunctionBody(node, false, true, false);

    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "FunctionExpression")
  };

  // Parse arrow function expression with given parameters.

  pp$5.parseArrowExpression = function(node, params, isAsync, forInit) {
    var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;

    this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
    this.initFunction(node);
    if (this.options.ecmaVersion >= 8) { node.async = !!isAsync; }

    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;

    node.params = this.toAssignableList(params, true);
    this.parseFunctionBody(node, true, false, forInit);

    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "ArrowFunctionExpression")
  };

  // Parse function body and check parameters.

  pp$5.parseFunctionBody = function(node, isArrowFunction, isMethod, forInit) {
    var isExpression = isArrowFunction && this.type !== types$1.braceL;
    var oldStrict = this.strict, useStrict = false;

    if (isExpression) {
      node.body = this.parseMaybeAssign(forInit);
      node.expression = true;
      this.checkParams(node, false);
    } else {
      var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
      if (!oldStrict || nonSimple) {
        useStrict = this.strictDirective(this.end);
        // If this is a strict mode function, verify that argument names
        // are not repeated, and it does not try to bind the words `eval`
        // or `arguments`.
        if (useStrict && nonSimple)
          { this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list"); }
      }
      // Start a new scope with regard to labels and the `inFunction`
      // flag (restore them to their old value afterwards).
      var oldLabels = this.labels;
      this.labels = [];
      if (useStrict) { this.strict = true; }

      // Add the params to varDeclaredNames to ensure that an error is thrown
      // if a let/const declaration in the function clashes with one of the params.
      this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
      // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
      if (this.strict && node.id) { this.checkLValSimple(node.id, BIND_OUTSIDE); }
      node.body = this.parseBlock(false, undefined, useStrict && !oldStrict);
      node.expression = false;
      this.adaptDirectivePrologue(node.body.body);
      this.labels = oldLabels;
    }
    this.exitScope();
  };

  pp$5.isSimpleParamList = function(params) {
    for (var i = 0, list = params; i < list.length; i += 1)
      {
      var param = list[i];

      if (param.type !== "Identifier") { return false
    } }
    return true
  };

  // Checks function params for various disallowed patterns such as using "eval"
  // or "arguments" and duplicate parameters.

  pp$5.checkParams = function(node, allowDuplicates) {
    var nameHash = Object.create(null);
    for (var i = 0, list = node.params; i < list.length; i += 1)
      {
      var param = list[i];

      this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
    }
  };

  // Parses a comma-separated list of expressions, and returns them as
  // an array. `close` is the token type that ends the list, and
  // `allowEmpty` can be turned on to allow subsequent commas with
  // nothing in between them to be parsed as `null` (which is needed
  // for array literals).

  pp$5.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      if (!first) {
        this.expect(types$1.comma);
        if (allowTrailingComma && this.afterTrailingComma(close)) { break }
      } else { first = false; }

      var elt = (void 0);
      if (allowEmpty && this.type === types$1.comma)
        { elt = null; }
      else if (this.type === types$1.ellipsis) {
        elt = this.parseSpread(refDestructuringErrors);
        if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0)
          { refDestructuringErrors.trailingComma = this.start; }
      } else {
        elt = this.parseMaybeAssign(false, refDestructuringErrors);
      }
      elts.push(elt);
    }
    return elts
  };

  pp$5.checkUnreserved = function(ref) {
    var start = ref.start;
    var end = ref.end;
    var name = ref.name;

    if (this.inGenerator && name === "yield")
      { this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator"); }
    if (this.inAsync && name === "await")
      { this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function"); }
    if (!(this.currentThisScope().flags & SCOPE_VAR) && name === "arguments")
      { this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer"); }
    if (this.inClassStaticBlock && (name === "arguments" || name === "await"))
      { this.raise(start, ("Cannot use " + name + " in class static initialization block")); }
    if (this.keywords.test(name))
      { this.raise(start, ("Unexpected keyword '" + name + "'")); }
    if (this.options.ecmaVersion < 6 &&
      this.input.slice(start, end).indexOf("\\") !== -1) { return }
    var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
    if (re.test(name)) {
      if (!this.inAsync && name === "await")
        { this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function"); }
      this.raiseRecoverable(start, ("The keyword '" + name + "' is reserved"));
    }
  };

  // Parse the next token as an identifier. If `liberal` is true (used
  // when parsing properties), it will also convert keywords into
  // identifiers.

  pp$5.parseIdent = function(liberal) {
    var node = this.parseIdentNode();
    this.next(!!liberal);
    this.finishNode(node, "Identifier");
    if (!liberal) {
      this.checkUnreserved(node);
      if (node.name === "await" && !this.awaitIdentPos)
        { this.awaitIdentPos = node.start; }
    }
    return node
  };

  pp$5.parseIdentNode = function() {
    var node = this.startNode();
    if (this.type === types$1.name) {
      node.name = this.value;
    } else if (this.type.keyword) {
      node.name = this.type.keyword;

      // To fix https://github.com/acornjs/acorn/issues/575
      // `class` and `function` keywords push new context into this.context.
      // But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
      // If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword
      if ((node.name === "class" || node.name === "function") &&
        (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
        this.context.pop();
      }
      this.type = types$1.name;
    } else {
      this.unexpected();
    }
    return node
  };

  pp$5.parsePrivateIdent = function() {
    var node = this.startNode();
    if (this.type === types$1.privateId) {
      node.name = this.value;
    } else {
      this.unexpected();
    }
    this.next();
    this.finishNode(node, "PrivateIdentifier");

    // For validating existence
    if (this.options.checkPrivateFields) {
      if (this.privateNameStack.length === 0) {
        this.raise(node.start, ("Private field '#" + (node.name) + "' must be declared in an enclosing class"));
      } else {
        this.privateNameStack[this.privateNameStack.length - 1].used.push(node);
      }
    }

    return node
  };

  // Parses yield expression inside generator.

  pp$5.parseYield = function(forInit) {
    if (!this.yieldPos) { this.yieldPos = this.start; }

    var node = this.startNode();
    this.next();
    if (this.type === types$1.semi || this.canInsertSemicolon() || (this.type !== types$1.star && !this.type.startsExpr)) {
      node.delegate = false;
      node.argument = null;
    } else {
      node.delegate = this.eat(types$1.star);
      node.argument = this.parseMaybeAssign(forInit);
    }
    return this.finishNode(node, "YieldExpression")
  };

  pp$5.parseAwait = function(forInit) {
    if (!this.awaitPos) { this.awaitPos = this.start; }

    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeUnary(null, true, false, forInit);
    return this.finishNode(node, "AwaitExpression")
  };

  var pp$4 = Parser.prototype;

  // This function is used to raise exceptions on parse errors. It
  // takes an offset integer (into the current `input`) to indicate
  // the location of the error, attaches the position to the end
  // of the error message, and then raises a `SyntaxError` with that
  // message.

  pp$4.raise = function(pos, message) {
    var loc = getLineInfo(this.input, pos);
    message += " (" + loc.line + ":" + loc.column + ")";
    if (this.sourceFile) {
      message += " in " + this.sourceFile;
    }
    var err = new SyntaxError(message);
    err.pos = pos; err.loc = loc; err.raisedAt = this.pos;
    throw err
  };

  pp$4.raiseRecoverable = pp$4.raise;

  pp$4.curPosition = function() {
    if (this.options.locations) {
      return new Position(this.curLine, this.pos - this.lineStart)
    }
  };

  var pp$3 = Parser.prototype;

  var Scope = function Scope(flags) {
    this.flags = flags;
    // A list of var-declared names in the current lexical scope
    this.var = [];
    // A list of lexically-declared names in the current lexical scope
    this.lexical = [];
    // A list of lexically-declared FunctionDeclaration names in the current lexical scope
    this.functions = [];
  };

  // The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

  pp$3.enterScope = function(flags) {
    this.scopeStack.push(new Scope(flags));
  };

  pp$3.exitScope = function() {
    this.scopeStack.pop();
  };

  // The spec says:
  // > At the top level of a function, or script, function declarations are
  // > treated like var declarations rather than like lexical declarations.
  pp$3.treatFunctionsAsVarInScope = function(scope) {
    return (scope.flags & SCOPE_FUNCTION) || !this.inModule && (scope.flags & SCOPE_TOP)
  };

  pp$3.declareName = function(name, bindingType, pos) {
    var redeclared = false;
    if (bindingType === BIND_LEXICAL) {
      var scope = this.currentScope();
      redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
      scope.lexical.push(name);
      if (this.inModule && (scope.flags & SCOPE_TOP))
        { delete this.undefinedExports[name]; }
    } else if (bindingType === BIND_SIMPLE_CATCH) {
      var scope$1 = this.currentScope();
      scope$1.lexical.push(name);
    } else if (bindingType === BIND_FUNCTION) {
      var scope$2 = this.currentScope();
      if (this.treatFunctionsAsVar)
        { redeclared = scope$2.lexical.indexOf(name) > -1; }
      else
        { redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1; }
      scope$2.functions.push(name);
    } else {
      for (var i = this.scopeStack.length - 1; i >= 0; --i) {
        var scope$3 = this.scopeStack[i];
        if (scope$3.lexical.indexOf(name) > -1 && !((scope$3.flags & SCOPE_SIMPLE_CATCH) && scope$3.lexical[0] === name) ||
            !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
          redeclared = true;
          break
        }
        scope$3.var.push(name);
        if (this.inModule && (scope$3.flags & SCOPE_TOP))
          { delete this.undefinedExports[name]; }
        if (scope$3.flags & SCOPE_VAR) { break }
      }
    }
    if (redeclared) { this.raiseRecoverable(pos, ("Identifier '" + name + "' has already been declared")); }
  };

  pp$3.checkLocalExport = function(id) {
    // scope.functions must be empty as Module code is always strict.
    if (this.scopeStack[0].lexical.indexOf(id.name) === -1 &&
        this.scopeStack[0].var.indexOf(id.name) === -1) {
      this.undefinedExports[id.name] = id;
    }
  };

  pp$3.currentScope = function() {
    return this.scopeStack[this.scopeStack.length - 1]
  };

  pp$3.currentVarScope = function() {
    for (var i = this.scopeStack.length - 1;; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK)) { return scope }
    }
  };

  // Could be useful for `this`, `new.target`, `super()`, `super.property`, and `super[property]`.
  pp$3.currentThisScope = function() {
    for (var i = this.scopeStack.length - 1;; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK) &&
          !(scope.flags & SCOPE_ARROW)) { return scope }
    }
  };

  var Node = function Node(parser, pos, loc) {
    this.type = "";
    this.start = pos;
    this.end = 0;
    if (parser.options.locations)
      { this.loc = new SourceLocation(parser, loc); }
    if (parser.options.directSourceFile)
      { this.sourceFile = parser.options.directSourceFile; }
    if (parser.options.ranges)
      { this.range = [pos, 0]; }
  };

  // Start an AST node, attaching a start offset.

  var pp$2 = Parser.prototype;

  pp$2.startNode = function() {
    return new Node(this, this.start, this.startLoc)
  };

  pp$2.startNodeAt = function(pos, loc) {
    return new Node(this, pos, loc)
  };

  // Finish an AST node, adding `type` and `end` properties.

  function finishNodeAt(node, type, pos, loc) {
    node.type = type;
    node.end = pos;
    if (this.options.locations)
      { node.loc.end = loc; }
    if (this.options.ranges)
      { node.range[1] = pos; }
    return node
  }

  pp$2.finishNode = function(node, type) {
    return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc)
  };

  // Finish node at given position

  pp$2.finishNodeAt = function(node, type, pos, loc) {
    return finishNodeAt.call(this, node, type, pos, loc)
  };

  pp$2.copyNode = function(node) {
    var newNode = new Node(this, node.start, this.startLoc);
    for (var prop in node) { newNode[prop] = node[prop]; }
    return newNode
  };

  // This file was generated by "bin/generate-unicode-script-values.js". Do not modify manually!
  var scriptValuesAddedInUnicode = "Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz";

  // This file contains Unicode properties extracted from the ECMAScript specification.
  // The lists are extracted like so:
  // $$('#table-binary-unicode-properties > figure > table > tbody > tr > td:nth-child(1) code').map(el => el.innerText)

  // #table-binary-unicode-properties
  var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
  var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
  var ecma11BinaryProperties = ecma10BinaryProperties;
  var ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict";
  var ecma13BinaryProperties = ecma12BinaryProperties;
  var ecma14BinaryProperties = ecma13BinaryProperties;

  var unicodeBinaryProperties = {
    9: ecma9BinaryProperties,
    10: ecma10BinaryProperties,
    11: ecma11BinaryProperties,
    12: ecma12BinaryProperties,
    13: ecma13BinaryProperties,
    14: ecma14BinaryProperties
  };

  // #table-binary-unicode-properties-of-strings
  var ecma14BinaryPropertiesOfStrings = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji";

  var unicodeBinaryPropertiesOfStrings = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: ecma14BinaryPropertiesOfStrings
  };

  // #table-unicode-general-category-values
  var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";

  // #table-unicode-script-values
  var ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
  var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
  var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
  var ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
  var ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
  var ecma14ScriptValues = ecma13ScriptValues + " " + scriptValuesAddedInUnicode;

  var unicodeScriptValues = {
    9: ecma9ScriptValues,
    10: ecma10ScriptValues,
    11: ecma11ScriptValues,
    12: ecma12ScriptValues,
    13: ecma13ScriptValues,
    14: ecma14ScriptValues
  };

  var data = {};
  function buildUnicodeData(ecmaVersion) {
    var d = data[ecmaVersion] = {
      binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
      binaryOfStrings: wordsRegexp(unicodeBinaryPropertiesOfStrings[ecmaVersion]),
      nonBinary: {
        General_Category: wordsRegexp(unicodeGeneralCategoryValues),
        Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
      }
    };
    d.nonBinary.Script_Extensions = d.nonBinary.Script;

    d.nonBinary.gc = d.nonBinary.General_Category;
    d.nonBinary.sc = d.nonBinary.Script;
    d.nonBinary.scx = d.nonBinary.Script_Extensions;
  }

  for (var i = 0, list = [9, 10, 11, 12, 13, 14]; i < list.length; i += 1) {
    var ecmaVersion = list[i];

    buildUnicodeData(ecmaVersion);
  }

  var pp$1 = Parser.prototype;

  // Track disjunction structure to determine whether a duplicate
  // capture group name is allowed because it is in a separate branch.
  var BranchID = function BranchID(parent, base) {
    // Parent disjunction branch
    this.parent = parent;
    // Identifies this set of sibling branches
    this.base = base || this;
  };

  BranchID.prototype.separatedFrom = function separatedFrom (alt) {
    // A branch is separate from another branch if they or any of
    // their parents are siblings in a given disjunction
    for (var self = this; self; self = self.parent) {
      for (var other = alt; other; other = other.parent) {
        if (self.base === other.base && self !== other) { return true }
      }
    }
    return false
  };

  BranchID.prototype.sibling = function sibling () {
    return new BranchID(this.parent, this.base)
  };

  var RegExpValidationState = function RegExpValidationState(parser) {
    this.parser = parser;
    this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "") + (parser.options.ecmaVersion >= 15 ? "v" : "");
    this.unicodeProperties = data[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion];
    this.source = "";
    this.flags = "";
    this.start = 0;
    this.switchU = false;
    this.switchV = false;
    this.switchN = false;
    this.pos = 0;
    this.lastIntValue = 0;
    this.lastStringValue = "";
    this.lastAssertionIsQuantifiable = false;
    this.numCapturingParens = 0;
    this.maxBackReference = 0;
    this.groupNames = Object.create(null);
    this.backReferenceNames = [];
    this.branchID = null;
  };

  RegExpValidationState.prototype.reset = function reset (start, pattern, flags) {
    var unicodeSets = flags.indexOf("v") !== -1;
    var unicode = flags.indexOf("u") !== -1;
    this.start = start | 0;
    this.source = pattern + "";
    this.flags = flags;
    if (unicodeSets && this.parser.options.ecmaVersion >= 15) {
      this.switchU = true;
      this.switchV = true;
      this.switchN = true;
    } else {
      this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
      this.switchV = false;
      this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
    }
  };

  RegExpValidationState.prototype.raise = function raise (message) {
    this.parser.raiseRecoverable(this.start, ("Invalid regular expression: /" + (this.source) + "/: " + message));
  };

  // If u flag is given, this returns the code point at the index (it combines a surrogate pair).
  // Otherwise, this returns the code unit of the index (can be a part of a surrogate pair).
  RegExpValidationState.prototype.at = function at (i, forceU) {
      if ( forceU === void 0 ) forceU = false;

    var s = this.source;
    var l = s.length;
    if (i >= l) {
      return -1
    }
    var c = s.charCodeAt(i);
    if (!(forceU || this.switchU) || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
      return c
    }
    var next = s.charCodeAt(i + 1);
    return next >= 0xDC00 && next <= 0xDFFF ? (c << 10) + next - 0x35FDC00 : c
  };

  RegExpValidationState.prototype.nextIndex = function nextIndex (i, forceU) {
      if ( forceU === void 0 ) forceU = false;

    var s = this.source;
    var l = s.length;
    if (i >= l) {
      return l
    }
    var c = s.charCodeAt(i), next;
    if (!(forceU || this.switchU) || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l ||
        (next = s.charCodeAt(i + 1)) < 0xDC00 || next > 0xDFFF) {
      return i + 1
    }
    return i + 2
  };

  RegExpValidationState.prototype.current = function current (forceU) {
      if ( forceU === void 0 ) forceU = false;

    return this.at(this.pos, forceU)
  };

  RegExpValidationState.prototype.lookahead = function lookahead (forceU) {
      if ( forceU === void 0 ) forceU = false;

    return this.at(this.nextIndex(this.pos, forceU), forceU)
  };

  RegExpValidationState.prototype.advance = function advance (forceU) {
      if ( forceU === void 0 ) forceU = false;

    this.pos = this.nextIndex(this.pos, forceU);
  };

  RegExpValidationState.prototype.eat = function eat (ch, forceU) {
      if ( forceU === void 0 ) forceU = false;

    if (this.current(forceU) === ch) {
      this.advance(forceU);
      return true
    }
    return false
  };

  RegExpValidationState.prototype.eatChars = function eatChars (chs, forceU) {
      if ( forceU === void 0 ) forceU = false;

    var pos = this.pos;
    for (var i = 0, list = chs; i < list.length; i += 1) {
      var ch = list[i];

        var current = this.at(pos, forceU);
      if (current === -1 || current !== ch) {
        return false
      }
      pos = this.nextIndex(pos, forceU);
    }
    this.pos = pos;
    return true
  };

  /**
   * Validate the flags part of a given RegExpLiteral.
   *
   * @param {RegExpValidationState} state The state to validate RegExp.
   * @returns {void}
   */
  pp$1.validateRegExpFlags = function(state) {
    var validFlags = state.validFlags;
    var flags = state.flags;

    var u = false;
    var v = false;

    for (var i = 0; i < flags.length; i++) {
      var flag = flags.charAt(i);
      if (validFlags.indexOf(flag) === -1) {
        this.raise(state.start, "Invalid regular expression flag");
      }
      if (flags.indexOf(flag, i + 1) > -1) {
        this.raise(state.start, "Duplicate regular expression flag");
      }
      if (flag === "u") { u = true; }
      if (flag === "v") { v = true; }
    }
    if (this.options.ecmaVersion >= 15 && u && v) {
      this.raise(state.start, "Invalid regular expression flag");
    }
  };

  function hasProp(obj) {
    for (var _ in obj) { return true }
    return false
  }

  /**
   * Validate the pattern part of a given RegExpLiteral.
   *
   * @param {RegExpValidationState} state The state to validate RegExp.
   * @returns {void}
   */
  pp$1.validateRegExpPattern = function(state) {
    this.regexp_pattern(state);

    // The goal symbol for the parse is |Pattern[~U, ~N]|. If the result of
    // parsing contains a |GroupName|, reparse with the goal symbol
    // |Pattern[~U, +N]| and use this result instead. Throw a *SyntaxError*
    // exception if _P_ did not conform to the grammar, if any elements of _P_
    // were not matched by the parse, or if any Early Error conditions exist.
    if (!state.switchN && this.options.ecmaVersion >= 9 && hasProp(state.groupNames)) {
      state.switchN = true;
      this.regexp_pattern(state);
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
  pp$1.regexp_pattern = function(state) {
    state.pos = 0;
    state.lastIntValue = 0;
    state.lastStringValue = "";
    state.lastAssertionIsQuantifiable = false;
    state.numCapturingParens = 0;
    state.maxBackReference = 0;
    state.groupNames = Object.create(null);
    state.backReferenceNames.length = 0;
    state.branchID = null;

    this.regexp_disjunction(state);

    if (state.pos !== state.source.length) {
      // Make the same messages as V8.
      if (state.eat(0x29 /* ) */)) {
        state.raise("Unmatched ')'");
      }
      if (state.eat(0x5D /* ] */) || state.eat(0x7D /* } */)) {
        state.raise("Lone quantifier brackets");
      }
    }
    if (state.maxBackReference > state.numCapturingParens) {
      state.raise("Invalid escape");
    }
    for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
      var name = list[i];

      if (!state.groupNames[name]) {
        state.raise("Invalid named capture referenced");
      }
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
  pp$1.regexp_disjunction = function(state) {
    var trackDisjunction = this.options.ecmaVersion >= 16;
    if (trackDisjunction) { state.branchID = new BranchID(state.branchID, null); }
    this.regexp_alternative(state);
    while (state.eat(0x7C /* | */)) {
      if (trackDisjunction) { state.branchID = state.branchID.sibling(); }
      this.regexp_alternative(state);
    }
    if (trackDisjunction) { state.branchID = state.branchID.parent; }

    // Make the same message as V8.
    if (this.regexp_eatQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }
    if (state.eat(0x7B /* { */)) {
      state.raise("Lone quantifier brackets");
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
  pp$1.regexp_alternative = function(state) {
    while (state.pos < state.source.length && this.regexp_eatTerm(state)) {}
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term
  pp$1.regexp_eatTerm = function(state) {
    if (this.regexp_eatAssertion(state)) {
      // Handle `QuantifiableAssertion Quantifier` alternative.
      // `state.lastAssertionIsQuantifiable` is true if the last eaten Assertion
      // is a QuantifiableAssertion.
      if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
        // Make the same message as V8.
        if (state.switchU) {
          state.raise("Invalid quantifier");
        }
      }
      return true
    }

    if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
      this.regexp_eatQuantifier(state);
      return true
    }

    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion
  pp$1.regexp_eatAssertion = function(state) {
    var start = state.pos;
    state.lastAssertionIsQuantifiable = false;

    // ^, $
    if (state.eat(0x5E /* ^ */) || state.eat(0x24 /* $ */)) {
      return true
    }

    // \b \B
    if (state.eat(0x5C /* \ */)) {
      if (state.eat(0x42 /* B */) || state.eat(0x62 /* b */)) {
        return true
      }
      state.pos = start;
    }

    // Lookahead / Lookbehind
    if (state.eat(0x28 /* ( */) && state.eat(0x3F /* ? */)) {
      var lookbehind = false;
      if (this.options.ecmaVersion >= 9) {
        lookbehind = state.eat(0x3C /* < */);
      }
      if (state.eat(0x3D /* = */) || state.eat(0x21 /* ! */)) {
        this.regexp_disjunction(state);
        if (!state.eat(0x29 /* ) */)) {
          state.raise("Unterminated group");
        }
        state.lastAssertionIsQuantifiable = !lookbehind;
        return true
      }
    }

    state.pos = start;
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
  pp$1.regexp_eatQuantifier = function(state, noError) {
    if ( noError === void 0 ) noError = false;

    if (this.regexp_eatQuantifierPrefix(state, noError)) {
      state.eat(0x3F /* ? */);
      return true
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
  pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
    return (
      state.eat(0x2A /* * */) ||
      state.eat(0x2B /* + */) ||
      state.eat(0x3F /* ? */) ||
      this.regexp_eatBracedQuantifier(state, noError)
    )
  };
  pp$1.regexp_eatBracedQuantifier = function(state, noError) {
    var start = state.pos;
    if (state.eat(0x7B /* { */)) {
      var min = 0, max = -1;
      if (this.regexp_eatDecimalDigits(state)) {
        min = state.lastIntValue;
        if (state.eat(0x2C /* , */) && this.regexp_eatDecimalDigits(state)) {
          max = state.lastIntValue;
        }
        if (state.eat(0x7D /* } */)) {
          // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-term
          if (max !== -1 && max < min && !noError) {
            state.raise("numbers out of order in {} quantifier");
          }
          return true
        }
      }
      if (state.switchU && !noError) {
        state.raise("Incomplete quantifier");
      }
      state.pos = start;
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
  pp$1.regexp_eatAtom = function(state) {
    return (
      this.regexp_eatPatternCharacters(state) ||
      state.eat(0x2E /* . */) ||
      this.regexp_eatReverseSolidusAtomEscape(state) ||
      this.regexp_eatCharacterClass(state) ||
      this.regexp_eatUncapturingGroup(state) ||
      this.regexp_eatCapturingGroup(state)
    )
  };
  pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
    var start = state.pos;
    if (state.eat(0x5C /* \ */)) {
      if (this.regexp_eatAtomEscape(state)) {
        return true
      }
      state.pos = start;
    }
    return false
  };
  pp$1.regexp_eatUncapturingGroup = function(state) {
    var start = state.pos;
    if (state.eat(0x28 /* ( */)) {
      if (state.eat(0x3F /* ? */)) {
        if (this.options.ecmaVersion >= 16) {
          var addModifiers = this.regexp_eatModifiers(state);
          var hasHyphen = state.eat(0x2D /* - */);
          if (addModifiers || hasHyphen) {
            for (var i = 0; i < addModifiers.length; i++) {
              var modifier = addModifiers.charAt(i);
              if (addModifiers.indexOf(modifier, i + 1) > -1) {
                state.raise("Duplicate regular expression modifiers");
              }
            }
            if (hasHyphen) {
              var removeModifiers = this.regexp_eatModifiers(state);
              if (!addModifiers && !removeModifiers && state.current() === 0x3A /* : */) {
                state.raise("Invalid regular expression modifiers");
              }
              for (var i$1 = 0; i$1 < removeModifiers.length; i$1++) {
                var modifier$1 = removeModifiers.charAt(i$1);
                if (
                  removeModifiers.indexOf(modifier$1, i$1 + 1) > -1 ||
                  addModifiers.indexOf(modifier$1) > -1
                ) {
                  state.raise("Duplicate regular expression modifiers");
                }
              }
            }
          }
        }
        if (state.eat(0x3A /* : */)) {
          this.regexp_disjunction(state);
          if (state.eat(0x29 /* ) */)) {
            return true
          }
          state.raise("Unterminated group");
        }
      }
      state.pos = start;
    }
    return false
  };
  pp$1.regexp_eatCapturingGroup = function(state) {
    if (state.eat(0x28 /* ( */)) {
      if (this.options.ecmaVersion >= 9) {
        this.regexp_groupSpecifier(state);
      } else if (state.current() === 0x3F /* ? */) {
        state.raise("Invalid group");
      }
      this.regexp_disjunction(state);
      if (state.eat(0x29 /* ) */)) {
        state.numCapturingParens += 1;
        return true
      }
      state.raise("Unterminated group");
    }
    return false
  };
  // RegularExpressionModifiers ::
  //   [empty]
  //   RegularExpressionModifiers RegularExpressionModifier
  pp$1.regexp_eatModifiers = function(state) {
    var modifiers = "";
    var ch = 0;
    while ((ch = state.current()) !== -1 && isRegularExpressionModifier(ch)) {
      modifiers += codePointToString(ch);
      state.advance();
    }
    return modifiers
  };
  // RegularExpressionModifier :: one of
  //   `i` `m` `s`
  function isRegularExpressionModifier(ch) {
    return ch === 0x69 /* i */ || ch === 0x6d /* m */ || ch === 0x73 /* s */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom
  pp$1.regexp_eatExtendedAtom = function(state) {
    return (
      state.eat(0x2E /* . */) ||
      this.regexp_eatReverseSolidusAtomEscape(state) ||
      this.regexp_eatCharacterClass(state) ||
      this.regexp_eatUncapturingGroup(state) ||
      this.regexp_eatCapturingGroup(state) ||
      this.regexp_eatInvalidBracedQuantifier(state) ||
      this.regexp_eatExtendedPatternCharacter(state)
    )
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier
  pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
    if (this.regexp_eatBracedQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
  pp$1.regexp_eatSyntaxCharacter = function(state) {
    var ch = state.current();
    if (isSyntaxCharacter(ch)) {
      state.lastIntValue = ch;
      state.advance();
      return true
    }
    return false
  };
  function isSyntaxCharacter(ch) {
    return (
      ch === 0x24 /* $ */ ||
      ch >= 0x28 /* ( */ && ch <= 0x2B /* + */ ||
      ch === 0x2E /* . */ ||
      ch === 0x3F /* ? */ ||
      ch >= 0x5B /* [ */ && ch <= 0x5E /* ^ */ ||
      ch >= 0x7B /* { */ && ch <= 0x7D /* } */
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
  // But eat eager.
  pp$1.regexp_eatPatternCharacters = function(state) {
    var start = state.pos;
    var ch = 0;
    while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
      state.advance();
    }
    return state.pos !== start
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedPatternCharacter
  pp$1.regexp_eatExtendedPatternCharacter = function(state) {
    var ch = state.current();
    if (
      ch !== -1 &&
      ch !== 0x24 /* $ */ &&
      !(ch >= 0x28 /* ( */ && ch <= 0x2B /* + */) &&
      ch !== 0x2E /* . */ &&
      ch !== 0x3F /* ? */ &&
      ch !== 0x5B /* [ */ &&
      ch !== 0x5E /* ^ */ &&
      ch !== 0x7C /* | */
    ) {
      state.advance();
      return true
    }
    return false
  };

  // GroupSpecifier ::
  //   [empty]
  //   `?` GroupName
  pp$1.regexp_groupSpecifier = function(state) {
    if (state.eat(0x3F /* ? */)) {
      if (!this.regexp_eatGroupName(state)) { state.raise("Invalid group"); }
      var trackDisjunction = this.options.ecmaVersion >= 16;
      var known = state.groupNames[state.lastStringValue];
      if (known) {
        if (trackDisjunction) {
          for (var i = 0, list = known; i < list.length; i += 1) {
            var altID = list[i];

            if (!altID.separatedFrom(state.branchID))
              { state.raise("Duplicate capture group name"); }
          }
        } else {
          state.raise("Duplicate capture group name");
        }
      }
      if (trackDisjunction) {
        (known || (state.groupNames[state.lastStringValue] = [])).push(state.branchID);
      } else {
        state.groupNames[state.lastStringValue] = true;
      }
    }
  };

  // GroupName ::
  //   `<` RegExpIdentifierName `>`
  // Note: this updates `state.lastStringValue` property with the eaten name.
  pp$1.regexp_eatGroupName = function(state) {
    state.lastStringValue = "";
    if (state.eat(0x3C /* < */)) {
      if (this.regexp_eatRegExpIdentifierName(state) && state.eat(0x3E /* > */)) {
        return true
      }
      state.raise("Invalid capture group name");
    }
    return false
  };

  // RegExpIdentifierName ::
  //   RegExpIdentifierStart
  //   RegExpIdentifierName RegExpIdentifierPart
  // Note: this updates `state.lastStringValue` property with the eaten name.
  pp$1.regexp_eatRegExpIdentifierName = function(state) {
    state.lastStringValue = "";
    if (this.regexp_eatRegExpIdentifierStart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue);
      while (this.regexp_eatRegExpIdentifierPart(state)) {
        state.lastStringValue += codePointToString(state.lastIntValue);
      }
      return true
    }
    return false
  };

  // RegExpIdentifierStart ::
  //   UnicodeIDStart
  //   `$`
  //   `_`
  //   `\` RegExpUnicodeEscapeSequence[+U]
  pp$1.regexp_eatRegExpIdentifierStart = function(state) {
    var start = state.pos;
    var forceU = this.options.ecmaVersion >= 11;
    var ch = state.current(forceU);
    state.advance(forceU);

    if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
      ch = state.lastIntValue;
    }
    if (isRegExpIdentifierStart(ch)) {
      state.lastIntValue = ch;
      return true
    }

    state.pos = start;
    return false
  };
  function isRegExpIdentifierStart(ch) {
    return isIdentifierStart(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */
  }

  // RegExpIdentifierPart ::
  //   UnicodeIDContinue
  //   `$`
  //   `_`
  //   `\` RegExpUnicodeEscapeSequence[+U]
  //   <ZWNJ>
  //   <ZWJ>
  pp$1.regexp_eatRegExpIdentifierPart = function(state) {
    var start = state.pos;
    var forceU = this.options.ecmaVersion >= 11;
    var ch = state.current(forceU);
    state.advance(forceU);

    if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
      ch = state.lastIntValue;
    }
    if (isRegExpIdentifierPart(ch)) {
      state.lastIntValue = ch;
      return true
    }

    state.pos = start;
    return false
  };
  function isRegExpIdentifierPart(ch) {
    return isIdentifierChar(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */ || ch === 0x200C /* <ZWNJ> */ || ch === 0x200D /* <ZWJ> */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape
  pp$1.regexp_eatAtomEscape = function(state) {
    if (
      this.regexp_eatBackReference(state) ||
      this.regexp_eatCharacterClassEscape(state) ||
      this.regexp_eatCharacterEscape(state) ||
      (state.switchN && this.regexp_eatKGroupName(state))
    ) {
      return true
    }
    if (state.switchU) {
      // Make the same message as V8.
      if (state.current() === 0x63 /* c */) {
        state.raise("Invalid unicode escape");
      }
      state.raise("Invalid escape");
    }
    return false
  };
  pp$1.regexp_eatBackReference = function(state) {
    var start = state.pos;
    if (this.regexp_eatDecimalEscape(state)) {
      var n = state.lastIntValue;
      if (state.switchU) {
        // For SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
        if (n > state.maxBackReference) {
          state.maxBackReference = n;
        }
        return true
      }
      if (n <= state.numCapturingParens) {
        return true
      }
      state.pos = start;
    }
    return false
  };
  pp$1.regexp_eatKGroupName = function(state) {
    if (state.eat(0x6B /* k */)) {
      if (this.regexp_eatGroupName(state)) {
        state.backReferenceNames.push(state.lastStringValue);
        return true
      }
      state.raise("Invalid named reference");
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape
  pp$1.regexp_eatCharacterEscape = function(state) {
    return (
      this.regexp_eatControlEscape(state) ||
      this.regexp_eatCControlLetter(state) ||
      this.regexp_eatZero(state) ||
      this.regexp_eatHexEscapeSequence(state) ||
      this.regexp_eatRegExpUnicodeEscapeSequence(state, false) ||
      (!state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state)) ||
      this.regexp_eatIdentityEscape(state)
    )
  };
  pp$1.regexp_eatCControlLetter = function(state) {
    var start = state.pos;
    if (state.eat(0x63 /* c */)) {
      if (this.regexp_eatControlLetter(state)) {
        return true
      }
      state.pos = start;
    }
    return false
  };
  pp$1.regexp_eatZero = function(state) {
    if (state.current() === 0x30 /* 0 */ && !isDecimalDigit(state.lookahead())) {
      state.lastIntValue = 0;
      state.advance();
      return true
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
  pp$1.regexp_eatControlEscape = function(state) {
    var ch = state.current();
    if (ch === 0x74 /* t */) {
      state.lastIntValue = 0x09; /* \t */
      state.advance();
      return true
    }
    if (ch === 0x6E /* n */) {
      state.lastIntValue = 0x0A; /* \n */
      state.advance();
      return true
    }
    if (ch === 0x76 /* v */) {
      state.lastIntValue = 0x0B; /* \v */
      state.advance();
      return true
    }
    if (ch === 0x66 /* f */) {
      state.lastIntValue = 0x0C; /* \f */
      state.advance();
      return true
    }
    if (ch === 0x72 /* r */) {
      state.lastIntValue = 0x0D; /* \r */
      state.advance();
      return true
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
  pp$1.regexp_eatControlLetter = function(state) {
    var ch = state.current();
    if (isControlLetter(ch)) {
      state.lastIntValue = ch % 0x20;
      state.advance();
      return true
    }
    return false
  };
  function isControlLetter(ch) {
    return (
      (ch >= 0x41 /* A */ && ch <= 0x5A /* Z */) ||
      (ch >= 0x61 /* a */ && ch <= 0x7A /* z */)
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
  pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
    if ( forceU === void 0 ) forceU = false;

    var start = state.pos;
    var switchU = forceU || state.switchU;

    if (state.eat(0x75 /* u */)) {
      if (this.regexp_eatFixedHexDigits(state, 4)) {
        var lead = state.lastIntValue;
        if (switchU && lead >= 0xD800 && lead <= 0xDBFF) {
          var leadSurrogateEnd = state.pos;
          if (state.eat(0x5C /* \ */) && state.eat(0x75 /* u */) && this.regexp_eatFixedHexDigits(state, 4)) {
            var trail = state.lastIntValue;
            if (trail >= 0xDC00 && trail <= 0xDFFF) {
              state.lastIntValue = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
              return true
            }
          }
          state.pos = leadSurrogateEnd;
          state.lastIntValue = lead;
        }
        return true
      }
      if (
        switchU &&
        state.eat(0x7B /* { */) &&
        this.regexp_eatHexDigits(state) &&
        state.eat(0x7D /* } */) &&
        isValidUnicode(state.lastIntValue)
      ) {
        return true
      }
      if (switchU) {
        state.raise("Invalid unicode escape");
      }
      state.pos = start;
    }

    return false
  };
  function isValidUnicode(ch) {
    return ch >= 0 && ch <= 0x10FFFF
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape
  pp$1.regexp_eatIdentityEscape = function(state) {
    if (state.switchU) {
      if (this.regexp_eatSyntaxCharacter(state)) {
        return true
      }
      if (state.eat(0x2F /* / */)) {
        state.lastIntValue = 0x2F; /* / */
        return true
      }
      return false
    }

    var ch = state.current();
    if (ch !== 0x63 /* c */ && (!state.switchN || ch !== 0x6B /* k */)) {
      state.lastIntValue = ch;
      state.advance();
      return true
    }

    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
  pp$1.regexp_eatDecimalEscape = function(state) {
    state.lastIntValue = 0;
    var ch = state.current();
    if (ch >= 0x31 /* 1 */ && ch <= 0x39 /* 9 */) {
      do {
        state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
        state.advance();
      } while ((ch = state.current()) >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */)
      return true
    }
    return false
  };

  // Return values used by character set parsing methods, needed to
  // forbid negation of sets that can match strings.
  var CharSetNone = 0; // Nothing parsed
  var CharSetOk = 1; // Construct parsed, cannot contain strings
  var CharSetString = 2; // Construct parsed, can contain strings

  // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
  pp$1.regexp_eatCharacterClassEscape = function(state) {
    var ch = state.current();

    if (isCharacterClassEscape(ch)) {
      state.lastIntValue = -1;
      state.advance();
      return CharSetOk
    }

    var negate = false;
    if (
      state.switchU &&
      this.options.ecmaVersion >= 9 &&
      ((negate = ch === 0x50 /* P */) || ch === 0x70 /* p */)
    ) {
      state.lastIntValue = -1;
      state.advance();
      var result;
      if (
        state.eat(0x7B /* { */) &&
        (result = this.regexp_eatUnicodePropertyValueExpression(state)) &&
        state.eat(0x7D /* } */)
      ) {
        if (negate && result === CharSetString) { state.raise("Invalid property name"); }
        return result
      }
      state.raise("Invalid property name");
    }

    return CharSetNone
  };

  function isCharacterClassEscape(ch) {
    return (
      ch === 0x64 /* d */ ||
      ch === 0x44 /* D */ ||
      ch === 0x73 /* s */ ||
      ch === 0x53 /* S */ ||
      ch === 0x77 /* w */ ||
      ch === 0x57 /* W */
    )
  }

  // UnicodePropertyValueExpression ::
  //   UnicodePropertyName `=` UnicodePropertyValue
  //   LoneUnicodePropertyNameOrValue
  pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
    var start = state.pos;

    // UnicodePropertyName `=` UnicodePropertyValue
    if (this.regexp_eatUnicodePropertyName(state) && state.eat(0x3D /* = */)) {
      var name = state.lastStringValue;
      if (this.regexp_eatUnicodePropertyValue(state)) {
        var value = state.lastStringValue;
        this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
        return CharSetOk
      }
    }
    state.pos = start;

    // LoneUnicodePropertyNameOrValue
    if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
      var nameOrValue = state.lastStringValue;
      return this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue)
    }
    return CharSetNone
  };

  pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
    if (!hasOwn(state.unicodeProperties.nonBinary, name))
      { state.raise("Invalid property name"); }
    if (!state.unicodeProperties.nonBinary[name].test(value))
      { state.raise("Invalid property value"); }
  };

  pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
    if (state.unicodeProperties.binary.test(nameOrValue)) { return CharSetOk }
    if (state.switchV && state.unicodeProperties.binaryOfStrings.test(nameOrValue)) { return CharSetString }
    state.raise("Invalid property name");
  };

  // UnicodePropertyName ::
  //   UnicodePropertyNameCharacters
  pp$1.regexp_eatUnicodePropertyName = function(state) {
    var ch = 0;
    state.lastStringValue = "";
    while (isUnicodePropertyNameCharacter(ch = state.current())) {
      state.lastStringValue += codePointToString(ch);
      state.advance();
    }
    return state.lastStringValue !== ""
  };

  function isUnicodePropertyNameCharacter(ch) {
    return isControlLetter(ch) || ch === 0x5F /* _ */
  }

  // UnicodePropertyValue ::
  //   UnicodePropertyValueCharacters
  pp$1.regexp_eatUnicodePropertyValue = function(state) {
    var ch = 0;
    state.lastStringValue = "";
    while (isUnicodePropertyValueCharacter(ch = state.current())) {
      state.lastStringValue += codePointToString(ch);
      state.advance();
    }
    return state.lastStringValue !== ""
  };
  function isUnicodePropertyValueCharacter(ch) {
    return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch)
  }

  // LoneUnicodePropertyNameOrValue ::
  //   UnicodePropertyValueCharacters
  pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
    return this.regexp_eatUnicodePropertyValue(state)
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
  pp$1.regexp_eatCharacterClass = function(state) {
    if (state.eat(0x5B /* [ */)) {
      var negate = state.eat(0x5E /* ^ */);
      var result = this.regexp_classContents(state);
      if (!state.eat(0x5D /* ] */))
        { state.raise("Unterminated character class"); }
      if (negate && result === CharSetString)
        { state.raise("Negated character class may contain strings"); }
      return true
    }
    return false
  };

  // https://tc39.es/ecma262/#prod-ClassContents
  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
  pp$1.regexp_classContents = function(state) {
    if (state.current() === 0x5D /* ] */) { return CharSetOk }
    if (state.switchV) { return this.regexp_classSetExpression(state) }
    this.regexp_nonEmptyClassRanges(state);
    return CharSetOk
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
  // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
  pp$1.regexp_nonEmptyClassRanges = function(state) {
    while (this.regexp_eatClassAtom(state)) {
      var left = state.lastIntValue;
      if (state.eat(0x2D /* - */) && this.regexp_eatClassAtom(state)) {
        var right = state.lastIntValue;
        if (state.switchU && (left === -1 || right === -1)) {
          state.raise("Invalid character class");
        }
        if (left !== -1 && right !== -1 && left > right) {
          state.raise("Range out of order in character class");
        }
      }
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
  pp$1.regexp_eatClassAtom = function(state) {
    var start = state.pos;

    if (state.eat(0x5C /* \ */)) {
      if (this.regexp_eatClassEscape(state)) {
        return true
      }
      if (state.switchU) {
        // Make the same message as V8.
        var ch$1 = state.current();
        if (ch$1 === 0x63 /* c */ || isOctalDigit(ch$1)) {
          state.raise("Invalid class escape");
        }
        state.raise("Invalid escape");
      }
      state.pos = start;
    }

    var ch = state.current();
    if (ch !== 0x5D /* ] */) {
      state.lastIntValue = ch;
      state.advance();
      return true
    }

    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassEscape
  pp$1.regexp_eatClassEscape = function(state) {
    var start = state.pos;

    if (state.eat(0x62 /* b */)) {
      state.lastIntValue = 0x08; /* <BS> */
      return true
    }

    if (state.switchU && state.eat(0x2D /* - */)) {
      state.lastIntValue = 0x2D; /* - */
      return true
    }

    if (!state.switchU && state.eat(0x63 /* c */)) {
      if (this.regexp_eatClassControlLetter(state)) {
        return true
      }
      state.pos = start;
    }

    return (
      this.regexp_eatCharacterClassEscape(state) ||
      this.regexp_eatCharacterEscape(state)
    )
  };

  // https://tc39.es/ecma262/#prod-ClassSetExpression
  // https://tc39.es/ecma262/#prod-ClassUnion
  // https://tc39.es/ecma262/#prod-ClassIntersection
  // https://tc39.es/ecma262/#prod-ClassSubtraction
  pp$1.regexp_classSetExpression = function(state) {
    var result = CharSetOk, subResult;
    if (this.regexp_eatClassSetRange(state)) ; else if (subResult = this.regexp_eatClassSetOperand(state)) {
      if (subResult === CharSetString) { result = CharSetString; }
      // https://tc39.es/ecma262/#prod-ClassIntersection
      var start = state.pos;
      while (state.eatChars([0x26, 0x26] /* && */)) {
        if (
          state.current() !== 0x26 /* & */ &&
          (subResult = this.regexp_eatClassSetOperand(state))
        ) {
          if (subResult !== CharSetString) { result = CharSetOk; }
          continue
        }
        state.raise("Invalid character in character class");
      }
      if (start !== state.pos) { return result }
      // https://tc39.es/ecma262/#prod-ClassSubtraction
      while (state.eatChars([0x2D, 0x2D] /* -- */)) {
        if (this.regexp_eatClassSetOperand(state)) { continue }
        state.raise("Invalid character in character class");
      }
      if (start !== state.pos) { return result }
    } else {
      state.raise("Invalid character in character class");
    }
    // https://tc39.es/ecma262/#prod-ClassUnion
    for (;;) {
      if (this.regexp_eatClassSetRange(state)) { continue }
      subResult = this.regexp_eatClassSetOperand(state);
      if (!subResult) { return result }
      if (subResult === CharSetString) { result = CharSetString; }
    }
  };

  // https://tc39.es/ecma262/#prod-ClassSetRange
  pp$1.regexp_eatClassSetRange = function(state) {
    var start = state.pos;
    if (this.regexp_eatClassSetCharacter(state)) {
      var left = state.lastIntValue;
      if (state.eat(0x2D /* - */) && this.regexp_eatClassSetCharacter(state)) {
        var right = state.lastIntValue;
        if (left !== -1 && right !== -1 && left > right) {
          state.raise("Range out of order in character class");
        }
        return true
      }
      state.pos = start;
    }
    return false
  };

  // https://tc39.es/ecma262/#prod-ClassSetOperand
  pp$1.regexp_eatClassSetOperand = function(state) {
    if (this.regexp_eatClassSetCharacter(state)) { return CharSetOk }
    return this.regexp_eatClassStringDisjunction(state) || this.regexp_eatNestedClass(state)
  };

  // https://tc39.es/ecma262/#prod-NestedClass
  pp$1.regexp_eatNestedClass = function(state) {
    var start = state.pos;
    if (state.eat(0x5B /* [ */)) {
      var negate = state.eat(0x5E /* ^ */);
      var result = this.regexp_classContents(state);
      if (state.eat(0x5D /* ] */)) {
        if (negate && result === CharSetString) {
          state.raise("Negated character class may contain strings");
        }
        return result
      }
      state.pos = start;
    }
    if (state.eat(0x5C /* \ */)) {
      var result$1 = this.regexp_eatCharacterClassEscape(state);
      if (result$1) {
        return result$1
      }
      state.pos = start;
    }
    return null
  };

  // https://tc39.es/ecma262/#prod-ClassStringDisjunction
  pp$1.regexp_eatClassStringDisjunction = function(state) {
    var start = state.pos;
    if (state.eatChars([0x5C, 0x71] /* \q */)) {
      if (state.eat(0x7B /* { */)) {
        var result = this.regexp_classStringDisjunctionContents(state);
        if (state.eat(0x7D /* } */)) {
          return result
        }
      } else {
        // Make the same message as V8.
        state.raise("Invalid escape");
      }
      state.pos = start;
    }
    return null
  };

  // https://tc39.es/ecma262/#prod-ClassStringDisjunctionContents
  pp$1.regexp_classStringDisjunctionContents = function(state) {
    var result = this.regexp_classString(state);
    while (state.eat(0x7C /* | */)) {
      if (this.regexp_classString(state) === CharSetString) { result = CharSetString; }
    }
    return result
  };

  // https://tc39.es/ecma262/#prod-ClassString
  // https://tc39.es/ecma262/#prod-NonEmptyClassString
  pp$1.regexp_classString = function(state) {
    var count = 0;
    while (this.regexp_eatClassSetCharacter(state)) { count++; }
    return count === 1 ? CharSetOk : CharSetString
  };

  // https://tc39.es/ecma262/#prod-ClassSetCharacter
  pp$1.regexp_eatClassSetCharacter = function(state) {
    var start = state.pos;
    if (state.eat(0x5C /* \ */)) {
      if (
        this.regexp_eatCharacterEscape(state) ||
        this.regexp_eatClassSetReservedPunctuator(state)
      ) {
        return true
      }
      if (state.eat(0x62 /* b */)) {
        state.lastIntValue = 0x08; /* <BS> */
        return true
      }
      state.pos = start;
      return false
    }
    var ch = state.current();
    if (ch < 0 || ch === state.lookahead() && isClassSetReservedDoublePunctuatorCharacter(ch)) { return false }
    if (isClassSetSyntaxCharacter(ch)) { return false }
    state.advance();
    state.lastIntValue = ch;
    return true
  };

  // https://tc39.es/ecma262/#prod-ClassSetReservedDoublePunctuator
  function isClassSetReservedDoublePunctuatorCharacter(ch) {
    return (
      ch === 0x21 /* ! */ ||
      ch >= 0x23 /* # */ && ch <= 0x26 /* & */ ||
      ch >= 0x2A /* * */ && ch <= 0x2C /* , */ ||
      ch === 0x2E /* . */ ||
      ch >= 0x3A /* : */ && ch <= 0x40 /* @ */ ||
      ch === 0x5E /* ^ */ ||
      ch === 0x60 /* ` */ ||
      ch === 0x7E /* ~ */
    )
  }

  // https://tc39.es/ecma262/#prod-ClassSetSyntaxCharacter
  function isClassSetSyntaxCharacter(ch) {
    return (
      ch === 0x28 /* ( */ ||
      ch === 0x29 /* ) */ ||
      ch === 0x2D /* - */ ||
      ch === 0x2F /* / */ ||
      ch >= 0x5B /* [ */ && ch <= 0x5D /* ] */ ||
      ch >= 0x7B /* { */ && ch <= 0x7D /* } */
    )
  }

  // https://tc39.es/ecma262/#prod-ClassSetReservedPunctuator
  pp$1.regexp_eatClassSetReservedPunctuator = function(state) {
    var ch = state.current();
    if (isClassSetReservedPunctuator(ch)) {
      state.lastIntValue = ch;
      state.advance();
      return true
    }
    return false
  };

  // https://tc39.es/ecma262/#prod-ClassSetReservedPunctuator
  function isClassSetReservedPunctuator(ch) {
    return (
      ch === 0x21 /* ! */ ||
      ch === 0x23 /* # */ ||
      ch === 0x25 /* % */ ||
      ch === 0x26 /* & */ ||
      ch === 0x2C /* , */ ||
      ch === 0x2D /* - */ ||
      ch >= 0x3A /* : */ && ch <= 0x3E /* > */ ||
      ch === 0x40 /* @ */ ||
      ch === 0x60 /* ` */ ||
      ch === 0x7E /* ~ */
    )
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassControlLetter
  pp$1.regexp_eatClassControlLetter = function(state) {
    var ch = state.current();
    if (isDecimalDigit(ch) || ch === 0x5F /* _ */) {
      state.lastIntValue = ch % 0x20;
      state.advance();
      return true
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
  pp$1.regexp_eatHexEscapeSequence = function(state) {
    var start = state.pos;
    if (state.eat(0x78 /* x */)) {
      if (this.regexp_eatFixedHexDigits(state, 2)) {
        return true
      }
      if (state.switchU) {
        state.raise("Invalid escape");
      }
      state.pos = start;
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
  pp$1.regexp_eatDecimalDigits = function(state) {
    var start = state.pos;
    var ch = 0;
    state.lastIntValue = 0;
    while (isDecimalDigit(ch = state.current())) {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
      state.advance();
    }
    return state.pos !== start
  };
  function isDecimalDigit(ch) {
    return ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
  pp$1.regexp_eatHexDigits = function(state) {
    var start = state.pos;
    var ch = 0;
    state.lastIntValue = 0;
    while (isHexDigit(ch = state.current())) {
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
      state.advance();
    }
    return state.pos !== start
  };
  function isHexDigit(ch) {
    return (
      (ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */) ||
      (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) ||
      (ch >= 0x61 /* a */ && ch <= 0x66 /* f */)
    )
  }
  function hexToInt(ch) {
    if (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) {
      return 10 + (ch - 0x41 /* A */)
    }
    if (ch >= 0x61 /* a */ && ch <= 0x66 /* f */) {
      return 10 + (ch - 0x61 /* a */)
    }
    return ch - 0x30 /* 0 */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-LegacyOctalEscapeSequence
  // Allows only 0-377(octal) i.e. 0-255(decimal).
  pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
    if (this.regexp_eatOctalDigit(state)) {
      var n1 = state.lastIntValue;
      if (this.regexp_eatOctalDigit(state)) {
        var n2 = state.lastIntValue;
        if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
          state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
        } else {
          state.lastIntValue = n1 * 8 + n2;
        }
      } else {
        state.lastIntValue = n1;
      }
      return true
    }
    return false
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
  pp$1.regexp_eatOctalDigit = function(state) {
    var ch = state.current();
    if (isOctalDigit(ch)) {
      state.lastIntValue = ch - 0x30; /* 0 */
      state.advance();
      return true
    }
    state.lastIntValue = 0;
    return false
  };
  function isOctalDigit(ch) {
    return ch >= 0x30 /* 0 */ && ch <= 0x37 /* 7 */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
  // And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
  pp$1.regexp_eatFixedHexDigits = function(state, length) {
    var start = state.pos;
    state.lastIntValue = 0;
    for (var i = 0; i < length; ++i) {
      var ch = state.current();
      if (!isHexDigit(ch)) {
        state.pos = start;
        return false
      }
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
      state.advance();
    }
    return true
  };

  // Object type used to represent tokens. Note that normally, tokens
  // simply exist as properties on the parser object. This is only
  // used for the onToken callback and the external tokenizer.

  var Token = function Token(p) {
    this.type = p.type;
    this.value = p.value;
    this.start = p.start;
    this.end = p.end;
    if (p.options.locations)
      { this.loc = new SourceLocation(p, p.startLoc, p.endLoc); }
    if (p.options.ranges)
      { this.range = [p.start, p.end]; }
  };

  // ## Tokenizer

  var pp = Parser.prototype;

  // Move to the next token

  pp.next = function(ignoreEscapeSequenceInKeyword) {
    if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc)
      { this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword); }
    if (this.options.onToken)
      { this.options.onToken(new Token(this)); }

    this.lastTokEnd = this.end;
    this.lastTokStart = this.start;
    this.lastTokEndLoc = this.endLoc;
    this.lastTokStartLoc = this.startLoc;
    this.nextToken();
  };

  pp.getToken = function() {
    this.next();
    return new Token(this)
  };

  // If we're in an ES6 environment, make parsers iterable
  if (typeof Symbol !== "undefined")
    { pp[Symbol.iterator] = function() {
      var this$1$1 = this;

      return {
        next: function () {
          var token = this$1$1.getToken();
          return {
            done: token.type === types$1.eof,
            value: token
          }
        }
      }
    }; }

  // Toggle strict mode. Re-reads the next number or string to please
  // pedantic tests (`"use strict"; 010;` should fail).

  // Read a single token, updating the parser object's token-related
  // properties.

  pp.nextToken = function() {
    var curContext = this.curContext();
    if (!curContext || !curContext.preserveSpace) { this.skipSpace(); }

    this.start = this.pos;
    if (this.options.locations) { this.startLoc = this.curPosition(); }
    if (this.pos >= this.input.length) { return this.finishToken(types$1.eof) }

    if (curContext.override) { return curContext.override(this) }
    else { this.readToken(this.fullCharCodeAtPos()); }
  };

  pp.readToken = function(code) {
    // Identifier or keyword. '\uXXXX' sequences are allowed in
    // identifiers, so '\' also dispatches to that.
    if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */)
      { return this.readWord() }

    return this.getTokenFromCode(code)
  };

  pp.fullCharCodeAtPos = function() {
    var code = this.input.charCodeAt(this.pos);
    if (code <= 0xd7ff || code >= 0xdc00) { return code }
    var next = this.input.charCodeAt(this.pos + 1);
    return next <= 0xdbff || next >= 0xe000 ? code : (code << 10) + next - 0x35fdc00
  };

  pp.skipBlockComment = function() {
    var startLoc = this.options.onComment && this.curPosition();
    var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
    if (end === -1) { this.raise(this.pos - 2, "Unterminated comment"); }
    this.pos = end + 2;
    if (this.options.locations) {
      for (var nextBreak = (void 0), pos = start; (nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1;) {
        ++this.curLine;
        pos = this.lineStart = nextBreak;
      }
    }
    if (this.options.onComment)
      { this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos,
                             startLoc, this.curPosition()); }
  };

  pp.skipLineComment = function(startSkip) {
    var start = this.pos;
    var startLoc = this.options.onComment && this.curPosition();
    var ch = this.input.charCodeAt(this.pos += startSkip);
    while (this.pos < this.input.length && !isNewLine(ch)) {
      ch = this.input.charCodeAt(++this.pos);
    }
    if (this.options.onComment)
      { this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos,
                             startLoc, this.curPosition()); }
  };

  // Called at the start of the parse and after every token. Skips
  // whitespace and comments, and.

  pp.skipSpace = function() {
    loop: while (this.pos < this.input.length) {
      var ch = this.input.charCodeAt(this.pos);
      switch (ch) {
      case 32: case 160: // ' '
        ++this.pos;
        break
      case 13:
        if (this.input.charCodeAt(this.pos + 1) === 10) {
          ++this.pos;
        }
      case 10: case 8232: case 8233:
        ++this.pos;
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        break
      case 47: // '/'
        switch (this.input.charCodeAt(this.pos + 1)) {
        case 42: // '*'
          this.skipBlockComment();
          break
        case 47:
          this.skipLineComment(2);
          break
        default:
          break loop
        }
        break
      default:
        if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
          ++this.pos;
        } else {
          break loop
        }
      }
    }
  };

  // Called at the end of every token. Sets `end`, `val`, and
  // maintains `context` and `exprAllowed`, and skips the space after
  // the token, so that the next one's `start` will point at the
  // right position.

  pp.finishToken = function(type, val) {
    this.end = this.pos;
    if (this.options.locations) { this.endLoc = this.curPosition(); }
    var prevType = this.type;
    this.type = type;
    this.value = val;

    this.updateContext(prevType);
  };

  // ### Token reading

  // This is the function that is called to fetch the next token. It
  // is somewhat obscure, because it works in character codes rather
  // than characters, and because operator parsing has been inlined
  // into it.
  //
  // All in the name of speed.
  //
  pp.readToken_dot = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next >= 48 && next <= 57) { return this.readNumber(true) }
    var next2 = this.input.charCodeAt(this.pos + 2);
    if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
      this.pos += 3;
      return this.finishToken(types$1.ellipsis)
    } else {
      ++this.pos;
      return this.finishToken(types$1.dot)
    }
  };

  pp.readToken_slash = function() { // '/'
    var next = this.input.charCodeAt(this.pos + 1);
    if (this.exprAllowed) { ++this.pos; return this.readRegexp() }
    if (next === 61) { return this.finishOp(types$1.assign, 2) }
    return this.finishOp(types$1.slash, 1)
  };

  pp.readToken_mult_modulo_exp = function(code) { // '%*'
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    var tokentype = code === 42 ? types$1.star : types$1.modulo;

    // exponentiation operator ** and **=
    if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
      ++size;
      tokentype = types$1.starstar;
      next = this.input.charCodeAt(this.pos + 2);
    }

    if (next === 61) { return this.finishOp(types$1.assign, size + 1) }
    return this.finishOp(tokentype, size)
  };

  pp.readToken_pipe_amp = function(code) { // '|&'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (this.options.ecmaVersion >= 12) {
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (next2 === 61) { return this.finishOp(types$1.assign, 3) }
      }
      return this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2)
    }
    if (next === 61) { return this.finishOp(types$1.assign, 2) }
    return this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1)
  };

  pp.readToken_caret = function() { // '^'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) { return this.finishOp(types$1.assign, 2) }
    return this.finishOp(types$1.bitwiseXOR, 1)
  };

  pp.readToken_plus_min = function(code) { // '+-'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 &&
          (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
        // A `-->` line comment
        this.skipLineComment(3);
        this.skipSpace();
        return this.nextToken()
      }
      return this.finishOp(types$1.incDec, 2)
    }
    if (next === 61) { return this.finishOp(types$1.assign, 2) }
    return this.finishOp(types$1.plusMin, 1)
  };

  pp.readToken_lt_gt = function(code) { // '<>'
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    if (next === code) {
      size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
      if (this.input.charCodeAt(this.pos + size) === 61) { return this.finishOp(types$1.assign, size + 1) }
      return this.finishOp(types$1.bitShift, size)
    }
    if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 &&
        this.input.charCodeAt(this.pos + 3) === 45) {
      // `<!--`, an XML-style comment that should be interpreted as a line comment
      this.skipLineComment(4);
      this.skipSpace();
      return this.nextToken()
    }
    if (next === 61) { size = 2; }
    return this.finishOp(types$1.relational, size)
  };

  pp.readToken_eq_excl = function(code) { // '=!'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) { return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) }
    if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) { // '=>'
      this.pos += 2;
      return this.finishToken(types$1.arrow)
    }
    return this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1)
  };

  pp.readToken_question = function() { // '?'
    var ecmaVersion = this.options.ecmaVersion;
    if (ecmaVersion >= 11) {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 46) {
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (next2 < 48 || next2 > 57) { return this.finishOp(types$1.questionDot, 2) }
      }
      if (next === 63) {
        if (ecmaVersion >= 12) {
          var next2$1 = this.input.charCodeAt(this.pos + 2);
          if (next2$1 === 61) { return this.finishOp(types$1.assign, 3) }
        }
        return this.finishOp(types$1.coalesce, 2)
      }
    }
    return this.finishOp(types$1.question, 1)
  };

  pp.readToken_numberSign = function() { // '#'
    var ecmaVersion = this.options.ecmaVersion;
    var code = 35; // '#'
    if (ecmaVersion >= 13) {
      ++this.pos;
      code = this.fullCharCodeAtPos();
      if (isIdentifierStart(code, true) || code === 92 /* '\' */) {
        return this.finishToken(types$1.privateId, this.readWord1())
      }
    }

    this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
  };

  pp.getTokenFromCode = function(code) {
    switch (code) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
    case 46: // '.'
      return this.readToken_dot()

    // Punctuation tokens.
    case 40: ++this.pos; return this.finishToken(types$1.parenL)
    case 41: ++this.pos; return this.finishToken(types$1.parenR)
    case 59: ++this.pos; return this.finishToken(types$1.semi)
    case 44: ++this.pos; return this.finishToken(types$1.comma)
    case 91: ++this.pos; return this.finishToken(types$1.bracketL)
    case 93: ++this.pos; return this.finishToken(types$1.bracketR)
    case 123: ++this.pos; return this.finishToken(types$1.braceL)
    case 125: ++this.pos; return this.finishToken(types$1.braceR)
    case 58: ++this.pos; return this.finishToken(types$1.colon)

    case 96: // '`'
      if (this.options.ecmaVersion < 6) { break }
      ++this.pos;
      return this.finishToken(types$1.backQuote)

    case 48: // '0'
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 120 || next === 88) { return this.readRadixNumber(16) } // '0x', '0X' - hex number
      if (this.options.ecmaVersion >= 6) {
        if (next === 111 || next === 79) { return this.readRadixNumber(8) } // '0o', '0O' - octal number
        if (next === 98 || next === 66) { return this.readRadixNumber(2) } // '0b', '0B' - binary number
      }

    // Anything else beginning with a digit is an integer, octal
    // number, or float.
    case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
      return this.readNumber(false)

    // Quotes produce strings.
    case 34: case 39: // '"', "'"
      return this.readString(code)

    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.
    case 47: // '/'
      return this.readToken_slash()

    case 37: case 42: // '%*'
      return this.readToken_mult_modulo_exp(code)

    case 124: case 38: // '|&'
      return this.readToken_pipe_amp(code)

    case 94: // '^'
      return this.readToken_caret()

    case 43: case 45: // '+-'
      return this.readToken_plus_min(code)

    case 60: case 62: // '<>'
      return this.readToken_lt_gt(code)

    case 61: case 33: // '=!'
      return this.readToken_eq_excl(code)

    case 63: // '?'
      return this.readToken_question()

    case 126: // '~'
      return this.finishOp(types$1.prefix, 1)

    case 35: // '#'
      return this.readToken_numberSign()
    }

    this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
  };

  pp.finishOp = function(type, size) {
    var str = this.input.slice(this.pos, this.pos + size);
    this.pos += size;
    return this.finishToken(type, str)
  };

  pp.readRegexp = function() {
    var escaped, inClass, start = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) { this.raise(start, "Unterminated regular expression"); }
      var ch = this.input.charAt(this.pos);
      if (lineBreak.test(ch)) { this.raise(start, "Unterminated regular expression"); }
      if (!escaped) {
        if (ch === "[") { inClass = true; }
        else if (ch === "]" && inClass) { inClass = false; }
        else if (ch === "/" && !inClass) { break }
        escaped = ch === "\\";
      } else { escaped = false; }
      ++this.pos;
    }
    var pattern = this.input.slice(start, this.pos);
    ++this.pos;
    var flagsStart = this.pos;
    var flags = this.readWord1();
    if (this.containsEsc) { this.unexpected(flagsStart); }

    // Validate pattern
    var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
    state.reset(start, pattern, flags);
    this.validateRegExpFlags(state);
    this.validateRegExpPattern(state);

    // Create Literal#value property value.
    var value = null;
    try {
      value = new RegExp(pattern, flags);
    } catch (e) {
      // ESTree requires null if it failed to instantiate RegExp object.
      // https://github.com/estree/estree/blob/a27003adf4fd7bfad44de9cef372a2eacd527b1c/es5.md#regexpliteral
    }

    return this.finishToken(types$1.regexp, {pattern: pattern, flags: flags, value: value})
  };

  // Read an integer in the given radix. Return null if zero digits
  // were read, the integer value otherwise. When `len` is given, this
  // will return `null` unless the integer has exactly `len` digits.

  pp.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
    // `len` is used for character escape sequences. In that case, disallow separators.
    var allowSeparators = this.options.ecmaVersion >= 12 && len === undefined;

    // `maybeLegacyOctalNumericLiteral` is true if it doesn't have prefix (0x,0o,0b)
    // and isn't fraction part nor exponent part. In that case, if the first digit
    // is zero then disallow separators.
    var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;

    var start = this.pos, total = 0, lastCode = 0;
    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i, ++this.pos) {
      var code = this.input.charCodeAt(this.pos), val = (void 0);

      if (allowSeparators && code === 95) {
        if (isLegacyOctalNumericLiteral) { this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"); }
        if (lastCode === 95) { this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"); }
        if (i === 0) { this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"); }
        lastCode = code;
        continue
      }

      if (code >= 97) { val = code - 97 + 10; } // a
      else if (code >= 65) { val = code - 65 + 10; } // A
      else if (code >= 48 && code <= 57) { val = code - 48; } // 0-9
      else { val = Infinity; }
      if (val >= radix) { break }
      lastCode = code;
      total = total * radix + val;
    }

    if (allowSeparators && lastCode === 95) { this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"); }
    if (this.pos === start || len != null && this.pos - start !== len) { return null }

    return total
  };

  function stringToNumber(str, isLegacyOctalNumericLiteral) {
    if (isLegacyOctalNumericLiteral) {
      return parseInt(str, 8)
    }

    // `parseFloat(value)` stops parsing at the first numeric separator then returns a wrong value.
    return parseFloat(str.replace(/_/g, ""))
  }

  function stringToBigInt(str) {
    if (typeof BigInt !== "function") {
      return null
    }

    // `BigInt(value)` throws syntax error if the string contains numeric separators.
    return BigInt(str.replace(/_/g, ""))
  }

  pp.readRadixNumber = function(radix) {
    var start = this.pos;
    this.pos += 2; // 0x
    var val = this.readInt(radix);
    if (val == null) { this.raise(this.start + 2, "Expected number in radix " + radix); }
    if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
      val = stringToBigInt(this.input.slice(start, this.pos));
      ++this.pos;
    } else if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }
    return this.finishToken(types$1.num, val)
  };

  // Read an integer, octal integer, or floating-point number.

  pp.readNumber = function(startsWithDot) {
    var start = this.pos;
    if (!startsWithDot && this.readInt(10, undefined, true) === null) { this.raise(start, "Invalid number"); }
    var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
    if (octal && this.strict) { this.raise(start, "Invalid number"); }
    var next = this.input.charCodeAt(this.pos);
    if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
      var val$1 = stringToBigInt(this.input.slice(start, this.pos));
      ++this.pos;
      if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }
      return this.finishToken(types$1.num, val$1)
    }
    if (octal && /[89]/.test(this.input.slice(start, this.pos))) { octal = false; }
    if (next === 46 && !octal) { // '.'
      ++this.pos;
      this.readInt(10);
      next = this.input.charCodeAt(this.pos);
    }
    if ((next === 69 || next === 101) && !octal) { // 'eE'
      next = this.input.charCodeAt(++this.pos);
      if (next === 43 || next === 45) { ++this.pos; } // '+-'
      if (this.readInt(10) === null) { this.raise(start, "Invalid number"); }
    }
    if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }

    var val = stringToNumber(this.input.slice(start, this.pos), octal);
    return this.finishToken(types$1.num, val)
  };

  // Read a string value, interpreting backslash-escapes.

  pp.readCodePoint = function() {
    var ch = this.input.charCodeAt(this.pos), code;

    if (ch === 123) { // '{'
      if (this.options.ecmaVersion < 6) { this.unexpected(); }
      var codePos = ++this.pos;
      code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
      ++this.pos;
      if (code > 0x10FFFF) { this.invalidStringToken(codePos, "Code point out of bounds"); }
    } else {
      code = this.readHexChar(4);
    }
    return code
  };

  pp.readString = function(quote) {
    var out = "", chunkStart = ++this.pos;
    for (;;) {
      if (this.pos >= this.input.length) { this.raise(this.start, "Unterminated string constant"); }
      var ch = this.input.charCodeAt(this.pos);
      if (ch === quote) { break }
      if (ch === 92) { // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(false);
        chunkStart = this.pos;
      } else if (ch === 0x2028 || ch === 0x2029) {
        if (this.options.ecmaVersion < 10) { this.raise(this.start, "Unterminated string constant"); }
        ++this.pos;
        if (this.options.locations) {
          this.curLine++;
          this.lineStart = this.pos;
        }
      } else {
        if (isNewLine(ch)) { this.raise(this.start, "Unterminated string constant"); }
        ++this.pos;
      }
    }
    out += this.input.slice(chunkStart, this.pos++);
    return this.finishToken(types$1.string, out)
  };

  // Reads template string tokens.

  var INVALID_TEMPLATE_ESCAPE_ERROR = {};

  pp.tryReadTemplateToken = function() {
    this.inTemplateElement = true;
    try {
      this.readTmplToken();
    } catch (err) {
      if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
        this.readInvalidTemplateToken();
      } else {
        throw err
      }
    }

    this.inTemplateElement = false;
  };

  pp.invalidStringToken = function(position, message) {
    if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
      throw INVALID_TEMPLATE_ESCAPE_ERROR
    } else {
      this.raise(position, message);
    }
  };

  pp.readTmplToken = function() {
    var out = "", chunkStart = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) { this.raise(this.start, "Unterminated template"); }
      var ch = this.input.charCodeAt(this.pos);
      if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) { // '`', '${'
        if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate)) {
          if (ch === 36) {
            this.pos += 2;
            return this.finishToken(types$1.dollarBraceL)
          } else {
            ++this.pos;
            return this.finishToken(types$1.backQuote)
          }
        }
        out += this.input.slice(chunkStart, this.pos);
        return this.finishToken(types$1.template, out)
      }
      if (ch === 92) { // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(true);
        chunkStart = this.pos;
      } else if (isNewLine(ch)) {
        out += this.input.slice(chunkStart, this.pos);
        ++this.pos;
        switch (ch) {
        case 13:
          if (this.input.charCodeAt(this.pos) === 10) { ++this.pos; }
        case 10:
          out += "\n";
          break
        default:
          out += String.fromCharCode(ch);
          break
        }
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        chunkStart = this.pos;
      } else {
        ++this.pos;
      }
    }
  };

  // Reads a template token to search for the end, without validating any escape sequences
  pp.readInvalidTemplateToken = function() {
    for (; this.pos < this.input.length; this.pos++) {
      switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break

      case "$":
        if (this.input[this.pos + 1] !== "{") { break }
        // fall through
      case "`":
        return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos))

      case "\r":
        if (this.input[this.pos + 1] === "\n") { ++this.pos; }
        // fall through
      case "\n": case "\u2028": case "\u2029":
        ++this.curLine;
        this.lineStart = this.pos + 1;
        break
      }
    }
    this.raise(this.start, "Unterminated template");
  };

  // Used to read escaped characters

  pp.readEscapedChar = function(inTemplate) {
    var ch = this.input.charCodeAt(++this.pos);
    ++this.pos;
    switch (ch) {
    case 110: return "\n" // 'n' -> '\n'
    case 114: return "\r" // 'r' -> '\r'
    case 120: return String.fromCharCode(this.readHexChar(2)) // 'x'
    case 117: return codePointToString(this.readCodePoint()) // 'u'
    case 116: return "\t" // 't' -> '\t'
    case 98: return "\b" // 'b' -> '\b'
    case 118: return "\u000b" // 'v' -> '\u000b'
    case 102: return "\f" // 'f' -> '\f'
    case 13: if (this.input.charCodeAt(this.pos) === 10) { ++this.pos; } // '\r\n'
    case 10: // ' \n'
      if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
      return ""
    case 56:
    case 57:
      if (this.strict) {
        this.invalidStringToken(
          this.pos - 1,
          "Invalid escape sequence"
        );
      }
      if (inTemplate) {
        var codePos = this.pos - 1;

        this.invalidStringToken(
          codePos,
          "Invalid escape sequence in template string"
        );
      }
    default:
      if (ch >= 48 && ch <= 55) {
        var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
        var octal = parseInt(octalStr, 8);
        if (octal > 255) {
          octalStr = octalStr.slice(0, -1);
          octal = parseInt(octalStr, 8);
        }
        this.pos += octalStr.length - 1;
        ch = this.input.charCodeAt(this.pos);
        if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
          this.invalidStringToken(
            this.pos - 1 - octalStr.length,
            inTemplate
              ? "Octal literal in template string"
              : "Octal literal in strict mode"
          );
        }
        return String.fromCharCode(octal)
      }
      if (isNewLine(ch)) {
        // Unicode new line characters after \ get removed from output in both
        // template literals and strings
        if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
        return ""
      }
      return String.fromCharCode(ch)
    }
  };

  // Used to read character escape sequences ('\x', '\u', '\U').

  pp.readHexChar = function(len) {
    var codePos = this.pos;
    var n = this.readInt(16, len);
    if (n === null) { this.invalidStringToken(codePos, "Bad character escape sequence"); }
    return n
  };

  // Read an identifier, and return it as a string. Sets `this.containsEsc`
  // to whether the word contained a '\u' escape.
  //
  // Incrementally adds only escaped chars, adding other chunks as-is
  // as a micro-optimization.

  pp.readWord1 = function() {
    this.containsEsc = false;
    var word = "", first = true, chunkStart = this.pos;
    var astral = this.options.ecmaVersion >= 6;
    while (this.pos < this.input.length) {
      var ch = this.fullCharCodeAtPos();
      if (isIdentifierChar(ch, astral)) {
        this.pos += ch <= 0xffff ? 1 : 2;
      } else if (ch === 92) { // "\"
        this.containsEsc = true;
        word += this.input.slice(chunkStart, this.pos);
        var escStart = this.pos;
        if (this.input.charCodeAt(++this.pos) !== 117) // "u"
          { this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"); }
        ++this.pos;
        var esc = this.readCodePoint();
        if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral))
          { this.invalidStringToken(escStart, "Invalid Unicode escape"); }
        word += codePointToString(esc);
        chunkStart = this.pos;
      } else {
        break
      }
      first = false;
    }
    return word + this.input.slice(chunkStart, this.pos)
  };

  // Read an identifier or keyword token. Will check for reserved
  // words when necessary.

  pp.readWord = function() {
    var word = this.readWord1();
    var type = types$1.name;
    if (this.keywords.test(word)) {
      type = keywords[word];
    }
    return this.finishToken(type, word)
  };

  // Acorn is a tiny, fast JavaScript parser written in JavaScript.
  //
  // Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
  // various contributors and released under an MIT license.
  //
  // Git repositories for Acorn are available at
  //
  //     http://marijnhaverbeke.nl/git/acorn
  //     https://github.com/acornjs/acorn.git
  //
  // Please use the [github bug tracker][ghbt] to report issues.
  //
  // [ghbt]: https://github.com/acornjs/acorn/issues


  var version = "8.15.0";

  Parser.acorn = {
    Parser: Parser,
    version: version,
    defaultOptions: defaultOptions,
    Position: Position,
    SourceLocation: SourceLocation,
    getLineInfo: getLineInfo,
    Node: Node,
    TokenType: TokenType,
    tokTypes: types$1,
    keywordTypes: keywords,
    TokContext: TokContext,
    tokContexts: types,
    isIdentifierChar: isIdentifierChar,
    isIdentifierStart: isIdentifierStart,
    Token: Token,
    isNewLine: isNewLine,
    lineBreak: lineBreak,
    lineBreakG: lineBreakG,
    nonASCIIwhitespace: nonASCIIwhitespace
  };

  // The main exported interface (under `self.acorn` when in the
  // browser) is a `parse` function that takes a code string and returns
  // an abstract syntax tree as specified by the [ESTree spec][estree].
  //
  // [estree]: https://github.com/estree/estree

  function parse(input, options) {
    return Parser.parse(input, options)
  }

  // This function tries to parse a single expression at a given
  // offset in a string. Useful for parsing mixed-language formats
  // that embed JavaScript expressions.

  function parseExpressionAt(input, pos, options) {
    return Parser.parseExpressionAt(input, pos, options)
  }

  // Acorn is organized as a tokenizer and a recursive-descent parser.
  // The `tokenizer` export provides an interface to the tokenizer.

  function tokenizer(input, options) {
    return Parser.tokenizer(input, options)
  }

  exports.Node = Node;
  exports.Parser = Parser;
  exports.Position = Position;
  exports.SourceLocation = SourceLocation;
  exports.TokContext = TokContext;
  exports.Token = Token;
  exports.TokenType = TokenType;
  exports.defaultOptions = defaultOptions;
  exports.getLineInfo = getLineInfo;
  exports.isIdentifierChar = isIdentifierChar;
  exports.isIdentifierStart = isIdentifierStart;
  exports.isNewLine = isNewLine;
  exports.keywordTypes = keywords;
  exports.lineBreak = lineBreak;
  exports.lineBreakG = lineBreakG;
  exports.nonASCIIwhitespace = nonASCIIwhitespace;
  exports.parse = parse;
  exports.parseExpressionAt = parseExpressionAt;
  exports.tokContexts = types;
  exports.tokTypes = types$1;
  exports.tokenizer = tokenizer;
  exports.version = version;

}));

return module.exports;})();
function validateSDKCalls(js){
 if(!/VIE\s*(?:\.|\[)/.test(js))return;
 let tree;try{tree=VIEAcorn.parse(js,{ecmaVersion:'latest',sourceType:'script'});}catch{return;}// Native Script remains the syntax authority.
 const member=n=>n?.type==='MemberExpression'?(n.computed?n.property.type==='Literal'?String(n.property.value):null:n.property.name):null;
 const key=p=>p.type==='Property'&&!p.computed?(p.key.type==='Identifier'?p.key.name:p.key.type==='Literal'?String(p.key.value):null):null;
 const unknown=Symbol('dynamic');
 const literal=n=>{if(!n)return unknown;if(n.type==='Literal'&&!n.regex&&typeof n.value!=='bigint')return n.value;if(n.type==='UnaryExpression'&&['-','+'].includes(n.operator)){const v=literal(n.argument);return typeof v==='number'?(n.operator==='-'?-v:v):unknown;}if(n.type==='ArrayExpression'){const a=n.elements.map(literal);return a.includes(unknown)?unknown:a;}if(n.type==='ObjectExpression'){const a={};for(const p of n.properties){const k=key(p),v=literal(p.value);if(k===null||p.kind!=='init'||v===unknown||['__proto__','constructor','prototype'].includes(k))return unknown;a[k]=v;}return a;}return unknown;};
 const bindNames=(n,names)=>{if(!n)return;if(n.type==='Identifier')names.push(n.name);else if(n.type==='RestElement')bindNames(n.argument,names);else if(n.type==='AssignmentPattern')bindNames(n.left,names);else if(n.type==='ArrayPattern')n.elements.forEach(e=>bindNames(e,names));else if(n.type==='ObjectPattern')n.properties.forEach(p=>bindNames(p.value??p.argument,names));};
 const visit=(node,env)=>{if(!node||typeof node!=='object')return;
  if(node.type==='Program'||node.type==='BlockStatement'){const scope=new Map(env);for(const s of node.body)visit(s,scope);return;}
  if(/Function(?:Expression|Declaration)$/.test(node.type)||node.type==='ArrowFunctionExpression'){const scope=new Map(env),names=[];for(const p of node.params)bindNames(p,names);names.forEach(n=>scope.delete(n));visit(node.body,scope);return;}
  if(node.type==='VariableDeclaration'){for(const d of node.declarations){const method=member(d.init?.callee),object=d.init?.callee?.object;if(d.id.type==='Identifier'){env.delete(d.id.name);if(d.init?.type==='CallExpression'&&(object?.name==='VIE'&&method==='svg'||env.get(object?.name)==='svg'&&method==='group'))env.set(d.id.name,'svg');}visit(d.init,env);}return;}
  if(node.type==='CallExpression'&&env.get(node.callee?.object?.name)==='svg'){
   const method=member(node.callee),arg=node.arguments[0];
   if(method&&!SVG_SDK_KINDS.includes(method)&&!['group','axes','coordinates','anchor','connect','layoutLabels','dispose'].includes(method))svgSDKError(method,'method','unknown drawing method');
   if(SVG_SDK_KINDS.includes(method)&&arg?.type==='ObjectExpression'){
    const keys=new Map();let dynamic=false;
    for(const p of arg.properties){const k=key(p);if(k===null||p.kind!=='init'){dynamic=true;keys.clear();continue;}if(keys.has(k)){const e=Error('VIE_SDK_DUPLICATE_FIELD '+method+'.'+k+': duplicate object key; use strokeWidth for stroke thickness, width for rectangle geometry');e.code='VIE_SDK_DUPLICATE_FIELD';e.field=method+'.'+k;throw e;}keys.set(k,p);}
    if(!dynamic){const v=literal(arg);if(v!==unknown)normalizeSVGPrimitive(method,v);else{for(const k of keys.keys())if(![...SVG_SDK_KEYS[method],'tone','color','stroke','strokeWidth','stroke-width','fill','opacity','strokeOpacity','fillOpacity','dash','strokeDasharray'].includes(k))svgSDKError(method,k,'unknown field');if(['label','rect','circle','angle'].includes(method)&&!keys.has('at')&&!((keys.has('x')||method==='circle'&&keys.has('cx'))&&(keys.has('y')||method==='circle'&&keys.has('cy'))))svgSDKError(method,'at','expected at:[x,y] or complete coordinate aliases');}}
   }
  }
  for(const [k,v]of Object.entries(node)){if(['start','end','loc'].includes(k))continue;if(Array.isArray(v))v.forEach(n=>{if(n?.type)visit(n,env);});else if(v?.type)visit(v,env);}
 };
 visit(tree,new Map());
}

/** Topic-independent document and generated-figure contract. No topic allowlist. */
/** Topic-neutral learning data. Never execute authored JavaScript on the Host. */
function validateLearningDefinition(input,withRoot=false){
 const fail=message=>{throw Error('VIE_LEARNING_INVALID: '+message);};
 const object=(v,path,keys)=>{if(!v||typeof v!=='object'||Array.isArray(v))fail(path+' must be an object');for(const k of Object.keys(v))if(!keys.includes(k))fail(path+'.'+k+' is unknown');};
 const text=(v,path,max=1000)=>{if(typeof v!=='string'||v.length>max)fail(path+' must be text (max '+max+')');return v;};
 const requiredText=(v,path,max=1000)=>{const s=text(v,path,max);if(!s.trim())fail(path+' must not be blank');return s;};
 object(input,'learning',['type','title','key','legend','note','stages','quiz','questions',...(withRoot?['root']:[])]);
 const out={title:requiredText(input.title??'交互演示','title',100),key:input.key??'learning'};
 if(typeof out.key!=='string'||!/^[a-zA-Z][\w-]{0,30}$/.test(out.key)||['__proto__','constructor','prototype'].includes(out.key))fail('key is invalid');
 for(const k of ['legend','note'])if(input[k]!==undefined)out[k]=text(input[k],k);
 const stages=input.stages??[];if(!Array.isArray(stages)||stages.length>8)fail('stages needs 0–8 entries');
 out.stages=stages.map((s,i)=>{const p='stages['+i+']';object(s,p,['label','title','caption','html','mobileHtml']);const v={label:requiredText(s.label??String(i+1),p+'.label',80),html:requiredText(s.html,p+'.html',16000)};for(const k of ['title','caption','mobileHtml'])if(s[k]!==undefined)v[k]=k==='mobileHtml'?requiredText(s[k],p+'.'+k,16000):text(s[k],p+'.'+k);return v;});
 if(input.quiz!==undefined){const q=input.quiz;object(q,'quiz',['question','options','correct']);if(!Array.isArray(q.options)||q.options.length<2||q.options.length>6)fail('quiz.options needs 2–6 entries');if(!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.options.length)fail('quiz.correct must be a zero-based option index; do not infer an answer from feedback');out.quiz={question:requiredText(q.question,'quiz.question'),correct:q.correct,options:q.options.map((o,i)=>{object(o,'quiz.options['+i+']',['label','feedback']);return {label:requiredText(o.label,'quiz.options['+i+'].label'),...(o.feedback!==undefined?{feedback:text(o.feedback,'quiz.options['+i+'].feedback')}:{})};})};}
 if(input.questions!==undefined){
  if(input.quiz!==undefined||stages.length)fail('questions cannot be mixed with quiz or stages');
  if(!Array.isArray(input.questions)||input.questions.length<1||input.questions.length>32)fail('questions needs 1–32 entries');
  out.questions=input.questions.map((q,i)=>{object(q,'questions['+i+']',['title','question','options','correct','explanation']);const {title,explanation,...quiz}=q;let clean;try{clean=validateLearningDefinition({quiz}).quiz;}catch(e){fail('questions['+i+']: '+e.message);}return {...clean,...(title!==undefined?{title:requiredText(title,'questions['+i+'].title',100)}:{}),...(explanation!==undefined?{explanation:text(explanation,'questions['+i+'].explanation',2000)}:{})};});
 }
 if(!out.stages.length&&!out.quiz&&!out.questions)fail('stages, quiz or questions is required');
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

/** Multiple legacy quiz-only blocks are one exercise, not separate diagrams. */
function isLearningQuestionGroup(blocks){return Array.isArray(blocks)&&blocks.length>1&&blocks.every(b=>b&&b.type==='learning'&&b.quiz&&Object.keys(b).every(k=>['type','title','key','quiz'].includes(k)));}

function documentVisualUnits(document){
  try{document=normalizeLearningDocumentAlias(document);}catch{}
  if(!document||document.controls?.length||isLearningQuestionGroup(document.blocks))return 1;
  return Math.max(1,(Array.isArray(document.blocks)?document.blocks:[]).filter(b=>b&&(['figure','learning','graphic','chart','visual','experiment'].includes(b.type)||b.kind||b.type===undefined&&typeof b.html==='string')).length);
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
function validateFigureDefinition(input,internalPreview=false){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype)throw Error('Figure requires an object');
  for(const key of Object.keys(input))if(!DOCUMENT_CONTRACT.blocks.figure.fields.includes(key)&&key!=='type'&&!(internalPreview&&key==='preview'))throw Error('Unknown figure field: '+key);
  const bounded=(value,max,label)=>{if(typeof value!=='string'||new TextEncoder().encode(value).length>max)throw Error('Figure '+label+' exceeds limit or is not text');return value;};
  const result={title:bounded(input.title??'交互图解',300,'title'),html:bounded(input.html??'',16384,'html'),css:bounded(input.css??'',8192,'css'),js:bounded(input.js??'',32768,'js'),height:input.height??360,state:validateFigureState(input.state??{})};
  if(internalPreview&&input.preview!==undefined){if(typeof input.preview!=='boolean'||input.preview&&result.js)throw Error('Invalid static preview');result.preview=input.preview;}
  if(input.bindings!==undefined){
    if(!input.bindings||typeof input.bindings!=='object'||Array.isArray(input.bindings)||Object.keys(input.bindings).length>8)throw Error('Invalid figure bindings');
    result.bindings={};for(const [key,ref]of Object.entries(input.bindings)){if(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(key)||['constructor','prototype','__proto__'].includes(key)||typeof ref!=='string'||!/^\/(shared|derived)\/[A-Za-z][A-Za-z0-9_]{0,19}$/.test(ref))throw Error('Invalid figure binding');result.bindings[key]=ref;}
  }
  if(!result.html.trim())throw Error('Figure html must not be empty');
  validateLearningCalls(result.js);
  if(!Number.isInteger(result.height)||result.height<80||result.height>1000)throw Error('Figure height must be 80–1000 (values below 160 display at 160)');result.height=Math.max(160,result.height);
  if(/<(?:iframe|frame|object|embed|base)\b|<meta\b[^>]*http-equiv\s*=\s*["']?refresh/i.test(result.html))throw Error('Figure must be self-contained; nested browsing contexts and refresh are not supported');
  if(new TextEncoder().encode(JSON.stringify(result)).length>60000)throw Error('Figure exceeds serialized 60KB limit');
  return result;
}
function normalizeLearningDocumentAlias(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype||input.type===undefined)return input;
  if(input.type!=='learning')throw Error('Unknown document type: '+String(input.type));
  const {type,...document}=input;
  const blocks=document.blocks;
  if(!Array.isArray(blocks)||blocks.every(block=>block?.type==='learning'))return document;
  const stageFields=new Set(['label','title','caption','html','mobileHtml']);
  // Preserve invalid required fields so validation and repair use the same block.
  const stages=blocks.every(block=>block&&typeof block==='object'&&!Array.isArray(block)&&
    Object.keys(block).every(key=>stageFields.has(key)));
  if(!stages){
    const error=Error('document.type:"learning" requires typed learning blocks or stage objects with html');
    error.code='VIE_LEARNING_INVALID';
    throw error;
  }
  return {...document,blocks:[{
    type:'learning',
    title:typeof document.title==='string'&&document.title.trim()?document.title:'交互演示',
    stages:blocks.map((stage,index)=>({
      label:stage.label??stage.title??String(index+1),
      ...(stage.title===undefined?{}:{title:stage.title}),
      ...(stage.caption===undefined?{}:{caption:stage.caption}),
      html:stage.html,
      ...(stage.mobileHtml===undefined?{}:{mobileHtml:stage.mobileHtml})
    }))
  }]};
}
function validateDocumentSpec(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.getPrototypeOf(input)!==Object.prototype)throw Error('Document requires an object');
  input=normalizeLearningDocumentAlias(input);
  if(input.caption!==undefined){if(typeof input.caption!=='string'||input.caption.length>140)throw Error('document.caption must be text of at most 140 characters');const {caption,...rest}=input;input=rest;}
  if(input.title===undefined){const first=isLearningQuestionGroup(input.blocks)?'选择题练习':input.blocks?.[0]?.title;input={...input,title:typeof first==='string'&&first.trim()?first.trim().slice(0,100):'交互图解'};}
  for(const key of Object.keys(input))if(!DOCUMENT_CONTRACT.fields.includes(key))throw Error('Unknown document field: '+key);
  if(typeof input.title!=='string'||!input.title.trim()||input.title.length>100)throw Error('Document requires a short title');
  if(!Array.isArray(input.blocks)||input.blocks.length<1||input.blocks.length>12)throw Error('Document requires 1–12 ordered blocks');
  if(isLearningQuestionGroup(input.blocks))input={...input,blocks:[{type:'learning',title:input.title,questions:input.blocks.map((b,i)=>{try{const q=validateLearningDefinition(b);return {...q.quiz,title:q.title};}catch(error){error.path='blocks['+i+']';throw error;}})}]};
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

/** Pure graph layout and local navigation. No topic names or inferred edges. */
function layoutFlow(spec){
  const nodes=spec.nodes,byId=new Map(nodes.map((n,i)=>[n.id,i])),next=new Map(nodes.map(n=>[n.id,[]]));
  for(const e of spec.edges)next.get(e.from).push(e.to);
  let tick=0;const indices=new Map(),low=new Map(),stack=[],active=new Set(),components=[];
  function visit(id){indices.set(id,tick);low.set(id,tick++);stack.push(id);active.add(id);for(const to of next.get(id)){if(!indices.has(to)){visit(to);low.set(id,Math.min(low.get(id),low.get(to)));}else if(active.has(to))low.set(id,Math.min(low.get(id),indices.get(to)));}if(low.get(id)===indices.get(id)){const part=[];let x;do{x=stack.pop();active.delete(x);part.push(x);}while(x!==id);components.push(part.sort((a,b)=>byId.get(a)-byId.get(b)));}}
  nodes.forEach(n=>{if(!indices.has(n.id))visit(n.id);});
  const group=new Map();components.forEach((c,i)=>c.forEach(id=>group.set(id,i)));
  const outgoing=components.map(()=>new Set()),incoming=components.map(()=>0),base=components.map(()=>0);
  for(const e of spec.edges){const a=group.get(e.from),b=group.get(e.to);if(a!==b&&!outgoing[a].has(b)){outgoing[a].add(b);incoming[b]++;}}
  const roots=components.filter((_,i)=>incoming[i]===0).map(c=>c[0]).sort((a,b)=>byId.get(a)-byId.get(b));
  const ready=components.map((_,i)=>i).filter(i=>incoming[i]===0),ranks=new Map();
  while(ready.length){ready.sort((a,b)=>byId.get(components[a][0])-byId.get(components[b][0]));const g=ready.shift();components[g].forEach((id,i)=>ranks.set(id,base[g]+i));for(const to of outgoing[g]){base[to]=Math.max(base[to],base[g]+components[g].length);if(--incoming[to]===0)ready.push(to);}}
  const rows=[];for(const n of nodes){const r=ranks.get(n.id);(rows[r]??=[]).push(n.id);}return {rows:rows.filter(Boolean),ranks:Object.fromEntries(ranks),roots};
}
function validateFlowState(spec,input){
  const start=layoutFlow(spec).roots[0]??spec.nodes[0].id;
  const value=input??{v:1,presentation:spec.presentation??'overview',history:[start]};
  if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(k=>!['v','presentation','history','choice'].includes(k))||value.v!==1||!['overview','guided'].includes(value.presentation)||!Array.isArray(value.history)||value.history.length<1||value.history.length>64)throw Error('Invalid flow navigation state');
  const known=new Set(spec.nodes.map(n=>n.id));if(value.history.some(id=>typeof id!=='string'||!known.has(id)))throw Error('Unknown flow navigation node');
  if(!layoutFlow(spec).roots.includes(value.history[0]))throw Error('Flow navigation must start at a root');
  for(let i=1;i<value.history.length;i++)if(!spec.edges.some(e=>e.from===value.history[i-1]&&e.to===value.history[i]))throw Error('Undeclared flow navigation edge');
  if(value.choice!==undefined&&!spec.edges.some(e=>e.from===value.history.at(-1)&&e.to===value.choice))throw Error('Invalid flow branch choice');
  return {v:1,presentation:value.presentation,history:[...value.history],...(value.choice===undefined?{}:{choice:value.choice})};
}
/** Freeze the mode default into durable results; explicit per-figure choice wins. */
function flowPresentationSource(source,mode){
  return source.split('\n').map(line=>{if(!line.trim())return line;const e=JSON.parse(line);if(e.op==='node.put'&&e.type==='Flow'&&e.props?.presentation===undefined)e.props={...e.props,presentation:mode==='study'?'guided':'overview'};return JSON.stringify(e);}).join('\n');
}
/** Wide classification trees can reflow as nested groups; never duplicate DAG merges or flatten cycles. */
function wideFlowTree(spec){
  if(Math.max(...layoutFlow(spec).rows.map(r=>r.length))<=3)return null;
  const children=new Map(spec.nodes.map(n=>[n.id,[]])),parents=new Map();
  for(const [index,e]of spec.edges.entries()){if(e.from===e.to||parents.has(e.to))return null;parents.set(e.to,e.from);children.get(e.from).push({...e,index});}
  const roots=spec.nodes.filter(n=>!parents.has(n.id)).map(n=>n.id),visited=new Set();
  const visit=id=>{if(visited.has(id))return false;visited.add(id);return children.get(id).every(e=>visit(e.to));};
  if(!roots.length||!roots.every(visit)||visited.size!==spec.nodes.length)return null;
  return {roots,children};
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
  keys(value,['title','subtitle','layout','nodes','edges','items','shapes','width','height','accuracy','representation','duration','motions','presentation']);
  const result={title:str(value.title??'',100)};
  if(value.subtitle!==undefined)result.subtitle=str(value.subtitle,160);
  if(value.presentation!==undefined){if(kind!=='Flow'||!['overview','guided'].includes(value.presentation))err('invalid flow presentation');result.presentation=value.presentation;}
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
  GenerativeFigure:{props:['title','html','css','js','height','state','bindings','preview'],description:'Topic-independent generated HTML/CSS/JS, isolated iframe; SVG/Canvas/WebGL and custom interaction, not bound to experiment templates'},
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
  Flow:{props:['title','subtitle','layout','nodes','edges','accuracy','presentation'],description:'Topology-based overview or guided flow navigation'},
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
  if(type==='GenerativeFigure')return {v:1,op:'node.put',id:id(event.id),type,props:validateFigureDefinition(props,true),parent:event.parent===undefined?'root':id(event.parent),order:event.order===undefined?0:number(event.order,-10000,10000)};
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
  reset(){this.raw='';this.cursor=0;this.depth=0;this.quoted=false;this.escape=false;this.begin=-1;this.blocks=[];this.array=false;this.closed=false;this.source='';this.pendingDecoder=null;this.pendingStart=-1;this.pendingSignature='';}
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
    if(changed){try{this.source=documentSceneSource({...this.header,blocks:this.blocks});this.pendingSignature='';}catch{this.source='';this.closed=true;}}
    // Preview a completed HTML field while its JavaScript is still being generated.
    // The internal marker is never accepted on public document input.
    if(!this.closed&&this.begin>=0){
      if(this.pendingStart!==this.begin){this.pendingStart=this.begin;this.pendingDecoder=new IncrementalToolArguments({fields:['type','title','html','css','state','bindings'],maxRaw:65000,maxValue:32768});}
      const decoder=this.pendingDecoder,fields=decoder.update(raw.slice(this.begin));
      if(!decoder.invalid&&(!fields.type||fields.type==='figure')&&fields.html?.trim()&&!(decoder.inString&&decoder.currentField==='html')){
        try{
          const block={type:'figure',title:fields.title??this.title,html:fields.html,css:decoder.inString&&decoder.currentField==='css'?'':fields.css??'',js:''};
          for(const key of ['state','bindings'])if(fields[key])try{block[key]=JSON.parse(fields[key]);}catch{}
          const signature=JSON.stringify(block);
          if(signature!==this.pendingSignature){const source=documentSceneSource({...this.header,blocks:[...this.blocks,block]}),lines=source.split('\n').filter(Boolean).map(s=>JSON.parse(s));const figures=lines.filter(e=>e.op==='node.put'&&e.type==='GenerativeFigure');figures.at(-1).props.preview=true;this.source=lines.map(e=>JSON.stringify(e)).join('\n')+'\n';this.pendingSignature=signature;}
        }catch{}
      }
    }
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

/** Presentation only: never write control values or dispatch application events. */
function updateRangePresentation(input){
  if(input?.type!=='range')return;
  const min=input.min===''?0:Number(input.min),max=input.max===''?100:Number(input.max),value=Number(input.value);
  const percent=Number.isFinite(min)&&Number.isFinite(max)&&Number.isFinite(value)&&max>min?Math.max(0,Math.min(100,(value-min)/(max-min)*100)):0;
  const fill=Number(percent.toFixed(4))+'%';
  if(input.style.getPropertyValue('--vie-range-fill')!==fill)input.style.setProperty('--vie-range-fill',fill);
}
function installControlPresentation(root){
  const win=root.ownerDocument.defaultView,inputs=new Set();let pending=0,disposed=false;
  const add=node=>{if(node.nodeType!==1||node.namespaceURI!=='http://www.w3.org/1999/xhtml')return;
    if(node.matches('input[type="range"]'))inputs.add(node);
    for(const input of node.querySelectorAll('input[type="range"]'))inputs.add(input);
  };
  const refresh=()=>{if(disposed)return;for(const input of inputs){if(!root.contains(input)||input.type!=='range')inputs.delete(input);else updateRangePresentation(input);}};
  const schedule=()=>{if(!pending&&!disposed)pending=win.requestAnimationFrame(()=>{pending=0;refresh();});};
  const change=event=>updateRangePresentation(event.target);
  const click=event=>{if(event.target.closest?.('button'))schedule();};
  add(root);refresh();
  const observer=new win.MutationObserver(records=>{let changed=false;for(const record of records){
    if(record.type==='attributes'){add(record.target);updateRangePresentation(record.target);continue;}
    for(const node of record.addedNodes){const before=inputs.size;add(node);if(inputs.size!==before)changed=true;}
    if(record.removedNodes.length)changed=true;
  }if(changed)schedule();});
  observer.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['type','value','min','max']});
  root.addEventListener('input',change,true);root.addEventListener('change',change,true);
  root.addEventListener('click',click,true);
  win.addEventListener('vie:statechange',schedule);
  return {refresh,dispose(){if(disposed)return;disposed=true;observer.disconnect();win.cancelAnimationFrame(pending);root.removeEventListener('input',change,true);root.removeEventListener('change',change,true);root.removeEventListener('click',click,true);win.removeEventListener('vie:statechange',schedule);inputs.clear();}};
}

/** Generated code runs only inside an opaque-origin iframe, never the host DOM. */
function figureBootstrap(config){
  /** Presentation only: never write control values or dispatch application events. */
function updateRangePresentation(input){
  if(input?.type!=='range')return;
  const min=input.min===''?0:Number(input.min),max=input.max===''?100:Number(input.max),value=Number(input.value);
  const percent=Number.isFinite(min)&&Number.isFinite(max)&&Number.isFinite(value)&&max>min?Math.max(0,Math.min(100,(value-min)/(max-min)*100)):0;
  const fill=Number(percent.toFixed(4))+'%';
  if(input.style.getPropertyValue('--vie-range-fill')!==fill)input.style.setProperty('--vie-range-fill',fill);
}
function installControlPresentation(root){
  const win=root.ownerDocument.defaultView,inputs=new Set();let pending=0,disposed=false;
  const add=node=>{if(node.nodeType!==1||node.namespaceURI!=='http://www.w3.org/1999/xhtml')return;
    if(node.matches('input[type="range"]'))inputs.add(node);
    for(const input of node.querySelectorAll('input[type="range"]'))inputs.add(input);
  };
  const refresh=()=>{if(disposed)return;for(const input of inputs){if(!root.contains(input)||input.type!=='range')inputs.delete(input);else updateRangePresentation(input);}};
  const schedule=()=>{if(!pending&&!disposed)pending=win.requestAnimationFrame(()=>{pending=0;refresh();});};
  const change=event=>updateRangePresentation(event.target);
  const click=event=>{if(event.target.closest?.('button'))schedule();};
  add(root);refresh();
  const observer=new win.MutationObserver(records=>{let changed=false;for(const record of records){
    if(record.type==='attributes'){add(record.target);updateRangePresentation(record.target);continue;}
    for(const node of record.addedNodes){const before=inputs.size;add(node);if(inputs.size!==before)changed=true;}
    if(record.removedNodes.length)changed=true;
  }if(changed)schedule();});
  observer.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['type','value','min','max']});
  root.addEventListener('input',change,true);root.addEventListener('change',change,true);
  root.addEventListener('click',click,true);
  win.addEventListener('vie:statechange',schedule);
  return {refresh,dispose(){if(disposed)return;disposed=true;observer.disconnect();win.cancelAnimationFrame(pending);root.removeEventListener('input',change,true);root.removeEventListener('change',change,true);root.removeEventListener('click',click,true);win.removeEventListener('vie:statechange',schedule);inputs.clear();}};
}

  /** Topic-neutral learning data. Never execute authored JavaScript on the Host. */
function validateLearningDefinition(input,withRoot=false){
 const fail=message=>{throw Error('VIE_LEARNING_INVALID: '+message);};
 const object=(v,path,keys)=>{if(!v||typeof v!=='object'||Array.isArray(v))fail(path+' must be an object');for(const k of Object.keys(v))if(!keys.includes(k))fail(path+'.'+k+' is unknown');};
 const text=(v,path,max=1000)=>{if(typeof v!=='string'||v.length>max)fail(path+' must be text (max '+max+')');return v;};
 const requiredText=(v,path,max=1000)=>{const s=text(v,path,max);if(!s.trim())fail(path+' must not be blank');return s;};
 object(input,'learning',['type','title','key','legend','note','stages','quiz','questions',...(withRoot?['root']:[])]);
 const out={title:requiredText(input.title??'交互演示','title',100),key:input.key??'learning'};
 if(typeof out.key!=='string'||!/^[a-zA-Z][\w-]{0,30}$/.test(out.key)||['__proto__','constructor','prototype'].includes(out.key))fail('key is invalid');
 for(const k of ['legend','note'])if(input[k]!==undefined)out[k]=text(input[k],k);
 const stages=input.stages??[];if(!Array.isArray(stages)||stages.length>8)fail('stages needs 0–8 entries');
 out.stages=stages.map((s,i)=>{const p='stages['+i+']';object(s,p,['label','title','caption','html','mobileHtml']);const v={label:requiredText(s.label??String(i+1),p+'.label',80),html:requiredText(s.html,p+'.html',16000)};for(const k of ['title','caption','mobileHtml'])if(s[k]!==undefined)v[k]=k==='mobileHtml'?requiredText(s[k],p+'.'+k,16000):text(s[k],p+'.'+k);return v;});
 if(input.quiz!==undefined){const q=input.quiz;object(q,'quiz',['question','options','correct']);if(!Array.isArray(q.options)||q.options.length<2||q.options.length>6)fail('quiz.options needs 2–6 entries');if(!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.options.length)fail('quiz.correct must be a zero-based option index; do not infer an answer from feedback');out.quiz={question:requiredText(q.question,'quiz.question'),correct:q.correct,options:q.options.map((o,i)=>{object(o,'quiz.options['+i+']',['label','feedback']);return {label:requiredText(o.label,'quiz.options['+i+'].label'),...(o.feedback!==undefined?{feedback:text(o.feedback,'quiz.options['+i+'].feedback')}:{})};})};}
 if(input.questions!==undefined){
  if(input.quiz!==undefined||stages.length)fail('questions cannot be mixed with quiz or stages');
  if(!Array.isArray(input.questions)||input.questions.length<1||input.questions.length>32)fail('questions needs 1–32 entries');
  out.questions=input.questions.map((q,i)=>{object(q,'questions['+i+']',['title','question','options','correct','explanation']);const {title,explanation,...quiz}=q;let clean;try{clean=validateLearningDefinition({quiz}).quiz;}catch(e){fail('questions['+i+']: '+e.message);}return {...clean,...(title!==undefined?{title:requiredText(title,'questions['+i+'].title',100)}:{}),...(explanation!==undefined?{explanation:text(explanation,'questions['+i+'].explanation',2000)}:{})};});
 }
 if(!out.stages.length&&!out.quiz&&!out.questions)fail('stages, quiz or questions is required');
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

/** Multiple legacy quiz-only blocks are one exercise, not separate diagrams. */
function isLearningQuestionGroup(blocks){return Array.isArray(blocks)&&blocks.length>1&&blocks.every(b=>b&&b.type==='learning'&&b.quiz&&Object.keys(b).every(k=>['type','title','key','quiz'].includes(k)));}

  /** Runs inside the opaque figure. Topic-neutral stages and local understanding checks. */
function mountLearning(options){
  options={...validateLearningDefinition(options,true),root:options.root};
  const root=typeof options.root==='string'?document.querySelector(options.root):options.root;
  if(!root)throw Error('Learning root not found');
  if(options.questions)return mountQuestionSet(root,options);
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

/** Shared, local-only exercise runner. Answers and score survive remounting. */
function mountQuestionSet(root,options){
 const qs=options.questions,key=options.key,el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e;};
 let index=0,answers=qs.map(()=>-1),done=false;
 function restore(){const v=VIE.state[key]??{};index=Number.isInteger(v.index)?Math.max(0,Math.min(qs.length-1,v.index)):0;answers=qs.map((q,i)=>Number.isInteger(v.answers?.[i])&&v.answers[i]>=0&&v.answers[i]<q.options.length?v.answers[i]:-1);done=v.done===true&&answers.every(x=>x>=0);}
 const save=()=>VIE.setState({...VIE.state,[key]:{index,answers:[...answers],done}});
 const score=()=>answers.filter((a,i)=>a===qs[i].correct).length;
 function draw(){
  const card=el('section','vie-questions');
  if(done){const completed=el('h3','','本组完成');completed.tabIndex=-1;card.append(completed,el('strong','vie-question-result',score()+' / '+qs.length),el('p','muted','答对 '+score()+' 题，共 '+qs.length+' 题。'));const again=el('button','vie-question-next','重新做一遍');again.type='button';again.onclick=()=>{index=0;answers=qs.map(()=>-1);done=false;draw();save();};card.append(again);root.replaceChildren(card);return;}
  const q=qs[index],picked=answers[index],locked=picked>=0,top=el('div','vie-question-top');top.append(el('span','vie-question-pill','第 '+(index+1)+' / '+qs.length+' 题'),el('span','vie-question-pill','得分 '+score()));
  const progress=el('progress','vie-question-progress');progress.max=qs.length;progress.value=answers.filter(x=>x>=0).length;progress.setAttribute('aria-label','答题进度');
  const heading=el('h3','vie-question-stem',q.question),choices=el('div','vie-question-options');card.append(top,progress,heading,choices);
  q.options.forEach((o,i)=>{const b=el('button','vie-question-option');b.type='button';b.disabled=locked;b.append(el('span','vie-question-letter',String.fromCharCode(65+i)),el('span','',o.label));if(locked&&i===q.correct)b.classList.add('is-correct');if(locked&&i===picked&&picked!==q.correct)b.classList.add('is-wrong');b.onclick=()=>{if(answers[index]>=0)return;answers[index]=i;draw();save();root.querySelector('.vie-question-next')?.focus();};choices.append(b);});
  if(locked){const feedback=el('div','vie-question-feedback');feedback.setAttribute('role','status');feedback.append(el('strong','',picked===q.correct?'答对了。':'正确答案是 '+String.fromCharCode(65+q.correct)+'。'));const explanation=q.explanation??q.options[picked].feedback??q.options[q.correct].feedback;if(explanation)feedback.append(el('p','',explanation));card.append(feedback);}
  const foot=el('div','vie-question-foot'),next=el('button','vie-question-next',index===qs.length-1?'查看结果 →':'下一题 →');next.type='button';next.disabled=!locked;next.onclick=()=>{if(answers[index]<0)return;if(index===qs.length-1)done=true;else index++;draw();save();root.querySelector('h3')?.focus();};heading.tabIndex=-1;foot.append(next);card.append(foot);root.replaceChildren(card);
 }
 const onState=()=>{const before=JSON.stringify([index,answers,done]);restore();if(JSON.stringify([index,answers,done])!==before)draw();};window.addEventListener('vie:statechange',onState);restore();draw();return {dispose(){window.removeEventListener('vie:statechange',onState);root.replaceChildren();}};
}

  /** Topic-independent drawing helpers. Runs only inside the figure sandbox. */
function installGraphicsRuntime(api) {
  /** Shared, deterministic SVG argument contract. No DOM or authored-code execution. */
const SVG_SDK_KINDS=['line','arrow','label','circle','rect','path','curve','angle','dimension'];
const SVG_SDK_KEYS={
 line:['from','to','x1','y1','x2','y2','label','width'],arrow:['from','to','x1','y1','x2','y2','label','width'],dimension:['from','to','x1','y1','x2','y2','offset','label','width'],
 label:['at','x','y','text','anchor','textAnchor','text-anchor','align','bold','fontSize','size','fontWeight'],circle:['at','x','y','cx','cy','radius','r','label','width'],rect:['at','x','y','width','height','w','h','radius','rx','ry','label'],path:['d','width'],curve:['points','width'],angle:['at','x','y','radius','r','from','to','label','width']
};
function svgSDKError(kind,key,message){const error=Error('VIE_SDK_ARGUMENT '+kind+'.'+key+': '+message);error.code='VIE_SDK_ARGUMENT';error.field=kind+'.'+key;throw error;}
function svgSDKNumber(value,kind,key,min=-1e7,max=1e7){if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max)svgSDKError(kind,key,'expected a finite number in '+min+'..'+max);return value;}
function svgSDKColor(value){
 const themes=['primary','secondary','accent','muted','warning','ink','bg','stroke','layer'];if(themes.includes(value))return 'var(--vie-'+value+')';
 if(typeof value!=='string'||value.length>160||!(/^(?:#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})|[a-z]+|var\(--vie-[a-z-]+\)|(?:rgb|rgba|hsl|hsla)\([\d\s.,%+\-/deg]+\))$/i.test(value)))svgSDKError('color','value','use a theme name or a CSS color');return value;
}
function normalizeSVGPrimitive(kind,input,base={}){
 if(!SVG_SDK_KINDS.includes(kind))svgSDKError(kind,'method','unknown drawing method');
 if(!input||typeof input!=='object'||Array.isArray(input))svgSDKError(kind,'options','expected an object');
 const common=['tone','color','stroke','strokeWidth','stroke-width','fill','opacity','strokeOpacity','fillOpacity','dash','strokeDasharray'];
 for(const k of Object.keys(input))if(![...common,...SVG_SDK_KEYS[kind]].includes(k))svgSDKError(kind,k,'unknown field');
 const own=k=>Object.hasOwn(input,k),pick=(key,aliases=[],fallback)=>own(key)?input[key]:(aliases.find(own)!==undefined?input[aliases.find(own)]:base[key]??fallback);
 const n=(key,aliases,fallback,min=-1e7,max=1e7)=>svgSDKNumber(pick(key,aliases,fallback),kind,key,min,max);
 const p=(key,x,y)=>{let at=pick(key);const ax=Array.isArray(x)?x.find(own):own(x)?x:undefined,ay=Array.isArray(y)?y.find(own):own(y)?y:undefined;
  if(ax!==undefined||ay!==undefined){const alias=[ax===undefined?base[key]?.[0]:input[ax],ay===undefined?base[key]?.[1]:input[ay]];if(own(key)&&(!Array.isArray(at)||alias.some((v,i)=>v!==undefined&&v!==at[i])))svgSDKError(kind,key,'conflicting coordinate aliases');at=own(key)?at:alias;}
  if(!Array.isArray(at)||at.length!==2)svgSDKError(kind,key,'expected [x,y] (x/y aliases also accepted)');return at.map(v=>svgSDKNumber(v,kind,key));};
 const tone=pick('tone'),stroke=svgSDKColor(own('stroke')?input.stroke:own('tone')?input.tone:own('color')?input.color:base.stroke??'primary'),fill=pick('fill',[],false);
 const out={stroke,labelColor:svgSDKColor(pick('color',[],tone??base.labelColor??'ink')),strokeWidth:n('strokeWidth',['stroke-width',...(kind==='rect'?[]:['width'])],2,0,100),fill:fill===true||!own('fill')&&base.fillFollowsStroke?stroke:fill===false||fill===undefined?'none':svgSDKColor(fill),fillFollowsStroke:fill===true||!own('fill')&&!!base.fillFollowsStroke,opacity:n('opacity',[],1,0,1),strokeOpacity:n('strokeOpacity',[],1,0,1),fillOpacity:n('fillOpacity',[],1,0,1)};
 const dash=pick('dash',['strokeDasharray']);if(dash!==undefined){const values=Array.isArray(dash)?dash:typeof dash==='string'?dash.trim().split(/[ ,]+/).map(Number):null;if(!values||values.length>16)svgSDKError(kind,'dash','expected at most 16 numeric lengths');out.dash=values.map(v=>svgSDKNumber(v,kind,'dash',0,1000)).join(' ');}
 if(['line','arrow','dimension'].includes(kind)){out.from=p('from','x1','y1');out.to=p('to','x2','y2');if(kind==='dimension')out.offset=n('offset',[],24);}
 if(['label','rect','circle','angle'].includes(kind))out.at=p('at',kind==='circle'?['cx','x']:'x',kind==='circle'?['cy','y']:'y');
 if(['circle','angle'].includes(kind))out.radius=n('radius',['r'],kind==='angle'?32:undefined,0,1e7);
 if(kind==='rect'){out.width=n('width',['w'],undefined,0,1e7);out.height=n('height',['h'],undefined,0,1e7);out.radius=n('radius',['rx'],10,0,1e7);out.ry=n('ry',[],out.radius,0,1e7);}
 if(kind==='label'){out.text=String(pick('text',[],'' )).slice(0,160);out.color=svgSDKColor(pick('color',[],own('fill')?input.fill:tone??base.color??'ink'));out.fontSize=n('fontSize',['size'],14,1,96);out.fontSize=Math.max(12,out.fontSize);const anchor=pick('anchor',['textAnchor','text-anchor','align'],'middle');out.anchor=({center:'middle',left:'start',right:'end'})[anchor]??anchor;if(!['middle','start','end'].includes(out.anchor))svgSDKError(kind,'anchor','use start, middle or end');out.bold=!!pick('bold',[],false)||Number(pick('fontWeight',[],400))>=600;}
 if(kind==='angle'){out.from=n('from',[],0);out.to=n('to',[],45);if(out.radius<=0||Math.abs(out.to-out.from)>=360)svgSDKError(kind,'angle','use radius > 0 and span < 360 degrees');}
 if(kind==='path'){out.d=pick('d',[],'');if(typeof out.d!=='string'||out.d.length>32768)svgSDKError(kind,'d','expected path text of at most 32768 characters');}
 if(kind==='curve'){const points=pick('points');if(!Array.isArray(points)||points.length<2||points.length>2000)svgSDKError(kind,'points','expected 2..2000 points');out.points=points.map(point=>{if(!Array.isArray(point)||point.length!==2)svgSDKError(kind,'points','expected [x,y]');return point.map(v=>svgSDKNumber(v,kind,'points'));});}
 if(kind!=='label'&&pick('label')!==undefined)out.label=String(pick('label')).slice(0,160);
 return out;
}
/** Affine data-to-pixel mapping; no guessed phase boundaries or domain values. */
function createSVGCoordinateMap(options={},width=520,height=280){
 const range=(value,key)=>{if(!Array.isArray(value)||value.length!==2||!value.every(Number.isFinite)||value[0]>=value[1])svgSDKError('coordinates',key,'expected [min,max] with min < max');return [...value];};
 const x=range(options.x??[0,1],'x'),y=range(options.y??[0,1],'y'),bounds=options.bounds??[48,24,width-72,height-60];
 if(!Array.isArray(bounds)||bounds.length!==4||!bounds.every(Number.isFinite)||bounds[2]<=0||bounds[3]<=0)svgSDKError('coordinates','bounds','expected [left,top,width,height]');
 return {x,y,bounds:[...bounds],point(value,second){const p=Array.isArray(value)?value:[value,second];if(p.length!==2||!p.every(Number.isFinite))svgSDKError('coordinates','point','expected finite [x,y] data');return [bounds[0]+(p[0]-x[0])/(x[1]-x[0])*bounds[2],bounds[1]+bounds[3]-(p[1]-y[0])/(y[1]-y[0])*bounds[3]];}};
}

  const NS='http://www.w3.org/2000/svg', disposers=new Set();let sequence=0;
  const number=(v,fallback=0)=>{const n=v===undefined?fallback:v;if(typeof n!=='number'||!Number.isFinite(n)||Math.abs(n)>1e7)throw Error('VIE graphics: expected a finite coordinate');return n;};
  const point=v=>{if(!Array.isArray(v)||v.length!==2)throw Error('VIE graphics: expected [x,y]');return v.map(n=>number(n));};
  const rootOf=value=>{const root=typeof value==='string'?document.querySelector(value):value??document.getElementById('vie-root');if(!root?.appendChild)throw Error('VIE graphics: root not found');return root;};
  const tone=value=>{const color=svgSDKColor(value??'primary');if(typeof CSS!=='undefined'&&color!=='none'&&!CSS.supports('color',color))svgSDKError('color','value','invalid CSS color');return color;};
  const ownDispose=fn=>{let disposed=false;const stop=()=>{if(disposed)return;disposed=true;disposers.delete(stop);fn();};disposers.add(stop);return stop;};
  const listen=(name,fn)=>{window.addEventListener(name,fn);return ownDispose(()=>window.removeEventListener(name,fn));};
  api.onDispose=fn=>{if(typeof fn!=='function')throw Error('VIE.onDispose expects a function');return ownDispose(fn);};
  api.onState=(fn,options={})=>{if(typeof fn!=='function')throw Error('VIE.onState expects a function');const stop=listen('vie:statechange',()=>fn(api.state));if(options.immediate!==false)fn(api.state);return stop;};
  api.onTheme=(fn,options={})=>{if(typeof fn!=='function')throw Error('VIE.onTheme expects a function');const stop=listen('vie:themechange',()=>fn(api.theme));if(options.immediate!==false)fn(api.theme);return stop;};
  api.graphicsVersion=1;
  api.svg=function(options={}) {
    const root=rootOf(options.root),width=number(options.width,520),height=number(options.height,280);
    if(width<120||height<80||width>2400||height>1600)throw Error('VIE.svg: width/height out of range');
    const viewport=document.createElement('div');viewport.className='vie-sdk-viewport';viewport.tabIndex=0;viewport.setAttribute('aria-label',options.title??'交互示意图，可横向平移查看');root.append(viewport);
    const el=(tag,attrs={},parent)=>{const node=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))node.setAttribute(k,String(v));parent?.append(node);return node;};
    const svg=el('svg',{viewBox:'0 0 '+width+' '+height,role:'img','aria-label':options.title??'交互示意图',class:'vie-sdk-svg'},viewport);
    svg.style.width='100%';svg.style.display='block';svg.style.minWidth=Math.min(width,width*12/14)+'px';
    const defs=el('defs',{},svg),markerId='vie-sdk-arrow-'+(++sequence);
    el('path',{d:'M0 0L7 3.5L0 7Z',fill:'context-stroke'},el('marker',{id:markerId,viewBox:'0 0 7 7',refX:6.5,refY:3.5,markerWidth:7,markerHeight:7,orient:'auto-start-reverse',markerUnits:'userSpaceOnUse'},defs));
    const labels=[],connectors=new Set();let scheduled=0,disposed=false;
    const overlap=(a,b)=>a.left<b.right+3&&a.right>b.left-3&&a.top<b.bottom+3&&a.bottom>b.top-3;
    const layout=()=>{if(disposed)return;for(const connector of connectors)connector.refresh();viewport.dataset.viePannable=String(viewport.scrollWidth>viewport.clientWidth+2);const placed=[],box=svg.getBoundingClientRect();let conflicts=0;
      for(const item of labels){if(!item.node.isConnected)continue;const {x,y}=item;let accepted=false;
        for(const [dx,dy]of [[0,0],[0,-17],[0,17],[22,-17],[-22,-17],[22,17],[-22,17],[0,-34],[0,34]]){
          item.node.setAttribute('x',x+dx);item.node.setAttribute('y',y+dy);const b=item.node.getBoundingClientRect();
          if(b.left>=box.left+2&&b.right<=box.right-2&&b.top>=box.top+2&&b.bottom<=box.bottom-2&&!placed.some(p=>overlap(p,b))){accepted=true;placed.push(b);break;}
        }
        if(!accepted){item.node.setAttribute('x',x);item.node.setAttribute('y',y);placed.push(item.node.getBoundingClientRect());conflicts++;}
      }
      const minSize=Math.min(14,...labels.filter(l=>l.node.isConnected).map(l=>Number(l.node.getAttribute('font-size'))||14));svg.style.minWidth=Math.min(width,width*12/minSize)+'px';svg.dataset.vieLabelConflicts=String(conflicts);return conflicts;
    };
    const schedule=()=>{if(disposed||scheduled)return;scheduled=requestAnimationFrame(()=>{scheduled=0;layout();});};
    const observer=new ResizeObserver(schedule);observer.observe(viewport);
    const stopTheme=api.onTheme(schedule,{immediate:false});document.fonts?.ready.then(schedule);
    const dispose=ownDispose(()=>{disposed=true;if(scheduled)cancelAnimationFrame(scheduled);observer.disconnect();stopTheme();viewport.remove();});
    function scope(parent) {
      function primitive(kind,raw={}) {
        let value=normalizeSVGPrimitive(kind,raw);const group=el('g',{'data-vie-primitive':kind},parent),nodes=[],ownedLabels=[];
        const clear=()=>{for(const l of ownedLabels){const i=labels.indexOf(l);if(i>=0)labels.splice(i,1);}ownedLabels.length=0;group.replaceChildren();nodes.length=0;};
        const make=(tag,attrs)=>{const n=el(tag,attrs,group);nodes.push(n);return n;};
        const label=(at,text,extra={})=>{const [x,y]=point(at),node=make('text',{x,y,fill:tone(value.color??value.labelColor??'ink'),'font-size':value.fontSize??14,'text-anchor':'middle','dominant-baseline':'middle',...extra});node.textContent=String(text??'').slice(0,160);const record={node,x,y};labels.push(record);ownedLabels.push(record);return node;};
        const draw=()=>{clear();group.setAttribute('opacity',value.opacity);const stroke=tone(value.stroke),base={stroke,'stroke-width':value.strokeWidth,fill:tone(value.fill),'stroke-opacity':value.strokeOpacity,'fill-opacity':value.fillOpacity,...value.dash?{'stroke-dasharray':value.dash}:{},'stroke-linecap':'round','stroke-linejoin':'round'};
          if(kind==='line'||kind==='arrow'||kind==='dimension'){
            const [x1,y1]=point(value.from),[x2,y2]=point(value.to),length=Math.hypot(x2-x1,y2-y1),normal=length?[-(y2-y1)/length,(x2-x1)/length]:[0,-1];
            const offset=kind==='dimension'?number(value.offset,24):0,ax=x1+normal[0]*offset,ay=y1+normal[1]*offset,bx=x2+normal[0]*offset,by=y2+normal[1]*offset;
            if(kind==='dimension')for(const [x,y]of [[x1,y1],[x2,y2]])make('line',{...base,x1:x,y1:y,x2:x+normal[0]*(offset+6),y2:y+normal[1]*(offset+6),opacity:.5,'stroke-width':1});
            make('line',{...base,x1:ax,y1:ay,x2:bx,y2:by,...kind!=='line'?{'marker-end':'url(#'+markerId+')'}:{},...kind==='dimension'?{'marker-start':'url(#'+markerId+')'}:{}});
            if(value.label!==undefined)label([(ax+bx)/2+normal[0]*13,(ay+by)/2+normal[1]*13],value.label);
          } else if(kind==='label')label(value.at,value.text,{'text-anchor':value.anchor??'middle','font-weight':value.bold?600:400});
          else if(kind==='circle'){const [cx,cy]=point(value.at);make('circle',{...base,cx,cy,r:Math.max(0,number(value.radius)),fill:tone(value.fill)});if(value.label!==undefined)label([cx,cy],value.label);}
          else if(kind==='rect'){const [x,y]=point(value.at),w=number(value.width),h=number(value.height);if(w<0||h<0)throw Error('VIE rect: negative size');make('rect',{...base,x,y,width:w,height:h,rx:value.radius,ry:value.ry,fill:tone(value.fill)});if(value.label!==undefined)label([x+w/2,y+h/2],value.label);}
          else if(kind==='path')make('path',{...base,d:String(value.d??'')});
          else if(kind==='curve'){if(!Array.isArray(value.points)||value.points.length<2||value.points.length>2000)throw Error('VIE curve: expected 2–2000 points');make('polyline',{...base,points:value.points.map(point).map(p=>p.join(',')).join(' ')});}
          else if(kind==='angle'){
            const [x,y]=point(value.at),r=number(value.radius,32),from=number(value.from,0),to=number(value.to,45),rad=d=>d*Math.PI/180;
            if(r<=0||Math.abs(to-from)>=360)throw Error('VIE angle: expected radius > 0 and angle span < 360');
            const a=[x+r*Math.cos(rad(from)),y-r*Math.sin(rad(from))],b=[x+r*Math.cos(rad(to)),y-r*Math.sin(rad(to))];
            make('path',{...base,d:'M'+a.join(',')+' A'+r+','+r+' 0 '+(Math.abs(to-from)>180?1:0)+' '+(to<from?1:0)+' '+b.join(',')});
            if(value.label!==undefined)label([x+(r+14)*Math.cos(rad((from+to)/2)),y-(r+14)*Math.sin(rad((from+to)/2))],value.label);
          }
          schedule();
        };
        draw();return {element:group,set(next){if(disposed)return;value=normalizeSVGPrimitive(kind,next,value);draw();},remove(){clear();group.remove();schedule();}};
      }
      const result={element:parent};for(const k of ['line','arrow','label','circle','rect','path','curve','angle','dimension'])result[k]=p=>primitive(k,p);
      result.group=(initial={})=>{const node=el('g',{},parent),child=scope(node);child.element=node;let value={...initial};child.set=next=>{value={...value,...next};const [x,y]=point(value.translate??[0,0]);node.setAttribute('transform','translate('+x+' '+y+') rotate('+number(value.rotate)+') scale('+number(value.scale,1)+')');schedule();};child.set({});return child;};
      result.axes=(p={})=>{const [x,y]=point(p.at??[48,height-45]),xLength=number(p.xLength,width-x-30),yLength=number(p.yLength,y-25);return {x:result.arrow({from:[x,y],to:[x+xLength,y],label:p.xLabel??'x',tone:p.tone??'muted'}),y:result.arrow({from:[x,y],to:[x,y-yLength],label:p.yLabel??'y',tone:p.tone??'muted'})};};
      return result;
    }
    const drawing=scope(svg);
    drawing.anchor=(target,side='center')=>{
      const element=target?.element??target?.node??target;if(!element||!svg.contains(element))throw Error('VIE.svg.anchor: target must belong to this drawing');
      const shape=element.querySelector?.('rect,circle,path,line,polyline,ellipse')??element,box=shape.getBBox(),sides={center:[.5,.5],left:[0,.5],right:[1,.5],top:[.5,0],bottom:[.5,1]};
      if(!Object.hasOwn(sides,side))throw Error('VIE.svg.anchor: unknown side');const ratio=sides[side],p=svg.createSVGPoint();p.x=box.x+box.width*ratio[0];p.y=box.y+box.height*ratio[1];
      const base=svg.getCTM(),matrix=shape.getCTM();if(!base||!matrix)throw Error('VIE.svg.anchor: drawing is not mounted');const result=p.matrixTransform(base.inverse().multiply(matrix));return [result.x,result.y];
    };
    drawing.connect=(from,to,options={})=>{
      let config={fromAnchor:'right',toAnchor:'left',...options},signature='',removed=false,arrow;
      const refresh=()=>{if(removed)return;const a=from?.element??from,b=to?.element??to;if(!svg.contains(a)||!svg.contains(b)){remove();return;}
        const {fromAnchor,toAnchor,...style}=config,fromPoint=drawing.anchor(from,fromAnchor),toPoint=drawing.anchor(to,toAnchor),next=JSON.stringify([style,fromPoint,toPoint]);if(next===signature)return;signature=next;
        const value={...style,from:fromPoint,to:toPoint};if(arrow)arrow.set(value);else arrow=drawing.arrow(value);
      };
      const remove=()=>{if(removed)return;removed=true;connectors.delete(controller);arrow?.remove();};
      const controller={refresh,get element(){return arrow?.element;},set(next){config={...config,...next};refresh();},remove};refresh();connectors.add(controller);return controller;
    };
    drawing.coordinates=(options={})=>{const map=createSVGCoordinateMap(options,width,height),point=map.point;return {...map,line:options=>drawing.line({...options,from:point(options.from),to:point(options.to)}),series:(points,style={})=>drawing.curve({...style,points:points.map(p=>point(p))}),marker:options=>{let value={...options};const pixel=()=>point(value.at),text=()=>String(value.label??'')+' ('+value.at.map(n=>String(Number(n.toPrecision(8)))).join(', ')+')';const dot=drawing.circle({at:pixel(),radius:4,fill:true,tone:value.tone}),label=drawing.label({at:[pixel()[0],pixel()[1]-18],text:text(),tone:value.tone});return {set(next){value={...value,...next};dot.set({at:pixel(),tone:value.tone});label.set({at:[pixel()[0],pixel()[1]-18],text:text(),tone:value.tone});},remove(){dot.remove();label.remove();}};}};};
    return Object.assign(drawing,{element:svg,viewport,layoutLabels:layout,dispose});
  };
  api.canvas=function(options={}) {
    const root=rootOf(options.root),canvas=document.createElement('canvas');canvas.className='vie-sdk-canvas';canvas.setAttribute('aria-label',options.title??'交互画布');canvas.setAttribute('role','img');canvas.style.width='100%';canvas.style.height=number(options.height,280)+'px';root.append(canvas);
    const ctx=canvas.getContext('2d');if(!ctx)throw Error('VIE.canvas: 2D canvas unavailable');let scheduled=0,disposed=false;
    const draw=()=>{scheduled=0;if(disposed||!api.visible)return;const width=Math.max(1,canvas.getBoundingClientRect().width),height=Math.max(1,canvas.getBoundingClientRect().height),dpr=Math.min(2,Math.max(1,devicePixelRatio||1));canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);try{options.draw?.({ctx,width,height,state:api.state,theme:api.theme});}catch(e){api.reportError(e);}};
    const redraw=()=>{if(!scheduled&&!disposed&&api.visible)scheduled=requestAnimationFrame(draw);};
    const observer=new ResizeObserver(redraw);observer.observe(canvas);
    const stops=[api.onState(redraw,{immediate:false}),api.onTheme(redraw,{immediate:false}),listen('vie:visibilitychange',redraw)];
    const dispose=ownDispose(()=>{disposed=true;if(scheduled)cancelAnimationFrame(scheduled);observer.disconnect();stops.forEach(s=>s());canvas.remove();});redraw();
    return {canvas,ctx,redraw,dispose};
  };
  api.animate=function(options={}) {
    const duration=number(options.duration,4000);if(duration<100||duration>3600000)throw Error('VIE.animate: duration must be 100–3600000ms');
    if(typeof options.render!=='function')throw Error('VIE.animate: render callback required');
    const stateKey=options.stateKey;if(stateKey!==undefined&&(!/^[A-Za-z][A-Za-z0-9_]{0,19}$/.test(stateKey)||['constructor','prototype'].includes(stateKey)))throw Error('VIE.animate: invalid stateKey');
    const saved=stateKey?api.state[stateKey]:null;
    let elapsed=saved&&Number.isFinite(saved.elapsed)?Math.max(0,Math.min(1e7,saved.elapsed)):0,last=null,frame=0,wanted=!!options.autoplay&&!api.reducedMotion,disposed=false,transport,lastSave=-Infinity;
    if(options.loop!==false)elapsed%=duration;else elapsed=Math.min(duration,elapsed);
    const snapshot=()=>({elapsed,progress:options.loop===false?Math.min(1,elapsed/duration):(elapsed%duration)/duration,playing:wanted});
    const persist=force=>{if(!stateKey||!force&&performance.now()-lastSave<250)return;lastSave=performance.now();api.setState({...api.state,[stateKey]:{elapsed,playing:wanted}});};
    const render=delta=>{if(disposed)return;try{options.render({...snapshot(),delta});}catch(e){wanted=false;api.reportError(e);}sync();persist(delta===0);};
    const sync=()=>{if(!transport)return;transport.play.textContent=wanted?'暂停':'播放';transport.play.setAttribute('aria-pressed',String(wanted));transport.range.value=String(snapshot().progress*100);updateRangePresentation(transport.range);};
    const cancel=()=>{if(frame)cancelAnimationFrame(frame);frame=0;last=null;};
    const request=()=>{if(!frame&&wanted&&!disposed&&api.visible)frame=requestAnimationFrame(tick);};
    const tick=now=>{frame=0;if(disposed||!wanted||!api.visible){last=null;return;}const delta=last===null?0:Math.min(100,Math.max(0,now-last));last=now;elapsed+=delta;if(options.loop===false&&elapsed>=duration){elapsed=duration;wanted=false;}render(delta);request();};
    const controller={play(){if(disposed)return;wanted=true;last=null;sync();persist(true);request();},pause(){wanted=false;cancel();sync();persist(true);},reset(){wanted=false;elapsed=0;cancel();render(0);},step(ms=duration/24){wanted=false;cancel();elapsed=Math.max(0,elapsed+number(ms));if(options.loop===false)elapsed=Math.min(duration,elapsed);render(0);},snapshot};
    if(options.controls!==false){const host=rootOf(options.root),wrap=document.createElement('div');wrap.className='vie-sdk-transport';const button=(label,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',fn);wrap.append(b);return b;};const play=button('播放',()=>wanted?controller.pause():controller.play());button('单步',()=>controller.step());button('复位',()=>controller.reset());const range=document.createElement('input');range.type='range';range.min='0';range.max='100';range.step='.1';range.value='0';range.setAttribute('aria-label','动画进度');range.addEventListener('input',()=>{wanted=false;cancel();elapsed=Number(range.value)*duration/100;render(0);});wrap.append(range);host.append(wrap);transport={wrap,play,range};}
    const stop=listen('vie:visibilitychange',()=>{cancel();request();});
    controller.dispose=ownDispose(()=>{disposed=true;wanted=false;cancel();stop();transport?.wrap.remove();});render(0);request();return controller;
  };
  window.addEventListener('pagehide',()=>{for(const stop of [...disposers])stop();},{once:true});
}

  /** Small local scene shell around the real, bundled Three.js implementation. */
function installScene3DRuntime(api){
 api.scene3d=function(options={}){
  const T=window.THREE;if(!T?.WebGLRenderer)throw Error('VIE_3D_UNAVAILABLE: use VIE.scene3d in the figure script to load the bundled runtime');
  const root=typeof options.root==='string'?document.querySelector(options.root):options.root??document.getElementById('vie-root');if(!root)throw Error('VIE.scene3d: root not found');
  const num=(v,d,min=-1e5,max=1e5)=>{const n=v??d;if(typeof n!=='number'||!Number.isFinite(n)||n<min||n>max)throw Error('VIE.scene3d: invalid numeric parameter');return n;};
  const vec=(v,d=[0,0,0])=>{const p=v??d;if(!Array.isArray(p)||p.length!==3)throw Error('VIE.scene3d: expected [x,y,z]');return p.map(n=>num(n,0));};
  const wrap=document.createElement('div');wrap.className='vie-sdk-3d';wrap.style.height=num(options.height,300,160,800)+'px';root.append(wrap);
  let renderer;try{renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power',preserveDrawingBuffer:options.capture===true});}catch(error){wrap.remove();throw Error('VIE_3D_UNAVAILABLE: WebGL context could not be created: '+error.message);}renderer.setPixelRatio(Math.min(2,devicePixelRatio||1));renderer.outputColorSpace=T.SRGBColorSpace;renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label',options.title??'三维场景，拖动旋转，滚轮缩放');wrap.append(renderer.domElement);
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(45,1,.05,1000),target=new T.Vector3(...vec(options.target)),initial=vec(options.camera,[5,3,6]);camera.position.set(...initial);camera.lookAt(target);
  scene.add(new T.HemisphereLight(0xffffff,0x526070,2));const light=new T.DirectionalLight(0xffffff,2.5);light.position.set(5,8,6);scene.add(light);
  const shapes=new Set(),materials=new Map();let disposed=false,frame=0,drag=null,count=0,lastWidth=0,lastHeight=0,vertices=0;const geometrySizes=new Map(),maxVertices=num(options.maxVertices,250000,1000,1000000);
  const themeColor=(value='primary')=>{if(Object.hasOwn(api.theme.colors??{},value))return api.theme.colors[value];if(typeof value==='number')return num(value,0,0,0xffffff);const variable=typeof value==='string'&&value.match(/^var\(--vie-([a-z]+)\)$/);if(variable&&api.theme.colors?.[variable[1]])return api.theme.colors[variable[1]];if(typeof value!=='string'||!CSS.supports('color',value))throw Error('VIE.scene3d: invalid color');return value;};
  const draw=()=>{frame=0;if(disposed||!api.visible)return;const w=Math.max(1,wrap.clientWidth),h=Math.max(1,wrap.clientHeight);if(w!==lastWidth||h!==lastHeight){lastWidth=w;lastHeight=h;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}camera.lookAt(target);renderer.render(scene,camera);renderer.domElement.dataset.vie3dRendered='true';renderer.domElement.dataset.vie3dObjects=String(count);renderer.domElement.dataset.vie3dCamera=camera.position.toArray().map(n=>n.toFixed(4)).join(',');};
  const redraw=()=>{if(!frame&&!disposed&&api.visible)frame=requestAnimationFrame(()=>{try{draw();}catch(e){api.reportError(e);}});};
  const free=object=>object.traverse(o=>{if(geometrySizes.has(o.geometry)){vertices-=geometrySizes.get(o.geometry);geometrySizes.delete(o.geometry);o.geometry.dispose();}if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material]){materials.delete(m);m.dispose();}}});
  const place=(object,p)=>{if(p.at!==undefined||p.position!==undefined)object.position.set(...vec(p.at??p.position));if(p.rotation!==undefined)object.rotation.set(...vec(p.rotation));if(p.scale!==undefined){if(typeof p.scale==='number')object.scale.setScalar(num(p.scale,1));else object.scale.set(...vec(p.scale,[1,1,1]));}if(p.visible!==undefined)object.visible=!!p.visible;};
  const makeScope=parent=>{
   const api3={object:parent};
   const shape=(kind,p={})=>{if(count>=512)throw Error('VIE.scene3d: at most 512 objects');let geometry,object;
    if(kind==='box')geometry=new T.BoxGeometry(...vec(p.size,[1,1,1]).map(n=>num(n,1,.001,1000)));
    if(kind==='sphere')geometry=new T.SphereGeometry(num(p.radius,1,.001,1000),32,20);
    if(kind==='cylinder')geometry=new T.CylinderGeometry(num(p.radiusTop,p.radius??1,0,1000),num(p.radiusBottom,p.radius??1,0,1000),num(p.height,1,.001,1000),Math.round(num(p.segments,40,3,96)));
    if(kind==='torus')geometry=new T.TorusGeometry(num(p.radius,1,.001,1000),num(p.tube,.15,.001,1000),12,64);
    if(kind==='helix'){const radius=num(p.radius,1,.001,1000),height=num(p.height,3,.001,1000),turns=num(p.turns,4,-40,40);class Helix extends T.Curve{getPoint(t,out=new T.Vector3()){const a=t*Math.PI*2*turns;return out.set(radius*Math.cos(a),(t-.5)*height,radius*Math.sin(a));}}geometry=new T.TubeGeometry(new Helix(),Math.max(64,Math.ceil(Math.abs(turns)*40)),num(p.tube,.08,.001,100),8,false);}
    if(kind==='mesh'){if(!Array.isArray(p.positions)||p.positions.length<9||p.positions.length>180000||p.positions.length%3)throw Error('VIE.scene3d mesh: expected bounded xyz positions');geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(p.positions.map(x=>num(x)),3));if(p.indices!==undefined){if(!Array.isArray(p.indices)||p.indices.length>360000||p.indices.length%3||p.indices.some(x=>!Number.isSafeInteger(x)||x<0||x>=p.positions.length/3))throw Error('VIE.scene3d mesh: invalid indices');geometry.setIndex(p.indices);}geometry.computeVertexNormals();}
    if(kind==='line'){if(!Array.isArray(p.points)||p.points.length<2||p.points.length>4096)throw Error('VIE.scene3d line: expected 2..4096 points');geometry=new T.BufferGeometry().setFromPoints(p.points.map(v=>new T.Vector3(...vec(v))));}
    const size=geometry.getAttribute('position')?.count??0;if(vertices+size>maxVertices){geometry.dispose();throw Error('VIE_3D_GEOMETRY_BUDGET: simplify the scene or raise maxVertices explicitly');}vertices+=size;geometrySizes.set(geometry,size);
    const token=p.color??p.tone??'primary',opacity=num(p.opacity,1,0,1),material=kind==='line'?new T.LineBasicMaterial({color:themeColor(token),transparent:opacity<1,opacity}):new T.MeshStandardMaterial({color:themeColor(token),roughness:.5,metalness:.15,transparent:opacity<1,opacity,side:T.DoubleSide});materials.set(material,token);object=kind==='line'?new T.Line(geometry,material):new T.Mesh(geometry,material);place(object,p);parent.add(object);shapes.add(object);count++;redraw();
    return {object,set(next={}){if(disposed)return;place(object,next);if(next.color!==undefined||next.tone!==undefined){const token=next.color??next.tone;material.color.set(themeColor(token));materials.set(material,token);}if(next.opacity!==undefined){material.opacity=num(next.opacity,1,0,1);material.transparent=material.opacity<1;}redraw();},remove(){if(!shapes.delete(object))return;object.removeFromParent();free(object);count--;redraw();}};
   };
   for(const kind of ['box','sphere','cylinder','torus','helix','mesh','line'])api3[kind]=p=>shape(kind,p);
   api3.group=(p={})=>{const object=new T.Group();place(object,p);parent.add(object);const child=makeScope(object);return {...child,set(next){place(object,next);redraw();},remove(){for(const o of [...shapes]){let n=o;while(n&&n!==object)n=n.parent;if(n===object){shapes.delete(o);count--;}}object.removeFromParent();free(object);redraw();}};};return api3;
  };
  const orbit=(dx,dy)=>{dx=num(dx,0);dy=num(dy,0);const spherical=new T.Spherical().setFromVector3(camera.position.clone().sub(target));spherical.theta-=dx*.008;spherical.phi=Math.max(.1,Math.min(Math.PI-.1,spherical.phi+dy*.008));camera.position.copy(target).add(new T.Vector3().setFromSpherical(spherical));redraw();};
  const zoom=factor=>{factor=num(factor,1,.1,10);const direction=camera.position.clone().sub(target),distance=Math.max(.5,Math.min(200,direction.length()*factor));camera.position.copy(target).add(direction.setLength(distance));redraw();};
  const down=e=>{if(e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY};renderer.domElement.setPointerCapture(e.pointerId);},move=e=>{if(!drag||drag.id!==e.pointerId)return;orbit(e.clientX-drag.x,e.clientY-drag.y);drag.x=e.clientX;drag.y=e.clientY;},up=()=>{drag=null;},wheel=e=>{e.preventDefault();zoom(Math.exp(Math.max(-1,Math.min(1,e.deltaY/600))));};
  renderer.domElement.style.touchAction='none';renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',up);renderer.domElement.addEventListener('wheel',wheel,{passive:false});
  const key=e=>{const delta={ArrowLeft:[-12,0],ArrowRight:[12,0],ArrowUp:[0,-12],ArrowDown:[0,12]}[e.key];if(delta){e.preventDefault();orbit(...delta);}if(e.key==='+'||e.key==='='){e.preventDefault();zoom(.8);}if(e.key==='-'){e.preventDefault();zoom(1.25);}};renderer.domElement.addEventListener('keydown',key);
  const actions=document.createElement('div');actions.className='vie-sdk-transport';const button=(label,callback)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',callback);actions.append(b);};button('放大',()=>zoom(.8));button('缩小',()=>zoom(1.25));button('复位视角',()=>{camera.position.set(...initial);redraw();});root.append(actions);
  const contextLost=event=>{if(disposed)return;event.preventDefault();if(frame){cancelAnimationFrame(frame);frame=0;}api.reportError(Error('VIE_3D_CONTEXT_LOST: WebGL上下文已丢失，可复位图形或查看已有静态内容。'));};renderer.domElement.addEventListener('webglcontextlost',contextLost);
  const onVisibility=()=>{if(!api.visible&&frame){cancelAnimationFrame(frame);frame=0;}else redraw();};window.addEventListener('vie:visibilitychange',onVisibility);const observer=new ResizeObserver(redraw);observer.observe(wrap);const stopTheme=api.onTheme(()=>{for(const [material,token]of materials)material.color.set(themeColor(token));redraw();},{immediate:false});
  const dispose=()=>{if(disposed)return;disposed=true;if(frame)cancelAnimationFrame(frame);observer.disconnect();stopTheme();window.removeEventListener('vie:visibilitychange',onVisibility);renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('pointerup',up);renderer.domElement.removeEventListener('pointercancel',up);renderer.domElement.removeEventListener('wheel',wheel);renderer.domElement.removeEventListener('keydown',key);const pendingGeometry=new Set(geometrySizes.keys());scene.traverse(o=>{if(o.geometry)pendingGeometry.add(o.geometry);});for(const geometry of pendingGeometry)geometry.dispose();for(const m of materials.keys())m.dispose();materials.clear();shapes.clear();renderer.domElement.removeEventListener('webglcontextlost',contextLost);geometrySizes.clear();vertices=0;renderer.dispose();renderer.forceContextLoss();wrap.remove();actions.remove();};api.onDispose(dispose);redraw();
  return {...makeScope(scene),THREE:T,scene,camera,renderer,redraw,orbit,zoom,dispose};
 };
}

  /** Shared presentation controls; content remains authored by the model. */
function installFigureUI(api){
 const rootOf=value=>{const root=typeof value==='string'?document.querySelector(value):value??document.getElementById('vie-root');if(!root?.append)throw Error('VIE.ui: root not found');return root;};
 const itemsOf=(items,max)=>{if(!Array.isArray(items)||!items.length||items.length>max)throw Error('VIE.ui: invalid item count');const ids=new Set();for(const item of items){if(!item||typeof item.id!=='string'||!item.id||item.id.length>80||ids.has(item.id))throw Error('VIE.ui: item IDs must be unique');ids.add(item.id);}return items;};
 const text=value=>String(value??'').slice(0,160);
 api.ui={
  toolbar(options={}){
   const items=itemsOf(options.items,16),root=rootOf(options.root),element=document.createElement('div'),buttons=new Map();let disposed=false;
   element.className='vie-sdk-toolbar';element.setAttribute('role','group');element.setAttribute('aria-label',text(options.label??'图形操作'));
   const set=(id,patch={})=>{const row=buttons.get(id);if(!row)throw Error('VIE.ui.toolbar: unknown item');if(patch.variant!==undefined){row.button.dataset.vieButton=['primary','secondary','ghost'].includes(patch.variant)?patch.variant:'secondary';}if(patch.label!==undefined)row.button.textContent=text(patch.label);if(patch.disabled!==undefined)row.button.disabled=!!patch.disabled;if(patch.pressed!==undefined)row.button.setAttribute('aria-pressed',String(!!patch.pressed));};
   for(const item of items){if(typeof item.onClick!=='function')throw Error('VIE.ui.toolbar: onClick required');const button=document.createElement('button');button.type='button';button.dataset.vieAction=item.id;buttons.set(item.id,{button,item});set(item.id,{label:item.label??item.id,variant:item.variant??'secondary',disabled:item.disabled,pressed:item.pressed});button.addEventListener('click',()=>{if(!disposed&&!button.disabled)try{item.onClick(api.state);}catch(error){api.reportError(error);}});element.append(button);}
   root.append(element);const dispose=api.onDispose(()=>{disposed=true;buttons.clear();element.remove();});return {element,set,dispose};
  },
  readouts(options={}){
   const items=itemsOf(options.items,24),root=rootOf(options.root),element=document.createElement('dl'),rows=new Map();let disposed=false;
   element.className='vie-sdk-readouts';element.setAttribute('aria-label',text(options.label??'当前读数'));
   const set=(id,patch={})=>{const row=rows.get(id);if(!row)throw Error('VIE.ui.readouts: unknown item');row.config={...row.config,...patch};row.label.textContent=text(row.config.label??id);const value=typeof row.config.value==='function'?row.config.value(api.state):row.config.value;row.value.textContent=text(value??'—')+(row.config.unit?' '+text(row.config.unit):'');};
   for(const item of items){const wrap=document.createElement('div'),label=document.createElement('dt'),value=document.createElement('dd');wrap.append(label,value);element.append(wrap);rows.set(item.id,{config:{...item},label,value});}
   const draw=()=>{if(disposed)return;try{for(const id of rows.keys())set(id);}catch(error){api.reportError(error);}};
   root.append(element);draw();const stop=api.onState(draw,{immediate:false});const dispose=api.onDispose(()=>{disposed=true;stop();rows.clear();element.remove();});return {element,set,dispose};
  }
 };
}

  /** Bounded, advisory geometry checks. Never alter content or trigger model requests. */
function inspectFigureLayout(root){
 const warnings=[],labels=[],controls=[],seen=new Set();
 const add=(code,message)=>{if(!seen.has(code)&&warnings.length<4){seen.add(code);warnings.push({code,message});}};
 const intersect=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>3&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>3;
 const visible=element=>{const style=getComputedStyle(element),rect=element.getBoundingClientRect();return style.display!=='none'&&style.visibility!=='hidden'&&Number(style.opacity)!==0&&rect.width>0&&rect.height>0?rect:null;};
 for(const element of [...root.querySelectorAll('svg text,button,input,select')].slice(0,200)){
  const rect=visible(element);if(!rect)continue;
  if(element.localName==='text'){
   if(!element.textContent.trim())continue;
   const svg=element.ownerSVGElement;if(!svg)continue;const box=svg.getBoundingClientRect();
   if(getComputedStyle(svg).overflow!=='visible'&&(rect.left<box.left-2||rect.right>box.right+2||rect.top<box.top-2||rect.bottom>box.bottom+2))add('TEXT_CLIPPED','部分标注可能超出图形边界。');
   if(labels.length<80){if(labels.some(row=>row.svg===svg&&intersect(row.rect,rect)))add('TEXT_OVERLAP','部分标注可能重叠，可展开查看。');labels.push({svg,rect});}
  }else if(controls.length<40){
   if(controls.some(row=>!row.element.contains(element)&&!element.contains(row.element)&&intersect(row.rect,rect)))add('CONTROL_OVERLAP','部分操作控件可能相互遮挡。');
   controls.push({element,rect});
  }
 }
 return warnings;
}

  /** Static streaming DOM only; author JavaScript is activated once at finalization. */
function createFigureContentRuntime(root,config,done) {
  let finalized=!config.preview;
  function content(html,preview) {
    // Parse as a fragment, just like the initial figure root. Document parsing
    // moves leading style/script into <head>, which would discard them below.
    const template=document.createElement('template');template.innerHTML=String(html);const doc=template.content;
    if(preview){
      for(const node of doc.querySelectorAll('script,iframe,frame,object,embed,base,link,meta'))node.remove();
      for(const node of doc.querySelectorAll('*'))for(const attr of [...node.attributes])if(/^on/i.test(attr.name)||['srcdoc','formaction'].includes(attr.name.toLowerCase())||/^(?:javascript|vbscript):/i.test(attr.value.trim()))node.removeAttribute(attr.name);
    }
    if(doc.querySelectorAll('*').length>4000)throw Error('Static preview DOM exceeds limit');
    let count=0;
    const patch=(target,source)=>{
      if(++count>4000)throw Error('Static preview DOM exceeds limit');
      const wanted=[...source.childNodes];
      for(let i=0;i<wanted.length;i++){
        const next=wanted[i];let current=target.childNodes[i];
        if(next.nodeType===1&&next.id&&(!current||current.id!==next.id)){const found=[...target.children].find(c=>c.id===next.id&&c.tagName===next.tagName);if(found){target.insertBefore(found,current??null);current=found;}}
        if(!current||current.nodeType!==next.nodeType||current.nodeName!==next.nodeName||next.nodeType===1&&current.id!==next.id){const clone=document.importNode(next,true);if(current)current.replaceWith(clone);else target.append(clone);continue;}
        if(next.nodeType===1){for(const a of [...current.attributes])if(!next.hasAttribute(a.name))current.removeAttribute(a.name);for(const a of next.attributes)if(current.getAttribute(a.name)!==a.value)current.setAttribute(a.name,a.value);patch(current,next);}
        else if(current.nodeValue!==next.nodeValue)current.nodeValue=next.nodeValue;
      }
      while(target.childNodes.length>wanted.length)target.lastChild.remove();
    };
    patch(root,doc);root.inert=preview;root.dataset.viePreview=String(preview);
  }
  const css=value=>{document.getElementById('vie-user-style').textContent=String(value??'');};
  return {
    update(value){if(finalized)return;css(value.css);content(value.html,true);},
    finalize(value){if(finalized)return;finalized=true;css(value.css);content(value.html,false);
      if(value.library&&!window.THREE){const library=document.createElement('script');library.textContent=value.library;document.head.append(library);}
      // Parsed HTML scripts are inert until explicitly inserted, as on a complete initial load.
      for(const old of root.querySelectorAll('script')){const script=document.createElement('script');for(const a of old.attributes)script.setAttribute(a.name,a.value);script.textContent=old.textContent;old.replaceWith(script);}
      if(value.js){const script=document.createElement('script');script.textContent=String(value.js);document.body.append(script);}
      requestAnimationFrame(()=>done());
    }
  };
}

  let state=config.state,theme=config.theme,visible=true,failed=false,contentRuntime;
  const post=(type,value)=>{try{parent.postMessage({v:1,channel:config.channel,type,value},'*');}catch{}};
  let readyPreview=!!config.preview;
  const reportPaint=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{if(visible&&!failed)post('painted',{preview:readyPreview});}));
  const reportReady=value=>{readyPreview=!!value.preview;post('ready',value);reportPaint();};
  const reportError=error=>{failed=true;post('error',String(error?.message??error).slice(0,1200));};
  const applyTheme=value=>{
    theme=value;document.documentElement.dataset.theme=value.mode;
    for(const [key,color]of Object.entries(value.colors??{}))document.documentElement.style.setProperty('--vie-'+key,color);
    document.documentElement.style.colorScheme=value.mode;
    window.dispatchEvent(new CustomEvent('vie:themechange',{detail:value}));
  };
  window.VIE={get state(){return state;},get theme(){return theme;},get visible(){return visible;},get reducedMotion(){return !!theme.reducedMotion;},
    title:config.title,setState(value){if(!value||typeof value!=='object'||Array.isArray(value))throw Error('VIE.setState expects an object');state=value;window.dispatchEvent(new CustomEvent('vie:statechange',{detail:state}));post('state',value);},reportError,mountLearning};
  installGraphicsRuntime(window.VIE);installScene3DRuntime(window.VIE);installFigureUI(window.VIE);
  document.documentElement.dataset.vieRuntime='graphics-v1';
  window.addEventListener('message',event=>{
    if(event.source!==parent||event.data?.channel!==config.channel)return;
    if(event.data.type==='theme')applyTheme(event.data.value);
    if(event.data.type==='state'){state=event.data.value;window.dispatchEvent(new CustomEvent('vie:statechange',{detail:state}));}
    if(event.data.type==='visibility'){visible=!!event.data.value;window.dispatchEvent(new CustomEvent('vie:visibilitychange',{detail:visible}));if(visible&&document.readyState!=='loading')reportPaint();}
    if(event.data.type==='preview'&&config.preview)contentRuntime?.update(event.data.value);
    if(event.data.type==='finalize'&&config.preview){state=event.data.value.state;config.staticSvg=!event.data.value.js?.trim();config.preview=false;contentRuntime?.finalize(event.data.value);}
  });
  window.addEventListener('error',event=>reportError(event.message));
  window.addEventListener('unhandledrejection',event=>reportError(event.reason));
  document.addEventListener('submit',event=>event.preventDefault(),true);
  document.addEventListener('click',event=>{const a=event.target.closest?.('a[href]');if(a&&!a.getAttribute('href').startsWith('#'))event.preventDefault();},true);
  applyTheme(config.theme);
  document.addEventListener('DOMContentLoaded',()=>{
    const root=document.getElementById('vie-root'),controlPresentation=installControlPresentation(root);let frame=0,last='',lastAudit=-Infinity,layoutWarnings=[],minFont=14,auditTimer=0;
    window.addEventListener('pagehide',()=>controlPresentation.dispose(),{once:true});
    let staticFitInstalled=false;
    const fitStaticSvg=()=>{if(staticFitInstalled||!config.staticSvg||root.children.length!==1||root.firstElementChild.tagName.toLowerCase()!=='svg')return;
      staticFitInstalled=true;
      const svg=root.firstElementChild,box=svg.viewBox.baseVal;
      // A viewBox lets the browser scale geometry and text together. Never enlarge
      // a static figure past its viewport to enforce a font floor: hidden overflow
      // made its right edge disappear. Small text is reported for the expand hint.
      if(box.width>0&&box.height>0){svg.style.width='100%';svg.style.minWidth='0';svg.style.maxWidth='100%';svg.style.height='auto';}
    };
    contentRuntime=createFigureContentRuntime(root,config,()=>{fitStaticSvg();measure(true);reportReady({ok:!failed,preview:false});});
    if(config.preview)try{contentRuntime.update({html:config.previewHtml,css:config.previewCss});}catch(error){reportError(error);}
    fitStaticSvg();
    const measure=(force=false)=>{const immediate=force===true;if(frame&&!immediate)return;if(frame){cancelAnimationFrame(frame);frame=0;}const run=()=>{frame=0;
      // scrollHeight includes positioned children; a small rounding allowance prevents
      // subpixel overflow from repeatedly adding/removing the Windows scrollbar gutter.
      if(immediate||performance.now()-lastAudit>=250){lastAudit=performance.now();layoutWarnings=inspectFigureLayout(root);const fonts=[...root.querySelectorAll('svg text')].slice(0,200).filter(t=>t.textContent.trim()).map(t=>parseFloat(getComputedStyle(t).fontSize)*Math.hypot(t.getScreenCTM()?.a??1,t.getScreenCTM()?.b??0));minFont=fonts.length?Math.min(...fonts):14;}else if(!auditTimer)auditTimer=setTimeout(()=>{auditTimer=0;measure();},Math.max(1,251-(performance.now()-lastAudit)));
      const value={height:Math.ceil(Math.max(root.getBoundingClientRect().height,root.scrollHeight))+2,width:document.documentElement.scrollWidth,viewport:innerWidth,minFont,layoutWarnings},signature=JSON.stringify(value);
      if(signature!==last){last=signature;post('height',value);}
    };if(immediate)run();else frame=requestAnimationFrame(run);};
    window.addEventListener('pagehide',()=>clearTimeout(auditTimer),{once:true});
    new ResizeObserver(measure).observe(root);
    new MutationObserver(measure).observe(root,{childList:true,subtree:true,attributes:true,characterData:true});
    window.addEventListener('resize',measure);root.addEventListener('load',measure,true);document.fonts?.ready.then(measure);
    measure(true);reportReady({ok:!failed,preview:!!config.preview});
  },{once:true});
}
const FIGURE_BASE_CSS=`*{box-sizing:border-box}html,body{margin:0;background:transparent;color:var(--vie-ink,#243044);font:14px/1.65 system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif}#vie-root{display:flow-root;padding:14px;overflow-wrap:anywhere;min-width:0}button,input,select,textarea{font:inherit}button{cursor:pointer;border:1px solid var(--vie-stroke,#dce3ec);background:var(--vie-layer,#f4f6fa);color:inherit;border-radius:8px;min-height:34px;padding:5px 11px}input[type=range]{accent-color:var(--vie-accent,#5483ef);max-width:100%}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--vie-accent,#5483ef);outline-offset:3px}svg,canvas{display:block;max-width:100%;height:auto}label{display:block}.muted{color:var(--vie-muted,#718096)}.controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.card{border:1px solid var(--vie-stroke,#dce3ec);border-radius:12px;padding:12px;background:var(--vie-layer,#f4f6fa)}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}`;
// Sandboxed content only. Keep overflow scrollable without native tracks or arrow buttons.
const FIGURE_SCROLL_CSS='html,body,#vie-root,#vie-root *{scrollbar-width:none!important}html::-webkit-scrollbar,body::-webkit-scrollbar,#vie-root::-webkit-scrollbar,#vie-root *::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}';
/** Load the shipped package-local chunk through Harness; iframe networking stays disabled. */
let VIE_THREE_LIBRARY='',VIE_THREE_PENDING=null;
const needsFigureThree=spec=>/scene3d|\bTHREE\b/.test(spec.js+' '+spec.html);
function loadFigureThree(){
 if(VIE_THREE_LIBRARY)return Promise.resolve(VIE_THREE_LIBRARY);
 if(VIE_THREE_PENDING)return VIE_THREE_PENDING;
 VIE_THREE_PENDING=Promise.resolve().then(()=>{
  if(typeof require!=='function'||typeof require.async!=='function')throw Error('VIE_3D_UNAVAILABLE: this host cannot load the bundled client chunk');
  return require.async('./client.three.js');
 }).then(module=>{
  if(typeof module?.source!=='string'||!module.source.includes('WebGLRenderer'))throw Error('VIE_3D_UNAVAILABLE: bundled Three.js chunk is invalid');
  VIE_THREE_LIBRARY=module.source;return module.source;
 }).catch(error=>{VIE_THREE_PENDING=null;throw error;});
 return VIE_THREE_PENDING;
}

const FIGURE_CONTROL_CSS="/* A / neutral controls. Native views and opaque figures share this vocabulary.\n   Control colors are separate from semantic graph/data colors. */\n.vie-shell,[data-vie-runtime]{--vie-control-radius:10px;--vie-control-height:38px;--vie-control-compact:32px;--vie-control-gap:8px;--vie-control-primary:var(--vie-ink,#272c33);--vie-control-on-primary:var(--vie-bg,#fff);--vie-control-stroke:var(--vie-stroke,#e4e8ed);--vie-control-layer:color-mix(in srgb,var(--vie-ink,#272c33) 5%,var(--vie-bg,#fff));--vie-control-track:color-mix(in srgb,var(--vie-ink,#272c33) 12%,var(--vie-bg,#fff));--vie-control-focus:color-mix(in srgb,var(--vie-ink,#272c33) 65%,var(--vie-bg,#fff));--vie-control-thumb:#fff}\n.vie-shell :where(button),[data-vie-runtime] :where(button){box-sizing:border-box;font:inherit;min-height:var(--vie-control-height);border-radius:var(--vie-control-radius);padding:7px 12px;cursor:pointer;touch-action:manipulation}\n.vie-shell :is(button.vie-button,button.vie-pill,button.vie-context-button,button.vie-can-tab,button.vie-scene-button),.vie-shell :is(.vie-visual-zoom,.vie-case-tabs,.vie-animation-controls,.vie-flow-footer,.vie-flow-roots,.vie-general-chart>header)>button,[data-vie-runtime] button{appearance:none;font:500 12px/1.5 system-ui,-apple-system,\"Segoe UI\",\"Microsoft YaHei\",sans-serif;min-height:var(--vie-control-height);border:1px solid var(--vie-control-stroke);border-radius:var(--vie-control-radius);background:var(--vie-bg,#fff);color:var(--vie-ink,#272c33);padding:7px 12px;box-shadow:none;transition:background-color .12s,border-color .12s}\n.vie-shell :where(button):disabled,[data-vie-runtime] :where(button):disabled{cursor:default;opacity:.45}\n.vie-shell button:hover:not(:disabled),[data-vie-runtime] button:hover:not(:disabled){background:var(--vie-control-layer)}\n.vie-shell :is(button,input,select):focus-visible,[data-vie-runtime] :is(button,input,select):focus-visible{outline:2px solid var(--vie-control-focus);outline-offset:3px}\n.vie-shell :is(.vie-pill,.vie-button,.vie-context-button,.vie-flow-footer button,.vie-case-tabs button,.vie-scene-button):focus-visible{outline:2px solid var(--vie-control-focus);outline-offset:3px}\n.vie-shell :is([data-vie-play],.vie-scene-button.is-primary,.vie-flow-footer button.vie-flow-next),.vie-sdk-transport button:first-child,[data-vie-runtime] :is(button.primary,button[data-vie-button=primary],button.vie-question-next){background:var(--vie-control-primary);border-color:var(--vie-control-primary);color:var(--vie-control-on-primary)}\n.vie-shell :is([data-vie-play],.vie-scene-button.is-primary,.vie-flow-footer button.vie-flow-next):hover:not(:disabled),.vie-sdk-transport button:first-child:hover:not(:disabled),[data-vie-runtime] :is(button.primary,button[data-vie-button=primary],button.vie-question-next):hover:not(:disabled){background:color-mix(in srgb,var(--vie-control-primary) 88%,var(--vie-control-on-primary));border-color:transparent}\n[data-vie-runtime] button[data-vie-button=ghost]{background:transparent;border-color:transparent;color:var(--vie-muted,#7d8794)}\n[data-vie-runtime] button[data-vie-button=ghost]:hover:not(:disabled){background:var(--vie-control-layer);color:var(--vie-ink)}\n.vie-shell .vie-figure-actions button,.vie-shell .vie-context-row button{min-height:var(--vie-control-compact);font-size:12px;border-radius:var(--vie-control-radius);padding:5px 10px;color:var(--vie-muted)}\n.vie-shell .vie-segmented,.vie-shell .vie-flow-modes,[data-vie-runtime] .vie-learn-tabs{padding:3px;gap:3px;border-radius:10px;background:var(--vie-control-layer)}\n.vie-shell .vie-segmented button,.vie-shell .vie-flow-modes button,[data-vie-runtime] .vie-learn-tabs button{min-height:var(--vie-control-compact);padding:5px 10px;border:1px solid transparent;border-radius:7px;background:transparent;color:var(--vie-muted,#7d8794);font:500 12px/1.5 system-ui,-apple-system,\"Segoe UI\",\"Microsoft YaHei\",sans-serif;box-shadow:none}\n.vie-shell .vie-segmented button[aria-pressed=true],.vie-shell .vie-flow-modes button[aria-pressed=true],[data-vie-runtime] .vie-learn-tabs button[aria-selected=true]{background:var(--vie-bg,#fff);color:var(--vie-ink,#272c33);border-color:var(--vie-control-stroke);box-shadow:0 1px 3px #1420330a}\n.vie-shell .vie-case-tabs button[aria-selected=true],.vie-shell button.vie-can-tab.active,.vie-shell button.vie-pill.selected,[data-vie-runtime] .vie-sdk-toolbar button[aria-pressed=true]{background:var(--vie-control-layer);border-color:var(--vie-control-primary);color:var(--vie-ink,#272c33)}\n.vie-shell :is(select,input[type=number]),[data-vie-runtime] :is(select,input[type=number]){box-sizing:border-box;max-width:100%;min-width:0;min-height:var(--vie-control-height);border:1px solid var(--vie-control-stroke);border-radius:var(--vie-control-radius);background:var(--vie-bg,#fff);color:var(--vie-ink,#272c33);font:400 13px/1.5 system-ui,-apple-system,\"Segoe UI\",\"Microsoft YaHei\",sans-serif;padding:7px 10px;font-variant-numeric:tabular-nums}\n.vie-shell input[type=number],[data-vie-runtime] input[type=number]{appearance:textfield;-moz-appearance:textfield}\n.vie-shell input[type=number]::-webkit-inner-spin-button,.vie-shell input[type=number]::-webkit-outer-spin-button,[data-vie-runtime] input[type=number]::-webkit-inner-spin-button,[data-vie-runtime] input[type=number]::-webkit-outer-spin-button{appearance:none;margin:0}\n.vie-shell input[type=range],[data-vie-runtime] input[type=range]{appearance:none;-webkit-appearance:none;box-sizing:border-box;display:block;width:100%;max-width:100%;height:24px;min-height:24px;padding:0;margin:0;background:transparent;cursor:pointer;touch-action:pan-y;accent-color:var(--vie-control-primary)}\n.vie-shell input[type=range]::-webkit-slider-runnable-track,[data-vie-runtime] input[type=range]::-webkit-slider-runnable-track{height:4px;border-radius:999px;background:linear-gradient(to right,var(--vie-control-primary) var(--vie-range-fill,0%),var(--vie-control-track) var(--vie-range-fill,0%))}\n.vie-shell input[type=range]::-moz-range-track,[data-vie-runtime] input[type=range]::-moz-range-track{height:4px;border-radius:999px;background:var(--vie-control-track)}\n.vie-shell input[type=range]::-moz-range-progress,[data-vie-runtime] input[type=range]::-moz-range-progress{height:4px;border-radius:999px;background:var(--vie-control-primary)}\n.vie-shell input[type=range]::-webkit-slider-thumb,[data-vie-runtime] input[type=range]::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:14px;height:14px;margin-top:-5px;border-radius:50%;border:1px solid var(--vie-control-stroke);background:var(--vie-control-thumb);box-shadow:0 1px 4px #10182826}\n.vie-shell input[type=range]::-moz-range-thumb,[data-vie-runtime] input[type=range]::-moz-range-thumb{width:14px;height:14px;border-radius:50%;border:1px solid var(--vie-control-stroke);background:var(--vie-control-thumb);box-shadow:0 1px 4px #10182826}\n.vie-shell :is(input[type=range],input[type=number],select):disabled,[data-vie-runtime] :is(input[type=range],input[type=number],select):disabled{opacity:.45;cursor:default}\n.vie-shell :is(input[type=checkbox],input[type=radio]),[data-vie-runtime] :is(input[type=checkbox],input[type=radio]){accent-color:var(--vie-control-primary)}\n.vie-shell input[type=checkbox][role=switch],[data-vie-runtime] input[type=checkbox][role=switch]{appearance:none;-webkit-appearance:none;position:relative;display:inline-block;width:34px;height:20px;min-width:34px;min-height:20px;padding:0;margin:0;border:0;border-radius:999px;background:var(--vie-control-track);cursor:pointer;vertical-align:middle}\n.vie-shell input[type=checkbox][role=switch]::before,[data-vie-runtime] input[type=checkbox][role=switch]::before{content:\"\";position:absolute;left:3px;top:3px;width:14px;height:14px;border-radius:50%;background:var(--vie-control-thumb);box-shadow:0 1px 3px #10182820;transition:transform .14s}\n.vie-shell input[type=checkbox][role=switch]:checked,[data-vie-runtime] input[type=checkbox][role=switch]:checked{background:var(--vie-control-primary)}\n.vie-shell input[type=checkbox][role=switch]:checked::before,[data-vie-runtime] input[type=checkbox][role=switch]:checked::before{transform:translateX(14px);background:var(--vie-control-on-primary)}\n.vie-shell input[type=checkbox][role=switch]:disabled,[data-vie-runtime] input[type=checkbox][role=switch]:disabled{opacity:.45;cursor:default}\n.vie-sdk-viewport{max-width:100%;overflow:auto;overscroll-behavior:contain;border-radius:12px}\n.vie-sdk-viewport[data-vie-pannable=true]::after{content:'左右滑动查看完整图形';display:block;position:sticky;left:0;width:100%;font-size:12px;color:var(--vie-muted,#718096);padding:4px 0;text-align:center}\n.vie-sdk-transport{display:flex;flex-wrap:wrap;align-items:center;gap:var(--vie-control-gap);margin-top:12px}\n.vie-sdk-transport input[type=range]{flex:1 1 140px;min-width:80px;max-width:100%}\n.vie-sdk-canvas{display:block;max-width:100%}\n.vie-sdk-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:var(--vie-control-gap);margin-block:10px}\n.vie-sdk-readouts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(120px,100%),1fr));gap:8px;margin:10px 0}\n.vie-sdk-readouts>div{min-width:0;border:1px solid var(--vie-stroke);border-radius:var(--vie-control-radius);padding:10px 12px;background:var(--vie-bg,#fff)}\n.vie-sdk-readouts dt{font-size:12px;color:var(--vie-muted,#718096);overflow-wrap:anywhere}\n.vie-sdk-readouts dd{margin:4px 0 0;font-variant-numeric:tabular-nums;font-weight:600;overflow-wrap:anywhere}\n[data-vie-runtime] .vie-question-option{min-height:44px;padding:10px 12px;border-radius:var(--vie-control-radius);font-size:14px;text-align:left}\n[data-vie-runtime] .vie-question-option:disabled{opacity:1}\n[data-vie-runtime] .vie-question-option.is-correct{border-color:var(--vie-secondary);background:color-mix(in srgb,var(--vie-secondary) 12%,var(--vie-bg))}\n[data-vie-runtime] .vie-question-option.is-wrong{border-color:var(--vie-warning);background:color-mix(in srgb,var(--vie-warning) 12%,var(--vie-bg))}\n[data-vie-runtime] .vie-question-progress{accent-color:var(--vie-control-primary)}\n.vie-sdk-3d{position:relative;width:100%;max-width:100%;overflow:hidden;border-radius:12px;background:var(--vie-layer,#f4f6fa)}.vie-sdk-3d canvas{display:block;width:100%;height:100%;max-width:100%}\n@media(pointer:coarse){.vie-shell,[data-vie-runtime]{--vie-control-height:44px;--vie-control-compact:44px}}\n@media(max-width:440px){.vie-sdk-transport{gap:6px}.vie-sdk-transport button{flex:1}.vie-sdk-transport input[type=range]{flex-basis:100%}}\n@media(prefers-reduced-motion:reduce){.vie-shell input[role=switch]::before,[data-vie-runtime] input[role=switch]::before{transition:none}}\n";
function buildFigureDocument(raw,{channel,state,theme}){
  const spec=validateFigureDefinition(raw,true),safeScript=x=>x.replace(/<\/script/gi,'<\\/script');
  const settings=JSON.stringify({channel,title:spec.title,state:validateFigureState(state??spec.state),theme,staticSvg:!spec.js.trim()&&!spec.preview,preview:!!spec.preview,previewHtml:spec.preview?spec.html:undefined,previewCss:spec.preview?spec.css:undefined}).replace(/</g,'\\u003c');
  const library=/scene3d|\bTHREE\b/.test(spec.js+' '+spec.html)?'<script>'+safeScript(VIE_THREE_LIBRARY)+'</script>':'';
  const csp="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; media-src data: blob:; connect-src 'none'; object-src 'none'; frame-src 'none'; worker-src 'none'; base-uri 'none'; form-action 'none'";
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${csp}"><style>${FIGURE_BASE_CSS}\n.vie-learn{border:0;border-radius:0;padding:0;display:grid;gap:12px}.vie-learn-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.vie-learn-heading small,.vie-learn-note{color:var(--vie-muted);font-size:12px}.vie-learn-panel{min-width:0;overflow:auto}.vie-learn-panel svg{width:100%;display:block}.vie-learn-tabs{display:flex;gap:8px;flex-wrap:wrap}.vie-learn-tabs button{flex:1 1 120px;border-radius:999px;background:transparent;color:var(--vie-ink);border:1px solid var(--vie-stroke);font-size:13px;min-height:38px}.vie-learn-tabs button[aria-selected=true]{background:var(--vie-ink);color:var(--vie-bg);border-color:var(--vie-ink)}.vie-learn-description{background:var(--vie-layer);border-radius:14px;padding:12px}.vie-learn-description p{margin:4px 0 0;font-size:14px}.vie-learn-quiz{border:0;min-width:0;margin:0;padding:0}.vie-learn-quiz legend{font-weight:600;margin-bottom:12px}.vie-learn-choices{display:grid;gap:12px}.vie-learn-choices label{display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:14px}.vie-learn-choices input{flex:none;accent-color:var(--vie-primary)}.vie-learn-feedback{margin-top:14px;border-radius:12px;padding:12px;background:var(--vie-layer)}.vie-learn-feedback[data-correct=true]{border-left:3px solid var(--vie-secondary)}.vie-learn-feedback[data-correct=false]{border-left:3px solid var(--vie-warning)}@media(max-width:440px){.vie-learn{padding:0}.vie-learn-tabs button{flex-basis:88px;font-size:13px}.vie-learn-panel>svg{width:100%;height:auto}}\n.vie-questions{display:grid;gap:12px}.vie-question-top{display:flex;justify-content:space-between;gap:8px}.vie-question-pill{font-size:12px;border-radius:999px;padding:3px 10px;background:var(--vie-layer);color:var(--vie-muted)}.vie-question-progress{width:100%;height:5px;accent-color:var(--vie-primary)}.vie-question-stem{margin:0;font-size:16px;line-height:1.65}.vie-question-options{display:grid;gap:8px}.vie-question-option{display:flex;align-items:center;gap:10px;text-align:left;width:100%;min-height:44px;border-radius:10px;background:var(--vie-bg);border:1px solid var(--vie-stroke);padding:10px 12px}.vie-question-letter{display:grid;place-items:center;flex:none;width:24px;height:24px;border-radius:6px;background:var(--vie-layer);font-weight:600}.vie-question-option.is-correct{border-color:var(--vie-secondary);background:color-mix(in srgb,var(--vie-secondary) 12%,var(--vie-bg))}.vie-question-option.is-wrong{border-color:var(--vie-warning);background:color-mix(in srgb,var(--vie-warning) 12%,var(--vie-bg))}.vie-question-feedback{border-left:3px solid var(--vie-primary);background:var(--vie-layer);padding:10px 12px;font-size:14px}.vie-question-feedback p{margin:5px 0 0}.vie-question-foot{display:flex;justify-content:flex-end}.vie-question-next{background:var(--vie-primary);color:var(--vie-bg);border:0;padding:8px 16px}.vie-question-next:disabled{opacity:.45;cursor:not-allowed}.vie-question-result{font-size:40px;color:var(--vie-primary)}\n${FIGURE_CONTROL_CSS}\n${FIGURE_SCROLL_CSS}</style><style id="vie-user-style">${spec.css.replace(/<\/style/gi,'<\\/style')}</style>${library}<script>(${safeScript(figureBootstrap.toString())})(${settings});</script></head><body><div id="vie-root">${spec.preview?'':spec.html}</div><script>${safeScript(spec.preview?'':spec.js)}</script></body></html>`;
}
function mountGeneratedFigure(frame,raw,options={}){
  let spec=validateFigureDefinition(raw,true);const win=frame.ownerDocument.defaultView;
  let state=validateFigureState(options.initialState??spec.state),channel='',disposed=false,lastMessage=0,burst=0,criticalBurst=0,pendingState=null,stateTimer=0;
  let loaded=false,startedPreview=false,fallbackMode=false,loadGeneration=0;const started=win.performance?.now?.()??Date.now(),metrics={previewMs:null,readyMs:null,visibleMs:null,errors:0};
  const elapsed=()=>Math.round(((win.performance?.now?.()??Date.now())-started)*100)/100;
  const shell=frame.closest('.vie-shell');
  const theme=()=>{
    const css=win.getComputedStyle(shell??frame),explicit=frame.ownerDocument.documentElement.dataset.theme??(frame.ownerDocument.body.classList.contains('dark')?'dark':null);
    return {mode:explicit??(win.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),reducedMotion:win.matchMedia('(prefers-reduced-motion: reduce)').matches,
      colors:Object.fromEntries([['bg','--vie-bg','#fff'],['ink','--vie-ink','#243044'],['muted','--vie-muted','#718096'],['stroke','--vie-stroke','#dce3ec'],['layer','--vie-layer','#f4f6fa'],['accent','--vie-accent','#d58b16'],['primary','--vie-primary','#4d82d6'],['secondary','--vie-secondary','#149f91'],['warning','--vie-warning','#cf6854']].map(([k,token,fallback])=>[k,css.getPropertyValue(token).trim()||fallback]))};
  };
  const send=(type,value)=>{if(!disposed)frame.contentWindow?.postMessage({v:1,channel,type,value},'*');};
  const content=()=>{if(!loaded||!startedPreview||fallbackMode)return;if(needsFigureThree(spec)&&!VIE_THREE_LIBRARY){const generation=loadGeneration;loadFigureThree().then(()=>{if(!disposed&&generation===loadGeneration)content();}).catch(error=>{if(!disposed&&generation===loadGeneration){frame.dataset.vieStatus='error';options.onError?.(error.message);}});return;}if(spec.preview)send('preview',spec);else{startedPreview=false;frame.dataset.vieStatus='loading';send('finalize',{...spec,state,.../scene3d|\bTHREE\b/.test(spec.js+' '+spec.html)?{library:VIE_THREE_LIBRARY}:{}});}};
  const load=()=>{const generation=++loadGeneration;const sourceSpec=fallbackMode?{...spec,preview:true,js:''}:spec;if(stateTimer)win.clearTimeout(stateTimer);stateTimer=0;pendingState=null;lastMessage=0;burst=0;criticalBurst=0;loaded=false;startedPreview=!!sourceSpec.preview;channel='vie-'+(++svgScopeSequence)+'-'+Math.random().toString(36).slice(2);frame.dataset.vieReady='false';frame.dataset.vieStatus='loading';if(!fallbackMode)options.onError?.('');try{if(needsFigureThree(sourceSpec)&&!VIE_THREE_LIBRARY){loadFigureThree().then(()=>{if(!disposed&&generation===loadGeneration)load();}).catch(error=>{if(!disposed&&generation===loadGeneration){frame.dataset.vieStatus='error';options.onError?.(error.message);}});return;}validateSDKCalls(sourceSpec.js);frame.srcdoc=buildFigureDocument(sourceSpec,{channel,state,theme:theme()});}catch(error){frame.srcdoc='';frame.dataset.vieStatus='error';frame.dataset.vieReady='false';options.onError?.(error.message);}};
  const onMessage=event=>{
    if(disposed||!channel||event.source!==frame.contentWindow||event.data?.channel!==channel||event.data?.v!==1)return;
    const {type,value}=event.data;
    if(!['state','height','ready','painted','error'].includes(type))return;
    const now=Date.now();if(now-lastMessage>1000){lastMessage=now;burst=0;criticalBurst=0;}
    if(type==='ready'||type==='error'){if(++criticalBurst>16)return;}
    else if(++burst>60){
      if(type==='state'){
        pendingState=event;
        if(!stateTimer)stateTimer=win.setTimeout(()=>{stateTimer=0;const latest=pendingState;pendingState=null;if(latest)onMessage(latest);},Math.max(1,1001-(now-lastMessage)));
      }
      return;
    }else if(type==='state'&&pendingState){pendingState=null;if(stateTimer){win.clearTimeout(stateTimer);stateTimer=0;}}
    if(type==='height'&&value&&[value.height,value.width,value.viewport].every(v=>typeof v==='number'&&Number.isFinite(v)&&v>=0)){
      if(Array.isArray(value.layoutWarnings))options.onWarnings?.(value.layoutWarnings.slice(0,4).filter(item=>item&&typeof item.code==='string'&&typeof item.message==='string').map(item=>({code:item.code.slice(0,40),message:item.message.slice(0,120)})));
      frame.dataset.vieSmallText=String(Number.isFinite(value.minFont)&&value.minFont>0&&value.minFont<11);
      if(Number.isFinite(value.minFont))frame.dataset.vieMinFont=String(value.minFont);
      frame.style.height=Math.min(10000,Math.max(160,value.height))+'px';frame.dataset.vieOverflow=String(value.width>value.viewport+2);frame.dataset.vieContentWidth=String(value.width);frame.dataset.vieViewportWidth=String(value.viewport);frame.dataset.vieContentHeight=String(value.height);
    }
    if(type==='painted'&&!fallbackMode&&frame.dataset.vieStatus!=='error'){metrics.visibleMs??=elapsed();frame.dataset.vieVisibleMs=String(metrics.visibleMs);options.onVisible?.({...metrics});}
    if(type==='state')try{const clean=validateFigureState(value);options.onChange?.(clean);state=validateFigureState(options.currentState?.()??clean);send('state',state);}catch(error){send('state',state);options.onError?.('交互状态无效：'+error.message);}
    if(type==='error'&&typeof value==='string'){metrics.errors++;frame.dataset.vieReady='false';frame.dataset.vieStatus='error';options.onError?.(value.slice(0,1200));}
    if(type==='ready'){loaded=true;const preview=value?.preview===true,ok=value?.ok!==false&&frame.dataset.vieStatus!=='error';if(preview){if(ok){metrics.previewMs??=elapsed();frame.dataset.viePreviewMs=String(metrics.previewMs);}frame.dataset.vieReady='false';frame.dataset.vieStatus=ok?(fallbackMode?'fallback':'preview'):'error';if(ok&&!fallbackMode){options.onPreview?.({...metrics});content();}else if(!ok&&!spec.preview&&!fallbackMode)load();}else{if(ok){metrics.readyMs??=elapsed();frame.dataset.vieReadyMs=String(metrics.readyMs);}frame.dataset.vieReady=String(ok);frame.dataset.vieStatus=ok?'ready':'error';if(ok)options.onReady?.({...metrics});}send('theme',theme());send('state',state);visibility();}
  };
  const onTheme=()=>send('theme',theme());
  const observer=new win.MutationObserver(onTheme);
  observer.observe(frame.ownerDocument.documentElement,{attributes:true,attributeFilter:['class','data-theme','style']});
  observer.observe(frame.ownerDocument.body,{attributes:true,attributeFilter:['class','data-theme','style']});
  const media=win.matchMedia('(prefers-reduced-motion: reduce)'),colorMedia=win.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change',onTheme);colorMedia.addEventListener('change',onTheme);
  let intersecting=true;
  const visibility=()=>send('visibility',!frame.ownerDocument.hidden&&intersecting);
  frame.ownerDocument.addEventListener('visibilitychange',visibility);
  const intersection=win.IntersectionObserver?new win.IntersectionObserver(entries=>{intersecting=!!entries[0]?.isIntersecting;visibility();}):null;
  intersection?.observe(frame);win.addEventListener('message',onMessage);frame.addEventListener('load',onTheme);load();
  return {snapshot:()=>validateFigureState(state),metrics:()=>({...metrics}),revise(next){
    const checked=validateFigureDefinition(next,true);
    if(disposed||JSON.stringify(checked)===JSON.stringify(spec))return;
    const wasPreview=!!spec.preview;fallbackMode=false;spec=checked;
    try{validateSDKCalls(spec.js);}catch(error){
      // A rejected definition still retires the preceding executable frame.
      // Its queued messages and pending library loads belong to an old revision.
      loadGeneration++;channel='';loaded=false;startedPreview=false;
      if(stateTimer)win.clearTimeout(stateTimer);stateTimer=0;pendingState=null;
      frame.srcdoc='';frame.dataset.vieStatus='error';frame.dataset.vieReady='false';
      options.onError?.(error.message);return;
    }
    if(wasPreview){state=validateFigureState(options.currentState?.()??spec.state);if(frame.dataset.vieStatus==='error'){load();return;}content();return;}
    state=validateFigureState(options.currentState?.()??spec.state);load();
  },update(value){const clean=validateFigureState(value);if(JSON.stringify(state)===JSON.stringify(clean))return;state=clean;send('state',state);},showStaticPreview(){if(disposed)return;fallbackMode=true;load();},reset(){fallbackMode=false;state=validateFigureState(spec.state);options.onChange?.(state);load();},dispose(){if(disposed)return;disposed=true;loadGeneration++;if(stateTimer)win.clearTimeout(stateTimer);stateTimer=0;pendingState=null;win.removeEventListener('message',onMessage);frame.removeEventListener('load',onTheme);observer.disconnect();intersection?.disconnect();media.removeEventListener('change',onTheme);colorMedia.removeEventListener('change',onTheme);frame.ownerDocument.removeEventListener('visibilitychange',visibility);frame.srcdoc='';}};
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
    for(const c of visibleControls){root.querySelector(`[data-chart-value="${c.key}"]`).textContent=concise(values[c.key]);for(const el of root.querySelectorAll(`[data-chart-key="${c.key}"]`)){if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',String(Number(el.value)===values[c.key]));else if(el.type==='checkbox')el.checked=values[c.key]===1;else if(el!==root.ownerDocument.activeElement)el.value=values[c.key];updateRangePresentation(el);}}
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
/** Rank by declared edges, never by the authoring array. SVG keeps full labels in accessible names. */
function flowSVG(spec,selected,compact=false){
  const graph=layoutFlow(spec),horizontal=spec.layout==='horizontal'||!compact&&spec.layout!=='vertical'&&graph.rows.length===spec.nodes.length&&spec.nodes.length<=4;
  const columns=Math.max(...graph.rows.map(r=>r.length)),margin=compact?20:30,h=compact?78:60,gap=compact?50:54;
  const nodeWidth=horizontal?(compact?118:142):columns===1?(compact?246:280):(compact?Math.max(84,Math.min(110,(320-margin*2-(columns-1)*12)/columns)):Math.max(154,Math.min(194,(680-margin*2-(columns-1)*24)/columns)));
  const W=horizontal?Math.max(compact?320:680,graph.rows.length*(nodeWidth+26)+margin*2-26):Math.max(compact?320:680,columns*nodeWidth+(columns-1)*(compact?12:24)+margin*2);
  const H=horizontal?Math.max(160,columns*(h+gap)+margin*2-gap):graph.rows.length*(h+gap)+margin*2-gap;
  const locations=new Map(),tones=new Map();
  graph.rows.forEach((row,r)=>row.forEach((id,i)=>{const w=horizontal?nodeWidth:row.length===1?(compact?246:280):Math.max(compact?84:154,Math.min(compact?144:194,(W-margin*2-(row.length-1)*(compact?12:24))/row.length));const x=horizontal?(W-graph.rows.length*w-(graph.rows.length-1)*26)/2+r*(w+26):(W-row.length*w-(row.length-1)*(compact?12:24))/2+i*(w+(compact?12:24));const y=horizontal?(H-row.length*h-(row.length-1)*gap)/2+i*(h+gap):margin+r*(h+gap);locations.set(id,{x,y,w,h});tones.set(id,row.length>1?['primary','secondary','accent'][i%3]:'muted');}));
  const edges=spec.edges.map((edge,i)=>{
    const a=locations.get(edge.from),b=locations.get(edge.to),ax=a.x+a.w/2,ay=a.y+a.h/2,bx=b.x+b.w/2,by=b.y+b.h/2;
    let path,lx,ly,lw=compact?72:116;
    if(edge.from===edge.to){const x=a.x+a.w,reach=Math.max(8,Math.min(compact?42:68,W-x-6));path=`M${x} ${ay-14}C${x+reach} ${ay-52} ${x+reach} ${ay+52} ${x} ${ay+14}`;lx=x+reach*.5;ly=ay;lw=Math.min(lw,Math.max(28,reach));}
    else if(graph.ranks[edge.to]<=graph.ranks[edge.from]){const rail=8+(i%3)*5;path=`M${a.x} ${ay}H${rail}V${by}H${b.x}`;lx=rail+Math.min(lw/2,32);ly=(ay+by)/2;lw=compact?60:86;}
    else if(horizontal){const sx=a.x+a.w,ex=b.x,mx=(sx+ex)/2;path=`M${sx} ${ay}H${mx}V${by}H${ex}`;lx=mx;ly=(ay+by)/2-9;lw=compact?62:96;}
    else{const sy=a.y+a.h,ey=b.y,middle=(sy+ey)/2;path=`M${ax} ${sy}V${middle}H${bx}V${ey}`;lx=ax===bx?ax+Math.min(lw/2+6,78):bx;ly=middle-8;}
    const label=edge.label?`<g class="vie-flow-edge-label"><title>${esc(edge.label)}</title>${wrappedText(lx,ly,edge.label,lw,compact?11:11.5,2,'fill="var(--vie-muted,#788698)" stroke="var(--vie-bg,#fff)" stroke-width="3" paint-order="stroke" stroke-linejoin="round"')}</g>`:'';
    return `<path data-vie-flow-edge="${i}" ${edge.from===edge.to?'data-vie-self-loop="true"':''} d="${path}" fill="none" stroke="var(--vie-flow-line,#bdc9dc)" stroke-width="1.5" stroke-linejoin="round" ${edge.kind==='line'?'':'marker-end="url(#vie-arrow-head)"'}><title>${esc(edge.label??'')}</title></path>${label}`;
  }).join('');
  const cards=spec.nodes.map(n=>{const r=locations.get(n.id),tone=n.role&&n.role!=='default'&&n.role!=='neutral'?roleTone[n.role]:tones.get(n.id),active=n.id===selected;return `<g data-vie-item="${esc(n.id)}" data-vie-flow-rank="${graph.ranks[n.id]}" tabindex="0" role="button" aria-pressed="${active}" aria-label="${esc(n.label)}" class="vie-svg-item${active?' is-active':''}"><title>${esc(n.label)}</title><rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="11" fill="${bg(tone)}" stroke="${active?color(tone):'var(--vie-stroke,#dce2eb)'}" stroke-width="${active?2:1.2}"/>${wrappedText(r.x+r.w/2,r.y+r.h/2+4,n.label,r.w,compact?12:14,3,`font-weight="600" fill="${tone==='muted'?'var(--vie-ink,#35435a)':color(tone)}"`)}</g>`;}).join('');
  return svgOpen(W,H,spec.title).replace('class="vie-visual-svg"',`class="vie-visual-svg vie-flow-svg ${compact?'vie-visual-mobile-svg':'vie-visual-desktop-svg'}" style="min-width:${W}px"`)+edges+cards+'</svg>';
}
function flowMarkup(spec,selected,input){
  const state=validateFlowState(spec,input),current=spec.nodes.find(n=>n.id===state.history.at(-1)),nodes=new Map(spec.nodes.map(n=>[n.id,n]));
  const mode=`<div class="vie-flow-modes" role="group" aria-label="流程图阅读方式"><button type="button" data-vie-flow-action="overview" aria-pressed="${state.presentation==='overview'}">全景总览</button><button type="button" data-vie-flow-action="guided" aria-pressed="${state.presentation==='guided'}">逐步引导</button></div>`;
  const head=`<header class="vie-flow-heading"><div><strong>${esc(spec.title)}</strong>${spec.subtitle?`<p>${esc(spec.subtitle)}</p>`:''}</div>${mode}</header>`;
  if(state.presentation==='overview'){
    const tree=wideFlowTree(spec);
    const found=nodes.get(selected),info=found?`<aside class="vie-flow-detail" role="status"><strong>${esc(found.label)}</strong><span>${esc(found.detail??'已选中此节点；连线表示声明的关系。')}</span></aside>`:'<p class="vie-visual-hint">点击节点查看说明 · 并列分支按连线关系排列</p>';
    return `<section class="vie-visual-panel vie-flow-panel" data-vie-visual="Flow" data-vie-flow-presentation="overview">${head}<div class="vie-visual-content vie-flow-scroll" tabindex="0" aria-label="流程图；宽图可横向滚动查看">${tree?flowTreeMarkup(spec,selected,tree):flowSVG(spec,selected)+flowSVG(spec,selected,true)}</div>${info}</section>`;
  }
  const outgoing=spec.edges.filter(e=>e.from===current.id),choice=state.choice??(outgoing.length===1?outgoing[0].to:undefined),target=nodes.get(choice),finished=outgoing.length===0,limited=state.history.length>=64;
  const history=`<nav class="vie-flow-rail" aria-label="已走过的流程路径">${state.history.map((id,i)=>`<button type="button" data-vie-flow-action="seek" data-vie-flow-index="${i}" ${i===state.history.length-1?'aria-current="step"':''}><span>${i+1}</span><span>${esc(nodes.get(id).label)}</span></button>`).join('')}</nav>`;
  const roots=layoutFlow(spec).roots,rootChoices=roots.length>1&&state.history.length===1?`<div class="vie-flow-roots" role="group" aria-label="选择流程起点">${roots.map(id=>`<button type="button" data-vie-flow-action="root" data-vie-flow-target="${esc(id)}" aria-pressed="${id===current.id}">${esc(nodes.get(id).label)}</button>`).join('')}</div>`:'';
  const options=outgoing.length?`<div class="vie-flow-choices" role="group" aria-label="选择下一条路径">${outgoing.map((edge,i)=>`<button type="button" data-vie-flow-action="choice" data-vie-flow-target="${esc(edge.to)}" aria-pressed="${choice===edge.to}"><span><strong>${esc(edge.label||nodes.get(edge.to).label)}</strong>${edge.label?`<small>${esc(nodes.get(edge.to).label)}</small>`:''}</span><span class="vie-flow-choice-mark" aria-hidden="true">${choice===edge.to?'✓':'→'}</span></button>`).join('')}</div>`:'';
  const preview=target?`<div class="vie-flow-result" aria-live="polite"><strong>下一步：${esc(target.label)}</strong>${target.detail?`<p>${esc(target.detail)}</p>`:''}</div>`:'';
  return `<section class="vie-visual-panel vie-flow-panel" data-vie-visual="Flow" data-vie-flow-presentation="guided">${head}<div class="vie-flow-guided">${history}<div class="vie-flow-work">${rootChoices}<h3 data-vie-flow-current tabindex="-1">${esc(current.label)}</h3>${current.detail?`<p class="vie-flow-description">${esc(current.detail)}</p>`:''}${options}${preview}${finished?'<p class="vie-flow-terminal" role="status">当前路径已到终点，可返回查看其他分支。</p>':''}${limited&&!finished?'<p class="vie-flow-terminal" role="status">已记录 64 步，请重新开始查看；没有自动跳过循环。</p>':''}<footer class="vie-flow-footer"><span>已查看 ${state.history.length} 个节点</span><div><button type="button" data-vie-flow-action="back" ${state.history.length<2?'disabled':''}>上一步</button>${finished||limited?'<button type="button" data-vie-flow-action="restart">重新开始</button>':`<button type="button" class="vie-flow-next" data-vie-flow-action="next" ${!choice?'disabled':''}>下一步 →</button>`}</div></footer></div></div></section>`;
}
/** CSS tree connections follow parent groups; conditions live inside their own node card. */
function flowTreeMarkup(spec,selected,tree){
  const nodes=new Map(spec.nodes.map(n=>[n.id,n]));
  const draw=(id,incoming,depth,tone='primary')=>{
    const node=nodes.get(id),children=tree.children.get(id),split=depth===0&&children.length>1&&children.length<=3,hasCondition=!!incoming?.label,different=hasCondition&&incoming.label!==node.label;
    const condition=different?`<span class="vie-flow-tree-condition" data-vie-flow-condition>${esc(incoming.label)}</span>`:'';
    const childList=children.length?`<ul class="vie-flow-tree-children ${split?'is-split':'is-stack'}" style="--vie-flow-columns:${children.length}">${children.map((e,i)=>draw(e.to,e,depth+1,depth===0?['primary','secondary','accent'][i%3]:tone)).join('')}</ul>`:'';
    return `<li class="vie-flow-tree-node${depth===0?' is-root':''}${split?' has-split':''}" data-vie-flow-node="${esc(id)}" ${incoming?`data-vie-flow-edge="${incoming.index}" data-vie-flow-parent="${esc(incoming.from)}"`:''} style="--vie-flow-branch:${color(tone)}"><button type="button" data-vie-item="${esc(id)}" class="vie-flow-tree-card" aria-pressed="${id===selected}" aria-label="${esc(node.label)}">${condition}<strong ${hasCondition&&!different?'data-vie-flow-condition':''}>${esc(node.label)}</strong></button>${childList}</li>`;
  };
  return `<div class="vie-flow-tree" role="group" aria-label="按父分支分组的完整流程"><ul class="vie-flow-tree-roots">${tree.roots.map(id=>draw(id,null,0)).join('')}</ul></div>`;
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
function makeVisualMarkup(kind,input,selected='',values={},flowState){
  const s=resolveVisual(input,kind,values);
  const selectedId=kind==='Timeline'?s.items.find(i=>i.id===selected)?.id:(kind==='Diagram'||kind==='Animation')?s.shapes.find(i=>i.id===selected)?.id:s.nodes.find(i=>i.id===selected)?.id;
  const chosen=selectedId||'';
  let visual='';
  if(kind==='Flow')return flowMarkup(s,chosen,flowState);
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
    this.revision=0;this.listeners=new Set();this.lastError=null;this.localState=Object.create(null);this.figureErrors=Object.create(null);this.figureStatuses=Object.create(null);this.figureMetrics=Object.create(null);
    if(source)this.updateSource(source);
  }
  subscribe(listener){if(typeof listener!=='function')throw Error('Listener required');this.listeners.add(listener);return ()=>this.listeners.delete(listener);}
  getVersion(){return this.version;}
  snapshot(){return {...this.parser.snapshot(),revision:this.revision,storeError:this.lastError};}
  context(){const summary=this.parser.interactionContext(),experiments={},figures={};for(const node of this.parser.scene.nodes.values()){if(node.type==='InteractiveScene')experiments[node.id]=experimentContext(node.props,this.localState[node.id]);if(node.type==='Chart')figures[node.id]={title:node.props.title,state:this.local(node.id)??validateChartState(node.props)};if(node.type==='GenerativeFigure')figures[node.id]={title:node.props.title,state:this.local(node.id)??node.props.state};}return {...summary,revision:this.revision,interactiveState:copyValue(this.localState),experiments,figures,figureErrors:{...this.figureErrors},figureStatuses:{...this.figureStatuses},figureMetrics:copyValue(this.figureMetrics)};}
  setFigureError(nodeId,message){const status=message?'error':'loading';if(this.figureErrors[nodeId]===(message||undefined)&&this.figureStatuses[nodeId]===status)return;if(message){this.figureErrors[nodeId]=String(message).slice(0,1200);}else{delete this.figureErrors[nodeId];delete this.figureMetrics[nodeId];}this.figureStatuses[nodeId]=status;this.emit();}
  setFigureProgress(nodeId,status,metrics={}){if(!['preview','ready'].includes(status))return;if(this.figureStatuses[nodeId]==='ready'&&status==='preview')return;const clean={};for(const key of ['previewMs','readyMs','visibleMs'])if(Number.isFinite(metrics[key])&&metrics[key]>=0)clean[key]=metrics[key];if(this.figureStatuses[nodeId]===status&&JSON.stringify(this.figureMetrics[nodeId])===JSON.stringify(clean))return;this.figureStatuses[nodeId]=status;this.figureMetrics[nodeId]=clean;if(status==='ready')delete this.figureErrors[nodeId];this.emit();}
  setFigureReady(nodeId,metrics){this.setFigureProgress(nodeId,'ready',metrics);}
  emit(){this.version++;for(const cb of this.listeners)cb();}
  modifiedValues(){const result=Object.create(null);for(const path of this.parser.modified){if(own(this.parser.scene.state,path))result[path]=this.parser.scene.state[path];}return result;}
  reconcileLocal(parser){
    const next=Object.create(null);
    for(const [id,value] of Object.entries(this.localState)){
      const node=parser.scene.nodes.get(id),previous=this.parser.scene.nodes.get(id);
      if(!node||node.type!==previous?.type)continue;
      try{if(node.type==='GenerativeFigure'&&JSON.stringify(previous.props)!==JSON.stringify(node.props))continue;next[id]=node.type==='GenerativeFigure'?validateFigureState(value):node.type==='Chart'?validateChartState(node.props,value):node.type==='InteractiveScene'?validateExperimentSnapshot(node.props,value):node.type==='Flow'?validateFlowState(node.props,value):copyValue(value);}catch{/* A replacement definition can invalidate old interactive inputs. */}
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
    const unchanged=id=>sameScene&&parser.scene.nodes.get(id)?.type==='GenerativeFigure'&&JSON.stringify(this.parser.scene.nodes.get(id)?.props)===JSON.stringify(parser.scene.nodes.get(id)?.props);this.figureErrors=Object.fromEntries(Object.entries(this.figureErrors).filter(([id])=>unchanged(id)));this.figureStatuses=Object.fromEntries(Object.entries(this.figureStatuses).filter(([id])=>unchanged(id)));this.figureMetrics=Object.fromEntries(Object.entries(this.figureMetrics).filter(([id])=>unchanged(id)));this.source=source;this.parser=parser;this.lastError=null;this.revision++;this.emit();return true;
  }
  local(nodeId){const node=this.parser.scene.nodes.get(nodeId),computed=this.parser.snapshot().values;if(node?.type==='GenerativeFigure'&&node.props.bindings)return validateFigureState({...node.props.state,...(this.localState[nodeId]??{}),...Object.fromEntries(Object.entries(node.props.bindings).map(([key,path])=>[key,Number.isFinite(computed[path])?computed[path]:null]))});if(node?.type==='Chart'&&(node.props.controls.some(c=>c.bind)||(node.props.inputs??[]).length))return validateChartState(node.props,{...(this.localState[nodeId]??{}),...Object.fromEntries([...node.props.controls.filter(c=>c.bind),...(node.props.inputs??[])].map(c=>[c.key,Object.hasOwn(computed,c.bind)?computed[c.bind]:NaN]))});return own(this.localState,nodeId)?copyValue(this.localState[nodeId]):null;}
  setLocal(nodeId,value){
    const node=this.parser.scene.nodes.get(nodeId);
    if(!node||!['CanTimingLab','InteractiveLab','InteractiveScene','GenerativeFigure','Chart','Flow'].includes(node.type))throw Error('Unknown interactive node');
    if(node.type==='Flow'){const clean=validateFlowState(node.props,value);if(JSON.stringify(this.localState[nodeId])===JSON.stringify(clean))return;this.localState[nodeId]=copyValue(clean);this.revision++;this.emit();return;}
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
      if(!node||!['CanTimingLab','InteractiveLab','InteractiveScene','GenerativeFigure','Chart','Flow'].includes(node.type))throw Error('Unknown interactive node');
      if(node.type==='Flow'){labStates[id]=validateFlowState(node.props,value);continue;}
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
    this.lastError=null;this.figureErrors=Object.create(null);this.figureStatuses=Object.create(null);this.figureMetrics=Object.create(null);this.localState=labStates;this.emit();return this.snapshot();
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
  let reporter=null;const pendingReports=new Map(),sentReports=new Map();
  const sendReports=()=>{if(!reporter)return;for(const [key,packet]of pendingReports){if(sentReports.get(key)===JSON.stringify(packet))continue;sentReports.set(key,JSON.stringify(packet));Promise.resolve().then(()=>reporter?.(packet.sessionId,packet.value)).catch(()=>{});}while(sentReports.size>256)sentReports.delete(sentReports.keys().next().value);};
  const collectReports=(key,store)=>{let sessionId;try{sessionId=JSON.parse(key)[0];}catch{return;}if(!sessionId||!store.parser.snapshot().complete)return;const sourceKey=vieSourceIdentity(store.source);for(const [nodeId,status]of Object.entries(store.figureStatuses)){if(!['preview','error','ready'].includes(status))continue;const value={sourceKey,nodeId,status,metrics:store.figureMetrics[nodeId]??{},...status==='error'?{error:store.figureErrors[nodeId]}:{}};pendingReports.set(key+'|'+sourceKey+'|'+nodeId,{sessionId,value});}while(pendingReports.size>256)pendingReports.delete(pendingReports.keys().next().value);sendReports();};
  let storage;try{storage=window.localStorage;}catch{}
  const checkpoints=createCheckpointRepository(storage);
  if(typeof window.addEventListener==='function')window.addEventListener('pagehide',()=>{for(const item of persistence.values())item.flush();});
  const sceneKey = (sessionId,callId) => JSON.stringify([String(sessionId??''),String(callId??'')]);
  const notify = () => {for(const callback of watchers)callback();};
  return {
    sceneKey,
    setReporter(fn){if(reporter!==fn)sentReports.clear();reporter=fn;sendReports();},
    getStore(key,source='') {
      if(stores.has(key)) {
        const existing=stores.get(key);
        stores.delete(key);stores.set(key,existing);
        return existing;
      }
      const store=new SceneStore(source);
      const saved=checkpoints.load(key,source);if(saved)try{store.restore(saved);}catch{checkpoints.clear(key);}
      let timer;const persist=()=>{try{checkpoints.save(key,store.checkpoint());}catch{}};
      const unsubscribe=store.subscribe(()=>{collectReports(key,store);clearTimeout(timer);timer=setTimeout(persist,250);});
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
    if(catalog.timed){el('[data-scene-rate]').textContent=state.rate.toFixed(1)+'×';el('[data-scene-input="rate"]').value=String(state.rate);updateRangePresentation(el('[data-scene-input="rate"]'));}
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

  all('[data-input]').forEach(inp=>{if(inp.type==='checkbox'){inp.checked=lock;return;}const k=inp.dataset.input;if(k==='bs1'||k==='bs2')inp.value=String(s[k]);else if(document.activeElement!==inp)inp.value=String(values[k]);updateRangePresentation(inp);});
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
      if(Number(input.value)!==state[key])input.value=String(state[key]);updateRangePresentation(input);
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
      if(Number(input.value)!==state[key])input.value=String(state[key]);updateRangePresentation(input);
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
    scrub.value=String(Math.round(progress*1000));updateRangePresentation(scrub);counter.textContent=Math.round(progress*100)+'%';
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
  /** Native content acknowledges readiness and visible painting through the same bridge. */
function NativeVisualFrame({title,children,nodeId,store,signature}){
 const container=React.useRef(null),button=React.useRef(null);
 const [expanded,toggle]=useVisualExpansion(container,button);
 React.useEffect(()=>{
  if(!store||!nodeId)return;
  const element=container.current,doc=element.ownerDocument,win=doc.defaultView,started=win.performance.now(),metrics={},frames=new Set();let ready=false,disposed=false;
  store.setFigureError(nodeId,'');
  const later=fn=>{const id=win.requestAnimationFrame(()=>{frames.delete(id);if(!disposed)fn();});frames.add(id);};
  const paint=()=>{if(!ready||metrics.visibleMs!==undefined||doc.hidden)return;const box=element.getBoundingClientRect();if(box.width&&box.height&&box.bottom>0&&box.top<win.innerHeight&&box.right>0&&box.left<win.innerWidth){metrics.visibleMs=win.performance.now()-started;store.setFigureReady(nodeId,metrics);}};
  later(()=>later(()=>{const error=element.querySelector('[role="alert"],.vie-error');if(error){store.setFigureError(nodeId,error.textContent);return;}ready=true;metrics.readyMs=win.performance.now()-started;store.setFigureReady(nodeId,metrics);paint();}));
  const observe=()=>later(()=>later(paint));
  const observer=win.IntersectionObserver?new win.IntersectionObserver(entries=>{if(entries[0]?.isIntersecting)observe();}):null;
  observer?.observe(element);doc.addEventListener('visibilitychange',observe);
  return ()=>{disposed=true;observer?.disconnect();doc.removeEventListener('visibilitychange',observe);for(const id of frames)win.cancelAnimationFrame(id);};
 },[store,nodeId,signature]);
 return h('section',{ref:container,className:'vie-native-frame'+(expanded?' vie-figure-expanded':''),role:expanded?'dialog':undefined,'aria-modal':expanded?true:undefined,'aria-label':title||'可视化图形'},[
  h('header',{key:'head',className:'vie-generated-heading','aria-label':'图形查看操作'},h('div',{className:'vie-figure-actions'},h('button',{ref:button,type:'button',className:'vie-context-button','aria-expanded':expanded,onClick:toggle},expanded?'收起':'展开'))),children
 ]);
}

  /** Generated figure UI is independent of chat assembly and native renderers. */
  function FigureView({config,nodeId,store,inputActions}){
    const frame=React.useRef(null),controller=React.useRef(null),appliedConfig=React.useRef(null);
    const [error,setError]=React.useState(''),[small,setSmall]=React.useState(false),[warnings,setWarnings]=React.useState([]),[fallback,setFallback]=React.useState(false);
    const container=React.useRef(null),expandButton=React.useRef(null);
    const [expanded,toggle]=useVisualExpansion(container,expandButton);
    const isCurrent=definition=>{const node=store.parser.scene.nodes.get(nodeId);return node?.type==='GenerativeFigure'&&JSON.stringify(node.props)===JSON.stringify(definition);};
    const acceptsCallback=()=>appliedConfig.current!==null&&isCurrent(appliedConfig.current);
    React.useEffect(()=>{
      // A retained store can advance in the parent's layout effect before this
      // view mounts. Never execute or report the previous render's definition.
      if(!isCurrent(config))return;
      setFallback(false);appliedConfig.current=config;
      if(controller.current){controller.current.revise(config);return;}
      controller.current=mountGeneratedFigure(frame.current,config,{
        initialState:store.local(nodeId)??config.state,
        onChange:state=>{if(acceptsCallback())store.setLocal(nodeId,state);},
        currentState:()=>store.local(nodeId),
        onError:message=>{if(acceptsCallback()){setError(message);store.setFigureError(nodeId,message);}},
        onWarnings:next=>{if(acceptsCallback())setWarnings(previous=>JSON.stringify(previous)===JSON.stringify(next)?previous:next);},
        onVisible:metrics=>{if(acceptsCallback())store.setFigureProgress(nodeId,store.figureStatuses[nodeId]==='ready'?'ready':'preview',metrics);},
        onPreview:metrics=>{if(acceptsCallback())store.setFigureProgress(nodeId,'preview',metrics);},
        onReady:metrics=>{if(acceptsCallback())store.setFigureReady(nodeId,metrics);}
      });
    },[store,nodeId,JSON.stringify(config)]);
    React.useEffect(()=>{const unsubscribe=store.subscribe(()=>{if(!acceptsCallback())return;try{controller.current?.update(store.local(nodeId)??appliedConfig.current.state);}catch(error){setError(error.message);}});return ()=>{unsubscribe();appliedConfig.current=null;controller.current?.dispose();controller.current=null;};},[store,nodeId]);
    React.useEffect(()=>{const observer=new MutationObserver(()=>setSmall(frame.current?.dataset.vieSmallText==='true'));observer.observe(frame.current,{attributes:true,attributeFilter:['data-vie-small-text']});return ()=>observer.disconnect();},[]);
    return h('section',{ref:container,className:'vie-generated-figure'+(expanded?' vie-figure-expanded':''),key:nodeId,role:expanded?'dialog':undefined,'aria-modal':expanded?true:undefined,'aria-label':expanded?config.title:undefined},[
      h('header',{key:'head',className:'vie-generated-heading'},[h('h3',{key:'title',title:config.title},config.title),h('div',{className:'vie-figure-actions',key:'actions'},[h('button',{type:'button',key:'expand',ref:expandButton,className:'vie-context-button','aria-expanded':expanded,onClick:toggle},expanded?'收起':'展开'),(config.js?.trim()||Object.keys(config.state??{}).length>0)&&h('button',{type:'button',key:'reset',className:'vie-context-button',onClick:()=>controller.current?.reset()},'复位')])]),
      config.preview&&h('p',{key:'preview',className:'vie-figure-hint',role:'status'},'正在生成，当前为静态预览。'),
      fallback&&h('p',{key:'fallback',className:'vie-figure-hint',role:'status'},'当前显示只读静态预览，交互脚本未运行。'),
      warnings.length>0&&!fallback&&h('p',{key:'layout',className:'vie-figure-hint',role:'status','data-vie-layout-warning':true},warnings.map(item=>item.message).join(' ')),
      small&&!expanded&&h('p',{key:'small',className:'vie-figure-hint',role:'status'},'图中文字较小，可展开查看。'),
      h('div',{key:'viewport',className:'vie-figure-viewport'},h('iframe',{key:'frame',ref:frame,title:config.title,sandbox:'allow-scripts',referrerPolicy:'no-referrer',allow:"camera 'none'; microphone 'none'; geolocation 'none'; clipboard-read 'none'; clipboard-write 'none'",style:{width:'100%',maxWidth:'100%',height:config.height+'px',border:0},'data-vie-generated':nodeId})),
      error&&h('div',{key:'error'},[h('p',{key:'message',className:'vie-generated-error',role:'alert'},'交互图运行错误：'+error),!fallback&&/<(?:svg|img|table|p|h[1-6])\b/i.test(config.html)&&h('button',{key:'static',type:'button',className:'vie-context-button',onClick:()=>{controller.current?.showStaticPreview();setFallback(true);}},'查看静态预览'),inputActions?.insertText&&h('button',{key:'repair',type:'button',className:'vie-context-button',onClick:()=>{const index=Number(nodeId.replace(/^block/,''))-1,text='请仅修复图「'+config.title+'」的第'+(index+1)+'个图块，保留其余图和正文。浏览器错误：'+error+'。使用该图最近返回的visualId、baseRevision和changes进行局部修订。';inputActions.insertText(text,inputActions.captureInsertion());}},'修复这张图')])
    ]);
  }

  function GenericVisual({kind,config,values={},nodeId,store}){
    const root=React.useRef(null),saved=React.useRef({progress:0,playing:undefined});
    const zoom=React.useRef(1);
    const scope=useSvgScope();
    const [selected,setSelected]=React.useState('');
    const focus=React.useRef(null);
    let markup='',failure='',flowState;
    try{if(kind==='Flow')flowState=validateFlowState(config,store?.local(nodeId));markup=scopeSvgMarkup(makeVisualMarkup(kind,config,selected,values,flowState),scope);}catch(error){failure=String(error.message);}
    React.useEffect(()=>{if(kind!=='Animation'||failure)return;const controller=mountVisualAnimation(root.current,config,saved.current);return ()=>{saved.current=controller.snapshot?.()??saved.current;controller.dispose();};},[kind,JSON.stringify(config),markup,failure]);
    const applyZoom=()=>{const svg=root.current?.querySelector('.vie-visual-content>svg');if(!svg||!root.current?.querySelector('[data-vie-zoom]'))return;svg.style.width=(zoom.current*100)+'%';svg.style.minWidth='0';svg.style.maxHeight='none';root.current.querySelector('[data-vie-zoom-value]').textContent=Math.round(zoom.current*100)+'%';};
    React.useEffect(()=>{applyZoom();if(focus.current){root.current?.querySelector(focus.current)?.focus({preventScroll:true});focus.current=null;}},[markup]);
    if(failure)return h('p',{className:'vie-diagnostics',role:'alert'},'视觉规范校验失败：'+failure);
    const select=e=>{const action=e.target?.closest?.('[data-vie-flow-action]');if(action&&kind==='Flow'){
      const next={...flowState,history:[...flowState.history]};delete next.choice;
      const kind=action.dataset.vieFlowAction,id=action.dataset.vieFlowTarget;
      if(kind==='overview'||kind==='guided'){next.presentation=kind;focus.current='[data-vie-flow-action="'+kind+'"]';}
      else if(kind==='choice'){next.choice=id;focus.current='[data-vie-flow-action="next"]';}
      else if(kind==='next'){const edges=config.edges.filter(e=>e.from===next.history.at(-1)),target=flowState.choice??(edges.length===1?edges[0].to:undefined);if(!target||next.history.length>=64)return;next.history.push(target);focus.current='[data-vie-flow-current]';}
      else if(kind==='back'){if(next.history.length<2)return;next.history.pop();focus.current='[data-vie-flow-current]';}
      else if(kind==='restart')next.history=[layoutFlow(config).roots[0]];
      else if(kind==='root'){if(!layoutFlow(config).roots.includes(id))return;next.history=[id];}
      else if(kind==='seek'){const index=Number(action.dataset.vieFlowIndex);if(!Number.isInteger(index)||index<0||index>=next.history.length)return;next.history.length=index+1;focus.current='[data-vie-flow-current]';}
      store.setLocal(nodeId,next);return;
    }const control=e.target?.closest?.('[data-vie-zoom]');if(control){const action=control.dataset.vieZoom;zoom.current=action==='fit'?1:Math.min(3,Math.max(.5,zoom.current*(action==='in'?1.25:.8)));applyZoom();return;}const item=e.target?.closest?.('[data-vie-item]');if(item){focus.current=(item.closest('.vie-visual-mobile-svg')?'.vie-visual-mobile-svg ':item.closest('.vie-visual-desktop-svg')?'.vie-visual-desktop-svg ':'')+'[data-vie-item="'+item.getAttribute('data-vie-item')+'"]';setSelected(item.getAttribute('data-vie-item'));}};
    const keySelect=e=>{if(e.key==='Enter'||e.key===' '){const item=e.target?.closest?.('[data-vie-item]');if(item){e.preventDefault();focus.current=(item.closest('.vie-visual-mobile-svg')?'.vie-visual-mobile-svg ':item.closest('.vie-visual-desktop-svg')?'.vie-visual-desktop-svg ':'')+'[data-vie-item="'+item.getAttribute('data-vie-item')+'"]';setSelected(item.getAttribute('data-vie-item'));}}};
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
      case 'Flow':case 'RelationGraph':case 'Timeline':case 'Diagram':case 'Animation':return h(NativeVisualFrame,{key:n.id,nodeId:n.id,store:env.store,signature:JSON.stringify(p),title:p.title},h(GenericVisual,{key:n.id,kind:n.type,config:p,values:env.values,nodeId:n.id,store:env.store}));
      case 'Chart':return h(NativeVisualFrame,{key:n.id,nodeId:n.id,store:env.store,signature:JSON.stringify(p),title:p.title},h(ChartView,{key:n.id,config:p,nodeId:n.id,store:env.store}));
      case 'GenerativeFigure':return h(FigureView,{key:n.id,config:p,nodeId:n.id,store:env.store,inputActions:env.inputActions});
      case 'InteractiveScene':return h(NativeVisualFrame,{key:n.id,nodeId:n.id,store:env.store,signature:JSON.stringify(p),title:p.title||'交互场景'},h(ExperimentView,{key:n.id,config:p,nodeId:n.id,store:env.store}));
      case 'InteractiveLab':return h(NativeVisualFrame,{key:n.id,nodeId:n.id,store:env.store,signature:JSON.stringify(p),title:'交互实验'},h(SemanticView,{key:n.id,kind:p.kind,nodeId:n.id,store:env.store}));
      case 'CanTimingLab':return h(NativeVisualFrame,{key:n.id,nodeId:n.id,store:env.store,signature:JSON.stringify(p),title:'CAN 采样点'},h(CanView,{key:n.id,config:p,nodeId:n.id,store:env.store}));
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
    const storeRef=React.useRef(null),controlRoot=React.useRef(null),controlPresentation=React.useRef(null);
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
    React.useEffect(()=>{const presentation=installControlPresentation(controlRoot.current);controlPresentation.current=presentation;return()=>{presentation.dispose();controlPresentation.current=null;};},[]);
    React.useLayoutEffect(()=>controlPresentation.current?.refresh());
    const env={...store.snapshot(),store,inputActions,
      set:(path,value)=>{try{store.set(path,value);}catch(e){console.warn('[VIE] invalid input',e);}},
      reset:path=>{try{store.reset(path);}catch(e){console.warn('[VIE] invalid reset',e);}}
    };
    return h('div',{ref:controlRoot,className:'vie-shell','data-vie-surface':callId},[
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
  /** Only the reserved telemetry subcommand is hidden; normal /vie results stay readable. */
function isVIEInternalCommand(node){return node?.name==='vie'&&typeof node.args==='string'&&/^\s*__render(?:\s|$)/.test(node.args);}
function VIECommandView({node}){
 const h=React.createElement,internal=isVIEInternalCommand(node),marker=React.useRef(null);
 React.useLayoutEffect(()=>{
  if(!internal)return;
  const row=marker.current?.closest('[data-chat-node-key]');if(!row)return;
  const prior=row.hidden,id=String(node.commandId);row.dataset.vieInternalCommand=id;row.hidden=true;
  return ()=>{if(row.dataset.vieInternalCommand===id){row.hidden=prior;delete row.dataset.vieInternalCommand;}};
 },[internal,node.commandId]);
 if(internal)return h('span',{ref:marker,hidden:true,'aria-hidden':true,'data-vie-internal-command':true});
 const outcome=node.outcome,body=typeof outcome?.text==='string'?outcome.text:'',failed=outcome?.kind==='error',label='/vie'+(node.args?.trim()?' '+node.args.trim():'');
 const summary=outcome===null?'执行中…':failed?'执行失败':body&&body.length<160&&!body.includes('\n')?body:'执行完成';
 return h('div',{className:'vie-command-view','data-vie-manual-command':true,role:failed?'alert':'status'},[
  h('div',{key:'line',className:'vie-command-line'},[h('code',{key:'name'},label),h('span',{key:'result'},summary)]),
  body&&summary!==body&&h('details',{key:'body'},[h('summary',{key:'summary'},'查看结果'),h('pre',{key:'text'},body)])
 ]);
}

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
  return {VIEToolView,VIETurnTailView,VIEAnswerView,VIECommandView};
}

function makeView(React){
  return createViews(React,createVIEBridge(SceneStore)).VIEToolView;
}

function apply(ctx){
  if(typeof document!=='undefined'){
    // Harness can reapply a new client while the old stylesheet survives. The
    // stable id prevents duplication, but must not pin a previous CSS revision.
    let st=document.getElementById('vie-v0250-theme');
    if(!st){st=document.createElement('style');st.id='vie-v0250-theme';document.head.appendChild(st);}
    if(st.textContent!==VIE_CSS)st.textContent=VIE_CSS;
    st.dataset.vieVersion='0.30.6-dev.1';
  }
  const ModeControl=createVIEModeView(require('react'),require('react-dom'));
  // Cordis requires the namespace as well as its command capability. Keeping
  // both in this scope also unloads the control when either service disconnects.
  ctx.inject?.(['sessions','remote','remote.commands'],child=>child.slots.inject('conversation.input.activity',()=>child.slots.register({name:'conversation.input.activity',inject:sessionId=>({flip:async mode=>{const result=await child.remote.commands.execute(sessionId,'/vie '+mode,[]);if(!result.ok)throw Error(result.error?.message??'切换失败');if(result.value===undefined)throw Error('当前宿主未注册 /vie 命令');if(result.value.result?.kind==='error')throw Error(result.value.result.text);}})},ModeControl)));
  const bridge=createVIEBridge(SceneStore);
  ctx.inject?.(['remote','remote.commands'],child=>{bridge.setReporter(async(sessionId,value)=>{await child.remote.commands.execute(sessionId,'/vie __render '+JSON.stringify(value),[]);});child.effect?.(()=>()=>bridge.setReporter(null));});
  const {VIEToolView,VIETurnTailView,VIEAnswerView,VIECommandView}=createViews(require('react'),bridge);
  // Register the durable Turn projection before subscribing the tail seat.
  ctx.uiConversation.events.register(createVIETurnDefinition());
  ctx.uiConversation.events.register(createVIEAnswerDefinition());
  ctx.uiConversation.events.register(createVIEFlowDefinition());
  ctx.uiConversation.events.register(createVIEProseDefinition());
  ctx.slots.inject('conversation.chat.commandview',()=>ctx.slots.register({name:'conversation.chat.commandview',key:'vie'},VIECommandView));
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
  if(typeof window!=='undefined')window.__VIE_CLIENT_STATUS__={version:'0.30.6-dev.1',activated:true,at:Date.now()};
}

exports.name=name;exports.inject=inject;exports.apply=apply;return module.exports;
}});

/* VIE Three chunk SHA256 7d48fec7362d4ff826f2e81ae5321948c30804ca3985179aeabc6ef52ba92bed */
