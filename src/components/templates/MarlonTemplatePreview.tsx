/**
 * MarlonTemplatePreview.tsx
 * Aperçu imprimable (A4-like) du CV "Marlon" avec affichage conditionnel des sections selon le plan.
 * - Étudiant ($1): Résumé, Expérience, Éducation
 * - Professionnel ($2): Résumé, Compétences, Expérience, Éducation
 * - Avancé ($3): Résumé, Faits marquants de carrière, Compétences, Expérience, Éducation
 * - Header: nom + titre + contacts (Email • Téléphone • Localisation • LinkedIn), photo optionnelle à gauche (desktop).
 * - Impression fidèle: id "resume-sheet".
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ResumeData, ResumePlan, ExperienceItem, EducationItem } from '../../types/resume'
import PlanBadge from '../PlanBadge'

/** Formate une période "start – end" avec traduction de "Present". */
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

/** Convertit un texte multilignes en puces. */
function toBullets(text?: string): string[] {
  if (!text) return []
  return text
    .split('\n')
    .map((l) => l.trim().replace(/^[-*•]\s?/, ''))
    .filter(Boolean)
}

/** Parse les compétences séparées par des virgules. */
function parseSkills(skills?: string): string[] {
  if (!skills) return []
  return Array.from(new Set(skills.split(',').map((s) => s.trim()).filter(Boolean)))
}

/**
 * Détermine quelles sections doivent être affichées selon le plan choisi.
 */
function allowedSections(plan: ResumePlan) {
  return {
    summary: true,
    highlights: plan === 'advanced',
    skills: plan === 'pro' || plan === 'advanced',
    experience: true,
    education: true,
  }
}

/**
 * Returns subtle ring classes per plan to visually distinguish the active model.
 */
function ringClasses(plan: ResumePlan): string {
  switch (plan) {
    case 'student':
      return 'ring-2 ring-sky-600/30'
    case 'pro':
      return 'ring-2 ring-neutral-900/25'
    case 'advanced':
      return 'ring-2 ring-emerald-600/30'
  }
}

/**
 * MarlonTemplatePreview
 * - Rendu imprimable avec id "resume-sheet".
 * - Sections activées selon le plan (ResumePlan).
 */
export default function MarlonTemplatePreview({
  data,
  withPhoto,
  plan,
}: {
  data: ResumeData
  withPhoto: boolean
  plan: ResumePlan
}) {
  const { t } = useTranslation()

  const presentLabel = t('preview.present', 'Present')
  const photoAlt = t('preview.photoAlt', 'Photo de profil')

  const skills = useMemo(() => parseSkills(data.skills), [data.skills])
  const experiences = (data.experiences || []) as ExperienceItem[]
  const education = (data.education || []) as EducationItem[]
  const highlights = (data.highlights || []) as string[]

  const photoSrc =
    data.photoUrl && data.photoUrl.trim().length > 0
      ? data.photoUrl
      : 'https://pub-cdn.sider.ai/u/U0E5H7KKOW/web-coder/68c6c0275375a0a7f3b87371/resource/5cd7a883-8ed6-482e-b8b9-8d14cc8ca9c5.jpg'

  const show = allowedSections(plan)

  return (
    <div className="mx-auto w-full max-w-[900px]">
      {/* Feuille imprimable */}
      <div
        id="resume-sheet"
        className={`relative mx-auto rounded-md border border-neutral-200 bg-white p-6 shadow-sm md:p-8 ${ringClasses(plan)}`}
      >
        {/* Badge du plan (coin supérieur droit) */}
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

        {/* En-tête */}
        <header
          className={`grid grid-cols-1 items-center gap-4 ${
            withPhoto ? 'md:grid-cols-[auto_1fr]' : 'md:grid-cols-1'
          }`}
        >
          {withPhoto ? (
            <div className="md:justify-self-start">
              <div className="h-24 w-24 overflow-hidden rounded border border-neutral-200">
                <img
                  src={photoSrc}
                  alt={photoAlt}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : null}

          <div>
            <h1 className="text-[26px] font-extrabold tracking-tight text-neutral-900">
              {data.fullName || '—'}
            </h1>
            {data.headline ? (
              <p className="mt-1 text-[14px] font-semibold text-neutral-800">
                {data.headline}
              </p>
            ) : null}
            <p className="mt-2 text-[12px] text-neutral-600">
              {[
                data.email,
                data.phone,
                data.location,
                data.linkedin ? `${t('preview.linkedin', 'LinkedIn')}: ${data.linkedin}` : '',
              ]
                .filter(Boolean)
                .join(' • ')}
            </p>
          </div>
        </header>

        {/* Résumé */}
        {show.summary && data.summary ? (
          <Section title={t('preview.summary', 'Résumé')}>
            <p className="text-sm leading-relaxed text-neutral-800">{data.summary}</p>
          </Section>
        ) : null}

        {/* Faits marquants de carrière (Advanced) */}
        {show.highlights && highlights.length > 0 ? (
          <Section title={t('highlightsForm.label', 'Faits marquants de carrière')}>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-neutral-800"
                >
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-neutral-800" />
                  <span className="whitespace-pre-wrap">{h}</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {/* Compétences (Pro + Advanced) */}
        {show.skills && skills.length > 0 ? (
          <Section title={t('preview.skills', 'Compétences')}>
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

        {/* Expérience */}
        {show.experience && experiences.length > 0 ? (
          <Section title={t('preview.experience', 'Expérience')}>
            <div className="space-y-4">
              {experiences.map((exp, idx) => {
                const bullets = toBullets(exp.description)
                return (
                  <article key={idx} className="rounded-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h4 className="text-sm font-semibold text-neutral-900">
                        {exp.title || '—'}
                        {exp.company ? (
                          <span className="font-normal text-neutral-700">
                            {' '}
                            — {exp.company}
                          </span>
                        ) : null}
                      </h4>
                      <span className="text-xs text-neutral-600">
                        {formatPeriod(exp.start, exp.end, presentLabel)}
                      </span>
                    </div>
                    {bullets.length > 0 ? (
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-neutral-800">
                        {bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </Section>
        ) : null}

        {/* Éducation */}
        {show.education && education.length > 0 ? (
          <Section title={t('preview.education', 'Éducation')}>
            <div className="space-y-3">
              {education.map((ed, idx) => {
                const descLines = toBullets(ed.description)
                return (
                  <article key={idx}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h4 className="text-sm font-semibold text-neutral-900">
                        {ed.degree || '—'}
                        {ed.school ? (
                          <span className="font-normal text-neutral-700">
                            {' '}
                            — {ed.school}
                          </span>
                        ) : null}
                      </h4>
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
                  </article>
                )
              })}
            </div>
          </Section>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Section
 * Sous-composant: titre en capitale légère + contenu, avec filets discrets.
 */
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
