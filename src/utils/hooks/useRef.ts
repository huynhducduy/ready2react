import {useRef as baseUseRef} from 'react'

const none = {}

export default function useRef<T>(initialState?: T | (() => T), notLazy?: true) {
  const ref = baseUseRef(
    notLazy ? (initialState as T) : typeof initialState !== 'function' ? initialState : (none as T),
  )

  // if it's not initialized
  if (!notLazy && ref.current === none && initialState instanceof Function) {
    // we initialize it
    ref.current = initialState()
  }

  return ref
}
