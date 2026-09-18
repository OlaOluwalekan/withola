import '@repo/ui/styles.css'
import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { StoreProvider } from '../providers/store'

export const metadata: Metadata = {
  title: 'Withola.dev',
  description: 'Olalekan Bello | Software Engineer',
  icons: {
    icon: '/withola.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={GeistSans.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
