import { Global, css } from '@emotion/react'

function GlobalStyle(props) {
  return <Global 
    styles={css`
      html, body {
        height: 100%;
        overflow-x: hidden;
      }
      
      body {
        background-color: rgb(6, 6, 6);
        box-sizing: border-box;
        color: rgb(172, 172, 172);
      }
      
      #root {
        height: inherit;
      }
    `}
    
    {...props}
  />
}

export default GlobalStyle