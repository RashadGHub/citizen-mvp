import { quizQuestions } from '../data/quiz'
import type { QuizDimension, QuizScores, UserQuizAnswer } from '../types'

export const RAW_LIKERT: Record<string, number> = {
  strongly_agree: 100,
  agree: 75,
  neutral: 50,
  disagree: 25,
  strongly_disagree: 0,
}

export function contribution(rawValue: number, reverseCoded: boolean): number {
  return reverseCoded ? 100 - rawValue : rawValue
}

export function scoreQuiz(answers: UserQuizAnswer[]): QuizScores {
  const totals: Record<string, { sum: number; n: number }> = {}
  for (const question of quizQuestions) {
    const answer = answers.find((item) => item.questionId === question.id)
    if (!answer) continue
    const value = contribution(answer.rawValue, question.reverseCoded)
    const bucket = totals[question.dimension] ?? { sum: 0, n: 0 }
    bucket.sum += value
    bucket.n += 1
    totals[question.dimension] = bucket
  }

  const dimensions = {} as Record<QuizDimension, number>
  for (const question of quizQuestions) {
    const bucket = totals[question.dimension]
    dimensions[question.dimension] = bucket && bucket.n > 0 ? Math.round(bucket.sum / bucket.n) : 50
  }

  return {
    answers,
    dimensions,
    completedAt: new Date().toISOString(),
  }
}

export function isQuizComplete(answers: UserQuizAnswer[]): boolean {
  return quizQuestions.every((question) =>
    answers.some((answer) => answer.questionId === question.id),
  )
}
