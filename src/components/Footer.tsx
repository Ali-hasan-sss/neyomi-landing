'use client'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

export default function Footer() {
  const t = useTranslations('footer')

  const legalLines = [
    t('legalRegister'),
    t('legalHrb'),
    t('legalTaxNumber'),
    t('legalVatId'),
    t('legalManagingDirector'),
    t('legalRegisteredOffice'),
    t('legalAddress'),
  ]

  return (
    <footer className="footer">
      <div className="container foot-inner">
        <div className="foot-top">
          <div className="foot-brand">Neyome</div>

          <nav className="foot-nav">
            <Link href="/about" className="foot-link">{t('about')}</Link>
            <Link href="/privacy" className="foot-link">{t('privacy')}</Link>
            <Link href="/terms" className="foot-link">{t('terms')}</Link>
            <Link href="/#faqs" className="foot-link">{t('faqs')}</Link>
          </nav>

          <div className="foot-copy">© {new Date().getFullYear()} Neyome</div>
        </div>

        <div className="foot-legal">
          <p className="foot-legal-title">{t('legalTitle')}</p>
          <address className="foot-legal-body">
            <strong className="foot-legal-company">{t('legalCompany')}</strong>
            <ul className="foot-legal-list">
              {legalLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </address>
        </div>
      </div>
    </footer>
  )
}
