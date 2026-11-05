import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthUser } from '../types'

const USER_STORAGE_KEY = 'shm-auth-user'
const ACCOUNTS_STORAGE_KEY = 'shm-accounts'

type StoredAccount = {
  name: string
  email: string
  password: string
}

type AuthContextValue = {
  user: AuthUser | null
  register: (name: string, email: string, password: string) => string | null
  login: (email: string, password: string) => string | null
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY)

    if (!raw) {
      return null
    }

    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

function readAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY)

    if (!raw) {
      return []
    }

    const parsed: unknown = JSON.parse(raw)

    return Array.isArray(parsed) ? (parsed as StoredAccount[]) : []
  } catch {
    return []
  }
}

function saveAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readUser)

  const value = useMemo<AuthContextValue>(
    () => ({
      user,

      register: (name, email, password) => {
        const cleanName = name.trim()
        const cleanEmail = email.trim().toLowerCase()

        if (!cleanName) {
          return 'Please enter your name.'
        }

        if (!cleanEmail) {
          return 'Please enter your email.'
        }

        if (password.length < 6) {
          return 'Password must be at least 6 characters.'
        }

        const accounts = readAccounts()

        const existingAccount = accounts.find(
          (account) => account.email === cleanEmail,
        )

        if (existingAccount) {
          return 'An account with this email already exists.'
        }

        const newAccount: StoredAccount = {
          name: cleanName,
          email: cleanEmail,
          password,
        }

        saveAccounts([...accounts, newAccount])

        const newUser: AuthUser = {
          name: cleanName,
          email: cleanEmail,
        }

        setUser(newUser)
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser))

        return null
      },

      login: (email, password) => {
        const cleanEmail = email.trim().toLowerCase()
        const accounts = readAccounts()

        const account = accounts.find(
          (item) => item.email === cleanEmail,
        )

        if (!account) {
          return 'No account was found with this email.'
        }

        if (account.password !== password) {
          return 'Incorrect password.'
        }

        const loggedInUser: AuthUser = {
          name: account.name,
          email: account.email,
        }

        setUser(loggedInUser)

        localStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify(loggedInUser),
        )

        return null
      },

      signOut: () => {
        setUser(null)
        localStorage.removeItem(USER_STORAGE_KEY)
      },
    }),
    [user],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return ctx
}