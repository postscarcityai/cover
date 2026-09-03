# Cover Variants

Cover is a framework, not a single site. `main` is the neutral base; each
**variant** is a long-lived branch carrying one coherent set of opinions on top
of it — an animation system, a design language, a content shape.

Variants are **checked out, not merged.** A variant branch is a product you can
start a client project from:

```bash
git clone git@github.com:postscarcityai/cover.git my-site
cd my-site
git checkout variant/lenis-smooth-scroll
```

## Rules

1. **Never merge a variant into `main`.** They are alternatives to each other,
   not increments. Two variants will usually conflict by design — that is the
   point, not a problem to resolve.
2. **`main` flows *into* variants, never out.** Base fixes (security bumps, SEO,
   accessibility, build config) land on `main` and get merged *down* into each
   variant. Nothing travels the other direction.
3. **One opinion per variant.** A variant should be describable in one line. If
   it needs two, it is probably two variants.
4. **A variant must build.** `pnpm build` green on the branch tip is the bar.
5. **Every variant documents itself** in `docs/features/`, including what it
   deleted from the base and how to opt out.

## Naming

```
variant/<slug>
```

`variant/` prefix so `git branch -r` reads as a catalogue. Slug is the opinion,
not the library — `variant/lenis-smooth-scroll` describes a scroll feel that
happens to be implemented with Lenis.

## Current variants

| Branch | Opinion | Docs |
|---|---|---|
| `variant/lenis-smooth-scroll` | Momentum scrolling on the real document scroll position | [LENIS-SMOOTH-SCROLL.md](features/LENIS-SMOOTH-SCROLL.md) |
| `variant/scroll-video` | Scroll-scrubbed video + sticky choreography. **Branched off `variant/lenis-smooth-scroll`, not `main`** — the scrub engine needs a document that actually scrolls. | [SCROLL-VIDEO.md](features/SCROLL-VIDEO.md) |

### Not yet under the convention

| Branch | Status |
|---|---|
| `awwwards` | Predates this convention — WebGL shaders, GSAP premium plugins, new design system. Rename to `variant/awwwards` when convenient. |

## Keeping a variant current

```bash
git checkout variant/lenis-smooth-scroll
git merge main
pnpm build
git push
```

Do this whenever `main` takes a base fix. The longer a variant lags, the more
the merge costs.

## Adding a variant

```bash
git checkout -b variant/<slug> main
# build the opinion
pnpm build
git push -u origin variant/<slug>
```

Then add a row to the table above **on `main`** — the catalogue is the one thing
that belongs to the base, so `main` stays the index of what exists.
