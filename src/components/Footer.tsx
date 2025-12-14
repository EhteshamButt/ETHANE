/**
 * Footer minimal aligné avec la nouvelle charte.
 * - Surface translucide + bordure.
 * - Lisible, responsive, accessible.
 * - Caché sur mobile, visible sur desktop/tablet.
 */

import { useTranslation } from 'react-i18next'

/** Footer global */
export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  return (
    <footer className="hidden md:block mt-10 border-t border-[var(--border-color)] bg-[var(--surface-opaque)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-[var(--text)] sm:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <img
            src="https://pub-cdn.sider.ai/u/U0E5H7KKOW/web-coder/68c6c0275375a0a7f3b87371/resource/c5aeb0ea-8a6d-4297-9703-cd52a2aeebba.jpg"
            alt={`${t('brand')} logo`}
            loading="lazy"
            className="h-5 w-5 rounded-sm object-cover ring-1 ring-[var(--border-color)]"
          />
          <span className="font-medium text-[var(--text-strong)]">{t('brand')}</span>
          <span>© {year}</span>
        </div>
        <nav className="flex items-center gap-4">
          <a
            href="#how"
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            {t('how.title')}
          </a>
          <a
            href="#"
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            {t('footer.legal')}
          </a>
        </nav>
      </div>
    </footer>
  )
}
