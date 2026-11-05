import { Link, useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { ConditionBadge } from '../components/ConditionBadge'
import { FavoriteButton } from '../components/FavoriteButton'
import { ProductGrid } from '../components/ProductGrid'
import { ReportListing } from '../components/ReportListing'
import {
  categories,
  getCategory,
  getProduct,
  getSeller,
  products,
} from '../data/catalog'
import { formatINR, formatPostedDate } from '../lib/format'
import type { Product } from '../types'

const STORAGE_KEY = 'secondhandmarket:listings'

export function ProductDetailPage() {
  const { id } = useParams()
  const [activeImage, setActiveImage] = useState(0)

  const localListings = getLocalListings()
  const localProduct = id
    ? localListings.find((item) => item.id === id)
    : undefined

  const product = id ? getProduct(id) ?? localProduct : undefined

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Listing not found</h1>

        <Link
          to="/browse"
          className="mt-4 inline-block text-sm font-semibold text-copper-dark"
        >
          Back to browse
        </Link>
      </div>
    )
  }

  const seller =
    product.sellerId === 'local-seller'
      ? undefined
      : getSeller(product.sellerId)

  const category = getCategory(product.category)

  const related = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id,
    )
    .slice(0, 3)

  const images =
    product.images.length > 0
      ? product.images
      : ['https://placehold.co/800x600?text=No+Image']

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="text-sm text-ink-muted">
        <Link to="/browse" className="hover:text-ink">
          Browse
        </Link>

        {category ? (
          <>
            {' / '}

            <Link
              to={`/browse?category=${category.id}`}
              className="hover:text-ink"
            >
              {category.name}
            </Link>
          </>
        ) : null}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="overflow-hidden rounded-3xl border border-line bg-stone-100">
            <img
              src={images[activeImage] ?? images[0]}
              alt={product.title}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-20 overflow-hidden rounded-xl border ${
                    index === activeImage
                      ? 'border-copper'
                      : 'border-line'
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-ink-muted">
                {product.brand}
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                {product.title}
              </h1>
            </div>

            <FavoriteButton productId={product.id} />
          </div>

          <p className="mt-4 text-3xl font-extrabold">
            {formatINR(product.price)}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <ConditionBadge condition={product.condition} />

            <span className="inline-flex items-center gap-1 text-ink-muted">
              <MapPin className="h-4 w-4" />
              {product.city}, {product.state}
            </span>

            <span className="text-ink-muted">
              Listed {formatPostedDate(product.postedAt)}
            </span>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink-muted">
            {product.description}
          </p>

          {product.specs.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl bg-sand px-3 py-3"
                >
                  <dt className="text-xs text-ink-muted">
                    {spec.label}
                  </dt>

                  <dd className="mt-1 text-sm font-semibold">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {seller ? (
            <Link
              to={`/seller/${seller.id}`}
              className="mt-6 flex items-center justify-between rounded-2xl border border-line bg-paper p-4 hover:border-copper"
            >
              <div>
                <p className="text-xs text-ink-muted">Seller</p>

                <p className="font-semibold">{seller.name}</p>

                <p className="text-sm text-ink-muted">
                  {seller.city} · sample profile
                </p>
              </div>

              <span className="text-sm font-semibold text-copper-dark">
                View profile
              </span>
            </Link>
          ) : product.sellerId === 'local-seller' ? (
            <div className="mt-6 rounded-2xl border border-line bg-paper p-4">
              <p className="text-xs text-ink-muted">Seller</p>

              <p className="font-semibold">You</p>

              <p className="text-sm text-ink-muted">
                Your locally created listing
              </p>
            </div>
          ) : null}

          <div className="mt-5 rounded-2xl border border-dashed border-line bg-sand/80 p-4 text-sm text-ink-muted">
            Messaging, offers and payments are not available yet.
            Treat this page as a listing preview, not a live checkout.
          </div>

          <div className="mt-5">
            <ReportListing productTitle={product.title} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-xl font-bold">
            More in this category
          </h2>

          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}

function getLocalListings(): Product[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      return []
    }

    const parsed: unknown = JSON.parse(saved)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isProduct)
  } catch {
    return []
  }
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