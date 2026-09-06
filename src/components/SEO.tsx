import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_ORIGIN = 'https://www.orbitstudent.com';

/**
 * Canonical policy (must match Netlify directory hosting):
 * - Homepage: https://www.orbitstudent.com  (no trailing slash)
 * - All other pages: trailing slash  e.g. /tools/
 * Netlify 301s /tools → /tools/ when dist/tools/index.html exists.
 * Canonicals WITHOUT a slash caused GSC "Alternative page with proper canonical tag".
 */
export function normalizeCanonicalUrl(href: string): string {
  let s = href.trim();
  // Normalize protocol-host variants to www https
  s = s.replace(/^https?:\/\/orbitstudent\.com/i, SITE_ORIGIN);
  s = s.replace(/^https?:\/\/www\.orbitstudent\.com/i, SITE_ORIGIN);

  if (s === SITE_ORIGIN || s === `${SITE_ORIGIN}/`) {
    return SITE_ORIGIN;
  }

  try {
    const u = new URL(s.startsWith('http') ? s : `${SITE_ORIGIN}${s.startsWith('/') ? s : `/${s}`}`);
    if (u.origin !== SITE_ORIGIN) return s;
    let p = u.pathname || '/';
    if (p === '/') return SITE_ORIGIN;
    p = p.replace(/\/+$/, '');
    return `${SITE_ORIGIN}${p}/`;
  } catch {
    return s;
  }
}

function canonicalFromPathname(pathname: string): string {
  const path = pathname.split('?')[0].split('#')[0] || '/';
  if (path === '/' || path === '') return SITE_ORIGIN;
  const base = path.replace(/\/+$/, '') || '/';
  return `${SITE_ORIGIN}${base}/`;
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
  /** Homepage: single @graph with EducationalOrganization + Course + FAQPage (avoids duplicate nodes) */
  consolidatedSchemaGraph?: boolean;
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
    'Orbit Student',
    'AI learning for kids',
    'entrepreneurship for kids',
    'online classes for kids',
    'coding for kids',
    'young CEO program',
    'live classes kids India',
    'AI courses for kids',
    'STEM education kids',
    'public speaking for kids',
    'scholarship prep kids',
    'edtech India',
    'orbitstudent.com',
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
  consolidatedSchemaGraph = false,
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
    '@type': 'EducationalOrganization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'Orbit Student',
    alternateName: ['Orbit AI', 'Orbit AI Student', 'Orbit Learning', 'OrbitStudent'],
    description:
      'Orbit Student is a live mentor-led AI, coding and entrepreneurship programme for kids ages 8–18 — not a foreign student visa portal or university LMS login site.',
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
    foundingDate: '2024'
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Orbit Student',
    url: SITE_ORIGIN,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_ORIGIN}/blog/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const courseSchema = courseData ? {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_ORIGIN}/#course`,
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
      validFrom: new Date().toISOString(),
      category: 'Paid',
    } : undefined,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      instructor: {
        '@type': 'Person',
        name: 'Founder & Industry Mentors',
      },
    },
  } : null;

  // Add FAQ Schema for better SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_ORIGIN}/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How is Orbit different from passive coding platforms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Orbit Student runs live mentor-led cohorts with pitch labs, portfolio builds and 100+ supervised AI Studio tools — not passive video queues. Students present work aloud, iterate with founders and ship real projects every fortnight.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Orbit Student a foreign student portal or LMS login?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Orbit Student (orbitstudent.com) is an edtech programme for kids ages 8–18 learning AI, coding and entrepreneurship. It is not a university international-student portal or visa LMS — use orbitstudent.com/login for the Orbit student dashboard only.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does Orbit Student differ from pre-recorded coding courses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Orbit Student features live mentor-led classes, real-world project builds, pitch labs and access to an interactive AI Studio dashboard — not passive video queues as the primary learning mode.'
        }
      },
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

  const homepageGraphSchema =
    consolidatedSchemaGraph && showFAQ && courseSchema
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            { ...organizationSchema, '@context': undefined },
            { ...courseSchema, '@context': undefined },
            {
              '@type': 'FAQPage',
              '@id': `${SITE_ORIGIN}/#faq`,
              mainEntity: faqSchema.mainEntity.slice(0, 6),
            },
          ],
        }
      : null;

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
        url: 'https://www.orbitstudent.com/demo/'
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
        url: 'https://www.orbitstudent.com/courses/'
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Start Building & Playing',
        text: 'Access 100+ AI tools, business simulations, live classes, and the scholarship database to begin your 180-day journey.',
        url: 'https://www.orbitstudent.com/live-classes/'
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
      <link rel="alternate" hrefLang="en-in" href={resolvedCanonical} />
      <link rel="alternate" hrefLang="en" href={resolvedCanonical} />
      <link rel="alternate" hrefLang="x-default" href={SITE_ORIGIN} />

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

      {/* Structured Data — homepage / key landing pages only to avoid duplicate graph noise */}
      {homepageGraphSchema && (
        <script type="application/ld+json">
          {JSON.stringify(homepageGraphSchema)}
        </script>
      )}
      {showFAQ && !consolidatedSchemaGraph && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}
      {showFAQ && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}
      {showFAQ && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
      {courseSchema && !consolidatedSchemaGraph && (
        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>
      )}
      {showFAQ && !consolidatedSchemaGraph && (
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