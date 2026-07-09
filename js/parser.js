function factorial(n){n=Number(n);if(!Number.isInteger(n)||n<0||n>170)throw Error('Fatorial inválido');let r=1;for(let i=2;i<=n;i++)r*=i;return r}
function degToRad(x){return x*Math.PI/180}
function radToDeg(x){return x*180/Math.PI}
function balanceParentheses(s){const o=(s.match(/\(/g)||[]).length,c=(s.match(/\)/g)||[]).length;return o>c?s+')'.repeat(o-c):s}
function preprocess(raw,angleMode='DEG'){
 let s=String(raw||'').replace(/\s+/g,'');
 s=s.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
 s=s.replace(/π/g,'PI').replace(/³√\(/g,'cbrt(').replace(/√\(/g,'sqrt(').replace(/mod/g,'%');
 s=s.replace(/(\d|\)|PI|E|e)!/g,'factorial($1)');
 s=s.replace(/(\d+(?:\.\d+)?)%/g,'($1/100)');
 s=s.replace(/(\d|\)|PI|E|e)²/g,'($1^2)');
 s=s.replace(/\^/g,'**');
 const trig=['sin','cos','tan'];
 for(const f of trig){s=s.replace(new RegExp('(?<![a-zA-Z])'+f+'\\(','g'),angleMode==='DEG'?`Math.${f}(degToRad(`:`Math.${f}(`)}
 const inv=['asin','acos','atan'];
 for(const f of inv){s=s.replace(new RegExp('(?<![a-zA-Z])'+f+'\\(','g'),angleMode==='DEG'?`radToDeg(Math.${f}(`:`Math.${f}(`)}
 s=s.replace(/sinh\(/g,'Math.sinh(').replace(/cosh\(/g,'Math.cosh(').replace(/tanh\(/g,'Math.tanh(');
 s=s.replace(/log2\(/g,'Math.log2(').replace(/log\(/g,'Math.log10(').replace(/ln\(/g,'Math.log(');
 s=s.replace(/sqrt\(/g,'Math.sqrt(').replace(/cbrt\(/g,'Math.cbrt(').replace(/abs\(/g,'Math.abs(');
 s=s.replace(/\bPI\b/g,'Math.PI').replace(/\b[Ee]\b/g,'Math.E');
 return balanceParentheses(s);
}
function calculateExpression(raw,angleMode){if(!raw||raw==='0')return 0;const js=preprocess(raw,angleMode);const fn=new Function('factorial','degToRad','radToDeg',`"use strict";return (${js});`);const out=fn(factorial,degToRad,radToDeg);if(!Number.isFinite(out))throw Error('Resultado inválido');return Math.round((out+Number.EPSILON)*1e12)/1e12}
