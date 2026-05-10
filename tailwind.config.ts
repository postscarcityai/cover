import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2.5rem",
        lg: "4rem",
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1200px",
        xl: "1440px",
        "2xl": "1728px",
      },
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-warm": "var(--surface-warm)",
        muted: "var(--muted)",
        border: "var(--border)",
        fg: "var(--fg)",
        ink: "var(--ink)",
        "fg-muted": "var(--fg-muted)",
        mute: "var(--mute)",
        accent: {
          DEFAULT: "var(--accent)",
          fg: "var(--accent-fg)",
          ink: "var(--accent-ink)",
        },
        trust: "var(--trust)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pill: "var(--radius-pill)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        display: ["var(--font-display-source)", "system-ui", "sans-serif"],
        sans: ["var(--font-body-source)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "display-tight": "-0.06em",
        "display-tighter": "-0.0625em",
        "display-snug": "-0.03em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
