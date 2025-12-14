/**
 * DownloadCta.tsx
 * CTA unique et centré "Télécharger le PDF" avec gating par paiement.
 * - Avant paiement: clique => redirection vers plateforme de paiement (ou simulation).
 * - Après paiement: clique => déclenche l'export PDF.
 * - Affiche les statuts: redirection, succès, erreur.
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../controls/PrimaryButton'

/** Props pour DownloadCta */
export interface DownloadCtaProps {
  /** Paiement confirmé ? */
  paid: boolean
  /** Redirection/paiement en cours */
  paying: boolean
  /** Message d'erreur éventuel */
  error?: string | null
  /** Lance la redirection vers la plateforme de paiement ou la simulation */
  onPay: () => void
  /** Lance le téléchargement (impression PDF) si payé */
  onDownload: () => void
  /** Export PDF bloqué (erreurs de dates) */
  exportBlocked?: boolean
  /** Message d'aide si export bloqué */
  exportBlockedTitle?: string
  /** Ouvre l'aperçu plein écran avant confirmation/paiement */
  onOpenPreview?: () => void
}

/**
 * DownloadCta
 * Un bouton principal centré, avec messages d'état.
 */
export default function DownloadCta({
  paid,
  paying,
  error,
  onPay,
  onDownload,
  exportBlocked,
  exportBlockedTitle,
  onOpenPreview,
}: DownloadCtaProps) {
  const { t } = useTranslation()

  const handleClick = () => {
    if (paying) return
    // Always open the full-screen preview if available
    if (onOpenPreview) {
      onOpenPreview()
      return
    }
    if (!paid) {
      onPay()
    } else {
      if (!exportBlocked) onDownload()
    }
  }

  const disabled = paying || (paid && !!exportBlocked)
  const title = paid && exportBlocked ? exportBlockedTitle : undefined

  return (
    <section
      aria-label={t('payment.downloadPdf')}
      className="mx-auto w-full max-w-2xl rounded-lg border border-neutral-200 bg-white/90 p-6 text-center shadow-sm"
    >
      <div className="space-y-3">
        <PrimaryButton
          type="button"
          size="lg"
          onClick={handleClick}
          disabled={disabled}
          title={title}
          className="mx-auto"
        >
          {t('payment.downloadPdf')}
        </PrimaryButton>

        {/* États et messages auxiliaires */}
        {paying ? (
          <p className="text-sm text-neutral-700">
            {t('payment.redirecting', 'Redirection vers le paiement…')}
          </p>
        ) : null}

        {paid && !exportBlocked ? (
          <p className="text-sm font-medium text-emerald-700">
            {t('payment.successTitle', 'Paiement réussi')} — {t('payment.ready', 'Votre CV est prêt.')}
          </p>
        ) : null}

        {error ? (
          <p className="text-sm text-red-600">
            {error}
          </p>
        ) : null}

        {!paid && !paying && !error && !onOpenPreview ? (
          <p className="text-xs text-neutral-600">
            {t('payment.secureStripe', 'Paiement sécurisé géré par Stripe Checkout.')}
          </p>
        ) : null}
      </div>
    </section>
  )
}
