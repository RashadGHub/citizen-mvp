import { Home, Search, SlidersHorizontal, UserRound } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { Wordmark } from './Wordmark'

const NAV = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/search', label: 'Search', icon: Search, end: false },
  { to: '/quiz', label: 'Quiz', icon: SlidersHorizontal, end: false },
  { to: '/profile', label: 'Profile', icon: UserRound, end: false },
] as const

function linkClass(active: boolean, desktop: boolean): string {
  if (desktop) {
    return `flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-200 ${
      active ? 'bg-cream-2 font-medium text-navy' : 'text-muted hover:bg-cream-2 hover:text-navy'
    }`
  }
  return `flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] ${
    active ? 'text-navy' : 'text-subtle'
  }`
}

export function Layout() {
  return (
    <div className="min-h-dvh bg-cream text-navy">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 border-r border-line bg-cream md:flex md:flex-col">
        <div className="px-5 py-6">
          <Wordmark size="md" />
          <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-subtle">U.S. elections</p>
        </div>
        <nav className="flex flex-col gap-1 px-3" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => linkClass(isActive, true)}
            >
              <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <p className="mt-auto px-5 py-6 text-[11px] leading-relaxed text-subtle">
          Politically neutral sample data. Not voter guidance.
        </p>
      </aside>

      <div className="md:pl-60">
        <main className="mx-auto w-full max-w-3xl px-4 pb-[calc(72px+env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))] md:px-8 md:pb-16 md:pt-10">
          <Outlet />
        </main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-cream md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label="Primary"
      >
        <div className="flex h-16 items-stretch">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => linkClass(isActive, false)}
            >
              <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
