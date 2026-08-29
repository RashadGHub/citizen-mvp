import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { clearState, defaultState, loadState, saveState } from '../lib/storage'
import type {
  AppPersistedState,
  NotificationSettings,
  PrivacySettings,
  QuizScores,
  User,
} from '../types'

interface AppStoreValue extends AppPersistedState {
  updateUser: (patch: Partial<User>) => void
  setQuiz: (quiz: QuizScores | null) => void
  toggleSavedElection: (id: string) => void
  toggleSavedCandidate: (id: string) => void
  isElectionSaved: (id: string) => boolean
  isCandidateSaved: (id: string) => boolean
  updateNotifications: (patch: Partial<NotificationSettings>) => void
  updatePrivacy: (patch: Partial<PrivacySettings>) => void
  logout: () => void
}

const AppStoreContext = createContext<AppStoreValue | null>(null)

function persist(next: AppPersistedState): AppPersistedState {
  const stored: AppPersistedState = {
    ...next,
    quiz: next.privacy.storeQuizLocally ? next.quiz : null,
    savedElectionIds: next.privacy.storeSavesLocally ? next.savedElectionIds : [],
    savedCandidateIds: next.privacy.storeSavesLocally ? next.savedCandidateIds : [],
  }
  saveState(stored)
  return next
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppPersistedState>(() => loadState())

  const commit = useCallback((updater: (prev: AppPersistedState) => AppPersistedState) => {
    setState((prev) => persist(updater(prev)))
  }, [])

  const value = useMemo<AppStoreValue>(() => {
    return {
      ...state,
      updateUser: (patch) => commit((prev) => ({ ...prev, user: { ...prev.user, ...patch } })),
      setQuiz: (quiz) => commit((prev) => ({ ...prev, quiz })),
      toggleSavedElection: (id) =>
        commit((prev) => ({
          ...prev,
          savedElectionIds: prev.savedElectionIds.includes(id)
            ? prev.savedElectionIds.filter((item) => item !== id)
            : [...prev.savedElectionIds, id],
        })),
      toggleSavedCandidate: (id) =>
        commit((prev) => ({
          ...prev,
          savedCandidateIds: prev.savedCandidateIds.includes(id)
            ? prev.savedCandidateIds.filter((item) => item !== id)
            : [...prev.savedCandidateIds, id],
        })),
      isElectionSaved: (id) => state.savedElectionIds.includes(id),
      isCandidateSaved: (id) => state.savedCandidateIds.includes(id),
      updateNotifications: (patch) =>
        commit((prev) => ({
          ...prev,
          notifications: { ...prev.notifications, ...patch },
        })),
      updatePrivacy: (patch) =>
        commit((prev) => ({ ...prev, privacy: { ...prev.privacy, ...patch } })),
      logout: () => {
        clearState()
        setState(defaultState)
      },
    }
  }, [commit, state])

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

export function useAppStore(): AppStoreValue {
  const value = useContext(AppStoreContext)
  if (!value) throw new Error('useAppStore must be used within AppStoreProvider')
  return value
}
