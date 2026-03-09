"use client"

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type RefObject,
} from "react"
import { useRouter, usePathname } from "next/navigation"

interface TransitionContextValue {
  navigateTo: (href: string) => void
  isTransitioning: boolean
  contentRef: RefObject<HTMLDivElement>
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
  isTransitioning: false,
  contentRef: { current: null },
})

export const usePageTransition = () => useContext(TransitionContext)

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const contentRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  const [isTransitioning, setIsTransitioning] = useState(false)
  const gsapRef = useRef<any>(null)
  const prevPathname = useRef(pathname)
  const isFirstMount = useRef(true)
  const transitionLock = useRef(false)

  useEffect(() => {
    import("gsap")
      .then((mod) => {
        gsapRef.current = (mod as any).default || mod
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      window.dispatchEvent(new CustomEvent("page-enter-complete"))
      return
    }

    if (prevPathname.current === pathname) return
    prevPathname.current = pathname

    window.scrollTo(0, 0)

    requestAnimationFrame(() => {
      setIsTransitioning(false)
      transitionLock.current = false
      window.dispatchEvent(new CustomEvent("page-enter-complete"))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const navigateTo = useCallback(
    async (href: string) => {
      if (transitionLock.current) return

      const targetPath = href.split(/[?#]/)[0]
      if (targetPath === prevPathname.current) return

      transitionLock.current = true
      setIsTransitioning(true)

      const gsap = gsapRef.current
      const el = contentRef.current

      if (gsap && el) {
        const tl = gsap.timeline()

        const wordInners = el.querySelectorAll('[data-reveal="words"] .word-inner')
        if (wordInners.length > 0) {
          tl.to(wordInners, {
            y: "110%",
            duration: 0.4,
            ease: "power2.in",
            stagger: 0.02,
          }, 0)
        }

        const fadeUps = el.querySelectorAll('[data-reveal="fade-up"]')
        if (fadeUps.length > 0) {
          tl.to(fadeUps, {
            opacity: 0,
            y: 60,
            duration: 0.35,
            ease: "power2.in",
            stagger: 0.04,
          }, 0)
        }

        const fadeIns = el.querySelectorAll('[data-reveal="fade-in"]')
        if (fadeIns.length > 0) {
          tl.to(fadeIns, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          }, 0)
        }

        const scales = el.querySelectorAll('[data-reveal="scale"]')
        if (scales.length > 0) {
          tl.to(scales, {
            opacity: 0,
            scale: 0.92,
            duration: 0.3,
            ease: "power2.in",
          }, 0)
        }

        el.querySelectorAll('[data-reveal="stagger"]').forEach((parent: Element) => {
          const kids = Array.from(parent.children)
          if (kids.length > 0) {
            tl.to(kids, {
              opacity: 0,
              y: 40,
              duration: 0.3,
              ease: "power2.in",
              stagger: 0.03,
            }, 0)
          }
        })

        await new Promise<void>((resolve) => {
          tl.eventCallback("onComplete", resolve)
        })
      }

      router.push(href)
    },
    [router],
  )

  return (
    <TransitionContext.Provider value={{ navigateTo, isTransitioning, contentRef }}>
      {children}
    </TransitionContext.Provider>
  )
}
