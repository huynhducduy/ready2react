import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector' // how about ssr?
import HttpBackend, {HttpBackendOptions} from 'i18next-http-backend'
import {initReactI18next} from 'react-i18next'

import {MODE} from '@/constants/config'
import {logError} from '@/utils/logger'

import bundles, {availableLocales} from './locales'

const DEFAULT_LOCALE = 'en'

async function loadLocaleBundle(locale: string, namespace: string) {
  // currently we dont need namespace for locale
  if (locale in bundles) {
    const data = await bundles[locale]()
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
    load: 'languageOnly',
    backend: {
      // for i18next-http-backend
      loadPath: '{{lng}}|{{ns}}', // used to pass language and namespace to custom XHR function
      request: (_, url, _2, callback) => {
        // instead of loading from a URL like i18next-http-backend is intended for, we re-purpose this plugin to load chunks instead by overriding the default request behavior
        const [lng, ns] = url.split('|')

        loadLocaleBundle(lng, ns)
          .then(data => {
            setTimeout(() => {
              callback(null, {
                data: JSON.stringify(data),
                status: 200, // status code is required by XHR plugin to determine success or failure
              })
            }, 0)
          })
          .catch((e: unknown) => {
            logError(e)
            setTimeout(() => {
              callback(null, {
                data: {},
                status: 500,
              })
            }, 0)
          })
      },
    },
  })
