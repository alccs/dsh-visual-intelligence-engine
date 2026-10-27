import fs from 'node:fs';
import path from 'node:path';

export const PUBLIC_TESTS=['control-presentation','command-feedback','workflow-operations','client-chunks','prompt-budget','sdk-preview','diagnostics','learning-repair','study','evaluation','graphics-lifecycle','stability-patch','workflow-followup','sdk-compatibility','render-feedback','versioning','content-evidence','shared-stages','field-repair','performance'].map(name=>'tests/'+name+'.test.mjs');
export const PUBLIC_SCRIPTS=['build.mjs','build-metrics.mjs','version-info.mjs','version.mjs','verification-hash.mjs','public-distribution.mjs','release.mjs','release-assets.mjs','archive-release.mjs','export-demo.mjs','demo-app.js','synthetic-history.mjs','learning-reference-scenes.json','browser-driver.mjs','browser-responsive.mjs','browser-controls.mjs','browser-render-repair.mjs','browser-sdk.mjs','browser-quality.mjs','browser-command-feedback.mjs','browser-preview.mjs','browser-preview-audit.mjs','browser-session-fixes.mjs','verify-public.mjs','evaluate.mjs','eval-tasks.mjs','browser-031.mjs','browser-0311.mjs','measure-stages.mjs'];
export const PUBLIC_DOCS=['ARCHITECTURE.md','BUILD-METRICS.json','VERSIONING.md','FIXES-0.31.1.md','OPTIMIZATIONS-0.31.0.md','EVALUATION-0.31.0.md','OPTIMIZATIONS-0.30.5.md','EVALUATION-0.30.5.md','EVALUATION-0.30.1.md','ROADMAP-0.30.5.md','UI-COMPONENTS-A.md'];
export function distributionFiles(root,version,tarball){
  const walk=folder=>fs.readdirSync(path.join(root,folder),{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(folder+'/'+entry.name):[folder+'/'+entry.name]);
  return [...new Set([
    ...['README.md','INSTALL.md','CHANGELOG.md','LICENSE','THIRD-PARTY-NOTICES.txt','package.json','package-lock.json','.gitignore','.gitattributes','.node-version'],
    ...['src','package'].flatMap(walk),
    ...fs.readdirSync(path.join(root,'scripts')).filter(name=>name.includes('example')&&name.endsWith('.mjs')||PUBLIC_SCRIPTS.includes(name)).map(name=>'scripts/'+name),
    ...PUBLIC_TESTS,...PUBLIC_DOCS.map(name=>'docs/'+name),
    ...walk('docs/readme').filter(name=>/\.(?:png|jpg|svg)$/.test(name)),
    ...walk('screenshots').filter(name=>/sdk-|progressive-final/.test(name)&&name.endsWith('-'+version+'.png')),
    'dist/VIE-Interactive-'+version+'.html','dist/'+tarball
  ])].sort();
}
