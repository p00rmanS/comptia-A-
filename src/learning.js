export function matchesLesson(lesson, query) {
 const text = [lesson.title, lesson.big, lesson.exam, lesson.tech, lesson.taglish,
  lesson.analogy, lesson.tip, lesson.goals, lesson.terms, lesson.steps,
  lesson.summary, lesson.confusion, lesson.lab?.task, lesson.lab?.answer];
 return text.flat(Infinity).filter(Boolean).join(' ').toLowerCase().includes(query.trim().toLowerCase());
}

export function completedCount(completed, lessons) {
 const known = new Set(lessons.map(l => l.id));
 return new Set(completed.filter(id => known.has(id))).size;
}

// Legacy practice records used only the first check and stored check:null.
export function missedChecks(answers, id) {
 const latest = new Map();
 for (const answer of answers) {
  if (answer.id === id && ['lesson','lesson-previous','practice'].includes(answer.context)) {
   latest.set(answer.check ?? 0, answer.correct);
  }
 }
 return [...latest].filter(([, correct]) => !correct).map(([index]) => index);
}

export function practicePool(lessons, checksFor, answers, filter) {
 return lessons.filter(l => filter === 'wrong' || filter === '0' || l.domain === Number(filter))
  .flatMap(l => checksFor(l).filter((q, i) => filter !== 'wrong' || missedChecks(answers, l.id).includes(i)));
}

// Compare port sets, allowing lists and inclusive ranges without accepting omissions.
export function matchesPorts(input, expected) {
 const parse = value => {
  const text = String(value).trim().replace(/[–—]/g, '-');
  if (!/^\d+(?:\s*-\s*\d+)?(?:\s*[,/\s]\s*\d+(?:\s*-\s*\d+)?)*$/.test(text)) return null;
  const values = [];
  for (const part of text.replace(/\s*-\s*/g, '-').split(/[,/\s]+/)) {
   const [start, end = start] = part.split('-').map(Number);
   if (start < 1 || end > 65535 || end < start || end - start > 100) return null;
   for (let n = start; n <= end; n++) values.push(n);
  }
  return [...new Set(values)].sort((a, b) => a - b).join(',');
 };
 const actual = parse(input);
 return actual !== null && actual === parse(expected);
}
