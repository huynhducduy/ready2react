import clsx from 'clsx'
import {type ForwardedRef, forwardRef, type PropsWithChildren} from 'react'
import {type AriaButtonOptions, useButton} from 'react-aria'
import {ButtonContext, useContextProps} from 'react-aria-components'

import style from './PrimaryButton.module.scss'

type Props = PropsWithChildren<
  {
    size?: 'lg' | 'md' | 'sm'
    className?: string
    isPending?: boolean
    showPendingIndicator?: boolean
  } & AriaButtonOptions<'button'>
>

export default forwardRef(function PrimaryButton(
  {showPendingIndicator = true, ...props}: Props,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  ;[props, ref] = useContextProps(
    {
      ...props,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- || is the correct logic
      isDisabled: props.isDisabled || props.isPending,
    },
    ref,
    ButtonContext,
  )

  const {buttonProps} = useButton(props, ref)

  const defaultClassName = clsx(
    style.Button,
    style.Rounded,
    (function () {
      switch (props.size) {
        case 'lg':
          return style.Large
        case 'md':
          return style.Medium
        case 'sm':
          return style.Small
        default:
          return style.Large
      }
    })(),
  )

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={clsx(defaultClassName, props.className)}
      aria-disabled={props.isDisabled}
      disabled={false}
      data-pending={props.isPending}
    >
      {showPendingIndicator && props.isPending && <div className={style.Loader} />}
      {props.children}
    </button>
  )
})