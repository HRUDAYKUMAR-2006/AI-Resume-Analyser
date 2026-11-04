import { ResumeData, ScoreBreakdown } from '../types';

const STRONG_ACTION_VERBS = [
  'accelerated', 'achieved', 'administered', 'advanced', 'analyzed', 'architected',
  'automated', 'built', 'coached', 'collaborated', 'configured', 'constructed',
  'decreased', 'delivered', 'designed', 'developed', 'devised', 'doubled',
  'engineered', 'enhanced', 'established', 'executed', 'expanded', 'expedited',
  'formulated', 'generated', 'guided', 'implemented', 'improved', 'increased',
  'initiated', 'innovated', 'integrated', 'launched', 'led', 'maximized',
  'mentored', 'minimized', 'modernized', 'optimized', 'orchestrated', 'overhauled',
  'pioneered', 'produced', 'reduced', 'refactored', 'resolved', 'restructured',
  'revamped', 'scaled', 'simplified', 'spearheaded', 'standardized', 'streamlined',
  'strengthened', 'surpassed', 'transformed', 'upgraded'
];

const WEAK_PASSIVE_VERBS = [
  'worked on', 'helped with', 'responsible for', 'assisted with', 'did',
  'tried to', 'participated in', 'duties included', 'was tasked with'
];

export function calculateResumeScore(resume: ResumeData): ScoreBreakdown {
  let atsCompliance = 50;
  let impactMetrics = 40;
  let skillsRelevance = 50;
  let depthOfExperience = 50;
  let actionVerbsScore = 45;

  const strengths: string[] = [];
  const improvements: string[] = [];
  const keywordGaps: string[] = [];

  // 1. Personal Info Completeness
  const p = resume.personalInfo;
  let personalPoints = 0;
  if (p.fullName && p.fullName.trim().length > 2) personalPoints += 4;
  if (p.email && p.email.includes('@')) personalPoints += 4;
  if (p.phone && p.phone.trim().length > 5) personalPoints += 4;
  if (p.location && p.location.trim().length > 2) personalPoints += 4;
  if (p.linkedin && p.linkedin.includes('linkedin.com')) personalPoints += 3;
  if (p.github && p.github.includes('github.com')) personalPoints += 3;
  if (p.portfolio) personalPoints += 3;
  atsCompliance = Math.min(95, atsCompliance + personalPoints);

  if (!p.linkedin) {
    improvements.push('Add a customized LinkedIn profile URL to boost recruiter outreach.');
  } else {
    strengths.push('Professional networking links (LinkedIn/GitHub) present.');
  }

  // 2. Summary Quality
  if (resume.summary && resume.summary.length > 80) {
    atsCompliance += 5;
    if (resume.summary.length > 180) {
      strengths.push('Comprehensive professional summary clearly establishing domain identity.');
    }
  } else {
    improvements.push('Expand professional summary with clear value proposition and target career aspirations.');
  }

  // 3. Skills Evaluation
  const totalSkillsCount =
    (resume.skills.technical?.length || 0) +
    (resume.skills.frameworks?.length || 0) +
    (resume.skills.tools?.length || 0) +
    (resume.skills.soft?.length || 0);

  if (totalSkillsCount >= 18) {
    skillsRelevance = 92;
    strengths.push(`Rich technical skills portfolio (${totalSkillsCount} verified skills categorized).`);
  } else if (totalSkillsCount >= 12) {
    skillsRelevance = 80;
    strengths.push(`Balanced technical competencies cataloged across categories.`);
  } else if (totalSkillsCount >= 6) {
    skillsRelevance = 65;
    improvements.push('Add modern industry frameworks, testing libraries, and cloud dev tools to your skills matrix.');
  } else {
    skillsRelevance = 45;
    improvements.push('Skill section is thin. Add core languages, databases, libraries, and developer tools.');
  }

  // Key missing modern competencies check
  const allSkillsFlat = [
    ...(resume.skills.technical || []),
    ...(resume.skills.frameworks || []),
    ...(resume.skills.tools || [])
  ].map(s => s.toLowerCase());

  const importantKeywords = ['docker', 'typescript', 'sql', 'ci/cd', 'dsa', 'algorithms', 'aws', 'rest api', 'unit testing'];
  importantKeywords.forEach(kw => {
    if (!allSkillsFlat.some(s => s.includes(kw))) {
      keywordGaps.push(kw.toUpperCase());
    }
  });

  // 4. Experience & Action Verbs Analysis
  let totalBullets = 0;
  let actionVerbCount = 0;
  let metricCount = 0;
  let passiveVerbCount = 0;

  const metricRegex = /(\d+[%kKmMbB]?|\$\d+|\b\d+\s*(?:users|clients|hours|percent|x|X|days|teams)\b)/g;

  resume.experience.forEach(exp => {
    exp.highlights.forEach(bullet => {
      totalBullets++;
      const lower = bullet.toLowerCase();

      // Check action verbs
      const hasAction = STRONG_ACTION_VERBS.some(v => lower.startsWith(v) || lower.includes(` ${v} `));
      if (hasAction) actionVerbCount++;

      // Check passive words
      const hasPassive = WEAK_PASSIVE_VERBS.some(pv => lower.includes(pv));
      if (hasPassive) passiveVerbCount++;

      // Check numbers/metrics
      if (metricRegex.test(bullet)) {
        metricCount++;
      }
    });
  });

  // Also check projects
  resume.projects.forEach(proj => {
    proj.highlights?.forEach(bullet => {
      totalBullets++;
      const lower = bullet.toLowerCase();
      if (STRONG_ACTION_VERBS.some(v => lower.startsWith(v) || lower.includes(` ${v} `))) actionVerbCount++;
      if (metricRegex.test(bullet)) metricCount++;
    });
  });

  // Action Verbs Scoring
  if (totalBullets > 0) {
    const actionVerbRatio = actionVerbCount / totalBullets;
    actionVerbsScore = Math.min(95, Math.max(35, Math.round(actionVerbRatio * 100)));
    if (actionVerbRatio > 0.6) {
      strengths.push('Strong usage of dynamic, high-impact action verbs (e.g. Engineered, Architected, Refactored).');
    } else {
      improvements.push('Replace passive phrases ("worked on", "assisted") with strong action verbs ("architected", "delivered").');
    }
  }

  // Metrics Scoring
  if (totalBullets > 0) {
    const metricRatio = metricCount / totalBullets;
    impactMetrics = Math.min(96, Math.max(30, Math.round(metricRatio * 120)));
    if (metricRatio >= 0.35) {
      strengths.push('Excellent quantifiable impact metrics (% performance gains, latency drops, user counts).');
    } else {
      improvements.push('Quantify your achievements with numbers (e.g., "boosted throughput by 35%", "reduced latency by 120ms").');
    }
  }

  // Experience Depth
  if (resume.experience.length >= 3) {
    depthOfExperience = 88;
  } else if (resume.experience.length >= 1) {
    depthOfExperience = 72;
  } else {
    depthOfExperience = 45;
    improvements.push('Add relevant internships, freelance work, or open-source community contributions to work experience.');
  }

  // Projects Bonus
  if (resume.projects.length >= 2) {
    depthOfExperience += 6;
    strengths.push('Multiple hands-on technical portfolio projects showcasing full-lifecycle delivery.');
  }

  // Certifications Bonus
  if (resume.certifications && resume.certifications.length > 0) {
    atsCompliance += 4;
    skillsRelevance += 4;
    strengths.push(`${resume.certifications.length} verified certification(s) enhancing credibility.`);
  }

  // Calculate Overall Weighted ATS Score
  const overall = Math.min(
    99,
    Math.max(
      35,
      Math.round(
        atsCompliance * 0.25 +
        skillsRelevance * 0.25 +
        impactMetrics * 0.20 +
        depthOfExperience * 0.15 +
        actionVerbsScore * 0.15
      )
    )
  );

  return {
    overall,
    atsCompliance: Math.min(100, atsCompliance),
    impactMetrics: Math.min(100, impactMetrics),
    skillsRelevance: Math.min(100, skillsRelevance),
    depthOfExperience: Math.min(100, depthOfExperience),
    actionVerbsScore: Math.min(100, actionVerbsScore),
    strengths,
    improvements,
    keywordGaps: keywordGaps.slice(0, 6)
  };
}
