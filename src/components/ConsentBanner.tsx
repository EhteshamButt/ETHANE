/**
 * ConsentBanner.tsx
 * A small, privacy-first consent banner for Google Analytics.
 * - Persists user choice in localStorage under key 'ga_consent'.
 * - Dispatches a 'ga-consent-changed' CustomEvent on window so other parts (AnalyticsListener) can react.
 * - Keeps UI minimal and accessible; uses Tailwind for styling.
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Info, X } from 'lucide-react'

/**
 * getStoredConsent
 * Reads the persisted consent value from localStorage.
 *
 * @returns boolean | null - true = accepted, false = declined, null = not set
 */
function getStoredConsent(): boolean | null {
  const v = localStorage.getItem('ga_consent')
  if (v === 'true') return true
  if (v === 'false') return false
  return null
}

/**
 * persistConsent
 * Persists user's choice in localStorage and notifies the app via a custom event.
 *
 * @param consent - user's consent (true = accept, false = decline)
 */
function persistConsent(consent: boolean) {
  localStorage.setItem('ga_consent', consent ? 'true' : 'false')
  const evt = new CustomEvent<boolean>('ga-consent-changed', { detail: consent })
  window.dispatchEvent(evt)
}

/**
 * ConsentBanner
 * - Renders a fixed bottom banner asking for analytics consent.
 * - If the user already chose, the banner is hidden.
 */
export default function ConsentBanner(): JSX.Element | null {
  const { t } = useTranslation()
  const [consent, setConsent] = useState<boolean | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    setConsent(stored)
    setVisible(stored === null)
  }, [])

  /**
   * handleAccept
   * Records acceptance and hides the banner.
   */
  function handleAccept() {
    persistConsent(true)
    setConsent(true)
    setVisible(false)
  }

  /**
   * handleDecline
   * Records decline and hides the banner (we still persist the decision to avoid asking repeatedly).
   */
  function handleDecline() {
    persistConsent(false)
    setConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('consent.label', 'Analytics consent')}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-lg border border-neutral-200 bg-white p-4 shadow-lg md:left-auto md:right-8"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <div className="rounded bg-[rgb(60,77,42)] p-2 text-white">
            <Info className="h-4 w-4" />
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-900">
            {t(
              'consent.title',
              'We value your privacy — may we enable analytics to improve the app?'
            )}
          </p>
          <p className="mt-1 text-xs text-neutral-600">
            {t(
              'consent.description',
              'Analytics helps us understand usage. You can change this later in your browser storage.'
            )}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className="inline-flex items-center gap-2 rounded bg-[rgb(60,77,42)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[rgb(50,64,35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(60,77,42)]/40"
            >
              {t('consent.accept', 'Enable analytics')}
            </button>

            <button
              type="button"
              onClick={handleDecline}
              className="inline-flex items-center gap-2 rounded border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none"
            >
              {t('consent.decline', 'No, thanks')}
            </button>

            <button
              type="button"
              onClick={() => {
                persistConsent(false)
                setVisible(false)
              }}
              aria-label={t('consent.dismiss', 'Dismiss')}
              className="ml-auto inline-flex items-center rounded p-2 text-neutral-500 hover:bg-neutral-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}