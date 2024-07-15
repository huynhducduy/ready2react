function isObject(value: unknown): value is object {
  try {
    return typeof value === 'object' && !Array.isArray(value)
  } catch (_) {
    return false
  }
}

export default function isObjectDepthExceed(obj: unknown, n: number) {
  function checkDepth(currentObj: unknown, currentDepth: number, visited: Set<unknown>) {
    if (currentDepth > n) {
      return true
    }

    if (!isObject(currentObj)) {
      return false
    }

    // Check for circular reference
    if (visited.has(currentObj)) {
      return false
    }

    // Mark the current object as visited
    visited.add(currentObj)

    if (currentObj instanceof Map) {
      for (const key of currentObj.keys()) {
        if (
          isObject(currentObj.get(key)) &&
          checkDepth(currentObj.get(key), currentDepth + 1, visited)
        ) {
          return true
        }
      }
    }

    for (const key in currentObj) {
      // @ts-expect-error currentObj[key] is guranteed to exist
      if (isObject(currentObj[key]) && checkDepth(currentObj[key], currentDepth + 1, visited)) {
        return true
      }
    }

    // Un-mark the current object as visited before returning
    visited.delete(currentObj)

    return false
  }

  try {
    return checkDepth(obj, 1, new Set())
  } catch (_) {
    return true
  }
}
