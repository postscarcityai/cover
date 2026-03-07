# Theme System Documentation

The WCW Site Template includes a powerful theming system that allows you to quickly customize the visual appearance of your site or create multiple themed versions from the same codebase.

## Overview

The theme system provides:
- **5 preset themes** (professional, modern, elegant, minimal, warm)
- **Customizable color palettes**
- **Typography settings** (fonts, sizes)
- **Dynamic font loading** via Next.js font optimization
- **CSS variable-based styling** for maximum flexibility
- **Spacing and layout controls**
- **Border radius and shadow effects**
- **Easy theme switching** via config file

## Quick Start

### 1. Choose a Theme

In `site.config.ts`, set your theme:

```typescript
export const siteConfig = {
  theme: 'professional', // or 'modern', 'elegant', 'minimal', 'warm'
  // ... rest of config
}
```

### 2. Font System is Pre-Configured

The font system is already set up in `app/layout.tsx` and loads Montserrat (body) and Playfair Display (headlines) using Next.js font optimization with `display:swap` for optimal performance. All themes use these two fonts, making it easy to customize later if needed.

### 3. ThemeInjector is Already Added

The `ThemeInjector` component is already in your root layout and injects theme CSS variables and global font rules based on your selected theme.

## ✨ Recommended Approach: Inline Styles with CSS Variables

**This is the approach used on all homepage components and provides the most reliable theming.**

### Why Inline Styles?

1. **Maximum CSS specificity** - Overrides component defaults and other styles
2. **No Tailwind arbitrary value limitations** - Works with all CSS properties
3. **Dynamic and reliable** - CSS variables update instantly when themes change
4. **SSR-compatible** - Works perfectly with Next.js server components

### How to Apply Theme Styles

#### Colors

Use inline `style` prop with CSS variables:

```tsx
// Backgrounds
<section style={{ backgroundColor: 'var(--theme-primary)' }}>
<div style={{ backgroundColor: 'var(--theme-muted)' }}>

// Text colors
<h2 style={{ color: 'var(--theme-primary)' }}>
<p style={{ color: 'var(--theme-foreground)' }}>
<span style={{ color: 'var(--theme-primary-foreground)' }}>

// Borders
<div style={{ borderColor: 'var(--theme-primary)' }} className="border-4">

// Multiple properties
<Button
  variant={null as any}
  style={{
    backgroundColor: 'var(--theme-primary)',
    color: 'var(--theme-primary-foreground)',
  }}
>
```

#### Typography (Fonts)

**For headings (h1, h2, h3):** Let them inherit fonts from global CSS. Do NOT add inline `fontFamily` styles.

```tsx
// ✅ Correct - Only color, let font inherit
<h2
  className={`${typography.sectionTitle} font-bold mb-6`}
  style={{ color: 'var(--theme-primary)' }}
>
  Section Title
</h2>

// ❌ Wrong - Don't add fontFamily inline
<h2 style={{ color: 'var(--theme-primary)', fontFamily: 'var(--theme-font-heading)' }}>
```

The `ThemeInjector` component applies fonts globally:
```css
h1, h2 {
  font-family: var(--font-playfair), serif; /* Playfair Display for headlines */
}

h3, h4, h5, h6 {
  font-family: var(--font-playfair), serif; /* Playfair Display for subheadings */
}

body {
  font-family: var(--font-montserrat), system-ui, sans-serif; /* Montserrat for body */
}
```

### Real-World Example: Homepage Components

All homepage components (`/app/page.tsx`) use this approach and serve as reference implementations:

#### Navigation (`components/navigation.tsx`)
```tsx
<Button
  variant={null as any}  // Opt out of shadcn defaults
  size={null as any}
  style={{
    backgroundColor: 'var(--theme-primary)',
    color: 'var(--theme-primary-foreground)',
  }}
  className="px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
>
  Contact
</Button>
```

#### Hero Section (`components/hero-section.tsx`)
```tsx
<h1
  className={`${typography.heroTitle} font-bold mb-6`}
  style={{ color: 'var(--theme-primary)' }}
>
  {siteConfig.hero?.title}
</h1>

<Button
  variant={null as any}
  size="lg"
  style={{
    backgroundColor: 'var(--theme-primary)',
    color: 'var(--theme-primary-foreground)',
  }}
>
  Get Started
</Button>
```

#### Results Ticker (`components/results-ticker.tsx`)
```tsx
<section
  className="py-16 overflow-hidden"
  style={{ backgroundColor: 'var(--theme-primary)' }}
>
  <h2
    className={`${typography.sectionTitle} font-bold mb-4`}
    style={{ color: 'var(--theme-primary-foreground)' }}
  >
    Our Track Record
  </h2>
</section>
```

#### Practice Areas (`components/practice-areas.tsx`)
```tsx
<div
  className="border-4"
  style={{ borderColor: 'var(--theme-primary)' }}
>
  <div
    style={{ backgroundColor: 'var(--theme-primary)' }}
  >
    <area.icon
      className="h-8 w-8"
      style={{ color: 'var(--theme-primary-foreground)' }}
    />
  </div>
</div>
```

#### Jurisdictional Reach (`components/jurisdictional-reach.tsx`)

**Special case for SVG elements:**

```tsx
const [themeColor, setThemeColor] = useState("#E87722")

useEffect(() => {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue('--theme-primary')
    .trim()
  if (color) {
    setThemeColor(color)
  }
}, [])

// Use state variable in SVG styles
<Geography
  geography={geo}
  style={{
    default: {
      fill: isServiceState ? themeColor : "#F5F5F5",
      stroke: themeColor,
    },
  }}
/>
```

SVG elements in libraries like `react-simple-maps` require actual color values, not CSS variables. Use `useEffect` to read the CSS variable into state, then apply it.

#### Client Commitment (`components/client-commitment.tsx`)
```tsx
<section
  className="py-16 md:py-20"
  style={{ backgroundColor: 'var(--theme-muted)' }}
>
  <h2
    className={`${typography.sectionTitle} font-bold`}
    style={{ color: 'var(--theme-primary)' }}
  >
    {siteConfig.commitment?.title}
  </h2>
</section>
```

#### Footer (`components/footer.tsx`)
```tsx
<footer
  className="py-16"
  style={{ backgroundColor: 'var(--theme-primary)' }}
>
  <h3
    className="font-semibold mb-4"
    style={{ color: 'var(--theme-primary-foreground)' }}
  >
    Contact Information
  </h3>

  <p
    className="opacity-90"
    style={{ color: 'var(--theme-primary-foreground)' }}
  >
    {siteConfig.description}
  </p>
</footer>
```

#### Dynamic Logo (`components/logo.tsx`)

For SVG logos that need to match the theme:

```tsx
"use client"

import { siteConfig } from "@/site.config"

interface LogoProps {
  variant?: 'primary' | 'white'
}

export function Logo({ variant = 'primary' }: LogoProps) {
  const fillColor = variant === 'white' ? '#ffffff' : 'var(--theme-primary)'

  return (
    <svg>
      <text fill={fillColor} style={{ fill: fillColor }}>
        YOUR LOGO
      </text>
    </svg>
  )
}

// Usage in Navigation
<Logo className="h-8 w-auto" />

// Usage in Footer
<Logo variant="white" className="h-6 w-auto" />
```

## Available Themes

### Professional (Default)
- **Use case:** Law firms, consultancies, B2B services
- **Colors:** Navy blue (#2A2C53), purple accent
- **Typography:** Playfair Display (headings), Montserrat (body)
- **Style:** Sharp edges, traditional, authoritative

### Modern
- **Use case:** Tech companies, startups, SaaS
- **Colors:** Bright blue (#0066FF), cyan accent
- **Typography:** Playfair Display (headings), Montserrat (body)
- **Style:** Rounded corners, clean, contemporary

### Elegant
- **Use case:** Luxury brands, high-end services
- **Colors:** Black, warm brown, gold accents
- **Typography:** Playfair Display (headings), Montserrat (body)
- **Style:** Sophisticated, spacious, refined

### Minimal
- **Use case:** Creative agencies, portfolios
- **Colors:** Pure black and white
- **Typography:** Helvetica Neue
- **Style:** Ultra-clean, grid-based, Swiss design

### Warm
- **Use case:** Hospitality, education, community organizations
- **Colors:** Warm orange, sandy brown
- **Typography:** Playfair Display (headings), Montserrat (body)
- **Style:** Friendly, rounded, approachable

## Creating a Custom Theme

### Option 1: Extend an Existing Theme

In `theme.config.ts`, add your custom theme:

```typescript
export const themes: Record<string, Theme> = {
  // ... existing themes

  mycustom: {
    name: "My Custom Theme",
    colors: {
      primary: "#your-color",
      primaryForeground: "#ffffff",
      // ... rest of colors
    },
    typography: {
      heading: "'Your Font', serif",
      // ... rest of typography
    },
    spacing: {
      section: "py-20 md:py-24",
      container: "max-w-7xl",
      grid: "gap-12 md:gap-16",
    },
    borderRadius: {
      card: "rounded-lg",
      button: "rounded-md",
      input: "rounded-md",
    },
    effects: {
      shadow: "shadow-lg",
      shadowHover: "shadow-xl",
    },
  },
}
```

Then update `site.config.ts`:

```typescript
theme: 'mycustom' as const,
```

### Option 2: Override Individual Values

You can override specific theme values in `site.config.ts` without creating a full custom theme (future feature).

## Font Loading System

The template uses Next.js font optimization for all theme fonts. This is configured in `/lib/fonts.ts` and `/app/layout.tsx`.

### How It Works

1. **All fonts are loaded upfront** via `next/font/google` in `/lib/fonts.ts`
2. **Font CSS variables are applied** to the `<html>` element in `/app/layout.tsx`
3. **ThemeInjector applies fonts globally** based on the active theme

### Available Font Variables

These CSS variables are available globally:

```css
--font-playfair       /* Playfair Display - Used for headlines (h1, h2) */
--font-montserrat     /* Montserrat - Used for body copy, buttons, UI */
```

**Template Setup:** The template uses Montserrat for body copy and Playfair Display for headlines across all themes. To customize fonts, see the "Adding a New Font" section below.

### Adding a New Font

1. Add the font import in `/lib/fonts.ts`:

```tsx
import { Your_Font } from 'next/font/google'

export const yourFont = Your_Font({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-your-font',
  display: 'swap',
})
```

2. Apply it in `/app/layout.tsx`:

```tsx
import { yourFont } from '@/lib/fonts'

<html className={`... ${yourFont.variable}`}>
```

3. Use it in your theme config (`theme.config.ts`):

```tsx
typography: {
  heading: "var(--font-your-font), serif",
  // ...
}
```

## Legacy: Using Theme Utilities

**Note:** This is the older approach. We now recommend using inline styles with CSS variables (see above).

### themeClasses (Legacy)

Pre-built Tailwind classes:

```tsx
import { themeClasses } from '@/lib/theme-utils'

<div className={themeClasses.bgPrimary}>
<h1 className={themeClasses.textPrimary}>
<button className={themeClasses.button.primary}>
```

**Limitation:** May not have enough CSS specificity to override component defaults.

### typography (Still Useful)

Responsive typography sizes:

```tsx
import { typography } from '@/lib/theme-utils'

<h1 className={typography.heroTitle}> // text-6xl md:text-8xl
<h2 className={typography.sectionTitle}> // text-4xl md:text-5xl
```

**Use this:** Typography classes are still useful for size/responsiveness. Just apply color via inline styles.

## Migration Guide

### Step-by-Step: Converting a Component to Use Theme System

#### Step 1: Find Hardcoded Colors

```bash
# Find hardcoded colors in your component
grep -r "#2A2C53\|#E87722\|bg-\[#\|text-\[#" components/your-component.tsx
```

#### Step 2: Replace with Inline Styles

**Before:**
```tsx
<section className="py-20 bg-[#2A2C53]">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl md:text-5xl font-bold text-[#2A2C53]">
      Title
    </h2>
    <button className="bg-[#2A2C53] text-white rounded-full px-6 py-3">
      Click Me
    </button>
  </div>
</section>
```

**After:**
```tsx
import { typography } from '@/lib/theme-utils'

<section
  className="py-20"
  style={{ backgroundColor: 'var(--theme-primary)' }}
>
  <div className="max-w-7xl mx-auto px-4">
    <h2
      className={`${typography.sectionTitle} font-bold mb-6`}
      style={{ color: 'var(--theme-primary)' }}
    >
      Title
    </h2>
    <Button
      variant={null as any}
      style={{
        backgroundColor: 'var(--theme-primary)',
        color: 'var(--theme-primary-foreground)',
      }}
      className="rounded-full px-6 py-3"
    >
      Click Me
    </Button>
  </div>
</section>
```

#### Step 3: Remove Inline fontFamily (if present)

If you added `fontFamily` to h1/h2/h3 elements, remove it and let the font inherit from global CSS:

```tsx
// ❌ Remove this
<h2 style={{ color: 'var(--theme-primary)', fontFamily: 'Playfair Display, serif' }}>

// ✅ Keep only color
<h2 style={{ color: 'var(--theme-primary)' }}>
```

### Common Replacement Patterns

| Element | Old Approach | New Approach (Recommended) |
|---------|-------------|----------------------------|
| Background | `className="bg-[#2A2C53]"` | `style={{ backgroundColor: 'var(--theme-primary)' }}` |
| Text Color | `className="text-[#2A2C53]"` | `style={{ color: 'var(--theme-primary)' }}` |
| Border | `className="border-[#2A2C53]"` | `style={{ borderColor: 'var(--theme-primary)' }}` |
| Button | `className="bg-[#2A2C53]"` | `style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-foreground)' }}` |
| Heading Font | `className="font-playfair"` | Remove, let inherit from global CSS |

## Forking Themes

To create multiple themed sites from the same codebase:

### Method 1: Branch-Based Themes

1. Create a branch for each theme:
```bash
git checkout -b theme-modern
# Update site.config.ts to use 'modern' theme
git commit -am "Switch to modern theme"

git checkout main
git checkout -b theme-elegant
# Update site.config.ts to use 'elegant' theme
git commit -am "Switch to elegant theme"
```

2. Deploy each branch separately to different domains

### Method 2: Environment-Based Themes

1. Set theme via environment variable in `.env.local`:
```
NEXT_PUBLIC_THEME=modern
```

2. Update `site.config.ts`:
```typescript
theme: (process.env.NEXT_PUBLIC_THEME || 'professional') as const,
```

3. Deploy the same codebase with different env vars

## CSS Variables Reference

All theme values are available as CSS variables:

```css
--theme-primary
--theme-primary-foreground
--theme-secondary
--theme-secondary-foreground
--theme-accent
--theme-accent-foreground
--theme-background
--theme-foreground
--theme-muted
--theme-muted-foreground
--theme-border
--theme-input
--theme-ring

--theme-font-heading
--theme-font-subheading
--theme-font-body
```

Use in Tailwind:
```tsx
<div className="bg-[var(--theme-primary)] text-[var(--theme-primary-foreground)]">
```

## Best Practices

1. **Use inline styles with CSS variables** for all theme-dependent colors
2. **Use `variant={null as any}` on shadcn buttons** to opt out of default styling
3. **Let headings inherit fonts** - don't add inline `fontFamily` to h1/h2/h3
4. **Use `typography` classes** for responsive font sizes
5. **Test your site with multiple themes** to ensure flexibility
6. **Keep custom styles minimal** - rely on the theme system
7. **For SVG elements requiring color values**, use `useEffect` to read CSS variables into state
8. **Reference homepage components** as implementation examples

### Why This Approach Works

- ✅ **High CSS specificity** - Inline styles override everything
- ✅ **No Tailwind limitations** - Works with all CSS properties
- ✅ **Dynamic updates** - CSS variables change instantly with theme
- ✅ **SSR-compatible** - Perfect for Next.js
- ✅ **Type-safe** - CSS variable names are checked
- ✅ **Font optimization** - Next.js preloads and optimizes fonts

## Troubleshooting

### Theme colors not applying

**Problem:** Component still shows hardcoded colors

**Solutions:**
1. Check if inline styles are present: `style={{ backgroundColor: 'var(--theme-primary)' }}`
2. Verify CSS variable name is correct (no typos)
3. Use browser DevTools to inspect element and check computed styles
4. Look for hardcoded color classes like `bg-[#2A2C53]` that need removal

### Fonts not displaying correctly

**Problem:** Wrong font showing on headings

**Solutions:**
1. **Remove any inline `fontFamily` styles** from h1/h2/h3 elements
2. Check browser DevTools → Computed → font-family to see what's applied
3. Verify ThemeInjector is in your root layout
4. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R) to clear font cache
5. Check `/lib/fonts.ts` has the font imported
6. Verify theme config uses `var(--font-name)` syntax

### Button colors not working

**Problem:** shadcn Button component ignoring theme colors

**Solution:** Use `variant={null as any}` and `size={null as any}` to opt out of shadcn defaults:

```tsx
<Button
  variant={null as any}
  size={null as any}
  style={{
    backgroundColor: 'var(--theme-primary)',
    color: 'var(--theme-primary-foreground)',
  }}
  className="px-6 py-3 rounded-full"
>
  My Button
</Button>
```

### SVG colors not working

**Problem:** SVG elements in libraries like `react-simple-maps` don't support CSS variables

**Solution:** Read CSS variable into state with `useEffect`:

```tsx
const [themeColor, setThemeColor] = useState("#E87722")

useEffect(() => {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue('--theme-primary')
    .trim()
  if (color) setThemeColor(color)
}, [])

// Use state variable in SVG
<path fill={themeColor} />
```

### Theme not switching

**Problem:** Changed theme in `site.config.ts` but site looks the same

**Solutions:**
1. Restart dev server: Stop and run `pnpm dev` again
2. Hard refresh browser
3. Check `site.config.ts` for typos in theme name
4. Verify theme exists in `theme.config.ts`

## Quick Reference

### Components Using Theme System (Reference Implementations)

All homepage components are fully themed and can be used as examples:

- ✅ `components/navigation.tsx` - Navigation with themed logo and button
- ✅ `components/hero-section.tsx` - Hero with themed title and CTAs
- ✅ `components/results-ticker.tsx` - Themed background and content
- ✅ `components/practice-areas.tsx` - Themed cards with icons
- ✅ `components/jurisdictional-reach.tsx` - SVG map with dynamic theming
- ✅ `components/client-commitment.tsx` - Themed CTA section
- ✅ `components/footer.tsx` - Themed footer with contacts
- ✅ `components/logo.tsx` - Dynamic themed logo component

### File Structure

```
/lib
  /fonts.ts                  # Next.js font imports
  /theme-utils.ts            # Typography and legacy utilities

/theme.config.ts             # Theme definitions
/site.config.ts              # Theme selection

/app
  /layout.tsx                # Font variables applied
  /globals.css               # Base styles (no hardcoded fonts)

/components
  /theme-injector.tsx        # CSS variables and global font rules
  /logo.tsx                  # Dynamic themed logo
```

## Next Steps

- [ ] Migrate remaining components (blog, results page) to use inline styles
- [ ] Create theme preview/switcher component for development
- [ ] Add documentation for adding custom fonts beyond Google Fonts
- [ ] Consider theme variant system (dark mode support)
