import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Bookings',
  description:
    'Contact Beyond the Canvas Art Studio for class enrollment, private lessons, event bookings, and commission inquiries in Los Angeles.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    url: '/contact',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
