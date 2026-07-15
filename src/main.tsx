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

// Remove crawlable SEO bootstrap HTML after React mounts (keeps Google happy, avoids double UI).
requestAnimationFrame(() => {
  document.querySelectorAll('[data-seo-static]').forEach((el) => el.remove());
}); 