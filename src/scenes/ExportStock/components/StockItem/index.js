import { 
  InputPicker,
  InputNumber,
} from 'rsuite'
import propTypes from 'prop-types'
import { css } from '@emotion/react'

const containerStyle = css`
  margin: 10px 0; 
  display: flex;
  gap: 10px; 
`

function StockItem({ 
  index, 
  gameList, 
  productList, 
  onChangeGame, 
  onChangeProduct,
  onChangeQuantity,
  onFocus,
}) {
  return (
      <div 
        css={containerStyle}
        onFocus={() => onFocus(index)}
      >
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
        />
        {/* <Form.Control 
          placeholder={'遊戲名稱'}
          name="gamepicker" 
          accepter={InputPicker} 
          onChange={v => onChangeGame(v, index)}
          data={gameList}
        />

        <Form.Control 
          placeholder={'商品名稱'}
          name="productpicker" 
          accepter={InputPicker} 
          onChange={v => onChangeProduct(v, index)}
          data={productList}
        />

        <Form.Control 
          placeholder={'數量'}
          name="quantity" 
          onChange={evt => {
            console.log('evt', evt)
          }}
        /> */}
      </div>
  )
}

StockItem.propTypes = {
  index: propTypes.number,
  gameList: propTypes.array,
  productList: propTypes.array,
  onChangeGame: propTypes.func,
  onChangeProduct: propTypes.func,
  onChangeQuantity: propTypes.func,
  onFocus: propTypes.func,
}

export default StockItem