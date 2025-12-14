/**
 * PlanMark.tsx
 * Petit badge combinant icône + étiquette du plan, positionné en coin.
 * - Couleurs cohérentes avec la charte (sky pour student, charcoal pour pro, emerald pour advanced).
 * - Icônes lucide-react distinctives pour identification rapide.
 */

import React from 'react'
import type { ResumePlan } from '../types/resume'
import { Star, Check, BadgeCheck } from 'lucide-react'

/** Props pour PlanMark */
export interface PlanMarkProps {
  /** Plan actif (student | pro | advanced) */
  plan: ResumePlan
  /** Libellé à afficher (déjà localisé par l'appelant si besoin) */
  label: string
  /** Position du badge (par défaut top-right) */
  position?: 'top-right' | 'top-left'
  /** Classes supplémentaires optionnelles */
  className?: string
}

/**
 * Renvoie classes de couleur (fond/texte/anneau) selon le plan.
 */
function colorClasses(plan: ResumePlan) {
  switch (plan) {
    case 'student':
      return 'bg-sky-600 text-white ring-sky-600/20'
    case 'pro':
      return 'bg-neutral-900 text-white ring-neutral-900/20'
    case 'advanced':
      return 'bg-emerald-600 text-white ring-emerald-600/20'
  }
}

/**
 * Renvoie l'icône associée au plan.
 */
function iconFor(plan: ResumePlan) {
  if (plan === 'advanced') return <Star className="h-3.5 w-3.5" aria-hidden />
  if (plan === 'pro') return <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
  return <Check className="h-3.5 w-3.5" aria-hidden /> // student
}

/**
 * PlanMark
 * Rend un badge compact (icône + libellé) positionné dans le coin de la carte.
 */
export default function PlanMark({
  plan,
  label,
  position = 'top-right',
  className,
}: PlanMarkProps) {
  const colors = colorClasses(plan)
  const pos =
    position === 'top-right' ? 'absolute right-2 top-2' : 'absolute left-2 top-2'

  return (
    <span
      className={[
        'pointer-events-none select-none',
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5',
        'text-[10px] font-semibold tracking-wide shadow-sm ring-1',
        colors,
        pos,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {iconFor(plan)}
      <span className="leading-none">{label}</span>
    </span>
  )
}
