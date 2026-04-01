"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useScrambleText } from "@/hooks/use-scramble-text"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FillButton } from "@/components/ui/fill-button"
import { Logo } from "@/components/logo"
import { TransitionLink } from "@/components/transition-link"
import { usePageTransition } from "@/components/transition-context"
import { trackNavClick } from "@/lib/analytics"
import { siteConfig } from "@/site.config"

interface NavigationProps {
  className?: string
}

// Overlay link animation variants
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
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.4 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname()
  const { navigateTo } = usePageTransition()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)

  const navRef = useRef<HTMLElement>(null)
  const lastScrollPos = useRef(0)
  const isNavVisible = useRef(true)
  const gsapRef = useRef<any>(null)

  // Load GSAP for scroll-hide behavior
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

  // Scroll-hide nav behavior
  useEffect(() => {
    if (!siteConfig.features.navigationScrollHide) return

    const nav = navRef.current
    if (!nav || !gsapRef.current) return

    const gsap = gsapRef.current
    gsap.set(nav, { y: 0 })

    const handleScroll = (e: Event) => {
      // Support both smooth scroll custom event and native scroll
      let pos: number
      if (e instanceof CustomEvent) {
        pos = e.detail.scrollY
      } else {
        pos = window.scrollY
      }

      setIsScrolled(pos > 50)

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
    setIsScrolled(false)
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isMenuOpen])

  // Trap focus in overlay when open
  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  const handleNavClick = (label: string) => trackNavClick(label)

  const handleDropdownToggle = (itemLabel: string) => {
    const has = siteConfig.navigation.find((i) => i.label === itemLabel)?.submenu
    if (!has) return
    setActiveDropdown(activeDropdown === itemLabel ? null : itemLabel)
  }

  const { ref: menuTextRef, scrambleTo } = useScrambleText()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => {
      const next = !prev
      scrambleTo(next ? "Close" : "Menu")
      return next
    })
    setActiveDropdown(null)
  }, [scrambleTo])

  const navItems = siteConfig.navigation

  return (
    <>
      {/* Minimal topbar */}
      <nav
        ref={navRef}
        id="navigation"
        className={`fixed w-full z-[60] transition-all duration-500 ${
          isScrolled && !isMenuOpen
            ? "backdrop-blur-xl border-b"
            : "bg-transparent"
        } ${className}`}
        style={{
          top: "var(--banner-height, 0px)",
          borderColor: isScrolled && !isMenuOpen ? "var(--border)" : "transparent",
          backgroundColor: isScrolled && !isMenuOpen ? "color-mix(in srgb, var(--bg) 85%, transparent)" : "transparent",
        }}
      >
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <TransitionLink
              href="/"
              className="flex items-center group relative z-[60]"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <Logo
                className="h-7 w-auto transition-all duration-300 group-hover:opacity-70"
                variant="white"
                isHovered={isLogoHovered}
              />
            </TransitionLink>

            {/* Menu trigger — ScrambleText toggle */}
            <button
              onClick={toggleMenu}
              className="relative z-[60] text-sm font-medium tracking-wider uppercase transition-colors duration-300 py-2"
              style={{ color: "var(--fg)" }}
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

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col h-[100dvh] overflow-hidden"
            style={{ backgroundColor: "var(--bg)" }}
          >
            {/* Spacer for nav height */}
            <div className="h-16 flex-shrink-0" />

            {/* Nav links — fits viewport, no scroll */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 min-h-0"
            >
              <div className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.div key={item.href} variants={linkVariants}>
                    <TransitionLink
                      href={item.href}
                      onClick={() => { handleNavClick(item.label); setIsMenuOpen(false) }}
                      className="group flex items-baseline gap-3 py-[0.6vh] md:py-[0.8vh] transition-colors duration-300"
                      style={{ color: "var(--fg)" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "var(--fg)")}
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

            {/* Footer area */}
            <motion.div
              variants={contactVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-shrink-0 px-8 sm:px-12 md:px-16 lg:px-24 pb-8 pt-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--border)" }}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--fg-muted)" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "var(--fg)")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
                  >
                    {siteConfig.contact.email}
                  </a>
                  {siteConfig.contact.phone && (
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "var(--fg-muted)" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "var(--fg)")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  )}
                </div>
                <FillButton
                  onClick={() => { navigateTo("/contact"); setIsMenuOpen(false) }}
                  className="text-sm tracking-wider uppercase px-6 py-3"
                >
                  Book a Call
                </FillButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
