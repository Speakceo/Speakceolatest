/**
 * Single source of truth for crawlable HTML shells (build-time prerender).
 * Competitor-aligned keywords: PlanetSpark (live classes, public speaking),
 * BrightCHAMPS (coding, AI, robotics for kids).
 */

export interface PrerenderRouteMeta {
  path: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  intro: string;
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
      'Live 1:1 & cohort classes in AI, entrepreneurship, coding and leadership for kids 8–18. Mentor-led, portfolio outcomes. Free trial — join 2,500+ families.',
    keywords:
      'AI learning for kids, entrepreneurship for kids, online classes for kids, coding for kids, young CEO program, live classes kids, edtech India, Orbit Student',
    h1: 'Live AI & Entrepreneurship Classes for Kids',
    intro:
      'Orbit Student offers mentor-led live classes in AI literacy, entrepreneurship, coding and leadership for ages 8–18 — like PlanetSpark and BrightCHAMPS, but built around real projects, AI tools and scholarship prep.',
    links: [
      { href: '/courses', label: 'View courses' },
      { href: '/live-classes', label: 'Live class schedule' },
      { href: '/demo', label: 'Free demo' },
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
      'Browse the Orbit Young CEO programme — structured modules in AI, business planning, public speaking and STEM. Live cohorts with replays in your student dashboard.',
    links: [
      { href: '/live-classes', label: 'Live classes' },
      { href: '/demo', label: 'Book free trial' },
    ],
  },
  {
    path: '/live-classes',
    title: 'Live Online Classes for Kids | AI & Entrepreneurship | Orbit Student',
    description:
      'Live 1:1 and small-group online classes for kids in AI, entrepreneurship, coding and leadership. Expert mentors, flexible time zones.',
    keywords:
      'live online classes for kids, live AI classes kids, 1:1 classes kids India, entrepreneurship classes online, mentor led learning kids',
    h1: 'Live Online Classes for Kids',
    intro:
      'Join interactive live sessions twice a week plus office hours. Small cohorts, real-time mentor feedback — the live-class model parents expect from top edtech platforms.',
    links: [
      { href: '/courses', label: 'Programme overview' },
      { href: '/contact', label: 'Ask about seats' },
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
      'We combine live mentorship, 100+ AI learning tools and scholarship roadmaps so children build portfolios — not just certificates.',
    links: [{ href: '/courses', label: 'Our programmes' }],
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
      'Curated scholarships, competitions and global programmes with age-fit filters and portfolio guidance.',
    links: [{ href: '/blog/how-kids-can-build-a-scholarship-profile-from-age-10', label: 'Scholarship guide' }],
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
      'Hands-on AI toolkit — SpeakSmart, MathMentor, WriteRight, PitchDeck Creator and more — included with every Orbit Student membership.',
    links: [{ href: '/demo', label: 'Try tools free' }],
  },
  {
    path: '/blog',
    title: 'Orbit Student Blog | AI, Entrepreneurship & Scholarships for Kids',
    description:
      'Expert guides on AI education, entrepreneurship for kids, coding, public speaking and scholarship planning. Updated weekly.',
    keywords:
      'AI education blog, entrepreneurship kids blog, parenting future skills, kids coding tips',
    h1: 'Orbit Student Blog',
    intro: 'Actionable articles for parents and students on AI literacy, young entrepreneurship and future-ready skills.',
    type: 'article',
  },
  {
    path: '/faq',
    title: 'FAQ | Young CEO Programme & AI Classes for Kids',
    description:
      'Answers about Orbit Student live classes, pricing, ages 8–18, AI tools, scholarships and the 180-day Young CEO programme.',
    keywords:
      'Orbit Student FAQ, young CEO program questions, AI classes kids FAQ, online learning kids India',
    h1: 'Frequently Asked Questions',
    intro: 'Everything parents ask before enrolling in live AI and entrepreneurship classes.',
    links: [{ href: '/contact', label: 'Contact support' }],
  },
  {
    path: '/testimonials',
    title: 'Parent & Student Reviews | Orbit Student',
    description:
      'Read success stories from Orbit Student families — young entrepreneurs, AI projects and scholarship wins.',
    keywords:
      'Orbit Student reviews, young entrepreneur success stories, parent testimonials edtech kids',
    h1: 'Success Stories & Reviews',
    intro: 'Real outcomes from students in our live cohort programme.',
  },
  {
    path: '/community',
    title: 'Student Community | Young Entrepreneurs Network',
    description:
      'Join 2,500+ young entrepreneurs in the Orbit Student community. Collaborate, share projects and grow together.',
    keywords:
      'kids entrepreneur community, student network online, young CEO community',
    h1: 'Orbit Student Community',
    intro: 'A safe, moderated space for students to share ideas and celebrate wins.',
  },
  {
    path: '/demo',
    title: 'Free Demo | Try Orbit Student AI Learning',
    description:
      'Free interactive demo: build AI websites and games, explore the student dashboard. No credit card required.',
    keywords:
      'Orbit Student demo, free trial AI kids, try online classes kids',
    h1: 'Free Orbit Student Demo',
    intro: 'See how kids learn AI and entrepreneurship with live mentors and hands-on tools.',
    links: [{ href: '/login', label: 'Start free trial' }],
  },
  {
    path: '/contact',
    title: 'Contact Orbit Student | Enrollment & Support',
    description:
      'Contact Orbit Student for enrollment, live class schedules or partnerships. hello@orbitstudent.com — reply within 24 hours.',
    keywords:
      'contact Orbit Student, enroll kids online classes, edtech support India',
    h1: 'Contact Orbit Student',
    intro: 'Questions about live classes, pricing or the Young CEO programme? We are here to help.',
  },
  {
    path: '/events',
    title: 'Events & Workshops | Young Entrepreneurs',
    description:
      'Upcoming Orbit Student workshops, pitch days and entrepreneurship competitions for kids 8–18.',
    keywords:
      'entrepreneurship events kids, business workshops students, startup competition kids',
    h1: 'Events & Workshops',
    intro: 'Live events that complement our core cohort programme.',
  },
  {
    path: '/partnerships',
    title: 'Partnerships | Orbit Student Edtech',
    description:
      'Partner with Orbit Student — schools, mentors and organisations supporting young entrepreneurs.',
    keywords:
      'edtech partnerships schools, youth entrepreneurship partners India',
    h1: 'Partnerships',
    intro: 'Collaborate on live classes, curriculum and student outcomes.',
  },
  {
    path: '/login',
    title: 'Orbit Student Login | Student Portal',
    description:
      'Sign in to the Orbit Student portal — courses, AI tools, live class replays and progress tracking.',
    keywords:
      'Orbit Student login, student portal, orbitstudent sign in',
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
