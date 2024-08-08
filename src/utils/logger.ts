import {captureException, captureMessage, setContext, type SeverityLevel} from '@sentry/react'
import {stringify} from 'devalue'
import type {ReadonlyDeep} from 'type-fest'

import {SENTRY_MAX_DEPTH} from '@/instrument'

import {isUserFriendlyError} from './errors/UserFriendlyError'
import isObjectDepthExceed from './isObjectDepthExceed'

export type ErrorMetadata = Record<Exclude<string, 'type' | 'TYPE'>, unknown>

const logError = function (
  err: unknown,
  extra?: Readonly<Record<Exclude<string, 'type' | 'TYPE'>, unknown>>,
  hint?: Readonly<Record<string, unknown>>,
) {
  // If the error is a UserFriendlyError, the cause should be logged, not the error itself.
  const error = isUserFriendlyError(err) ? err.cause : err

  console.error(error)

  // Log metadata of the error
  ;(function logMetadata() {
    // @ts-expect-error error can be anything
    if ('metadata' in error) {
      const depthExceeded = isObjectDepthExceed(error.metadata, SENTRY_MAX_DEPTH)

      if (!depthExceeded) {
        try {
          // @ts-expect-error optimistically set metadata for the error
          setContext('metadata', error.metadata)
          return
        } catch (_) {
          /* empty */
        }
      }

      let serializedMetadata

      try {
        serializedMetadata = stringify(error.metadata, {
          Function: value => value instanceof Function && (value as () => unknown).toString(),
        })
      } catch (_) {
        /* empty */
      }

      if (serializedMetadata) {
        setContext('metadata', {
          serializedMetadata,
        })
        return
      }

      console.log('[metadata]', error.metadata)
    }
  })()

  if (extra) setContext('extra', extra)

  captureException(error, hint)
}

const logMessage = function (
  message: string,
  extra?: Readonly<Record<Exclude<string, 'type' | 'TYPE'>, unknown>>,
  level: SeverityLevel = 'debug',
) {
  console.debug(message)
  if (extra) setContext('extra', extra)
  captureMessage(message, {level})
}

const logEvent = function (
  eventName: Gtag.EventNames | (string & NonNullable<unknown>),
  eventParams?: ReadonlyDeep<Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams>,
) {
  try {
    window.gtag('event', eventName, eventParams)
  } catch (_) {
    console.error('Cannot log event', eventName, eventParams)
    /* empty */
  }
}

export {logError, logEvent, logMessage}
