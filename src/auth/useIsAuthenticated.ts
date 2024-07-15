import {atom, useAtom, useAtomValue, useSetAtom, useStore} from 'jotai'

import useCallback from '@/utils/hooks/useCallback'

import isAuthenticated from './isAuthenticated'

export const isAuthenticatedAtom = atom(isAuthenticated())

export default function useIsAuthenticated() {
  return useAtom(isAuthenticatedAtom)
}

export function useSetIsAuthenticated() {
  return useSetAtom(isAuthenticatedAtom)
}

export function useIsAuthenticatedValue() {
  return useAtomValue(isAuthenticatedAtom)
}

export function useGetIsAuthenticated() {
  const store = useStore()
  return useCallback(() => store.get(isAuthenticatedAtom), [store])
}
