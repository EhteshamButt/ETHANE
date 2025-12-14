/**
 * src/config/payments.ts
 * Helpers to obtain payment links and generate success/cancel redirect URLs.
 *
 * - getPaymentLink(plan): returns a configured payment URL for a plan.
 *   It looks for a localStorage override (key: mako.paylink.{plan}) and falls back to built-in defaults.
 * - getSuccessUrl(plan): returns a safe app URL where the payment provider should redirect on success.
 * - getCancelUrl(plan): returns a safe app URL where the payment provider should redirect on cancel.
 *
 * This file keeps configuration client-side for convenience. For production you should
 * keep real payment links and verification on a secure backend.
 */

/**
 * ResumePlan type is declared in src/types/resume.ts
 */
import type { ResumePlan } from '../types/resume'

/**
 * Default payment links (empty = not configured). Replace with actual provider links
 * only in a secure environment or use localStorage overrides for quick testing.
 */
const DEFAULT_LINKS: Record<ResumePlan, string | null> = {
  student: null,
  pro: null,
  advanced: null,
}

/**
 * getPaymentLink
 * Returns a configured payment URL for the given plan if available.
 * Priority:
 *  - localStorage override key: mako.paylink.{plan}
 *  - DEFAULT_LINKS constant
 *
 * @param plan ResumePlan
 * @returns string | null
 */
export function getPaymentLink(plan: ResumePlan): string | null {
  try {
    const key = `mako.paylink.${plan}`
    const override = localStorage.getItem(key)
    if (override && override.trim().length > 0) return override.trim()
  } catch (e) {
    // ignore localStorage errors (e.g. third-party cookies blocked)
  }
  return DEFAULT_LINKS[plan] ?? null
}

/**
 * getSuccessUrl
 * Returns the application URL where the payment provider should redirect on success.
 * Format: <origin><pathname>#?paid=1&plan={plan}
 *
 * @param plan ResumePlan
 * @returns string
 */
export function getSuccessUrl(plan: ResumePlan): string {
  if (typeof window === 'undefined') {
    return `/#?paid=1&plan=${encodeURIComponent(plan)}`
  }
  const base = window.location.origin + window.location.pathname
  return `${base}#?paid=1&plan=${encodeURIComponent(plan)}`
}

/**
 * getCancelUrl
 * Returns the application URL where the payment provider should redirect on cancel.
 * Format: <origin><pathname>#?paid=0&plan={plan}
 *
 * @param plan ResumePlan
 * @returns string
 */
export function getCancelUrl(plan: ResumePlan): string {
  if (typeof window === 'undefined') {
    return `/#?paid=0&plan=${encodeURIComponent(plan)}`
  }
  const base = window.location.origin + window.location.pathname
  return `${base}#?paid=0&plan=${encodeURIComponent(plan)}`
}