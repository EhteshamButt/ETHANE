/**
 * ShareMenu.tsx
 * Accessible share button + fallback menu to share the site link via email or social networks.
 * - Uses Radix DropdownMenu for keyboard/screen reader support.
 * - Uses Web Share API when available (native system share).
 * - Options: Email, Twitter/X, LinkedIn, Facebook, WhatsApp, Telegram, Copy link.
 */

import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  Share2,
  Mail,
  Link as LinkIcon,
  Twitter,
  Linkedin,
  Facebook,
  Send,
  MessageCircle,
} from 'lucide-react'

/** Supported language codes */
type LangCode = 'fr' | 'en' | 'sw' | 'pt' | 'mg' | 'ar'

/**
 * Local labels (self-contained from global i18n so this component works even if keys are missing).
 */
const LABELS: Record<
  LangCode,
  {
    button: string
    system: string
    copy: string
    copied: string
    email: string
    twitter: string
    linkedin: string
    facebook: string
    whatsapp: string
    telegram: string
    subject: string
    text: string
  }
> = {
  fr: {
    button: 'Partager',
    system: 'Partager via le système',
    copy: 'Copier le lien',
    copied: 'Lien copié',
    email: 'E-mail',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    subject: 'Découvrez Mako',
    text: 'Créez un CV professionnel avec Mako:',
  },
  en: {
    button: 'Share',
    system: 'Share via system',
    copy: 'Copy link',
    copied: 'Link copied',
    email: 'Email',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    subject: 'Check out Mako',
    text: 'Create a professional resume with Mako:',
  },
  sw: {
    button: 'Shiriki',
    system: 'Shiriki kwa mfumo',
    copy: 'Nakili kiungo',
    copied: 'Kiungo kimenakiliwa',
    email: 'Barua pepe',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    subject: 'Tazama Mako',
    text: 'Tengeneza CV ya kitaalamu na Mako:',
  },
  pt: {
    button: 'Compartilhar',
    system: 'Compartilhar pelo sistema',
    copy: 'Copiar link',
    copied: 'Link copiado',
    email: 'Email',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    subject: 'Conheça o Mako',
    text: 'Crie um currículo profissional com o Mako:',
  },
  mg: {
    button: 'Zarao',
    system: 'Zarao amin’ny rafitra',
    copy: 'Adikao ny rohy',
    copied: 'Voakopy ny rohy',
    email: 'Mailaka',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    subject: 'Hijery an’i Mako',
    text: 'Mamolavola CV matihanina amin’ny Mako:',
  },
}

/**
 * Normalize current i18n code to a supported short LangCode.
 */
function resolveLang(code?: string): LangCode {
  const c = (code || 'fr').split('-')[0] as LangCode
  return (['fr', 'en', 'sw', 'pt', 'mg'] as LangCode[]).includes(c) ? c : 'en'
}

/**
 * Build share URLs for each network.
 */
function buildShareLinks(url: string, title: string, text: string) {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(text)
  const s = encodeURIComponent(title)

  return {
    email: `mailto:?subject=${s}&body=${t}%20${u}`,
    twitter: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    whatsapp: `https://api.whatsapp.com/send?text=${t}%20${u}`,
    telegram: `https://t.me/share/url?url=${u}&text=${t}`,
  }
}

/**
 * ShareMenu
 * Button with dropdown for sharing the current page link.
 */
export function ShareMenu() {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const lang = resolveLang(i18n.language)
  const L = LABELS[lang]

  const siteUrl =
    typeof window !== 'undefined' ? window.location.href : 'https://example.com'
  const brand = t('brand', 'Mako')
  const subject = L.subject || brand
  const text = L.text || brand
  const canNativeShare =
    typeof navigator !== 'undefined' && !!(navigator as any).share

  const links = useMemo(
    () => buildShareLinks(siteUrl, subject, text),
    [siteUrl, subject, text]
  )

  /** Copy the current URL to clipboard with small visual feedback. */
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl)
      setCopied(true)
      setOpen(false)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setOpen(false)
      alert(L.copied)
    }
  }

  /** Trigger system/native share when available. */
  const systemShare = async () => {
    if (!canNativeShare) return
    try {
      await (navigator as any).share({
        title: subject || brand,
        text: `${text} ${siteUrl}`,
        url: siteUrl,
      })
      setOpen(false)
    } catch {
      // user canceled: no-op
    }
  }

  /** Open a share URL in a new tab/window (secure). */
  const openShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={L.button}
          title={L.button}
          className="inline-flex items-center gap-2 rounded bg-[rgb(60,77,42)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[rgb(50,64,35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(60,77,42)]/40"
        >
          <Share2 className="h-4 w-4" aria-hidden />
          <span>{copied ? L.copied : L.button}</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={6}
          align="end"
          className="z-50 min-w-[240px] rounded-md border border-neutral-200 bg-white p-1 shadow-lg"
        >
          {canNativeShare ? (
            <DropdownMenu.Item
              onSelect={(e) => {
                e.preventDefault()
                systemShare()
              }}
              className="flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm text-neutral-800 outline-none hover:bg-neutral-100"
            >
              <Share2 className="h-4 w-4" aria-hidden />
              <span>{L.system}</span>
            </DropdownMenu.Item>
          ) : null}

          <DropdownMenu.Item asChild>
            <a
              href={links.email}
              className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-neutral-800 hover:bg-neutral-100"
            >
              <Mail className="h-4 w-4" aria-hidden />
              <span>{L.email}</span>
            </a>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault()
              copyLink()
            }}
            className="flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm text-neutral-800 outline-none hover:bg-neutral-100"
          >
            <LinkIcon className="h-4 w-4" aria-hidden />
            <span>{L.copy}</span>
          </DropdownMenu.Item>

          <div className="my-1 h-px bg-neutral-200" />

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault()
              openShare(links.twitter)
            }}
            className="flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm text-neutral-800 outline-none hover:bg-neutral-100"
          >
            <Twitter className="h-4 w-4" aria-hidden />
            <span>{L.twitter}</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault()
              openShare(links.linkedin)
            }}
            className="flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm text-neutral-800 outline-none hover:bg-neutral-100"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            <span>{L.linkedin}</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault()
              openShare(links.facebook)
            }}
            className="flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm text-neutral-800 outline-none hover:bg-neutral-100"
          >
            <Facebook className="h-4 w-4" aria-hidden />
            <span>{L.facebook}</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault()
              openShare(links.whatsapp)
            }}
            className="flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm text-neutral-800 outline-none hover:bg-neutral-100"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            <span>{L.whatsapp}</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault()
              openShare(links.telegram)
            }}
            className="flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm text-neutral-800 outline-none hover:bg-neutral-100"
          >
            <Send className="h-4 w-4" aria-hidden />
            <span>{L.telegram}</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default ShareMenu
