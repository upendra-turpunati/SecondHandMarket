import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-sm font-bold tracking-widest text-copper uppercase">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-sm text-ink-muted">That route is not part of SecondHandMarket.</p>
      <Link to="/" className="mt-6 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">
        Go home
      </Link>
    </div>
  )
}
