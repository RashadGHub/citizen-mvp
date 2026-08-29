import type { Election } from '../types'

export const elections: Election[] = [
  {
    id: 'va-gov-2026',
    name: '2026 Virginia Governor Election',
    type: 'state',
    state: 'Virginia',
    locality: null,
    date: '2026-11-03',
    status: 'upcoming',
    offices: ['Governor'],
    candidateIds: ['elena-hartwell', 'marcus-reed'],
    summary:
      'Statewide election for Governor of Virginia. Sample / demo contest for browsing and comparison.',
  },
  {
    id: 'va-senate-2026',
    name: '2026 U.S. Senate Election — Virginia',
    type: 'federal',
    state: 'Virginia',
    locality: null,
    date: '2026-11-03',
    status: 'upcoming',
    offices: ['U.S. Senate'],
    candidateIds: ['priya-shah', 'thomas-brennan', 'jordan-hale'],
    summary:
      'Federal election for one U.S. Senate seat from Virginia. Sample / demo contest.',
  },
  {
    id: 'example-mayor-2026',
    name: '2026 Mayor Election — Example City',
    type: 'local',
    state: 'Virginia',
    locality: 'Example City',
    date: '2026-11-03',
    status: 'upcoming',
    offices: ['Mayor'],
    candidateIds: ['ava-chen', 'derek-walsh', 'linda-okonkwo'],
    summary:
      'Local mayoral election in the fictional municipality of Example City. Entirely sample data.',
  },
  {
    id: 'va-house-07-2026',
    name: '2026 U.S. House Election — Virginia 7th District',
    type: 'federal',
    state: 'Virginia',
    locality: 'Virginia 7th Congressional District',
    date: '2026-11-03',
    status: 'upcoming',
    offices: ['U.S. House'],
    candidateIds: ['samuel-ortiz', 'claire-whitfield'],
    summary:
      'Federal election for U.S. House of Representatives, Virginia’s 7th district. Sample / demo contest.',
  },
  {
    id: 'ca-gov-2026',
    name: '2026 California Governor Election',
    type: 'state',
    state: 'California',
    locality: null,
    date: '2026-11-03',
    status: 'upcoming',
    offices: ['Governor'],
    candidateIds: ['natalie-brooks', 'raymond-cole'],
    summary:
      'Statewide election for Governor of California. Sample / demo contest for search and comparison.',
  },
  {
    id: 'example-da-2026',
    name: '2026 District Attorney Election — Example County',
    type: 'local',
    state: 'Virginia',
    locality: 'Example County',
    date: '2026-11-03',
    status: 'upcoming',
    offices: ['District Attorney'],
    candidateIds: ['michael-torres', 'hannah-briggs'],
    summary:
      'Local election for District Attorney in the fictional Example County. Sample data only.',
  },
  {
    id: 'example-sheriff-2026',
    name: '2026 Sheriff Election — Example County',
    type: 'local',
    state: 'Virginia',
    locality: 'Example County',
    date: '2026-11-03',
    status: 'upcoming',
    offices: ['Sheriff'],
    candidateIds: ['jim-callahan', 'sofia-ramirez'],
    summary:
      'Local election for Sheriff in the fictional Example County. Sample data only.',
  },
  {
    id: 'tx-ag-2026',
    name: '2026 Texas Attorney General Election',
    type: 'state',
    state: 'Texas',
    locality: null,
    date: '2026-11-03',
    status: 'upcoming',
    offices: ['Attorney General'],
    candidateIds: ['owen-drake', 'maya-patel'],
    summary:
      'Statewide election for Attorney General of Texas. Sample / demo contest.',
  },
  {
    id: 'example-council-2026',
    name: 'Example City Council Ward 3 Special Election',
    type: 'local',
    state: 'Virginia',
    locality: 'Example City',
    date: '2026-08-25',
    status: 'active',
    offices: ['City Council'],
    candidateIds: ['keisha-monroe', 'robert-flynn'],
    summary:
      'Local special election for City Council Ward 3 in fictional Example City. Marked active as a demo of in-cycle local contests.',
  },
]

export function getElectionById(id: string): Election | undefined {
  return elections.find((election) => election.id === id)
}
