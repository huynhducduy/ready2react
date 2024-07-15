import type {ValueError} from '@sinclair/typebox/errors'

import ErrorWithMetadata from './ErrorWithMetadata'

export default class ParseError extends ErrorWithMetadata {
  constructor(name: string, message: string, errors: ValueError[]) {
    super('ParseError', name, message, {errors})
    this.permanent()
  }
}

export function isParseError(e: unknown): e is ParseError {
  return e instanceof ParseError
}
