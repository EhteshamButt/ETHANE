/**
 * Indicateur d'étapes (affiche 2 ou 3 étapes selon les libellés disponibles).
 * - Masque toute étape dont le libellé est vide.
 * - Met en évidence l'étape active; si l'étape active est masquée, on met en avant l'étape visible précédente.
 */

import { useTranslation } from 'react-i18next'

interface Props {
  /** Étape courante (1, 2 ou 3 dans le flux interne) */
  step: 1 | 2 | 3
}

/**
 * Calcule la classe de colonnes en fonction du nombre d'étapes visibles.
 */
function gridColsClass(n: number): string {
  return n === 2 ? 'grid-cols-2' : 'grid-cols-3'
}

/**
 * Affiche le chemin des étapes du flux, en filtrant les libellés vides.
 */
export function StepIndicator({ step }: Props) {
  const { t } = useTranslation()
  const raw = [
    { idx: 1 as 1 | 2 | 3, label: t('steps.one') },
    { idx: 2 as 1 | 2 | 3, label: t('steps.two') },
    { idx: 3 as 1 | 2 | 3, label: t('steps.three') },
  ]

  const visible = raw.filter((s) => !!s.label && String(s.label).trim().length > 0)
  const activeIdx =
    visible.find((s) => s.idx === step)?.idx ??
    // Si l'étape active est masquée, fallback vers l'étape visible précédente
    [...visible]
      .reverse()
      .find((s) => s.idx < step)?.idx ??
    visible[0]?.idx

  return (
    <ol className={`mx-auto grid max-w-6xl ${gridColsClass(visible.length)} gap-4 px-4`}>
      {visible.map((s) => {
        const active = s.idx === activeIdx
        return (
          <li
            key={`${s.idx}-${s.label}`}
            className={`rounded border px-3 py-2 text-center text-sm ${
              active ? 'border-black bg-black text-white' : 'border-neutral-300 bg-white'
            }`}
          >
            {s.label}
          </li>
        )
      })}
    </ol>
  )
}

export default StepIndicator
