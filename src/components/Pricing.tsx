'use client'

import { useTranslations } from 'next-intl'

type PlanKey = 'free' | 'pro' | 'family'

type Plan = {
  key: PlanKey
  highlight?: boolean
  price: string
  per: string
  features: string[]
  ctaKey: string
}

export default function Pricing() {
  const t = useTranslations('pricing')

  const plans: Plan[] = [
    {
      key: 'free',
      price: '0',
      per: t('perMonth'),
      features: [
        t('features.oneFamily'),
        t('features.basicTasks'),
        t('features.notifications'),
      ],
      ctaKey: 'cta.startFree',
    },
    {
      key: 'pro',
      highlight: true,
      price: '4.99',
      per: t('perMonth'),
      features: [
        t('features.unlimitedMembers'),
        t('features.advancedStreaks'),
        t('features.prioritySupport'),
        t('features.secureChat'),
      ],
      ctaKey: 'cta.upgrade',
    },
    {
      key: 'family',
      price: '9.99',
      per: t('perMonth'),
      features: [
        t('features.multipleFamilies'),
        t('features.sharedCatalog'),
        t('features.earlyAccess'),
      ],
      ctaKey: 'cta.contact',
    },
  ]

  return (
    <section id="pricing" className="section alt relative overflow-hidden">
      {/* Ambient glows */}
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

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => {
            const isHighlight = p.highlight
            return (
              <div
                key={p.key}
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
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">{t(`plans.${p.key}.title`)}</h3>
                  {p.key !== 'free' && (
                    <span
                      className={[
                        'ms-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                        isHighlight ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-600',
                      ].join(' ')}
                    >
                      {t('badge.trial')}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="text-4xl md:text-5xl font-bold tracking-tight">
                  <span className={isHighlight ? '' : 'text-gray-900'}>${p.price}</span>
                  <span
                    className={`text-base font-medium opacity-80 ms-1 ${
                      isHighlight ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {p.per}
                  </span>
                </div>

                {/* Features */}
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

                {/* CTA */}
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
                    {t(p.ctaKey)}
                  </a>

                  {p.key !== 'free' && (
                    <p className={`mt-2 text-xs ${isHighlight ? 'text-white/80' : 'text-gray-500'}`}>
                      {t('trialNote')}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
