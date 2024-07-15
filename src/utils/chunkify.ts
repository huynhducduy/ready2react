const chunkify = function* <T extends unknown[]>(itr: T, size: number) {
  let chunk = []
  for (const v of itr) {
    chunk.push(v)
    if (chunk.length === size) {
      yield chunk
      chunk = []
    }
  }
  if (chunk.length) yield chunk
}

export default chunkify
