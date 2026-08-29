import { ArrowRightLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { AlignmentTable } from '../components/AlignmentTable'
import { DemoBadge } from '../components/DemoBadge'
import { EmptyState } from '../components/EmptyState'
import { InitialsAvatar } from '../components/InitialsAvatar'
import { PageHeader } from '../components/PageHeader'
import { PartyChip } from '../components/PartyChip'
import { SaveButton } from '../components/SaveButton'
import { Section } from '../components/Section'
import { useAppStore } from '../context/AppStore'
import { getCandidateById, getElectionById, getPositionsForCandidate, policyAreaById } from '../data'
import { SAMPLE_SOURCE } from '../data/positions'
import { compareCandidateToQuiz } from '../lib/alignment'

export function CandidateProfile() {
  const { id = '' } = useParams()
  const candidate = getCandidateById(id)
  const election = candidate ? getElectionById(candidate.electionId) : undefined
  const positions = candidate ? getPositionsForCandidate(candidate.id) : []
  const { quiz, isCandidateSaved, toggleSavedCandidate } = useAppStore()

  if (!candidate || !election) {
    return (
      <EmptyState
        title="Candidate not found"
        body="This sample candidate is not in the demo set."
        action={
          <Link to="/" className="inline-flex h-11 items-center text-sm font-medium text-blue">
            Back to feed
          </Link>
        }
      />
    )
  }

  const others = election.candidateIds.filter((item) => item !== candidate.id)
  const compareTo = others[0]
  const rows = quiz ? compareCandidateToQuiz(candidate.id, quiz) : []
  const saved = isCandidateSaved(candidate.id)

  return (
    <div className="animate-fade-up">
      <PageHeader
        title={candidate.name}
        back
        trailing={
          <SaveButton
            saved={saved}
            onToggle={() => toggleSavedCandidate(candidate.id)}
            label={candidate.name}
          />
        }
      />

      <div className="flex items-start gap-4">
        <InitialsAvatar name={candidate.name} party={candidate.party} size="lg" />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <PartyChip party={candidate.party} />
            <DemoBadge />
          </div>
          <p className="mt-2 text-sm text-muted">
            {candidate.office} · {election.name}
          </p>
        </div>
      </div>

      <Section title="About">
        <p className="text-sm leading-relaxed text-navy-muted">{candidate.biography}</p>
      </Section>

      <Section title="Core priorities">
        <ul className="space-y-2">
          {candidate.priorities.map((item) => (
            <li key={item} className="rounded-xl bg-paper px-4 py-3 text-sm text-navy shadow-border">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {quiz ? (
        <Section
          title="Compare with you"
          description="Issue-by-issue overlay of your quiz responses and this candidate’s sample stance scores."
        >
          <AlignmentTable rows={rows} />
        </Section>
      ) : (
        <div className="mb-8 rounded-2xl bg-paper p-4 shadow-border">
          <p className="text-sm font-medium text-navy">Compare with you</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Take the quiz to see alignment with your quiz responses. Alignment is
            informational only.
          </p>
          <Link
            to="/quiz"
            className="mt-3 inline-flex h-11 items-center text-sm font-medium text-blue"
          >
            Take the quiz
          </Link>
        </div>
      )}

      <Section
        title="Policy areas"
        description="Concise sample positions. Not verified statements."
      >
        <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-paper shadow-border">
          {positions.map((position) => {
            const area = policyAreaById[position.policyAreaId]
            return (
              <li key={position.policyAreaId} className="px-4 py-4">
                <p className="text-sm font-medium text-navy">{area?.name ?? position.policyAreaId}</p>
                <p className="mt-1 text-sm leading-relaxed text-navy-muted">{position.position}</p>
                <p className="mt-2 text-[11px] text-subtle">
                  Source:{' '}
                  <a href={position.sourceUrl} className="underline decoration-line underline-offset-2">
                    {SAMPLE_SOURCE}
                  </a>
                </p>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section title="Sources">
        <p className="text-sm leading-relaxed text-muted">
          Every position in this profile is labeled sample / demo. Replace{' '}
          <code className="rounded bg-cream-2 px-1 text-[13px]">src/data</code> with an API or
          researched statements before any public launch.
        </p>
      </Section>

      {compareTo ? (
        <Link
          to={`/elections/${election.id}/compare?a=${candidate.id}&b=${compareTo}`}
          className="mb-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy text-sm font-medium text-cream"
        >
          <ArrowRightLeft className="h-4 w-4" strokeWidth={1.75} />
          Compare with another candidate
        </Link>
      ) : null}
    </div>
  )
}
