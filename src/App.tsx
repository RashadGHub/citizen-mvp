import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CandidateProfile } from './pages/CandidateProfile'
import { Compare } from './pages/Compare'
import { ElectionDetail } from './pages/ElectionDetail'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Quiz } from './pages/Quiz'
import { Search } from './pages/Search'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/results" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/elections/:id" element={<ElectionDetail />} />
        <Route path="/elections/:id/compare" element={<Compare />} />
        <Route path="/candidates/:id" element={<CandidateProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
