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
