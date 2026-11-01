import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import { CONFIG } from '../data/portfolio'
import './globals.css'

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'raf // offensive security researcher',
  description:
    'Abderraouf “Raf” LAARBI (Om4ga_) — offensive security researcher, bug bounty hunter and ICS/OT intrusion-detection researcher based in Paris.',
}

export const viewport: Viewport = {
  themeColor: '#0a0d10',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        data-accent={CONFIG.accent === 'cyan' ? 'cyan' : undefined}
        className={`${plexMono.variable} ${plexSans.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
