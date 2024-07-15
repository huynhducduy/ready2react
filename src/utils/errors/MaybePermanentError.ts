export default class MaybePermanentError extends Error {
  isPermanent: boolean = false

  permanent() {
    this.isPermanent = true
    return this
  }
}

export function isPermanentError(e: unknown) {
  try {
    return e && typeof e === 'object' && 'isPermanent' in e && !!e.isPermanent
  } catch (_) {
    return false
  }
}
