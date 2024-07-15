import MaybePermanentError from './MaybePermanentError'

/**
 * Rethrow the error, with a user-friendly message.
 * The error itself should not be logged, but instead the cause should be logged.
 *
 * @export
 * @class UserFriendlyError
 * @extends {Error}
 */
export default class UserFriendlyError extends MaybePermanentError {
  static isUserFriendly: true

  constructor(message: string, cause?: unknown) {
    super(message, {cause})
    this.name = 'UserFriendlyError'
  }
}

export function isUserFriendlyError(err: unknown): err is UserFriendlyError {
  return err instanceof UserFriendlyError
}
