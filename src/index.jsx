import React from 'react'
import { createRoot } from 'react-dom/client'
import { createFastContext } from './utils/fastContext'
import App from './App'
import './styles/normalize.css'
import './styles/globals.css'

const Provider = createFastContext({
  currentProduct: null,
  products: [],
  loading: true,
  modalContent: null,
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
)
