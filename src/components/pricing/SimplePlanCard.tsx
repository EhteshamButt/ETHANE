/** 
 * SimplePlanCard.tsx
 * Carte de présentation de l'offre "Simple".
 * - Titre : "Simple" (sans clé technique visible)
 * - Description et tarif : réutilise les textes existants (student.desc / student.price) côté i18n.
 * - Style : moderne, épuré, cohérent avec la charte (surface olive translucide, bordures sobres).
 * - Responsive : s'adapte à tous les écrans.
 */

import { useTranslation } from 'react-i18next'

/**
 * SimplePlanCard
 * Affiche l'offre "Simple" dans une carte claire et lisible.
 */
export default function SimplePlanCard() {
  const { t } = useTranslation()

  // Libellés i18n (le nom affiche explicitement "Simple" pour éviter d'exposer une clé technique)
  const title = t('pricing.simple.name', 'STANDARD')
  const description = t('pricing.student.desc')
  const price = t('pricing.student.price')

  return (
    <section
      aria-label={title}
      className="rounded-lg border border-[rgba(98,120,85,0.35)] bg-[rgba(230,235,220,0.65)] p-4 backdrop-blur"
    >
      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          <p className="mt-1 text-sm text-neutral-800">{description}</p>
        </div>
        <div className="sm:text-right">
          <div className="text-xl font-bold text-neutral-900">{price}</div>
          <div className="text-xs text-neutral-600">/ one-time</div>
        </div>
      </div>
    </section>
  )
}
