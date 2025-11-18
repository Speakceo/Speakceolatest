// Google Analytics 4 Configuration for SpeakCEO
// Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics 4 Measurement ID

(function() {
  // Check if Google Analytics should be loaded (respect user privacy)
  if (localStorage.getItem('analytics-consent') === 'denied') {
    return;
  }

  // Google Analytics 4 (gtag.js)
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID
  
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  // Configure Google Analytics
  gtag('config', GA_MEASUREMENT_ID, {
    // Enhanced ecommerce tracking
    send_page_view: true,
    // Privacy settings
    anonymize_ip: true,
    // Custom dimensions for education tracking
    custom_map: {
      'custom_dimension_1': 'user_type',
      'custom_dimension_2': 'course_interest',
      'custom_dimension_3': 'age_group'
    }
  });

  // Track key events for educational platform
  
  // Course enrollment tracking
  window.trackCourseEnrollment = function(courseName, coursePrice) {
    gtag('event', 'course_enrollment', {
      event_category: 'Education',
      event_label: courseName,
      value: coursePrice,
      currency: 'USD'
    });
  };

  // Lead generation tracking
  window.trackLeadGeneration = function(source, leadType) {
    gtag('event', 'generate_lead', {
      event_category: 'Lead Generation',
      event_label: source,
      lead_type: leadType
    });
  };

  // Blog engagement tracking
  window.trackBlogEngagement = function(blogTitle, engagementType) {
    gtag('event', 'blog_engagement', {
      event_category: 'Content',
      event_label: blogTitle,
      engagement_type: engagementType
    });
  };

  // Video interaction tracking
  window.trackVideoInteraction = function(videoTitle, action) {
    gtag('event', 'video_interaction', {
      event_category: 'Video',
      event_label: videoTitle,
      video_action: action
    });
  };

  // Demo request tracking
  window.trackDemoRequest = function(demoType) {
    gtag('event', 'demo_request', {
      event_category: 'Demo',
      event_label: demoType,
      value: 1
    });
  };

  // Make gtag globally available
  window.gtag = gtag;
})();
