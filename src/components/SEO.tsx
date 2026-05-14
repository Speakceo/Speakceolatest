import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_ORIGIN = 'https://www.orbitstudent.com';

/** Preferred public URL: www, HTTPS, no trailing slash on the homepage. */
export function normalizeCanonicalUrl(href: string): string {
  let s = href.trim();
  if (s === `${SITE_ORIGIN}/` || s === 'http://www.orbitstudent.com/' || s === 'http://www.orbitstudent.com') {
    return SITE_ORIGIN;
  }
  if (s.startsWith(SITE_ORIGIN) && s.length > SITE_ORIGIN.length && s.endsWith('/')) {
    return s.replace(/\/+$/, '');
  }
  return s;
}

function canonicalFromPathname(pathname: string): string {
  const path = pathname.split('?')[0].split('#')[0] || '/';
  if (path === '/' || path === '') return SITE_ORIGIN;
  const base = path.replace(/\/+$/, '') || '/';
  return `${SITE_ORIGIN}${base}`;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  url?: string;
  type?: 'website' | 'article' | 'course';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: any;
  showFAQ?: boolean;
  noIndex?: boolean;
  courseData?: {
    name: string;
    provider: string;
    description: string;
    duration: string;
    price?: string;
  };
}

const defaultSEO = {
  title: 'Orbit Student | AI Learning for Kids',
  description:
    'AI tools, courses, live classes and scholarship prep for ages 8–18. Join 2,500+ students — start a free trial at orbitstudent.com.',
  keywords: [
    // Brand + Action keywords (highest priority)
    'Orbit Student',
    'Orbit Student login',
    'Orbit Student portal',
    'Orbit Student dashboard',
    'Orbit Student app',
    'Orbit Student sign in',
    'Orbit Student sign up',
    'Orbit Student register',
    'Orbit Student account',
    'Orbit Student platform',
    'Orbit Student courses',
    'Orbit Student live classes',
    'Orbit Student AI tools',
    'Orbit Student demo',
    'Orbit Student free trial',
    'Orbit Student review',
    'Orbit Student pricing',
    'Orbit Student scholarship',
    'Orbit Student for parents',
    'orbitstudent',
    'orbitstudent.com',
    'orbitstudent login',
    'orbitstudent portal',
    // Brand variants
    'Orbit AI',
    'Orbit AI student',
    'Orbit education',
    'Orbit learning',
    'Orbit AI learning',
    'Orbit student AI',
    'Orbit study',
    'Orbit edtech',
    'Orbit new age',
    // AI keywords
    'AI student',
    'AI for kids',
    'AI learning platform',
    'AI education for children',
    'AI powered education',
    'AI tools for students',
    'AI courses for kids',
    'AI literacy for kids',
    'AI tutor for students',
    'AI student platform',
    'AI student portal',
    'AI student login',
    'AI student dashboard',
    'AI mentor for students',
    'best AI platform for kids',
    'AI school for kids',
    'AI generation kids',
    'AI first education',
    'AI skills for kids',
    'AI homework help',
    'AI for young learners',
    'artificial intelligence for students',
    'learn AI for kids',
    'kids AI tools',
    'kids learn artificial intelligence',
    'future AI education',
    'AI entrepreneurship',
    'young AI learners',
    // New age / Gen keywords
    'kids new age learning',
    'new age education',
    'Gen Z AI learning',
    'Gen Alpha education',
    'smart learning for kids',
    // Parent-focused keywords
    'best future plan for kids',
    'best education for future',
    'best investment in child future',
    'prepare kids for future',
    'child future planning',
    'future career for kids',
    'future-ready kids',
    'how to prepare kids for future jobs',
    'future opportunities for children',
    'child success planning',
    // Education keywords
    'young entrepreneur program',
    'future skills for children',
    'entrepreneurship for kids',
    'business education for children',
    'young CEO program',
    'AI-powered learning',
    'AI literacy for youth',
    'business skills for teens',
    'learn entrepreneurship online',
    'future entrepreneurs',
    'skills kids need for future',
    'teen startup program',
    'young business leaders',
    'future leaders program',
    'startup skills for youth',
    'scholarship prep for kids',
    'early scholarship planning',
    'college prep for middle school',
    'coding for kids',
    'STEM for kids',
    'best edtech for kids',
    'student learning portal',
    'kids business course online',
    'online learning for kids',
    'online business school for kids',
    'best online course for kids',
    'kids learning dashboard',
    'student portal for kids',
    'gamified learning for kids',
    'interactive learning platform',
    'public speaking for kids',
    'leadership for kids'
  ],
  image: `${SITE_ORIGIN}/og-image.jpg`,
  url: SITE_ORIGIN,
  type: 'website' as const,
  author: 'Orbit Future Academy'
};

export default function SEO({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  imageWidth = 1200,
  imageHeight = 630,
  url = defaultSEO.url,
  type = defaultSEO.type,
  author = defaultSEO.author,
  publishedTime,
  modifiedTime,
  structuredData,
  showFAQ = false,
  noIndex = false,
  courseData
}: SEOProps) {
  const location = useLocation();
  const resolvedCanonical = normalizeCanonicalUrl(
    url && url.trim().length > 0 ? url.trim() : canonicalFromPathname(location.pathname)
  );

  // Avoid "Brand — Title | Brand" duplication
  const siteTitle = title.toLowerCase().includes('orbit student')
    ? title
    : `${title} | Orbit Student`;

  /** ~155–158 chars for meta description (SERP best practice) */
  const metaDescription =
    description.length <= 158 ? description : `${description.slice(0, 155).trimEnd()}…`;

  const orgPhone =
    typeof import.meta.env.VITE_ORG_TELEPHONE === 'string' &&
    import.meta.env.VITE_ORG_TELEPHONE.trim().length >= 8
      ? import.meta.env.VITE_ORG_TELEPHONE.trim()
      : undefined;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    name: 'Orbit Student',
    alternateName: ['Orbit AI', 'Orbit AI Student', 'Orbit Learning', 'OrbitStudent', 'Orbit Student Portal', 'Orbit Student Login', 'Orbit Student Dashboard'],
    description: defaultSEO.description,
    url: SITE_ORIGIN,
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.orbitstudent.com/logo.png',
      width: 200,
      height: 200
    },
    image: 'https://www.orbitstudent.com/og-image.jpg',
    sameAs: [
      'https://twitter.com/orbitstudent',
      'https://facebook.com/orbitstudent',
      'https://linkedin.com/company/orbitstudent',
      'https://instagram.com/orbitstudent',
      'https://www.youtube.com/@orbitstudent'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    contactPoint: {
      '@type': 'ContactPoint',
      ...(orgPhone ? { telephone: orgPhone } : {}),
      contactType: 'Customer Service',
      email: 'hello@orbitstudent.com',
      availableLanguage: ['English']
    },
    foundingDate: '2024',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '10-50'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2500',
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'Offer',
      name: '180-Day Young CEO Program',
      description: 'Comprehensive entrepreneurship education for young minds',
      price: '299',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: '2024-01-01'
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Orbit Student',
    url: SITE_ORIGIN,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_ORIGIN}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const courseSchema = courseData ? {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseData.name,
    description: courseData.description,
    provider: {
      '@type': 'Organization',
      name: courseData.provider,
      sameAs: SITE_ORIGIN
    },
    timeRequired: courseData.duration,
    educationalLevel: 'Beginner to Intermediate',
    teaches: [
      'Artificial Intelligence Literacy',
      'Entrepreneurship',
      'Business Planning',
      'Leadership Skills',
      'Financial Literacy',
      'Marketing and Sales',
      'Public Speaking',
      'Digital Citizenship and Safety'
    ],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'Children and Teenagers aged 8-18'
    },
    offers: courseData.price ? {
      '@type': 'Offer',
      price: courseData.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString()
    } : undefined
  } : null;

  // Add FAQ Schema for better SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What age group is Orbit Student designed for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Orbit Student is designed for children and teenagers aged 8-18 who want to develop AI skills, entrepreneurial mindset, and business acumen. Our AI learning platform starts as early as 3rd grade.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does Orbit AI help students learn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Orbit AI provides 100+ AI-powered tools including an AI business builder, AI pitch simulator, AI brand creator, and AI learning coach. Students use artificial intelligence hands-on to build real projects, not just watch videos.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does Orbit Student help with scholarships?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Orbit Student maps 500+ scholarships worth $2.9B+ and creates personalized scholarship roadmaps from day one. Students build portfolios, win competitions, and prepare for college applications years before their peers.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long is the Orbit Student program?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Orbit Student Young CEO Program is a comprehensive 180-day journey that transforms young minds into future business leaders with AI skills, entrepreneurship, and real-world execution.'
        }
      },
      {
        '@type': 'Question',
        name: 'What skills will my child learn at Orbit Student?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Students learn AI tools and literacy, entrepreneurship, business planning, leadership, financial literacy, marketing, sales, public speaking, coding basics, and critical thinking skills — the new age skills for future-ready kids.'
        }
      },
      {
        '@type': 'Question',
        name: 'How is Orbit Student different from other edtech platforms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Orbit Student is AI-first with 100+ AI tools, starts as young as age 8 (vs. 14+ for competitors), includes live mentorship with real entrepreneurs, builds real portfolios instead of just giving certificates, and provides personalized scholarship roadmaps — none of which traditional edtech offers.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I login to Orbit Student?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit orbitstudent.com/login to access the Orbit Student portal. Students and parents can sign in with their registered email. New users can sign up for a free trial to explore the AI learning dashboard, courses, and AI tools.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the Orbit Student portal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Orbit Student portal is a gamified AI learning dashboard where students access courses, AI tools (SpeakSmart, MathMentor, WriteRight, MindMaze, PitchDeck Creator), live classes, achievements, business simulations, and track their XP and level progress.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I try Orbit Student for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Visit orbitstudent.com/demo for a free interactive demo, or sign up for a free trial at orbitstudent.com/login to explore the student dashboard, AI tools, and sample courses.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Orbit Student instructor-led or only pre-recorded videos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Orbit Student is built around live, mentor-led cohort classes (two sessions per week) plus office hours — not passive video libraries. Students learn in small groups with real-time feedback, replays available in the dashboard.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is included in the Young CEO programme?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The flagship programme includes a 180-day structured path, 52 live mentor-led sessions, 100+ AI tools and business simulations, a verified project portfolio, scholarship and competition roadmap, parent progress visibility, gamified XP and streaks, and a 30-day satisfaction guarantee.'
        }
      },
      {
        '@type': 'Question',
        name: 'How fast can we join the next cohort?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cohorts start on rolling dates. Book a demo or start a free trial and our team confirms seat availability for your timezone — typically within one business day — before any payment is required.'
        }
      }
    ]
  };

  // HowTo Schema — unlocks rich "How to" SERP feature
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Get Started with Orbit Student',
    description: 'Join Orbit Student and start your child\'s AI learning journey in 4 simple steps.',
    totalTime: 'PT10M',
    supply: [
      { '@type': 'HowToSupply', name: 'Internet connection' },
      { '@type': 'HowToSupply', name: 'Email address' }
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Book a Free Demo',
        text: 'Visit orbitstudent.com and book a free personalised demo session to explore the platform.',
        url: 'https://www.orbitstudent.com/demo'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Create Your Account',
        text: 'Register at orbitstudent.com/login with your email. Access your AI learning dashboard instantly.',
        url: 'https://www.orbitstudent.com/login'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Pick Your Learning Path',
        text: 'Choose from the Young CEO Program, AI Tools track, or Scholarship Prep curriculum based on your child\'s age and interest.',
        url: 'https://www.orbitstudent.com/courses'
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Start Building & Playing',
        text: 'Access 100+ AI tools, business simulations, live classes, and the scholarship database to begin your 180-day journey.',
        url: 'https://www.orbitstudent.com/dashboard'
      }
    ]
  };

  // Add Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Young Entrepreneur Education Program',
    description: 'Comprehensive 180-day program teaching entrepreneurship, leadership, and business skills to children aged 8-16',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Orbit Student'
    },
    serviceType: 'Educational Service',
    audience: {
      '@type': 'Audience',
      audienceType: 'Children and Teenagers',
      suggestedMinAge: 8,
      suggestedMaxAge: 16
    },
    offers: {
      '@type': 'Offer',
      price: '299',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Orbit Student Course Catalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Young CEO Fundamentals',
            description: 'Basic entrepreneurship concepts for beginners'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Business Planning for Kids',
            description: 'Learn to create and execute business plans'
          }
        }
      ]
    }
  };

  // Add Review Schema
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'EducationalOrganization',
      name: 'Orbit Student'
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5'
    },
    author: {
      '@type': 'Person',
      name: 'Parent Community'
    },
    reviewBody: 'Orbit Student has transformed our children into confident young leaders. The program is comprehensive, engaging, and delivers real results.'
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="language" content="en" />
      <meta name="theme-color" content="#1876D2" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={siteTitle} />
      <meta property="og:site_name" content="Orbit Student" />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && author && <meta property="article:author" content={author} />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@orbitstudent" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@orbitstudent" />

      {/* Robots — noindex for private/legal pages */}
      <meta
        name="robots"
        content={noIndex
          ? 'noindex, nofollow'
          : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={resolvedCanonical} />

      {/* DNS Prefetch & Preconnect for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//api.openai.com" />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Performance Hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-tap-highlight" content="no" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(reviewSchema)}
      </script>
      {courseSchema && (
        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>
      )}
      {showFAQ && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {showFAQ && (
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      )}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
} 