import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'Beyond the Canvas Art Studio | Farnaz Amin',
  description:
    'A luxury art studio in Los Angeles led by Iranian-American artist Farnaz Amin. Oil painting, watercolor, resin art, private classes, and events for all ages.',
  keywords: [
    'art studio', 'oil painting', 'watercolor', 'resin art', 'Farnaz Amin',
    'art classes Los Angeles', 'painting classes', 'art workshops',
  ],
  openGraph: {
    title: 'Beyond the Canvas Art Studio',
    description: 'A creative space for all ages to explore and grow through Art.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — Playfair Display Variable (supports font-optical-sizing) + Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,opsz,wght@0,5..1200,400..900;1,5..1200,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <CustomCursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
