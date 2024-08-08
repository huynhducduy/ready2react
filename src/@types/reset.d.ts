// Do not add any other lines of code to this file!
import '@total-typescript/ts-reset'

// NOTE: waiting for https://github.com/total-typescript/ts-reset/pull/151
declare global {
  interface ArrayConstructor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- its intentional
    isArray(arg: any): arg is unknown[] | readonly unknown[]
  }
}
