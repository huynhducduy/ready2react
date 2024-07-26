// Steal from https://github.com/Shopify/quilt/blob/main/packages/react-hooks/src/hooks/lazy-ref.ts
// https://thoughtspile.github.io/2021/11/30/lazy-useref/

import {useRef, useState} from 'react'

export function useLazyRef<T>(getValue: () => T) {
  const [value] = useState<T>(getValue)
  return useRef<T>(value)
}
