type UnionToTupleWithoutOrder<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : UnionToTupleWithoutOrder<Exclude<U, S>, [...R, S]>
}[U] &
  string[]

export default UnionToTupleWithoutOrder
