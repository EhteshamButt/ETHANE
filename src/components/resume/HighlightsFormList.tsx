/**
 * HighlightsFormList.tsx
 * Dynamic list input for Career Highlights (points forts).
 * - Visual alignment: uses shared AddButton.module.css (.secondary) like Education add button.
 * - Compact, accessible fields with add/remove controls.
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import addBtnStyles from '../controls/AddButton.module.css'

/** Props for HighlightsFormList */
export interface HighlightsFormListProps {
  /** List of highlight strings */
  items: string[]
  /** Emits the updated list */
  onChange: (items: string[]) => void
}

/** Add a new empty highlight to the list. */
function addHighlight(items: string[], onChange: (next: string[]) => void) {
  onChange([...(items || []), ''])
}

/** Remove a highlight by index. */
function removeHighlight(items: string[], onChange: (next: string[]) => void, idx: number) {
  onChange((items || []).filter((_, i) => i !== idx))
}

/** Update a highlight string at given index. */
function updateHighlight(items: string[], onChange: (next: string[]) => void, idx: number, value: string) {
  const next = (items || []).slice()
  next[idx] = value
  onChange(next)
}

/**
 * HighlightsFormList
 * Renders a list of single-line highlight inputs and an add button styled like Education's add button.
 */
export default function HighlightsFormList({ items = [], onChange }: HighlightsFormListProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      {(items || []).map((val, idx) => (
        <div key={idx} className="rounded border border-[rgba(98,120,85,0.35)] bg-white p-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              {t('highlightsForm.itemLabel', 'Réussite')}
            </span>
            <input
              type="text"
              value={val || ''}
              onChange={(e) => updateHighlight(items, onChange, idx, e.target.value)}
              placeholder={t('highlightsForm.placeholder', 'Describe a key achievement or milestone in your career.')}
              className="u-input w-full"
            />
          </label>

          <div className="mt-2 text-right">
            <button
              type="button"
              onClick={() => removeHighlight(items, onChange, idx)}
              className="rounded border border-[rgba(98,120,85,0.5)] bg-[rgba(230,235,220,0.6)] px-3 py-1.5 text-xs hover:border-[rgb(60,77,42)]"
              aria-label={t('highlightsForm.remove', 'Remove')}
            >
              {t('highlightsForm.remove', 'Remove')}
            </button>
          </div>
        </div>
      ))}

      {/* Add button: reuses shared AddButton.module.css (secondary) to match Education's visual style */}
      <button
        type="button"
        onClick={() => addHighlight(items, onChange)}
        className={addBtnStyles.primary}
        aria-label={t('highlightsForm.add', '+ Add highlight')}
      >
        {t('highlightsForm.add', '+ Add highlight')}
      </button>
    </div>
  )
}
