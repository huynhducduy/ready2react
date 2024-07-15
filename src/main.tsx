import './instrument'
import './main.css'

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import App from './App.tsx'

function render() {
  // #root is always found
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- its guaranteed to be there
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

render()
