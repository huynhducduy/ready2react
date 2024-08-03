export function formatLocaleDateTime(
  d: Date,
  locale: Intl.LocalesArgument = 'en-US',
  options?: Intl.DateTimeFormatOptions,
) {
  try {
    return Intl.DateTimeFormat(locale, options).format(d)
  } catch {
    return 'Invalid date'
  }
}
