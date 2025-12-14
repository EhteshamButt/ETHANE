/**
 * PlanComparison.tsx
 * Section de comparaison des forfaits (SIMPLE / PROFESSIONNEL / AVANCÉ).
 * - Affiche trois cartes alignées (responsive) avec les éléments inclus et le prix.
 * - Utilise les clés i18n existantes pour titres/prix/labels de sections lorsque possible.
 * - Style cohérent avec la charte visuelle (fond olive clair translucide, bordures sobres).
 */

import React from 'react'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/** Élément de fonctionnalité avec icône de validation. */
function FeatureItem({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-white">
        <Check className="h-3 w-3" aria-hidden />
      </span>
      <span className="text-sm text-neutral-900">{label}</span>
    </li>
  )
}

/** Carte de plan (titre, prix, liste des fonctionnalités). */
function PlanCard({
  title,
  price,
  features,
  accentClass,
  oneTimeLabel,
}: {
  title: string
  price: string
  features: string[]
  accentClass?: string
  /** Localized suffix, e.g., "/ one-time" */
  oneTimeLabel: string
}) {
  return (
    <div
      className={[
        'relative rounded-lg border p-4 backdrop-blur',
        'bg-[rgba(230,235,220,0.65)] border-[rgba(98,120,85,0.35)]',
        accentClass,
      ].join(' ')}
    >
      <div className="mb-2 flex items-baseline justify-between">
        <h4 className="text-base font-semibold tracking-wide text-neutral-900">
          {title}
        </h4>
        <div className="text-right">
          <div className="text-lg font-bold text-neutral-900">{price}</div>
          <div className="text-xs text-neutral-600">{oneTimeLabel}</div>
        </div>
      </div>
      <ul className="mt-3 space-y-2">
        {features.map((f, i) => (
          <FeatureItem key={i} label={f} />
        ))}
      </ul>
    </div>
  )
}

/**
 * PlanComparison
 * Section présentant les 3 forfaits avec leurs éléments inclus.
 */
export default function PlanComparison() {
  const { t } = useTranslation()
  const oneTime = t('pricing.oneTime')

  // Titres des plans (SIMPLE utilise un fallback explicite)
  const titleSimple = (t('pricing.simple.name', 'Simple')).toUpperCase()
  const titlePro = (t('pricing.pro.name', 'Professionnel')).toUpperCase()
  const titleAdvanced = (t('pricing.advanced.name', 'Avancé')).toUpperCase()

  // Prix depuis i18n (garde le format $1/$2/$3)
  const priceSimple = t('pricing.student.price', '$1')
  const pricePro = t('pricing.pro.price', '$2')
  const priceAdvanced = t('pricing.advanced.price', '$3')

  // Libellés des sections (i18n existants)
  const resumeLabel = t('preview.summary', 'Résumé')
  const skillsLabel = t('preview.skills', 'Compétences')
  const experienceLabel = t('preview.experience', 'Expérience')
  const educationLabel = t('preview.education', 'Éducation')
  const highlightsLabel = t('highlightsForm.label', 'Career Highlights')

  // Données des plans
  const simpleFeatures = [resumeLabel, experienceLabel, educationLabel]
  const proFeatures = [resumeLabel, skillsLabel, experienceLabel, educationLabel]
  const advancedFeatures = [resumeLabel, highlightsLabel, skillsLabel, experienceLabel, educationLabel]

  return (
    <section
      id="models"
      aria-labelledby="plans-compare-title"
      className="scroll-mt-24 md:scroll-mt-28 rounded-lg border border-[rgba(98,120,85,0.35)] bg-[rgba(230,235,220,0.65)] p-4 backdrop-blur"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 id="plans-compare-title" className="text-lg font-semibold text-neutral-900">
          {t('plans.legendTitle', 'Ce que propose chaque plan')}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <PlanCard
          title={titleSimple}
          price={priceSimple}
          features={simpleFeatures}
          accentClass="ring-0"
          oneTimeLabel={oneTime}
        />
        <PlanCard
          title={titlePro}
          price={pricePro}
          features={proFeatures}
          accentClass="ring-0"
          oneTimeLabel={oneTime}
        />
        <PlanCard
          title={titleAdvanced}
          price={priceAdvanced}
          features={advancedFeatures}
          accentClass="ring-0"
          oneTimeLabel={oneTime}
        />
      </div>
    </section>
  )
}
