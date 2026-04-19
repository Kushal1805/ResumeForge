export function calculateATS(state) {
  let tips = [];
  const sections = state.sections || [];
  const meta = state.meta || {};

  const allBullets = [];
  sections.find(s => s.type === 'experience')?.data?.items?.forEach(i => i.bullets && allBullets.push(...i.bullets));
  sections.find(s => s.type === 'projects')?.data?.items?.forEach(i => i.bullets && allBullets.push(...i.bullets));

  let allText = allBullets.join(' ');
  const summaryText = sections.find(s => s.type === 'summary')?.data?.text || '';
  allText += ' ' + summaryText;
  allText = allText.toLowerCase();

  // 1. Keyword Match (M_kw) - weight: 0.40
  let M_kw = 0;
  const verbs = ['achieved ', 'built ', 'led ', 'designed ', 'reduced ', 'increased ', 'shipped ', 'optimized ', 'managed ', 'created ', 'launched ', 'improved ', 'developed ', 'automated ', 'scaled '];
  if (verbs.some(v => allText.includes(v))) M_kw += 50;
  else tips.push("Start bullets with strong action verbs (e.g. Led, Built, Designed).");
  
  if (/\d+%?/.test(allText)) M_kw += 50;
  else tips.push("Include measurable metrics (numbers or %) in your bullets.");

  // 2. Formatting (C_f) - weight: 0.30
  let C_f = 0;
  if (meta.template === 'ats') {
    C_f += 80;
    tips.push("Excellent: Using ATS Optimized template.");
  } else if (meta.template === 'tpl-clean') {
    C_f += 50;
    tips.push("Template tip: Switch to 'ATS Optimized' to guarantee system parsing.");
  } else {
    const name = meta.template ? meta.template.replace('tpl-', '').replace('-', ' ') : 'This template';
    tips.push(`Template Penalty: '${name}' uses multiple columns. Switch to 'ATS Optimized'.`);
  }
  
  if (!/\b(i|my|me)\b/.test(allText)) C_f += 20;
  else tips.push("Remove first-person pronouns (I, me, my).");

  // 3. Section Completeness (S_c) - weight: 0.20
  let S_c = 0;
  const header = sections.find(s => s.type === 'header')?.data;
  if (header?.email && header?.phone) S_c += 40;
  else tips.push("Add essential contact info (email & phone).");
  
  if (header?.linkedin) S_c += 20;
  else tips.push("Include your LinkedIn profile link.");
  
  if (summaryText.length > 50) S_c += 20;
  else tips.push("Add a professional summary (>50 chars).");

  const hasExp = sections.find(s => s.type === 'experience')?.data?.items?.length > 0;
  const hasEdu = sections.find(s => s.type === 'education')?.data?.items?.length > 0;
  if (hasExp && hasEdu) S_c += 20;
  else tips.push("Ensure you have both Experience and Education sections.");

  // 4. Technical Validation (T_v) - weight: 0.10
  let T_v = 0;
  const skillsCategories = sections.find(s => s.type === 'skills')?.data?.categories || [];
  const totalSkills = skillsCategories.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0);
  if (totalSkills >= 5) T_v += 100;
  else if (totalSkills > 0) T_v += 50;
  else tips.push("List at least 5 key technical or hard skills.");

  // Final Algorithm: Score_ATS = (0.40 * M_kw) + (0.30 * C_f) + (0.20 * S_c) + (0.10 * T_v)
  let score = (0.40 * M_kw) + (0.30 * C_f) + (0.20 * S_c) + (0.10 * T_v);

  return { score: Math.round(Math.min(score, 100)), tips: tips.slice(0, 3) };
}
