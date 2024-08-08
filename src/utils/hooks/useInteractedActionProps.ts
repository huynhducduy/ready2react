import {type MemoizedCallback, useCallback, useRef} from 'react'

const DEFAULT_DELAY = 200

export default function useInteractedActionProps(
  action: MemoizedCallback<() => void>,
  delay = DEFAULT_DELAY,
) {
  const isInteracted = useRef(false)

  const setInteracted = useCallback(() => {
    isInteracted.current = true
    setTimeout(() => {
      if (!isInteracted.current) return
      action()
    }, delay)
  }, [action, delay])

  const resetInteracted = useCallback(() => {
    isInteracted.current = false
  }, [])

  // TODO: support touch devices
  return {
    onMouseEnter: setInteracted,
    onMouseLeave: resetInteracted,
    onFocus: setInteracted,
    onBlur: resetInteracted,
  }
}
