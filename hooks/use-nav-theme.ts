"use client"

import { useState, useEffect } from "react"

export type NavTheme = "light" | "dark"

/**
 * Detects which theme the sticky nav is currently sitting over,
 * by checking which section occupies the vertical midpoint of the nav bar.
 *
 * Sections opt-in by setting data-nav-theme="dark" | "light".
 * Defaults to "light" when no tagged section is found.
 */
export function useNavTheme(navHeight = 64): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("light")

  useEffect(() => {
    const navMidY = navHeight / 2

    const detect = () => {
      const y = window.scrollY + navMidY
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]")

      for (const section of sections) {
        const top = section.offsetTop
        const bottom = top + section.offsetHeight
        if (y >= top && y < bottom) {
          setTheme((section.dataset.navTheme as NavTheme) ?? "light")
          return
        }
      }

      setTheme("light")
    }

    detect()
    window.addEventListener("scroll", detect, { passive: true })
    window.addEventListener("resize", detect, { passive: true })

    return () => {
      window.removeEventListener("scroll", detect)
      window.removeEventListener("resize", detect)
    }
  }, [navHeight])

  return theme
}
