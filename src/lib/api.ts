/** Server-side: direct API call (no CORS). Browser: same-origin proxy to avoid CORS. */
function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return '/api/proxy'
  }
  const url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
  if (!url) {
    throw new Error('API_URL is not configured in .env.local')
  }
  return url.replace(/\/$/, '')
}

export interface SupportFaq {
  id: string
  locale: string
  question: string
  answer: string
}

export interface SupportFaqsResponse {
  success: boolean
  message: string
  data: {
    locale: string
    items: SupportFaq[]
    total: number
    page: number
    limit: number
  }
}

export interface PageData {
  type: 'privacy' | 'terms'
  version: string
  locale: string
  title: string
  body: string
}

export interface PageResponse {
  success: boolean
  data: PageData
}

export interface SubscriptionPlan {
  id: string
  badge: {
    ar: string
    de: string
    en: string
  }
  features: {
    ar?: string[]
    de?: string[]
    en?: string[]
    backendId?: string
    billing?: string
    stripe?: { priceId?: string }
    [key: string]: string[] | string | { priceId?: string } | undefined
  }
  productId: string | null
  price?: number | string | null
  currency?: string | null
  subtitle: {
    ar: string
    de: string
    en: string
  }
  sort: number
  title: {
    ar: string
    de: string
    en: string
  }
  periodShort: {
    ar: string
    de: string
    en: string
  } | null
  limitsVersion: number
  limits: {
    members: number
    tasksPerDay: number
    rewardsPerDay: number
  }
  deletedAt: string | null
}

export interface SubscriptionPlansResponse {
  success: boolean
  data: {
    items: SubscriptionPlan[]
    total: number
    page: number
    limit: number
  }
  message: string
}

export async function getSubscriptionPlans(locale: string = 'en'): Promise<SubscriptionPlan[]> {
  const apiBaseUrl = getApiBaseUrl()

  try {
    const response = await fetch(
      `${apiBaseUrl}/public/subscription-plans?limit=50&sortBy=sort&sortOrder=ASC`,
      {
        headers: {
          'Accept-Language': locale,
          'X-Locale': locale,
        },
        next: { revalidate: 3600 },
      },
    )

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const result: SubscriptionPlansResponse = await response.json()
    if (!result.success || !result.data?.items) {
      throw new Error(result.message || 'Failed to load subscription plans')
    }

    return result.data.items
  } catch (error) {
    console.error('Error fetching subscription plans from backend API:', error)
    throw error
  }
}

export async function getSupportFaqs(locale: string = 'en', page: number = 1, limit: number = 50): Promise<SupportFaq[]> {
  const apiBaseUrl = getApiBaseUrl()

  try {
    const response = await fetch(
      `${apiBaseUrl}/public/support-faqs?page=${page}&limit=${limit}`,
      {
        headers: {
          'X-Locale': locale,
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const result: SupportFaqsResponse = await response.json()
    return result.data.items
  } catch (error) {
    console.error('Error fetching support FAQs from backend API:', error)
    throw error
  }
}

export async function getPage(type: 'privacy' | 'terms', locale: string = 'en'): Promise<PageData> {
  const apiBaseUrl = getApiBaseUrl()

  try {
    const response = await fetch(
      `${apiBaseUrl}/public/pages/${type}`,
      {
        headers: {
          'Accept-Language': locale,
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const result: PageResponse = await response.json()
    return result.data
  } catch (error) {
    console.error(`Error fetching ${type} page from backend API:`, error)
    throw error
  }
}
