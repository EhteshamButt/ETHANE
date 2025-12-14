/** 
 * ExperienceFormList
 * Liste éditable d'expériences professionnelles.
 * - Champs: title, company, start, end (+ bouton "Present"), description.
 * - Options: génération de puces (IA) via getExperienceBullets(lang, domain, role).
 * - Validation douce: si start/end au format YYYY-MM et end !== "Present", alors end ≥ start.
 * - Aide: icône info avec infobulle sur les formats de date acceptés.
 * - Mobile: champs en 16px, boutons min 44px pour confort tactile.
 * - Thème: olive (boutons primaires olive, survols border olive)
 */

import { useTranslation } from 'react-i18next'
import type { ExperienceItem } from '../../types/resume'
import type { ResumeDomain } from '../../types/resume'
import { getExperienceBullets, getSuggestedExperiences } from '../../lib/suggestions'
import InfoTooltip from '../InfoTooltip'
import addBtnStyles from '../controls/AddButton.module.css'
import MonthInput from '../controls/MonthInput'

interface Props {
  /** Liste des expériences */
  items: ExperienceItem[]
  /** Callback de mise à jour */
  onChange: (next: ExperienceItem[]) => void
  /** Langue courante, ex: 'fr' */
  lang: 'fr' | 'en' | 'sw' | 'pt' | 'mg'
  /** Domaine pour contextualiser les puces IA */
  domain: ResumeDomain
}

/** Indique si la valeur "fin" représente un emploi en cours. */
function isPresentValue(v?: string) {
  return (v || '').trim().toLowerCase() === 'present'
}

/** Vérifie si une chaîne suit le format YYYY-MM et un mois valide 01-12. */
function isYearMonth(v?: string): boolean {
  const s = (v || '').trim()
  if (!/^\d{4}-\d{2}$/.test(s)) return false
  const [, mm] = s.split('-')
  const m = Number(mm)
  return m >= 1 && m <= 12
}

/**
 * Transforme YYYY-MM en entier comparable (YYYY * 100 + MM).
 * Retourne null si format invalide.
 */
function parseYearMonthToKey(v?: string): number | null {
  if (!isYearMonth(v)) return null
  const [yy, mm] = (v as string).split('-')
  return Number(yy) * 100 + Number(mm)
}

/**
 * Détermine si l'ordre Start/End est invalide.
 * - Si l'un est vide ou invalide, on ne lève pas d'erreur (contrôle optionnel).
 * - Si end === "Present", pas d'erreur.
 * - Sinon, compare startKey et endKey.
 */
function isDateOrderInvalid(start?: string, end?: string): boolean {
  if (isPresentValue(end)) return false
  const startKey = parseYearMonthToKey(start)
  const endKey = parseYearMonthToKey(end)
  if (startKey == null || endKey == null) return false
  return endKey < startKey
}

/**
 * Composant de liste d'expérience avec ajout/suppression, IA, "Present" et validation d'ordre chronologique.
 * Ajoute une icône info pour documenter les formats de date acceptés.
 */
export function ExperienceFormList({ items, onChange, lang, domain }: Props) {
  const { t } = useTranslation()

  /** Met à jour un item à l'index donné. */
  const update = (idx: number, patch: Partial<ExperienceItem>) => {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it))
    onChange(next)
  }

  /** Ajoute un item vide. */
  const addItem = () =>
    onChange([
      ...items,
      { title: '', company: '', start: '', end: '', description: '' }
    ])

  /** Supprime l'item ciblé. */
  const removeItem = (idx: number) =>
    onChange(items.filter((_, i) => i !== idx))

  /** Bascule la valeur "Present" sur le champ fin. */
  const togglePresent = (idx: number) => {
    const current = items[idx]?.end || ''
    const nextEnd = isPresentValue(current) ? '' : 'Present'
    update(idx, { end: nextEnd })
  }

  /** Génère la description avec IA (puces) si vide ou pour remplacer. */
  const generateIA = (idx: number) => {
    const it = items[idx]
    const bullets = getExperienceBullets(lang, domain, it?.title)
    update(idx, { description: bullets })
  }

  /** Texte d'aide (localisé) pour les formats de date. */
  const dateHelp = t(
    'dates.formatHint',
    'Format: YYYY-MM (ex: 2024-06). Utilisez "Present" pour un poste en cours.'
  )

  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const present = isPresentValue(it.end)
        const dateOrderInvalid = isDateOrderInvalid(it.start, it.end)
        const endInputErrorId = `exp-${idx}-date-error`
        return (
          <div key={idx} className="rounded border border-[rgba(98,120,85,0.5)] p-3 bg-white">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 flex items-center gap-1 text-sm font-medium">
                  {t('experienceForm.role')}
                  <InfoTooltip text={dateHelp} />
                </span>
                <input
                  className="w-full rounded border border-[rgba(98,120,85,0.5)] px-3 py-2 text-base outline-none focus:border-[rgb(60,77,42)] sm:text-sm"
                  value={it.title}
                  onChange={(e) => update(idx, { title: e.target.value })}
                  placeholder="Ex: Développeur Frontend"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">
                  {t('experienceForm.company')}
                </span>
                <input
                  className="w-full rounded border border-[rgba(98,120,85,0.5)] px-3 py-2 text-base outline-none focus:border-[rgb(60,77,42)] sm:text-sm"
                  value={it.company}
                  onChange={(e) => update(idx, { company: e.target.value })}
                  placeholder="Ex: Mako"
                />
              </label>

              <MonthInput
                label={t('experienceForm.start')}
                value={it.start || ''}
                onChange={(v) => update(idx, { start: v })}
                aria-label={t('experienceForm.start')}
              />

              <div className="grid grid-cols-[1fr_auto] items-end gap-2">
                <MonthInput
                  label={t('experienceForm.end')}
                  value={present ? '' : (it.end || '')}
                  onChange={(v) => update(idx, { end: v })}
                  aria-label={t('experienceForm.end')}
                  disabled={present}
                  errorText={
                    dateOrderInvalid
                      ? t(
                        'experienceForm.dateOrderHint',
                        'La date de fin doit être ≥ à la date de début (format YYYY-MM).'
                      )
                      : undefined
                  }
                  id={endInputErrorId}
                />
                <button
                  type="button"
                  onClick={() => togglePresent(idx)}
                  className={`min-h-[44px] self-end rounded border px-3 text-sm bg-[rgba(230,235,220,0.6)] ${
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
                {t('experienceForm.description')}
              </span>
              <textarea
                rows={4}
                className="w-full rounded border border-[rgba(98,120,85,0.5)] px-3 py-2 text-base outline-none focus:border-[rgb(60,77,42)] sm:text-sm"
                value={it.description}
                onChange={(e) => update(idx, { description: e.target.value })}
                placeholder={`• Réalisation 1
• Réalisation 2
• Réalisation 3`}
              />
            </label>

            <div className="mt-2 flex flex-wrap justify-between gap-2">
              <span className="hidden" aria-hidden="true" />
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="min-h-[44px] rounded border border-[rgba(98,120,85,0.5)] bg-[rgba(230,235,220,0.6)] px-3 py-1.5 text-sm hover:border-[rgb(60,77,42)]"
              >
                {t('experienceForm.remove')}
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
        {t('experienceForm.add')}
      </button>
    </div>
  )
}

export default ExperienceFormList
