import { Link } from 'react-router-dom'

export function Wordmark({
  to = '/',
  size = 'md',
}: {
  to?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClass =
    size === 'lg' ? 'text-[28px] leading-none' : size === 'sm' ? 'text-[18px] leading-none' : 'text-[22px] leading-none'

  return (
    <Link to={to} className="inline-flex min-h-11 items-center">
      <span className={`font-serif italic text-navy ${sizeClass}`}>Citizen</span>
    </Link>
  )
}
