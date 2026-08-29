import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { ScoreBar } from '../components/ScoreBar'
import { useAppStore } from '../context/AppStore'
import { DIMENSION_LABELS, LIKERT_OPTIONS, quizQuestions } from '../data'
import { isQuizComplete, scoreQuiz } from '../lib/quiz'
import type { QuizDimension, UserQuizAnswer } from '../types'

const DIMENSION_ORDER: QuizDimension[] = [
  'economic_policy',
  'government_spending',
  'taxes',
  'social_policy',
  'healthcare',
  'immigration',
  'foreign_policy',
  'environment',
  'crime',
  'government_regulation',
]

export function Quiz() {
  const { quiz, setQuiz } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()
  const showResults = location.pathname.endsWith('/results') && quiz !== null

  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<UserQuizAnswer[]>(quiz?.answers ?? [])
  const [taking, setTaking] = useState(!quiz)

  const question = quizQuestions[index]
  const currentAnswer = answers.find((item) => item.questionId === question?.id)
  const progress = Math.round(((index + (currentAnswer ? 1 : 0)) / quizQuestions.length) * 100)

  function setAnswer(rawValue: number) {
    if (!question) return
    setAnswers((prev) => {
      const next = prev.filter((item) => item.questionId !== question.id)
      return [...next, { questionId: question.id, rawValue }]
    })
  }

  function goNext() {
    if (index < quizQuestions.length - 1) {
      setIndex((value) => value + 1)
      return
    }
    if (!isQuizComplete(answers)) return
    const scored = scoreQuiz(answers)
    setQuiz(scored)
    setTaking(false)
    navigate('/quiz/results')
  }

  function retake() {
    setAnswers([])
    setIndex(0)
    setTaking(true)
    navigate('/quiz')
  }

  if (showResults && quiz && !taking) {
    return <QuizResults onRetake={retake} />
  }

  if (!taking && quiz) {
    return <QuizResults onRetake={retake} />
  }

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Quiz"
        subtitle="20 questions. Your answers stay on this device."
      />

      <div className="mb-6">
        <div className="mb-2 flex items-baseline justify-between text-xs text-muted">
          <span>
            Question {index + 1} of {quizQuestions.length}
          </span>
          <span className="tabular">{Math.min(progress, 100)}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-cream-2">
          <div
            className="h-full rounded-full bg-navy transition-[width] duration-200"
            style={{ width: `${((index + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-paper p-5 shadow-border">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
          {DIMENSION_LABELS[question.dimension]}
        </p>
        <h2 className="mt-3 font-serif text-[22px] leading-snug text-navy">{question.text}</h2>
        <fieldset className="mt-6 space-y-2">
          <legend className="sr-only">Select a response</legend>
          {LIKERT_OPTIONS.map((option) => {
            const selected = currentAnswer?.rawValue === option.value
            return (
              <label
                key={option.key}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-200 ${
                  selected ? 'bg-cream-2' : 'hover:bg-cream'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={selected}
                  onChange={() => setAnswer(option.value)}
                  className="h-4 w-4 accent-navy"
                />
                <span className="text-sm text-navy">{option.label}</span>
              </label>
            )
          })}
        </fieldset>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
          className="inline-flex h-11 items-center rounded-xl px-4 text-sm font-medium text-navy disabled:text-subtle"
        >
          Back
        </button>
        <button
          type="button"
          disabled={!currentAnswer}
          onClick={goNext}
          className="inline-flex h-11 min-w-28 items-center justify-center rounded-xl bg-navy px-5 text-sm font-medium text-cream disabled:opacity-40"
        >
          {index === quizQuestions.length - 1 ? 'See profile' : 'Next'}
        </button>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-subtle">
        Reverse-coded questions are scored as 100 minus the raw value so each dimension stays on
        one scale. Results describe your responses only — not a party label, and not a correct
        answer.
      </p>
    </div>
  )
}

function QuizResults({ onRetake }: { onRetake: () => void }) {
  const { quiz } = useAppStore()
  const rows = useMemo(() => {
    if (!quiz) return []
    return DIMENSION_ORDER.map((dimension) => ({
      dimension,
      label: DIMENSION_LABELS[dimension],
      value: quiz.dimensions[dimension],
    }))
  }, [quiz])

  if (!quiz) return null

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Your Citizen Profile"
        subtitle="These bars reflect your quiz responses only."
      />

      <div className="rounded-2xl bg-paper p-5 shadow-border">
        <div className="flex flex-col gap-5">
          {rows.map((row) => (
            <ScoreBar key={row.dimension} value={row.value} label={row.label} />
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        Higher scores indicate more support for a larger public or regulatory role on that topic.
        Lower scores indicate more support for a market-led or less-regulatory approach. This is a
        comparison scale, not a grade.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex h-11 items-center rounded-xl bg-navy px-5 text-sm font-medium text-cream"
        >
          Retake quiz
        </button>
        <Link
          to="/"
          className="inline-flex h-11 items-center rounded-xl bg-paper px-5 text-sm font-medium text-navy shadow-border"
        >
          Browse elections
        </Link>
      </div>
    </div>
  )
}
