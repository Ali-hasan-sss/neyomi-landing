import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Link } from '@/navigation'
import type { Locale } from '@/i18n/config'

type Variant = 'success' | 'failed'

const COPY: Record<Locale, Record<Variant, { title: string; body: string; home: string }>> = {
  en: {
    success: {
      title: 'Payment successful',
      body: 'Your subscription is confirmed. Return to the Neyome app — the plan activates within a few moments.',
      home: 'Continue',
    },
    failed: {
      title: 'Payment was not completed',
      body: 'No charge was completed. Return to the Neyome app and try again.',
      home: 'Continue',
    },
  },
  ar: {
    success: {
      title: 'تم الدفع بنجاح',
      body: 'تم تأكيد الاشتراك. ارجع إلى تطبيق نيوم، وستُفعَّل الخطة خلال لحظات.',
      home: 'متابعة',
    },
    failed: {
      title: 'لم يكتمل الدفع',
      body: 'لم يُستكمل الخصم. ارجع إلى تطبيق نيوم وحاول مرة أخرى.',
      home: 'متابعة',
    },
  },
  de: {
    success: {
      title: 'Zahlung erfolgreich',
      body: 'Dein Abo ist bestätigt. Geh zurück zur Neyome-App — der Plan wird in wenigen Augenblicken aktiv.',
      home: 'Weiter',
    },
    failed: {
      title: 'Zahlung nicht abgeschlossen',
      body: 'Es wurde nichts abgebucht. Geh zurück zur Neyome-App und versuche es erneut.',
      home: 'Weiter',
    },
  },
}

export default function PaymentResult({ locale, variant }: { locale: string; variant: Variant }) {
  const lang = (locale === 'ar' || locale === 'de' ? locale : 'en') as Locale
  const copy = COPY[lang][variant]
  const ok = variant === 'success'

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="relative z-10 flex-1">
        <section className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
          <div
            className="mx-auto max-w-lg rounded-3xl border px-8 py-12 text-center"
            style={{
              background: 'color-mix(in oklab, var(--bg) 88%, white)',
              borderColor: 'var(--border)',
              boxShadow: '0 24px 60px color-mix(in oklab, var(--indigo) 12%, transparent)',
            }}
          >
            <div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl font-black text-white"
              style={{
                background: ok
                  ? 'linear-gradient(135deg, var(--mint), var(--cyan))'
                  : 'linear-gradient(135deg, var(--orange), var(--yellow))',
                color: 'var(--ink)',
              }}
              aria-hidden
            >
              {ok ? '✓' : '!'}
            </div>
            <h1 className="h2">{copy.title}</h1>
            <p className="mx-auto max-w-md" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              {copy.body}
            </p>
            <div className="mt-8">
              <Link href="/" className="btn btn-pill btn-primary">
                {copy.home}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
