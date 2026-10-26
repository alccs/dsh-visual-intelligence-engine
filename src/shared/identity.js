/** Stable scene identity for small, session-scoped runtime acknowledgements. */
function vieSourceIdentity(source){let hash=2166136261;for(let i=0;i<source.length;i++)hash=Math.imul(hash^source.charCodeAt(i),16777619);return source.length.toString(36)+'-'+(hash>>>0).toString(36);}
