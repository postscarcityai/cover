"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useScrambleText } from "@/hooks/use-scramble-text"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/logo"
import { TransitionLink } from "@/components/transition-link"
import { trackNavClick } from "@/lib/analytics"
import { siteConfig } from "@/site.config"

interface NavigationProps {
  className?: string
}

export function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuMounted, setMenuMounted] = useState(false)
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

  // Animate menu mount/unmount
  useEffect(() => {
    if (isMenuOpen) {
      requestAnimationFrame(() => setMenuMounted(true))
    } else {
      setMenuMounted(false)
    }
  }, [isMenuOpen])

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

    const handleScroll = () => {
      const pos = window.scrollY
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

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
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
        className={`fixed w-full z-[60] overflow-visible ${className}`}
        style={{
          top: "var(--banner-height, 0px)",
          backgroundColor: "#000000",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="w-full overflow-visible px-3">
          <div className="flex justify-between items-center h-16 overflow-visible">

            {/* Logo */}
            <TransitionLink
              href="/"
              className="flex items-center group relative z-[60] overflow-visible"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <span className="relative inline-block h-7 overflow-visible">
                <Logo
                  className="relative z-10 h-7 w-auto group-hover:opacity-70"
                  variant="white"
                  isHovered={isLogoHovered}
                  color="#ffffff"
                />
              </span>
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
      {isMenuOpen && (
        <div
          data-nav-theme="dark"
          className="fixed inset-0 z-50 flex flex-col h-[100dvh] overflow-hidden md:hidden transition-opacity duration-400"
          style={{
            backgroundColor: "#000000",
            opacity: menuMounted ? 1 : 0,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="h-16 flex-shrink-0" />

          <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 min-h-0">
            <div className="flex flex-col">
              {navItems.map((item, i) => (
                <div
                  key={item.href}
                  style={{
                    opacity: menuMounted ? 1 : 0,
                    transform: menuMounted ? 'translateY(0)' : 'translateY(40px)',
                    transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.06}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.06}s`,
                  }}
                >
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
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex-shrink-0 px-8 sm:px-12 pb-8 pt-4"
            style={{
              opacity: menuMounted ? 1 : 0,
              transition: `opacity 0.4s ease ${0.5}s`,
            }}
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
          </div>
        </div>
      )}
    </>
  )
}
