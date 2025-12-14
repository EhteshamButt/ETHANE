/**
 * Suggestions basiques (Résumé + Compétences) par domaine et langue.
 * - Utilisées pour pré-remplir rapidement le formulaire.
 * - Fournit aussi une génération de puces d'expérience minimaliste côté client.
 * - Ajoute: getSuggestedExperiences pour proposer 1–2 expériences de base selon le domaine.
 */

import type { ResumeDomain, ExperienceItem } from '../types/resume'

/** Structure de suggestion */
export interface DomainSuggestion {
  summary: string
  skills: string
}

/** Suggestions FR */
const frMap: Record<ResumeDomain, DomainSuggestion> = {
  general: {
    summary:
      "Professionnel motivé, autonome et orienté résultats. Excellentes compétences en communication, organisation et travail d'équipe.",
    skills: 'Communication, Gestion du temps, MS Office, Résolution de problèmes'
  },
  it: {
    summary:
      'Développeur axé qualité, habitué aux sprints Agile, testing et CI/CD. Capable de livrer des interfaces performantes et lisibles.',
    skills: 'React, TypeScript, Node.js, REST, Git, CI/CD, Testing'
  },
  marketing: {
    summary:
      'Marketeur orienté données, A/B testing et optimisation des conversions. Expérience en campagnes multi-canaux et SEO/SEA.',
    skills: 'SEO, Google Ads, Analytics, Copywriting, Emailing, A/B Testing'
  },
  finance: {
    summary:
      'Analyste rigoureux, habitué aux reportings, budgets et contrôles de performance. Sens de la précision et de la confidentialité.',
    skills: 'Excel avancé, Modélisation, Reporting, Comptabilité, Power BI'
  },
  healthcare: {
    summary:
      'Professionnel de santé organisé, empathique et fiable. Habitué aux protocoles, au travail en équipe et à l’éducation du patient.',
    skills: 'Soins, Dossier patient, Protocoles, Communication, Hygiène'
  },
  engineering: {
    summary:
      'Ingénieur orienté solutions, conception produit et amélioration continue. Pratique de la documentation et de la sécurité.',
    skills: 'CAO, Lean, Six Sigma, Prototypage, Documentation, Sécurité'
  },
  sales: {
    summary:
      'Commercial orienté résultats, maîtrise du cycle de vente, prospection et négociation. Solide culture du chiffre et du CRM.',
    skills: 'Prospection, Négociation, CRM, Pipeline, Objections, Closing'
  },
  research: {
    summary:
      'Chercheur méthodique, habitué aux protocoles expérimentaux, à l’analyse de données et à la rédaction scientifique.',
    skills: 'Méthodologie, Statistiques, Revue de littérature, Rédaction, Présentations'
  }
}

/** Suggestions EN */
const enMap: Record<ResumeDomain, DomainSuggestion> = {
  general: {
    summary:
      'Self-driven professional with strong communication, organization and teamwork skills. Focused on impact and quality.',
    skills: 'Communication, Time management, MS Office, Problem solving'
  },
  it: {
    summary:
      'Quality-minded developer with Agile, testing and CI/CD habits. Ships maintainable, performant interfaces.',
    skills: 'React, TypeScript, Node.js, REST, Git, CI/CD, Testing'
  },
  marketing: {
    summary:
      'Data-driven marketer focused on A/B testing and conversion optimization. Experience with multi-channel campaigns and SEO/SEA.',
    skills: 'SEO, Google Ads, Analytics, Copywriting, Email, A/B Testing'
  },
  finance: {
    summary:
      'Detail-oriented analyst with reporting, budgeting and performance control experience. Strong accuracy and confidentiality.',
    skills: 'Advanced Excel, Modeling, Reporting, Accounting, Power BI'
  },
  healthcare: {
    summary:
      'Organized, empathic and reliable healthcare professional. Experienced with protocols, teamwork and patient education.',
    skills: 'Patient care, EMR, Protocols, Communication, Hygiene'
  },
  engineering: {
    summary:
      'Solution-oriented engineer focused on product design and continuous improvement. Documentation and safety practices.',
    skills: 'CAD, Lean, Six Sigma, Prototyping, Documentation, Safety'
  },
  sales: {
    summary:
      'Results-driven sales professional skilled in prospecting, negotiation and full-cycle selling. Strong KPI and CRM mindset.',
    skills: 'Prospecting, Negotiation, CRM, Pipeline, Objections, Closing'
  },
  research: {
    summary:
      'Methodical researcher experienced in experimental protocols, data analysis and scientific writing.',
    skills: 'Methodology, Statistics, Literature review, Writing, Presentations'
  }
}

/** Map minimal SW/PT retombant sur EN si manquant */
const swMap = enMap
const ptMap = enMap

/**
 * Retourne les suggestions selon langue et domaine.
 */
export function getSuggestionsForDomain(
  lang: 'fr' | 'en' | 'sw' | 'pt',
  domain: ResumeDomain
): DomainSuggestion {
  const dict = lang === 'fr' ? frMap : lang === 'en' ? enMap : lang === 'sw' ? swMap : ptMap
  return dict[domain]
}

/**
 * Génère des puces d'expérience simples selon langue et domaine.
 * - Utilise les mots-clés du domaine pour contextualiser.
 * - Côté client uniquement (pas d'appel externe).
 */
export function getExperienceBullets(
  lang: 'fr' | 'en' | 'sw' | 'pt',
  domain: ResumeDomain,
  role?: string
): string {
  const s = getSuggestionsForDomain(lang, domain)
  const kws = s.skills.split(',').map((k) => k.trim()).slice(0, 3)

  if (lang === 'fr') {
    return [
      `• ${role ? role + ' : ' : ''}Initiatives axées résultats, amélioration des KPI clés (${kws.join(', ')}).`,
      `• Collaboration transverse pour livrer des projets à impact, dans les délais et la qualité attendus.`,
      `• Suivi de performance, documentation et partage des bonnes pratiques.`
    ].join('\n')
  }
  if (lang === 'sw') {
    return [
      `• ${role ? role + ': ' : ''}Utekelezaji unaoendeshwa na matokeo, kuboresha KPI (${kws.join(', ')}).`,
      `• Ushirikiano kati ya timu ili kufikisha matokeo kwa wakati na ubora.`,
      `• Ufuatiliaji wa utendaji, maandishi na kushiriki mbinu bora.`
    ].join('\n')
  }
  if (lang === 'pt') {
    return [
      `• ${role ? role + ': ' : ''}Implementação orientada a resultados, melhoria de KPIs (${kws.join(', ')}).`,
      `• Colaboração entre equipes para entregar com prazo e qualidade.`,
      `• Acompanhamento de desempenho, documentação e partilha de boas práticas.`
    ].join('\n')
  }
  // EN
  return [
    `• ${role ? role + ': ' : ''}Results-focused initiatives improving key KPIs (${kws.join(', ')}).`,
    `• Cross-team collaboration to ship impact on time and with quality.`,
    `• Performance tracking, documentation and knowledge sharing of best practices.`
  ].join('\n')
}

/**
 * Propose 1–2 expériences "squelettes" adaptées au domaine.
 * - Génère aussi des puces via getExperienceBullets pour offrir un contenu directement utile.
 * - Les dates sont laissées vides (utilisateur pourra compléter).
 */
export function getSuggestedExperiences(
  lang: 'fr' | 'en' | 'sw' | 'pt',
  domain: ResumeDomain
): ExperienceItem[] {
  const samples: Record<ResumeDomain, Array<Pick<ExperienceItem, 'title' | 'company'>>> = {
    general: [
      { title: lang === 'fr' ? 'Assistant polyvalent' : 'Operations Assistant', company: 'Acme' },
      { title: lang === 'fr' ? 'Coordinateur de projet' : 'Project Coordinator', company: 'Globex' }
    ],
    it: [
      { title: lang === 'fr' ? 'Développeur Frontend' : 'Frontend Developer', company: 'Techify' },
      { title: lang === 'fr' ? 'Ingénieur QA' : 'QA Engineer', company: 'QualityWorks' }
    ],
    marketing: [
      { title: lang === 'fr' ? 'Chargé de marketing digital' : 'Digital Marketer', company: 'BrandCo' },
      { title: lang === 'fr' ? 'Growth Marketer' : 'Growth Marketer', company: 'ScaleUp' }
    ],
    finance: [
      { title: lang === 'fr' ? 'Analyste financier' : 'Financial Analyst', company: 'FinCorp' },
      { title: lang === 'fr' ? 'Contrôleur de gestion' : 'FP&A Analyst', company: 'Numbers Ltd' }
    ],
    healthcare: [
      { title: lang === 'fr' ? 'Infirmier' : 'Nurse', company: 'MediCare' },
      { title: lang === 'fr' ? 'Coordinateur santé' : 'Health Coordinator', company: 'CarePlus' }
    ],
    engineering: [
      { title: lang === 'fr' ? 'Ingénieur produit' : 'Product Engineer', company: 'BuildIt' },
      { title: lang === 'fr' ? 'Ingénieur méthodes' : 'Process Engineer', company: 'FlowTech' }
    ],
    sales: [
      { title: lang === 'fr' ? 'Commercial B2B' : 'B2B Sales Rep', company: 'MarketOne' },
      { title: lang === 'fr' ? 'Key Account Manager' : 'Key Account Manager', company: 'PrimeTrade' }
    ],
    research: [
      { title: lang === 'fr' ? 'Assistant de recherche' : 'Research Assistant', company: 'LabX' },
      { title: lang === 'fr' ? 'Analyste R&D' : 'R&D Analyst', company: 'Innovate' }
    ],
  }

  const picks = samples[domain] || samples.general
  return picks.map((p) => {
    const description = getExperienceBullets(lang, domain, p.title)
    return {
      title: p.title,
      company: p.company,
      start: '',
      end: '',
      description
    }
  })
}
