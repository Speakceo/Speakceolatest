export type GuidePageData = {
  slug: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  eyebrow: string;
  intro: string;
  sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string }>;
  ctaType: string;
};

export const GUIDE_PAGES: Record<string, GuidePageData> = {
  'ai-classes-for-kids-online': {
    slug: 'ai-classes-for-kids-online',
    path: '/guides/ai-classes-for-kids-online',
    title: 'AI Entrepreneurship for Kids | Live Mentor Classes Online',
    description:
      'AI classes for kids that build ventures — live mentors, projects and pitching. Not video apps. Orbit Student ages 8–18.',
    keywords: [
      'AI entrepreneurship for kids',
      'AI classes for kids online',
      'live AI classes for kids',
      'AI learning for kids mentors',
    ],
    h1: 'AI entrepreneurship for kids: live mentors, real projects',
    eyebrow: 'Parent guide · 2026',
    intro:
      'AI entrepreneurship for kids means using AI to research, build and pitch real ventures — not only watching coding videos. Most “AI for kids” products are chatbots, short courses or STEM catalogues. The difference that matters is whether your child ships something real with a human mentor.',
    sections: [
      {
        heading: 'What good AI classes for kids include',
        paragraphs: [
          'Look for age-appropriate tool use, clear safety rules, and projects parents can see — a site, game, pitch deck or research summary — not only certificates.',
          'Live feedback beats passive libraries for ages 8–14 especially, when motivation and screen habits vary week to week.',
        ],
        bullets: [
          'Human mentor in the loop (not AI-only tutoring)',
          'Projects tied to school, hobbies or small ventures',
          'Parent-visible progress and replays',
          'Responsible AI use taught explicitly',
        ],
      },
      {
        heading: 'Live mentors vs apps',
        paragraphs: [
          'Apps scale cheaply but struggle with accountability. Live cohorts cost more and convert better when class size is capped and kids present work aloud.',
          'Orbit Student combines a live Young CEO path with an AI studio so tools support entrepreneurship — not random prompting practice.',
        ],
      },
      {
        heading: 'Age bands that make sense',
        paragraphs: [
          'Ages 8–11: storytelling, simple builders, guided prompts. Ages 12–15: products, research, pitching. Ages 16–18: portfolio depth for scholarships and competitions.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are online AI classes safe for kids?',
        answer:
          'Choose programmes with mentor oversight, clear tool allow-lists and no open-ended unsupervised adult AI chats. Ask how prompts and uploads are handled.',
      },
      {
        question: 'How often should kids take AI classes?',
        answer:
          'Two live sessions per week plus light practice fits most school schedules. Daily self-paced apps often drop off after novelty fades.',
      },
    ],
    related: [
      { label: 'Young CEO guide', href: '/guides/young-ceo-programme-for-kids/' },
      { label: 'Orbit vs BrightCHAMPS', href: '/compare/orbit-vs-brightchamps/' },
      { label: 'Free demo', href: '/lp/ai-for-kids/' },
    ],
    ctaType: 'guide_ai_classes',
  },
  'entrepreneurship-classes-for-kids': {
    slug: 'entrepreneurship-classes-for-kids',
    path: '/guides/entrepreneurship-classes-for-kids',
    title: 'Entrepreneurship Classes for Kids Online (2026 Guide)',
    description:
      'How to choose online entrepreneurship classes for kids — camps vs cohorts, pitching, AI tools. Orbit free demo for ages 8–18.',
    keywords: [
      'entrepreneurship classes for kids online',
      'entrepreneurship classes for kids',
      'online entrepreneurship for kids',
      'Young CEO programme',
    ],
    h1: 'Entrepreneurship classes for kids online: checklist',
    eyebrow: 'Parent guide · 2026',
    intro:
      'Short camps are great for energy. Longer mentor-led cohorts are better when you want a portfolio, pitch confidence and habits that survive a school term.',
    sections: [
      {
        heading: 'Camp vs cohort',
        paragraphs: [
          'A 1–2 week camp can spark interest. A 90–180 day cohort builds repetition: research, build, get feedback, pitch again.',
          'If your goal is scholarships or competition entries, prefer programmes that document outcomes over time.',
        ],
        bullets: [
          'Clear milestones (idea, offer, prototype, pitch)',
          'Live presentation practice',
          'Age-appropriate finance basics',
          'Parent updates without daily nagging',
        ],
      },
      {
        heading: 'Where AI fits',
        paragraphs: [
          'AI should speed research, writing and design — not replace the child’s judgment. Best programmes teach when to use tools and when to think first.',
        ],
      },
      {
        heading: 'How Orbit approaches it',
        paragraphs: [
          'Orbit’s Young CEO path ties AI literacy to entrepreneurship and leadership in live cohorts for ages 8–18, with a scholarship roadmap and student AI studio.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What age can kids start entrepreneurship classes?',
        answer:
          'Many programmes start around 7–8 with story and problem framing. Orbit’s path is designed for 8–18 with age-adapted tracks.',
      },
      {
        question: 'Do kids need a business idea first?',
        answer:
          'No. Good classes help them find problems worth solving, then build a small offer or project.',
      },
    ],
    related: [
      { label: 'AI classes guide', href: '/guides/ai-classes-for-kids-online/' },
      { label: 'Orbit vs PlanetSpark', href: '/compare/orbit-vs-planetspark/' },
      { label: 'Paid lander', href: '/lp/entrepreneurship-kids/' },
    ],
    ctaType: 'guide_entrepreneurship',
  },
  'young-ceo-programme-for-kids': {
    slug: 'young-ceo-programme-for-kids',
    path: '/guides/young-ceo-programme-for-kids',
    title: 'Young CEO Programme for Kids 8–18 | Live Orbit Guide',
    description:
      'What a Young CEO programme includes: live mentors, AI, pitching, portfolios and scholarships. Orbit Student free demo.',
    keywords: [
      'Young CEO programme for kids',
      'Young CEO programme',
      'Young CEO for kids',
      'CEO programme for children',
      'Orbit Student Young CEO',
    ],
    h1: 'Young CEO programme for kids (ages 8–18)',
    eyebrow: 'Programme guide · Ages 8–18',
    intro:
      '“Young CEO” should mean a structured journey from curiosity to shipped work — not a fancy title on a certificate. Here is how Orbit designs that path.',
    sections: [
      {
        heading: 'What the 180-day journey covers',
        paragraphs: [
          'Foundations (mindset, problem framing), execution (AI tools, simple products), and showcase (pitch, portfolio, scholarship storytelling).',
          'Two live sessions per week plus office hours keep momentum without replacing school.',
        ],
        bullets: [
          '52 live mentor-led sessions',
          'Portfolio projects parents can share',
          'Pitch practice with peers',
          'Competition and scholarship roadmap',
        ],
      },
      {
        heading: 'Who it is for',
        paragraphs: [
          'Kids who like building and presenting. Families comparing PlanetSpark (speaking-first) or BrightCHAMPS (STEM catalogue) who want entrepreneurship outcomes specifically.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Young CEO the same as coding class?',
        answer:
          'No. Coding may appear inside projects, but the spine is entrepreneurship, AI literacy and leadership — not competitive programming.',
      },
      {
        question: 'Can we try before paying?',
        answer:
          'Yes. Book a free demo — no payment required to enquire. Seats are confirmed for your timezone before enrolment.',
      },
    ],
    related: [
      { label: 'Courses', href: '/courses/' },
      { label: 'Young CEO lander', href: '/lp/young-ceo/' },
      { label: 'Compare programmes', href: '/compare/' },
    ],
    ctaType: 'guide_young_ceo',
  },
  'online-classes-for-kids-india': {
    slug: 'online-classes-for-kids-india',
    path: '/guides/online-classes-for-kids-india',
    title: 'Online AI & Entrepreneurship Classes for Kids in India',
    description:
      'Live online classes for kids in India — AI literacy, Young CEO skills, India timezones. Orbit Student free demo.',
    keywords: [
      'online classes for kids India AI entrepreneurship',
      'online classes for kids India',
      'AI classes for kids India',
      'entrepreneurship classes kids India',
    ],
    h1: 'Online AI & entrepreneurship classes for kids in India',
    eyebrow: 'India & global timezones',
    intro:
      'Indian families often juggle school boards, evening activities and global programme times. The right online class fits the calendar and still produces visible work.',
    sections: [
      {
        heading: 'Timezone and attendance',
        paragraphs: [
          'Prefer programmes with morning/evening tracks and replays. Ask how many live hours per week and what happens when exams spike.',
        ],
        bullets: [
          'Replay access for missed sessions',
          'Small cohorts so kids speak, not only listen',
          'Clear holiday / exam policies',
        ],
      },
      {
        heading: 'Skills that travel',
        paragraphs: [
          'AI literacy, pitching and portfolio projects help for school presentations, olympiads-adjacent storytelling and overseas applications — not only one exam syllabus.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Orbit run classes for India timezones?',
        answer:
          'Yes. Cohorts are scheduled with India and worldwide families in mind. A free demo maps the right track for your child.',
      },
    ],
    related: [
      { label: 'Live classes', href: '/live-classes/' },
      { label: 'Free demo LP', href: '/lp/free-demo/' },
      { label: 'FAQ', href: '/faq/' },
    ],
    ctaType: 'guide_india_online',
  },
  'scholarship-portfolio-for-kids': {
    slug: 'scholarship-portfolio-for-kids',
    path: '/guides/scholarship-portfolio-for-kids',
    title: 'Scholarship Portfolio for Kids | Projects That Rank',
    description:
      'Build a scholarship-ready portfolio with projects, pitches and AI literacy. Orbit Student roadmap + free demo.',
    keywords: [
      'scholarship portfolio for kids',
      'scholarship profile kids',
      'extracurricular portfolio children',
      'Young CEO scholarship',
    ],
    h1: 'Scholarship portfolio for kids: projects that stand out',
    eyebrow: 'Outcomes guide',
    intro:
      'Scholarship and selective programme reviewers look for evidence: projects, leadership, communication. A Young CEO-style portfolio makes that evidence concrete.',
    sections: [
      {
        heading: 'What to include',
        paragraphs: [
          '3–5 artefacts beat twenty certificates: a shipped project, a pitch recording or deck, a short reflection, and proof of iteration after feedback.',
        ],
        bullets: [
          'Problem statement in the child’s words',
          'Prototype or public link',
          'Pitch / presentation evidence',
          'What they learned and changed',
        ],
      },
      {
        heading: 'How Orbit helps',
        paragraphs: [
          'Orbit weaves portfolio milestones into the live cohort and AI studio so artefacts accumulate across the 180-day path — not as a last-minute scramble.',
        ],
      },
    ],
    faqs: [
      {
        question: 'When should kids start a scholarship portfolio?',
        answer:
          'From about age 10, light documentation helps. Consistency matters more than starting with a perfect venture.',
      },
    ],
    related: [
      { label: 'Scholarship blog guide', href: '/blog/how-kids-can-build-a-scholarship-profile-from-age-10/' },
      { label: 'Resources', href: '/resources/' },
      { label: 'Book demo', href: '/lp/young-ceo/' },
    ],
    ctaType: 'guide_scholarship',
  },
};

export const GUIDE_LIST = Object.values(GUIDE_PAGES);
