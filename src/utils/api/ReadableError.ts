import type {AxiosResponse} from 'axios'
import type {ReadonlyDeep} from 'type-fest'

import ErrorWithMetadata from '@/utils/errors/ErrorWithMetadata'

export default class ReadableError extends ErrorWithMetadata {
  res: ReadonlyDeep<
    AxiosResponse<{
      code: string
      msg?: unknown
      [key: string]: unknown
    }>
  >

  constructor(
    response: ReadonlyDeep<
      AxiosResponse<{
        code: string
        msg?: unknown
      }>
    >,
  ) {
    super('ReadableError', response.data.code, String(response.data.msg), {data: response.data})
    this.res = response
  }
}

export function isReadableError(e: unknown): e is ReadableError {
  return e instanceof ReadableError
}
