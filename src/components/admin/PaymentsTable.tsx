/**
 * PaymentsTable.tsx
 * Tableau des derniers paiements (démo).
 * - Affiche client, plan, montant, statut, date.
 */

import type { PaymentRecord } from '../../types/admin'

/** Badge statut. */
function StatusBadge({ status }: { status: PaymentRecord['status'] }) {
  const map: Record<PaymentRecord['status'], string> = {
    paid: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    refunded: 'bg-amber-100 text-amber-900 border-amber-200',
    failed: 'bg-rose-100 text-rose-900 border-rose-200',
  }
  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs ${map[status]}`}>
      {status === 'paid' ? 'Payé' : status === 'refunded' ? 'Remboursé' : 'Échec'}
    </span>
  )
}

/** Props du tableau. */
export interface PaymentsTableProps {
  title?: string
  payments: PaymentRecord[]
}

/** Tableau responsive des paiements. */
export default function PaymentsTable({ title = 'Derniers paiements', payments }: PaymentsTableProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 text-sm font-semibold text-slate-900">{title}</div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="border-b border-slate-200 py-2 pr-3 font-medium">Client</th>
              <th className="border-b border-slate-200 py-2 px-3 font-medium">Plan</th>
              <th className="border-b border-slate-200 py-2 px-3 font-medium">Montant</th>
              <th className="border-b border-slate-200 py-2 px-3 font-medium">Statut</th>
              <th className="border-b border-slate-200 py-2 pl-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-slate-100">
                <td className="py-2 pr-3">
                  <div className="font-medium text-slate-900">{p.customer}</div>
                  {p.email ? <div className="text-xs text-slate-500">{p.email}</div> : null}
                </td>
                <td className="py-2 px-3 text-slate-800 capitalize">{p.plan}</td>
                <td className="py-2 px-3 text-slate-900">${p.amount.toFixed(2)}</td>
                <td className="py-2 px-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="py-2 pl-3 text-slate-700">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
