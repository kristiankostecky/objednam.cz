import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter as FontSans } from 'next/font/google'

import './globals.css'

export const metadata: Metadata = {
  title: 'Objedname',
  description: 'Objedname is a platform for creating and managing orders',
}
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const NAVIGATION_LINKS = [
  { href: routes.home, label: 'Home' },
  { href: routes.clock, label: 'Clock' },
  { href: routes.star, label: 'Star' },
  { href: routes.person, label: 'Person' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex h-screen min-h-screen w-full flex-col bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar links={NAVIGATION_LINKS} />
          {children}
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
