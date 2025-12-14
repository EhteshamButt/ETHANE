/**
 * MonthInput.tsx
 * Compact month (YYYY-MM or "Present") input with size variants.
 *
 * Purpose:
 * - Provide a small, subordinate control for date fields like "Début" and "Fin".
 * - Accept both YYYY-MM strings and the literal "Present".
 * - Avoid strict typing on onChange to remain compatible with existing call sites.
 */

import React, { useId } from 'react'

/** Props for MonthInput */
export interface MonthInputProps {
  /** Visible label shown above the input */
  label?: string
  /** Current value (expects YYYY-MM or "Present") */
  value?: string
  /**
   * Change handler (receives the next string value; event passed as second arg for compatibility).
   * We keep a relaxed signature to avoid breaking existing usages that expect either (value) or (event).
   */
  onChange?: (value: string, ev?: React.ChangeEvent<HTMLInputElement>) => void
  /** Placeholder hint (defaults to "YYYY-MM or Present") */
  placeholder?: string
  /** Disabled state */
  disabled?: boolean
  /** Required flag (affects aria-invalid if omitted in parents) */
  required?: boolean
  /** Optional input name */
  name?: string
  /** Optional id (auto-generated when not provided) */
  id?: string
  /** Size variant */
  size?: 'sm' | 'md'
  /** Extra className to append */
  className?: string
  /** ARIA invalid (if driven by parent validation) */
  ariaInvalid?: boolean
}

/**
 * MonthInput
 * Compact input that accepts "YYYY-MM" or "Present".
 * - Uses text type to allow the literal "Present" value as used across the app.
 * - Provides a 'sm' variant for reduced visual prominence in sub-forms.
 */
export default function MonthInput({
  label,
  value,
  onChange,
  placeholder = 'YYYY-MM or Present',
  disabled,
  required,
  name,
  id,
  size = 'md',
  className,
  ariaInvalid,
}: MonthInputProps) {
  const autoId = useId()
  const inputId = id || autoId

  const sizeClasses =
    size === 'sm'
      ? 'min-h-[36px] py-1.5 text-sm'
      : '' // default inherits from theme (min-height 44px)

  const classes = ['u-input w-full', sizeClasses, className].filter(Boolean).join(' ')

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Emit both value and event for backward compatibility
    onChange?.(e.target.value, e)
  }

  return (
    <label className="block">
      {label ? (
        <span className="mb-1 block text-xs font-medium text-neutral-800">{label}</span>
      ) : null}
      <input
        id={inputId}
        name={name}
        type="text"
        inputMode="text"
        autoComplete="off"
        value={value ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={ariaInvalid}
        className={classes}
        // Basic pattern: YYYY-MM or Present (loose; real validation handled upstream)
        pattern="^\d{4}-(0[1-9]|1[0-2])$|^Present$"
        title="Format: YYYY-MM (e.g., 2024-06) or Present"
      />
    </label>
  )
}
