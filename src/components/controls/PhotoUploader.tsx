/** 
 * PhotoUploader.tsx
 * Simple, accessible image uploader with immediate preview.
 * - Accepts local image files via input type="file".
 * - Validates type and size (default 5MB).
 * - Emits a data URL (base64) to integrate with existing `photoUrl` string field.
 * - Clear call-to-action area with dashed border and icons to prompt users.
 */

import React, { useRef, useState } from 'react'
import { Upload, Image as ImageIcon, Trash2 } from 'lucide-react'

/** Props for the PhotoUploader */
export interface PhotoUploaderProps {
  /** Visible label shown above the upload area */
  label: string
  /** Current image value (data URL or http URL). Empty means none selected. */
  value?: string
  /** Callback when user selects or clears image. Pass null to clear. */
  onChange: (dataUrl: string | null) => void
  /** Accept attribute for input; defaults to images */
  accept?: string
  /** Maximum file size in megabytes (default: 5MB) */
  maxSizeMB?: number
}

/**
 * PhotoUploader
 * A bordered drop-like area to select an image file and preview before submission.
 * Notes:
 * - For simplicity, only click-to-upload is implemented (drag-and-drop could be added later).
 * - Data URLs are emitted to be compatible with existing image consumption logic.
 */
export default function PhotoUploader({
  label,
  value,
  onChange,
  accept = 'image/*',
  maxSizeMB = 5,
}: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState<string | null>(null)

  /** Trigger native file chooser */
  const chooseFile = () => {
    setError(null)
    inputRef.current?.click()
  }

  /** Validate and read selected file as Data URL */
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(null)
    const file = e.target.files?.[0]
    if (!file) return

    // Validation: type + size
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WebP).')
      e.currentTarget.value = ''
      return
    }
    const maxBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxBytes) {
      setError(`The file is too large. Max ${maxSizeMB} MB allowed.`)
      e.currentTarget.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      if (result) onChange(result)
      e.currentTarget.value = ''
    }
    reader.onerror = () => {
      setError('Could not read the selected file. Please try again.')
      e.currentTarget.value = ''
    }
    reader.readAsDataURL(file)
  }

  /** Clear the current image */
  const clearImage = () => {
    onChange(null)
    setError(null)
  }

  return (
    <div className="block">
      <span className="mb-1 block text-sm font-medium text-neutral-800">{label}</span>

      {/* Hidden native input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onFileChange}
        className="sr-only"
        aria-hidden
        tabIndex={-1}
      />

      {value ? (
        <div className="grid grid-cols-[96px_1fr] items-start gap-3 rounded border border-[rgba(98,120,85,0.5)] bg-white p-3">
          <div className="h-24 w-24 overflow-hidden rounded border border-neutral-200 bg-neutral-50">
            {/* Preview of the selected photo */}
            <img
              src={value}
              alt="Selected photo preview"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-neutral-700">
              The selected image will appear on your resume.
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={chooseFile}
                className="inline-flex items-center gap-1 rounded border border-[rgba(98,120,85,0.6)] bg-[rgba(230,235,220,0.6)] px-3 py-1.5 text-sm hover:border-[rgb(60,77,42)]"
              >
                <ImageIcon className="h-4 w-4" />
                Replace
              </button>
              <button
                type="button"
                onClick={clearImage}
                className="inline-flex items-center gap-1 rounded border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:border-red-300"
                aria-label="Remove selected photo"
                title="Remove selected photo"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={chooseFile}
          className="group flex w-full items-center justify-center gap-2 rounded border-2 border-dashed border-[rgba(98,120,85,0.6)] bg-[rgba(230,235,220,0.2)] px-4 py-6 text-sm text-neutral-800 hover:border-[rgb(60,77,42)]"
          aria-label="Upload a profile photo"
          title="Upload a profile photo"
        >
          <Upload className="h-5 w-5 text-neutral-700" />
          <span className="font-medium">Upload photo</span>
        </button>
      )}

      {error ? (
        <div className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  )
}
