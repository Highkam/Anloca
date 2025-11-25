import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/infraestructure/auth/auth-provider'
import { CartProvider } from '@/core/cart/cart-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Handy - Online Shopping',
  description: 'Discover new items and fashion accessories at Handy. Quality, style, and comfort in every product.',
  generator: 'Next.js',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className={GeistSans.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Analytics />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
