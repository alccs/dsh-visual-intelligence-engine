/** Public synthetic example; shared geometry is independent of the subject. */
const baseHtml='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 230" role="img" aria-label="阶段与位置变化"><rect x="36" y="42" width="184" height="124" rx="14" fill="var(--vie-layer)" stroke="var(--vie-stroke)"/><rect x="340" y="42" width="184" height="124" rx="14" fill="var(--vie-layer)" stroke="var(--vie-stroke)"/><text x="128" y="72" text-anchor="middle" fill="var(--vie-ink)">区域 A</text><text x="432" y="72" text-anchor="middle" fill="var(--vie-ink)">区域 B</text><path id="transfer-arrow" d="M240 108H320l-12 -8m12 8l-12 8" fill="none" stroke="var(--vie-primary)" stroke-width="3" style="display:none"/><circle id="particle" cx="100" cy="120" r="17" fill="var(--vie-primary)"/><text id="phase-name" x="280" y="205" text-anchor="middle" fill="var(--vie-muted)">初始状态</text></svg>';
export const sharedStageDocument={title:'一份主图，三个阶段',blocks:[{type:'learning',title:'一份主图，三个阶段',key:'sharedDemo',baseHtml,readouts:[{id:'position',label:'水平位置',unit:'px'},{id:'stage',label:'阶段'}],stages:[
 {label:'初始',title:'先看初始位置',caption:'主图只定义一次，后续阶段提供变化数据。',values:{position:100,stage:1}},
 {label:'移动',title:'位置发生变化',caption:'按钮、读数和恢复由引擎提供。',patches:[{target:'particle',attrs:{cx:280}},{target:'transfer-arrow',visible:true},{target:'phase-name',text:'中间状态'}],values:{position:280,stage:2}},
 {label:'到达',title:'到达新的位置',caption:'可以直接跳回任意阶段，其他阶段的变化不会残留。',patches:[{target:'particle',attrs:{cx:440,fill:'var(--vie-secondary)'}},{target:'phase-name',text:'最终状态'}],values:{position:440,stage:3}}
]}]};
export const legacyStageDocument=()=>({title:sharedStageDocument.title,blocks:[{type:'learning',title:sharedStageDocument.title,key:'sharedDemo',readouts:sharedStageDocument.blocks[0].readouts,stages:sharedStageDocument.blocks[0].stages.map((stage,index)=>{
 const {patches,...rest}=stage;
 const html=index===0?baseHtml:index===1?baseHtml.replace('cx="100"','cx="280"').replace('style="display:none"','').replace('初始状态','中间状态'):baseHtml.replace('cx="100"','cx="440"').replace('r="17" fill="var(--vie-primary)"','r="17" fill="var(--vie-secondary)"').replace('初始状态','最终状态');
 return {...rest,html};
})}]});
