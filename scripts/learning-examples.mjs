import fs from 'node:fs';
const scenes=JSON.parse(fs.readFileSync(new URL('./learning-reference-scenes.json',import.meta.url)));
const adapt=svg=>svg.replace(/color:\s*rgb\(13,\s*13,\s*13\)/g,'color:var(--vie-ink)');
function mobileScene(stage){
 const dot=(x,y)=>`<circle cx="${x}" cy="${y}" r="4.8" fill="#2678c6"/>`;
 const a=Array.from({length:stage?15:18},(_,i)=>dot(25+(i%6)*22,70+Math.floor(i/6)*23)).join('');
 const b=Array.from({length:stage?10:7},(_,i)=>dot(190+(i%4)*25,70+Math.floor(i/4)*23)).join('');
 return `<svg viewBox="0 0 320 220" role="img" aria-label="两块金属的电子分布简化示意"><text x="80" y="24" text-anchor="middle" fill="currentColor" font-size="17">金属 A</text><text x="240" y="24" text-anchor="middle" fill="currentColor" font-size="17">金属 B</text><rect x="5" y="40" width="150" height="100" rx="12" fill="#dceef9" stroke="#69a5c4"/><rect x="165" y="40" width="150" height="100" rx="12" fill="#f5e7d4" stroke="#c49c67"/>${a}${b}${stage?'<text x="148" y="62" font-size="18" fill="#c55">+</text><text x="165" y="62" font-size="18" fill="#2678c6">−</text><path d="M95 165H225L216 160M225 165L216 170" fill="none" stroke="#2678c6" stroke-width="2"/><text x="160" y="186" text-anchor="middle" font-size="15" fill="#2678c6">电子扩散</text>':''}${stage===2?'<path d="M225 200H95L104 195M95 200L104 205" fill="none" stroke="#c58a34" stroke-width="2"/>':''}</svg>`;
}
const stageData=[
  {label:'① 接触前',title:'阶段一：两侧电子状态不同',caption:'先用粒子数量差异作直观类比；真实金属的接触行为还取决于电子化学势和表面状态。'},
  {label:'② 电子扩散',title:'阶段二：形成电荷分离',caption:'在此示意条件下，电子发生净转移，界面两侧形成电荷分离，并建立反向作用的电场。'},
  {label:'③ 达到平衡',title:'阶段三：净转移为零',caption:'粒子仍在运动；扩散与电场的反作用达到平衡，电子不再持续单向净转移。'}
];
const simulation={type:'learning',title:'电子扩散模拟',key:'contact',legend:'蓝点代表自由电子',note:'示意图经过简化，蓝点数量不代表实际电子总量；不是定量仿真。',stages:stageData.map((stage,i)=>({...stage,html:adapt(scenes.stages[i]),mobileHtml:mobileScene(i)}))};
const quiz={type:'learning',title:'理解测试',key:'contactQuiz',quiz:{question:'两种金属接触后，为什么电子不会一直从 A 向 B 净扩散？',options:[{label:'A. 因为金属 A 的电子最终全部耗尽',feedback:'金属内部仍有大量自由电子。关键是界面电场建立了反向作用。'},{label:'B. 因为产生的电场阻碍继续净扩散',feedback:'电荷分离产生反向电场，最终建立动态平衡。净转移为零，不等于电子停止运动。'},{label:'C. 只因为接触后温度相同',feedback:'同温并不能单独解释电子重新分布；还需考虑电子状态与电场的平衡。'}],correct:1}};
export const learningLesson=[
  {document:{title:'交互演示：接触电动势如何产生？',blocks:[simulation]},text:'特别注意：达到平衡后，电子仍在运动，扩散与电场的反作用相互平衡，净转移为零。密度差只是此处的简化类比，不能作为全部真实金属的唯一判据。'},
  {document:{title:'接触电动势有什么用？',blocks:[{type:'figure',title:'热电偶测温原理示意图',html:adapt(scenes.application),height:260}]},text:'热电偶将两种材料组成回路。热端与参考端存在温差时，回路可产生净热电动势用于测温；定量关系应使用材料的塞贝克系数，不能仅凭接触界面示意图推算温度。'},
  {document:{title:'来一道理解测试',blocks:[quiz]},text:'选择后查看反馈，再试着用自己的话复述主图的变化过程。'}
];
