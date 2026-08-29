export function ScoreBar({
  value,
  tone = 'navy',
  label,
}: {
  value: number
  tone?: 'navy' | 'blue' | 'red' | 'muted'
  label?: string
}) {
  const width = Math.max(0, Math.min(100, value))
  const fill =
    tone === 'blue'
      ? 'bg-blue'
      : tone === 'red'
        ? 'bg-red'
        : tone === 'muted'
          ? 'bg-fill-muted'
          : 'bg-navy'

  return (
    <div className="w-full">
      {label ? (
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className="text-sm text-navy">{label}</span>
          <span className="tabular text-sm font-medium text-navy">{Math.round(width)}%</span>
        </div>
      ) : null}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream-2">
        <div
          className={`h-full rounded-full ${fill} transition-[width] duration-200`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}
