import {useEffect} from 'react'

import createIdleTimeScheduler from '@/utils/createIdleTimeScheduler'

import {useLazyRef} from './useLazyRef'

export default function useIdleTimeScheduler() {
  const scheduler = useLazyRef(() => createIdleTimeScheduler())

  useEffect(() => {
    const currentScheduler = scheduler.current

    return () => {
      currentScheduler.clear()
    }
  }, [])

  return {
    schedule: scheduler.current.schedule,
    clear: scheduler.current.clear,
    cancel: scheduler.current.cancel,
  }
}
