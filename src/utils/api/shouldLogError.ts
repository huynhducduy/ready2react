export default function shouldLogError(e: unknown) {
  return !(e && typeof e === 'object' && 'name' in e && e.name === 'CanceledError')
}
