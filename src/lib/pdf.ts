/**
 * Fonctions utilitaires pour la génération de PDF par impression navigateur.
 * Approche compatible mobile: l'utilisateur peut "Enregistrer en PDF".
 */

import type { PdfOptions } from '../types/resume'

/**
 * Déclenche l'impression du conteneur spécifié.
 * Astuce: on remplace temporairement le titre du document.
 */
export function printPdf({ containerId, title }: PdfOptions) {
  const el = document.getElementById(containerId)
  if (!el) {
    console.warn('printPdf: container not found', containerId)
    window.print()
    return
  }
  const prev = document.title
  if (title) document.title = title
  // L'impression s'appuie sur des styles @media print définis dans l'aperçu.
  window.print()
  // Restaurer
  if (title) document.title = prev
}
