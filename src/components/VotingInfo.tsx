import { formatLongDate } from '../lib/dates'
import type { Election } from '../types'

export function VotingInfo({ election }: { election: Election }) {
  return (
    <div className="rounded-2xl bg-paper p-4 shadow-border">
      <h2 className="text-[15px] font-semibold text-navy">Voting information</h2>
      <p className="mt-1 text-xs text-subtle">Generic overview — not official election guidance.</p>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-muted">Election day</dt>
          <dd className="mt-0.5 text-navy">{formatLongDate(election.date)}</dd>
        </div>
        <div>
          <dt className="text-muted">Typical polling hours</dt>
          <dd className="mt-0.5 text-navy">Often 6:00 a.m. to 7:00 p.m. local time. Confirm locally.</dd>
        </div>
        <div>
          <dt className="text-muted">What to bring</dt>
          <dd className="mt-0.5 leading-relaxed text-navy">
            Many jurisdictions ask for photo identification. Rules vary by state. Bring the ID your
            local election office lists, and your polling location if you have it.
          </dd>
        </div>
        <div>
          <dt className="text-muted">Official source</dt>
          <dd className="mt-0.5 leading-relaxed text-navy">
            Check your state or local election office for registration status, absentee rules, and
            polling places. Citizen does not register voters or collect ballots.
          </dd>
        </div>
      </dl>
    </div>
  )
}
