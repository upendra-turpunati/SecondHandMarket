import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { categories, cities } from '../data/catalog'
import type { Condition, Product } from '../types'

const conditions: Condition[] = ['Like New', 'Excellent', 'Good', 'Fair']

const MAX_IMAGES = 4
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB per image
const STORAGE_KEY = 'secondhandmarket:listings'

const cityStates: Record<string, string> = {
  Bengaluru: 'Karnataka',
  Mumbai: 'Maharashtra',
  Delhi: 'Delhi',
  Hyderabad: 'Telangana',
  Chennai: 'Tamil Nadu',
  Pune: 'Maharashtra',
  Ahmedabad: 'Gujarat',
  Kochi: 'Kerala',
  Kolkata: 'West Bengal',
  Jaipur: 'Rajasthan',
}

export function SellPage() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [error, setError] = useState('')

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    setError('')

    const files = Array.from(event.target.files ?? [])

    if (files.length === 0) return

    if (files.length > MAX_IMAGES) {
      setError(`Please select no more than ${MAX_IMAGES} images.`)
      event.target.value = ''
      return
    }

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed.')
        event.target.value = ''
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('Each image must be 2 MB or smaller.')
        event.target.value = ''
        return
      }
    }

    try {
      const imagePreviews = await Promise.all(files.map(fileToDataUrl))
      setSelectedFiles(files)
      setPreviews(imagePreviews)
    } catch {
      setError('Could not read one or more images. Please try again.')
    }
  }

  function removeImage(index: number) {
    setSelectedFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))
    setPreviews((current) => current.filter((_, imageIndex) => imageIndex !== index))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const form = event.currentTarget
    const formData = new FormData(form)

    const title = String(formData.get('title') ?? '').trim()
    const category = String(formData.get('category') ?? '')
    const condition = String(formData.get('condition') ?? '') as Condition
    const price = Number(formData.get('price'))
    const city = String(formData.get('city') ?? '')
    const description = String(formData.get('description') ?? '').trim()

    if (!title || title.length < 3) {
      setError('Please enter a valid title with at least 3 characters.')
      return
    }

    if (!category) {
      setError('Please choose a category.')
      return
    }

    if (!conditions.includes(condition)) {
      setError('Please choose a valid condition.')
      return
    }

    if (!Number.isFinite(price) || price <= 0) {
      setError('Please enter a valid price greater than ₹0.')
      return
    }

    if (!city) {
      setError('Please choose a city.')
      return
    }

    if (!description || description.length < 10) {
      setError('Please enter a description with at least 10 characters.')
      return
    }

    if (selectedFiles.length === 0) {
      setError('Please upload at least one product photo.')
      return
    }

    try {
      const images =
        previews.length === selectedFiles.length
          ? previews
          : await Promise.all(selectedFiles.map(fileToDataUrl))

      const listing: Product = {
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title,
        brand: title.split(' ')[0] || 'Other',
        price,
        condition,
        category: category as Product['category'],
        city,
        state: cityStates[city] ?? '',
        description,
        specs: [],
        images,
        sellerId: 'local-seller',
        postedAt: new Date().toISOString(),
      }

      const existingListings = getSavedListings()

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([listing, ...existingListings]),
      )

      window.dispatchEvent(new Event('secondhandmarket:listings-updated'))

      form.reset()
      setSelectedFiles([])
      setPreviews([])
      setSubmitted(true)
    } catch {
      setError(
        'Could not save the listing. Your browser may not have enough storage for these images. Try smaller photos.',
      )
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-xs font-bold tracking-widest text-copper uppercase">Sell</p>

      <h1 className="mt-1 text-3xl font-bold">Sell an item</h1>

      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Add your product details and photos to create a listing.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-line bg-paper p-6">
          <h2 className="text-lg font-semibold">Listing created successfully 🎉</h2>

          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Your listing has been saved in this browser and can now appear on
            the Browse page.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/browse"
              className="rounded-xl bg-copper px-4 py-2.5 text-sm font-semibold text-white hover:bg-copper-dark"
            >
              View listings
            </Link>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold"
            >
              Sell another item
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-2xl border border-line bg-paper p-6"
        >
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <Field label="Title">
            <input
              required
              name="title"
              placeholder="e.g. iPhone 13 128GB Blue"
              className="field"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <select
                required
                name="category"
                className="field"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose category
                </option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Condition">
              <select
                required
                name="condition"
                className="field"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose condition
                </option>

                {conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Price (₹)">
              <input
                required
                name="price"
                type="number"
                min={1}
                placeholder="25000"
                className="field"
              />
            </Field>

            <Field label="City">
              <select
                required
                name="city"
                className="field"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose city
                </option>

                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Product photos">
            <div className="rounded-xl border border-dashed border-line bg-white p-4">
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full text-sm"
              />

              <p className="mt-2 text-xs text-ink-muted">
                Upload up to {MAX_IMAGES} images. Each image must be 2 MB or
                smaller.
              </p>

              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {previews.map((preview, index) => (
                    <div
                      key={`${preview}-${index}`}
                      className="relative overflow-hidden rounded-xl border border-line"
                    >
                      <img
                        src={preview}
                        alt={`Product preview ${index + 1}`}
                        className="aspect-square w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-1 top-1 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Field>

          <Field label="Description">
            <textarea
              required
              name="description"
              rows={5}
              className="field"
              placeholder="Age, accessories, defects, preferred handover area…"
            />
          </Field>

          <button
            type="submit"
            className="w-full rounded-xl bg-copper py-3 text-sm font-semibold text-white hover:bg-copper-dark"
          >
            Create listing
          </button>
        </form>
      )}
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block text-sm font-medium">
      {label}

      <div className="mt-1 [&_.field]:w-full [&_.field]:rounded-xl [&_.field]:border [&_.field]:border-line [&_.field]:bg-white [&_.field]:px-3 [&_.field]:py-2.5 [&_.field]:text-sm">
        {children}
      </div>
    </label>
  )
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Could not read image'))
      }
    }

    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function getSavedListings(): Product[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      return []
    }

    const parsed: unknown = JSON.parse(saved)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isProduct)
  } catch {
    return []
  }
}

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') {
    return false
  }

  const item = value as Partial<Product>

  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.price === 'number' &&
    typeof item.city === 'string' &&
    Array.isArray(item.images)
  )
}