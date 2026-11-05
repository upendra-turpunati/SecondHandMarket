import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { formatINR } from '../lib/format'
import { ConditionBadge } from './ConditionBadge'
import { FavoriteButton } from './FavoriteButton'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_10px_30px_-18px_rgba(15,28,46,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(15,28,46,0.4)]">
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-stone-200">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <FavoriteButton productId={product.id} className="absolute top-3 right-3" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-ink">
            <Link to={`/product/${product.id}`} className="hover:text-copper-dark">
              {product.title}
            </Link>
          </h3>
        </div>
        <p className="text-lg font-bold tracking-tight text-ink">{formatINR(product.price)}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <ConditionBadge condition={product.condition} />
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {product.city}
          </span>
        </div>
      </div>
    </article>
  )
}
