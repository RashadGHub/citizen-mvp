import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export function PageHeader({
  title,
  subtitle,
  back,
  trailing,
}: {
  title: string
  subtitle?: string
  back?: boolean
  trailing?: ReactNode
}) {
  const navigate = useNavigate()

  return (
    <header className="mb-6 flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-1">
        {back ? (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="-ml-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-navy hover:bg-cream-2"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
          </button>
        ) : null}
        <div className="min-w-0 pt-2">
          <h1 className="font-serif text-[28px] leading-tight text-navy">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
        </div>
      </div>
      {trailing ? <div className="pt-1">{trailing}</div> : null}
    </header>
  )
}
