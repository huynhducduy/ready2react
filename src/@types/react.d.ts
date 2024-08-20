import 'react'

// eslint-disable-next-line @typescript-eslint/no-restricted-imports -- this is the implementation of `ReadonlyPropsWithChildren` type
import type {PropsWithChildren as PropsWithChildrenBase} from 'react'
import type {ReadonlyDeep} from 'type-fest'

declare module 'react' {
  /* eslint-disable @typescript-eslint/no-explicit-any -- its intentional */
  /*
   * Use this type to make sure that the callback passed will always be a memoized callback
   */
  interface MemoizedCallback<T extends (...args: readonly any[]) => any> {
    (...args: readonly Parameters<T>): ReturnType<T>
    readonly memoized: true
  }

  type MemoizedCallbackOrDispatch<T extends (...arg: readonly [any]) => any> =
    | MemoizedCallback<T>
    | Dispatch<SetStateAction<Parameters<T>[0]>>

  function useCallback<T extends (...args: readonly any[]) => any>(
    callback: T,
    deps: readonly any[],
  ): MemoizedCallback<T>
  /* eslint-enable @typescript-eslint/no-explicit-any -- its intentional */

  type ReadonlyPropsWithChildren<P = unknown> = ReadonlyDeep<PropsWithChildrenBase<P>>
}
