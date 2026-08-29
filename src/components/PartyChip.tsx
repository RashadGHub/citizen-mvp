import type { Party } from '../types'

const STYLES: Record<Party, string> = {
  Democrat: 'bg-tint-blue text-blue',
  Republican: 'bg-tint-red text-red',
  Independent: 'bg-tint-neutral text-navy-muted',
  Other: 'bg-tint-neutral text-navy-muted',
}

const SHORT: Record<Party, string> = {
  Democrat: 'D',
  Republican: 'R',
  Independent: 'I',
  Other: 'O',
}

export function PartyChip({
  party,
  compact = false,
}: {
  party: Party
  compact?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium tracking-wide ${STYLES[party]}`}
    >
      {compact ? SHORT[party] : party}
    </span>
  )
}
