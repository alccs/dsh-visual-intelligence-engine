import {VERSION} from './version-info.mjs';
/** Execute the byte-verified installed artifact against a real isolated DSH runtime. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {examples} from './general-examples.mjs';
import {compactExamples} from './compact-examples.mjs';
import {createRequire,registerHooks} from 'node:module';
import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'..');
const runtime=path.resolve(process.env.VIE_DSH_RUNTIME??path.join(root,'.validation/runtime'));
const requireRuntime=createRequire(path.join(runtime,'package.json'));
const cli=JSON.parse(fs.readFileSync(path.join(root,'docs/validation/dsh-cli.json'),'utf8'));
const installed=path.join(root,cli.temporaryHome,'profiles/web/node_modules/dsh-visual-interactive-engine');
for(const name of ['index.js','client.js'])assert.ok(fs.readFileSync(path.join(installed,'lib',name)).equals(fs.readFileSync(path.join(root,'package/lib',name))),'installed bytes differ');
// The CLI profile declares peers supplied by the host. Map that peer to the real runtime.
const hook=registerHooks({resolve(specifier,context,next){if(['@deepseek-ai/dsh-tools','zod'].includes(specifier))return {url:pathToFileURL(requireRuntime.resolve(specifier)).href,shortCircuit:true};return next(specifier,context);}});
const load=specifier=>import(pathToFileURL(requireRuntime.resolve(specifier)).href);
const {Context}=await load('@deepseek-ai/cordis');
const {default:SystemPrompt}=await load('@deepseek-ai/dsh-system-prompt');
const {default:ToolRuntime}=await load('@deepseek-ai/dsh-tools');
const {default:SkillRegistry}=await load('@deepseek-ai/dsh-skill');
const VIE=await import(pathToFileURL(path.join(installed,'lib/index.js')).href);
const checks=[];
for(const withSkills of [false,true]){
  const ctx=new Context();await ctx.plugin(SystemPrompt);await ctx.plugin(ToolRuntime);if(withSkills)await ctx.plugin(SkillRegistry);
  const fiber=ctx.plugin(VIE);await fiber.await();await new Promise(setImmediate);
  try{
    const fixed=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/gear-story-fixed.json'),'utf8'));
    const before=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/gear-story-before-018.json'),'utf8'));
    const cases=[...Object.values({...examples,...compactExamples}).map(spec=>['vie_explain',{spec:JSON.stringify(spec)},true]),...['planetary','gears','geartrain','worm','wave','process','vector'].map(kind=>['vie_auto',{query:'explicit teaching scene',templateId:'lab.'+kind},true]),['vie_story',fixed,true],['vie_story',before,true],['vie_quick',{preset:'can'},true]];
    for(const [name,args,valid]of cases){
      const result=await ctx.tools.execute({signal:new AbortController().signal,callId:'smoke-'+checks.length,name,arguments:args});
      assert.notEqual(result.isError,true,JSON.stringify(result));assert.equal(result.meta?.kind,'vie');assert.equal(result.meta.valid,valid,JSON.stringify(result));assert.ok(result.meta.quality);assert.equal(result.meta.placement,'flow');assert.equal(result.meta.presentationVersion,3);
      if(!valid)assert.match(JSON.stringify(result),/VIE_DOMAIN_REQUIRED/);
      checks.push({withSkills,tool:name,case:args.templateId??args.preset??JSON.parse(args.spec).title,requiresTemplateId:!!args.templateId,valid});
    }
    if(withSkills)assert.ok((await ctx.skills.get('dsh-vie')).content.includes('VIE '+VERSION));
  }finally{await fiber.dispose();assert.equal(ctx.tools.get('vie_auto'),undefined);if(withSkills)assert.equal(await ctx.skills.get('dsh-vie'),undefined);await ctx.fiber.dispose();}
}
hook.deregister();
const result={dsh:'0.2.1-rc.2',version:VERSION,installedFilesMatchBuild:true,realCordis:true,peerResolution:'real host peer mapped with Node resolve hook; plugin source unchanged',toolCalls:checks.length,externalModelRequests:0,skillRegistrationAndDisposal:true,checks};
fs.writeFileSync(path.join(root,'docs/validation/dsh-runtime.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
