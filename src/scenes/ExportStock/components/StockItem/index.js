import { 
  InputPicker,
  InputNumber,
} from 'rsuite'
import propTypes from 'prop-types'
import { css } from '@emotion/react'

const containerStyle = css`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
`

const itemContainerStyle = css`
  margin: 10px 0; 
  display: flex;
  gap: 10px; 
`

const errorMessageStyle = css`
  color: #B00020;
`

function StockItem({ 
  index, 
  gameList, 
  productList, 
  onChangeGame, 
  onChangeProduct,
  onChangeQuantity,
  onFocus,
  error,
}) {
  return (
      <div 
        css={containerStyle}
        onFocus={() => onFocus(index)}
      >
        <div css={itemContainerStyle}>
          <InputPicker
            onChange={v => onChangeGame(v, index)}
            placeholder={'遊戲名稱'}
            data={gameList}
          />

          <InputPicker
            onChange={v => onChangeProduct(v, index)}
            placeholder={'商品名稱'}
            data={productList}
          />
        
          <InputNumber 
            onChange={(v) => onChangeQuantity(v, index)}
            placeholder={'數量'}
            min={1}
          />
          </div>
          
          <div css={css`
            height: 10px;
          `}>
            {
              error !== null && (
                <p css={errorMessageStyle}>
                  {error.message}
                </p>
              )
            }
          </div>   
      </div>
  )
}

StockItem.propTypes = {
  index: propTypes.number.isRequired,
  gameList: propTypes.array,
  productList: propTypes.array,
  onChangeGame: propTypes.func,
  onChangeProduct: propTypes.func,
  onChangeQuantity: propTypes.func,
  onFocus: propTypes.func,
  error: propTypes.object,
}

export default StockItem