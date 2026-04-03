"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useScrambleText } from "@/hooks/use-scramble-text"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import { TransitionLink } from "@/components/transition-link"
import { trackNavClick } from "@/lib/analytics"
import { siteConfig } from "@/site.config"

interface NavigationProps {
  className?: string
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
}

const linkVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.25 },
  },
}

const contactVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)

  const navRef = useRef<HTMLElement>(null)
  const lastScrollPos = useRef(0)
  const isNavVisible = useRef(true)
  const gsapRef = useRef<any>(null)

  const { ref: menuTextRef, scrambleTo } = useScrambleText()

  const closeMenu = useCallback(() => {
    setIsMenuOpen((open) => {
      if (open) scrambleTo("Menu")
      return false
    })
  }, [scrambleTo])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const next = !prev
      scrambleTo(next ? "Close" : "Menu")
      return next
    })
  }, [scrambleTo])

  // GSAP scroll-hide
  useEffect(() => {
    if (!siteConfig.features.navigationScrollHide) return
    Promise.all([
      import("gsap").catch(() => null),
      import("gsap/ScrollTrigger").catch(() => null),
    ]).then(([gsapModule, stModule]) => {
      if (gsapModule && stModule) {
        const gsap = (gsapModule as any).default || gsapModule
        const ScrollTrigger = (stModule as any).default || stModule
        gsap.registerPlugin(ScrollTrigger)
        gsapRef.current = gsap
      }
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!siteConfig.features.navigationScrollHide) return
    const nav = navRef.current
    if (!nav || !gsapRef.current) return
    const gsap = gsapRef.current
    gsap.set(nav, { y: 0 })

    const handleScroll = (e: Event) => {
      const pos = e instanceof CustomEvent ? e.detail.scrollY : window.scrollY
      const delta = Math.abs(pos - lastScrollPos.current)
      if (delta > 1) {
        if (pos < 50) {
          if (!isNavVisible.current) {
            gsap.to(nav, { y: 0, duration: 0.4, ease: "power2.out", overwrite: true })
            isNavVisible.current = true
          }
        } else if (pos > lastScrollPos.current && pos > 100 && isNavVisible.current && !isMenuOpen) {
          gsap.to(nav, { y: -100, duration: 0.3, ease: "power2.in", overwrite: true })
          isNavVisible.current = false
        } else if (pos < lastScrollPos.current && !isNavVisible.current) {
          gsap.to(nav, { y: 0, duration: 0.4, ease: "power2.out", overwrite: true })
          isNavVisible.current = true
        }
      }
      lastScrollPos.current = pos
    }

    window.addEventListener("smoothscroll", handleScroll)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("smoothscroll", handleScroll)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMenuOpen])

  // Reset on route change
  useEffect(() => {
    const nav = navRef.current
    if (nav && gsapRef.current) gsapRef.current.set(nav, { y: 0 })
    isNavVisible.current = true
    lastScrollPos.current = 0
    closeMenu()
  }, [pathname, closeMenu])

  // Body scroll lock when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMenuOpen])

  // Escape closes mobile menu
  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen, closeMenu])

  const navItems = siteConfig.navigation

  return (
    <>
      <nav
        ref={navRef}
        id="navigation"
        data-nav-theme="dark"
        className={`fixed w-full z-[60] ${className}`}
        style={{
          top: "var(--banner-height, 0px)",
          backgroundColor: "#000000",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="w-full px-3">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <TransitionLink
              href="/"
              className="flex items-center group relative z-[60]"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <Logo
                className="h-7 w-auto group-hover:opacity-70"
                variant="white"
                isHovered={isLogoHovered}
                color="#ffffff"
              />
            </TransitionLink>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  onClick={() => trackNavClick(item.label)}
                  className="text-sm font-medium tracking-wider uppercase transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                >
                  {item.label}
                </TransitionLink>
              ))}
              <TransitionLink
                href="/become-a-client"
                onClick={() => trackNavClick("Become a Client")}
                className="border px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200 hover:bg-white/10"
                style={{
                  borderColor: "rgba(255,255,255,0.85)",
                  color: "#ffffff",
                  backgroundColor: "transparent",
                }}
              >
                Become a Client
              </TransitionLink>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative z-[60] text-sm font-medium tracking-wider uppercase py-2"
              style={{ color: "#ffffff" }}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
            >
              <span ref={menuTextRef} className="inline-block min-w-[3.5em]">
                Menu
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            data-nav-theme="dark"
            className="fixed inset-0 z-50 flex flex-col h-[100dvh] overflow-hidden md:hidden"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="h-16 flex-shrink-0" />

            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col justify-center px-8 sm:px-12 min-h-0"
            >
              <div className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.div key={item.href} variants={linkVariants}>
                    <TransitionLink
                      href={item.href}
                      onClick={() => { trackNavClick(item.label); closeMenu() }}
                      className="group flex items-baseline gap-3 py-[0.6vh] transition-colors duration-300"
                      style={{ color: "#ffffff" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "#ffffff")}
                    >
                      <span
                        className="hidden sm:inline-block text-xs font-medium tracking-wider tabular-nums w-6"
                        style={{ opacity: 0.3 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[clamp(1.5rem,4.5vh,3.5rem)] font-light font-heading leading-none">
                        {item.label}
                      </span>
                    </TransitionLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={contactVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-shrink-0 px-8 sm:px-12 pb-8 pt-4"
            >
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t pt-6"
                style={{ borderColor: "rgba(255,255,255,0.12)" }}
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <TransitionLink
                  href="/become-a-client"
                  onClick={() => {
                    trackNavClick("Become a Client Mobile")
                    closeMenu()
                  }}
                  className="border px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-200 hover:bg-white/10"
                  style={{
                    borderColor: "rgba(255,255,255,0.85)",
                    color: "#ffffff",
                    backgroundColor: "transparent",
                  }}
                >
                  Become a Client
                </TransitionLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
