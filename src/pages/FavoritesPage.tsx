import { Link } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { ProductGrid } from '../components/ProductGrid'
import { useFavorites } from '../context/FavoritesContext'
import { products } from '../data/catalog'

export function FavoritesPage() {
  const { ids } = useFavorites()
  const saved = products.filter((product) => ids.includes(product.id))

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">Favorites</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Saved listings stay in this browser only. They are not synced to an account.
      </p>
      <div className="mt-8">
        {saved.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            description="Tap the heart on a product card to save it here."
            action={
              <Link to="/browse" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
                Browse listings
              </Link>
            }
          />
        ) : (
          <ProductGrid products={saved} />
        )}
      </div>
    </div>
  )
}
