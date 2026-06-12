'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import { getSubscriptionPlans } from '@/lib/api'
import { mapSubscriptionPlans, type DisplayPlan } from '@/lib/plans'

export default function Pricing() {
  const t = useTranslations('pricing')
  const locale = useLocale()
  const [plans, setPlans] = useState<DisplayPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getSubscriptionPlans(locale)
      .then((apiPlans) => {
        setPlans(mapSubscriptionPlans(apiPlans, locale, t('priceFree')))
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching subscription plans:', err)
        setError(err instanceof Error ? err.message : 'Failed to load plans')
        setLoading(false)
      })
  }, [locale])

  return (
    <section id="pricing" className="section alt relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 start-1/4 h-64 w-64 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(120px 120px at 50% 50%, #8b5cf6, transparent)' }}
        />
        <div
          className="absolute -bottom-24 end-1/4 h-64 w-64 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(120px 120px at 50% 50%, #06b6d4, transparent)' }}
        />
      </div>

      <div className="container relative">
        <div className="text-center mb-10">
          <h2 className="section-title text-balance">{t('title')}</h2>
          <p className="opacity-80 mt-2 text-balance">{t('subtitle')}</p>
        </div>

        {loading ? (
          <div className="text-center py-10 opacity-70">{t('loading')}</div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 font-semibold">{t('loadError')}</p>
            <p className="text-sm mt-2 opacity-70">{error}</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-10 opacity-70">{t('empty')}</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((p) => {
              const isHighlight = p.highlight
              return (
                <div
                  key={p.id}
                  className={[
                    'relative rounded-2xl p-6 md:p-7 transition-all duration-300 cursor-default',
                    isHighlight
                      ? 'shadow-xl text-white hover:-translate-y-2.5 hover:-rotate-[0.2deg]'
                      : 'bg-white/70 backdrop-blur shadow-md hover:-translate-y-2',
                  ].join(' ')}
                  style={{
                    background: isHighlight
                      ? 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)'
                      : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    {p.badge && (
                      <span
                        className={[
                          'ms-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                          isHighlight ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-600',
                        ].join(' ')}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {p.subtitle && (
                    <p className={`text-sm mb-3 ${isHighlight ? 'text-white/80' : 'text-gray-600'}`}>
                      {p.subtitle}
                    </p>
                  )}

                  <div className={`mb-4 ${isHighlight ? 'text-white' : 'text-violet-700'}`}>
                    <span className="text-3xl font-bold tracking-tight">{p.priceLabel}</span>
                    {p.periodShort && (
                      <span
                        className={`ms-1 text-sm font-medium ${
                          isHighlight ? 'text-white/80' : 'text-gray-500'
                        }`}
                      >
                        / {p.periodShort}
                      </span>
                    )}
                  </div>

                  <ul
                    className={`mt-5 space-y-2 text-sm leading-6 ${
                      isHighlight ? 'text-white/90' : 'text-gray-700'
                    }`}
                  >
                    {p.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span aria-hidden className="mt-1">✅</span>
                        <span className="text-start">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <a
                      className={[
                        'btn w-full rounded-xl py-2.5 text-center font-semibold transition',
                        isHighlight
                          ? 'bg-white/90 text-gray-900 hover:bg-white'
                          : 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90',
                      ].join(' ')}
                      href="#contact"
                    >
                      {p.productId ? t('cta.upgrade') : t('cta.startFree')}
                    </a>

                    {p.productId && (
                      <p className={`mt-2 text-xs ${isHighlight ? 'text-white/80' : 'text-gray-500'}`}>
                        {t('trialNote')}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
