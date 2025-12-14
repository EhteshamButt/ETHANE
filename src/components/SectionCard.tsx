/**
 * SectionCard.tsx
 * Reusable, accessible section wrapper component that standardizes the visual style
 * across Experience, Education, Certifications, and Career Highlights.
 *
 * - Provides a unified card surface, clear heading area, optional icon, and actions slot.
 * - Styling via CSS Modules to ensure consistent look and maintainability.
 */

import React from 'react'
import styles from './SectionCard.module.css'

/** Props for SectionCard */
export interface SectionCardProps {
  /** Visible section title */
  title: string
  /** Optional decorative icon element (e.g., lucide-react icon) */
  icon?: React.ReactNode
  /** Optional actions node aligned to the right in the header (e.g., buttons) */
  actions?: React.ReactNode
  /** Optional id for aria-labelledby usage if needed */
  id?: string
  /** Section content */
  children: React.ReactNode
  /** Optional extra className */
  className?: string
}

/**
 * SectionCard
 * Consistent section surface with heading, optional icon, and content area.
 */
export default function SectionCard({
  title,
  icon,
  actions,
  id,
  children,
  className
}: SectionCardProps) {
  return (
    <section className={[styles.card, className].filter(Boolean).join(' ')} aria-labelledby={id}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          {icon ? <span className={styles.iconBadge} aria-hidden="true">{icon}</span> : null}
          <h3 id={id} className={styles.title}>
            {title}
          </h3>
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  )
}
