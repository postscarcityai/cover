/**
 * Font Configuration
 *
 * Sora for headings, Montserrat for body copy.
 * Change fonts here and update theme.config.ts to reference the new font variables.
 */

import {
  Sora,
  Montserrat,
} from 'next/font/google'

export const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})
