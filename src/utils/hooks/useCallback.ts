import {type Dispatch as ReactDispatch, useCallback as useCallbackBase} from 'react'

/*
 * Use this type to make sure that the callback passed will always be a memoized callback
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- its intentional
export interface MemoizedCallback<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>
  memoized: true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- its intentional
export type MemoizedCallbackOrDispatch<T extends (...arg: [any]) => any> =
  | MemoizedCallback<T>
  | ReactDispatch<Parameters<T>[0]>

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- its intentional
function memoizeCallback<T extends (...args: any[]) => any>(callback: T) {
  // @ts-expect-error Escape typescript
  callback.memoized = true
  return callback as unknown as MemoizedCallback<T>
}

/*
 * Use this hook to create a memoized callback instead of the original one
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- its intentional
export default function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]) {
  return useCallbackBase(memoizeCallback<T>(callback), deps)
}
