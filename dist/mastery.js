// Pure progression policy shared by the lesson engine and its verification.
// Completed lesson IDs stay stable when the catalog is reorganized.
// Como no Duolingo, não há nota de corte: uma fase conta como concluída quando foi terminada (o motor só termina
// quando todos os exercícios foram acertados; os errados voltam no final). A nota guardada só decide a coroa.
function createMasteryRules(subjects, resolveUnits, score) {
  const finished = value => value !== undefined && value !== null && Number.isFinite(Number(value));
  const phasePassed = phase => finished(score(phase.id));
  const unitPassed = unit => unit.phases.length > 0 && unit.phases.some(p => p.boss) && unit.phases.every(phasePassed);
  const checkpointId = (subjectId, sectionId) => 'checkpoint:' + subjectId + ':' + sectionId;
  const contentReady = section => !(section.plannedUnits?.length) && resolveUnits(section).length > 0;
  const sectionPassed = (subjectId, section) => contentReady(section) && resolveUnits(section).every(unitPassed) && finished(score(checkpointId(subjectId,section.id)));
  const previousSectionsPassed = (subjectId, section) => {
    const ordered = subjects[subjectId].sections;
    const at = ordered.indexOf(section);
    return at >= 0 && ordered.slice(0,at).every(s => sectionPassed(subjectId,s));
  };
  const canCheckpoint = (subjectId, section) => contentReady(section) && previousSectionsPassed(subjectId,section) && resolveUnits(section).every(unitPassed);
  const canStart = phase => {
    // A previously mastered lesson always remains available for review.
    if (phasePassed(phase)) return true;
    for (const [subjectId,subject] of Object.entries(subjects)) {
      for (const section of subject.sections) {
        const units = resolveUnits(section);
        for (let u=0;u<units.length;u++) {
          const at = units[u].phases.findIndex(p => p.id === phase.id);
          if (at < 0) continue;
          return previousSectionsPassed(subjectId,section) && units.slice(0,u).every(unitPassed) && units[u].phases.slice(0,at).every(phasePassed);
        }
      }
    }
    return false;
  };
  return {phasePassed,unitPassed,sectionPassed,checkpointId,contentReady,canCheckpoint,canStart};
}
