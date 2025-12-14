/**
 * AchievementsFormList.tsx
 * Liste de formulaires pour saisir des réalisations (intitulé + description).
 * - Simple API proche des autres listes (Expérience/Éducation).
 */

import { useTranslation } from 'react-i18next'

export interface AchievementItem {
  title?: string
  description?: string
}

interface Props {
  /** Liste des réalisations. */
  items: AchievementItem[]
  /** Émet la liste mise à jour. */
  onChange: (items: AchievementItem[]) => void
}

/**
 * AchievementsFormList
 * Rendu minimaliste: champs texte et textarea, ajout/suppression d'items.
 */
export function AchievementsFormList({ items, onChange }: Props) {
  const { t } = useTranslation()

  /** Ajoute une réalisation vide. */
  const add = () => onChange([...(items || []), { title: '', description: '' }])

  /** Supprime un item par index. */
  const remove = (idx: number) => onChange((items || []).filter((_, i) => i !== idx))

  /** Met à jour un champ d'un item. */
  const update = (idx: number, patch: Partial<AchievementItem>) => {
    const next = (items || []).slice()
    next[idx] = { ...next[idx], ...patch }
    onChange(next)
  }

  return (
    <div className="space-y-3">
      {(items || []).map((it, idx) => (
        <div key={idx} className="rounded border border-[rgba(98,120,85,0.35)] bg-white p-3">
          <div className="grid grid-cols-1 gap-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium">{t('achievementForm.title')}</span>
              <input
                type="text"
                value={it.title || ''}
                onChange={(e) => update(idx, { title: e.target.value })}
                className="w-full rounded border border-[rgba(98,120,85,0.5)] bg-white px-3 py-2 text-base outline-none focus:border-[rgb(60,77,42)] sm:text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium">{t('achievementForm.description')}</span>
              <textarea
                value={it.description || ''}
                onChange={(e) => update(idx, { description: e.target.value })}
                rows={3}
                className="w-full resize-y rounded border border-[rgba(98,120,85,0.5)] bg-white px-3 py-2 text-base outline-none focus:border-[rgb(60,77,42)] sm:text-sm"
              />
            </label>
          </div>

          <div className="mt-2 text-right">
            <button
              type="button"
              onClick={() => remove(idx)}
              className="rounded border border-[rgba(98,120,85,0.5)] bg-[rgba(230,235,220,0.6)] px-3 py-1.5 text-xs hover:border-[rgb(60,77,42)]"
            >
              {t('achievementForm.remove')}
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="rounded border border-[rgba(98,120,85,0.5)] bg-[rgba(230,235,220,0.6)] px-3 py-2 text-sm hover:border-[rgb(60,77,42)]"
      >
        {t('achievementForm.add')}
      </button>
    </div>
  )
}

export default AchievementsFormList
