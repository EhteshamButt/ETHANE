/**
 * enhance.ts
 * Outils d'amélioration locale et de vue IA pour l'aperçu.
 * - enhanceLocally: nettoyage léger des données saisies (utilisé par le bouton IA du formulaire).
 * - enhanceResumeForPreview: construit une vue dérivée "améliorée" pour l'aperçu/PDF, sans muter le state du formulaire.
 * - generatePersonalizedSummary: produit un résumé court et orienté impact à partir des données utilisateur.
 *
 * Amélioration (2025-09):
 * - Les expériences sont systématiquement "polies" pour l'aperçu : normalisation en puces, dédoublonnage,
 *   complétion avec des suggestions pour atteindre un minimum de 3 puces (max 5).
 */

import type { ResumeData, ExperienceItem } from '../types/resume'
import { getSuggestionsForDomain, getExperienceBullets } from './suggestions'

/**
 * Nettoie/améliore légèrement le contenu saisi par l'utilisateur.
 * - Résumé compact (espaces multiples -> un espace).
 * - Compétences dédupliquées + capitalisation de la première lettre.
 * Ne modifie que summary et skills.
 */
export function enhanceLocally(data: ResumeData): ResumeData {
  const cleanSummary = (data.summary || '').replace(/\s+/g, ' ').trim()

  const skills = (data.skills || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const dedup = Array.from(new Set(skills))
  const capitalized = dedup.map((s) => (s.length ? s[0].toUpperCase() + s.slice(1) : s))

  return {
    ...data,
    summary: cleanSummary,
    skills: capitalized.join(', ')
  }
}

/**
 * Découpe un texte multi-lignes en array de puces "propres":
 * - Supprime les marqueurs initiaux (-, *, •)
 * - Trim et filtre les lignes vides
 */
function linesToCleanBullets(text?: string): string[] {
  if (!text) return []
  return text
    .split('\n')
    .map((l) => l.trim().replace(/^[-*•]\s?/, ''))
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

/**
 * Déduplique un tableau de puces de manière tolérante (insensible à la casse, espaces compactés).
 */
function dedupeBullets(bullets: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const b of bullets) {
    const key = b.toLowerCase().replace(/\s+/g, ' ').trim()
    if (!seen.has(key)) {
      seen.add(key)
      out.push(b)
    }
  }
  return out
}

/**
 * Construit des puces "suggestions IA" pour une expérience donnée,
 * basées sur la langue, le domaine et l'intitulé du poste.
 */
function suggestionBulletsForExperience(
  lang: ResumeData['language'],
  domain: ResumeData['domain'],
  role?: string
): string[] {
  const s = getExperienceBullets(
    // @ts-expect-error language includes 'mg' but bullets cover fr/en/sw/pt => fallback handled in suggestions
    lang,
    domain,
    role
  )
  return linesToCleanBullets(s)
}

/**
 * Construit une description améliorée pour l'aperçu:
 * - Normalise la description existante en puces
 * - Complète avec des suggestions jusqu'à minBullets
 * - Limite le total à maxBullets
 * - Re-génère une chaîne multi-lignes, préfixée par "• " pour la lisibilité
 */
function buildEnhancedExperienceDescription(
  exp: ExperienceItem,
  data: ResumeData,
  minBullets = 4,
  maxBullets = 4
): string {
  const existing = linesToCleanBullets(exp.description)
  let bullets = [...existing]

  if (bullets.length < minBullets) {
    const suggestions = suggestionBulletsForExperience(data.language, data.domain, exp.title)
    const merged = dedupeBullets([...bullets, ...suggestions])
    bullets = merged.slice(0, Math.max(minBullets, Math.min(maxBullets, merged.length)))
  } else {
    // Même avec assez de lignes, on dé-doublonne et on plafonne à maxBullets pour une preview lisible
    bullets = dedupeBullets(bullets).slice(0, maxBullets)
  }

  // Recompose en chaîne, avec "• " (lisible dans l'aperçu et inoffensif pour toBullets)
  return bullets.map((b) => (b.startsWith('•') ? b : `• ${b}`)).join('\n')
}

/**
 * Construit une version "améliorée" des données pour l'aperçu.
 * - Si summary/skills sont vides ou si options.forceSummary est true, les remplit via suggestions/génération.
 * - Les expériences sont normalisées/complétées en puces pour l'aperçu (sans modifier le state original).
 * - Ne touche pas aux autres champs ni au state original.
 */
export function enhanceResumeForPreview(
  data: ResumeData,
  options?: { forceSummary?: boolean }
): ResumeData {
  const suggestion = getSuggestionsForDomain(data.language, data.domain)

  // Compléter summary/skills
  const summary =
    (data.summary || '').trim() && !options?.forceSummary
      ? (data.summary || '').trim()
      : generatePersonalizedSummary(data)
  const skills = (data.skills || '').trim() || suggestion.skills

  // Améliorer les expériences pour l'aperçu (toujours)
  const experiences = (data.experiences || []).map((exp) => {
    const improvedDesc = buildEnhancedExperienceDescription(exp, data)
    const next: ExperienceItem = {
      ...exp,
      description: improvedDesc,
    }
    return next
  })

  return {
    ...data,
    summary,
    skills,
    experiences
  }
}

/**
 * Génère un résumé personnalisé court (2–3 phrases) orienté résultats et points forts.
 * - Utilise: headline, skills (3–5), 1–2 expériences, domaine, éventuellement réalisations.
 * - Variante multilingue basique (FR/EN/SW/PT/MG/AR).
 */
export function generatePersonalizedSummary(data: ResumeData): string {
  const lang = data.language as 'fr' | 'en' | 'sw' | 'pt' | 'mg' | 'ar'
  const name = (data.fullName || '').trim()
  const role = (data.headline || '').trim()
  const skills = (data.skills || '')
    .split(',')
    .map((s) => s.trim())
  const skillsTop = skills.filter(Boolean).slice(0, 4)
  const expTitles = (data.experiences || [])
    .map((e) => (e.title || '').trim())
    .filter(Boolean)
    .slice(0, 2)
  const hasAchievements =
    (data.achievements || []).length > 0 || (data.highlights || []).length > 0

  if (lang === 'fr') {
    return [
      role || name
        ? `${role || name} orienté(e) impact, alliant rigueur et sens du résultat.`
        : 'Professionnel(le) orienté(e) impact, alliant rigueur et sens du résultat.',
      skillsTop.length ? `Forces clés: ${skillsTop.join(', ')}.` : '',
      expTitles.length
        ? `Expériences marquantes: ${expTitles.join(' • ')}.`
        : hasAchievements
          ? 'Mise en avant de réalisations concrètes et mesurables.'
          : ''
    ]
      .filter(Boolean)
      .join(' ')
  }

  if (lang === 'sw') {
    return [
      role || name
        ? `${role || name} anayelenga matokeo, mwenye nidhamu na ubora.`
        : 'Mtaalamu anayelenga matokeo, mwenye nidhamu na ubora.',
      skillsTop.length ? `Nguvu kuu: ${skillsTop.join(', ')}.` : '',
      expTitles.length
        ? `Uzoefu muhimu: ${expTitles.join(' • ')}.`
        : hasAchievements
          ? 'Kusisitiza mafanikio yanayopimika.'
          : ''
    ]
      .filter(Boolean)
      .join(' ')
  }

  if (lang === 'pt') {
    return [
      role || name
        ? `${role || name} focado(a) em impacto, com rigor e resultados.`
        : 'Profissional focado(a) em impacto, com rigor e resultados.',
      skillsTop.length ? `Forças-chave: ${skillsTop.join(', ')}.` : '',
      expTitles.length
        ? `Experiências de destaque: ${expTitles.join(' • ')}.`
        : hasAchievements
          ? 'Destaque para realizações mensuráveis.'
          : ''
    ]
      .filter(Boolean)
      .join(' ')
  }

  if (lang === 'mg') {
    return [
      role || name
        ? `${role || name} mifantoka amin’ny vokatra, mazoto sy hentitra.`
        : 'Matihanina mifantoka amin’ny vokatra, mazoto sy hentitra.',
      skillsTop.length ? `Herin-tsaina: ${skillsTop.join(', ')}.` : '',
      expTitles.length
        ? `Traikefa nisongadina: ${expTitles.join(' • ')}.`
        : hasAchievements
          ? 'Asongadina ny zava-bita azo refesina.'
          : ''
    ]
      .filter(Boolean)
      .join(' ')
  }

  if (lang === 'ar') {
    return [
      role || name
        ? `${role || name} يركز على الأثر، يجمع بين الانضباط وجودة التنفيذ.`
        : 'محترف يركز على الأثر، يجمع بين الانضباط وجودة التنفيذ.',
      skillsTop.length ? `نِقاط القوة: ${skillsTop.join(', ')}.` : '',
      expTitles.length
        ? `خبرات بارزة: ${expTitles.join(' • ')}.`
        : hasAchievements
          ? 'إبراز إنجازات قابلة للقياس.'
          : ''
    ]
      .filter(Boolean)
      .join(' ')
  }

  // EN (default)
  return [
    role || name
      ? `${role || name} focused on impact with disciplined execution.`
      : 'Impact-focused professional with disciplined execution.',
    skillsTop.length ? `Key strengths: ${skillsTop.join(', ')}.` : '',
    expTitles.length
      ? `Notable experience: ${expTitles.join(' • ')}.`
      : hasAchievements
        ? 'Highlights measurable achievements.'
        : ''
  ]
    .filter(Boolean)
    .join(' ')
}
