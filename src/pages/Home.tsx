import { useMemo, useState } from 'react'
import { ElectionCard } from '../components/ElectionCard'
import { FilterChips } from '../components/FilterChips'
import { Wordmark } from '../components/Wordmark'
import { useAppStore } from '../context/AppStore'
import { elections } from '../data'
import type { Election } from '../types'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'local', label: 'Local' },
  { id: 'state', label: 'State' },
  { id: 'federal', label: 'Federal' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'active', label: 'Active' },
] as const

function matchesFilter(election: Election, filter: string): boolean {
  if (filter === 'all') return true
  if (filter === 'local' || filter === 'state' || filter === 'federal') {
    return election.type === filter
  }
  if (filter === 'upcoming' || filter === 'active') {
    return election.status === filter
  }
  return true
}

export function Home() {
  const { quiz } = useAppStore()
  const [filter, setFilter] = useState('all')

  const feed = useMemo(() => {
    return elections
      .filter((election) => matchesFilter(election, filter))
      .slice()
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === 'active' ? -1 : 1
        return a.date.localeCompare(b.date)
      })
  }, [filter])

  return (
    <div className="animate-fade-up">
      <div className="mb-5 flex items-end justify-between gap-3 md:hidden">
        <div>
          <Wordmark size="lg" />
          <p className="mt-1 text-sm text-muted">U.S. elections, plainly</p>
        </div>
        <span className="inline-flex items-center rounded-md border border-line bg-paper px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-subtle">
          Demo data
        </span>
      </div>

      <div className="mb-2 hidden items-end justify-between md:flex">
        <div>
          <h1 className="font-serif text-[32px] leading-tight">Elections</h1>
          <p className="mt-1 text-sm text-muted">Browse upcoming and active U.S. contests.</p>
        </div>
        <span className="inline-flex items-center rounded-md border border-line bg-paper px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-subtle">
          Demo data
        </span>
      </div>

      <div className="mt-4">
        <FilterChips chips={[...FILTERS]} value={filter} onChange={setFilter} />
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {feed.length === 0 ? (
          <p className="rounded-2xl bg-paper px-4 py-8 text-center text-sm text-muted shadow-border">
            No elections in this filter.
          </p>
        ) : (
          feed.map((election) => (
            <ElectionCard key={election.id} election={election} quiz={quiz} />
          ))
        )}
      </div>
    </div>
  )
}
