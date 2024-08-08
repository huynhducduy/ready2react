import clsx from 'clsx'
import {memo, type MemoizedCallback, type ReadonlyPropsWithChildren, useCallback} from 'react'
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
  Text,
} from 'react-aria-components'
import {useLatest} from 'react-use'

import style from './LogoutDialog.module.scss'

interface Props {
  onLogout?: MemoizedCallback<() => void>
}

export default memo(function LogoutDialog(props: ReadonlyPropsWithChildren<Props>) {
  const latestOnLogout = useLatest(props.onLogout)

  const onLogout = useCallback((action: () => void) => {
    latestOnLogout.current?.()
    action()
    // logout({})
    //   .then(() => {
    //     googleLogout()
    //   })
    //   .finally(() => {
    //     void router.invalidate()
    //   })
    //   .catch(() => {
    //     // empty
    //   })
  }, [])

  return (
    <DialogTrigger>
      {props.children}
      <ModalOverlay
        // TODO: add animation
        className={({isEntering, isExiting}) =>
          clsx(style.Overlay, isEntering && style.IsEntering, isExiting && style.IsExiting)
        }
        isDismissable
      >
        <Modal className={style.Modal}>
          <Dialog className={style.Dialog}>
            {({close}) => (
              <>
                <Heading className={style.Heading} slot='title'>
                  Log out
                </Heading>
                <div className={style.Description}>
                  <Text>Are you sure you want to log out?</Text>
                </div>
                <div className={style.Action}>
                  <Button className={style.Cancel} onPress={close}>
                    Cancel
                  </Button>
                  <Button
                    className={style.Ok}
                    onPress={() => {
                      onLogout(close)
                    }}
                  >
                    Log out
                  </Button>
                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
})
