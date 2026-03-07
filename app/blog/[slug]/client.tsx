"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2 } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogCTA } from "@/components/blog-cta"
import { AudioPlayer } from "@/components/audio-player"
import { trackButtonClick } from "@/lib/analytics"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { type BlogPost } from "@/lib/blog"
import { siteConfig } from "@/site.config"
import { useEffect } from "react"

interface BlogPostClientProps {
  post: BlogPost
  mdxContent?: React.ReactElement
}

export function BlogPostClient({ post, mdxContent }: BlogPostClientProps) {
  // Track page view once on mount
  usePageTracking(post.title, 'blog', 'blog_post')
  
  // Track scroll depth milestones (important for blog engagement)
  useScrollTracking()

  // Remove all links in blog content from tab order
  useEffect(() => {
    const editorialContent = document.querySelector('.editorial-content')
    if (editorialContent) {
      const links = editorialContent.querySelectorAll('a')
      links.forEach(link => {
        link.setAttribute('tabIndex', '-1')
      })
    }
  }, [mdxContent])

  const handleShareClick = () => {
    trackButtonClick('Share', 'blog_post_header', 'share')
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Article Header */}
      <article className="pt-24 pb-16" id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Blog Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href={siteConfig.blog.basePath}
              className="inline-flex items-center text-[#2A2C53] hover:text-[#2A2C53]/80 font-montserrat font-medium text-sm uppercase tracking-wide transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {siteConfig.blog.title}
            </Link>
          </motion.div>

          {/* Article Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center space-x-4 mb-6">
              <span className="bg-[#2A2C53] text-white px-3 py-1 text-sm font-montserrat font-medium uppercase tracking-wide">
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
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <User className="h-4 w-4 mr-1" />
                {post.author}
              </div>
            </div>
          </motion.div>

          {/* Article Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-[#2A2C53] mb-8 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {post.title}
          </motion.h1>

          {/* Article Excerpt - Speakable Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="article-excerpt text-xl text-gray-600 leading-relaxed mb-12 pb-8 border-b border-gray-200"
          >
            {post.excerpt}
          </motion.div>

          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-between mb-12"
          >
            <div className="flex items-center space-x-4">
              <span className="text-sm font-montserrat font-medium uppercase tracking-wide text-gray-500">
                Share this analysis:
              </span>
              <Button
                variant="outline"
                size="sm"
                className="border-[#2A2C53] text-[#2A2C53] hover:bg-[#2A2C53] hover:text-white"
                onClick={() => {
                  handleShareClick()
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>

          {/* Mobile Audio Player - Below Title */}
          {post.audio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:hidden mb-8"
            >
              <AudioPlayer 
                narrator={post.audio.narrator}
                totalDuration={post.audio.totalDuration}
                parts={post.audio.parts}
                postSlug={post.slug}
                postTitle={post.title}
              />
            </motion.div>
          )}

          {/* Article Content - Editorial Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="editorial-content"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content Column */}
              <div className="lg:col-span-8">
                <div className="prose prose-lg prose-gray max-w-none editorial-typography
                  prose-headings:font-playfair prose-headings:text-[#2A2C53]
                  prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-12
                  prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-8
                  prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-[#2A2C53] prose-strong:font-semibold
                  prose-ul:mb-6 prose-li:mb-2
                  prose-blockquote:border-l-4 prose-blockquote:border-[#2A2C53] prose-blockquote:italic"
                tabIndex={-1}
                >
                  {mdxContent ? (
                    mdxContent
                  ) : (
                    <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-8">
                  {/* Desktop Audio Player - Sidebar */}
                  {post.audio && (
                    <div className="hidden lg:block">
                      <AudioPlayer 
                        narrator={post.audio.narrator}
                        totalDuration={post.audio.totalDuration}
                        parts={post.audio.parts}
                        postSlug={post.slug}
                        postTitle={post.title}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>


          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <div className="bg-gray-50 p-8 rounded-none">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-[#2A2C53] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#2A2C53] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {post.author}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {post.author} brings extensive experience and deep expertise to complex legal matters.
                    Our team is dedicated to providing strategic counsel and vigorous representation for clients facing serious legal challenges.
                  </p>
                  <Link 
                    href="/our-firm"
                    className="inline-flex items-center text-[#2A2C53] hover:text-[#2A2C53]/80 font-montserrat font-medium text-sm uppercase tracking-wide transition-colors"
                  >
                    Learn More About Our Firm
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <div className="flex justify-between items-center">
              <Link 
                href="/justice-watch"
                className="inline-flex items-center text-[#2A2C53] hover:text-[#2A2C53]/80 font-montserrat font-medium text-sm uppercase tracking-wide transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Articles
              </Link>
              
              <Link 
                href="/practice-areas"
                className="inline-flex items-center text-[#2A2C53] hover:text-[#2A2C53]/80 font-montserrat font-medium text-sm uppercase tracking-wide transition-colors"
              >
                Our Practice Areas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Consistent Purple CTA */}
      <BlogCTA 
        title="Need Expert Legal Defense?"
        description="Facing federal gun or drug charges in South Florida? The DOJ's aggressive enforcement climate demands experienced federal defense counsel. Our team understands the complex intersection of firearms and narcotics law."
        buttonText="Schedule Consultation"
        buttonAction={() => window.location.href = '/contact'}
      />

      <Footer />
    </div>
  )
}
