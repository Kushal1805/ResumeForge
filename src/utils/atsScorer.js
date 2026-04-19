export function calculateATS(state) {
  let score = 0;
  let tips = [];
  const sections = state.sections || [];
  const meta = state.meta || {};

  const allBullets = [];
  sections.find(s => s.type === 'experience')?.data?.items?.forEach(i => i.bullets && allBullets.push(...i.bullets));
  sections.find(s => s.type === 'projects')?.data?.items?.forEach(i => i.bullets && allBullets.push(...i.bullets));

  let allText = allBullets.join(' ');
  allText += ' ' + (sections.find(s => s.type === 'summary')?.data?.text || '');
  allText = allText.toLowerCase();

  // Template Check (Most critical ATS factor) (+20)
  if (meta.template === 'ats') {
    score += 20;
    tips.push("Excellent: Using ATS Optimized template.");
  } else if (meta.template === 'tpl-clean') {
    // Single column is okay-ish
    score += 10;
    tips.push("Template tip: Switch to 'ATS Optimized' to guarantee system parsing.");
  } else {
    // Multi-column is bad ('tpl-sidebar', 'tpl-timeline-left', etc)
    score += 0;
    const name = meta.template ? meta.template.replace('tpl-', '').replace('-', ' ') : 'This template';
    tips.push(`Template Penalty: '${name}' uses multiple columns. Switch to 'ATS Optimized' for better parsing.`);
  }

  // Has action verbs (+25)
  const verbs = ['achieved ', 'built ', 'led ', 'designed ', 'reduced ', 'increased ', 'shipped ', 'optimized ', 'managed ', 'created ', 'launched ', 'improved ', 'developed ', 'automated ', 'scaled '];
  if (verbs.some(v => allText.includes(v))) {
    score += 25;
  } else {
    tips.push("Start bullets with strong action verbs (e.g. Led, Built, Designed).");
  }

  // Has measurable metrics (+20)
  if (/\d+%?/.test(allText)) {
    score += 20;
  } else {
    tips.push("Include measurable metrics (numbers or %) in your bullets.");
  }

  // No first-person pronouns (+10)
  if (!/\b(i|my|me)\b/.test(allText)) {
    score += 10;
  } else {
    tips.push("Remove first-person pronouns (I, me, my).");
  }

  // Contact info complete (+15)
  const header = sections.find(s => s.type === 'header')?.data;
  if (header?.email && header?.phone && header?.linkedin) {
    score += 15;
  } else {
    tips.push("Add complete contact info including LinkedIn.");
  }

  // Summary (+10)
  const summary = sections.find(s => s.type === 'summary')?.data;
  if (summary?.text?.length > 50) {
    score += 10;
  } else {
    tips.push("Add a professional summary (>50 chars).");
  }

  return { score: Math.min(score, 100), tips: tips.slice(0, 3) };
}
