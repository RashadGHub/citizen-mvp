export { candidates, getCandidateById, getCandidatesByElection } from './candidates'
export { elections, getElectionById } from './elections'
export {
  getPosition,
  getPositionsForCandidate,
  positions,
  SAMPLE_SOURCE,
  SAMPLE_SOURCE_URL,
} from './positions'
export { policyAreaById, policyAreas } from './policyAreas'
export { DIMENSION_LABELS, LIKERT_OPTIONS, quizQuestions } from './quiz'

import { candidates } from './candidates'
import { elections } from './elections'
import { policyAreas } from './policyAreas'

export const places = Array.from(
  new Set(
    elections.flatMap((election) =>
      [election.state, election.locality].filter((value): value is string => Boolean(value)),
    ),
  ),
).sort()

export const offices = Array.from(
  new Set(elections.flatMap((election) => election.offices)),
).sort()

export const topics = policyAreas.map((area) => ({
  id: area.id,
  name: area.name,
  dimension: area.dimension,
}))

export const candidateNameList = candidates.map((candidate) => candidate.name)
