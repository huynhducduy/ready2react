import ErrorWithMetadata from './ErrorWithMetadata'

interface TransformErrorData {
  field: string
  value: unknown
  message?: string
}

export default class TransformError extends ErrorWithMetadata {
  constructor(name: string, message: string, cause?: unknown, errors?: TransformErrorData[]) {
    super('TransformError', name, message, {errors}, {cause})
    this.permanent()
  }
}

export function isTransformError(e: unknown): e is TransformError {
  return e instanceof TransformError
}
