/**
 * PreviewAndDownload.tsx
 * Reusable preview + download panel for a resume (CV).
 * - Renders a live ResumePreview inside a ThumbnailSheet for a faithful visual.
 * - Ensures a printable DOM with id="resume-sheet" exists (renders PrintSheet if missing).
 * - Exposes a prominent Download PDF button which calls printPdf targeting #resume-sheet.
 *
 * Notes:
 * - This component uses the existing PrintSheet/printPdf approach to guarantee the PDF
 *   output matches the on-screen preview. The browser's print dialog (Save as PDF)
 *   will be shown — this keeps the implementation dependency-free and cross-browser.
 */

import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ResumeData, ResumePlan } from '../../types/resume'
import ThumbnailSheet from './ThumbnailSheet'
import ResumePreview from './ResumePreview'
import PrintSheet from '../PrintSheet'
import { enhanceResumeForPreview } from '../../lib/enhance'
import { printPdf } from '../../lib/pdf'
import PrimaryButton from '../controls/PrimaryButton'

/**
 * Props for PreviewAndDownload
 */
export interface PreviewAndDownloadProps {
  /** Raw resume data to preview */
  data: ResumeData
  /** Whether the photo should be visible in the preview */
  withPhoto: boolean
  /** Selected plan (controls tiny variations in preview) */
  plan: ResumePlan
}

/**
 * PreviewAndDownload
 * Renders the live preview and a download CTA that will print/download an exact PDF
 * of the preview. If an element with id="resume-sheet" does not exist already,
 * this component renders a PrintSheet so printPdf has something to target.
 */
export default function PreviewAndDownload({ data, withPhoto, plan }: PreviewAndDownloadProps) {
  const { t } = useTranslation()
  const [downloading, setDownloading] = useState(false)
  const [printSheetMounted, setPrintSheetMounted] = useState(false)

  // Prepare enhanced preview data for on-screen rendering and (optionally) for print sheet.
  const prepared = useMemo(() => enhanceResumeForPreview(data), [data])

  /**
   * Check for an existing #resume-sheet element already mounted in the DOM.
   * If none exists, render a PrintSheet so printPdf has an accurate, printable DOM.
   */
  useEffect(() => {
    const exists = Boolean(document.getElementById('resume-sheet'))
    setPrintSheetMounted(!exists)
    // We intentionally run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Trigger printing of the resume sheet.
   * - We call printPdf with the known container id. The PrintSheet (either global or
   *   the one rendered here) must reflect the same 'prepared' data for parity.
   *
   * Note: The browser print dialog appears; users can select "Save as PDF" to download.
   */
  const handleDownload = async () => {
    setDownloading(true)
    try {
      // Ensure document has an element with id="resume-sheet".
      // If we rendered an internal PrintSheet it uses the same 'prepared' data.
      await new Promise((r) => setTimeout(r, 80)) // small delay to let PrintSheet render if mounted
      printPdf({
        containerId: 'resume-sheet',
        title: `${data.fullName || 'CV'} - ${data.headline || ''}`,
      })
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{t('preview.previewTitle', 'CV Preview')}</h3>
        </div>

        <div className="mt-4">
          <ThumbnailSheet>
            <ResumePreview data={prepared} />
          </ThumbnailSheet>
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <div className="text-sm text-neutral-600">
            {t(
              'preview.hint',
              'The downloaded PDF will match this preview. Use your browser print dialog and choose "Save as PDF".'
            )}
          </div>

          <div className="flex gap-3">
            <PrimaryButton
              type="button"
              size="lg"
              onClick={handleDownload}
              disabled={downloading}
              className="bg-[rgb(60,77,42)] hover:bg-[rgb(50,64,35)]"
            >
              {downloading ? t('common.downloading', 'Downloading…') : t('preview.downloadPdf', 'Download PDF')}
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Render a local PrintSheet only when no global resume-sheet exists.
          This avoids duplicate #resume-sheet elements while ensuring printPdf always has a target. */}
      {printSheetMounted ? (
        <div aria-hidden>
          <PrintSheet data={prepared as any} withPhoto={withPhoto} plan={plan} />
        </div>
      ) : null}
    </div>
  )
}