import {expect, test} from 'vitest'

import {parseNumber} from './numbers'

test('parse number with , and .', () => {
  expect(parseNumber('1,234.56')).toBe(1234.56)
})
