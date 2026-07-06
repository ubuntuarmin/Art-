import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Art Gallery',
  description:
    'Browse a curated portfolio of original artworks in oil painting, watercolor, resin art, and mixed media by Beyond the Canvas Art Studio.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    url: '/gallery',
    type: 'website',
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
