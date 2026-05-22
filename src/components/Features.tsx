'use client'

import { useTranslations } from 'next-intl'

const FEATURE_KEYS = ['templates', 'points', 'streaks', 'approvals', 'notifications', 'multilang'] as const

export default function Features() {
  const t = useTranslations('features.items')
  const ts = useTranslations('sections')

  return (
    <section id="features" className="section">
      <div className="container">
        <h2 className="section-title">{ts('featuresTitle')}</h2>

        <div className="features-grid">
          {FEATURE_KEYS.map((key) => (
            <div className="feature-card card" key={key}>
              <h3>{t(`${key}.title`)}</h3>
              <p>{t(`${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
