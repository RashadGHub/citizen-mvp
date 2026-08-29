import { candidates, elections, places, policyAreas, positions } from '../data'
import type { Candidate, Election, PolicyArea } from '../types'

export interface SearchResults {
  query: string
  elections: Election[]
  candidates: Candidate[]
  topics: PolicyArea[]
  places: string[]
}

function haystack(...parts: Array<string | null | undefined>): string {
  return parts.filter(Boolean).join(' ').toLowerCase()
}

function matches(query: string, ...parts: Array<string | null | undefined>): boolean {
  const text = haystack(...parts)
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  return tokens.every((token) => text.includes(token))
}

export function searchAll(raw: string): SearchResults {
  const query = raw.trim()
  if (!query) {
    return { query, elections: [], candidates: [], topics: [], places: [] }
  }

  const matchedElections = elections.filter((election) =>
    matches(
      query,
      election.name,
      election.type,
      election.state,
      election.locality,
      election.offices.join(' '),
      election.summary,
      election.status,
    ),
  )

  const matchedCandidates = candidates.filter((candidate) => {
    const election = elections.find((item) => item.id === candidate.electionId)
    const stance = positions
      .filter((position) => position.candidateId === candidate.id)
      .map((position) => {
        const area = policyAreas.find((item) => item.id === position.policyAreaId)
        return `${area?.name ?? ''} ${position.position}`
      })
      .join(' ')
    return matches(
      query,
      candidate.name,
      candidate.party,
      candidate.office,
      candidate.biography,
      candidate.priorities.join(' '),
      candidate.values.join(' '),
      election?.name,
      election?.state,
      election?.locality,
      stance,
    )
  })

  const matchedTopics = policyAreas.filter((area) =>
    matches(query, area.name, area.id, area.dimension.replaceAll('_', ' ')),
  )

  const matchedPlaces = places.filter((place) => matches(query, place))

  return {
    query,
    elections: matchedElections,
    candidates: matchedCandidates,
    topics: matchedTopics,
    places: matchedPlaces,
  }
}

export function resultCount(results: SearchResults): number {
  return (
    results.elections.length +
    results.candidates.length +
    results.topics.length +
    results.places.length
  )
}
