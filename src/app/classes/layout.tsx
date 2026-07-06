import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Art Classes & Workshops',
  description:
    'Explore art classes, workshops, private lessons, and creative programs at Beyond the Canvas Art Studio in Los Angeles.',
  alternates: {
    canonical: '/classes',
  },
  openGraph: {
    url: '/classes',
    type: 'website',
  },
}

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return children
}
