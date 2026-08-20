export type CompareRow = {
  factor: string;
  orbit: string;
  other: string;
};

export type AlternativeCard = {
  name: string;
  href?: string;
  bestFor: string;
  pros: string[];
  cons: string[];
};

export type ComparisonPageData = {
  slug: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  eyebrow: string;
  intro: string;
  competitorName: string;
  competitorUrl: string;
  updatedLabel: string;
  verdict: string;
  chooseOrbitIf: string[];
  chooseOtherIf: string[];
  rows: CompareRow[];
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string }>;
  /** When set, page renders alternatives list instead of vs table */
  alternatives?: AlternativeCard[];
  ctaType: string;
};

export const COMPARISONS: Record<string, ComparisonPageData> = {
  'orbit-vs-planetspark': {
    slug: 'orbit-vs-planetspark',
    path: '/compare/orbit-vs-planetspark',
    title: 'Orbit Student vs PlanetSpark (2026): Which Fits Young Founders?',
    description:
      'Honest Orbit Student vs PlanetSpark comparison for parents. Speaking skills vs AI + entrepreneurship cohorts, portfolios and scholarships. Book a free Orbit demo.',
    keywords: [
      'Orbit Student vs PlanetSpark',
      'PlanetSpark alternative',
      'entrepreneurship for kids vs public speaking',
      'AI classes for kids vs PlanetSpark',
      'Young CEO programme',
    ],
    h1: 'Orbit Student vs PlanetSpark',
    eyebrow: 'Comparison · Updated Aug 2026',
    intro:
      'PlanetSpark is a strong choice when the goal is public speaking and communication. Orbit Student is built for families who want live AI literacy, entrepreneurship and a scholarship-ready portfolio — not speaking practice alone.',
    competitorName: 'PlanetSpark',
    competitorUrl: 'https://www.planetspark.in/',
    updatedLabel: 'August 2026',
    verdict:
      'Choose PlanetSpark if speaking confidence is the primary goal. Choose Orbit Student if you want mentor-led AI + entrepreneurship with shipped projects parents can share for school and scholarships.',
    chooseOrbitIf: [
      'You want AI tools, pitching and business projects in one programme',
      'You care about portfolios, competitions and scholarship storytelling',
      'You prefer small cohorts with a clear 180-day Young CEO path',
    ],
    chooseOtherIf: [
      'Public speaking / English communication is the main outcome',
      'You want 1:1 life-skills classes focused on fluency and debate',
      'You already have coding/AI covered elsewhere',
    ],
    rows: [
      {
        factor: 'Primary focus',
        orbit: 'AI literacy + entrepreneurship + leadership',
        other: 'Public speaking, communication, creative writing',
      },
      {
        factor: 'Format',
        orbit: 'Live small cohorts, twice weekly + office hours',
        other: 'Live 1:1 / small group with AI practice tools',
      },
      {
        factor: 'Ages (typical)',
        orbit: '8–18 Young CEO path',
        other: 'School kids through professionals (broader)',
      },
      {
        factor: 'AI in the product',
        orbit: 'Core curriculum + 100+ student AI tools',
        other: 'AI feedback / practice layered on speaking',
      },
      {
        factor: 'Portfolio & scholarships',
        orbit: 'Built into the roadmap',
        other: 'Not the core promise',
      },
      {
        factor: 'Coding / product building',
        orbit: 'Projects (sites, games, pitches)',
        other: 'Limited — communication first',
      },
      {
        factor: 'Trial model',
        orbit: 'Free demo / consult — no payment to book',
        other: 'Free trial class (widely promoted)',
      },
      {
        factor: 'Best for',
        orbit: 'Young founders and future-ready portfolios',
        other: 'Confident speakers and storytellers',
      },
    ],
    faqs: [
      {
        question: 'Is Orbit Student a PlanetSpark alternative?',
        answer:
          'Yes for parents comparing live online skill programmes — but the outcomes differ. PlanetSpark centres on communication; Orbit centres on AI + entrepreneurship with portfolio projects.',
      },
      {
        question: 'Does Orbit teach public speaking?',
        answer:
          'Orbit trains pitching, storytelling and presentation as part of the Young CEO journey, not as a standalone phonics or debate academy.',
      },
      {
        question: 'Which is better for an 10-year-old?',
        answer:
          'If the child needs confidence speaking first, start with a speaking-focused programme. If they love building ideas, products and using AI, Orbit is usually the better fit.',
      },
    ],
    related: [
      { label: 'Orbit vs BrightCHAMPS', href: '/compare/orbit-vs-brightchamps/' },
      { label: 'BrightCHAMPS alternatives', href: '/compare/brightchamps-alternatives/' },
      { label: 'Courses', href: '/courses/' },
    ],
    ctaType: 'compare_orbit_vs_planetspark',
  },
  'orbit-vs-brightchamps': {
    slug: 'orbit-vs-brightchamps',
    path: '/compare/orbit-vs-brightchamps',
    title: 'Orbit Student vs BrightCHAMPS (2026): AI Classes Compared',
    description:
      'Orbit Student vs BrightCHAMPS for parents. Compare Gen AI / coding stacks vs mentor-led AI entrepreneurship cohorts with portfolios. Free Orbit demo.',
    keywords: [
      'Orbit Student vs BrightCHAMPS',
      'BrightCHAMPS alternative',
      'AI classes for kids comparison',
      'coding for kids vs entrepreneurship',
      'Young CEO vs BrightCHAMPS',
    ],
    h1: 'Orbit Student vs BrightCHAMPS',
    eyebrow: 'Comparison · Updated Aug 2026',
    intro:
      'BrightCHAMPS is a large STEM / coding / Gen AI platform with deep course catalogues. Orbit Student is narrower on purpose: live mentor cohorts that connect AI literacy to entrepreneurship, pitching and scholarship-ready work.',
    competitorName: 'BrightCHAMPS',
    competitorUrl: 'https://brightchamps.com/',
    updatedLabel: 'August 2026',
    verdict:
      'Pick BrightCHAMPS when you want a broad STEM stack (coding, robotics, finance modules). Pick Orbit when the goal is a young founder journey — AI as a builder’s toolkit, live mentorship, and a portfolio parents can show.',
    chooseOrbitIf: [
      'Entrepreneurship and pitching matter as much as AI',
      'You want small cohorts and a single coherent 180-day path',
      'Scholarship / competition storytelling is a priority',
    ],
    chooseOtherIf: [
      'You want deep coding, robotics or multi-subject STEM packages',
      '1:1 tech instruction is the must-have format',
      'You are shopping a large brand catalogue across many subjects',
    ],
    rows: [
      {
        factor: 'Primary focus',
        orbit: 'AI + entrepreneurship + leadership portfolio',
        other: 'Coding, robotics, Gen AI, math & finance catalogue',
      },
      {
        factor: 'Format',
        orbit: 'Mentor-led cohorts (capped size)',
        other: 'Primarily live 1:1 class model (per public marketing)',
      },
      {
        factor: 'Breadth vs depth of path',
        orbit: 'One Young CEO journey with milestones',
        other: 'Many courses / tracks to combine',
      },
      {
        factor: 'Entrepreneurship',
        orbit: 'Core (idea → project → pitch)',
        other: 'Secondary to STEM skills',
      },
      {
        factor: 'AI tools for students',
        orbit: 'Dashboard with 100+ AI helpers',
        other: 'Gen AI / STEM courses in catalogue',
      },
      {
        factor: 'Global brand scale',
        orbit: 'Growing specialist programme',
        other: 'Large paid + organic brand presence',
      },
      {
        factor: 'Trial model',
        orbit: 'Free demo — parent details only',
        other: 'Demo / counsellor-led enrolment (typical edtech)',
      },
      {
        factor: 'Best for',
        orbit: 'Kids who want to build and pitch ventures',
        other: 'Kids focused on coding / robotics depth',
      },
    ],
    faqs: [
      {
        question: 'Is Orbit cheaper than BrightCHAMPS?',
        answer:
          'Public sites for both are largely demo-led rather than list-price transparent. Book an Orbit demo for current cohort pricing; compare against any BrightCHAMPS quote for the same age and hours.',
      },
      {
        question: 'Does Orbit replace coding classes?',
        answer:
          'Orbit includes project building (sites, games, tools) but is not a competitive-programming academy. Families wanting deep robotics or contest coding often keep a STEM provider — or choose BrightCHAMPS-style depth — alongside or instead of Orbit.',
      },
      {
        question: 'Can we switch from BrightCHAMPS to Orbit?',
        answer:
          'Yes. Many parents move when they want entrepreneurship outcomes and portfolio storytelling, not only more coding modules. A free Orbit demo maps age, timezone and goals before any payment.',
      },
    ],
    related: [
      { label: 'Orbit vs PlanetSpark', href: '/compare/orbit-vs-planetspark/' },
      { label: 'BrightCHAMPS alternatives', href: '/compare/brightchamps-alternatives/' },
      { label: 'Live classes', href: '/live-classes/' },
    ],
    ctaType: 'compare_orbit_vs_brightchamps',
  },
  'brightchamps-alternatives': {
    slug: 'brightchamps-alternatives',
    path: '/compare/brightchamps-alternatives',
    title: '7 Best BrightCHAMPS Alternatives (2026) for AI & Young Founders',
    description:
      'BrightCHAMPS alternatives for parents: Orbit Student, Codingal, PlanetSpark, TruPreneurs and more — compared by outcome. Book an Orbit free demo.',
    keywords: [
      'BrightCHAMPS alternatives',
      'alternatives to BrightCHAMPS',
      'best BrightCHAMPS alternative 2026',
      'AI classes for kids alternatives',
      'Orbit Student',
    ],
    h1: 'Best BrightCHAMPS Alternatives in 2026',
    eyebrow: 'Alternatives guide · Updated Aug 2026',
    intro:
      'BrightCHAMPS works well for families who want a large STEM catalogue. These alternatives fit different goals — from coding depth to public speaking to full entrepreneurship cohorts. Orbit Student is listed first because we built this guide for parents evaluating us fairly against peers.',
    competitorName: 'BrightCHAMPS',
    competitorUrl: 'https://brightchamps.com/',
    updatedLabel: 'August 2026',
    verdict:
      'If you want mentor-led AI + entrepreneurship with a scholarship-ready portfolio, start with Orbit Student. If you need deep coding/robotics only, stay with BrightCHAMPS or Codingal. If speaking is the gap, look at PlanetSpark.',
    chooseOrbitIf: [
      'You want AI tied to ventures, pitches and portfolios',
      'Small live cohorts beat a huge course menu',
      'You are comparing BrightCHAMPS mainly for “future skills” not robotics alone',
    ],
    chooseOtherIf: [
      'You need 1:1 competitive coding or robotics depth',
      'School procurement / B2B entrepreneurship platforms fit better',
      'Budget and schedule only allow short marketplace camps',
    ],
    rows: [],
    alternatives: [
      {
        name: 'Orbit Student',
        href: 'https://www.orbitstudent.com/',
        bestFor: 'AI + entrepreneurship cohorts (ages 8–18)',
        pros: ['Live mentors', 'Young CEO path', 'Portfolio / scholarship focus', 'Student AI studio'],
        cons: ['Narrower STEM catalogue than mega platforms'],
      },
      {
        name: 'Codingal',
        href: 'https://codingal.com/',
        bestFor: 'Live AI & coding with global reach',
        pros: ['Strong coding pedigree', 'Expanding math & speaking', 'Free trial class'],
        cons: ['Entrepreneurship not the core product'],
      },
      {
        name: 'PlanetSpark',
        href: 'https://www.planetspark.in/',
        bestFor: 'Public speaking & communication',
        pros: ['Speaking specialization', 'AI practice tools', 'Large brand trust'],
        cons: ['Not an AI founder / venture programme'],
      },
      {
        name: 'TruPreneurs.AI',
        href: 'https://trupreneurs.ai/',
        bestFor: 'Schools wanting AI entrepreneurship platforms',
        pros: ['Curriculum-aligned agents', 'Portfolio evidence graphs'],
        cons: ['Primarily B2B / institutional access'],
      },
      {
        name: 'Fuggae',
        href: 'https://fuggae.com/',
        bestFor: 'Tiny-cohort AI, speaking & leadership',
        pros: ['Very small groups', 'Project showcases'],
        cons: ['Younger brand / smaller content footprint'],
      },
      {
        name: 'Outschool entrepreneurship classes',
        href: 'https://outschool.com/',
        bestFor: 'Short flexible camps',
        pros: ['Low commitment', 'Many teachers / times'],
        cons: ['Quality varies; no single Young CEO arc'],
      },
      {
        name: 'My Little Founders',
        href: 'https://mylittlefounders.com/',
        bestFor: 'Short founder bootcamps',
        pros: ['Demo day energy', 'Clear 6-week arcs'],
        cons: ['Not a long 180-day mentorship path'],
      },
    ],
    faqs: [
      {
        question: 'What is the best BrightCHAMPS alternative for entrepreneurship?',
        answer:
          'Orbit Student and TruPreneurs-style programmes focus on ventures. Orbit is B2C cohort-based for families; TruPreneurs is stronger for school deployments.',
      },
      {
        question: 'Are BrightCHAMPS alternatives cheaper?',
        answer:
          'Pricing is usually quote-based. Compare hours, group size, mentor quality and outcomes — not sticker assumptions from ads.',
      },
    ],
    related: [
      { label: 'Orbit vs BrightCHAMPS', href: '/compare/orbit-vs-brightchamps/' },
      { label: 'Orbit vs PlanetSpark', href: '/compare/orbit-vs-planetspark/' },
      { label: 'Free demo', href: '/demo/' },
    ],
    ctaType: 'compare_brightchamps_alternatives',
  },
  'planetspark-alternatives': {
    slug: 'planetspark-alternatives',
    path: '/compare/planetspark-alternatives',
    title: '6 Best PlanetSpark Alternatives (2026) Beyond Public Speaking',
    description:
      'PlanetSpark alternatives for parents who want AI, entrepreneurship or broader life skills. Includes Orbit Student, Codingal, BrightCHAMPS and more.',
    keywords: [
      'PlanetSpark alternatives',
      'alternatives to PlanetSpark',
      'PlanetSpark vs Orbit Student',
      'public speaking for kids alternatives',
      'entrepreneurship classes for kids',
    ],
    h1: 'Best PlanetSpark Alternatives in 2026',
    eyebrow: 'Alternatives guide · Updated Aug 2026',
    intro:
      'PlanetSpark leads when the goal is speaking and communication. Parents often search for alternatives when they also want AI, coding or entrepreneurship. Below is a fair shortlist — Orbit Student included with clear disclosure that we run this site.',
    competitorName: 'PlanetSpark',
    competitorUrl: 'https://www.planetspark.in/',
    updatedLabel: 'August 2026',
    verdict:
      'Stay with PlanetSpark for speaking-first goals. Switch to Orbit Student when you want AI + entrepreneurship and a portfolio. Mix providers if you need both elite speaking coaching and a founder track.',
    chooseOrbitIf: [
      'Speaking practice alone is not enough — you want ventures and AI',
      'You want one coherent Young CEO cohort',
      'Scholarship storytelling matters',
    ],
    chooseOtherIf: [
      'You only need fluency, debate or creative writing',
      'You want 1:1 communication coaches at PlanetSpark’s specialty',
    ],
    rows: [],
    alternatives: [
      {
        name: 'Orbit Student',
        href: 'https://www.orbitstudent.com/',
        bestFor: 'AI + entrepreneurship + pitch portfolios',
        pros: ['Mentor cohorts', 'AI studio', 'Scholarship roadmap'],
        cons: ['Not a pure public-speaking academy'],
      },
      {
        name: 'Codingal',
        href: 'https://codingal.com/',
        bestFor: 'AI/coding plus newer speaking modules',
        pros: ['Live instructors', 'Global footprint'],
        cons: ['Entrepreneurship still secondary'],
      },
      {
        name: 'BrightCHAMPS',
        href: 'https://brightchamps.com/',
        bestFor: 'STEM / Gen AI stacks',
        pros: ['Broad catalogue', 'Brand awareness'],
        cons: ['Not speaking-specialized like PlanetSpark'],
      },
      {
        name: 'Fuggae',
        href: 'https://fuggae.com/',
        bestFor: 'Small-group speaking + AI',
        pros: ['Tiny cohorts', 'Leadership framing'],
        cons: ['Less SEO/content scale'],
      },
      {
        name: 'Outschool speaking classes',
        href: 'https://outschool.com/',
        bestFor: 'À-la-carte speaking teachers',
        pros: ['Flexible scheduling'],
        cons: ['Inconsistent curriculum across teachers'],
      },
      {
        name: 'School debate / Toastmasters Youth',
        bestFor: 'Low-cost speaking practice',
        pros: ['Community-based', 'Stage time'],
        cons: ['No AI/entrepreneurship stack'],
      },
    ],
    faqs: [
      {
        question: 'Is Orbit Student better than PlanetSpark?',
        answer:
          'Neither is universally better. PlanetSpark wins for communication depth; Orbit wins for AI + entrepreneurship outcomes. Match the programme to the skill gap.',
      },
      {
        question: 'Can my child do both?',
        answer:
          'Yes. Some families keep a speaking coach and add Orbit for ventures and AI projects. Watch total weekly load — two live programmes can crowd school nights.',
      },
    ],
    related: [
      { label: 'Orbit vs PlanetSpark', href: '/compare/orbit-vs-planetspark/' },
      { label: 'BrightCHAMPS alternatives', href: '/compare/brightchamps-alternatives/' },
      { label: 'FAQ', href: '/faq/' },
    ],
    ctaType: 'compare_planetspark_alternatives',
  },
};

export const COMPARISON_LIST = Object.values(COMPARISONS);
