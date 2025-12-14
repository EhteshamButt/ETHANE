/** 
 * PlanBadge.tsx
 * Small, reusable badge showing the active plan in the top corner of a card/preview.
 * - Color-coded per plan: Student (blue), Pro (charcoal), Advanced (green).
 * - Accessible (strong contrast), responsive-friendly (compact and unobtrusive).
 */

import React from 'react'
import type { ResumePlan } from '../types/resume'

/** Props for PlanBadge */
export interface PlanBadgeProps {
  /** Active plan value ('student' | 'pro' | 'advanced') */
  plan: ResumePlan
  /** Optional explicit label to render; if not provided, caller can localize before passing */
  label?: string
  /** Optional extra classes (e.g., to override position) */
  className?: string
  /** Corner positioning helper (defaults to top-right) */
  position?: 'top-right' | 'top-left'
}

/** 
 * Returns color classes for each plan ensuring strong contrast and visual identity.
 */
function classesForPlan(plan: ResumePlan) {
  switch (plan) {
    case 'student':
      return 'bg-sky-600 text-white ring-sky-600/20'
    case 'pro':
      return 'bg-neutral-900 text-white ring-neutral-900/20'
    case 'advanced':
      return 'bg-emerald-600 text-white ring-emerald-600/20'
  }
}

/**
 * PlanBadge component
 * Renders a compact pill with the plan name in the chosen corner.
 */
export function PlanBadge({ plan, label, className, position = 'top-right' }: PlanBadgeProps) {
  const base =
    'pointer-events-none select-none rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide shadow-sm ring-1'
  const color = classesForPlan(plan)
  const pos =
    position === 'top-right'
      ? 'absolute right-2 top-2'
      : 'absolute left-2 top-2'

  return (
    <span className={[base, color, pos, className].filter(Boolean).join(' ')}>
      {label ?? plan}
    </span>
  )
}

export default PlanBadge
