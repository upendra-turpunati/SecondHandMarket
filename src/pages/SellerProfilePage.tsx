import { Link, useParams } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { ProductGrid } from '../components/ProductGrid'
import { getProductsBySeller, getSeller } from '../data/catalog'
import { formatMemberSince } from '../lib/format'

export function SellerProfilePage() {
  const { id } = useParams()
  const seller = id ? getSeller(id) : undefined
  const listings = id ? getProductsBySeller(id) : []

  if (!seller) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Seller not found</h1>
        <Link to="/browse" className="mt-4 inline-block text-sm font-semibold text-copper-dark">
          Back to browse
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-lg font-bold text-copper">
          {seller.name
            .split(' ')
            .map((part) => part[0])
            .join('')}
        </div>
        <h1 className="mt-4 text-3xl font-bold">{seller.name}</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {seller.city}, {seller.state} · Member since {formatMemberSince(seller.memberSince)}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">{seller.about}</p>
        <p className="mt-4 rounded-xl bg-sand px-4 py-3 text-sm text-ink-muted">
          This is a sample seller profile. Ratings, ID checks and in-app chat are not implemented.
        </p>
      </div>

      <h2 className="mt-10 mb-5 text-xl font-bold">Listings from {seller.name.split(' ')[0]}</h2>
      {listings.length === 0 ? (
        <EmptyState title="No sample listings" description="This profile has no products in the demo catalog." />
      ) : (
        <ProductGrid products={listings} />
      )}
    </div>
  )
}
