import {announce} from '@react-aria/live-announcer'
import {useMatches, useRouter} from '@tanstack/react-router'
import {memo, useEffect, useRef} from 'react'

import {TITLE} from '@/constants/config'
import {LOADING} from '@/constants/magicStrings'

const WAIT_MS = 100

export default memo(function RouteAnnouncer() {
  const {subscribe} = useRouter()
  const matches = useMatches()

  const latestTitle = useRef('')

  useEffect(() => {
    const announceTitle = () => {
      setTimeout(() => {
        const currentTitle = document.title.replace(` - ${TITLE}`, '')

        if (currentTitle === LOADING || currentTitle === latestTitle.current) {
          announceTitle()
          return
        }

        latestTitle.current = currentTitle

        const messsage = `Navigated to ${currentTitle}`
        console.log(messsage)
        announce(messsage, 'polite')
      }, WAIT_MS)
    }

    const unsubscribe = subscribe('onResolved', info => {
      if (info.pathChanged) {
        announceTitle()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [matches, subscribe])

  return null
})
