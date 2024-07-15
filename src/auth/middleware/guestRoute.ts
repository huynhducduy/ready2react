import {redirect as redirectTo} from '@tanstack/react-router'

import {LOGIN_DEFAULT_REDIRECT} from '@/auth/config'
import isAuthenticated from '@/auth/isAuthenticated'

/**
 * Only allow guests (non-authenticated users) to access the route.
 */
export default function guestRoute(redirect?: string) {
  if (isAuthenticated()) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error -- this is desired behavior
    throw redirectTo({
      to: redirect ?? LOGIN_DEFAULT_REDIRECT,
    })
  }
}
