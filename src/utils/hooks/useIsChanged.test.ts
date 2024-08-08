import {renderHook} from '@testing-library/react'
import {expect, test} from 'vitest'

import useIsChanged from './useIsChanged'

test('useIsChange with dependency that change', () => {
  const {result: useIsChangedHook, rerender} = renderHook(deps => useIsChanged(...deps), {
    initialProps: [{}],
  })

  expect(useIsChangedHook.current).toBeTruthy()

  rerender([{}])

  expect(useIsChangedHook.current).toBeTruthy()

  rerender([{}])

  expect(useIsChangedHook.current).toBeTruthy()
})

test("useIsChange with dependency that don't change", () => {
  const {result: useIsChangedHook, rerender} = renderHook(deps => useIsChanged(...deps), {
    initialProps: [1],
  })

  expect(useIsChangedHook.current).toBeTruthy()

  rerender([1])

  expect(useIsChangedHook.current).toBeFalsy()

  rerender([1])

  expect(useIsChangedHook.current).toBeFalsy()
})
