'use client'

import dynamic from 'next/dynamic'

// Player is dynamically imported with ssr:false to keep document-dependent
// lottie code out of the SSR bundle.
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((m) => m.Player),
  { ssr: false }
)

type Props = {
  src: string
  className?: string
  loop?: boolean
  autoplay?: boolean
}

export default function LottieClient({ src, className, loop = true, autoplay = true }: Props) {
  return (
    <Player
      src={src}
      className={className}
      loop={loop}
      autoplay={autoplay}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
