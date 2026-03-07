/**
 * Theme Configuration System
 *
 * Define multiple themes with colors, typography, spacing, and layout settings.
 * Switch themes by changing the `activeTheme` in site.config.ts
 */

export interface Theme {
  name: string
  colors: {
    // Primary brand color (used for headers, CTAs, key UI elements)
    primary: string
    primaryForeground: string
    // Secondary accent color
    secondary: string
    secondaryForeground: string
    // Accent colors for variety
    accent: string
    accentForeground: string
    // Background colors
    background: string
    foreground: string
    // Muted/subtle colors
    muted: string
    mutedForeground: string
    // Border and input colors
    border: string
    input: string
    ring: string
  }
  typography: {
    // Font families
    heading: string // For h1, h2
    subheading: string // For h3-h6
    body: string // Body text
    // Font sizes (Tailwind classes)
    heroTitle: string // e.g., "text-6xl md:text-8xl"
    sectionTitle: string // e.g., "text-4xl md:text-5xl"
    cardTitle: string // e.g., "text-2xl"
    bodySize: string // e.g., "text-base"
    small: string // e.g., "text-sm"
  }
  spacing: {
    section: string // Vertical spacing between sections
    container: string // Max width for content containers
    grid: string // Gap between grid items
  }
  borderRadius: {
    card: string
    button: string
    input: string
  }
  effects: {
    shadow: string // Default shadow for cards/elevated elements
    shadowHover: string // Hover state shadow
  }
}

// Theme Presets
export const themes: Record<string, Theme> = {
  // Professional Law Firm Theme (Original AMC style)
  professional: {
    name: "Professional",
    colors: {
      primary: "#2A2C53", // Navy blue
      primaryForeground: "#ffffff",
      secondary: "#4A1F5C", // Purple
      secondaryForeground: "#ffffff",
      accent: "#C0362C", // Red accent
      accentForeground: "#ffffff",
      background: "#ffffff",
      foreground: "#1a1a1a",
      muted: "#F4F4F2",
      mutedForeground: "#6b7280",
      border: "#e5e7eb",
      input: "#e5e7eb",
      ring: "#2A2C53",
    },
    typography: {
      heading: "var(--font-playfair), serif",
      subheading: "var(--font-playfair), serif",
      body: "var(--font-montserrat), system-ui, sans-serif",
      heroTitle: "text-6xl md:text-8xl",
      sectionTitle: "text-4xl md:text-5xl",
      cardTitle: "text-2xl md:text-3xl",
      bodySize: "text-base md:text-lg",
      small: "text-sm",
    },
    spacing: {
      section: "py-16 md:py-20",
      container: "max-w-7xl",
      grid: "gap-8 md:gap-12",
    },
    borderRadius: {
      card: "rounded-none", // Sharp, professional
      button: "rounded-none",
      input: "rounded-none",
    },
    effects: {
      shadow: "shadow-md",
      shadowHover: "shadow-lg",
    },
  },

  // Modern/Tech Theme
  modern: {
    name: "Modern",
    colors: {
      primary: "#0066FF", // Bright blue
      primaryForeground: "#ffffff",
      secondary: "#00D9FF", // Cyan
      secondaryForeground: "#000000",
      accent: "#FF3D00", // Orange accent
      accentForeground: "#ffffff",
      background: "#ffffff",
      foreground: "#0a0a0a",
      muted: "#f5f5f5",
      mutedForeground: "#737373",
      border: "#e5e5e5",
      input: "#e5e5e5",
      ring: "#0066FF",
    },
    typography: {
      heading: "var(--font-playfair), serif",
      subheading: "var(--font-playfair), serif",
      body: "var(--font-montserrat), system-ui, sans-serif",
      heroTitle: "text-5xl md:text-7xl",
      sectionTitle: "text-3xl md:text-4xl",
      cardTitle: "text-xl md:text-2xl",
      bodySize: "text-base",
      small: "text-sm",
    },
    spacing: {
      section: "py-12 md:py-16",
      container: "max-w-6xl",
      grid: "gap-6 md:gap-8",
    },
    borderRadius: {
      card: "rounded-xl",
      button: "rounded-lg",
      input: "rounded-lg",
    },
    effects: {
      shadow: "shadow-sm",
      shadowHover: "shadow-md",
    },
  },

  // Elegant/Luxury Theme
  elegant: {
    name: "Elegant",
    colors: {
      primary: "#1a1a1a", // Almost black
      primaryForeground: "#ffffff",
      secondary: "#8B7355", // Warm brown
      secondaryForeground: "#ffffff",
      accent: "#D4AF37", // Gold accent
      accentForeground: "#000000",
      background: "#ffffff",
      foreground: "#1a1a1a",
      muted: "#f8f8f8",
      mutedForeground: "#737373",
      border: "#e0e0e0",
      input: "#f0f0f0",
      ring: "#1a1a1a",
    },
    typography: {
      heading: "var(--font-playfair), serif",
      subheading: "var(--font-montserrat), sans-serif",
      body: "var(--font-montserrat), system-ui, sans-serif",
      heroTitle: "text-6xl md:text-8xl",
      sectionTitle: "text-5xl md:text-6xl",
      cardTitle: "text-2xl md:text-3xl",
      bodySize: "text-base md:text-lg",
      small: "text-sm",
    },
    spacing: {
      section: "py-20 md:py-24",
      container: "max-w-6xl",
      grid: "gap-10 md:gap-16",
    },
    borderRadius: {
      card: "rounded-sm",
      button: "rounded-sm",
      input: "rounded-sm",
    },
    effects: {
      shadow: "shadow-lg",
      shadowHover: "shadow-2xl",
    },
  },

  // Clean/Minimal Theme
  minimal: {
    name: "Minimal",
    colors: {
      primary: "#000000",
      primaryForeground: "#ffffff",
      secondary: "#666666",
      secondaryForeground: "#ffffff",
      accent: "#000000",
      accentForeground: "#ffffff",
      background: "#ffffff",
      foreground: "#000000",
      muted: "#fafafa",
      mutedForeground: "#666666",
      border: "#e5e5e5",
      input: "#f5f5f5",
      ring: "#000000",
    },
    typography: {
      heading: "var(--font-playfair), serif",
      subheading: "var(--font-playfair), serif",
      body: "var(--font-montserrat), system-ui, sans-serif",
      heroTitle: "text-5xl md:text-7xl",
      sectionTitle: "text-4xl md:text-5xl",
      cardTitle: "text-xl md:text-2xl",
      bodySize: "text-base",
      small: "text-sm",
    },
    spacing: {
      section: "py-16 md:py-20",
      container: "max-w-5xl",
      grid: "gap-8 md:gap-12",
    },
    borderRadius: {
      card: "rounded-none",
      button: "rounded-none",
      input: "rounded-none",
    },
    effects: {
      shadow: "shadow-none",
      shadowHover: "shadow-sm",
    },
  },

  // Warm/Friendly Theme
  warm: {
    name: "Warm",
    colors: {
      primary: "#E87722", // Warm orange
      primaryForeground: "#ffffff",
      secondary: "#F4A460", // Sandy brown
      secondaryForeground: "#000000",
      accent: "#8B4513", // Saddle brown
      accentForeground: "#ffffff",
      background: "#FFFEF9", // Warm white
      foreground: "#2d2d2d",
      muted: "#FFF8E7",
      mutedForeground: "#6b5d52",
      border: "#e8d5b7",
      input: "#f5ebe0",
      ring: "#E87722",
    },
    typography: {
      heading: "var(--font-playfair), serif",
      subheading: "var(--font-playfair), serif",
      body: "var(--font-montserrat), system-ui, sans-serif",
      heroTitle: "text-5xl md:text-7xl",
      sectionTitle: "text-4xl md:text-5xl",
      cardTitle: "text-2xl md:text-3xl",
      bodySize: "text-base md:text-lg",
      small: "text-sm",
    },
    spacing: {
      section: "py-16 md:py-20",
      container: "max-w-6xl",
      grid: "gap-8 md:gap-10",
    },
    borderRadius: {
      card: "rounded-lg",
      button: "rounded-full",
      input: "rounded-md",
    },
    effects: {
      shadow: "shadow-md",
      shadowHover: "shadow-xl",
    },
  },
}

// Helper function to get active theme
export function getTheme(themeName: string = 'professional'): Theme {
  return themes[themeName] || themes.professional
}

// Helper to generate CSS variables from theme
export function generateThemeCSS(theme: Theme): string {
  return `
    :root {
      --theme-primary: ${theme.colors.primary};
      --theme-primary-foreground: ${theme.colors.primaryForeground};
      --theme-secondary: ${theme.colors.secondary};
      --theme-secondary-foreground: ${theme.colors.secondaryForeground};
      --theme-accent: ${theme.colors.accent};
      --theme-accent-foreground: ${theme.colors.accentForeground};
      --theme-background: ${theme.colors.background};
      --theme-foreground: ${theme.colors.foreground};
      --theme-muted: ${theme.colors.muted};
      --theme-muted-foreground: ${theme.colors.mutedForeground};
      --theme-border: ${theme.colors.border};
      --theme-input: ${theme.colors.input};
      --theme-ring: ${theme.colors.ring};

      --theme-font-heading: ${theme.typography.heading};
      --theme-font-subheading: ${theme.typography.subheading};
      --theme-font-body: ${theme.typography.body};
    }
  `
}
