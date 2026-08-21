/**
 * Top-3 keyword map for Orbit Student (Aug 2026).
 * Primary = exact phrase to win; page = URL to own it; title = SERP target.
 * Prefer niche / compare intent over PlanetSpark/BrightCHAMPS head terms.
 */
export const TOP3_KEYWORD_PLAN = [
  {
    id: 1,
    keyword: 'Orbit Student',
    intent: 'Brand',
    difficulty: 'Low',
    path: '/',
    targetTitle: 'Orbit Student | Young CEO AI & Entrepreneurship for Kids 8–18',
    targetDescription:
      'Live mentor-led AI and entrepreneurship classes for ages 8–18. Portfolio projects, scholarships, free demo — 2,500+ families worldwide.',
  },
  {
    id: 2,
    keyword: 'Orbit Student vs PlanetSpark',
    intent: 'Compare',
    difficulty: 'Low–Med',
    path: '/compare/orbit-vs-planetspark/',
    targetTitle: 'Orbit Student vs PlanetSpark (2026) | Young Founders vs Speaking',
    targetDescription:
      'Side-by-side: PlanetSpark for public speaking vs Orbit Student for AI + entrepreneurship, portfolios and scholarships. Free demo.',
  },
  {
    id: 3,
    keyword: 'Orbit Student vs BrightCHAMPS',
    intent: 'Compare',
    difficulty: 'Low–Med',
    path: '/compare/orbit-vs-brightchamps/',
    targetTitle: 'Orbit Student vs BrightCHAMPS (2026) | AI Founders vs STEM',
    targetDescription:
      'Compare BrightCHAMPS coding/STEM stacks with Orbit’s mentor-led AI entrepreneurship cohorts. Which fits your child? Free demo.',
  },
  {
    id: 4,
    keyword: 'BrightCHAMPS alternatives',
    intent: 'Alternatives',
    difficulty: 'Med',
    path: '/compare/brightchamps-alternatives/',
    targetTitle: 'Best BrightCHAMPS Alternatives 2026 | AI & Young Founders',
    targetDescription:
      '7 BrightCHAMPS alternatives for parents — Orbit Student, Codingal, PlanetSpark and more. Ranked by outcome. Book a free Orbit demo.',
  },
  {
    id: 5,
    keyword: 'PlanetSpark alternatives',
    intent: 'Alternatives',
    difficulty: 'Med',
    path: '/compare/planetspark-alternatives/',
    targetTitle: 'Best PlanetSpark Alternatives 2026 | Beyond Public Speaking',
    targetDescription:
      'PlanetSpark alternatives when you want AI, entrepreneurship or broader skills. Includes Orbit Student Young CEO. Free demo.',
  },
  {
    id: 6,
    keyword: 'Young CEO programme for kids',
    intent: 'Programme',
    difficulty: 'Low–Med',
    path: '/guides/young-ceo-programme-for-kids/',
    targetTitle: 'Young CEO Programme for Kids 8–18 | Live Orbit Guide',
    targetDescription:
      'What a Young CEO programme includes: live mentors, AI, pitching, portfolios and scholarships. Orbit Student free demo.',
  },
  {
    id: 7,
    keyword: 'entrepreneurship classes for kids online',
    intent: 'Programme',
    difficulty: 'Med',
    path: '/guides/entrepreneurship-classes-for-kids/',
    targetTitle: 'Entrepreneurship Classes for Kids Online (2026 Guide)',
    targetDescription:
      'How to choose online entrepreneurship classes for kids — camps vs cohorts, pitching, AI tools. Orbit free demo for ages 8–18.',
  },
  {
    id: 8,
    keyword: 'scholarship portfolio for kids',
    intent: 'Outcome',
    difficulty: 'Low',
    path: '/guides/scholarship-portfolio-for-kids/',
    targetTitle: 'Scholarship Portfolio for Kids | Projects That Rank',
    targetDescription:
      'Build a scholarship-ready portfolio with projects, pitches and AI literacy. Orbit Student roadmap + free demo.',
  },
  {
    id: 9,
    keyword: 'AI entrepreneurship for kids',
    intent: 'Niche',
    difficulty: 'Low–Med',
    path: '/guides/ai-classes-for-kids-online/',
    targetTitle: 'AI Entrepreneurship for Kids | Live Mentor Classes Online',
    targetDescription:
      'AI classes for kids that build ventures — live mentors, projects and pitching. Not video apps. Orbit Student ages 8–18.',
  },
  {
    id: 10,
    keyword: 'online classes for kids India AI entrepreneurship',
    intent: 'Geo + niche',
    difficulty: 'Low–Med',
    path: '/guides/online-classes-for-kids-india/',
    targetTitle: 'Online AI & Entrepreneurship Classes for Kids in India',
    targetDescription:
      'Live online classes for kids in India — AI literacy, Young CEO skills, India timezones. Orbit Student free demo.',
  },
] as const;
