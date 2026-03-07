"use client"

import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2 } from "lucide-react"
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
  usePageTracking(post.title, "blog", "blog_post")
  useScrollTracking()

  useEffect(() => {
    const editorialContent = document.querySelector(".editorial-content")
    if (editorialContent) {
      const links = editorialContent.querySelectorAll("a")
      links.forEach(link => {
        link.setAttribute("tabIndex", "-1")
      })
    }
  }, [mdxContent])

  const handleShareClick = () => {
    trackButtonClick("Share", "blog_post_header", "share")
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <article className="pt-32 md:pt-40 pb-16" id="main-content" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <div data-reveal="fade-up" className="mb-8">
            <Link
              href={siteConfig.blog.basePath}
              className="inline-flex items-center text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {siteConfig.blog.title}
            </Link>
          </div>

          <div data-reveal="fade-up" className="mb-6">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span
                className="px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full"
                style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}
              >
                {post.category}
              </span>
              <span className="flex items-center text-xs" style={{ color: "var(--fg-muted)" }}>
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center text-xs" style={{ color: "var(--fg-muted)" }}>
                <Clock className="h-3 w-3 mr-1" />
                {post.readTime}
              </span>
              <span className="flex items-center text-xs" style={{ color: "var(--fg-muted)" }}>
                <User className="h-3 w-3 mr-1" />
                {post.author}
              </span>
            </div>
          </div>

          <h1
            data-reveal="words"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
          >
            {post.title}
          </h1>

          <div
            data-reveal="fade-up"
            className="text-xl leading-relaxed mb-12 pb-8 border-b"
            style={{ color: "var(--fg-muted)", borderColor: "var(--border)" }}
          >
            {post.excerpt}
          </div>

          <div data-reveal="fade-up" className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
                Share:
              </span>
              <Button
                variant={null as any}
                size="sm"
                className="rounded-full border transition-all hover:scale-105"
                style={{ borderColor: "var(--border)", color: "var(--fg-muted)", backgroundColor: "transparent" }}
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
          </div>

          {post.audio && (
            <div data-reveal="fade-up" className="lg:hidden mb-8">
              <AudioPlayer
                narrator={post.audio.narrator}
                totalDuration={post.audio.totalDuration}
                parts={post.audio.parts}
                postSlug={post.slug}
                postTitle={post.title}
              />
            </div>
          )}

          <div data-reveal="fade-up" className="editorial-content">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <div
                  className="prose prose-lg max-w-none editorial-typography
                    prose-headings:text-[var(--fg)]
                    prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-12
                    prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-8
                    prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                    prose-strong:text-[var(--fg)] prose-strong:font-semibold
                    prose-ul:mb-6 prose-li:mb-2
                    prose-blockquote:border-l-4 prose-blockquote:border-[var(--accent)] prose-blockquote:italic"
                  tabIndex={-1}
                >
                  {mdxContent ? (
                    mdxContent
                  ) : (
                    <div className="text-lg leading-relaxed whitespace-pre-wrap" style={{ color: "var(--fg)" }}>
                      {post.content}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-8">
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
          </div>

          <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
            <div
              className="p-8 rounded-lg"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <div className="flex items-start gap-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                >
                  {post.author.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                  >
                    {post.author}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                    {post.author} brings extensive experience and deep expertise to complex matters.
                    Our team is dedicated to providing strategic counsel and vigorous representation.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
                    style={{ color: "var(--accent)" }}
                  >
                    Learn More About Our Team
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
            <div className="flex justify-between items-center">
              <Link
                href={siteConfig.blog.basePath}
                className="inline-flex items-center text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Articles
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      <BlogCTA />

      <Footer />
    </div>
  )
}
