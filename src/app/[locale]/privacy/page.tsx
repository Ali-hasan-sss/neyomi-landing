import PolicyFromFirestore from '@/components/PolicyFromFirestore'
import ErrorBoundary from '@/components/ErrorBoundary'
import { setRequestLocale } from 'next-intl/server'

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  return (
    <ErrorBoundary>
      <PolicyFromFirestore type="privacy" />
    </ErrorBoundary>
  )
}
