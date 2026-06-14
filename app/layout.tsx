import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { Navbar } from '@/components/navigation/Navbar'
import { CustomCursor } from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: 'Adeel Iqbal Anjum — WordPress Performance & WooCommerce Specialist',
  description:
    'Senior WordPress developer specialising in performance optimisation, WooCommerce, and custom plugin development. Based in Lahore, serving clients in UAE, UK, USA.',
  keywords: [
    'WordPress developer',
    'WooCommerce specialist',
    'WordPress performance',
    'custom plugin development',
    'Lahore developer',
    'Dubai WordPress',
  ],
  openGraph: {
    title: 'Adeel Iqbal Anjum — WordPress Specialist',
    description: 'Crafting fast, revenue-generating WordPress experiences for international clients.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>
            {/* Noise texture overlay */}
            <div className="noise-layer" aria-hidden="true" />
            {/* Custom cursor — desktop only */}
            <div className="hidden md:block">
              <CustomCursor />
            </div>
            <Navbar />
            <main>{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
