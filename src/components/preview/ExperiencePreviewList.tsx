/**
 * ExperiencePreviewList.tsx
 * Liste réutilisable d'expériences pour l'aperçu CV.
 * - Filtre les expériences vides (aucun titre/entreprise/dates/description).
 * - Rend null si aucune expérience pertinente (la section supérieure peut rester vide).
 */

import React, { useMemo } from 'react'
import type { ExperienceItem } from '../../types/resume'
import ExperienceItemPreview from './ExperienceItemPreview'

/** Détermine si la description contient un contenu significatif après nettoyage basique. */
function hasMeaningfulDescription(desc?: string): boolean {
  const text = (desc || '').replace(/\r/g, '')
  if (!text.trim()) return false
  const parts = text
    .split(/\n|•+|;/g)
    .map((l) => l.replace(/^\s*[-*•]\s+/, '').trim())
    .filter(Boolean)
  return parts.length > 0
}

/** Détermine si une expérience contient une information utile (titre, entreprise, dates, ou description non vide). */
function isMeaningfulExp(exp: ExperienceItem): boolean {
  const hasTitle = Boolean((exp.title || '').trim())
  const hasCompany = Boolean((exp.company || '').trim())
  const hasStart = Boolean((exp.start || '').trim())
  const hasEnd = Boolean((exp.end || '').trim())
  const hasDesc = hasMeaningfulDescription(exp.description)
  return hasTitle || hasCompany || hasStart || hasEnd || hasDesc
}

/** Props pour ExperiencePreviewList */
export interface ExperiencePreviewListProps {
  /** Liste des expériences à afficher */
  items: ExperienceItem[]
  /** Libellé localisé pour "Present" (ex: "Présent") */
  presentLabel: string
  /** Classe supplémentaire optionnelle */
  className?: string
}

/**
 * ExperiencePreviewList
 * Rend une liste d'expériences, en excluant les entrées vides. Rend null si rien à afficher.
 */
export default function ExperiencePreviewList({
  items,
  presentLabel,
  className,
}: ExperiencePreviewListProps) {
  const filtered = useMemo(() => items.filter(isMeaningfulExp), [items])

  if (filtered.length === 0) return null

  return (
    <div className={['space-y-5', className].filter(Boolean).join(' ')}>
      {filtered.map((exp, idx) => (
        <ExperienceItemPreview key={idx} exp={exp} presentLabel={presentLabel} />
      ))}
    </div>
  )
}
