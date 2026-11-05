import { Heart } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { cn } from '../lib/format'

export function FavoriteButton({
  productId,
  className,
}: {
  productId: string
  className?: string
}) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(productId)

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? 'Remove from favorites' : 'Save to favorites'}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleFavorite(productId)
      }}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/95 shadow-sm transition hover:scale-105',
        active ? 'border-copper text-copper' : 'border-line text-ink-muted',
        className,
      )}
    >
      <Heart className={cn('h-4 w-4', active && 'fill-copper')} />
    </button>
  )
}
