import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const META = {
  en: { subtitle: 'Family Tasks & Rewards' },
  ar: { subtitle: 'مهام العائلة والمكافآت' },
  de: { subtitle: 'Familienaufgaben & Belohnungen' },
} as const

type SupportedLocale = keyof typeof META

export default function OGImage({ params }: { params: { locale: string } }) {
  const locale: SupportedLocale =
    params.locale in META ? (params.locale as SupportedLocale) : 'en'
  const { subtitle } = META[locale]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #a855f7 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1 }}>N</span>
        </div>

        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: -2,
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          Neyome
        </div>

        <div
          style={{
            fontSize: 36,
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 400,
            letterSpacing: 0.2,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 44,
            fontSize: 22,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: 0.5,
          }}
        >
          neyome.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
