export type ProgramPageData = {
  slug: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  eyebrow: string;
  intro: string;
  sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
  /** Week-by-week or module syllabus bullets (high-intent landing pages) */
  syllabus?: string[];
  /** Outcome stats for STEM / social impact tracks */
  outcomes?: Array<{ value: string; label: string }>;
  /** Portfolio examples for showcase layouts */
  portfolioShowcase?: Array<{ title: string; desc: string }>;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string }>;
  ctaType: string;
};

export const PROGRAM_PAGES: Record<string, ProgramPageData> = {
  'ai-entrepreneurship-for-kids': {
    slug: 'ai-entrepreneurship-for-kids',
    path: '/programs/ai-entrepreneurship-for-kids',
    title: 'AI Entrepreneur Programs for Kids | Orbit Student',
    description:
      'AI entrepreneur programs for kids ages 8–18: live mentors, venture projects, pitch labs & 100+ AI tools. Not passive coding videos. Book a risk-free trial.',
    keywords: [
      'ai entrepreneur programs for kids',
      '12 year old entrepreneur',
      'young entrepreneur program',
      'AI startup classes kids',
    ],
    h1: 'AI entrepreneur programs for kids who ship real ventures',
    eyebrow: 'Program · AI + founders · Ages 8–18',
    intro:
      'Families searching "AI entrepreneur programs for kids" want more than certificates — they want a 12-year-old who can research markets, prototype with AI and pitch confidently. Orbit combines live cohorts, the AI Studio dashboard and mentor-led pitch labs in one 180-day Young CEO path.',
    syllabus: [
      'Weeks 1–4: AI literacy, safe prompting & idea validation with mentors',
      'Weeks 5–8: Mini-MVP builds (sites, apps, games) using AI Studio tools',
      'Weeks 9–12: Pricing, storytelling & first live pitch showcase',
      'Weeks 13–18: Portfolio polish, scholarship/competition targeting & demo day',
    ],
    sections: [
      {
        heading: 'Built for ages 8–18 (age-banded cohorts)',
        paragraphs: [
          'Younger students focus on creative AI projects and communication; teens add financial literacy, APIs and competition-ready portfolios. Every band ends with parent-visible deliverables in the dashboard.',
        ],
        bullets: [
          'Live mentor sessions twice weekly',
          '100+ AI tools with safety guardrails',
          'Pitch labs with founder mentors',
          '30-day satisfaction guarantee',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can a 12-year-old really learn entrepreneurship?',
        answer:
          'Yes — with scaffolded projects and mentor oversight. Orbit students routinely ship landing pages, games and pitch decks suitable for school showcases and junior competitions.',
      },
    ],
    related: [
      { label: 'STEM entrepreneurship track', href: '/programs/stem-entrepreneurship/' },
      { label: 'PlanetSpark alternatives', href: '/compare/planetspark-alternatives/' },
      { label: 'Book free demo', href: '/lp/free-demo/' },
    ],
    ctaType: 'program_ai_entrepreneurship_kids',
  },
  'stem-entrepreneurship': {
    slug: 'stem-entrepreneurship',
    path: '/programs/stem-entrepreneurship',
    title: 'STEM Entrepreneurship for Kids | Young Social Entrepreneurs',
    description:
      'STEM entrepreneurship for kids: science fair ventures, social impact projects & coding builds with live mentors. Ages 8–18. Portfolio outcomes for scholarships.',
    keywords: [
      'stem entrepreneurship',
      'young social entrepreneurs',
      'STEM entrepreneurship for kids',
      'social impact projects kids',
    ],
    h1: 'STEM entrepreneurship & young social innovators',
    eyebrow: 'Program · STEM + impact',
    intro:
      'STEM entrepreneurship sits at the intersection of science fair rigour and founder mindset. Orbit students design experiments, build prototypes with code or AI tools, and frame social impact stories mentors help refine for competitions and scholarships.',
    outcomes: [
      { value: '10+', label: 'portfolio projects' },
      { value: '500+', label: 'scholarships mapped' },
      { value: '52', label: 'live mentor sessions' },
      { value: '35+', label: 'countries represented' },
    ],
    portfolioShowcase: [
      { title: 'Eco-tracker app', desc: 'Student-led sustainability dashboard built with AI-assisted research.' },
      { title: 'Community pitch night', desc: 'Live showcase tying STEM hypothesis to a venture narrative.' },
      { title: 'Scholarship portfolio pack', desc: 'Exports for competitions, school counsellors and parent sharing.' },
    ],
    sections: [
      {
        heading: 'From science fair to social venture',
        paragraphs: [
          'Mentors help students connect hypothesis-driven thinking with customer discovery — so STEM projects read as real-world impact, not one-off assignments.',
        ],
        bullets: [
          'Research + prototype sprints',
          'Ethics and social impact framing',
          'Optional robotics/maker integrations',
          'Competition & scholarship alignment',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this only for advanced STEM students?',
        answer:
          'No. Tracks adapt by age. Beginners start with guided builds; advanced teens add APIs, data viz and impact measurement.',
      },
    ],
    related: [
      { label: 'AI entrepreneurship for kids', href: '/programs/ai-entrepreneurship-for-kids/' },
      { label: 'Resources hub', href: '/resources/' },
      { label: 'Coding & robotics', href: '/programs/coding-and-robotics/' },
    ],
    ctaType: 'program_stem_entrepreneurship',
  },
  'ai-for-kids': {
    slug: 'ai-for-kids',
    path: '/programs/ai-for-kids',
    title: 'AI for Kids (Ages 8–14) | Live Classes & AI Studio | Orbit Student',
    description:
      'Best AI classes for kids aged 8–14: live mentors, 100+ AI Studio tools, prompt safety and real projects — not passive video queues. Book a risk-free trial.',
    keywords: [
      'best AI classes for kids aged 8-14',
      'AI for kids online',
      'AI classes for kids',
      'live AI learning kids',
      'AI studio for students',
    ],
    h1: 'AI for kids: live mentors, real builds, safe prompting',
    eyebrow: 'Program · Ages 8–14',
    intro:
      'Families searching for the best AI classes for kids aged 8–14 want more than chatbots and pre-recorded coding tracks. Orbit Student pairs live cohorts with 100+ AI Studio tools so children learn to research, design and ship — with mentor oversight on every session.',
    sections: [
      {
        heading: 'What kids learn in the AI track',
        paragraphs: [
          'Students practise responsible prompting, image and copy generation, lightweight app ideas and pitch storytelling — always tied to a project parents can open in the dashboard.',
        ],
        bullets: [
          '100+ AI Studio tools (writing, maths, decks, websites)',
          'Live mentor feedback twice weekly',
          'Safety, privacy and ethics taught explicitly',
          'Portfolio pieces for school and scholarships',
        ],
      },
      {
        heading: 'Live cohorts vs passive apps',
        paragraphs: [
          'Apps scale cheaply but rarely produce accountability. Orbit caps cohorts, runs office hours and keeps replays in the student portal — so progress is visible, not guessed.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this suitable for beginners with no coding background?',
        answer:
          'Yes. The AI for kids track adapts by age band. Mentors scaffold tool use before students tackle builds — no prior coding required for the 8–11 band.',
      },
      {
        question: 'How is AI safety handled?',
        answer:
          'Mentors teach responsible use, privacy basics and when to ask an adult. Tools run inside the Orbit dashboard with age-appropriate guardrails.',
      },
    ],
    related: [
      { label: 'Teen founders programme', href: '/programs/teen-founders/' },
      { label: 'Young CEO courses overview', href: '/courses/' },
      { label: 'Interactive demo', href: '/demo/' },
    ],
    ctaType: 'program_ai_for_kids',
  },
  'teen-founders': {
    slug: 'teen-founders',
    path: '/programs/teen-founders',
    title: 'Teen Startup Bootcamp | High School Founders | Orbit Student',
    description:
      'Startup bootcamps for high schoolers: pitch labs, MVP launches and college-profile projects with live founder mentors. Ages 13–18. Book a trial class.',
    keywords: [
      'startup bootcamps for high schoolers',
      'teen entrepreneurship program',
      'young founder bootcamp',
      'high school startup class',
    ],
    h1: 'Startup bootcamp for teens: pitch, ship, stand out',
    eyebrow: 'Program · Ages 13–18',
    intro:
      'High schoolers need more than certificates — they need shipped MVPs, pitch recordings and competition-ready portfolios. Orbit’s teen founders track runs live pitch labs, mentor reviews and a scholarship roadmap aligned with college applications.',
    sections: [
      {
        heading: 'Pitch labs & MVP launches',
        paragraphs: [
          'Students validate ideas, build landing pages or lightweight apps, and present to mentor panels — the same loop real founders use, paced for school schedules.',
        ],
        bullets: [
          'Fortnightly pitch reviews with operators',
          'Business model and financial literacy modules',
          'Competition and scholarship targeting by age',
          'Parent-visible portfolio exports',
        ],
      },
      {
        heading: 'College profile building',
        paragraphs: [
          'Admissions teams remember stories, not badges. Teens leave with verifiable projects, recommendation talking points and optional competition entries.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can this help with college applications?',
        answer:
          'Yes. The programme emphasises portfolio depth, leadership narratives and competition timelines — with mentor guidance on what to highlight for ages 15–18.',
      },
    ],
    related: [
      { label: 'AI for kids (8–14)', href: '/programs/ai-for-kids/' },
      { label: 'Scholarship resources', href: '/resources/' },
      { label: 'Book free demo', href: '/lp/free-demo/' },
    ],
    ctaType: 'program_teen_founders',
  },
  'coding-and-robotics': {
    slug: 'coding-and-robotics',
    path: '/programs/coding-and-robotics',
    title: 'Hands-On Coding & Robotics for Teens | Orbit Student',
    description:
      'Hands-on coding classes for teens: APIs, real builds and hardware-friendly projects inside the Young CEO journey — live mentors, not lecture libraries.',
    keywords: [
      'hands-on coding classes for teens',
      'coding and robotics for kids',
      'teen coding bootcamp online',
      'STEM entrepreneurship teens',
    ],
    h1: 'Coding & robotics for teens who want to ship',
    eyebrow: 'Program · Build track',
    intro:
      'Parents comparing hands-on coding classes for teens often find passive video catalogues. Orbit embeds coding inside venture projects — websites, games, APIs and optional hardware integrations — with live debugging and mentor code reviews.',
    sections: [
      {
        heading: 'What students build',
        paragraphs: [
          'Projects connect to business outcomes: storefront sites, simple games, automation scripts and demo-day prototypes — not isolated syntax drills.',
        ],
        bullets: [
          'Guided builds with mentor code review',
          'APIs, no-code bridges and intro Python/JS paths',
          'Optional robotics / maker integrations where cohorts allow',
          'Git-style versioning habits for older teens',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you teach robotics hardware?',
        answer:
          'Where cohorts support it, mentors integrate maker kits and simulation-first robotics challenges. The core track always includes software builds every family can access from home.',
      },
    ],
    related: [
      { label: 'AI for kids', href: '/programs/ai-for-kids/' },
      { label: 'Live class schedule', href: '/live-classes/' },
      { label: 'Compare vs passive coding', href: '/compare/orbit-vs-traditional/' },
    ],
    ctaType: 'program_coding_robotics',
  },
};

export const PROGRAM_LIST = Object.values(PROGRAM_PAGES);
