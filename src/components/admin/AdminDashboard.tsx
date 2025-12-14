/**
 * AdminDashboard.tsx
 * Composition du tableau de bord admin (KPIs, graphiques, paiements).
 * - Données simulées pour la démonstration.
 */

import { useMemo } from 'react'
import { Eye, Users, CreditCard, TrendingUp } from 'lucide-react'
import KpiCard from './KpiCard'
import VisitsChart from './VisitsChart'
import RevenueChart from './RevenueChart'
import PaymentsTable from './PaymentsTable'
import type { AdminStats, PaymentRecord, VisitPoint } from '../../types/admin'

/** Génère une série de visites pour N jours. */
function generateVisits(days = 14): VisitPoint[] {
  const out: VisitPoint[] = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    const date = d.toISOString().slice(0, 10)
    const base = 200 + Math.round(Math.random() * 200)
    const season = Math.sin((i / days) * Math.PI) * 60
    out.push({ date, visits: Math.max(60, Math.round(base + season)) })
  }
  return out
}

/** Génère des paiements de démo. */
function generatePayments(count = 10): PaymentRecord[] {
  const plans: Array<'student' | 'pro' | 'advanced'> = ['student', 'pro', 'advanced']
  const statuses: Array<'paid' | 'refunded' | 'failed'> = ['paid', 'refunded', 'failed']
  const names = ['Aïcha', 'Benoît', 'Chantal', 'David', 'Emma', 'Fara', 'Gabriel', 'Hugo', 'Imane', 'Jules']

  const arr: PaymentRecord[] = []
  for (let i = 0; i < count; i++) {
    const plan = plans[Math.floor(Math.random() * plans.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const amount = plan === 'student' ? 1 : plan === 'pro' ? 2 : 3
    const d = new Date()
    d.setDate(d.getDate() - Math.floor(Math.random() * 7))
    d.setHours(9 + Math.floor(Math.random() * 9))
    d.setMinutes(Math.floor(Math.random() * 60))
    arr.push({
      id: `P-${String(i + 1).padStart(4, '0')}`,
      customer: names[i % names.length],
      email: `${names[i % names.length].toLowerCase()}@exemple.com`,
      plan,
      amount,
      status,
      date: d.toISOString().slice(0, 16).replace('T', ' '),
    })
  }
  return arr
}

/** Calcule les KPIs depuis les visites et paiements. */
function computeStats(visits: VisitPoint[], payments: PaymentRecord[]): AdminStats {
  const totalVisits = visits.reduce((s, v) => s + v.visits, 0)
  const activeUsers = Math.round(totalVisits * 0.3)
  const totalRevenue = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  const conversionRate = totalVisits ? totalRevenue / totalVisits : 0
  return { totalVisits, activeUsers, totalRevenue, conversionRate }
}

/** Dashboard Admin (données simulées). */
export default function AdminDashboard() {
  const visits = useMemo(() => generateVisits(14), [])
  const payments = useMemo(() => generatePayments(12), [])
  const stats = useMemo(() => computeStats(visits, payments), [visits, payments])

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-4 md:py-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
        <KpiCard title="Visites" value={stats.totalVisits.toLocaleString('fr-FR')} icon={<Eye className="h-5 w-5" />} />
        <KpiCard title="Utilisateurs actifs" value={stats.activeUsers.toLocaleString('fr-FR')} icon={<Users className="h-5 w-5" />} />
        <KpiCard title="Revenu total" value={`$${stats.totalRevenue.toFixed(2)}`} icon={<CreditCard className="h-5 w-5" />} />
        <KpiCard title="Conversion" value={`${(stats.conversionRate * 100).toFixed(2)}%`} icon={<TrendingUp className="h-5 w-5" />} />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <VisitsChart data={visits} />
        <RevenueChart payments={payments} />
      </div>

      {/* Tableau paiements */}
      <PaymentsTable payments={payments.slice(0, 8)} />
    </div>
  )
}
