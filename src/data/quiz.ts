import type { QuizDimension, QuizQuestion } from '../types'

/**
 * Scoring
 * --------
 * Likert raw values (before reverse-coding):
 *   Strongly Agree = 100
 *   Agree          = 75
 *   Neutral        = 50
 *   Disagree       = 25
 *   Strongly Disagree = 0
 *
 * If `reverseCoded` is true, the stored dimension contribution is `100 - raw`.
 * Each dimension is the average of its two questions (0–100).
 *
 * Polarity (for alignment math only — never shown as left/right or party):
 * Higher dimension scores mean more support for a larger public / regulatory
 * role on that topic. Lower scores mean more support for a market-led or
 * less-regulatory approach. This is a comparison scale, not a grade.
 */
export const DIMENSION_LABELS: Record<QuizDimension, string> = {
  economic_policy: 'Economic policy',
  government_spending: 'Government spending',
  taxes: 'Taxes',
  social_policy: 'Social policy',
  healthcare: 'Healthcare',
  immigration: 'Immigration',
  foreign_policy: 'Foreign policy',
  environment: 'Environment & energy',
  crime: 'Crime & public safety',
  government_regulation: 'Government regulation',
}

export const LIKERT_OPTIONS = [
  { key: 'strongly_agree', label: 'Strongly agree', value: 100 },
  { key: 'agree', label: 'Agree', value: 75 },
  { key: 'neutral', label: 'Neutral', value: 50 },
  { key: 'disagree', label: 'Disagree', value: 25 },
  { key: 'strongly_disagree', label: 'Strongly disagree', value: 0 },
] as const

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    dimension: 'economic_policy',
    reverseCoded: false,
    text: 'The federal government should play a larger role in guiding the U.S. economy.',
  },
  {
    id: 'q2',
    dimension: 'economic_policy',
    reverseCoded: true,
    text: 'Private markets, not public agencies, should primarily decide where investment goes.',
  },
  {
    id: 'q3',
    dimension: 'government_spending',
    reverseCoded: false,
    text: 'Federal spending on public programs should increase even if it widens the deficit.',
  },
  {
    id: 'q4',
    dimension: 'government_spending',
    reverseCoded: true,
    text: 'Reducing the overall size of the federal budget should be a top priority.',
  },
  {
    id: 'q5',
    dimension: 'taxes',
    reverseCoded: false,
    text: 'Households with high incomes should pay a larger share of federal taxes than they do today.',
  },
  {
    id: 'q6',
    dimension: 'taxes',
    reverseCoded: true,
    text: 'Broad-based tax cuts are an effective way to grow the economy.',
  },
  {
    id: 'q7',
    dimension: 'social_policy',
    reverseCoded: false,
    text: 'Federal policy should expand legal protections related to personal and family autonomy.',
  },
  {
    id: 'q8',
    dimension: 'social_policy',
    reverseCoded: true,
    text: 'Social policy should more closely reflect long-standing community traditions.',
  },
  {
    id: 'q9',
    dimension: 'healthcare',
    reverseCoded: false,
    text: 'Government should guarantee a baseline of health coverage for all residents.',
  },
  {
    id: 'q10',
    dimension: 'healthcare',
    reverseCoded: true,
    text: 'Health coverage should remain primarily a matter of private insurance and individual choice.',
  },
  {
    id: 'q11',
    dimension: 'immigration',
    reverseCoded: false,
    text: 'The U.S. should expand legal pathways for people to live and work here.',
  },
  {
    id: 'q12',
    dimension: 'immigration',
    reverseCoded: true,
    text: 'Interior immigration enforcement should be substantially expanded.',
  },
  {
    id: 'q13',
    dimension: 'foreign_policy',
    reverseCoded: false,
    text: 'Diplomacy and alliances should take priority over expanding the military.',
  },
  {
    id: 'q14',
    dimension: 'foreign_policy',
    reverseCoded: true,
    text: 'A larger defense budget is necessary to protect U.S. interests abroad.',
  },
  {
    id: 'q15',
    dimension: 'environment',
    reverseCoded: false,
    text: 'The U.S. should accelerate the shift away from fossil fuels, even if energy prices rise in the near term.',
  },
  {
    id: 'q16',
    dimension: 'environment',
    reverseCoded: true,
    text: 'Expanding domestic oil and gas production should be a national priority.',
  },
  {
    id: 'q17',
    dimension: 'crime',
    reverseCoded: false,
    text: 'Public safety policy should emphasize prevention, treatment, and reentry programs.',
  },
  {
    id: 'q18',
    dimension: 'crime',
    reverseCoded: true,
    text: 'Longer sentences and more visible policing are the most reliable ways to reduce crime.',
  },
  {
    id: 'q19',
    dimension: 'government_regulation',
    reverseCoded: false,
    text: 'Stronger federal regulation of business is needed to protect the public.',
  },
  {
    id: 'q20',
    dimension: 'government_regulation',
    reverseCoded: true,
    text: 'Most industries would perform better with fewer federal rules.',
  },
]
