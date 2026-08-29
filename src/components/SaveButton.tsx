import { Bookmark } from 'lucide-react'

export function SaveButton({
  saved,
  onToggle,
  label,
}: {
  saved: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onToggle()
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from saved` : `Save ${label}`}
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy transition-colors duration-200 hover:bg-cream-2"
    >
      <Bookmark
        className="h-[18px] w-[18px]"
        strokeWidth={1.75}
        fill={saved ? 'currentColor' : 'none'}
      />
    </button>
  )
}
