"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { trackPhoneCallClick, trackNavClick } from "@/lib/analytics"
import { siteConfig } from "@/site.config"
import { themeClasses } from "@/lib/theme-utils"

interface NavigationProps {
  className?: string
}

export function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname()
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

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load GSAP dynamically if needed
  useEffect(() => {
    if (!siteConfig.features.smoothScroll || !siteConfig.features.navigationScrollHide) {
      return
    }

    // Dynamically import GSAP (optional dependency)
    Promise.all([
      // @ts-ignore - GSAP is optional dependency
      import('gsap').catch(() => null),
      // @ts-ignore - GSAP is optional dependency
      import('gsap/ScrollTrigger').catch(() => null)
    ]).then(([gsapModule, stModule]) => {
      if (gsapModule && stModule) {
        const gsap = (gsapModule as any).default || gsapModule
        const ScrollTrigger = (stModule as any).default || stModule
        if (gsap && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger)
          gsapRef.current = gsap
        }
      }
    }).catch(() => {
      // GSAP not installed - navigation will work without scroll hide/show
    })
  }, [])

  // Scroll-based hide/show (only if smoothScroll and navigationScrollHide are enabled)
  useEffect(() => {
    if (!siteConfig.features.smoothScroll || !siteConfig.features.navigationScrollHide) {
      return
    }

    const nav = navRef.current
    if (!nav) return

    const gsap = gsapRef.current
    if (!gsap) return

    // Set initial position
    gsap.set(nav, { y: 0 })

    // Listen to custom smooth scroll events
    const handleSmoothScroll = (e: Event) => {
      const customEvent = e as CustomEvent<{ scrollY: number }>
      const currentScrollPos = customEvent.detail.scrollY
      
      // Add shadow when scrolled
      setIsScrolled(currentScrollPos > 10)

      // Determine direction
      const scrollingDown = currentScrollPos > lastScrollPos.current
      const scrollingUp = currentScrollPos < lastScrollPos.current
      const scrollDelta = Math.abs(currentScrollPos - lastScrollPos.current)

      // Hysteresis thresholds
      const hideThreshold = 100  // Hide nav when scrolling down past this
      const showThreshold = 50   // Show nav when scrolling up AND below this point

      // Only react to meaningful scroll movements
      if (scrollDelta > 1) {
        if (currentScrollPos < showThreshold) {
          // Always show near top of page
          if (!isNavVisible.current) {
            gsap.to(nav, {
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              overwrite: true
            })
            isNavVisible.current = true
          }
        } else if (scrollingDown && currentScrollPos > hideThreshold && isNavVisible.current) {
          // Hide when scrolling down past threshold
          gsap.to(nav, {
            y: -100,
            duration: 0.3,
            ease: "power2.in",
            overwrite: true
          })
          setActiveDropdown(null)
          isNavVisible.current = false
        } else if (scrollingUp && !isNavVisible.current) {
          // Show when scrolling up
          gsap.to(nav, {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true
          })
          isNavVisible.current = true
        }
      }

      lastScrollPos.current = currentScrollPos
    }

    window.addEventListener('smoothscroll', handleSmoothScroll)

    return () => {
      window.removeEventListener('smoothscroll', handleSmoothScroll)
    }
  }, [])

  // Show navigation on route change
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const gsap = gsapRef.current
    if (gsap) {
      gsap.set(nav, { y: 0 })
    }
    isNavVisible.current = true
    
    // Reset scroll tracking
    lastScrollPos.current = 0
    setIsScrolled(false)
    
    // Close any open menus/dropdowns
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const handlePhoneClick = () => {
    trackPhoneCallClick('header_navigation', 'call_now_button')
    window.location.href = `tel:${siteConfig.contact.phone}`
  }

  const handleNavClick = (label: string) => {
    trackNavClick(label)
  }

  const handleDropdownToggle = (itemLabel: string) => {
    const hasSubmenu = siteConfig.navigation.find(item => item.label === itemLabel)?.submenu
    
    if (!hasSubmenu) return

    if (activeDropdown === itemLabel) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(itemLabel)
    }
  }

  const handleMouseEnter = (itemLabel: string) => {
    if (isMobile) return // Only apply hover behavior on desktop
    const hasSubmenu = siteConfig.navigation.find(item => item.label === itemLabel)?.submenu
    if (hasSubmenu) {
      setActiveDropdown(itemLabel)
    }
  }

  const handleMouseLeave = () => {
    if (isMobile) return // Only apply hover behavior on desktop
    setActiveDropdown(null)
  }
  
  const navItems = siteConfig.navigation

  return (
    <>
      {/* Main Navigation */}
      <nav 
        ref={navRef}
        id="navigation" 
        className={`fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'} ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left column - Logo */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center group"
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
              >
                <Logo 
                  className="h-8 w-auto transition-all duration-300 group-hover:scale-105 mt-0.5" 
                  isHovered={isLogoHovered}
                />
              </Link>
            </div>

            {/* Center column - Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.filter(item => item.href !== "/contact").map((item) => (
                <div 
                  key={item.href} 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.submenu ? (
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(item.label)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-all duration-300 font-montserrat font-medium text-sm tracking-wide uppercase"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(item.label)}
                      className="text-gray-700 hover:text-gray-900 transition-all duration-300 font-montserrat font-medium text-sm tracking-wide uppercase"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Right column - Contact Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button
                variant={null as any}
                size={null as any}
                className={`hidden md:block font-montserrat font-semibold text-sm tracking-wide uppercase px-6 py-3 rounded-full hover:opacity-90 transition-opacity`}
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary-foreground)',
                }}
                onClick={() => {
                  window.location.href = '/contact'
                }}
              >
                Contact
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                <div className="relative w-6 h-6">
                  <Menu className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                  <X className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Width Dropdown Megamenu */}
      <AnimatePresence mode="wait">
        {activeDropdown && (
          <motion.div
            key={activeDropdown}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:block fixed left-0 right-0 shadow-xl border-t z-40"
            style={{ 
              top: '64px',
              backgroundColor: 'var(--theme-background, white)',
              borderColor: 'var(--theme-border, #e5e7eb)'
            }}
            onMouseEnter={() => !isMobile && setActiveDropdown(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            {navItems
              .filter(item => item.label === activeDropdown && item.submenu)
              .map((item) => {
                return (
                  <div key={item.label} className="w-full px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-7xl mx-auto">
                      {/* Default layout for dropdowns */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-3xl">
                        {item.submenu?.map((section, sectionIndex) => (
                          <motion.div
                            key={section.label}
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: sectionIndex * 0.1,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                            className="space-y-3"
                          >
                            <h3 className="font-montserrat font-semibold text-sm uppercase tracking-wider mb-3 pb-2 border-b border-gray-300 text-gray-800">
                              {section.label}
                            </h3>
                            <div className="space-y-1">
                              {section.items.map((subItem, itemIndex) => (
                                <motion.a
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => {
                                    handleNavClick(subItem.label)
                                    setActiveDropdown(null)
                                  }}
                                  initial={{ opacity: 0, y: 0 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ 
                                    duration: 0.4,
                                    delay: (sectionIndex * 0.1) + 0.15 + (itemIndex * 0.05),
                                    ease: [0.4, 0, 0.2, 1]
                                  }}
                                  className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200 hover:translate-x-1"
                                >
                                  {subItem.label}
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
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
            className="hidden lg:block fixed inset-0 bg-black/10 backdrop-blur-[2px] z-30"
            style={{ top: '64px' }}
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="fixed left-0 right-0 lg:hidden bg-white border-t border-gray-200 shadow-lg z-50"
          style={{ top: '64px' }}
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <div key={item.href} className="mobile-nav-item">
                {item.submenu ? (
                  <div className="space-y-2">
                    {/* Split: Link to page + Dropdown toggle button */}
                    <div className="flex items-center justify-between w-full">
                      {/* Link to main page */}
                      <a
                        href={item.href}
                        onClick={() => {
                          handleNavClick(item.label)
                          setIsMenuOpen(false)
                          setActiveDropdown(null)
                        }}
                        className="flex-1 px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors font-montserrat font-medium text-sm tracking-wide uppercase"
                      >
                        {item.label}
                      </a>
                      
                      {/* Dropdown toggle button */}
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className="px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    {activeDropdown === item.label && (
                      <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
                        {item.submenu.map((section) => (
                          <div key={section.label} className="space-y-1">
                            <h4 className="font-montserrat font-semibold text-xs text-gray-500 uppercase tracking-wider mt-3 first:mt-0">
                              {section.label}
                            </h4>
                            {section.items.map((subItem) => (
                              <a
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => {
                                  handleNavClick(subItem.label)
                                  setIsMenuOpen(false)
                                  setActiveDropdown(null)
                                }}
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                              >
                                {subItem.label}
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
                    onClick={() => {
                      handleNavClick(item.label)
                      setIsMenuOpen(false)
                    }}
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors font-montserrat font-medium text-sm tracking-wide uppercase"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              <Button
                variant={null as any}
                size={null as any}
                className={`w-full font-montserrat font-semibold text-sm tracking-wide uppercase px-4 py-3 rounded-full hover:opacity-90 transition-opacity`}
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary-foreground)',
                }}
                onClick={handlePhoneClick}
              >
                Call Now
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></div>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}
