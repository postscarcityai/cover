interface PlaceholderImageProps {
  className?: string
  label?: string
  aspectRatio?: string
}

export function PlaceholderImage({
  className = "",
  label = "Image",
  aspectRatio = "4/3",
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ aspectRatio, backgroundColor: "var(--surface)" }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect width="400" height="300" fill="var(--surface)" />
        <line x1="0" y1="0" x2="400" y2="300" stroke="var(--border)" strokeWidth="0.5" />
        <line x1="400" y1="0" x2="0" y2="300" stroke="var(--border)" strokeWidth="0.5" />
        <rect
          x="160"
          y="110"
          width="80"
          height="80"
          rx="8"
          stroke="var(--border)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="185" cy="135" r="8" stroke="var(--border)" strokeWidth="1.5" fill="none" />
        <path
          d="M168 178 L190 155 L210 170 L225 158 L232 168"
          stroke="var(--border)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="200"
          y="215"
          textAnchor="middle"
          fill="var(--fg-muted)"
          fontSize="12"
          fontFamily="var(--font-body)"
          opacity="0.4"
        >
          {label}
        </text>
      </svg>
    </div>
  )
}
