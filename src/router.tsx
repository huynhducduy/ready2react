import {dehydrate, hydrate, type QueryClient} from '@tanstack/react-query'
import {createRouter as createReactRouter} from '@tanstack/react-router'
import {parse, stringify} from 'devalue'

import {routeTree} from './routeTree.gen'
import RouterErrorComponent from './views/Error/RouterErrorComponent'
import NotFound from './views/NotFound/NotFound'

export function createRouter({queryClient}: {queryClient: QueryClient}) {
  return createReactRouter({
    transformer: {stringify, parse},
    routeTree,
    context: {
      queryClient,
    },
    // On the server, dehydrate the loader client and return it
    // to the router to get injected into `<DehydrateRouter />`
    dehydrate: () =>
      ({
        queryClientState: dehydrate(queryClient),
      }) as Record<string, unknown>, // TODO: investigate type error
    // On the client, hydrate the loader client with the data
    // we dehydrated on the server
    hydrate: dehydrated => {
      hydrate(queryClient, dehydrated.queryClientState)
    },
    defaultPreload: 'intent',
    defaultPreloadDelay: 50,
    defaultPreloadStaleTime: 0, // leverage cache control of react-query instead: we don't want loader calls to ever be stale as this will ensure that the loader is always called when the route is preloaded or visited
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: RouterErrorComponent,
    // defaultPendingComponent
  })
}

export type Router = ReturnType<typeof createRouter>

declare module '@tanstack/react-router' {
  interface Register {
    router: Router
  }
}
