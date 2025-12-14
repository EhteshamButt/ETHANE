/**
 * AdminScreen.tsx
 * Superposition plein écran pour l'espace administrateur.
 * - Contient un header fixe et le dashboard.
 */

import AdminDashboard from './AdminDashboard'

/** Props de l'écran admin. */
export interface AdminScreenProps {
  /** Ouvert/fermé. */
  open: boolean
  /** Callback de fermeture. */
  onClose: () => void
}

/** Superposition Admin (sans routing). */
export default function AdminScreen({ open, onClose }: AdminScreenProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Barre supérieure */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 md:px-6">
        <div className="text-base font-semibold text-slate-900">Espace administrateur</div>
        <button
          type="button"
          onClick={onClose}
          className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Fermer
        </button>
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-auto">
        <AdminDashboard />
      </div>
    </div>
  )
}
