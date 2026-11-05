import type { Condition } from '../types'
import { cn } from '../lib/format'

const styles: Record<Condition, string> = {
  'Like New': 'bg-emerald-50 text-sage border-emerald-100',
  Excellent: 'bg-sky-50 text-sky-800 border-sky-100',
  Good: 'bg-amber-50 text-amber-900 border-amber-100',
  Fair: 'bg-stone-100 text-stone-700 border-stone-200',
}

export function ConditionBadge({ condition }: { condition: Condition }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        styles[condition],
      )}
    >
      {condition}
    </span>
  )
}
