/**
 * Crawlable HTML shells for prerender.
 * Each route needs enough unique body copy (not just a title) so Google does not
 * classify the empty SPA #root as "Crawled — currently not indexed".
 */

export interface PrerenderRouteMeta {
  path: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  intro: string;
  /** Extra paragraphs (150–250 words total recommended across intro + paragraphs). */
  paragraphs?: string[];
  bullets?: string[];
  sectionHeading?: string;
  links?: Array<{ href: string; label: string }>;
  type?: 'website' | 'article';
  noindex?: boolean;
}

const SITE = 'https://www.orbitstudent.com';

export const PRERENDER_ROUTES: PrerenderRouteMeta[] = [
  {
    path: '/',
    title: 'Orbit Student | Live AI & Entrepreneurship Classes for Kids 8–18',
    description:
      'Live cohort classes in AI, entrepreneurship, coding and leadership for kids 8–18. Mentor-led portfolio outcomes. Free trial — join 2,500+ families.',
    keywords:
      'AI learning for kids, entrepreneurship for kids, online classes for kids, coding for kids, young CEO program, live classes kids, edtech India, Orbit Student',
    h1: 'Live AI & Entrepreneurship Classes for Kids',
    intro:
      'Orbit Student is a mentor-led programme for ages 8–18 that teaches AI literacy, entrepreneurship, coding and leadership through live classes and real projects — not passive video libraries.',
    paragraphs: [
      'Parents comparing platforms like PlanetSpark and BrightCHAMPS look for live instructors, clear outcomes and skills that matter beyond exams. Orbit Student runs small cohorts with two live sessions each week, Sunday office hours, and a gamified dashboard with 100+ AI tools.',
      'Over 180 days students build websites, games, pitches and portfolios while following a scholarship and competition roadmap. Cohorts are capped for real attention, with replays in the student portal and a 30-day satisfaction guarantee.',
    ],
    sectionHeading: 'What students get',
    bullets: [
      '52 live mentor-led sessions across the Young CEO journey',
      'AI tools for writing, maths, speaking and pitch decks',
      'Portfolio projects parents can share for school and scholarships',
      'Flexible time zones for families in India and worldwide',
    ],
    links: [
      { href: '/courses/', label: 'View courses' },
      { href: '/live-classes/', label: 'Live class schedule' },
      { href: '/demo/', label: 'Free demo' },
      { href: '/blog/', label: 'Parent blog' },
      { href: '/compare/', label: 'Compare programmes' },
      { href: '/compare/orbit-vs-planetspark/', label: 'Orbit vs PlanetSpark' },
      { href: '/compare/orbit-vs-brightchamps/', label: 'Orbit vs BrightCHAMPS' },
    ],
  },
  {
    path: '/compare',
    title: 'Compare Orbit Student | vs PlanetSpark, BrightCHAMPS & Alternatives',
    description:
      'Parent-facing comparisons: Orbit Student vs PlanetSpark, vs BrightCHAMPS, plus BrightCHAMPS and PlanetSpark alternatives. Book a free demo.',
    keywords:
      'Orbit Student vs PlanetSpark, Orbit vs BrightCHAMPS, BrightCHAMPS alternatives, PlanetSpark alternatives, AI entrepreneurship for kids',
    h1: 'Compare Orbit Student with other kids’ skill platforms',
    intro:
      'Parents often compare PlanetSpark for speaking and BrightCHAMPS for STEM. Orbit Student is a mentor-led AI and entrepreneurship cohort with portfolio and scholarship outcomes.',
    paragraphs: [
      'Use our comparison pages for fair, updated feature tables — then book a free demo to map age, timezone and goals. We disclose that Orbit publishes these pages and cite public competitor marketing.',
      'High-intent guides cover Orbit vs PlanetSpark, Orbit vs BrightCHAMPS, BrightCHAMPS alternatives and PlanetSpark alternatives so you can choose by outcome, not ads.',
    ],
    sectionHeading: 'Comparison guides',
    bullets: [
      'Orbit Student vs PlanetSpark — speaking vs young founders',
      'Orbit Student vs BrightCHAMPS — STEM catalogue vs AI entrepreneurship',
      'BrightCHAMPS alternatives — seven options by fit',
      'PlanetSpark alternatives — when you need more than speaking',
    ],
    links: [
      { href: '/compare/orbit-vs-planetspark/', label: 'Orbit vs PlanetSpark' },
      { href: '/compare/orbit-vs-brightchamps/', label: 'Orbit vs BrightCHAMPS' },
      { href: '/compare/brightchamps-alternatives/', label: 'BrightCHAMPS alternatives' },
      { href: '/demo/', label: 'Book free demo' },
    ],
  },
  {
    path: '/compare/orbit-vs-planetspark',
    title: 'Orbit Student vs PlanetSpark (2026): Which Fits Young Founders?',
    description:
      'Honest Orbit Student vs PlanetSpark comparison for parents. Speaking skills vs AI + entrepreneurship cohorts, portfolios and scholarships. Book a free Orbit demo.',
    keywords:
      'Orbit Student vs PlanetSpark, PlanetSpark alternative, entrepreneurship for kids, AI classes for kids, Young CEO programme',
    h1: 'Orbit Student vs PlanetSpark',
    intro:
      'PlanetSpark is a strong choice when the goal is public speaking and communication. Orbit Student is built for families who want live AI literacy, entrepreneurship and a scholarship-ready portfolio.',
    paragraphs: [
      'PlanetSpark emphasises speaking, storytelling and AI-assisted practice. Orbit runs small Young CEO cohorts with AI tools, venture projects and pitch outcomes parents can share for school and scholarships.',
      'Choose PlanetSpark for speaking-first goals. Choose Orbit when AI + entrepreneurship and portfolio storytelling matter more. Book a free Orbit demo — no payment required to enquire.',
    ],
    sectionHeading: 'At a glance',
    bullets: [
      'Orbit: AI + entrepreneurship + leadership portfolio',
      'PlanetSpark: public speaking and communication depth',
      'Both: live instruction and free trial / demo funnels',
      'Orbit edge: scholarship roadmap and student AI studio',
    ],
    links: [
      { href: '/compare/', label: 'All comparisons' },
      { href: '/demo/', label: 'Free demo' },
      { href: '/courses/', label: 'Courses' },
    ],
  },
  {
    path: '/compare/orbit-vs-brightchamps',
    title: 'Orbit Student vs BrightCHAMPS (2026): AI Classes Compared',
    description:
      'Orbit Student vs BrightCHAMPS for parents. Compare Gen AI / coding stacks vs mentor-led AI entrepreneurship cohorts with portfolios. Free Orbit demo.',
    keywords:
      'Orbit Student vs BrightCHAMPS, BrightCHAMPS alternative, AI classes for kids, coding for kids vs entrepreneurship',
    h1: 'Orbit Student vs BrightCHAMPS',
    intro:
      'BrightCHAMPS offers a large STEM and Gen AI catalogue. Orbit Student focuses on mentor-led cohorts that connect AI literacy to entrepreneurship, pitching and scholarship-ready work.',
    paragraphs: [
      'Families often compare the two when searching for AI classes for kids. BrightCHAMPS wins on course breadth and coding/robotics depth. Orbit wins when the outcome is a young founder journey with shipped projects.',
      'Pricing on both sides is typically demo-led. Book an Orbit demo to compare hours, group size and goals against any BrightCHAMPS quote.',
    ],
    sectionHeading: 'At a glance',
    bullets: [
      'Orbit: AI + entrepreneurship cohort path',
      'BrightCHAMPS: broad STEM / Gen AI catalogue',
      'Orbit: capped cohorts and portfolio roadmap',
      'BrightCHAMPS: scale and multi-subject packages',
    ],
    links: [
      { href: '/compare/brightchamps-alternatives/', label: 'BrightCHAMPS alternatives' },
      { href: '/demo/', label: 'Free demo' },
      { href: '/live-classes/', label: 'Live classes' },
    ],
  },
  {
    path: '/compare/brightchamps-alternatives',
    title: '7 Best BrightCHAMPS Alternatives (2026) for AI & Young Founders',
    description:
      'BrightCHAMPS alternatives for parents: Orbit Student, Codingal, PlanetSpark, TruPreneurs and more — compared by outcome. Book an Orbit free demo.',
    keywords:
      'BrightCHAMPS alternatives, alternatives to BrightCHAMPS, best BrightCHAMPS alternative 2026, AI classes for kids',
    h1: 'Best BrightCHAMPS Alternatives in 2026',
    intro:
      'BrightCHAMPS works well for large STEM catalogues. Alternatives fit different goals — coding depth, public speaking, or full entrepreneurship cohorts such as Orbit Student.',
    paragraphs: [
      'This guide lists Orbit Student, Codingal, PlanetSpark, TruPreneurs.AI, Fuggae, Outschool camps and My Little Founders with clear best-for notes. Orbit publishes this page and discloses affiliation.',
      'If you want mentor-led AI + entrepreneurship with a scholarship-ready portfolio, start with Orbit. If you need deep robotics or contest coding, stay with BrightCHAMPS or Codingal.',
    ],
    sectionHeading: 'Top alternatives',
    bullets: [
      'Orbit Student — AI + Young CEO cohorts',
      'Codingal — live AI & coding globally',
      'PlanetSpark — speaking-first alternative',
      'TruPreneurs.AI — school / B2B entrepreneurship AI',
    ],
    links: [
      { href: '/compare/orbit-vs-brightchamps/', label: 'Orbit vs BrightCHAMPS' },
      { href: '/demo/', label: 'Book free demo' },
    ],
  },
  {
    path: '/compare/planetspark-alternatives',
    title: '6 Best PlanetSpark Alternatives (2026) Beyond Public Speaking',
    description:
      'PlanetSpark alternatives for parents who want AI, entrepreneurship or broader life skills. Includes Orbit Student, Codingal, BrightCHAMPS and more.',
    keywords:
      'PlanetSpark alternatives, alternatives to PlanetSpark, PlanetSpark vs Orbit Student, entrepreneurship classes for kids',
    h1: 'Best PlanetSpark Alternatives in 2026',
    intro:
      'PlanetSpark leads for speaking and communication. Parents search for alternatives when they also want AI, coding or entrepreneurship — including Orbit Student’s Young CEO path.',
    paragraphs: [
      'Shortlist: Orbit Student, Codingal, BrightCHAMPS, Fuggae, Outschool speaking classes and community debate programmes. Match the skill gap; some families run speaking coaching plus an Orbit cohort.',
      'Stay with PlanetSpark for speaking-first goals. Switch to Orbit when AI + entrepreneurship and portfolio storytelling matter more.',
    ],
    sectionHeading: 'Top alternatives',
    bullets: [
      'Orbit Student — AI + entrepreneurship portfolios',
      'Codingal — AI/coding with expanding speaking',
      'BrightCHAMPS — STEM / Gen AI stacks',
      'Fuggae — tiny-cohort AI and speaking',
    ],
    links: [
      { href: '/compare/orbit-vs-planetspark/', label: 'Orbit vs PlanetSpark' },
      { href: '/faq/', label: 'FAQ' },
      { href: '/demo/', label: 'Free demo' },
    ],
  },
  {
    path: '/guides',
    title: 'Parent Guides | AI, Entrepreneurship & Young CEO | Orbit Student',
    description:
      'Long-form parent guides on AI classes for kids, entrepreneurship programmes, Young CEO paths and scholarship portfolios. Free Orbit demo.',
    keywords:
      'AI classes for kids, entrepreneurship classes for kids, Young CEO programme, scholarship portfolio kids, Orbit Student guides',
    h1: 'Parent guides for choosing the right programme',
    intro:
      'Practical checklists for AI classes, entrepreneurship cohorts, Young CEO paths and scholarship portfolios — written for parents comparing live online options.',
    paragraphs: [
      'Start with the skill gap: speaking, STEM depth, or young-founder AI. Each guide ends with a free Orbit demo if you want a human to map age and timezone.',
      'Also see our comparison pages for PlanetSpark and BrightCHAMPS if you are deciding between brands.',
    ],
    sectionHeading: 'Guide library',
    bullets: [
      'AI classes for kids online',
      'Entrepreneurship classes for kids',
      'Young CEO programme for kids',
      'Online classes for kids in India',
      'Scholarship portfolio for kids',
    ],
    links: [
      { href: '/guides/ai-classes-for-kids-online/', label: 'AI classes guide' },
      { href: '/guides/entrepreneurship-classes-for-kids/', label: 'Entrepreneurship guide' },
      { href: '/lp/free-demo/', label: 'Free demo lander' },
      { href: '/compare/', label: 'Compare programmes' },
    ],
  },
  {
    path: '/guides/ai-classes-for-kids-online',
    title: 'AI Classes for Kids Online (2026): Live Mentors vs Apps',
    description:
      'How to choose AI classes for kids online — live mentors, safety, projects and age bands. Orbit Student free demo for ages 8–18.',
    keywords:
      'AI classes for kids online, AI learning for kids, best AI classes for kids 2026, live AI classes kids',
    h1: 'AI classes for kids online: what actually works',
    intro:
      'Most AI-for-kids products are chatbots, video courses or STEM catalogues. The difference that matters is whether your child ships something real with a human mentor.',
    paragraphs: [
      'Look for age-appropriate tools, safety rules and visible projects — sites, games, pitch decks — not only certificates. Live feedback beats passive libraries for ages 8–14.',
      'Orbit Student combines a live Young CEO path with an AI studio so tools support entrepreneurship, not random prompting practice.',
    ],
    sectionHeading: 'Checklist',
    bullets: [
      'Human mentor in the loop',
      'Projects tied to real outcomes',
      'Parent-visible progress and replays',
      'Responsible AI use taught explicitly',
    ],
    links: [
      { href: '/lp/ai-for-kids/', label: 'AI classes lander' },
      { href: '/compare/orbit-vs-brightchamps/', label: 'vs BrightCHAMPS' },
      { href: '/demo/', label: 'Book demo' },
    ],
  },
  {
    path: '/guides/entrepreneurship-classes-for-kids',
    title: 'Entrepreneurship Classes for Kids (2026): What to Look For',
    description:
      'Parent guide to entrepreneurship classes for kids — camps vs year-long cohorts, pitching, AI tools and how Orbit Student works. Free demo.',
    keywords:
      'entrepreneurship classes for kids, entrepreneurship for kids online, kids business classes, Young CEO programme',
    h1: 'Entrepreneurship classes for kids: a practical checklist',
    intro:
      'Short camps spark energy. Longer mentor-led cohorts build portfolios, pitch confidence and habits that survive a school term.',
    paragraphs: [
      'Prefer clear milestones: idea, offer, prototype, pitch. AI should speed research and design — not replace the child’s judgment.',
      'Orbit’s Young CEO path ties AI literacy to entrepreneurship and leadership for ages 8–18 with a scholarship roadmap.',
    ],
    sectionHeading: 'What to demand',
    bullets: [
      'Live presentation practice',
      'Age-appropriate finance basics',
      'Documented outcomes over time',
      'Parent updates without daily nagging',
    ],
    links: [
      { href: '/lp/entrepreneurship-kids/', label: 'Entrepreneurship lander' },
      { href: '/compare/orbit-vs-planetspark/', label: 'vs PlanetSpark' },
      { href: '/courses/', label: 'Courses' },
    ],
  },
  {
    path: '/guides/young-ceo-programme-for-kids',
    title: 'Young CEO Programme for Kids 8–18 | Orbit Student Guide',
    description:
      'What a Young CEO programme for kids includes — live mentors, AI, pitching, portfolios and scholarships. Book an Orbit Student free demo.',
    keywords:
      'Young CEO programme, Young CEO for kids, CEO programme for children, Orbit Student Young CEO',
    h1: 'Young CEO programme for kids: inside the Orbit path',
    intro:
      'Young CEO should mean a structured journey from curiosity to shipped work — not a fancy title on a certificate.',
    paragraphs: [
      'Orbit’s 180-day path covers foundations, AI-assisted execution and showcase pitches, with two live sessions per week plus office hours.',
      'Built for families comparing speaking-first or STEM-catalogue brands who specifically want entrepreneurship outcomes.',
    ],
    sectionHeading: 'Includes',
    bullets: [
      '52 live mentor-led sessions',
      'Portfolio projects parents can share',
      'Pitch practice with peers',
      'Competition and scholarship roadmap',
    ],
    links: [
      { href: '/lp/young-ceo/', label: 'Young CEO lander' },
      { href: '/courses/', label: 'Courses' },
      { href: '/compare/', label: 'Compare' },
    ],
  },
  {
    path: '/guides/online-classes-for-kids-india',
    title: 'Online Classes for Kids in India (2026): AI & Entrepreneurship',
    description:
      'Choosing online classes for kids in India — timezones, live mentors, AI and entrepreneurship. Orbit Student serves India and global families.',
    keywords:
      'online classes for kids India, AI classes for kids India, entrepreneurship classes kids India, live online classes kids',
    h1: 'Online classes for kids in India: AI & Young CEO options',
    intro:
      'Indian families juggle school boards, evenings and global programme times. The right class fits the calendar and still produces visible work.',
    paragraphs: [
      'Prefer morning/evening tracks, replays and capped cohorts so kids speak — not only listen. Ask about exam-season flexibility.',
      'AI literacy, pitching and portfolios travel across boards and overseas applications, not only one syllabus.',
    ],
    sectionHeading: 'India-friendly signals',
    bullets: [
      'Replay access for missed sessions',
      'Timezone tracks for India evenings',
      'Clear holiday / exam policies',
      'Free demo before payment',
    ],
    links: [
      { href: '/live-classes/', label: 'Live classes' },
      { href: '/lp/free-demo/', label: 'Free demo' },
      { href: '/faq/', label: 'FAQ' },
    ],
  },
  {
    path: '/guides/scholarship-portfolio-for-kids',
    title: 'Scholarship Portfolio for Kids: Projects That Stand Out',
    description:
      'How kids build a scholarship-ready portfolio with projects, pitches and AI literacy. Orbit Student roadmap and free demo.',
    keywords:
      'scholarship portfolio for kids, scholarship profile kids, extracurricular portfolio children, Young CEO scholarship',
    h1: 'Build a scholarship portfolio kids can show',
    intro:
      'Reviewers look for evidence: projects, leadership, communication. A Young CEO-style portfolio makes that evidence concrete.',
    paragraphs: [
      'Three to five artefacts beat twenty certificates: a shipped project, pitch evidence, a short reflection and proof of iteration.',
      'Orbit weaves portfolio milestones into the live cohort so artefacts accumulate across 180 days.',
    ],
    sectionHeading: 'Portfolio checklist',
    bullets: [
      'Problem in the child’s words',
      'Prototype or public link',
      'Pitch / presentation evidence',
      'What they learned and changed',
    ],
    links: [
      { href: '/blog/how-kids-can-build-a-scholarship-profile-from-age-10/', label: 'Scholarship blog' },
      { href: '/resources/', label: 'Resources' },
      { href: '/lp/young-ceo/', label: 'Book demo' },
    ],
  },
  {
    path: '/lp/free-demo',
    title: 'Book a Free Orbit Student Demo | AI & Entrepreneurship for Kids',
    description:
      'Book a free Orbit Student demo for ages 8–18. Live AI + entrepreneurship cohorts, portfolio projects, no payment to enquire.',
    keywords: 'free demo Orbit Student, AI classes for kids free trial, Young CEO demo',
    h1: 'Book your free Orbit demo',
    intro:
      'See how mentor-led AI and entrepreneurship classes work for your child’s age and timezone. Reply within 24 hours — no payment to book.',
    paragraphs: [
      'Orbit runs small live cohorts for ages 8–18 with AI tools, venture projects and a scholarship-ready portfolio roadmap.',
      'Use this page from ads or shares to book a free demo with parent name, email, phone and child age only.',
    ],
    sectionHeading: 'You get',
    bullets: [
      'Live small cohorts',
      'AI tools + pitching',
      'Portfolio roadmap',
      '30-day guarantee after enrolment',
    ],
    links: [
      { href: '/courses/', label: 'Courses' },
      { href: '/compare/', label: 'Compare' },
    ],
  },
  {
    path: '/lp/ai-for-kids',
    title: 'AI Classes for Kids (Live Mentors) | Orbit Student Free Demo',
    description:
      'Live AI classes for kids 8–18 — not video libraries. Mentors, projects and Young CEO skills. Book a free Orbit Student demo.',
    keywords: 'AI classes for kids, AI learning for kids online, live AI classes kids, Orbit Student',
    h1: 'Live AI classes for kids who build',
    intro:
      'Your child learns AI as a builder’s toolkit — websites, games, pitches — with live mentors twice a week.',
    paragraphs: [
      'Orbit’s AI studio includes 100+ student tools tied to entrepreneurship outcomes parents can share at school.',
      'Flexible tracks for India and global timezones. Book a free demo to match age band.',
    ],
    sectionHeading: 'Highlights',
    bullets: [
      'AI studio access',
      'Shareable projects',
      'Entrepreneurship link',
      'Free demo',
    ],
    links: [
      { href: '/guides/ai-classes-for-kids-online/', label: 'AI guide' },
      { href: '/tools/', label: 'AI tools' },
    ],
  },
  {
    path: '/lp/young-ceo',
    title: 'Young CEO Programme for Kids 8–18 | Free Orbit Demo',
    description:
      'Orbit Young CEO programme: 180-day live path in AI, entrepreneurship and leadership. Book a free demo for your child.',
    keywords: 'Young CEO programme, young entrepreneur course, entrepreneurship for kids, Orbit Student',
    h1: 'Young CEO programme — live, mentor-led',
    intro:
      'From idea to pitch: AI literacy, business basics, leadership and a portfolio built for scholarships and competitions.',
    paragraphs: [
      'Fifty-two live mentor sessions, capped class size, replays and parent updates across a 180-day journey.',
      'Book a free demo — no payment required to enquire.',
    ],
    sectionHeading: 'Includes',
    bullets: [
      '52 live sessions',
      'Shipped projects',
      'Pitch practice',
      'Scholarship roadmap',
    ],
    links: [
      { href: '/guides/young-ceo-programme-for-kids/', label: 'Young CEO guide' },
      { href: '/courses/', label: 'Courses' },
    ],
  },
  {
    path: '/lp/entrepreneurship-kids',
    title: 'Entrepreneurship Classes for Kids Online | Orbit Free Demo',
    description:
      'Online entrepreneurship classes for kids 8–18 with live mentors, AI tools and pitch practice. Book a free Orbit Student demo.',
    keywords:
      'entrepreneurship classes for kids, entrepreneurship for kids online, kids business class, Orbit Student',
    h1: 'Entrepreneurship classes kids actually finish',
    intro:
      'Market research, simple offers, AI-assisted building and live pitches — designed for school-age attention spans.',
    paragraphs: [
      'Idea → prototype → pitch in one path, about two live sessions per week alongside school.',
      'Book a free demo with parent details only.',
    ],
    sectionHeading: 'Why parents book',
    bullets: [
      'Live mentors',
      'AI-assisted building',
      'Small groups',
      '30-day guarantee',
    ],
    links: [
      { href: '/guides/entrepreneurship-classes-for-kids/', label: 'Entrepreneurship guide' },
      { href: '/compare/', label: 'Compare' },
    ],
  },
  {
    path: '/courses',
    title: 'AI & Entrepreneurship Courses for Kids | Orbit Student',
    description:
      '180-day Young CEO programme: live mentor classes, AI tools, coding basics and business skills for kids 8–18. Enrol in India & worldwide.',
    keywords:
      'AI courses for kids, entrepreneurship course for kids, coding classes kids, online course kids India, young CEO program, STEM courses kids',
    h1: 'AI & Entrepreneurship Courses for Kids 8–18',
    intro:
      'The Orbit Young CEO programme is a structured 180-day course path covering AI tools, business planning, public speaking, leadership and STEM foundations for school-age builders.',
    paragraphs: [
      'Unlike short workshop packs, every module connects to a live mentor session and a shippable project. Students progress through fundamentals, execution sprints and a showcase pitch with peer feedback.',
      'Curriculum tracks adapt by age: younger learners focus on storytelling, creativity and simple AI helpers; teens go deeper into market research, financial literacy and presentation for scholarships or competitions.',
    ],
    sectionHeading: 'Course highlights',
    bullets: [
      'Young CEO fundamentals and business plan basics',
      'Live AI classes with mentor feedback',
      'Coding and STEM modules tied to real products',
      'Scholarship prep woven into the learning path',
    ],
    links: [
      { href: '/live-classes/', label: 'Live classes' },
      { href: '/demo/', label: 'Book free trial' },
      { href: '/resources/', label: 'Scholarships' },
    ],
  },
  {
    path: '/live-classes',
    title: 'Live Online Classes for Kids | AI & Entrepreneurship | Orbit Student',
    description:
      'Live small-group online classes for kids in AI, entrepreneurship, coding and leadership. Expert mentors, flexible time zones.',
    keywords:
      'live online classes for kids, live AI classes kids, 1:1 classes kids India, entrepreneurship classes online, mentor led learning kids',
    h1: 'Live Online Classes for Kids',
    intro:
      'Orbit Student live classes are interactive cohort sessions — students speak, share screens and get mentor feedback in real time, with replays available in the dashboard.',
    paragraphs: [
      'Two cohort classes per week plus Sunday office hours keep momentum without overloading school schedules. Class sizes stay small so every child gets airtime, not just passive listening.',
      'Families across India and global time zones can join morning or evening tracks. Mentors are practitioners who have built products, so feedback is practical and age-appropriate.',
    ],
    sectionHeading: 'How live learning works',
    bullets: [
      'Twice-weekly live sessions + office hours',
      'Recorded replays for missed classes',
      'Peer cohorts capped for engagement',
      'Parent-visible progress and streaks',
    ],
    links: [
      { href: '/courses/', label: 'Programme overview' },
      { href: '/contact/', label: 'Ask about seats' },
      { href: '/demo/', label: 'Try a demo' },
    ],
  },
  {
    path: '/about',
    title: 'About Orbit Student | AI Edtech for Young Entrepreneurs',
    description:
      'Orbit Student mission: mentor-led AI and entrepreneurship education for kids 8–18. Trusted by 2,500+ families across India and worldwide.',
    keywords:
      'about Orbit Student, AI edtech kids India, young entrepreneur education, future skills children',
    h1: 'About Orbit Student',
    intro:
      'Orbit Student exists because school rarely teaches kids how to speak like leaders, ship real projects or use AI as a creative tool — we built a live programme that does.',
    paragraphs: [
      'Started from a simple question — why don’t children learn entrepreneurship and communication the way they learn maths — Orbit grew into a remote-first academy serving families in 35+ countries from a Mumbai base.',
      'Our approach blends live mentorship, 100+ AI learning tools and scholarship roadmaps so children leave with portfolios and confidence, not only certificates. We specialise in ages 8–18, including shy beginners.',
    ],
    sectionHeading: 'What we believe',
    bullets: [
      'Skills beat rote certificates',
      'Live feedback beats passive video',
      'AI should be a tool kids command',
      'Parents deserve transparent outcomes',
    ],
    links: [
      { href: '/courses/', label: 'Our programmes' },
      { href: '/testimonials/', label: 'Success stories' },
      { href: '/contact/', label: 'Contact us' },
    ],
  },
  {
    path: '/resources',
    title: 'Scholarships & Opportunities for Kids | Orbit Student',
    description:
      '500+ scholarships worth $2.9B+, competitions and fellowships for students 8–18. Start scholarship prep early with Orbit Student.',
    keywords:
      'scholarships for kids, scholarship prep kids India, youth competitions, college prep middle school',
    h1: 'Scholarships & Student Opportunities',
    intro:
      'Orbit Student curates scholarships, competitions and fellowships with age-fit filters so kids can start building a profile years before university applications.',
    paragraphs: [
      'Early scholarship planning is a competitive advantage. We map opportunities against student portfolios from live projects so applications have real evidence, not empty claims.',
      'Parents use the resources hub to shortlist deadlines, competitions and global programmes while students keep shipping work inside their cohort.',
    ],
    sectionHeading: 'Resource types',
    bullets: [
      'Need-based and merit scholarships',
      'Youth entrepreneurship competitions',
      'Global fellowships and summer programmes',
      'Guides for ages 10–18 portfolio building',
    ],
    links: [
      { href: '/blog/how-kids-can-build-a-scholarship-profile-from-age-10/', label: 'Scholarship guide' },
      { href: '/courses/', label: 'Young CEO programme' },
    ],
  },
  {
    path: '/tools',
    title: 'AI Tools for Kids | 100+ Learning Tools | Orbit Student',
    description:
      '100+ AI-powered tools for students: pitch simulators, writing coaches, math mentors and business builders. Ages 8–18.',
    keywords:
      'AI tools for kids, AI learning tools students, kids AI platform, homework AI help kids',
    h1: 'AI Tools for Kids & Teens',
    intro:
      'Orbit Student includes a hands-on AI toolkit — SpeakSmart, MathMentor, WriteRight, PitchDeck Creator and more — so kids learn by building, not watching tutorials.',
    paragraphs: [
      'Every tool is wrapped in student-safe guardrails and tied to programme projects. Mentors review outputs in live class so AI becomes a practice partner, not a cheat code.',
      'Parents see usage and progress in the dashboard. Tools cover communication, maths, writing, branding and business simulation across the Young CEO journey.',
    ],
    sectionHeading: 'Toolkit examples',
    bullets: [
      'SpeakSmart — public speaking practice',
      'MathMentor — step-by-step maths coaching',
      'WriteRight — structured writing help',
      'PitchDeck Creator — investor-style slides',
    ],
    links: [
      { href: '/demo/', label: 'Try tools free' },
      { href: '/courses/', label: 'See full programme' },
    ],
  },
  {
    path: '/blog',
    title: 'Orbit Student Blog | AI, Entrepreneurship & Scholarships for Kids',
    description:
      'Expert guides on AI education, entrepreneurship for kids, coding, public speaking and scholarship planning. Updated weekly.',
    keywords:
      'AI education blog, entrepreneurship kids blog, parenting future skills, kids coding tips',
    h1: 'Orbit Student Blog',
    intro:
      'Practical articles for parents and students on AI literacy, young entrepreneurship, scholarship prep and future-ready skills.',
    paragraphs: [
      'Each guide is written for busy parents who want clear next steps — how to start AI learning safely, how kids build scholarships profiles early, and how entrepreneurship education works for ages 8–18.',
      'Browse recent posts on AI tools checklists, 90-day entrepreneurship roadmaps and communication skills for young leaders, then explore related courses and live classes.',
    ],
    sectionHeading: 'Popular topics',
    bullets: [
      'AI learning for kids — parent guides',
      'Entrepreneurship roadmaps',
      'Scholarship profile building',
      'Public speaking and leadership',
    ],
    type: 'article',
    links: [
      { href: '/blog/ai-learning-for-kids-complete-guide-2026/', label: 'AI learning guide' },
      { href: '/courses/', label: 'Courses' },
    ],
  },
  {
    path: '/faq',
    title: 'FAQ | Young CEO Programme & AI Classes for Kids',
    description:
      'Answers about Orbit Student live classes, pricing, ages 8–18, AI tools, scholarships and the 180-day Young CEO programme.',
    keywords:
      'Orbit Student FAQ, young CEO program questions, AI classes kids FAQ, online learning kids India',
    h1: 'Frequently Asked Questions',
    intro:
      'Clear answers for parents before enrolling in live AI and entrepreneurship classes at Orbit Student.',
    paragraphs: [
      'Common questions cover age ranges (8–18), how live cohorts work, what is included for $299 USD equivalent pricing, AI tool access, scholarship roadmaps and the free trial / demo options.',
      'If you need a personalised schedule for your timezone, contact the team — seats are confirmed within one business day before payment.',
    ],
    sectionHeading: 'Quick answers',
    bullets: [
      'Ages 8–18 with age-adapted tracks',
      'Live mentor classes twice weekly',
      'Free demo and trial options',
      '30-day satisfaction guarantee',
    ],
    links: [
      { href: '/contact/', label: 'Contact support' },
      { href: '/demo/', label: 'Book a demo' },
      { href: '/compare/', label: 'Compare programmes' },
    ],
  },
  {
    path: '/testimonials',
    title: 'Parent & Student Reviews | Orbit Student',
    description:
      'Read success stories from Orbit Student families — young entrepreneurs, AI projects and scholarship wins.',
    keywords:
      'Orbit Student reviews, young entrepreneur success stories, parent testimonials edtech kids',
    h1: 'Success Stories & Reviews',
    intro:
      'Families share how live cohorts, AI tools and mentor feedback changed confidence, communication and project output for their children.',
    paragraphs: [
      'Stories highlight shy students who learned to pitch, builders who shipped first websites and games, and parents who used portfolio work for scholarships and school opportunities.',
      'Outcomes vary by commitment, but the pattern is consistent: live practice plus real projects beats certificate-only courses.',
    ],
    sectionHeading: 'What parents notice',
    bullets: [
      'Confidence in speaking and presenting',
      'Visible portfolio of shipped work',
      'Healthier AI and tech habits',
      'Clearer scholarship / competition path',
    ],
    links: [
      { href: '/courses/', label: 'Join a cohort' },
      { href: '/about/', label: 'About Orbit' },
    ],
  },
  {
    path: '/community',
    title: 'Student Community | Young Entrepreneurs Network',
    description:
      'Join 2,500+ young entrepreneurs in the Orbit Student community. Collaborate, share projects and grow together.',
    keywords:
      'kids entrepreneur community, student network online, young CEO community',
    h1: 'Orbit Student Community',
    intro:
      'A moderated community for young builders — cohort circles, founder office hours and monthly showcase nights.',
    paragraphs: [
      'Students are never building alone. Cross-cohort projects connect peers across countries while mentors host open mic hours for real product questions.',
      'Showcase nights give kids a live audience for pitches — the same skill used in competitions and school presentations.',
    ],
    sectionHeading: 'Community rituals',
    bullets: [
      '18-student cohort circles',
      'Sunday founder office hours',
      'Monthly showcase nights',
      'Cross-border collaboration projects',
    ],
    links: [
      { href: '/live-classes/', label: 'Live classes' },
      { href: '/demo/', label: 'Join a demo' },
    ],
  },
  {
    path: '/demo',
    title: 'Free Demo | Try Orbit Student AI Learning',
    description:
      'Free interactive demo: explore AI builders and see how Orbit live classes work. No credit card required.',
    keywords:
      'Orbit Student demo, free trial AI kids, try online classes kids',
    h1: 'Free Orbit Student Demo',
    intro:
      'Try Orbit Student free — explore how kids use AI builders and what a mentor-led cohort feels like before you enrol.',
    paragraphs: [
      'The demo is designed for parents and students to see outcomes quickly: sample AI website/game builders, programme structure and next steps to reserve a cohort seat.',
      'No payment is required to book a consultation. Our team confirms timezone and seat availability, typically within one business day.',
    ],
    sectionHeading: 'What you will see',
    bullets: [
      'Interactive AI builder preview',
      'Young CEO programme overview',
      'Live class model explanation',
      'Clear path to free trial / enrol',
    ],
    links: [
      { href: '/courses/', label: 'View courses' },
      { href: '/contact/', label: 'Talk to us' },
    ],
  },
  {
    path: '/contact',
    title: 'Contact Orbit Student | Enrollment & Support',
    description:
      'Contact Orbit Student for enrollment, live class schedules or partnerships. hello@orbitstudent.com — reply within 24 hours.',
    keywords:
      'contact Orbit Student, enroll kids online classes, edtech support India',
    h1: 'Contact Orbit Student',
    intro:
      'Questions about live classes, pricing, partnerships or the Young CEO programme? Reach the Orbit Student team.',
    paragraphs: [
      'Email hello@orbitstudent.com for enrolment and support. We reply within 24 hours on business days and can recommend morning or evening cohorts for your timezone.',
      'Schools and organisations interested in partnerships can use the same channel — include “Partnership” in the subject line.',
    ],
    sectionHeading: 'How we can help',
    bullets: [
      'Programme enrolment and schedules',
      'Demo and free trial questions',
      'Parent onboarding support',
      'School / mentor partnerships',
    ],
    links: [
      { href: '/demo/', label: 'Book a demo' },
      { href: '/faq/', label: 'Read FAQ' },
    ],
  },
  {
    path: '/events',
    title: 'Events & Workshops | Young Entrepreneurs',
    description:
      'Upcoming Orbit Student workshops, pitch days and entrepreneurship competitions for kids 8–18.',
    keywords:
      'entrepreneurship events kids, business workshops students, startup competition kids',
    h1: 'Events & Workshops',
    intro:
      'Pitch competitions, business-plan workshops and marketing masterclasses that complement the core Orbit cohort programme.',
    paragraphs: [
      'Events give students live practice presenting to mentors and peers. Dates roll forward on a weekly cadence so there is always a near-term opportunity to join.',
      'Register from the events page or ask enrolments to reserve a seat when you join a cohort.',
    ],
    sectionHeading: 'Typical formats',
    bullets: [
      'Young entrepreneurs pitch competitions',
      'Business plan workshops',
      'Digital marketing masterclasses',
      'Virtual networking for youth builders',
    ],
    links: [
      { href: '/courses/', label: 'Join a cohort' },
      { href: '/contact/', label: 'Host with us' },
    ],
  },
  {
    path: '/partnerships',
    title: 'Partnerships | Orbit Student Edtech',
    description:
      'Partner with Orbit Student — schools, mentors and organisations supporting young entrepreneurs.',
    keywords:
      'edtech partnerships schools, youth entrepreneurship partners India',
    h1: 'Partnerships',
    intro:
      'Orbit Student partners with schools, mentors and youth organisations to bring live AI and entrepreneurship education to more families.',
    paragraphs: [
      'We collaborate on curriculum delivery, showcase events and scholarship pathways. Partners get a clear operating model: cohort delivery, mentor standards and parent communication.',
      'Tell us about your school or organisation — we will propose a pilot timeline that fits your academic calendar.',
    ],
    sectionHeading: 'Partnership types',
    bullets: [
      'School cohort pilots',
      'Mentor / coach collaborations',
      'Scholarship and competition partners',
      'Community and NGO programmes',
    ],
    links: [
      { href: '/contact/', label: 'Partner with us' },
      { href: '/about/', label: 'About Orbit' },
    ],
  },
  {
    path: '/login',
    title: 'Orbit Student Login | Student Portal',
    description:
      'Sign in to the Orbit Student portal — courses, AI tools, live class replays and progress tracking.',
    keywords: 'Orbit Student login, student portal, orbitstudent sign in',
    h1: 'Orbit Student Login',
    intro: 'Access your AI learning dashboard, live classes and portfolio.',
    noindex: true,
  },
];

export function canonicalForPath(path: string): string {
  if (path === '/' || path === '') return SITE;
  const clean = path.replace(/\/+$/, '');
  return `${SITE}${clean}/`;
}
