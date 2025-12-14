/** 
 * WhatsAppShareModal.tsx
 * Up to 5 phone numbers; opens WhatsApp chats with a prefilled message.
 * - Provides both per-number share and a bulk attempt (may be blocked by pop-up rules).
 */

import React, { useMemo, useState } from 'react'
import Modal from '../Modal'
import PrimaryButton from '../controls/PrimaryButton'
import { useTranslation } from 'react-i18next'

export interface WhatsAppShareModalProps {
  open: boolean
  onOpenChange: (next: boolean) => void
  defaultMessage?: string
}

function waLinkFor(phone: string, text: string) {
  const p = phone.replace(/[^\d]/g, '') // keep digits
  const t = encodeURIComponent(text)
  return `https://wa.me/${p}?text=${t}`
}

export default function WhatsAppShareModal({ open, onOpenChange, defaultMessage }: WhatsAppShareModalProps) {
  const { t } = useTranslation()
  const [numbers, setNumbers] = useState<string[]>(['', '', '', '', ''])
  const [message, setMessage] = useState(
    defaultMessage ||
      'Hello ! Découvrez ETHAN pour créer un CV pro en quelques minutes : ' +
        (typeof window !== 'undefined' ? window.location.href : 'https://example.com')
  )

  const cleaned = useMemo(() => numbers.map((n) => n.trim()).filter(Boolean), [numbers])
  const canShare = cleaned.length > 0 && !!message.trim()

  const openOne = (n: string) => {
    const url = waLinkFor(n, message)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const openAll = () => {
    // Try to open in sequence; browsers may block multiple popups.
    cleaned.forEach((n, i) => {
      setTimeout(() => openOne(n), i * 150)
    })
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} title={t('share.whatsappTitle', 'Share via WhatsApp')}>
      <div className="space-y-3">
        <p className="text-sm text-neutral-700">
          Saisissez jusqu’à 5 numéros (format international). Un message prérempli sera envoyé avec le lien du site.
        </p>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {numbers.map((v, idx) => (
            <input
              key={idx}
              type="tel"
              inputMode="tel"
              value={v}
              onChange={(e) => {
                const next = [...numbers]
                next[idx] = e.target.value
                setNumbers(next)
              }}
              placeholder="+243 99 999 9999"
              className="u-input"
            />
          ))}
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Message</span>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="u-textarea w-full"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <PrimaryButton onClick={openAll} disabled={!canShare}>
            {t('share.shareAll', 'Share to all')}
          </PrimaryButton>
          {cleaned.map((n) => (
            <button
              key={n}
              onClick={() => openOne(n)}
              className="rounded border border-neutral-300 bg-white px-3 py-2 text-sm hover:bg-neutral-50"
            >
              {t('share.shareTo', { phone: n })}
            </button>
          ))}
        </div>

        <p className="text-xs text-neutral-600">
          Conseil: si votre navigateur bloque les fenêtres, utilisez les boutons individuels.
        </p>
      </div>
    </Modal>
  )
}
