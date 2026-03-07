"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { FileText } from "lucide-react"
import type { BlogPost } from "@/lib/blog"
import { siteConfig } from "@/site.config"

const CRAWL_SPEED_PX_PER_SEC = 18
const INERTIA_DECAY = 0.96
const MIN_VELOCITY = 0.15
const VELOCITY_SAMPLE_WEIGHT = 0.85
const PAUSE_AFTER_DRAG_MS = 2000
const CARD_WIDTH_MOBILE = 320
const CARD_WIDTH_DESKTOP = 384

interface ContentCarouselProps {
  posts: BlogPost[]
  className?: string
}

export function ContentCarousel({ posts, className = "" }: ContentCarouselProps) {
  if (!posts.length) return null

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef(0)
  const velocityRef = useRef(0)
  const lastPointerXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const isDraggingRef = useRef(false)
  const hasMovedRef = useRef(false)
  const pointerDownRef = useRef(false)
  const pauseUntilRef = useRef(0)
  const cycleWidthRef = useRef(0)
  const cardWidthRef = useRef(CARD_WIDTH_DESKTOP)
  const rafIdRef = useRef<number | null>(null)
  const [isPointerDown, setIsPointerDown] = useState(false)

  const getCardWidth = useCallback(() => {
    if (typeof window === "undefined") return CARD_WIDTH_DESKTOP
    return window.innerWidth < 640
      ? Math.min(CARD_WIDTH_MOBILE, window.innerWidth * 0.85)
      : CARD_WIDTH_DESKTOP
  }, [])

  const wrapScroll = useCallback((scroll: number) => {
    const cycle = cycleWidthRef.current
    if (cycle <= 0) return scroll
    let s = scroll
    while (s >= cycle) s -= cycle
    while (s < 0) s += cycle
    return s
  }, [])

  const tick = useCallback(
    (now: number) => {
      const dt = (now - lastTimeRef.current) / 1000
      lastTimeRef.current = now

      let scroll = scrollRef.current
      let velocity = velocityRef.current

      if (isDraggingRef.current) {
        rafIdRef.current = requestAnimationFrame(tick)
        return
      }

      if (now < pauseUntilRef.current) {
        scroll += velocity * dt
        velocity *= INERTIA_DECAY
      } else {
        scroll += (CRAWL_SPEED_PX_PER_SEC * dt)
        velocity = 0
      }

      if (Math.abs(velocity) < MIN_VELOCITY) velocity = 0
      velocityRef.current = velocity
      scroll = wrapScroll(scroll)
      scrollRef.current = scroll

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${scroll}px, 0, 0)`
      }

      rafIdRef.current = requestAnimationFrame(tick)
    },
    [wrapScroll]
  )

  useEffect(() => {
    cardWidthRef.current = getCardWidth()
    cycleWidthRef.current = posts.length * cardWidthRef.current
    lastTimeRef.current = performance.now()
    rafIdRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [posts.length, tick, getCardWidth])

  useEffect(() => {
    const onResize = () => {
      const w = getCardWidth()
      cardWidthRef.current = w
      cycleWidthRef.current = posts.length * w
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [posts.length, getCardWidth])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    pointerDownRef.current = true
    hasMovedRef.current = false
    lastPointerXRef.current = e.clientX
    lastTimeRef.current = performance.now()
    isDraggingRef.current = true
    velocityRef.current = 0
    containerRef.current?.setPointerCapture(e.pointerId)
    setIsPointerDown(true)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    hasMovedRef.current = true
    const dx = e.clientX - lastPointerXRef.current
    const now = performance.now()
    const dt = (now - lastTimeRef.current) / 1000 || 0.001
    const rawVelocity = -dx / dt
    velocityRef.current =
      VELOCITY_SAMPLE_WEIGHT * rawVelocity +
      (1 - VELOCITY_SAMPLE_WEIGHT) * velocityRef.current
    lastPointerXRef.current = e.clientX
    lastTimeRef.current = now
    scrollRef.current = wrapScroll(scrollRef.current - dx)
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${scrollRef.current}px, 0, 0)`
    }
  }, [wrapScroll])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    containerRef.current?.releasePointerCapture(e.pointerId)
    const didDrag = hasMovedRef.current
    isDraggingRef.current = false

    if (didDrag) {
      pauseUntilRef.current = performance.now() + PAUSE_AFTER_DRAG_MS
    }

    pointerDownRef.current = false
    setIsPointerDown(false)
  }, [])

  const handlePointerLeave = useCallback(() => {
    setIsPointerDown(false)
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      pauseUntilRef.current = performance.now() + PAUSE_AFTER_DRAG_MS
    }
    pointerDownRef.current = false
  }, [])

  const cardWidth = getCardWidth()
  const duplicatedPosts = [...posts, ...posts]
  const blogBasePath = siteConfig.blog.basePath

  return (
    <section
      className={`py-16 overflow-hidden ${className}`}
      role="region"
      aria-label="Blog posts carousel"
    >
      <div className="mx-4 sm:mx-6 lg:px-8 mb-8">
        <h2
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)' }}
        >
          Latest from the {siteConfig.blog.title}
        </h2>
        <p className="text-lg" style={{ color: "var(--fg-muted)" }}>
          Insights and updates from our team
        </p>
      </div>

      <div
        ref={containerRef}
        className={`relative select-none touch-none ${isPointerDown ? "cursor-grabbing" : "cursor-pointer"}`}
        style={{ touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ width: "max-content" }}
        >
          {duplicatedPosts.map((post, index) => (
            <CarouselCard
              key={`${post.slug}-${index}`}
              post={post}
              width={cardWidth}
              basePath={blogBasePath}
            />
          ))}
        </div>
        <div className="absolute inset-0 z-10" aria-hidden style={{ touchAction: "none" }} />
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href={blogBasePath}
          className="font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          View all articles →
        </Link>
      </div>
    </section>
  )
}

interface CarouselCardProps {
  post: BlogPost
  width: number
  basePath: string
}

function CarouselCard({ post, width, basePath }: CarouselCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <article
      className="relative flex-shrink-0 overflow-hidden border-r border-b"
      style={{ width: `${width}px`, pointerEvents: "none", backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      <Link
        href={`${basePath}/${post.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`Read ${post.title}`}
      >
        <span className="sr-only">Read {post.title}</span>
      </Link>
      <div className="relative h-48" style={{ backgroundColor: "var(--muted)" }}>
        {post.image && !imgError ? (
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 85vw, 384px"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "var(--muted)" }}>
            <svg className="w-full h-full" viewBox="0 0 384 192" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="384" height="192" fill="var(--muted)" />
              <rect x="152" y="56" width="80" height="80" rx="8" stroke="var(--border)" strokeWidth="1.5" fill="none" />
              <circle cx="177" cy="81" r="8" stroke="var(--border)" strokeWidth="1.5" fill="none" />
              <path d="M160 124 L182 101 L202 116 L217 104 L224 114" stroke="var(--border)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm mb-1" style={{ color: "var(--fg-muted)" }}>
          <span>{post.category}</span>
          <span>·</span>
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMM d, yyyy")}
          </time>
        </div>
        <h3
          className="font-semibold text-lg mb-2 line-clamp-2"
          style={{ color: "var(--fg)" }}
        >
          {post.title}
        </h3>
        <p className="text-sm line-clamp-2 mb-2" style={{ color: "var(--fg-muted)" }}>{post.excerpt}</p>
        <div className="flex items-center justify-between">
          {post.readTime && <span className="text-xs" style={{ color: "var(--fg-muted)" }}>{post.readTime}</span>}
          <span className="font-medium text-sm" style={{ color: "var(--accent)" }}>
            Read more →
          </span>
        </div>
      </div>
    </article>
  )
}
