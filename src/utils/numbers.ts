export function roundToNDecimalPlaces(n: number, places = 2) {
  const precision = Math.pow(10, places)
  return Math.round(n * precision) / precision
}

export function formatLocaleNumber(
  n: number,
  locale: Intl.LocalesArgument = 'en-US',
  options?: Intl.NumberFormatOptions,
) {
  return Intl.NumberFormat(locale, options).format(n)
}

export function parseNumber(n: string, locale: Intl.LocalesArgument = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6)
  const numerals = [
    ...new Intl.NumberFormat(locale, {useGrouping: false}).format(9876543210),
  ].reverse()
  const index = new Map(numerals.map((d, i) => [d, String(i)]))
  const _group = new RegExp(`[${parts.find(d => d.type === 'group')?.value}]`, 'g')
  const _decimal = new RegExp(`[${parts.find(d => d.type === 'decimal')?.value}]`)
  const _numeral = new RegExp(`[${numerals.join('')}]`, 'g')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- its guranteed to be defined
  const _index = (d: string) => index.get(d)!

  n = n.trim().replace(_group, '').replace(_decimal, '.').replace(_numeral, _index)

  return n ? +n : NaN
}
