import {renderHook} from '@testing-library/react'
import {expect, it} from 'vitest'

import useWindowSize from './useWindowSize'

it('should return the right result', () => {
  const {result} = renderHook(() => useWindowSize())

  expect(result.current.isMobile).toBe(false)
})
