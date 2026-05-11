/**
 * Meta Pixel — official queue stub + loader. Safe no-op if already present.
 * Set VITE_FACEBOOK_PIXEL_ID (digits only) in Netlify.
 */
/* eslint-disable @typescript-eslint/no-explicit-any, prefer-rest-params */
export function initFacebookPixel(pixelId: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const w = window as any;
  if (w.fbq) return;

  !(function (f: any, b: Document, e: string, v: string) {
    let n: any;
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = !0;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s!.parentNode!.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  w.fbq('init', pixelId);
  w.fbq('track', 'PageView');
}
