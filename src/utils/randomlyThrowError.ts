export default function randomlyThrowError(message: string) {
  const result = Math.random() < 0.5
  if (result) throw new Error(message)
}
