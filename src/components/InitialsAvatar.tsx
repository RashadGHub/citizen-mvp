import type { Party } from '../types'

function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

const PARTY_TONE: Record<Party, string> = {
  Democrat: 'bg-tint-blue text-blue',
  Republican: 'bg-tint-red text-red',
  Independent: 'bg-tint-neutral text-navy-muted',
  Other: 'bg-tint-neutral text-navy-muted',
}

export function InitialsAvatar({
  name,
  party,
  size = 'md',
}: {
  name: string
  party: Party
  size?: 'sm' | 'md' | 'lg'
}) {
  const dim =
    size === 'lg' ? 'h-14 w-14 text-lg' : size === 'sm' ? 'h-9 w-9 text-xs' : 'h-11 w-11 text-sm'

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-medium ${dim} ${PARTY_TONE[party]}`}
      aria-hidden
    >
      {initials(name)}
    </div>
  )
}
