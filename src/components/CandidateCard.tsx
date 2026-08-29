import { Link } from 'react-router-dom'
import { compareCandidateToQuiz } from '../lib/alignment'
import type { Candidate, QuizScores } from '../types'
import { AlignmentChip } from './AlignmentChip'
import { InitialsAvatar } from './InitialsAvatar'
import { PartyChip } from './PartyChip'

export function CandidateCard({
  candidate,
  quiz,
}: {
  candidate: Candidate
  quiz: QuizScores | null
}) {
  const rows = quiz ? compareCandidateToQuiz(candidate.id, quiz) : []
  const preview = rows
    .slice()
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 3)

  return (
    <Link
      to={`/candidates/${candidate.id}`}
      className="block rounded-2xl bg-paper p-4 shadow-border transition-shadow duration-200 hover:shadow-border-hover"
    >
      <div className="flex gap-3">
        <InitialsAvatar name={candidate.name} party={candidate.party} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-medium text-navy">{candidate.name}</h3>
            <PartyChip party={candidate.party} />
          </div>
          <p className="mt-0.5 text-sm text-muted">{candidate.office}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-navy-muted line-clamp-3">
        {candidate.biography}
      </p>
      <p className="mt-3 text-xs text-subtle">
        Priorities: {candidate.priorities.slice(0, 2).join(' · ')}
      </p>
      {preview.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {preview.map((row) => (
            <span key={row.policyAreaId} className="inline-flex items-center gap-1">
              <span className="text-[11px] text-muted">{row.policyAreaName}</span>
              <AlignmentChip band={row.band} />
            </span>
          ))}
        </div>
      ) : null}
      <p className="mt-3 text-[11px] text-subtle">Sample / demo — not a verified statement</p>
    </Link>
  )
}
