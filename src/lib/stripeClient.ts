import { loadStripe } from '@stripe/stripe-js'
import { getCancelUrl, getSuccessUrl } from '../config/payments'
import type { ResumePlan } from '../types/resume'

const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || ''
const apiBase = process.env.STRIPE_API_BASE_URL || ''

function checkoutUrl(path: string) {
  if (!apiBase) return path
  try {
    return new URL(path, apiBase).toString()
  } catch {
    return path
  }
}

/**
 * Create a Stripe Checkout session via the local API, then redirect.
 * Throws if Stripe keys or backend are not configured.
 */
export async function startStripeCheckout(plan: ResumePlan) {
  if (!publishableKey) {
    throw new Error('Stripe publishable key missing. Set STRIPE_PUBLISHABLE_KEY.')
  }

  const response = await fetch(checkoutUrl('/api/checkout'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plan,
      successUrl: getSuccessUrl(plan),
      cancelUrl: getCancelUrl(plan),
    }),
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload?.error || 'Unable to start checkout session.')
  }

  // Prefer server-provided redirect URL, fallback to sessionId with Stripe.js.
  if (payload.url) {
    window.location.href = payload.url
    return
  }

  const stripe = await loadStripe(publishableKey)
  if (!stripe) {
    throw new Error('Stripe.js failed to initialize.')
  }
  const sessionId = payload.id || payload.sessionId
  const { error } = await stripe.redirectToCheckout({ sessionId })
  if (error) {
    throw error
  }
}

