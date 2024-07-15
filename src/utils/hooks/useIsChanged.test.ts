import {renderHook} from '@testing-library/react'
import {expect, test} from 'vitest'

import useIsChanged from './useIsChanged'

test('useIsChange with dependency that change', () => {
  const {result: useIsChangedHook, rerender} = renderHook(deps => useIsChanged(...deps), {
    initialProps: [{}],
  })

  expect(useIsChangedHook.current).toBe(true)

  rerender([{}])

  expect(useIsChangedHook.current).toBe(true)

  rerender([{}])

  expect(useIsChangedHook.current).toBe(true)
})

test("useIsChange with dependency that don't change", () => {
  const {result: useIsChangedHook, rerender} = renderHook(deps => useIsChanged(...deps), {
    initialProps: [1],
  })

  expect(useIsChangedHook.current).toBe(true)

  rerender([1])

  expect(useIsChangedHook.current).toBe(false)

  rerender([1])

  expect(useIsChangedHook.current).toBe(false)
})
