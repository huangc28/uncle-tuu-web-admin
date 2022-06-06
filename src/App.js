import { Sidenav, Nav } from 'rsuite' 
import { css } from '@emotion/react'
import { Outlet, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'rsuite/dist/rsuite.min.css'

const mainStyle = css`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
`

function App() {
  const navigate = useNavigate()
  
  return (
    <>
      <main css={mainStyle}>
        <Sidenav>
          <Sidenav.Body>
            <Nav activeKey='1'>
              <Nav.Item 
                eventKey='1'
                onClick={evt => {
                  evt.preventDefault()
                  navigate('/', { replace: true })           
                }}
              >
                上傳採購單
              </Nav.Item>
              <Nav.Item 
                eventKey='2'
                onClick={evt => {
                  evt.preventDefault()
                  navigate('export-stock', { replace: true })
                }}
              >
                預約出庫
              </Nav.Item>
              
              <Nav.Item
                eventKey='3'
                onClick={evt => {
                  evt.preventDefault()
                  navigate('assignments-status', { replace: true })
                }}
              >
                出庫狀態
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default App