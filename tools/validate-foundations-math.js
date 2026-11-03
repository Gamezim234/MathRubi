'use strict';
// Independent numeric checks of arithmetic and symbolic review identities.
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.join(__dirname,'..','dist'),ctx=vm.createContext({});
for(const file of ['kit.js','content-precalculo.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
const questions=vm.runInContext('COURSE.precalculoNumeros.units.flatMap(u=>u.phases.flatMap(p=>p.items))',ctx);
// A small parser, separate from the app's answer matcher. Power binds before unary minus.
function calculate(source,vars={}){
 const sourceText=source.replaceAll('−','-').replaceAll('·','*').replaceAll('÷','/').replace(/[²³⁴⁰]/g,c=>'^'+({'²':2,'³':3,'⁴':4,'⁰':0}[c]));
 const token=/\s*(\d+(?:[.,]\d+)?|sqrt|[ax]|[+\-*/^()√|])/y;
 let position=0,tokens=[],m;
 while(position<sourceText.length){token.lastIndex=position;m=token.exec(sourceText);if(!m)throw Error('Unsupported expression: '+source);tokens.push(m[1]);position=token.lastIndex;}
 let at=0;const eat=t=>{if(tokens[at]!==t)throw Error('Expected '+t);at++;};
 const atom=()=>{const t=tokens[at++];if(t==='('){const v=sum();eat(')');return v;}if(t==='|'){const v=sum();eat('|');return Math.abs(v);}if(t==='√'||t==='sqrt')return Math.sqrt(atom());if(t in vars)return vars[t];if(/^\d/.test(t||''))return Number(t.replace(',','.'));throw Error('Unexpected token '+t);};
 const power=()=>{const v=atom();if(tokens[at]==='^'){at++;return v**unary();}return v;};
 const unary=()=>{if(tokens[at]==='-'){at++;return -unary();}if(tokens[at]==='+'){at++;return unary();}return power();};
 const product=()=>{let v=unary();while(tokens[at]==='*'||tokens[at]==='/'){const op=tokens[at++],b=unary();v=op==='*'?v*b:v/b;}return v;};
 const sum=()=>{let v=product();while(tokens[at]==='+'||tokens[at]==='-'){const op=tokens[at++],b=product();v=op==='+'?v+b:v-b;}return v;};
 const value=sum();if(at!==tokens.length)throw Error('Trailing tokens');return value;
}
let checked=0;
for(const q of questions){
 if(q[7])continue;
 const answer=String(q[3]).split('|')[0];
 let expression=q[2].replace(/\s*=\s*\?\s*$/,'').trim();
 const symbolic=q[2].match(/^Para ([ax]) > 0, simplifique (.+)\.$/);
 const scalar=/^[+-]?\d+(?:[.,]\d+)?(?:\/[+-]?\d+(?:[.,]\d+)?)?$/.test(answer);
 if(symbolic){
  for(const v of [.125,.5,2,7]){const vars={[symbolic[1]]:v};const actual=calculate(symbolic[2],vars),expected=calculate(answer,vars);assert.ok(Math.abs(actual-expected)<1e-10,q[2]);checked++;}
 }else if(scalar&&/^[\d\s.,+−\-*/·÷()√|²³⁴⁰^]+$/.test(expression)){
  // In lesson notation each a/b is a fraction, including the divisor of ÷.
  expression=expression.replace(/(\d+(?:[.,]\d+)?)\s*\/\s*(\d+(?:[.,]\d+)?)/g,'($1/$2)');
  const actual=calculate(expression),expected=calculate(answer);assert.ok(Number.isFinite(actual));assert.ok(Math.abs(actual-expected)<1e-10,q[2]+': '+actual+' != '+expected);checked++;
 }
}
assert.ok(checked>=40,'Too few independent checks');
console.log('OK: '+checked+' independent arithmetic and sampled symbolic-identity checks across Pre-calculus.');
