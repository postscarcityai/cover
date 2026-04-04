# Finesse Plastic Surgery | Work Research

## Summary

Finesse is a high-end plastic surgery site built to feel editorial, cinematic, and conversion-focused without reading like a generic med-spa template. The standout move is the balance: luxury visuals up front, serious compliance and intake plumbing underneath.

## What the product is

A Next.js site for Finesse Plastic Surgery that combines:

- service and procedure landing pages
- a large before-and-after gallery
- a guided treatment planner
- conversion paths for consultation requests
- legal, privacy, and accessibility documentation expected from a medical practice

## Technical shape

- Framework: Next.js 15, React 19, TypeScript
- Styling/UI: Tailwind, Framer Motion, GSAP, Lenis-style custom scroll system
- Data/storage: Supabase shows up in the stack and SQL migrations
- Content footprint: 42 blog files and 15 procedure directories

## What stands out

### 1. The hero experience is not filler

The homepage hero runs a full-screen video treatment with large typography, key procedures, and scroll-based motion. It feels like a fashion or editorial site, not a commodity clinic page.

The implementation is deliberate:

- full-viewport video on mobile and desktop
- scroll-linked scale, opacity, and blur
- procedure links embedded directly in the hero
- strong visual restraint, soft palette, minimal chrome

There is also a separate vintage slider system that pushes a film look with Ken Burns motion, grain, vignette, scan lines, and subtle flicker. That is a strong portfolio detail because it shows taste, not just engineering.

### 2. The treatment planner is the best product story

The treatment planner is more than a contact form. It is a guided intake funnel with:

- multi-step flow
- body diagram interaction
- treatment selection by body area
- media upload support
- progress saves to the backend
- analytics capture on the first save
- thank-you routing on completion

It also captures session and attribution data like:

- session ID
- landing page
- screen resolution
- page views and pages viewed
- time on site
- form fill time
- referrer and UTM parameters

That makes it a strong case study candidate because it ties brand experience to real lead capture and attribution.

### 3. The gallery work is serious

The gallery is not just a static image grid. It includes:

- structured case data
- procedure-based filtering
- reusable gallery cards and thumbnails
- procedure pages that pull in relevant cases automatically
- a documented verification process against the legacy Drupal source

One report documents 14 fixed discrepancies across breast cases, verification across body cases, and a production-readiness conclusion. That is valuable because it shows migration discipline and content QA, not just front-end polish.

### 4. Compliance is built into the product

This repo has unusual depth for compliance work. It includes:

- HIPAA-oriented privacy policy and Notice of Privacy Practices pages
- explicit 42 CFR Part 2 language for protected records
- TCPA consent fields and database migrations
- consent capture and audit-oriented schema design
- Supabase Row Level Security enabled on patient-related tables
- accessibility documentation with conservative scoring and automated test history

This matters for the portfolio because it proves the work can operate in regulated environments. A lot of agencies claim that. This repo shows the receipts.

## UX and design patterns worth calling out

- Editorial luxury aesthetic without overdesigned clutter
- Scroll and motion systems that are tuned, not random
- Mobile-aware fallbacks and reduced-motion handling in the scroll smoother
- Procedure-specific gallery experiences that keep users near conversion
- Legal and trust content presented as first-class pages, not buried boilerplate

## Strongest portfolio angles

### Angle 1: Luxury brand + regulated funnel

This is the cleanest story. The site looks premium, but the real value is that it supports compliant intake, patient privacy language, and audit-ready consent handling.

### Angle 2: Interactive treatment planner

This is the most product-like part of the build. It shows custom UX, state management, analytics, and conversion design in one place.

### Angle 3: Gallery migration and verification

The documentation around the before-and-after gallery is strong evidence of careful migration work and operational QA.

## Suggested proof points for the portfolio

- Built a cinematic Next.js marketing site for a plastic surgery practice
- Designed a multi-step treatment planner with body-map interaction and media upload
- Captured attribution and behavioral analytics inside the intake flow
- Migrated and verified a large before-and-after gallery against a live legacy source
- Implemented privacy, consent, and accessibility systems suitable for a medical practice

## Files that support the story

- `app/treatment-planner/page.tsx`
- `components/treatment-planner/treatment-planner.tsx`
- `components/hero-section.tsx`
- `components/vintage-hero-slider.tsx`
- `components/procedure-gallery-section.tsx`
- `docs/gallery-verification-final-report.md`
- `docs/COMPLIANCE-SUMMARY-FEB-14-2026.md`
- `ACCESSIBILITY-FINAL-STATUS.md`
- `migrations/002_create_contact_form_tables.sql`
- `migrations/004_add_tcpa_consent_fields.sql`

## Bottom line

Finesse is not just a pretty site. It is a polished front-end paired with real intake logic, attribution, migration QA, accessibility work, and medical-practice compliance. That combination makes it one of the stronger portfolio pieces in the queue.
