/**
 * Header.tsx
 * Main site header with sticky positioning.
 * - Displays the provided transparent brand image via BrandLogo.
 * - Adds a "Jobs" button adjacent to the Share/Partager button and opens a full-screen Jobs modal (no route change).
 * - Keeps share menu and language switcher on the right.
 */

import React, { useState } from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ShareMenu } from './ShareMenu'
import { BrandLogo } from './BrandLogo'
import { useTranslation } from 'react-i18next'
import { Briefcase } from 'lucide-react'
import JobsModal from './jobs/JobsModal'
import { trackEvent } from '../lib/analytics'
import { useAuthStore } from '../stores/auth'
import { Link, useNavigate } from 'react-router'

/**
 * Header
 * Sticky top bar with brand image left and actions right.
 * - Places the Jobs button immediately after the ShareMenu so it sits next to the "Partager" button.
 * - Jobs button styling mirrors the Share button to visually group both actions.
 * - The Jobs modal provides a dedicated job-offers experience without changing routes.
 */
export function Header() {
  const { t } = useTranslation()
  const [jobsOpen, setJobsOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const openJobs = () => {
    // Track the interaction (custom event)
    try {
      trackEvent({
        action: 'open_jobs',
        category: 'engagement',
        label: 'header_jobs_button',
      })
    } catch {
      // ignore tracking issues
    }
    setJobsOpen(true)
  }

  return (
    <header data-header="sticky" className="site-header sticky top-0 z-40 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand (clickable to home) */}
        <div className="flex items-center [--logo-height:40px] md:[--logo-height:56px] lg:[--logo-height:64px]">
          <BrandLogo className="h-[var(--logo-height)] mr-3" />
        </div>

        {/* Actions: Share, Jobs (next to Share), Language */}
        <div className="flex items-center gap-2">
          <ShareMenu />

          {/* Jobs button placed directly next to ShareMenu to sit beside "Partager" */}
          <button
            type="button"
            onClick={openJobs}
            aria-label={t('jobs.open', 'Open jobs')}
            title={t('jobs.open', 'Jobs')}
            className="inline-flex items-center gap-2 rounded bg-[rgb(60,77,42)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[rgb(50,64,35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(60,77,42)]/40"
          >
            <Briefcase className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{t('jobs.label', 'Jobs')}</span>
          </button>

          <LanguageSwitcher />

          {user ? (
            <button
              type="button"
              onClick={() => {
                logout()
                navigate('/auth')
              }}
              className="rounded border border-[rgba(98,120,85,0.5)] px-3 py-1.5 text-sm text-neutral-900 hover:border-[rgb(60,77,42)]"
            >
              {t('common.logout', 'Logout')}
            </button>
          ) : (
            <Link
              to="/auth"
              className="rounded bg-[rgb(60,77,42)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[rgb(50,64,35)]"
            >
              {t('common.login', 'Login')}
            </Link>
          )}
        </div>
      </div>

      {/* Jobs modal rendered alongside header; controlled locally to avoid route changes */}
      <JobsModal open={jobsOpen} onOpenChange={setJobsOpen} />
    </header>
  )
}

export default Header