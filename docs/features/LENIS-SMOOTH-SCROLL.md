# Lenis Smooth Scroll

**Variant branch:** `variant/lenis-smooth-scroll`
**Status:** Optional feature, gated on `features.smoothScroll`
**Dependencies:** `lenis`, `gsap`, `@gsap/react`

## Overview

This variant replaces the template's hand-rolled wheel-hijacking scroller with
[Lenis](https://github.com/darkroomengineering/lenis).

Lenis **interpolates the real document scroll position**. It does not translate
a fixed wrapper. That single difference is what makes this variant simpler than
both the original hand-rolled smoother and GSAP's `ScrollSmoother` plugin:

| | Hand-rolled | GSAP ScrollSmoother | **Lenis** |
|---|---|---|---|
| Wrapper elements | `#smooth-wrapper` + `#smooth-content` | same | **none** |
| Transform containing block | yes — breaks `position: fixed` | yes | **none** |
| `window.scrollY` accurate | no | no | **yes** |
| Native `scroll` event fires | no | no | **yes** |
| Keyboard paging / space bar | no | yes | **yes** |
| Scrollbar drag | no (`overflow: hidden`) | yes | **yes** |
| Find-in-page, tab-to-offscreen | no | partial | **yes** |

## What this deleted

Because `window.scrollY` and the native `scroll` event are correct again, every
workaround built around the old transform came out:

- `components/scroll-smoother.tsx` — the whole wheel-hijack loop
- the `#smooth-wrapper` / `#smooth-content` divs in `app/layout.tsx`
- the layout comment explaining why `<Navigation>` had to live outside them
- three `#smooth-wrapper` / `#smooth-content` blocks in `app/globals.css`
- the parallel `smoothscroll` CustomEvent listeners in `components/navigation.tsx`
- the wrapper `pointerEvents` toggling in `lib/modal-utils.ts`

## Architecture

```
components/smooth-scroll-provider.tsx   ReactLenis + gsap.ticker wiring
lib/smooth-scroll.ts                    registry — getLenis() / setLenis()
```

`lib/smooth-scroll.ts` is the seam. Anything that needs to *command* the
scroller (modal locking, programmatic scrollTo) calls `getLenis()` and falls
back to native behaviour when it returns `null`. Anything that only needs to
*read* scroll position should use `window.scrollY` and never touch it.

## The one thing you must not break

ScrollTrigger has to be updated from Lenis's `scroll` event:

```tsx
lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.lagSmoothing(0)
```

Lenis fires `scroll` synchronously right after it applies each frame's
position, so ScrollTrigger reads a fresh value in the same frame instead of one
frame stale. Without it, scroll-linked animations visibly lag the page.
**ScrollTrigger is live in `components/scroll-reveal.tsx` and
`lib/engagement-tracker.ts`**, so this is required here, not optional.

### Why not the `gsap.ticker` recipe?

The commonly-posted integration also sets `autoRaf: false` and drives Lenis
from GSAP's ticker:

```tsx
// deliberately NOT used here
<ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
gsap.ticker.add((time) => lenisRef.current?.lenis?.raf(time * 1000))
```

That unifies GSAP's tween loop with Lenis's, which is a real but minor win. It
also makes **the page's ability to scroll at all** depend on an async `import()`
resolving — a slow or failed GSAP chunk leaves the wheel completely dead, with
no error, because nothing is left driving `raf`. Correct *ordering* is what
actually matters, and the `scroll` listener above already provides it. Lenis
keeps its own rAF loop.

If you do adopt the ticker recipe on a future variant, note two traps that cost
real time here:

1. `gsap.ticker` reports **seconds**; `lenis.raf` expects **milliseconds**.
   Hence `time * 1000`.
2. `ReactLenis` holds its instance in `useState` and only exposes it *after*
   its own construction effect runs. A parent component reading
   `ref.current.lenis` inside its first `useEffect` gets `undefined` — and if
   it captures that into a `const`, it stays `undefined` forever and the
   scroller silently never moves. Use the `useLenis()` hook from a **child** of
   `<ReactLenis>` instead, which subscribes and re-runs when the instance
   appears. That is what `LenisBridge` in the provider is for.

## Configuration

Enable in `site.config.ts`:

```ts
features: {
  smoothScroll: true,
}
```

Tune in `app/layout.tsx`:

```tsx
<SmoothScrollProvider lerp={0.1}>{children}</SmoothScrollProvider>
```

`lerp` is the per-frame interpolation factor. Lower = more momentum and float.
Useful range is roughly `0.05`–`0.2`; `1` is effectively native.

## Deliberate choices

- **`syncTouch: false`** — touch is left alone. Native iOS/Android momentum and
  rubber-banding beat anything we can interpolate, and smoothing them costs the
  platform physics while feeling laggy under the finger. This is also Lenis's
  own default.
- **`prefers-reduced-motion`** — flips `smoothWheel` off and keeps watching the
  media query, so toggling the OS setting takes effect without a reload.
- **Route change** — scrolls to top with `immediate: true`, skipped when the URL
  carries a hash so deep links like `/services#pricing` still land on target.
- **Lenis CSS is inlined** into `app/globals.css` rather than `@import`-ed. A
  CSS `@import` must precede the `@tailwind` directives, and that ordering is
  easy to break silently on a later edit.

## Opting out

Set `features.smoothScroll: false`. The provider is bypassed entirely, no Lenis
class lands on `<html>`, every rule in the Lenis CSS block is inert, and the
page scrolls natively. Nothing else in the template needs to change.
