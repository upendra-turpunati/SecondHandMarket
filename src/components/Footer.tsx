import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="text-sm font-extrabold">SecondHandMarket</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
            A frontend for browsing and listing used electronics in India. Payments, chat, and
            identity checks are not available in this version.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <Link to="/browse" className="hover:text-white">
                Browse listings
              </Link>
            </li>
            <li>
              <Link to="/sell" className="hover:text-white">
                Sell an item
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-white">
                Favorites
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Note</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Sample products and seller profiles are for design only. Do not treat them as live
            marketplace inventory.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        SecondHandMarket · India · frontend preview
      </div>
    </footer>
  )
}
