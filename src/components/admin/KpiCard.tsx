/**
 * KpiCard.tsx
 * Carte KPI compacte avec titre, valeur et icône.
 * - Utilisée pour afficher Visites, Utilisateurs, Revenu, Conversion.
 */

import type { ReactNode } from 'react'

/** Props de la carte KPI. */
export interface KpiCardProps {
  /** Titre (ex: "Visites"). */
  title: string
  /** Valeur formatée à afficher. */
  value: string
  /** Icône optionnelle. */
  icon?: ReactNode
  /** Complément (ex: "+4%"). */
  sub?: string
}

/** Carte KPI simple et contrastée. */
export default function KpiCard({ title, value, icon, sub }: KpiCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {title}
          </div>
          <div className="mt-1 text-xl font-semibold text-slate-900">{value}</div>
          {sub ? <div className="mt-0.5 text-xs text-slate-600">{sub}</div> : null}
        </div>
        {icon ? <div className="text-slate-500">{icon}</div> : null}
      </div>
    </div>
  )
}
