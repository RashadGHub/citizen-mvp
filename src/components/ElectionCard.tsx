import { Link } from 'react-router-dom'
import { candidates as allCandidates } from '../data'
import { electionAlignmentSummary } from '../lib/alignment'
import { countdownLabel, formatShortDate } from '../lib/dates'
import type { Election, QuizScores } from '../types'
import { DemoBadge } from './DemoBadge'
import { PartyChip } from './PartyChip'
import { StatusBadge } from './StatusBadge'
import { TypeBadge } from './TypeBadge'

export function ElectionCard({
  election,
  quiz,
}: {
  election: Election
  quiz: QuizScores | null
}) {
  const people = allCandidates.filter((candidate) =>
    election.candidateIds.includes(candidate.id),
  )
  const place = election.locality ? `${election.locality}, ${election.state}` : election.state
  const alignment =
    quiz && election.candidateIds.length > 0
      ? electionAlignmentSummary(election.candidateIds, quiz)
      : null

  return (
    <Link
      to={`/elections/${election.id}`}
      className="block rounded-2xl bg-paper p-4 shadow-border transition-shadow duration-200 hover:shadow-border-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <TypeBadge type={election.type} />
          <StatusBadge status={election.status} />
        </div>
        <span className="tabular shrink-0 text-xs font-medium text-muted">
          {countdownLabel(election.date, election.status)}
        </span>
      </div>

      <h3 className="mt-3 font-serif text-[20px] leading-snug text-navy">{election.name}</h3>
      <p className="mt-1 text-sm text-muted">
        {place} · {formatShortDate(election.date)}
      </p>
      <p className="mt-2 text-sm text-navy-muted">{election.offices.join(' · ')}</p>

      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {people.map((person) => (
          <span key={person.id} className="inline-flex items-center gap-1.5 text-sm text-navy">
            {person.name.split(' ').slice(-1)[0]}
            <PartyChip party={person.party} compact />
          </span>
        ))}
      </div>

      {alignment && alignment.count > 0 ? (
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {alignment.count} area{alignment.count === 1 ? '' : 's'} aligned with your responses
          {alignment.names.length ? `: ${alignment.names.slice(0, 3).join(', ')}` : ''}
        </p>
      ) : null}

      <div className="mt-3">
        <DemoBadge />
      </div>
    </Link>
  )
}
