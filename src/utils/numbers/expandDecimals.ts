export default function expandDecimals(n: bigint | number, decimals: number | bigint): bigint {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- its supposed to be magic 🪄
  return BigInt(n) * 10n ** BigInt(decimals)
}
