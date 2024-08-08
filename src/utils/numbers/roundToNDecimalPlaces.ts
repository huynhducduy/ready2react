import round from './bigint/round'

const DEFAULT_NUMBER_OF_DECIMAL_PLACES = 2n

export default function roundToNDecimalPlaces(
  n: bigint,
  places: bigint | number = DEFAULT_NUMBER_OF_DECIMAL_PLACES,
) {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- its supposed to be magic 🪄
  const precision = 10n ** BigInt(places)
  return round(n * precision) / precision
}
