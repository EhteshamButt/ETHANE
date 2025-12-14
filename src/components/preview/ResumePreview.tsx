/**
 * ResumePreview.tsx
 * Enhanced CV preview fed by form data, with a strict "empty form => no preview" guard.
 * - Uses i18n titles for all sections (Summary, Skills, Experience, Other achievements, Education, Certifications).
 * - Keeps the section "Autres réussites" immediately below "Expérience", reusing ExperiencePreviewList for identical layout.
 * - Experiences are summarized to concise bullet points using the enhancer.
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ResumeData, ExperienceItem, EducationItem, CertificationItem } from '../../types/resume'
import ExperiencePreviewList from './ExperiencePreviewList'
import {
  nonEmpty,
  isMeaningfulExp,
  isMeaningfulEducation,
  isMeaningfulCertification,
  isMeaningfulAchievement,
  parseSkills,
} from '../../lib/previewUtils'
import { enhanceResumeForPreview } from '../../lib/enhance'

/** Compute if the form is "non-empty" strictly from raw user inputs (no enhanced content). */
function hasAnyUserInput(data: ResumeData): boolean {
  const skills = parseSkills(data.skills)
  const hasIdentity = nonEmpty(data.fullName) || nonEmpty(data.headline)
  const hasContacts =
    nonEmpty(data.email) || nonEmpty(data.phone) || nonEmpty(data.location) || nonEmpty(data.linkedin)
  const hasSummary = nonEmpty(data.summary)
  const hasSkills = skills.length > 0

  const hasExperiences = (data.experiences || []).some(isMeaningfulExp)
  const hasEducation = (data.education || []).some(isMeaningfulEducation)
  const hasCertifications = (data.certifications || []).some(isMeaningfulCertification)
  const hasAchievements = (data.achievements || []).some(isMeaningfulAchievement)
  const hasHighlights = (data.highlights || []).some((h) => nonEmpty(h))

  return (
    hasIdentity ||
    hasContacts ||
    hasSummary ||
    hasSkills ||
    hasExperiences ||
    hasEducation ||
    hasCertifications ||
    hasAchievements ||
    hasHighlights
  )
}

/** Section title component */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
      {children}
    </h3>
  )
}

/**
 * ResumePreview (screen)
 * - Renders null if the raw form is empty (strict guard).
 * - Otherwise, enhances data for cleaner, concise preview and renders all entered info.
 * - Adds "Autres réussites" directly under "Expérience" with identical layout (ExperiencePreviewList).
 */
export interface ResumePreviewProps {
  /** Raw form data (unmodified) */
  data: ResumeData
  /** Optional wrapper className */
  className?: string
}

export default function ResumePreview({ data, className }: ResumePreviewProps) {
  const { t } = useTranslation()

  // Strict guard from RAW form inputs
  const show = hasAnyUserInput(data)
  if (!show) return null

  // Build enhanced preview data for display (summary/skills completion, normalized bullets, etc.)
  const enhanced = useMemo(() => enhanceResumeForPreview(data), [data])

  const presentLabel = t('preview.present', 'Present')
  const skills = parseSkills(enhanced.skills)

  const expItems = (enhanced.experiences || []) as ExperienceItem[]
  const eduItems = (enhanced.education || []) as EducationItem[]
  const certItems = (enhanced.certifications || []) as CertificationItem[]
  const highlights = (enhanced.highlights || []).filter(Boolean)
  const achItems = (enhanced.achievements || []) as { title?: string; description?: string }[]

  const meaningfulAchievements = achItems.filter(isMeaningfulAchievement)

  // Project "achievements" as experience-like items to reuse the same list component and styles
  const achievementsAsExperience = useMemo<ExperienceItem[]>(
    () =>
      meaningfulAchievements.map((a) => ({
        title: a.title || '',
        description: a.description || '',
        company: '',
        start: '',
        end: '',
      })),
    [meaningfulAchievements]
  )

  const hasHeaderIdentity = nonEmpty(enhanced.fullName) || nonEmpty(enhanced.headline)
  const hasContacts =
    nonEmpty(enhanced.email) || nonEmpty(enhanced.phone) || nonEmpty(enhanced.location) || nonEmpty(enhanced.linkedin)

  return (
    <div className={['w-full rounded-lg border border-neutral-200 bg-white p-4 shadow-sm', className].filter(Boolean).join(' ')}>
      {/* Header */}
      {(hasHeaderIdentity || hasContacts) && (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-200 pb-3">
          <div>
            {hasHeaderIdentity ? (
              <>
                {nonEmpty(enhanced.fullName) ? (
                  <h1 className="text-lg font-semibold text-neutral-900">{enhanced.fullName}</h1>
                ) : null}
                {nonEmpty(enhanced.headline) ? (
                  <p className="text-sm text-neutral-700">{enhanced.headline}</p>
                ) : null}
              </>
            ) : null}
          </div>
          {hasContacts ? (
            <ul className="text-xs text-neutral-700">
              {nonEmpty(enhanced.email) ? <li><span className="font-medium">Email:</span> {enhanced.email}</li> : null}
              {nonEmpty(enhanced.phone) ? <li><span className="font-medium">Phone:</span> {enhanced.phone}</li> : null}
              {nonEmpty(enhanced.location) ? <li><span className="font-medium">Location:</span> {enhanced.location}</li> : null}
              {nonEmpty(enhanced.linkedin) ? <li><span className="font-medium">LinkedIn:</span> {enhanced.linkedin}</li> : null}
            </ul>
          ) : null}
        </header>
      )}

      {/* Summary */}
      {nonEmpty(enhanced.summary) ? (
        <section className="mt-4">
          <SectionTitle>{t('preview.summary', 'Summary')}</SectionTitle>
          <p className="mt-1 text-sm leading-relaxed text-neutral-800">{enhanced.summary}</p>
        </section>
      ) : null}

      {/* Skills */}
      {skills.length > 0 ? (
        <section className="mt-4">
          <SectionTitle>{t('preview.skills', 'Skills')}</SectionTitle>
          <div className="mt-1 flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="rounded-full border border-neutral-300 bg-neutral-50 px-2 py-0.5 text-xs text-neutral-800"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {/* Experiences (normalized) */}
      {(expItems || []).length > 0 ? (
        <section className="mt-5">
          <SectionTitle>{t('preview.experience', 'Experience')}</SectionTitle>
          <ExperiencePreviewList items={expItems} presentLabel={presentLabel} className="mt-2" />
        </section>
      ) : null}

      {/* Autres réussites — identical layout to "Experience" and positioned immediately below it */}
      {(achievementsAsExperience || []).length > 0 ? (
        <section className="mt-5">
          <SectionTitle>{t('preview.otherAchievements', 'Autres réussites')}</SectionTitle>
          <ExperiencePreviewList items={achievementsAsExperience} presentLabel={presentLabel} className="mt-2" />
        </section>
      ) : null}

      {/* Education */}
      {(eduItems || []).some(isMeaningfulEducation) ? (
        <section className="mt-5">
          <SectionTitle>{t('preview.education', 'Education')}</SectionTitle>
          <ul className="mt-2 space-y-3">
            {eduItems.filter(isMeaningfulEducation).map((ed, idx) => (
              <li key={idx} className="text-sm text-neutral-800">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <div className="font-medium">
                    {ed.degree || ''}
                    {ed.school ? <span className="font-normal text-neutral-700"> — {ed.school}</span> : null}
                  </div>
                  <div className="text-xs text-neutral-600">
                    {(ed.start || '').trim() || (ed.end || '').trim()
                      ? `${ed.start || ''} – ${((ed.end || '').trim().toLowerCase() === 'present' ? presentLabel : (ed.end || ''))}`
                      : ''}
                  </div>
                </div>
                {nonEmpty(ed.description) ? (
                  <ul className="mt-1 list-disc list-outside space-y-1 pl-5">
                    {(ed.description || '')
                      .split('\n')
                      .map((l) => l.trim())
                      .filter(Boolean)
                      .slice(0, 4)
                      .map((l, i) => <li key={i}>{l.replace(/^\s*[-*•]\s+/, '')}</li>)}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Certifications */}
      {(certItems || []).some(isMeaningfulCertification) ? (
        <section className="mt-5">
          <SectionTitle>{t('preview.certifications', 'Certifications')}</SectionTitle>
          <ul className="mt-2 space-y-2 text-sm text-neutral-800">
            {certItems.filter(isMeaningfulCertification).map((c, idx) => (
              <li key={idx} className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  {c.name ? <span className="font-medium">{c.name}</span> : null}
                  {c.issuer ? <span className="text-neutral-700"> — {c.issuer}</span> : null}
                </div>
                <div className="text-xs text-neutral-600">
                  {c.date || ''}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Highlights */}
      {(highlights || []).length > 0 ? (
        <section className="mt-5">
          <SectionTitle>{t('highlightsForm.label', 'Career Highlights')}</SectionTitle>
          <ul className="mt-1 list-disc list-outside space-y-1 pl-5 text-sm text-neutral-800">
            {highlights.slice(0, 8).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
