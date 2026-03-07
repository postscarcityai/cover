import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    'bg-theme-primary',
    'bg-theme-secondary',
    'text-theme-primary',
    'text-theme-primary-fg',
    'text-theme-secondary-fg',
    'border-theme-primary',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
        // Legacy colors (keep for backwards compatibility)
        'regal-navy': '#2A2C53',
        'soft-gray': '#F4F4F2',
        'emergency-red': '#C0362C',
        'purple-accent': {
          DEFAULT: 'hsl(var(--purple-accent))',
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#4A1F5C',
          700: '#3d1a4a',
          800: '#2f1438',
          900: '#220e26',
        },
        // Theme system colors
        theme: {
          primary: 'var(--theme-primary)',
          'primary-fg': 'var(--theme-primary-foreground)',
          secondary: 'var(--theme-secondary)',
          'secondary-fg': 'var(--theme-secondary-foreground)',
          accent: 'var(--theme-accent)',
          'accent-fg': 'var(--theme-accent-foreground)',
          muted: 'var(--theme-muted)',
          'muted-fg': 'var(--theme-muted-foreground)',
        },
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'scroll': 'scroll 20s linear infinite',
  		},
      fontFamily: {
        'playfair': ['var(--font-playfair)', 'serif'],
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'sans': ['var(--theme-font-body)', 'system-ui', 'sans-serif'],
        // Template: Add more fonts here when needed
        // Then update theme.config.ts to use them
      },
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    // Plugin to generate theme color utilities
    function({ addUtilities }: any) {
      addUtilities({
        '.bg-theme-primary': {
          'background-color': 'var(--theme-primary) !important',
        },
        '.bg-theme-secondary': {
          'background-color': 'var(--theme-secondary) !important',
        },
        '.text-theme-primary': {
          'color': 'var(--theme-primary) !important',
        },
        '.text-theme-primary-fg': {
          'color': 'var(--theme-primary-foreground) !important',
        },
        '.text-theme-secondary-fg': {
          'color': 'var(--theme-secondary-foreground) !important',
        },
        '.border-theme-primary': {
          'border-color': 'var(--theme-primary) !important',
        },
      })
    },
  ],
};
export default config;
