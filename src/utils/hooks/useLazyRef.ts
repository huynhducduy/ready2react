// Steal from https://github.com/Shopify/quilt/blob/main/packages/react-hooks/src/hooks/lazy-ref.ts
import type {MutableRefObject} from 'react'
import {useRef, useState} from 'react'

export function useLazyRef<T>(getValue: () => T): MutableRefObject<T> {
  const [value] = useState<T>(getValue)
  return useRef<T>(value)
}
