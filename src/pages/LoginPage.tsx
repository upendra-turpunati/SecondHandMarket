import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')

    const result = login(email, password)

    if (result) {
      setError(result)
      return
    }

    navigate('/')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Log in</h1>

      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Log in to your SecondHandMarket account.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-2xl border border-line bg-paper p-6"
      >
        <label className="block text-sm font-medium">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium">
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm"
            placeholder="Your password"
          />
        </label>

        {error && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white"
        >
          Log in
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-ink-muted">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-copper-dark">
          Register
        </Link>
      </p>
    </div>
  )
}