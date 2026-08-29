import type { PolicyArea } from '../types'

export const policyAreas: PolicyArea[] = [
  { id: 'economy', name: 'Economy', dimension: 'economic_policy' },
  { id: 'taxes', name: 'Taxes', dimension: 'taxes' },
  { id: 'healthcare', name: 'Healthcare', dimension: 'healthcare' },
  { id: 'education', name: 'Education', dimension: 'social_policy' },
  { id: 'immigration', name: 'Immigration', dimension: 'immigration' },
  { id: 'crime', name: 'Crime & Public Safety', dimension: 'crime' },
  { id: 'environment', name: 'Environment & Energy', dimension: 'environment' },
  { id: 'foreign_policy', name: 'Foreign Policy', dimension: 'foreign_policy' },
  { id: 'spending', name: 'Government Spending', dimension: 'government_spending' },
  { id: 'social', name: 'Social Issues', dimension: 'social_policy' },
  { id: 'infrastructure', name: 'Infrastructure', dimension: 'economic_policy' },
  { id: 'other', name: 'Other', dimension: 'government_regulation' },
]

export const policyAreaById = Object.fromEntries(
  policyAreas.map((area) => [area.id, area]),
) as Record<string, PolicyArea>
