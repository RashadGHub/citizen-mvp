import type { CandidatePosition, Party } from '../types'
import { candidates } from './candidates'
import { policyAreas } from './policyAreas'

export const SAMPLE_SOURCE = 'Sample / demo — not a verified statement'
export const SAMPLE_SOURCE_URL = 'https://example.com/sample-source'

type Stance = { position: string; stanceScore: number }

const GENERIC: Record<Party, Record<string, Stance>> = {
  Democrat: {
    economy: {
      position: 'Supports expanding apprenticeship programs and targeted public investment in domestic industry.',
      stanceScore: 72,
    },
    taxes: {
      position: 'Supports higher rates on high-income households to fund selected public services.',
      stanceScore: 74,
    },
    healthcare: {
      position: 'Supports expanding public coverage options and lowering out-of-pocket costs.',
      stanceScore: 78,
    },
    education: {
      position: 'Supports increased operating aid for public schools and community colleges.',
      stanceScore: 76,
    },
    immigration: {
      position: 'Supports expanding legal pathways while maintaining screening at ports of entry.',
      stanceScore: 70,
    },
    crime: {
      position: 'Supports pairing enforcement with prevention, treatment, and reentry programs.',
      stanceScore: 62,
    },
    environment: {
      position: 'Supports accelerating the shift toward lower-emission electricity and efficiency standards.',
      stanceScore: 80,
    },
    foreign_policy: {
      position: 'Supports alliance coordination and diplomacy as the first tool, with targeted defense spending.',
      stanceScore: 68,
    },
    spending: {
      position: 'Supports higher outlays on social and infrastructure programs even if deficits remain elevated.',
      stanceScore: 73,
    },
    social: {
      position: 'Supports expanding legal protections related to personal autonomy and family policy.',
      stanceScore: 78,
    },
    infrastructure: {
      position: 'Supports federal and state funding for transit, broadband, and state-of-good-repair.',
      stanceScore: 75,
    },
    other: {
      position: 'Supports stronger consumer, workplace, and environmental rules on large firms.',
      stanceScore: 74,
    },
  },
  Republican: {
    economy: {
      position: 'Supports a market-led growth agenda with lighter industrial policy and faster permitting.',
      stanceScore: 28,
    },
    taxes: {
      position: 'Supports lowering selected tax rates as a primary growth tool.',
      stanceScore: 24,
    },
    healthcare: {
      position: 'Supports keeping coverage primarily private, with targeted high-risk pools.',
      stanceScore: 26,
    },
    education: {
      position: 'Supports more choice among schools and tighter limits on central-office spending.',
      stanceScore: 32,
    },
    immigration: {
      position: 'Supports expanding interior enforcement and tightening work-authorization checks.',
      stanceScore: 22,
    },
    crime: {
      position: 'Supports more policing capacity and longer sentences for repeat violent offenses.',
      stanceScore: 28,
    },
    environment: {
      position: 'Supports expanding domestic oil and gas production alongside existing nuclear capacity.',
      stanceScore: 22,
    },
    foreign_policy: {
      position: 'Supports a larger defense budget and fewer constraints on overseas force posture.',
      stanceScore: 30,
    },
    spending: {
      position: 'Supports reducing non-defense discretionary spending and slowing new program growth.',
      stanceScore: 25,
    },
    social: {
      position: 'Supports social policy that more closely tracks long-standing community traditions.',
      stanceScore: 30,
    },
    infrastructure: {
      position: 'Supports roads, ports, and water projects with a preference for user fees over new taxes.',
      stanceScore: 38,
    },
    other: {
      position: 'Supports rolling back selected federal rules that raise compliance costs for firms.',
      stanceScore: 26,
    },
  },
  Independent: {
    economy: {
      position: 'Supports a mixed approach: keep most allocation in markets, fund targeted workforce programs.',
      stanceScore: 52,
    },
    taxes: {
      position: 'Supports simplifying the code and limiting new credits rather than large rate swings.',
      stanceScore: 48,
    },
    healthcare: {
      position: 'Supports a public option for the uninsured while leaving employer coverage in place.',
      stanceScore: 56,
    },
    education: {
      position: 'Supports funding for public schools with more campus-level budget authority.',
      stanceScore: 54,
    },
    immigration: {
      position: 'Supports faster legal processing and targeted worksite enforcement, not broad interior sweeps.',
      stanceScore: 50,
    },
    crime: {
      position: 'Supports focusing prison space on violent offenses and expanding treatment for others.',
      stanceScore: 48,
    },
    environment: {
      position: 'Supports an all-of-the-above mix: efficiency, nuclear, and a slower fossil-fuel phase-down.',
      stanceScore: 46,
    },
    foreign_policy: {
      position: 'Supports steady alliance commitments without large new overseas deployments.',
      stanceScore: 50,
    },
    spending: {
      position: 'Supports pay-as-you-go on new programs and a cap on selected discretionary accounts.',
      stanceScore: 42,
    },
    social: {
      position: 'Supports leaving most social-policy questions to states and municipalities.',
      stanceScore: 50,
    },
    infrastructure: {
      position: 'Supports a dedicated repair fund for bridges, water, and transit before new expansion.',
      stanceScore: 58,
    },
    other: {
      position: 'Supports reviewing rules for cost and duplicative paperwork rather than a blanket rollback.',
      stanceScore: 48,
    },
  },
  Other: {
    economy: {
      position: 'Supports evaluating each economic proposal on local cost and measurable outcomes.',
      stanceScore: 50,
    },
    taxes: {
      position: 'Supports keeping rates stable while closing narrowly used loopholes.',
      stanceScore: 50,
    },
    healthcare: {
      position: 'Supports cost transparency and letting localities pick coverage experiments.',
      stanceScore: 50,
    },
    education: {
      position: 'Supports funding formulas tied to enrollment and documented student need.',
      stanceScore: 50,
    },
    immigration: {
      position: 'Supports consistent legal process and local coordination with federal agencies.',
      stanceScore: 50,
    },
    crime: {
      position: 'Supports publishing outcomes for both enforcement and diversion programs.',
      stanceScore: 50,
    },
    environment: {
      position: 'Supports least-cost reliability for the local grid, including existing generation.',
      stanceScore: 50,
    },
    foreign_policy: {
      position: 'Office has limited foreign-policy scope; defers to federal institutions.',
      stanceScore: 50,
    },
    spending: {
      position: 'Supports multi-year budgets with public variance reports.',
      stanceScore: 50,
    },
    social: {
      position: 'Supports local ordinance processes over statewide social mandates.',
      stanceScore: 50,
    },
    infrastructure: {
      position: 'Supports fixing existing assets before authorizing new signature projects.',
      stanceScore: 55,
    },
    other: {
      position: 'Supports open-data publication of agency rules and contracts.',
      stanceScore: 52,
    },
  },
}

const OVERRIDES: Record<string, Partial<Record<string, Stance>>> = {
  'elena-hartwell': {
    economy: {
      position: 'Supports expanding registered apprenticeships and a state manufacturing skills fund.',
      stanceScore: 70,
    },
    education: {
      position: 'Supports a multi-year increase in K–12 operating aid and counselor staffing.',
      stanceScore: 78,
    },
    environment: {
      position: 'Supports coastal flood mitigation and a faster retirement schedule for the highest-emitting plants.',
      stanceScore: 82,
    },
    crime: {
      position: 'Supports recruitment funding for vacant trooper posts plus reentry job placement.',
      stanceScore: 58,
    },
  },
  'marcus-reed': {
    taxes: {
      position: 'Supports phasing down the state grocery tax and a trigger to lower the income-tax rate.',
      stanceScore: 22,
    },
    environment: {
      position: 'Supports additional natural-gas generation and faster permits for pipeline laterals.',
      stanceScore: 18,
    },
    crime: {
      position: 'Supports signing bonuses for sworn officers and limiting parole for repeat violent offenses.',
      stanceScore: 24,
    },
    immigration: {
      position: 'Supports state cooperation with federal detainers and E-Verify for public contractors.',
      stanceScore: 20,
    },
  },
  'priya-shah': {
    healthcare: {
      position: 'Supports protecting insurance coverage provisions and adding a public option in uncovered counties.',
      stanceScore: 82,
    },
    immigration: {
      position: 'Supports reducing legal-immigration case backlogs and expanding employment-based visas.',
      stanceScore: 74,
    },
    foreign_policy: {
      position: 'Supports alliance coordination in Europe and the Indo-Pacific over new open-ended deployments.',
      stanceScore: 72,
    },
  },
  'thomas-brennan': {
    immigration: {
      position: 'Supports more interior enforcement personnel and limits on selected humanitarian parole uses.',
      stanceScore: 18,
    },
    foreign_policy: {
      position: 'Supports raising selected defense accounts and shipbuilding rates.',
      stanceScore: 26,
    },
    other: {
      position: 'Supports statutory deadlines that shorten federal environmental permitting.',
      stanceScore: 22,
    },
  },
  'jordan-hale': {
    spending: {
      position: 'Supports a statutory cap on selected discretionary accounts and a dedicated bridge-repair fund.',
      stanceScore: 40,
    },
    infrastructure: {
      position: 'Supports state-of-good-repair first: bridges, culverts, and transit vehicles before new lines.',
      stanceScore: 62,
    },
    taxes: {
      position: 'Supports closing selected credits rather than raising or cutting headline rates.',
      stanceScore: 50,
    },
    immigration: {
      position: 'Supports staffing immigration courts to cut wait times, with worksite audits at large employers.',
      stanceScore: 48,
    },
  },
  'ava-chen': {
    infrastructure: {
      position: 'Supports bus-priority streets and zoning that allows more housing within a half-mile of transit.',
      stanceScore: 70,
    },
    other: {
      position: 'Supports a public dashboard of city construction contracts and change orders.',
      stanceScore: 60,
    },
    economy: {
      position: 'Supports local hire on large public jobs and faster permits for missing-middle housing.',
      stanceScore: 58,
    },
  },
  'samuel-ortiz': {
    immigration: {
      position: 'Supports reducing case backlogs for legal immigration and more consular staffing.',
      stanceScore: 76,
    },
    education: {
      position: 'Supports community-college completion grants and registered apprenticeships.',
      stanceScore: 74,
    },
  },
  'natalie-brooks': {
    economy: {
      position: 'Supports housing-unit production targets enforced through local zoning compliance.',
      stanceScore: 76,
    },
    environment: {
      position: 'Supports wildfire-resilient grid upgrades and a faster clean-electricity standard.',
      stanceScore: 84,
    },
    healthcare: {
      position: 'Supports simplifying Medi-Cal recertification and expanding clinic capacity in inland counties.',
      stanceScore: 80,
    },
  },
  'raymond-cole': {
    environment: {
      position: 'Supports additional surface-water storage and keeping existing natural-gas generation online.',
      stanceScore: 24,
    },
    crime: {
      position: 'Supports additional prosecutors and jail capacity for organized retail theft.',
      stanceScore: 22,
    },
    economy: {
      position: 'Supports lowering selected energy-compliance costs for farms and freight.',
      stanceScore: 30,
    },
  },
  'michael-torres': {
    crime: {
      position: 'Supports diversion for eligible non-violent cases and publishing charging dashboards.',
      stanceScore: 68,
    },
    other: {
      position: 'Supports independent review of prosecutorial discovery compliance.',
      stanceScore: 64,
    },
  },
  'hannah-briggs': {
    crime: {
      position: 'Supports standardized charging in repeat-offense cases and more prosecutors on violent-crime dockets.',
      stanceScore: 26,
    },
    spending: {
      position: 'Supports adding courtrooms and prosecutor FTEs before new social-program outlays.',
      stanceScore: 34,
    },
  },
  'maya-patel': {
    other: {
      position: 'Supports a public-corruption unit and utility-rate oversight actions.',
      stanceScore: 72,
    },
    healthcare: {
      position: 'Supports enforcement against surprise medical billing and hospital-price opacity.',
      stanceScore: 76,
    },
  },
}

export const positions: CandidatePosition[] = candidates.flatMap((candidate) =>
  policyAreas.map((area) => {
    const override = OVERRIDES[candidate.id]?.[area.id]
    const generic = GENERIC[candidate.party][area.id]
    const stance = override ?? generic
    return {
      candidateId: candidate.id,
      policyAreaId: area.id,
      position: stance.position,
      stanceScore: stance.stanceScore,
      source: SAMPLE_SOURCE,
      sourceUrl: SAMPLE_SOURCE_URL,
    }
  }),
)

export function getPositionsForCandidate(candidateId: string): CandidatePosition[] {
  return positions.filter((position) => position.candidateId === candidateId)
}

export function getPosition(
  candidateId: string,
  policyAreaId: string,
): CandidatePosition | undefined {
  return positions.find(
    (position) =>
      position.candidateId === candidateId && position.policyAreaId === policyAreaId,
  )
}
