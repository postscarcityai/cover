# WCW Site Template

A professional, fully-featured Next.js 14 website template designed for law firms and professional services. Built with modern technologies, comprehensive SEO optimization, and a powerful theming system that allows complete customization without touching code.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🎯 Core Features
- ⚡ **Next.js 14** with App Router
- 📝 **MDX Blog** with custom components
- 🎵 **Audio Narration** with multi-part player
- 📧 **Newsletter System** (GDPR/CCPA compliant)
- 📊 **Google Analytics 4** integration
- 🔍 **Advanced SEO** with Schema.org markup
- 📱 **Fully Responsive** design
- ♿ **ADA Compliant** with accessibility features
- 🚀 **Performance Optimized** (90+ Lighthouse scores)

### 🎨 Design System
- **Tailwind CSS 3.4** for styling
- **Radix UI** components
- **Framer Motion** animations
- Custom color palette (easily customizable)
- Typography system with web fonts

### 📦 What's Included
- 170 files, 26,000+ lines of production code
- 441 npm packages configured
- 24 custom React components
- 5 API routes (newsletter, audio upload)
- Comprehensive documentation (7,400+ lines)

---

## 🚀 Quick Start

### Option A: Interactive Setup (Recommended)

Run the setup wizard to configure everything automatically:

```bash
pnpm install
pnpm setup
```

The wizard will guide you through:
- Company information
- Contact details
- Theme selection
- Environment variables

### Option B: Manual Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Site Settings

Edit `site.config.ts` with your client's information:
```typescript
export const siteConfig = {
  name: "Your Company Name",
  description: "Your company tagline",
  contact: {
    phone: "+1 (555) 123-4567",
    email: "contact@yoursite.com",
    address: { /* ... */ }
  },
  // ... see file for all options
}
```

### 3. Set Up Environment Variables

Create `.env.local`:
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_key_here
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### 4. Verify Configuration

Run the verification script to check for issues:
```bash
pnpm verify
```

### 5. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📝 Full Setup Guide

For complete setup instructions including external services configuration, deployment, and customization, see **`SETUP-GUIDE.md`**.

---

## ⚙️ Configuration

### Site Config (`site.config.ts`)

Central configuration file for all customizable values. Update this file to change:

- Basic info (name, description, URL)
- Contact information (phone, email, address)
- Navigation menu items
- Business details for schema.org
- Social media links
- Blog settings
- SEO defaults
- Feature toggles

**Navigation and footer automatically pull from this file** - update once, changes everywhere!

---

## 📄 Content Management

### Blog Posts

Create new posts in `/content/blog/`:

```mdx
---
title: "Your Post Title"
excerpt: "SEO description (150-160 chars)"
author: "Author Name"
date: "2025-01-15T10:00:00-05:00"
readTime: "5 min read"
category: "Category Name"
featured: true
slug: "url-slug"
---

# Your Post Title

Your content here...
```

**See example blog posts:**
- `example-blog-post-with-all-features.mdx` - Complete component showcase
- `getting-started-with-your-new-website.mdx` - Site guide for clients
- `simple-blog-post-example.mdx` - Basic post structure

---

## 🎨 Theme System

The template includes **5 professionally designed theme presets** that can be switched instantly:

| Theme | Description | Primary Color | Font |
|-------|-------------|---------------|------|
| **Professional** | Traditional, trustworthy | Navy Blue (#1e3a8a) | Georgia |
| **Modern** | Clean, contemporary | Teal (#0d9488) | Inter |
| **Elegant** | Sophisticated, refined | Deep Purple (#6b21a8) | Playfair Display |
| **Minimal** | Simple, clean | Charcoal (#374151) | Helvetica Neue |
| **Warm** | Approachable, friendly | Burnt Orange (#E87722) | Merriweather |

### Switch Themes

```bash
# Interactive theme switcher
pnpm theme

# Or specify theme directly
pnpm theme professional
pnpm theme modern
pnpm theme elegant
pnpm theme minimal
pnpm theme warm
```

Themes are configured in `theme.config.ts` and can be fully customized.

---

## 🎨 Customization

### Colors
Update `tailwind.config.ts`:
```typescript
colors: {
  primary: '#YOUR_COLOR',
}
```

### Logos
Replace files in `/public/img/`:
- `logo.svg` - Main logo
- `logo-white.svg` - White version

### Fonts
Add to `/public/fonts/` and update `styles/globals.css`

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy

See `SETUP-GUIDE.md` for detailed deployment instructions.

---

## 📂 Project Structure

```
/
├── app/                   # Pages and routes
├── components/            # React components
├── content/blog/          # MDX blog posts
├── docs/                  # Documentation
├── lib/                   # Utilities
├── public/               # Static assets
├── site.config.ts        # ⭐ Main config file
├── next.config.mjs       # Next.js config
└── tailwind.config.ts    # Tailwind config
```

---

## 🔧 Helper Scripts

The template includes several utility scripts:

```bash
pnpm setup       # Interactive setup wizard
pnpm theme       # Switch between theme presets
pnpm verify      # Verify configuration
pnpm dev         # Start development server
pnpm build       # Build for production
pnpm lint        # Run linter
```

---

## 📚 Documentation

Comprehensive guides in the repository:

- **`README.md`** - Quick start and overview (this file)
- **`SETUP-GUIDE.md`** - Complete setup guide (675 lines)
- **`CHANGELOG.md`** - Version history and updates
- **`docs/THEME-SYSTEM.md`** - Theme customization
- **`docs/blog-instructions/`** - Blog authoring guides
- **`docs/status-reports/`** - Implementation docs
- **`docs/best-practices/`** - Standards compliance

---

## 🛠 Tech Stack

- Next.js 14 + React 18 + TypeScript 5
- Tailwind CSS 3.4 + Radix UI
- MDX 3.1 for content
- Supabase (PostgreSQL + Storage)
- Google Analytics 4
- Framer Motion

---

## 📊 Performance

**Target Lighthouse Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 📞 Support

- [GitHub Repository](https://github.com/CJohnDesign/wcw-site-template)
- [Setup Guide](./SETUP-GUIDE.md)
- [Changelog](./CHANGELOG.md)
- [Documentation](./docs/)

---

## 📝 License

Private template for CJohnDesign client projects.

---

## 🎉 Version

**v1.0.0** - January 2025

**What's New:**
- 🎨 **5 Theme Presets** - Switch themes instantly with `pnpm theme`
- ⚙️ **Interactive Setup Wizard** - Configure everything with `pnpm setup`
- ✅ **Configuration Verification** - Check setup with `pnpm verify`
- 📝 **Centralized Config** - All settings in `site.config.ts`
- 📖 **3 Example Blog Posts** - Complete feature demonstrations
- 🔒 **No Hardcoded Values** - Everything configurable via env vars
- 📚 **Comprehensive Documentation** - 675-line setup guide + changelog

---

**Developed by CJohnDesign** | **Template Version 1.0.0**
