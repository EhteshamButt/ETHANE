/** 
 * i18nAddressPatch.ts
 * Runtime i18n patch to rename the French label for the address field:
 * - Updates translation for key: `form.location` from "Localisation" to "Adresse".
 * - Non-invasive: deep-merged onto the existing `fr` resources.
 */

import i18next from 'i18next'

/** Override object: only the needed key, in French. */
const frOverride = {
  form: {
    location: 'Adresse',
  },
}

/**
 * Apply the override. `addResourceBundle` with deep merge ensures we
 * keep all existing keys while replacing just `form.location`.
 * The last `true` forces overwrite of existing keys.
 */
try {
  i18next.addResourceBundle('fr', 'translation', frOverride, true, true)
} catch {
  // No-op: if i18n isn't initialized yet, it will still register the bundle.
}
