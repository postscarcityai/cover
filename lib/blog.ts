import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/blog')

interface AudioPart {
  title: string
  url: string
  duration: string
  description: string
}

interface AudioInfo {
  narrator: string
  totalDuration: string
  parts: AudioPart[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  featured: boolean
  content?: string
  audio?: AudioInfo
  image?: string
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // Check if content directory exists
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(contentDirectory)
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        author: data.author || '',
        date: data.date || '',
        readTime: data.readTime || '',
        category: data.category || '',
        featured: data.featured || false,
        audio: data.audio || undefined,
      } as BlogPost
    })
    .filter(post => {
      // In development, show all posts including future ones
      if (process.env.NODE_ENV === 'development') {
        return true
      }
      
      // In production, filter out posts with future dates
      const postDate = new Date(post.date)
      const now = new Date()
      return postDate <= now
    })
    .sort((a, b) => {
      // Sort by date descending
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return allPostsData
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // In development, show all posts including future ones
    if (process.env.NODE_ENV !== 'development') {
      // In production, check if post date is in the future
      const postDate = new Date(data.date)
      const now = new Date()
      if (postDate > now) {
        return null
      }
    }

    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      author: data.author || '',
      date: data.date || '',
      readTime: data.readTime || '',
      category: data.category || '',
      featured: data.featured || false,
      content,
      audio: data.audio || undefined,
    } as BlogPost
  } catch (error) {
    console.error('Error reading blog post:', error)
    return null
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.featured)
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase())
}
