import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')

    const result = register(name, email, password)

    if (result) {
      setError(result)
      return
    }

    navigate('/')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Create an account</h1>

      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Create a local account to use SecondHandMarket.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-2xl border border-line bg-paper p-6"
      >
        <label className="block text-sm font-medium">
          Full name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm"
            placeholder="Your full name"
          />
        </label>

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
          City
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm"
            placeholder="Bengaluru"
          />
        </label>

        <label className="block text-sm font-medium">
          Password
          <input
            required
            type="password"
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm"
            placeholder="At least 6 characters"
          />
        </label>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-copper py-3 text-sm font-semibold text-white hover:bg-copper-dark"
        >
          Create account
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-ink-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-copper-dark">
          Log in
        </Link>
      </p>
    </div>
  )
}