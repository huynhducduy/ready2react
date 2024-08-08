import {renderHook} from '@testing-library/react'
import {expect, test} from 'vitest'

import useWindowSize from './useWindowSize'

test('should return the right result', () => {
  const {result} = renderHook(() => useWindowSize())

  expect(result.current.isMobile).toBeFalsy()
})
