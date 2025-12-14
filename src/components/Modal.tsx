/** 
 * Modal.tsx
 * Generic accessible modal based on Radix Dialog.
 * - Provides a simple shell for a title and body content.
 * - Use for lightweight flows like "Pay before download".
 */

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

/**
 * Props for Modal component.
 */
export interface ModalProps {
  /** Whether the modal is open. */
  open: boolean
  /** Called when open state should change (close button, overlay click, Esc). */
  onOpenChange: (next: boolean) => void
  /** Optional title displayed at the top. */
  title?: string
  /** Modal content. */
  children: React.ReactNode
}

/**
 * Modal
 * Accessible dialog with overlay and centered content.
 */
export function Modal({ open, onOpenChange, title, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-neutral-200 bg-white p-4 shadow-xl"
          aria-label={title}
        >
          <div className="flex items-start justify-between gap-3">
            {title ? (
              <Dialog.Title className="text-base font-semibold text-neutral-900">{title}</Dialog.Title>
            ) : <span aria-hidden className="sr-only">Modal</span>}
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-3">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
