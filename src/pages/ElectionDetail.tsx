import { ArrowRightLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { CandidateCard } from '../components/CandidateCard'
import { DemoBadge } from '../components/DemoBadge'
import { EmptyState } from '../components/EmptyState'
import { PageHeader } from '../components/PageHeader'
import { SaveButton } from '../components/SaveButton'
import { Section } from '../components/Section'
import { StatusBadge } from '../components/StatusBadge'
import { TypeBadge } from '../components/TypeBadge'
import { VotingInfo } from '../components/VotingInfo'
import { useAppStore } from '../context/AppStore'
import { getCandidatesByElection, getElectionById } from '../data'
import { formatLongDate } from '../lib/dates'

export function ElectionDetail() {
  const { id = '' } = useParams()
  const election = getElectionById(id)
  const people = getCandidatesByElection(id)
  const { quiz, isElectionSaved, toggleSavedElection } = useAppStore()

  if (!election) {
    return (
      <EmptyState
        title="Election not found"
        body="This sample election is not in the demo set."
        action={
          <Link to="/" className="inline-flex h-11 items-center text-sm font-medium text-blue">
            Back to feed
          </Link>
        }
      />
    )
  }

  const place = election.locality ? `${election.locality}, ${election.state}` : election.state
  const saved = isElectionSaved(election.id)

  return (
    <div className="animate-fade-up">
      <PageHeader
        title={election.name}
        back
        trailing={
          <SaveButton
            saved={saved}
            onToggle={() => toggleSavedElection(election.id)}
            label={election.name}
          />
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <TypeBadge type={election.type} />
        <StatusBadge status={election.status} />
        <DemoBadge />
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">Location</dt>
          <dd className="mt-0.5 text-navy">{place}</dd>
        </div>
        <div>
          <dt className="text-muted">Date</dt>
          <dd className="mt-0.5 tabular text-navy">{formatLongDate(election.date)}</dd>
        </div>
        <div>
          <dt className="text-muted">Office</dt>
          <dd className="mt-0.5 text-navy">{election.offices.join(', ')}</dd>
        </div>
        <div>
          <dt className="text-muted">Category</dt>
          <dd className="mt-0.5 capitalize text-navy">{election.type}</dd>
        </div>
      </dl>

      <p className="mt-4 text-sm leading-relaxed text-muted">{election.summary}</p>

      <div className="mt-8">
        <VotingInfo election={election} />
      </div>

      <div className="mt-8">
        <Section
          title="Candidates"
          description="Fictional sample candidates. Initials only — no photos of real people."
          action={
            people.length >= 2 ? (
              <Link
                to={`/elections/${election.id}/compare?a=${people[0].id}&b=${people[1].id}`}
                className="inline-flex h-11 items-center gap-2 text-sm font-medium text-blue"
              >
                <ArrowRightLeft className="h-4 w-4" strokeWidth={1.75} />
                Compare
              </Link>
            ) : null
          }
        >
          <div className="flex flex-col gap-3">
            {people.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} quiz={quiz} />
            ))}
          </div>
        </Section>
      </div>

      {people.length >= 2 ? (
        <Link
          to={`/elections/${election.id}/compare?a=${people[0].id}&b=${people[1].id}`}
          className="mb-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy text-sm font-medium text-cream"
        >
          Compare candidates
        </Link>
      ) : null}
    </div>
  )
}
