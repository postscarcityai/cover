"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, User, Search } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { VintageHeroSlider, useHeroImages } from "@/components/vintage-hero-slider"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { trackBlogPostView } from "@/lib/analytics"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { type BlogPost } from "@/lib/blog"

interface BlogClientProps {
  allPosts: BlogPost[]
  featuredPosts: BlogPost[]
}

export function BlogClient({ allPosts, featuredPosts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  // Template: Update this path to point to your blog hero images directory
  // Example: '/img/blog/hero' or '/blog/hero'
  const heroImages = useHeroImages('/img/blog/hero')

  // Track page view once on mount
  usePageTracking('Blog Index', 'blog', 'blog_index')
  
  // Track scroll depth milestones
  useScrollTracking()

  const handleBlogPostClick = (post: BlogPost) => {
    trackBlogPostView(post.title, post.category, post.slug)
  }

  // Simple fuzzy search function
  const fuzzySearch = (text: string, query: string): boolean => {
    if (!query) return true
    const lowerText = text.toLowerCase()
    const lowerQuery = query.toLowerCase()
    return lowerText.includes(lowerQuery)
  }

  // Filter posts based on search query
  const filteredFeaturedPosts = useMemo(() => {
    if (!searchQuery) return featuredPosts
    return featuredPosts.filter(post => 
      fuzzySearch(post.title, searchQuery) ||
      fuzzySearch(post.excerpt, searchQuery) ||
      fuzzySearch(post.category, searchQuery) ||
      fuzzySearch(post.author, searchQuery) ||
      (post.tags && post.tags.some(tag => fuzzySearch(tag, searchQuery)))
    )
  }, [featuredPosts, searchQuery])

  const filteredRegularPosts = useMemo(() => {
    const regularPosts = allPosts.filter(post => !post.featured)
    if (!searchQuery) return regularPosts
    return regularPosts.filter(post => 
      fuzzySearch(post.title, searchQuery) ||
      fuzzySearch(post.excerpt, searchQuery) ||
      fuzzySearch(post.category, searchQuery) ||
      fuzzySearch(post.author, searchQuery) ||
      (post.tags && post.tags.some(tag => fuzzySearch(tag, searchQuery)))
    )
  }, [allPosts, searchQuery])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Vintage Slider */}
      <VintageHeroSlider 
        images={heroImages}
        height="h-[80vh]"
        autoPlayInterval={8000}
        className="relative"
        id="main-content"
      >
        <div className="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-center"
          >
            <div className="text-sm font-montserrat font-medium tracking-widest uppercase text-white/90 mb-6 drop-shadow-lg">
              Insights & Updates
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none text-white mb-8 drop-shadow-2xl">
              Our Blog
            </h1>
            <div className="text-xl md:text-2xl lg:text-3xl font-light text-white/95 mb-8 leading-tight max-w-4xl mx-auto drop-shadow-lg">
              Stay informed with the latest news, insights, and expert perspectives on the topics that matter most to our clients.
            </div>
            
            {/* Search functionality */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-white/70 text-lg focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </VintageHeroSlider>

      {/* Featured Posts */}
      {filteredFeaturedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: 'var(--theme-primary)' }}
              >
                Featured Articles
              </h2>
              <p className="text-xl text-gray-600">
                Expert insights and in-depth analysis on the topics that matter most
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {filteredFeaturedPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span
                        className="px-3 py-1 text-sm font-montserrat font-medium uppercase tracking-wide"
                        style={{
                          backgroundColor: 'var(--theme-primary)',
                          color: 'var(--theme-primary-foreground)',
                        }}
                      >
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-bold mb-4 transition-opacity group-hover:opacity-80"
                      style={{ color: 'var(--theme-primary)' }}
                    >
                      <Link href={`/blog/${post.slug}`} onClick={() => handleBlogPostClick(post)}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        onClick={() => handleBlogPostClick(post)}
                        className="inline-flex items-center font-montserrat font-medium text-sm uppercase tracking-wide transition-opacity hover:opacity-70 group"
                        style={{ color: 'var(--theme-primary)' }}
                      >
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--theme-primary)' }}
            >
              Recent Posts
            </h2>
            <p className="text-xl text-gray-600">
              Stay up to date with our latest articles and insights
            </p>
          </motion.div>

          {filteredRegularPosts.length === 0 && filteredFeaturedPosts.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No articles found matching "{searchQuery}"</p>
              <p className="text-gray-500">Try searching for different keywords or browse all articles below.</p>
            </div>
          )}

          <div className="space-y-8">
            {filteredRegularPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-l-4 pl-8 hover:bg-gray-50 transition-colors duration-300 p-6 -ml-6"
                style={{ borderColor: 'var(--theme-primary)' }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <span
                        className="bg-gray-100 px-3 py-1 text-sm font-montserrat font-medium uppercase tracking-wide"
                        style={{ color: 'var(--theme-primary)' }}
                      >
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-bold mb-4 transition-opacity hover:opacity-80"
                      style={{ color: 'var(--theme-primary)' }}
                    >
                      <Link href={`/blog/${post.slug}`} onClick={() => handleBlogPostClick(post)}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:flex-shrink-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={() => handleBlogPostClick(post)}
                      className="inline-flex items-center font-montserrat font-medium text-sm uppercase tracking-wide transition-opacity hover:opacity-70 group"
                      style={{ color: 'var(--theme-primary)' }}
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <NewsletterSignup
              source="blog"
              title="Stay Informed"
              description="Get our latest articles and insights delivered straight to your inbox. Subscribe to stay up to date."
              placeholder="Enter your email"
              buttonText="Subscribe"
            />
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-foreground)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              Have questions or need assistance? We're here to help. Reach out to our team today to discuss how we can support you.
            </p>
            <Button
              variant={null as any}
              size="lg"
              className="font-semibold font-montserrat tracking-wide uppercase px-8 py-4 rounded-none hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: 'var(--theme-primary-foreground)',
                color: 'var(--theme-primary)',
              }}
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us Today
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
