export default function sign(x: bigint) {
  return x < 0n ? -1n : 1n
}
