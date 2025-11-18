import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

const WebVitals: React.FC = () => {
  useEffect(() => {
    const sendToAnalytics = (metric: Metric) => {
      // In production, you would send this to your analytics service
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vitals:', metric);
      }
      
      // Example: Send to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }
    };

    // Measure Core Web Vitals
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitals;
