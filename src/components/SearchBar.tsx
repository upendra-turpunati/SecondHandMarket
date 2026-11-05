import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, type FormEvent } from 'react'

export function SearchBar({
  initialQuery = '',
  compact = false,
}: {
  initialQuery?: string
  compact?: boolean
}) {
  const [query, setQuery] = useState(initialQuery)
  const navigate = useNavigate()

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    navigate(`/browse${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <form onSubmit={onSubmit} className={compact ? 'w-full' : 'w-full max-w-2xl'}>
      <label className="sr-only" htmlFor="market-search">
        Search listings
      </label>
      <div className="flex overflow-hidden rounded-full border border-line bg-white shadow-sm focus-within:ring-2 focus-within:ring-copper/40">
        <input
          id="market-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search phones, laptops, cameras…"
          className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-ink outline-none placeholder:text-ink-muted"
        />
        <button
          type="submit"
          className="m-1 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink/90"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </div>
    </form>
  )
}
