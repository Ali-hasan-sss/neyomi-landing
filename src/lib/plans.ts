import type { SubscriptionPlan } from './api'

export type BillingInterval = 'month' | 'year'

export type DisplayPlan = {
  id: string
  title: string
  subtitle: string
  badge: string
  features: string[]
  price: number | null
  monthlyPrice: number | null
  yearlyPrice: number | null
  currency: string
  priceLabel: string
  periodShort: string | null
  sort: number
  productId: string | null
  highlight: boolean
}

export function parsePlanPrice(value: number | string | null | undefined): number | null {
  if (value == null || value === '') return null
  const amount = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(amount) ? amount : null
}

export function formatPlanPrice(
  price: number | null,
  currency: string,
  locale: string,
  freeLabel: string,
): string {
  if (price == null || price === 0) return freeLabel
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(price)
  } catch {
    return `${price} ${currency.toUpperCase()}`
  }
}

type LocaleMap = Record<string, string> | null | undefined

type PlanFeatures = SubscriptionPlan['features']

const LOCALE_KEYS = new Set(['en', 'ar', 'de'])

export function getLocalizedText(field: LocaleMap, locale: string): string {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[locale] || field.en || Object.values(field)[0] || ''
}

export function getPlanFeatureList(features: PlanFeatures, locale: string): string[] {
  const list = features[locale as keyof PlanFeatures]
  if (Array.isArray(list)) return list
  if (Array.isArray(features.en)) return features.en
  return Object.entries(features)
    .filter(([key, value]) => LOCALE_KEYS.has(key) && Array.isArray(value))
    .map(([, value]) => value as string[])
    .flat()
}

function positivePrice(value: number | null): number | null {
  return value != null && value > 0 ? value : null
}

/** Monthly and yearly amounts. A legacy single `price` maps to one interval. */
export function resolvePlanPrices(plan: SubscriptionPlan): { monthly: number | null; yearly: number | null } {
  const hasMonthly = plan.monthlyPrice != null && plan.monthlyPrice !== ''
  const hasYearly = plan.yearlyPrice != null && plan.yearlyPrice !== ''
  if (hasMonthly || hasYearly) {
    return {
      monthly: positivePrice(parsePlanPrice(plan.monthlyPrice)),
      yearly: positivePrice(parsePlanPrice(plan.yearlyPrice)),
    }
  }

  const legacy = positivePrice(parsePlanPrice(plan.price))
  if (legacy == null) return { monthly: null, yearly: null }
  const yearlyLegacy =
    plan.features?.billing === 'yearly' || /yearly|annual/i.test(plan.features?.backendId ?? '')
  return yearlyLegacy ? { monthly: null, yearly: legacy } : { monthly: legacy, yearly: null }
}

export function mapSubscriptionPlan(
  plan: SubscriptionPlan,
  locale: string,
  freeLabel = 'Free',
): DisplayPlan {
  const { monthly, yearly } = resolvePlanPrices(plan)
  const price = monthly ?? yearly
  const currency = (plan.currency ?? 'USD').toUpperCase()

  return {
    id: plan.id,
    title: getLocalizedText(plan.title, locale),
    subtitle: getLocalizedText(plan.subtitle, locale),
    badge: getLocalizedText(plan.badge, locale),
    features: getPlanFeatureList(plan.features, locale),
    price,
    monthlyPrice: monthly,
    yearlyPrice: yearly,
    currency,
    priceLabel: formatPlanPrice(price, currency, locale, freeLabel),
    periodShort: plan.periodShort ? getLocalizedText(plan.periodShort, locale) : null,
    sort: plan.sort ?? 0,
    productId: plan.productId,
    highlight: plan.sort === 1,
  }
}

export function mapSubscriptionPlans(
  plans: SubscriptionPlan[],
  locale: string,
  freeLabel = 'Free',
): DisplayPlan[] {
  return [...plans]
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((plan) => mapSubscriptionPlan(plan, locale, freeLabel))
}
