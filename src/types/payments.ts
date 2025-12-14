/**
 * Types liés aux moyens de paiement supportés par l'app.
 * - Étend pour couvrir le Mobile Money (RDC / Madagascar) utilisé dans cette app.
 */

export type PaymentProvider = 'stripe' | 'flutterwave' | 'payway' | 'mpesa'

/** Opérateurs Mobile Money ciblés pour RDC / Madagascar. */
export type MobileMoneyProvider = 'mtn' | 'airtel' | 'orange' | 'vodacom' | 'telma'

/** Intention de paiement côté client (avant redirection / validation). */
export interface PaymentIntentPayload {
  method: 'mobile' | 'card'
  provider?: MobileMoneyProvider
  phone?: string
}
