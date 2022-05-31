import { 
  Form, 
  InputPicker,
} from 'rsuite'
import propTypes from 'prop-types'
import { css } from '@emotion/react'

function StockItem({ index, gameList, productList, onChangeGame, onChangeProduct }) {
  return (
    <Form.Group controlId="gameitem">
      <div css={css`
        display: flex;
        gap: 10px; 
      `}>
        <Form.Control 
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
        />
      </div>
    </Form.Group>
  )
}

StockItem.propTypes = {
  index: propTypes.number,
  gameList: propTypes.array,
  productList: propTypes.array,
  onChangeGame: propTypes.func,
  onChangeProduct: propTypes.func,
}

export default StockItem