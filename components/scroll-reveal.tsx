"use client"

import { useEffect, useRef } from "react"

export function ScrollRevealInit() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) {
      showAll()
      return
    }

    Promise.all([
      import("gsap").catch(() => null),
      import("gsap/ScrollTrigger").catch(() => null),
    ])
      .then(([gsapModule, stModule]) => {
        if (!gsapModule || !stModule) {
          showAll()
          return
        }

        const gsap = (gsapModule as any).default || gsapModule
        const ScrollTrigger = (stModule as any).default || stModule
        gsap.registerPlugin(ScrollTrigger)

        initFadeUp(gsap, ScrollTrigger)
        initFadeIn(gsap, ScrollTrigger)
        initScale(gsap, ScrollTrigger)
        initStagger(gsap, ScrollTrigger)
        initWords(gsap, ScrollTrigger)
        initParallax(gsap, ScrollTrigger)
        initScrollProgress(gsap, ScrollTrigger)

        ScrollTrigger.refresh()
      })
      .catch(() => showAll())
  }, [])

  return null
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
  ScrollTrigger.batch('[data-reveal="fade-up"]', {
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
  ScrollTrigger.batch('[data-reveal="fade-in"]', {
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
  ScrollTrigger.batch('[data-reveal="scale"]', {
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
  document.querySelectorAll('[data-reveal="stagger"]').forEach((parent) => {
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

function initWords(gsap: any, ScrollTrigger: any) {
  document.querySelectorAll('[data-reveal="words"]').forEach((el) => {
    const text = el.textContent || ""
    const words = text.split(/\s+/).filter(Boolean)

    el.innerHTML = words
      .map(
        (word) =>
          `<span class="word"><span class="word-inner">${word}</span></span>`
      )
      .join(" ")

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
