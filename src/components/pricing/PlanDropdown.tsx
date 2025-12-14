/**
 * PlanDropdown.tsx
 * Dropdown selector for choosing a resume plan:
 * - STANDARD $1, PROFESSIONNEL $2, AVANCÉ $3 (FR) and EN equivalents.
 * - Uses Radix DropdownMenu for accessibility and smooth interactions.
 * - Reuses the PrimaryButton visual style for the trigger.
 */

import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../controls/PrimaryButton'
import type { ResumePlan } from '../../types/resume'

/** Props for PlanDropdown */
export interface PlanDropdownProps {
  /** Currently selected plan */
  plan: ResumePlan
  /** Callback when a new plan is selected */
  onSelect: (plan: ResumePlan) => void
  /** Optional trigger label (defaults to i18n steps.three) */
  triggerLabel?: string
  /** Optional extra classes for the trigger button */
  className?: string
  /** Make trigger take full width */
  block?: boolean
}

/**
 * Returns the display label for a plan item with price.
 * Uses i18n dropdown keys if present; falls back to uppercased plan name + price.
 */
function getItemLabel(
  t: ReturnType<typeof useTranslation>['t'],
  plan: ResumePlan
): string {
  const price =
    plan === 'student' ? t('pricing.student.price', '$1')
    : plan === 'pro' ? t('pricing.pro.price', '$2')
    : t('pricing.advanced.price', '$3')

  // Use explicit plan names with i18n-backed fallbacks to match requested labels.
  const name =
    plan === 'student'
      ? t('pricing.simple.name', 'SIMPLE')
      : plan === 'pro'
        ? t('pricing.pro.name', 'PROFESSIONNEL')
        : t('pricing.advanced.name', 'AVANCÉ')

  return `${name} ${price}`
}

/**
 * PlanDropdown
 * Accessible dropdown to choose between Student/Pro/Advanced plans.
 */
export default function PlanDropdown({
  plan,
  onSelect,
  triggerLabel,
  className,
  block,
}: PlanDropdownProps) {
  const { t } = useTranslation()
  const label = triggerLabel ?? t('steps.three', 'Choose model')

  const items: ResumePlan[] = ['student', 'pro', 'advanced']

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <PrimaryButton
          type="button"
          size="sm"
          className={className}
          aria-haspopup="menu"
          aria-expanded="false"
          block={block}
        >
          <span>{label}</span>
          <ChevronDown className="ml-1 h-4 w-4" aria-hidden />
        </PrimaryButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="end"
          className="
            z-50 min-w-[220px] rounded-md border border-neutral-200 bg-white p-1 shadow-lg
            origin-top-right
            transition-opacity transition-transform duration-150
            data-[state=open]:opacity-100 data-[state=closed]:opacity-0
            data-[state=open]:scale-100 data-[state=closed]:scale-95
          "
        >
          {items.map((value) => {
            const active = value === plan
            const text = getItemLabel(t, value)
            return (
              <DropdownMenu.Item
                key={value}
                onSelect={() => onSelect(value)}
                className={`flex cursor-pointer select-none items-center justify-between rounded px-2 py-1.5 text-sm outline-none hover:bg-neutral-100 ${
                  active ? 'font-medium text-neutral-900' : 'text-neutral-700'
                }`}
              >
                <span>{text}</span>
                {active ? (
                  <Check className="h-4 w-4 text-neutral-900" aria-hidden />
                ) : null}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
