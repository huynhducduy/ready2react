import HeadTags from '@/lib/head/HeadTags'

import style from './NotFound.module.scss'

export default function NotFound() {
  return (
    <div className={style.Page}>
      <HeadTags title='Not found' />
      <main>
        <div className={style.NotFound}>
          <h1 className={style.Heading}>We couldn&apos;t find what you&apos;re looking for</h1>
        </div>
      </main>
    </div>
  )
}
