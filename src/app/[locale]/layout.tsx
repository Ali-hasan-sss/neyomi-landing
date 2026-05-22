import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import BouncingBalls from '@/components/BouncingBalls'
import '../globals.css'

const META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Neyome — Family Tasks & Rewards',
    description:
      'Assign chores, build habits, and let kids redeem points for parent-approved rewards — without the daily nagging.',
  },
  ar: {
    title: 'نيوم — مهام العائلة والمكافآت',
    description:
      'وزّع المهام، ابنِ العادات، ودع أطفالك يستبدلون النقاط بمكافآت يوافق عليها الأهل — بدون توتر يومي.',
  },
  de: {
    title: 'Neyome — Familienaufgaben & Belohnungen',
    description:
      'Hausaufgaben vergeben, Gewohnheiten aufbauen und Kindern erlauben, Punkte gegen von Eltern genehmigte Belohnungen einzulösen.',
  },
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : 'en') as Locale
  const { title, description } = META[locale]
  return {
    metadataBase: new URL('https://neyome.app'),
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale === 'ar' ? 'ar_SA' : locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
      siteName: 'Neyome',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
        de: '/de',
      },
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params
  if (!locales.includes(locale as Locale)) notFound()

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <head>
        {/* Dark-mode FOUC prevention — runs before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark')})()`
          }}
        />
      </head>
      <body className="relative">
        <NextIntlClientProvider messages={messages}>
          <BouncingBalls />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
