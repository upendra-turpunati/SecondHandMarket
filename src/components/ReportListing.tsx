import { useState } from 'react'
import { Flag } from 'lucide-react'

export function ReportListing({ productTitle }: { productTitle: string }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('misleading')
  const [details, setDetails] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          setSubmitted(false)
        }}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-copper-dark"
      >
        <Flag className="h-4 w-4" />
        Report this listing
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <div
            role="dialog"
            aria-labelledby="report-title"
            className="w-full max-w-md rounded-2xl bg-paper p-6 shadow-2xl"
          >
            {submitted ? (
              <>
                <h2 id="report-title" className="text-lg font-semibold">
                  Saved on this device
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  This report was not sent to a server. Reporting will work only after a backend is
                  connected. Nothing has been reviewed or actioned.
                </p>
                <button
                  type="button"
                  className="mt-6 w-full rounded-xl bg-ink py-2.5 text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setSubmitted(true)
                }}
              >
                <h2 id="report-title" className="text-lg font-semibold">
                  Report listing
                </h2>
                <p className="mt-1 text-sm text-ink-muted">{productTitle}</p>
                <label className="mt-4 block text-sm font-medium">Reason</label>
                <select
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm"
                >
                  <option value="misleading">Misleading photos or description</option>
                  <option value="wrong-price">Suspicious price</option>
                  <option value="prohibited">Prohibited item</option>
                  <option value="other">Other</option>
                </select>
                <label className="mt-4 block text-sm font-medium">Details</label>
                <textarea
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm"
                  placeholder="Optional notes"
                />
                <p className="mt-3 text-xs text-ink-muted">
                  This form is UI only. It does not notify SecondHandMarket or the seller.
                </p>
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-xl border border-line py-2.5 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-ink py-2.5 text-sm font-semibold text-white"
                  >
                    Submit report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
