import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutUsFromFirestore from '@/components/AboutUsFromFirestore'
import ErrorBoundary from '@/components/ErrorBoundary'
import { setRequestLocale } from 'next-intl/server'

export default function AboutPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <ErrorBoundary>
          <AboutUsFromFirestore />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
