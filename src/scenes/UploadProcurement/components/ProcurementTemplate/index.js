import { css } from '@emotion/react'

import procurementTemplatePNG from './images/procurement_template.png'

function ProcurementTemplate() {
  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    `}>
      <h3>
        採購單樣版
      </h3>

      <p css={css`
        font-size: 16px;  
        color: white; 
        margin-bottom: 20px;
      `}> 
        請參照採購單樣板，上傳前檢查一下第一行大標都要有。啊記得一定要簡體字，不然機器人找不到資料 <br />
        一個大標只能有一格，不要有兩格喔！
      </p>
      <img src={procurementTemplatePNG} />
    </div>
  )
}

export default ProcurementTemplate