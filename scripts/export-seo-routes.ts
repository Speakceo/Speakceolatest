import fs from 'fs';
import path from 'path';
import { PRERENDER_ROUTES } from '../src/seo/prerenderMeta.ts';
import { publishedBlogPosts } from '../src/data/blogPosts.ts';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const SITE = 'https://www.orbitstudent.com';

const blogMeta = publishedBlogPosts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  metaDescription: p.metaDescription,
  seoKeywords: p.seoKeywords,
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

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), sitemap);
console.log(`✅ sitemap.xml: ${indexableRoutes.length} pages + ${publishedBlogPosts.length} blog posts`);
