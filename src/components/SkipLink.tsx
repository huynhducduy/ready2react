import {memo} from 'react'

interface SkipLinkProps {
  title: string
  to: `#${string}`
}

export default memo(function SkipLink({title, to: href}: SkipLinkProps) {
  return (
    <a href={href} className='skip-link visually-hidden'>
      {title}
    </a>
  )
})
