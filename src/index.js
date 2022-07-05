import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom'

import GlobalStyles from 'Atuu/styles/global'

import createStore from './store'
import AdminApp from './AdminApp.js'
import ClientApp from './ClientApp'

import UploadProcurement from './scenes/UploadProcurement'
import ExportStock from './scenes/ExportStock'
import ExportStatus from './scenes/ExportStatus'
import ExportManual from './scenes/ExportManual'

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
        {/* Admin App Routes */}
        <Routes>
          <Route path='admin' element={<AdminApp />} >
            <Route index element={<UploadProcurement />} />
            <Route path='export-stock' element={<ExportStock />} /> 
            <Route path='assignments-status' element={<ExportStatus />} />
          </Route>
        </Routes>
        <Routes />

        {/* Client App Routes */}
        <Routes>
          <Route path='/' element={<ClientApp />}>
            <Route index element={<ExportManual />}/>
          </Route>
        </Routes>
      </HashRouter> 
    </Provider>
  </>
)