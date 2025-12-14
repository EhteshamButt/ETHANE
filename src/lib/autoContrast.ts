/**
 * autoContrast.ts
 * Global automatic text-contrast manager.
 *
 * Purpose:
 * - Scan elements that have an explicit background (color or gradient).
 * - Compute background luminance and choose the best foreground (white or black) by WCAG contrast ratio.
 * - Mark elements with data-contrast="dark" (prefer white text) or data-contrast="light" (prefer dark text).
 * - Keep it up-to-date using MutationObserver and ResizeObserver.
 *
 * Notes:
 * - We do NOT force colors here. We only set attributes. The CSS layer (auto-contrast.css) handles the visual override.
 * - For gradients, we parse the first rgba() or rgb() occurrence as a quick heuristic.
 * - Descendants inherit the text color from the nearest ancestor with data-contrast unless they themselves have
 *   a background and their own data-contrast (local override).
 */

type RGB = { r: number; g: number; b: number; a?: number }

/** Parse an rgb/rgba() string into components. Returns null on failure. */
function parseRgbString(input: string | null | undefined): RGB | null {
  if (!input) return null
  // Matches rgb(255, 255, 255) or rgba(255 255 255 / 0.8) or rgba(255,255,255,0.8)
  const re = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/i
  const m = input.match(re)
  if (!m) return null
  const r = clamp255(parseFloat(m[1]))
  const g = clamp255(parseFloat(m[2]))
  const b = clamp255(parseFloat(m[3]))
  const a = m[4] != null ? clamp01(parseFloat(m[4])) : 1
  return { r, g, b, a }
}

/** Extract the first rgb/rgba color from a CSS backgroundImage string (e.g., linear-gradient(...)). */
function firstColorFromBackgroundImage(bgImg: string): RGB | null {
  // Find the first rgb/rgba occurrence
  const re = /rgba?\([^)]*\)/gi
  const match = bgImg.match(re)?.[0]
  if (!match) return null
  return parseRgbString(match)
}

/** Clamp helpers */
function clamp255(v: number) { return Math.max(0, Math.min(255, v)) }
function clamp01(v: number) { return Math.max(0, Math.min(1, v)) }

/** Convert sRGB channel to linear. */
function srgbToLinear(c: number): number {
  const x = c / 255
  return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
}

/** Relative luminance (WCAG) from RGB. Ignores alpha; use composited backgrounds for alpha if needed. */
function relativeLuminance(rgb: RGB): number {
  const R = srgbToLinear(rgb.r)
  const G = srgbToLinear(rgb.g)
  const B = srgbToLinear(rgb.b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

/** Contrast ratio between two luminances (L1 is lighter). */
function contrastRatio(L1: number, L2: number): number {
  const light = Math.max(L1, L2)
  const dark = Math.min(L1, L2)
  return (light + 0.05) / (dark + 0.05)
}

/** Decide best foreground color on a given background. Returns 'white' or 'black'. */
function bestForegroundForBg(rgb: RGB): 'white' | 'black' {
  const L = relativeLuminance(rgb)
  const contrastWithWhite = contrastRatio(1, L) // white luminance = 1
  const contrastWithBlack = contrastRatio(L, 0) // black luminance = 0
  return contrastWithWhite >= contrastWithBlack ? 'white' : 'black'
}

/** Try to resolve the effective background color of an element. */
function resolveBackgroundColor(el: Element): RGB | null {
  const cs = window.getComputedStyle(el as HTMLElement)
  const bgImg = cs.backgroundImage
  const bgColor = cs.backgroundColor

  // Priority 1: explicit gradient/image
  if (bgImg && bgImg !== 'none') {
    const rgb = firstColorFromBackgroundImage(bgImg)
    if (rgb) return rgb
  }

  // Priority 2: explicit background-color (non-transparent)
  const rgb = parseRgbString(bgColor)
  if (rgb && (rgb.a ?? 1) > 0) {
    return rgb
  }

  return null
}

/** Apply data-contrast attribute according to background analysis. */
function applyContrastToElement(el: Element) {
  const rgb = resolveBackgroundColor(el)
  if (!rgb) {
    // No explicit background here — we avoid setting data-contrast to let ancestors decide
    el.removeAttribute('data-contrast')
    return
  }
  const fg = bestForegroundForBg(rgb)
  // If best foreground is white, we consider the background "dark-like".
  if (fg === 'white') {
    (el as HTMLElement).setAttribute('data-contrast', 'dark')
  } else {
    (el as HTMLElement).setAttribute('data-contrast', 'light')
  }
}

/** Scan a subtree: applies data-contrast to the root and its descendants that have explicit background. */
function scanSubtree(root: Element) {
  // Root first
  applyContrastToElement(root)
  // Then descendants
  const all = root.querySelectorAll('*')
  for (const el of Array.from(all)) {
    applyContrastToElement(el)
  }
}

/** Initialize the observers and perform an initial scan. Returns a cleanup function. */
export function initAutoContrast(): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {}
  }

  const processQueue = new Set<Element>()
  let rafId: number | null = null

  const schedule = (el: Element) => {
    processQueue.add(el)
    if (rafId == null) {
      rafId = window.requestAnimationFrame(() => {
        const items = Array.from(processQueue)
        processQueue.clear()
        rafId = null
        for (const node of items) {
          if (node instanceof Element) scanSubtree(node)
        }
      })
    }
  }

  // Initial full scan
  schedule(document.body)

  // Observe changes: new nodes, attribute changes (class/style), subtree additions
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'childList') {
        m.addedNodes.forEach((n) => {
          if (n instanceof Element) schedule(n)
        })
      } else if (m.type === 'attributes') {
        if (m.target instanceof Element) {
          schedule(m.target)
        }
      }
    }
  })
  mo.observe(document.body, {
    childList: true,
    attributes: true,
    subtree: true,
    attributeFilter: ['class', 'style'],
  })

  // Resize can affect layout (and sometimes computed backgrounds of responsive classes)
  const ro = new ResizeObserver(() => schedule(document.body))
  ro.observe(document.body)

  // Cleanup
  return () => {
    mo.disconnect()
    ro.disconnect()
    if (rafId != null) window.cancelAnimationFrame(rafId)
  }
}
