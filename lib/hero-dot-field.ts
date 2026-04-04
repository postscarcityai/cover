/**
 * Home hero — Gentle Dot Field (same math as RetroASCII picker index 6).
 */

export const createGrid = (cols: number, rows: number): string[][] => {
  return Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(" "))
}

// Pattern 1: Gentle Dot Field - elegant scattered dots with gentle breathing
export const generateDotField = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows)
  const baseDensity = 0.05 // Increased density for more coverage

  // Near-constant density — no breathing so dots don't pop in/out
  const density = baseDensity

  // Use hash-based distribution with spiral/Voronoi-like clustering
  const cellSize = 3.5
  const verticalPulse = Math.sin(frame * 0.012) * 0.18

  // Steady linear drift with small sine wobble for organic feel
  const flowX = frame * 0.04 + Math.sin(frame * 0.01) * 0.6
  const flowY = frame * 0.012 + Math.sin(frame * 0.008) * 0.3

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Grid-based cells with hash variation (flow offsets cluster phase)
      const cellRow = Math.floor((row + verticalPulse + flowY) / cellSize)
      const cellCol = Math.floor((col + flowX) / cellSize)

      // Create hash from cell position for consistent distribution
      const hash1 = ((cellCol * 137 + cellRow * 193) % 100) / 100
      const hash2 = ((cellCol * 211 + cellRow * 157) % 100) / 100
      const hash3 = ((cellCol * 307 + cellRow * 271) % 100) / 100

      // Position within cell for smooth transitions
      const localRow = ((row + verticalPulse) % cellSize) / cellSize
      const localCol = (col % cellSize) / cellSize
      const distFromCenter = Math.sqrt(
        Math.pow(localRow - 0.5, 2) + Math.pow(localCol - 0.5, 2)
      )

      // Fade towards edges of cell for smooth clusters
      const fade = 1 - distFromCenter * 1.4
      const cellIntensity = (hash1 + hash2 + hash3) / 3

      // Combine cell intensity with fade
      const finalIntensity = cellIntensity * Math.max(0, fade)

      if (finalIntensity > density) {
        // Map intensity to character gradient
        const normalized = (finalIntensity - density) / (1 - density)
        const charIndex = Math.floor(normalized * 6)
        const chars = ["·", "•", "◦", "-", "○", "░"]
        grid[row][col] = chars[charIndex] || " "
      }
    }
  }

  return grid
}

/** RetroASCII per-glyph weights for the Dot Field character ramp */
export function dotFieldGlyphBrightness(char: string): number {
  switch (char) {
    case "·":
      return 0.45
    case "•":
      return 0.52
    case "◦":
      return 0.55
    case "-":
      return 0.56
    case "○":
      return 0.58
    case "░":
      return 0.64
    default:
      return 0.58
  }
}
