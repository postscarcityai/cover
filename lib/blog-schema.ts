import { BlogPost } from './blog'
import { siteConfig } from '@/site.config'

/**
 * Extract Q&A content from blog post content to generate FAQPage schema
 */
function extractQAContent(content?: string): Array<{question: string, answer: string}> {
  if (!content) return []
  
  const qaItems: Array<{question: string, answer: string}> = []
  
  // Find all QuestionAnswer components (handles multiline formatting with [\s\S]*?)
  const componentRegex = /<QuestionAnswer[\s\S]*?\/>/g
  let componentMatch
  
  while ((componentMatch = componentRegex.exec(content)) !== null) {
    const componentStr = componentMatch[0]
    
    // Extract question attribute - handles any whitespace between tag name and attribute
    const questionMatch = componentStr.match(/question="([^"]*)"/)
    // Extract answer attribute - handles multiline content within the string
    const answerMatch = componentStr.match(/answer="([^"]*)"/)
    
    if (questionMatch && answerMatch) {
      qaItems.push({
        question: questionMatch[1],
        answer: answerMatch[1]
      })
    }
  }

  return qaItems
}

/**
 * Extract first image from blog post content for Article schema
 */
function extractFirstImage(content?: string): {url: string, alt: string} | null {
  if (!content) return null
  
  // Look for FullWidthImage, ImageRight, ImageText, or ImageTextRight components
  const imageMatch = content.match(/<(?:FullWidthImage|ImageRight|ImageText|ImageTextRight)\s+src="([^"]+)"\s+alt="([^"]+)"[^>]*\/?>/)
  
  if (imageMatch) {
    const [, src, alt] = imageMatch
    return {
      url: src.startsWith('/') ? `${siteConfig.url}${src}` : src,
      alt
    }
  }
  
  return null
}

/**
 * Generate comprehensive Article schema with Speakable and AudioObject for 2025 compliance
 * Optimized for voice search, multimodal results, and Google News/Discover
 */
export function generateBlogArticleSchema(post: BlogPost, slug: string) {
  const firstImage = extractFirstImage(post.content)
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteConfig.url}${siteConfig.blog.basePath}/${slug}#article`,
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": "Author",
      "worksFor": {
        "@type": "Organization",
        "@id": siteConfig.url
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/logo.svg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${siteConfig.blog.basePath}/${slug}`
    },
    "articleSection": post.category,
    "keywords": post.category,
    "inLanguage": "en-US",
    
    // Article image - required for rich results
    ...(firstImage && {
      "image": {
        "@type": "ImageObject",
        "url": firstImage.url,
        "description": firstImage.alt,
        "width": "1200",
        "height": "675"
      }
    }),
    
    // Speakable schema for voice search optimization (2025 priority)
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        "h1", // Article title - perfect for voice assistants
        ".article-excerpt", // Article summary - 20-30 second read
        ".key-takeaways", // Key legal points - actionable information
        ".emergency-contact" // Contact info - critical for legal emergencies
      ]
    },
    
    // AudioObject schema for TTS files (unique competitive advantage)
    ...(post.audio?.parts && {
      "associatedMedia": [
        // Main complete audio file
        {
          "@type": "AudioObject",
          "name": `${post.title} - Complete Audio`,
          "description": `Professional legal analysis narrated by ${post.audio?.narrator || 'Professional Narrator'} of Eleven Labs`,
          "contentUrl": post.audio.parts[0]?.url || "",
          "duration": post.audio.totalDuration ? `PT${post.audio.totalDuration.replace(' min', 'M')}` : undefined,
          "encodingFormat": "audio/mpeg",
          "inLanguage": "en-US",
          "readBy": {
            "@type": "Person",
            "name": post.audio?.narrator || "Professional Narrator"
          },
          "about": {
            "@type": "Thing",
            "name": post.category
          }
        },
        
        // Individual audio segments for granular access
        ...post.audio.parts.map((part, index) => ({
          "@type": "AudioObject",
          "name": `${post.title} - Part ${index + 1}: ${part.title}`,
          "description": part.description,
          "contentUrl": part.url,
          "encodingFormat": "audio/mpeg",
          "inLanguage": "en-US",
          "readBy": {
            "@type": "Person",
            "name": post.audio?.narrator || "Professional Narrator"
          },
          "about": {
            "@type": "Thing",
            "name": part.title
          }
        }))
      ]
    })
  }
}

/**
 * Generate BreadcrumbList schema for blog posts
 */
export function generateBlogBreadcrumbSchema(post: BlogPost, slug: string) {
  return {
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
        "name": siteConfig.blog.title,
        "item": `${siteConfig.url}${siteConfig.blog.basePath}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${siteConfig.url}${siteConfig.blog.basePath}/${slug}`
      }
    ]
  }
}

/**
 * Generate FAQPage schema for blog posts with Q&A content
 */
export function generateBlogFAQSchema(post: BlogPost, slug: string) {
  const qaItems = extractQAContent(post.content)
  
  if (qaItems.length === 0) {
    return null // No Q&A content found
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}${siteConfig.blog.basePath}/${slug}#faq`,
    "mainEntity": qaItems.map((qa, index) => ({
      "@type": "Question",
      "name": qa.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer
      }
    }))
  }
}

/**
 * Generate ImageObject schema for blog post images (future enhancement)
 */
export function generateBlogImageSchema(imageSrc: string, imageAlt: string, post: BlogPost) {
  return {
    "@type": "ImageObject",
    "url": imageSrc,
    "description": imageAlt,
    "caption": imageAlt,
    "contentUrl": imageSrc,
    "width": "1200",
    "height": "630",
    "encodingFormat": "image/webp",
    "about": {
      "@type": "Article",
      "headline": post.title
    }
  }
}

/**
 * Complete schema bundle for blog posts - use this for maximum 2025 compliance
 */
export function generateCompleteBlogSchema(post: BlogPost, slug: string) {
  const faqSchema = generateBlogFAQSchema(post, slug)
  
  return {
    article: generateBlogArticleSchema(post, slug),
    breadcrumb: generateBlogBreadcrumbSchema(post, slug),
    ...(faqSchema && { faq: faqSchema })
  }
}

/**
 * Schema validation helper - ensures all required properties are present
 */
export function validateBlogSchema(schema: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Required Article properties
  if (!schema.headline) errors.push("Missing required 'headline' property")
  if (!schema.author?.name) errors.push("Missing required 'author.name' property")
  if (!schema.datePublished) errors.push("Missing required 'datePublished' property")
  if (!schema.publisher?.name) errors.push("Missing required 'publisher.name' property")
  
  // 2025 enhancements
  if (!schema.speakable) errors.push("Missing 'speakable' property - required for voice search optimization")
  if (!schema.inLanguage) errors.push("Missing 'inLanguage' property - required for international SEO")
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
