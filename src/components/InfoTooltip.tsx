/** 
 * InfoTooltip.tsx
 * Petit composant d'info-bulle accessible pour afficher une aide contextuelle.
 * - Utilise Radix Tooltip et l'icône Info de lucide-react.
 * - Props: text (contenu), side (option), className (option).
 */

import * as Tooltip from '@radix-ui/react-tooltip'
import { Info } from 'lucide-react'

/** Props du composant */
interface InfoTooltipProps {
  /** Texte affiché dans l'infobulle */
  text: string
  /** Position préférée de l'infobulle (top par défaut) */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Classes supplémentaires pour le bouton icône */
  className?: string
}

/**
 * InfoTooltip
 * Affiche une icône "i" avec une infobulle au survol/focus.
 */
export function InfoTooltip({ text, side = 'top', className }: InfoTooltipProps) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label="Informations"
            className={`inline-flex h-5 w-5 items-center justify-center rounded text-neutral-600 hover:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-black/30 ${className || ''}`}
          >
            <Info className="h-4 w-4" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            className="max-w-xs rounded bg-neutral-900 px-2 py-1 text-xs text-white shadow-lg"
          >
            {text}
            <Tooltip.Arrow className="fill-neutral-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default InfoTooltip
