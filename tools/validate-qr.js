'use strict';
// Confere dist/qr.js com um decodificador escrito de forma independente (outra aritmética de GF,
// outro mapa de módulos de função): lê a matriz, desfaz a máscara, confere o Reed-Solomon e recupera o texto.
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const path = require('path');
const QR = require(path.join(__dirname, '..', 'dist', 'qr.js'));

// ---- GF(256) por multiplicação "camponesa" (diferente das tabelas exp/log do gerador)
const gmul = (a, b) => { let r = 0; while (b) { if (b & 1) r ^= a; a <<= 1; if (a & 256) a ^= 0x11d; b >>= 1; } return r; };
const gpow = (e) => { let r = 1; for (let i = 0; i < e; i++) r = gmul(r, 2); return r; };

// Tabela da especificação (nível M): [bytes de correção por bloco, [[blocos, palavras de dados]]]
const SPEC = {1: [10, [[1, 16]]], 2: [16, [[1, 28]]], 3: [26, [[1, 44]]], 4: [18, [[2, 32]]], 5: [24, [[2, 43]]], 6: [16, [[4, 27]]]};
const ALIGN = {2: [18], 3: [22], 4: [26], 5: [30], 6: [34]};   // centro do único padrão de alinhamento livre
const TOTAL = {1: 26, 2: 44, 3: 70, 4: 100, 5: 134, 6: 172};  // palavras de código por versão

// Bits de formato conhecidos da especificação (nível M, máscaras 0 a 7).
const FORMAT_M = ['101010000010010', '101000100100101', '101111001111100', '101101101001011',
  '100010111111001', '100000011001110', '100111110010111', '100101010100000'];

function decode(m) {
  const size = m.length, version = (size - 17) / 4;
  assert.ok(Number.isInteger(version) && version >= 1 && version <= 6, 'tamanho inválido ' + size);
  // Formato: lê as duas cópias e exige que sejam iguais e estejam na tabela.
  const read = cells => cells.reduce((v, [y, x], i) => v | ((m[y][x] ? 1 : 0) << i), 0);
  const first = [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [7, 8], [8, 8], [8, 7], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0]];
  const second = [...Array.from({length: 8}, (_, i) => [8, size - 1 - i]), ...Array.from({length: 7}, (_, i) => [size - 7 + i, 8])];
  const a = read(first), b = read(second);
  assert.equal(a, b, 'as duas cópias do formato diferem');
  const mask = FORMAT_M.findIndex(s => parseInt(s, 2) === a);
  assert.ok(mask >= 0, 'bits de formato fora da tabela do nível M: ' + a.toString(2));
  // Mapa de módulos de função, por regiões.
  const fn = (y, x) => {
    if (x <= 8 && y <= 8) return true;                       // finder + separador + formato (canto superior esquerdo)
    if (x >= size - 8 && y <= 8) return true;                // canto superior direito
    if (x <= 8 && y >= size - 8) return true;                // canto inferior esquerdo (inclui o módulo escuro)
    if (x === 6 || y === 6) return true;                     // temporização
    if (ALIGN[version] && Math.abs(x - ALIGN[version][0]) <= 2 && Math.abs(y - ALIGN[version][0]) <= 2) return true;
    return false;
  };
  const unmask = [(r, c) => (r + c) % 2 === 0, r => r % 2 === 0, (r, c) => c % 3 === 0, (r, c) => (r + c) % 3 === 0,
    (r, c) => (((r / 2) | 0) + ((c / 3) | 0)) % 2 === 0, (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
    (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0, (r, c) => ((((r + c) % 2) + ((r * c) % 3)) % 2) === 0][mask];
  // Lê os módulos de dados em colunas de largura 2, da direita para a esquerda.
  const bits = [];
  let upward = true;
  for (let right = size - 1; right > 0; right -= 2) {
    if (right === 6) right--;
    const ys = Array.from({length: size}, (_, i) => upward ? size - 1 - i : i);
    for (const y of ys) for (const x of [right, right - 1]) {
      if (fn(y, x)) continue;
      bits.push(m[y][x] !== unmask(y, x) ? 1 : 0);
    }
    upward = !upward;
  }
  const codewords = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) codewords.push(parseInt(bits.slice(i, i + 8).join(''), 2));
  assert.equal(codewords.length, TOTAL[version], 'número de palavras de código');
  // Desintercala e confere a correção de erros de cada bloco (síndrome zero).
  const [ecLen, groups] = SPEC[version];
  const sizes = groups.flatMap(([count, n]) => Array(count).fill(n));
  const dataBlocks = sizes.map(() => []), ecBlocks = sizes.map(() => []);
  let at = 0;
  for (let i = 0; i < Math.max(...sizes); i++) sizes.forEach((n, j) => { if (i < n) dataBlocks[j].push(codewords[at++]); });
  for (let i = 0; i < ecLen; i++) sizes.forEach((_, j) => ecBlocks[j].push(codewords[at++]));
  sizes.forEach((_, j) => {
    const word = [...dataBlocks[j], ...ecBlocks[j]];
    for (let r = 0; r < ecLen; r++) {
      let s = 0;
      for (const c of word) s = gmul(s, gpow(r)) ^ c;     // avalia o polinômio em α^r
      assert.equal(s, 0, 'síndrome ' + r + ' diferente de zero no bloco ' + j);
    }
  });
  // Interpreta o fluxo: modo byte, contagem de 8 bits e dados.
  const stream = sizes.flatMap((_, j) => dataBlocks[j]).flatMap(w => Array.from({length: 8}, (_, i) => (w >> (7 - i)) & 1));
  const take = (from, n) => parseInt(stream.slice(from, from + n).join(''), 2);
  assert.equal(take(0, 4), 4, 'modo não é byte');
  const length = take(4, 8);
  const out = Buffer.from(Array.from({length}, (_, i) => take(12 + 8 * i, 8)));
  return {text: out.toString('utf8'), version, mask};
}

// ---- 1. Bits de formato do gerador batem com a tabela da especificação
{
  const src = require('node:fs').readFileSync(path.join(__dirname, '..', 'dist', 'qr.js'), 'utf8');
  const fn = new Function(src.match(/function formatBits[\s\S]*?\n  }\n/)[0] + '; return formatBits;')();
  FORMAT_M.forEach((expected, mask) => assert.equal(fn(mask).toString(2).padStart(15, '0'), expected, 'formato da máscara ' + mask));
}

// ---- 2. Ida e volta: textos de vários tamanhos, incluindo URIs otpauth reais
const base32 = bytes => { const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'; let bits = '', out = ''; for (const b of bytes) bits += b.toString(2).padStart(8, '0'); for (let i = 0; i < bits.length; i += 5) out += A[parseInt(bits.slice(i, i + 5).padEnd(5, '0'), 2)]; return out; };
const samples = ['A', 'MathRubi', 'x'.repeat(14), 'y'.repeat(15), 'ação · π ≈ 3,14', ...Array.from({length: 24}, (_, i) => 'z'.repeat(4 + i * 4))];
for (const name of ['abc', 'rosa_pereira_123', 'a'.repeat(20)]) samples.push('otpauth://totp/MathRubi:' + name + '?secret=' + base32(crypto.randomBytes(20)) + '&issuer=MathRubi');
for (let n = 1; n <= 106; n += 7) samples.push(crypto.randomBytes(n).toString('base64').slice(0, n));
samples.push('q'.repeat(106));
const versions = new Set(), masks = new Set();
for (const text of samples) {
  const m = QR.matrix(text);
  const got = decode(m);
  assert.equal(got.text, text);
  versions.add(got.version); masks.add(got.mask);
}
assert.deepEqual([...versions].sort(), [1, 2, 3, 4, 5, 6], 'todas as versões 1 a 6 devem ter sido exercitadas');

// ---- 3. Padrões de função no lugar certo e limite de tamanho
{
  const m = QR.matrix('otpauth://totp/MathRubi:abc?secret=' + base32(crypto.randomBytes(20)) + '&issuer=MathRubi');
  const n = m.length;
  const finder = (y0, x0) => { for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) { const edge = i === 0 || i === 6 || j === 0 || j === 6, core = i >= 2 && i <= 4 && j >= 2 && j <= 4; assert.equal(m[y0 + i][x0 + j], edge || core); } };
  finder(0, 0); finder(0, n - 7); finder(n - 7, 0);
  for (let i = 8; i < n - 8; i++) { assert.equal(m[6][i], i % 2 === 0); assert.equal(m[i][6], i % 2 === 0); }
  assert.equal(m[n - 8][8], true, 'módulo escuro');
  assert.throws(() => QR.matrix('q'.repeat(107)), RangeError);
}
console.log('OK: ' + samples.length + ' textos decodificados (versões ' + [...versions].join(', ') + '; máscaras ' + [...masks].sort().join(', ') + '), 8 bits de formato e padrões de função conferidos.');
