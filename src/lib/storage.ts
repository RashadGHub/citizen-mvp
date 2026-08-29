import type { AppPersistedState } from '../types'

export const STORAGE_KEY = 'citizen.app.v1'

export const defaultState: AppPersistedState = {
  user: {
    name: '',
    email: '',
    location: '',
  },
  quiz: null,
  savedElectionIds: [],
  savedCandidateIds: [],
  notifications: {
    electionReminders: true,
    quizNudge: false,
    savedUpdates: true,
  },
  privacy: {
    storeQuizLocally: true,
    storeSavesLocally: true,
  },
}

export function loadState(): AppPersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<AppPersistedState>
    return {
      ...defaultState,
      ...parsed,
      user: { ...defaultState.user, ...parsed.user },
      notifications: { ...defaultState.notifications, ...parsed.notifications },
      privacy: { ...defaultState.privacy, ...parsed.privacy },
      savedElectionIds: parsed.savedElectionIds ?? [],
      savedCandidateIds: parsed.savedCandidateIds ?? [],
      quiz: parsed.quiz ?? null,
    }
  } catch {
    return defaultState
  }
}

export function saveState(state: AppPersistedState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY)
}
