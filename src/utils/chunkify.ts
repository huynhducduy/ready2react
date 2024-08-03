const chunkify = function* <T extends unknown[]>(itr: T, size: number) {
  let chunk: T[] = []
  for (const v of itr) {
    chunk.push(v as T)
    if (chunk.length === size) {
      yield chunk
      chunk = []
    }
  }
  if (chunk.length) yield chunk
}

export default chunkify
