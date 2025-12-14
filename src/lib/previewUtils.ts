/**
 * previewUtils.ts
 * Utilitaires purs pour préparer les données d'aperçu du CV.
 * - Détermine le contenu "significatif" (non vide) par section.
 * - Calcule les drapeaux d'affichage globaux (header, résumé, sections...).
 * - Fournit des helpers de formatage (périodes, puces, parsing des compétences).
 */

import type {
  ResumeData,
  ExperienceItem,
  EducationItem,
  CertificationItem,
} from '../types/resume'

/** Indique si une chaîne contient du texte non vide. */
export function nonEmpty(v?: string): boolean {
  return Boolean((v || '').trim())
}

/** Convertit un bloc texte en puces basiques, en retirant les préfixes communs. */
export function toBullets(text?: string): string[] {
  if (!text) return []
  return text
    .split('\n')
    .map((l) => l.trim().replace(/^[-*•]\s?/, ''))
    .filter(Boolean)
}

/** Transforme une chaîne de compétences en liste unique (trim + dédoublonnage). */
export function parseSkills(skills?: string): string[] {
  if (!skills) return []
  return Array.from(new Set(skills.split(',').map((s) => s.trim()).filter(Boolean)))
}

/** Détection d'une description exploitable (après nettoyage / split). */
export function hasMeaningfulDescription(desc?: string): boolean {
  const text = (desc || '').replace(/\r/g, '')
  if (!text.trim()) return false
  const parts = text
    .split(/\n|•+|;/g)
    .map((l) => l.replace(/^\s*[-*•]\s+/, '').trim())
    .filter(Boolean)
  return parts.length > 0
}

/** Une expérience est significative s'il y a au moins un champ utile. */
export function isMeaningfulExp(exp: ExperienceItem): boolean {
  return (
    nonEmpty(exp.title) ||
    nonEmpty(exp.company) ||
    nonEmpty(exp.start) ||
    nonEmpty(exp.end) ||
    hasMeaningfulDescription(exp.description)
  )
}

/** Une éducation est significative s'il y a au moins un champ utile. */
export function isMeaningfulEducation(ed: EducationItem): boolean {
  return (
    nonEmpty(ed.degree) ||
    nonEmpty(ed.school) ||
    nonEmpty(ed.start) ||
    nonEmpty(ed.end) ||
    hasMeaningfulDescription(ed.description)
  )
}

/** Une certification est significative s'il y a au moins un champ utile. */
export function isMeaningfulCertification(c: CertificationItem): boolean {
  return (
    nonEmpty(c.name) ||
    nonEmpty(c.issuer) ||
    nonEmpty(c.date) ||
    nonEmpty(c.credentialId) ||
    nonEmpty(c.credentialUrl)
  )
}

/** Une réalisation (achievement) est significative si elle contient un titre/une description. */
export function isMeaningfulAchievement(a?: { title?: string; description?: string }): boolean {
  if (!a) return false
  return nonEmpty(a.title) || nonEmpty(a.description)
}

/** Période formatée "start – end" avec prise en charge de "Present". */
export function formatPeriod(start?: string, end?: string, presentLabel: string = 'Present'): string {
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
 * Données dérivées pour contrôler l'affichage de l'aperçu.
 */
export interface PreviewDerived {
  skills: string[]
  meaningfulExperiences: ExperienceItem[]
  meaningfulEducation: EducationItem[]
  meaningfulCertifications: CertificationItem[]
  meaningfulAchievements: { title?: string; description?: string }[]
  hasHeaderIdentity: boolean
  hasHeaderContacts: boolean
  summaryAllowed: boolean
  hasAnyMeaningfulData: boolean
}

/**
 * Calcule les informations "dérivées" nécessaires à l'aperçu.
 * - Garde-fou global: hasAnyMeaningfulData
 * - Le résumé n'est autorisé que s'il est saisi ET qu'il existe ≥1 expérience significative.
 */
export function computePreviewData(data: ResumeData): PreviewDerived {
  const skills = parseSkills(data.skills)

  const experiences = (data.experiences || []) as ExperienceItem[]
  const education = (data.education || []) as EducationItem[]
  const certifications = (data.certifications || []) as CertificationItem[]
  const achievements = (data.achievements || []) as { title?: string; description?: string }[]

  const meaningfulExperiences = experiences.filter(isMeaningfulExp)
  const meaningfulEducation = education.filter(isMeaningfulEducation)
  const meaningfulCertifications = certifications.filter(isMeaningfulCertification)
  const meaningfulAchievements = achievements.filter(isMeaningfulAchievement)

  const hasHeaderIdentity = nonEmpty(data.fullName) || nonEmpty(data.headline)
  const hasHeaderContacts =
    nonEmpty(data.email) || nonEmpty(data.phone) || nonEmpty(data.location) || nonEmpty(data.linkedin)

  const summaryAllowed = nonEmpty(data.summary) && meaningfulExperiences.length > 0

  const hasAnyMeaningfulData =
    hasHeaderIdentity ||
    hasHeaderContacts ||
    skills.length > 0 ||
    meaningfulExperiences.length > 0 ||
    meaningfulEducation.length > 0 ||
    meaningfulCertifications.length > 0 ||
    meaningfulAchievements.length > 0 ||
    summaryAllowed

  return {
    skills,
    meaningfulExperiences,
    meaningfulEducation,
    meaningfulCertifications,
    meaningfulAchievements,
    hasHeaderIdentity,
    hasHeaderContacts,
    summaryAllowed,
    hasAnyMeaningfulData,
  }
}
