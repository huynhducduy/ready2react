import {memo, useEffect} from 'react'

import {type Router} from '@/router'

import isAuthenticatedPubSubChannel from './isAuthenticatedPubSubChannel'
import {useGetIsAuthenticated, useSetIsAuthenticated} from './useIsAuthenticated'

export default memo(function AuthUpdater({router}: {router: Router}) {
  const setIsAuthenticated = useSetIsAuthenticated()
  const getIsAuthenticated = useGetIsAuthenticated()

  useEffect(() => {
    const isAuthenticatedListener = (event: MessageEvent<boolean>) => {
      // NOTE: we still need to ensure event.data is boolean since it should be send by anyone, the generic only help infer type on build-time.
      if (event.isTrusted && typeof event.data === 'boolean') {
        // TODO: investigate why jotai still trigger rerender even if value didn't change
        const latestGetIsAuthenticated = getIsAuthenticated()
        if (latestGetIsAuthenticated !== event.data) {
          console.log('authentication status updated:', event.data)
          setIsAuthenticated(event.data)
          void router.invalidate()
        }
      }
    }

    isAuthenticatedPubSubChannel.sub(isAuthenticatedListener)

    return () => {
      isAuthenticatedPubSubChannel.unSub(isAuthenticatedListener)
    }
  }, [getIsAuthenticated, setIsAuthenticated, router])

  return null
})
