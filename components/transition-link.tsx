"use client"

import Link from "next/link"
import { type ComponentProps, type MouseEvent } from "react"
import { usePageTransition } from "./transition-context"

type TransitionLinkProps = ComponentProps<typeof Link>

export function TransitionLink({
  href,
  onClick,
  children,
  ...props
}: TransitionLinkProps) {
  const { navigateTo } = usePageTransition()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

    const url = typeof href === "string" ? href : href.pathname || ""
    const isExternal = url.startsWith("http") || url.startsWith("//")
    const isSpecial = url.startsWith("mailto:") || url.startsWith("tel:")
    const isAnchor = url.startsWith("#")

    if (isExternal || isSpecial || isAnchor) return

    e.preventDefault()
    onClick?.(e as any)
    navigateTo(url)
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
