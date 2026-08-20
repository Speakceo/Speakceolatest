import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initThirdPartyTracking } from './lib/tracking';

initThirdPartyTracking();

// Register service worker after idle time so first paint is not delayed
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const register = () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful:', registration.scope);
          // Force activate updated SW so Google/users do not keep a crashed shell
          registration.update().catch(() => {});
        })
        .catch((error) => {
          console.error('ServiceWorker registration failed:', error);
        });
    };
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => register(), { timeout: 4000 });
    } else {
      setTimeout(register, 2500);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * Remove crawlable SEO bootstrap HTML only after React has painted real page
 * content. Removing it too early (or when the error boundary is showing)
 * made Google treat the homepage as Soft 404 / "URL not available".
 */
function clearSeoStaticWhenReady(attempts = 0) {
  const root = document.getElementById('root');
  const text = (root?.innerText || '').replace(/\s+/g, ' ').trim();
  const failed = /something went wrong/i.test(text);
  const ready = !failed && text.length > 400 && root?.querySelector('h1, h2, section') != null;

  if (ready) {
    document.querySelectorAll('[data-seo-static]').forEach((el) => el.remove());
    return;
  }

  if (attempts < 40) {
    window.setTimeout(() => clearSeoStaticWhenReady(attempts + 1), 200);
  }
}

requestAnimationFrame(() => clearSeoStaticWhenReady());
