'use strict';
// Motor da trilha: progressão por maestria, reforço de erros e revisão espaçada.
const $ = id => document.getElementById(id);
const key = 'mathrubi-v2:' + AUTH.user; // um progresso por usuário (ver auth.js)
const GOLD = 0.9; // coroa: acertar de primeira pelo menos 90% dos exercícios. Não há nota mínima para concluir.

let state = {phases: {}, misses: {}};
try {
  const saved = JSON.parse(localStorage.getItem(key));
  if (saved && saved.phases && saved.misses) state = saved;
} catch {}
const save = () => { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} };

const sections = buildPath();
const units = Object.values(SUBJECTS).flatMap(subject => subject.sections.flatMap(section => section.refs.map(([id,u]) => sections.find(s => s.id === id).units[u])));
const phases = units.flatMap(unit => unit.phases);
phases.forEach((phase,i) => { phase.index = i; });
// Catalog groups existing lessons without changing their persisted IDs.
let selectedSubject = 'calculo', selectedSection = null;
try { const savedSubject = localStorage.getItem('mathrubi-subject:' + AUTH.user); if (SUBJECTS[savedSubject]) selectedSubject = savedSubject; } catch {}
const subjectUnits = (subjectId = selectedSubject) => SUBJECTS[subjectId].sections.flatMap(section => section.refs.map(([id,u]) => sections.find(s => s.id === id).units[u]));
const subjectPhases = subjectId => subjectUnits(subjectId).flatMap(unit => unit.phases);
const catalogUnits = section => section.refs.map(([id,u]) => sections.find(s => s.id === id).units[u]);
const catalogPhases = section => catalogUnits(section).flatMap(unit => unit.phases);
const mastery = createMasteryRules(SUBJECTS, section => section.refs.map(([id,u]) => sections.find(s => s.id === id).units[u]), id => state.phases[id]);
const isDone = mastery.phasePassed;
const firstPending = () => { const currentSubjectPhases = new Set(subjectPhases()); return phases.findIndex(phase => currentSubjectPhases.has(phase) && !isDone(phase) && mastery.canStart(phase)); };
const practiceOf = phase => phase.items.filter(item => item.practice);
const xpTotal = () => phases.filter(isDone).reduce((sum, phase) => sum + practiceOf(phase).length * 10, 0);
const medalCount = () => units.filter(unit => unit.phases.every(isDone)).length;
const showXp = () => {
  $('xp').textContent = '⚡ ' + xpTotal() + ' XP  ·  🏅 ' + medalCount();
  const available = subjectPhases();
  const mastered = available.filter(isDone).length;
  $('masteredCount').textContent = mastered + (mastered === 1 ? ' fase' : ' fases');
  const medals = subjectUnits().filter(unit => unit.phases.every(isDone)).length;
  $('medalCount').textContent = medals + (medals === 1 ? ' medalha' : ' medalhas');
  $('journeyFill').style.width = (available.length ? mastered / available.length * 100 : 0) + '%';
  $('journeyCaption').textContent = mastered ? mastered + ' de ' + available.length + ' fases. Continue assim!' : 'Seu primeiro passo começa agora.';
};

let ph, lesson = -1, queue, index, missed, solved, attempts, recapDone;

const normalize = value => String(value).toLowerCase().replace(/\s/g, '')
  .replaceAll('−', '-').replaceAll('–', '-').replaceAll(',', '.').replaceAll('·', '').replaceAll('*', '')
  .replaceAll('²', '^2').replaceAll('³', '^3').replaceAll('sin', 'sen').replace(/^\+/, '')
  .replaceAll('′', "'").replaceAll('’', "'").replaceAll('sqrt', '√').replaceAll('π', 'pi');
function number(value) {
  if (!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:\/[+-]?\d+(?:\.\d+)?)?$/.test(value)) return NaN;
  const [top, bottom = '1'] = value.split('/');
  return Number(top) / Number(bottom);
}
function matches(value, target) {
  const input = normalize(value);
  return String(target).split('|').some(option => {
    const expected = normalize(option);
    if (input === expected) return true;
    const a = number(input), b = number(expected);
    return Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 0.000001;
  });
}

function drawTrack() {
  const subject = SUBJECTS[selectedSubject];
  if (!selectedSection || !subject.sections.some(s => s.id === selectedSection)) selectedSection = subject.sections.find(s => catalogPhases(s).some(p => !isDone(p)))?.id || subject.sections[0].id;
  const selected = subject.sections.find(s => s.id === selectedSection);
  const available = catalogPhases(selected);
  const count = available.filter(isDone).length;
  const current = firstPending();
  showXp();
  $('subjectSelect').value = selectedSubject;
  $('subjectIcon').textContent = subject.icon;
  $('sectionsDescription').textContent = subject.title + ' · ' + subject.sections.length + ' seções. Explore os assuntos e escolha onde continuar.';
  $('mapTitle').textContent = selected.title;
  $('mapEyebrow').textContent = 'SEÇÃO ' + (subject.sections.indexOf(selected) + 1) + (selected.mode === 'review' ? ' · REVISÃO PARA CÁLCULO' : ' · ' + subject.title.toUpperCase());
  $('subjectDescription').textContent = selected.description;
  $('summary').textContent = 'Seção ' + (subject.sections.indexOf(selected) + 1) + ' de ' + subject.sections.length + ' · ' + (available.length ? count + '/' + available.length + ' fases dominadas' : selected.topics.length + ' tópicos planejados');
  const next = available.find(p => !isDone(p)) || available[0];
  // Todas as fases dominadas, mas falta a avaliação final: é ela que libera a próxima seção.
  const needsCheckpoint = available.length > 0 && count === available.length && !mastery.sectionPassed(selectedSubject, selected) && mastery.canCheckpoint(selectedSubject, selected);
  $('resume').disabled = !needsCheckpoint && (!next || !mastery.canStart(next));
  $('resume').textContent = !available.length ? 'Aulas em preparação' : needsCheckpoint ? 'Fazer a avaliação da seção →' : $('resume').disabled ? 'Conclua a seção anterior' : count === available.length ? 'Revisar seção →' : 'Continuar seção →';
  $('resume').onclick = () => { if (needsCheckpoint) startSectionCheckpoint(selectedSubject, selected); else if (next) start(next.index, true); };
  const pool = reviewPool();
  $('review').disabled = pool.length < 4;
  $('review').textContent = pool.length < 4 ? 'Revisão disponível após dominar mais fases' : 'Revisar · ' + Math.min(8,pool.length) + ' questões';
  $('review').onclick = () => startReview(pool);
  $('sectionNav').replaceChildren(...subject.sections.map((section, i) => {
    const button = document.createElement('button');
    button.className = 'section-link';
    if (section.id === selectedSection) button.setAttribute('aria-current','page');
    const number = document.createElement('span'); number.className = 'section-number'; number.textContent = String(i+1).padStart(2,'0');
    const label = document.createElement('span'); label.textContent = section.title;
    const status = document.createElement('small');
    const lessons = catalogPhases(section);
    status.textContent = lessons.length ? lessons.filter(isDone).length + '/' + lessons.length + ' fases' + (mastery.sectionPassed(selectedSubject,section) ? ' · seção dominada' : section.plannedUnits?.length ? ' · conteúdo em expansão' : ' · avaliação de seção pendente') : 'Em preparação';
    label.append(status); button.append(number,label);
    const arrow = document.createElement('span'); arrow.className = 'section-arrow'; arrow.textContent = '→'; button.append(arrow);
    button.onclick = () => { selectedSection = section.id; showMap(); $('mapTitle').scrollIntoView({block:'start'}); };
    return button;
  }));
  const overview = document.createElement('section'); overview.className = 'section-overview';
  const heading = document.createElement('h2'); heading.textContent = selected.mode === 'review' ? 'O que você vai revisar' : 'O que você vai aprender';
  const topics = document.createElement('ul');
  selected.topics.forEach(topic => { const li = document.createElement('li'); li.textContent = topic; topics.append(li); });
  overview.append(heading,topics);
  if (selected.plannedUnits?.length) {
    const status = document.createElement('p'); status.className = 'preparation-status';
    status.textContent = catalogUnits(selected).length + ' de ' + (catalogUnits(selected).length + selected.plannedUnits.length) + ' unidades disponíveis. As demais estão em preparação; a seção ainda não pode ser concluída.';
    overview.append(status);
  }
  if (!available.length) {
    const note = document.createElement('p'); note.className = 'planning-note';
    note.textContent = 'Esta seção faz parte do percurso da disciplina. As aulas e os exercícios ainda estão em preparação.';
    overview.append(note);
  }
  $('sectionOverview').replaceChildren(overview);
  $('track').replaceChildren(...catalogUnits(selected).map((unit,u) => unitView(unit,current,u+1)));
  if (selected.plannedUnits?.length) {
    const roadmap = document.createElement('section'); roadmap.className = 'unit-roadmap';
    const title = document.createElement('h2'); title.textContent = 'Próximas unidades desta seção'; roadmap.append(title);
    selected.plannedUnits.forEach((unit,i) => {
      const details = document.createElement('details');
      const summary = document.createElement('summary'); summary.textContent = (catalogUnits(selected).length+i+1) + '. ' + unit.title + ' · Em preparação';
      const list = document.createElement('ol'); unit.topics.forEach(topic => { const li = document.createElement('li'); li.textContent = topic; list.append(li); });
      details.append(summary,list); roadmap.append(details);
    });
    $('track').append(roadmap);
  }
  const checkpoint = document.createElement('section'); checkpoint.className = 'section-checkpoint';
  const checkpointTitle = document.createElement('h2'); checkpointTitle.textContent = 'Avaliação de domínio da seção';
  const checkpointText = document.createElement('p'); checkpointText.textContent = selected.plannedUnits?.length
    ? 'Esta seção está em expansão. A avaliação final será liberada quando todas as unidades estiverem disponíveis e dominadas. As primeiras unidades já podem ser estudadas.'
    : 'Conclua todas as unidades e a avaliação para liberar a próxima seção. O que você errar volta no final até acertar. Explorar a ementa não libera aulas.';
  const checkpointButton = document.createElement('button'); checkpointButton.className = 'primary';
  checkpointButton.textContent = mastery.sectionPassed(selectedSubject,selected) ? 'Refazer avaliação da seção' : 'Avaliar domínio da seção';
  checkpointButton.disabled = !mastery.canCheckpoint(selectedSubject,selected);
  checkpointButton.onclick = () => startSectionCheckpoint(selectedSubject,selected);
  checkpoint.append(checkpointTitle,checkpointText,checkpointButton); $('track').append(checkpoint);
  const pager = document.createElement('div'); pager.className = 'section-pager';
  const at = subject.sections.indexOf(selected);
  for (const [offset,text] of [[-1,'← Seção anterior'],[1,'Próxima seção →']]) {
    const button = document.createElement('button'); button.textContent = text; button.disabled = !subject.sections[at+offset] || (offset === 1 && !mastery.sectionPassed(selectedSubject,selected));
    if (offset === 1 && subject.sections[at+offset] && !mastery.sectionPassed(selectedSubject,selected)) { button.textContent = 'Próxima seção bloqueada'; button.title = 'Conclua todas as unidades e a avaliação desta seção primeiro.'; }
    button.onclick = () => { selectedSection = subject.sections[at+offset].id; showMap(); $('mapTitle').scrollIntoView({block:'start'}); }; pager.append(button);
  }
  $('track').append(pager);
}
function unitView(unit, current, number) {
  const section = document.createElement('section');
  section.className = 'unit';
  const heading = document.createElement('div');
  heading.className = 'unit-head';
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = 'UNIDADE ' + number + ' · ' + unit.phases.filter(isDone).length + '/' + unit.phases.length + ' FASES';
  const title = document.createElement('h3');
  title.textContent = unit.title;
  const subtitle = document.createElement('p');
  subtitle.textContent = unit.subtitle;
  heading.append(tag, title, subtitle);
  const trail = document.createElement('div');
  trail.className = 'trail';
  unit.phases.forEach((phase, j) => {
    const done = isDone(phase);
    const icon = done ? (state.phases[phase.id] >= GOLD ? '👑' : '✓') : phase.boss ? '🏆' : ['★', '⚡', '◆'][j % 3];
    const wrapper = node(phase.name, icon, mastery.canStart(phase), () => start(phase.index, true), phase.index === current);
    wrapper.style.setProperty('--shift', Math.round(Math.sin(j * 0.95) * 56) + 'px');
    trail.append(wrapper);
  });
  const won = mastery.unitPassed(unit);
  trail.append(node(won ? 'Medalha conquistada' : 'Medalha da unidade', won ? '🏅' : '🔒', won,
    () => start(unit.phases.at(-1).index, true), false, true));
  section.append(heading, trail);
  return section;
}
function node(name, icon, enabled, action, current, chest = false) {
  const wrapper = document.createElement('div');
  wrapper.className = 'phase';
  const button = document.createElement('button');
  button.className = chest ? 'node chest' : 'node';
  if (chest) {
    const image = document.createElement('img');
    image.src = 'assets/chest.svg'; image.alt = ''; image.width = 66; image.height = 60;
    button.append(image);
  } else button.textContent = enabled ? icon : '🔒';
  button.setAttribute('aria-label', name + (enabled ? '' : ' (bloqueada)'));
  if (current) {
    button.setAttribute('aria-current', 'true');
    const callout = document.createElement('span'); callout.className = 'node-callout'; callout.textContent = 'COMEÇAR';
    callout.setAttribute('aria-hidden','true'); wrapper.append(callout);
  }
  button.disabled = !enabled;
  button.onclick = action;
  const label = document.createElement('span');
  label.textContent = name;
  wrapper.append(button, label);
  return wrapper;
}

// ---- Revisão espaçada: mistura itens simples de fases já dominadas, priorizando os mais errados.
function reviewPool(subjectId) {
  return subjectPhases(subjectId).filter(isDone).flatMap(phase => phase.items.filter(item => item.practice && !item.question[7]))
    .sort((a, b) => (state.misses[b.id] || 0) - (state.misses[a.id] || 0) || a.id.localeCompare(b.id));
}
function startReview(pool) {
  const picked = pool.slice(0, 12).sort(() => Math.random() - 0.5).slice(0, 8);
  begin({id: 'review', name: 'Revisão espaçada', review: true, items: picked}, -1);
}

function start(i, focus) {
  if (!phases[i] || !mastery.canStart(phases[i])) return;
  begin(phases[i], i, focus);
}
function begin(phase, i, focus = true) {
  closePracticePanels();
  $('sectionsScreen').hidden = true;
  setActiveNavigation('navLearn');
  document.body.classList.remove('journey-visible');
  document.body.classList.add('lesson-active');
  $('map').hidden = true;
  $('play').hidden = false;
  ph = phase;
  lesson = i;
  queue = ph.items.map((_, j) => j);
  missed = new Set();
  index = 0;
  recapDone = false;
  draw(focus);
}
const accuracy = () => {
  const total = practiceOf(ph).length;
  return total ? 1 - missed.size / total : 1;
};
function markMiss(taskIndex, again) {
  const item = ph.items[taskIndex];
  if (!item.practice) return;
  missed.add(taskIndex);
  if (!ph.generated) {
    state.misses[item.id] = (state.misses[item.id] || 0) + 1;
    save();
  }
  if (again && !queue.slice(index + 1).includes(taskIndex)) queue.push(taskIndex);
}
function draw(focus) {
  solved = false;
  attempts = 0;
  const item = ph.items[queue[index]];
  const task = item?.question;
  $('feedback').textContent = '';
  $('hintText').textContent = '';
  $('choices').replaceChildren();
  $('progress').max = queue.length;
  $('progress').value = index;
  if (!task) return drawEnd(focus);
  // Fim da primeira passada com erros: o Rubi explica de novo antes de o aluno refazer o que errou.
  if (index === ph.items.length && !recapDone) { recapDone = true; return drawRecap(focus); }
  const again = index >= ph.items.length;
  $('step').textContent = ph.name.toUpperCase() + ' · ' + (again ? 'REFORÇO DO ERRO' : (index + 1) + '/' + ph.items.length);
  $('title').textContent = task[0];
  $('prompt').textContent = task[1];
  const board = task[7];
  const pill = board?.type === 'pill';
  $('play').classList.toggle('board-mode', Boolean(board));
  $('play').classList.toggle('pill-mode', pill);
  $('formula').hidden = Boolean(board);
  $('board').hidden = !board;
  drawBoard($('board'), board, () => submit('feito'), () => markMiss(queue[index], false));
  $('formula').textContent = task[2];
  $('answer').value = '';
  $('answer').disabled = $('check').disabled = false;
  $('form').hidden = Boolean(task[6] || board);
  $('hint').hidden = pill || !task[4];
  $('solution').hidden = true;
  $('next').hidden = true;
  $('next').textContent = 'Continuar →';
  if (task[6]) {
    for (const choice of task[6]) {
      const button = document.createElement('button');
      button.textContent = choice;
      button.onclick = () => submit(choice);
      $('choices').append(button);
    }
  }
  if (focus) $('title').focus();
}
// Diz ao aluno exatamente o que o domínio desta fase liberou (ou o que ainda falta).
function locate(phase) {
  for (const [subjectId, subject] of Object.entries(SUBJECTS)) for (const section of subject.sections) {
    const list = catalogUnits(section), u = list.findIndex(unit => unit.phases.includes(phase));
    if (u >= 0) return {subjectId, section, list, u, unit: list[u]};
  }
  return null;
}
function sectionRelease(subjectId, section) {
  const sectionsOfSubject = SUBJECTS[subjectId].sections, nextSection = sectionsOfSubject[sectionsOfSubject.indexOf(section) + 1];
  if (!nextSection) return ' Você concluiu a última seção desta disciplina!';
  return catalogPhases(nextSection).length ? ' A próxima seção, “' + nextSection.title + '”, está liberada.' : ' A próxima seção, “' + nextSection.title + '”, ainda está em preparação.';
}
function releaseMessage(phase) {
  const at = locate(phase);
  if (!at) return '';
  const nextPhase = at.unit.phases[at.unit.phases.indexOf(phase) + 1];
  if (nextPhase) return mastery.canStart(nextPhase) ? ' A próxima fase, “' + nextPhase.name + '”, está liberada.' : '';
  if (!mastery.unitPassed(at.unit)) return ' Para fechar a unidade, todas as fases precisam estar dominadas.';
  const nextUnit = at.list[at.u + 1];
  if (nextUnit) return ' Unidade concluída! A próxima unidade, “' + nextUnit.title + '”, está liberada.';
  return mastery.canCheckpoint(at.subjectId, at.section)
    ? ' Você concluiu todas as unidades desta seção. Falta a avaliação de domínio da seção (botão “Fazer a avaliação da seção” no mapa) para liberar a próxima.'
    : ' Você concluiu as unidades desta seção.';
}
// Revisão antes de refazer: reexplica a regra da fase e dá as pistas dos exercícios errados.
function recapConfig() {
  const redo = [...new Set(queue.slice(ph.items.length))];
  const theory = ph.items.find(item => item.question[7]?.type === 'pill')?.question[7];
  const lines = ['Você errou ' + redo.length + (redo.length === 1 ? ' exercício' : ' exercícios') + ' desta fase, e tudo bem: é assim que se aprende. Antes de refazer, vou explicar de novo a parte que escapou.'];
  if (theory) lines.push(...theory.lines);
  const tips = redo.slice(0, 3).map(i => ph.items[i].question).filter(q => q[4]).map(q => '“' + q[0] + '”: ' + q[4]);
  if (tips.length) lines.push('Pistas para o que você errou. ' + tips.join(' · '));
  lines.push('Pronto! Vamos refazer ' + (redo.length === 1 ? 'o exercício' : 'os exercícios') + ' agora, até acertar.');
  return {type: 'pill', lines, formula: theory?.formula || ''};
}
function drawRecap(focus) {
  solved = false;
  attempts = 0;
  $('feedback').textContent = '';
  $('hintText').textContent = '';
  $('choices').replaceChildren();
  $('progress').max = queue.length;
  $('progress').value = index;
  $('step').textContent = ph.name.toUpperCase() + ' · REVISÃO ANTES DE REFAZER';
  $('title').textContent = 'Vamos rever o que escapou';
  $('prompt').textContent = 'O Rubi quer explicar de novo.';
  $('play').classList.add('board-mode', 'pill-mode');
  $('formula').hidden = true;
  $('board').hidden = false;
  $('form').hidden = $('hint').hidden = $('solution').hidden = $('next').hidden = true;
  drawBoard($('board'), recapConfig(), () => draw(true));
  if (focus) $('title').focus();
}
function drawEnd(focus) {
  const pct = Math.round(accuracy() * 100);
  const total = practiceOf(ph).length;
  // Chegar ao fim significa que todos os exercícios foram acertados (os errados voltaram até acertar).
  if (!ph.review) {
    state.phases[ph.id] = Math.max(state.phases[ph.id] || 0, accuracy());
    save();
  }
  $('play').classList.remove('board-mode', 'pill-mode');
  $('board').hidden = $('formula').hidden = $('form').hidden = $('hint').hidden = true;
  $('solution').hidden = true;
  $('step').textContent = ph.checkpointSection ? 'FIM DA AVALIAÇÃO DA SEÇÃO' : 'FIM DA FASE';
  $('progress').max = $('progress').value = 1;
  showXp();
  const hits = total - missed.size;
  const redone = missed.size ? ' Os exercícios que você errou foram refeitos até acertar.' : ' Sem nenhum erro!';
  $('title').textContent = ph.checkpointSection ? 'Seção dominada!' : accuracy() >= GOLD ? 'Fase concluída com ouro! 👑' : 'Fase concluída!';
  $('prompt').textContent = 'Você acertou ' + hits + ' de ' + total + ' de primeira (' + pct + '%).' + redone +
    (ph.review ? '' : ph.checkpointSection ? sectionRelease(ph.checkpointSubject, ph.checkpointSection) : releaseMessage(ph));
  $('next').hidden = false;
  $('next').textContent = 'Voltar ao mapa →';
  $('next').onclick = showMap;
  if (focus) $('title').focus();
}
function submit(value) {
  if (solved || !String(value).trim()) return;
  const taskIndex = queue[index];
  const {question: task, id} = ph.items[taskIndex];
  const board = task[7];
  attempts++;
  const correct = matches(value, task[3]);
  $('feedback').dataset.ok = correct;
  $('solution').hidden = correct || attempts < 2;
  if (!correct) {
    $('feedback').textContent = 'Ainda não. Tente de novo ou peça uma pista.';
    markMiss(taskIndex, true);
    return;
  }
  if (attempts === 1 && state.misses[id] > 0 && ph.items[taskIndex].practice && !missed.has(taskIndex)) {
    state.misses[id]--; // acertou de primeira numa revisão: o item "esfria"
    save();
  }
  solved = true;
  $('feedback').textContent = board?.type === 'pill' ? '' : board ? '✓ Muito bem!' : '✓ Certo!';
  $('hintText').textContent = task[5];
  $('next').hidden = false;
  $('next').onclick = advance;
  $('answer').disabled = $('check').disabled = true;
  for (const button of $('choices').children) button.disabled = true;
  $('progress').max = queue.length;
  $('progress').value = index + 1;
  $('next').focus();
}
function advance() {
  index++;
  draw(true);
}
$('form').onsubmit = event => { event.preventDefault(); submit($('answer').value); };
$('hint').onclick = () => {
  if (!solved) $('hintText').textContent = ph.items[queue[index]].question[4];
};
$('solution').onclick = () => {
  if (!attempts) return;
  solved = true;
  $('solution').hidden = true;
  $('answer').disabled = $('check').disabled = true;
  for (const button of $('choices').children) button.disabled = true;
  $('hintText').textContent = 'Resposta: ' + ph.items[queue[index]].question[3].split('|')[0] + '. ' + ph.items[queue[index]].question[5];
  $('next').hidden = false;
  $('next').onclick = advance;
};
function showMap() {
  closePracticePanels();
  $('sectionsScreen').hidden = true;
  setActiveNavigation('navLearn');
  document.body.classList.remove('journey-visible');
  document.body.classList.remove('lesson-active');
  $('play').hidden = true;
  $('map').hidden = false;
  drawTrack();
  const next = $('track').querySelector('[aria-current="true"]');
  $('mapTitle').focus({preventScroll:true});
}
$('back').onclick = showMap;
$('coachBadge').innerHTML = RUBI_SVG;
drawTrack();

$('sideReview').onclick = () => openPracticePanel(practicePanel, 'sideReview');

$('navLearn').onclick = showMap;
$('navAchievements').onclick = () => { showMap(); setActiveNavigation('navAchievements'); document.body.classList.add('journey-visible'); window.scrollTo({top:0, behavior:'smooth'}); };

$('subjectSelect').onchange = event => {
  selectedSubject = event.target.value; selectedSection = null;
  try { localStorage.setItem('mathrubi-subject:' + AUTH.user, selectedSubject); } catch {}
  showSections();
};

function setActiveNavigation(id) {
  for (const button of document.querySelectorAll('.side-link')) {
    button.classList.toggle('active',button.id === id);
    if (button.id === id) button.setAttribute('aria-current','page');
    else button.removeAttribute('aria-current');
  }
}
function showSections() {
  closePracticePanels();
  document.body.classList.remove('journey-visible','lesson-active');
  drawTrack();
  $('map').hidden = $('play').hidden = true;
  $('sectionsScreen').hidden = false;
  setActiveNavigation('navSections');
  $('sectionsTitle').focus({preventScroll:true}); window.scrollTo({top:0});
}
$('navSections').onclick = showSections;

const settingsButton = document.createElement('button');
settingsButton.id = 'navSettings';
settingsButton.className = 'side-link';
settingsButton.innerHTML = '<span aria-hidden="true">⚙</span> Configurações';
document.querySelector('.sidebar-footer').before(settingsButton);
const practicePanel = document.createElement('section');
const settingsPanel = document.createElement('section');
for (const panel of [practicePanel, settingsPanel]) {
  panel.hidden = true;
  panel.className = 'practice-panel';
  $('map').before(panel);
}
const themeLink = document.createElement('link');
themeLink.rel = 'stylesheet';
themeLink.href = 'practice.css?v=16';
document.head.append(themeLink);
const themeKey = 'mathrubi-theme:' + AUTH.user;
let apiKey = '';
let pendingPractice;
settingsPanel.innerHTML = `
  <h1 tabindex="-1">Configurações</h1>
  <div class="practice-box"><h2>Conta</h2><p id="settingsAccount"></p><button id="settingsLogout">Sair da conta</button></div>
  <div class="practice-box"><h2>Aparência</h2><label for="practiceTheme">Tema</label>
    <select id="practiceTheme"><option value="light">Claro</option><option value="dark">Escuro</option></select></div>
  <div class="practice-box"><h2>IA · NVIDIA</h2>
    <p>Entre no catálogo da NVIDIA, abra o modelo Llama 3.3 70B Instruct e use “Get API Key”.
    <a href="https://build.nvidia.com/meta/llama-3_3-70b-instruct" target="_blank" rel="noopener noreferrer">Abrir NVIDIA Build</a></p>
    <form id="practiceKeyForm"><label for="practiceKey">Chave de API da NVIDIA</label>
      <input id="practiceKey" type="password" placeholder="nvapi-…" autocomplete="off" required maxlength="206">
      <div class="actions"><button class="primary">Usar nesta sessão</button><button type="button" id="practiceDisconnect">Desconectar</button></div>
    </form>
    <p id="practiceKeyStatus" role="status">A chave fica em memória até recarregar ou sair.</p>
  </div>`;
practicePanel.innerHTML = `
  <h1 tabindex="-1">Praticar</h1>
  <div class="practice-box"><h2>Exercícios com IA</h2>
    <p>O Rubi usa apenas as fases que você já concluiu neste curso.</p>
    <label for="practiceCourse">Curso</label><select id="practiceCourse"></select>
    <p id="practiceScope"></p>
    <div class="actions"><button id="practiceGenerate" class="primary">Gerar 4 exercícios</button><button id="practiceSettings">Configurar NVIDIA</button></div>
    <p id="practiceStatus" role="status"></p>
  </div>
  <div class="practice-box"><h2>Revisão espaçada</h2><p>Reveja questões do curso selecionado, com prioridade para seus erros.</p>
    <button id="practiceReview">Revisar questões</button></div>`;
$('settingsAccount').textContent = '@' + AUTH.user;
$('settingsLogout').onclick = () => document.querySelector('header > span:last-child button').click();
try { $('practiceTheme').value = localStorage.getItem(themeKey) === 'dark' ? 'dark' : 'light'; } catch {}
document.documentElement.dataset.theme = $('practiceTheme').value;
$('practiceTheme').onchange = () => {
  document.documentElement.dataset.theme = $('practiceTheme').value;
  try { localStorage.setItem(themeKey, $('practiceTheme').value); } catch {}
};
$('practiceKeyForm').onsubmit = event => {
  event.preventDefault();
  const entered = $('practiceKey').value.trim();
  $('practiceKey').value = '';
  if (!/^nvapi-[\w-]{8,200}$/.test(entered)) {
    $('practiceKeyStatus').textContent = 'Confira o formato da chave NVIDIA (nvapi-…).';
    return;
  }
  apiKey = entered;
  $('practiceKeyStatus').textContent = 'Chave configurada nesta sessão. A NVIDIA a verifica ao gerar exercícios.';
};
$('practiceDisconnect').onclick = () => {
  apiKey = '';
  $('practiceKey').value = '';
  $('practiceKeyStatus').textContent = 'Chave removida.';
};
for (const [id, subject] of Object.entries(SUBJECTS)) $('practiceCourse').add(new Option(subject.title, id));
$('practiceCourse').value = selectedSubject;
settingsButton.onclick = () => openPracticePanel(settingsPanel, 'navSettings');
$('practiceSettings').onclick = settingsButton.onclick;

function closePracticePanels() {
  pendingPractice?.abort();
  pendingPractice = undefined;
  practicePanel.hidden = settingsPanel.hidden = true;
}

function openPracticePanel(panel, id) {
  closePracticePanels();
  $('map').hidden = $('play').hidden = $('sectionsScreen').hidden = true;
  document.body.classList.remove('journey-visible', 'lesson-active');
  setActiveNavigation(id);
  panel.hidden = false;
  if (panel === practicePanel) {
    $('practiceStatus').textContent = '';
    updatePracticeScope();
  }
  panel.querySelector('h1').focus();
}

function studiedTopics(subjectId) {
  return SUBJECTS[subjectId].sections.flatMap(section => catalogUnits(section).flatMap(unit =>
    unit.phases.filter(isDone).map(phase => section.title + ' / ' + unit.title + ' / ' + phase.name)));
}

function updatePracticeScope() {
  const course = $('practiceCourse').value;
  const topics = studiedTopics(course);
  $('practiceScope').textContent = topics.length
    ? topics.length + ' fases concluídas. Mais recente na trilha: ' + topics.at(-1) + '.'
    : 'Conclua pelo menos uma fase deste curso para gerar exercícios.';
  $('practiceGenerate').disabled = !apiKey || !topics.length || Boolean(pendingPractice);
  $('practiceSettings').hidden = Boolean(apiKey);
  $('practiceReview').disabled = reviewPool(course).length < 4;
}
$('practiceCourse').onchange = () => {
  pendingPractice?.abort();
  pendingPractice = undefined;
  $('practiceStatus').textContent = '';
  updatePracticeScope();
};
$('practiceReview').onclick = () => startReview(reviewPool($('practiceCourse').value));
$('practiceGenerate').onclick = async () => {
  const course = $('practiceCourse').value;
  const topics = studiedTopics(course);
  if (!apiKey || !topics.length || pendingPractice) return;
  const request = new AbortController();
  pendingPractice = request;
  updatePracticeScope();
  $('practiceStatus').textContent = 'Gerando exercícios com a NVIDIA…';
  try {
    const response = await fetch('/api/practice', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey},
      body: JSON.stringify({course: SUBJECTS[course].title, topics}),
      signal: request.signal
    });
    if (response.status === 404 || !response.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Esta hospedagem precisa da rota de IA. Para testar localmente, execute node tools/serve.js.');
    }
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);
    if (pendingPractice !== request) return;
    const items = result.items.map((item, i) => ({
      id: 'generated:' + i, practice: true,
      question: ['Desafio de prática', 'Resolva e informe o resultado numérico.', item.prompt, String(item.answer), item.hint, item.explanation]
    }));
    begin({id: 'generated', name: 'Prática com IA', review: true, generated: true, items}, -1);
  } catch (error) {
    if (pendingPractice === request) $('practiceStatus').textContent = location.protocol === 'file:'
      ? 'Abra o app pelo servidor local: node tools/serve.js.'
      : error instanceof TypeError ? 'Não foi possível conectar ao servidor do MathRubi.' : error.message;
  } finally {
    if (pendingPractice === request) {
      pendingPractice = undefined;
      updatePracticeScope();
    }
  }
};

function startSectionCheckpoint(subjectId, section) {
  if (!mastery.canCheckpoint(subjectId,section)) return;
  const id = mastery.checkpointId(subjectId,section.id);
  const items = catalogUnits(section).flatMap((unit,u) => {
    const boss = unit.phases.findLast(p => p.boss);
    // Two reasoning tasks from every unit: no unit is omitted from the assessment.
    const candidates = boss.items.filter(item => item.practice && !item.question[6] && !item.question[7]);
    const selected = candidates.slice(-2);
    return selected.map((item,i) => ({...item,id:id+':'+u+':'+i}));
  });
  begin({id,name:'Avaliação: ' + section.title,boss:true,items,checkpointSection:section,checkpointSubject:subjectId},-1);
}
