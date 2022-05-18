import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import GlobalStyles from 'Atuu/styles/global'

import App from './App.js'
import Home from './scenes/Home'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement) 

root.render(
  <StrictMode>
    <GlobalStyles />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter> 
  </StrictMode>
)