import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search, Filter, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/common/PageHero';
import { publishedBlogPosts, blogCategories, getFeaturedPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    publishedBlogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return publishedBlogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag]);

  const featuredPosts = getFeaturedPosts(3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <SEO 
        title="Orbit Student Blog | AI Learning, Scholarships & Entrepreneurship for Kids"
        description="Actionable guides on AI for kids, scholarship planning, entrepreneurship, and future-ready skills. Learn how Orbit Student helps children ages 8-18 build real portfolios."
        keywords={[
          "Orbit Student blog",
          "AI learning for kids",
          "AI student skills",
          "kids scholarship guide",
          "entrepreneurship for kids",
          "future-ready skills for children",
          "young entrepreneur program",
          "student portfolio building",
          "business education for kids",
          "AI tools for students",
          "kids new age learning",
          "Orbit AI student"
        ]}
        url="https://www.orbitstudent.com/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Orbit Student Blog",
          "description": "Expert insights on AI learning, scholarship strategy, and entrepreneurship development for kids",
          "url": "https://www.orbitstudent.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Orbit Student",
            "url": "https://www.orbitstudent.com"
          },
          "blogPost": publishedBlogPosts.slice(0, 10).map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "url": `https://www.orbitstudent.com/blog/${post.slug}`,
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Orbit Student"
            }
          }))
        }}
      />

      <div className="min-h-screen bg-o-0 text-o-0">
        <PageHero
          eyebrow="§ Blog · Weekly essays"
          title="Insights from"
          italic="the studio."
          subtitle="Essays on entrepreneurship education, youth leadership and building the next generation of innovators."
          align="center"
          size="sm"
        />
        <section className="border-o-t bg-o-0">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap justify-center gap-2">
              <span className="chip-o">20+ expert articles</span>
              <span className="chip-o">10+ categories</span>
              <span className="chip-o">Weekly updates</span>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-[#F5F9FC]0 to-[#00B0FF] flex items-center justify-center">
                    <h3 className="text-white font-bold text-lg text-center px-4">
                      {post.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime} min read
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm bg-[#E3F2FD] dark:bg-[#1876D2]/20 text-[#1876D2] dark:text-[#00B0FF] px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-[#1876D2] dark:text-[#00B0FF] hover:text-[#1876D2] dark:hover:text-[#00B0FF] font-medium flex items-center gap-1"
                      >
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-gray-100 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1876D2] focus:border-[#1876D2] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1876D2] focus:border-[#1876D2] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="All">All Categories</option>
                  {blogCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1876D2] focus:border-[#1876D2] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredPosts.length} of {publishedBlogPosts.length} articles
            </div>
          </div>
        </section>

        {/* All Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or filters
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index % 9) * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="h-48 bg-gradient-to-br from-[#F5F9FC]0 to-[#00B0FF] flex items-center justify-center p-6">
                      <h3 className="text-white font-bold text-lg text-center leading-tight">
                        {post.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime} min
                        </span>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {post.author}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-[#E3F2FD] dark:bg-[#1876D2]/20 text-[#1876D2] dark:text-[#00B0FF] px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-[#1876D2] dark:text-[#00B0FF] hover:text-[#1876D2] dark:hover:text-[#00B0FF] font-medium transition-colors"
                      >
                        Read Full Article <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gradient-to-br from-[#1876D2] to-[#00B0FF] text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with Orbit Student Insights
            </h2>
            <p className="text-xl mb-8">
              Get the latest articles on entrepreneurship education and youth leadership delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="px-6 py-3 bg-white text-[#1876D2] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-4 opacity-80">
              Join 5,000+ parents and educators. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog; 