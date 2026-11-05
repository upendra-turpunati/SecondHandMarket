import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, ShieldCheck, Tag } from 'lucide-react'
import { CategoryGrid } from '../components/CategoryGrid'
import { ProductGrid } from '../components/ProductGrid'
import { SearchBar } from '../components/SearchBar'
import { cities, products } from '../data/catalog'

const featured = products.filter((product) => product.featured)

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line bg-[radial-gradient(circle_at_top_left,_#fff7ed,_#f6f3ee_45%,_#eef2f0)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-copper uppercase">India · used electronics</p>
            <h1 className="mt-4 max-w-xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Buy and sell gadgets you can inspect in person.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
              Browse phones, laptops, cameras and more from cities across India. This version is the
              storefront: search, save listings, and preview selling. Checkout, chat and verification
              are not built yet.
            </p>
            <div className="mt-8">
              <SearchBar />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {cities.slice(0, 6).map((city) => (
                <Link
                  key={city}
                  to={`/browse?city=${encodeURIComponent(city)}`}
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink hover:border-copper"
                >
                  <MapPin className="h-3 w-3 text-copper" />
                  {city}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-end">
            {featured.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm"
              >
                <img src={product.images[0]} alt="" className="h-28 w-full object-cover sm:h-32" />
                <div className="p-3">
                  <p className="line-clamp-2 text-xs font-semibold">{product.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Shop by category</h2>
            <p className="mt-1 text-sm text-ink-muted">Jump into a product type.</p>
          </div>
          <Link to="/browse" className="hidden items-center gap-1 text-sm font-semibold text-copper-dark sm:inline-flex">
            All listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <CategoryGrid />
      </section>

      <section className="bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Featured listings</h2>
              <p className="mt-1 text-sm text-ink-muted">Sample inventory for the first release.</p>
            </div>
            <Link to="/browse" className="text-sm font-semibold text-copper-dark">
              View all
            </Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-3 sm:px-6">
        {[
          {
            icon: Tag,
            title: 'List in minutes',
            body: 'The sell form is ready to try. Listings stay on this device until a backend exists.',
          },
          {
            icon: MapPin,
            title: 'Browse by city',
            body: 'Filter sample products by Indian cities to see how local search will feel.',
          },
          {
            icon: ShieldCheck,
            title: 'Honest about trust',
            body: 'No verified-seller badges, escrow, or in-app chat until those features are actually built.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-line bg-paper p-5">
            <item.icon className="h-5 w-5 text-copper" />
            <h3 className="mt-3 font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
