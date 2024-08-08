export default function round(x: bigint) {
  const half = x % 2n === 0n ? 0n : x > 0n ? 1n : -1n
  return (x + half) / 2n
}
