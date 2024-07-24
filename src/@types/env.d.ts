declare module '*.lottie' {
  const src: Record<string, unknown> | string
  export default src
}

declare module '*?lqip' {
  const lqip: {
    lqip: string
    width: number
    height: number
    src: string
  }
  export default lqip
}
