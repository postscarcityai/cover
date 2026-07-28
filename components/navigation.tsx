"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { trackPhoneCallClick, trackNavClick } from "@/lib/analytics"
import { siteConfig } from "@/site.config"

interface NavigationProps {
  className?: string
}

export function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isHidden, setIsHidden] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)

  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [dropdownLeft, setDropdownLeft] = useState<number | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Sticky-nav scroll handler (Stripe-style).
  //   At top of page:      nav visible.
  //   Scroll down past
  //     HIDE_THRESHOLD_PX: nav slides up out of view.
  //   Any upward scroll:   nav slides back down into the sticky position,
  //                        regardless of how far down the page the user is.
  //
  // Listens to both native scroll AND the custom `smoothscroll` event
  // dispatched by components/scroll-smoother.tsx, since that wrapper
  // captures wheel events and `window.scrollY` can be 0 while it owns
  // the scroll. Whichever event fires, we use it.
  useEffect(() => {
    if (!siteConfig.features.navigationScrollHide) return

    // Don't hide the nav until the user has clearly committed to scrolling
    // down — a high threshold stops the nav from vanishing the instant the
    // page nudges a few pixels.
    const HIDE_THRESHOLD_PX = 120
    // Tiny scroll jitters (mouse wheel coast, touch overscroll) shouldn't
    // count as "scrolling down" and trigger a hide.
    const HIDE_DELTA_PX = 6

    let lastY = 0

    const update = (currentY: number) => {
      // Always show at the very top of the page.
      if (currentY < 10) {
        setIsHidden(false)
        lastY = currentY
        return
      }

      const delta = currentY - lastY

      // Any upward motion brings the nav back, no matter how far down we are.
      // No delta threshold here on purpose — the user's expectation is that
      // even a small upward gesture pops the nav back into view.
      if (delta < 0) {
        setIsHidden(false)
      } else if (delta > HIDE_DELTA_PX && currentY > HIDE_THRESHOLD_PX) {
        setIsHidden(true)
        setActiveDropdown(null)
      }

      lastY = currentY
    }

    const handleNativeScroll = () => update(window.scrollY)
    const handleSmoothScroll = (e: Event) => {
      const ce = e as CustomEvent<{ scrollY: number }>
      update(ce.detail.scrollY)
    }

    window.addEventListener("scroll", handleNativeScroll, { passive: true })
    window.addEventListener("smoothscroll", handleSmoothScroll)
    return () => {
      window.removeEventListener("scroll", handleNativeScroll)
      window.removeEventListener("smoothscroll", handleSmoothScroll)
    }
  }, [])

  // Anchor the dropdown panel to its trigger, and keep it anchored when the
  // viewport resizes or scrolls while the panel is open.
  useEffect(() => {
    if (!activeDropdown) {
      setDropdownLeft(null)
      return
    }
    const measure = () => {
      const trigger = triggerRefs.current[activeDropdown]
      if (trigger) setDropdownLeft(trigger.getBoundingClientRect().left)
    }
    measure()
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("smoothscroll", measure)
    return () => {
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure)
      window.removeEventListener("smoothscroll", measure)
    }
  }, [activeDropdown])

  // Reset transient nav state on route change.
  useEffect(() => {
    setIsHidden(false)
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

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
        className={`fixed w-full z-50 px-3 sm:px-4 pt-3 sm:pt-4 transition-transform duration-500 ease-out ${
          isHidden ? "-translate-y-[120%] pointer-events-none" : "translate-y-0"
        } ${className}`}
        style={{ top: "var(--banner-height, 0px)" }}
      >
        <div
          className="max-w-7xl mx-auto pl-4 pr-2 sm:pl-6 sm:pr-3 rounded-full backdrop-blur-xl border shadow-sm"
          style={{
            backgroundColor: "color-mix(in srgb, var(--bg) 75%, transparent)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center group"
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
              >
                <Logo
                  className="transition-opacity duration-200"
                  variant="primary"
                  isHovered={isLogoHovered}
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {navItems
                .filter((item) => item.href !== "/contact")
                .map((item) => (
                  <div
                    key={item.href}
                    ref={(el) => { triggerRefs.current[item.label] = el }}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.submenu ? (
                      <a
                        href={item.href}
                        onClick={() => handleNavClick(item.label)}
                        className={`flex items-center space-x-1 transition-colors duration-200 font-medium text-base px-3 h-9 rounded-full ${
                          activeDropdown === item.label
                            ? "bg-white shadow-sm"
                            : "hover:bg-white/60"
                        }`}
                        style={{ color: activeDropdown === item.label ? "var(--fg)" : "var(--fg-muted)" }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => handleNavClick(item.label)}
                        className="transition-colors duration-200 font-medium text-base px-3 h-9 rounded-full inline-flex items-center hover:bg-white/60"
                        style={{ color: "var(--fg-muted)" }}
                        onMouseOver={(e) => (e.currentTarget.style.color = "var(--fg)")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant={null as any}
                size={null as any}
                className="hidden md:inline-flex items-center font-medium text-base px-6 h-11 rounded-full transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-fg)",
                }}
                onClick={() => (window.location.href = "/contact")}
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

      {/* Desktop Dropdown — anchored under its trigger, not full-bleed */}
      <AnimatePresence mode="wait">
        {activeDropdown && (
          <motion.div
            key={activeDropdown}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:block fixed z-40"
            style={{
              top: "calc(var(--banner-height, 0px) + 88px)",
              left: dropdownLeft != null ? `${dropdownLeft}px` : "50%",
              transform: dropdownLeft != null ? undefined : "translateX(-50%)",
              transformOrigin: "top left",
              maxWidth: "min(36rem, calc(100vw - 2rem))",
            }}
            onMouseEnter={() => !isMobile && setActiveDropdown(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="rounded-3xl border shadow-2xl overflow-hidden"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
              }}
            >
            {navItems
              .filter((item) => item.label === activeDropdown && item.submenu)
              .map((item) => (
                <div key={item.label} className="px-6 py-6">
                  <div>
                    <div className="space-y-6">
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
                          <div
                            className="grid gap-x-6 gap-y-1"
                            style={{
                              gridTemplateColumns: `repeat(${Math.min(3, Math.ceil(section.items.length / 3))}, minmax(0, 1fr))`,
                              gridTemplateRows: "repeat(3, auto)",
                              gridAutoFlow: "column",
                            }}
                          >
                            {section.items.map((subItem, ii) => (
                              <motion.a
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => { handleNavClick(subItem.label); setActiveDropdown(null) }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: si * 0.1 + 0.15 + ii * 0.05 }}
                                className="block px-3 py-2 rounded-md transition-all duration-200 hover:translate-x-1"
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
                                <div className="text-sm font-medium">{subItem.label}</div>
                                {subItem.description && (
                                  <div className="text-xs italic mt-0.5" style={{ color: "var(--fg-muted)", opacity: 0.7 }}>
                                    {subItem.description}
                                  </div>
                                )}
                              </motion.a>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown Backdrop — click-outside catcher only, no visual scrim */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block fixed inset-0 z-30"
            style={{ top: "calc(var(--banner-height, 0px) + 80px)" }}
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={mobileMenuRef}
            className="fixed inset-0 lg:hidden z-50 flex flex-col"
            style={{ backgroundColor: "var(--bg)", top: "calc(var(--banner-height, 0px) + 80px)" }}
          >
            <div className="flex-1 flex flex-col justify-center px-8 space-y-6">
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
                        <a
                          href={item.href}
                          onClick={() => { handleNavClick(item.label); setIsMenuOpen(false) }}
                          className="text-3xl font-normal tracking-display-snug"
                          style={{ color: "var(--fg)" }}
                        >
                          {item.label}
                        </a>
                        <button
                          onClick={() => handleDropdownToggle(item.label)}
                          style={{ color: "var(--fg-muted)" }}
                          aria-label={`Toggle ${item.label} submenu`}
                        >
                          <ChevronDown className={`h-5 w-5 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      {activeDropdown === item.label && (
                        <div className="ml-4 space-y-2 border-l pl-4" style={{ borderColor: "var(--border)" }}>
                          {item.submenu.map((section) => (
                            <div key={section.label} className="space-y-1">
                              <h4 className="text-xs uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>
                                {section.label}
                              </h4>
                              {section.items.map((sub) => (
                                <a
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => { handleNavClick(sub.label); setIsMenuOpen(false) }}
                                  className="block py-1 text-base"
                                  style={{ color: "var(--fg-muted)" }}
                                >
                                  {sub.label}
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => { handleNavClick(item.label); setIsMenuOpen(false) }}
                      className="text-3xl font-bold block"
                      style={{ color: "var(--fg)" }}
                    >
                      {item.label}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="px-8 pb-12">
              <Button
                variant={null as any}
                size={null as any}
                className="w-full font-medium text-base px-4 h-12 rounded-full transition-opacity hover:opacity-90"
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
