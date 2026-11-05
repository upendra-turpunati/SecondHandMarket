import type { Product } from '../types'

export function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPostedDate(isoDate: string) {
  const posted = new Date(isoDate)

  if (Number.isNaN(posted.getTime())) {
    return 'Recently'
  }

  return posted.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatMemberSince(ym: string) {
  const [year, month] = ym.split('-').map(Number)
  const date = new Date(year, (month ?? 1) - 1, 1)
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
}

export function matchesQuery(product: Product, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [product.title, product.brand, product.city, product.condition]
    .join(' ')
    .toLowerCase()
    .includes(q)
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
