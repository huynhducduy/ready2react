import {matchQuery, MutationCache, QueryClient, type QueryKey} from '@tanstack/react-query'

import {isPermanentError} from '@/utils/errors/MaybePermanentError'
import {createQueryConfig, createQueryUtils} from '@/utils/query/query'

const queryConfig = createQueryConfig({})

// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- its magic
const TIME_24_HOURS = 1000 * 60 * 60 * 24
const RETRY_TIMES = 3

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidates?: QueryKey[] | 'all'
      awaitInvalidates?: QueryKey[] | 'all'
    }
  }
}

export function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
        gcTime: TIME_24_HOURS,
        retry(failureCount, error) {
          if (isPermanentError(error)) return false
          return failureCount < RETRY_TIMES
        },
      },
      mutations: {
        throwOnError: false,
        gcTime: TIME_24_HOURS,
        retry(failureCount, error) {
          if (isPermanentError(error)) return false
          return failureCount < RETRY_TIMES
        },
      },
    },
    mutationCache: new MutationCache({
      onSuccess: async (_data, _variables, _context, mutation) => {
        const awaitInvalidates = mutation.meta?.awaitInvalidates
        if (awaitInvalidates === 'all') {
          await queryClient.invalidateQueries()
        } else {
          await queryClient.invalidateQueries({
            predicate: query =>
              awaitInvalidates?.some(queryKey => matchQuery({queryKey}, query)) ?? false,
          })
        }

        const invalidates = mutation.meta?.invalidates
        if (invalidates === 'all') {
          void queryClient.invalidateQueries()
        } else {
          void queryClient.invalidateQueries({
            predicate: query =>
              invalidates?.some(queryKey => matchQuery({queryKey}, query)) ?? false,
          })
        }
      },
    }),
  })
  return queryClient
}

const queries = createQueryUtils(queryConfig)

// export type QueryDataType<T extends keyof typeof queryConfig> = ReturnType<
//   typeof queries.getQuery<T>
// >['data']

export default queries
