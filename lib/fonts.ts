/**
 * Font Configuration
 *
 * Open Sans for both headings and body.
 * Weight and size contrast creates hierarchy without a second typeface.
 */

import { Open_Sans } from 'next/font/google'

export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
})
