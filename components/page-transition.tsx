"use client"

import { usePageTransition } from "./transition-context"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const { contentRef } = usePageTransition()

  return (
    <div ref={contentRef} style={{ willChange: "opacity, transform" }}>
      {children}
    </div>
  )
}
