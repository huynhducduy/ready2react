import type {AxiosResponse} from 'axios'

import ReadableError from '@/utils/api/ReadableError'

/**
 * This function will throw an error if the response has an error code.
 * The reason why we need is because there are some API that always return 200 no matter what,
 * so we need to check the error code.
 */
export default function throwIfError(res: AxiosResponse, nonErrorCodes: string[]): undefined
export default function throwIfError(
  res: AxiosResponse,
  nonErrorCodes: string[],
  msgIfPossible: true,
): undefined | string
export default function throwIfError(
  res: AxiosResponse,
  nonErrorCodes: string[] = [],
  msgIfPossible?: boolean,
): undefined | string {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access -- its intentional */
  if (
    'code' in res.data &&
    typeof res.data.code === 'string' &&
    !nonErrorCodes.includes(res.data.code as string)
  ) {
    if (msgIfPossible && 'msg' in res.data && typeof res.data?.msg === 'string') {
      return res.data.msg as string
    }
    throw new ReadableError(
      res as AxiosResponse<{
        code: string
        msg?: unknown
      }>,
    )
  }
  /* eslint-enable @typescript-eslint/no-unsafe-member-access -- enable for the disable above */
}
