import fs from 'node:fs';
import path from 'node:path';

const startDate = new Date();
const weeks = 12;

const contentClusters = [
  {
    pillar: 'AI Student Skills',
    keywords: ['AI student', 'Orbit AI', 'AI tools for students', 'AI learning for kids'],
    titles: [
      'Best AI Student Workflows for Kids in 2026',
      'Orbit AI Prompting Framework for Students: Beginner to Advanced',
      'How Parents Can Evaluate AI Student Progress Weekly',
    ],
  },
  {
    pillar: 'Scholarship Readiness',
    keywords: ['scholarship prep for kids', 'student portfolio', 'early scholarship planning', 'kids scholarship strategy'],
    titles: [
      'Scholarship Portfolio Checklist for Students Ages 10-16',
      'How to Turn Projects into Scholarship-Proof Achievements',
      'Top Mistakes Families Make in Early Scholarship Planning',
    ],
  },
  {
    pillar: 'Kids New Age Learning',
    keywords: ['kids new age learning', 'gamified learning for kids', 'entrepreneurship for kids', 'future skills for children'],
    titles: [
      'Gamified Learning Systems That Keep Kids Consistent',
      'Play-Build-Launch: New Age Learning Blueprint for Parents',
      'Why Kids Learn Faster with Projects Than Passive Videos',
    ],
  },
  {
    pillar: 'Parent Intent / Conversion',
    keywords: ['Orbit Student login', 'best edtech for kids', 'AI learning platform for children', 'future-ready kids'],
    titles: [
      'Orbit Student Login Guide: Getting Started in 10 Minutes',
      'How to Choose the Best Edtech Platform for Future-Ready Kids',
      'What Parents Should Track Before Buying Any Learning Program',
    ],
  },
];

const calendarRows = [];
for (let i = 0; i < weeks; i += 1) {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + i * 7);
  const cluster = contentClusters[i % contentClusters.length];
  const title = cluster.titles[i % cluster.titles.length];
  const primaryKeyword = cluster.keywords[i % cluster.keywords.length];
  const secondaryKeyword = cluster.keywords[(i + 1) % cluster.keywords.length];

  calendarRows.push({
    week: i + 1,
    publishDate: date.toISOString().split('T')[0],
    pillar: cluster.pillar,
    title,
    primaryKeyword,
    secondaryKeyword,
  });
}

const markdown = [
  '# SEO Content Cluster Planner (12 Weeks)',
  '',
  'Use this as the always-on publishing queue. One post per week minimum.',
  '',
  '| Week | Publish Date | Pillar | Title | Primary Keyword | Secondary Keyword |',
  '|---|---|---|---|---|---|',
  ...calendarRows.map(
    (row) =>
      `| ${row.week} | ${row.publishDate} | ${row.pillar} | ${row.title} | ${row.primaryKeyword} | ${row.secondaryKeyword} |`
  ),
  '',
  '## Operating Rules',
  '- Keep one clear search intent per article.',
  '- Add 3-5 internal links (home, tools, resources, blog).',
  '- Add FAQ schema and 3 concise answers per post.',
  '- Refresh top 10 posts every 30-45 days with new stats/examples.',
  '- Submit new URLs to Google Search Console after publishing.',
  '',
].join('\n');

const outputPath = path.resolve(process.cwd(), 'docs/seo-content-calendar.md');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, markdown, 'utf8');

console.log(`SEO calendar generated at ${outputPath}`);
