export default function min(...values: readonly bigint[]): bigint {
  if (values.length === 0) throw new Error('Input array must contain at least one element')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guranteed non-null
  let min = values[0]!
  for (const v of values) if (v < min) min = v
  return min
}
