import type { Party } from '../types'

const STYLES: Record<Party, string> = {
  Democrat: 'bg-[#e8eef5] text-blue',
  Republican: 'bg-[#f6e8ea] text-red',
  Independent: 'bg-[#ececec] text-navy-muted',
  Other: 'bg-[#ececec] text-navy-muted',
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
