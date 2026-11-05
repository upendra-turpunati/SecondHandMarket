import { cities } from '../data/catalog'

export function LocationSelect({
  value,
  onChange,
  id = 'city-filter',
}: {
  value: string
  onChange: (city: string) => void
  id?: string
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:ring-2 focus:ring-copper/30"
    >
      <option value="">All cities</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  )
}
