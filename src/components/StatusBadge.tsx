import type { ElectionStatus } from '../types'

export function StatusBadge({ status }: { status: ElectionStatus }) {
  const active = status === 'active'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium ${
        active ? 'bg-[#e8eef5] text-blue' : 'text-muted'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-blue' : 'bg-subtle'}`}
        aria-hidden
      />
      {active ? 'Active' : 'Upcoming'}
    </span>
  )
}
