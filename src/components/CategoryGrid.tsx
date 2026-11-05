import { Link } from 'react-router-dom'
import {
  Camera,
  CircuitBoard,
  Gamepad2,
  Headphones,
  Laptop,
  Monitor,
  Smartphone,
  Speaker,
  Tablet,
  Watch,
} from 'lucide-react'
import type { CategoryId } from '../types'
import { categories } from '../data/catalog'
import { cn } from '../lib/format'

const icons: Record<CategoryId, typeof Smartphone> = {
  phones: Smartphone,
  laptops: Laptop,
  tablets: Tablet,
  tvs: Monitor,
  audio: Headphones,
  wearables: Watch,
  cameras: Camera,
  gaming: Gamepad2,
  'pc-parts': CircuitBoard,
  other: Speaker,
}

export function CategoryGrid({
  activeId,
  compact = false,
}: {
  activeId?: string
  compact?: boolean
}) {
  return (
    <div className={cn('grid gap-3', compact ? 'grid-cols-2 sm:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5')}>
      {categories.map((category) => {
        const Icon = icons[category.id]
        const active = activeId === category.id
        return (
          <Link
            key={category.id}
            to={`/browse?category=${category.id}`}
            className={cn(
              'flex items-start gap-3 rounded-2xl border p-4 transition',
              active
                ? 'border-copper bg-white shadow-sm'
                : 'border-line bg-paper hover:border-copper/40 hover:bg-white',
            )}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand text-copper">
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{category.name}</span>
              {!compact && (
                <span className="mt-1 block text-xs text-ink-muted">{category.description}</span>
              )}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
