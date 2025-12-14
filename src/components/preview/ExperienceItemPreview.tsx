/**
 * ExperienceItemPreview.tsx
 * Aperçu d'une expérience avec hiérarchie claire et normalisation stricte des responsabilités.
 * - Hiérarchie: Poste (fort), Entreprise (secondaire), Dates (discrètes), puis 0–4 puces.
 * - Normalisation: nettoyage, dé-duplication, réécriture légère sans ajout/suppression sémantique.
 * - Contrainte: maximum 4 puces; au-delà, fusion des lignes excédentaires dans la 4e puce (préserve le contenu).
 * - Spécifique: si l'item ne contient aucune information utile, ne rend rien (null).
 */

import React, { useMemo } from 'react'
import type { ExperienceItem } from '../../types/resume'

/** Formate une période "start – end" en tenant compte de "Present". */
function formatPeriod(start?: string, end?: string, presentLabel: string = 'Present'): string {
  const s = (start || '').trim()
  const eRaw = (end || '').trim()
  const isPresent = eRaw.toLowerCase() === 'present'
  const e = isPresent ? presentLabel : eRaw

  if (s && e) return `${s} – ${e}`
  if (s && !eRaw) return `${s} – ${presentLabel}`
  if (!s && e) return e
  return ''
}

/**
 * Nettoie un libellé de responsabilité sans en modifier le sens.
 * - Supprime marqueurs initiaux (-,*,•).
 * - Retire préfixes génériques ("Responsable de", "Tâches:", "Missions:", etc.).
 * - Nettoie la ponctuation terminale et espaces.
 * - Capitalise la première lettre si nécessaire.
 */
function normalizeLine(input: string): string {
  let s = (input || '').replace(/\r/g, '').trim()

  // Retire marqueurs de liste simples
  s = s.replace(/^\s*[-*•]\s+/, '')

  // Retire préfixes génériques (sans changer le sens)
  s = s.replace(
    /^(responsable de|responsable du|responsable des|responsibilities:?|responsabilités:?|responsible for|tâches:?|missions:?|activités:?|tasks:?|duties:?|scope:?|role:?)\s*/i,
    ''
  )

  // Nettoie ponctuation terminale excessive
  s = s.replace(/[;,.:\s]+$/g, '').trim()

  // Espace blanc multiple -> simple
  s = s.replace(/\s+/g, ' ').trim()

  // Capitalisation douce: première lettre majuscule si lettre
  if (s && s[0] === s[0].toLowerCase()) {
    s = s[0].toUpperCase() + s.slice(1)
  }

  return s
}

/**
 * Découpe un texte en éléments "responsabilités" en suivant des séparateurs conservateurs.
 * - Priorité aux sauts de ligne.
 * - Si une seule ligne: tentative de split sur '•' ou ';' pour retrouver des puces saisies en ligne.
 */
function splitResponsibilities(raw?: string): string[] {
  if (!raw) return []
  const text = raw.replace(/\r/g, '')

  let parts = text.split('\n').map((l) => l.trim()).filter(Boolean)
  if (parts.length <= 1) {
    const alt = text.split(/•+|;/g).map((l) => l.trim()).filter(Boolean)
    if (alt.length > 1) parts = alt
  }
  return parts
}

/**
 * Transforme la description en maximum 4 puces sans perte d'information.
 * - Dé-duplication exacte après normalisation.
 * - Si > 4, fusionne 4..n dans la 4e puce via " ; " (préserve le contenu).
 */
function toBulletsStrictMax4(raw?: string): string[] {
  const parts = splitResponsibilities(raw).map(normalizeLine).filter(Boolean)

  // Dé-duplication exacte
  const unique: string[] = []
  const seen = new Set<string>()
  for (const p of parts) {
    const key = p.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(p)
    }
  }

  if (unique.length <= 4) return unique

  const first3 = unique.slice(0, 3)
  const mergedRest = unique.slice(3).join(' ; ')
  return [...first3, mergedRest]
}

/** Props du composant ExperienceItemPreview. */
export interface ExperienceItemPreviewProps {
  /** Élément d'expérience à afficher */
  exp: ExperienceItem
  /** Libellé localisé de "Present" (ex: "Présent") */
  presentLabel: string
}

/**
 * ExperienceItemPreview
 * Rendu propre et neutre d'une expérience, avec 0–4 puces normalisées et hiérarchie lisible.
 * - Si l'item est totalement vide (aucun titre/entreprise/dates/description non vide), retourne null.
 */
export default function ExperienceItemPreview({ exp, presentLabel }: ExperienceItemPreviewProps) {
  const bullets = useMemo(() => toBulletsStrictMax4(exp.description), [exp.description])
  const period = useMemo(() => formatPeriod(exp.start, exp.end, presentLabel), [exp.start, exp.end, presentLabel])

  const hasTitle = Boolean((exp.title || '').trim())
  const hasCompany = Boolean((exp.company || '').trim())
  const hasDates = Boolean(period.trim())
  const hasBullets = bullets.length > 0

  // Si rien d'utile à afficher, ne rien rendre
  if (!hasTitle && !hasCompany && !hasDates && !hasBullets) {
    return null
  }

  return (
    <div className="rounded-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        {(hasTitle || hasCompany) ? (
          <h4 className="text-sm font-semibold text-neutral-900">
            {hasTitle ? exp.title : null}
            {hasCompany ? <span className="font-normal text-neutral-700"> {hasTitle ? '— ' : ''}{exp.company}</span> : null}
          </h4>
        ) : <span className="sr-only">Experience</span>}
        {hasDates ? <span className="text-xs text-neutral-600">{period}</span> : null}
      </div>

      {hasBullets ? (
        <ul className="mt-1 list-disc list-outside space-y-1 pl-5 text-sm text-neutral-800">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
