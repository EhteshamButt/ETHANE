/**
 * VisitsChart.tsx
 * Graphique de visites par jour (ligne) basé sur Recharts.
 * - Responsive, palette sobre.
 */

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import type { VisitPoint } from '../../types/admin'

/** Props du graphique de visites. */
export interface VisitsChartProps {
  title?: string
  data: VisitPoint[]
}

/** Graphique ligne des visites quotidiennes. */
export default function VisitsChart({ title = 'Visites', data }: VisitsChartProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 text-sm font-semibold text-slate-900">{title}</div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#64748b" />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{ fontSize: 12 }}
              labelStyle={{ fontWeight: 600 }}
              formatter={(v: any) => [String(v), 'Visites']}
            />
            <Line type="monotone" dataKey="visits" stroke="#2563eb" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
