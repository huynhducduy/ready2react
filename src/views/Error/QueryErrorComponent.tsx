import type {FallbackProps} from 'react-error-boundary'

import {logError} from '@/utils/logger'

import Error from './ErrorComponent'

export default function QueryErrorComponent(props: Readonly<FallbackProps>) {
  logError(props.error)

  return <Error reset={props.resetErrorBoundary} />
}
