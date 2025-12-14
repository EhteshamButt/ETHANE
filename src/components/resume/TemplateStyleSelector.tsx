/**
 * TemplateStyleSelector.tsx
 * Selector for resume template style (classic / modern).
 * - Simple labeled select input.
 * - Typed props with union for allowed values.
 */

interface Props {
  /** Current template style value */
  value: 'classic' | 'modern'
  /** Emits new template style */
  onChange: (v: 'classic' | 'modern') => void
  /** Visible label for the control */
  label: string
}

/**
 * TemplateStyleSelector
 * Renders a labeled select with options: Classic / Modern.
 */
export function TemplateStyleSelector({ value, onChange, label }: Props) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as 'classic' | 'modern')}
        className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm"
      >
        <option value="classic">Classic</option>
        <option value="modern">Modern</option>
      </select>
    </label>
  )
}

export default TemplateStyleSelector
