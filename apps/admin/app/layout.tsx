import '@repo/ui/styles.css'
import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'sonner'

import { ThemeProvider } from '../components/theme-provider'
import { Sidebar } from '../components/sidebar'
import { Header } from '../components/header'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Portfolio Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${GeistSans.className} bg-white dark:bg-black text-black dark:text-white`}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1 flex flex-col'>
              <Header />
              <main className='flex-1 p-6 overflow-auto'>{children}</main>
            </div>
          </div>
          <Toaster richColors position='top-right' />
        </ThemeProvider>
      </body>
    </html>
  )
}
