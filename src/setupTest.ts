import '@testing-library/jest-dom/vitest'

import {vi} from 'vitest'

import {type RenderHookServer, renderHookServer} from '@/test-utils'

vi.mock('@testing-library/react', async () => {
  const actualTestingLibraryReact = await vi.importActual('@testing-library/react')
  return {
    ...actualTestingLibraryReact,
    renderHookServer,
  }
})

declare module '@testing-library/react' {
  export const renderHookServer: RenderHookServer
}
