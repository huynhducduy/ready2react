import {type DependencyList, useMemo} from 'react'

export default function useIsChanged(...deps: DependencyList) {
  const newValue = {} // New object created everytime

  // eslint-disable-next-line react-hooks/exhaustive-deps -- its intentional
  const value = useMemo(() => newValue, deps)

  return value === newValue // If these are the same object, it means the deps changed
}
