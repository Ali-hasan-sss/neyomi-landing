'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

// PlayerEvent.Error === 'error' — import avoided to prevent SSR bundle contamination
const PLAYER_EVENT_ERROR = 'error'

export const LOTTIE_ANIMATIONS = {
  chores:    'https://assets5.lottiefiles.com/packages/lf20_kkflmtur.json',
  rewards:   'https://assets9.lottiefiles.com/packages/lf20_touohxv0.json',
  reminders: 'https://assets2.lottiefiles.com/packages/lf20_xl4hbxdp.json',
} as const

export type AnimationKey = keyof typeof LOTTIE_ANIMATIONS

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((m) => m.Player),
  {
    ssr: false,
    loading: () => <div className="feature-media-skeleton" aria-hidden="true" />,
  }
)

type Props = {
  side?: 'left' | 'right'
  title: string
  text: string
  animationKey: AnimationKey
  bullets?: readonly string[]
}

export default function LottieFeature({ side = 'left', title, text, animationKey, bullets }: Props) {
  const left = side === 'left'
  const src = LOTTIE_ANIMATIONS[animationKey]
  const [errored, setErrored] = useState(false)
  const triedOnce = useRef(false)

  useEffect(() => {
    setErrored(false)
    triedOnce.current = false
  }, [animationKey])

  return (
    <div className={`feature-row ${left ? '' : 'rev'}`}>
      <div className="feature-media">
        {errored ? (
          <div className="feature-media-error" aria-hidden="true">
            <span>🎯</span>
          </div>
        ) : (
          <Player
            autoplay
            loop
            src={src}
            style={{ width: '100%', height: '100%' }}
            onEvent={(e) => {
              if ((e as string) === PLAYER_EVENT_ERROR && !triedOnce.current) {
                triedOnce.current = true
                setErrored(true)
              }
            }}
          />
        )}
      </div>
      <div className="feature-copy">
        <h3>{title}</h3>
        <p>{text}</p>
        {bullets && bullets.length > 0 && (
          <ul className="bullets">
            {bullets.map((b, i) => (
              <li key={i}>✅ {b}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
