import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom'

import GlobalStyles from 'Atuu/styles/global'

import createStore from './store'
import App from './App.js'
import UploadProcurement from './scenes/UploadProcurement'
import ExportStock from './scenes/ExportStock'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement) 

// We are using `HashRouter` instead of `BrowserRouter` here to bypass server side routing problem.
// Since this project doesn't need SEO and path prettiness.
// Ref: https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually
root.render(
  <>
    <GlobalStyles />
    
    <Provider store={createStore()}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route index element={<UploadProcurement />} />
            <Route path="export-stock" element={<ExportStock />} /> 
          </Route>
        </Routes>
      </HashRouter> 
    </Provider>
  </>
)