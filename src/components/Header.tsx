import { Heart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'
import { cn } from '../lib/format'

const links = [
  { to: '/browse', label: 'Browse' },
  { to: '/sell', label: 'Sell' },
  { to: '/favorites', label: 'Favorites' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { ids } = useFavorites()

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-sm font-bold text-copper">
            SH
          </span>
          <span>
            <span className="block text-sm font-extrabold tracking-tight text-ink">SecondHandMarket</span>
            <span className="hidden text-[11px] text-ink-muted sm:block">Used electronics · India</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-medium',
                  isActive ? 'bg-sand text-ink' : 'text-ink-muted hover:text-ink',
                )
              }
            >
              {link.label}
              {link.to === '/favorites' && ids.length > 0 ? (
                <span className="ml-1 text-xs text-copper">{ids.length}</span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="max-w-[10rem] truncate text-sm text-ink-muted">{user.name}</span>
              <button
                type="button"
                onClick={signOut}
                className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-sand"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-ink-muted hover:text-ink">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-copper px-4 py-2 text-sm font-semibold text-white hover:bg-copper-dark"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium hover:bg-sand"
              >
                {link.label}
                {link.to === '/favorites' ? <Heart className="h-4 w-4 text-copper" /> : null}
              </NavLink>
            ))}
            {user ? (
              <button
                type="button"
                onClick={() => {
                  signOut()
                  setOpen(false)
                }}
                className="rounded-xl px-3 py-2 text-left text-sm font-medium"
              >
                Sign out ({user.name})
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm">
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-copper px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
