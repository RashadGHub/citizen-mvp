# Citizen

Politically neutral U.S.-only elections information app. Browse upcoming and active American elections, read sample candidate positions, and compare those positions with your own quiz responses.

Think ESPN for U.S. elections: easy to browse and compare — not predictions, endorsements, or persuasion.

Citizen never tells you who to vote for. Alignment is labeled Alignment with your quiz responses. Differences are Policy areas to explore.

## Stack

Vite + React 19 + TypeScript + Tailwind CSS v4 + React Router DOM + lucide-react.

Client-side only. Quiz answers, profile, and saves live in localStorage. There is no backend.

## Run

Working directory: /workspace/citizen

After install, use the dev script. Production uses build then preview. Commands are also listed at the bottom of this file.

## Demo data warning

All elections, candidates, biographies, and positions in this app are sample / demo data. They are fictional placeholders for product exploration. They are not verified statements, not real campaign materials, and not voter guidance.

Look for the Demo data badge. Sources are labeled Sample / demo — not a verified statement.

## Routes

- / Home feed with type/status filters
- /search Grouped search (elections, candidates, topics, places)
- /quiz 20-question preference quiz
- /quiz/results Your Citizen Profile (dimension bars)
- /profile Account, saves, quiz summary, local settings
- /elections/:id Election detail, voting info, candidates
- /candidates/:id Candidate profile and Compare With You
- /elections/:id/compare?a=&b= Side-by-side candidate comparison

United States only. Senators and Representatives are categorized as Federal.

## Quiz scoring

Likert raw values: Strongly agree = 100, Agree = 75, Neutral = 50, Disagree = 25, Strongly disagree = 0.

Each of 10 dimensions has two questions. If a question is reverseCoded, the contribution is 100 minus the raw value. The dimension score is the average of its two contributions (0-100).

Higher scores mean more support for a larger public / regulatory role on that topic. Lower scores mean more support for a market-led or less-regulatory approach. This is a comparison scale, not a grade and not a party label.

Alignment vs a candidate uses each position stored stanceScore (0-100):

- High: difference under 15
- Moderate: under 30
- Low: otherwise

Candidates are never ranked best/worst.

## Swap mock data for an API

Replace the typed modules in src/data/ (elections.ts, candidates.ts, positions.ts, policyAreas.ts, quiz.ts). Keep the shapes in src/types.ts. src/data/index.ts is the facade the UI imports. Point those exports at fetchers when you add a backend; the pages and src/lib/alignment.ts can stay.

## Out of scope

International elections, donations, ads, news feed, predictions, in-app voting, voter registration product, campaign tools.

    npm install
    npm run dev
    npm run build
    npm run preview
