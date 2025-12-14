/**
 * QuietButton
 * Discreet, emphasis-free button for low-priority actions such as "+ Add highlight".
 * - No visual highlight in any state (normal, hover, focus, active).
 * - Matches surrounding typography and color palette.
 */

import React from 'react'
import styles from './QuietButton.module.css'

export interface QuietButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: React.ReactNode
  /** Optional extra className */
  className?: string
}

/**
 * QuietButton component
 */
export default function QuietButton({
  children,
  className,
  type = 'button',
  ...rest
}: QuietButtonProps) {
  return (
    <button
      type={type}
      {...rest}
      className={[styles.button, className].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  )
}
