"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { TransitionLink } from "@/components/transition-link"
import { usePageTransition } from "@/components/transition-context"
import { trackPhoneCallClick, trackNavClick } from "@/lib/analytics"
import { siteConfig } from "@/site.config"

interface NavigationProps {
  className?: string
}

export function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname()
  const { navigateTo } = usePageTransition()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)

  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const lastScrollPos = useRef(0)
  const isNavVisible = useRef(true)
  const gsapRef = useRef<any>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!siteConfig.features.smoothScroll || !siteConfig.features.navigationScrollHide) return

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
    if (!siteConfig.features.smoothScroll || !siteConfig.features.navigationScrollHide) return

    const nav = navRef.current
    if (!nav || !gsapRef.current) return

    const gsap = gsapRef.current
    gsap.set(nav, { y: 0 })

    const handleSmoothScroll = (e: Event) => {
      const customEvent = e as CustomEvent<{ scrollY: number }>
      const pos = customEvent.detail.scrollY

      setIsScrolled(pos > 50)

      const delta = Math.abs(pos - lastScrollPos.current)
      if (delta > 1) {
        if (pos < 50) {
          if (!isNavVisible.current) {
            gsap.to(nav, { y: 0, duration: 0.4, ease: "power2.out", overwrite: true })
            isNavVisible.current = true
          }
        } else if (pos > lastScrollPos.current && pos > 100 && isNavVisible.current) {
          gsap.to(nav, { y: -100, duration: 0.3, ease: "power2.in", overwrite: true })
          setActiveDropdown(null)
          isNavVisible.current = false
        } else if (pos < lastScrollPos.current && !isNavVisible.current) {
          gsap.to(nav, { y: 0, duration: 0.4, ease: "power2.out", overwrite: true })
          isNavVisible.current = true
        }
      }

      lastScrollPos.current = pos
    }

    window.addEventListener("smoothscroll", handleSmoothScroll)
    return () => window.removeEventListener("smoothscroll", handleSmoothScroll)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (nav && gsapRef.current) gsapRef.current.set(nav, { y: 0 })
    isNavVisible.current = true
    lastScrollPos.current = 0
    setIsScrolled(false)
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isMenuOpen])

  const handlePhoneClick = () => {
    trackPhoneCallClick("header_navigation", "call_now_button")
    window.location.href = `tel:${siteConfig.contact.phone}`
  }

  const handleNavClick = (label: string) => trackNavClick(label)

  const handleDropdownToggle = (itemLabel: string) => {
    const has = siteConfig.navigation.find((i) => i.label === itemLabel)?.submenu
    if (!has) return
    setActiveDropdown(activeDropdown === itemLabel ? null : itemLabel)
  }

  const handleMouseEnter = (label: string) => {
    if (isMobile) return
    if (siteConfig.navigation.find((i) => i.label === label)?.submenu) {
      setActiveDropdown(label)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) setActiveDropdown(null)
  }

  const navItems = siteConfig.navigation

  return (
    <>
      <nav
        ref={navRef}
        id="navigation"
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-xl bg-black/60 border-b"
            : "bg-transparent"
        } ${className}`}
        style={{
          top: "var(--banner-height, 0px)",
          borderColor: isScrolled ? "var(--border)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <TransitionLink
                href="/"
                className="flex items-center group"
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
              >
                <Logo
                  className="h-8 w-auto transition-all duration-300 group-hover:scale-105 mt-0.5"
                  variant="white"
                  isHovered={isLogoHovered}
                />
              </TransitionLink>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {navItems
                .filter((item) => item.href !== "/contact")
                .map((item) => (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.submenu ? (
                      <TransitionLink
                        href={item.href}
                        onClick={() => handleNavClick(item.label)}
                        className="flex items-center space-x-1 transition-colors duration-300 font-medium text-sm tracking-wider uppercase"
                        style={{ color: "var(--fg-muted)" }}
                        onMouseOver={(e) => (e.currentTarget.style.color = "var(--fg)")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </TransitionLink>
                    ) : (
                      <TransitionLink
                        href={item.href}
                        onClick={() => handleNavClick(item.label)}
                        className="transition-colors duration-300 font-medium text-sm tracking-wider uppercase"
                        style={{ color: "var(--fg-muted)" }}
                        onMouseOver={(e) => (e.currentTarget.style.color = "var(--fg)")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
                      >
                        {item.label}
                      </TransitionLink>
                    )}
                  </div>
                ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant={null as any}
                size={null as any}
                className="hidden md:block font-semibold text-sm tracking-wider uppercase px-6 py-3 rounded-full transition-all hover:scale-105"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-fg)",
                }}
                onClick={() => navigateTo("/contact")}
              >
                Contact
              </Button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 transition-all duration-300 hover:scale-110"
                style={{ color: "var(--fg)" }}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Dropdown Megamenu */}
      <AnimatePresence mode="wait">
        {activeDropdown && (
          <motion.div
            key={activeDropdown}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:block fixed left-0 right-0 shadow-2xl border-t z-40"
            style={{
              top: "calc(var(--banner-height, 0px) + 80px)",
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
            onMouseEnter={() => !isMobile && setActiveDropdown(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            {navItems
              .filter((item) => item.label === activeDropdown && item.submenu)
              .map((item) => (
                <div key={item.label} className="w-full px-4 sm:px-6 lg:px-8 py-8">
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-3xl">
                      {item.submenu?.map((section, si) => (
                        <motion.div
                          key={section.label}
                          initial={{ opacity: 0, y: -15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: si * 0.1, ease: [0.4, 0, 0.2, 1] }}
                          className="space-y-3"
                        >
                          <h3
                            className="font-semibold text-xs uppercase tracking-widest mb-3 pb-2 border-b"
                            style={{ color: "var(--fg-muted)", borderColor: "var(--border)" }}
                          >
                            {section.label}
                          </h3>
                          <div className="space-y-1">
                            {section.items.map((subItem, ii) => (
                              <motion.div
                                key={subItem.href}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: si * 0.1 + 0.15 + ii * 0.05 }}
                              >
                                <TransitionLink
                                  href={subItem.href}
                                  onClick={() => { handleNavClick(subItem.label); setActiveDropdown(null) }}
                                  className="block px-3 py-2 text-sm rounded-md transition-all duration-200 hover:translate-x-1"
                                  style={{ color: "var(--fg-muted)" }}
                                  onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.currentTarget.style.color = "var(--fg)"
                                    e.currentTarget.style.backgroundColor = "var(--muted)"
                                  }}
                                  onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.currentTarget.style.color = "var(--fg-muted)"
                                    e.currentTarget.style.backgroundColor = "transparent"
                                  }}
                                >
                                  {subItem.label}
                                </TransitionLink>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown Backdrop */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
            style={{ top: "calc(var(--banner-height, 0px) + 80px)" }}
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu - Viewport-constrained overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={mobileMenuRef}
            className="fixed inset-x-0 bottom-0 lg:hidden z-50 flex flex-col overflow-hidden"
            style={{
              backgroundColor: "var(--bg)",
              top: "calc(var(--banner-height, 0px) + 80px)",
            }}
          >
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="flex flex-col justify-center min-h-full px-8 py-8 space-y-5">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    {item.submenu ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <TransitionLink
                            href={item.href}
                            onClick={() => { handleNavClick(item.label); setIsMenuOpen(false) }}
                            className="text-2xl sm:text-3xl font-bold"
                            style={{ color: "var(--fg)" }}
                          >
                            {item.label}
                          </TransitionLink>
                          <button
                            onClick={() => handleDropdownToggle(item.label)}
                            className="p-2 -mr-2"
                            style={{ color: "var(--fg-muted)" }}
                            aria-label={`Toggle ${item.label} submenu`}
                          >
                            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                          </button>
                        </div>
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 space-y-2 border-l pl-4 pb-1" style={{ borderColor: "var(--border)" }}>
                                {item.submenu.map((section) => (
                                  <div key={section.label} className="space-y-1">
                                    <h4 className="text-xs uppercase tracking-widest pt-1" style={{ color: "var(--fg-muted)" }}>
                                      {section.label}
                                    </h4>
                                    {section.items.map((sub) => (
                                      <TransitionLink
                                        key={sub.href}
                                        href={sub.href}
                                        onClick={() => { handleNavClick(sub.label); setIsMenuOpen(false) }}
                                        className="block py-1.5 text-base"
                                        style={{ color: "var(--fg-muted)" }}
                                      >
                                        {sub.label}
                                      </TransitionLink>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <TransitionLink
                        href={item.href}
                        onClick={() => { handleNavClick(item.label); setIsMenuOpen(false) }}
                        className="text-2xl sm:text-3xl font-bold block"
                        style={{ color: "var(--fg)" }}
                      >
                        {item.label}
                      </TransitionLink>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div
              className="flex-shrink-0 px-8 pb-8 pt-4 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <Button
                variant={null as any}
                size={null as any}
                className="w-full font-semibold text-sm tracking-wider uppercase px-4 py-4 rounded-full transition-all"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                onClick={handlePhoneClick}
              >
                Call Now
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
