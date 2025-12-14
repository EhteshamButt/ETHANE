/**
 * SimplePreviewForm.tsx
 * Simple interface in English: form + filtered preview.
 * - Preview only shows fields actually filled (non-empty).
 * - Never auto-completes fields: no inference/AI.
 * - Responsive: form on the left, preview on the right (stacked on mobile).
 */

import { useMemo, useState } from 'react'

/** Structure of the form data */
interface SimpleFormData {
  name: string
  email: string
  phone: string
  message: string
}

/** Initial value: all fields empty */
const initialData: SimpleFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

/**
 * Basic input field with label.
 */
function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  textarea = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  textarea?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-800">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-base outline-none placeholder:text-slate-400 focus:border-blue-500 sm:text-sm"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-base outline-none placeholder:text-slate-400 focus:border-blue-500 sm:text-sm"
        />
      )}
    </label>
  )
}

/**
 * Preview card: clean list of label/value pairs.
 * - Filters out any empty or whitespace-only field.
 */
function PreviewCard({
  data,
  visible,
}: {
  data: SimpleFormData
  visible: boolean
}) {
  // Generate the filtered list of items
  const items = useMemo(
    () =>
      [
        { label: 'Name', value: data.name },
        { label: 'Email', value: data.email },
        { label: 'Phone', value: data.phone },
        { label: 'Message', value: data.message },
      ].filter((it) => !!it.value && it.value.trim().length > 0),
    [data]
  )

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Preview</h3>
        <span
          className={`text-xs ${
            visible ? 'text-blue-700' : 'text-slate-500'
          }`}
        >
          {visible ? 'Generated' : 'Pending'}
        </span>
      </div>

      {!visible ? (
        <p className="text-sm text-slate-600">
          Click “Generate preview” to see your entered information.
        </p>
      ) : items.length === 0 ? (
        <p className="text-sm text-slate-600">No information provided.</p>
      ) : (
        <dl className="mt-1 space-y-2">
          {items.map((it) => (
            <div key={it.label} className="grid grid-cols-[120px_1fr] items-baseline gap-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {it.label}
              </dt>
              <dd className="text-sm text-slate-800">{it.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}

/**
 * SimplePreviewForm
 * Main container: handles form state and preview.
 * - showPreview controls preview visibility.
 * - Preview updates dynamically after first generation.
 */
export default function SimplePreviewForm() {
  const [data, setData] = useState<SimpleFormData>(initialData)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <section
      aria-label="Form with filtered preview"
      className="rounded-lg border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 md:p-5"
    >
      <div className="mb-3">
        <h2 className="text-base font-semibold text-slate-900">
          Form with preview
        </h2>
        <p className="mt-1 text-sm text-slate-700">
          Enter your information then click “Generate preview.” The preview displays only fields you filled. No fields are auto-completed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Column: form */}
        <div className="space-y-3">
          <Field
            label="Name"
            value={data.name}
            onChange={(v) => setData((d) => ({ ...d, name: v }))}
            placeholder="Your name"
          />
          <Field
            label="Email"
            value={data.email}
            onChange={(v) => setData((d) => ({ ...d, email: v }))}
            type="email"
            placeholder="you@example.com"
          />
          <Field
            label="Phone"
            value={data.phone}
            onChange={(v) => setData((d) => ({ ...d, phone: v }))}
            placeholder="+1 555 123 4567"
          />
          <Field
            label="Message"
            value={data.message}
            onChange={(v) => setData((d) => ({ ...d, message: v }))}
            placeholder="Your message..."
            textarea
          />

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Generate preview
            </button>
          </div>
        </div>

        {/* Column: preview */}
        <div>
          <PreviewCard data={data} visible={showPreview} />
        </div>
      </div>
    </section>
  )
}
