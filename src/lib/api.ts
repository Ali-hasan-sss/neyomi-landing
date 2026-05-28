const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.neyome.com'

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
    ar: string[]
    de: string[]
    en: string[]
    backendId: string
  }
  productId: string | null
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
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured in .env.local')
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/public/subscription-plans`,
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

    const result: SubscriptionPlansResponse = await response.json()
    return result.data.items
  } catch (error) {
    console.error('Error fetching subscription plans from backend API:', error)
    throw error
  }
}

export async function getSupportFaqs(locale: string = 'en', page: number = 1, limit: number = 50): Promise<SupportFaq[]> {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured in .env.local')
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/public/support-faqs?page=${page}&limit=${limit}`,
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
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured in .env.local')
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/public/pages/${type}`,
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
