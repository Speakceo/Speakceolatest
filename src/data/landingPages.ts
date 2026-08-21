export type LeadLandingData = {
  slug: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  eyebrow: string;
  subhead: string;
  bullets: string[];
  proof: string[];
  ctaType: string;
  /** paid_ads for ad landers; organic_search for SEO guides reused as LP */
  source: 'paid_ads' | 'organic_search' | 'demo_request';
  formTitle: string;
  formSubtitle: string;
};

/** Paid / campaign landers — short, conversion-first. */
export const LANDING_PAGES: Record<string, LeadLandingData> = {
  'free-demo': {
    slug: 'free-demo',
    path: '/lp/free-demo',
    title: 'Book a Free Orbit Student Demo | AI & Entrepreneurship for Kids',
    description:
      'Book a free Orbit Student demo for ages 8–18. Live AI + entrepreneurship cohorts, portfolio projects, no payment to enquire.',
    keywords: ['free demo Orbit Student', 'AI classes for kids free trial', 'Young CEO demo'],
    h1: 'Book your free Orbit demo',
    eyebrow: 'Free consultation · No payment to book',
    subhead:
      'See how mentor-led AI and entrepreneurship classes work for your child’s age and timezone — reply within 24 hours.',
    bullets: [
      'Live small cohorts (ages 8–18)',
      'AI tools + venture projects + pitching',
      'Scholarship-ready portfolio roadmap',
      '30-day satisfaction guarantee after enrolment',
    ],
    proof: ['2,500+ families', '4.9/5 parent rating', '35+ countries'],
    ctaType: 'lp_free_demo',
    source: 'paid_ads',
    formTitle: 'Book free demo',
    formSubtitle: 'Parent name, email, phone, child age — that’s it.',
  },
  'ai-for-kids': {
    slug: 'ai-for-kids',
    path: '/lp/ai-for-kids',
    title: 'AI Entrepreneurship for Kids | Free Live Mentor Demo',
    description:
      'Live AI entrepreneurship classes for kids 8–18 — mentors, projects and pitching. Not video apps. Book a free Orbit Student demo.',
    keywords: [
      'AI entrepreneurship for kids',
      'AI classes for kids',
      'live AI classes kids',
      'Orbit Student',
    ],
    h1: 'AI entrepreneurship for kids who build',
    eyebrow: 'AI literacy · Ages 8–18',
    subhead:
      'Your child learns AI as a builder’s toolkit — websites, games, pitches — with live mentors twice a week.',
    bullets: [
      'AI studio with 100+ student tools',
      'Projects parents can share at school',
      'Tied to entrepreneurship, not quizzes alone',
      'Flexible tracks for India & global timezones',
    ],
    proof: ['Mentor-led cohorts', 'Portfolio outcomes', 'Free demo'],
    ctaType: 'lp_ai_for_kids',
    source: 'paid_ads',
    formTitle: 'Get AI class demo',
    formSubtitle: 'We’ll match age band and timezone.',
  },
  'young-ceo': {
    slug: 'young-ceo',
    path: '/lp/young-ceo',
    title: 'Young CEO Programme for Kids 8–18 | Free Orbit Demo',
    description:
      'Young CEO programme for kids: 180-day live path in AI, entrepreneurship and leadership. Book a free Orbit demo.',
    keywords: [
      'Young CEO programme for kids',
      'Young CEO programme',
      'young entrepreneur course',
      'Orbit Student',
    ],
    h1: 'Young CEO programme for kids — live mentors',
    eyebrow: '180-day cohort · Ages 8–18',
    subhead:
      'From idea to pitch: AI literacy, business basics, leadership and a portfolio built for scholarships and competitions.',
    bullets: [
      '52 live mentor sessions across the journey',
      'Ship real projects — not worksheets only',
      'Pitch practice with peer cohorts',
      'Clear scholarship & competition roadmap',
    ],
    proof: ['Capped class size', 'Replays in portal', 'Parent updates'],
    ctaType: 'lp_young_ceo',
    source: 'paid_ads',
    formTitle: 'Reserve Young CEO demo',
    formSubtitle: 'No payment required to book.',
  },
  'entrepreneurship-kids': {
    slug: 'entrepreneurship-kids',
    path: '/lp/entrepreneurship-kids',
    title: 'Entrepreneurship Classes for Kids Online | Free Demo',
    description:
      'Online entrepreneurship classes for kids 8–18 with live mentors, AI tools and pitch practice. Book a free Orbit demo.',
    keywords: [
      'entrepreneurship classes for kids online',
      'entrepreneurship classes for kids',
      'kids business class',
      'Orbit Student',
    ],
    h1: 'Entrepreneurship classes for kids online',
    eyebrow: 'Live cohorts · Real ventures',
    subhead:
      'Market research, simple offers, AI-assisted building and live pitches — designed for school-age attention spans.',
    bullets: [
      'Idea → prototype → pitch in one path',
      'AI tools for writing, research and decks',
      'Small groups so every child gets airtime',
      'Works alongside school — ~2 live sessions / week',
    ],
    proof: ['2,500+ families', '30-day guarantee', 'Free demo'],
    ctaType: 'lp_entrepreneurship_kids',
    source: 'paid_ads',
    formTitle: 'Book entrepreneurship demo',
    formSubtitle: 'Tell us your child’s age — we confirm fit fast.',
  },
};

export const LANDING_LIST = Object.values(LANDING_PAGES);
