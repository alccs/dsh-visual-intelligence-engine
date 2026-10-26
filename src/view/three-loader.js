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
