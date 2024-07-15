import SkipLink from '@/components/SkipLink'
import HeadTags from '@/lib/head/HeadTags'
import skipTargetProps from '@/utils/a11y/skipTargetProps'

import style from './Home.module.scss'

export default function Home() {
  return (
    <>
      <div className={style.Page}>
        <HeadTags title='Home' />
        <SkipLink title='Skip to main content' to='#main-content' />
        <main {...skipTargetProps('main-content')}>Hello</main>
      </div>
    </>
  )
}
