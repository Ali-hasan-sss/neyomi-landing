import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { setRequestLocale } from 'next-intl/server'

export default function ChangeEmailPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <section className="mx-auto max-w-md">
          <h1 className="h2" style={{ marginBottom: '1.5rem' }}>Change email</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            To change your email address, please contact support or use the Neyome app settings.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
