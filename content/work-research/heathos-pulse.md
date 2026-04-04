# Heathos Pulse | Work Research

## Summary

Heathos Pulse is a digital monthly newsletter product built as a website, not a PDF dump. Each issue feels like a lightweight magazine with themed visuals, modular sections, smooth scrolling, and a repeatable monthly production system.

## What the product is

A Next.js publication site for internal or partner-facing health insurance newsletter issues. The content mixes:

- CEO message
- agent essentials
- regulatory and market updates
- events and calendar sections
- links back to Heathos and FirstEnroll resources
- lighter engagement sections like puzzles and games

There is also a print-friendly Open Enrollment checklist page, which expands the product beyond the main issue format.

## Technical shape

- Framework: Next.js, React, TypeScript
- UI patterns: themed issue layouts, shader backgrounds, motion, smooth scrolling, mobile footer nav
- Content architecture: month-specific pages and month-specific component folders
- Workflow support: markdown source files and command docs for creating the next monthly issue

## What stands out

### 1. The newsletter is treated like a product

Each monthly issue is its own page and visual system, not just a CMS entry. April and December both show the pattern clearly:

- custom issue colors
- branded hero cover
- table of contents with section jumps
- modular content sections
- mobile-friendly reading flow

That makes the work feel more like an interactive publication than an email archive.

### 2. The system is repeatable

The repo includes a documented monthly issue workflow that points to markdown inputs and structured updates by section. That matters because it shows this was designed to keep shipping, not just to launch once.

Good portfolio line: a repeatable editorial system that turns monthly source content into a polished, on-brand web issue.

### 3. The cover treatment does real work

The hero content is carrying more than decoration. It sets volume, month, year, key message, partner logos, and an animated CEO pull quote. That gives each issue a cover-story feel.

The table of contents pattern also improves scanability, especially on long issues. That is a real usability win for dense partner communications.

### 4. The issue system supports thematic variation

Issue colors shift by month. December uses winter treatment and snow effects. April uses a different color system and event framing. That tells a strong story: the team built a reusable issue framework without forcing every issue into the same template.

### 5. There is evidence of a practical content pipeline

The December source markdown file shows editorial content was prepared outside the UI and then mapped into the site. The command doc in `.cursor/commands/create-monthly-issue.md` reinforces that there was an explicit production workflow.

That is good portfolio material because it shows operations, not just design.

## UX and design patterns worth calling out

- Cover-page treatment with month-specific art direction
- Longform issues broken into clear modular sections
- smooth-scroll section navigation through the table of contents
- strong mobile reading support with persistent footer navigation
- issue-specific theme colors and backgrounds
- a print-friendly resource page for the Open Enrollment checklist

## Strongest portfolio angles

### Angle 1: Interactive editorial system

This is the strongest angle. Heathos Pulse turns routine monthly communications into a branded web product people can actually read.

### Angle 2: Repeatable issue production pipeline

The presence of markdown source content and issue creation instructions makes this more credible than a one-off showcase build.

### Angle 3: Information design for a dense audience

The target user is an insurance agent or partner who needs quick access to updates, deadlines, and resources. The structure reflects that. It scans well and stays organized even when the content volume is high.

## Suggested proof points for the portfolio

- Built a web-first monthly publication for the health insurance ecosystem
- Created a modular issue framework with custom monthly themes and section-based navigation
- Designed a repeatable production workflow from markdown content to published issue pages
- Added companion utility pages like a print-ready Open Enrollment checklist
- Balanced editorial presentation with practical partner communications and resource links

## Files that support the story

- `app/2026/april/page.tsx`
- `app/2025/december/page.tsx`
- `components/hero-content.tsx`
- `components/table-of-contents.tsx`
- `components/issue-card.tsx`
- `lib/issue-colors.ts`
- `app/oe-checklist-print/page.tsx`
- `tmp/ON THE PULSE – December.md`
- `.cursor/commands/create-monthly-issue.md`

## Bottom line

Heathos Pulse is a clean example of turning recurring business communications into a polished digital product. It is editorial, structured, and maintainable. The best portfolio story is not just that it looks good. It is that the team built a system for shipping monthly issues with real information design and reusable production logic.
