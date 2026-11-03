const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

// Rubi, o robô assistente (SVG inline, sem dependências).
const RUBI_SVG = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4v7" stroke="#ffd775" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="4" r="3" fill="#ff7a8a"/><rect x="6" y="11" width="36" height="28" rx="11" fill="#a970ef"/><rect x="11" y="16" width="26" height="17" rx="7" fill="#1b2a31"/><circle class="eye" cx="19" cy="24" r="3.2" fill="#8ee849"/><circle class="eye" cx="29" cy="24" r="3.2" fill="#8ee849"/><path d="M20 29.5q4 3 8 0" stroke="#8ee849" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="2" y="21" width="4" height="9" rx="2" fill="#6e3ab3"/><rect x="42" y="21" width="4" height="9" rx="2" fill="#6e3ab3"/></svg>';

function drawPill(board, config, finish) {
  const chat = el('div', 'pill-chat');
  let shown = 0;
  if (config.formula) board.append(el('div', 'board-formula', config.formula));
  const more = el('button', 'primary pill-next');
  const reveal = () => {
    const row = el('div', 'rubi-row');
    const face = el('span', 'rubi-face');
    face.innerHTML = RUBI_SVG;
    row.append(face, el('p', 'rubi-bubble', config.lines[shown]));
    chat.append(row);
    shown++;
    if (shown >= config.lines.length) {
      more.textContent = 'Entendi! ✓';
      more.onclick = () => { more.disabled = true; finish(); };
    } else {
      more.textContent = 'Próximo →';
      more.onclick = reveal;
    }
    more.focus({preventScroll: false});
  };
  board.append(chat, more);
  reveal();
}

// Passo a passo: cada micro-passo só aparece depois de acertar o anterior.
function drawSteps(board, config, finish, miss) {
  const log = el('ol', 'step-log');
  const box = el('div', 'step-box');
  let current = 0, slipped = false;
  if (config.formula) board.append(el('div', 'board-formula', config.formula));
  board.append(log, box);
  const show = () => {
    box.replaceChildren();
    if (current >= config.steps.length) {
      box.append(el('p', 'step-done', 'Raciocínio completo! Você construiu a resolução inteira.'));
      finish();
      return;
    }
    const s = config.steps[current];
    const ask = el('p', 'step-ask', 'Passo ' + (current + 1) + ' de ' + config.steps.length + ' · ' + s.ask);
    const tip = el('p', 'step-tip');
    const answer = value => {
      if (!value.trim()) return;
      if (matches(value, s.answer)) {
        const done = el('li', '', s.ask + '  →  ' + (s.choices ? value : value.trim()));
        done.append(el('small', '', s.why));
        log.append(done);
        current++;
        show();
      } else {
        if (!slipped) { slipped = true; miss(); }
        tip.textContent = 'Quase! ' + s.hint;
        tip.dataset.ok = false;
      }
    };
    box.append(ask);
    if (s.choices) {
      const row = el('div', 'step-choices');
      for (const c of s.choices) {
        const b = el('button', '', c);
        b.onclick = () => answer(c);
        row.append(b);
      }
      box.append(row);
    } else {
      const form = el('form', 'step-form');
      const input = el('input');
      input.setAttribute('aria-label', 'Resposta do passo ' + (current + 1));
      input.autocomplete = 'off';
      const ok = el('button', 'primary', 'Conferir');
      form.append(input, ok);
      form.onsubmit = event => { event.preventDefault(); answer(input.value); };
      box.append(form);
      input.focus();
    }
    box.append(tip);
  };
  show();
}

// Ordenar: o aluno toca nos passos na ordem correta.
function drawOrder(board, config, finish, miss) {
  const n = config.steps.length;
  // embaralhamento determinístico (nunca igual à ordem certa)
  let perm = config.steps.map((_, i) => i);
  let seed = config.steps.join('').length + 7;
  for (let i = n - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const j = seed % (i + 1);
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  if (perm.every((p, i) => p === i)) perm.push(perm.shift());
  let next = 0, slipped = false;
  if (config.formula) board.append(el('div', 'board-formula', config.formula));
  const built = el('ol', 'step-log');
  const pool = el('div', 'order-pool');
  const msg = el('p', 'order-msg');
  msg.setAttribute('role', 'status');
  for (const p of perm) {
    const b = el('button', 'order-piece', config.steps[p]);
    b.onclick = () => {
      if (p === next) {
        built.append(el('li', '', config.steps[p]));
        b.remove();
        next++;
        msg.textContent = '';
        if (next === n) { msg.textContent = 'Ordem perfeita!'; finish(); }
      } else {
        if (!slipped) { slipped = true; miss(); }
        msg.textContent = 'Ainda não é este. O que precisa vir antes?';
      }
    };
    pool.append(b);
  }
  board.append(built, pool, msg);
}

function drawBoard(board, config, finish, miss = () => {}) {
  board.replaceChildren();
  if (!config) return;
  if (config.type === 'pill') return drawPill(board, config, finish);
  if (config.type === 'steps') return drawSteps(board, config, finish, miss);
  if (config.type === 'order') return drawOrder(board, config, finish, miss);
  if (config.type === 'near') {
    const {target, shift, side} = config;
    const offsets = [1, .5, .1, .01];
    const digits = value => Number(value.toFixed(2)).toLocaleString('pt-BR');
    const value = n => digits(target + side * offsets[n]);
    const result = n => digits(target + side * offsets[n] + shift);
    const range = document.createElement('input');
    range.type = 'range';
    range.min = 0;
    range.max = 3;
    range.step = 1;
    range.value = side === -1 ? 0 : 3;
    range.setAttribute('aria-label', 'Mova x em direção a ' + target);
    const line = document.createElement('div');
    line.className = 'number-line';
    const flag = document.createElement('span');
    flag.className = 'target-flag';
    flag.textContent = '⚑ ' + target;
    line.append(...(side === -1 ? [range, flag] : [flag, range]));
    const readout = document.createElement('p');
    readout.setAttribute('aria-live', 'polite');
    const formula = document.createElement('div');
    formula.className = 'board-formula';
    formula.textContent = 'f(x) = x + ' + shift;
    const graph = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    graph.setAttribute('viewBox', '0 0 300 132');
    graph.setAttribute('aria-hidden', 'true');
    graph.style.cssText = 'width:100%;max-width:440px;display:block;margin:auto';
    graph.innerHTML = '<path d="M22 107H282 M30 116V12" stroke="#657f8c" fill="none"/><path d="M150 10V108 M30 63H281" stroke="#ffc85e" stroke-dasharray="5 6" fill="none"/><path d="M35 105L265 21" stroke="#1cb0f6" stroke-width="4"/><circle cx="150" cy="63" r="7" stroke="#ffc85e" stroke-width="3" fill="#192930"/><circle r="6" fill="#8ee849"/><text x="154" y="126" fill="#996c16">alvo</text><text x="282" y="124" fill="#536b7b">x</text><text x="5" y="16" fill="#536b7b">f(x)</text>';
    const dot = graph.querySelectorAll('circle')[1];
    const update = () => {
      const position = Number(range.value);
      const step = side === -1 ? position : 3 - position;
      dot.setAttribute('cx', 150 + side * offsets[step] * 100);
      dot.setAttribute('cy', 63 - side * offsets[step] * 36.5);
      range.setAttribute('aria-valuetext', value(step));
      readout.textContent = 'x = ' + value(step) + '   →   f(x) = ' + result(step);
    };
    range.oninput = update;
    range.onchange = () => {
      update();
      if (Number(range.value) === (side === -1 ? 3 : 0)) {
        range.disabled = true;
        finish();
      }
    };
    update();
    board.append(formula, graph, line, readout);
    return;
  }

  const fraction = document.createElement('div');
  fraction.className = 'factor-fraction';
  const tray = document.createElement('button');
  tray.className = 'cancel-tray';
  tray.textContent = 'Solte ou toque aqui para cancelar o par';
  const message = document.createElement('p');
  message.setAttribute('role', 'status');
  let selected;
  const pieces = [];
  const cancel = () => {
    if (!selected) return;
    if (selected.row !== 0 || selected.index !== 0) {
      message.textContent = 'Procure o fator do numerador que também aparece no denominador.';
      return;
    }
    for (const piece of [pieces[0], pieces.at(-1)]) {
      piece.classList.add('cancelled');
      piece.textContent = '1';
    }
    for (const piece of pieces) { piece.disabled = true; piece.draggable = false; }
    tray.disabled = true;
    message.textContent = 'Par cancelado!';
    finish();
  };
  [config.numerator, config.denominator].forEach((terms, row) => {
    const group = document.createElement('div');
    group.className = 'factor-row';
    terms.forEach((term, index) => {
      const piece = document.createElement('button');
      piece.textContent = term;
      piece.className = 'factor-piece';
      piece.draggable = row === 0;
      piece.setAttribute('aria-label', term + (row === 0 ? ', no numerador' : ', no denominador'));
      const select = () => {
        selected = {row, index};
        for (const other of pieces) other.setAttribute('aria-pressed', other === piece);
        message.textContent = '';
      };
      piece.onclick = select;
      piece.ondragstart = event => { select(); event.dataTransfer.setData('text/plain', term); };
      pieces.push(piece);
      group.append(piece);
    });
    fraction.append(group);
  });
  tray.onclick = cancel;
  tray.ondragover = event => event.preventDefault();
  tray.ondrop = event => { event.preventDefault(); cancel(); };
  board.append(fraction, tray, message);
}
