import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PolicyFromFirestore from '@/components/PolicyFromFirestore'
import ErrorBoundary from '@/components/ErrorBoundary'
import { setRequestLocale } from 'next-intl/server'

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="relative z-10 flex-1">
        <ErrorBoundary>
          <PolicyFromFirestore type="privacy" />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
