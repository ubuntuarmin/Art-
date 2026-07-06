import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/classes', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/contact', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/gallery', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
