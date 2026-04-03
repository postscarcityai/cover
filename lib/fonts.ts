/**
 * Font Configuration
 *
 * Instrument Serif for headings — editorial, high-contrast serif.
 * JetBrains Mono for body — monospace UI / technical copy.
 */

import { JetBrains_Mono, Instrument_Serif } from "next/font/google"

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})
