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
    stripSitewideJsonLd = false,
  } = meta;

  const robots = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  let out = html;

  // When re-run on an already-prerendered file, strip prior crawlable blocks first.
  out = out.replace(/<main[^>]*data-seo-static[^>]*>[\s\S]*?<\/main>\s*/gi, '');
  out = out.replace(/<noscript>\s*<main[^>]*data-seo-static[\s\S]*?<\/noscript>\s*/gi, '');

  // Non-home shells inherit homepage Organization/WebSite JSON-LD from index.html —
  // that makes Google treat every URL as an alternate of the homepage. Strip them.
  if (stripSitewideJsonLd) {
    out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
  }

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

  // hreflang must match the trailing-slash canonical (except x-default → homepage)
  const hreflangBlock = `    <link rel="alternate" hreflang="en-in" href="${canonical}" />
    <link rel="alternate" hreflang="en" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${SITE}" />
`;
  if (!out.includes('hreflang="en-in"')) {
    out = out.replace('</head>', `${hreflangBlock}  </head>`);
  } else {
    out = out.replace(/<link rel="alternate" hreflang="en-in" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="en-in" href="${canonical}" />`);
    out = out.replace(/<link rel="alternate" hreflang="en" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="en" href="${canonical}" />`);
  }

  const linkHtml = (links || [])
    .map((l) => {
      const href = l.href.startsWith('http')
        ? l.href
        : l.href === '/'
          ? SITE
          : `${SITE}${l.href.startsWith('/') ? l.href : `/${l.href}`}`.replace(/([^:]\/)\/+/g, '$1');
      const withSlash =
        href === SITE ? href : href.endsWith('/') ? href : `${href}/`;
      return `<li><a href="${escapeHtml(withSlash)}">${escapeHtml(l.label)}</a></li>`;
    })
    .join('');

  const paragraphs = Array.isArray(meta.paragraphs) ? meta.paragraphs : [];
  const bullets = Array.isArray(meta.bullets) ? meta.bullets : [];
  const sectionHeading = meta.sectionHeading || 'Key points';

  const paragraphHtml = paragraphs
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('\n');
  const bulletHtml = bullets.length
    ? `<h2>${escapeHtml(sectionHeading)}</h2><ul>${bullets
        .map((b) => `<li>${escapeHtml(b)}</li>`)
        .join('')}</ul>`
    : '';

  /**
   * VISIBLE crawlable body (not noscript-only). Googlebot sees empty #root on SPAs and
   * often marks URLs "Crawled — currently not indexed". This block is removed after React mounts.
   */
  const seoStatic = `<main id="seo-static" data-seo-static style="max-width:42rem;margin:1.5rem auto;padding:0 1.25rem 2rem;font-family:system-ui,sans-serif;line-height:1.65;color:#0f172a">
      <article>
        <h1 style="font-size:1.75rem;color:#1876D2;line-height:1.25;margin:0 0 1rem">${escapeHtml(h1)}</h1>
        <p>${escapeHtml(intro)}</p>
        ${paragraphHtml}
        ${bulletHtml}
        ${linkHtml ? `<h2>Explore Orbit Student</h2><ul>${linkHtml}</ul>` : ''}
        <p style="font-size:0.9rem;color:#64748b"><a href="${canonical}">${escapeHtml(canonical)}</a> — Orbit Student live AI &amp; entrepreneurship classes for kids 8–18.</p>
      </article>
    </main>`;

  // Visible crawlable content BEFORE #root (Googlebot reads this without executing React).
  // Do not also mirror inside <noscript> — that duplicates H1 in the raw HTML source.
  if (out.includes('<div id="root"></div>')) {
    out = out.replace(
      /(<noscript>\s*<main[\s\S]*?<\/noscript>\s*)?(<div id="root"><\/div>)/,
      `${seoStatic}\n    $2`
    );
    if (!out.includes('id="seo-static"')) {
      out = out.replace('<div id="root"></div>', `${seoStatic}\n    <div id="root"></div>`);
    }
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

/** Canonical must end with / for folder-hosted pages (Netlify Pretty URLs). */
function canonicalForRoute(routePath) {
  if (routePath === '/' || routePath === '') return SITE;
  const clean = routePath.replace(/\/+$/, '');
  return `${SITE}${clean}/`;
}

function writeRouteHtml(baseHtml, routePath, meta) {
  const canonical = canonicalForRoute(routePath);
  const isHome = routePath === '/' || routePath === '';

  const html = injectMeta(baseHtml, {
    ...meta,
    canonical,
    stripSitewideJsonLd: !isHome,
  });

  if (isHome) {
    fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf8');
    return;
  }

  const dir = path.join(DIST, routePath.replace(/^\//, '').replace(/\/+$/, ''));
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
    // Always write a shell — including noindex routes (e.g. /login).
    // Skipping them made Netlify SPA-fallback serve homepage HTML at that URL
    // (same title/canonical as /) → Google Search Console "Soft 404".
    writeRouteHtml(baseHtml, route.path, route);
    count += 1;
  }

  for (const post of blogRoutes) {
    const routePath = `/blog/${post.slug}`;
    const excerpt = post.excerpt || post.metaDescription || '';
    writeRouteHtml(baseHtml, routePath, {
      title: `${post.title} | Orbit Student Blog`,
      description: post.metaDescription,
      keywords: (post.seoKeywords || []).join(', '),
      h1: post.title,
      intro: excerpt,
      paragraphs: [
        excerpt,
        'Orbit Student publishes practical guides for parents and students on AI learning, entrepreneurship, scholarships and future-ready skills for ages 8–18.',
        'After reading, explore live classes and the Young CEO programme, or book a free demo to see mentor-led cohorts in action.',
      ],
      bullets: (post.seoKeywords || []).slice(0, 5),
      sectionHeading: 'Related topics',
      links: [
        { href: '/blog/', label: 'All articles' },
        { href: '/courses/', label: 'Courses' },
        { href: '/demo/', label: 'Free demo' },
      ],
      type: 'article',
    });
    count += 1;
  }

  console.log(`✅ Prerendered ${count} crawlable HTML shells into dist/`);
}

main();
