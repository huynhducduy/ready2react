export default function preloadImage(
  url: string | string[],
  priority = 'low',
  strategy: 'sequential' | 'parallel' = 'sequential',
  callback?: () => void,
) {
  if (Array.isArray(url)) {
    if (strategy === 'parallel') {
      let loadedCounter = 0
      url.forEach(u => {
        preloadImage(u, priority, strategy, () => {
          loadedCounter++

          if (loadedCounter == url.length) {
            callback?.()
          }
        })
      })
    } else {
      const remainingUrls = url.slice()

      if (remainingUrls.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- already check for length
        preloadImage(remainingUrls.shift()!, priority, strategy, () => {
          preloadImage(remainingUrls, priority, strategy, callback)
        })
      } else {
        callback?.()
      }
    }

    return
  }

  try {
    const img = new Image()
    img.src = url
    img.fetchPriority = priority
    if (callback) img.onload = callback
  } catch {
    // empty
  }
}
