/**
 * Optional analytics pixels — loaded only when env vars are set in Netlify / `.env`.
 * GA4: VITE_GA_MEASUREMENT_ID (format G-xxxxxxxx)
 * Meta: VITE_FACEBOOK_PIXEL_ID (numeric pixel id)
 */
import { initFacebookPixel } from './facebookPixel';

export function initThirdPartyTracking(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (typeof gaId === 'string' && /^G-[A-Z0-9]+$/i.test(gaId.trim())) {
    const id = gaId.trim();
    const g = document.createElement('script');
    g.async = true;
    g.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(g);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true });
  }

  const fbId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (typeof fbId === 'string' && /^\d{10,20}$/.test(fbId.trim())) {
    initFacebookPixel(fbId.trim());
  }
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
