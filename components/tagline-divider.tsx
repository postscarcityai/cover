"use client"

interface TaglineDividerProps {
  text: string
  className?: string
}

export function TaglineDivider({ text, className = "" }: TaglineDividerProps) {
  return (
    <div className={`py-8 md:py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 flex items-center gap-6">
        <div
          className="flex-grow h-px opacity-20"
          style={{ backgroundColor: "var(--fg)" }}
        />
        <p className="text-sm tracking-[0.3em] uppercase opacity-40 whitespace-nowrap">
          {text}
        </p>
        <div
          className="flex-grow h-px opacity-20"
          style={{ backgroundColor: "var(--fg)" }}
        />
      </div>
    </div>
  )
}
