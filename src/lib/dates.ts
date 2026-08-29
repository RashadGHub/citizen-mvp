const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export function parseIsoDate(iso: string): Date {
  return new Date(`${iso}T12:00:00`)
}

export function formatLongDate(iso: string): string {
  const date = parseIsoDate(iso)
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export function formatShortDate(iso: string): string {
  const date = parseIsoDate(iso)
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`
}

export function daysUntil(iso: string, from: Date = new Date()): number {
  const target = parseIsoDate(iso)
  const start = new Date(from)
  start.setHours(12, 0, 0, 0)
  return Math.round((target.getTime() - start.getTime()) / 86_400_000)
}

export function countdownLabel(iso: string, status: 'upcoming' | 'active'): string {
  if (status === 'active') return 'In cycle'
  const days = daysUntil(iso)
  if (days > 1) return `${days} days`
  if (days === 1) return '1 day'
  if (days === 0) return 'Today'
  return 'Date passed'
}
