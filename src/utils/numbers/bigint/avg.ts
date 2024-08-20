export default function avg(...values: readonly (bigint | undefined)[]) {
  let sum = 0n
  for (const value of values) {
    if (value !== undefined) {
      sum += value
    }
  }

  return sum / BigInt(values.length)
}
