import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'course';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: any;
  courseData?: {
    name: string;
    provider: string;
    description: string;
    duration: string;
    price?: string;
  };
}

const defaultSEO = {
  title: 'Orbit Student: AI Learning for Young Entrepreneurs',
  description: 'AI-powered learning platform for young entrepreneurs ages 10-18. Learn AI tools, entrepreneurship, business skills, and leadership through hands-on projects. Master artificial intelligence and build real startups.',
  keywords: [
    'AI learning',
    'young entrepreneur',
    'learn AI',
    'AI education',
    'entrepreneurship for kids',
    'AI learning platform',
    'young entrepreneur program',
    'learn AI for students',
    'AI tools for students',
    'business education for children',
    'AI-powered learning',
    'young CEO program',
    'startup education kids',
    'AI literacy',
    'entrepreneur training',
    'artificial intelligence for kids',
    'AI courses for teens',
    'youth leadership training',
    'AI education platform',
    'learn entrepreneurship',
    'AI skills for kids',
    'young business leaders',
    'AI for young learners',
    'teen startup program',
    'AI and entrepreneurship',
    'future entrepreneurs',
    'AI learning for children',
    'young founder program',
    'business skills for teens',
    'AI literacy program'
  ],
  image: 'https://orbitstudent.com/og-image.jpg',
  url: 'https://orbitstudent.com',
  type: 'website' as const,
  author: 'Orbit Future Academy'
};

export default function SEO({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = defaultSEO.type,
  author = defaultSEO.author,
  publishedTime,
  modifiedTime,
  structuredData,
  courseData
}: SEOProps) {
  const siteTitle = `${title} | Orbit Student`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Orbit Student',
    alternateName: 'Orbit Young Entrepreneurs Program',
    description: defaultSEO.description,
    url: defaultSEO.url,
    logo: {
      '@type': 'ImageObject',
      url: 'https://orbitstudent.com/logo.png',
      width: 200,
      height: 200
    },
    image: 'https://orbitstudent.com/og-image.jpg',
    sameAs: [
      'https://twitter.com/orbitstudent',
      'https://facebook.com/orbitstudent',
      'https://linkedin.com/company/orbitstudent',
      'https://instagram.com/orbitstudent',
      'https://youtube.com/@orbitstudent'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Global'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-ORBIT',
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
    name: 'SpeakCEO',
    url: defaultSEO.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${defaultSEO.url}/search?q={search_term_string}`,
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
      sameAs: defaultSEO.url
    },
    timeRequired: courseData.duration,
    educationalLevel: 'Beginner to Intermediate',
    teaches: [
      'Entrepreneurship',
      'Business Planning',
      'Leadership Skills',
      'Financial Literacy',
      'Marketing and Sales',
      'Public Speaking'
    ],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'Children and Teenagers aged 8-16'
    },
    offers: courseData.price ? {
      '@type': 'Offer',
      price: courseData.price,
      priceCurrency: 'INR',
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
        name: 'What age group is SpeakCEO designed for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SpeakCEO is designed for children and teenagers aged 8-16 who want to develop entrepreneurial skills and business acumen.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long is the SpeakCEO program?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The SpeakCEO Young CEO Program is a comprehensive 180-day journey that transforms young minds into future business leaders.'
        }
      },
      {
        '@type': 'Question',
        name: 'What skills will my child learn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Students learn entrepreneurship, business planning, leadership, financial literacy, marketing, sales, public speaking, and critical thinking skills.'
        }
      }
    ]
  };

  // Add BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://speakceo.ai'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Courses',
        item: 'https://speakceo.ai/courses'
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
      name: 'SpeakCEO'
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
      name: 'SpeakCEO Course Catalog',
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
      name: 'SpeakCEO'
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
    reviewBody: 'SpeakCEO has transformed our children into confident young leaders. The program is comprehensive, engaging, and delivers real results.'
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="language" content="en" />
      <meta name="theme-color" content="#4F46E5" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="SpeakCEO" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@speakceoai" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@speakceoai" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />

      {/* DNS Prefetch & Preconnect for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//api.openai.com" />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      
      {/* Favicon and App Icons */}
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
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
} 