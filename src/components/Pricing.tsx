'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { getSubscriptionPlans, SubscriptionPlan } from '@/lib/api'

type Plan = {
  id: string
  title: string
  subtitle: string
  badge: string
  features: string[]
  periodShort: string | null
  sort: number
  productId: string | null
  highlight: boolean
}

function ScrollingFeatures({ features, isHighlight }: { features: string[]; isHighlight: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [shouldScroll, setShouldScroll] = useState(false)
  const [duration, setDuration] = useState(10)

  useEffect(() => {
    if (!wrapperRef.current || !listRef.current) return
    const overflows = listRef.current.scrollHeight > wrapperRef.current.clientHeight
    setShouldScroll(overflows)
    if (overflows) {
      setDuration(Math.max(8, listRef.current.scrollHeight / 25))
    }
  }, [features])

  const listClass = `space-y-2 text-sm leading-6 ${isHighlight ? 'text-white/90' : 'text-gray-700'}`

  const items = features.map((f, idx) => (
    <li key={idx} className="flex items-start gap-2">
      <span aria-hidden className="mt-1">✅</span>
      <span className="text-start">{f}</span>
    </li>
  ))

  return (
    <div ref={wrapperRef} className="relative flex-1 min-h-0 overflow-hidden mt-5">
      <div
        style={shouldScroll ? { animation: `features-scroll ${duration}s linear infinite` } : {}}
        onMouseEnter={e => { if (shouldScroll) (e.currentTarget as HTMLElement).style.animationPlayState = 'paused' }}
        onMouseLeave={e => { if (shouldScroll) (e.currentTarget as HTMLElement).style.animationPlayState = 'running' }}
      >
        <ul ref={listRef} className={listClass}>{items}</ul>
        {shouldScroll && (
          <ul className={`${listClass} pt-2`} aria-hidden>{items}</ul>
        )}
      </div>

      {shouldScroll && (
        <div
          className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
          style={{
            background: isHighlight
              ? 'linear-gradient(to top, rgba(99,30,220,0.85), transparent)'
              : 'linear-gradient(to top, rgba(255,255,255,0.9), transparent)',
          }}
        />
      )}

      <style>{`
        @keyframes features-scroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  )
}

export default function Pricing() {
  const t = useTranslations('pricing')
  const locale = useLocale()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getSubscriptionPlans(locale)
      .then((apiPlans) => {
        const mappedPlans: Plan[] = apiPlans
          .sort((a, b) => a.sort - b.sort)
          .map((apiPlan) => {
            const features = apiPlan.features[locale as keyof typeof apiPlan.features] || apiPlan.features.en
            return {
              id: apiPlan.id,
              title: apiPlan.title[locale as keyof typeof apiPlan.title] || apiPlan.title.en,
              subtitle: apiPlan.subtitle[locale as keyof typeof apiPlan.subtitle] || apiPlan.subtitle.en,
              badge: apiPlan.badge[locale as keyof typeof apiPlan.badge] || apiPlan.badge.en,
              features: Array.isArray(features) ? features : [],
              periodShort: apiPlan.periodShort ? (apiPlan.periodShort[locale as keyof typeof apiPlan.periodShort] || apiPlan.periodShort.en) : null,
              sort: apiPlan.sort,
              productId: apiPlan.productId,
              highlight: apiPlan.sort === 1,
            }
          })
        setPlans(mappedPlans)
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

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {plans.map((p) => {
              const isHighlight = p.highlight
              return (
                <div
                  key={p.id}
                  className={[
                    'relative rounded-2xl p-6 md:p-7 transition-all duration-300 cursor-default flex flex-col',
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

                  {/* Subtitle */}
                  {p.subtitle && (
                    <p className={`text-sm mb-4 ${isHighlight ? 'text-white/80' : 'text-gray-600'}`}>
                      {p.subtitle}
                    </p>
                  )}

                  {/* Features — grows to fill space, scrolls if content overflows */}
                  <ScrollingFeatures features={p.features} isHighlight={isHighlight} />

                  {/* CTA — always pinned to bottom, button always at same height */}
                  <div className="mt-6 shrink-0 flex flex-col-reverse gap-2">
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
                      <p className={`text-xs ${isHighlight ? 'text-white/80' : 'text-gray-500'}`}>
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
