import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/blog'
import { siteConfig } from '@/site.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url
  
  // Get all blog posts for dynamic URLs
  const blogPosts = await getAllBlogPosts()
  
  // Build static pages from navigation + legal pages
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage - always highest priority
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // Add navigation pages (excluding homepage which is already added)
  siteConfig.navigation.forEach((item) => {
    if (item.href !== '/') {
      // Determine priority based on common patterns
      let priority = 0.8
      let changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly'
      
      if (item.href === '/contact') {
        priority = 0.9
      } else if (item.href === siteConfig.blog.basePath) {
        priority = 0.7
        changeFrequency = 'weekly'
      }
      
      staticPages.push({
        url: `${baseUrl}${item.href}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      })
    }
  })

  // Add legal pages with low priority
  if (siteConfig.legal.privacyPolicy) {
    staticPages.push({
      url: `${baseUrl}${siteConfig.legal.privacyPolicy}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    })
  }
  
  if (siteConfig.legal.termsOfService) {
    staticPages.push({
      url: `${baseUrl}${siteConfig.legal.termsOfService}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    })
  }

  // Dynamic blog post pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}${siteConfig.blog.basePath}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
