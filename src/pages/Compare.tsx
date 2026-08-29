import { useMemo } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { DemoBadge } from '../components/DemoBadge'
import { EmptyState } from '../components/EmptyState'
import { InitialsAvatar } from '../components/InitialsAvatar'
import { PageHeader } from '../components/PageHeader'
import { PartyChip } from '../components/PartyChip'
import { getCandidateById, getElectionById, getPosition, getCandidatesByElection, policyAreas } from '../data'
import { SAMPLE_SOURCE } from '../data/positions'

export function Compare() {
  const { id = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const election = getElectionById(id)
  const people = getCandidatesByElection(id)
  const aId = params.get('a') ?? people[0]?.id ?? ''
  const bId = params.get('b') ?? people[1]?.id ?? ''
  const a = getCandidateById(aId)
  const b = getCandidateById(bId)

  const validPair = Boolean(
    election && a && b && a.id !== b.id && a.electionId === id && b.electionId === id,
  )

  const rows = useMemo(() => {
    if (!validPair || !a || !b) return []
    return policyAreas.map((area) => ({
      area,
      left: getPosition(a.id, area.id),
      right: getPosition(b.id, area.id),
    }))
  }, [a, b, validPair])

  if (!election) {
    return (
      <EmptyState
        title="Election not found"
        body="This sample election is not in the demo set."
      />
    )
  }

  function setSlot(slot: 'a' | 'b', candidateId: string) {
    const next = new URLSearchParams(params)
    next.set(slot, candidateId)
    setParams(next)
  }

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Compare candidates"
        subtitle={`${election.name} · side by side, not a ranking.`}
        back
      />

      <div className="mb-4">
        <DemoBadge />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(['a', 'b'] as const).map((slot) => {
          const selected = slot === 'a' ? a : b
          return (
            <div key={slot} className="rounded-2xl bg-paper p-3 shadow-border">
              <label className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
                Candidate {slot.toUpperCase()}
              </label>
              <select
                className="mt-2 h-11 w-full rounded-lg bg-cream px-2 text-sm text-navy outline-none"
                value={selected?.id ?? ''}
                onChange={(event) => setSlot(slot, event.target.value)}
              >
                {people.map((person) => (
                  <option key={person.id} value={person.id} disabled={person.id === (slot === 'a' ? b?.id : a?.id)}>
                    {person.name}
                  </option>
                ))}
              </select>
              {selected ? (
                <Link to={`/candidates/${selected.id}`} className="mt-3 flex items-center gap-2">
                  <InitialsAvatar name={selected.name} party={selected.party} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-navy">{selected.name}</p>
                    <PartyChip party={selected.party} />
                  </div>
                </Link>
              ) : null}
            </div>
          )
        })}
      </div>

      {!validPair ? (
        <div className="mt-6">
          <EmptyState
            title="Pick two candidates"
            body="Choose two different sample candidates from this election."
          />
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl bg-paper shadow-border">
          <div className="grid grid-cols-[minmax(0,0.8fr)_1fr_1fr] gap-2 border-b border-line bg-cream-2/50 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.06em] text-subtle">
            <span>Issue</span>
            <span className="truncate">{a?.name.split(' ').slice(-1)[0]}</span>
            <span className="truncate">{b?.name.split(' ').slice(-1)[0]}</span>
          </div>
          <ul className="divide-y divide-line">
            {rows.map((row) => (
              <li key={row.area.id} className="grid grid-cols-[minmax(0,0.8fr)_1fr_1fr] gap-2 px-3 py-3">
                <p className="text-xs font-medium leading-snug text-navy sm:text-sm">{row.area.name}</p>
                <p className="text-xs leading-relaxed text-navy-muted sm:text-sm">{row.left?.position}</p>
                <p className="text-xs leading-relaxed text-navy-muted sm:text-sm">{row.right?.position}</p>
              </li>
            ))}
          </ul>
          <p className="border-t border-line px-3 py-3 text-[11px] leading-relaxed text-subtle">
            {SAMPLE_SOURCE}. This table is a sports-style overlay of sample positions — it does not
            pick a winner or recommend a candidate.
          </p>
        </div>
      )}
    </div>
  )
}
