import {useEffect} from 'react'

import {logEvent} from '@/utils/logger'

export default function useLogPageViewEvent(event: readonly [string, Record<string, unknown>]) {
  useEffect(() => {
    logEvent(event[0], event[1])
  }, [event])
}
