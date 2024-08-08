const DEFAULT_RATE = 0.5

export default function randomlyThrowError(message: string, rate = DEFAULT_RATE) {
  const result = Math.random() < rate
  if (result) throw new Error(message)
}
