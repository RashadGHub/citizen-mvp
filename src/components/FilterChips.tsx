type Chip = { id: string; label: string }

export function FilterChips({
  chips,
  value,
  onChange,
}: {
  chips: Chip[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
      {chips.map((chip) => {
        const active = chip.id === value
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onChange(chip.id)}
            className={`inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-200 ${
              active
                ? 'bg-navy text-cream'
                : 'bg-paper text-navy-muted shadow-border hover:shadow-border-hover'
            }`}
          >
            {chip.label}
          </button>
        )
      })}
    </div>
  )
}
