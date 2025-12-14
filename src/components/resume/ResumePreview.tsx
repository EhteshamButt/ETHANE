/** 
 * ResumePreview.tsx
 * Aperçu imprimable du CV (incluant Études, Certifications, Réalisations).
 * - Rend une "feuille" A4-like avec id "resume-sheet" (impression/PDF).
 * - Affiche uniquement des sections/éléments réellement renseignés (meaningful).
 * - Garde-fou: si aucune donnée pertinente n'existe, rend un panneau d'aide discret.
 * - Ajoute une section "Autres réussites" juste sous "Expérience", même style et mise en page.
 */

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type {
  ResumeData,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  ResumePlan,
} from '../../types/resume'
import PlanBadge from '../PlanBadge'
import ExperiencePreviewList from '../preview/ExperiencePreviewList'
import { enhanceResumeForPreview } from '../../lib/enhance'

/** Retourne des classes utilitaires pour la variante visuelle. */
function variantClasses(variant: 'default' | 'advancedAccent') {
  if (variant === 'advancedAccent') {
    return 'before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-neutral-900/80'
  }
  return ''
}

/** Trim helper (non vide). */
function nonEmpty(v?: string) {
  return Boolean((v || '').trim())
}

/** Période formatée "start – end" avec prise en charge de "Present". */
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

/** Convertit un bloc texte en puces basiques. */
function toBullets(text?: string): string[] {
  if (!text) return []
  return text
    .split('\n')
    .map((l) => l.trim().replace(/^[-*•]\s?/, ''))
    .filter(Boolean)
}

/** Transforme une chaîne de compétences en liste unique. */
function parseSkills(skills?: string): string[] {
  if (!skills) return []
  return Array.from(new Set(skills.split(',').map((s) => s.trim()).filter(Boolean)))
}

/** Détection d'une description exploitable. */
function hasMeaningfulDescription(desc?: string): boolean {
  const text = (desc || '').replace(/\r/g, '')
  if (!text.trim()) return false
  const parts = text
    .split(/\n|•+|;/g)
    .map((l) => l.replace(/^\s*[-*•]\s+/, '').trim())
    .filter(Boolean)
  return parts.length > 0
}

/** Une expérience est significative s'il y a au moins un champ utile. */
function isMeaningfulExp(exp: ExperienceItem): boolean {
  return (
    nonEmpty(exp.title) ||
    nonEmpty(exp.company) ||
    nonEmpty(exp.start) ||
    nonEmpty(exp.end) ||
    hasMeaningfulDescription(exp.description)
  )
}

/** Une éducation est significative s'il y a au moins un champ utile. */
function isMeaningfulEducation(ed: EducationItem): boolean {
  return (
    nonEmpty(ed.degree) ||
    nonEmpty(ed.school) ||
    nonEmpty(ed.start) ||
    nonEmpty(ed.end) ||
    hasMeaningfulDescription(ed.description)
  )
}

/** Une certification est significative s'il y a au moins un champ utile. */
function isMeaningfulCertification(c: CertificationItem): boolean {
  return (
    nonEmpty(c.name) ||
    nonEmpty(c.issuer) ||
    nonEmpty(c.date) ||
    nonEmpty(c.credentialId) ||
    nonEmpty(c.credentialUrl)
  )
}

/** Une réalisation (achievement) est significative si elle contient un titre/une description. */
function isMeaningfulAchievement(a?: { title?: string; description?: string }): boolean {
  if (!a) return false
  return nonEmpty(a.title) || nonEmpty(a.description)
}

/** Panneau d'aide pour l'aperçu vide. */
function EmptyPreviewHint({ message }: { message: string }) {
  return (
    <div
      className="flex min-h-[280px] items-center justify-center rounded-md border-2 border-dashed border-neutral-200 bg-neutral-50 text-center"
      aria-live="polite"
    >
      <div className="px-6 py-10">
        <div className="text-sm font-medium text-neutral-700">{message}</div>
        <div className="mt-1 text-xs text-neutral-500">Aucune donnée pour l’instant</div>
      </div>
    </div>
  )
}

/**
 * ResumePreview
 * Composant d'aperçu du CV prêt pour l'impression.
 * - Le "Résumé" n'est affiché que s'il existe au moins une expérience significative.
 * - Aucune section n'est rendue si elle est vide.
 * - Ajoute la section "Autres réussites" sous "Expérience", même présentation.
 */
export function ResumePreview({
  data,
  withPhoto,
  variant = 'default',
  plan,
}: { data: ResumeData; withPhoto: boolean; variant?: 'default' | 'advancedAccent'; plan?: ResumePlan }) {
  const { t } = useTranslation()

  // Build enhanced data for presentation (bullets normalized to 4, summary/skills improved)
  const enhanced = useMemo(() => enhanceResumeForPreview(data), [data])

  const skills = useMemo(() => parseSkills(enhanced.skills), [enhanced.skills])

  const experiences = (enhanced.experiences || []) as ExperienceItem[]
  const education = (enhanced.education || []) as EducationItem[]
  const certifications = (enhanced.certifications || []) as CertificationItem[]
  const achievements = (enhanced.achievements || []) as { title?: string; description?: string }[]

  // Listes filtrées par "meaningful"
  const meaningfulExperiences = useMemo(() => experiences.filter(isMeaningfulExp), [experiences])
  const meaningfulEducation = useMemo(() => education.filter(isMeaningfulEducation), [education])
  const meaningfulCertifications = useMemo(
    () => certifications.filter(isMeaningfulCertification),
    [certifications]
  )
  const meaningfulAchievements = useMemo(
    () => achievements.filter(isMeaningfulAchievement),
    [achievements]
  )

  // Achievements projetées au format ExperienceItem pour réutiliser le même rendu
  const achievementsAsExperience = useMemo<ExperienceItem[]>(
    () =>
      meaningfulAchievements.map((a) => ({
        /** Intitulé = titre de la réussite */
        title: a.title || '',
        /** Description = détails de la réussite */
        description: a.description || '',
        /** Les champs non pertinents restent vides pour garder un rendu épuré */
        company: '',
        start: '',
        end: '',
      })),
    [meaningfulAchievements]
  )

  // Affichage du header uniquement si quelque chose est saisi (pas de "—").
  const hasHeaderIdentity = nonEmpty(data.fullName) || nonEmpty(data.headline)
  const hasHeaderContacts =
    nonEmpty(data.email) || nonEmpty(data.phone) || nonEmpty(data.location) || nonEmpty(data.linkedin)

  // Ne pas utiliser d'image par défaut: afficher une photo uniquement si l'URL est fournie et avecPhoto activé.
  const showPhoto = Boolean(withPhoto && nonEmpty(enhanced.photoUrl))
  const presentLabel = t('preview.present', 'Present')
  const idLabel = t('preview.idLabel', 'ID')
  const photoAlt = t('preview.photoAlt', 'Profile photo')

  // Strict guard from RAW user inputs (no enhanced content)
  const skillsRaw = parseSkills(data.skills)
  const hasSummaryRaw = nonEmpty(data.summary)
  const hasExperiencesRaw = (data.experiences || []).some(isMeaningfulExp)
  const hasEducationRaw = (data.education || []).some(isMeaningfulEducation)
  const hasCertificationsRaw = (data.certifications || []).some(isMeaningfulCertification)
  const hasAchievementsRaw = (data.achievements || []).some(isMeaningfulAchievement)

  const show =
    hasHeaderIdentity ||
    hasHeaderContacts ||
    hasSummaryRaw ||
    skillsRaw.length > 0 ||
    hasExperiencesRaw ||
    hasEducationRaw ||
    hasCertificationsRaw ||
    hasAchievementsRaw

  if (!show) return null

  // Règle globale: l'aperçu n'est généré que si au moins une information clé est présente.
  // The panel-hint is disabled: we only render when `show` is true (see early return)
  const hasAnyMeaningfulData = true

  return (
    <div className="mx-auto w-full max-w-[900px]">
      <div
        id="resume-sheet"
        className={`relative mx-auto rounded-md border border-neutral-200 bg-white p-6 shadow-sm md:p-8 ${variantClasses(variant)}`}
      >
        {/* État vide: panneau d'aide discret */}
        {!hasAnyMeaningfulData ? (
          <EmptyPreviewHint
            message={t('preview.emptyHint', 'Remplir le formulaire pour générer l’aperçu')}
          />
        ) : (
          <>
            {/* Badge du plan (optionnel) */}
            {plan ? (
              <PlanBadge
                plan={plan}
                label={
                  plan === 'student'
                    ? t('pricing.simple.name', 'Simple')
                    : plan === 'pro'
                      ? t('pricing.pro.name')
                      : t('pricing.advanced.name')
                }
              />
            ) : null}

            {/* Header (uniquement si identité/contact/photo présents) */}
            {(hasHeaderIdentity || hasHeaderContacts || showPhoto) ? (
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
                <div>
                  {nonEmpty(data.fullName) ? (
                    <h2 className="text-2xl font-bold text-neutral-900">{data.fullName}</h2>
                  ) : null}
                  {nonEmpty(data.headline) ? (
                    <p className="mt-1 text-sm font-medium text-neutral-700">{data.headline}</p>
                  ) : null}
                  {hasHeaderContacts ? (
                    <p className="mt-2 text-xs text-neutral-600">
                      {[data.email, data.phone, data.location, data.linkedin]
                        .map((x) => (x || '').trim())
                        .filter(Boolean)
                        .join(' • ')}
                    </p>
                  ) : null}
                </div>

                {showPhoto ? (
                  <div className="justify-self-end">
                    <div className="h-24 w-24 overflow-hidden rounded-md border border-neutral-200">
                      {/* Photo fournie par l'utilisateur uniquement */}
                      <img src={data.photoUrl!} className="h-full w-full object-cover" alt={photoAlt} />
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Summary: uniquement si présent */}
            {nonEmpty(enhanced.summary) ? (
              <Section title={t('preview.summary')}>
                <p className="text-sm leading-relaxed text-neutral-800">{data.summary}</p>
              </Section>
            ) : null}

            {/* Skills */}
            {skills.length > 0 ? (
              <Section title={t('preview.skills')}>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span
                      key={`${s}-${i}`}
                      className="rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs text-neutral-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Section>
            ) : null}

            {/* Experience */}
            {meaningfulExperiences.length > 0 ? (
              <Section title={t('preview.experience')}>
                <ExperiencePreviewList items={meaningfulExperiences} presentLabel={presentLabel} />
              </Section>
            ) : null}

            {/* Autres réussites (même présentation que Expérience) */}
            {achievementsAsExperience.length > 0 ? (
              <Section title={t('preview.otherAchievements', 'Autres réussites')}>
                <ExperiencePreviewList items={achievementsAsExperience} presentLabel={presentLabel} />
              </Section>
            ) : null}

            {/* Education */}
            {meaningfulEducation.length > 0 ? (
              <Section title={t('preview.education')}>
                <div className="space-y-3">
                  {meaningfulEducation.map((ed, idx) => {
                    const descLines = toBullets(ed.description)
                    return (
                      <div key={idx}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                          {nonEmpty(ed.degree) || nonEmpty(ed.school) ? (
                            <h4 className="text-sm font-semibold text-neutral-900">
                              {ed.degree}
                              {nonEmpty(ed.school) ? (
                                <span className="font-normal text-neutral-700"> — {ed.school}</span>
                              ) : null}
                            </h4>
                          ) : (
                            <span className="sr-only">Education</span>
                          )}
                          <span className="text-xs text-neutral-600">
                            {formatPeriod(ed.start, ed.end, presentLabel)}
                          </span>
                        </div>
                        {descLines.length > 0 ? (
                          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-neutral-800">
                            {descLines.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </Section>
            ) : null}

            {/* Certifications */}
            {meaningfulCertifications.length > 0 ? (
              <Section title={t('preview.certifications')}>
                <ul className="space-y-2">
                  {meaningfulCertifications.map((c, idx) => (
                    <li key={idx} className="text-sm text-neutral-800">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        {nonEmpty(c.name) || nonEmpty(c.issuer) ? (
                          <span className="font-medium text-neutral-900">
                            {c.name}
                            {nonEmpty(c.issuer) ? (
                              <span className="font-normal text-neutral-700"> — {c.issuer}</span>
                            ) : null}
                          </span>
                        ) : (
                          <span className="sr-only">Certification</span>
                        )}
                        <span className="text-xs text-neutral-600">{c.date || ''}</span>
                      </div>
                      {nonEmpty(c.credentialId) || nonEmpty(c.credentialUrl) ? (
                        <div className="mt-0.5 text-xs text-neutral-700">
                          {nonEmpty(c.credentialId) ? <span>{idLabel}: {c.credentialId}</span> : null}
                          {nonEmpty(c.credentialId) && nonEmpty(c.credentialUrl) ? <span> • </span> : null}
                          {nonEmpty(c.credentialUrl) ? <span>{c.credentialUrl}</span> : null}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {/* Achievements (liste simple, conservée) */}
            {meaningfulAchievements.length > 0 ? (
              <Section title={t('form.achievements', 'Achievements')}>
                <ul className="space-y-2">
                  {meaningfulAchievements.map((a, idx) => (
                    <li key={idx} className="text-sm text-neutral-800">
                      {nonEmpty(a.title) ? (
                        <div className="font-medium text-neutral-900">{a.title}</div>
                      ) : null}
                      {nonEmpty(a.description) ? (
                        <div className="text-neutral-700">{a.description}</div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}

/** Sous-composant de section avec un titre. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 first:mt-4">
      <h3 className="mb-2 border-b border-neutral-200 pb-1 text-xs font-semibold uppercase tracking-wide text-neutral-900">
        {title}
      </h3>
      {children}
    </section>
  )
}

export default ResumePreview
