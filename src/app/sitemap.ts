import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { CLASS_PROGRAMS } from '@/lib/classes'

const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/classes', changeFrequency: 'weekly', priority: 0.9 },
  ...CLASS_PROGRAMS.map((program) => ({
    path: `/classes/${program.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  })),
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
