'use client'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="footer">
      <div className="container foot-inner">
        <div className="foot-brand">Neyome</div>

        <nav className="foot-nav">
          <Link href="/about" className="foot-link">{t('about')}</Link>
          <Link href="/privacy" className="foot-link">{t('privacy')}</Link>
          <Link href="/terms" className="foot-link">{t('terms')}</Link>
          <a href="#faqs" className="foot-link">{t('faqs')}</a>
        </nav>

        <div className="foot-copy">© {new Date().getFullYear()} Neyome</div>
      </div>
    </footer>
  )
}
