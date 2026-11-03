// Monta a trilha a partir de COURSE (kit.js + content-*.js).
// Hierarquia: seção → unidade → fase → item. progressId mantém os IDs quando um conteúdo muda de disciplina.
const isPractice = question => !(question[7] && question[7].type === 'pill');

function buildPath() {
  let offset = 0;
  return Object.entries(COURSE).filter(([, section]) => section.units.length).map(([sectionId, section]) => ({
    id: sectionId, title: section.title, tag: section.tag,
    units: section.units.map((unit, u) => ({
      title: unit.title, subtitle: unit.subtitle, number: u + 1, section: sectionId,
      phases: unit.phases.map((phase, p) => {
        const id = (section.progressId || sectionId) + ':' + u + ':' + p;
        return {
          id, name: phase.name, boss: phase.boss, index: offset++,
          items: phase.items.map((question, i) => ({question, id: id + ':' + i, practice: isPractice(question)}))
        };
      })
    }))
  }));
}
