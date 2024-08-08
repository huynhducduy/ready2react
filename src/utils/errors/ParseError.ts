import type {ValueError} from '@sinclair/typebox/errors'
import type {ReadonlyDeep} from 'type-fest'

import ErrorWithMetadata from './ErrorWithMetadata'

export default class ParseError extends ErrorWithMetadata {
  constructor(name: string, message: string, errors: ReadonlyDeep<ValueError[]>) {
    super('ParseError', name, message, {errors})
    this.permanent()
  }
}

export function isParseError(e: unknown): e is ParseError {
  return e instanceof ParseError
}
