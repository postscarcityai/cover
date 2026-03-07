# MDX to Audio Generation Process

## Overview

This document outlines the comprehensive process for converting MDX blog posts into structured, high-quality audio narrations using ElevenLabs text-to-speech technology, automatic Supabase storage, and integrated audio players.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Text Preparation](#text-preparation)
3. [Audio Generation](#audio-generation)
4. [Storage & Upload](#storage--upload)
5. [Frontend Integration](#frontend-integration)
6. [Script Structure Guidelines](#script-structure-guidelines)
7. [Technical Implementation](#technical-implementation)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools & Services

- **ElevenLabs MCP**: Text-to-speech API with unrestricted access
- **Supabase**: Storage bucket for audio files with public read access
- **Next.js API Routes**: For automated file upload
- **MDX Blog System**: With frontmatter support

### Environment Setup

```bash
# Environment variables required
ELEVENLABS_API_KEY=<unrestricted-api-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

### Voice Configuration

- **Voice ID**: `dmCLGygDdYCfuLYTkfjl` (Matthew Angelo)
- **Model**: `eleven_multilingual_v2`
- **Speed**: 1.15
- **Stability**: 0.4
- **Similarity Boost**: 0.8
- **Style**: 0
- **Speaker Boost**: Enabled

## Text Preparation

### Step 1: Convert MDX to Natural Language

1. Create a `.txt` version of the MDX file with the same base filename
2. Remove all MDX-specific syntax:
   - Remove component tags (`<LegalHighlight>`, `<DefenseStrategy>`, etc.)
   - Convert markdown formatting to natural language
   - Remove image references and captions
   - Preserve the essential content and structure

### Step 2: Structure Division with H2 Headers

Divide the content into logical sections based on H2 headers, with each section including:

1. **Part 1**: Introduction (from start until first H2)
2. **Part 2+**: Each H2 section as a separate part

### Step 3: Script Separation Format

Use three hyphens (`---`) to separate each section:

```text
[Introduction content from start to first H2]

---

[H2 Title]

[H2 content]

---

[Next H2 Title]

[Next H2 content]

---

[Continue for all H2 sections...]
```

## Script Structure Guidelines

### Content Inclusion Rules

#### First Part (Introduction)
- Include the main title/H1
- Include subtitle/description
- Include all introductory content before the first H2
- End before the first H2 header

#### Subsequent Parts (H2 Sections)
- **Start with the H2 title being read aloud**
- Include all content under that H2 section
- Include any H3 subsections
- Include all body content, lists, and quotes
- End before the next H2 section

#### Example Structure:
```text
Federal Gun and Drug Indictments in the Southern District of Florida.

A comprehensive legal overview of the Department of Justice's most aggressive enforcement trends in the Southern District of Florida.

[Introduction content...]

---

Firearms Trafficking Networks in South Florida

Major Multi-Agency Bust

[Section content...]

---

Armed Drug Trafficking and Violent Street Gangs

[Section content...]
```

### Content Processing Guidelines

- **Natural Language**: Convert all text to flow naturally when spoken
- **Remove Visual Elements**: Strip out image references, captions, and visual formatting
- **Preserve Legal Terms**: Maintain accuracy of legal terminology and case names
- **Include Context**: Ensure each section is self-contained and contextual

## Audio Generation

### Step 1: ElevenLabs Text-to-Speech

For each separated section:

```typescript
await mcp_ElevenLabs_text_to_speech({
  text: sectionText,
  voice_id: "dmCLGygDdYCfuLYTkfjl",
  model_id: "eleven_multilingual_v2",
  speed: 1.15,
  stability: 0.4,
  similarity_boost: 0.8,
  style: 0,
  use_speaker_boost: true,
  output_directory: "/Users/[username]/Desktop"
});
```

### Step 2: File Naming Convention

Generated files follow this pattern:
- `[article-slug]-part[number]-[section-slug].mp3`
- Example: `federal-gun-drug-part1-introduction.mp3`

## Storage & Upload

### Automatic Upload Process

Each generated audio file is automatically uploaded to Supabase using the custom API route:

```bash
curl -X POST http://localhost:3000/api/upload-audio \
  -H "Content-Type: application/json" \
  -d '{
    "filePath": "/path/to/audio.mp3",
    "fileName": "article-part1-section.mp3",
    "deleteAfterUpload": true
  }'
```

### Storage Configuration

- **Bucket**: `audio-files`
- **Access**: Public read, admin-only delete
- **URL Pattern**: `https://[project].supabase.co/storage/v1/object/public/audio-files/[filename]`

## Frontend Integration

### MDX Frontmatter Structure

Update the blog post frontmatter with audio metadata:

```yaml
---
title: "Blog Post Title"
# ... other frontmatter
audio:
  narrator: "Matthew Angelo"
  totalDuration: "15 min"
  parts:
    - title: "Introduction"
      url: "https://[supabase-url]/audio-files/part1-introduction.mp3"
      description: "Overview and introduction to the topic"
    - title: "Section Title"
      url: "https://[supabase-url]/audio-files/part2-section.mp3"
      description: "Description of section content"
    # ... continue for all parts
---
```

### Audio Player Component

The `AudioPlayer` component automatically:
- Displays all audio parts
- Provides playback controls
- Shows on mobile below title, sidebar on desktop
- Allows navigation between sections

## Technical Implementation

### File Structure

```
/docs/audio/                          # Documentation
/app/api/upload-audio/route.ts         # Upload API route
/lib/audio-upload.ts                   # Upload utility
/components/audio-player.tsx           # React audio player
/content/blog/[article].mdx            # Blog post with audio metadata
/content/blog/[article].txt            # Natural language script
```

### Key Components

1. **API Route** (`/app/api/upload-audio/route.ts`):
   - Handles file upload to Supabase
   - Returns public URL
   - Optionally deletes local file

2. **Audio Player** (`/components/audio-player.tsx`):
   - React component for audio playback
   - Responsive design (mobile/desktop)
   - Part navigation and controls

3. **Blog Integration** (`/lib/blog.ts`):
   - Parses audio metadata from frontmatter
   - Provides type definitions for audio data

### Workflow Automation

1. **Text Preparation**: Manual conversion of MDX to natural language with `---` separators
2. **Audio Generation**: ElevenLabs MCP calls for each section
3. **Upload**: Automatic upload via API route to Supabase
4. **Integration**: Update MDX frontmatter with audio URLs and metadata
5. **Testing**: Verify audio player functionality on both mobile and desktop

## Quality Guidelines

### Audio Quality Standards

- **Consistent Voice**: Use same voice (Matthew Angelo) across all parts
- **Appropriate Pacing**: Speed 1.15 for natural, professional delivery
- **Clear Articulation**: Stability 0.4 for clear pronunciation
- **Natural Flow**: Process text to read naturally when spoken aloud

### Content Standards

- **Accuracy**: Maintain legal and factual accuracy
- **Completeness**: Each section should be self-contained
- **Accessibility**: Include section titles for easy navigation
- **Professional Tone**: Maintain appropriate tone for legal content

## Troubleshooting

### Common Issues

1. **ElevenLabs API Errors**:
   - Verify API key has unrestricted access
   - Check credit balance
   - Ensure text length is under 10,000 characters per request

2. **Supabase Upload Failures**:
   - Verify service role key is correct
   - Check bucket permissions
   - Ensure file paths are absolute

3. **Audio Player Issues**:
   - Verify all URLs are publicly accessible
   - Check MDX frontmatter syntax
   - Ensure component props match interface

### Testing Checklist

- [ ] All audio files upload successfully
- [ ] Public URLs are accessible
- [ ] Audio player displays correctly on mobile and desktop
- [ ] All sections are properly titled and described
- [ ] Playback controls work properly
- [ ] Section navigation functions correctly

## Best Practices

1. **Content Review**: Always review generated text for natural flow before audio generation
2. **Section Logic**: Ensure sections are logically divided and appropriately sized
3. **Metadata Accuracy**: Double-check all URLs and descriptions in frontmatter
4. **User Experience**: Test audio player on multiple devices and screen sizes
5. **Performance**: Monitor file sizes and loading times for optimal user experience

## Future Enhancements

- **Batch Processing**: Automate the entire pipeline for multiple articles
- **Voice Selection**: Allow dynamic voice selection per article or section
- **Progress Tracking**: Add visual progress indicators for long audio sections
- **Transcription Sync**: Highlight text as audio plays
- **Download Options**: Allow users to download audio files for offline listening
