import type { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'

const BASE_URL = 'https://neyome.app'

const ROUTES = ['', '/about', '/features', '/privacy', '/terms']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of ROUTES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.7,
      })
    }
  }

  return entries
}
