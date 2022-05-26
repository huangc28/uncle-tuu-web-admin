import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import GlobalStyles from 'Atuu/styles/global'

import createStore from './store'
import App from './App.js'
import UploadProcurement from './scenes/UploadProcurement'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement) 

root.render(
  <StrictMode>
    <GlobalStyles />
    
    <Provider store={createStore()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route index element={<UploadProcurement />} />
          </Route>
        </Routes>
      </BrowserRouter> 
    </Provider>
  </StrictMode>
)