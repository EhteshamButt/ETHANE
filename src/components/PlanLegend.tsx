/** 
 * PlanLegend.tsx
 * Légende "Ce que permet chaque plan" avec comparaison des fonctionnalités Student/Pro/Advanced.
 * - Affiche une table responsive.
 * - Chaque ligne possède une icône d'info avec infobulle explicative (accessible).
 * - Palette neutre, intégration discrète.
 */

import { useTranslation } from 'react-i18next'
import { Check, Minus } from 'lucide-react'
import { InfoTooltip } from './InfoTooltip'

/** Cellule avec icône (check/moins) ou texte succinct. */
function CellValue({
  type,
  text,
}: {
  /** Type d'affichage: check, minus, text */
  type: 'check' | 'minus' | 'text'
  /** Texte à afficher pour type "text" */
  text?: string
}) {
  // Localize SR text to avoid FR-only values
  const { t } = useTranslation()
  if (type === 'check') {
    return (
      <div className="flex items-center justify-center">
        <Check className="h-4 w-4 text-neutral-900" aria-hidden />
        <span className="sr-only">{t('common.yes', 'Yes')}</span>
      </div>
    )
  }
  if (type === 'minus') {
    return (
      <div className="flex items-center justify-center">
        <Minus className="h-4 w-4 text-neutral-400" aria-hidden />
        <span className="sr-only">{t('common.no', 'No')}</span>
      </div>
    )
  }
  return <span className="text-xs md:text-sm text-neutral-800">{text}</span>
}

/** 
 * PlanLegend
 * Tableau comparatif compact et élégant des capacités par plan.
 */
export default function PlanLegend({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation()

  // Légendes (fallback FR si non traduites)
  const title = t('plans.legendTitle', 'Ce que propose chaque plan')

  const rows: Array<{
    key: string
    label: string
    info: string
    student: { type: 'check' | 'minus' | 'text'; text?: string }
    pro: { type: 'check' | 'minus' | 'text'; text?: string }
    advanced: { type: 'check' | 'minus' | 'text'; text?: string }
  }> = [
    {
      key: 'sections',
      label: t('plans.sectionsLabel', 'Sections affichées'),
      info: t(
        'plans.sectionsInfo',
        "Détermine quelles rubriques sont visibles dans l'aperçu et le PDF selon le plan."
      ),
      student: { type: 'text', text: t('plans.sectionsStudent', '1 Exp + 1 Édu') },
      pro: { type: 'text', text: t('plans.sectionsPro', 'Sections principales') },
      advanced: { type: 'text', text: t('plans.sectionsAdvanced', 'Toutes + Réalisations') },
    },
    {
      key: 'achievements',
      label: t('plans.achievementsLabel', 'Réalisations'),
      info: t(
        'plans.achievementsInfo',
        'Accomplissements notables avec impact chiffré (ex: +20% de conversions).'
      ),
      student: { type: 'minus' },
      pro: { type: 'minus' },
      advanced: { type: 'check' },
    },
    {
      key: 'certifications',
      label: t('plans.certificationsLabel', 'Certifications'),
      info: t(
        'plans.certificationsInfo',
        'Ajoutez vos certifications avec ID et URL de vérification.'
      ),
      student: { type: 'minus' },
      pro: { type: 'check' },
      advanced: { type: 'check' },
    },
    {
      key: 'advancedStyle',
      label: t('plans.styleLabel', 'Style avancé'),
      info: t(
        'plans.styleInfo',
        'Accent visuel discret (barre latérale/finesse typographique) pour une mise en valeur.'
      ),
      student: { type: 'minus' },
      pro: { type: 'minus' },
      advanced: { type: 'check' },
    },
    {
      key: 'pdf',
      label: t('plans.pdfLabel', 'Export PDF'),
      info: t(
        'plans.pdfInfo',
        'Disponible après paiement réussi et si les dates sont valides.'
      ),
      student: { type: 'check' },
      pro: { type: 'check' },
      advanced: { type: 'check' },
    },
  ]

  return (
    <div
      className={`rounded-lg border border-neutral-200 bg-white ${compact ? 'p-2' : 'p-3 md:p-4'}`}
      aria-label={title}
    >
      <div className="mb-2 flex items-center gap-2">
        <h4 className={`font-semibold text-neutral-900 ${compact ? 'text-sm' : 'text-base'}`}>{title}</h4>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-left text-xs text-neutral-600">
              <th className="py-2 pr-2 font-medium">{t('plans.feature', 'Fonctionnalité')}</th>
              <th className="py-2 px-2 text-center font-medium">{t('pricing.simple.name', 'Simple')}</th>
              <th className="py-2 px-2 text-center font-medium">{t('pricing.pro.name', 'Pro')}</th>
              <th className="py-2 pl-2 text-center font-medium">{t('pricing.advanced.name', 'Advanced')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-t border-neutral-200">
                <td className="py-2 pr-2 align-top">
                  <div className="flex items-start gap-2">
                    <span className={`text-neutral-900 ${compact ? 'text-xs' : 'text-sm'}`}>{r.label}</span>
                    <InfoTooltip text={r.info} side="top" />
                  </div>
                </td>
                <td className="py-2 px-2 align-top">
                  <div className="flex justify-center">
                    <CellValue type={r.student.type} text={r.student.text} />
                  </div>
                </td>
                <td className="py-2 px-2 align-top">
                  <div className="flex justify-center">
                    <CellValue type={r.pro.type} text={r.pro.text} />
                  </div>
                </td>
                <td className="py-2 pl-2 align-top">
                  <div className="flex justify-center">
                    <CellValue type={r.advanced.type} text={r.advanced.text} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
