import type { AlignmentBand } from '../types'
import { bandLabel } from '../lib/alignment'

export function AlignmentChip({ band }: { band: AlignmentBand }) {
  const tone =
    band === 'high'
      ? 'bg-tint-blue text-blue'
      : band === 'moderate'
        ? 'bg-cream-2 text-navy-muted'
        : 'bg-tint-red text-red'

  return (
    <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium ${tone}`}>
      {bandLabel(band)}
    </span>
  )
}
