/**
 * RevenueChart.tsx
 * Graphique barres du revenu par plan (Student/Pro/Advanced).
 * - Agrège les paiements réussis.
 */

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import type { PaymentRecord } from '../../types/admin'

/** Props du graphique de revenu. */
export interface RevenueChartProps {
  title?: string
  payments: PaymentRecord[]
}

/** Carte graphique barres. */
export default function RevenueChart({ title = 'Revenu par plan', payments }: RevenueChartProps) {
  /** Agrège le revenu par plan (paid uniquement). */
  const totals = payments.reduce(
    (acc, p) => {
      if (p.status !== 'paid') return acc
      acc[p.plan] = (acc[p.plan] || 0) + p.amount
      return acc
    },
    {} as Record<string, number>
  )

  const data = [
    { plan: 'Student', amount: totals['student'] || 0 },
    { plan: 'Pro', amount: totals['pro'] || 0 },
    { plan: 'Advanced', amount: totals['advanced'] || 0 },
  ]

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 text-sm font-semibold text-slate-900">{title}</div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="plan" tick={{ fontSize: 12 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{ fontSize: 12 }}
              formatter={(v: any) => [`$${Number(v).toFixed(2)}`, 'Revenu']}
            />
            <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
