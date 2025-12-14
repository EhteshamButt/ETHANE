/** 
 * ThumbnailSheet.tsx
 * Wrapper qui affiche une miniature A4 responsive de son contenu via transform: scale().
 * - Calcule un scale basé sur une largeur de base (A4 ~ 794px à 96dpi).
 * - Garde un ratio 210/297 (A4 portrait) et applique un cadre sobre.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/** Props: render children (votre feuille A4), baseWidth optionnel. */
export interface ThumbnailSheetProps {
  /** Contenu à afficher en miniature (ex: <ResumePreview />). */
  children: React.ReactNode
  /** Largeur de référence pour calcul du scale. */
  baseWidth?: number
}

/**
 * useIsomorphicLayoutEffect
 * Evite un warning SSR; ici l'environnement est client, mais on garde la sémantique.
 */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * ThumbnailSheet
 * Calcule un scale pour fitter la largeur disponible (max 1).
 */
export default function ThumbnailSheet({ children, baseWidth = 794 }: ThumbnailSheetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useIsoLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const next = Math.max(0.2, Math.min(1, w / baseWidth))
      setScale(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [baseWidth])

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className="mx-auto origin-top rounded-md border border-neutral-200 bg-neutral-50 shadow-sm"
        style={{
          width: baseWidth,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
      {/* Espacement pour l'overlay transform (réserve la hauteur réelle) */}
      <div style={{ height: baseWidth * (297 / 210) * scale + 16 }} />
    </div>
  )
}
