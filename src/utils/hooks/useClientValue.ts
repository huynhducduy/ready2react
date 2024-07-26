import {type DependencyList, useRef} from 'react'
import {useIsomorphicLayoutEffect, useUpdate} from 'react-use'

import useIsChanged from './useIsChanged'

export default function useClientValue<T = unknown, T2 = undefined>(
  factory: () => T,
  defaultValue?: T2,
) {
  // eslint-disable-next-line react-compiler/react-compiler -- it's intentional
  // eslint-disable-next-line react-hooks/exhaustive-deps -- it's intentional, deps is changed on every render so the value will update every render
  return useMemoClientValue(factory, [{}], defaultValue)
}

export function useMemoClientValue<T = unknown, T2 = undefined>(
  factory: () => T,
  deps: DependencyList,
  defaultValue?: T2,
) {
  const isCalledInClientSide = typeof window !== 'undefined'

  const update = useUpdate()
  const shouldUpdate = useIsChanged(...deps)

  const clientValue = useRef<T | T2 | undefined>(defaultValue)

  // If the hook is called on the client side, we can update the value immediately.
  if (shouldUpdate && isCalledInClientSide) clientValue.current = factory()

  useIsomorphicLayoutEffect(() => {
    // If the hook is called on the server side (only happen in the first render), we gonna update the value inside useEffect
    if (!isCalledInClientSide) {
      clientValue.current = factory()
      update()
    }
    // eslint-disable-next-line react-compiler/react-compiler -- it's intentional
    // eslint-disable-next-line react-hooks/exhaustive-deps -- this is intentional, we only want to run this once (on the first render)
  }, [])

  return clientValue.current as T | T2
}
