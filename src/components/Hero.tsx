'use client'

import LottieClient from './LottieClient'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="hero">
      <div className="container">
        {/* Copy block */}
        <div className="hero-center">
          <p className="kicker">{t('kicker')}</p>

          <h1 className="h1 hero-title">
            {t('titleA')}
            <span className="grad">{t('titleB')}</span>
          </h1>

          <p className="hero-sub">{t('sub')}</p>

          <div className="cta-row">
            <a className="btn btn-pill btn-primary" href="#pricing">
              {t('ctaPrimary')}
            </a>
            <a className="btn btn-pill btn-outline" href="#how">
              {t('ctaSecondary')}
            </a>
          </div>

          <div className="badge-row">
            <span className="pill">{t('badge.multi')}</span>
            <span className="pill">{t('badge.apps')}</span>
            <span className="pill">{t('badge.control')}</span>
            <span className="pill">{t('badge.streaks')}</span>
          </div>

          <div className="proof">
            <div className="stars" aria-hidden="true">★★★★★</div>
            <span className="proof-text">{t('social')}</span>
          </div>
        </div>

        {/* Lottie framed below, centered */}
        <div className="hero-art">
          <div className="hero-lottie-wrap">
            <LottieClient
              src="https://assets10.lottiefiles.com/packages/lf20_x62chJ.json"
              className="hero-lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </section>
  )
}
