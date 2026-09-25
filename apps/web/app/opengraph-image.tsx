import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Olalekan Bello | Software Engineer'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b', // custom-bg (approximate dark bg)
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: '#e4e4e7', // text-custom-primary (approximate zinc-200)
          border: '8px solid #059669', // emerald-600 border for theme
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 150, 105, 0.1)', // emerald-600/10
            padding: '40px 80px',
            borderRadius: '24px',
            border: '2px solid rgba(5, 150, 105, 0.2)', // emerald-600/20
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              letterSpacing: '-0.05em',
              marginBottom: 20,
              color: '#ffffff',
            }}
          >
            Olalekan Bello
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 500,
              color: '#34d399', // emerald-400
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Software Engineer
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            fontSize: 24,
            color: '#a1a1aa', // zinc-400
            fontWeight: 500,
          }}
        >
          withola.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
