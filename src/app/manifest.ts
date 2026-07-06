import type { MetadataRoute } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Beyond Canvas',
    description:
      'Los Angeles art studio offering painting classes, workshops, private lessons, and creative events for all ages.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#1C1C1C',
    theme_color: '#1C1C1C',
    categories: ['art', 'education', 'lifestyle'],
    icons: [
      {
        src: '/images/fav.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    id: SITE_URL,
  }
}
