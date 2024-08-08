import type {ErrorMetadata} from '@/utils/logger'

import MaybePermanentError from './MaybePermanentError'

export default class ErrorWithMetadata extends MaybePermanentError {
  constructor(
    type: `${string}Error`,
    name: string,
    message?: string,
    readonly metadata?: Readonly<ErrorMetadata>,
    options?: Readonly<ErrorOptions>,
  ) {
    super(message, options)
    this.name = `${type}${name ? '(' + name + ')' : ''}`
  }
}
