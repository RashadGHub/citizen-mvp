export function DemoBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-line bg-cream px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-subtle ${className}`}
    >
      Demo data
    </span>
  )
}
