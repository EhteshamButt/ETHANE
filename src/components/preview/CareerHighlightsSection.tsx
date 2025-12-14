/**
 * CareerHighlightsSection.tsx
 * Website preview module that displays user “Career Highlights” as a clean, modern card grid.
 * - Now wrapped with SectionCard to standardize background, border, spacing, and heading style.
 * - Responsive grid: 1 col on mobile, 2 on small screens, 3 on large screens.
 * - Uses olive theme tokens via the shared SectionCard + consistent iconography.
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Star } from 'lucide-react'
import SectionCard from '../SectionCard'

/** Shape used internally by cards after parsing simple text highlights. */
interface HighlightCard {
  /** Short title shown prominently on the card. */
  title: string
  /** Optional concise description below the title. */
  description?: string
}

/**
 * Parse plain-text highlights into title/description pairs.
 * Strategy:
 * - Split on the first occurrence of one of [:, —, -] to produce title/description.
 * - If no delimiter is found, the whole string becomes the title.
 */
function toCards(highlights: string[]): HighlightCard[] {
  const DELIM = /[:—-]\s+/
  return (highlights || [])
    .map((raw) => (raw ?? '').trim())
    .filter(Boolean)
    .map((h) => {
      const parts = h.split(DELIM)
      if (parts.length > 1) {
        const [title, ...rest] = parts
        const description = rest.join(' ').trim()
        return { title: title.trim(), description }
      }
      return { title: h }
    })
}

/**
 * CareerHighlightsSection
 * Renders a SectionCard with a localized title and a responsive card grid of highlights.
 * - Returns null if there are no highlights (avoid empty chrome).
 */
export function CareerHighlightsSection({ highlights }: { highlights: string[] }) {
  const { t } = useTranslation()
  const cards = useMemo(() => toCards(highlights), [highlights])

  if (cards.length === 0) return null

  return (
    <SectionCard
      title={t('highlightsForm.label', 'Career Highlights')}
      icon={<Star className="h-4 w-4" aria-hidden="true" />}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, idx) => (
          <article
            key={idx}
            className="group rounded-lg border border-[rgba(98,120,85,0.35)] bg-white p-4 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(60,77,42)]/10">
                <Star className="h-4 w-4 text-[rgb(60,77,42)]" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold text-neutral-900">
                  {card.title || '—'}
                </h4>
                {card.description ? (
                  <p className="mt-1 text-sm text-neutral-700">{card.description}</p>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}

export default CareerHighlightsSection
