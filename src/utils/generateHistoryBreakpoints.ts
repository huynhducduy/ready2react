import {
  getMonth,
  getYear,
  setYear,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
  subYears,
} from 'date-fns'

import {formatLocaleDateTime} from './datetime'

export default function generateHistoryBreakpoints(minYearDate: Date) {
  const today = startOfDay(new Date())
  const yesterday = subDays(today, 1)
  const previous7Days = subDays(today, 7)
  const previous30Days = subDays(today, 30)

  const breakpoints = [
    {
      time: today,
      text: 'Today',
    },
    {
      time: yesterday,
      text: 'Yesterday',
    },
    {
      time: previous7Days,
      text: 'Previous 7 Days',
    },
    {
      time: previous30Days,
      text: 'Previous 30 Days',
    },
  ]

  // Add previous months to breakpoints
  for (let i = 0; i <= getMonth(subMonths(startOfMonth(today), 1)); i++) {
    const date = subMonths(startOfMonth(today), 1 + i)
    breakpoints.push({
      time: date,
      text: formatLocaleDateTime(date, 'en-US', {month: 'long'}),
    })
  }

  const minYear = getYear(minYearDate)

  // Add previous years to breakpoints
  for (let i = minYear; i <= getYear(subYears(startOfMonth(today), 1)); i++) {
    const date = setYear(startOfMonth(today), i)
    breakpoints.push({
      time: date,
      text: String(getYear(date)),
    })
  }

  return breakpoints
}
