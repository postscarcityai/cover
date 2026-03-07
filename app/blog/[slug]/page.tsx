import type { Metadata } from "next"
import React from "react"
import { getBlogPost, getAllBlogPosts } from "@/lib/blog"
import { generateCompleteBlogSchema } from "@/lib/blog-schema"
import { BlogPostClient } from "./client"
import { notFound } from "next/navigation"
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/components/mdx-components'
import { siteConfig } from "@/site.config"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: `Post Not Found | ${siteConfig.name}`,
    }
  }

  return {
    title: `${post.title} | ${siteConfig.blog.title} - ${siteConfig.name}`,
    description: post.excerpt,
    keywords: [post.category, ...siteConfig.seo.keywords],
    alternates: {
      canonical: `${siteConfig.url}${siteConfig.blog.basePath}/${slug}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}${siteConfig.blog.basePath}/${slug}`,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.title
      }] : siteConfig.seo.openGraph.images
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : siteConfig.seo.openGraph.images.map(img => img.url),
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Generate complete blog schema using 2025-compliant utility
  const schemas = generateCompleteBlogSchema(post, slug)

  const components = useMDXComponents({
    h1: ({ children }) => {
      const text = React.Children.toArray(children)
        .map((c) => (typeof c === "string" ? c : ""))
        .join("")
        .trim()
      if (text === post.title) return null
      return (
        <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--fg)' }}>
          {children}
        </h1>
      )
    },
  })

  // Render MDX content on server side for SEO (pre-rendered HTML)
  const mdxContent = post.content 
    ? await MDXRemote({ source: post.content, components })
    : undefined

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumb)
        }}
      />
      
      {/* Enhanced Article Schema with Speakable + AudioObject */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.article)
        }}
      />
      
      {/* FAQPage Schema (if Q&A content detected) */}
      {schemas.faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas.faq)
          }}
        />
      )}
      
      <BlogPostClient post={post} mdxContent={mdxContent} />
    </>
  )
}
