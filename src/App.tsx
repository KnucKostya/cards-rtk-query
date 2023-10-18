import { Router } from '@/Router.tsx'
import { Provider } from 'react-redux'
import { store } from '@/services/store.ts'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import s from './App.module.scss'

export function App() {
  return (
    <div className={s.appContainer}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  )
}
