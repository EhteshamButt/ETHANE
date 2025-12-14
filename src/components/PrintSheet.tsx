/**
 * PrintSheet.tsx
 * A hidden printable container that renders the resume exactly as in the preview.
 * - Ensures there is always a DOM element with id="resume-sheet" so printPdf can target it
 *   even when the full-screen preview is not open.
 * - The container is visually hidden during normal browsing (hidden) but becomes visible
 *   for print media (print:block). This guarantees the downloaded PDF contains the
 *   same CV content shown in the preview.
 */

import React, { useMemo } from 'react'
import type { ResumeData, ResumePlan } from '../types/resume'
import ThumbnailSheet from './preview/ThumbnailSheet'
import ResumePreview from './resume/ResumePreview'
import { enhanceResumeForPreview } from '../lib/enhance'

/**
 * Props for PrintSheet component
 */
export interface PrintSheetProps {
  /** Raw resume data from the form */
  data: ResumeData
  /** Whether the photo should be shown */
  withPhoto: boolean
  /** Currently selected plan (used for minor plan-based trimming if needed) */
  plan: ResumePlan
}

/**
 * PrintSheet
 * Renders a resume inside a container with id="resume-sheet" that is hidden on-screen
 * but visible when printing. This component guarantees the same CV as the preview
 * is printed/downloaded after payment, even if the user is not viewing the preview.
 *
 * @param props PrintSheetProps
 * @returns JSX.Element
 */
export default function PrintSheet({ data, withPhoto }: PrintSheetProps) {
  // Build the enhanced preview data as PreviewScreen does to ensure parity.
  const prepared = useMemo(() => enhanceResumeForPreview(data), [data])

  return (
    // Hidden on screen, visible when printing. The id is used by printPdf().
    <div id="resume-sheet" className="hidden print:block">
      <div className="mx-auto max-w-[794px] print:mx-0 print:max-w-[794px]">
        {/* ThumbnailSheet provides consistent print styling (A4 frame) */}
        <ThumbnailSheet>
          <ResumePreview data={prepared} withPhoto={withPhoto} />
        </ThumbnailSheet>
      </div>
    </div>
  )
}
