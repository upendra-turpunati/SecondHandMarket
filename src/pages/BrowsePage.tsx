import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CategoryGrid } from '../components/CategoryGrid'
import { EmptyState } from '../components/EmptyState'
import { LocationSelect } from '../components/LocationSelect'
import { ProductGrid } from '../components/ProductGrid'
import { SearchBar } from '../components/SearchBar'
import { categories, products } from '../data/catalog'
import { matchesQuery } from '../lib/format'
import type { Condition, Product } from '../types'

const conditions: Condition[] = ['Like New', 'Excellent', 'Good', 'Fair']

const STORAGE_KEY = 'secondhandmarket:listings'

export function BrowsePage() {
  const [params, setParams] = useSearchParams()
  const [localListings, setLocalListings] = useState<Product[]>([])

  const q = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const city = params.get('city') ?? ''
  const condition = params.get('condition') ?? ''
  const sort = params.get('sort') ?? 'newest'

  useEffect(() => {
    loadLocalListings()

    function handleListingsUpdated() {
      loadLocalListings()
    }

    window.addEventListener(
      'secondhandmarket:listings-updated',
      handleListingsUpdated,
    )

    window.addEventListener('storage', handleListingsUpdated)

    return () => {
      window.removeEventListener(
        'secondhandmarket:listings-updated',
        handleListingsUpdated,
      )

      window.removeEventListener('storage', handleListingsUpdated)
    }
  }, [])

  function loadLocalListings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)

      if (!saved) {
        setLocalListings([])
        return
      }

      const parsed: unknown = JSON.parse(saved)

      if (!Array.isArray(parsed)) {
        setLocalListings([])
        return
      }

      const validListings = parsed.filter(isProduct)
      setLocalListings(validListings)
    } catch {
      setLocalListings([])
    }
  }

  const allProducts = useMemo(
    () => [...localListings, ...products],
    [localListings],
  )

  const results = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      if (!matchesQuery(product, q)) return false
      if (category && product.category !== category) return false
      if (city && product.city !== city) return false
      if (condition && product.condition !== condition) return false
      return true
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      return b.postedAt.localeCompare(a.postedAt)
    })
  }, [allProducts, q, category, city, condition, sort])

  function update(key: string, value: string) {
    const next = new URLSearchParams(params)

    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }

    setParams(next)
  }

  const categoryName = categories.find(
    (item) => item.id === category,
  )?.name

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest text-copper uppercase">
            Browse
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            {categoryName ?? 'All electronics'}
          </h1>

          <p className="mt-2 text-sm text-ink-muted">
            {results.length} listings in this view
          </p>
        </div>

        <SearchBar initialQuery={q} compact />
      </div>

      <div className="mt-8">
        <CategoryGrid activeId={category || undefined} compact />
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-paper p-4 sm:grid-cols-3">
        <label className="text-sm font-medium">
          City

          <div className="mt-1">
            <LocationSelect
              value={city}
              onChange={(value) => update('city', value)}
            />
          </div>
        </label>

        <label className="text-sm font-medium">
          Condition

          <select
            value={condition}
            onChange={(event) =>
              update('condition', event.target.value)
            }
            className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm"
          >
            <option value="">Any condition</option>

            {conditions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium">
          Sort

          <select
            value={sort}
            onChange={(event) =>
              update('sort', event.target.value)
            }
            className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="mt-8">
        {results.length === 0 ? (
          <EmptyState
            title="No listings match these filters"
            description="Try another city, category, or search term."
          />
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    </div>
  )
}

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') {
    return false
  }

  const item = value as Partial<Product>

  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.price === 'number' &&
    typeof item.city === 'string' &&
    Array.isArray(item.images)
  )
}