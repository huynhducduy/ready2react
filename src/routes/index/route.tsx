import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  validateSearch: (
    search: Readonly<Record<string, unknown>>,
  ): {
    q?: string
  } => {
    if (search.q) {
      return {
        q: String(search.q),
      }
    }

    return {}
  },
})
