import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatINR } from '../lib/format'
import type { Product } from '../types'

const STORAGE_KEY = 'secondhandmarket:listings'

function getListings(): Product[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      return []
    }

    const parsed = JSON.parse(saved)

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function SellerDashboardPage() {
  const { user } = useAuth()
  const [listings, setListings] = useState<Product[]>([])

  useEffect(() => {
    setListings(getListings())
  }, [])

  function deleteListing(id: string) {
    const updated = listings.filter((listing) => listing.id !== id)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setListings(updated)

    window.dispatchEvent(new Event('secondhandmarket:listings-updated'))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest text-copper uppercase">
            Seller
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            My listings
          </h1>

          <p className="mt-2 text-sm text-ink-muted">
            Welcome, {user?.name ?? 'seller'}.
          </p>
        </div>

        <Link
          to="/sell"
          className="inline-flex items-center justify-center rounded-xl bg-copper px-4 py-2.5 text-sm font-semibold text-white hover:bg-copper-dark"
        >
          Sell another item
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-paper p-8 text-center">
          <h2 className="text-xl font-bold">
            You haven't listed anything yet
          </h2>

          <p className="mt-2 text-sm text-ink-muted">
            Create your first listing and it will appear here.
          </p>

          <Link
            to="/sell"
            className="mt-5 inline-block rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white"
          >
            Create listing
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="overflow-hidden rounded-2xl border border-line bg-paper"
            >
              <Link to={`/product/${listing.id}`}>
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </Link>

              <div className="p-4">
                <p className="text-lg font-bold">
                  {listing.title}
                </p>

                <p className="mt-1 text-xl font-extrabold">
                  {formatINR(listing.price)}
                </p>

                <p className="mt-2 text-sm text-ink-muted">
                  {listing.condition} · {listing.city}
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/product/${listing.id}`}
                    className="flex-1 rounded-xl border border-line px-3 py-2 text-center text-sm font-semibold"
                  >
                    View
                  </Link>

                  <button
                    type="button"
                    onClick={() => deleteListing(listing.id)}
                    className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}