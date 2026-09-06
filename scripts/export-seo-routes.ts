import fs from 'fs';
import path from 'path';
import { PRERENDER_ROUTES } from '../src/seo/prerenderMeta.ts';
import { publishedBlogPosts } from '../src/data/blogPosts.ts';
import { PROGRAM_PAGES } from '../src/data/programs.ts';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const SITE = 'https://www.orbitstudent.com';

/** Plain-text preview for prerender shells (unique per post — fixes thin duplicate crawl HTML). */
function markdownToPlainPreview(content: string, maxChars = 1400): string[] {
  const text = content
    .replace(/\\n/g, '\n')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxChars);

  return text
    .split(/\n\n+/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 40)
    .slice(0, 8);
}

const blogMeta = publishedBlogPosts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  metaDescription: p.metaDescription,
  seoKeywords: p.seoKeywords,
  category: p.category,
  tags: p.tags,
  author: p.author,
  contentPreview: markdownToPlainPreview(p.content),
  updatedAt: p.updatedAt,
  publishedAt: p.publishedAt,
}));

fs.writeFileSync(
  path.join(PUBLIC, 'seo-prerender-routes.json'),
  JSON.stringify(PRERENDER_ROUTES, null, 2)
);
fs.writeFileSync(path.join(PUBLIC, 'seo-blog-meta.json'), JSON.stringify(blogMeta, null, 2));

const indexableRoutes = PRERENDER_ROUTES.filter((r) => !r.noindex);
const urls: string[] = [];

for (const route of indexableRoutes) {
  const loc = route.path === '/' ? SITE : `${SITE}${route.path.replace(/\/+$/, '')}/`;
  urls.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.path === '/' || route.path === '/blog' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route.path === '/' ? '1.0' : route.path.startsWith('/blog') ? '0.9' : '0.8'}</priority>
  </url>`);
}

for (const post of publishedBlogPosts) {
  const lastmod = (post.updatedAt || post.publishedAt || '').split('T')[0] || new Date().toISOString().split('T')[0];
  urls.push(`  <url>
    <loc>${SITE}/blog/${post.slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
}

for (const prog of Object.values(PROGRAM_PAGES)) {
  const lastmod = new Date().toISOString().split('T')[0];
  urls.push(`  <url>
    <loc>${SITE}${prog.path}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), sitemap);
console.log(`✅ sitemap.xml: ${indexableRoutes.length} pages + ${publishedBlogPosts.length} blog posts`);

/** Netlify 200 rewrites — serve prerender HTML without 301 (fixes GSC "Page with redirect"). */
function prerenderRewriteLines(): string[] {
  const paths = new Set<string>();
  for (const route of PRERENDER_ROUTES) {
    if (route.path === '/' || !route.path) continue;
    paths.add(route.path.replace(/\/+$/, ''));
  }
  for (const post of publishedBlogPosts) {
    paths.add(`/blog/${post.slug}`);
  }
  paths.add('/programs');
  for (const prog of Object.values(PROGRAM_PAGES)) {
    paths.add(prog.path.replace(/\/+$/, ''));
  }

  const lines: string[] = [];
  for (const p of [...paths].sort()) {
    const clean = p.replace(/^\//, '');
    lines.push(`${p}    /${clean}/index.html    200`);
    lines.push(`${p}/    /${clean}/index.html    200`);
  }
  return lines;
}

const rewriteLines = prerenderRewriteLines();

const redirects = `# ─── Canonical domain enforcer ────────────────────────────────────────────────
# Forces all traffic to https://www.orbitstudent.com (canonical).
# Must come before the SPA catch-all rule.

# HTTP non-www → HTTPS www
http://orbitstudent.com/*       https://www.orbitstudent.com/:splat     301!

# HTTP www → HTTPS www
http://www.orbitstudent.com/*   https://www.orbitstudent.com/:splat     301!

# HTTPS non-www → HTTPS www
https://orbitstudent.com/*      https://www.orbitstudent.com/:splat     301!

# Campaign hub → primary lander (prevent Soft 404 homepage clone)
/lp      /lp/free-demo/   301!
/lp/     /lp/free-demo/   301!

# Legacy asset — avoid Soft 404 (homepage HTML at .pdf URL)
/downloads/marketing-guide.pdf   /resources/   301!

# Sandbox SEO file — stop leaking test HTML into index
/seo-keywords.html    /    301!

# ─── Prerender shells: no 301 for missing trailing slash (GSC "Page with redirect") ─
${rewriteLines.join('\n')}

# ─── SPA routing — serve index.html only when no prerendered folder exists ────
# Do NOT force — dist/<page>/index.html must win for trailing-slash Pretty URLs.
/*    /index.html   200
`;

fs.writeFileSync(path.join(PUBLIC, '_redirects'), redirects);
console.log(`✅ _redirects: ${rewriteLines.length / 2} prerender routes (200 rewrite)`);
