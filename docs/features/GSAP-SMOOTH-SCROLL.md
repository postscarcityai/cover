# GSAP Smooth Scroll Integration

**Status:** Optional Feature (Disabled by Default)  
**Dependencies:** `gsap ^3.12.2`

## Overview

The template now includes optional GSAP-powered smooth scrolling with momentum effects. This feature is disabled by default and can be enabled through site configuration.

## Features

- **Momentum-based scrolling** - Smooth, physics-based scroll animations
- **Mobile detection** - Automatically disables on mobile/touch devices
- **Scroll progress indicator** - Visual progress bar at top of page
- **Route change handling** - Resets scroll position on navigation
- **Custom scroll events** - Dispatches events for other components to use

## Setup

### 1. Enable in Configuration

Edit `site.config.ts`:

```typescript
features: {
  smoothScroll: true // Enable GSAP smooth scrolling
}
```

### 2. Install GSAP (if not already installed)

```bash
npm install gsap
# or
pnpm add gsap
```

### 3. Verify Layout Structure

The layout automatically wraps content in scroll containers when `smoothScroll` is enabled. No additional changes needed.

## Usage

The `ScrollSmoother` component is automatically added to your layout when enabled. Customize settings in `app/layout.tsx`:

```tsx
<ScrollSmoother 
  smooth={0.08}          // Lower = more momentum (0.05-0.2)
  speed={1}              // Response speed multiplier
  ease="power2.out"      // Easing curve
  normalizeScroll={true}
  effects={true}         // Show scroll progress bar
/>
```

## Mobile Behavior

Smooth scrolling is automatically disabled on:
- Mobile devices (iPhone, iPad, Android, etc.)
- Small screens (< 1024px) with touch capability
- Desktop PCs with touchscreens remain enabled

## Custom Scroll Events

Other components can listen to scroll events:

```tsx
useEffect(() => {
  const handleScroll = (e: CustomEvent<{ scrollY: number }>) => {
    const scrollY = e.detail.scrollY
    // Use scroll position
  }
  
  window.addEventListener('smoothscroll', handleScroll as EventListener)
  return () => window.removeEventListener('smoothscroll', handleScroll as EventListener)
}, [])
```

## Troubleshooting

**Scroll not working?**
- Ensure GSAP is installed: `npm install gsap`
- Check that `features.smoothScroll` is `true` in `site.config.ts`
- Verify console for any GSAP errors

**Performance issues?**
- Smooth scrolling is disabled on mobile automatically
- Consider adjusting `smooth` value (higher = less momentum)
- Disable `effects` if scroll progress bar not needed

**Components not scrolling properly?**
- Ensure fixed-position elements are outside scroll wrapper
- Navigation should be outside `smooth-wrapper` (handled automatically)

## Notes

- This feature is optional and the site works perfectly without it
- Disabled by default to keep template lightweight
- GSAP is loaded dynamically (only when enabled)
- Gracefully degrades if GSAP is not installed

