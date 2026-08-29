import { Search as SearchIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CandidateCard } from '../components/CandidateCard'
import { ElectionCard } from '../components/ElectionCard'
import { EmptyState } from '../components/EmptyState'
import { PageHeader } from '../components/PageHeader'
import { Section } from '../components/Section'
import { TypeBadge } from '../components/TypeBadge'
import { useAppStore } from '../context/AppStore'
import { candidates, elections } from '../data'
import { resultCount, searchAll } from '../lib/search'

const EXAMPLES = ['Virginia Senate', 'Mayor', 'Elena Hartwell', 'California Governor', 'Immigration']

export function Search() {
  const { quiz } = useAppStore()
  const [params, setParams] = useSearchParams()
  const [draft, setDraft] = useState(params.get('q') ?? '')
  const query = (params.get('q') ?? '').trim()

  const results = useMemo(() => searchAll(query), [query])
  const total = resultCount(results)

  function submit(value: string) {
    const next = value.trim()
    setDraft(next)
    setParams(next ? { q: next } : {})
  }

  return (
    <div className="animate-fade-up">
      <PageHeader title="Search" subtitle="Candidates, elections, offices, places, and topics." />

      <form
        className="relative"
        onSubmit={(event) => {
          event.preventDefault()
          submit(draft)
        }}
      >
        <SearchIcon
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
          strokeWidth={1.75}
        />
        <input
          type="search"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Virginia Senate, Mayor, Immigration…"
          className="h-12 w-full rounded-xl bg-paper pl-10 pr-4 text-base text-navy shadow-border outline-none placeholder:text-subtle focus:shadow-border-hover"
          autoComplete="off"
          enterKeyHint="search"
        />
      </form>

      {!query ? (
        <div className="mt-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">Try</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => submit(example)}
                className="inline-flex h-11 items-center rounded-full bg-paper px-4 text-sm text-navy shadow-border"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {query && total === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No matches"
            body={`Nothing in the sample data for “${query}”. Try a state, office, or candidate name.`}
          />
        </div>
      ) : null}

      {query && total > 0 ? (
        <div className="mt-8">
          <p className="mb-6 text-sm text-muted">
            {total} result{total === 1 ? '' : 's'} in sample data
          </p>

          {results.elections.length > 0 ? (
            <Section title="Elections">
              <div className="flex flex-col gap-3">
                {results.elections.map((election) => (
                  <ElectionCard key={election.id} election={election} quiz={quiz} />
                ))}
              </div>
            </Section>
          ) : null}

          {results.candidates.length > 0 ? (
            <Section title="Candidates">
              <div className="flex flex-col gap-3">
                {results.candidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} quiz={quiz} />
                ))}
              </div>
            </Section>
          ) : null}

          {results.topics.length > 0 ? (
            <Section title="Topics" description="Policy areas in the sample data.">
              <ul className="flex flex-col gap-2">
                {results.topics.map((topic) => (
                  <li key={topic.id} className="rounded-2xl bg-paper p-4 shadow-border">
                    <p className="font-medium text-navy">{topic.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      Sample positions on this topic are listed on every candidate profile in the
                      demo set.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {candidates.slice(0, 4).map((candidate) => (
                        <Link
                          key={candidate.id}
                          to={`/candidates/${candidate.id}`}
                          className="inline-flex h-11 items-center rounded-full bg-cream-2 px-3 text-xs text-navy"
                        >
                          {candidate.name}
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {results.places.length > 0 ? (
            <Section title="Places">
              <ul className="flex flex-col gap-2">
                {results.places.map((place) => {
                  const local = elections.filter(
                    (election) => election.state === place || election.locality === place,
                  )
                  return (
                    <li key={place} className="rounded-2xl bg-paper p-4 shadow-border">
                      <p className="font-medium text-navy">{place}</p>
                      <p className="mt-1 text-sm text-muted">
                        {local.length} sample election{local.length === 1 ? '' : 's'}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {local.map((election) => (
                          <Link
                            key={election.id}
                            to={`/elections/${election.id}`}
                            className="inline-flex items-center gap-1.5 rounded-md bg-cream-2 px-2 py-1 text-xs text-navy"
                          >
                            <TypeBadge type={election.type} />
                            {election.offices[0]}
                          </Link>
                        ))}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Section>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
