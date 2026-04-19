export function calculateCompleteness(state) {
  let score = 0;
  const sections = state.sections || [];
  
  // Header fully filled: 20 pts
  const header = sections.find(s => s.type === 'header')?.data;
  if (header?.name && header?.email && header?.phone) score += 20;

  // Summary present (>50 chars): 15 pts
  const summary = sections.find(s => s.type === 'summary')?.data;
  if (summary?.text && summary.text.length > 50) score += 15;

  // Experience: at least 1 with 2+ bullets: 25 pts
  const exp = sections.find(s => s.type === 'experience')?.data;
  if (exp?.items?.some(i => i.bullets?.length >= 2)) score += 25;

  // Education present: 15 pts
  const edu = sections.find(s => s.type === 'education')?.data;
  if (edu?.items?.length > 0) score += 15;

  // Skills (3+ categories): 10 pts
  const skills = sections.find(s => s.type === 'skills')?.data;
  if (skills?.categories?.length >= 3) score += 10;

  // Projects (1+): 10 pts
  const projects = sections.find(s => s.type === 'projects')?.data;
  if (projects?.items?.length > 0) score += 10;

  // Certs or Languages: 5 pts
  const certs = sections.find(s => s.type === 'certifications')?.data?.items?.length > 0;
  const langs = sections.find(s => s.type === 'languages')?.data?.items?.length > 0;
  if (certs || langs) score += 5;

  return Math.min(score, 100);
}
