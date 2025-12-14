/** 
 * CountryPickerModal.tsx
 * Modal to select a country from a scrollable list with "recent" section.
 * - Saves recent selections to localStorage.
 * - Emits the chosen country name.
 */

import React, { useMemo, useState } from 'react'
import Modal from '../Modal'
import { loadRecentCountries, pushRecentCountry } from '../../lib/storage'

/** Minimal curated list for demo; can be extended if needed. */
const COUNTRIES = [
  'RDC (Rép. Démocratique du Congo)',
  'Congo (Brazzaville)',
  'Cameroun',
  'Côte d’Ivoire',
  'Sénégal',
  'Mali',
  'Kenya',
  'Ouganda',
  'Tanzanie',
  'Rwanda',
  'Burundi',
  'Afrique du Sud',
  'Maroc',
  'Algérie',
  'Tunisie',
  'Égypte',
  'Nigeria',
  'Ghana',
  'Éthiopie',
  'Zambie',
  'Zimbabwe',
  'Namibie',
  'Botswana',
  'Mozambique',
  'Angola',
  'France',
  'Belgique',
  'Suisse',
  'Portugal',
  'Espagne',
  'Italie',
  'Allemagne',
  'Royaume-Uni',
  'États-Unis',
  'Canada',
  'Brésil',
].sort((a, b) => a.localeCompare(b, 'fr'))

/** Props */
export interface CountryPickerModalProps {
  open: boolean
  onOpenChange: (next: boolean) => void
  onSelect: (country: string) => void
}

/** CountryPickerModal */
export default function CountryPickerModal({ open, onOpenChange, onSelect }: CountryPickerModalProps) {
  const [query, setQuery] = useState('')
  const recents = loadRecentCountries()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COUNTRIES
    return COUNTRIES.filter((c) => c.toLowerCase().includes(q))
  }, [query])

  const handleSelect = (name: string) => {
    pushRecentCountry(name)
    onSelect(name)
    onOpenChange(false)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Sélectionnez votre pays">
      <div className="space-y-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un pays…"
          className="u-input w-full"
          aria-label="Rechercher un pays"
        />

        {recents.length > 0 ? (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-neutral-900">Récents</h4>
            <div className="flex flex-wrap gap-2">
              {recents.map((r) => (
                <button
                  key={r}
                  onClick={() => handleSelect(r)}
                  className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm hover:bg-neutral-50"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <h4 className="mb-2 text-sm font-semibold text-neutral-900">Tous les pays</h4>
          <div className="max-h-64 overflow-auto rounded border border-neutral-200 bg-white">
            <ul>
              {filtered.map((c) => (
                <li key={c} className="border-b last:border-0">
                  <button
                    type="button"
                    onClick={() => handleSelect(c)}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-neutral-50"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-2 text-xs text-neutral-600">Liste défilante. Sélectionnez pour continuer.</p>
        </div>
      </div>
    </Modal>
  )
}
