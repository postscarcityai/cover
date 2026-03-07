# Navigation Enhancements from FINESSE

This document describes the navigation enhancements added to the template based on FINESSE improvements.

## Features Added

### 1. Navigation Dropdown/Submenu Support ✅

**What it does:**
- Supports nested navigation menus with sections
- Desktop: Full-width megamenu dropdowns with hover support
- Mobile: Accordion-style expandable submenus
- Smooth animations with Framer Motion

**How to use:**

In `site.config.ts`, add submenu structure to navigation items:

```typescript
navigation: [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    submenu: [
      {
        label: "Meet the Team",
        items: [
          { label: "Team Member 1", href: "/about/team-member-1" },
          { label: "Team Member 2", href: "/about/team-member-2" }
        ]
      },
      {
        label: "Our Practice",
        items: [
          { label: "Our Office", href: "/about/office" },
          { label: "History", href: "/about/history" }
        ]
      }
    ]
  },
  { label: "Services", href: "/services" },
  // ...
]
```

**Features:**
- Desktop: Hover to open dropdown, click to navigate
- Mobile: Tap to expand/collapse submenu
- ChevronDown icon rotates when active
- Smooth fade-in animations
- Backdrop overlay (desktop only)

---

### 2. Logo Hover Effects ✅

**What it does:**
- Logo changes color on hover
- Smooth color transitions
- Scale effect on hover

**Implementation:**
- Added `isHovered` prop to `Logo` component
- Navigation component tracks hover state
- Smooth CSS transitions

**Usage:**
Automatically enabled when logo is wrapped in navigation. No configuration needed.

---

### 3. Scroll-Based Navigation Hide/Show ✅

**What it does:**
- Hides navigation when scrolling down past 100px
- Shows navigation when scrolling up
- Always visible near top of page (< 50px)
- Smooth GSAP animations

**Configuration:**

In `site.config.ts`:

```typescript
features: {
  smoothScroll: true,          // Required: Enable GSAP smooth scrolling
  navigationScrollHide: true,   // Enable scroll-based hide/show
}
```

**Requirements:**
- `features.smoothScroll` must be `true`
- `features.navigationScrollHide` must be `true`
- GSAP must be installed (`npm install gsap`)

**Behavior:**
- Listens to `smoothscroll` custom events from ScrollSmoother
- Uses hysteresis thresholds to prevent flickering
- Automatically resets on route changes

**Disabled by default** - Template works perfectly without it.

---

### 4. Modal Handling Utilities ✅

**What it does:**
- Prevents smooth scroll conflicts when modals are open
- Disables body scroll
- Blocks smooth wrapper interactions

**Files:**
- `lib/modal-utils.ts` - Utility functions

**Usage:**

```tsx
import { disableSmoothScroll, enableSmoothScroll, useModalSmoothScroll } from '@/lib/modal-utils'

// Option 1: Manual control
const openModal = () => {
  disableSmoothScroll()
  // ... show modal
}

const closeModal = () => {
  enableSmoothScroll()
  // ... hide modal
}

// Option 2: React hook
const [isOpen, setIsOpen] = useState(false)
useModalSmoothScroll(isOpen) // Automatically handles enable/disable
```

**Features:**
- `disableSmoothScroll()` - Call when opening modal
- `enableSmoothScroll()` - Call when closing modal
- `useModalSmoothScroll(isOpen)` - React hook for automatic management

**Integration:**
- ScrollSmoother automatically checks for `data-modal-open` attribute
- No additional configuration needed

---

## Technical Details

### Type Safety

Navigation items now support optional `submenu` property:

```typescript
{
  label: string
  href: string
  submenu?: Array<{
    label: string
    items: Array<{ label: string; href: string }>
  }>
}
```

### GSAP Integration

- GSAP is loaded dynamically only when needed
- Gracefully degrades if GSAP is not installed
- Uses `@ts-ignore` for optional dependency imports

### Performance

- Dropdowns only render when active
- Animations use `will-change` for GPU acceleration
- Mobile menu uses CSS transforms for smooth animations

---

## Migration Guide

### For Existing Sites

**To add dropdown menus:**

1. Update `site.config.ts` navigation items with submenu structure
2. No component changes needed - navigation automatically detects submenus

**To enable scroll hide/show:**

1. Set `features.smoothScroll: true` in `site.config.ts`
2. Set `features.navigationScrollHide: true` in `site.config.ts`
3. Install GSAP: `npm install gsap`
4. Navigation will automatically hide/show on scroll

**To use modal utilities:**

1. Import utilities from `@/lib/modal-utils`
2. Call `disableSmoothScroll()` when opening modals
3. Call `enableSmoothScroll()` when closing modals

---

## Examples

### Simple Dropdown

```typescript
{
  label: "Services",
  href: "/services",
  submenu: [
    {
      label: "Main Services",
      items: [
        { label: "Service 1", href: "/services/service-1" },
        { label: "Service 2", href: "/services/service-2" }
      ]
    }
  ]
}
```

### Multi-Section Dropdown

```typescript
{
  label: "About",
  href: "/about",
  submenu: [
    {
      label: "Team",
      items: [
        { label: "John Doe", href: "/about/john" },
        { label: "Jane Smith", href: "/about/jane" }
      ]
    },
    {
      label: "Company",
      items: [
        { label: "History", href: "/about/history" },
        { label: "Careers", href: "/about/careers" }
      ]
    }
  ]
}
```

---

## Notes

- All features are backward compatible
- Navigation works without GSAP (just no scroll hide/show)
- Dropdowns are optional - regular navigation items work as before
- Logo hover effects are always enabled
- Modal utilities are optional - only needed if using modals with smooth scroll

