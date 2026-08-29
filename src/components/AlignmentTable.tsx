import type { AreaAlignment } from '../lib/alignment'
import { AlignmentChip } from './AlignmentChip'
import { ScoreBar } from './ScoreBar'

export function AlignmentTable({ rows }: { rows: AreaAlignment[] }) {
  const sorted = rows.slice().sort((a, b) => a.diff - b.diff)
  const explore = sorted.filter((row) => row.band === 'low').map((row) => row.policyAreaName)

  return (
    <div className="overflow-hidden rounded-2xl bg-paper shadow-border">
      <div className="hidden grid-cols-[1.2fr_1fr_1fr] gap-3 border-b border-line px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.06em] text-subtle sm:grid">
        <span>Issue</span>
        <span>You</span>
        <span>Candidate</span>
      </div>
      <ul className="divide-y divide-line">
        {sorted.map((row) => (
          <li key={row.policyAreaId} className="px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-navy">{row.policyAreaName}</p>
              <AlignmentChip band={row.band} />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <ScoreBar value={row.userScore} tone="navy" label="You" />
              <ScoreBar value={row.candidateScore} tone="muted" label="Candidate" />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">{row.position.position}</p>
          </li>
        ))}
      </ul>
      {explore.length > 0 ? (
        <p className="border-t border-line px-4 py-3 text-xs leading-relaxed text-navy-muted">
          Policy areas to explore: {explore.join(', ')}
        </p>
      ) : null}
      <p className="border-t border-line px-4 py-3 text-[11px] leading-relaxed text-subtle">
        Alignment with your quiz responses uses sample stance scores. High: difference under 15.
        Moderate: under 30. Otherwise low. Informational only — not a ranking or recommendation.
      </p>
    </div>
  )
}
