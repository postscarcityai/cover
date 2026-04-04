# Vibe Jam repo deep dive

Repo: `~/dev/vibe-jam/`

## Executive summary

This repo started life as a polished marketing-site template and has been pushed far past template territory. It is now a Next.js 14 site for The Vibe Jam with four real product layers stacked together:

1. A public marketing site with a strong editorial knowledge base
2. A member auth flow with magic-link signup and profile management
3. A lightweight community layer with dashboard, profile, recurring-event subscription state, and event signup hooks
4. A serious internal admin system for content operations, social publishing, email distribution, connection management, and human records

The most impressive part is the blog. Chris is right to call it a great blog. It is not great because it is huge. It is great because it is consistent, specific, visually branded, and tightly connected to the product funnel. The posts teach, sell, and document real builds at the same time.

## 1. Tech stack

### Core stack

From `package.json`, `next.config.mjs`, `tailwind.config.ts`, `app/layout.tsx`, and surrounding app code:

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Content:** MDX via `@next/mdx` and `next-mdx-remote`
- **Styling:** Tailwind CSS 3 with custom theme variables
- **UI primitives:** Radix UI, shadcn-style component structure, Lucide icons
- **Animation:** Framer Motion and GSAP / ScrollTrigger
- **Auth + data:** Supabase
- **Email:** Twilio SendGrid through local wrapper in `lib/twilio-email.ts`
- **Analytics:** Google Analytics 4, Meta Pixel, Meta Conversions API helpers
- **Fonts:** Syne for general UI, GT Super Display for editorial display, Bricolage Grotesque for logo treatment via `lib/fonts.ts`

### Site configuration architecture

The repo is heavily config-driven:

- `site.config.ts` controls theme, metadata, nav, blog config, newsletter, SEO, social links, feature flags, and a lot of page copy.
- `theme.config.ts` defines several presets, but Vibe Jam runs on **`neoprint`**.
- `site.config.ts` maps the blog to `Knowledge` and changes the public base path from `/blog` to **`/knowledge`**.

### Auth system

Auth is real product logic, not just a login wrapper.

Key files:

- `lib/auth-context.tsx`
- `app/api/auth/magic-link/route.ts`
- `app/auth/callback/route.ts`
- `app/auth/callback-handler/page.tsx`
- `lib/supabase-client.ts`
- `app/api/profile/route.ts`

How it works:

- User enters first name, last name, and email on `/join`
- Frontend calls `sendMagicLink()` from `lib/auth-context.tsx`
- Backend route `app/api/auth/magic-link/route.ts`:
  - checks whether user already exists
  - generates a Supabase magic link through admin APIs
  - sends a **custom SendGrid email** instead of relying on the default Supabase email
  - personalizes subject line for first-time vs returning users
- `app/auth/callback-handler/page.tsx` verifies `token_hash` or legacy hash fragment tokens, sets session, and routes:
  - new users to `/auth/welcome`
  - returning users to `/dashboard`
- `app/api/profile/route.ts` reads and updates `tvj_user_profiles`

Bottom line: auth is **Supabase magic-link auth with custom email delivery and profile persistence**.

### Security and platform notes

`next.config.mjs` adds:

- CSP
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- aggressive static asset caching
- redirects from old `/blog` URLs to `/knowledge`

That is cleaner than most marketing repos.

## 2. Blog system

### Structure

Core files:

- `content/blog/*.mdx`
- `lib/blog.ts`
- `app/knowledge/page.tsx`
- `app/knowledge/client.tsx`
- `app/knowledge/[slug]/page.tsx`
- `app/knowledge/[slug]/client.tsx`

Blog content is file-based MDX. `lib/blog.ts` reads frontmatter from `content/blog`, sorts posts by date descending, filters future posts in production, and exposes:

- `getAllBlogPosts()`
- `getBlogPost()`
- `getFeaturedBlogPosts()`
- `getBlogPostsByCategory()`
- `getAdjacentBlogPosts()`

### Count and taxonomy

Current count from the repo:

- **33 total MDX posts**
- **7 featured posts**

Category breakdown:

- Real-World Builds: **9**
- The Future of Work: **9**
- Tools & Workflows: **7**
- What is Vibe Coding: **5**
- Getting Started: **2**
- Events: **1**

This is a useful mix. It balances:

- definition and beginner education
- tool explainers
- concrete case studies
- broader strategic worldview pieces

### Why the blog is good

After reading actual posts like:

- `what-is-vibe-coding.mdx`
- `your-first-vibe-coding-session.mdx`
- `the-agentic-os.mdx`
- `automating-blog-posts-from-client-calls.mdx`

Here is why it works.

#### 1. The editorial voice is sharp and consistent

The writing is simple, direct, and confident. It does not sound outsourced. It sounds like someone who actually builds with these tools.

Examples of recurring strengths:

- short declarative sentences
- simple analogies
- strong point of view
- practical examples instead of abstract hype

#### 2. The content ladder is smart

The library has clear stages:

- beginner entry points: "What is Vibe Coding?", "What is a Token?", "Your First Vibe Coding Session"
- tool and workflow pieces: Cursor, MCP servers, AI builders, prompt workflows
- worldview pieces: Agentic OS, UI tax, future-of-work arguments
- proof pieces: smoothie menu, lead gen engine, radio station, automated blog pipeline

That is strong content strategy. It captures beginners and keeps ambitious readers moving deeper.

#### 3. It is tightly integrated with product conversion

This is not a detached thought-leadership blog.

The posts repeatedly route readers toward:

- Vibe Check booking
- Vibe Jam sessions
- related knowledge posts
- Chris as trusted guide

The CTA behavior is built into the knowledge pages, not added as an afterthought.

#### 4. The schema and metadata are unusually mature

`app/knowledge/[slug]/page.tsx` and related schema utilities set up:

- article metadata
- breadcrumb schema
- FAQ schema when Q and A content is present
- audio-aware blog schema
- canonical URLs and OG / Twitter metadata

That means the blog is built for discoverability, not just publishing.

#### 5. The visual system reinforces the editorial system

Each post uses branded imagery and custom MDX components like:

- `FullWidthImage`
- `QuickAnswer`
- `PracticalTip`
- `QuestionAnswer`
- `BlogImage`

This gives the content a recognizable format. It feels like a publication.

### Quality assessment

Overall quality: **high**.

What stands out:

- strong differentiation from generic AI content
- clear topical authority around vibe coding and practical AI building
- tight alignment between content, offer, and brand
- enough volume to feel real without turning into filler

Weak spots:

- there are a few future-dated posts, which is intentional for scheduling, but it means the content calendar has to stay organized
- the categories are good, but two of them dominate. If Chris wants even more strategic depth, a narrower operator category could help separate workflow posts from bigger theory pieces

Still, the current setup is strong.

## 3. Knowledge base

### What `app/knowledge/` actually is

`app/knowledge/` is the public knowledge hub. It is not a separate database-backed knowledge system. It is the blog presented as a searchable editorial library.

Files:

- `app/knowledge/page.tsx` loads all and featured posts
- `app/knowledge/client.tsx` handles search, featured section, list rendering, page tracking, and Meta search events
- `app/knowledge/[slug]/page.tsx` renders individual articles server-side for SEO
- `app/knowledge/[slug]/client.tsx` handles article presentation, audio player, navigation, and article-level tracking

### Structure and behavior

The knowledge section has:

- hero/search page
- featured posts section
- all resources grid
- simple fuzzy search across title, excerpt, category, author, and tags
- article pages with MDX rendering
- previous / next navigation
- audio player support when frontmatter includes audio parts

So the knowledge base is really:

- **file-backed**
- **SEO-first**
- **editorial, not wiki-style**
- **searchable, but not faceted**

### Content strategy

The key insight is that Vibe Jam uses "Knowledge" as a softer, more premium framing than "Blog." That matters. It makes the content feel like an evolving resource library rather than a standard post feed.

## 4. Events system

### Public events layer

Public files:

- `app/events/page.tsx`
- `app/events/client.tsx`
- `app/events/data.ts`
- `app/vibe-check/page.tsx`
- `app/vibe-check/client.tsx`

Important detail: the public `/events` page is mostly a **marketing layer**, not a live event schedule.

`app/events/data.ts` currently defines **one event type**:

- **Vibe Check**
  - free
  - 30 minutes
  - online
  - book anytime
  - CTA points to `/vibe-check`

So the public events page is really an event-sales page for the intro call.

### Live data layer

There is also a real event data layer behind the scenes.

Files:

- `app/api/events/route.ts`
- Supabase table: `tvj_events`

The API route fetches from `tvj_events` and supports status filtering. I checked the actual database through the repo's configured Supabase credentials.

Current event counts in `tvj_events`:

- **20 total sessions / events**
- **14 upcoming**
- **5 completed**
- **1 cancelled**

Observed titles are mainly variants of:

- `The Vibe Jam 🤘`
- `The Vibe Jam`

This tells me the real recurring session history lives in Supabase, while the public event page has been simplified to focus on conversion.

### Admin calendar layer

The strongest events-related implementation is actually in the admin stack.

`app/api/admin/calendar/route.ts` builds a **unified content calendar** from:

- social posts from `tvj_social_posts`
- campaigns from `tvj_campaigns`
- blog publish dates from MDX frontmatter
- email sends from `tvj_content_distribution`

That means the admin calendar is less about community event attendance and more about **content operations scheduling**.

### Google Calendar integration status

`lib/google-calendar.ts` is explicitly marked **deprecated**.

The comment says calendar invites are now managed manually in Google Calendar UI. Users can still be marked as subscribed to recurring events, but invite handling is no longer automated through this helper.

### Verdict on events

This repo has two event systems:

1. **Audience-facing event marketing** for the Vibe Check funnel
2. **Internal scheduling infrastructure** backed by Supabase and an admin content calendar

That split is important. Publicly, it is simplified. Internally, it is much richer.

## 5. Community features

### Join and member onboarding

Files:

- `app/join/page.tsx`
- `app/join/client.tsx`
- `app/auth/*`

Community entry is through a strong branded join flow:

- first name
- last name
- email
- passwordless magic link

This is friction-light and fits the brand.

### Dashboard

Files:

- `app/dashboard/page.tsx`
- `app/dashboard/client.tsx`
- `app/dashboard/profile/page.tsx`
- `app/dashboard/profile/client.tsx`

The current dashboard is more of a **member / lead portal** than a full social community app.

It includes:

- auth-gated access
- profile fetch from `tvj_user_profiles`
- profile editing
- sign out
- offer cards for buildathons, company training, and OpenClaw meetup
- repeated CTA to book 30 minutes with Chris

This is not a forum or Slack replacement. It is a light logged-in layer that supports identity, profile state, and offer routing.

### Profile and recurring event state

`app/api/profile/route.ts` supports updating:

- `full_name`
- `subscribed_to_recurring_event`
- `calendar_subscription_date`

That means there is a lightweight community membership model underneath the dashboard.

### Social / connection features

The serious social layer lives in admin, not in the public member dashboard.

Files:

- `app/admin/connections/page.tsx`
- `app/api/auth/social/[platform]/route.ts`
- `lib/social/oauth-x.ts`
- `lib/social/oauth-linkedin.ts`
- `lib/social/oauth-instagram.ts`
- `app/admin/social/*`
- `lib/types/social.ts`

Capabilities:

- connect X, LinkedIn, Instagram via OAuth
- store tokens in `tvj_social_connections`
- choose LinkedIn posting target, including company pages when app scopes allow it
- create and manage social posts
- schedule or publish now
- manage media options, threads, polls, collaborators, CTA labels, and results per platform

This is substantial. It looks like an internal social publishing cockpit built directly into the site.

### Email system

Files:

- `lib/twilio-email.ts`
- `app/api/email/send-*.ts` routes
- `app/api/email/templates/route.ts`
- `app/email/unsubscribe/*`
- `app/admin/email/page.tsx`

The email system is much deeper than a newsletter signup form.

It supports:

- custom magic-link emails
- newsletter welcome and notification emails
- new blog post distribution
- event emails for named sessions like AI & Chill, Open Office Hours, Hackathon Office Hours, Cursor session, Nano Banana session
- unsubscribe flow with tokenized links
- admin view of send history and resend controls

This makes the repo feel like a real audience system, not just a site.

### Real community footprint

Supabase currently shows **48 user profiles** in `tvj_user_profiles`.

That is not massive community scale, but it is real usage.

### Verdict on community

Community features are **light on social interaction between members**, but **strong on member identity, event routing, admin-controlled communications, and audience ops**.

It is best described as:

- a community business platform
- not yet a peer-to-peer community product

## 6. Admin dashboard

### What `app/admin/` contains

Top-level files and routes:

- `app/admin/page.tsx` - overview dashboard
- `app/admin/layout.tsx` - gated admin shell
- `app/admin/blogs/page.tsx` - blog list, search, status, distribution visibility
- `app/admin/calendar/page.tsx` - unified content calendar
- `app/admin/connections/page.tsx` - OAuth and social account connections
- `app/admin/email/page.tsx` - email send history and resend actions
- `app/admin/humans/page.tsx` - user records, flags, newsletter state, calendar subscription state
- `app/admin/social/page.tsx` - social post management

### What the admin actually is

The admin is not a generic CMS.

It is a **content machine** and audience-ops console.

#### Overview

The overview page tracks:

- live posts
- scheduled posts
- social records
- email records
- upcoming posts
- recent distribution activity
- a "Run Distribution Now" action

#### Blogs

The blog admin can:

- list live and scheduled posts
- inspect excerpts, read time, category, and distribution state
- filter and search

#### Calendar

The calendar merges blog, social, campaign, and email timing into one planning surface.

#### Social

The social admin is the richest area. It supports:

- draft / scheduled / published / failed states
- inline and modal composer
- multi-platform posting
- media management
- platform-specific options
- publish now
- reset to draft
- result tracking per platform

#### Humans

The humans panel is basically a CRM-lite admin.

It shows and edits:

- user identity
- sign-up and login dates
- admin flag
- email notification flag
- recurring calendar subscription flag
- newsletter status, opens, clicks, source, unsubscribe date

#### Connections

The connections panel manages social OAuth and verifies admin session state.

### Admin verdict

`app/admin/` is one of the most interesting parts of the repo. It turns the site into an internal operating system for:

- publishing
- distribution
- audience management
- connection management
- social posting

That is much richer than a normal community landing site.

## 7. Vibe Check

Files:

- `app/vibe-check/page.tsx`
- `app/vibe-check/client.tsx`

`app/vibe-check/` is a dedicated booking landing page for Chris's free intro call.

What it does:

- frames the call as **30 minutes, free**
- explains what the call covers
- presents three promise blocks:
  - what interests you about Vibe Life
  - where you want to go
  - all my secrets
- explains why it is free
- routes to a Google Calendar booking link: `https://calendar.app.google/YsTfniqPmxcYuL3U9`

What it is strategically:

- primary top-of-funnel CTA
- productized discovery call
- bridge between public content and higher-touch engagement

Important note: the public `/events` page points people toward `/vibe-check`, so Vibe Check is doing a lot of the commercial work of the site.

## 8. Design and visual identity

### Theme

The site runs on the **neoprint** theme defined in `theme.config.ts`.

Core palette:

- Rich Ink Black: `#0F0F0F`
- Paper White / warm cream: `#F5F2EB`
- Dusty Blue: `#4A6B8A`
- Spot Red: `#E63B2E`
- Ochre, forest green, terracotta, rust, dusty teal as supporting accents

The comments describe the inspiration clearly:

- letterpress
- risograph
- Swiss modernism
- constructivism
- editorial minimalism

That matches what the UI is doing.

### Typography

From `lib/fonts.ts`:

- **Syne** is the main text face for body, headings, buttons, and UI
- **GT Super Display** is used for display styling through the legacy `playfair` variable
- **Bricolage Grotesque** is reserved for the logo treatment

That combination gives the site a hybrid feel:

- editorial headline energy
- sharp modern sans UI
- playful custom brand mark

### Navigation and brand feel

The navigation is not generic. `components/navigation.tsx` uses:

- fixed transparent nav
- blend mode inversion effect
- hover states and dropdown behavior
- strong typographic spacing
- a bold inverted CTA button for Vibe Check / Dashboard / Admin

The logo in `components/logo.tsx` is especially distinctive. It animates text substitutions and gives "Vibe Jam" a living, slightly weird feel. That is memorable.

### Knowledge / blog visual system

The knowledge area uses:

- hero image slider
- editorial content blocks
- large typography
- cream and ink color fields
- branded illustrations and posters tied to each post
- audio player sidebars on posts that have narration

This is why the content feels like a publication and not just a list of articles.

### Design verdict

The neoprint identity is one of the repo's strongest assets.

It gives Vibe Jam:

- a tactile editorial feel
- a strong contrast with generic SaaS AI sites
- visual coherence across homepage, knowledge, join flow, dashboard, and admin

It feels like a real brand, not a themed template.

## Key takeaways

### What is strongest

- The blog / knowledge system
- The neoprint brand system
- The admin content machine
- The custom auth and email flows
- The fact that this repo connects content, audience, and distribution in one place

### What is structurally interesting

Vibe Jam is not just a website. It is three products sharing one codebase:

1. Public brand and publishing site
2. Member gateway with magic-link auth
3. Internal operating system for content and audience ops

### Best one-line description

**Vibe Jam is a content-led community business site with a serious internal publishing and distribution stack hidden behind the public brand layer.**

## Source files worth opening first

If Chris wants a guided tour, these are the highest-signal files:

- `site.config.ts`
- `theme.config.ts`
- `lib/blog.ts`
- `app/knowledge/client.tsx`
- `app/knowledge/[slug]/client.tsx`
- `content/blog/what-is-vibe-coding.mdx`
- `content/blog/the-agentic-os.mdx`
- `content/blog/automating-blog-posts-from-client-calls.mdx`
- `lib/auth-context.tsx`
- `app/api/auth/magic-link/route.ts`
- `app/dashboard/client.tsx`
- `app/admin/page.tsx`
- `app/admin/social/page.tsx`
- `app/admin/humans/page.tsx`
- `app/api/admin/calendar/route.ts`
- `lib/twilio-email.ts`
