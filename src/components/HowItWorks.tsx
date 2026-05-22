'use client'

import LottieClient from './LottieClient'
import { useTranslations } from 'next-intl'

const STEP_NUMBERS = [0, 1, 2, 3] as const

export default function HowItWorks() {
  const t = useTranslations('how')

  return (
    <div className="how-wrap">
      {/* Title + intro */}
      <div className="how-head">
        <h2 className="h2 how-title">{t('title')}</h2>
        <p className="how-sub">{t('sub')}</p>
      </div>

      {/* Steps grid */}
      <div className="how-steps">
        {STEP_NUMBERS.map((i) => (
          <div key={i} className="how-card card">
            <div className="how-badge">{i + 1}</div>
            <div className="how-card-copy">
              <h3 className="h3 how-card-title">{t(`steps.${i}.title`)}</h3>
              <p className="how-card-body">{t(`steps.${i}.body`)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lottie centered below */}
      <div className="how-art">
        <div className="how-lottie-wrap">
          <LottieClient
            src="https://assets9.lottiefiles.com/packages/lf20_2ks3pjua.json"
            className="how-lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  )
}
