'use strict';
// Meaningful prerequisite checks with partial/failed mastery and section boundaries.
const assert = require('node:assert/strict');
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname,'..','dist');
const ctx = vm.createContext({console});
const files = ['kit.js',...fs.readdirSync(dir).filter(f=>/^content-.*\.js$/.test(f)).sort(),'path.js','catalog.js','mastery.js'];
for (const file of files) vm.runInContext(fs.readFileSync(path.join(dir,file),'utf8'),ctx);
const result = vm.runInContext(`(()=>{
  const sections = buildPath();
  const resolve = s => s.refs.map(([id,u]) => sections.find(x=>x.id===id).units[u]);
  const scores = {};
  const rules = createMasteryRules(SUBJECTS,resolve,id=>scores[id]);
  const first = SUBJECTS.calculo.sections[0];
  const authored = resolve(first);
  const [a,b] = authored;
  const next = resolve(SUBJECTS.calculo.sections[1])[0].phases[0];
  const tests = [];
  const test = (name,condition) => {if(!condition)throw Error(name);tests.push(name);};
  test('the first section is the first authored lesson of Calculus',first.id==='limites'&&authored.length===6&&!first.plannedUnits?.length);
  test('no removed review section remains in the catalog',!SUBJECTS.calculo.sections.some(s=>s.id==='introducao')&&!sections.some(s=>s.id==='fundamentos'));
  test('first lesson is available',rules.canStart(a.phases[0]));
  test('second lesson starts locked',!rules.canStart(a.phases[1]));
  scores[a.phases[0].id]=0;
  test('finishing a phase releases the next one even with 0% first-try hits (errors are redone until right)',rules.canStart(a.phases[1]));
  scores[a.phases[0].id]=0.5;
  test('there is no minimum score: 50% first-try hits also releases the next phase',rules.canStart(a.phases[1]));
  delete scores[a.phases[0].id];
  test('an unfinished phase keeps the next one locked',!rules.canStart(a.phases[1]));
  scores[a.phases[0].id]=1;
  // Finishing a phase must release exactly the next one, for every phase of every authored section.
  for(const subjectId of Object.keys(SUBJECTS)) for(const section of SUBJECTS[subjectId].sections) {
    const units=resolve(section);
    for(const k of Object.keys(scores)) delete scores[k];
    // Dominar tudo antes desta seção
    const done=new Set();
    SUBJECTS[subjectId].sections.slice(0,SUBJECTS[subjectId].sections.indexOf(section)).forEach(prev=>{resolve(prev).forEach(u=>u.phases.forEach(p=>scores[p.id]=1));scores[rules.checkpointId(subjectId,prev.id)]=1;});
    units.forEach((unit,ui)=>unit.phases.forEach((phase,pi)=>{
      test(subjectId+'/'+section.id+' u'+(ui+1)+' f'+(pi+1)+' opens after the previous one is mastered',rules.canStart(phase));
      scores[phase.id]=1;
    }));
  }
  for(const k of Object.keys(scores)) delete scores[k];
  a.phases.forEach(p=>scores[p.id]=1);
  const boss=a.phases.find(p=>p.boss);delete scores[boss.id];
  test('an unfinished boss keeps the next unit locked',!rules.canStart(b.phases[0]));
  scores[boss.id]=0;
  test('finishing the boss after all phases opens the next unit',rules.canStart(b.phases[0]));
  test('completed lessons remain reviewable',rules.canStart(a.phases[0]));
  b.phases.forEach(p=>scores[p.id]=1);
  const id=rules.checkpointId('calculo',first.id);
  scores[id]=1;
  test('two mastered units do not complete the section',!rules.sectionPassed('calculo',first));
  test('two mastered units do not unlock the section assessment',!rules.canCheckpoint('calculo',first));
  test('next section remains locked while current section is unfinished',!rules.canStart(next));
  authored.slice(2,-1).forEach(u=>u.phases.forEach(p=>scores[p.id]=1));
  test('one unmastered unit still blocks the assessment',!rules.canCheckpoint('calculo',first));
  authored.at(-1).phases.forEach(p=>delete scores[p.id]);
  test('an unfinished unit keeps the section assessment locked',!rules.canCheckpoint('calculo',first));
  authored.at(-1).phases.forEach(p=>scores[p.id]=1);
  delete scores[id];
  test('all unit bosses alone do not complete section',!rules.sectionPassed('calculo',first));
  test('all unit bosses make section assessment available',rules.canCheckpoint('calculo',first));
  test('without the section assessment the next section stays locked',!rules.canStart(next));
  scores[id]=0;
  test('finishing the section assessment plus all units releases the next section',rules.canStart(next));
  // Validate mapping and IDs: no lesson can disappear from the catalog.
  const mapped=Object.values(SUBJECTS).flatMap(s=>s.sections.flatMap(resolve));
  test('every authored unit appears once',mapped.length===new Set(mapped).size&&mapped.length===sections.flatMap(s=>s.units).length);
  test('legacy limit IDs are unchanged',sections.find(s=>s.id==='limites').units[0].phases[0].id==='limites:0:0');
  const basics = resolve(SUBJECTS.precalculo.sections[0]);
  test('old basics IDs follow the content to pre-calculus',basics[0].phases[0].id==='fundamentos:0:0');
  const oldScores = {'fundamentos:0:0':1};
  const freshRules = createMasteryRules(SUBJECTS,resolve,id=>oldScores[id]);
  test('old elementary mastery remains available in pre-calculus',freshRules.phasePassed(basics[0].phases[0]));
  test('pre-calculus starts independently of calculus',freshRules.canStart(basics[0].phases[1]));
  // Every unit must have a genuine final challenge.
  for(const unit of mapped) test(unit.title+' ends in a boss',unit.phases.at(-1).boss);
  // Section assessments need independent answers from EVERY unit, not only recognition tasks.
  for(const unit of mapped){const boss=unit.phases.findLast(p=>p.boss);test('assessment coverage: '+unit.title,boss.items.filter(x=>!x.question[6]&&!x.question[7]&&x.practice).length>=2);}
  return tests.length;
})()`,ctx);
assert.ok(result>60);
console.log('OK: '+result+' checks of mastery, prerequisites, curriculum and assessment coverage.');
