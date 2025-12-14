/**
 * WhatsAppShareModal.tsx
 * Modal to share the site with up to 5 contacts via WhatsApp.
 * - Accepts up to 5 phone numbers.
 * - Prefills message and opens WhatsApp for each individual send.
 */

import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useTranslation } from 'react-i18next'

export interface WhatsAppShareModalProps {
  /** Whether the modal is open. */
  open: boolean
  /** Called when open state should change. */
  onOpenChange: (next: boolean) => void
  /** Default message to prefill. */
  defaultMessage?: string
}

/** Builds a WhatsApp share URL from phone and message. */
function buildWhatsAppUrl(phone: string, message: string): string {
  const clean = phone.replace(/[^\d+]/g, '')
  const text = encodeURIComponent(message)
  return `https://api.whatsapp.com/send?phone=${encodeURIComponent(clean)}&text=${text}`
}

/**
 * WhatsAppShareModal
 * Renders 5 inputs and a message area with individual send buttons.
 */
export default function WhatsAppShareModal({ open, onOpenChange, defaultMessage }: WhatsAppShareModalProps) {
  const { t } = useTranslation()
  const [phones, setPhones] = useState<string[]>(['', '', '', '', ''])
  const [message, setMessage] = useState<string>(defaultMessage || '')

  useEffect(() => {
    if (open) {
      setMessage(defaultMessage || '')
    }
  }, [open, defaultMessage])

  const updatePhone = (idx: number, val: string) => {
    setPhones((arr) => {
      const next = arr.slice()
      next[idx] = val
      return next
    })
  }

  const sendTo = (idx: number) => {
    const phone = phones[idx]?.trim()
    if (!phone) return
    const url = buildWhatsAppUrl(phone, message || '')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} title={t('share.whatsappTitle', 'Share via WhatsApp')}>
      <div className="space-y-3">
        <p className="text-sm text-neutral-700">
          Entrez jusqu’à 5 numéros et envoyez un message pré-rempli avec le lien du site.
        </p>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {phones.map((p, i) => (
            <div key={i} className="flex items-end gap-2">
              <label className="block flex-1">
                <span className="mb-1 block text-sm font-medium">Téléphone {i + 1}</span>
                <input
                  type="tel"
                  value={p}
                  onChange={(e) => updatePhone(i, e.target.value)}
                  placeholder="+243 99 999 9999"
                  className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
                />
              </label>
              <button
                type="button"
                onClick={() => sendTo(i)}
                disabled={!p.trim()}
                className="h-[40px] rounded bg-neutral-900 px-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
              >
                {t('common.send', 'Send')}
              </button>
            </div>
          ))}
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Message</span>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-y rounded border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm hover:bg-neutral-50"
          >
            {t('common.close', 'Close')}
          </button>
        </div>
      </div>
    </Modal>
  )
}
