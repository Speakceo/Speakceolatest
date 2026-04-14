import fs from 'node:fs';
import path from 'node:path';

const dataFiles = [
  'src/data/blogPosts.ts',
  'src/data/additionalBlogPosts.ts',
];

const posts = [];
const pattern = /slug:\s*'([^']+)'[\s\S]*?publishedAt:\s*'([^']+)'/g;

for (const relativePath of dataFiles) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const content = fs.readFileSync(absolutePath, 'utf8');

  let match;
  while ((match = pattern.exec(content)) !== null) {
    posts.push({
      slug: match[1],
      publishedAt: match[2],
    });
  }
}

const uniquePosts = Array.from(
  new Map(posts.map((post) => [post.slug, post])).values()
);

const now = new Date();
const published = [];
const queued = [];

for (const post of uniquePosts) {
  const publishDate = new Date(post.publishedAt);
  if (Number.isNaN(publishDate.getTime())) continue;
  if (publishDate <= now) {
    published.push(post);
  } else {
    queued.push(post);
  }
}

queued.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));

console.log(`\nBlog Scheduler Status (${now.toISOString()})`);
console.log(`Published posts: ${published.length}`);
console.log(`Queued posts: ${queued.length}\n`);

if (queued.length === 0) {
  console.log('No queued posts. Add a future publishedAt date to queue a post.\n');
  process.exit(0);
}

console.log('Upcoming queue:');
for (const [index, post] of queued.entries()) {
  console.log(`${index + 1}. ${post.publishedAt}  ${post.slug}`);
}
console.log('');
