import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import PaymentResult from '@/components/PaymentResult'
import { locales, type Locale } from '@/i18n/config'

const TITLES: Record<Locale, string> = {
  en: 'Payment not completed — Neyome',
  ar: 'لم يكتمل الدفع — نيوم',
  de: 'Zahlung nicht abgeschlossen — Neyome',
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : 'en') as Locale
  return {
    title: TITLES[locale],
    robots: { index: false, follow: false },
  }
}

export default function PaymentFailedPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  return <PaymentResult locale={params.locale} variant="failed" />
}
