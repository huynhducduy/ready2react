import {
  type CredentialResponse,
  // googleLogout,
  GoogleOAuthProvider,
  useGoogleOneTapLogin,
} from '@react-oauth/google'
import {memo} from 'react'
import {toast} from 'sonner'

import {GOOGLE_AUTH_CLIENT_ID} from '@/auth/config'
import {useIsAuthenticatedValue} from '@/auth/useIsAuthenticated'
import type {Router} from '@/router'

const ERROR_MESSAGE =
  'Something went wrong while trying to login with Google. Please try again. If the problem persists, please contact support.'

interface Props {
  readonly router: Router
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- temp
function OneTap({router}: Props) {
  const handleOnSuccess = (credentialResponse: Readonly<CredentialResponse>) => {
    if (!credentialResponse.credential) {
      toast.error(ERROR_MESSAGE)
    }

    // signInWithGoogle({
    //   token: credentialResponse.credential,
    // })
    //   .then(() => {
    //     const account = getAccountInformation()

    //     if (!account) {
    //       throw new Error('Failed to get account information')
    //     }

    //     toast.success(`Logged in as ${account.accountName} (${account.email})`)

    //     void router.invalidate()
    //   })
    //   .catch(e => {
    //     if (shouldLogError(e)) {
    //       console.error('Error logging in with Google:', e)
    //       logError(e)
    //     }
    //     toast.error(ERROR_MESSAGE)
    //     googleLogout()
    //   })
  }

  const handleOnError = () => {
    console.error('login failed')
  }

  useGoogleOneTapLogin({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
    use_fedcm_for_prompt: true,
    cancel_on_tap_outside: false,
  })

  return null
}

export default memo(function GoogleOneTapLogin({router}: Props) {
  const isAuthenticated = useIsAuthenticatedValue()

  if (isAuthenticated) return

  return (
    <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
      <OneTap router={router} />
    </GoogleOAuthProvider>
  )
})
