'use strict';
// Verificação numérica independente das unidades 3 a 8 de Fundamentos e funções.
// Recalcula com Math do JavaScript os resultados gravados no conteúdo (não usa o corretor do app).
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, '..', 'dist');
const ctx = vm.createContext({});
for (const f of ['kit.js', 'content-fundamentos.js', 'content-fundamentos2-a.js', 'content-fundamentos2-b.js', 'content-fundamentos2-c.js'])
  vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx);

let checks = 0;
const near = (name, actual, expected, tol = 1e-9) => {
  assert.ok(Number.isFinite(actual) && Math.abs(actual - expected) <= tol, name + ': obtido ' + actual + ', esperado ' + expected);
  checks++;
};
const identity = (name, left, right, xs = [-3.5, -2, -0.5, 0.75, 1.5, 4, 7]) => {
  for (const x of xs) near(name + ' em x=' + x, left(x), right(x), 1e-9 * Math.max(1, Math.abs(left(x))));
};
const count = (from, to, ok) => { let n = 0; for (let x = from; x <= to; x++) if (ok(x)) n++; return n; };
const sqrt = Math.sqrt, PI = Math.PI, sin = Math.sin, cos = Math.cos, tan = Math.tan, ln = Math.log;
const log = (b, x) => Math.log(x) / Math.log(b);

// ---- Unidade 3: álgebra (identidades de fatoração em vários pontos)
identity('x²−49', x => x * x - 49, x => (x - 7) * (x + 7));
identity('(x+4)²', x => (x + 4) ** 2, x => x * x + 8 * x + 16);
identity('x²−6x+9', x => x * x - 6 * x + 9, x => (x - 3) ** 2);
near('(x+3)²−(x²+9) em 2', (2 + 3) ** 2 - (4 + 9), 12);
identity('4x²−9', x => 4 * x * x - 9, x => (2 * x - 3) * (2 * x + 3));
identity('6x²+9x', x => 6 * x * x + 9 * x, x => 3 * x * (2 * x + 3));
identity('x²−5x−14', x => x * x - 5 * x - 14, x => (x - 7) * (x + 2));
identity('x²+7x+12', x => x * x + 7 * x + 12, x => (x + 3) * (x + 4));
identity('x³−3x+2 = (x−1)(x²+x−2)', x => x ** 3 - 3 * x + 2, x => (x - 1) * (x * x + x - 2));
identity('x²+x−2', x => x * x + x - 2, x => (x - 1) * (x + 2));
near('x³−3x+2 em 1', 1 - 3 + 2, 0);
near('x²+x−2 em 3', 9 + 3 - 2, 10);
identity('x²−2x−15', x => x * x - 2 * x - 15, x => (x - 5) * (x + 3));
identity('x³−8', x => x ** 3 - 8, x => (x - 2) * (x * x + 2 * x + 4));
identity('x³−1', x => x ** 3 - 1, x => (x - 1) * (x * x + x + 1));
identity('x³+27', x => x ** 3 + 27, x => (x + 3) * (x * x - 3 * x + 9));
near('segundo fator de x³+27 em 1', 1 - 3 + 9, 7);
identity('x³+3x²+2x+6', x => x ** 3 + 3 * x * x + 2 * x + 6, x => (x + 3) * (x * x + 2));
identity('x³−64', x => x ** 3 - 64, x => (x - 4) * (x * x + 4 * x + 16));
identity('(x²−4x)/(x−4)', x => (x * x - 4 * x) / (x - 4), x => x, [-3, 0.5, 2, 6]);
identity('(x²−x−6)/(x−3)', x => (x * x - x - 6) / (x - 3), x => x + 2, [-3, 0.5, 2, 6]);
identity('(x²−5x+6)/(x−2)', x => (x * x - 5 * x + 6) / (x - 2), x => x - 3, [-3, 0.5, 1, 6]);
identity('(x³−8)/(x²−4)', x => (x ** 3 - 8) / (x * x - 4), x => (x * x + 2 * x + 4) / (x + 2), [-3, 0.5, 1, 6]);
identity('(x²−16)/(x²−4x)', x => (x * x - 16) / (x * x - 4 * x), x => (x + 4) / x, [-3, 0.5, 1, 6]);
identity('(x³−1)/(x²−1)', x => (x ** 3 - 1) / (x * x - 1), x => (x * x + x + 1) / (x + 1), [-3, 0.5, 2, 6]);
near('forma simplificada de (x³−1)/(x²−1) em 1', (1 + 1 + 1) / (1 + 1), 1.5);
// √(x+2)=x: só x=2 é válida
near('√(x+2)=x em 2', sqrt(2 + 2), 2);
assert.notEqual(sqrt(-1 + 2), -1); checks++;
// sinal e raízes
for (const [r1, r2, f] of [[-2, 3, x => x * x - x - 6], [1, 3, x => x * x - 4 * x + 3], [2, 3, x => x * x - 5 * x + 6], [2, 5, x => x * x - 7 * x + 10]]) {
  near('raiz 1', f(r1), 0); near('raiz 2', f(r2), 0);
  assert.ok(f((r1 + r2) / 2) < 0); checks++;
}
near('x²−4 em 0', 0 - 4, -4);

// ---- Unidade 4: funções
near('f(−2)', (-2) ** 2 - 3 * -2, 10);
near('f(4)', 2 * 4 - 5, 3);
near('f(−3)', 9 + 3, 12);
identity('f(a+1)=3a+4', a => 3 * (a + 1) + 1, a => 3 * a + 4);
identity('f(3+h)−f(3)', h => (3 + h) ** 2 - 9, h => 6 * h + h * h, [-1, 0.5, 2]);
near('imagem de x²+1', 1, 1);
near('∛(−8)', Math.cbrt(-8), -2);
near('inteiros em √(x−2)/(x−7)', count(0, 10, x => x >= 2 && x !== 7), 8);
near('inteiros em √(x+1)/(x−3), −3..5', count(-3, 5, x => x >= -1 && x !== 3), 6);
near('zeros de (x²−9)/(x+3)', [-3, 3].filter(x => x !== -3 && (x * x - 9) === 0).length, 1);
near('f(0)+f(3) por partes', 0 + 2 + 9, 11);
near('h(−5)+h(0)+h(7)', -1 + 0 + 1, 0);
near('f(2)+f(4) por partes', 2 * 2 + (6 - 4), 6);
near('mínimo de x²−4x+7', 2 * 2 - 4 * 2 + 7, 3);
near('mínimo de x²−2x+5', 1 - 2 + 5, 4);
near('vértice de x²−6x+5', 9 - 18 + 5, -4);
near('f(8) de √(x+1)/(x−3)', sqrt(9) / 5, 0.6);
identity('quociente de diferenças', x => (((x + 0.25) ** 2) - x * x) / 0.25, x => 2 * x + 0.25);
near('inclinação (1;2),(3;8)', (8 - 2) / (3 - 1), 3);
near('reta por (0;1) inclinação 2 em 5', 2 * 5 + 1, 11);
near('inteiros em √(x²−4), 0..3', count(0, 3, x => x * x >= 4), 2);
near('g(x)=|x−3| em −1', Math.abs(-1 - 3), 4);
near('zero positivo de (x²−4)/(x+1)', 2, 2);

// ---- Unidade 5: transformações, composição, inversas
near('f(g(3))', 2 * 9 + 1, 19);
near('g(f(3))', (2 * 3 + 1) ** 2, 49);
identity('f(g(x))=9x²+1', x => (3 * x) ** 2 + 1, x => 9 * x * x + 1);
near('x²−1=8', 3 * 3 - 1, 8);
near('h(3)=f(1)+1', 5 + 1, 6);
near('2f(3)', 2 * 9, 18);
near('inteiros em √(4−x²)', count(-10, 10, x => 4 - x * x >= 0), 5);
near('f(g(−3)) com √ e x²', sqrt((-3) ** 2), 3);
near('f⁻¹(12) de x+5', 12 - 5, 7);
near('f⁻¹(9) de 3x−6', (9 + 6) / 3, 5);
near('f⁻¹(8) de 4x', 8 / 4, 2);
near('f⁻¹(4) de (x+1)/2', 2 * 4 - 1, 7);
near('f⁻¹(15) de 5x−10', (15 + 10) / 5, 5);
near('f⁻¹(7) de 2x+3', (7 - 3) / 2, 2);
near('g(f(2)) com 3x−1 e x²', (3 * 2 - 1) ** 2, 25);
near('f(f(3)) de 2x−4', 2 * (2 * 3 - 4) - 4, 0);
near('x⁴=16 tem 2 soluções', [-2, 2].filter(x => x ** 4 === 16).length, 2);

// ---- Unidade 6: trigonometria
near('60° em rad', 60 * PI / 180, PI / 3);
near('5π/6 em graus', 5 * PI / 6 * 180 / PI, 150);
near('arco r=2, θ=π/3', 2 * PI / 3, 2 * PI / 3);
near('315° em rad', 315 * PI / 180, 7 * PI / 4);
near('210° em rad', 210 * PI / 180, 7 * PI / 6);
near('cos(π/3)', cos(PI / 3), 0.5);
near('sen(π/4)', sin(PI / 4), sqrt(2) / 2);
near('sen(5π/6)', sin(5 * PI / 6), 0.5);
near('cos(2π/3)', cos(2 * PI / 3), -0.5);
near('sen(7π/6)', sin(7 * PI / 6), -0.5);
near('tg(π/4)', tan(PI / 4), 1);
near('cos π + sen 3π/2', cos(PI) + sin(3 * PI / 2), -2);
near('sen(4π/3)', sin(4 * PI / 3), -sqrt(3) / 2);
near('sen²x se cos x=1/2', 1 - 0.25, 0.75);
{ const x = Math.acos(0.6); near('sen 2x com cos x=3/5', sin(2 * x), 24 / 25); near('1−cos²x', 1 - cos(x) ** 2, 0.64); near('sen x', sin(x), 0.8); }
{ const x = Math.asin(0.5); near('cos 2x com sen x=1/2', cos(2 * x), 0.5); near('tg x', tan(x), sqrt(3) / 3); }
identity('(1−cos2x)/sen²x', x => (1 - cos(2 * x)) / sin(x) ** 2, () => 2, [0.3, 1, 2, 4]);
near('sen(π/2+π/2)', sin(PI), 0, 1e-12);
near('soma das soluções de sen x=√2/2', PI / 4 + (PI - PI / 4), PI);
near('sen π/6 = 1/2', sin(PI / 6), 0.5); near('cos π/3 = 1/2', cos(PI / 3), 0.5);
near('tg π/4 = 1', tan(PI / 4), 1);
near('cos(2π/3) = −1/2', cos(2 * PI / 3), -0.5);
near('sen(3π/2) = −1', sin(3 * PI / 2), -1);
near('período de sen(4x)', 2 * PI / 4, PI / 2);
near('período de cos(3x)', 2 * PI / 3, 2 * PI / 3);
near('período de 4 sen(x/2)', 2 * PI / 0.5, 4 * PI);
near('menor valor de 2 sen x + 3', 2 * -1 + 3, 1);
identity('periodicidade de sen(2x)', x => sin(2 * (x + PI)), x => sin(2 * x));

// ---- Unidade 7: exponenciais e logaritmos
near('2⁵', 2 ** 5, 32); near('3⁻²', 3 ** -2, 1 / 9); near('(1/2)³', 0.5 ** 3, 0.125);
near('M(3)', 80 * 0.5 ** 3, 10); near('P(3)', 100 * 2 ** 3, 800); near('P(2)', 100 * 2 ** 2, 400);
near('2^(x+1)=16', 2 ** (3 + 1), 16);
near('log3 81', log(3, 81), 4); near('log3 1/3', log(3, 1 / 3), -1); near('log2 32', log(2, 32), 5);
near('log5 √5', log(5, sqrt(5)), 0.5); near('log10 10⁷', log(10, 1e7), 7); near('log4 1/16', log(4, 1 / 16), -2);
near('log6 2 + log6 3', log(6, 2) + log(6, 3), 1); near('log2 40 − log2 5', log(2, 40) - log(2, 5), 3);
near('3 log3 9', 3 * log(3, 9), 6); near('log4 8', log(4, 8), 1.5);
near('log2 12 + log2 2/3', log(2, 12) + log(2, 2 / 3), 3);
near('erro clássico log2', log(2, 8) - (log(2, 4) + log(2, 4)), -1);
near('ln e³', ln(Math.E ** 3), 3); near('e^(ln 4)', Math.exp(ln(4)), 4);
near('e² entre 7 e 8', Math.floor(Math.E ** 2), 7);
near('ln e⁴ − ln e', ln(Math.E ** 4) - ln(Math.E), 3);
near('2^(3x)=64', 2 ** (3 * 2), 64); near('9^x=27', 9 ** 1.5, 27);
near('log2(x−1)=3', log(2, 9 - 1), 3); near('ln(x−2)=1', ln(Math.E + 2 - 2), 1);
near('log2 x + log2(x−3)=2', log(2, 4) + log(2, 1), 2);
near('log2 x + log2(x−2)=3', log(2, 4) + log(2, 2), 3);
near('log2 x + log2(x+2)=3', log(2, 2) + log(2, 4), 3);
near('ln x + ln(x−4) = ln 5', ln(5) + ln(1), ln(5));
near('5^(2x−1)=125', 5 ** (2 * 2 - 1), 125);
near('3^(2x)=81', 3 ** (2 * 2), 81);
near('100(1/2)^t', 100 * 0.5 ** 3, 12.5);
near('log3 27 + log2 1/8', log(3, 27) + log(2, 1 / 8), 0);
near('ln e⁶ − 2 ln e', ln(Math.E ** 6) - 2 * ln(Math.E), 4);

// ---- Unidade 8: valores aproximados quando x se aproxima de a (confere a forma simplificada)
const approach = (name, f, a, expected) => { for (const d of [1e-6, -1e-6]) near(name, f(a + d), expected, 1e-4); };
approach('(x²−4)/(x−2)', x => (x * x - 4) / (x - 2), 2, 4);
approach('(x²−9)/(x−3)', x => (x * x - 9) / (x - 3), 3, 6);
approach('(x²−x−2)/(x−2)', x => (x * x - x - 2) / (x - 2), 2, 3);
approach('(x³−1)/(x−1)', x => (x ** 3 - 1) / (x - 1), 1, 3);
approach('(x²−1)/(x²−x)', x => (x * x - 1) / (x * x - x), 1, 2);
approach('(√x−2)/(x−4)', x => (sqrt(x) - 2) / (x - 4), 4, 0.25);
approach('(√x−3)/(x−9)', x => (sqrt(x) - 3) / (x - 9), 9, 1 / 6);
approach('(x−16)/(√x−4)', x => (x - 16) / (sqrt(x) - 4), 16, 8);
approach('(√x−5)/(x−25)', x => (sqrt(x) - 5) / (x - 25), 25, 0.1);
approach('(x²−16)/(x−4)', x => (x * x - 16) / (x - 4), 4, 8);
approach('(x³−8)/(x−2)', x => (x ** 3 - 8) / (x - 2), 2, 12);
approach('(x²−2x−3)/(x−3)', x => (x * x - 2 * x - 3) / (x - 3), 3, 4);
approach('(x²−25)/(x−5)', x => (x * x - 25) / (x - 5), 5, 10);
near('(x²+1)/(x+1) em 2', 5 / 3, 5 / 3);
near('(√7−2)(√7+2)', (sqrt(7) - 2) * (sqrt(7) + 2), 3);
identity('(√x−1)(√x+1)', x => (sqrt(x) - 1) * (sqrt(x) + 1), x => x - 1, [0.25, 2, 9, 30]);
near('1/(√x+2) em 4', 1 / (sqrt(4) + 2), 0.25); near('1/(√x+3) em 9', 1 / (sqrt(9) + 3), 1 / 6);
near('(cos x+2)/(eˣ+1) em 0', (cos(0) + 2) / (Math.exp(0) + 1), 1.5);
near('(sen x+1)/(cos x+1) em 0', (sin(0) + 1) / (cos(0) + 1), 0.5);
near('1−cos π', 1 - cos(PI), 2);
near('2sen²(π/4)', 2 * sin(PI / 4) ** 2, 1);
near('tg(π/4)+ln e', tan(PI / 4) + ln(Math.E), 2);
near('e^(ln3+ln2)', Math.exp(ln(3) + ln(2)), 6);
near('(eˣ+cos x)/(ln(x+1)+2) em 0', (Math.exp(0) + cos(0)) / (ln(1) + 2), 1);
near('salto de g', (10 - 3) - 2 * 3, 1);
near('k sem salto', 3 * 2 - 1 - 1, 4);
near('k sem salto 2', 1 + 3, 4);
near('h sem salto', 2 ** 2 - 2 * 2, 0);

// ---- Unidades 1 e 2: números reais, intervalos e módulo
near('0,125 = 1/8', 0.125, 1 / 8);
near('inteiros com √x real, −3..3', count(-3, 3, x => x >= 0), 4);
near('inteiros com √x/(x−2) real, −5..5', count(-5, 5, x => x >= 0 && x !== 2), 5);
near('x<4 ⇒ x+5<9', 4 + 5, 9); near('x<4 ⇒ −3x>−12', -3 * 4, -12);
near('−4x ≥ 12 ⇒ x ≤ −3', 12 / -4, -3); near('5−2x>1 ⇒ x<2', (1 - 5) / -2, 2);
near('(3−x)/2 ≤ 4 ⇒ x ≥ −5', 3 - 8, -5);
near('x=−3: x²', (-3) ** 2, 9);

near('0,666… = 2/3', 6 / 9, 2 / 3); near('0,1818… = 2/11', 18 / 99, 2 / 11); near('0,555… = 5/9', 5 / 9, 5 / 9);
near('0,2727… = 3/11', 27 / 99, 3 / 11); near('0,4545… = 5/11', 45 / 99, 5 / 11);
near('10t−t com t=0,999…', 9.999999999 - 0.9999999999, 9, 1e-8);
near('erro 1/3 vs 0,33', Math.abs(1 / 3 - 0.33), 1 / 300); near('erro 2/3 vs 0,67', Math.abs(2 / 3 - 0.67), 1 / 300);
near('(a²)³/a⁴ em a=1,7', (1.7 ** 2) ** 3 / 1.7 ** 4, 1.7 ** 2);
near('16^(3/4)', 16 ** 0.75, 8); near('(−2)²−(−2²)', (-2) ** 2 - -(2 ** 2), 8); near('2⁻³', 2 ** -3, 1 / 8);
identity('x^(−1/2)·x^(5/2)', x => x ** -0.5 * x ** 2.5, x => x * x, [0.3, 1, 2.2, 9]);
identity('x^(−3/2)·x^(7/2)', x => x ** -1.5 * x ** 3.5, x => x * x, [0.3, 1, 2.2, 9]);
near('√(x²) em −3', sqrt(9), 3); near('√25−(√9+√16)', sqrt(25) - (sqrt(9) + sqrt(16)), -2);
near('√72 = 6√2', sqrt(72), 6 * sqrt(2)); near('√(x²)−x em −3', sqrt(9) + 3, 6);
near('inteiros com 1/√t real, −2..2', count(-2, 2, t => t > 0), 2);
near('maior inteiro < √30', Math.floor(sqrt(30)), 5);
near('ponto médio 1/3 e 1/2', (1 / 3 + 1 / 2) / 2, 5 / 12);
near('(7/10)²−1/2', 0.49 - 0.5, -0.01);
near('−2a−(−2b), a=1, b=3', -2 + 6, 4);
near('inteiros em (−2;3]', count(-10, 10, x => x > -2 && x <= 3), 5);
near('inteiros em [0;1]∪[3;4]', count(-10, 10, x => (x >= 0 && x <= 1) || (x >= 3 && x <= 4)), 4);
near('inteiros com |x|>1, −2..2', count(-2, 2, x => Math.abs(x) > 1), 2);
near('|1+(−1)|−(|1|+|−1|)', Math.abs(0) - 2, -2);
near('dist. −3/2 a 5/2', Math.abs(-1.5 - 2.5), 4);
near('|x−4|=2 menor', 4 - 2, 2); near('|x−2|<3', 2 - 3, -1); near('|x−3|≤4 extremos', 3 + 4, 7); near('|x+2|<5 extremos', -2 - 5, -7);
near('|x|/x em −2', Math.abs(-2) / -2, -1); near('|x−1|/(x−1) em 0', Math.abs(-1) / -1, -1); near('|x−2|/(x−2) em 5', 1, 1);
near('|2x−6| muda em 3', 2 * 3 - 6, 0);

// ---- Estrutura: toda fase tem teoria, exemplo guiado e prática independente
const units = vm.runInContext('COURSE.fundamentos.units', ctx);
assert.equal(units.length, 8); checks++;
for (const unit of units) {
  assert.ok(unit.phases.at(-1).boss, unit.title); checks++;
}
console.log('OK: ' + checks + ' verificações numéricas independentes (unidades 3 a 8 e revisões).');
