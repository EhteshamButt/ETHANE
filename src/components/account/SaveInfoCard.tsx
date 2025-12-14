/** 
 * SaveInfoCard.tsx
 * Lets users save their email/profile/CV locally after payment. 
 * - On success, calls onSaved to prompt sharing.
 */

import React, { useState } from 'react'
import PrimaryButton from '../controls/PrimaryButton'
import { saveProfile } from '../../lib/storage'
import { useTranslation } from 'react-i18next'

export interface SaveInfoCardProps {
  email?: string
  country?: string
  data: any
  withPhoto: boolean
  plan: 'student' | 'pro' | 'advanced'
  onSaved?: () => void
}

export default function SaveInfoCard({ email = '', country, data, withPhoto, plan, onSaved }: SaveInfoCardProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState(email)
  const [saving, setSaving] = useState(false)
  const [ok, setOk] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const onSave = async () => {
    setSaving(true)
    setErr(null)
    try {
      saveProfile({ email: value, country, data, withPhoto, plan })
      setOk(true)
      onSaved?.()
    } catch {
      setErr('Une erreur est survenue lors de la sauvegarde.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white/90 p-4">
      <h4 className="text-sm font-semibold text-neutral-900">Sauvegarder mes informations</h4>
      <p className="mt-1 text-sm text-neutral-700">
        Enregistrées localement sur cet appareil (e-mail, pays, préférences et données du CV).
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">E-mail</span>
          <input
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="vous@exemple.com"
            className="u-input w-full"
          />
        </label>
        <PrimaryButton onClick={onSave} disabled={saving || !value} className="md:self-end">
          {saving ? '…' : t('common.save', 'Save')}
        </PrimaryButton>
      </div>
      {ok ? <p className="mt-2 text-sm text-emerald-700">Informations enregistrées.</p> : null}
      {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
    </div>
  )
}
