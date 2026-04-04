# AMC Defense Law | Repo Research Brief

Generated: 2026-04-04 01:18 America/New_York  
Repo reviewed: `/Users/urzas/dev/amc`  
Purpose: source brief for the AMC Defense Law case study rewrite

## Executive summary

AMC Defense Law is a custom Next.js legal publishing system built for search, authority, and conversion. The repo is much more than a law firm brochure site. It combines App Router, filesystem-backed MDX content, a structured practice-area architecture, a large Justice Watch editorial system, narrated blog audio, AI image generation, a multi-step consultation funnel, typed case results, and direct Google Search Console tooling.

The core pattern is clear in the source: publish high-intent legal content, connect it to practice pages and proof points, then route visitors into consultation intake.

## 1. Tech stack

### Core framework

From `package.json` and `next.config.mjs`:

- **Next.js 14.2.35**
- **React 18**
- **TypeScript 5**
- **App Router** under `app/`
- **MDX support** via `@next/mdx` and `pageExtensions` including `mdx`
- **Tailwind CSS 3.4.17**
- **Framer Motion** for transitions and page animation
- **Radix UI** primitives across the design system

`next.config.mjs` also shows:

- MDX wired directly into the Next config
- image optimization with remote patterns for `amcdefenselaw.com`
- a large redirect map for attorney pages and legacy practice-area URLs
- build configured to ignore ESLint and TypeScript errors during production builds

### Content architecture

This repo uses the filesystem as the CMS.

- Blog posts live in `content/blog/*.mdx`
- Practice areas live in `content/practice-areas/*.mdx`
- Blog parsing is handled in `lib/blog.ts`
- Practice-area parsing is handled in `lib/practice-areas.ts`
- Practice-area pages render MDX with `next-mdx-remote/rsc`
- Custom editorial components live in `components/mdx-components.tsx`

`lib/blog.ts` parses frontmatter with `gray-matter`, extracts the first inline image from the MDX body for cards, filters drafts and future posts outside development, and sorts by publish date descending.

### Key dependencies

The important dependencies in `package.json` are:

- `next`
- `react`
- `react-dom`
- `typescript`
- `tailwindcss`
- `gray-matter`
- `@next/mdx`
- `next-mdx-remote`
- `@fal-ai/client`
- `@supabase/supabase-js`
- `@sendgrid/mail`
- `@googleapis/webmasters`
- `google-auth-library`
- `react-hook-form`
- `zod`
- `react-floating-whatsapp`

### AI and service integrations

The repo has several live service integrations:

- **FAL AI** for image generation and TTS
- **Supabase** for storage and lead persistence
- **SendGrid** for intake notifications
- **Google Search Console API** for direct search reporting

### Scripts that matter

From `package.json` and `scripts/`:

- `gsc:setup`
- `gsc:setup:manual`
- `gsc:dump`
- `gsc:sites`
- `gsc:export`
- `generate-blog-images.mjs`
- `generate-og-images.mjs`
- `generate-practice-area-images.mjs`
- `gen-audio-direct.mjs`
- `knockout-white-bg.mjs`

This is a production repo with content-ops tooling inside the codebase, not just app code.

## 2. Justice Watch blog

### How posts work

Justice Watch is a filesystem-driven MDX publication.

Key files:

- `lib/blog.ts`
- `app/justice-watch/page.tsx`
- `app/justice-watch/[slug]/page.tsx`
- `app/justice-watch/[slug]/client.tsx`

The listing route reads post metadata from `content/blog`. The article route renders the MDX body and wraps it in a custom editorial layout with author bios, CTAs, and audio.

### Post format

A typical post, like `content/blog/bank-impersonation-scam-charges-florida.mdx`, uses frontmatter fields such as:

- `title`
- `excerpt`
- `author`
- `coAuthors`
- `date`
- `dateModified`
- `readTime`
- `category`
- `featured`
- `status`
- `audio`
- `practiceAreas`
- `keywords`

The MDX body uses custom components rather than plain markdown only. Examples visible in content and component code include image blocks, callouts, Q&A sections, legal highlights, and defense strategy inserts.

### Justice Watch article UX

`app/justice-watch/[slug]/client.tsx` shows the intended product shape:

- editorial article header with category, date, read time, and author
- large serif headline
- share controls
- mobile audio player below the title
- sticky desktop audio player in the sidebar
- consultation CTA in the sidebar
- author and co-author profile block at the bottom
- analytics hooks for page tracking and scroll tracking

This is designed to rank, hold attention, and convert.

### Total post count

Current repo counts:

- **35 Justice Watch posts** in `content/blog`
- **30 posts with audio frontmatter**

That makes Justice Watch a substantial content asset, not a side section.

### Audio narration system

There are two different audio stories in the repo.

#### 1. The documented workflow still says ElevenLabs

`docs/blog-instructions/mdx-to-audio-process.md` documents an ElevenLabs workflow with:

- voice ID `dmCLGygDdYCfuLYTkfjl`
- Matthew Angelo voice
- multilingual model
- speed and stability settings
- MDX-to-text conversion
- section splitting by H2
- upload to Supabase
- frontmatter wiring into the post

#### 2. The implemented code now uses FAL TTS

The actual code path in the repo is different:

- `app/api/tts/route.ts`
- `scripts/gen-audio-direct.mjs`

`app/api/tts/route.ts` uses `fal-ai/index-tts-2/text-to-speech`, uploads generated audio into the Supabase `audio-files` bucket, and returns the final audio URLs. That means the docs lag the implementation.

#### Audio player implementation

`components/audio-player.tsx` is a real product component, not a plain HTML audio tag. It supports:

- chapter list
- play and pause
- part skipping
- progress scrubbing
- volume control
- analytics for play, part completion, and full-series completion

Blog posts expose audio through frontmatter fields like `narrator`, `totalDuration`, and `parts[]`.

### AI imagery approach

Justice Watch imagery is heavily AI-assisted and visually controlled.

Key files:

- `app/api/flux-lora/route.ts`
- `app/api/nano-banana/route.ts`
- `scripts/generate-blog-images.mjs`

The image prompts in `generate-blog-images.mjs` are detailed and style-locked. They specify:

- character appearance
- lighting
- scene composition
- props
- mood
- palette
- exact number of visible people

The visual language is consistent across prompts:

- noir
- cinematic
- comic-book realism
- high-contrast chiaroscuro
- limited palette with controlled accent colors

`app/api/flux-lora/route.ts` also hardcodes LoRA defaults tied to a comic and retro-hero look. The repo is clearly aiming for a repeatable branded AI art system, not generic stock replacement.

## 3. Morning Intel Report

### What is in the repo

Inside `~/dev/amc`, I found:

- GSC setup and export scripts
- image generation scripts
- audio generation scripts
- content and SEO infrastructure

I did **not** find the DoJ/FBI morning briefing automation inside the repo itself.

### What is not in the repo

The repo does not appear to contain the upstream automation that:

- fetches DoJ press releases
- fetches FBI press releases
- filters stories into a daily briefing
- emails the report

### Verified external script

The Morning Intel script does exist, but outside this repo:

- `~/.openclaw/workspace/amc-defense/morning_report.py`

That script:

- pulls DoJ and FBI related intelligence sources
- scores and filters criminal enforcement items by action type, district, and case type
- builds HTML and text digest output
- sends the report via SendGrid to `amc@amcdefenselaw.com`, CC `chris@postscarcity.ai`

So the accurate repo-level takeaway is:

> The AMC site repo contains the public-facing content stack and SEO tooling, but the Morning Intel automation lives outside the site repo in the AMC operations workspace.

That distinction matters for the case study. It keeps the writeup honest while still showing the broader system around the site.

## 4. Practice areas

### Dynamic route architecture

Practice areas are MDX-backed dynamic routes.

Key files:

- `lib/practice-areas.ts`
- `app/practice-areas/[slug]/page.tsx`
- `app/practice-areas/components/PracticeAreaTemplate.tsx`

`lib/practice-areas.ts` reads each MDX file and extracts structured frontmatter fields including:

- `title`
- `shortTitle`
- `metaTitle`
- `metaDescription`
- `keywords`
- `localKeywords`
- `excerpt`
- `category`
- `statutes`
- `maxPenalty`
- `relatedArticles`
- `relatedResultIds`
- `faqItems`
- `heroImage`

`app/practice-areas/[slug]/page.tsx` then:

- statically generates params from those files
- creates SEO metadata per page
- resolves related Justice Watch posts
- resolves related case results
- injects JSON-LD for breadcrumb, legal service, and FAQ schema
- renders the MDX content into the page template

### Practice area count

There are **17 practice-area MDX files**:

1. `drug-trafficking.mdx`
2. `dui-traffic.mdx`
3. `federal-cybercrime.mdx`
4. `felonies.mdx`
5. `healthcare-fraud.mdx`
6. `human-trafficking.mdx`
7. `identity-theft.mdx`
8. `immigration-defense.mdx`
9. `money-laundering.mdx`
10. `mortgage-fraud.mdx`
11. `public-corruption.mdx`
12. `rico.mdx`
13. `sex-offenses.mdx`
14. `tax-fraud.mdx`
15. `violent-crimes.mdx`
16. `weapons-and-firearms.mdx`
17. `wire-fraud.mdx`

### Page structure

`PracticeAreaTemplate.tsx` shows a consistent structure:

1. Hero with breadcrumb, category, headline, excerpt, and hero image
2. Editorial MDX body
3. Sticky sidebar with max exposure, statutes, and consultation CTA
4. Related Results block
5. FAQ section
6. Justice Watch related articles block
7. Bottom CTA back into consultation flow

### SEO routing detail

`next.config.mjs` includes a large redirect map from old bare slugs and legacy practice-area URLs into the canonical `/practice-areas/[slug]` structure. That tells you this repo has already been through a cleanup and consolidation phase to protect search equity.

## 5. Design system

### Overall look

The repo has a tightly controlled legal luxury aesthetic. "Federal noir" is the right shorthand.

That look is enforced through:

- Tailwind tokens
- global CSS variables
- font pairing
- AI image prompt language

### Color system

From `tailwind.config.ts` and `app/globals.css`:

Primary branded colors include:

- `regal-navy`: `#2A2C53`
- `regal-navy.dark`: `#1e2040`
- `regal-navy.deep`: `#1e1f3d`
- `regal-navy.ink`: `#1a1b35`
- `soft-gray`: `#F4F4F2`
- `emergency-red`: `#C0362C`
- `purple-accent.600`: `#4A1F5C`
- `action-button`: warm gold-toned CTA color via CSS variables
- `warm-cream` and `home-hero-bg` for light editorial surfaces

The palette uses deep navy as the anchor, light cream and gray for breathing room, gold-toned buttons for premium contrast, red for danger or urgency, and purple as the dramatic secondary accent.

### Typography

From `tailwind.config.ts`:

- **Playfair Display** for headlines and major editorial moments
- **Montserrat** for body text and interface text
- **Optima** available as a supporting brand font

The pattern throughout the app is consistent:

- serif for authority and gravitas
- clean sans-serif for clarity and trust
- uppercase micro-labels for metadata and legal framing

### Image system as design system

The AI prompt layer carries the same brand logic as the CSS. Prompts repeat the same visual rules around lighting, palette, courtroom tension, and comic-noir realism. That means the art pipeline is part of the design system, not a separate gimmick.

## 6. Key features

### Attorney profiles

There are **6 attorney profile pages**:

- `app/aaron-cohen/page.tsx`
- `app/andrew-cove/page.tsx`
- `app/carlo-dangelo/page.tsx`
- `app/michael-hursey/page.tsx`
- `app/paul-molle/page.tsx`
- `app/attorneys/don-obert/page.tsx`

`lib/site-config.ts` also contains an author registry used by the blog with:

- attorney name
- profile URL
- image
- title
- short bio

That links editorial authority directly to attorney identity.

### Case results

Case results are stored as typed TypeScript data, not in MDX.

Key files:

- `app/results/data.ts`
- `app/results/page.tsx`
- `app/results/[id]/page.tsx`
- `app/results/lib.ts`

Current counts:

- **36 featured case results**
- **5 additional summary results**

The result entries carry structured legal fields such as charge, jurisdiction, exposure, strategy, and actual result. Practice-area pages can reference these results through `relatedResultIds`, which turns results into both proof and internal-linking assets.

### Consultation flow

The consultation flow is one of the strongest product features in the repo.

Key files:

- `app/free-consultation/client.tsx`
- `app/free-consultation/lib/questions.ts`
- `app/free-consultation/lib/schema.ts`
- `app/api/consultation/create/route.ts`
- `lib/supabase.ts`
- `lib/email.ts`

The funnel is a multi-step intake flow with steps for:

1. intro
2. contact info
3. legal matter type
4. arrest status
5. case location
6. contact role
7. current lawyer
8. urgency
9. confirmation

Important implementation details from the code:

- progress persists in localStorage
- a lead record is created early, at the contact step
- partial progress can be patched to the backend
- abandonment is tracked
- urgent leads are flagged
- SendGrid notifications are sent to the firm
- Supabase stores lead records and attribution data
- TCPA consent metadata is stored with timestamp, IP, and user agent
- UTM and GA identifiers are captured for attribution

This is a real intake system, not a basic contact form.

### Google Search Console optimization

The repo has direct GSC plumbing.

Key files:

- `lib/search-console.ts`
- `app/api/search-console/route.ts`
- `scripts/gsc-export.sh`
- `scripts/gsc-setup.sh`
- `scripts/gsc-setup-from-json.sh`

Capabilities in code include:

- daily performance data
- top pages
- top queries
- country breakdowns
- device breakdowns
- connected site listing

On-page SEO implementation also shows up across practice pages and posts:

- canonical URLs
- Open Graph metadata
- Twitter card metadata
- Breadcrumb schema
- FAQ schema
- LegalService schema
- frontmatter-driven keyword targeting
- local keyword support on practice-area pages
- internal links between blog posts, practice areas, and case results

## 7. Architectural pattern that matters most

The strongest system-level pattern in the repo is the authority loop:

**Justice Watch article -> practice area -> case result -> consultation funnel**

The code supports that loop directly:

- posts can reference practice areas
- practice areas can reference related articles
- practice areas can reference related result IDs
- attorney bios and author profiles reinforce credibility
- consultation CTAs appear throughout the experience

That is the real product story. The site is designed to turn legal content into measurable search traffic and qualified leads.

## 8. Important findings for the case study

### 1. This is a custom publishing stack

The repo combines:

- custom MDX content infrastructure
- custom legal content templates
- custom AI image generation flows
- custom narrated audio system
- custom intake funnel
- custom GSC reporting layer

That is a much stronger story than "we built a website."

### 2. Justice Watch is a real media product

With 35 posts and 30 audio-enabled articles, Justice Watch functions like a legal media publication built inside the firm site.

### 3. The visual brand is operationalized

The noir aesthetic is present in CSS tokens, type choices, page layouts, and image prompts. It is consistent because it is encoded in the system.

### 4. Morning Intel is part of the broader AMC system, but not this repo

The site repo does not house the DoJ/FBI morning briefing automation. That automation exists in the AMC workspace. The site repo houses the publishing and search side of the machine.

### 5. There is one clear implementation seam

The docs still describe ElevenLabs, while the code now uses FAL for TTS. That is a normal evolution artifact, but it is worth knowing.

### 6. There is a security cleanup item

`scripts/gen-audio-direct.mjs` reads `FAL_KEY` from `.env.local`. That is better than hardcoding in the script body, but this area still deserves routine secrets hygiene review because it is operational tooling inside the repo.

## 9. Best angle for the portfolio rewrite

Best framing:

### Core story

**Built a search-driven legal authority engine for a criminal defense firm**

### Proof points to pull forward

- Next.js App Router site with custom MDX publishing workflow
- 35 Justice Watch articles, 30 with narrated audio
- 17 structured practice-area pages with schema and internal linking
- 36 detailed case results plus 5 summary results
- Supabase-backed consultation funnel with attribution tracking
- direct Google Search Console integration and export tooling
- AI-assisted image pipeline tied to a federal noir visual identity

### Strong summary line

This project is strongest when positioned as **content operations, conversion architecture, and branded AI-assisted publishing inside one legal growth system**.

## Source files reviewed directly

Core stack and config:

- `package.json`
- `next.config.mjs`
- `tailwind.config.ts`
- `app/globals.css`
- `lib/site-config.ts`

Justice Watch:

- `lib/blog.ts`
- `app/justice-watch/page.tsx`
- `app/justice-watch/[slug]/page.tsx`
- `app/justice-watch/[slug]/client.tsx`
- `components/audio-player.tsx`
- `components/mdx-components.tsx`
- `content/blog/bank-impersonation-scam-charges-florida.mdx`

Audio and image generation:

- `app/api/tts/route.ts`
- `app/api/flux-lora/route.ts`
- `app/api/nano-banana/route.ts`
- `scripts/gen-audio-direct.mjs`
- `scripts/generate-blog-images.mjs`
- `docs/blog-instructions/mdx-to-audio-process.md`

Practice areas and results:

- `lib/practice-areas.ts`
- `app/practice-areas/[slug]/page.tsx`
- `app/practice-areas/components/PracticeAreaTemplate.tsx`
- `app/results/data.ts`
- `app/results/page.tsx`
- `app/results/[id]/page.tsx`
- `app/results/lib.ts`

Consultation and lead flow:

- `app/free-consultation/client.tsx`
- `app/api/consultation/create/route.ts`
- `lib/supabase.ts`
- `lib/email.ts`

GSC and SEO:

- `lib/search-console.ts`
- `app/api/search-console/route.ts`
- `scripts/gsc-export.sh`
- `scripts/gsc-setup.sh`
- `scripts/gsc-setup-from-json.sh`

External Morning Intel verification:

- `~/.openclaw/workspace/amc-defense/CONTEXT.md`
- `~/.openclaw/workspace/amc-defense/morning_report.py`

## Bottom line

AMC Defense Law is a sophisticated legal content platform built to publish fast, rank for high-intent criminal defense searches, reinforce trust with attorney authority and case results, and convert that traffic through a structured intake funnel. The repo shows a clear operating model: content drives search, search feeds consultation, and the brand system holds the whole thing together.
