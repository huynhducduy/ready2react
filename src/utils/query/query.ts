/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types -- too complicated */
import {
  type DefinedInitialDataOptions,
  type SetDataOptions,
  type UndefinedInitialDataOptions,
  type UseQueryOptions,
  type UseQueryOptions as UseQueryOptionsBase,
} from '@tanstack/react-query'

// TODO: support partial query matching when using `Query Filter` to cancelQueries, removeQueries, resetQueries, refetchQueries, getQueriesData, setQueriesData, invalidateQueries, isFetching

//------------------------------------------------------------------------------

type SerializablePrimitive = string | number | boolean | null | undefined

type Serializable =
  | SerializablePrimitive
  | SerializablePrimitive[]
  | Record<string, SerializablePrimitive>

interface QueryConfigFnData {
  key?: Serializable[] // can be omit and [name, ...params] will be used as queryKey
  data: unknown
  options?: Omit<
    UndefinedInitialDataOptions | DefinedInitialDataOptions | UseQueryOptions,
    'queryKey'
  >
}

// TODO: support object in addition to function when query have no params
type QueryConfigData = (...rest: never[]) => QueryConfigFnData

export const NO_REFETCH_OPTIONS = {
  refetchInterval: false,
  refetchIntervalInBackground: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const

//------------------------------------------------------------------------------

export function createQueryConfig<QueryConfig extends Record<string, QueryConfigData>>(
  config: QueryConfig,
) {
  return config
}

//------------------------------------------------------------------------------

export function createQueryUtils<QueryConfig extends Record<string, QueryConfigData>>(
  queryConfig: QueryConfig,
) {
  type QueryNames = keyof QueryConfig
  type QueryData<QueryName extends QueryNames> = ReturnType<QueryConfig[QueryName]>
  type QueryFnData<QueryName extends QueryNames> = QueryData<QueryName>['data']
  type QueryParams<QueryName extends QueryNames> = Parameters<QueryConfig[QueryName]>
  type QueryKey<QueryName extends QueryNames> =
    QueryData<QueryName> extends {key: unknown[]}
      ? QueryData<QueryName>['key']
      : [QueryName, ...QueryParams<QueryName>]
  type QueryUpdater<QueryName extends QueryNames> =
    | QueryFnData<QueryName>
    | ((data: QueryFnData<QueryName> | undefined) => QueryFnData<QueryName>)

  type UseQueryOptions<
    QueryName extends QueryNames,
    Err = Error,
    FnData = QueryFnData<QueryName>,
  > = Omit<
    UndefinedInitialDataOptions<QueryFnData<QueryName>, Err, FnData, QueryKey<QueryName>>,
    'queryKey'
  > & {name: QueryName} & (QueryParams<QueryName> extends never[]
      ? {
          params?: QueryParams<QueryName>
        }
      : {
          params: QueryParams<QueryName>
        })

  //------------------------------------------------------------------------------

  function getQuery<QueryName extends QueryNames>(
    name: QueryName,
    ...[params]: QueryParams<QueryName> extends never[]
      ? [QueryParams<QueryName>?]
      : [QueryParams<QueryName>]
  ): QueryData<QueryName> {
    params ??= [] as QueryParams<QueryName>
    // @ts-expect-error typescript limitation
    return queryConfig[name](...params)
  }

  function getQueryKey<QueryName extends QueryNames>(
    name: QueryName,
    ...[params, query]: QueryParams<QueryName> extends never[]
      ? [QueryParams<QueryName>?, QueryData<QueryName>?]
      : [QueryParams<QueryName>, QueryData<QueryName>?]
  ) {
    params ??= [] as QueryParams<QueryName>
    query ??= getQuery(name, params)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- don't know why the error occurs
    return query?.key ? (query.key as QueryKey<QueryName>) : ([name, ...params] as const) // derived from query name and params if key is not set
  }

  function getQueryUpdate<QueryName extends QueryNames>(
    name: QueryName,
    updater: QueryUpdater<QueryName>,
  ): QueryUpdater<QueryName> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- don't know why the error occurs
    return updater
  }

  function getQueryOptions<
    QueryName extends QueryNames,
    Err = Error,
    FnData = QueryFnData<QueryName>,
  >(
    options: UseQueryOptions<QueryName, Err, FnData>,
  ): UseQueryOptionsBase<QueryFnData<QueryName>, Err, FnData, QueryKey<QueryName>> {
    const params = options.params ?? ([] as QueryParams<QueryName>)
    const query = getQuery(options.name, params)
    return {
      ...('options' in query ? query.options : {}),
      ...options,
      queryKey: getQueryKey(options.name, params, query),
    } as UseQueryOptionsBase<QueryFnData<QueryName>, Err, FnData, QueryKey<QueryName>>
  }

  // Observe query is query that only subscribe to data and don't fetch
  function getObserveQueryOptions<
    QueryName extends QueryNames,
    Err = Error,
    FnData = QueryFnData<QueryName>,
  >(
    // options: Omit<UseQueryOptions<QueryName, Err, FnData>, 'enabled'>,
    options: UseQueryOptions<QueryName, Err, FnData> & {
      enabled?: false
    },
  ): UseQueryOptionsBase<QueryFnData<QueryName>, Err, FnData, QueryKey<QueryName>> {
    const params = options.params ?? ([] as QueryParams<QueryName>)
    const query = getQuery(options.name, params)
    return {
      ...('options' in query ? query.options : {}),
      ...options,
      queryKey: getQueryKey(options.name, params, query),
      enabled: false,
      ...NO_REFETCH_OPTIONS,
    } as UseQueryOptionsBase<QueryFnData<QueryName>, Err, FnData, QueryKey<QueryName>>
  }

  function getSetQueryParams<QueryName extends QueryNames>(
    name: QueryName,
    ...[paramsOrUpdater, updaterOrOptions, options]: QueryParams<QueryName> extends never[]
      ? [QueryUpdater<QueryName>, SetDataOptions?]
      : [QueryParams<QueryName>, QueryUpdater<QueryName>, SetDataOptions?]
  ) {
    const params = Array.isArray(paramsOrUpdater) ? paramsOrUpdater : ([] as QueryParams<QueryName>)
    const updater = !Array.isArray(paramsOrUpdater)
      ? paramsOrUpdater
      : (updaterOrOptions as QueryUpdater<QueryName>)
    return [getQueryKey(name, params), updater, options] as const
  }

  return {
    getQuery,
    getQueryKey,
    getQueryUpdate,
    getQueryOptions,
    getObserveQueryOptions,
    getSetQueryParams,
  }
}

/* eslint-enable @typescript-eslint/prefer-readonly-parameter-types -- too complicated */
