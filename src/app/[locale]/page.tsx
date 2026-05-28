import Header from '@/components/Header'
import Hero from '@/components/Hero'
import LottieFeature from '@/components/LottieFeature'
import CounterSection from '@/components/CounterSection'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonilas'
import Pricing from '@/components/Pricing'
import SupportFaqsFromFirestore from '@/components/SupportFaqsFromFirestore'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import RevealSection from '@/components/RevealSection'
import ErrorBoundary from '@/components/ErrorBoundary'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)
  const t = await getTranslations()

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <Hero />

        {/* FEATURE STACK */}
        <section id="features" className="section">
          <div className="container stack">
            <RevealSection>
              <h2 className="h2 section-title-lg">
                {t('sections.featuresTitle')}
              </h2>
            </RevealSection>

            <LottieFeature
              side="left"
              title={t('features.items.templates.title')}
              text={t('features.items.templates.desc')}
              animationKey="chores"
            />

            <LottieFeature
              side="right"
              title={t('features.items.points.title')}
              text={t('features.items.points.desc')}
              animationKey="rewards"
            />

            <LottieFeature
              side="left"
              title={t('features.items.streaks.title')}
              text={t('features.items.streaks.desc')}
              animationKey="reminders"
            />

            <LottieFeature
              side="right"
              title={t('features.items.notifications.title')}
              text={t('features.items.notifications.desc')}
              animationKey="chores"
            />

            <LottieFeature
              side="left"
              title={t('features.items.secureChat.title')}
              text={t('features.items.secureChat.desc')}
              animationKey="rewards"
            />
          </div>
        </section>

        {/* LIVE STATS */}
        <CounterSection />

        {/* HOW IT WORKS */}
        <section id="how" className="section">
          <div className="container">
            <RevealSection>
              <HowItWorks />
            </RevealSection>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section">
          <div className="container">
            <RevealSection>
              <Testimonials />
            </RevealSection>
          </div>
        </section>

        {/* PRICING */}
        <Pricing />

        {/* FAQS */}
        <section id="faqs" className="section">
          <div className="container">
            <RevealSection>
              <ErrorBoundary>
                <SupportFaqsFromFirestore />
              </ErrorBoundary>
            </RevealSection>
          </div>
        </section>

        {/* CONTACT */}
        <ContactForm />
      </main>

      <Footer />
    </>
  )
}
