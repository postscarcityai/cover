# New Components Added

This document lists the new components added to the template based on FINESSE improvements.

## FAQ Accordion Component

**File:** `components/faq-accordion.tsx`

Accessible FAQ accordion with Schema.org structured data.

### Features
- Only one FAQ open at a time
- Smooth expand/collapse animations
- Schema.org FAQPage structured data for SEO
- Keyboard accessible
- ARIA compliant

### Usage

```tsx
import { FAQAccordion } from '@/components/faq-accordion'

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy..."
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping typically takes 5-7 business days..."
  }
]

<FAQAccordion faqs={faqs} className="my-8" />
```

---

## Scroll Smoother Component

**File:** `components/scroll-smoother.tsx`

See [GSAP-SMOOTH-SCROLL.md](./GSAP-SMOOTH-SCROLL.md) for full documentation.

This component is automatically integrated when `features.smoothScroll` is enabled in `site.config.ts`.

---

## Component Import Paths

All new components follow the standard import pattern:

```tsx
import { FAQAccordion } from '@/components/faq-accordion'
import { ScrollSmoother } from '@/components/scroll-smoother'
```

---

## Styling Notes

- All components use theme CSS variables (`var(--theme-primary)`)
- Components are responsive by default
- Follow existing design system patterns
- Use Tailwind utility classes where possible

