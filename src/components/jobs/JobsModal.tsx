/**
 * JobsModal.tsx
 * Full-screen jobs modal acting as a dedicated job-offers page without changing routes.
 * - Opens above the app and is dismissible via close button or escape (if Modal supports it).
 * - Presents a short list of sample job offers with accessible Apply actions.
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../Modal'
import { X, ExternalLink } from 'lucide-react'

/**
 * Minimal job offer description interface.
 */
export interface JobOffer {
  /** Job title. */
  title: string
  /** Short location string. */
  location?: string
  /** Short summary of the role. */
  summary?: string
  /** Contact / apply URL (mailto: or external link). */
  applyUrl?: string
}

/**
 * JobsModalProps
 * - open: whether the modal is visible
 * - onOpenChange: setter to control visibility
 */
export default function JobsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t } = useTranslation()

  /**
   * Sample job offers to display.
   * In production these would come from an API. Kept local for demo/preview purposes.
   */
  const jobs: JobOffer[] = [
    {
      title: 'Country Manager, DRC',
      location: 'Kinshasa, DRC',
      summary: 'Lead commercial operations and market expansion for DRC-focused FMCG initiatives.',
      applyUrl: 'mailto:careers@ethan.example?subject=Application%20for%20Country%20Manager%20DRC'
    },
    {
      title: 'Key Account Manager',
      location: 'Remote / Kinshasa',
      summary: 'Manage strategic distributor relationships and large institutional accounts.',
      applyUrl: 'mailto:careers@ethan.example?subject=Application%20for%20Key%20Account%20Manager'
    },
    {
      title: 'Warehouse & Transport Supervisor',
      location: 'Lubumbashi, DRC',
      summary: 'Supervise warehousing, logistics, and ensure on-time delivery KPIs.',
      applyUrl: 'mailto:careers@ethan.example?subject=Application%20for%20Warehouse%20Supervisor'
    }
  ]

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="max-h-[92vh] overflow-y-auto rounded-lg bg-white p-5 shadow-lg md:max-w-4xl md:mx-auto">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{t('jobs.title', 'Job Offers')}</h2>
            <p className="mt-1 text-sm text-neutral-600">{t('jobs.subtitle', 'Open positions curated for your profile')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label={t('jobs.close', 'Close jobs')}
              className="rounded p-2 text-neutral-700 hover:bg-neutral-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Jobs list */}
        <div className="space-y-3">
          {jobs.map((job, idx) => (
            <article key={idx} className="rounded border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-neutral-900">{job.title}</h3>
                  <div className="mt-1 text-xs text-neutral-600">{job.location}</div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-[rgb(60,77,42)] px-3 py-1 text-xs font-medium text-white hover:bg-[rgb(50,64,35)]"
                    aria-label={`${t('jobs.apply', 'Apply')} ${job.title}`}
                  >
                    <span>{t('jobs.apply', 'Apply')}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
              {job.summary ? <p className="mt-2 text-sm text-neutral-700">{job.summary}</p> : null}
            </article>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-4 text-sm text-neutral-600">
          {t('jobs.note', 'These are sample offers for demo purposes. In a production app, job offers would be fetched from an API.')}
        </div>
      </div>
    </Modal>
  )
}