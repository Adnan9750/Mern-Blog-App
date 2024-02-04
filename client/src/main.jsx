import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { persister, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={persister}>
      <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
    </PersistGate>
  </React.StrictMode>,
)
