import type { Metadata } from "next"
import { getAllBlogPosts, getFeaturedBlogPosts, type BlogPost } from "@/lib/blog"
import { BlogClient } from "./client"
import { siteConfig } from "@/site.config"

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

export const metadata: Metadata = {
  title: `Blog - Insights & Updates | ${siteConfig.name}`,
  description: "Expert insights, industry news, and helpful resources. Stay informed with our latest articles and updates.",
  keywords: ["blog", "insights", "news", "updates", "articles"],
  alternates: {
    canonical: `${siteConfig.url}/blog`
  },
  openGraph: {
    title: `Blog - ${siteConfig.name}`,
    description: "Expert insights, industry news, and helpful resources from our team.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    type: "website",
    images: [{
      url: `${siteConfig.url}/img/og-image.png`,
      width: 1200,
      height: 630,
      alt: siteConfig.name
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog - ${siteConfig.name}`,
    description: "Expert insights, industry news, and helpful resources.",
    images: [`${siteConfig.url}/img/og-image.png`],
  }
}

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts()
  const featuredPosts = await getFeaturedBlogPosts()

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteConfig.url}/blog`
      }
    ]
  }

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      <BlogClient allPosts={allPosts} featuredPosts={featuredPosts} />
    </>
  )
}
