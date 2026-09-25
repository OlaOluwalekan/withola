import '@repo/ui/styles.css'
import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { StoreProvider } from '../providers/store'

export const metadata: Metadata = {
  metadataBase: new URL('https://withola.vercel.app'),
  title: 'Withola.dev',
  description: 'Olalekan Bello | Software Engineer',
  icons: {
    icon: '/withola.svg',
  },
  openGraph: {
    title: 'Withola.dev | Olalekan Bello',
    description: 'Olalekan Bello | Software Engineer',
    url: 'https://withola.vercel.app',
    siteName: 'Withola.dev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Withola.dev | Olalekan Bello',
    description: 'Olalekan Bello | Software Engineer',
    creator: '@OlaOluwalekanMi',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Olalekan Bello',
    jobTitle: 'Software Engineer',
    url: 'https://withola.vercel.app',
    sameAs: [
      'https://www.linkedin.com/in/olaoluwalekanmi',
      'https://github.com/OlaOluwalekan',
      'https://x.com/OlaOluwalekanMi'
    ]
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={GeistSans.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
