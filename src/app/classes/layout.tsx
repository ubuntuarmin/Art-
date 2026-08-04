import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Art Classes in Katy, TX | Beyond the Canvas Art Studio',
  description:
    'Explore art classes in Katy, TX at Beyond the Canvas Art Studio. Compare programs, then visit detailed class pages with curriculum highlights and booking options.',
  alternates: {
    canonical: '/classes',
  },
  openGraph: {
    url: '/classes',
    type: 'website',
    title: 'Art Classes in Katy, TX | Beyond the Canvas Art Studio',
    description:
      'Browse painting, drawing, mandala, resin, private lessons, and kids art programs in Katy, Texas.',
  },
}

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return children
}
