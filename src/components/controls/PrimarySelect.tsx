/**
 * PrimarySelect.tsx
 * Select réutilisable avec le même look que « Commencer » (fond olive, texte blanc).
 * - Idéal pour les champs « Langue » et « Domaine ».
 */

import React from 'react'
import styles from './PrimarySelect.module.css'

/** Props du sélecteur primaire */
export interface PrimarySelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  /** Valeur actuelle */
  value: string
  /** Callback sur changement (retourne la nouvelle valeur) */
  onChange: (value: string) => void
  /** Enfants: <option>...</option> */
  children: React.ReactNode
  /** Classes supplémentaires */
  className?: string
}

/** Select style « Commencer » */
export default function PrimarySelect({
  value,
  onChange,
  children,
  className,
  ...rest
}: PrimarySelectProps) {
  const classes = [styles.select, className].filter(Boolean).join(' ')
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classes}
      {...rest}
    >
      {children}
    </select>
  )
}