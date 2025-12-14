/**
 * Formulaire principal de saisie du CV.
 * Version incluant « Résumé professionnel » et « Compétences ».
 * - Conserve: Langue, Domaine, Modèle (avec/sans photo), Informations de contact,
 *   Expérience, Éducation, Certifications.
 * - Ajoute: Career Highlights (points forts de carrière) en liste dynamique.
 * - Mobile: tailles de police 16px sur mobile pour éviter le zoom iOS, meilleurs touch targets.
 * - Thème: olive (boutons primaires olive, survols border olive).
 *
 * Amélioration: styles de champs unifiés via .u-input / .u-textarea (hover/focus visibles).
 */

import type { ResumeData, ResumeDomain } from '../../types/resume'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { ExperienceFormList } from './ExperienceFormList'
import EducationFormList from './EducationFormList'
import CertificationFormList from './CertificationFormList'
import HighlightsFormList from './HighlightsFormList'
import PrimaryButton from '../controls/PrimaryButton'
import PrimarySelect from '../controls/PrimarySelect'
import { COUNTRIES_FR } from '../../data/countries.fr'
import PhotoUploader from '../controls/PhotoUploader'

/** Props du composant ResumeForm */
interface Props {
  /** Valeur complète du CV */
  value: ResumeData
  /** Modèle avec photo ? */
  withPhoto: boolean
  /** Emet la valeur mise à jour */
  onChange: (next: ResumeData) => void
  /** Bascule le template (photo/sans photo) */
  onTogglePhoto: (val: boolean) => void
  /** Action pour passer à l'étape suivante */
  onNext: () => void
}

/**
 * Champ input standard.
 * - Utilise .u-input (hover/focus unifiés).
 */
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-neutral-800">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="u-input w-full"
      />
    </label>
  )
}

/**
 * TextAreaField
 * Zone de texte multilignes pour le résumé.
 * - Utilise .u-textarea (hover/focus unifiés).
 */
function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-neutral-800">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="u-textarea w-full"
      />
    </label>
  )
}

/**
 * Formulaire CV avec « Résumé » et « Compétences ».
 * - Le résumé et les compétences affichés dans l'aperçu sont strictement ceux saisis ici.
 * - Aucune complétion/IA n'intervient sur ces deux champs.
 */
export function ResumeForm({ value, onChange, withPhoto, onTogglePhoto, onNext }: Props) {
  const { t } = useTranslation()

  /** Options de domaine localisées */
  const domainOptions = useMemo(
    () =>
      ([
        'general',
        'it',
        'marketing',
        'finance',
        'healthcare',
        'engineering',
        'sales',
        'research',
      ] as ResumeDomain[]).map((d) => ({ value: d, label: t(`form.domains.${d}`) })),
    [t]
  )

  const experiences = value.experiences ?? []
  const education = value.education ?? []
  const certifications = value.certifications ?? []
  const highlights = value.highlights ?? []

  return (
    <div className="space-y-4">
      {/* Langue + Template (photo / sans) + Domaine */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Langue */}
        <label className="block">
          <span className="mb-1 block text-sm font-medium">{t('form.language')}</span>
          <PrimarySelect
            value={value.language}
            onChange={(val) => onChange({ ...value, language: val as any })}
            aria-label={t('form.language')}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="sw">Swahili</option>
            <option value="pt">Português</option>
            <option value="mg">Malagasy</option>
          </PrimarySelect>
        </label>

        {/* Domaine */}
        <label className="block">
          <span className="mb-1 block text-sm font-medium">{t('form.domain')}</span>
          <PrimarySelect
            value={value.domain}
            onChange={(val) => onChange({ ...value, domain: val as any })}
            aria-label={t('form.domain')}
          >
            {domainOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </PrimarySelect>
        </label>

        {/* Modèle photo / sans photo */}
        <label className="block">
          <span className="mb-1 block text-sm font-medium">
            {withPhoto ? t('form.templatePhoto') : t('form.templateNoPhoto')}
          </span>
          <PrimaryButton
            type="button"
            onClick={() => onTogglePhoto(!withPhoto)}
            className="w-full"
            size="sm"
            aria-label={withPhoto ? t('form.templatePhoto') : t('form.templateNoPhoto')}
          >
            {withPhoto
              ? t('form.toggle.toWithoutPhoto', '→ Without photo')
              : t('form.toggle.toWithPhoto', '→ With photo')}
          </PrimaryButton>
        </label>
      </div>

      {/* Informations de base — vertical alignment, equal widths */}
      <div className="grid grid-cols-1 gap-3">
        <Field
          label={t('form.fullName')}
          value={value.fullName}
          onChange={(v) => onChange({ ...value, fullName: v })}
          placeholder={t('form.placeholders.fullName', 'e.g., Aïcha K.')}
        />
        <Field
          label={t('form.headline')}
          value={value.headline}
          onChange={(v) => onChange({ ...value, headline: v })}
          placeholder={t('form.placeholders.headline', 'e.g., Frontend Developer')}
        />
        {/* Pays placé avant l'e-mail pour refléter la priorité demandée */}
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-neutral-800">{t('form.country', 'Country')}</span>
          <select
            className="u-select w-full"
            value={value.country ?? ''}
            onChange={(e) => onChange({ ...value, country: e.target.value })}
            aria-label={t('form.country', 'Country')}
          >
            <option value="">{t('form.selectCountry', 'Select a country')}</option>
            {COUNTRIES_FR.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <Field
          label={t('form.email')}
          value={value.email}
          onChange={(v) => onChange({ ...value, email: v })}
          type="email"
          placeholder={t('form.placeholders.email', 'you@example.com')}
        />
        <Field
          label={t('form.phone')}
          value={value.phone}
          onChange={(v) => onChange({ ...value, phone: v })}
          placeholder={t('form.placeholders.phone', '+243 99 999 9999')}
        />
        {/* Adresse */}
        <Field
          label={t('form.location')}
          value={value.location}
          onChange={(v) => onChange({ ...value, location: v })}
          placeholder={t('form.placeholders.location', 'Kinshasa, DRC')}
        />
        {withPhoto ? (
          <PhotoUploader
            label={t('form.photoUrl')}
            value={value.photoUrl || ''}
            onChange={(next) => onChange({ ...value, photoUrl: next || '' })}
          />
        ) : null}
      </div>

      {/* Résumé + Compétences */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <TextAreaField
            label={t('form.summary', 'Résumé professionnel')}
            value={value.summary}
            onChange={(v) => onChange({ ...value, summary: v })}
            placeholder={t('form.placeholders.summary')}
            rows={4}
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            label={t('form.skills', 'Compétences (séparées par des virgules)')}
            value={value.skills}
            onChange={(v) => onChange({ ...value, skills: v })}
            placeholder={t('form.placeholders.skills', 'e.g., React, TypeScript, UI Design')}
          />
          <p className="mt-1 text-xs text-neutral-700">{t('form.skillsHint')}</p>
        </div>
      </div>

      {/* Expérience professionnelle */}
      <div className="pt-1">
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide">
          {t('form.experience')}
        </h4>
        <ExperienceFormList
          items={experiences}
          onChange={(items) => onChange({ ...value, experiences: items })}
          lang={value.language}
          domain={value.domain}
        />
      </div>

      {/* Éducation / Études */}
      <div className="pt-1">
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide">
          {t('form.education')}
        </h4>
        <EducationFormList
          items={education}
          onChange={(items) => onChange({ ...value, education: items })}
        />
      </div>

      {/* Certifications */}
      <div className="pt-1">
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide">
          {t('form.certifications')}
        </h4>
        <CertificationFormList
          items={certifications}
          onChange={(items) => onChange({ ...value, certifications: items })}
        />
      </div>

      {/* Career Highlights */}
      <div className="pt-1">
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide">
          {t('highlightsForm.label', 'Career Highlights')}
        </h4>
        <HighlightsFormList
          items={highlights}
          onChange={(items) => onChange({ ...value, highlights: items })}
        />
      </div>

      <div className="pt-2">
        <PrimaryButton type="button" onClick={onNext}>
          {t('form.continue')}
        </PrimaryButton>
      </div>
    </div>
  )
}
