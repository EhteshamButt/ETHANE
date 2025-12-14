/**
 * App.tsx
 * Main application shell and router.
 * - Initializes i18n and renders a single LanguageSwitcher via Header (top-right).
 * - Initializes Google Analytics (if configured) and tracks page views on route changes.
 * - Keeps routing unchanged and wraps content with a minimal shell.
 */

/**
 * App.tsx
 * Main application shell and router.
 * - Initializes i18n and renders a single LanguageSwitcher via Header (top-right).
 * - Uses a consent-first approach for analytics: GA is only initialized when the user consents.
 * - Keeps routing unchanged and wraps content with a minimal shell.
 */

import './styles/theme.css'
import './styles/auto-contrast.css'
import './styles/typography.css'
import './styles/header.css' // unified header surface styles

/** i18n init and minor i18n patch (kept light and centralized) */
import './lib/i18n'
import './lib/i18nAddressPatch'
import './lib/i18nUxPatch'
import './lib/i18nMorePatch'
import './lib/i18nButtonsPatch'
import './lib/i18nPaymentPatch'

import { HashRouter, Route, Routes, useLocation } from 'react-router'
import HomePage from './pages/Home'
import AuthPage from './pages/Auth'
import Header from './components/Header'
import React, { useEffect } from 'react'
import { initGA, trackPage } from './lib/analytics'
import { GA_MEASUREMENT_ID, ENABLE_GA } from './config/analytics'
import ConsentBanner from './components/ConsentBanner'

/**
 * AnalyticsListener
 * - Waits for user consent before initializing GA.
 * - Listens to a custom 'ga-consent-changed' window event so the ConsentBanner can trigger GA initialization dynamically.
 * - Sends page_view events on route changes only when gtag is initialized.
 */
function AnalyticsListener() {
  const location = useLocation()

  useEffect(() => {
    // Helper: check persisted consent in localStorage
    const hasConsent = localStorage.getItem('ga_consent') === 'true'

    if (ENABLE_GA && hasConsent) {
      initGA(GA_MEASUREMENT_ID)
    } else if (!ENABLE_GA) {
      // eslint-disable-next-line no-console
      console.info('[analytics] GA disabled (set GA_MEASUREMENT_ID in src/config/analytics.ts)')
    }

    // Listen for consent changes triggered by the ConsentBanner
    function onConsentChange(e: Event) {
      const detail = (e as CustomEvent<boolean>).detail
      if (ENABLE_GA && detail === true) {
        initGA(GA_MEASUREMENT_ID)
      }
    }

    window.addEventListener('ga-consent-changed', onConsentChange as EventListener)

    return () => {
      window.removeEventListener('ga-consent-changed', onConsentChange as EventListener)
    }
    // We intentionally do not depend on initGA to avoid re-initializing unexpectedly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash || ''}`
    // Only attempt to track when GA is enabled and gtag is initialized.
    if (ENABLE_GA && (window as any).gtagInitialized) {
      trackPage(path)
    }
  }, [location.pathname, location.search, location.hash])

  return null
}

/**
 * App
 * Renders the router with a single, accessible LanguageSwitcher placed in the Header.
 * Adds a ConsentBanner at the root so users can accept/decline analytics.
 */
export default function App() {
  return (
    <HashRouter>
      {/* Analytics listener requires to be inside the router to read location correctly */}
      <AnalyticsListener />

      {/* Minimal application shell */}
      <div className="relative min-h-dvh bg-white">
        {/* Global header with actions (includes the only LanguageSwitcher) */}
        <Header />

        {/* Main routes (unchanged) */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>

        {/* Consent banner (renders only when consent not yet given or explicitly declined) */}
        <ConsentBanner />
      </div>
    </HashRouter>
  )
}