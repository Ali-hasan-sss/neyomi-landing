import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

export default function FeaturesPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  redirect(`/${params.locale}/#features`)
}
