import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/sidebar'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'Larc Ai - New Chat'
const description =
  'All In One App Store of AI Models.'

export const metadata: Metadata = {
  metadataBase: new URL('https://larc.ai'),
  title,
  description,
  openGraph: {
    title,
    description
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@miiura'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex">
            <div className="dark:bg-popover bg-card text-gray-200 max-w-[250px] h-screen overflow-y-auto md:min-w-[220px] border-r-2">
              <Sidebar />
            </div>
            <div className="bg-background flex-1 h-screen overflow-hidden relative">
              <Header />
              {children}
              <Footer />
              <Toaster />
            </div>
          </div>        
        </ThemeProvider>
      </body>
    </html>
  )
}
