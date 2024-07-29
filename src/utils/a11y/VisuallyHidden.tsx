export default function VisuallyHidden<
  T extends keyof JSX.IntrinsicElements | ((...args: never[]) => React.ReactNode),
>({
  as,
  strict,
  isNotHiddenAnymore,
  ...props
}: T extends keyof JSX.IntrinsicElements
  ? {
      as?: T
      strict?: boolean
      isNotHiddenAnymore?: boolean
    } & JSX.IntrinsicElements[T]
  : {
      as?: T
      strict?: boolean
      isNotHiddenAnymore?: boolean
      // @ts-expect-error -- in order to have typecheck, do not change the type of T in generic
    } & React.ComponentProps<T>): JSX.Element {
  const Tag = (as ?? 'span') as unknown as React.ComponentType

  const classNames = []
  if ('className' in props && typeof props.className === 'string') {
    classNames.push(props.className)
  }
  if (!isNotHiddenAnymore) classNames.push((strict ? 'strict-' : '') + 'visually-hidden')

  return <Tag {...props} className={classNames.join(' ')} />
}

// -----------------------------------------------------------------------------

// function TestComponent(props: PropsWithChildren<{test: boolean}>) {
//   return 'hihi'
// }

// function Test() {
//   return (
//     <>
//       <VisuallyHidden as={TestComponent} test={true}>
//         Children
//       </VisuallyHidden>
//       <VisuallyHidden as={TestComponent} test={1}>
//         Children
//       </VisuallyHidden>
//       <VisuallyHidden as='button' srcSet='hihi'>
//         Children
//       </VisuallyHidden>
//       <VisuallyHidden as='img' srcSet='hihi'>
//         Children
//       </VisuallyHidden>
//     </>
//   )
// }
