'use client'

import { useEffect, useRef } from 'react'

type BallState = { x: number; y: number; vx: number; vy: number; size: number }

const BALL_CONFIGS = [
  { cls: 'ball--orange', size: 320, speed: 1.0 },
  { cls: 'ball--coral',  size: 240, speed: 0.9 },
  { cls: 'ball--gold',   size: 160, speed: 1.1 },
  { cls: 'ball--cyan',   size: 200, speed: 0.8 },
  { cls: 'ball--mint',   size: 120, speed: 1.2 },
  { cls: 'ball--ink',    size: 420, speed: 0.7 },
] as const

export default function BouncingBalls() {
  const ballRefs  = useRef<(HTMLDivElement | null)[]>([])
  const rafRef    = useRef<number>(0)
  const stateRef  = useRef<BallState[]>([])
  const boundsRef = useRef({ w: 0, h: 0 })
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const measure = () => {
      boundsRef.current = { w: window.innerWidth, h: window.innerHeight }
    }
    measure()

    stateRef.current = BALL_CONFIGS.map(({ size, speed }) => ({
      x:  Math.random() * Math.max(1, boundsRef.current.w - size),
      y:  Math.random() * Math.max(1, boundsRef.current.h - size),
      vx: (Math.random() * 2 - 1) * (0.06 + 0.08 * speed),
      vy: (Math.random() * 2 - 1) * (0.06 + 0.08 * speed),
      size,
    }))

    stateRef.current.forEach((b, i) => {
      const el = ballRefs.current[i]
      if (el) el.style.transform = `translate(${b.x}px,${b.y}px)`
    })

    const tick = (now: number) => {
      if (document.hidden) {
        lastTimeRef.current = 0
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const dt = lastTimeRef.current === 0
        ? 16
        : Math.min(now - lastTimeRef.current, 50)
      lastTimeRef.current = now

      const { w, h } = boundsRef.current
      for (let i = 0; i < stateRef.current.length; i++) {
        const b = stateRef.current[i]
        b.x += b.vx * dt
        b.y += b.vy * dt

        if (b.x <= 0)               { b.x = 0;          b.vx =  Math.abs(b.vx) }
        else if (b.x + b.size >= w) { b.x = w - b.size; b.vx = -Math.abs(b.vx) }
        if (b.y <= 0)               { b.y = 0;          b.vy =  Math.abs(b.vy) }
        else if (b.y + b.size >= h) { b.y = h - b.size; b.vy = -Math.abs(b.vy) }

        const el = ballRefs.current[i]
        if (el) el.style.transform = `translate(${b.x}px,${b.y}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    window.addEventListener('resize', measure, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', measure)
      lastTimeRef.current = 0
    }
  }, [])

  return (
    <div
      className="balls"
      dir="ltr"
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}
    >
      {BALL_CONFIGS.map(({ cls, size }, i) => (
        <div
          key={cls}
          ref={el => { ballRefs.current[i] = el }}
          className={`ball ${cls}`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  )
}
