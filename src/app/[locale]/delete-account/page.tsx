import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { locales, type Locale } from '@/i18n/config'

const SUPPORT_EMAIL = 'support@neyome.com'

const COPY: Record<
  Locale,
  {
    title: string
    intro: string
    stepsTitle: string
    steps: string[]
    deletedTitle: string
    deleted: string[]
    kept: string
    emailCta: string
    subject: string
  }
> = {
  en: {
    title: 'Delete your Neyome account',
    intro:
      'Neyome is published by Genix Tech GmbH. You can delete your account in the app, or ask us by email if you cannot sign in.',
    stepsTitle: 'How to request deletion',
    steps: [
      'Open the Neyome app and sign in.',
      'Open your account settings and choose Delete account, then confirm.',
      'If you are the family owner, this also deletes the family and the other accounts in it.',
      'If you cannot open the app, email us from the address on the account. Use the button below.',
    ],
    deletedTitle: 'What is deleted',
    deleted: [
      'Your profile: name, email, password, PIN, photo, and notification tokens.',
      'For the family owner: members, tasks, rewards, points, streaks, and the subscription. The Stripe subscription is cancelled.',
    ],
    kept: 'Payment records that the law requires us to keep may remain with our payment provider. They are not used to restore the account.',
    emailCta: 'Email support to delete my account',
    subject: 'Delete my Neyome account',
  },
  ar: {
    title: 'حذف حساب نيوم',
    intro:
      'تطبيق نيوم من Genix Tech GmbH. يمكنك حذف الحساب من داخل التطبيق، أو مراسلتنا إذا لم تستطع تسجيل الدخول.',
    stepsTitle: 'خطوات طلب الحذف',
    steps: [
      'افتح تطبيق نيوم وسجّل الدخول.',
      'من إعدادات الحساب اختر حذف الحساب ثم أكّد.',
      'إذا كنت صاحب العائلة، يُحذف مع الحساب أفراد العائلة والمهام والجوائز والنقاط والاشتراك.',
      'إذا لم تستطع فتح التطبيق، أرسل طلباً من البريد المسجّل على الحساب عبر الزر أدناه.',
    ],
    deletedTitle: 'ما الذي يُحذف',
    deleted: [
      'الملف: الاسم، البريد، كلمة المرور، رمز الدخول، الصورة، وتوكنات الإشعارات.',
      'لصاحب العائلة: الأعضاء، المهام، الجوائز، النقاط، السلاسل، والاشتراك. يُلغى اشتراك سترايب.',
    ],
    kept: 'قد تبقى سجلات الدفع التي يلزم الاحتفاظ بها نظاماً لدى مزوّد الدفع. لا تُستخدم لإعادة الحساب.',
    emailCta: 'راسل الدعم لحذف الحساب',
    subject: 'حذف حساب نيوم',
  },
  de: {
    title: 'Neyome-Konto löschen',
    intro:
      'Neyome wird von der Genix Tech GmbH bereitgestellt. Du kannst das Konto in der App löschen oder uns schreiben, wenn du dich nicht anmelden kannst.',
    stepsTitle: 'So beantragst du die Löschung',
    steps: [
      'Öffne die Neyome-App und melde dich an.',
      'Öffne die Kontoeinstellungen, wähle Konto löschen und bestätige.',
      'Als Familieninhaber werden damit auch die Familie und die anderen Konten darin gelöscht.',
      'Wenn du die App nicht öffnen kannst, schreib uns von der E-Mail-Adresse des Kontos über die Schaltfläche unten.',
    ],
    deletedTitle: 'Was gelöscht wird',
    deleted: [
      'Profil: Name, E-Mail, Passwort, PIN, Foto und Benachrichtigungs-Tokens.',
      'Beim Familieninhaber: Mitglieder, Aufgaben, Belohnungen, Punkte, Serien und das Abo. Das Stripe-Abo wird gekündigt.',
    ],
    kept: 'Zahlungsbelege, die wir gesetzlich aufbewahren müssen, können beim Zahlungsanbieter bleiben. Damit wird das Konto nicht wiederhergestellt.',
    emailCta: 'Support um Kontolöschung bitten',
    subject: 'Neyome-Konto löschen',
  },
}

const TITLES: Record<Locale, string> = {
  en: 'Delete your account — Neyome',
  ar: 'حذف الحساب — نيوم',
  de: 'Konto löschen — Neyome',
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (locales.includes(params.locale as Locale) ? params.locale : 'en') as Locale
  return {
    title: TITLES[locale],
    description: COPY[locale].intro,
    robots: { index: true, follow: true },
  }
}

export default function DeleteAccountPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  const locale = (locales.includes(params.locale as Locale) ? params.locale : 'en') as Locale
  const copy = COPY[locale]
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(copy.subject)}`

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="relative z-10 flex-1">
        <section className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
          <article
            className="mx-auto max-w-2xl rounded-3xl border px-8 py-10"
            style={{
              background: 'color-mix(in oklab, var(--bg) 88%, white)',
              borderColor: 'var(--border)',
            }}
          >
            <h1 className="h2">{copy.title}</h1>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{copy.intro}</p>

            <h2 className="h3" style={{ marginTop: '1.75rem' }}>
              {copy.stepsTitle}
            </h2>
            <ol className="mt-3 list-decimal space-y-2 ps-5" style={{ color: 'var(--text)', lineHeight: 1.7 }}>
              {copy.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <h2 className="h3" style={{ marginTop: '1.75rem' }}>
              {copy.deletedTitle}
            </h2>
            <ul className="mt-3 list-disc space-y-2 ps-5" style={{ lineHeight: 1.7 }}>
              {copy.deleted.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              {copy.kept}
            </p>

            <p className="mt-6">
              <a className="btn btn-pill btn-primary" href={mailto}>
                {copy.emailCta}
              </a>
            </p>
            <p className="mt-4">
              <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: 'var(--indigo)', fontWeight: 800 }}>
                {SUPPORT_EMAIL}
              </a>
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  )
}
