/**
 * Font Configuration
 *
 * Template uses Montserrat for body copy and Playfair Display for headlines.
 * Easy to customize: Change the fonts here and update theme.config.ts to use them.
 * 
 * To add new fonts:
 * 1. Import from 'next/font/google' or use localFont
 * 2. Export with variable CSS variable
 * 3. Add to layout.tsx className
 * 4. Update theme.config.ts to reference the new font variables
 */

import {
  Playfair_Display,
  Montserrat,
} from 'next/font/google'

// Headline Font - Used for h1, h2
export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

// Body Font - Used for body text, buttons, UI elements
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

// Template: To add more fonts, uncomment and customize:
// 
// import { Your_Font } from 'next/font/google'
// export const yourFont = Your_Font({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   variable: '--font-your-font',
//   display: 'swap',
// })
//
// Then add to layout.tsx className and theme.config.ts
