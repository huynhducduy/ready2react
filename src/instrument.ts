import {
  addIntegration,
  browserTracingIntegration,
  init,
  lazyLoadIntegration,
  makeBrowserOfflineTransport,
  makeFetchTransport,
  moduleMetadataIntegration,
  thirdPartyErrorFilterIntegration,
} from '@sentry/react'

import {APP_NAME, DEBUG, MODE} from './constants/config'

export const SENTRY_MAX_DEPTH = 3

// TODO: Shared Environment implementation
if (!DEBUG) {
  init({
    environment: MODE,
    debug: MODE !== 'production',
    // release: '1.0.0', // TODO: config release
    dsn: 'https://8a49479f668e7be85d81efd56c0e688b@o4507446794518528.ingest.us.sentry.io/4507446797533184',
    integrations: function (integrations) {
      const filteredIntergrations = integrations.filter(function (integration) {
        return !['LinkedErrors'].includes(integration.name) // lazyload it later
      })

      filteredIntergrations.push(
        ...[
          thirdPartyErrorFilterIntegration({
            filterKeys: [APP_NAME],
            behaviour: 'drop-error-if-contains-third-party-frames',
          }),
          browserTracingIntegration(),
          moduleMetadataIntegration(),
        ],
      )
      return filteredIntergrations
    },
    sendClientReports: false, // TODO: Enable this?
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    // tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This  sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    transport: makeBrowserOfflineTransport(makeFetchTransport),
    transportOptions: {}, // https://docs.sentry.io/platforms/javascript/guides/react/best-practices/offline-caching/
    // ignoreTransactions: [] // TODO: add more ignore transactions
    normalizeDepth: SENTRY_MAX_DEPTH,
  })
}

type LazyloadableIntegration = Parameters<typeof lazyLoadIntegration>[0]

async function loadSentryIntegration(name: LazyloadableIntegration) {
  const integration = await lazyLoadIntegration(name)
  addIntegration(integration())
}

const integrations: LazyloadableIntegration[] = [
  'dedupeIntegration',
  'linkedErrorsIntegration',
  'replayIntegration',
  'replayCanvasIntegration',
  'browserProfilingIntegration',
  'contextLinesIntegration',
  'extraErrorDataIntegration',
  'sessionTimingIntegration',
  // debugIntegration
  // reportingObserverIntegration
  // rewriteFramesIntegration
  // httpClientIntegration // Automatically capture all failed request
  // captureConsoleIntegration // Automatically capture all console logs
]

export function loadSentryIntegrations() {
  integrations.forEach(integration => {
    loadSentryIntegration(integration).catch(() => {
      /* do nothing, its okay to miss some integrations */
    })
  })
}
