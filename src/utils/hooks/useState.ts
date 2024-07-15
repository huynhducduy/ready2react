import {useReducer} from 'react'

import useCallback from './useCallback'
import useRef from './useRef'

interface UseStateOptions<T = unknown> {
  mode?: 'refFirst' | 'sync'
  onChange?: (value: T | undefined, prev: T | undefined) => void
}

/*
 * This hook create a ref that mirror every change to the state
 * This is useful when we have an effect or memo that read value from state, but dont want to react to state change => use the ref for reading
 * Future react version will add a support for `useEffectEvent` https://react.dev/reference/react/experimental_useEffectEvent which can solve the case
 * This hook have 2 modes:
 * 1. sync: (default mode) ref value and react state value will be update by react scheduler at the sametime that determined by the scheduler (usually lag behind the method call)
 * 2. refFirst: Fef value will update right when the setter is called, react state will lag behind with the control of react scheduler.
 *              Note that there will be cases where the react state at the time of update by react scheduler, can be different from the ref that updated immedially before.
 *              Use as your own risk
 */
function useState<T = undefined>(): [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>,
  React.MutableRefObject<T | undefined>,
]
function useState<T>(
  initialState: T | (() => T),
  options?: UseStateOptions<T>,
): [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>]
// TODO: test to see if it work with lazy initial state
function useState<T>(initialState?: T | (() => T), options?: UseStateOptions<T>) {
  const mode: UseStateOptions['mode'] = options?.mode ? 'sync' : 'refFirst'

  const ref = useRef<T | undefined>(initialState)

  const reducerInitializer =
    typeof initialState === 'function' ? [undefined, initialState] : [initialState, undefined]

  const [state, setter] = useReducer(
    (curr: T | undefined, value: T | ((curr: T | undefined) => T | undefined) | undefined) => {
      // This function will stay in the hooks queue and invoke by react scheduler
      const next = value instanceof Function ? value(curr) : value
      // And ref will update with it
      ref.current = next
      options?.onChange?.(next, curr)
      return next
    },
    reducerInitializer[0] as T,
    reducerInitializer[1] as () => T,
  )

  // This function will be invoke immediately, use as your own risk
  const immediatelySetter = useCallback(
    (value: T | ((curr: T | undefined) => T | undefined) | undefined) => {
      const next = value instanceof Function ? value(ref.current) : value
      // Update ref immediately
      ref.current = next
      // Then leave the state for the react scheduler to update
      setter(next)
    },
    [setter],
  )

  return [state, mode === 'sync' ? setter : immediatelySetter, ref]
}

export default useState
