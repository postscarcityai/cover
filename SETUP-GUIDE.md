# WCW Site Template - Setup Guide

This guide will walk you through setting up this template for a new client project.

---

## **Prerequisites**

- Node.js 18+ installed
- pnpm package manager (`npm install -g pnpm`)
- Git
- GitHub account (for deployment via Vercel)
- Access to client's domain and DNS settings

---

## **Step 1: Clone & Customize Repository**

### 1.1 Create New Repository for Client
```bash
# Clone this template
git clone https://github.com/CJohnDesign/wcw-site-template.git client-site-name
cd client-site-name

# Remove existing git history
rm -rf .git

# Initialize new repository
git init
git add .
git commit -m "Initial commit from WCW template"

# Create private GitHub repo and push
gh repo create client-site-name --private --source=. --remote=origin
git push -u origin main
```

### 1.2 Update package.json
```json
{
  "name": "client-site-name",
  "version": "0.1.0",
  "private": true,
  ...
}
```

---

## **Step 2: Set Up External Services**

### 2.1 Supabase (Newsletter + Audio Storage)

**Create New Supabase Project:**
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Project Name: `client-site-name`
4. Database Password: Generate strong password
5. Region: Choose closest to target audience
6. Click "Create new project"

**Configure Storage Bucket (Audio Files):**
```sql
-- 1. Create bucket via Supabase Dashboard > Storage > Create Bucket
-- Bucket name: audio-files
-- Public bucket: YES
-- File size limit: 50 MB
-- Allowed MIME types: audio/mpeg, audio/mp3
```

**Create Newsletter Tables:**
```sql
-- Run in Supabase Dashboard > SQL Editor

-- Newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, unsubscribed
  consent_given BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  consent_ip_address TEXT,
  consent_user_agent TEXT,
  gdpr_consent BOOLEAN DEFAULT false,
  ccpa_opt_out BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  confirmed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  confirmation_token UUID DEFAULT gen_random_uuid(),
  source TEXT, -- e.g., 'blog', 'homepage', 'footer'
  referrer_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter audit log
CREATE TABLE newsletter_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES newsletter_subscriptions(id),
  action TEXT NOT NULL, -- subscribe, unsubscribe, update, confirm
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscriptions(status);
CREATE INDEX idx_newsletter_created ON newsletter_subscriptions(created_at DESC);
CREATE INDEX idx_audit_subscription ON newsletter_audit_log(subscription_id);
```

**Get Supabase Credentials:**
1. Go to Project Settings > API
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Service Role Key** (secret): `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2.2 Google Analytics 4

**Create GA4 Property:**
1. Go to https://analytics.google.com
2. Admin > Create Property
3. Property Name: `Client Site Name`
4. Time Zone: Client's timezone
5. Currency: Client's currency
6. Click "Create"
7. Choose "Web" as platform
8. Add website URL and stream name
9. Copy **Measurement ID**: `G-XXXXXXXXXX`

**Configure Enhanced Measurement:**
- Enable: Scrolls, Outbound clicks, Site search, Video engagement, File downloads

**Set Up Conversions:**
In GA4 > Configure > Events, mark these as conversions:
- `phone_call_click`
- `schedule_consultation`
- `contact_form_submit`
- `newsletter_signup`

### 2.3 ElevenLabs (Optional - For Audio Generation)

**Create Account:**
1. Go to https://elevenlabs.io
2. Sign up for account
3. Choose plan based on character needs:
   - Free: 10,000 chars/month
   - Starter: 30,000 chars/month ($5)
   - Creator: 100,000 chars/month ($22)
4. Get API key from Profile > API Keys

**Find Voice ID:**
1. Go to Voices
2. Select voice (or clone client's voice)
3. Copy Voice ID (e.g., `dmCLGygDdYCfuLYTkfjl` for Matthew Angelo)

---

## **Step 3: Configure Environment Variables**

### 3.1 Create .env.local file
```bash
# In project root, create .env.local
touch .env.local
```

### 3.2 Add Environment Variables
```env
# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# ElevenLabs (Optional)
ELEVENLABS_API_KEY=your_api_key_here
ELEVENLABS_VOICE_ID=dmCLGygDdYCfuLYTkfjl

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://clientsite.com
```

### 3.3 Add .env.local to .gitignore
```bash
# Verify it's already in .gitignore
cat .gitignore | grep .env.local
```

---

## **Step 4: Update Hardcoded Configuration**

### 4.1 Supabase URLs in API Routes

**Files to update:**
- `app/api/newsletter/subscribe/route.ts:6`
- `app/api/newsletter/confirm/[token]/route.ts` (if exists)
- `app/api/newsletter/unsubscribe/[token]/route.ts` (if exists)
- `app/api/upload-audio/route.ts:6`

**Replace:**
```typescript
const supabaseUrl = 'https://luctiepxpgsjfdlotubw.supabase.co'
```

**With:**
```typescript
const supabaseUrl = process.env.SUPABASE_URL || ''
```

### 4.2 Google Analytics ID

**File:** `components/google-analytics.tsx:7`

**Replace:**
```typescript
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-7FTPKV8KLS"
  strategy="afterInteractive"
/>
```

**With:**
```typescript
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-7FTPKV8KLS'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

**And update the config call:**
```typescript
gtag('config', '${GA_ID}');
```

### 4.3 Next.js Config - Remote Image Patterns

**File:** `next.config.mjs:15-24`

**Update to client's domain:**
```javascript
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'www.clientsite.com',
  },
  {
    protocol: 'https',
    hostname: 'clientsite.com',
  },
  {
    protocol: 'https',
    hostname: 'xxxxx.supabase.co', // Your Supabase project URL
  },
],
```

---

## **Step 5: Customize Branding**

### 5.1 Logo Files
Replace these files in `/public/img/`:
- `amc-logo.svg` → `client-logo.svg`
- `amc-logo-white.svg` → `client-logo-white.svg`

Update references in:
- `components/navigation.tsx`
- `components/footer.tsx`

### 5.2 Favicon & Icons
Replace in `/public/img/`:
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon-48x48.png`
- `favicon-96x96.png`
- `apple-touch-icon.png`

**Generate favicons:** Use https://realfavicongenerator.net/

### 5.3 Colors (Tailwind Config)

**File:** `tailwind.config.ts`

Update primary colors:
```typescript
colors: {
  primary: '#YOUR_PRIMARY_COLOR',
  secondary: '#YOUR_SECONDARY_COLOR',
  // ... other colors
}
```

Or use CSS variables in `styles/globals.css`:
```css
:root {
  --primary: #YOUR_PRIMARY_COLOR;
  --secondary: #YOUR_SECONDARY_COLOR;
}
```

### 5.4 Fonts

**Custom Fonts:**
1. Add font files to `/public/fonts/`
2. Update font declarations in `styles/globals.css`
3. Update Tailwind config with font families

**Google Fonts:**
1. Import in `app/layout.tsx`
2. Update font variables in metadata

---

## **Step 6: Update Site Content**

### 6.1 Site Metadata

**File:** `app/layout.tsx`

Update:
- `title` - Site name
- `description` - Site description
- `keywords` - SEO keywords
- `openGraph.siteName`
- `openGraph.images` - OG image URL
- `twitter.images`

### 6.2 Schema.org Structured Data

**File:** `app/layout.tsx` (JSON-LD script)

Update LegalService schema:
- `name` - Business name
- `description` - Business description
- `url` - Website URL
- `telephone` - Phone number
- `email` - Contact email
- `address` - Physical address
- `areaServed` - Service areas
- `founder` - Owner/founder info
- `knowsAbout` - Services/expertise
- `paymentAccepted` - Payment methods

### 6.3 Contact Information

**Files to update:**
- `components/footer.tsx` - Phone, email, address
- `components/hero-section.tsx` - Phone number
- `components/navigation.tsx` - Phone in header

**Search and replace:**
- Phone: Search for phone numbers in all files
- Email: Search for email addresses
- Address: Update in footer and schema

### 6.4 Navigation Menu

**File:** `components/navigation.tsx`

Update menu items to match client's site structure:
```typescript
const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  // ... add client's pages
]
```

---

## **Step 7: Clean Up Content**

### 7.1 Remove Template Blog Posts
```bash
# Remove all blog posts
rm -rf content/blog/*.mdx
rm -rf content/scripts/*.txt

# Remove blog images
rm -rf public/jw/*
```

### 7.2 Create Client Blog Posts
Follow structure in `docs/blog-instructions/blog-structure-guide.md`

### 7.3 Update Page Content

**Pages to customize:**
- `app/page.tsx` - Homepage
- `app/our-firm/page.tsx` → Rename to client's about page
- `app/practice-areas/page.tsx` → Client's services
- `app/results/page.tsx` → Client's portfolio/results
- `app/contact/page.tsx` - Contact page
- Remove or repurpose: `app/aaron-cohen/*`, `app/attorney-advertising/*`

---

## **Step 8: Test Locally**

### 8.1 Install Dependencies
```bash
pnpm install
```

### 8.2 Run Development Server
```bash
pnpm dev
```

Open http://localhost:3000

### 8.3 Test Core Features

**Newsletter Signup:**
1. Submit newsletter form
2. Check Supabase > Table Editor > newsletter_subscriptions
3. Verify data is saved

**Analytics:**
1. Open browser DevTools > Network
2. Filter by "gtag"
3. Click buttons (phone, CTA)
4. Verify events are sent to GA4

**Blog Posts:**
1. Create test blog post
2. Visit `/justice-watch` (or rename this route)
3. Verify post appears
4. Click to view individual post

**Audio Player (if using):**
1. Add audio metadata to blog post
2. Verify player appears
3. Test play/pause, seek, volume

---

## **Step 9: Deploy to Vercel**

### 9.1 Connect GitHub Repository

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import from GitHub
4. Select your repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `pnpm build`
   - **Output Directory**: .next

### 9.2 Add Environment Variables

In Vercel project settings > Environment Variables, add:

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://clientsite.com
```

**Important:** Add to all environments (Production, Preview, Development)

### 9.3 Deploy

Click "Deploy" - Vercel will:
1. Install dependencies
2. Build Next.js app
3. Deploy to CDN
4. Provide preview URL

### 9.4 Configure Custom Domain

1. Go to Vercel project > Settings > Domains
2. Add client's domain: `clientsite.com`
3. Add www subdomain: `www.clientsite.com`
4. Copy DNS records provided by Vercel

**Update client's DNS:**
- Add A record pointing to Vercel's IP
- Add CNAME for www pointing to Vercel

**SSL Certificate:**
- Vercel automatically provisions SSL via Let's Encrypt

---

## **Step 10: Post-Deployment Configuration**

### 10.1 Verify Analytics

1. Visit deployed site
2. Click around, trigger events
3. Check GA4 > Reports > Realtime
4. Verify events are appearing

### 10.2 Test Newsletter

1. Submit newsletter form on production site
2. Check Supabase table
3. Verify IP address and user agent are logged

### 10.3 Submit Sitemap to Google

1. Site generates sitemap automatically at `/sitemap.xml`
2. Go to Google Search Console
3. Add property for client's domain
4. Submit sitemap: `https://clientsite.com/sitemap.xml`

### 10.4 Performance Check

Run Lighthouse audit:
1. Open Chrome DevTools
2. Lighthouse tab
3. Run audit (Mobile & Desktop)
4. Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 100

---

## **Step 11: Client Handoff**

### 11.1 Documentation

Provide client with:
- Login credentials for Supabase
- Login credentials for GA4
- Login credentials for Vercel
- This setup guide
- Blog creation guide (`docs/blog-instructions/blog-structure-guide.md`)

### 11.2 Training

Train client on:
- Creating blog posts with MDX
- Viewing newsletter subscribers
- Reading analytics data
- Deploying updates (git push = auto-deploy)

### 11.3 Ongoing Maintenance

**Monthly tasks:**
- Review GA4 analytics
- Export newsletter subscribers
- Update blog content
- Monitor performance
- Check for dependency updates

---

## **Troubleshooting**

### Build Errors

**"Module not found"**
```bash
pnpm install
rm -rf .next
pnpm build
```

**TypeScript errors**
- Check `tsconfig.json` is present
- Verify all types are installed: `@types/node`, `@types/react`

### Supabase Connection Issues

**401 Unauthorized**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct (not anon key)
- Check environment variables in Vercel

**CORS errors**
- Add client domain to Supabase > Authentication > URL Configuration

### Analytics Not Tracking

**Events not appearing in GA4**
- Check `NEXT_PUBLIC_GA_ID` is set (must have NEXT_PUBLIC prefix)
- Verify GA4 property is created
- Check browser DevTools for gtag requests
- Disable ad blockers during testing

### Newsletter Errors

**"Database error occurred"**
- Verify tables were created in Supabase
- Check service role key has table access
- Review Supabase logs

---

## **Quick Reference: File Locations**

### Configuration Files
- `next.config.mjs` - Next.js config (images, headers, MDX)
- `tailwind.config.ts` - Tailwind CSS config (colors, fonts)
- `tsconfig.json` - TypeScript config
- `package.json` - Dependencies and scripts
- `.env.local` - Environment variables (local only)

### Key Directories
- `/app` - Pages and routes
- `/components` - React components
- `/lib` - Utilities (analytics, blog, newsletter)
- `/content/blog` - Blog posts (MDX)
- `/public` - Static assets (images, fonts)
- `/docs` - Documentation and guides

### API Routes
- `/app/api/newsletter/subscribe` - Newsletter subscription
- `/app/api/upload-audio` - Audio file upload
- `/app/api/newsletter/confirm/[token]` - Confirm subscription
- `/app/api/newsletter/unsubscribe/[token]` - Unsubscribe

### Critical Files to Customize
1. `app/layout.tsx` - Site metadata + schema
2. `components/google-analytics.tsx` - GA4 tracking ID
3. `components/navigation.tsx` - Logo + menu
4. `components/footer.tsx` - Contact info
5. `app/api/newsletter/subscribe/route.ts` - Supabase URL
6. `app/api/upload-audio/route.ts` - Supabase URL
7. `next.config.mjs` - Remote image domains

---

## **Deployment Checklist**

- [ ] Clone repository and create new GitHub repo
- [ ] Create Supabase project
- [ ] Set up Supabase storage bucket (audio-files)
- [ ] Create newsletter tables in Supabase
- [ ] Create GA4 property
- [ ] Create .env.local with all environment variables
- [ ] Update hardcoded Supabase URLs in API routes
- [ ] Update GA4 tracking ID in google-analytics.tsx
- [ ] Update next.config.mjs remote image patterns
- [ ] Replace logo files
- [ ] Replace favicon files
- [ ] Update colors in Tailwind config
- [ ] Update fonts if needed
- [ ] Update site metadata in app/layout.tsx
- [ ] Update schema.org structured data
- [ ] Update contact information (phone, email, address)
- [ ] Update navigation menu
- [ ] Remove template blog posts
- [ ] Customize page content
- [ ] Test locally (newsletter, analytics, blog)
- [ ] Deploy to Vercel
- [ ] Add environment variables in Vercel
- [ ] Configure custom domain
- [ ] Update DNS records
- [ ] Verify SSL certificate
- [ ] Test production site
- [ ] Submit sitemap to Google Search Console
- [ ] Run Lighthouse audit
- [ ] Provide client documentation and training

---

## **Support & Resources**

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **GA4 Setup**: https://support.google.com/analytics/answer/9304153

---

**Template Version**: 1.0.0
**Last Updated**: October 2025
**Maintained by**: CJohnDesign
