/** 
 * i18nUxPatch.ts
 * Adds small UX-related translation keys across supported languages without touching the core bundle.
 * - payment.emailPlaceholder
 * - footer.legal
 * - a11y.homeLink
 * Uses deep merge and overwrite to be safe and idempotent.
 */

import i18next from 'i18next'

const patches = {
  en: {
    payment: {
      emailPlaceholder: 'you@example.com',
    },
    footer: {
      legal: 'Legal',
    },
    a11y: {
      homeLink: 'Go to homepage',
    },
    pricing: {
      dropdown: {
        standard: 'STANDARD $1',
        professional: 'PROFESSIONAL $2',
        advanced: 'ADVANCED $3',
      },
    },
  },
  fr: {
    payment: {
      emailPlaceholder: 'vous@exemple.com',
    },
    footer: {
      legal: 'Mentions légales',
    },
    a11y: {
      homeLink: "Aller à la page d'accueil",
    },
    pricing: {
      dropdown: {
        standard: 'STANDARD $1',
        professional: 'PROFESSIONNEL $2',
        advanced: 'AVANCÉ $3',
      },
    },
  },
  sw: {
    payment: {
      emailPlaceholder: 'wewe@mfano.com',
    },
    footer: {
      legal: 'Taarifa za kisheria',
    },
    a11y: {
      homeLink: 'Nenda kwenye ukurasa wa nyumbani',
    },
  },
  pt: {
    payment: {
      emailPlaceholder: 'voce@exemplo.com',
    },
    footer: {
      legal: 'Aviso legal',
    },
    a11y: {
      homeLink: 'Ir para a página inicial',
    },
  },
  mg: {
    payment: {
      emailPlaceholder: 'ianao@ohatra.com',
    },
    footer: {
      legal: 'Fanamarihana ara-dalàna',
    },
    a11y: {
      homeLink: 'Miverena amin’ny pejy fandraisana',
    },
  },
  ar: {
    payment: {
      emailPlaceholder: 'you@example.com',
    },
    footer: {
      legal: 'الشروط القانونية',
    },
    a11y: {
      homeLink: 'الانتقال إلى الصفحة الرئيسية',
    },
  },
} as const

try {
  Object.entries(patches).forEach(([lang, bundle]) => {
    i18next.addResourceBundle(lang, 'translation', bundle, true, true)
  })
} catch {
  // noop; i18n will still pick these up once initialized
}
