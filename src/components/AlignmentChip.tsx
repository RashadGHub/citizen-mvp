import type { AlignmentBand } from '../types'
import { bandLabel } from '../lib/alignment'

export function AlignmentChip({ band }: { band: AlignmentBand }) {
  const tone =
    band === 'high'
      ? 'bg-[#e8eef5] text-blue'
      : band === 'moderate'
        ? 'bg-cream-2 text-navy-muted'
        : 'bg-[#f6e8ea] text-red'

  return (
    <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium ${tone}`}>
      {bandLabel(band)}
    </span>
  )
}
