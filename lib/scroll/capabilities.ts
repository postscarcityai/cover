/**
 * Runtime capability probes for the scroll-video system.
 *
 * Every one of these is a *client* concern and returns a conservative value on
 * the server, so a component can call them during render without branching on
 * `typeof window` at each site.
 */

/**
 * Hard requirement, not a preference. Under reduced motion the scrub sections
 * render their poster, skip the pin entirely, and flow normally.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Subscribe to reduced-motion changes. Returns an unsubscribe fn. */
export function onReducedMotionChange(cb: (reduced: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {}
  const query = window.matchMedia("(prefers-reduced-motion: reduce)")
  const handler = () => cb(query.matches)
  query.addEventListener("change", handler)
  return () => query.removeEventListener("change", handler)
}

/**
 * WebCodecs availability. Chrome/Edge 94+, Safari 16.4+, Firefox 130+;
 * Firefox for Android is unsupported.
 *
 * Presence of the constructor is necessary but NOT sufficient — see
 * `isWebCodecsUsable`, which also confirms the specific codec config decodes.
 */
export function supportsWebCodecs(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof (window as unknown as { VideoDecoder?: unknown }).VideoDecoder === "function" &&
    typeof (window as unknown as { EncodedVideoChunk?: unknown }).EncodedVideoChunk === "function"
  )
}

/**
 * Ask the browser whether it can actually decode this codec string, rather
 * than assuming it from the constructor's presence. iOS Low Power Mode is the
 * case that matters: it throttles or disables hardware decode, and a config
 * that is "supported" on paper stalls in practice.
 */
export async function isWebCodecsUsable(codec: string): Promise<boolean> {
  if (!supportsWebCodecs()) return false
  try {
    const { supported } = await (
      window as unknown as {
        VideoDecoder: { isConfigSupported(c: { codec: string }): Promise<{ supported: boolean }> }
      }
    ).VideoDecoder.isConfigSupported({ codec })
    return Boolean(supported)
  } catch {
    return false
  }
}

/**
 * Best-effort Low Power Mode / autoplay-blocked probe.
 *
 * There is no API for Low Power Mode. What is observable is the symptom we
 * care about: a muted, inline video that refuses to play. If `play()` rejects
 * or the element stays paused, decode is being throttled or blocked and we
 * must stay on the poster rather than show a frozen black box.
 */
export async function canPlayInline(video: HTMLVideoElement): Promise<boolean> {
  try {
    const played = video.play()
    if (played && typeof played.then === "function") await played
    // A successful play() that leaves the element paused is the Low Power
    // Mode signature.
    return !video.paused
  } catch {
    return false
  }
}

/** True for coarse-pointer devices, used to pick the mobile encode. */
export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches
}
