/**
 * Types de données pour l'app Mako (CV).
 * - Décrit les domaines, les rubriques et l'état de paiement.
 * - Ajoute cvType (simple/structured/advanced) et achievements (réalisations).
 * - Étend avec highlights (points forts de carrière).
 */

export type LangCode = 'en' | 'sw' | 'pt' | 'mg'

/** Domaine/secteur professionnel du CV. */
export type ResumeDomain =
  | 'general'
  | 'it'
  | 'marketing'
  | 'finance'
  | 'healthcare'
  | 'engineering'
  | 'sales'
  | 'research'

/** Type de CV (contrôle quelles rubriques sont affichées). */
export type CVType = 'simple' | 'structured' | 'advanced'

/** Élément d'expérience. */
export interface ExperienceItem {
  /** Intitulé du poste. */
  title?: string
  /** Entreprise. */
  company?: string
  /** Début au format YYYY-MM. */
  start?: string
  /** Fin au format YYYY-MM ou "Present". */
  end?: string
  /** Description multiligne (convertie en puces). */
  description?: string
}

/** Élément d'éducation/formation. */
export interface EducationItem {
  /** Diplôme/formation. */
  degree?: string
  /** Établissement. */
  school?: string
  /** Début au format YYYY-MM. */
  start?: string
  /** Fin au format YYYY-MM ou "Present". */
  end?: string
  /** Description multiligne. */
  description?: string
}

/** Élément de certification. */
export interface CertificationItem {
  name?: string
  issuer?: string
  date?: string
  credentialId?: string
  credentialUrl?: string
}

/** Élément de réalisation (succès, accomplissement notable). */
export interface AchievementItem {
  /** Intitulé court de la réalisation. */
  title?: string
  /** Description multiligne (détails, impact, métriques). */
  description?: string
}

/** Données complètes du CV. */
export interface ResumeData {
  fullName: string
  headline: string
  email: string
  phone: string
  location: string
  /** URL de profil LinkedIn (optionnel). */
  linkedin?: string
  summary: string
  skills: string
  /** Pays (sélection du pays en dropdown). */
  country?: string
  photoUrl?: string
  domain: ResumeDomain
  language: LangCode

  /** Type de CV (détermine les rubriques visibles). */
  cvType: CVType

  experiences: ExperienceItem[]
  education: EducationItem[]
  /** Certifications (optionnelles, non affichées par défaut dans les rubriques) */
  certifications?: CertificationItem[]
  /** Réalisations (Avancé). */
  achievements?: AchievementItem[]
  /** Points forts de carrière (liste de textes). */
  highlights?: string[]
}

/** Plans proposés au paiement (synchronisés avec cvType). */
export type ResumePlan = 'student' | 'pro' | 'advanced'

/** État de paiement. */
export interface PaymentState {
  plan: ResumePlan
  price: number
  paid: boolean
  sendingEmail: boolean
  method?: 'mobile' | 'card'
  provider?: import('./payments').MobileMoneyProvider
  phone?: string
  reference?: string
  paidAt?: number
}
