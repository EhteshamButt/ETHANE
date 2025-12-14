/**
 * Carte de tarification cliquable.
 * Utilisée pour sélectionner un plan (student/pro/advanced).
 * - Ajoute un badge coin supérieur droit (icône + étiquette plan) via PlanMark.
 * - Réorganise le header (titre + prix dessous) pour éviter le chevauchement.
 */

import type { ResumePlan } from '../types/resume'
import PlanMark from './PlanMark'

interface Props {
  value: ResumePlan
  label: string
  description: string
  price: string
  selected: boolean
  onSelect: (v: ResumePlan) => void
}

/** Carte de prix avec marque plan en coin */
export function PricingTier({ value, label, description, price, selected, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(value)}
      className={`relative flex w-full flex-col justify-between rounded-lg border p-4 text-left transition ${
        selected ? 'border-black ring-2 ring-black' : 'border-neutral-300 hover:border-black'
      }`}
      aria-pressed={selected}
    >
      {/* Badge coin supérieur droit (icône + étiquette) */}
      <PlanMark plan={value} label={label} />

      <div>
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold">{label}</h3>
        </div>
        {/* Prix positionné sous le titre pour libérer le coin supérieur */}
        <div className="mt-1 text-lg font-bold">{price}</div>
        <p className="mt-2 text-sm text-neutral-600">{description}</p>
      </div>

      <div className="mt-4">
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
            selected ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-900'
          }`}
        >
          {selected ? 'Sélectionné' : 'Choisir'}
        </span>
      </div>
    </button>
  )
}

export default PricingTier
