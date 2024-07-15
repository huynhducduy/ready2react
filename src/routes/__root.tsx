import type {QueryClient} from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
  useRouter,
} from '@tanstack/react-router'
import {lazy, Suspense} from 'react'
import {RouterProvider} from 'react-aria-components'

import RouteAnnouncer from '@/utils/router/RouteAnnouncer'

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import('@tanstack/router-devtools').then(res => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    )

function RootRoute() {
  const router = useRouter()
  return (
    <>
      <ScrollRestoration />
      <RouteAnnouncer />
      <RouterProvider navigate={(to: string) => router.navigate({to})}>
        <Outlet />
        <Suspense>
          <TanStackRouterDevtools initialIsOpen={false} />
        </Suspense>
      </RouterProvider>
    </>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootRoute,
})
