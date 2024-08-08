import {renderHookServer} from '@testing-library/react'
import {expect, test} from 'vitest'

import useClientValue from './useClientValue'

const DEFAULT_VALUE = 'defaultValue'

test('useClientValue on server side', () => {
  const {result, hydrate} = renderHookServer(() =>
    useClientValue(() => window.innerHeight, DEFAULT_VALUE),
  )

  expect(() => window).toThrow('window is not defined')

  expect(result.current).toBe(DEFAULT_VALUE)

  hydrate()

  expect(result.current).toBe(window.innerHeight)
})
