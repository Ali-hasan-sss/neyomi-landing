import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
  const logo = await readFile(join(process.cwd(), 'public/Neyome_logo.png'))
  const src = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        <img
          src={src}
          width={32}
          height={56}
          alt=""
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
      </div>
    ),
    { ...size },
  )
}
