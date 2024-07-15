import {toast} from 'sonner'

export default function toastErrorMessage(error: unknown) {
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    toast.error(error.message)
  }
}
