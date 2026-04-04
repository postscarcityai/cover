"use client"

import { useEffect, useRef } from "react"

// Track SplitText instances for cleanup/revert
const splitInstances: any[] = []

export function ScrollRevealInit() {
  const gsapRef = useRef<any>(null)
  const ScrollTriggerRef = useRef<any>(null)
  const SplitTextRef = useRef<any>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) {
      showAll()
      return
    }

    const run = () => {
      const gsap = gsapRef.current
      const ScrollTrigger = ScrollTriggerRef.current
      const SplitText = SplitTextRef.current
      if (!gsap || !ScrollTrigger) return

      ScrollTrigger.getAll().forEach((t: any) => t.kill())
      splitInstances.forEach((s) => s.revert?.())
      splitInstances.length = 0

      initHero(gsap, SplitText)
      initFadeUp(gsap, ScrollTrigger)
      initFadeIn(gsap, ScrollTrigger)
      initScale(gsap, ScrollTrigger)
      initStagger(gsap, ScrollTrigger)
      initWords(gsap, ScrollTrigger, SplitText)
      initLines(gsap, ScrollTrigger, SplitText)
      initParallax(gsap, ScrollTrigger)
      initScrollProgress(gsap, ScrollTrigger)

      ScrollTrigger.refresh()
      animateElementsInViewport(gsap)
    }

    const handlePageEnterComplete = () => {
      if (gsapRef.current && ScrollTriggerRef.current) {
        requestAnimationFrame(() => run())
        return
      }

      Promise.all([
        import("gsap").catch(() => null),
        import("gsap/ScrollTrigger").catch(() => null),
        import("gsap/SplitText").catch(() => null),
      ])
        .then(([gsapModule, stModule, splitModule]) => {
          if (!gsapModule || !stModule) {
            showAll()
            return
          }

          const gsap = (gsapModule as any).default || gsapModule
          const ScrollTrigger = (stModule as any).default || stModule
          gsap.registerPlugin(ScrollTrigger)

          gsapRef.current = gsap
          ScrollTriggerRef.current = ScrollTrigger

          if (splitModule) {
            const SplitText = (splitModule as any).default || splitModule
            gsap.registerPlugin(SplitText)
            SplitTextRef.current = SplitText
          }

          requestAnimationFrame(() => run())
        })
        .catch(() => showAll())
    }

    window.addEventListener("page-enter-complete", handlePageEnterComplete)

    return () => {
      window.removeEventListener("page-enter-complete", handlePageEnterComplete)
      if (ScrollTriggerRef.current) {
        ScrollTriggerRef.current.getAll().forEach((t: any) => t.kill())
      }
      splitInstances.forEach((s) => s.revert?.())
      splitInstances.length = 0
    }
  }, [])

  return null
}

function isInViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect()
  const threshold = window.innerHeight * 0.85
  return rect.top < threshold
}

/** Hero elements stay visible by CSS — skip them in JS reveal to avoid CLS */
function isInsideHero(el: Element): boolean {
  return el.closest("[data-hero-section]") !== null
}

function filterNonHero(selector: string): Element[] {
  return Array.from(document.querySelectorAll(selector)).filter(el => !isInsideHero(el))
}

function animateElementsInViewport(gsap: any) {
  filterNonHero('[data-reveal="fade-up"]').forEach((el) => {
    if (isInViewport(el)) {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", overwrite: true })
    }
  })

  filterNonHero('[data-reveal="fade-in"]').forEach((el) => {
    if (isInViewport(el)) {
      gsap.to(el, { opacity: 1, duration: 0.8, ease: "power2.out", overwrite: true })
    }
  })

  filterNonHero('[data-reveal="scale"]').forEach((el) => {
    if (isInViewport(el)) {
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", overwrite: true })
    }
  })

  filterNonHero('[data-reveal="stagger"]').forEach((parent) => {
    if (!isInViewport(parent)) return
    const children = Array.from(parent.children) as HTMLElement[]
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      overwrite: true,
    })
  })

  filterNonHero('[data-reveal="words"]').forEach((el) => {
    if (!isInViewport(el)) return
    const inners = el.querySelectorAll(".word-inner, div")
    gsap.to(inners, {
      y: "0%",
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.05,
    })
  })

  filterNonHero('[data-reveal="lines"]').forEach((el) => {
    if (!isInViewport(el)) return
    const lines = el.querySelectorAll(".line")
    gsap.to(lines, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    })
  })
}

function showAll() {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    const htmlEl = el as HTMLElement
    htmlEl.style.opacity = "1"
    htmlEl.style.transform = "none"
    el.querySelectorAll("*").forEach((child) => {
      const c = child as HTMLElement
      c.style.opacity = "1"
      c.style.transform = "none"
    })
  })
}

function initFadeUp(gsap: any, ScrollTrigger: any) {
  const els = filterNonHero('[data-reveal="fade-up"]')
  if (!els.length) return
  ScrollTrigger.batch(els, {
    onEnter: (batch: HTMLElement[]) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        overwrite: true,
      })
    },
    start: "top 85%",
    once: true,
  })
}

function initFadeIn(gsap: any, ScrollTrigger: any) {
  const els = filterNonHero('[data-reveal="fade-in"]')
  if (!els.length) return
  ScrollTrigger.batch(els, {
    onEnter: (batch: HTMLElement[]) => {
      gsap.to(batch, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.1,
        overwrite: true,
      })
    },
    start: "top 85%",
    once: true,
  })
}

function initScale(gsap: any, ScrollTrigger: any) {
  const els = filterNonHero('[data-reveal="scale"]')
  if (!els.length) return
  ScrollTrigger.batch(els, {
    onEnter: (batch: HTMLElement[]) => {
      gsap.to(batch, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
        overwrite: true,
      })
    },
    start: "top 85%",
    once: true,
  })
}

function initStagger(gsap: any, ScrollTrigger: any) {
  filterNonHero('[data-reveal="stagger"]').forEach((parent) => {
    const children = parent.children
    ScrollTrigger.create({
      trigger: parent,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          overwrite: true,
        })
      },
    })
  })
}

/**
 * Word-by-word reveal using SplitText (with manual fallback)
 */
function initWords(gsap: any, ScrollTrigger: any, SplitText: any) {
  filterNonHero('[data-reveal="words"]').forEach((el) => {
    const htmlEl = el as HTMLElement

    if (SplitText) {
      const split = new SplitText(el, {
        type: "words",
        wordsClass: "word",
      })
      splitInstances.push(split)

      // Wrap each word's content in an inner span for the clip/translate reveal
      split.words.forEach((word: HTMLElement) => {
        word.style.overflow = "hidden"
        word.style.display = "inline-block"
        word.style.paddingBottom = "0.15em"
        word.style.marginBottom = "-0.15em"
        const inner = document.createElement("span")
        inner.className = "word-inner"
        inner.style.display = "inline-block"
        inner.style.transform = "translateY(110%)"
        while (word.firstChild) inner.appendChild(word.firstChild)
        word.appendChild(inner)
      })

      htmlEl.style.opacity = "1"

      const inners = el.querySelectorAll(".word-inner")
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(inners, {
            y: "0%",
            duration: 1,
            ease: "power3.out",
            stagger: 0.05,
          })
        },
      })
    } else {
      // Manual fallback (original implementation)
      const text = el.textContent || ""
      const words = text.split(/\s+/).filter(Boolean)
      el.innerHTML = words
        .map(
          (word) =>
            `<span class="word"><span class="word-inner">${word}</span></span>`
        )
        .join(" ")

      htmlEl.style.opacity = "1"

      const inners = el.querySelectorAll(".word-inner")
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(inners, {
            y: "0%",
            duration: 1,
            ease: "power3.out",
            stagger: 0.05,
          })
        },
      })
    }
  })
}

/**
 * Hero reveals — fires on page load (not scroll) since the hero is already in view.
 * Uses the same word-level odometer as initWords for consistency.
 */
function initHero(gsap: any, SplitText: any) {
  // Hero word reveals (h1)
  const heroWords = Array.from(
    document.querySelectorAll('[data-hero-section] [data-reveal="words"]')
  )
  heroWords.forEach((el) => {
    const htmlEl = el as HTMLElement

    if (SplitText) {
      const split = new SplitText(el, {
        type: "words",
        wordsClass: "word",
      })
      splitInstances.push(split)

      split.words.forEach((word: HTMLElement) => {
        word.style.overflow = "hidden"
        word.style.display = "inline-block"
        word.style.paddingBottom = "0.15em"
        word.style.marginBottom = "-0.15em"
        const inner = document.createElement("span")
        inner.className = "word-inner"
        inner.style.display = "inline-block"
        inner.style.transform = "translateY(110%)"
        while (word.firstChild) inner.appendChild(word.firstChild)
        word.appendChild(inner)
      })

      htmlEl.style.opacity = "1"

      gsap.to(el.querySelectorAll(".word-inner"), {
        y: "0%",
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
      })
    } else {
      const text = el.textContent || ""
      const words = text.split(/\s+/).filter(Boolean)
      el.innerHTML = words
        .map((w) => `<span class="word"><span class="word-inner">${w}</span></span>`)
        .join(" ")
      htmlEl.style.opacity = "1"

      gsap.to(el.querySelectorAll(".word-inner"), {
        y: "0%",
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
      })
    }
  })

  // Hero fade-up elements (subtitle, CTA)
  const heroFadeUps = Array.from(
    document.querySelectorAll('[data-hero-section] [data-reveal="fade-up"]')
  )
  heroFadeUps.forEach((el) => {
    const htmlEl = el as HTMLElement
    gsap.set(htmlEl, { opacity: 0, y: 60 })
    gsap.to(htmlEl, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 })
  })

  // Hero fade-in elements (trust text)
  const heroFadeIns = Array.from(
    document.querySelectorAll('[data-hero-section] [data-reveal="fade-in"]')
  )
  heroFadeIns.forEach((el) => {
    const htmlEl = el as HTMLElement
    gsap.set(htmlEl, { opacity: 0 })
    gsap.to(htmlEl, { opacity: 1, duration: 1, ease: "power2.out", delay: 0.6 })
  })
}

/**
 * Line-by-line reveal using SplitText
 */
function initLines(gsap: any, ScrollTrigger: any, SplitText: any) {
  if (!SplitText) {
    // Fallback: treat as fade-up
    filterNonHero('[data-reveal="lines"]').forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.opacity = "0"
      htmlEl.style.transform = "translateY(60px)"
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        },
      })
    })
    return
  }

  filterNonHero('[data-reveal="lines"]').forEach((el) => {
    const htmlEl = el as HTMLElement

    const split = new SplitText(el, {
      type: "lines",
      linesClass: "line",
    })
    splitInstances.push(split)

    // Wrap each line in a clip container for the masked reveal
    split.lines.forEach((line: HTMLElement) => {
      const wrapper = document.createElement("div")
      wrapper.style.overflow = "hidden"
      line.parentNode?.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.set(split.lines, {
      opacity: 0,
      y: "100%",
    })

    htmlEl.style.opacity = "1"

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(split.lines, {
          opacity: 1,
          y: "0%",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
        })
      },
    })
  })
}

function initParallax(gsap: any, ScrollTrigger: any) {
  document.querySelectorAll('[data-reveal="parallax"]').forEach((el) => {
    gsap.to(el, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })
  })
}

function initScrollProgress(gsap: any, ScrollTrigger: any) {
  const bar = document.querySelector(".scroll-progress")
  if (!bar) return

  gsap.to(bar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
    },
  })

  gsap.set(bar, { scaleX: 0 })
}
