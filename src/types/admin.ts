/**
 * Types de domaine pour l'interface Administrateur (données simulées).
 * - Décrit les séries de visites, paiements et indicateurs clés.
 */

import type { ResumePlan } from './resume'

/** Point de série pour visites (par jour). */
export interface VisitPoint {
  /** Date au format YYYY-MM-DD. */
  date: string
  /** Nombre de visites ce jour. */
  visits: number
}

/** Statut d'un paiement. */
export type PaymentStatus = 'paid' | 'refunded' | 'failed'

/** Enregistrement de paiement. */
export interface PaymentRecord {
  /** ID interne ou référence. */
  id: string
  /** Nom (ou alias client). */
  customer: string
  /** Email du client (facultatif en démo). */
  email?: string
  /** Plan souscrit. */
  plan: ResumePlan
  /** Montant en USD. */
  amount: number
  /** Statut de paiement. */
  status: PaymentStatus
  /** Date ISO (YYYY-MM-DD HH:mm). */
  date: string
}

/** Indicateurs clés (KPIs). */
export interface AdminStats {
  totalVisits: number
  activeUsers: number
  totalRevenue: number
  conversionRate: number // 0..1
}
