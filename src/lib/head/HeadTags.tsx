import {memo} from 'react'
import {useSeoMeta} from 'unhead'

import {TITLE} from '@/constants/config'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- types from library
const HeadTags = function (props: Omit<Parameters<typeof useSeoMeta>[0], 'titleTemplate'>) {
  useSeoMeta({
    ...props,
    titleTemplate: (title?: string) => `${title} - ${TITLE}`,
  })

  return null
}

export default memo(HeadTags)
