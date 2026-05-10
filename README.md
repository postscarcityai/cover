# Cover &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/postscarcityai/cover/blob/main/LICENSE) [![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](https://github.com/postscarcityai/cover) [![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/) [![Demo](https://img.shields.io/badge/demo-live-blue)](https://psai-cover.vercel.app/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/postscarcityai/cover/pulls)

**Site template that personalizes on first run.** [Live demo →](https://psai-cover.vercel.app/) A professional Next.js template with 5 theme presets, MDX blog, newsletter, contact form, GDPR/CCPA compliance, and comprehensive SEO. Run the setup wizard once and ship.

> **Just add your keys.** Cover renders out of the box on first install — no code edits required. The newsletter, contact form, and audio narration come online the moment you drop in your Supabase, SendGrid, and fal.ai keys. No subscriptions, no platform markup, no per-seat pricing — pay only the underlying providers (most have generous free tiers).

Part of the [PostScarcity AI](https://github.com/postscarcityai) suite of open source repositories.

---

## What It Does

Cover is a marketing site template that adapts to your brand on first run. Define your company info, pick a theme, and the wizard configures everything. No hardcoded values — site config, contact details, and theme tokens all flow from a single source.

- **5 theme presets** — Professional, Modern, Elegant, Minimal, Warm — switch instantly with `pnpm run theme`
- **Interactive setup wizard** — company name, contact info, address, theme selection, and env vars in one flow
- **MDX blog** — write posts with custom components, audio narration, and full schema.org markup
- **Newsletter + contact form** — Supabase-backed, GDPR/CCPA compliant with cookie consent
- **Centralized config** — `site.config.ts` drives navigation, footer, SEO, and business schema
- **Configuration verification** — `pnpm run verify` checks env vars and config before you deploy
- **Accessibility** — ADA-compliant patterns, route announcer, and WCAG-aligned components

---

## Quick Start

### Option 1: Setup wizard (recommended)

```bash
# Clone
git clone https://github.com/postscarcityai/cover.git
cd cover

# Install (requires pnpm: npm install -g pnpm)
pnpm install

# Run the setup wizard — configures site info, theme, and env
pnpm run setup

# Start
pnpm run dev
# Open http://localhost:3000
```

The wizard walks you through company name, description, URL, contact details, address, theme selection, and environment variables. It writes `site.config.ts` and `.env.local` for you.

### Option 2: Manual setup

```bash
git clone https://github.com/postscarcityai/cover.git
cd cover
pnpm install

# Copy env template
cp .env.example .env.local
# Edit .env.local with Supabase, SendGrid, etc.

# Edit site.config.ts with your company info
# Then run verify
pnpm run verify

pnpm run dev
```

---

## Environment Variables

Cover renders without any keys, but features unlock as you add them. All of these go in `.env.local` (see `.env.example` for the annotated template):

| Variable | Required for | Where to get it |
|----------|--------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Newsletter, contact form, audio storage | [supabase.com](https://supabase.com) — free tier |
| `SUPABASE_SERVICE_ROLE_KEY` | Same as above | Supabase project settings |
| `SENDGRID_API_KEY` | Contact form email delivery | [sendgrid.com](https://sendgrid.com) — free tier |
| `SENDGRID_FROM_EMAIL` | Sender address (must be verified in SendGrid) | Your verified sender |
| `SENDGRID_TO_EMAIL` | Where contact submissions land | Your inbox |
| `FAL_KEY` | TTS / audio narration on blog posts | [fal.ai](https://fal.ai) — pay-per-use |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics (optional) | GA4 property settings |
| `NEWSLETTER_ADMIN_KEY` | Newsletter admin endpoints (optional) | `openssl rand -base64 32` |

---

## Architecture

```
app/
  layout.tsx              Root layout, metadata, schema.org
  page.tsx                 Home page
  about/                   About page
  blog/                    Blog listing and [slug] posts
  contact/                 Contact page
  services/                Services page
  achievements/            Achievements / case studies page
  landing/[slug]/          Dynamic landing pages
  team-member/             Team member pages
  api/                     API routes
    contact/               Contact form handler
    tts/                   Text-to-speech (fal.ai)
    upload-audio/          Audio upload to Supabase Storage
    newsletter/            Subscribe / confirm / unsubscribe / admin
    admin/image-edit/      Image editing (fal.ai)
  privacy-policy/          Legal pages
  terms-of-service/
  accessibility-statement/
  disclaimer/
  non-discrimination-statement/
components/
  navigation.tsx           Main nav
  footer.tsx               Footer
  contact-form.tsx         Contact form
  newsletter-signup.tsx    Newsletter signup
  cookie-consent.tsx       GDPR/CCPA consent
  mdx-components.tsx       MDX custom components
  sections/                Hero, CTA, FAQ, testimonials, etc.
lib/
  supabase.ts              Supabase client
  email.ts                 SendGrid integration
  theme-utils.ts           Theme token helpers
  fonts.ts                 Font loading
site.config.ts             Central site config (name, contact, nav, SEO)
theme.config.ts            Theme presets and design tokens
scripts/
  setup.js                 Interactive setup wizard
  switch-theme.js          Theme switcher
  verify-config.js         Config verification
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| React | 18 |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4, Radix UI |
| Content | MDX 3.1 |
| Database | Supabase (PostgreSQL, Storage) |
| Email | SendGrid |
| AI | fal.ai (TTS, image edit) |

---

## Scripts

```bash
pnpm run dev              # Start dev server
pnpm run build            # Production build
pnpm run setup            # Interactive setup wizard
pnpm run theme            # Switch theme (professional, modern, elegant, minimal, warm)
pnpm run verify           # Verify configuration
pnpm run test:accessibility # Run accessibility checks
```

---

## License

MIT — see [LICENSE](./LICENSE).

---

*PostScarcity AI. Unlock Abundance.*
