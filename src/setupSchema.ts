import {FormatRegistry} from '@sinclair/typebox'
import {DefaultErrorFunction, SetErrorFunction} from '@sinclair/typebox/errors'

// Custom error message support
declare module '@sinclair/typebox' {
  interface SchemaOptions {
    /**
     * Custom error message for the schema.
     */
    errorMessage?: string
  }
}

// TODO: support i18n
SetErrorFunction(error => {
  // TODO: support fine-grained error messages, how to map from error.errorType to SchemaOptiopns?
  if (error.schema.errorMessage && typeof error.schema.errorMessage === 'string') {
    return error.schema.errorMessage
  }

  return DefaultErrorFunction(error)
})
// END custom error message support

const Email =
  /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i

FormatRegistry.Set('email', value => {
  return Email.test(value)
})

// Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter & one number
const Password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,100}$/

FormatRegistry.Set('password', value => {
  return Password.test(value)
})
