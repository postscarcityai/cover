# Scheduled Blog Posts

This project supports scheduling blog posts to publish at future dates without requiring manual redeployment.

## How It Works

Blog posts are automatically filtered by their `date` field in the frontmatter based on the environment:

### Development Environment (`npm run dev`)
- **All posts are visible** regardless of date
- **Future posts appear** in blog listings and can be accessed directly
- **Perfect for content management** and preview

### Production Environment
Posts with future dates:
- **Won't appear** in blog listings (`/justice-watch`)
- **Return 404** when accessed directly (`/justice-watch/[slug]`)
- **Won't appear** in the sitemap
- **Can't be crawled** by search engines

Once the post's date passes, it automatically becomes visible on the next page revalidation (every hour).

## Creating a Scheduled Post

1. Create a new MDX file in `content/blog/`
2. Set the `date` field to a future date in the frontmatter:

```mdx
---
title: "Your Post Title"
excerpt: "Post excerpt..."
author: "Your Team Lead"
date: "2025-12-31"  # Future date
readTime: "10 min read"
category: "Federal Defense"
featured: true
slug: "your-post-slug"
---

Your content here...
```

3. Commit and deploy the file
4. The post will automatically publish when the date arrives

## Technical Details

### Date Filtering
- Implemented in `lib/blog.ts`:
  - `getAllBlogPosts()` filters posts based on environment at line 61-71
  - `getBlogPost()` returns null for future posts in production at line 91-99
  - Development mode (`NODE_ENV === 'development'`) shows all posts regardless of date

### ISR (Incremental Static Regeneration)
- Pages revalidate every **1 hour** (3600 seconds)
- Configured in:
  - `app/justice-watch/page.tsx:5`
  - `app/justice-watch/[slug]/page.tsx:12`

### Deployment
- No manual redeployment needed
- Posts automatically appear within 1 hour of their scheduled date
- Pages stay fast (cached) between revalidations

## Testing

To test scheduled posts:

1. Create a post with tomorrow's date
2. Verify it doesn't appear in `/justice-watch`
3. Verify direct URL returns 404
4. Wait until the date passes (or change date to today)
5. Wait up to 1 hour for revalidation, or trigger manually by visiting the page

## Adjusting Revalidation Time

To change how often pages check for new posts, modify the `revalidate` constant:

```typescript
export const revalidate = 3600  // seconds (1 hour)
```

**Common values:**
- `3600` = 1 hour (current setting)
- `1800` = 30 minutes
- `86400` = 24 hours
- `600` = 10 minutes
