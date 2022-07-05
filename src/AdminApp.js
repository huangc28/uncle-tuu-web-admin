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

const navElements = {
  '': '上傳採購單',
  'export-stock': '預約出庫',
  'assignments-status': '出庫狀態',
}

function AdminApp() {
  const navigate = useNavigate()
  return (
    <>
      <main css={mainStyle}>
        <Sidenav>
          <Sidenav.Body>
            <Nav>
            {
              Object.keys(navElements).map((routePath, key) => {
                const label = navElements[routePath]
                return (
                  <Nav.Item
                    key={key}
                    eventKey={key.toString()}
                    onClick = {evt => {
                      evt.preventDefault()
                      navigate(routePath, { replace: true })
                    }}
                  >
                    { label }
                  </Nav.Item>
                )
              })
            }
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

export default AdminApp