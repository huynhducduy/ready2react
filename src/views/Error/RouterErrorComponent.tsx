import {useQueryErrorResetBoundary} from '@tanstack/react-query'
import {type ErrorComponentProps, useRouter} from '@tanstack/react-router'
import {useEffect} from 'react'
import type {ReadonlyDeep} from 'type-fest'

import {logError} from '@/utils/logger'

import ErrorComponent from './ErrorComponent'

export default function RouterErrorComponent(props: ReadonlyDeep<ErrorComponentProps>) {
  const router = useRouter()
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  useEffect(() => {
    // Reset the query error boundary
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  logError(props.error, props.info)

  return (
    <ErrorComponent
      reset={() => {
        // Reset the router error boundary
        props.reset()
        // Invalidate the route to reload the loader
        void router.invalidate()
      }}
    />
  )
}
