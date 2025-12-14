/**
 * LanguageSwitcher
 * A single-button language selector using Radix DropdownMenu for full keyboard and screen reader support.
 * - Trigger shows the active language short code (e.g., "EN").
 * - Dropdown items display full names (English, Kiswahili, Português, Malagasy).
 */

import { useTranslation } from 'react-i18next'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'

/**
 * Language meta used by the switcher.
 * Keep the list in sync with i18n resources.
 */
const LANGS = [
  { code: 'fr', label: 'FR', full: 'Français (FR)' },
  { code: 'en', label: 'EN', full: 'English (EN)' },
  { code: 'sw', label: 'SW', full: 'Kiswahili (SW)' },
  { code: 'pt', label: 'PT', full: 'Português (PT)' },
  { code: 'mg', label: 'MG', full: 'Malagasy (MG)' },
  { code: 'ar', label: 'AR', full: 'العربية (AR)' },
] as const

type LangCode = typeof LANGS[number]['code']

/**
 * LanguageSwitcher component that exposes a compact trigger and a full dropdown list.
 */
export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  /** Resolve the current language entry (fallback to EN). */
  const current =
    LANGS.find((l) => l.code === (i18n.language as LangCode)) ?? LANGS[0]

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Change language"
          className="inline-flex items-center gap-1 rounded bg-[rgb(60,77,42)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[rgb(50,64,35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(60,77,42)]/40"
        >
          <span className="font-medium">{current.label}</span>
          <ChevronDown className="h-4 w-4" aria-hidden />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={6}
          align="end"
          className="z-50 min-w-[200px] rounded-md border border-neutral-200 bg-white p-1 shadow-lg"
        >
          {LANGS.map((l) => {
            const active = i18n.language === l.code
            return (
              <DropdownMenu.Item
                key={l.code}
                onSelect={() => i18n.changeLanguage(l.code)}
                className={`flex cursor-pointer select-none items-center justify-between rounded px-2 py-1.5 text-sm outline-none hover:bg-neutral-100 ${
                  active ? 'font-medium text-black' : 'text-neutral-700'
                }`}
              >
                <span>{l.full}</span>
                {active ? (
                  <span
                    className="h-2 w-2 rounded-full bg-black"
                    aria-hidden
                  />
                ) : null}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
