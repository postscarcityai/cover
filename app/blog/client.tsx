"use client"

import { useState, useMemo } from "react"
import { Calendar, Clock, ArrowRight, User, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { trackBlogPostView } from "@/lib/analytics"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { type BlogPost } from "@/lib/blog"

interface BlogClientProps {
  allPosts: BlogPost[]
  featuredPosts: BlogPost[]
  data: {
    hero: {
      title: string
      description: string
      breadcrumbs: readonly { label: string; href?: string }[]
    }
    searchPlaceholder: string
    featuredSection: { eyebrow: string; title: string; description: string }
    latestSection: { eyebrow: string; title: string; description: string }
    noResults: { titleTemplate: string; subtitle: string }
  }
}

export function BlogClient({ allPosts, featuredPosts, data }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("")

  usePageTracking("Blog Index", "blog", "blog_index")
  useScrollTracking()

  const handleBlogPostClick = (post: BlogPost) => {
    trackBlogPostView(post.title, post.category, post.slug)
  }

  const fuzzySearch = (text: string, query: string): boolean => {
    if (!query) return true
    return text.toLowerCase().includes(query.toLowerCase())
  }

  const filteredFeaturedPosts = useMemo(() => {
    if (!searchQuery) return featuredPosts
    return featuredPosts.filter(post =>
      fuzzySearch(post.title, searchQuery) ||
      fuzzySearch(post.excerpt, searchQuery) ||
      fuzzySearch(post.category, searchQuery) ||
      fuzzySearch(post.author, searchQuery) ||
      ((post as any).tags && (post as any).tags.some((tag: string) => fuzzySearch(tag, searchQuery)))
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
      ((post as any).tags && (post as any).tags.some((tag: string) => fuzzySearch(tag, searchQuery)))
    )
  }, [allPosts, searchQuery])

  return (
    <div className="min-h-screen">
      

      <SubpageHero
        title={data.hero.title}
        description={data.hero.description}
        breadcrumbs={[...data.hero.breadcrumbs]}
      >
        <div className="max-w-xl mt-4">
          <div
            className="relative border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <Search
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-5 w-5"
              style={{ color: "var(--fg-muted)" }}
            />
            <input
              type="text"
              placeholder={data.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-transparent text-base focus:outline-none"
              style={{ color: "var(--fg)" }}
            />
          </div>
        </div>
      </SubpageHero>

      <main id="main-content">
        {filteredFeaturedPosts.length > 0 && (
          <SubpageSection
            background="surface"
            eyebrow={data.featuredSection.eyebrow}
            title={data.featuredSection.title}
            description={data.featuredSection.description}
          >
            <div className="grid lg:grid-cols-2 gap-6" data-reveal="stagger">
              {filteredFeaturedPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group p-8 rounded-lg border transition-all duration-500 hover:border-[var(--accent)]"
                  style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-center gap-4 mb-4">
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
                  </div>

                  <h3
                    className="text-xl font-bold mb-4 transition-opacity group-hover:opacity-80"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                  >
                    <Link href={`/blog/${post.slug}`} onClick={() => handleBlogPostClick(post)}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs" style={{ color: "var(--fg-muted)" }}>
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={() => handleBlogPostClick(post)}
                      className="inline-flex items-center text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
                      style={{ color: "var(--accent)" }}
                    >
                      Read
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </SubpageSection>
        )}

        <SubpageSection
          eyebrow={data.latestSection.eyebrow}
          title={data.latestSection.title}
          description={data.latestSection.description}
        >
          {filteredRegularPosts.length === 0 && filteredFeaturedPosts.length === 0 && searchQuery && (
            <div className="text-center py-12" data-reveal="fade-up">
              <p className="text-xl mb-4" style={{ color: "var(--fg-muted)" }}>
                {data.noResults.titleTemplate.replace("{query}", searchQuery)}
              </p>
              <p style={{ color: "var(--fg-muted)" }}>
                {data.noResults.subtitle}
              </p>
            </div>
          )}

          <div className="space-y-6" data-reveal="stagger">
            {filteredRegularPosts.map((post) => (
              <article
                key={post.slug}
                className="group p-6 border rounded-lg transition-all duration-500 hover:border-[var(--accent)]"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
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
                    </div>

                    <h3
                      className="text-xl font-bold mb-3 transition-opacity group-hover:opacity-80"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                    >
                      <Link href={`/blog/${post.slug}`} onClick={() => handleBlogPostClick(post)}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs" style={{ color: "var(--fg-muted)" }}>
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:flex-shrink-0 lg:self-center">
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={() => handleBlogPostClick(post)}
                      className="inline-flex items-center text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
                      style={{ color: "var(--accent)" }}
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20" data-reveal="fade-up">
            <NewsletterSignup
              source="blog"
              title="Stay Informed"
              description="Get our latest articles and insights delivered straight to your inbox."
            />
          </div>
        </SubpageSection>

        <SubpageSection background="gradient">
          <div className="text-center max-w-4xl mx-auto" data-reveal="fade-up">
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Have questions or need assistance? We&apos;re here to help.
            </p>
            <MagneticButton>
              <Button
                variant={null as any}
                size="lg"
                className="font-semibold text-base px-10 py-5 tracking-wide uppercase transition-all"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                onClick={() => (window.location.href = "/contact")}
              >
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </MagneticButton>
          </div>
        </SubpageSection>
      </main>

      <Footer />
    </div>
  )
}
