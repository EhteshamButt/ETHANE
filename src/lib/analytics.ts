/**
 * analytics.ts
 * Lightweight Google Analytics (GA4) helper using gtag.js (no external deps).
 *
 * - initGA(measurementId): injects gtag script and prepares window.gtag.
 * - trackPage(path): records a page_view event (we disable automatic page view in config).
 * - trackEvent(params): record a custom event.
 *
 * This is intentionally minimal: it avoids adding libraries and works by injecting the official gtag.js script.
 */

/**
 * Minimal type for an event payload.
 */
export interface EventParams {
  action: string
  category?: string
  label?: string
  value?: number | string
}

/**
 * Initialize Google Analytics (gtag.js).
 *
 * @param measurementId - GA4 Measurement ID (G-XXXXXXX)
 * @returns void
 */
export function initGA(measurementId?: string): void {
  if (!measurementId) {
    // No ID provided — nothing to do.
    // Consumer should use a real measurement id in production.
    // eslint-disable-next-line no-console
    console.warn('[analytics] No Measurement ID provided, GA disabled.')
    return
  }

  // Avoid reinjecting if already present
  if ((window as any).gtagInitialized) return

  // Inject gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize dataLayer and gtag
  ;(window as any).dataLayer = (window as any).dataLayer || []
  function gtagWrapper(...args: unknown[]) {
    ;(window as any).dataLayer.push(arguments)
  }
  ;(window as any).gtag = gtagWrapper

  ;(window as any).gtag('js', new Date())
  // disable automatic page_view so we can send page views manually
  ;(window as any).gtag('config', measurementId, { send_page_view: false })

  ;(window as any).gtagInitialized = true
  // eslint-disable-next-line no-console
  console.info('[analytics] gtag initialized')
}

/**
 * Track a page view.
 *
 * @param path - page path (string). e.g. '/#/' or '/job-offers'
 */
export function trackPage(path: string): void {
  if (typeof (window as any).gtag !== 'function') {
    // eslint-disable-next-line no-console
    console.debug('[analytics] gtag not ready — page_view skipped', path)
    return
  }
  ;(window as any).gtag('event', 'page_view', {
    page_path: path,
  })
}

/**
 * Track a custom event.
 *
 * @param params - event parameters (action required, others optional)
 */
export function trackEvent(params: EventParams): void {
  if (typeof (window as any).gtag !== 'function') {
    // eslint-disable-next-line no-console
    console.debug('[analytics] gtag not ready — event skipped', params)
    return
  }

  const { action, category, label, value } = params
  ;(window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}