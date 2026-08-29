import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CandidateCard } from '../components/CandidateCard'
import { ElectionCard } from '../components/ElectionCard'
import { EmptyState } from '../components/EmptyState'
import { PageHeader } from '../components/PageHeader'
import { ScoreBar } from '../components/ScoreBar'
import { Section } from '../components/Section'
import { useAppStore } from '../context/AppStore'
import { DIMENSION_LABELS, getCandidateById, getElectionById } from '../data'
import type { QuizDimension } from '../types'

const DIMENSIONS = Object.keys(DIMENSION_LABELS) as QuizDimension[]

export function Profile() {
  const store = useAppStore()
  const [confirmLogout, setConfirmLogout] = useState(false)

  const savedElections = store.savedElectionIds
    .map((id) => getElectionById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
  const savedCandidates = store.savedCandidateIds
    .map((id) => getCandidateById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <div className="animate-fade-up">
      <PageHeader title="Profile" subtitle="Stored only in this browser." />

      <Section title="Account">
        <form
          className="space-y-3 rounded-2xl bg-paper p-4 shadow-border"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field
            label="Name"
            value={store.user.name}
            onChange={(value) => store.updateUser({ name: value })}
            placeholder="Your name"
          />
          <Field
            label="Email"
            type="email"
            value={store.user.email}
            onChange={(value) => store.updateUser({ email: value })}
            placeholder="you@example.com"
          />
          <Field
            label="Location"
            value={store.user.location}
            onChange={(value) => store.updateUser({ location: value })}
            placeholder="City, State"
          />
          <p className="text-[11px] text-subtle">Saved automatically on this device.</p>
        </form>
      </Section>

      <Section
        title="Quiz summary"
        action={
          <Link to={store.quiz ? '/quiz/results' : '/quiz'} className="text-sm font-medium text-blue">
            {store.quiz ? 'View' : 'Take quiz'}
          </Link>
        }
      >
        {store.quiz ? (
          <div className="rounded-2xl bg-paper p-4 shadow-border">
            <div className="flex flex-col gap-4">
              {DIMENSIONS.slice(0, 5).map((dimension) => (
                <ScoreBar
                  key={dimension}
                  value={store.quiz!.dimensions[dimension]}
                  label={DIMENSION_LABELS[dimension]}
                />
              ))}
            </div>
            <Link to="/quiz/results" className="mt-4 inline-flex h-11 items-center text-sm font-medium text-blue">
              Full profile
            </Link>
          </div>
        ) : (
          <EmptyState
            title="No quiz yet"
            body="Twenty questions. Results stay on this device and unlock alignment chips."
            action={
              <Link
                to="/quiz"
                className="inline-flex h-11 items-center rounded-xl bg-navy px-5 text-sm font-medium text-cream"
              >
                Start quiz
              </Link>
            }
          />
        )}
      </Section>

      <Section title="Saved elections">
        {savedElections.length === 0 ? (
          <EmptyState
            title="Nothing saved"
            body="Bookmark elections from the feed or an election page. They stay on this device."
          />
        ) : (
          <div className="flex flex-col gap-3">
            {savedElections.map((election) => (
              <ElectionCard key={election.id} election={election} quiz={store.quiz} />
            ))}
          </div>
        )}
      </Section>

      <Section title="Saved candidates">
        {savedCandidates.length === 0 ? (
          <EmptyState
            title="No saved candidates"
            body="Save a candidate from their profile to keep them here."
          />
        ) : (
          <div className="flex flex-col gap-3">
            {savedCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} quiz={store.quiz} />
            ))}
          </div>
        )}
      </Section>

      <Section title="Notifications" description="Local toggles only. Citizen does not send messages.">
        <div className="overflow-hidden rounded-2xl bg-paper shadow-border">
          <Toggle
            label="Election reminders"
            description="A local flag you can use later. Nothing is sent."
            checked={store.notifications.electionReminders}
            onChange={(checked) => store.updateNotifications({ electionReminders: checked })}
          />
          <Toggle
            label="Quiz nudge"
            description="Remember to finish or retake the quiz."
            checked={store.notifications.quizNudge}
            onChange={(checked) => store.updateNotifications({ quizNudge: checked })}
          />
          <Toggle
            label="Saved item notes"
            description="Keep a local reminder on saved races."
            checked={store.notifications.savedUpdates}
            onChange={(checked) => store.updateNotifications({ savedUpdates: checked })}
          />
        </div>
      </Section>

      <Section title="Privacy">
        <div className="overflow-hidden rounded-2xl bg-paper shadow-border">
          <Toggle
            label="Store quiz locally"
            description="If off, new results are not written to localStorage."
            checked={store.privacy.storeQuizLocally}
            onChange={(checked) => store.updatePrivacy({ storeQuizLocally: checked })}
          />
          <Toggle
            label="Store saves locally"
            description="If off, saved elections and candidates are not persisted."
            checked={store.privacy.storeSavesLocally}
            onChange={(checked) => store.updatePrivacy({ storeSavesLocally: checked })}
          />
        </div>
      </Section>

      <Section title="Account settings">
        <div className="rounded-2xl bg-paper p-4 shadow-border">
          <p className="text-sm leading-relaxed text-muted">
            Citizen has no server account. Log out clears the local session, including name, quiz,
            and saves on this device.
          </p>
          {confirmLogout ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  store.logout()
                  setConfirmLogout(false)
                }}
                className="inline-flex h-11 items-center rounded-xl bg-red px-5 text-sm font-medium text-white"
              >
                Clear local data
              </button>
              <button
                type="button"
                onClick={() => setConfirmLogout(false)}
                className="inline-flex h-11 items-center rounded-xl px-4 text-sm font-medium text-navy"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmLogout(true)}
              className="mt-4 inline-flex h-11 items-center rounded-xl bg-paper px-5 text-sm font-medium text-navy shadow-border"
            >
              Log out
            </button>
          )}
        </div>
      </Section>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-11 w-full rounded-lg bg-cream px-3 text-sm text-navy outline-none"
      />
    </label>
  )
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex min-h-14 cursor-pointer items-center justify-between gap-4 border-b border-line px-4 py-3 last:border-b-0">
      <span>
        <span className="block text-sm font-medium text-navy">{label}</span>
        <span className="block text-xs text-muted">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-navy"
      />
    </label>
  )
}
