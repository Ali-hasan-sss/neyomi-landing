'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/navigation'
import { locales, type Locale } from '@/i18n/config'

const LABELS: Record<Locale, string> = {
  en: 'EN',
  ar: 'AR',
  de: 'DE',
}

export default function LangSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(next: Locale) {
    if (next === locale) return
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`lang-btn ${l === locale ? 'active' : ''}`}
          aria-current={l === locale ? 'true' : undefined}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  )
}
