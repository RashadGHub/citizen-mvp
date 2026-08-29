export type ElectionType = 'local' | 'state' | 'federal'
export type ElectionStatus = 'upcoming' | 'active'
export type Party = 'Democrat' | 'Republican' | 'Independent' | 'Other'
export type AlignmentBand = 'high' | 'moderate' | 'low'

export type QuizDimension =
  | 'economic_policy'
  | 'government_spending'
  | 'taxes'
  | 'social_policy'
  | 'healthcare'
  | 'immigration'
  | 'foreign_policy'
  | 'environment'
  | 'crime'
  | 'government_regulation'

export type LikertKey =
  | 'strongly_agree'
  | 'agree'
  | 'neutral'
  | 'disagree'
  | 'strongly_disagree'

export interface User {
  name: string
  email: string
  location: string
}

export interface Election {
  id: string
  name: string
  type: ElectionType
  state: string
  locality: string | null
  date: string
  status: ElectionStatus
  offices: string[]
  candidateIds: string[]
  summary: string
}

export interface Candidate {
  id: string
  name: string
  party: Party
  office: string
  biography: string
  electionId: string
  priorities: string[]
  values: string[]
}

export interface PolicyArea {
  id: string
  name: string
  dimension: QuizDimension
}

export interface CandidatePosition {
  candidateId: string
  policyAreaId: string
  position: string
  source: string
  sourceUrl: string
  stanceScore: number
}

export interface QuizQuestion {
  id: string
  text: string
  dimension: QuizDimension
  reverseCoded: boolean
}

export interface UserQuizAnswer {
  questionId: string
  rawValue: number
}

export interface NotificationSettings {
  electionReminders: boolean
  quizNudge: boolean
  savedUpdates: boolean
}

export interface PrivacySettings {
  storeQuizLocally: boolean
  storeSavesLocally: boolean
}

export interface QuizScores {
  answers: UserQuizAnswer[]
  dimensions: Record<QuizDimension, number>
  completedAt: string
}

export interface AppPersistedState {
  user: User
  quiz: QuizScores | null
  savedElectionIds: string[]
  savedCandidateIds: string[]
  notifications: NotificationSettings
  privacy: PrivacySettings
}
