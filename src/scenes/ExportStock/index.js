import { useState, useEffect } from 'react'
import { 
  FlexboxGrid, 
  Form, 
  InputPicker,
  ButtonToolbar,
  Button,
} from 'rsuite'
import { css } from '@emotion/react'

const containerStyle = css`
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr 3fr;
`

const initFormValue = {
  gamepicker: 'Eugenia',
  productpicker: 'Eugenia',
}

function ExportStock() {
  // set default game / product list
  const [gameList, setGameList] = useState([])
  const [productList, setProductList] = useState([])
  const [formValue, setFormValue] = useState(initFormValue)
  
  // Load list of games
  useEffect(() => {
    
  }, [])

  const handleSubmit = () => {
    console.log('handleSubmit')
  }
  const handleOnChangeGame = () => {
    // Dispatch event to load available products
  }
  const handleOnChangeProduct = () => {
  
  }
  

  return (
    <div>
      <div css={containerStyle}>
        <FlexboxGrid justify='center'>
          <FlexboxGrid.Item
            colspan={8} 
            css={css`text-align:center`}
          >
            <h2>
              預約出庫
            </h2>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div> 

      {/* Export Form */}
      <div>
        <Form 
          onSubmit={handleSubmit}
          formValue={formValue}
        >
          <Form.Group controlId="username">
            <Form.ControlLabel>用戶名</Form.ControlLabel>
            <Form.Control name="username" />
            <Form.HelpText>用戶名為必填</Form.HelpText>
          </Form.Group>
        
          <Form.Group controlId="gameitem">
            <Form.Control 
              placeholder={'遊戲名稱'}
              name="gamepicker" 
              accepter={InputPicker} 
              onChange={handleOnChangeGame}
              data={gameList}
              // data={[
              //   {
              //     label: "Eugenia",
              //     value: "Eugenia",
              //     role: "Master"
              //   }
              // ]}
            />

            <Form.Control 
              placeholder={'商品名稱'}
              name="productpicker" 
              accepter={InputPicker} 
              onChange={handleOnChangeProduct}
              data={productList}
              // data={[
              //   {
              //     label: "Eugenia",
              //     value: "Eugenia",
              //     role: "Master",
              //   }
              // ]}
            />

            <Form.Control 
              placeholder={'數量'}
              name="quantity" 
              onChange={evt => {
                console.log('evt', evt)
              }}
            />
          </Form.Group>
          <Form.Group>
            <ButtonToolbar>
              <Button type='submit' appearance="primary">Submit</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>      
      </div>
      
      {/* 
        Input text: userid
          Game name ---> auto populate game item ID supported at the moment
          Game item ID ---> auto populate quanity
          quantity
          submit button
      */}
    </div>
  )
}

export default ExportStock