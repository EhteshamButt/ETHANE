/**
 * EducationFormList.tsx
 * Editable list for Education with native month pickers for start/end.
 * - Fields: degree, school, start (YYYY-MM), end (YYYY-MM or Present), description.
 * - Validates end >= start when both are valid (YYYY-MM) and end !== "Present".
 * - UX: "Present" toggle for ongoing studies, consistent with Experience form.
 * - Update: compact sizing for Degree, School, Start (Début) and End (Fin) to improve visual hierarchy.
 */

import { useTranslation } from 'react-i18next'
import type { EducationItem } from '../../types/resume'
import InfoTooltip from '../InfoTooltip'
import addBtnStyles from '../controls/AddButton.module.css'
import MonthInput from '../controls/MonthInput'

interface Props {
  items: EducationItem[]
  onChange: (next: EducationItem[]) => void
}

/** Indicates if end is the special "Present" value. */
function isPresentValue(v?: string) {
  return (v || '').trim().toLowerCase() === 'present'
}

/** YYYY-MM basic check (01..12). */
function isYearMonth(v?: string): boolean {
  const s = (v || '').trim()
  if (!/^\d{4}-\d{2}$/.test(s)) return false
  const [, mm] = s.split('-')
  const m = Number(mm)
  return m >= 1 && m <= 12
}

/** Turns YYYY-MM into comparable integer (YYYY*100 + MM). */
function parseYearMonthToKey(v?: string): number | null {
  if (!isYearMonth(v)) return null
  const [yy, mm] = (v as string).split('-')
  return Number(yy) * 100 + Number(mm)
}

/** Returns true when end < start (invalid order). */
function isDateOrderInvalid(start?: string, end?: string): boolean {
  if (isPresentValue(end)) return false
  const startKey = parseYearMonthToKey(start)
  const endKey = parseYearMonthToKey(end)
  if (startKey == null || endKey == null) return false
  return endKey < startKey
}

/**
 * Education list component with month pickers and Present toggle.
 * - Compact visual size applied to "Diplôme", "Établissement", "Début", "Fin" inputs.
 * - Present toggle button also reduced to align with compact inputs.
 */
export default function EducationFormList({ items, onChange }: Props) {
  const { t } = useTranslation()

  const update = (idx: number, patch: Partial<EducationItem>) => {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it))
    onChange(next)
  }

  const addItem = () =>
    onChange([
      ...items,
      { degree: '', school: '', start: '', end: '', description: '' }
    ])

  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx))

  const togglePresent = (idx: number) => {
    const current = items[idx]?.end || ''
    const nextEnd = isPresentValue(current) ? '' : 'Present'
    update(idx, { end: nextEnd })
  }

  const dateHelp = t(
    'dates.formatHint',
    'Format: YYYY-MM (ex: 2024-06). Utilisez "Present" pour un cursus en cours.'
  )

  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const present = isPresentValue(it.end)
        const dateOrderInvalid = isDateOrderInvalid(it.start, it.end)
        const endInputErrorId = `edu-${idx}-date-error`

        return (
          <div key={idx} className="rounded border border-[rgba(98,120,85,0.5)] p-3 bg-white">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Diplôme (compact) */}
              <label className="block">
                <span className="mb-1 flex items-center gap-1 text-sm font-medium">
                  {t('educationForm.degree', 'Diplôme')}
                  <InfoTooltip text={dateHelp} />
                </span>
                <input
                  className="u-input h-9 w-full text-sm"
                  value={it.degree || ''}
                  onChange={(e) => update(idx, { degree: e.target.value })}
                  placeholder={t('educationForm.degree.ph', 'Ex: Master en Management')}
                />
              </label>

              {/* Établissement (compact) */}
              <label className="block">
                <span className="mb-1 block text-sm font-medium">
                  {t('educationForm.school', 'Établissement')}
                </span>
                <input
                  className="u-input h-9 w-full text-sm"
                  value={it.school || ''}
                  onChange={(e) => update(idx, { school: e.target.value })}
                  placeholder={t('educationForm.school.ph', 'Ex: Université de ...')}
                />
              </label>

              {/* Début (compact) */}
              <MonthInput
                label={t('educationForm.start', 'Début')}
                value={it.start || ''}
                onChange={(v) => update(idx, { start: v })}
                aria-label={t('educationForm.start', 'Début')}
                size="sm"
              />

              {/* Fin (compact) + Present toggle (compact) */}
              <div className="grid grid-cols-[1fr_auto] items-end gap-2">
                <MonthInput
                  label={t('educationForm.end', 'Fin')}
                  value={present ? '' : (it.end || '')}
                  onChange={(v) => update(idx, { end: v })}
                  aria-label={t('educationForm.end', 'Fin')}
                  disabled={present}
                  errorText={
                    dateOrderInvalid
                      ? t(
                        'educationForm.dateOrderHint',
                        'La date de fin doit être ≥ à la date de début (format YYYY-MM).'
                      )
                      : undefined
                  }
                  id={endInputErrorId}
                  size="sm"
                />
                {/* Compact Present toggle to match smaller controls */}
                <button
                  type="button"
                  onClick={() => togglePresent(idx)}
                  className={`min-h-[36px] self-end rounded border px-2 text-xs sm:text-sm bg-[rgba(230,235,220,0.6)] ${
                    present
                      ? 'border-[rgb(60,77,42)] text-[rgb(60,77,42)] hover:border-[rgb(50,64,35)]'
                      : 'border-[rgba(98,120,85,0.5)] text-neutral-800 hover:border-[rgb(60,77,42)]'
                  }`}
                  title="Basculer Present"
                >
                  {present ? 'Present ✓' : 'Present'}
                </button>
              </div>
            </div>

            <label className="mt-3 block">
              <span className="mb-1 block text-sm font-medium">
                {t('educationForm.description', 'Description')}
              </span>
              <textarea
                rows={4}
                className="u-textarea w-full"
                value={it.description || ''}
                onChange={(e) => update(idx, { description: e.target.value })}
                placeholder={`• Cours clés, projet, résultat
• Distinction, moyenne, leadership
• Stage, mémoire, contribution`}
              />
            </label>

            <div className="mt-2 flex flex-wrap justify-between gap-2">
              <span className="hidden" aria-hidden="true" />
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="min-h-[44px] rounded border border-[rgba(98,120,85,0.5)] bg-[rgba(230,235,220,0.6)] px-3 py-1.5 text-sm hover:border-[rgb(60,77,42)]"
              >
                {t('educationForm.remove', 'Supprimer')}
              </button>
            </div>
          </div>
        )
      })}

      <button
        type="button"
        onClick={addItem}
        className={addBtnStyles.primary}
      >
        {t('educationForm.add', 'Ajouter une formation')}
      </button>
    </div>
  )
}
