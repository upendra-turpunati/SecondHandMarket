import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'shm-favorites'

type FavoritesContextValue = {
  ids: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

function readIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(readIds)

  const value = useMemo<FavoritesContextValue>(
    () => ({
      ids,
      isFavorite: (id) => ids.includes(id),
      toggleFavorite: (id) => {
        setIds((current) => {
          const next = current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id]
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
          return next
        })
      },
    }),
    [ids],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
