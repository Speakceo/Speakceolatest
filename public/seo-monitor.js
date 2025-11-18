// SEO Monitoring and Performance Tracking for SpeakCEO
// This script monitors key SEO metrics and reports issues

(function() {
  'use strict';

  // SEO Monitoring Configuration
  const SEO_CONFIG = {
    siteName: 'SpeakCEO',
    domain: 'speakceo.ai',
    expectedTitle: 'SpeakCEO',
    expectedDescription: 'Transform your child into a future business leader',
    criticalPages: [
      '/',
      '/courses',
      '/blog',
      '/about',
      '/contact'
    ]
  };

  // Performance monitoring
  function monitorPagePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', function() {
        setTimeout(function() {
          const perfData = performance.getEntriesByType('navigation')[0];
          const metrics = {
            loadTime: perfData.loadEventEnd - perfData.loadEventStart,
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
            firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
          };

          // Report slow loading times
          if (metrics.loadTime > 3000) {
            console.warn('SEO Warning: Page load time exceeds 3 seconds:', metrics.loadTime + 'ms');
          }

          // Track Core Web Vitals
          if ('web-vitals' in window) {
            getCLS(reportWebVital);
            getFID(reportWebVital);
            getLCP(reportWebVital);
          }
        }, 0);
      });
    }
  }

  // Report Web Vitals to analytics
  function reportWebVital(metric) {
    if (window.gtag) {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true
      });
    }
  }

  // Monitor SEO elements
  function auditSEOElements() {
    const issues = [];

    // Check title tag
    const title = document.title;
    if (!title || title.length < 30 || title.length > 60) {
      issues.push(`Title tag issue: "${title}" (Length: ${title.length})`);
    }

    // Check meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc || metaDesc.content.length < 120 || metaDesc.content.length > 160) {
      issues.push(`Meta description issue: Length ${metaDesc?.content.length || 0}`);
    }

    // Check H1 tags
    const h1Tags = document.querySelectorAll('h1');
    if (h1Tags.length !== 1) {
      issues.push(`H1 tag issue: Found ${h1Tags.length} H1 tags (should be exactly 1)`);
    }

    // Check for missing alt attributes
    const images = document.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      issues.push(`Missing alt attributes: ${images.length} images without alt text`);
    }

    // Check for broken links (basic check)
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
      if (link.href.includes('localhost') || link.href.includes('127.0.0.1')) {
        issues.push(`Development link found: ${link.href}`);
      }
    });

    // Report issues
    if (issues.length > 0) {
      console.group('SEO Audit Issues:');
      issues.forEach(issue => console.warn(issue));
      console.groupEnd();
    }

    return issues;
  }

  // Monitor structured data
  function validateStructuredData() {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    let validSchemas = 0;
    let errors = [];

    scripts.forEach((script, index) => {
      try {
        const data = JSON.parse(script.textContent);
        if (data['@context'] && data['@type']) {
          validSchemas++;
        } else {
          errors.push(`Schema ${index + 1}: Missing @context or @type`);
        }
      } catch (e) {
        errors.push(`Schema ${index + 1}: Invalid JSON - ${e.message}`);
      }
    });

    if (errors.length > 0) {
      console.group('Structured Data Issues:');
      errors.forEach(error => console.warn(error));
      console.groupEnd();
    }

    return { validSchemas, errors };
  }

  // Check for social media meta tags
  function auditSocialTags() {
    const socialTags = {
      'og:title': document.querySelector('meta[property="og:title"]'),
      'og:description': document.querySelector('meta[property="og:description"]'),
      'og:image': document.querySelector('meta[property="og:image"]'),
      'og:url': document.querySelector('meta[property="og:url"]'),
      'twitter:card': document.querySelector('meta[name="twitter:card"]'),
      'twitter:title': document.querySelector('meta[name="twitter:title"]'),
      'twitter:description': document.querySelector('meta[name="twitter:description"]'),
      'twitter:image': document.querySelector('meta[name="twitter:image"]')
    };

    const missing = [];
    Object.keys(socialTags).forEach(tag => {
      if (!socialTags[tag]) {
        missing.push(tag);
      }
    });

    if (missing.length > 0) {
      console.warn('Missing social media tags:', missing);
    }

    return missing;
  }

  // Initialize monitoring
  function initSEOMonitoring() {
    // Run audits when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runAudits);
    } else {
      runAudits();
    }

    // Monitor performance
    monitorPagePerformance();
  }

  function runAudits() {
    console.group('🔍 SEO Audit Results for ' + window.location.pathname);
    
    const seoIssues = auditSEOElements();
    const schemaResults = validateStructuredData();
    const socialIssues = auditSocialTags();

    console.log(`✅ Found ${schemaResults.validSchemas} valid structured data schemas`);
    
    if (seoIssues.length === 0 && schemaResults.errors.length === 0 && socialIssues.length === 0) {
      console.log('🎉 No SEO issues detected!');
    }

    console.groupEnd();
  }

  // Start monitoring
  initSEOMonitoring();

  // Make audit functions available globally for manual testing
  window.seoAudit = {
    runFullAudit: runAudits,
    checkSEO: auditSEOElements,
    checkSchema: validateStructuredData,
    checkSocial: auditSocialTags
  };

})();
