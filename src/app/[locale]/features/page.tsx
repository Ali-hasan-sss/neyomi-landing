import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Features from '@/components/Features'
import { setRequestLocale } from 'next-intl/server'

export default function FeaturesPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <Features />
      </main>
      <Footer />
    </>
  )
}
