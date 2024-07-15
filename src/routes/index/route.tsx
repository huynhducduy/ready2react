import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    q?: string
  } => {
    return {
      q: search.q ? String(search.q) : undefined,
    }
  },
})
