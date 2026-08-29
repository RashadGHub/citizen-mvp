import { policyAreas } from '../data/policyAreas'
import { getPositionsForCandidate } from '../data/positions'
import type { AlignmentBand, CandidatePosition, QuizDimension, QuizScores } from '../types'

export interface AreaAlignment {
  policyAreaId: string
  policyAreaName: string
  dimension: QuizDimension
  userScore: number
  candidateScore: number
  diff: number
  band: AlignmentBand
  position: CandidatePosition
}

export function alignmentBand(diff: number): AlignmentBand {
  if (diff < 15) return 'high'
  if (diff < 30) return 'moderate'
  return 'low'
}

export function bandLabel(band: AlignmentBand): string {
  if (band === 'high') return 'High alignment'
  if (band === 'moderate') return 'Moderate alignment'
  return 'Low alignment'
}

export function compareCandidateToQuiz(
  candidateId: string,
  quiz: QuizScores,
): AreaAlignment[] {
  const positions = getPositionsForCandidate(candidateId)
  return positions.map((position) => {
    const area = policyAreas.find((item) => item.id === position.policyAreaId)!
    const userScore = quiz.dimensions[area.dimension]
    const diff = Math.abs(userScore - position.stanceScore)
    return {
      policyAreaId: area.id,
      policyAreaName: area.name,
      dimension: area.dimension,
      userScore,
      candidateScore: position.stanceScore,
      diff,
      band: alignmentBand(diff),
      position,
    }
  })
}

export function highAlignmentAreas(rows: AreaAlignment[]): AreaAlignment[] {
  return rows.filter((row) => row.band === 'high')
}

export function electionAlignmentSummary(
  candidateIds: string[],
  quiz: QuizScores,
): { count: number; names: string[] } {
  const highNames = new Set<string>()
  for (const candidateId of candidateIds) {
    for (const row of compareCandidateToQuiz(candidateId, quiz)) {
      if (row.band === 'high') highNames.add(row.policyAreaName)
    }
  }
  const names = Array.from(highNames)
  return { count: names.length, names }
}
