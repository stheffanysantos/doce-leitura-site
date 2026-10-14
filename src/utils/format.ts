// Dates in the content files are ISO strings ("2026-07-02", "2026-06", "2026-07-27T19:00").
// They are split by hand instead of going through Date, so the time zone can't shift the day.

const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

const parts = (iso: string) => {
  const [date = '', time = ''] = iso.split('T')
  const [year = '', month = '1', day = '1'] = date.split('-')
  const [hour = '0', minute = '0'] = time.split(':')
  return { year, month: MONTHS[Number(month) - 1] ?? '', day: Number(day), hour: Number(hour), minute: Number(minute) }
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** "2026-07-02" → "2 jul" */
export const dayMonth = (iso: string) => {
  const { day, month } = parts(iso)
  return `${day} ${month.slice(0, 3)}`
}

/** "2026-06" → "Junho 2026" */
export const monthYear = (iso: string) => {
  const { month, year } = parts(iso)
  return `${capitalize(month)} ${year}`
}

/** "2026-01" → "jan/2026" */
export const shortMonthYear = (iso: string) => {
  const { month, year } = parts(iso)
  return `${month.slice(0, 3)}/${year}`
}

/** "2026-07-27T19:00" → "julho" */
export const monthName = (iso: string) => parts(iso).month

/** "2026-07-27T19:00" → "27 de julho, 19h" */
export const meetingDateTime = (iso: string) => {
  const { day, month, hour, minute } = parts(iso)
  const time = minute ? `${hour}h${String(minute).padStart(2, '0')}` : `${hour}h`
  return `${day} de ${month}, ${time}`
}

/** Reading time at ~200 words per minute, never below 1 min */
export const readingTime = (paragraphs: string[]) => {
  const words = paragraphs.join(' ').split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min`
}

/** "Renata Alves" → "RA" */
export const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
