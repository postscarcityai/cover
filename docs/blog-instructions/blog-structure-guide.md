# Blog Structure and Writing Guide

## Overview

This guide provides comprehensive instructions for creating new blog posts in the Your Company Name website. Our blog system uses MDX (Markdown with JSX) format, allowing for rich content with custom legal components, audio integration, and professional editorial layouts.

## Table of Contents

1. [Blog Architecture](#blog-architecture)
2. [File Structure](#file-structure)
3. [Frontmatter Configuration](#frontmatter-configuration)
4. [Content Guidelines](#content-guidelines)
5. [Custom MDX Components](#custom-mdx-components)
6. [Audio Integration](#audio-integration)
7. [Writing Best Practices](#writing-best-practices)
8. [Publishing Workflow](#publishing-workflow)

## Blog Architecture

### How Blogs Work

Blogs in the template are:
- **Stored as MDX files** in `/content/blog/` directory
- **Rendered dynamically** through Next.js app router at `/blog/[slug]`
- **Parsed and displayed** using custom MDX components
- **Enhanced with audio** through ElevenLabs text-to-speech integration (optional)
- **Styled consistently** with the theme system

### Technical Stack

- **MDX**: Markdown with JSX components for rich content
- **Next.js App Router**: Server-side rendering and static generation
- **React Components**: Custom legal content components
- **Audio Integration**: ElevenLabs TTS with Supabase storage
- **Responsive Design**: Mobile-first editorial layout

## File Structure

### Required Files for Each Blog Post

```
/content/blog/
├── your-blog-slug.mdx          # Main blog post (required)
├── /scripts/
│   └── your-blog-slug.txt      # Audio script (optional)
└── /public/img/blog/
    └── your-blog-slug/         # Image folder (create as needed)
        ├── hero-image.jpg      # Main hero/opening image
        ├── detail-shot.jpg     # Close-up or detail image
        ├── image-1.jpg         # Additional images
        └── image-2.jpg         # More images as needed
```

### File Naming Convention

- **MDX File**: Use kebab-case matching the slug: `getting-started-with-your-site.mdx`
- **Script File**: Same base name with `.txt` extension: `getting-started-with-your-site.txt` (optional)
- **Image Folder**: Same as slug: `/public/img/blog/getting-started-with-your-site/`
- **Image Files**: Descriptive names indicating placement and content type
- **Slug Format**: lowercase, hyphen-separated, descriptive

### Image Naming Convention

Images should be named descriptively to indicate their intended placement in the blog:

- **hero-image.jpg** - Main opening image, typically used in FullWidthImage at start
- **detail-shot.jpg** - Close-up or detail image, used in ImageText components
- **image-1.jpg**, **image-2.jpg** - Additional images with descriptive names
- **custom-name.jpg** - Any additional images with descriptive names

**Image Distribution Process:**
1. Create blog post with image placeholders using descriptive src paths
2. Upload images to `/public/img/blog/[slug]/` folder with descriptive names
3. Update blog post to use actual uploaded image paths
4. Match images to placeholders based on descriptive filenames

## Frontmatter Configuration

### Required Fields

Every blog post must include YAML frontmatter with these fields:

```yaml
---
title: "Your Blog Post Title"
excerpt: "A compelling excerpt that appears in previews and meta descriptions"
author: "Your Team Lead"
date: "2025-09-09T12:00:00-05:00"  # Include timezone to prevent date display issues
readTime: "12 min read"
category: "Federal Defense"
featured: true
slug: "your-blog-slug"
---
```

### Optional Audio Configuration

If you're including audio narration:

```yaml
audio:
  narrator: "Matthew Angelo"
  totalDuration: "15 min"
  parts:
    - title: "Introduction"
      url: "https://luctiepxpgsjfdlotubw.supabase.co/storage/v1/object/public/audio-files/your-slug-part1-introduction.mp3"
      description: "Overview of the topic"
    - title: "Section Title"
      url: "https://luctiepxpgsjfdlotubw.supabase.co/storage/v1/object/public/audio-files/your-slug-part2-section.mp3"
      description: "Description of section content"
```

### Field Specifications

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Main headline, used in H1 and meta tags |
| `excerpt` | string | ✅ | Brief description for previews and SEO |
| `author` | string | ✅ | Always "Your Team Lead" for consistency |
| `date` | string | ✅ | ISO date format with timezone: "YYYY-MM-DDTHH:MM:SS-05:00" |
| `readTime` | string | ✅ | Estimated reading time: "X min read" |
| `category` | string | ✅ | Content category (e.g., "Industry News", "How-To Guides") |
| `featured` | boolean | ✅ | Whether to show in featured posts section |
| `slug` | string | ✅ | URL slug, must match filename without extension |
| `audio` | object | ❌ | Audio configuration if narration available |

### Date Format Requirements

**IMPORTANT: Always use timezone-aware date format to prevent display issues**

- **Correct Format**: `"2025-10-10T12:00:00-05:00"`
- **Incorrect Format**: `"2025-10-10"` (causes timezone conversion issues)

**Format Breakdown:**
- `2025-10-10` - Date (YYYY-MM-DD)
- `T12:00:00` - Time (12:00 PM, use noon to avoid edge cases)
- `-05:00` - Eastern Standard Time offset (use `-04:00` for EDT in summer)

**Why This Matters:**
- Simple date strings get parsed as midnight UTC
- When converted to local timezone, may display as previous day
- Timezone-aware format ensures consistent display across all timezones

## Content Guidelines

### Structure Requirements

1. **Start immediately with content** after frontmatter (no need for H1, it's generated from title)
2. **Use H2 for main sections** - these become audio part divisions
3. **Use H3 for subsections** within each H2 section
4. **Include strategic callout components** throughout the content

### Editorial Style

- **Professional Legal Tone**: Authoritative but accessible
- **Client-Focused**: Address concerns and provide actionable advice
- **Expertise Demonstration**: Show deep legal knowledge and experience
- **Direct Communication**: Be clear about what laws actually do, avoid overselling drama
- **Balanced Urgency**: Create appropriate urgency without fear-mongering or hyperbole
- **Natural Conclusion**: End with standard contact line only, no hard-coded CTAs or "what's next" references
- **No Emojis**: Keep content professional and text-based, avoid emojis by default

### Content Length

- **Target**: 2,000-4,000 words for comprehensive coverage
- **Sections**: 8-10 main H2 sections for optimal audio division
- **Paragraphs**: 3-5 sentences each for readability
- **Lists**: Use for easy scanning of complex information
- **Audio Consideration**: Each H2 section should be substantial enough for 1.5-2 minute audio segments

## Custom MDX Components

Our blog system includes specialized components for legal content:

### Content Callouts

```jsx
<LegalHighlight>
Key legal points that require special attention
</LegalHighlight>

<CaseAlert>
Important case information or urgent alerts
</CaseAlert>

<PracticalTip>
Actionable advice for readers
</PracticalTip>

<DefenseStrategy>
Strategic insights for defense approaches
</DefenseStrategy>

<QuestionAnswer 
  question="What should I do if the FBI contacts me about cybercrime?"
  answer="Immediately contact an experienced federal professional services professional. Do not speak to agents without legal representation present. The FBI's contact means you're likely a target, not just a witness."
/>
```

### Visual Examples

**IMPORTANT: Use callout components sparingly and only when they truly embellish the story or provide unique value. Do not force content into callouts just to add visual elements.**

- **LegalHighlight**: Yellow highlight box with scales icon - Use for key legal principles or statute explanations that need emphasis
- **CaseAlert**: Red alert box with warning icon - Use ONLY for actual case developments, urgent legal alerts, or breaking news
- **PracticalTip**: Blue tip box with lightbulb icon - Use for actionable advice that goes beyond the main content
- **DefenseStrategy**: Green strategy box with shield icon - Use for specific strategic insights or tactical approaches
- **QuestionAnswer**: Purple Q&A box with question mark icon - Use for searchable legal questions that naturally arise in content flow

### Callout Component Guidelines

**When TO Use Callouts:**
- **Actual case alerts** - Breaking legal news, recent court decisions, or urgent developments
- **Unique insights** - Information that adds value beyond the main narrative
- **Actionable advice** - Specific steps readers can take that aren't covered in regular content
- **Key legal principles** - Complex statutes or legal concepts that need special emphasis
- **Strategic approaches** - Specific defense tactics or legal strategies

**When NOT to Use Callouts:**
- **Restating main content** - Don't repeat information that's already clearly explained
- **General statements** - Avoid using callouts for broad observations or commentary
- **Filler content** - Don't add callouts just to break up text or add visual interest
- **Obvious information** - Don't highlight facts that are already emphasized in the narrative
- **Redundant emphasis** - If the content is already strong, don't weaken it with unnecessary callouts

### Image Components

```jsx
<FullWidthImage 
  src="/img/blog/blog-slug/hero-image.jpg"
  alt="Descriptive alt text"
  caption="Optional caption text"
/>

// For ACTUAL QUOTES only
<ImageQuote 
  src="/img/blog/blog-slug/legal-docs.jpg"
  alt="Descriptive alt text"
  quote="Actual quote from a person or document"
  attribution="Person Name, Title or Document Name"
/>

<ImageRight 
  src="/img/blog/blog-slug/enforcement.jpg"
  alt="Descriptive alt text"
  quote="Actual quote from a person or document"
  attribution="Person Name, Title"
/>

// For EDITORIAL CONTENT (not quotes)
<ImageText 
  src="/img/blog/blog-slug/detail-shot.jpg"
  alt="Descriptive alt text"
  text="Editorial content or explanation"
  attribution="Optional source reference"
/>

<ImageTextRight 
  src="/img/blog/blog-slug/enforcement.jpg"
  alt="Descriptive alt text"
  text="Editorial content with image on right"
  attribution="Optional source reference"
/>
```

### Image Placeholder Workflow

**Step 1: Create Blog with Placeholders**
When creating a new blog post, use descriptive placeholder paths:

```jsx
<FullWidthImage 
  src="/img/blog/[slug]/hero-image.jpg"
  alt="[Descriptive alt text for main image]"
  caption="[Caption describing the image context]"
/>

<ImageText 
  src="/img/blog/[slug]/detail-shot.jpg"
  alt="[Alt text for detail image]"
  text="[Editorial content that relates to the image]"
/>

<ImageTextRight 
  src="/img/blog/[slug]/image-1.jpg"
  alt="[Alt text for enforcement image]"
  text="[Content about law enforcement aspects]"
/>

<ImageQuote 
  src="/img/blog/[slug]/image-2.jpg"
  alt="[Alt text for legal documents]"
  quote="[Actual quote from person or document]"
  attribution="[Source of the quote]"
/>

<FullWidthImage 
  src="/img/blog/[slug]/image-3.jpg"
  alt="[Alt text for professional image]"
  caption="[Caption about legal representation]"
/>
```

**Step 2: Image Upload and Distribution**
1. Create folder: `/public/img/blog/[actual-slug]/`
2. User uploads images with descriptive names matching placeholders
3. Assistant updates all placeholder paths to match uploaded image names
4. Images are automatically distributed based on filename matching

### Quote Component Usage Guidelines

**IMPORTANT: Reserve quote components for actual quotes only**

- **Use `<ImageQuote>` and `<ImageRight>`** only when you have a real quote from a person, document, or official source
- **Use `<FullWidthImage>`** for editorial content, explanations, or paraphrased information
- **Attribution is required** for all quote components - must cite the actual source of the quote
- **Editorial content** should use captions, not quotes

**Examples:**

✅ **Correct Quote Usage:**
```jsx
<ImageQuote 
  quote="In this enforcement environment, waiting until after charges are filed is like trying to build a dam after the flood has started."
  attribution="Your Team Lead, Principal Professional"
/>
```

❌ **Incorrect Quote Usage:**
```jsx
<ImageQuote 
  quote="The DOJ has made those deals much harder to come by."
  attribution="DOJ White Collar Crime Strategy Memo, May 2025"
/>
```
*This is editorial paraphrasing, not a direct quote*

✅ **Correct Alternative:**
```jsx
<FullWidthImage 
  caption="Federal prosecutors have significantly reduced plea deal availability according to the DOJ's 2025 enforcement strategy."
/>
```

### QuestionAnswer Component Strategy

The QuestionAnswer component integrates seamlessly into blog content to provide SEO benefits while maintaining natural flow:

**Strategic Usage:**
- **Target Search Queries**: Use questions that people actually search for ("What should I do if...", "How long does...", "What happens when...")
- **Natural Integration**: Place Q&As where questions would naturally arise in the content flow
- **Immediate Action Focus**: Prioritize questions about urgent situations or next steps
- **Keyword Optimization**: Include location-specific and practice area keywords in questions

**Question Types to Include:**
- **Immediate Action**: "What should I do if the FBI contacts me?"
- **Process Questions**: "How long do federal investigations take?"
- **Consequence Questions**: "What are the penalties for cybercrime?"
- **Timeline Questions**: "When should I hire a professional services professional?"
- **Jurisdiction Questions**: "Can I be charged federally and at the state level?"

**Answer Guidelines:**
- **50-150 words** for optimal rich snippet length
- **Direct, actionable advice** without legal disclaimers
- **Include urgency** when appropriate for professional services situations
- **End with contact encouragement** when relevant to the question

**SEO Benefits:**
- **Rich Snippets**: FAQ schema markup for search result features
- **Voice Search**: Direct answers for AI assistants and voice queries
- **Featured Snippets**: Position zero opportunities for specific questions
- **Long-tail Keywords**: Target specific search phrases people use

**Example Implementation:**
```jsx
// After explaining FBI investigation process
<QuestionAnswer 
  question="Should I talk to FBI agents without a lawyer present?"
  answer="Never speak to FBI agents without an professional present. Anything you say can be used against you, even if you believe you're innocent. Exercise your right to remain silent and request legal representation immediately."
/>
```

### Call-to-Action Component

**Important: Do not use CallToAction components within blog content.** While the component exists in the system, it should not be used in blog posts. Blogs should end naturally with content and only include the standard contact line: "If you or your loved ones have been arrested... call Your Team Lead, 24 hours a day to get help."

## Audio Integration

### Audio Script Creation

1. **Create companion .txt file** in `/content/scripts/` directory
2. **Convert MDX to natural language** removing all component syntax
3. **Divide by H2 sections** using `---` separators
4. **Include section titles** for natural audio flow

### Script Format Example

```text
Title of the Blog Post

Brief introduction and overview content before first H2 section.

---

First H2 Section Title

Content for the first main section, converted to natural language.

---

Second H2 Section Title

Content for the second section, maintaining legal accuracy.

---
```

### Audio Generation Process

1. **Text-to-Speech**: Use ElevenLabs with Matthew Angelo voice (voice ID: `dmCLGygDdYCfuLYTkfjl`)
2. **Voice Settings**: Speed 1.15, Stability 0.4, Similarity Boost 0.8, Speaker Boost enabled
3. **File Upload**: Automatic upload to Supabase storage via `/api/upload-audio` endpoint
4. **URL Integration**: Add audio URLs to frontmatter with descriptive titles and descriptions
5. **Player Integration**: Automatic rendering in blog layout (mobile below title, desktop sidebar)

### Audio Generation Workflow

1. **Section Division**: Each H2 section becomes a separate audio part
2. **Naming Convention**: `[slug]-part[number]-[section-slug].mp3`
3. **Upload Process**: Use localhost:3000/api/upload-audio with proper file paths
4. **Frontmatter Update**: Add complete audio metadata with all part URLs and descriptions

## Writing Best Practices

### Legal Content Standards

- **Accuracy First**: Verify all legal information and citations
- **Current Information**: Ensure laws and cases are up-to-date
- **Practical Application**: Include real-world implications
- **Client Perspective**: Address common concerns and questions
- **Direct Explanation**: Be clear about what laws actually do rather than overselling drama
- **Balanced Tone**: Maintain appropriate urgency without hyperbole

### Content Structure Best Practices

- **"Old Rule vs New Rule" Format**: Use for legal changes to clearly explain differences
- **Early Clarity**: Explain key changes in the introduction, don't wait until later sections
- **Effective Date Information**: Always include when new laws take effect
- **Concrete Examples**: Provide specific scenarios showing how penalties work
- **Quote Integrity**: Only use quote components for actual quotes from people or documents, not editorial content

### SEO Optimization

- **Title Optimization**: Include primary keywords naturally
- **Excerpt Quality**: Compelling summary under 160 characters
- **Header Structure**: Use H2-H4 for proper content hierarchy
- **Internal Linking**: Link to relevant practice areas and contact pages
- **External Links**: All external links must use `target="_blank" rel="noopener noreferrer"` to open in new tabs

### Engagement Strategies

- **Strong Opening**: Hook readers immediately with compelling statements
- **Direct Communication**: "Spill the beans" early - explain what laws actually do
- **Scannable Format**: Use lists, callouts, and short paragraphs
- **Expert Positioning**: Demonstrate your company's expertise throughout
- **Strategic Components**: Use 2-4 callout components per major section
- **Visual Balance**: Include 1-2 images per 1000 words for engagement

### Content Flow

1. **Compelling Introduction**: Establish urgency or importance, "spill the beans" about what the law actually does
2. **Clear Explanation**: Define exactly what the law changes (old rule vs new rule format)
3. **Practical Impact**: Real-world scenarios and consequences
4. **Legal Analysis**: Provide detailed insights and context
5. **Defense Strategies**: Offer actionable advice and strategic approaches
6. **Company Positioning**: Demonstrate your company's capabilities and expertise
7. **Natural Conclusion**: End with standard contact line only

### Excerpt Guidelines

- **Be Direct**: Focus on what the law actually does, not hyperbolic language
- **Explain Mechanism**: "penalties that mirror the severity of your original charges"
- **Avoid Clickbait**: Use measured, professional language that accurately describes legal changes
- **Stay Under 160 Characters**: For optimal SEO and preview display

## Publishing Workflow

### Pre-Publication Checklist

- [ ] Frontmatter complete and accurate
- [ ] Slug matches filename
- [ ] All required fields present
- [ ] Custom components used appropriately
- [ ] Image folder created: `/public/img/blog/[slug]/`
- [ ] Images uploaded with descriptive names
- [ ] Image placeholders updated with actual filenames
- [ ] Legal information verified
- [ ] Grammar and spelling checked
- [ ] Natural conclusion with standard contact line only

### Image Integration Workflow

**Step 1: Blog Creation**
- Create blog post with descriptive image placeholders
- Use standard naming convention: `/img/blog/[slug]/[image-type].jpg`
- Include appropriate alt text and captions for each placeholder

**Step 2: Folder Creation**
- Create folder: `/public/img/blog/[slug]/`
- Folder name must match blog slug exactly

**Step 3: Image Upload**
- Upload images to the created folder
- Images should be named descriptively to match intended placement:
  - `hero-image.jpg` - Main opening image
  - `detail-shot.jpg` - Close-up or detail image  
  - `image-1.jpg`, `image-2.jpg` - Additional images as needed
  - Use descriptive names for your specific content

**Step 4: Image Distribution**
- Assistant updates all placeholder paths to match uploaded filenames
- Match images based on descriptive names to appropriate components
- Verify all images load correctly and alt text is appropriate

### Audio Integration Checklist

- [ ] Script file created with proper formatting (using `---` separators)
- [ ] Audio generated for each H2 section using ElevenLabs MCP
- [ ] Files uploaded to Supabase storage via localhost:3000/api/upload-audio
- [ ] URLs added to frontmatter with descriptive titles and descriptions
- [ ] Audio player tested on mobile and desktop
- [ ] Total duration estimated and included in frontmatter

### Complete Audio Generation Example

```bash
# Generate audio for each section
mcp_ElevenLabs_text_to_speech with voice_id: dmCLGygDdYCfuLYTkfjl

# Upload each file
curl -X POST http://localhost:3000/api/upload-audio \
  -H "Content-Type: application/json" \
  -d '{"filePath": "/path/to/file.mp3", "fileName": "slug-part1-section.mp3", "deleteAfterUpload": true}'

# Update frontmatter with all URLs and metadata
```

### Testing Steps

1. **Local Development**: Test rendering in development environment
2. **Content Review**: Verify all components display correctly
3. **Audio Functionality**: Test audio player on multiple devices
4. **Mobile Responsiveness**: Ensure proper mobile layout
5. **SEO Elements**: Verify meta tags and descriptions

### Deployment

1. **Commit Changes**: Add MDX file and any assets to git
2. **Push to Repository**: Deploy through version control
3. **Verify Live Site**: Test all functionality on production
4. **Monitor Performance**: Check loading times and user engagement

## Common Patterns and Examples

### Typical Blog Structure

```markdown
---
# Frontmatter here
---

Opening hook paragraph with compelling statement or urgent scenario.

<CaseAlert>
Important alert or context for readers
</CaseAlert>

Introduction content explaining the scope and importance of the topic.

<FullWidthImage src="/img/blog/topic/hero-image.jpg" alt="Relevant scene" />

## Main Section One

Detailed analysis of the first major topic point.

<LegalHighlight>
Key legal principle or statute explanation
</LegalHighlight>

### Subsection

More specific information under the main section.

<QuestionAnswer 
  question="What should I do if I receive a federal target letter?"
  answer="A target letter means you're likely to be indicted. Contact a federal professional services professional immediately - you typically have limited time to respond strategically before charges are filed."
/>

<PracticalTip>
Actionable advice for readers
</PracticalTip>

## Main Section Two

Continue with additional major points.

<DefenseStrategy>
Strategic legal advice or approach
</DefenseStrategy>

<ImageQuote 
  src="/img/blog/topic/relevant-image.jpg"
  quote="Important insight or legal principle"
  attribution="Legal source or case"
/>

## Conclusion

Summary of key points ending with natural content flow.

If you or your loved ones have been arrested... call Your Team Lead, 24 hours a day to get help.
```

### Component Usage Guidelines

- **Use callout components selectively** - Only when they add genuine value, not for visual filler
- **Quality over quantity** - Better to have 1-2 meaningful callouts than 4-5 redundant ones
- **Include 1-2 images** per 1000 words with proper alt text and captions
- **Strategic Q&A placement** - Use QuestionAnswer components for searchable legal questions that naturally arise in the content
- **Let strong content stand alone** - Don't weaken powerful narrative with unnecessary callouts
- **End naturally with content** and standard contact line only
- **No CallToAction components** - while the component exists, it should not be used in blog content
- **No hard-coded series references** - avoid "Up Next" or "What's Next" sections
- **Balance text and visual elements** for optimal readability and engagement

## Style Guidelines

### Tone and Voice

- **Authoritative**: Demonstrate deep legal expertise
- **Accessible**: Explain complex concepts clearly
- **Client-Focused**: Address reader concerns directly
- **Professional**: Maintain appropriate legal gravitas
- **Compelling**: Create urgency without fear-mongering

### Formatting Standards

- **Consistent Headings**: Use sentence case for H2, H3
- **Bullet Points**: Use hyphens (-) for lists
- **Emphasis**: Use **bold** for key terms, *italics* for case names
- **Numbers**: Spell out numbers under ten, use numerals for 10+
- **Legal Citations**: Include proper case citations and statute references
- **External Links**: Use HTML anchor tags with `target="_blank" rel="noopener noreferrer"` for all external links

### External Link Format

All external links must use this format:
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link Text</a>
```

**Why this format:**
- `target="_blank"` opens links in new tabs to keep users on the site
- `rel="noopener noreferrer"` provides security and privacy protection
- HTML format is required because MDX doesn't support target attributes in markdown links

## Troubleshooting

### Common Issues

1. **Frontmatter Errors**: Ensure proper YAML syntax
2. **Component Rendering**: Verify component names and props
3. **Image Loading**: Check file paths and image optimization
4. **Audio Issues**: Verify Supabase URLs and file accessibility
5. **Slug Conflicts**: Ensure unique slugs across all posts

### Development Help

- **Local Testing**: Run `npm run dev` to test locally
- **Build Verification**: Run `npm run build` to check for errors
- **Component Documentation**: Reference `/components/mdx-components.tsx`
- **Audio Process**: Follow `/docs/audio/mdx-to-audio-process.md`

## Maintenance

### Regular Updates

- **Legal Accuracy**: Review content quarterly for law changes
- **Link Verification**: Check external links and references
- **Audio Quality**: Ensure audio files remain accessible
- **Performance**: Monitor page load times and optimize as needed

### Version Control

- **Git Commits**: Use descriptive commit messages
- **Branch Strategy**: Create feature branches for major updates
- **Backup Strategy**: Maintain regular backups of content
- **Change Tracking**: Document significant content updates

This guide ensures consistency, quality, and effectiveness across all Your Company Name blog content while maintaining the firm's professional standards and client-focused approach.
