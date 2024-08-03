import 'i18next'

import type defaultLocale from '@/i18n/locales/en.json'
import {DEFAULT_NAMESPACE} from '@/i18n/setup'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NAMESPACE
    resources: {
      [DEFAULT_NAMESPACE]: typeof defaultLocale
    }
  }
}
