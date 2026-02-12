interface RouteMeta {
  title: string;
  description: string;
  keywords: string[];
  type: 'website' | 'article' | 'course';
}

export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: 'Orbit Student — #1 AI Learning Portal for Kids | Courses, AI Tools & Scholarships',
    description: 'Orbit Student: AI-powered learning portal for kids 8-18. Login to access AI tools, courses, live classes & scholarship prep. Join 2,500+ students.',
    keywords: ['Orbit Student', 'Orbit Student login', 'Orbit Student portal', 'AI learning platform', 'AI for kids', 'entrepreneurship for kids', 'best edtech for kids'],
    type: 'website'
  },
  '/courses': {
    title: 'Orbit Student Courses | AI Learning & Entrepreneurship for Kids 8-18',
    description: 'Orbit Student courses: 180-day Young CEO Program, AI tools training, business skills & leadership for kids 8-18. Enroll now.',
    keywords: ['Orbit Student courses', 'AI courses for kids', 'entrepreneurship course for kids', 'young CEO program', 'Orbit Student program'],
    type: 'course'
  },
  '/about': {
    title: 'About Orbit Student | Our Mission to Transform Kids into Future Leaders',
    description: 'Orbit Student: AI-powered edtech for kids 8-18. Learn about our mission, team, and why 2,500+ families trust Orbit Student.',
    keywords: ['about Orbit Student', 'Orbit Student mission', 'Orbit Student team', 'AI edtech for kids'],
    type: 'website'
  },
  '/blog': {
    title: 'Orbit Student Blog | AI Learning & Entrepreneurship for Kids',
    description: 'Read Orbit Student blog for tips on AI education, young entrepreneurship, business skills, and success stories of young leaders.',
    keywords: ['Orbit Student blog', 'AI education blog', 'young entrepreneur stories', 'kids business tips'],
    type: 'article'
  },
  '/resources': {
    title: 'Orbit Student Resources | Scholarships & Opportunities for Kids 8-18',
    description: 'Orbit Student resources: 500+ scholarships worth $2.9B+, competitions, and opportunities for kids 8-18. Start early.',
    keywords: ['Orbit Student resources', 'Orbit Student scholarships', 'scholarships for kids', 'student opportunities'],
    type: 'website'
  },
  '/contact': {
    title: 'Contact Orbit Student | Support & Enrollment Inquiries',
    description: 'Contact Orbit Student for support, enrollment, or partnership inquiries. Email hello@orbitstudent.com. We reply within 24 hours.',
    keywords: ['contact Orbit Student', 'Orbit Student support', 'Orbit Student email', 'Orbit Student enrollment'],
    type: 'website'
  },
  '/login': {
    title: 'Orbit Student Login | Student Portal — Access AI Learning Dashboard',
    description: 'Login to the Orbit Student portal. Access AI learning dashboard, courses, AI tools, live classes & scholarship prep.',
    keywords: ['Orbit Student login', 'Orbit Student portal', 'Orbit Student sign in', 'Orbit Student dashboard', 'orbitstudent login'],
    type: 'website'
  },
  '/demo': {
    title: 'Orbit Student Demo | Free Interactive AI Builder for Kids',
    description: 'Try the Orbit Student demo free. Build AI websites and games with our interactive builder. See what kids create with Orbit Student AI tools.',
    keywords: ['Orbit Student demo', 'Orbit Student free trial', 'Orbit Student preview', 'try Orbit Student'],
    type: 'website'
  }
};

export function getRouteMeta(path: string): RouteMeta {
  return routeMeta[path] || routeMeta['/'];
}
