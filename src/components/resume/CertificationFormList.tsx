/** 
 * CertificationFormList.tsx
 * Editable list for Certifications with native month picker for the date.
 * - Fields: name, issuer, date (YYYY-MM), credentialId, credentialUrl.
 * - Update: Make "Intitulé", "Émetteur", and "Identifiant" compact (h-9, text-sm) to remain subordinate.
 */

import { useTranslation } from 'react-i18next'
import type { CertificationItem } from '../../types/resume'
import addBtnStyles from '../controls/AddButton.module.css'
import MonthInput from '../controls/MonthInput'

interface Props {
  /** List of certification items in the resume form */
  items: CertificationItem[]
  /** Emits the updated certification list */
  onChange: (next: CertificationItem[]) => void
}

/**
 * CertificationFormList
 * Renders editable certification entries.
 * - Keeps layout airy while making specific sub-controls compact for visual hierarchy.
 */
export default function CertificationFormList({ items, onChange }: Props) {
  const { t } = useTranslation()

  /** Update an item by index with a partial patch. */
  const update = (idx: number, patch: Partial<CertificationItem>) => {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it))
    onChange(next)
  }

  /** Add a new empty certification item. */
  const addItem = () =>
    onChange([
      ...items,
      { name: '', issuer: '', date: '', credentialId: '', credentialUrl: '' }
    ])

  /** Remove an item by index. */
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx))

  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div key={idx} className="rounded border border-[rgba(98,120,85,0.5)] p-3 bg-white">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Intitulé (compact) */}
            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                {t('certForm.name', 'Intitulé')}
              </span>
              <input
                className="u-input h-9 w-full text-sm"
                value={it.name || ''}
                onChange={(e) => update(idx, { name: e.target.value })}
                placeholder={t('certForm.name.ph', 'Ex: PMP, AWS SAA, ...')}
              />
            </label>

            {/* Émetteur (compact) */}
            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                {t('certForm.issuer', 'Émetteur')}
              </span>
              <input
                className="u-input h-9 w-full text-sm"
                value={it.issuer || ''}
                onChange={(e) => update(idx, { issuer: e.target.value })}
                placeholder={t('certForm.issuer.ph', 'Ex: PMI, AWS, ...')}
              />
            </label>

            {/* Date (kept default size to maintain reading rhythm) */}
            <MonthInput
              label={t('certForm.date', 'Date')}
              value={it.date || ''}
              onChange={(v) => update(idx, { date: v })}
              aria-label={t('certForm.date', 'Date')}
            />

            {/* Identifiant (compact) */}
            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                {t('certForm.credId', 'Identifiant')}
              </span>
              <input
                className="u-input h-9 w-full text-sm"
                value={it.credentialId || ''}
                onChange={(e) => update(idx, { credentialId: e.target.value })}
                placeholder={t('certForm.credId.ph', 'Ex: 1234-5678')}
              />
            </label>

            {/* URL (kept full size for legibility) */}
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-sm font-medium">
                {t('certForm.credUrl', 'URL')}
              </span>
              <input
                className="u-input"
                value={it.credentialUrl || ''}
                onChange={(e) => update(idx, { credentialUrl: e.target.value })}
                placeholder="https://..."
              />
            </label>
          </div>

          <div className="mt-2 flex flex-wrap justify-between gap-2">
            <span className="hidden" aria-hidden="true" />
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="min-h-[44px] rounded border border-[rgba(98,120,85,0.5)] bg-[rgba(230,235,220,0.6)] px-3 py-1.5 text-sm hover:border-[rgb(60,77,42)]"
            >
              {t('certForm.remove', 'Supprimer')}
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className={addBtnStyles.primary}
      >
        {'+'}{t('certForm.add', 'Ajouter une certification')}
      </button>
    </div>
  )
}
