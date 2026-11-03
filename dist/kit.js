'use strict';
// Kit de autoria: funções puras (sem DOM) para escrever lições. Carregado antes dos arquivos content-*.js.
// Layout de um item (array): [título, enunciado, fórmula, resposta, pista, explicação, alternativas|null, config-do-board|undefined]

// Pergunta objetiva. Com `choices` vira escolha (use só para reconhecer/classificar); sem `choices`, o aluno digita.
// `answer` aceita variantes separadas por "|" (ex.: '3/2|1,5').
const task = (title, formula, answer, hint, explanation, choices) =>
  [title, choices ? 'Escolha a melhor opção.' : 'Resolva e digite o resultado.', formula, answer, hint, explanation, choices || null];

// Resolver no papel e digitar só o resultado final.
const paper = (title, formula, answer, hint, explanation) =>
  [title, 'Resolva no papel e digite apenas o resultado.', formula, answer, hint, explanation, null];

// Interação de board (arrastar, deslizar…), concluída sem resposta digitada.
const coach = (title, prompt, config, hint, explanation) =>
  [title, prompt, '', 'feito', hint, explanation, null, config];

// Pílula teórica do Rubi: 2 a 5 falas curtas; `formula` (opcional) fica em destaque. Não vale XP.
const pill = (title, lines, formula) =>
  [title, 'O Rubi quer te mostrar uma ideia.', '', 'feito', '', '', null, {type: 'pill', lines, formula: formula || ''}];

// Um passo de raciocínio guiado. `choices` opcional (se omitido, o aluno digita).
const step = (ask, answer, hint, why, choices) => ({ask, answer, hint, why, choices: choices || null});

// Problema resolvido passo a passo (3 a 5 passos). O aluno constrói o raciocínio, um micro-passo por vez.
const guided = (title, formula, steps, summary) =>
  [title, 'Vamos resolver juntos, um passo de cada vez.', '', 'feito', 'Responda o passo atual. A pista não custa nada.', summary || '', null, {type: 'steps', formula, steps}];

// Ordenar passos de uma resolução. `steps` já na ordem CORRETA (o app embaralha).
const order = (title, formula, steps, explanation) =>
  [title, 'Toque nos passos na ordem em que você os usaria.', '', 'feito', 'Pergunte-se: o que precisa estar pronto antes do próximo passo?', explanation, null, {type: 'order', formula, steps}];

function near(target, shift, side) {
  return {type: 'near', target, shift, side};
}

function factors(root) {
  const factor = '(x − ' + root + ')';
  return {type: 'factors', numerator: [factor, '(x + ' + root + ')'], denominator: [factor]};
}

// Fase = ~3 a 8 itens. `boss: true` marca o desafio que fecha a unidade.
const phase = (name, items, opts = {}) => ({name, items, boss: Boolean(opts.boss)});
const unit = (title, subtitle, phases) => ({title, subtitle, phases});

// Seções do curso, na ordem da trilha. Cada content-*.js faz COURSE.<id>.units.push(unit(...)).
const COURSE = {
  precalculoNumeros: {title: 'Números e operações', tag: 'PRÉ-CÁLCULO · REFORÇO', progressId: 'fundamentos', units: []},
  limites: {title: 'Limites', tag: 'MAC210 · SEÇÃO 1', units: []},
  derivadas: {title: 'Derivadas', tag: 'MAC210 · SEÇÃO 2', units: []}
};
