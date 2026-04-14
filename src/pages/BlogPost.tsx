import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import { getBlogPostBySlug, getRelatedPosts } from '../data/blogPosts';

const INTERNAL_LINK_RULES: Array<{ phrase: string; href: string }> = [
  { phrase: 'AI tools', href: '/tools' },
  { phrase: 'scholarship', href: '/resources' },
  { phrase: 'live classes', href: '/live-classes' },
  { phrase: 'entrepreneurship', href: '/courses' },
  { phrase: 'demo', href: '/demo' },
];

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post, 3);
  const faqItems = useMemo(() => {
    if (post.faq && post.faq.length > 0) return post.faq;
    return [
      {
        question: `How does Orbit Student help with ${post.category.toLowerCase()} skills?`,
        answer:
          'Orbit Student combines AI tools, hands-on projects, and mentor feedback so students build practical outcomes instead of only theory.',
      },
      {
        question: 'Is this suitable for kids aged 8-18?',
        answer:
          'Yes. Learning paths are adapted by age and skill level, so both beginners and advanced students can progress with confidence.',
      },
      {
        question: 'Where can I start quickly?',
        answer:
          'Start from the demo page, explore AI tools, and use the resources section to build a scholarship-ready portfolio step by step.',
      },
    ];
  }, [post]);

  const formattedContent = useMemo(() => {
    let html = post.content
      .replace(/\n/g, '<br>')
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">$1</h3>')
      .replace(/^\*\*(.+)\*\*$/gm, '<p class="font-semibold text-gray-900 dark:text-white mt-4 mb-2">$1</p>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/(<li.*<\/li>)/gs, '<ul class="list-disc ml-6 mb-4 space-y-1">$1</ul>');

    INTERNAL_LINK_RULES.forEach((rule) => {
      const safe = rule.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b(${safe})\\b`, 'i');
      html = html.replace(
        regex,
        `<a href="${rule.href}" class="text-[#1876D2] dark:text-[#00B0FF] font-medium underline underline-offset-2">$1</a>`
      );
    });

    if (relatedPosts.length > 0) {
      const relatedLinks = relatedPosts
        .map(
          (item) =>
            `<li><a href="/blog/${item.slug}" class="text-[#1876D2] dark:text-[#00B0FF] font-medium hover:underline">${item.title}</a></li>`
        )
        .join('');
      html += `<h3 class="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white">Continue Reading</h3><ul class="list-disc ml-6 mb-4 space-y-1">${relatedLinks}</ul>`;
    }

    return html;
  }, [post.content, relatedPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = `https://www.orbitstudent.com/blog/${post.slug}`;
  const shareText = `Check out this article: ${post.title}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: shareUrl,
      });
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <SEO
        title={`${post.title} | Orbit Student Blog`}
        description={post.metaDescription}
        keywords={post.seoKeywords}
        url={shareUrl}
        type="article"
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "image": post.featuredImage,
              "author": {
                "@type": "Person",
                "name": post.author,
                "description": post.authorBio,
                "image": post.authorImage
              },
              "publisher": {
                "@type": "Organization",
                "name": "Orbit Student",
                "url": "https://www.orbitstudent.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.orbitstudent.com/logo.png"
                }
              },
              "datePublished": post.publishedAt,
              "dateModified": post.updatedAt,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.orbitstudent.com/blog/${post.slug}`
              },
              "wordCount": post.content.split(' ').length,
              "timeRequired": `PT${post.readTime}M`,
              "articleSection": post.category,
              "keywords": post.tags.join(', ')
            },
            {
              "@type": "FAQPage",
              "mainEntity": faqItems.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }
          ]
        }}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                {post.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-64 md:h-80 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold opacity-90">{post.title}</h2>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <div 
              className="text-gray-800 dark:text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: formattedContent
              }}
            />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <div key={faq.question} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{faq.question}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  About {post.author}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {post.authorBio}
                </p>
              </div>
            </div>
          </motion.div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-white dark:bg-gray-800 py-16 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
                      <h3 className="text-white font-bold text-lg text-center leading-tight">
                        {relatedPost.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(relatedPost.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {relatedPost.readTime} min
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <Link
                        to={`/blog/${relatedPost.slug}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Enjoyed this article?
            </h2>
            <p className="text-xl mb-8">
              Get more insights on entrepreneurship education delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPost;
