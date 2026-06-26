#!/usr/bin/env node
/**
 * Post-build: inject per-route HTML shells so crawlers get unique title,
 * canonical, description and H1 (fixes SPA duplicate-meta indexation failures).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://www.orbitstudent.com';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncate(s, max) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1).trimEnd()}…`;
}

function injectMeta(html, meta) {
  const {
    title,
    description,
    keywords,
    canonical,
    h1,
    intro,
    links = [],
    type = 'website',
    noindex = false,
  } = meta;

  const robots = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(truncate(description, 158))}"`
  );
  out = out.replace(
    /<meta name="keywords" content="[^"]*"/,
    `<meta name="keywords" content="${escapeHtml(keywords)}"`
  );
  out = out.replace(
    /<meta name="robots" content="[^"]*"/,
    `<meta name="robots" content="${robots}"`
  );

  if (!out.includes('rel="canonical"')) {
    out = out.replace('</head>', `    <link rel="canonical" href="${canonical}" />\n  </head>`);
  } else {
    out = out.replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${canonical}"`
    );
  }

  out = out.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(title)}"`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(truncate(description, 158))}"`
  );
  out = out.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`);
  out = out.replace(/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${type}"`);

  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeHtml(title)}"`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(truncate(description, 158))}"`
  );

  if (!out.includes('hreflang="en-in"')) {
    out = out.replace(
      '</head>',
      `    <link rel="alternate" hreflang="en-in" href="${canonical}" />\n    <link rel="alternate" hreflang="en" href="${canonical}" />\n    <link rel="alternate" hreflang="x-default" href="${SITE}" />\n  </head>`
    );
  } else {
    out = out.replace(/<link rel="alternate" hreflang="en-in" href="[^"]*"/, `<link rel="alternate" hreflang="en-in" href="${canonical}"`);
    out = out.replace(/<link rel="alternate" hreflang="en" href="[^"]*"/, `<link rel="alternate" hreflang="en" href="${canonical}"`);
  }

  const linkHtml = links
    .map((l) => `<a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a>`)
    .join(' · ');

  const noscript = `<noscript>
      <main style="max-width:42rem;margin:2rem auto;padding:0 1.25rem;font-family:system-ui,sans-serif;line-height:1.6;color:#0f172a">
        <h1 style="font-size:1.75rem;color:#1876D2">${escapeHtml(h1)}</h1>
        <p>${escapeHtml(intro)}</p>
        ${linkHtml ? `<p>${linkHtml}</p>` : ''}
        <p><a href="${canonical}">Orbit Student</a> — live AI &amp; entrepreneurship classes for kids 8–18.</p>
      </main>
    </noscript>`;

  // Replace body crawlable shell only (head has a separate font noscript)
  if (out.includes('<div id="root"></div>')) {
    out = out.replace(
      /<noscript>\s*<main[\s\S]*?<\/noscript>(?=\s*<div id="root">)/,
      noscript
    );
  } else {
    out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, noscript);
  }

  return out;
}

function loadStaticRoutes() {
  const jsonPath = path.join(ROOT, 'public', 'seo-prerender-routes.json');
  if (!fs.existsSync(jsonPath)) {
    console.warn('⚠️  public/seo-prerender-routes.json missing — run npm run seo:export-routes first');
    return [];
  }
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

function loadBlogRoutes() {
  const jsonPath = path.join(ROOT, 'public', 'seo-blog-meta.json');
  if (!fs.existsSync(jsonPath)) return [];
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

function writeRouteHtml(baseHtml, routePath, meta) {
  const canonical =
    routePath === '/' ? SITE : `${SITE}${routePath.replace(/\/+$/, '')}`;

  const html = injectMeta(baseHtml, { ...meta, canonical });

  if (routePath === '/') {
    fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf8');
    return;
  }

  const dir = path.join(DIST, routePath.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.error('❌ dist/ not found — run vite build first');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const staticRoutes = loadStaticRoutes();
  const blogRoutes = loadBlogRoutes();

  let count = 0;

  for (const route of staticRoutes) {
    if (route.noindex) continue;
    writeRouteHtml(baseHtml, route.path, route);
    count += 1;
  }

  for (const post of blogRoutes) {
    const routePath = `/blog/${post.slug}`;
    writeRouteHtml(baseHtml, routePath, {
      title: `${post.title} | Orbit Student Blog`,
      description: post.metaDescription,
      keywords: (post.seoKeywords || []).join(', '),
      h1: post.title,
      intro: post.excerpt,
      links: [{ href: '/blog', label: 'All articles' }, { href: '/courses', label: 'Courses' }],
      type: 'article',
    });
    count += 1;
  }

  console.log(`✅ Prerendered ${count} crawlable HTML shells into dist/`);
}

main();
