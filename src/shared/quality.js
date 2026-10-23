/** Transparent, bounded quality metadata. This is not a visual or scientific certification. */
function analyzeSceneQuality(source) {
  const parser=new VIEStream();parser.push(source);parser.finish();const snap=parser.snapshot();
  if(snap.errors.length||!snap.complete)return {status:'rejected',checks:['schema'],issues:snap.errors.slice(0,3)};
  const issues=[],templates=[];
  let schematic=false,generatedFigures=0;
  const visit=nodes=>{for(const node of nodes){
    if(node.type==='InteractiveScene')templates.push(node.props.template);
    if(node.type==='GenerativeFigure')generatedFigures++;
    if(node.type==='Diagram'||node.type==='Animation'){
      schematic=true;
      if(node.props.accuracy==='validated')issues.push({code:'SELF_DECLARED_ACCURACY',message:'输入标记 validated 不等于获得独立专业校核。'});
      if(node.props.representation==='pitch-circles')issues.push({code:'PITCH_CIRCLE_SCHEMATIC',message:'仅为分度圆示意，不能宣称已绘制真实齿形。'});
    }
    visit(node.children??[]);
  }};visit(snap.tree);
  if(templates.includes('worm'))issues.push({code:'PROJECTED_WORM_GEOMETRY',message:'蜗杆使用结构投影示意；只计算理想速比。'});
  return {status:issues.length?'review':generatedFigures?'generated':schematic?'schematic':'ready',checks:['schema','bounded-data','isolated-figure-contract'],templates,generatedFigures,issues,
    scope:'代码规则检查；不代表像素验收或独立科学认证'};
}
