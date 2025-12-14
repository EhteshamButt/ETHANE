/**
 * ColorPaletteSelector.tsx
 * Sélecteur de palette (clair, midnight, charcoal) avec échantillons.
 * - Composant fonctionnel réutilisable.
 * - Internationalisé via i18n (labels fournis par l'appelant).
 */

import React from 'react'

export type CvTheme = 'light' | 'midnight' | 'charcoal'

export interface ColorPaletteSelectorProps {
  /** Valeur actuelle du thème */
  value: CvTheme
  /** Callback changement de thème */
  onChange: (v: CvTheme) => void
  /** Libellé visible */
  label: string
  /** Libellés des options */
  options: { value: CvTheme; label: string }[]
}

/**
 * Rend un groupe de radios stylés avec échantillons de couleurs.
 */
export default function ColorPaletteSelector({
  value,
  onChange,
  label,
  options,
}: ColorPaletteSelectorProps) {
  const swatch: Record<CvTheme, { bg: string; border: string; dot: string }> = {
    light: { bg: 'bg-white', border: 'border-neutral-200', dot: 'bg-neutral-900' },
    midnight: { bg: 'bg-[#0f172a]', border: 'border-[#334155]', dot: 'bg-[#38bdf8]' },
    charcoal: { bg: 'bg-[#111827]', border: 'border-[#374151]', dot: 'bg-[#34d399]' },
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-neutral-800">{label}</span>
      <div className="flex items-center gap-1.5">
        {options.map((opt) => {
          const isActive = value === opt.value
          const s = swatch[opt.value]
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              title={opt.label}
              aria-pressed={isActive}
              className={`relative h-7 w-9 rounded border ${s.bg} ${s.border} ring-offset-1 transition focus:outline-none focus:ring-2 focus:ring-black/20`}
            >
              {isActive ? (
                <span
                  className={`absolute inset-0 m-auto h-2 w-2 rounded-full ${s.dot}`}
                  aria-hidden
                />
              ) : null}
              <span className="sr-only">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
