/** 
 * i18nHighlightsPatch.ts
 * Runtime translation overrides for the Highlights section (French).
 * - Replaces "+Ajouter un point fort" with "+Ajouter une réussite".
 * - Replaces "Point fort" label with "Réussite".
 * - Keeps i18n keys intact; affects all places using these keys.
 */

import i18next from 'i18next'

/**
 * Apply FR overrides for highlights-related labels.
 */
function applyHighlightsOverrides(): void {
  try {
    // Add button label
    i18next.addResource('fr', 'translation', 'highlightsForm.add', '+Ajouter une réussite')
    // Item label
    i18next.addResource('fr', 'translation', 'highlightsForm.itemLabel', 'Réussite')
  } catch {
    // i18n might not be ready in rare cases; import order ensures init happens earlier.
  }
}

// Execute immediately (App.tsx imports i18n initialization before patches)
applyHighlightsOverrides()

export {}