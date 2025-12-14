/**
 * PrimaryButton.tsx
 * Bouton primaire réutilisable identique à « Commencer » (fond olive, texte blanc).
 * - Garantit un contraste fort (blanc sur #2F4F2A).
 * - Variantes de taille (sm, md, lg) et largeur (block).
 */

import React from 'react'
import styles from './PrimaryButton.module.css'

/** Taille du bouton */
export type ButtonSize = 'sm' | 'md' | 'lg'

/** Props du bouton primaire */
export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Taille du bouton (par défaut: md) */
  size?: ButtonSize
  /** Pleine largeur */
  block?: boolean
  /** Enfants (contenu) */
  children: React.ReactNode
  /** Classes supplémentaires optionnelles */
  className?: string
}

/** Bouton primaire style « Commencer » */
export default function PrimaryButton({
  size = 'md',
  block = false,
  className,
  children,
  type = 'button',
  ...rest
}: PrimaryButtonProps) {
  const classes = [styles.button, styles[size], block ? styles.block : '', className]
    .filter(Boolean)
    .join(' ')
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}