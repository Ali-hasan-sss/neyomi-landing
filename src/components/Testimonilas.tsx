'use client'

import { useTranslations } from 'next-intl'

const INDICES = [0, 1, 2] as const

export default function Testimonials() {
  const t = useTranslations('testimonials')

  return (
    <div className="testimonials-wrap">
      <h2 className="h2 section-title-lg">{t('title')}</h2>

      <div className="testimonials">
        {INDICES.map((i) => (
          <blockquote key={i} className="card testi-card">
            <p className="testi-quote" dir="auto">"{t(`items.${i}.quote`)}"</p>
            <footer className="testi-foot">
              <span className="dash" aria-hidden>—</span>
              <span className="name"><bdi>{t(`items.${i}.name`)}</bdi></span>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  )
}
