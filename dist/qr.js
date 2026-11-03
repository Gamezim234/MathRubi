'use strict';
// Gerador de QR Code sem dependências: modo byte, correção de erros M, versões 1 a 6 (até 106 bytes).
// QR.matrix(texto) devolve a grade de módulos (true = escuro); QR.svg(texto, rótulo) devolve um elemento <svg>.
const QR = (() => {
  const VERSIONS = {1: {ec: 10, blocks: [[1, 16]]}, 2: {ec: 16, blocks: [[1, 28]]}, 3: {ec: 26, blocks: [[1, 44]]},
    4: {ec: 18, blocks: [[2, 32]]}, 5: {ec: 24, blocks: [[2, 43]]}, 6: {ec: 16, blocks: [[4, 27]]}};
  const ALIGN = {2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34]};

  // Aritmética em GF(256) com o polinômio 0x11D.
  const EXP = new Uint8Array(512), LOG = new Uint8Array(256);
  for (let i = 0, x = 1; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11d; }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  const mul = (a, b) => a && b ? EXP[LOG[a] + LOG[b]] : 0;
  function remainder(data, n) {
    let g = [1];
    for (let i = 0; i < n; i++) {
      const next = new Array(g.length + 1).fill(0);
      g.forEach((c, j) => { next[j] ^= c; next[j + 1] ^= mul(c, EXP[i]); });
      g = next;
    }
    const r = new Array(n).fill(0);
    for (const b of data) {
      const f = b ^ r.shift();
      r.push(0);
      if (f) for (let i = 0; i < n; i++) r[i] ^= mul(g[i + 1], f);
    }
    return r;
  }
  const dataCapacity = v => VERSIONS[v].blocks.reduce((sum, [count, size]) => sum + count * size, 0);

  // Bits de formato: nível M (00) + máscara, com código BCH(15,5) e máscara 0x5412.
  function formatBits(mask) {
    const data = mask;
    let rem = data;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    return ((data << 10) | rem) ^ 0x5412;
  }
  const maskFn = [(r, c) => (r + c) % 2 === 0, (r) => r % 2 === 0, (r, c) => c % 3 === 0, (r, c) => (r + c) % 3 === 0,
    (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0, (r, c) => (r * c) % 2 + (r * c) % 3 === 0,
    (r, c) => ((r * c) % 2 + (r * c) % 3) % 2 === 0, (r, c) => ((r + c) % 2 + (r * c) % 3) % 2 === 0];

  function penalty(m) {
    const n = m.length;
    let p = 0, dark = 0;
    for (let a = 0; a < n; a++) {
      for (const byRow of [true, false]) {
        const line = [];
        for (let b = 0; b < n; b++) line.push((byRow ? m[a][b] : m[b][a]) ? 1 : 0);
        let run = 1;
        for (let b = 1; b < n; b++) {
          if (line[b] === line[b - 1]) { run++; if (run === 5) p += 3; else if (run > 5) p++; } else run = 1;
        }
        const s = line.join('');
        for (const pattern of ['10111010000', '00001011101']) for (let i = s.indexOf(pattern); i >= 0; i = s.indexOf(pattern, i + 1)) p += 40;
      }
      for (let b = 0; b < n; b++) if (m[a][b]) dark++;
    }
    for (let y = 0; y < n - 1; y++) for (let x = 0; x < n - 1; x++) {
      if (m[y][x] === m[y][x + 1] && m[y][x] === m[y + 1][x] && m[y][x] === m[y + 1][x + 1]) p += 3;
    }
    const total = n * n;
    return p + (Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1) * 10;
  }

  function matrix(text) {
    const bytes = [...new TextEncoder().encode(text)];
    const version = [1, 2, 3, 4, 5, 6].find(v => bytes.length <= dataCapacity(v) - 2);
    if (!version) throw new RangeError('Texto longo demais para o QR (máximo de 106 bytes).');
    const {ec, blocks} = VERSIONS[version];
    // Fluxo de bits: modo byte (0100), tamanho (8 bits), dados, terminador e preenchimento.
    const bits = [];
    const put = (value, length) => { for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1); };
    put(4, 4); put(bytes.length, 8); bytes.forEach(b => put(b, 8));
    const capacityBits = dataCapacity(version) * 8;
    put(0, Math.min(4, capacityBits - bits.length));
    while (bits.length % 8) bits.push(0);
    for (let pad = 0xec; bits.length < capacityBits; pad ^= 0xec ^ 0x11) put(pad, 8);
    const words = [];
    for (let i = 0; i < bits.length; i += 8) words.push(parseInt(bits.slice(i, i + 8).join(''), 2));
    // Divide em blocos, calcula a correção de erros e intercala.
    const dataBlocks = [];
    let at = 0;
    for (const [count, size] of blocks) for (let i = 0; i < count; i++) { dataBlocks.push(words.slice(at, at + size)); at += size; }
    const ecBlocks = dataBlocks.map(block => remainder(block, ec));
    const stream = [];
    for (let i = 0; i < Math.max(...dataBlocks.map(b => b.length)); i++) for (const b of dataBlocks) if (i < b.length) stream.push(b[i]);
    for (let i = 0; i < ec; i++) for (const b of ecBlocks) stream.push(b[i]);
    const payload = stream.flatMap(w => Array.from({length: 8}, (_, i) => (w >>> (7 - i)) & 1));

    // Padrões de função.
    const size = 17 + 4 * version;
    const grid = () => Array.from({length: size}, () => new Array(size).fill(false));
    const base = grid(), isFn = grid();
    const setFn = (x, y, dark) => { base[y][x] = dark; isFn[y][x] = true; };
    for (let i = 0; i < size; i++) { setFn(6, i, i % 2 === 0); setFn(i, 6, i % 2 === 0); }
    for (const [cx, cy] of [[3, 3], [size - 4, 3], [3, size - 4]]) {
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx, y = cy + dy;
        if (x >= 0 && x < size && y >= 0 && y < size) setFn(x, y, Math.max(Math.abs(dx), Math.abs(dy)) !== 2 && Math.max(Math.abs(dx), Math.abs(dy)) !== 4);
      }
    }
    const positions = ALIGN[version] || [];
    positions.forEach((cy, i) => positions.forEach((cx, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === positions.length - 1) || (i === positions.length - 1 && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) setFn(cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }));
    const drawFormat = (m, bits15) => {
      const bit = i => ((bits15 >>> i) & 1) === 1;
      for (let i = 0; i <= 5; i++) m[i][8] = bit(i);
      m[7][8] = bit(6); m[8][8] = bit(7); m[8][7] = bit(8);
      for (let i = 9; i < 15; i++) m[8][14 - i] = bit(i);
      for (let i = 0; i < 8; i++) m[8][size - 1 - i] = bit(i);
      for (let i = 8; i < 15; i++) m[size - 15 + i][8] = bit(i);
      m[size - 8][8] = true;
    };
    drawFormat(base, 0);
    for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) if ((j === 8 && (i <= 8 || i >= size - 8)) || (i === 8 && (j <= 8 || j >= size - 8))) isFn[i][j] = true;

    // Posiciona os dados em zigue-zague, de baixo para cima.
    const data = base.map(row => row.slice());
    let k = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < size; vert++) for (let j = 0; j < 2; j++) {
        const x = right - j, upward = ((right + 1) & 2) === 0, y = upward ? size - 1 - vert : vert;
        if (!isFn[y][x] && k < payload.length) data[y][x] = payload[k++] === 1;
      }
    }
    // Escolhe a máscara de menor penalidade.
    let best = null, bestScore = Infinity;
    for (let mask = 0; mask < 8; mask++) {
      const m = data.map(row => row.slice());
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!isFn[y][x] && maskFn[mask](y, x)) m[y][x] = !m[y][x];
      drawFormat(m, formatBits(mask));
      const score = penalty(m);
      if (score < bestScore) { bestScore = score; best = m; }
    }
    return best;
  }

  function svg(text, label) {
    const m = matrix(text), n = m.length, quiet = 4, NS = 'http://www.w3.org/2000/svg';
    const root = document.createElementNS(NS, 'svg');
    root.setAttribute('viewBox', '0 0 ' + (n + 2 * quiet) + ' ' + (n + 2 * quiet));
    root.setAttribute('role', 'img');
    root.setAttribute('aria-label', label || 'QR Code');
    root.setAttribute('shape-rendering', 'crispEdges');
    const bg = document.createElementNS(NS, 'rect');
    bg.setAttribute('width', n + 2 * quiet); bg.setAttribute('height', n + 2 * quiet); bg.setAttribute('fill', '#fff');
    const path = document.createElementNS(NS, 'path');
    let d = '';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (m[y][x]) d += 'M' + (x + quiet) + ' ' + (y + quiet) + 'h1v1h-1z';
    path.setAttribute('d', d); path.setAttribute('fill', '#000');
    root.append(bg, path);
    return root;
  }
  return {matrix, svg};
})();
if (typeof module !== 'undefined') module.exports = QR;
