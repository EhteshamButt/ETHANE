/**
 * CountryPickerModal.tsx
 * Scrollable country selection modal with quick search and "recent countries" support.
 * - Props: open, onOpenChange, onSelect(countryName)
 * - Persists recent selections to localStorage for convenience.
 */

import React, { useEffect, useMemo, useState } from 'react'
import Modal from './Modal'

/** Key for recent countries in localStorage */
const RECENT_KEY = 'recent_countries_v1'

/** Returns an array of recent country names (up to 8). */
function getRecentCountries(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr.slice(0, 8) : []
  } catch {
    return []
  }
}

/** Add a country to recent list (dedup + clamp). */
function pushRecentCountry(name: string) {
  try {
    const current = getRecentCountries()
    const next = [name, ...current.filter((c) => c !== name)].slice(0, 8)
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
}

/** Minimal country list (can be extended). */
const COUNTRIES = [
  'Congo (RDC)', 'Congo (RC)', 'Côte d’Ivoire', 'Cameroun', 'Sénégal', 'Mali', 'Maroc', 'Algérie',
  'Tunisie', 'Madagascar', 'Kenya', 'Tanzanie', 'Ouganda', 'Rwanda', 'Burundi', 'Ghana', 'Nigeria',
  'Afrique du Sud', 'France', 'Belgique', 'Suisse', 'Canada', 'États-Unis', 'Portugal', 'Brésil',
  'Espagne', 'Italie', 'Allemagne', 'Royaume-Uni', 'Éthiopie', 'Zambie', 'Zimbabwe', 'Namibie',
]

export interface CountryPickerModalProps {
  /** Whether the modal is open. */
  open: boolean
  /** Called when modal open state changes. */
  onOpenChange: (next: boolean) => void
  /** Called with the selected country name. */
  onSelect: (country: string) => void
}

/**
 * CountryPickerModal
 * Displays a searchable, scrollable list of countries with a "Recent" section.
 */
export default function CountryPickerModal({ open, onOpenChange, onSelect }: CountryPickerModalProps) {
  const [query, setQuery] = useState('')
  const [recents, setRecents] = useState<string[]>([])

  useEffect(() => {
    if (open) {
      setRecents(getRecentCountries())
      setQuery('')
    }
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COUNTRIES
    return COUNTRIES.filter((c) => c.toLowerCase().includes(q))
  }, [query])

  const select = (name: string) => {
    pushRecentCountry(name)
    onSelect(name)
    onOpenChange(false)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Choisir le pays">
      <div className="space-y-3">
        {/* Search input */}
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Recherche</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un pays…"
            className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
          />
        </label>

        {/* Recents */}
        {recents.length > 0 && (
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-700">Récents</div>
            <div className="flex flex-wrap gap-2">
              {recents.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs hover:border-neutral-900"
                  onClick={() => select(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* List */}
        <div className="max-h-64 overflow-auto rounded border border-neutral-200 bg-white">
          <ul className="divide-y divide-neutral-100">
            {filtered.length === 0 ? (
              <li className="p-3 text-sm text-neutral-600">Aucun résultat.</li>
            ) : (
              filtered.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => select(c)}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-neutral-50"
                  >
                    {c}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm hover:bg-neutral-50"
          >
            Fermer
          </button>
        </div>
      </div>
    </Modal>
  )
}
