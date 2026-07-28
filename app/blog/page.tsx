import type { Metadata } from "next"
import { getAllBlogPosts, getFeaturedBlogPosts, type BlogPost } from "@/lib/blog"
import { BlogClient } from "./client"
import { siteConfig } from "@/site.config"
import { pageMetadata } from "@/lib/seo"
import { blogData } from "./data"
import { JsonLd } from "@/components/json-ld"

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Blog - Insights & Updates",
  description: "Expert insights, industry news, and helpful resources. Stay informed with our latest articles and updates.",
  keywords: ["blog", "insights", "news", "updates", "articles"],
})

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
      <JsonLd data={breadcrumbSchema} />

      <BlogClient allPosts={allPosts} featuredPosts={featuredPosts} data={blogData} />
    </>
  )
}
