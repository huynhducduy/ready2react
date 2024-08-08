import PrimaryButton from '@/components/PrimaryButton/PrimaryButton'
import HeadTags from '@/lib/head/HeadTags'

import style from './ErrorComponent.module.scss'

interface Props {
  errorCode?: string
  errorMessage?: string
  reset?: () => void
}

export default function ErrorComponent({reset, errorCode, errorMessage}: Readonly<Props>) {
  return (
    <div className={style.Page}>
      <HeadTags title='Error' />
      <main>
        <div className={style.NotFound}>
          <h1 className={style.Heading}>
            We’re not perfect, error happens{errorCode ? ': ' + errorCode : '!'}
          </h1>
          <span className={style.Description}>{errorMessage}</span>
          <div>
            <PrimaryButton
              onPress={() => {
                if (reset) {
                  reset()
                } else {
                  location.reload()
                }
              }}
            >
              Try again
            </PrimaryButton>
          </div>
        </div>
      </main>
    </div>
  )
}
