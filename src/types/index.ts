export type Condition = 'Like New' | 'Excellent' | 'Good' | 'Fair'

export type CategoryId =
  | 'phones'
  | 'laptops'
  | 'tablets'
  | 'tvs'
  | 'audio'
  | 'wearables'
  | 'cameras'
  | 'gaming'
  | 'pc-parts'
  | 'other'

export interface Category {
  id: CategoryId
  name: string
  description: string
}

export interface Seller {
  id: string
  name: string
  city: string
  state: string
  memberSince: string
  about: string
}

export interface Product {
  id: string
  title: string
  brand: string
  price: number
  condition: Condition
  category: CategoryId
  city: string
  state: string
  description: string
  specs: { label: string; value: string }[]
  images: string[]
  sellerId: string
  postedAt: string
  featured?: boolean
}

export interface AuthUser {
  name: string
  email: string
}
