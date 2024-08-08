import {useEffect} from 'react'
import type {ReadonlyDeep} from 'type-fest'

import {logEvent} from '@/utils/logger'

export default function useLogPageViewEvent(
  event: ReadonlyDeep<[string, Record<string, unknown>]>,
) {
  useEffect(() => {
    logEvent(event[0], event[1])
  }, [event])
}
