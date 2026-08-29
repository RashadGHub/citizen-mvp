import type { ElectionType } from '../types'

const LABEL: Record<ElectionType, string> = {
  local: 'Local',
  state: 'State',
  federal: 'Federal',
}

export function TypeBadge({ type }: { type: ElectionType }) {
  return (
    <span className="inline-flex items-center rounded-md bg-cream-2 px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em] text-navy-muted">
      {LABEL[type]}
    </span>
  )
}
