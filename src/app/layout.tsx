import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_PATH,
  absoluteUrl,
} from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Farnaz Amin`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  keywords: [
    'art studio', 'oil painting', 'watercolor', 'resin art', 'Farnaz Amin',
    'art classes Los Angeles', 'painting classes', 'art workshops',
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/images/fav.svg', type: 'image/svg+xml' }],
    shortcut: ['/images/fav.svg'],
    apple: [{ url: '/images/fav.svg' }],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: `${SITE_NAME} | Farnaz Amin`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: SOCIAL_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Farnaz Amin`,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE_PATH],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1C1C1C',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'en-US',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['ArtGallery', 'LocalBusiness'],
  name: SITE_NAME,
  url: SITE_URL,
  image: absoluteUrl(SOCIAL_IMAGE_PATH),
  telephone: '+1-310-123-4567',
  email: 'hello@beyondthecanvas.art',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1234 Artisan Blvd, Suite 200',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '90028',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'City',
    name: 'Los Angeles',
  },
  sameAs: ['https://instagram.com', 'https://facebook.com'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <CustomCursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
