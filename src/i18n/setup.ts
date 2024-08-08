import {StatusCodes} from 'http-status-codes'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector' // how about ssr?
import HttpBackend, {type HttpBackendOptions} from 'i18next-http-backend'
import {initReactI18next} from 'react-i18next'

import {MODE} from '@/constants/config'
import {logError} from '@/utils/logger'

import {DEFAULT_LOCALE, DEFAULT_NAMESPACE} from './constants'
import locales, {availableLocales, isLocaleAvailable} from './locales'

async function loadLocaleBundle(locale: string, namespace: string) {
  // currently we dont need namespace for locale
  if (isLocaleAvailable(locale)) {
    const data = await locales[locale]()
    return data.default
  }
  throw new Error(`Missing locale bundle for ${locale} with namespace ${namespace}`)
}

void i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpBackend)
  .init<HttpBackendOptions>({
    debug: ['test', 'development'].includes(MODE),
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: availableLocales,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: DEFAULT_NAMESPACE,
    load: 'languageOnly',
    backend: {
      // for i18next-http-backend
      loadPath: '{{lng}}|{{ns}}', // used to pass language and namespace to custom XHR function
      request: (_, url, _2, callback) => {
        // instead of loading from a URL like i18next-http-backend is intended for, we re-purpose this plugin to load chunks instead by overriding the default request behavior
        const [lng, ns] = url.split('|')

        if (!lng || !ns) {
          throw new Error('Invalid URL format. Expected "lng|ns"')
        }

        loadLocaleBundle(lng, ns)
          .then(data => {
            setTimeout(() => {
              callback(null, {
                data: JSON.stringify(data),
                status: StatusCodes.OK, // status code is required by XHR plugin to determine success or failure
              })
            }, 0)
          })
          .catch((e: unknown) => {
            logError(e)
            setTimeout(() => {
              callback(null, {
                data: {},
                status: StatusCodes.INTERNAL_SERVER_ERROR,
              })
            }, 0)
          })
      },
    },
  })
