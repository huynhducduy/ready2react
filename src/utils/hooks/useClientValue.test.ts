import {renderHook} from '@testing-library/react'
import {expect, test} from 'vitest'

import useClientValue, {useMemoClientValue} from './useClientValue'

const DEFAULT_VALUE = 'defaultValue'

test('useClientValue on client side', () => {
  const {result} = renderHook(() => useClientValue(() => window.innerHeight, DEFAULT_VALUE))

  expect(result.current).toBe(window.innerHeight)
})

test('useClientValue on client side with value change every render', () => {
  const {result, rerender} = renderHook(() => useClientValue(() => Math.random(), DEFAULT_VALUE))

  const firstRenderResult = result.current

  rerender()

  const secondRenderResult = result.current

  expect(secondRenderResult).not.toBe(firstRenderResult)

  rerender()

  expect(result.current).not.toBe(secondRenderResult)
})

test('useMemoClientValue on client side with value change every render and deps remain the same', () => {
  const {result, rerender} = renderHook(() =>
    useMemoClientValue(() => Math.random(), [], DEFAULT_VALUE),
  )

  const firstRenderResult = result.current

  rerender()

  expect(result.current).toBe(firstRenderResult)

  rerender()

  expect(result.current).toBe(firstRenderResult)
})

test('useMemoClientValue on client side with value change every render and deps that change', () => {
  const {result, rerender} = renderHook(
    // eslint-disable-next-line react-hooks/exhaustive-deps -- its intentional
    deps => useMemoClientValue(() => Math.random(), deps, DEFAULT_VALUE),
    {
      initialProps: [1],
    },
  )

  const firstRenderResult = result.current

  rerender([1])

  expect(result.current).toBe(firstRenderResult)

  rerender([2])

  expect(result.current).not.toBe(firstRenderResult)
})
