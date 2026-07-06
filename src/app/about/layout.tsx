import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Farnaz Amin',
  description:
    'Learn more about Farnaz Amin, her artistic background, awards, exhibitions, and 25+ years of art education leadership in Los Angeles.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: '/about',
    type: 'profile',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
