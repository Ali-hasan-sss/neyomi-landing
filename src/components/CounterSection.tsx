'use client'
import { useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'

function useCountOnView(
  target: React.RefObject<HTMLSpanElement | null>,
  end: number,
  dur = 1200,
  locale = 'en'
) {
  useEffect(() => {
    const el = target.current
    if (!el) return

    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        const startAt = performance.now()

        const tick = (t: number) => {
          const p = Math.min(1, (t - startAt) / dur)
          const val = Math.floor(end * (1 - Math.pow(1 - p, 3))) // ease-out-cubic
          el.textContent = val.toLocaleString(locale)
          if (p < 1) raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        io.disconnect()
      },
      { threshold: 0.2 }
    )

    io.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [target, end, dur, locale])
}

export default function CounterSection() {
  const t = useTranslations('stats')
  const locale = useLocale()

  const a = useRef<HTMLSpanElement>(null)
  const b = useRef<HTMLSpanElement>(null)
  const c = useRef<HTMLSpanElement>(null)

  useCountOnView(a, 12000, 1200, locale)
  useCountOnView(b, 480000, 1200, locale)
  useCountOnView(c, 97, 1200, locale)

  return (
    <section id="stats" className="section stats">
      <div className="container stats-grid">
        <div className="stat">
          <span className="num"><span ref={a}>0</span>+</span>
          <span className="label">{t('tasks')}</span>
        </div>
        <div className="stat">
          <span className="num"><span ref={b}>0</span></span>
          <span className="label">{t('points')}</span>
        </div>
        <div className="stat">
          <span className="num"><span ref={c}>0</span>%</span>
          <span className="label">{t('organized')}</span>
        </div>
      </div>
    </section>
  )
}
