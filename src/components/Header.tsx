'use client'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/navigation'
import LangSwitcher from './LangSwitcher'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()

  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <Link href="/" className="brand">Neyome</Link>

          <div className="links">
            <Link
              href="/about"
              className={`link ${pathname === '/about' ? 'font-extrabold' : ''}`}
            >
              {t('about')}
            </Link>
            <Link
              href="/features"
              className={`link ${pathname === '/features' ? 'font-extrabold' : ''}`}
            >
              {t('features')}
            </Link>

            <span className="sep" />

            <a href="#pricing" className="link">{t('pricing')}</a>
            <a href="#faqs" className="link">{t('faqs')}</a>

            <LangSwitcher />
            <ThemeToggle />

            <a href="#contact" className="btn btn-pill btn-glass">
              {t('login')}
            </a>
            <a href="#contact" className="btn btn-pill btn-primary">
              {t('getStarted')}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
