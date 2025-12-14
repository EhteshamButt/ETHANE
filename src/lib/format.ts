/** 
 * Formatting helpers (locale-aware)
 * - Provides currency formatting aligned with the active i18n language.
 */

export function mapLangToLocale(lang: string): string {
  // Map i18n language to a concrete locale for Intl
  switch (lang) {
    case 'fr':
      return 'fr-FR'
    case 'en':
      return 'en-US'
    case 'sw':
      return 'sw-KE'
    case 'pt':
      return 'pt-PT'
    case 'mg':
      return 'mg-MG'
    case 'ar':
      return 'ar-AE'
    default:
      return lang || 'en-US'
  }
}

/**
 * Formats a number as a currency for a given language and currency code.
 */
export function formatCurrency(amount: number, lang: string, currency: string = 'USD'): string {
  try {
    return new Intl.NumberFormat(mapLangToLocale(lang), {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    // Fallback to simple USD formatting
    return `$${amount}`
  }
}
