// Uso: node tools/validate.js   (a partir da pasta MathRubi)
// Carrega kit.js + content-*.js e confere estrutura, alternativas e contagens.
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, '..', 'dist');
const files = ['kit.js', ...fs.readdirSync(dir).filter(f => /^content-.*\.js$/.test(f)).sort()];
const ctx = vm.createContext({console});
vm.runInContext(files.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n;\n') + '\n;this.COURSE = COURSE;', ctx);
const COURSE = ctx.COURSE;
const norm = s => String(s).toLowerCase().replace(/\s/g, '').replaceAll('−', '-').replaceAll(',', '.');
let errors = 0, total = 0;
const bad = (where, msg) => { errors++; console.log('ERRO ' + where + ': ' + msg); };
for (const [sid, sec] of Object.entries(COURSE)) {
  let phases = 0, items = 0, pills = 0;
  sec.units.forEach((u, ui) => {
    let n = 0;
    u.phases.forEach((p, pi) => {
      const w = `${sid} U${ui + 1} F${pi + 1} "${p.name}"`;
      if (!p.items.length) bad(w, 'fase vazia');
      phases++;
      p.items.forEach((it, ii) => {
        const iw = `${w} item ${ii + 1} "${it[0]}"`;
        items++; n++; total++;
        if (!Array.isArray(it) || it.length < 7) return bad(iw, 'item mal formado');
        const cfg = it[7];
        if (cfg && cfg.type === 'pill') {
          pills++;
          if (!cfg.lines || cfg.lines.length < 2 || cfg.lines.length > 6) bad(iw, 'pílula precisa de 2 a 6 falas');
          return;
        }
        if (cfg && cfg.type === 'steps') {
          if (!cfg.steps || cfg.steps.length < 2) bad(iw, 'guided precisa de 2+ passos');
          (cfg.steps || []).forEach((s, k) => {
            if (!s.ask || s.answer === undefined || !s.hint || !s.why) bad(iw, 'passo ' + (k + 1) + ' incompleto');
            if (s.choices && !s.choices.some(c => s.answer.split('|').some(a => norm(a) === norm(c)))) bad(iw, 'passo ' + (k + 1) + ': resposta fora das alternativas');
          });
          return;
        }
        if (cfg && cfg.type === 'order') { if (!cfg.steps || cfg.steps.length < 3) bad(iw, 'order precisa de 3+ passos'); return; }
        if (cfg) return; // near / factors
        if (!it[3] || !it[4] || !it[5]) bad(iw, 'faltam resposta/pista/explicação');
        if (it[6] && !it[6].some(c => it[3].split('|').some(a => norm(a) === norm(c)))) bad(iw, 'resposta "' + it[3] + '" não está nas alternativas');
        if (it[6] && new Set(it[6].map(norm)).size !== it[6].length) bad(iw, 'alternativas repetidas');
      });
    });
    console.log(`  ${sid} U${ui + 1} ${u.title}: ${u.phases.length} fases, ${n} itens`);
  });
  console.log(`${sid}: ${sec.units.length} unidades, ${phases} fases, ${items} itens (${pills} pílulas)`);
}
console.log(errors ? errors + ' erro(s)' : 'OK (' + total + ' itens)');
process.exit(errors ? 1 : 0);
